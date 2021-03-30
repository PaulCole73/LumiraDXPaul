//USEUNIT Get_Functions
//USEUNIT TSA_Results
//USEUNIT INRstar_Misc_Functions

//--------------------------------------------------------------------------------//
function tc_duplicate_status_set_to_duplicate_when_the_exact_same_message_is_sent_twice()
{
  try
  {
    var test_title = "Results Tab: User Action/Status Column - Duplicate Status, set to duplicate when the exact same message is sent twice"
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('clinical', 'duplicate', ''); 
    
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 1);
    
    //Post in external results twice for duplicate
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    post_external_result_instrument(JSON.stringify(body_data)); 
     
    var actual_external_result_status = get_external_result_status(inr_test_timestamp.external_results);
    
    var results = compare_values(get_string_translation("Duplicate"), actual_external_result_status, test_title);
    results_checker(results, test_title);
    
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_from_instrument_matched_to_patient_can_dose_a_manual_patient";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_results_tab_archiving_discard_button_can_archive_results_sent_in_from_instrument()
{
  try
  {
    var test_title = "Results Tab: Archiving: Discard Button: Can archive results sent in from Instrument"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', '', 'M');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 1);
    
    //Post in an external result
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    //Get result_data from table
    var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
            
    //Prepare result array
    var result_set = new Array();
    
    //Check latest result data reflects posted in result
    var result_set_1 = compare_values(external_result.inr, get_string_translation(body_data.resultValue), "Checking posted result is present in external results");
    result_set.push(result_set_1);
       
    //Select Archive result and discard with message - store message as comments 
    var comments = archive_test_result(external_result.row, "Message");
    
    //Search for patient
    patient_search(patient.fullname);
    
    //Check the top audit information section includes the comments
    var result_set_1 = validate_more_info_top_patient_audit(comments);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Results";
    var test_name = "tc_results_tab_archiving_discard_button_can_archive_results_sent_in_from_instrument";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_clinician_is_warned_if_the_date_of_the_inr_test_is_not_the_same_as_the_date_inr_is_sent()
{
  try
  {
    var test_title = "Results Tab: Dose Patient: Instrument - Warning dialogue, Clinician is warned if the date of the INR test is not the same as the date INR is sent"
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('clinical' , 'warningInrDate', ''); 
    add_treatment_plan('W','Manual','','Shared','');  
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 25);
    
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload);         
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    var expected_popup_header = get_string_translation("");
    var actual_pop_up_header = get_external_result_popup_header_text(inr_test_timestamp.external_results);   
    Log.Message(actual_pop_up_header)  

    var result_set = new Array();  
   
    result_set_1 = compare_values(expected_popup_header, actual_pop_up_header, "test_title");
    result_set.push(result_set_1);
    
    var expected_historic_button_text = get_string_translation("");
    var actual_historic_button_text = get_external_result_popup_historic_button_text(inr_test_timestamp.external_results);
    Log.Message(actual_historic_button_text) 
    result_set_1 = compare_values(expected_historic_button_text, actual_historic_button_text, "test_title");
    result_set.push(result_set_1);
    
    var expected_historic_button_text = get_string_translation("");
    var actual_historic_button_text = get_external_result_popup_new_inr_button_text(inr_test_timestamp.external_results);
    Log.Message(actual_historic_button_text) 
    result_set_1 = compare_values(expected_new_inr_button_text, actual_new_inr_button_text, "test_title");
    result_set.push(result_set_1);
    
    //Validate the results sets are true
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    
    //Pass in the result
		results_checker(results, test_title); 

//    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_from_instrument_matched_to_patient_can_dose_a_manual_patient";
    handle_failed_tests(suite_name, test_name); 
  } 
}