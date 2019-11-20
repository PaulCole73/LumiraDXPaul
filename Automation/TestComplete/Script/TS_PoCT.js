//USEUNIT Tested_Apps
//USEUNIT TC_PoCT
//--------------------------------------------------------------------------------
//Suite of tests for PoCT
//--------------------------------------------------------------------------------
//Suite of tests for PoCT staging regression

function ts_staging_regression_poct()
{
  reset_folder();
  
  tc_add_a_new_poct();
  tc_edit_a_new_poct_batch();
 
  email_and_archive("ts_poct_regression");
}
//--------------------------------------------------------------------------------