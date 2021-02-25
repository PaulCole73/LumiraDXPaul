//USEUNIT Tested_Apps
//USEUNIT TC_External_Results_HL7
//--------------------------------------------------------------------------------
//Suite of tests for External Results and HL7 messages
//--------------------------------------------------------------------------------

//Master Suites
//==============================================================================//
function ts_master_external_results_hl7(send_mail)
{
  reset_folder();
  
  tc_external_results_hl7_message_todays_date_patient_match();
  tc_external_results_hl7_message_4_days_passed_with_dosing();
  tc_external_results_hl7_message_today_does_not_match_patient();
  tc_external_results_hl7_message_duplicate_entries_different_nhs();
  tc_external_results_hl7_message_duplicate_entries_different_dob();
  tc_external_results_hl7_message_duplicate_entries_bad_nhs();
  tc_external_results_hl7_message_duplicate_entries_bad_dob();
  tc_external_results_hl7_message_duplicate_entries_different_inrs();
  tc_external_results_hl7_message_duplicate_entries_different_times();
  tc_external_results_hl7_message_duplicate_entries_different_dates_same_times();
  tc_external_results_hl7_message_duplicate_entries_no_nhs_same_patientid();
  tc_external_results_hl7_message_single_entry_no_nhs_no();
  
  email_and_archive(send_mail, "ts_external_results_master");
}
//==============================================================================//



//==============================================================================//
//General Suites
//==============================================================================//