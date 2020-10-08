//USEUNIT Tested_Apps
//USEUNIT TC_Home_Page
//USEUNIT TC_Treatment
//USEUNIT TC_External_Results_CSP
//--------------------------------------------------------------------------------
//Suite of tests for Home Page
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
//master suites are used for organised test groups
function ts_external_results_csp(send_mail)
{
  reset_folder();
  tc_external_results_from_csp_match_to_patient();
  tc_external_results_from_csp_most_recent_result_appears_at_bottom_of_table();
//  tc_external_results_from_csp_matched_to_patient_do_not_appear_if_over_3_days_old();
//  tc_external_results_from_csp_can_dose_a_manual_patient();

//  tc_external_results_from_csp_archiving_last_result_removes_patient_result_table();
  tc_external_results_from_csp_archiving_two_results_in_sequence_starting_with_oldest();
  tc_external_results_from_csp_archiving_two_results_in_sequence_starting_with_most_recent();
  tc_external_results_from_csp_archiving_process_can_be_cancelled_if_selected_in_error();
//  tc_external_results_from_csp_archiving_process_can_be_commented_upon();
//  tc_external_results_from_csp_archived_results_can_be_obtained();
  tc_external_results_from_csp_archiving_results_from_external_results_tab_is_possible();
  
  //email_and_archive(send_mail, "ts_homepage_master");
}
//--------------------------------------------------------------------------------
//regression suites are used for specific regression runs
function ts_staging_regression_external_results_csp()
{
  reset_folder();

  tc_external_results_from_csp_match_to_patient();
  tc_external_results_from_csp_most_recent_result_appears_at_bottom_of_table();
  tc_external_results_from_csp_can_dose_a_manual_patient();

  //email_and_archive(true, "ts_homepage_regression");
} 
//--------------------------------------------------------------------------------
