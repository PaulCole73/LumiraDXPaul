//USEUNIT Tested_Apps
//USEUNIT TC_Treatment
//--------------------------------------------------------------------------------
//Suite of tests for treatments
//--------------------------------------------------------------------------------
//Master Suites
//==============================================================================//
//master suites are used for organised test groups
function ts_master_treatment(send_mail)
{
  reset_folder();
  
  tc_treatment_add_a_historic_treatment();
  tc_treatment_add_a_manual_INR();
  tc_treatment_manual_dosing_permissions();
  tc_treatment_induction_dosing_permissions();
  tc_treatment_add_a_treatment_comment();
  tc_treatment_edit_a_treatment_comment()
  tc_treatment_add_a_new_maintenance_in_range_inr();
  tc_treatment_add_a_historical_treatment_to_an_induction_patient();
  tc_treatment_no_treatment_can_be_added_to_a_patient_on_no_protocol();
  tc_treatment_user_cannot_override_an_induction_result();
  tc_treatment_adding_a_result_earlier_than_last_recorded_result();
  tc_treatment_user_is_unable_to_add_two_treatments_for_the_same_day_when_on_maintenance(); 
  tc_treatment_add_a_new_maintenance_low_inr();
  tc_treatment_add_a_new_maintenance_high_inr(); 
  tc_treatment_out_of_range_maintenance_permissions(); 
  tc_treatment_delete_the_last_treatment();
  tc_treatment_refer_a_treatment(); 
  tc_treatment_authorise_a_referral();
  tc_treatment_dosing_under_12_years_old();
  tc_treatment_add_multiple_historic_treatments();
  tc_treatment_create_maintenance_use_alternate_schedules(); 
  tc_treatment_maintenance_starting_algorithm_for_unstable_patient(); 
  tc_treatment_maintenance_overriding_dose_greater_than_twenty_percent(); 
  tc_treatment_maintenance_save_override_treatment();
  tc_treatment_drag_and_drop_schedule_days();
  tc_treatment_maintenance_INR_more_then_max_review_period();
  tc_treatment_manual_mutliple_historic_summary_check(); //this cannot be done in italy as we do not have the summary tab
  tc_treatment_maintenance_override_privilege();
  tc_treatment_maintenance_cancel_pending();
  tc_treatment_maintenance_add_pending_treatment_with_pending_transfer();
  tc_treatment_add_treatment_for_self_tester(); //this cannot be done in italy
  
  email_and_archive(send_mail, "ts_treatment_master");
}
//==============================================================================//
//regression suites are used for specific regression runs
function ts_int_regression_treatment(send_mail)
{
  reset_folder();
  
  tc_treatment_add_a_historic_treatment();
  tc_treatment_add_a_manual_INR();
  tc_treatment_manual_dosing_permissions();
  tc_treatment_induction_dosing_permissions();
  tc_treatment_add_a_treatment_comment();
  tc_treatment_edit_a_treatment_comment();
  tc_treatment_add_a_new_maintenance_in_range_inr();
  tc_treatment_add_a_historical_treatment_to_an_induction_patient();
  tc_treatment_no_treatment_can_be_added_to_a_patient_on_no_protocol();
  tc_treatment_user_cannot_override_an_induction_result();
  tc_treatment_adding_a_result_earlier_than_last_recorded_result();
  tc_treatment_user_is_unable_to_add_two_treatments_for_the_same_day_when_on_maintenance(); 
  tc_treatment_add_a_new_maintenance_low_inr();
  tc_treatment_add_a_new_maintenance_high_inr(); 
  tc_treatment_out_of_range_maintenance_permissions(); 
  tc_treatment_delete_the_last_treatment();
  tc_treatment_refer_a_treatment(); 
  tc_treatment_authorise_a_referral();
  tc_treatment_dosing_under_12_years_old();
  tc_treatment_add_multiple_historic_treatments();
  tc_treatment_create_maintenance_use_alternate_schedules(); 
  tc_treatment_maintenance_starting_algorithm_for_unstable_patient(); 
  tc_treatment_maintenance_overriding_dose_greater_than_twenty_percent(); 
  tc_treatment_maintenance_save_override_treatment();
  tc_treatment_drag_and_drop_schedule_days();
  tc_treatment_maintenance_INR_more_then_max_review_period();
  tc_treatment_manual_mutliple_historic_summary_check();
  tc_treatment_maintenance_override_privilege();
  tc_treatment_maintenance_cancel_pending();
  tc_treatment_maintenance_add_pending_treatment_with_pending_transfer();
  tc_treatment_add_treatment_for_self_tester(); 
  
  email_and_archive(send_mail, "ts_treatment_regression");
}
//==============================================================================//
function ts_int_regression_treatment_italy(send_mail)
{
  reset_folder();
  
  tc_treatment_add_a_historic_treatment();
  tc_treatment_add_a_manual_INR();
  tc_treatment_manual_dosing_permissions();
  tc_treatment_induction_dosing_permissions();
  tc_treatment_add_a_treatment_comment();
  tc_treatment_edit_a_treatment_comment()
  tc_treatment_add_a_new_maintenance_in_range_inr();
  tc_treatment_add_a_historical_treatment_to_an_induction_patient();
  tc_treatment_no_treatment_can_be_added_to_a_patient_on_no_protocol();
  tc_treatment_user_cannot_override_an_induction_result();
  tc_treatment_adding_a_result_earlier_than_last_recorded_result();
  tc_treatment_user_is_unable_to_add_two_treatments_for_the_same_day_when_on_maintenance(); 
  tc_treatment_add_a_new_maintenance_low_inr();
  tc_treatment_add_a_new_maintenance_high_inr(); 
  tc_treatment_out_of_range_maintenance_permissions(); 
  tc_treatment_delete_the_last_treatment();
  tc_treatment_refer_a_treatment(); 
  tc_treatment_authorise_a_referral();
  tc_treatment_dosing_under_12_years_old();
  tc_treatment_add_multiple_historic_treatments();
  tc_treatment_create_maintenance_use_alternate_schedules(); 
  tc_treatment_maintenance_starting_algorithm_for_unstable_patient(); 
  tc_treatment_maintenance_overriding_dose_greater_than_twenty_percent();
  tc_treatment_maintenance_save_override_treatment();
  tc_treatment_drag_and_drop_schedule_days();
  tc_treatment_maintenance_INR_more_then_max_review_period();
  tc_treatment_maintenance_override_privilege();
  tc_treatment_maintenance_cancel_pending();
  tc_treatment_maintenance_add_pending_treatment_with_pending_transfer();
  
  email_and_archive(send_mail, "ts_treatment_regression_ita");
}
//==============================================================================//
//==============================================================================//
//General Suites
//==============================================================================//
function ts_master_new_inr()
{
  ts_permissions_new_inr_button();
  ts_inr_test_results_received();
  ts_to_be_categorized();
}
//==============================================================================//
function ts_permissions_new_inr_button()
{
  reset_folder();
    
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_coventry_dosing();
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_hillingdon_dosing_uk_only();
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_manual_dosing();
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_tait_dosing();
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_oates_dosing_uk_only();
  tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_fast_dosing_uk_only();
}
//==============================================================================//
function ts_inr_test_results_received()
{
  reset_folder();

  tc_inr_test_results_received_archive_button_archiving_two_results_in_sequence_starting_with_oldest();
  tc_inr_test_results_received_archive_button_archiving_two_results_in_sequence_starting_with_most_recent(); 
  tc_inr_test_results_received_archive_button_archiving_last_result_removes_patient_result_table(); 
  tc_inr_test_results_received_archive_button_archiving_process_can_be_cancelled_if_selected_in_error(); 
  tc_inr_test_results_received_archive_button_archiving_process_can_be_commented_upon();
  tc_inr_test_results_received_archive_button_archiving_process_can_remove_results_received_by_instrument(); 
  tc_inr_test_results_received_archive_button_archived_results_can_be_obtained();
}
//==============================================================================//
function ts_to_be_categorized()
{
  reset_folder();

  tc_inr_test_results_received_from_instrument_match_to_patient(); 
  tc_inr_test_results_received_from_instrument_most_recent_result_appears_at_bottom_of_table();
  tc_inr_test_results_received_from_instrument_matched_to_patient_do_not_appear_if_over_3_days_old();
  tc_inr_test_results_received_from_instrument_matched_to_patient_can_dose_a_manual_patient();
}
//==============================================================================//