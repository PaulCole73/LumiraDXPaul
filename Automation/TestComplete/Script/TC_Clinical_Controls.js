//USEUNIT TC_Treatment
//USEUNIT TC_Results

//==============================================================================//
//ET5 External Treatment Management Functionality
function cc_ET5_C1_access_to_external_results_functionality_is_restricted_to_clinical_level_users_and_above() 
{
  //add all tests written to cover the above clinical control
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_coventry_dosing();
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_hillingdon_dosing_uk_only();
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_manual_dosing();
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_tait_dosing();
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_oates_dosing_uk_only()
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_fast_dosing_uk_only();
}
//==============================================================================//
function cc_ET5_C2_duplicated_messages_identified_and_highlighted_in_the_work_list()
{
  //Only done Italy for Instrument
  //Add in HL7 when doing the UK for completeness of the control
  tc_duplicate_status_instrument_result_set_to_duplicate_when_the_exact_same_message_is_sent_twice();
}
//==============================================================================//
function cc_ET5_C8_clinician_is_warned_if_the_date_of_the_inr_test_is_not_the_same_as_the_date_inr_is_sent()
{
  //Only done Instrument
  //Add in HL7 when doing the UK for completeness of the control
  //Engage is maybe possible but not investigated yet cant be db update
  tc_clinician_is_warned_if_the_date_of_the_inr_test_is_not_the_same_as_the_date_inr_is_sent();
}
//==============================================================================//
function cc_ET5_C13_identifiers_used_to_locate_patient_in_inrstar_and_validate_record()
{
  //Only done Italy for Instrument this is not the full set just matches what we would do in a manual world to be satisfied
  //Add in HL7/Engage when doing the UK for completeness of the control
  tc_clinician_is_warned_if_the_date_of_the_inr_test_is_not_the_same_as_the_date_inr_is_sent();
}
//==============================================================================//
function cc_ET5_C14_the_latest_result_will_always_show_in_the_work_list_in_chronological_order()
{
  //Only done Italy for Instrument
  //Add in HL7/Engage when doing the UK for completeness of the control
  tc_inr_test_results_received_from_instrument_most_recent_result_appears_at_bottom_of_table();
}
//==============================================================================//
function cc_ET5_C18_external_results_can_be_archived()
{
  tc_inr_test_results_received_archive_button_archiving_process_can_remove_results_received_by_instrument();
  tc_results_tab_archiving_discard_button_can_archive_results_sent_in_from_instrument();
}
//==============================================================================//
function cc_ET5_C21_external_results_can_be_archived()
{
  tc_inr_test_results_received_archive_button_archiving_process_can_remove_results_received_by_instrument();
  tc_results_tab_discard_button_can_archive_results_sent_in_from_instrument();
}