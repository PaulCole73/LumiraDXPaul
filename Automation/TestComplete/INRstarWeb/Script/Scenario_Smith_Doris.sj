//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Presets
//USEUNIT Navigation
//USEUNIT Delete_Treatments
//USEUNIT Quick_Patient

//=====================================================================================
//
// Scenario for Doris Smith
//
// On time, not missed any dose, no meds, INR of 1.8
//
// Find patient via NHS number
// Enter INR
// Add comment
// Save
// Add appointment 
//=====================================================================================


function scenario_smith_doris()
{
 var w_name = "6271072860";
 var w_inr = 2.5;
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
       //                  Day             Month   Year   Target INR     Dose   Review
       quick_pt_historical(find_day(-14), "Oct", "2010", "2.5", "2.4", "4.3", "14 Days", "");
//---------------------------------------------------------
       Goto_Patient_New_INR();
       
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
           // --------------------- New page -------------------------------------
           // This is where pop-ups can occur
           process_Please_acknowledge(INRstarV5);
           // End of pop-ups

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
              
               var panel2 = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Panel("PendingTreatmentContent");
   
               // Now test if a single Schedule has been proposed or we need to choose one
               wf_no_exact = INRstarV5.NativeWebObject.Find("idStr", "DoseScheduleWarnings_ValidationSummary");
               if(wf_no_exact.Exists)
               {
                   // Click the top Use button
                   Log.Message("Clicking 1st 'Use' button");
                   panelPTC.Panel("PendingTreatmentContent").Panel("DosingScheduleContent").Panel("ScheduleGrid").Table("ScheduleSelectorTable").Cell(1, 2).Button("Use").Click();
                   WaitSeconds(1,"");
               }
               else
                   Log.Message("Exact Schedule found");
               

               // Click the Accept button
               Log.Message("Clicking 'Accept' button");
               panelPTC.Panel("PendingTreatmentContent").Panel(0).Button("AcceptPendingTreatment").Click();

//               // Make the Appointment
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

