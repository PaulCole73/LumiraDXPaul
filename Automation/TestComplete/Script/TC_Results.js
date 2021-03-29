//USEUNIT Get_Functions
//USEUNIT INRstar_Misc_Functions

//--------------------------------------------------------------------------------//
function tc_duplicate_status_set_to_duplicate_when_the_exact_same_message_is_sent_twice()
{
  try
  {
    var test_title = "Results Tab: User Action/Status Column - Duplicate Status, set to duplicate when the exact same message is sent twice"
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient();
    
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 1);
    
    //Post in external results twice for duplicate
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    post_external_result_instrument(JSON.stringify(body_data)); 
     
    var actual_external_result_status = get_external_result_status(inr_test_timestamp.external_results);
    
    var results = compare_values(get_string_translation("Duplicate"), actual_external_result_status, test_title);
    results_checker(results, test_title)
    
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