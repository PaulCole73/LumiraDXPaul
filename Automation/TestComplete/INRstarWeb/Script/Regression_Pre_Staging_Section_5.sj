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
//        Step_5_0_1_Add_New_Patient();
//        Step_5_1_1_Add_New_TreatmentPlan(); 
//        Step_5_2_1_Add_In_Range_INR();
        Step_5_2_2_Manual_Dose_Privilege();
}
//-------------------------------------------------------------------------------
function Step_5_0_1_Add_New_Patient()
{
   
   log_on_cl3();
   WaitSeconds(8);
   
   quick_patient_regression();
   Goto_Patient_Audit();
   display_top_patient_audit("Add Patient");
   Log.Checkpoint("Test 5.0.1 Add New Patient - TESTS_PASS");
}
//-------------------------------------------------------------------------------
function Step_5_1_1_Add_New_TreatmentPlan(INRstarV5)
{
         Goto_Patient_TreatmentPlan_Add();
        
         var w_drug = "W";
         var w_dm = "Manual";
         var w_master_date = aqDateTime.Today();
         var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
         
         quick_pt_treatmentplan(w_drug, w_dm, w_start_date);

         Goto_Patient_Audit();
         display_top_patient_audit("Add Treatment Plan Details");
         Log.Checkpoint("Test 5.1.1 Add New Manual TreatmentPlan - TESTS_PASS");
}
//-------------------------------------------------------------------------------
function Step_5_2_1_Add_In_Range_INR()

{
    Goto_Patient_New_INR();
    adding_new_manual_treatment();
    Goto_Patient_Audit();
    display_top_patient_audit("Add Manual Treatment");
    Log.Checkpoint("Test 5.2.1 Add New Manual Add In Range INR - TESTS_PASS");
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