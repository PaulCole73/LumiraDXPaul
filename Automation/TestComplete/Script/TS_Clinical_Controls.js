//USEUNIT TC_ET5_Clinical_Controls
//USEUNIT TC_LDx2_Clinical_Controls
//--------------------------------------------------------------------------------
//Suite of tests for all clinical control test
//--------------------------------------------------------------------------------
//Master Suites
//==============================================================================//
//Contains all clinical control tests
function ts_clinical_control_master()
{
  //Top level control parents here
  cs_ET5_external_treatment_management_functionality();
  cs_LDx2_barcode_scanning_error_in_scanning_the_patient_barcode_id();
}
//==============================================================================//
function cs_ET5_external_treatment_management_functionality() //clinical control parent / risk name
{
  //Control descriptions here these will hold a set of tests for the control
  cc_ET5_C1_access_to_external_results_functionality_is_restricted_to_clinical_level_users_and_above();
  cc_ET5_C2_duplicated_messages_identified_and_highlighted_in_the_work_list();
  cc_ET5_C4_patient_identity_is_displayed_on_banner_visible_on_all_patient_specific_screens();
  cc_ET5_C6_Patient_identification_data_displayed_in_work_list(); 
  cc_ET5_C7_mismatched_patients_can_be_processed_manually()
  cc_ET5_C8_clinician_is_warned_if_the_date_of_the_inr_test_is_not_the_same_as_the_date_inr_is_sent();
  cc_ET5_C11a_external_results_importation_disabled_for_patients_with_active_non_VKA_treatment_plans();
  cc_ET5_C12_unmatched_patients_shown_in_external_results_and_clinician_given_options_to_find_archive()
  cc_ET5_C13_identifiers_used_to_locate_patient_in_inrstar_and_validate_record();
  cc_ET5_C14_the_latest_result_will_always_show_in_the_work_list_in_chronological_order();
  cc_ET5_C15_clinician_is_warned_if_the_date_of_the_inr_test_is_not_the_same_as_the_date_inr_is_sent();
  cc_ET5_C18_external_results_can_be_archived();
  cc_ET5_C19_INR_results_can_be_added_manually_in_line_with_existing_functionality()
  cc_ET5_C21_external_results_can_be_archived();
  cc_ET5_C22_external_results_can_be_archived();
}
//==============================================================================//
function cs_LDx2_barcode_scanning_error_in_scanning_the_patient_barcode_id()
{
 //Control descriptions here these will hold a set of tests for the control
 cc_LDx2_C5_patient_identity_is_displayed_on_banner_visible_on_all_patient_specific_screens(); 
 cc_LDx2_C6_patient_identifiers_displayed_in_inrstar_external_results_list();
 cc_LDx2_C18_concurrency_error_displayed_when_demographics_amended_before_saving_the_treatment();
}
//==============================================================================//