//USEUNIT Tested_Apps
//USEUNIT TC_PoCT
//--------------------------------------------------------------------------------
//Suite of tests for PoCT
//--------------------------------------------------------------------------------
//Suite of tests for PoCT staging regression

function ts_staging_regression_poct(send_mail)
{
  reset_folder();
  
  tc_add_a_new_poct();
  tc_edit_a_new_poct_batch();
 
  email_and_archive(send_mail, "ts_poct_regression");
}
//--------------------------------------------------------------------------------