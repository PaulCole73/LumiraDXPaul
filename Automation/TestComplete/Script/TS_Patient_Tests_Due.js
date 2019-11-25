//USEUNIT Tested_Apps
//USEUNIT TC_Patient_Tests_Due
//--------------------------------------------------------------------------------
//Suite of tests for Patient Tests Due
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
//master suites are used for organised test groups
function ts_master_patient_tests_due(send_mail)
{
  reset_folder();
  
  tc_check_tests_due_tab();
 
  email_and_archive(send_mail, "ts_testdue_master");
}
//--------------------------------------------------------------------------------
//regression suites are used for specific regression runs
function ts_staging_regression_patient_tests_due()
{
  reset_folder();
  
  tc_check_tests_due_tab();
 
  email_and_archive(true, "ts_testdue_regression");
}
//-------------------------------------------------------------------------------



//==============================================================================//
//General Suites
//--------------------------------------------------------------------------------