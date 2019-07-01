//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Presets
//USEUNIT Navigation
//USEUNIT Delete_Treatments
//USEUNIT Quick_Patient

//=====================================================================================
//
// Scenario for Christine Dennis
//
// On time, not missed, no meds, INR of 5.3
//
// Find patient
// Add Adverse Event
// Enter INR
// Override Omits to 2 days
// Override Review to -1 day
// Save
// Print 
//=====================================================================================


function scenario_dennis()
{
 var w_name = "Dennis, Christine";
 var w_inr = 5.3;
 var wf_missed = false;
 var wf_meds = false;
 
 add_inr_complex(w_name, w_inr, wf_missed, wf_meds);
}

function add_inr_complex(w_name, p_INR, wf_missed, wf_meds)
{
//  try
//  {
       WaitSeconds(1,"");
       
       var INRstarV5 = set_system();

       Goto_Patient_Search();
       preset_Fetch_Patient_NHS(INRstarV5, w_name);
//---------------------------------------------------------
// Set up Scenario conditions
//
// Delete latest treatment
// Insert historical treatment with required values
//
       Goto_Patient_Treatment();
       delete_treatment();
       Goto_Add_Historical()
       quick_pt_historical(find_day(-28), "Sep", "2010", "2.5", "2.7", "3.0", "28 Days", "Scenario preset treatment");
//       var w_comment = "Explained to Patient about missing doses";
//---------------------------------------------------------
       Goto_Patient_New_INR();
       
//       var INRstarV5 = set_system();
       var panelMPC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMPC.Panel("PatientTabContent");
       var form = panelPTC.Form("NewINRForm");
       var fieldset1 = form.Fieldset("NewINR");
       var fieldset2 = fieldset1.Fieldset(0);
       var fieldset3C = fieldset2.Panel(0).Fieldset("NewINRConfirmFieldSet");
       var fieldset3Q = fieldset2.Panel(1).Fieldset("NewINRQuestionFieldSet");
       
       var wf_complete = true;
    
        // Check the Patient Identity box
        fieldset3C.Panel(0).Checkbox("PatientIdentityConfirmedCheckedValue").ClickChecked(true);
      
        // Check the Dose 'Yes' box
       fieldset3C.Panel(2).Checkbox("ConfirmDoseYesCheckedValue").ClickChecked(true);
       
       // Check the selected Missed Doses boxes
       if (wf_missed == false)  
          fieldset3Q.Panel(2).Checkbox("MissedDosesNoCheckedValue").ClickChecked(true);
       if (wf_missed == true)  
          fieldset3Q.Panel(1).Checkbox("MissedDosesYesCheckedValue").ClickChecked(true);
   
        // Check the selected New Medication boxes
       if (wf_meds == false)  
          fieldset3Q.Panel(5).Checkbox("OtherMedicationNoCheckedValue").ClickChecked(true);
       if (wf_meds == true)  
          fieldset3Q.Panel(4).Checkbox("OtherMedicationYesCheckedValue").ClickChecked(true);
 
       // Select the passed-in INR value
       var ws_INR = FloatToString(p_INR);
       Log.Message("INR is " + ws_INR);
       fieldset2.Panel(2).Fieldset("NewINRResultFieldSet").Panel(0).Select("INRSelectValue").ClickItem(ws_INR);
   
       // Click the Go button
       fieldset1.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
       
       // Click the Confirm button in the confirm window
       process_confirm_INR(INRstarV5);

       // Test for Dosing Engine errors
       wf_errors = INRstarV5.NativeWebObject.Find("idStr", "ValidationErrors");
       if (wf_errors.VisibleOnScreen)
       {
          Log.Warning("Dosing Engine Errors");
          form.Fieldset("NewINR").Panel(0).Button("CancelNewINR").Click();
          wf_complete = false;
       }
       else
         {
           // This is where pop-ups can occur
           process_Please_acknowledge(INRstarV5);
           // End of pop-ups

           var panelPTC2 = panelPTC.Panel("PendingTreatmentContent");

           // --------------------- Scenario Specific bit -------------------------------------
           // Override values
           panelPTC2.Panel(0).Button("OverridePendingTreatment").Click();
 
           var formEPT = panelPTC2.Form("EditPendingTreatmentForm");
           var tableOST = formEPT.Table("OverrideSuggestedTreatmentTable");

           // Change the Omits
           tableOST.Cell(1, 2).Select("Treatment_Omits").ClickItem("2 Days");

           // Change the Review
           w_new_review = tableOST.Cell(1, 3).Select("Treatment_Review").SelectedIndex - 1;
           tableOST.Cell(1, 3).Select("Treatment_Review").ClickItem(w_new_review);
               
           // Click OK button
           formEPT.Panel(0).SubmitButton("OverrideAccept").Click();
           //---------------------------------------------------------------------------

           // Test if a schedule exists           
           var wf_no_sched = INRstarV5.NativeWebObject.Find("innerText", "There is no schedule available");
           if (wf_no_sched.Exists)
           {  
               wf_complete = false;
               Log.Message("Clicking Cancel button");
               
               // Record the values produced
               var w_dose = panelPTC2.Table("PendingTreatmentTable").Cell(0, 2).innerText;
               Log.Warning("No Schedule for "+ p_INR+ ", Dose: " + w_dose);
               
               var panelABC = panelPTC2.Panel(0);
               // Click the cancel button
               panelABC.Button("CancelPendingTreatment").Click();
           }
           else
           {
              
               // Now test if a single Schedule has been proposed or we need to choose one
//               wf_no_exact = INRstarV5.NativeWebObject.Find("idStr", "DoseScheduleWarnings_ValidationSummary");
//               if(wf_no_exact.Exists)
               if (panelPTC2.Panel("DosingScheduleContent").Panel("ScheduleGrid").Table("ScheduleSelectorTable").Exists == true)   
               {
                   // Click the top Use button
                   Log.Message("Clicking 1st 'Use' button");
                   panelPTC2.Panel("DosingScheduleContent").Panel("ScheduleGrid").Table("ScheduleSelectorTable").Cell(1, 2).Button("Use").Click();
                   WaitSeconds(1,"");
               }
               else
                   Log.Message("Exact Schedule found");
               

    
               // Click the Accept button
               Log.Message("Clicking 'Accept' button");
               panelPTC2.Panel(0).Button("AcceptPendingTreatment").Click();

//               // Cancel the Appointment window
//               process_make_appointment_cancel(INRstarV5);

                 // Exit Patient Details
                 panelMPC.Panel("PatientIndexHeader").Panel("PatientTab").Link("ExitPatientRecordTab").Click();
           }
       }
     return wf_complete;
//  }
//  catch(exception)
//  {
//    Log.Error("Exception", exception.description);
//  }
}

