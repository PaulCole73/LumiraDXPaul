//USEUNIT Tested_Apps
//USEUNIT TC_Diagnosis
//--------------------------------------------------------------------------------
//Suite of tests for Diagnosis TCs
//--------------------------------------------------------------------------------

//Master Suites
//==============================================================================//
//master suites are used for organised test groups
function ts_master_diagnosis(send_mail)
{
  reset_folder();
  
  tc_diagnosis_add_new_diagnosis();
  tc_diagnosis_edit_diagnosis();
  tc_diagnosis_delete_diagnosis();
  
  email_and_archive(send_mail, "ts_diagnosis_master");
}
//==============================================================================//
//regression suites are used for specific regression runs
function ts_int_regression_diagnosis(send_mail)
{
  reset_folder();
  
  tc_diagnosis_add_new_diagnosis();
  tc_diagnosis_edit_diagnosis();
  tc_diagnosis_delete_diagnosis();
  
  email_and_archive(send_mail, "ts_diagnosis_regression");
}
//==============================================================================//



//==============================================================================//
//General Suites
//==============================================================================//