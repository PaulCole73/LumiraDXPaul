//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Patient_Tests_Due
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_check_tests_due_tab()
{ 
  try
  {
    var test_title = 'Patient tests due - Check tests due tab'
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'tests_due', 'M', 'Shared'); 
    add_treatment_plan('W','Hillingdon','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");

    var pat_name = get_patient_fullname();
    var results = get_tests_due_patient(pat_name);
  
    results_checker(results, test_title); 
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------