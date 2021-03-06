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
function release_pre_s5_0()
{
    Step_5_0_1_Add_New_Patient();
}
//-------------------------------------------------------------------------------
function Step_5_0_1_Add_New_Patient()
{
   log_off();
   log_on_cl3();
   var INRstarV5 = set_system(); 
  
   
   quick_patient_regression();
   Goto_Patient_Audit();
   display_top_patient_audit("Add Patient");
   Log.Checkpoint("Test 5.0.1 Add New Patient - TESTS_PASS");
}
//-------------------------------------------------------------------------------