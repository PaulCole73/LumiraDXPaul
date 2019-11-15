//USEUNIT TC_Login
//USEUNIT Tested_Apps
//--------------------------------------------------------------------------------
//Suite of tests for login
function ts_staging_regression_login_page()
{
  //empty output results folder at start of suite
  reset_folder();

  tc_log_on_to_inrstar_valid_credentials();
  tc_log_on_to_inrstar_no_credentials();
  tc_log_off_inrstar();
 
  //email compressed zip folder on suite completion, archive folder
  email_and_archive("ts_login_page");
}
//--------------------------------------------------------------------------------
  


  //open_application("INRstar");
  //Test cases to be run within the Test Suite
  
  //tc_password_reset_code_email();
  //Probably need a close application here
  //close_application