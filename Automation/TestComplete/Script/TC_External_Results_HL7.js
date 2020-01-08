//USEUNIT TSA_External_Results_HL7
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_external_results_hl7_message_todays_date_patient_match()
{
  try
  {
    var test_title = "External Results: HL7 Message Dated Today - Match Patient";
    login(22, "Shared"); 
    add_patient("Regression", "HL7", "M", "Shared");
    
    var patient_data_array = new Array();
    patient_data_array = get_patient_demographics();
    var nhs = patient_data_array[1];
    
    generate_hl7_message(patient_data_array);
    send_hl7_message();
    
    var external_patient_data = new Array();
    external_patient_data = get_hl7_patient_info(1);
    var ext_nhs = external_patient_data[3];
    
    var result_set = new Array();
    var result_set_1 = validate_hl7_buttons("DosePatient");
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(nhs, ext_nhs, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results,test_title); 
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_HL7";
    var test_name = "tc_external_results_hl7_message_todays_date_patient_match";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_external_results_hl7_message_4_days_passed_with_dosing()
{
  try
  {
    var test_title = "External Results: HL7 Message Dated 4 Days Past - Patient Dosing";
    login(22, "Shared"); 
    add_patient("Regression", "HL7", "M", "Shared");
    add_treatment_plan("W", "Manual", "", "Shared", "");
    
    var patient_data_array = new Array();
    patient_data_array = get_patient_demographics();
    var nhs = patient_data_array[1];
    
    var datetime = aqDateTime.AddDays(aqDateTime.Now(), (-4));
    
    generate_hl7_message(patient_data_array, datetime);
    send_hl7_message();
    
    var external_patient_data = new Array();
    external_patient_data = get_hl7_patient_info(1);
    var ext_nhs = external_patient_data[3];
    
    var confirm_historic_text;
    if(nhs == ext_nhs)
    {
      confirm_historic_text = dose_patient_external_result(1);
    } 
    var expected_text = "This result is more than 3 days old. The result will be entered as a historical treatment.";
    
    var result_set = new Array();
    var result_set_1 = compare_values(nhs, ext_nhs, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(confirm_historic_text, expected_text, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results,test_title); 
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_HL7";
    var test_name = "tc_external_results_hl7_message_4_days_passed_with_dosing";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_external_results_hl7_message_today_does_not_match_patient()
{
  try
  {
    var test_title = "External Results: HL7 Message Dated Today - Does Not Match Patient";
    login(5, "Shared"); 
    
    var dt;
    
    setup_hl7_message_data(dt, "123456", "123 456 7890", "surname", "firstname", "31-Dec-1990", "F", "address1", "address2", "address3", "address4", "pos cod", "2.5");
    send_hl7_message();

    var result_set = new Array();
    var result_set_1 = validate_hl7_buttons("FindPatient");
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results,test_title); 
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_HL7";
    var test_name = "tc_external_results_hl7_message_today_does_not_match_patient";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_external_results_hl7_message_duplicate_entries_different_nhs()
{
  try
  {
    var test_title = "External Results: HL7 Message Dated Today - Different NHS Numbers, Find Patient";
    login(22, "Shared"); 
    add_patient("Regression", "HL7", "M", "Shared");
    add_treatment_plan("W", "Manual", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var patient_data_array = new Array();
    patient_data_array = get_patient_demographics();
    var nhs = patient_data_array[1];
    
    generate_hl7_message(patient_data_array);
    send_hl7_message();
    
    var external_patient_data = new Array();
    external_patient_data = get_hl7_patient_info(1);
    var ext_nhs = external_patient_data[3];
    
    var result_set = new Array();
    var result_set_1 = validate_hl7_buttons("DosePatient");
    result_set.push(result_set_1);
    
    patient_data_array[1] = "123 456 7890";
    generate_hl7_message(patient_data_array);
    send_hl7_message();
    
    result_set_1 = validate_hl7_buttons("FindPatient");
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(nhs, ext_nhs, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results,test_title); 
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_HL7";
    var test_name = "tc_external_results_hl7_message_duplicate_entries_different_nhs";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_external_results_hl7_message_duplicate_entries_different_dob()
{
  try
  {
    var test_title = "External Results: HL7 Message Dated Today - Different DOB, Find Patient";
    login(22, "Shared"); 
    add_patient("Regression", "HL7", "M", "Shared");
    add_treatment_plan("W", "Manual", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var patient_data_array = new Array();
    patient_data_array = get_patient_demographics();
    var nhs = patient_data_array[1];
    
    generate_hl7_message(patient_data_array);
    send_hl7_message();
    
    var external_patient_data = new Array();
    external_patient_data = get_hl7_patient_info(1);
    var ext_nhs = external_patient_data[3];
    
    var result_set = new Array();
    var result_set_1 = validate_hl7_buttons("DosePatient");
    result_set.push(result_set_1);
    
    patient_data_array[5] = "01-Jan-1999";
    generate_hl7_message(patient_data_array);
    send_hl7_message();
    
    result_set_1 = validate_hl7_buttons("FindPatient");
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(nhs, ext_nhs, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_HL7";
    var test_name = "tc_external_results_hl7_message_duplicate_entries_different_dob";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_external_results_hl7_message_duplicate_entries_bad_nhs()
{
  try
  {
    var test_title = "External Results: HL7 Message Dated Today - False NHS numbers, Find Patient";
    login(22, "Shared"); 
    add_patient("Regression", "HL7", "M", "Shared");
    add_treatment_plan("W", "Manual", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var patient_data_array = new Array();
    patient_data_array = get_patient_demographics();
    var nhs = patient_data_array[1];
    
    patient_data_array[1] = "012 345 6789";
    generate_hl7_message(patient_data_array);
    send_hl7_message();
    
    var result_set = new Array();
    var result_set_1 = validate_hl7_buttons("FindPatient");
    result_set.push(result_set_1);
    
    patient_data_array[1] = "012 345 6789";
    generate_hl7_message(patient_data_array);
    send_hl7_message();
    
    result_set_1 = validate_hl7_buttons("FindPatient");
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_HL7";
    var test_name = "tc_external_results_hl7_message_duplicate_entries_different_dob";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_external_results_hl7_message_duplicate_entries_bad_dob()
{
  try
  {
    var test_title = "External Results: HL7 message with incorrect D.O.B is sent in twice";
    login(22, "Shared"); 
    add_patient("Regression", "HL7", "M", "Shared");
    add_treatment_plan("W", "Manual", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var patient_data_array = new Array();
    patient_data_array = get_patient_demographics();
    var nhs = patient_data_array[1];
    
    patient_data_array[5] = "02-Jan-1978";
    generate_hl7_message(patient_data_array);
    send_hl7_message();
    
    var external_patient_data = new Array();
    external_patient_data = get_hl7_patient_info(1);
    var ext_nhs = external_patient_data[3];
    
    var result_set = new Array();
    var result_set_1 = validate_hl7_buttons("FindPatient");
    result_set.push(result_set_1);
    
    patient_data_array[5] = "02-Jan-1978";
    generate_hl7_message(patient_data_array);
    send_hl7_message();
    
    result_set_1 = validate_hl7_buttons("FindPatient");
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(nhs, ext_nhs, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_HL7";
    var test_name = "tc_external_results_hl7_message_duplicate_entries_bad_dob";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_external_results_hl7_message_duplicate_entries_different_inrs()
{
  try
  {
    var test_title = "External Results: HL7 message with different INR's is sent twice";
    login(22, "Shared"); 
    add_patient("Regression", "HL7", "M", "Shared");
    add_treatment_plan("W", "Manual", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var patient_data_array = new Array();
    patient_data_array = get_patient_demographics();
    var nhs = patient_data_array[1];
    
    generate_hl7_message(patient_data_array, "", "2.1");
    send_hl7_message();
    
    var external_patient_data = new Array();
    external_patient_data = get_hl7_patient_info(1);
    var ext_nhs = external_patient_data[3];
    
    var result_set = new Array();
    var result_set_1 = validate_hl7_buttons("DosePatient");
    result_set.push(result_set_1);
    
    generate_hl7_message(patient_data_array, "", "2.2");
    send_hl7_message();
    
    result_set_1 = validate_hl7_buttons("DosePatient");
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(nhs, ext_nhs, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_HL7";
    var test_name = "tc_external_results_hl7_message_duplicate_entries_different_inrs";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_external_results_hl7_message_duplicate_entries_different_times()
{
  try
  {
    var test_title = "External Results: HL7 message with different time is sent twice";
    login(22, "Shared"); 
    add_patient("Regression", "HL7", "M", "Shared");
    add_treatment_plan("W", "Manual", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var patient_data_array = new Array();
    patient_data_array = get_patient_demographics();
    var nhs = patient_data_array[1];
    
    generate_hl7_message(patient_data_array);
    send_hl7_message();
    
    var external_patient_data = new Array();
    external_patient_data = get_hl7_patient_info(1);
    var ext_nhs = external_patient_data[3];
    
    var result_set = new Array();
    var result_set_1 = validate_hl7_buttons("DosePatient");
    result_set.push(result_set_1);
    
    var datetime = aqDateTime.AddMinutes(aqDateTime.Now(), -20);
    generate_hl7_message(patient_data_array, datetime);
    send_hl7_message();
    
    result_set_1 = validate_hl7_buttons("DosePatient");
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(nhs, ext_nhs, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_HL7";
    var test_name = "tc_external_results_hl7_message_duplicate_entries_different_times";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_external_results_hl7_message_duplicate_entries_different_dates_same_times()
{
  try
  {
    var test_title = "External Results: HL7 message with same time but different date is sent twice";
    login(22, "Shared"); 
    add_patient("Regression", "HL7", "M", "Shared");
    add_treatment_plan("W", "Manual", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var datetime = aqDateTime.Now();
    var patient_data_array = new Array();
    patient_data_array = get_patient_demographics();
    var nhs = patient_data_array[1];
    
    generate_hl7_message(patient_data_array, datetime);
    send_hl7_message();
    
    var external_patient_data = new Array();
    external_patient_data = get_hl7_patient_info(1);
    var ext_nhs = external_patient_data[3];
    
    var result_set = new Array();
    var result_set_1 = validate_hl7_buttons("DosePatient");
    result_set.push(result_set_1);
    
    datetime = aqDateTime.AddDays(datetime, -2);
    generate_hl7_message(patient_data_array, datetime);
    send_hl7_message();
    
    result_set_1 = validate_hl7_buttons("DosePatient");
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(nhs, ext_nhs, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_HL7";
    var test_name = "tc_external_results_hl7_message_duplicate_entries_different_dates_same_times";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_external_results_hl7_message_duplicate_entries_no_nhs_same_patientid()
{
  try
  {
    var test_title = "External Results: HL7 message with no NHS number but same Patient Id is sent twice";
    login(22, "Shared"); 
    var pat_no = new_guid(10);
    add_patient("Regression", "HL7", "M", "Shared", " ", pat_no);
    add_treatment_plan("W", "Manual", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var patient_data_array = new Array();
    patient_data_array = get_patient_demographics();
    var nhs = patient_data_array[1];
    
    var datetime = aqDateTime.Now();
    patient_data_array[1] = "              ";
    generate_hl7_message(patient_data_array, datetime);
    send_hl7_message();
    
    var result_set = new Array();
    var result_set_1 = validate_hl7_buttons("FindPatient");
    result_set.push(result_set_1);
    
    generate_hl7_message(patient_data_array, datetime);
    send_hl7_message();
    
    result_set_1 = validate_hl7_buttons("FindPatient");
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_HL7";
    var test_name = "tc_external_results_hl7_message_duplicate_entries_no_nhs_same_patientid";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_external_results_hl7_message_single_entry_no_nhs_no()
{
  try
  {
    var test_title = "External Results: HL7 message with no NHS number";
    login(22, "Shared"); 
    var pat_no = new_guid(10);
    add_patient("Regression", "HL7", "M", "Shared", " ", pat_no);
    add_treatment_plan("W", "Manual", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var patient_data_array = new Array();
    patient_data_array = get_patient_demographics();
    
    patient_data_array[1] = "              ";
    generate_hl7_message(patient_data_array);
    send_hl7_message();
    
    var result_set = new Array();
    var result_set_1 = validate_hl7_buttons("FindPatient");
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_External_Results_HL7";
    var test_name = "tc_external_results_hl7_message_single_entry_no_nhs_no";
    handle_failed_tests(suite_name, test_name);
  }
}