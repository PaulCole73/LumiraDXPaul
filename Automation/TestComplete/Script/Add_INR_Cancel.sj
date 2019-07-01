//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Popups
//USEUNIT Navigation

function quick_start()
{
         Goto_Patient_New_INR();
         add_inr_cancel(2.8);
}

function add_inr_cancel(p_INR)
{
//  try
//  {
       WaitSeconds(1,"");
       
       var INRstarV5 = INRstar_base();
       var panelMPC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMPC.Panel("PatientTabContent");
       var form = panelPTC.Form("NewINRForm");
       var fieldset1 = form.Fieldset("NewINR");
       var fieldset2 = fieldset1.Fieldset(0);
       var fieldset3C = fieldset2.Panel(0).Fieldset("NewINRConfirmFieldSet");
       var fieldset3Q = fieldset2.Panel(1).Fieldset("NewINRQuestionFieldSet");
       
       var wf_complete = true;
    
        // Check the Patient Identity box
        fieldset3C.Panel(0).Checkbox("ConfirmPatient").ClickChecked(true);
      
        // Check the Dose 'Yes' box
       fieldset3C.Panel(2).Checkbox("ConfirmDose").ClickChecked(true);

        // Check the Missed Doses 'No' box
       fieldset3Q.Panel(2).Checkbox("MissedDosesNoCheckedValue").ClickChecked(true);
   
        // Check the New Medication 'No' box
       fieldset3Q.Panel(5).Checkbox("OtherMedicationNoCheckedValue").ClickChecked(true);
 
       // Select the passed-in INR value
       var ws_INR = FloatToString(p_INR);
       Log.Message("INR is " + ws_INR);
       fieldset2.Panel(2).Fieldset("NewINRResultFieldSet").Panel(0).Select("INR").ClickItem(ws_INR);
   
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
           var w_letter = INRstarV5.NativeWebObject.Find("innerText", p_lettername);
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
               

               // Click the Cancel button
               Log.Message("Clicking 'Cancel' button");
               panelPTC.Panel("PendingTreatmentContent").Panel(0).Button("CancelPendingTreatment").Click();

               // Cancel 'Confirm Cancel' window
               process_cancel_INR_cancel(INRstarV5);

               // Click the Cancel button
               Log.Message("Clicking 'Cancel' button");
               panelPTC.Panel("PendingTreatmentContent").Panel(0).Button("CancelPendingTreatment").Click();
 
               // Confirm 'Confirm Cancel' window
               process_confirm_INR_cancel(INRstarV5);
           }
       }
     return wf_complete;
//  }
//  catch(exception)
//  {
//    Log.Error("Exception", exception.description);
//  }
}

