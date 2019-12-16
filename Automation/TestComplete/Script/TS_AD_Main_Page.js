//USEUNIT Tested_Apps
//USEUNIT TC_AD_Main_Page
//--------------------------------------------------------------------------------
//Suite of tests for Admin Dashboard Main Page

//Master Suites
//--------------------------------------------------------------------------------
function ts_master_admin_dash_main_page(send_mail)
{
  reset_folder();
  
  tc_main_page_todays_date_displayed();
  
  email_and_archive(send_mail, "ts_ad_main_page_master");
}