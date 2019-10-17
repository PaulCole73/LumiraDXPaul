//USEUNIT Tested_Apps
//USEUNIT TC_Users
//--------------------------------------------------------------------------------
//Suite of tests for Users staging regression
//--------------------------------------------------------------------------------
function ts_staging_regression_users()
{
  tc_users_add_a_new_user();
  tc_users_manage_user_permissions();
  tc_users_manage_change_permissions_to_read_only();
  tc_users_reset_user_password();
  tc_users_disable_user();
  tc_users_enable_user();
}