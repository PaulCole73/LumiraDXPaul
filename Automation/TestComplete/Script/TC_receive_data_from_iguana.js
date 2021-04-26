//USEUNIT Get_Functions
//USEUNIT Misc_Functions
//USEUNIT INRstar_Misc_Functions
//USEUNIT TSA_receive_data_from_iguana
//USEUNIT Tested_Apps
//--------------------------------------------------------------------------------
function tc_new_patient_all_demographic_fields_populated_full_patient_data_can_be_imported_into_inrstar()
{
  try
  {
    var test_title = 'INRstar API: New Patient - All demographic fields populated, full patient data can be imported into INRstar';
    
    //Create patient object for what you want to see in inrstar once posted in
    var expected_patient = create_patient_object_for_fiscal();
    //expected_patient.nhs_number = get_fiscal_code(expected_patient).replace(/ +/g, "");
    expected_patient.nhs_number = get_fiscal_code();
    
    //Post in patient data to the API
    var body_data = json_body_recievedatafromiguana(expected_patient); 
    post_receivedatafromiguana(JSON.stringify(body_data)); 
    
    //Validate the patient is in INRstar
    var pat_name = expected_patient.last_name;
    patient_search(pat_name);
    var actual_patient = get_patient_not_altered_details_object_from_demographics();
    
    var results = compare_objects(expected_patient, actual_patient);;
    results_checker(results, test_title);

    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_receive_data_from_iguana";
    var test_name = "tc_new_patient_all_demographic_fields_populated_full_patient_data_can_be_imported_into_inrstar";
    handle_failed_tests(suite_name, test_name); 
  } 
} 
//--------------------------------------------------------------------------------
function tc_new_patient_sex_field_if_sex_field_is_13_chars_then_it_will_not_create_a_patient()
{
  try
  {
    var test_title = 'INRstar API: New Patient - Sex field, if sex field is > 13 chars then it will not create a patient';
    
    //Create patient object for what you want to see in inrstar once posted in
    var expected_patient = create_patient_object_for_fiscal();
    //expected_patient.nhs_number = get_fiscal_code(expected_patient).replace(/ +/g, "");
    expected_patient.nhs_number = get_fiscal_code();
    
    //Post in patient data to the API
    var payload = json_body_recievedatafromiguana(expected_patient); 
    
    //Edit the sex to be > 13 chars
    payload.Sex = "Indeterminated";
    var response_data = post_receivedatafromiguana(JSON.stringify(payload)); 
    
    var result_set = new Array();
    
    //Check response code is 200
    var result_set_1 = (response_data.StatusCode == 200) ? true : false;
    result_set.push(result_set_1);
    
    //Check error code is in the body of the message
    var result_set_1 = (response_data.Text == "\"Error: 400 - Validation(Sex invalid)\"") ? true : false;
    result_set.push(result_set_1);
    
     //Validate the patient is not in INRstar
    var pat_name = expected_patient.last_name;
    var search_results = get_patient_search_results(pat_name);
    var result_set_1 = (search_results==get_string_translation("No patients found")) ? true : false;
    result_set.push(result_set_1);
    
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
    
    //Pass in the result
    results_checker(results, test_title);

    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_receive_data_from_iguana";
    var test_name = "tc_new_patient_sex_field_if_sex_field_is_13_chars_then_it_will_not_create_a_patient";
    handle_failed_tests(suite_name, test_name); 
  } 
} 
//--------------------------------------------------------------------------------
function tc_new_patient_sex_field_if_sex_field_is_not_in_the_correct_casing_then_it_will_not_create_a_patient()
{
  try
  {
    var test_title = 'INRstar API: New Patient - Sex field, if sex field is not in the correct casing then it will not create a patient';
    
    //Create patient object for what you want to see in inrstar once posted in
    var expected_patient = create_patient_object_for_fiscal();
    //expected_patient.nhs_number = get_fiscal_code(expected_patient).replace(/ +/g, "");
    expected_patient.nhs_number = get_fiscal_code();
    
    //Post in patient data to the API
    var payload = json_body_recievedatafromiguana(expected_patient); 
    
    //Edit the sex to be > 13 chars
    payload.Sex = "male";
    var response_data = post_receivedatafromiguana(JSON.stringify(payload)); 
    
    var result_set = new Array();
    
    //Check response code is 200
    var result_set_1 = (response_data.StatusCode == 200) ? true : false;
    result_set.push(result_set_1);
    
    //Check error code is in the body of the message
    var result_set_1 = (response_data.Text == "\"Error: 400 - Validation(Sex invalid)\"") ? true : false;
    result_set.push(result_set_1);
    
     //Validate the patient is not in INRstar
    var pat_name = expected_patient.last_name;
    var search_results = get_patient_search_results(pat_name);
    var result_set_1 = (search_results==get_string_translation("No patients found")) ? true : false;
    result_set.push(result_set_1);
    
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
    
    //Pass in the result
    results_checker(results, test_title);

    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_receive_data_from_iguana";
    var test_name = "tc_new_patient_sex_field_if_sex_field_is_not_in_the_correct_casing_then_it_will_not_create_a_patient";
    handle_failed_tests(suite_name, test_name); 
  } 
} 
//--------------------------------------------------------------------------------
function tc_new_patient_sex_field_if_sex_field_is_not_in_the_list_of_accepted_sex_then_it_will_not_create_patient()
{
  try
  {
    var test_title = 'INRstar API: New Patient - Sex field, if sex field is not in the correct casing then it will not create a patient';
    
    //Create patient object for what you want to see in inrstar once posted in
    var expected_patient = create_patient_object_for_fiscal();
    //expected_patient.nhs_number = get_fiscal_code(expected_patient).replace(/ +/g, "");
    expected_patient.nhs_number = get_fiscal_code();
    
    //Post in patient data to the API
    var payload = json_body_recievedatafromiguana(expected_patient); 
    
    //Edit the sex to be > 13 chars
    payload.Sex = "Unknown";
    var response_data = post_receivedatafromiguana(JSON.stringify(payload)); 
    
    var result_set = new Array();
    
    //Check response code is 200
    var result_set_1 = (response_data.StatusCode == 200) ? true : false;
    result_set.push(result_set_1);
    
    //Check error code is in the body of the message
    var result_set_1 = (response_data.Text == "\"Error: 400 - Validation(Sex invalid)\"") ? true : false;
    result_set.push(result_set_1);
    
     //Validate the patient is not in INRstar
    var pat_name = expected_patient.last_name;
    var search_results = get_patient_search_results(pat_name);
    var result_set_1 = (search_results==get_string_translation("No patients found")) ? true : false;
    result_set.push(result_set_1);
    
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
    
    //Pass in the result
    results_checker(results, test_title);

    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_receive_data_from_iguana";
    var test_name = "new_patient_sex_field_if_sex_field_is_not_in_the_list_of_accepted_sex_then_it_will_not_create_patient";
    handle_failed_tests(suite_name, test_name); 
  } 
} 