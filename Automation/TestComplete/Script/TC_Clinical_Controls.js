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

function cc_ET5_C2_duplicated_messages_identified_and_highlighted_in_the_work_list()
{
  //Only done Italy for Instrument
  //Add in HL7 when doing the UK for completeness of the control
  tc_duplicate_status_set_to_duplicate_when_the_exact_same_message_is_sent_twice();
}