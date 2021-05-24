//USEUNIT TC_Results

//==============================================================================//
//LDx1
 
//==============================================================================//
function cc_LDx1_C56_error_when_importing_an_inr_result_into_inrstar() 
{
//  LDx1/C56-INRstar mandatory fields will reflect that of the instrument, so results 
//  sent will always be received with a min result, time and date stamp shown. 
//  The clinician will be able to archive and comment, or find the patient in INRstar 
//  in line with existing functionality to ensure results are not missed.

   tc_patient_column_contains_the_patient_details_for_an_instrument_result();
   tc_patient_result_contains_the_correct_information_for_an_instrument_result();
   tc_unmatched_patient_can_be_manually_matched();
   tc_results_tab_discard_button_can_archive_results_sent_in_from_instrument();
} 
//==============================================================================//
function cc_LDx1_C63_minimum_identifiers_will_be_used_to_reconcile_inr_results_received_and_error_alert_when_failed() 
{
//  LDx1/C63- Minimum identifiers will be used to reconcile INR results received and 
// error alert when failed. To reconcile result to the correct patient in INRstar the 
// following min identifiers will be required to match a patient:

  // We do not cover the checking emails section of the control
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_coventry_dosing();
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_hillingdon_dosing_uk_only();
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_manual_dosing();
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_tait_dosing();
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_oates_dosing_uk_only()
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_fast_dosing_uk_only();
} 
//==============================================================================//