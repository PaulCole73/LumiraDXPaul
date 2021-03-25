//USEUNIT TC_Treatment

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
  tc_results_tab_archiving_discard_button_can_archive_results_sent_in_from_instrument();
}