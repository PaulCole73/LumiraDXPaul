//USEUNIT Tested_Apps
//USEUNIT Login

//--------------------------------------------------------------------------------

//Suite of tests for login
  
function ts_pre_staging_regression_login_page()

{

  open_application("INRstar");

//Test cases to be run within the Test Suite
  tc_log_on_to_inrstar_valid_credentials();
  tc_log_on_to_inrstar_no_credentials();
  tc_log_off_inrstar();
  tc_password_reset_code_email();
  
//Probably need a close application here
  //close_application

}
//--------------------------------------------------------------------------------