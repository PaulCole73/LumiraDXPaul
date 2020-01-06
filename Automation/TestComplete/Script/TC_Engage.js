//USEUNIT TSA_Engage
//USEUNIT TSA_Patient
//USEUNIT Failed_Test_Handlers
//USEUNIT engage_System_Paths
//USEUNIT TSA_Clinics_Appointments
//--------------------------------------------------------------------------------
function tc_ensure_urgent_notification_is_displayed_when_patient_does_not_understand_their_schedule()
{
  try
  {
    var test_title = "Engage - Ensure urgent notification displayed when patient does not understand their schedule";
    login(5, "Shared");
    add_patient("Regression", "Engage", "M", "Shared"); 
    add_treatment_plan("W","Manual","","Shared","");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))), "2.0", "2.5", "7");
    
    var expected_array = new Array();
    expected_array.push(
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)");
    
    var expected_text = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%a %d %b %Y") + "\n" + "½ x 5mg (Pink tablet) (2.5mg total for the day)";
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    
    //enroll the patient onto engage self-care
    warfarin_self_care('all');
    Log_Off();
    
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    
    var result_set = new Array();
    var daily_dose_text = get_daily_dose();
    var result_set_1 = compare_values(daily_dose_text, expected_text, test_title);
    result_set.push(result_set_1);
    
    //this needs to be its own function
    engage_things_to_do_today_panel().Panel(1).Panel(0).Panel(0).Click();
    engage_new_dosing_schedule_understand_buttons().Panel(1).Panel(0).Label(1).TextNode(0).Click();
    
    var schedule_data = new Array();
    schedule_data = get_schedule_data();
    
    result_set_1 = checkArrays(schedule_data, expected_array, test_title);
    result_set.push(result_set_1);
    complete_schedule(0);
    
    log_off_engage();
    
    login(5, "Shared");
    
    result_set_1 = get_urgent_patient_message(pat_nhs);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_ensure_urgent_notification_is_displayed_when_patient_does_not_understand_their_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_new_historical_treatment_is_not_most_recent_with_NTD_greater_than_existing_NTD()
{
  try
  {
    var test_title = "Engage - New historical treatment is not most recent with NTD greater than existing NTD";
    login(5, "Shared");
    add_patient("Regression", "Engage", "M", "Shared"); 
    add_treatment_plan("W","Manual","","Shared","");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.Today()), "2.0", "2.5", "7");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    
    //enroll the patient onto engage self-care
    warfarin_self_care('all');
    Log_Off();
    
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    
    //needs features in here
    var result_set = new Array();
    var daily_dose_text_1 = get_daily_dose();
    //this needs to be its own function
    engage_things_to_do_today_panel().Panel(1).Panel(0).Panel(0).Click();
    
    var schedule_data_1 = new Array();
    schedule_data_1 = get_schedule_data();
    
    log_off_engage();
    
    login(5, "Shared");
    
    patient_search(pat_nhs);
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))), "2.0", "2.0", "0", "14", "2.5");
    
    Log_Off();
    
    sign_in_engage(email_address);
    
    var daily_dose_text_2 = get_daily_dose();
    //this needs to be its own function
    engage_things_to_do_today_panel().Panel(1).Panel(0).Panel(0).Click();
    
    var schedule_data_2 = new Array();
    schedule_data_2 = get_schedule_data();
    
    log_off_engage();
    
    var result_set_1 = compare_values(daily_dose_text_1, daily_dose_text_2, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = checkArrays(schedule_data_1, schedule_data_2, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_new_historical_treatment_is_not_most_recent_with_NTD_greater_than_existing_NTD";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_new_historical_treatment_is_most_recent_with_NTD_less_than_than_existing_NTD()
{
  try
  {
    var test_title = "Engage - New historical treatment is most recent with NTD less than existing NTD";
    login(5, "Shared");
    add_patient("Regression", "Engage", "M", "Shared"); 
    add_treatment_plan("W","Manual","","Shared","");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))), "2.0", "2.5", "14");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    
    //enroll the patient onto engage self-care
    warfarin_self_care('all');
    Log_Off();
    
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    var expected_text = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%a %d %b %Y") + "\n" + "½ x 5mg (Pink tablet) (2.5mg total for the day)";
    
    //needs features in here
    var result_set = new Array();
    var daily_dose_text = get_daily_dose();
    var result_set_1 = compare_values(daily_dose_text, expected_text, test_title);
    result_set.push(result_set_1);
    
    var schedule_data_1 = new Array();
    schedule_data_1 = get_schedule_data();
    
    log_off_engage();
    login(5, "Shared");
    
    patient_search(pat_nhs);
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-2))), "2.0", "2.0", "0", "7", "2.5");
    
    Log_Off();
    sign_in_engage(email_address);
    var expected_array = new Array();
    expected_array.push(
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician");
    expected_text = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%a %d %b %Y") + "\n" + "Take warfarin as advised by clinician";
    
    var daily_dose_text = get_daily_dose();
    result_set_1 = compare_values(daily_dose_text, expected_text, test_title);
    result_set.push(result_set_1);
    
    var schedule_data_2 = new Array();
    schedule_data_2 = get_schedule_data();
    
    log_off_engage();
    
    result_set_1 = validate_arrays_dont_match(schedule_data_1, schedule_data_2, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = checkArrays(schedule_data_2, expected_array, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_new_historical_treatment_is_most_recent_with_NTD_less_than_than_existing_NTD";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_accept_engage_eula_web()
{
  try
  {
    var test_title = "Engage - Can EULA be accepted on Web";
    login(5, "Shared");
    add_patient("Regression", "Engage", "M", "Shared"); 
    add_treatment_plan("W", "Manual", "", "Shared","");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))), "2.0", "2.5", "14");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    
    warfarin_self_care('all');
    Log_Off();
    
    register_engage(email_address);
    sign_in_engage(email_address);
    
    var result_set = new Array();
    var expected_msg = "To use engage, you must confirm you have read, understood, and agree to both the Licence Agreement and the Privacy Policy.";
    var text = complete_eula_questionnaire(true, false);
    var result_set_1 = compare_values(expected_msg, text, test_title);
    result_set.push(result_set_1);
    engage_base().Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(2).Panel(0).Panel("question_checkbox_objectobject_").Panel(1).Click();
    
    expected_msg = "To use engage, you must confirm you have read, understood, and agree to both the Licence Agreement and the Privacy Policy.";
    text = complete_eula_questionnaire(false, true);
    result_set_1 = compare_values(expected_msg, text, test_title);
    result_set.push(result_set_1);
    engage_base().Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(2).Panel(0).Panel("question_checkbox_objectobject_").Panel(1).Click();
    
    expected_msg = "You have indicated that you have read, understood, and agreed to the Licence Agreement and Privacy Policy";
    text = complete_eula_questionnaire();
    result_set_1 = compare_values(expected_msg, text, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = engage_base().Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Exists;
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    log_off_engage();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_accept_engage_eula_web";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_reenrol_user_can_log_into_engage()
{
  try
  {
    var test_title = "Engage - Re-enrol Patient, (no exisiting schedule), the user can log in to Engage with the new password";
    login(5, "Shared");
    add_patient("Regression", "Engage", "M", "Shared"); 
    add_treatment_plan("W", "Manual", "", "Shared","");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-14))), "2.0", "2.0", "0", "7", "2.5");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))), "2.5", "5.0", "2");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    warfarin_self_care("all");
    
    Log_Off();
    
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    
    log_off_engage();
    login(5, "Shared");
    
    patient_search(pat_nhs);
    warfarin_self_care("disenrol");
    warfarin_self_care("all");
    
    Log_Off();
    register_engage(email_address);
    sign_in_engage(email_address);
    
    var result_set = new Array();
    var text = engage_things_i_did_yesterday_panel().Panel(1).innerText;
    var result_set_1 = compare_values(text, "You have no tasks", test_title);
    result_set.push(result_set_1);
    
    text = engage_things_to_do_soon_panel().Panel(1).innerText;
    result_set_1 = compare_values(text, "You have no tasks", test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    log_off_engage();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_reenrol_user_can_log_into_engage";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_disenrol_user_with_current_treatment_plan()
{
  try
  {
    var test_title = "Engage - Disenroll Patient from Engage (confirm non-completed task >= today are deleted)";
    login(5, "Shared");
    add_patient("Regression", "Engage", "M", "Shared"); 
    add_treatment_plan("W", "Manual", "", "Shared","");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))), "2.5", "5.0", "7");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    warfarin_self_care("all");
    
    Log_Off();
    
    var result_set = new Array();
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    complete_schedule(0); //0 is the label index for the "yes" button
    var text = Goto_Understand_Schedule_Tab();
    
    var result_set = new Array();
    var result_set_1 = compare_values(text, "Completed", test_title);
    result_set.push(result_set_1);
    
    log_off_engage();
    login(5, "Shared");
    
    patient_search(pat_nhs);
    warfarin_self_care("disenrol");
    
    Log_Off();
    sign_in_engage(email_address);
    
    result_set_1 = engage_base().FindChild("innerText", "You are not enrolled in any care programmes. Please contact your clinician.", 6).Exists;
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    log_off_engage();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_disenrol_user_with_current_treatment_plan";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_move_ntb_back_from_ten_to_seven_days_schedules_unchanged()
{
  try
  {
    var test_title = "Engage - Disenroll Patient from Engage (confirm non-completed task >= today are deleted)";
    login(5, "Shared");
    
    var clinic_name = aqConvert.DateTimeToStr(aqDateTime.Now());
    var clinic_date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (7)), "%d/%m/%Y");
    tsa_add_a_clinic(clinic_name, clinic_date, false, false);
    
    add_patient("Regression", "Engage", "M", "Shared"); 
    add_treatment_plan("W", "Manual", "", "Shared","");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))), "2.5", "5.0", "10");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    warfarin_self_care("all");
    
    Log_Off();
    
    var result_set = new Array();
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    
    var schedule_data_1 = new Array();
    schedule_data_1 = get_schedule_data();
    complete_schedule(0); //0 is the label index for the "yes" button
    
    log_off_engage();
    login(5, "Shared");
    
    patient_search(pat_nhs);
    tsa_clinic_make_appointment(clinic_name, clinic_date);
    
    Log_Off();
    sign_in_engage(email_address);
    
    var schedule_data_2 = new Array();
    schedule_data_2 = get_schedule_data();
    complete_schedule(0); //0 is the label index for the "yes" button
    
    var result_set = new Array();
    var result_set_1 = checkArrays(schedule_data_1, schedule_data_2, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    log_off_engage();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_disenrol_user_with_current_treatment_plan";
    handle_failed_tests(suite_name, test_name);
  }
}