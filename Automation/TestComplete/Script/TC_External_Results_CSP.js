//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_External_Results_CSP
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_external_results_from_csp_match_to_patient()
{
  try
  {
    var test_title = "External Results - Sent from CSP auto associate to patient"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 3);
    
    //Post in external results
    var token = get_bearer_token_from_csp();
    var body_data = external_result_csp_payload_builder(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared',''); 
    
    //Goto New INR page - Check the patient result table is present - return true/false
    Goto_Patient_New_INR();
    var table_exists = Check_if_patients_external_results_table_exists();
    
    //Get external result info from top entry of table
    var actual_results = get_patients_external_results_from_specific_row_of_table(1, table_exists);
    
    //Prepare result array
    var result_set = new Array();
    
    //Check INR value in table matches that of sent
    var result_set_1 = compare_values(body_data.resultValue, actual_results.inr, "Checking INR values on table Matches incoming results");
    result_set.push(result_set_1);
    
     //Check time value in table matches that of sent
    var result_set_1 = compare_values(inr_test_timestamp.inr_patient_results, actual_results.test_timestamp, "Checking Blood Taken Times on table Matches incoming results"); 
    result_set.push(result_set_1);
    
    //Check source value in table matches that of sent
    var result_set_1 = data_contains_checker(actual_results.source, "instrument", "Checking source of result in table is Instrument");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_CSP";
    var test_name = "tc_external_results_from_csp_match_to_patient";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_external_results_from_csp_most_recent_result_appears_at_bottom_of_table()
{
  try
  {
    var test_title = "External Results - Sent from CSP most recent appears at bottom of table"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 3);
    var inr_test_timestamp2 = get_timestamps_for_now_object_with_changed_hours('-', 2);
    
    //Post in external results
    var token = get_bearer_token_from_csp();
    var body_data = external_result_csp_payload_builder(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    var body_data2 = external_result_csp_payload_builder(patient, location_id, "2.3", inr_test_timestamp2.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data)); 
    post_external_result_to_csp(token, JSON.stringify(body_data2)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared',''); 
    
    //Goto New INR page - Check the patient result table is present - return true/false
    Goto_Patient_New_INR();
    var table_exists = Check_if_patients_external_results_table_exists();
    
    //Get external result info from second entry of table
    var actual_results = get_patients_external_results_from_specific_row_of_table(2, table_exists);
    
    //Prepare result array
    var result_set = new Array();
    
    //Check INR value in table matches that of sent
    var result_set_1 = compare_values(body_data2.resultValue, actual_results.inr, "Checking INR values on bottom table entry matches latest incoming result");
    result_set.push(result_set_1);
    
     //Check time value in table matches that of sent
    var result_set_1 = compare_values(inr_test_timestamp2.inr_patient_results, actual_results.test_timestamp, "Checking Blood Taken Times on bottom table entry Matches latest incoming result"); 
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_CSP";
    var test_name = "tc_external_results_from_csp_most_recent_result_appears_at_bottom_of_table";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_external_results_from_csp_matched_to_patient_do_not_appear_if_over_3_days_old()
{
  try
  {
    var test_title = "External Results - Sent from CSP: do not appear on patient results - if more than 3 days old"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 96);
    
    //Post in external results
    var token = get_bearer_token_from_csp();
    var body_data = external_result_csp_payload_builder(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared',''); 
    
    //Goto New INR page - Check the patient result table is present - return true/false
    Goto_Patient_New_INR();
    var table_exists = Check_if_patients_external_results_table_exists();
    
    //Prepare result array
    var result_set = new Array();
    
    //Check INR value in table matches that of sent
    var result_set_1 = compare_values(false, table_exists, "Checking that table does not exist");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off();  
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_CSP";
    var test_name = "tc_external_results_from_csp_matched_to_patient_do_not_appear_if_over_3_days_old";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_external_results_from_csp_can_dose_a_manual_patient()
{
  try
  {
    var test_title = "External Results - Sent from CSP: can be used to dose a patient on manual treatment plan"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 1);
    
    //Post in external results
    var token = get_bearer_token_from_csp();
    var body_data = external_result_csp_payload_builder(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared',''); 
    
    //Goto New INR page - Check the patient result table is present - return true/false
    Goto_Patient_New_INR();
    var table_exists = Check_if_patients_external_results_table_exists();
    
    //Select Use Result button
    select_use_external_result_button_from_row(1, table_exists);
    
    //Dose the patient
    var dose_data = add_manual_treatment_after_using_result("1.2", "7");
    
    //Prepare result array
    var result_set = new Array();
    
    //Grab values from Suggested Treatment & Schedule table
    var actual_results = get_pending_treatment_data_as_object_from_table();
    
    //Check values from Suggested Treatment & Schedule table - inr
    var result_set_1 = compare_values(body_data.resultValue, actual_results.inr, "Checking INR result on historic treatment table Matches incoming results");
    result_set.push(result_set_1);
    
    //Check values from Suggested Treatment & Schedule table - dose
    var result_set_1 = compare_values(dose_data.dose, actual_results.dose, "Checking INR dose on historic treatment table Matches incoming results");
    result_set.push(result_set_1);
    
    //Check values from Suggested Treatment & Schedule table - review_days
    var result_set_1 = compare_values(dose_data.review, actual_results.review_days, "Checking INR review_days on historic treatment table Matches incoming results");
    result_set.push(result_set_1);
    
   //Check values from Suggested Treatment & Schedule table - test_date
    var result_set_1 = compare_values(inr_test_timestamp.historic_treatments, actual_results.test_date, "Checking INR test_date on historic treatment table Matches incoming results");
    result_set.push(result_set_1);
    
    //Select Ok to confirm suggested treatment
    save_inr_button().Click()
    
    //Grab values from INR treatments table
    actual_results = get_historic_treatment_object_from_specific_row_of_table(1);
    
    //Check values from INR treatments table - inr
    var result_set_1 = compare_values(body_data.resultValue, actual_results.inr, "Checking INR result on historic treatment table Matches incoming results");
    result_set.push(result_set_1);
    
    //Check values from INR treatments table - dose
    var result_set_1 = compare_values(dose_data.dose, actual_results.dose, "Checking INR dose on historic treatment table Matches incoming results");
    result_set.push(result_set_1);
    
    //Check values from INR treatments table - review_days
    var result_set_1 = compare_values(dose_data.review, actual_results.review_days, "Checking INR review_days on historic treatment table Matches incoming results");
    result_set.push(result_set_1);
    
    //Check values from INR treatments table - test_date
    var result_set_1 = compare_values(inr_test_timestamp.historic_treatments, actual_results.test_date, "Checking INR test_date on historic treatment table Matches incoming results");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_CSP";
    var test_name = "tc_external_results_from_csp_can_dose_a_manual_patient";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_external_results_from_csp_archiving_last_result_removes_patient_result_table()
{
  try
  {
    var test_title = "External Results - Sent from CSP: archiving last result removes patient result table"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 3);
    
    //Post in external results
    var token = get_bearer_token_from_csp();
    var body_data = external_result_csp_payload_builder(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared',''); 
    
    //Goto New INR page - Check the patient result table is present - return true/false
    Goto_Patient_New_INR();
    var table_exists = Check_if_patients_external_results_table_exists();
    
    //Select Archive result and discard 
    select_archive_button_on_patient_external_results_for_specific_row(1, table_exists);
    discard_button_for_archived_result_confirmation_popup().Click();
   
    //Check if table exists - goto will return true or false pending if present
    table_exists = Check_if_patients_external_results_table_exists();
    
    //Prepare result array
    var result_set = new Array();
    
    //Check that the table vanished after last result archived
    var result_set_1 = compare_values(false, table_exists, "Checking that table does not exist");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_CSP";
    var test_name = "tc_external_results_from_csp_archiving_last_result_removes_patient_result_table";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_external_results_from_csp_archiving_two_results_in_sequence_starting_with_oldest()
{
  try
  {
    var test_title = "External Results - Sent from CSP: can archive multiple results in succession starting with oldest"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    
    //Post in older external results
    var token = get_bearer_token_from_csp();
    var inr_test_timestamp_oldest = get_timestamps_for_now_object_with_changed_hours('-', 3);
    var body_data_oldest = external_result_csp_payload_builder(patient, location_id, "2.2", inr_test_timestamp_oldest.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data_oldest)); 
    
    //Post in most recent external results
    var inr_test_timestamp_most_recent = get_timestamps_for_now_object_with_changed_hours('-', 2);
    var body_data_most_recent = external_result_csp_payload_builder(patient, location_id, "2.5", inr_test_timestamp_most_recent.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data_most_recent)); 
    
    //Add Treatment plan 
    add_treatment_plan('W','Manual','','Shared',''); 

    //Goto New INR page - Check the patient result table is present - return true/false
    Goto_Patient_New_INR();
    var table_exists = Check_if_patients_external_results_table_exists();
    
    //Get external result info from table
    var most_recent_result = get_patients_external_results_from_specific_row_of_table(2, table_exists);
    var oldest_result = get_patients_external_results_from_specific_row_of_table(1, table_exists);
    
    //Select Archive result and discard for oldest result at top of table
    select_archive_button_on_patient_external_results_for_specific_row(1, table_exists);
    discard_button_for_archived_result_confirmation_popup().Click();
    
    //With table refreshed: Get results from remaining entry
    var remaining_results = get_patients_external_results_from_specific_row_of_table(1, table_exists);
    
    //Prepare result array
    var result_set = new Array();
    
    //Check INR value in remaining test result matches the most recent result
    var result_set_1 = compare_values(body_data_most_recent.resultValue, remaining_results.inr, "Checking INR value in remaining test result entry reflects the most recent result");
    result_set.push(result_set_1);
    
    //Check time value in remaining test result matches that of the most recent result
    var result_set_1 = compare_values(inr_test_timestamp_most_recent.inr_patient_results, remaining_results.test_timestamp, "Checking timestamp value in remaining test result entry reflects the most recent result"); 
    result_set.push(result_set_1);
    
    //Select Archive result & discard remianing (most recent) result
    select_archive_button_on_patient_external_results_for_specific_row(1, table_exists);
    discard_button_for_archived_result_confirmation_popup().Click();
   
    //Check if table exists - goto will return true or false pending if present
    table_exists = Check_if_patients_external_results_table_exists();
    
    //Check that the table vanished after last result archived
    var result_set_1 = compare_values(false, table_exists, "Checking that table does not exist");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_CSP";
    var test_name = "tc_external_results_from_csp_archiving_two_results_in_sequence_starting_with_oldest";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_external_results_from_csp_archiving_two_results_in_sequence_starting_with_most_recent()
{
  try
  {
    var test_title = "External Results - Sent from CSP: can archive multiple results in succession starting with most recent"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    
    //Post in older external results
    var token = get_bearer_token_from_csp();
    var inr_test_timestamp_oldest = get_timestamps_for_now_object_with_changed_hours('-', 3);
    var body_data_oldest = external_result_csp_payload_builder(patient, location_id, "2.2", inr_test_timestamp_oldest.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data_oldest)); 
    
    //Post in most recent external results
    var inr_test_timestamp_most_recent = get_timestamps_for_now_object_with_changed_hours('-', 2);
    var body_data_most_recent = external_result_csp_payload_builder(patient, location_id, "2.5", inr_test_timestamp_most_recent.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data_most_recent)); 
    
    //Add Treatment plan 
    add_treatment_plan('W','Manual','','Shared',''); 

    //Goto New INR page - Check the patient result table is present - return true/false 
    Goto_Patient_New_INR();
    var table_exists = Check_if_patients_external_results_table_exists();
    
    //Get external result info from table
    var most_recent_result = get_patients_external_results_from_specific_row_of_table(2, table_exists);
    var oldest_result = get_patients_external_results_from_specific_row_of_table(1, table_exists);
    
    //Select Archive & discard result for most recent result at foot of table
    select_archive_button_on_patient_external_results_for_specific_row(2, table_exists);
    discard_button_for_archived_result_confirmation_popup().Click();
    
    //Now that table has refreshed get the results from the only remaining entry
    var remaining_results = get_patients_external_results_from_specific_row_of_table(1, table_exists);
    
    //Prepare result array
    var result_set = new Array();
    
    //Check INR value in remaining test result matches that of the oldest result
    var result_set_1 = compare_values(body_data_oldest.resultValue, remaining_results.inr, "Checking INR value in remaining test result entry reflects the oldest result");
    result_set.push(result_set_1);
    
    //Check time value in remaining test result matches that of the oldest result
    var result_set_1 = compare_values(inr_test_timestamp_oldest.inr_patient_results, remaining_results.test_timestamp, "Checking timestamp value in remaining test result entry reflects the oldest result"); 
    result_set.push(result_set_1);
    
    //Select Archive & discard result for remianing (most recent) result
    select_archive_button_on_patient_external_results_for_specific_row(1, table_exists);
    discard_button_for_archived_result_confirmation_popup().Click();
   
    //Check if table exists - Will return true or false pending if present
    table_exists = Check_if_patients_external_results_table_exists();
    
    //Check that the table vanished after last result archived
    var result_set_1 = compare_values(false, table_exists, "Checking that table does not exist");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results,test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_CSP";
    var test_name = "tc_external_results_from_csp_archiving_two_results_in_sequence_starting_with_most_recent";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_external_results_from_csp_archiving_process_can_be_cancelled_if_selected_in_error()
{
  try
  {
    var test_title = "External Results - Sent from CSP archiving process can be cancelled if selected in error"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 3);
    
    //Post in external results
    var token = get_bearer_token_from_csp();
    var body_data = external_result_csp_payload_builder(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared',''); 
    
    //Goto New INR page - Check the patient result table is present - return true/false
    Goto_Patient_New_INR();
    var table_exists = Check_if_patients_external_results_table_exists();
    
    //Select Archive result and cancel 
    select_archive_button_on_patient_external_results_for_specific_row(1, table_exists);
    cancel_button_for_archived_result_confirmation_popup().Click();
   
    //Check if table exists - goto will return true or false pending if present
    table_exists = Check_if_patients_external_results_table_exists();
    
    //Extract data from external results
    var remaining_results = get_patients_external_results_from_specific_row_of_table(1, table_exists);
    
    //Prepare result array
    var result_set = new Array();
    
     //Check INR value in table matches that of sent
    var result_set_1 = compare_values(body_data.resultValue, remaining_results.inr, "Checking INR values on table Matches incoming results");
    result_set.push(result_set_1);
    
     //Check time value in table matches that of sent
    var result_set_1 = compare_values(inr_test_timestamp.inr_patient_results, remaining_results.test_timestamp, "Checking Blood Taken Times on table Matches incoming results"); 
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_CSP";
    var test_name = "tc_external_results_from_csp_archiving_process_can_be_cancelled_if_selected_in_error";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_external_results_from_csp_archiving_process_can_be_commented_upon()
{
  try
  {
    var test_title = "External Results - Sent from CSP: archiving process can be commented upon"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 3);
    
    //Post in external results
    var token = get_bearer_token_from_csp();
    var body_data = external_result_csp_payload_builder(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared',''); 
    
    //Goto New INR page - Check the patient result table is present - return true/false
    Goto_Patient_New_INR();
    var table_exists = Check_if_patients_external_results_table_exists();
    
    //Select Archive result and cancel 
    select_archive_button_on_patient_external_results_for_specific_row(1, table_exists);
    var comments = provide_archive_reason_after_archiving_result();
    discard_button_for_archived_result_confirmation_popup().Click();
    
    //Prepare result array
    var result_set = new Array();
    
    //Check the top audit information section includes the comments
    var result_set_1 = validate_top_patient_audit_information_contains(test_title, comments);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_CSP";
    var test_name = "tc_external_results_from_csp_archiving_process_can_be_cancelled_if_selected_in_error";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_external_results_from_csp_archived_results_can_be_obtained()
{
  try
  {
    var test_title = "External Results - Sent from CSP: archived results can be obtained"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 1);
    
    //Post in external results
    var token = get_bearer_token_from_csp();
    var body_data = external_result_csp_payload_builder(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared',''); 
    
    //Goto New INR page - Check the patient result table is present - return true/false
    Goto_Patient_New_INR();
    var table_exists = Check_if_patients_external_results_table_exists();
    
    //Select Archive result and cancel 
    select_archive_button_on_patient_external_results_for_specific_row(1, table_exists);
    discard_button_for_archived_result_confirmation_popup().Click();
    
    //Prepare result array
    var result_set = new Array();
    
    //Navigate to External Results & check it exists
    Goto_External_Results()
    var table_exists = Check_if_external_results_table_exists();
    
    //Filter table and get info of latest entry
    filter_external_results_to_show_archived(table_exists);
    var archived_results = get_external_results_from_specific_row_of_table(1, table_exists)
    
    //Check archived results being shown is true - inr
    var result_set_1 = compare_values(archived_results.inr, body_data.resultValue, "Checking that archived INR result is obtainable");
    result_set.push(result_set_1);
    
    //Check archived results being shown is true - timestamp
    var result_set_1 = compare_values(archived_results.blood_taken_timestamp, inr_test_timestamp.external_results, "Checking that archived results blood taken timestamp is obtainable");
    result_set.push(result_set_1);
    
    //Check archived results being shown is true - label
    var result_set_1 = compare_values(archived_results.label, "Archived Result", "Checking that archived results are labelled appropriately");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_CSP";
    var test_name = "tc_external_results_from_csp_archived_results_can_be_obtained";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_external_results_from_csp_archiving_results_from_external_results_tab_is_possible()
{
  try
  {
    var test_title = "External Results - Sent from CSP: archived results can be obtained"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 1);
    var inr_test_timestamp2 = get_timestamps_for_now_object_with_changed_hours('-', 2);
    
    //Post in two lots of external results - that way when we archive one = table still remains
    var token = get_bearer_token_from_csp();
    
    var body_data = external_result_csp_payload_builder(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data)); 
    
    var body_data2 = external_result_csp_payload_builder(patient, location_id, "2.7", inr_test_timestamp2.csp_payload); 
    post_external_result_to_csp(token, JSON.stringify(body_data2)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared',''); 
    
    //Navigate to External Results & check it exists
    Goto_External_Results()
    var table_exists = Check_if_external_results_table_exists();
    
    //Get latest result_data from table
    var external_result1 = get_external_results_from_specific_row_of_table(1, table_exists)
            
    //Prepare result array
    var result_set = new Array();
    
    //Check latest result data reflects the more recent of the posted results
    var result_set_1 = compare_values(external_result1.blood_taken_timestamp, inr_test_timestamp2.external_results, "Checking the content of the latest entry in external results reflects the last posted result");
    result_set.push(result_set_1);
       
    //Select Archive result and discard 
    select_archive_button_on_external_results_for_specific_row(1, table_exists)
    discard_button_for_archived_result_confirmation_popup().Click();
    
    //Re-Check if table exists - it should do since we posted in two results
    var table_exists = Check_if_external_results_table_exists();
    
    //Get latest result_data from table
    var external_result2 = get_external_results_from_specific_row_of_table(1, table_exists)
    
    //Check latest result data reflects the other posted result
    var result_set_1 = compare_values(external_result2.blood_taken_timestamp, inr_test_timestamp.external_results, "Checking the content of the latest entry in external results reflects the remaining posted result");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_CSP";
    var test_name = "tc_external_results_from_csp_archived_results_can_be_obtained";
    handle_failed_tests(suite_name, test_name); 
  } 
}