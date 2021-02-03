//USEUNIT Tested_Apps
//USEUNIT TC_Loc_Management_Users
//--------------------------------------------------------------------------------
//Suite of tests for Users integration regression
//--------------------------------------------------------------------------------

//Master Suites
//==============================================================================//
//master suites are used for organised test groups
function ts_master_loc_management_users(send_mail)
{
  reset_folder();

  tc_users_add_a_new_user();
  tc_users_manage_user_permissions();
  tc_users_manage_change_permissions_to_read_only();
  tc_users_reset_user_password();
  tc_users_disable_user();
  tc_users_enable_user();
  
  email_and_archive(send_mail, "ts_users_master");
}
//==============================================================================//
function ts_int_regression_location_management_users(send_mail)
{
  reset_folder();

  tc_users_add_a_new_user();
  tc_users_manage_user_permissions();
  tc_users_manage_change_permissions_to_read_only();
  tc_users_reset_user_password();
  tc_users_disable_user();
  tc_users_enable_user();
  
  email_and_archive(send_mail, "ts_users_regression");
}
//==============================================================================//



//==============================================================================//
//General Suites
//==============================================================================//