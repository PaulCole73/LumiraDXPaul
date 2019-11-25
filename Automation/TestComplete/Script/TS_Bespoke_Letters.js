//USEUNIT Tested_Apps
//USEUNIT TC_Bespoke_Letters
//--------------------------------------------------------------------------------
//Suite of tests for Bespoke Letters
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
function ts_master_bespoke_letters(send_mail)
{
  reset_folder();
  
  tc_bespoke_letters_create_new_letter();
  tc_bespoke_letters_edit_a_letter();
  tc_bespoke_letters_copy_a_letter();
  tc_bespoke_letters_rename_a_letter();
  
  email_and_archive(send_mail, "ts_bespoke_letters_master");
}
//--------------------------------------------------------------------------------
function ts_staging_regression_bespoke_letters()
{
  reset_folder();
  
  tc_bespoke_letters_create_new_letter();
  tc_bespoke_letters_edit_a_letter();
  tc_bespoke_letters_copy_a_letter();
  tc_bespoke_letters_rename_a_letter();
  
  email_and_archive(true, "ts_bespoke_letters_regression");
}
//--------------------------------------------------------------------------------



//General Suites
//--------------------------------------------------------------------------------