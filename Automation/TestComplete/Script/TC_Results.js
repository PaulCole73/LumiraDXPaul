//USEUNIT Get_Functions
//USEUNIT INRstar_Misc_Functions

//--------------------------------------------------------------------------------//
function tc_duplicate_status_set_to_duplicate_when_the_exact_same_message_is_sent_twice()
{
  try
  {
    var test_title = "Results Tab: User Action/Status Column - Duplicate Status, set to duplicate when the exact same message is sent twice"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient_italy();
    
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 1);
    
    //Post in external results twice for duplicate
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    //Prepare result array
//    var result_set = new Array();
    
    //var actual_result = //Need to go to the results tab
    //get_treatment_by_timestamp(inr_test_timestamp.historic_treatments);
    
//    var result_set_1 = compare_values(body_data.resultValue, actual_results.inr, "Checking status on the external result should say duplicate");
//    result_set.push(result_set_1);
//    
//    var result_set_1 = compare_values(inr_test_timestamp.historic_treatments, actual_results.test_date, "Checking INR test_date on historic treatment table Matches incoming results");
//    result_set.push(result_set_1);
//    
//    var results = results_checker_are_true(result_set);
//    results_checker(results, test_title); 
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
//--------------------------------------------------------------------------------