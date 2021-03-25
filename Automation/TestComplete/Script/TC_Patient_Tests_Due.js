//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Patient_Tests_Due
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_check_tests_due_tab()
{ 
  try
  {
    var test_title = 'Patient tests due - Check tests due tab'
    login(5, "Shared");
    add_patient('Regression', 'tests_due', 'M'); 
    add_treatment_plan('W','Hillingdon','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");

    var pat_name = get_patient_fullname();
    var results = get_tests_due_patient(pat_name);
  
    results_checker(results, test_title); 
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Tests_Due";
    var test_name = "tc_check_tests_due_tab";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------