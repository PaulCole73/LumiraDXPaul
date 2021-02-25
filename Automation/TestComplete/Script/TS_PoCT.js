//USEUNIT Tested_Apps
//USEUNIT TC_PoCT
//--------------------------------------------------------------------------------
//Suite of tests for PoCT
//--------------------------------------------------------------------------------

//Master Suites
//==============================================================================//
//master suites are used for organised test groups
function ts_master_poct(send_mail)
{
  reset_folder();
  
  tc_add_a_new_poct();
  tc_edit_a_new_poct_batch();
 
  email_and_archive(send_mail, "ts_poct_master");
}
//==============================================================================//
//regression suites are used for specific regression runs
function ts_int_regression_poct(send_mail)
{
  reset_folder();
  
  tc_add_a_new_poct();
  tc_edit_a_new_poct_batch();
 
  email_and_archive(send_mail, "ts_poct_regression");
}
//==============================================================================//



//==============================================================================//
//General Suites
//==============================================================================//