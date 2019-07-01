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
function release_pre_s5_1()
{
      Step_5_1_1_Add_New_TreatmentPlan(); 
}

//-------------------------------------------------------------------------------
function Step_5_1_1_Add_New_TreatmentPlan()
{
         var INRstarV5 = set_system();
         Goto_Patient_TreatmentPlan_Add();
        
         var w_drug = "W";
         var w_dm = "Manual";
         var w_master_date = aqDateTime.Today();
         var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
         quick_pt_treatmentplan(w_drug, w_dm, w_start_date);

         Goto_Patient_Audit();
         display_top_patient_audit("Add Treatment Plan Details");
         Log.Checkpoint("Test 5.1.1 Add_New_TreatmentPlan - TESTS_PASS");
}
//-------------------------------------------------------------------------------
