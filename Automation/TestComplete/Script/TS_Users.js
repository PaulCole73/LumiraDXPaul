//USEUNIT Tested_Apps
//USEUNIT TC_Users
//--------------------------------------------------------------------------------
//Suite of tests for Users staging regression
//--------------------------------------------------------------------------------
function ts_staging_regression_users()
{
  tc_users_add_a_new_user();
  tc_users_manage_user_permissions();
}