//USEUNIT Tested_Apps
//USEUNIT TC_Results
//--------------------------------------------------------------------------------
//Suite of tests for external results tab
//--------------------------------------------------------------------------------
//Master Suites
//==============================================================================//
//master suites are used for organised test groups
function ts_master_results(send_mail)
{
  reset_folder();
  
  email_and_archive(send_mail, "ts_external_results_master");
}
//==============================================================================//
//General Suites
//==============================================================================//
function ts_results()
{ 
  //Discard button
  tc_results_tab_discard_button_can_archive_results_sent_in_from_instrument();
//  
//  //Result status column
  tc_duplicate_status_instrument_result_set_to_duplicate_when_the_exact_same_message_is_sent_twice(); 
//  
//  //Patient matching - Instrument 
//  //Not the full list here yet just enough for clinical risk 
//  //If the message contains the patientid as the alias
  tc_based_on_patient_id_if_surname_doesnt_match_then_result_should_be_unmatched();
  tc_based_on_patient_id_if_patientid_doesnt_match_then_result_should_be_unmatched();
  tc_based_on_patient_id_if_dob_doesnt_match_then_result_should_be_unmatched();
  
//  //If the message contains the nhs as the alias slightly different rules
  tc_based_on_nhs_or_fiscal_if_surname_doesnt_match_then_result_should_be_matched();
  tc_based_on_nhs_or_fiscal_if_dob_doesnt_match_then_result_should_be_unmatched();
  tc_based_on_nhs_or_fiscal_if_nhs_fiscal_doesnt_match_then_result_should_be_unmatched();
  
  tc_patient_column_contains_the_patient_details_for_an_instrument_result();
  tc_patient_result_contains_the_correct_information_for_an_instrument_result();
  tc_unmatched_patient_can_be_manually_matched();
  tc_error_popup_shown_and_dosing_prevented_for_instrument_result_for_patient_with_an_active_non_VKA_treatment_plan();
  tc_no_patient_found_message_shown_if_unable_to_locate_unmatched_patient_details_after_search();
  
  //Location Matching these tests below cover all location/routing sceanrios known to date - the only thing not checked is whether error emails are genereated
  tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_a_different_but_valid_inrstar_testing_section();
  tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section_when_a_duplicate_patient_exists_elsewhere()
  tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_is_unknown_to_inrstar();
  tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section();
  tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section_where_id_does_not_exist_in_patient_database();
  tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section_where_id_does_not_exist_in_patient_database_and_contains_non_numeric_chars();
  tc_inrstarid_used_as_patient_identifier_results_are_rejected_from_inrstar_if_organizationid_is_unknown_to_inrstar_where_id_does_not_match_a_patient_in_the_database(); //Should also generate an email 
  
  tc_nhs_or_fiscal_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section();
  tc_nhs_or_fiscal_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section_when_a_duplicate_patient_exists_elsewhere();
  tc_nhs_or_fiscal_used_as_patient_identifier_results_are_routed_to_unintended_location_if_organizationid_reflects_a_different_but_valid_inr_testing_Location();
  tc_nhs_or_fiscal_used_as_patient_identifier_results_are_rejected_from_inrstar_if_organizationid_is_unknown_to_inrstar(); //Should also generate an email 
  
    
  //Patient matching - HL7
  //add UK here
  
  //Patient matching -Engage
  //add UK here
}
//==============================================================================//