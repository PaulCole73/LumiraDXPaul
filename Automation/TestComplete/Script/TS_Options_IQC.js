//USEUNIT Tested_Apps
//USEUNIT TC_Options_IQC
//--------------------------------------------------------------------------------
//Test cases within each suite for Notes
//--------------------------------------------------------------------------------

//Master Suites
//==============================================================================//
//master suites are used for organised test groups
function ts_master_options_iqc(send_mail)
{
  reset_folder();
  
  tc_add_a_new_iqc_result();
  tc_edit_iqc_result();
  tc_delete_iqc_result();
  
  email_and_archive(send_mail, "ts_iqc_master");
}
//==============================================================================//
//regression suites are used for specific regression runs
function ts_int_regression_options_iqc(send_mail)
{
  reset_folder();
  
  tc_add_a_new_iqc_result();
  tc_edit_iqc_result();
  tc_delete_iqc_result();
  
  email_and_archive(send_mail, "ts_iqc_regression");
} 
//==============================================================================//



//==============================================================================//
//General Suites
//==============================================================================//