//USEUNIT Test_New_Patient
//USEUNIT Test_Edit_Demographics
//USEUNIT Navigation
//USEUNIT Quick_Patient
//USEUNIT Add_INR_Manual
//USEUNIT Home_Page_Regression_Quick_Checking
//USEUNIT V5_Common

//===============================================================================
// Section  5.0
//===============================================================================
function release_pre_s5()
{
        Step_5_2_2_Manual_Dose_Privilege();
}
//-------------------------------------------------------------------------------
function Step_5_2_2_Manual_Dose_Privilege()

{
    Log_Off();
    log_on_cl2();
    Goto_Recently_Viewed()
    preset_Fetch_Patient_Recent();
    
   var INRstarV5 = set_system(); 
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPR = panelMCP.Panel("PatientRecord");
   var panelPTC = panelPR.Panel("PatientMainTabContent").Panel("PatientTabContent");
   var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
   var Button = panelPTW.Panel("PatientPendingTreatment").Panel("TreatmentButtonsContainer").Fieldset("TreatmentButtons").Button("NewINR");
    
  if (Button.className == "Button disabled")
  {
   Log.Checkpoint("Test 5.2.2 Manual_Dose_Privilege - TESTS_PASS");
  }
    else 
      {
      Log.Warning("NEW INR Button should have been disabled");      
      }
}