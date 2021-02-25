//USEUNIT Tested_Apps
//USEUNIT TC_Notes
//--------------------------------------------------------------------------------
//Suite of tests for Notes
//--------------------------------------------------------------------------------

//Master Suites
//==============================================================================//
//master suites are used for organised test groups
function ts_master_notes(send_mail)
{
  reset_folder();  

  tc_add_a_new_note();
  
  email_and_archive(send_mail, "ts_note_master");
} 
//==============================================================================//
//regression suites are used for specific regression runs
function ts_int_regression_notes(send_mail)
{
  reset_folder();  

  tc_add_a_new_note();
  
  email_and_archive(send_mail, "ts_note_regression");
} 
//==============================================================================//



//==============================================================================//
//General Suites
//==============================================================================//