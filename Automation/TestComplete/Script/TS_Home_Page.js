//USEUNIT Tested_Apps
//USEUNIT TC_Home_Page
//USEUNIT TC_Treatment
//--------------------------------------------------------------------------------
//Suite of tests for Home Page
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
//master suites are used for organised test groups
function ts_master_homepage(send_mail)
{
  reset_folder();

  tc_home_page_view_the_overdue_an_inr_test_message_on_the_home_page();
  tc_home_page_view_the_patient_exceeded_their_treatment_end_date_message(); 
  tc_home_page_view_the_exceeded_suspension_period_message(); 

  tc_home_page_view_the_patient_transfer_requests_to_accept_or_decline(); 
  tc_home_page_view_the_patient_transfer_requests_not_yet_accepted_message();
  tc_home_page_view_the_patients_referred_to_you_for_further_action_message(); // has issues in england

  tc_home_page_view_the_patients_with_incomplete_treatment_message(); 
  tc_home_page_view_the_patients_with_no_diagnosis_or_treatment_plan_message(); 
  
  tc_home_page_unsuspend_button_patient_can_be_unsuspended_using_the_home_page_button(); 
  tc_home_page_accept_button_transfer_can_be_accepted_on_home_page(); 
  tc_home_page_decline_button_transfer_can_be_declined_on_home_page(); 
  
  tc_home_page_table_contents_overdue_a_non_wafarin_review_patient_with_a_doac_treatment_plan_but_no_doac_review(); 
  tc_home_page_table_contents_overdue_a_non_wafarin_review_patient_with_a_doac_treatment_plan_with_a_review_and_a_next_review_date_that_is_not_overdue(); 
  tc_home_page_table_contents_overdue_a_non_wafarin_review_patient_with_a_doac_treatment_plan_without_a_review_and_a_next_review_date_that_is_not_overdue();
  
  email_and_archive(send_mail, "ts_homepage_master");
}
//--------------------------------------------------------------------------------
//regression suites are used for specific regression runs
function ts_staging_regression_home_page()
{
  reset_folder();

  tc_home_page_view_the_overdue_an_inr_test_message_on_the_home_page(); 
  tc_home_page_view_the_patient_exceeded_their_treatment_end_date_message(); 
  tc_home_page_view_the_exceeded_suspension_period_message(); 
  tc_home_page_view_the_patient_transfer_requests_to_accept_or_decline(); 
  tc_home_page_view_the_patient_transfer_requests_not_yet_accepted_message(); 
  tc_home_page_view_the_patients_referred_to_you_for_further_action_message(); 
  tc_home_page_view_the_patients_with_incomplete_treatment_message(); 
  tc_home_page_view_the_patients_with_no_diagnosis_or_treatment_plan_message();
  tc_home_page_unsuspend_button_patient_can_be_unsuspended_using_the_home_page_button() 
  tc_home_page_accept_button_transfer_can_be_accepted_on_home_page(); 
  tc_home_page_decline_button_transfer_can_be_declined_on_home_page(); 
  tc_home_page_table_contents_overdue_a_non_wafarin_review_patient_with_a_doac_treatment_plan_but_no_doac_review(); 
  tc_home_page_table_contents_overdue_a_non_wafarin_review_patient_with_a_doac_treatment_plan_with_a_review_and_a_next_review_date_that_is_not_overdue();
  tc_home_page_table_contents_overdue_a_non_wafarin_review_patient_with_a_doac_treatment_plan_without_a_review_and_a_next_review_date_that_is_not_overdue();
  
  email_and_archive(true, "ts_homepage_regression");
} 
//--------------------------------------------------------------------------------



//==============================================================================//
//General Suites
//--------------------------------------------------------------------------------