//USEUNIT Tested_Apps
//USEUNIT TC_AD_Login
//--------------------------------------------------------------------------------
//Suite of tests for Admin Dashboard Login
//Master Suites
//--------------------------------------------------------------------------------
function ts_master_admin_dash_login(send_mail)
{
  reset_folder();
  
  tc_login_log_into_admin_dashboard();
  tc_login_log_off_admin_dashboard();
  
  email_and_archive(send_mail, "ts_ad_login_master");
}