//USEUNIT Tested_Apps
//USEUNIT TC_MultiTest
//--------------------------------------------------------------------------------
//Suite of tests for adverse events

//Master Suites
//--------------------------------------------------------------------------------
function ts_multitest(send_mail)
{
  reset_folder();
  tc_multi_tests();
  
  email_and_archive(send_mail, "ts_multi_tests");
}
//--------------------------------------------------------------------------------
function ts_multitest_complete(send_mail,new_config_file_name,locale)
{
  reset_folder();
  setup_automation(new_config_file_name,locale);
  tc_multi_tests();
  retest_failed_automation_tests();
  
  email_and_archive(send_mail, "ts_multi_tests");
}
//--------------------------------------------------------------------------------
function ts_staging_regression_multi_tests()
{
  reset_folder();

  tc_multi_tests();
  
  email_and_archive(true, "ts_multi_tests_regression");
}
//General Suites
//--------------------------------------------------------------------------------