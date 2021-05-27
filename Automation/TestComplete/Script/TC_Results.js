//USEUNIT Get_Functions
//USEUNIT TSA_Results
//USEUNIT INRstar_Misc_Functions
//USEUNIT TC_Patient_Banner
//USEUNIT INRstar_Patient_Insertion

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
    body_data.patient.dob = convert_date_format(get_date_with_days_from_today_dd_mm_yyyy(-7400), "numeric", "%d-%b-%Y");   //This has to be set differently to the one in create_patient_object_for_fiscal 
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
    body_data.patient.dob = convert_date_format(get_date_with_days_from_today_dd_mm_yyyy(-7400), "numeric", "%d-%b-%Y");   //This has to be set differently to the one in create_patient_object_for_fiscal       
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
function tc_patient_column_contains_the_patient_details_for_an_instrument_result()
{
  try
  {
    var test_title = "Results Tab: Patient Column - Patient column contains the patients details for an instrument result"
    var result_set = new Array();  
    var patient = insert_patient(); 
    
    login(7, "Shared");

    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 25);
    var body_data = json_body_data_instrument(patient, patient.LocationID, "2.2", inr_test_timestamp.csp_payload);       
    post_external_result_instrument(JSON.stringify(body_data)); 
    var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);

    var result_set_1 = compare_values(external_result.patient_name, patient.fullname, "Checking patient name is in external result row");
    result_set.push(result_set_1);
    
    var result_set_1 = compare_values(external_result.patient_dob, patient.born, "Checking patient dob is in external result row");
    result_set.push(result_set_1);
    
    //Post another message that will not match the patient in order to see Nessuno, if the software matches a patient then it will add the fiscal so it must be unmacthed
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 24);
    var body_data = json_body_data_instrument(patient, patient.LocationID, "2.4", inr_test_timestamp.csp_payload);
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
    var test_name = "tc_patient_column_contains_the_patient_details_for_an_instrument_result";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_patient_result_contains_the_correct_information_for_an_instrument_result()
{
  try
  {
    var test_title = "Results Tab: Patient Column - Patient result entry contains the correct details for an instrument result"
    var result_set = new Array();  
    var patient = insert_patient(); 
    
    login(7, "Shared");

    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 25);
    var body_data = json_body_data_instrument(patient, patient.LocationID, "2.2", inr_test_timestamp.csp_payload);       
    post_external_result_instrument(JSON.stringify(body_data)); 
    var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
    
    var result_set_1 = compare_values(external_result.inr, "2.2", "Checking patient INR is correct");
    result_set.push(result_set_1);
    
    var result_set_1 = compare_values(external_result.blood_taken_timestamp, inr_test_timestamp.external_results, "Checking patient blood taken timestamp is correct");
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
    var test_name = "tc_patient_column_contains_the_patient_details_for_an_instrument_result";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_unmatched_patient_can_be_manually_matched()
{
  try
  {
    var test_title = "Results Tab: Unmatched patient can be manually matched"
    var result_set = new Array();  
    var patient = insert_patient(); 
    
    login(7, "Shared");    
 
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 2);

    //Post and Locate posted result
    var body_data = json_body_data_instrument(patient, patient.LocationID, "2.6", inr_test_timestamp.csp_payload);   
    body_data.patient.lastName = "Unmatched Surname";
    body_data.patient.dob = "15-04-1988";
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    var mismatched_external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
      
    //Check the Find patient button is displayed for the result - this also proves patient is unmatched
    var result_set_1 = compare_values(get_string_translation("Find Patient"), mismatched_external_result.status_column_value1, test_title);
    result_set.push(result_set_1);
    
    //Check the Archive button is displayed for the result
    var result_set_1 = compare_values(get_string_translation("Archive"), mismatched_external_result.status_column_value2, test_title);
    result_set.push(result_set_1);
    
    //Select find patient against the result
    click_external_result_by_timestamp(inr_test_timestamp.external_results, "Find");
    
    //Search for the patient
    patient_search_for_unmatched_result(patient.fullname);
    
    //Select dose patient button
    click_external_result_by_timestamp(inr_test_timestamp.external_results, "Patient_link");
    
    //Check the patient name in the banner matches the intended/matched patient
    var patient_shown_in_banner = inrstar_get_patient_details_object_from_bluebar();
    var result_set_1 = compare_values(patient_shown_in_banner.patientid, patient.INRstarID, test_title);
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
    var test_name = "tc_unmatched_patient_can_be_manually_matched";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_error_popup_shown_and_dosing_prevented_for_instrument_result_for_patient_with_an_active_non_VKA_treatment_plan()
{
  try
  {
    var test_title = "Results Tab: Dose Patient: Instrument - Error Popup shown and dosing prevented for patient with an active non VKA treatment plan"
    login(7, "Shared");
    var result_set = new Array();  
    var location_id = get_organization_id_from_current_location();
    add_patient('clinical' , 'nonVKAtreatment', ''); 
    add_treatment_plan('Apixaban','',aqConvert.StrToDate(aqDateTime.Today()),'Shared','','52 Weeks')
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 25);
    
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload);         
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    var expected_popup_header = get_string_translation("Error: Currently unable to dose patient");
    
    //Perform test for Apixaban
    var actual_pop_up_header = get_external_result_popup_header_text(inr_test_timestamp.external_results);   
    result_set_1 = compare_values(expected_popup_header, actual_pop_up_header, test_title);
    result_set.push(result_set_1);
    
    //Perform test for five other drugs
    const drugs_to_check = ["Dabigatran","Dalteparin (LMWH)","Edoxaban","Enoxaparin (LMWH)","Rivaroxaban"];
    
    for (const element of drugs_to_check) 
    {
      click_external_result_by_timestamp(inr_test_timestamp.external_results, "Patient_link");
      edit_treatment_plan_drug(get_string_translation(element));
      actual_pop_up_header = get_external_result_popup_header_text(inr_test_timestamp.external_results);   
      result_set_1 = compare_values(expected_popup_header, actual_pop_up_header, test_title);
      result_set.push(result_set_1);
    }

    if (language != 'Italian')
    {
      //Only perform test for acenocoumarol if not in italy
      click_external_result_by_timestamp(inr_test_timestamp.external_results, "Patient_link");
      edit_treatment_plan_drug('Acenocoumarol');
      actual_pop_up_header = get_external_result_popup_header_text(inr_test_timestamp.external_results);   
      result_set_1 = compare_values(expected_popup_header, actual_pop_up_header, test_title);
      result_set.push(result_set_1);
    }
    
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
    var test_name = "tc_error_popup_shown_and_dosing_prevented_for_instrument_result_for_patient_with_an_active_non_VKA_treatment_plan";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_no_patient_found_message_shown_if_unable_to_locate_unmatched_patient_details_after_search()
{
  try
  {
    var test_title = "Results Tab: Find Patient: No patient found message shown if unable to locate unmatched patient details after search"
    login(7, "Shared");
    var result_set = new Array();  
    var location_id = get_organization_id_from_current_location();
    var patient = create_patient_object_for_fiscal();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 2);

    //Post and Locate posted result
    var body_data = json_body_data_instrument(patient, location_id, "2.6", inr_test_timestamp.csp_payload);         
    post_external_result_instrument(JSON.stringify(body_data)); 
    var mismatched_external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
      
    //Check the Find patient button is displayed for the result - this also proves patient is unmatched
    var result_set_1 = compare_values(get_string_translation("Find Patient"), mismatched_external_result.status_column_value1, test_title);
    result_set.push(result_set_1);
    
    //Check the Archive button is displayed for the result - part of the clinical control
    var result_set_1 = compare_values(get_string_translation("Archive"), mismatched_external_result.status_column_value2, test_title);
    result_set.push(result_set_1);
    
    //Select find patient against the result
    click_external_result_by_timestamp(inr_test_timestamp.external_results, "Find");
    
    //Search for a random patient should return no patient found 
    var patient_search_result = patient_search_for_unmatched_result("A random persons name that will not be found");
    
    //Check to ensure displayed text is 'no patient found'
    var result_set_1 = compare_values(patient_search_result, get_string_translation("No patients found"), test_title);
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
    var test_name = "tc_no_patient_found_message_shown_if_unable_to_locate_unmatched_patient_details_after_search";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_a_different_but_valid_inrstar_testing_section()
{
  try
  {
    var test_title = "Instrument: Location Matching: INRstarID used as patient identifier, results are routed to intended location if organizationID reflects a different but valid INRstar testing section"
    
    //Login to OTHER location in order to extract UUID of location
    login_under_the_hood("other location");
    var other_location_id = get_locationid();
    
    //Insert patient into usual location
    var patient = insert_patient(); 
    var result_set = new Array();  
    
    login(7, "Shared");
       
      //Get timestamp
      var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 2);

      //Post and Locate posted result
      var body_data = json_body_data_instrument(patient, other_location_id, "2.6", inr_test_timestamp.csp_payload);     
      body_data.patient.identifiers[0].alias = patient.INRstarID;    
      post_external_result_instrument(JSON.stringify(body_data)); 
      var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
      
      //Check the result is present and shows the NHS/Fiscal number that was sent in
      var result_set_1 = compare_values(patient.nhs_number, external_result.patient_nhs_fiscal, test_title);
      result_set.push(result_set_1);
    
    Log_Off();
    
    login(17, "Shared");
    
      var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
    
      //Check the result is NOT present in the OTHER location
      var result_set_1 = results_checker_is_false(external_result.row)
      result_set.push(result_set_1);
    
      //Validate the results sets are true - Pass in the result
      var results = results_checker_are_true(result_set);
  		results_checker(results, test_title); 

    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Results";
    var test_name = "tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_a_different_but_valid_inrstar_testing_section";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//-----------------------------------------------------------------------------------------------------
function tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section_when_a_duplicate_patient_exists_elsewhere()
{
  try
  {
    var test_title = "Instrument: Location Matching: INRstarID used as patient identifier, results are routed to intended location if organizationID reflects patients testing section - when a duplicate patient exists elsewhere";
    var generated_patient = patient_generator();
    var result_set = new Array();
    
    //Add our generated_patient in another location
    var patient_overides = {location:"other"};
    var patient_for_other_location = insert_patient(patient_overides, generated_patient); 
    
    //Add the generated_patient in the usual location
    var patient_for_default_location = insert_patient('', generated_patient)

    //Get timestamp post and Locate posted result
    var inr_test_timestamp_for_default_location = get_timestamps_for_now_object_with_changed_hours('-', 2);
    var body_data = json_body_data_instrument(patient_for_default_location, patient_for_default_location.LocationID, "2.0", inr_test_timestamp_for_default_location.csp_payload);   
    body_data.patient.identifiers[0].alias = patient_for_default_location.INRstarID;  
    post_external_result_instrument(JSON.stringify(body_data)); 
      
   login(7, "Shared");
      
      var expected_result = get_external_results_received_by_timestamp(inr_test_timestamp_for_default_location.external_results);
      
      //Check the expected result is present and shows the NHS/Fiscal number that was sent in
      var result_set_1 = compare_values(patient_for_default_location.nhs_number, expected_result.patient_nhs_fiscal, test_title);
      result_set.push(result_set_1);
      
      //Check the expected result is automatched
      var result_set_1 = compare_values(expected_result.status_column_value1, get_string_translation("Dose Patient"), test_title);
      result_set.push(result_set_1);
      
   Log_Off(); 
   
   login(17, "Shared");
      
      var unexpected_result = get_external_results_received_by_timestamp(inr_test_timestamp_for_default_location.external_results);
      
      //Check the unexpected result is NOT present     
      var result_set_1 = results_checker_is_false(unexpected_result.row)
      result_set.push(result_set_1);     

    Log_Off(); 
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);  
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Results";
    var test_name = "tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section_when_a_duplicate_patient_exists_elsewhere";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_is_unknown_to_inrstar()
{
  try
  {
    var test_title = "Instrument: Location Matching: INRstarID used as patient identifier, results are routed to intended location if organizationID is unknown to INRstar"
    var patient = insert_patient(); 
    var result_set = new Array();  
    
    login(7, "Shared");
       
      //Get timestamp
      var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 2);

      //Post and Locate posted result
      var body_data = json_body_data_instrument(patient, '40c2bc74-0719-4286-9cd4-41cfc178c96c', '2.6', inr_test_timestamp.csp_payload);     
      body_data.patient.identifiers[0].alias = patient.INRstarID;    
      post_external_result_instrument(JSON.stringify(body_data));
      var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
      
      //Check the result is present and shows the NHS/Fiscal number that was sent in
      var result_set_1 = compare_values(patient.nhs_number, external_result.patient_nhs_fiscal, test_title);
      result_set.push(result_set_1);
    
    Log_Off(); 
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);  
    
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Results";
    var test_name = "tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_is_unknown_to_inrstar";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section()
{
  try
  {
    var test_title = "Instrument: Location Matching: INRstarID used as patient identifier, results are routed to intended location if organizationID reflects patients testing section"
    var patient = insert_patient(); 
    var result_set = new Array();
    
    login(7, "Shared");
       
      //Get timestamp
      var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 2);

      //Post and Locate posted result
      var body_data = json_body_data_instrument(patient, patient.LocationID, "2.6", inr_test_timestamp.csp_payload);     
      body_data.patient.identifiers[0].alias = patient.INRstarID;    
      post_external_result_instrument(JSON.stringify(body_data)); 
      var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
      
      //Check the result is present and shows the NHS/Fiscal number that was sent in
      var result_set_1 = compare_values(patient.nhs_number, external_result.patient_nhs_fiscal, test_title);
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
    var test_name = "tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//------------------------------------------------------------------------
function tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section_where_id_does_not_exist_in_patient_database()
{
  try
  {
    var test_title = "Instrument: Location Matching: INRstarID used as patient identifier, results are routed to intended location if organizationID reflects patients testing section - where ID does not exist in patient database"
    var patient = insert_patient(); 
    var result_set = new Array();
    
    login(7, "Shared");
       
      //Get timestamp
      var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 2);

      //Post and Locate posted result
      var body_data = json_body_data_instrument(patient, patient.LocationID, "2.6", inr_test_timestamp.csp_payload);     
      body_data.patient.identifiers[0].alias = 'INRSTARID99999999999';   
      post_external_result_instrument(JSON.stringify(body_data)); 
      var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
      
      //Check the result is present and shows the NHS/Fiscal number that was sent in
      var result_set_1 = compare_values('INRSTARID99999999999', external_result.patient_nhs_fiscal, test_title);
      result_set.push(result_set_1);
      
      var result_set_1 = compare_values(external_result.status_column_value1, get_string_translation("Find Patient"), test_title);
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
    var test_name = "tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section_where_id_does_not_exist_in_patient_database";
    handle_failed_tests(suite_name, test_name); 
  }
}
//-----------------------------------------------------------------------------------------------------
function tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section_where_id_does_not_exist_in_patient_database_and_contains_non_numeric_chars()
{
  try
  {
    var test_title = "Instrument: Location Matching: INRstarID used as patient identifier, results are routed to intended location if organizationID reflects patients testing section - where ID does not exist in patient database & contains non-numeric chars"
    var patient = insert_patient(); 
    var result_set = new Array();
    
    login(7, "Shared");
       
      //Get timestamp
      var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 2);

      //Post and Locate posted result
      var body_data = json_body_data_instrument(patient, patient.LocationID, "2.6", inr_test_timestamp.csp_payload);     
      body_data.patient.identifiers[0].alias = 'INRSTARIDABCDEF';   
      post_external_result_instrument(JSON.stringify(body_data)); 
      var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
      
      //Check the result is present and shows the NHS/Fiscal number that was sent in
      var result_set_1 = compare_values('INRSTARIDABCDEF', external_result.patient_nhs_fiscal, test_title);
      result_set.push(result_set_1);
      
      var result_set_1 = compare_values(external_result.status_column_value1, get_string_translation("Find Patient"), test_title);
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
    var test_name = "tc_inrstarid_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section_where_id_does_not_exist_in_patient_database";
    handle_failed_tests(suite_name, test_name); 
  }
}
//-----------------------------------------------------------------------------------------------------
function tc_inrstarid_used_as_patient_identifier_results_are_rejected_from_inrstar_if_organizationid_is_unknown_to_inrstar_where_id_does_not_match_a_patient_in_the_database()
{
  try
  {
    var test_title = "Instrument: Location Matching: INRstarID used as patient identifier, results are rejected from INRstar if organizationID is unknown to INRstar - where ID does not match a patient in the database"
    var patient = insert_patient()
    var result_set = new Array();
    
    login(7, "Shared");
       
      //Get timestamp
      var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 2);

      //Post and Locate posted result
      var body_data = json_body_data_instrument(patient, '40c2bc74-0719-4286-9cd4-41cfc178c96c', '2.6', inr_test_timestamp.csp_payload);     
      body_data.patient.identifiers[0].alias = 'INRSTARID9999999999999';   
      var result_post_response = post_external_result_instrument(JSON.stringify(body_data)); 
      var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
      
      //Check the response of the attempted post - Response Ideally should reject with a 400 or 404
      var result_set_1 = compare_values(result_post_response.StatusCode, "404", test_title); 
      result_set.push(result_set_1);
      
      //Check the result is NOT present     
      var result_set_1 = results_checker_is_false(external_result.row)
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
    var test_name = "tc_inrstarid_used_as_patient_identifier_results_are_rejected_from_inrstar_if_organizationid_is_unknown_to_inrstar_where_id_does_not_match_a_patient_in_the_database";
    handle_failed_tests(suite_name, test_name); 
  }
}
//-----------------------------------------------------------------------------------------------------
function tc_nhs_or_fiscal_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section()
{
  try
  {
    var test_title = "Instrument: Location Matching: NHS/Fiscal used as patient identifier, results are routed to intended location if organizationID reflects patients testing section"
    var patient = insert_patient(); 
    var result_set = new Array();
    
    login(7, "Shared");
       
      //Get timestamp
      var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 2);

      //Post and Locate posted result
      var body_data = json_body_data_instrument(patient, patient.LocationID, "2.6", inr_test_timestamp.csp_payload);     
      post_external_result_instrument(JSON.stringify(body_data)); 
      var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
      
      //Check the result is present and shows the NHS/Fiscal number that was sent in
      var result_set_1 = compare_values(patient.nhs_number, external_result.patient_nhs_fiscal, test_title);
      result_set.push(result_set_1);
      
      //Check the result is automatched
      var result_set_1 = compare_values(external_result.status_column_value1, get_string_translation("Dose Patient"), test_title);
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
    var test_name = "tc_nhs_or_fiscal_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//-----------------------------------------------------------------------------------------------------
function tc_nhs_or_fiscal_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section_when_a_duplicate_patient_exists_elsewhere()
{
  try
  {
    var test_title = "Instrument: Location Matching: NHS/Fiscal used as patient identifier, results are routed to intended location if organizationID reflects patients testing section - When a duplicate patient exists elsewhere";
    var generated_patient = patient_generator();
    var result_set = new Array();
    
    //Add our generated_patient in another location
    var patient_overides = {location:"other"};
    var patient_for_other_location = insert_patient(patient_overides, generated_patient); 
    
    //Add the generated_patient in the usual location
    var patient_for_default_location = insert_patient('', generated_patient)

    //Get timestamp post and Locate posted result
    var inr_test_timestamp_for_default_location = get_timestamps_for_now_object_with_changed_hours('-', 2);
    var body_data = json_body_data_instrument(patient_for_default_location, patient_for_default_location.LocationID, "2.0", inr_test_timestamp_for_default_location.csp_payload);     
    post_external_result_instrument(JSON.stringify(body_data)); 
      
   login(7, "Shared");
      
      var expected_result = get_external_results_received_by_timestamp(inr_test_timestamp_for_default_location.external_results);
      
      //Check the expected result is present and shows the NHS/Fiscal number that was sent in
      var result_set_1 = compare_values(patient_for_default_location.nhs_number, expected_result.patient_nhs_fiscal, test_title);
      result_set.push(result_set_1);
      
      //Check the expected result is automatched
      var result_set_1 = compare_values(expected_result.status_column_value1, get_string_translation("Dose Patient"), test_title);
      result_set.push(result_set_1);
      
   Log_Off(); 
   
   login(17, "Shared");
      
      var unexpected_result = get_external_results_received_by_timestamp(inr_test_timestamp_for_default_location.external_results);
      
      //Check the unexpected result is NOT present     
      var result_set_1 = results_checker_is_false(unexpected_result.row)
      result_set.push(result_set_1);     

    Log_Off(); 
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Results";
    var test_name = "tc_nhs_or_fiscal_used_as_patient_identifier_results_are_routed_to_intended_location_if_organizationid_reflects_patients_testing_section_when_a_duplicate_patient_exists_elsewhere";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//-----------------------------------------------------------------------------------------------------
function tc_nhs_or_fiscal_used_as_patient_identifier_results_are_routed_to_unintended_location_if_organizationid_reflects_a_different_but_valid_inr_testing_Location()
{
  try
  {
    var test_title = "Instrument: Location Matching: NHS/Fiscal used as patient identifier, results are routed to unintended location if organizationID reflects a different but valid INRstar testing Location"
    
    //Login to OTHER location in order to extract UUID of location
    login_under_the_hood("other location");
    var other_location_id = get_locationid();
    
    //Insert patient into intended location
    var patient = insert_patient(); 
    var result_set = new Array();  
    
    login(7, "Shared");
       
      //Get timestamp
      var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 2);

      //Post and Locate posted result
      var body_data = json_body_data_instrument(patient, other_location_id, "2.6", inr_test_timestamp.csp_payload);        
      post_external_result_instrument(JSON.stringify(body_data)); 
      var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
      
      //Check the result is NOT present in the OTHER location
      var result_set_1 = results_checker_is_false(external_result.row)
      result_set.push(result_set_1);
    
    Log_Off();
    
    login(17, "Shared");
    
      var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
    
      //Check the result is present and shows the NHS/Fiscal number that was sent in
      var result_set_1 = compare_values(patient.nhs_number, external_result.patient_nhs_fiscal, test_title);
      result_set.push(result_set_1);
    
      //Validate the results sets are true - Pass in the result
      var results = results_checker_are_true(result_set);
  		results_checker(results, test_title); 

    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Results";
    var test_name = "tc_nhs_or_fiscal_used_as_patient_identifier_results_are_routed_to_unintended_location_if_organizationid_reflects_a_different_but_valid_inr_testing_Location";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//-----------------------------------------------------------------------------------------------------
function tc_nhs_or_fiscal_used_as_patient_identifier_results_are_rejected_from_inrstar_if_organizationid_is_unknown_to_inrstar()
{
  try
  {
    var test_title = "Instrument: Location Matching: NHS/Fiscal used as patient identifier, results are rejected from INRstar if organizationID is unknown to INRstar"
    var patient = insert_patient(); 
    var result_set = new Array();
    
    login(7, "Shared");
       
      //Get timestamp
      var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 2);

      //Post and Locate posted result
      var body_data = json_body_data_instrument(patient, "40c2bc74-0719-4286-9cd4-41cfc178c96c", "2.6", inr_test_timestamp.csp_payload);     
      var result_post_response = post_external_result_instrument(JSON.stringify(body_data)); 
      var external_result = get_external_results_received_by_timestamp(inr_test_timestamp.external_results);
      
      //Check the response of the attempted post - Response Ideally should reject with a 400 or 404
      var result_set_1 = compare_values(result_post_response.StatusCode, "404", test_title); 
      result_set.push(result_set_1);
      
      //Check the result is NOT present     
      var result_set_1 = results_checker_is_false(external_result.row)
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
    var test_name = "tc_nhs_or_fiscal_used_as_patient_identifier_results_are_rejected_from_inrstar_if_organizationid_is_unknown_to_inrstar";
    handle_failed_tests(suite_name, test_name); 
  }
}
