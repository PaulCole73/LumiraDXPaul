//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Popups
//USEUNIT Navigation

function quick_start()
{
         Goto_Patient_New_INR();
         add_inr_override(5.8, aqDateTime.Today());
}

function add_inr_override_2(p_INR,p_day,p_month,p_year, p_eqc, p_review)
{
  try
  {
       WaitSeconds(1,"");
       
       var w_date = p_day + "/" + p_month+ "/" + p_year; 
       
       Log.Message("----- Adding INR treatment with Override: " + p_INR + " " + w_date);
       
       var INRstarV5 = set_system();
       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
       var panelPPT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
       var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
       var form = panelPTNIW.Form("NewINRForm");
       var panelPTQ  = form.Panel("PatientTreatmentNewINRQuestionsWrapper");
       var p1 = panelPTQ.Panel("PatientTreatmentNewINRConfirm");
       var p2 = panelPTQ.Panel("PatientTreatmentNewINRQuestions");
       var p3 = panelPTQ.Panel("PatientTreatmentNewINRTestDetails")
       
       var wf_complete = true;
    
        // Check the Patient Identity box
        p1.Panel(0).Checkbox("ConfirmPatient").ClickChecked(true);
      
        // Check the Dose 'Yes' box
       p1.Panel(2).Checkbox("ConfirmLastRecordedTreatment").ClickChecked(true);
       // Ignore the Dose ' No' box
       // .Panel(3).Checkbox("LastRecordedTreatmentIsNotCurrent")
       
        // Check the Missed Doses 'No' box
       p2.Panel(2).Checkbox("MissedDosesNoCheckedValue").ClickChecked(true);
       // Ignore the Missed Doses ' Yes' box
       // .Panel(1).Checkbox("MissedDosesYesCheckedValue")
       
       // Check the New Medication 'No' box
       p2.Panel(5).Checkbox("OtherMedicationNoCheckedValue").ClickChecked(true);
       // Ignore the New Medication 'Yes' box
       // .Panel(4).Checkbox("OtherMedicationYesCheckedValue")
 
       // Select the passed-in INR value
       var ws_INR = FloatToString(p_INR);
       Log.Message("INR is " + ws_INR);
       p3.Panel("testDetails").Panel("poctDetails").Panel(1).Select("INR").ClickItem(ws_INR);
       
       // Test if needed for EQC
       if (p_eqc == "Y")
          p3.Panel(2).Checkbox("UseForEQC").ClickChecked(true); 
       
       // Click the Go button
       form.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
       
       // Click the Confirm button in the confirm window
       process_confirm_INR(INRstarV5);
       
       process_Please_acknowledge_warnings(INRstarV5);
       

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
              
//           var panelPPT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
   
           // Now test if a single Schedule has been proposed or we need to choose one
           wf_no_exact = INRstarV5.NativeWebObject.Find("innerText", "INRstar cannot provide a dosing schedule for this dose using the selected tablet strengths, please choose an alternative schedule.");
           if(wf_no_exact.Exists)
           {
               // Click the top Use button
               Log.Message("Clicking 1st 'Use' button");
               var panelSG = panelPPT.Panel("DosingSchedule").Panel("DosingScheduleContent").Panel("ScheduleGrid");
               var tableSST = panelSG.Table("ScheduleSelectorTable");
               tableSST.Cell(1, 2).Button("Use").Click();
//                   panelPTC.Panel("PendingTreatmentContent").Panel("DosingScheduleContent").Panel("ScheduleGrid")
//                           .Table("ScheduleSelectorTable")
//                           .Cell(1, 2).Button("Use").Click();
               WaitSeconds(1,"");
           }
           else
               Log.Message("Exact Schedule found");
           
           // Override the date -------------------------------
           // click the override button
           var panelPTI = panelPPT.Panel("PendingTreatmentInfo");      
           panelPTI.Panel(0).Button("OverridePendingTreatment").Click();
//           panelPPT.Panel("DosingSchedule").Panel(0).Button("OverridePendingTreatment").Click();
           var formEPT = panelPTI.form("EditPendingTreatmentForm");
               
           formEPT.Table("OverrideSuggestedTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
           
           w_datepicker = INRstarV5.Panel("ui_datepicker_div");
           w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(p_month));
//           w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(p_year));
           select_day(p_day, w_datepicker);
           
           // Set Review period
           var w_vselect = formEPT.Table("OverrideSuggestedTreatmentTable").Cell(1, 3).Select("Treatment_Review");
           w_vselect.ClickItem(p_review + " Days");



           // Click 'ok'
           formEPT.panel(0).Button("OverrideAccept").Click();
        

           // -- End of Override section
           
           // Click the Accept button
           Log.Message("Clicking 'Accept' button");
           panelPTI.Panel(0).Button("AcceptPendingTreatment").Click();
           
             // Cancel the Appointment window
//               process_make_appointment_cancel(INRstarV5);
       }
       WaitSeconds(1,"");
       
       return wf_complete;
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}