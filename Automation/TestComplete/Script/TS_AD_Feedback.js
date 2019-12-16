//USEUNIT Tested_Apps
//USEUNIT TC_AD_Feedback
//--------------------------------------------------------------------------------
//Suite of tests for Admin Dashboard Feedback

//Master Suites
//--------------------------------------------------------------------------------
function ts_master_admin_dash_feedback(send_mail)
{
  reset_folder();
  
  tc_feedback_add_new_feedback();
  
  email_and_archive(send_mail, "ts_ad_feedback_master");
}