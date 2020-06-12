﻿//USEUNIT Tested_Apps
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

//  tc_home_page_view_the_overdue_an_inr_test_message_on_the_home_page(); //done
//  tc_home_page_view_the_patient_exceeded_their_treatment_end_date_message(); //done
//  tc_home_page_view_the_exceeded_suspension_period_message(); //done
//  tc_home_page_view_the_patient_transfer_requests_to_accept_or_decline(); //done
//  tc_home_page_view_the_patient_transfer_requests_not_yet_accepted_message(); done


//  tc_treatment_refer_a_treatment(); //Same test as Home Page - View the 'Patients referred to you for further action' message // replace 

//  tc_home_page_view_patient_with_incomplete_treatment();
//  tc_home_page_view_patient_with_no_diagnosis_or_tp();

//  tc_home_page_unsuspend_button_patient_can_be_unsuspended_using_the_home_page_button() //done

//  tc_home_page_accept_patient_transfer_request(); //do audit check
//  tc_home_page_decline_patient_transfer_request(); //do audit check

//  tc_home_page_view_overdue_non_warfarin_review_with_tp_but_no_review();
//  tc_home_page_view_overdue_non_warfarin_review_with_tp_and_review_not_overdue();
//  tc_home_page_view_overdue_non_warfarin_review_with_tp_and_not_overdue();
  
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
  tc_home_page_view_patient_transfer_request();
  tc_home_page_accept_patient_transfer_request();
  tc_home_page_decline_patient_transfer_request();
  tc_home_page_view_patient_transfer_requests_not_yet_accepted();
  tc_treatment_refer_a_treatment();//Same test as Home Page - View the 'Patients referred to you for further action' message
  tc_home_page_view_patient_with_incomplete_treatment();
  tc_home_page_view_patient_with_no_diagnosis_or_tp();
  tc_home_page_view_overdue_non_warfarin_review_with_tp_but_no_review();
  tc_home_page_view_overdue_non_warfarin_review_with_tp_and_review_not_overdue();
  tc_home_page_view_overdue_non_warfarin_review_with_tp_and_not_overdue();
  
  email_and_archive(true, "ts_homepage_regression");
} 
//--------------------------------------------------------------------------------



//==============================================================================//
//General Suites
//--------------------------------------------------------------------------------