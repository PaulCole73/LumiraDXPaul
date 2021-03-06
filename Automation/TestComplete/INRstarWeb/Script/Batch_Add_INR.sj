//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT Navigation

function batch_add_inr(p_INR, w_outfile)
{
//  try
//  {
       WaitSeconds(1,"");
       
       var INRstarV5 = set_system();
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

        // Check the Missed Doses 'No' box
       fieldset3Q.Panel(2).Checkbox("MissedDosesNoCheckedValue").ClickChecked(true);
   
        // Check the New Medication 'No' box
       fieldset3Q.Panel(5).Checkbox("OtherMedicationNoCheckedValue").ClickChecked(true);
 
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

           // Record the dose values
           record_new_values(INRstarV5, p_INR, w_outfile)
       }
     return wf_complete;
//  }
//  catch(exception)
//  {
//    Log.Error("Exception", exception.description);
//  }
}

