//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Presets
//USEUNIT Navigation

function quick_start_dose()
{
 var w_inr = 2.3;
 var wf_missed = true;
 var wf_meds = false;
  var wf_limit = false;
  var w_dose = "4.6";
  var w_review = "8";
 
 add_inr_complex_override_dose(w_inr, wf_missed, wf_meds, wf_limit, w_dose, w_review);
}
function add_inr_complex_override_dose(p_INR, wf_missed, wf_meds, wf_limit, p_dose, p_review)
{
  try
  {
       WaitSeconds(0,"Start of Add INR Complex Overide Dose");
       
       var INRstarV5 = set_system();
       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
       var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
       var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
       var form = panelPTNIW.Form("NewINRForm");
       var panelPTQ  = form.Panel("PatientTreatmentNewINRQuestionsWrapper");
       var p1 = panelPTQ.Panel("PatientTreatmentNewINRConfirm");
       var p3 = panelPTQ.Panel("PatientTreatmentNewINRTestDetails")
       
       var wf_complete = true;
       
        // Check the selected New Medication boxes - done before Missed doses to avoid overlapping tool-tip
       if (wf_meds == true)  
           p1.Panel("ChangedMedication").Checkbox("ChangedMedication").ClickChecked(true);
           
       // Check the selected Missed Doses boxes
       if (wf_missed == true)  
          p1.Panel("MissedDose").Checkbox("MissedDoses").ClickChecked(true);
    
       // Select the passed-in INR value
       var ws_INR = FloatToString(p_INR);
       p3.Panel("testDetails").Panel("poctDetails").Panel(1).Select("INR").ClickItem(ws_INR);
   
       // Click the Go button
       form.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
//-----------------------------------------------------------------------------
       
       // Click the Confirm button in the confirm window
       process_confirm_INR(INRstarV5);
       
       process_limit_review(INRstarV5, wf_limit);
                        
       process_Please_acknowledge_warnings(INRstarV5);
       
       // Test if INR is out of range
       var wf_oor = INRstarV5.NativeWebObject.Find("innerText", "This INR is out of range for this induction algorithm. You will need to dose this patient manually.");
       if (wf_oor.Exists)
       {  
               wf_complete = false;
               Log.Message("Clicking Cancel button");
               
               // Record the values produced
               var w_dose = p3.Panel(0).Select("INR").wText;
               Log.Warning("Dose of of range "+ p_INR+ ", Dose: " + w_dose);
               
               // Click the cancel button
               form.Panel(0).Button("CancelNewINR").Click();
       }
       else
       {
       
           // Test if a schedule exists           
           var wf_no_sched = INRstarV5.NativeWebObject.Find("innerText", "There is no schedule available");
           if (wf_no_sched.Exists)
           {  
               wf_complete = false;
               Log.Message("Clicking Cancel button");
               
               // Record the values produced
               var w_dose = panelPTC.panel("PendingTreatmentContent").Table("PendingTreatmentTable").Cell(0, 2).innerText;
               Log.Warning("No Schedule for "+ p_INR+ ", Dose: " + w_dose);
               
               var panelABC = panelPTC.Panel("PendingTreatmentContent").Panel(0);
               // Click the cancel button
               panelABC.Button("CancelPendingTreatment").Click();
           }
           else
           {
              
               var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
   
               // Now test if a single Schedule has been proposed or we need to choose one
               wf_no_exact = INRstarV5.NativeWebObject.Find("innerText", "INRstar cannot provide a dosing schedule for this dose using the selected tablet strengths, please choose an alternative schedule.");
//               wf_suggested = INRstarV5.NativeWebObject.Find("innerText", "Suggested");
//               if((wf_no_exact.Exists && wf_no_exact.VisibleOnScreen) || (wf_suggested.Exists && wf_suggested.VisibleOnScreen))
               if(wf_no_exact.Exists && wf_no_exact.VisibleOnScreen) 
               {
                   // Click the top Use button
                   Log.Message("Clicking 1st 'Use' button");
                   var panelSG = panelPPT.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Panel("MoreScheduleGrid");
                   var tableSST = panelSG.Table("ScheduleSelectorTable");
                   tableSST.Cell(1, 2).Button("Use").Click();
    //                   panelPTC.Panel("PendingTreatmentContent").Panel("DosingScheduleContent").Panel("ScheduleGrid")
    //                           .Table("ScheduleSelectorTable")
    //                           .Cell(1, 2).Button("Use").Click();
                   WaitSeconds(1,"");
               
                   // Check if a dose change has occured
                   process_Dose_change(INRstarV5);
               }
               else
                   Log.Message("Exact Schedule found");
               
           // Override the Review -------------------------------
           // click the override button
           var panelPTI = panelPPT.Panel("PendingTreatmentInfo");      
           panelPTI.Panel(0).Button("OverridePendingTreatment").Click();

           var formEPT = panelPTI.form("EditPendingTreatmentForm");
               
           // Set Dose
          Log.Message("Overriding Dose");
           var w_vselect = formEPT.Table("OverrideSuggestedTreatmentTable").Cell(1, 1).Select("Treatment_Dose");
           w_vselect.ClickItem(p_dose);


          
           // Set Review period
          Log.Message("Overriding Review");
           var w_vselect = formEPT.Table("OverrideSuggestedTreatmentTable").Cell(1, 3).Select("Treatment_Review");
           w_vselect.ClickItem(p_review + " Days");

            // Click 'ok'
           formEPT.panel(0).Button("OverrideAccept").Click();

           // -- End of Override section
          WaitSeconds(1,"Waiting for Override to complete");
          
          // Confirm change of Dose
         process_Please_confirm(INRstarV5);
          
           // Click the Accept button
           Log.Message("Clicking 'Accept' button");
           var panelPTI = panelPPT.Panel("PendingTreatmentInfo");      
           panelPTI.Panel(0).Button("AcceptPendingTreatment").Click();
          }
       }
       WaitSeconds(1,"");
       
       return wf_complete;
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}

