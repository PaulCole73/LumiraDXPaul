//USEUNIT TC_Treatment
//USEUNIT TC_Results
//USEUNIT TC_Patient_Banner

//==============================================================================//
//ET5 External Treatment Management Functionality
//==============================================================================//
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
function cc_ET5_C4_patient_identity_is_displayed_on_banner_visible_on_all_patient_specific_screens() 
{
   tc_ensure_the_blue_bar_contains_all_patient_data_fields_throughout_each_sub_tab_of_the_patient();
} 
//==============================================================================//
function cc_ET5_C6_Patient_identification_data_displayed_in_work_list()
{
  //Not sure if this control exists for other functionality i.e engage/hl7/rovigo api - If it does then need to add in other patient identifiers
  tc_patient_column_contains_the_patient_details_for_an_instrument_result();
}
//==============================================================================//
function cc_ET5_C7_mismatched_patients_can_be_processed_manually()
{
  //Instrument only
  tc_unmatched_patient_can_be_manually_matched();
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
function cc_ET5_C11a_external_results_importation_disabled_for_patients_with_active_non_VKA_treatment_plans()
{
  //Only done Instrument - Not tested in UK yet but should work
  tc_error_popup_shown_and_dosing_prevented_for_instrument_result_for_patient_with_an_active_non_VKA_treatment_plan();
}
//==============================================================================//
function cc_ET5_C12_unmatched_patients_shown_in_external_results_and_clinician_given_options_to_find_archive()
{
  //Instrument only - Not tested in UK yet but should work
  tc_no_patient_found_message_shown_if_unable_to_locate_unmatched_patient_details_after_search();
}
//==============================================================================//
function cc_ET5_C13_identifiers_used_to_locate_patient_in_inrstar_and_validate_record()
{
  //Only done Italy for Instrument this is not the full set just matches what we would do in a manual world to be satisfied
  //Add in HL7/Engage when doing the UK for completeness of the control
  //If the message contains the patientid as the alias
  tc_based_on_patient_id_if_surname_doesnt_match_then_result_should_be_unmatched();
  tc_based_on_patient_id_if_patientid_doesnt_match_then_result_should_be_unmatched();
  tc_based_on_patient_id_if_dob_doesnt_match_then_result_should_be_unmatched();
  //If the message contains the nhs as the alias slightly different rules
  tc_based_on_nhs_or_fiscal_if_surname_doesnt_match_then_result_should_be_matched();
  tc_based_on_nhs_or_fiscal_if_dob_doesnt_match_then_result_should_be_unmatched();
  tc_based_on_nhs_or_fiscal_if_nhs_fiscal_doesnt_match_then_result_should_be_unmatched();
}
//==============================================================================//
function cc_ET5_C14_the_latest_result_will_always_show_in_the_work_list_in_chronological_order()
{
  //Only done Italy for Instrument
  //Add in HL7/Engage when doing the UK for completeness of the control
  tc_inr_test_results_received_from_instrument_most_recent_result_appears_at_bottom_of_table();
}
//==============================================================================//
function cc_ET5_C15_clinician_is_warned_if_the_date_of_the_inr_test_is_not_the_same_as_the_date_inr_is_sent()
{
  //Only done Instrument
  //Add in HL7 when doing the UK for completeness of the control
  //Engage is maybe possible but not investigated yet cant be db update
  tc_clinician_is_warned_if_the_date_of_the_inr_test_is_not_the_same_as_the_date_inr_is_sent();
}
//==============================================================================//
function cc_ET5_C18_external_results_can_be_archived()
{
  tc_inr_test_results_received_archive_button_archiving_process_can_remove_results_received_by_instrument();
  tc_results_tab_discard_button_can_archive_results_sent_in_from_instrument();
}
//==============================================================================//
function cc_ET5_C19_INR_results_can_be_added_manually_in_line_with_existing_functionality()
{
  tc_treatment_add_a_manual_INR()
}
//==============================================================================//
function cc_ET5_C21_external_results_can_be_archived()
{
  tc_inr_test_results_received_archive_button_archiving_process_can_remove_results_received_by_instrument();
  tc_results_tab_discard_button_can_archive_results_sent_in_from_instrument();
}
//==============================================================================//
function cc_ET5_C22_external_results_can_be_archived()
{
  tc_inr_test_results_received_archive_button_archiving_process_can_remove_results_received_by_instrument();
  tc_results_tab_discard_button_can_archive_results_sent_in_from_instrument();
}