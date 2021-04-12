//USEUNIT Get_Functions
//USEUNIT TSA_Results
//USEUNIT INRstar_Misc_Functions

//--------------------------------------------------------------------------------//
function tc_duplicate_status_instrument_result_set_to_duplicate_when_the_exact_same_message_is_sent_twice()
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
    var suite_name = "TC_Results";
    var test_name = "tc_duplicate_status_instrument_result_set_to_duplicate_when_the_exact_same_message_is_sent_twice";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_results_tab_discard_button_can_archive_results_sent_in_from_instrument()
{
  try
  {
    var test_title = "Results Tab: Discard Button - Can archive results sent in from Instrument"
    
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
    var test_name = "tc_results_tab_discard_button_can_archive_results_sent_in_from_instrument";
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
    
    var expected_popup_header = get_string_translation("This INR test was not performed today");
    var actual_pop_up_header = get_external_result_popup_header_text(inr_test_timestamp.external_results);   

    var result_set = new Array();  
   
    result_set_1 = compare_values(expected_popup_header, actual_pop_up_header, "test_title");
    result_set.push(result_set_1);
    
    var expected_historic_button_text = get_string_translation("Enter as historical treatment");
    var actual_historic_button_text = get_external_result_popup_historic_button_text(inr_test_timestamp.external_results);
    
    result_set_1 = compare_values(expected_historic_button_text, actual_historic_button_text, "test_title");
    result_set.push(result_set_1);
    
    var expected_new_inr_button_text = get_string_translation("Enter as valid INR result");
    var actual_new_inr_button_text = get_external_result_popup_new_inr_button_text(inr_test_timestamp.external_results);

    result_set_1 = compare_values(expected_new_inr_button_text, actual_new_inr_button_text, "test_title");
    result_set.push(result_set_1);
    
    //Validate the results sets are true
    var results = results_checker_are_true(result_set);
    
    //Pass in the result
		results_checker(results, test_title); 

    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Results";
    var test_name = "tc_clinician_is_warned_if_the_date_of_the_inr_test_is_not_the_same_as_the_date_inr_is_sent";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_based_on_patient_id_if_surname_doesnt_match_then_result_should_be_unmatched()
{
  try
  {
    var test_title = "Instrument: Patient Matching - Based on Patient Id, if surname doesn't match then result should be unmatched"
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('clinical' , 'surnameUnmatched','M', ' '); 
    add_treatment_plan('W','Manual','','Shared','');  

    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 25);
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload);  
    body_data.patient.lastName = "fakeSurname";  
    body_data.patient.identifiers[0].alias = patient.patientid;
    post_external_result_instrument(JSON.stringify(body_data)); 

    var actual_external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
    
    var results = compare_values(get_string_translation("Find Patient"), actual_external_result.status_column_value1, test_title);
    results_checker(results, test_title);

    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Results";
    var test_name = "tc_based_on_patient_id_if_surname_doesnt_match_then_result_should_be_unmatched";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_based_on_patient_id_if_patientid_doesnt_match_then_result_should_be_unmatched()
{
  try
  {
    var test_title = "Instrument: Patient Matching - Based on Patient Id, if patient id doesn't match then result should be unmatched"
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('clinical' , 'patIdUnmatched','M', ' '); 
    add_treatment_plan('W','Manual','','Shared','');  

    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 25);
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload);  
    body_data.patient.identifiers[0].alias = "cheese12345";   
    post_external_result_instrument(JSON.stringify(body_data)); 

    var actual_external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
    
    var results = compare_values(get_string_translation("Find Patient"), actual_external_result.status_column_value1, test_title);
    results_checker(results, test_title);

    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Results";
    var test_name = "tc_based_on_patient_id_if_patientid_doesnt_match_then_result_should_be_unmatched";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_based_on_patient_id_if_dob_doesnt_match_then_result_should_be_unmatched()
{
  try
  {
    var test_title = "Instrument: Patient Matching - Based on Patient Id, if dob doesn't match then result should be unmatched"
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('clinical' , 'dobUnmatched','M', ' '); 
    add_treatment_plan('W','Manual','','Shared','');  

    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 25);
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload);  
    body_data.patient.identifiers[0].alias = patient.patientid;
    body_data.patient.dob = get_date_with_days_from_today_dd_mmm_yyyy(-7400);   //This has to be set differently to the one in create_patient_object_for_fiscal 
    post_external_result_instrument(JSON.stringify(body_data)); 

    var actual_external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
    
    var results = compare_values(get_string_translation("Find Patient"), actual_external_result.status_column_value1, test_title);
    results_checker(results, test_title);

    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Results";
    var test_name = "tc_based_on_patient_id_if_dob_doesnt_match_then_result_should_be_unmatched";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_based_on_nhs_or_fiscal_if_surname_doesnt_match_then_result_should_be_matched()
{
  try
  {
    var test_title = "Instrument: Patient Matching - Based on NHS/Fiscal, if surname doesn't match then result should be matched"
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('clinical' , 'surnameMatch', 'M'); 
    add_treatment_plan('W','Manual','','Shared','');  

    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 25);
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload);  
    body_data.patient.lastName = "fakeSurname";      
    post_external_result_instrument(JSON.stringify(body_data)); 

    var actual_external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
    
    var results = compare_values(get_string_translation("Dose Patient"), actual_external_result.status_column_value1, test_title);
    results_checker(results, test_title);

    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Results";
    var test_name = "tc_based_on_nhs_or_fiscal_if_surname_doesnt_match_then_result_should_be_matched";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_based_on_nhs_or_fiscal_if_dob_doesnt_match_then_result_should_be_unmatched()
{
  try
  {
    var test_title = "Instrument: Patient Matching - Based on NHS/Fiscal, if dob doesn't match then result should be unmatched"
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('clinical' , 'dobUnMatched', 'M'); 
    add_treatment_plan('W','Manual','','Shared','');  

    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 25);
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload);  
    body_data.patient.dob = get_date_with_days_from_today_dd_mmm_yyyy(-7400);   //This has to be set differently to the one in create_patient_object_for_fiscal       
    post_external_result_instrument(JSON.stringify(body_data)); 

    var actual_external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
    
    var results = compare_values(get_string_translation("Find Patient"), actual_external_result.status_column_value1, test_title);
    results_checker(results, test_title);

    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Results";
    var test_name = "tc_based_on_nhs_or_fiscal_if_dob_doesnt_match_then_result_should_be_matched";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_based_on_nhs_or_fiscal_if_nhs_fiscal_doesnt_match_then_result_should_be_unmatched()
{
  try
  {
    var test_title = "Instrument: Patient Matching - Based on NHS/Fiscal, if nhs/fiscal doesn't match then result should be unmatched"
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('clinical' , 'nhsFisUnmatched', 'M'); 
    add_treatment_plan('W','Manual','','Shared','');  

    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 25);
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload);  
    body_data.patient.identifiers[0].alias = "cheese12345";      
    post_external_result_instrument(JSON.stringify(body_data)); 

    var actual_external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
    
    var results = compare_values(get_string_translation("Find Patient"), actual_external_result.status_column_value1, test_title);
    results_checker(results, test_title);

    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Results";
    var test_name = "tc_based_on_nhs_or_fiscal_if_nhs_fiscal_doesnt_match_then_result_should_be_unmatched";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_patient_column_contains_the_patient_details_provided_by_instrument()
{
  try
  {
    var test_title = "Results Tab: Patient Column - Patient column contains the patients details provided by the instrument"
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('clinical' , '', 'M');  
    
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 25);
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload);       
    post_external_result_instrument(JSON.stringify(body_data)); 
    var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
    
    //Prepare result array
    var result_set = new Array();
    
    var result_set_1 = compare_values(external_result.patient_name, patient.fullname, "Checking patient name is in external result row");
    result_set.push(result_set_1);
    
    var result_set_1 = compare_values(external_result.patient_dob, patient.dob, "Checking patient dob is in external result row");
    result_set.push(result_set_1);
    
    var result_set_1 = compare_values(external_result.patient_nhs_fiscal, patient.nhs_number, "Checking patient name is in external result row");
    result_set.push(result_set_1);
    
    //Post another message that will not match the patient in order to see Nessuno, if the software matches a patient then it will add the fiscal so it must be unmacthed
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 25);
    var body_data = json_body_data_instrument(patient, location_id, "2.4", inr_test_timestamp.csp_payload);
    body_data.patient.identifiers[0].alias = "";        
    post_external_result_instrument(JSON.stringify(body_data)); 
    var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
    
    var result_set_1 = compare_values(external_result.patient_nhs_fiscal, get_string_translation("None"), "Checking nhs/fiscal set to None/Nessuno");
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
    var test_name = "tc_patient_column_contains_the_patient_details_provided_by_instrument";
    handle_failed_tests(suite_name, test_name); 
  } 
}