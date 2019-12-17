//USEUNIT Tested_Apps
//USEUNIT TC_AD_Banner_Message
//--------------------------------------------------------------------------------
//Suite of tests for Admin Dashboard Banner Message

//Master Suites
//--------------------------------------------------------------------------------
function ts_master_admin_dash_banner_message(send_mail)
{
  reset_folder();
  
  tc_banner_message_add_a_banner_message();
  
  email_and_archive(send_mail, "ts_ad_banner_message_master");
}