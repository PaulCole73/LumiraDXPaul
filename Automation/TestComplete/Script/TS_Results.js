//USEUNIT Tested_Apps
//USEUNIT TC_Results
//--------------------------------------------------------------------------------
//Suite of tests for external results tab
//--------------------------------------------------------------------------------
//Master Suites
//==============================================================================//
//master suites are used for organised test groups

function ts_master_results(send_mail)
{
  reset_folder();
  
  email_and_archive(send_mail, "ts_external_results_master");
}
//==============================================================================//
//General Suites
//==============================================================================//

function ts_results()
{
  tc_duplicate_status_set_to_duplicate_when_the_exact_same_message_is_sent_twice();
}

//==============================================================================//