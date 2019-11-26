//USEUNIT TC_Login
//USEUNIT Tested_Apps
//--------------------------------------------------------------------------------
//Suite of tests for login
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
//master suites are used for organised test groups
function ts_master_login_page(send_mail)
{
  reset_folder();

  tc_log_on_to_inrstar_valid_credentials();
  tc_log_on_to_inrstar_no_credentials();
  tc_log_off_inrstar();
 
  email_and_archive(send_mail, "ts_login_master");
}
//--------------------------------------------------------------------------------
//regression suites are used for specific regression runs
function ts_staging_regression_login_page()
{
  reset_folder();

  tc_log_on_to_inrstar_valid_credentials();
  tc_log_on_to_inrstar_no_credentials();
  tc_log_off_inrstar();
 
  email_and_archive(true, "ts_login_regression");
}
//--------------------------------------------------------------------------------



//==============================================================================//
//General Suites
//--------------------------------------------------------------------------------