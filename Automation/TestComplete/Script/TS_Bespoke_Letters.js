//USEUNIT Tested_Apps
//USEUNIT TC_Bridging
//--------------------------------------------------------------------------------
//Suite of tests for Bespoke Letters
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
function ts_bespoke_letters_master()
{
  reset_folder();
  
  email_and_archive("ts_bespoke_letters_master");
}
//--------------------------------------------------------------------------------
function ts_staging_regression_bespoke_letters()
{
  reset_folder();
  
  tc_bespoke_letters_create_new_letter();
  tc_bespoke_letters_edit_a_letter();
  tc_bespoke_letters_copy_a_letter();
  tc_bespoke_letters_rename_a_letter();
  
  email_and_archive("ts_bespoke_letters_regression");
}
//--------------------------------------------------------------------------------


//General Suites
//--------------------------------------------------------------------------------