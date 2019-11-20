//USEUNIT Tested_Apps
//USEUNIT TC_Patient_Tests_Due
//--------------------------------------------------------------------------------
//Suite of tests for Patient Tests Due
//--------------------------------------------------------------------------------
//Suite of tests for Patient Tests Due

function ts_staging_regression_patient_tests_due()
{
  reset_folder();
  
  tc_check_tests_due_tab();
 
  email_and_archive("ts_testdue_regression");
}
//-------------------------------------------------------------------------------