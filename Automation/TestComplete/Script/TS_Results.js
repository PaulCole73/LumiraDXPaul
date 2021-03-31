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
  //Discard button
  tc_results_tab_discard_button_can_archive_results_sent_in_from_instrument();
  
  //Result status column
  tc_duplicate_status_instrument_result_set_to_duplicate_when_the_exact_same_message_is_sent_twice(); 
  
  //Patient matching - Instrument 
  //Not the full list here yet just enough for clinical risk 
  tc_based_on_patient_id_if_surname_doesnt_match_then_result_should_be_unmatched();
  
  //Patient matching - HL7
  
  //Patient matching -Engage
  
}
//==============================================================================//