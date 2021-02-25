//USEUNIT Get_Functions
//USEUNIT Misc_Functions
//USEUNIT TSA_receive_data_from_iguana
//USEUNIT Tested_Apps
//--------------------------------------------------------------------------------
function tc_all_demographic_fields_populated_full_patient_data_can_be_imported_into_inrstar()
{
  try
  {
    var test_title = 'INRstar API - All demographic fields populated, full patient data can be imported into INRstar';
    
    //Create patient object for what you want to see in inrstar once posted in
    var expected_patient = create_patient_object_for_fiscal();
    expected_patient.nhs_number = get_fiscal_code(expected_patient).replace(/ +/g, "");
    
    //Post in patient data to the API
    var body_data = json_body_recievedatafromiguana(expected_patient); 
    post_ReceiveDataFromIguana(JSON.stringify(body_data)); 
    
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
    var test_name = "tc_all_demographic_fields_populated_full_patient_data_can_be_imported_into_inrstar";
    handle_failed_tests(suite_name, test_name); 
  } 
} 
//--------------------------------------------------------------------------------