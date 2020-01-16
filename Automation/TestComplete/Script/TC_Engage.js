//USEUNIT TSA_Engage
//USEUNIT TSA_Patient
//USEUNIT Failed_Test_Handlers
//USEUNIT engage_System_Paths
//USEUNIT TSA_Clinics_Appointments
//USEUNIT TSA_External_Results_HL7
//USEUNIT System_Paths
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
    
    var schedule_data = new Array();
    schedule_data = get_schedule_data();
    
    complete_schedule(1); //0 is the label index for the "yes" button
    
    result_set_1 = checkArrays(schedule_data, expected_array, test_title);
    result_set.push(result_set_1);
    
    log_off_engage();
    login(5, "Shared");
    
    var temp = get_urgent_patient_message_text(pat_nhs);
    result_set_1 = compare_values(temp, false, test_title);
    result_set.push(results_checker_are_false(result_set_1));
    
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
    restart_engage();
  }
}
//--------------------------------------------------------------------------------
function tc_ensure_urgent_notification_is_displayed_when_patient_submits_an_INR_greater_than_1_below_target()
{
  try
  {
    var test_title = "Engage - Ensure urgent notification is displayed when patient submits an INR greater than 1 below target";
    login(5, "Shared");
    //needs to get diagnosis Target INR
    Goto_Options_Diagnosis();
    options_diagnosis_list().ClickItem("Atrial fibrillation");
    var targetINR = diagnosis_details().Panel(1).Label("TargetINR_DetachedLabel").innerText;
    WaitSeconds(1);
   
    add_patient("Regression", "Engage", "M", "Shared");
    add_treatment_plan("W","Manual","","Shared","");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))), "2.0", "2.5", "7");
    WaitSeconds(2);
   
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
   
    //enroll the patient onto engage self-care
    warfarin_self_care('all');
    Log_Off();
   
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    complete_schedule(0); //0 is the label index for the "yes" button
   
    //set INR and dose to be used for engage
    var INR = (StrToFloat(targetINR) - 1.1);
    var dose = "2.5"
    var submitted_date_time = submit_INR_with_answers(INR ,0 , dose, 1, 1, 1);
    
    log_off_engage();
    login(5, "Shared");
   
    var result_set = new Array();
    var urgent_message_text = get_urgent_patient_message_text(pat_nhs);
    var expected_urgent_text = "INR is more than 1 below Target"
    var result_set_1 = compare_values(urgent_message_text, expected_urgent_text, test_title);
    result_set.push(result_set_1);
   
    //process the external result from engage
    dose_patient_external_result(1);
   
    var warning_message_check = pending_treatment_buttons().Panel("PatientTreatmentNewINRWrapper").Panel("NewINRMessages").contentText;
    var expected_warning_message = "Early INR test"
    result_set_1 = data_contains_checker(warning_message_check,expected_warning_message,test_title);
    result_set.push(result_set_1);
    
    var external_dose_data = new Array();
    external_dose_data = dose_external_result("2.0", "7 Days");
    
    result_set_1 = compare_values(external_dose_data[0], INR, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[1], aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y"), test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[2], false, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[3], false, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[4], false, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[6], true, test_title);
    result_set.push(result_set_1);
    
    var yesterday = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), -1), "%A %d-%b-%Y");
    var expected_submission_comments = "Patient Self Testing INR taken on " + submitted_date_time +
    " No bleeding event reported. Patient states that they took " + dose + "mg Warfarin on " + yesterday;
    
    result_set_1 = compare_values(external_dose_data[5], expected_submission_comments, test_title);
    result_set.push(result_set_1);
   
    Log_Off();
    sign_in_engage(email_address);
    
    var testDueDate = get_perform_inr_test_due_date();
    var actualDueDate = "Due date: " + aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (7)), "%a %d %b %Y");
    result_set_1 = compare_values(testDueDate, actualDueDate, test_title);
    result_set.push(result_set_1);
    
    var expected_schedule_array = new Array();
    var new_schedule = get_schedule_data();
    expected_schedule_array.push(
    "   2 x 1mg (Brown tablet)\n(2mg total for the day)",
    "   2 x 1mg (Brown tablet)\n(2mg total for the day)",
    "   2 x 1mg (Brown tablet)\n(2mg total for the day)",
    "   2 x 1mg (Brown tablet)\n(2mg total for the day)",
    "   2 x 1mg (Brown tablet)\n(2mg total for the day)",
    "   2 x 1mg (Brown tablet)\n(2mg total for the day)",
    "   2 x 1mg (Brown tablet)\n(2mg total for the day)",);  
    result_set_1 = checkArrays(new_schedule, expected_schedule_array, test_title);
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
    var test_name = "tc_ensure_urgent_notification_is_displayed_when_patient_submits_an_INR_greater_than_1_below_target";
    handle_failed_tests(suite_name, test_name);
    restart_engage();
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
    add_treatment_plan("W", "Manual", "", "Shared", "");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.Today()), "2.0", "2.5", "7");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    
    //enroll the patient onto engage self-care
    warfarin_self_care("all");
    Log_Off();
    
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    
    //needs features in here
    var result_set = new Array();
    var daily_dose_text_1 = get_daily_dose();
    var schedule_data_1 = new Array();
    schedule_data_1 = get_schedule_data();
    
    log_off_engage();
    login(5, "Shared");
    
    patient_search(pat_nhs);
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))), "2.0", "2.0", "0", "14", "2.5");
    
    Log_Off();
    sign_in_engage(email_address);
    
    var daily_dose_text_2 = get_daily_dose();
    var schedule_data_2 = new Array();
    schedule_data_2 = get_schedule_data();
    
    var result_set_1 = compare_values(daily_dose_text_1, daily_dose_text_2, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = checkArrays(schedule_data_1, schedule_data_2, test_title);
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
    var test_name = "tc_new_historical_treatment_is_not_most_recent_with_NTD_greater_than_existing_NTD";
    handle_failed_tests(suite_name, test_name);
    restart_engage();
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
    restart_engage();
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
    restart_engage();
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
    restart_engage();
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
    var text = Goto_Understand_Schedule_Tab(false);
    
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
    restart_engage();
  }
}
//--------------------------------------------------------------------------------
function tc_move_ntd_back_from_ten_to_seven_days_schedules_unchanged()
{
  try
  {
    var test_title = "Engage - Disenroll Patient from Engage (confirm non-completed task >= today are deleted)";
    login(7, "Shared");
    
    var clinic_name = aqConvert.DateTimeToStr(aqDateTime.Now());
    var clinic_date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (17)), "%d/%m/%Y");
    tsa_add_a_clinic(clinic_name, clinic_date, false, false);
    
    add_patient("Regression", "Engage", "M", "Shared"); 
    add_treatment_plan("W", "Manual", "", "Shared","");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))), "2.5", "5.0", "10");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    warfarin_self_care("all");
    
    Log_Off();
    
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    
    var schedule_data_1 = new Array();
    schedule_data_1 = get_schedule_data();
    
    log_off_engage();
    login(5, "Shared");
    
    patient_search(pat_nhs);
    var current_test_date = aqDateTime.AddDays(aqDateTime.Today(), (10));
    tsa_clinic_make_appointment(clinic_name, clinic_date, current_test_date);
    
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
    var test_name = "tc_move_ntb_back_from_ten_to_seven_days_schedules_unchanged";
    handle_failed_tests(suite_name, test_name);
    restart_engage();
  }
}
//--------------------------------------------------------------------------------
function tc_move_ntd_back_from_seven_to_six_days_schedules_changed()
{
  try
  {
    var test_title = "Engage - Move NTD Backward (7 day review to 6 day review - Generic Schedule Text is correctly appearing in Engage)";
    login(7, "Shared");
    
    var expected_msg = "Changing the next test date could make the patient's existing dosing schedule inaccurate. Please contact the patient to advise on a suitable dosing schedule.";
    var expected_array_1 = new Array();
    expected_array_1.push(
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)"); 
    var expected_array_2 = new Array();
    expected_array_2.push(
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician"); 
    
    var clinic_name = aqConvert.DateTimeToStr(aqDateTime.Now());
    var clinic_date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (6)), "%d/%m/%Y");
    tsa_add_a_clinic(clinic_name, clinic_date, false, false);
    
    add_patient("Regression", "Engage", "M", "Shared"); 
    add_treatment_plan("W", "Manual", "", "Shared","");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))), "2.5", "2.5", "7");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    warfarin_self_care("all");
    
    Log_Off();
    
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    
    var schedule_data = new Array();
    schedule_data = get_schedule_data();
    
    var result_set = new Array();
    var result_set_1 = checkArrays(schedule_data, expected_array_1, test_title);
    result_set.push(result_set_1);
    
    log_off_engage();
    login(5, "Shared");
    
    patient_search(pat_nhs);
    var current_test_date = aqDateTime.AddDays(aqDateTime.Today(), (7));
    var msg = tsa_clinic_make_appointment(clinic_name, clinic_date, current_test_date, 1);
    
    Log_Off();
    sign_in_engage(email_address);
    
    schedule_data = get_schedule_data();
    complete_schedule(0); //0 is the label index for the "yes" button
    
    var result_set_1 = checkArrays(schedule_data, expected_array_2, test_title);
    result_set.push(result_set_1);
  
    var result_set_1 = compare_values(msg, expected_msg, test_title);
    result_set.push(result_set_1);
    
    submit_INR_with_answers("2.5", 0, "2.5", 1, 1, 1);
    
    log_off_engage();
    login(5, "Shared");
    
    var external_patient_data = get_hl7_patient_info(1);
    var ext_nhs = external_patient_data[3];
    result_set_1 = compare_values(pat_nhs, ext_nhs, test_title);
    result_set.push(result_set_1);
    
    var ext_inr = external_patient_data[5];
    result_set_1 = compare_values("2.5", ext_inr, test_title);
    result_set.push(result_set_1);
    
    Log_Off();
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_move_ntb_back_from_seven_to_six_days_schedules_changed";
    handle_failed_tests(suite_name, test_name);
    restart_engage();
  }
}
//--------------------------------------------------------------------------------
function tc_move_ntd_forward_from_five_to_seven_days_schedules_changed()
{
  try
  {
    var test_title = "Engage - Move NTD forward (5 day review to 7 day review - Generic Schedule Text is correctly appearing in Engage)";
    login(7, "Shared");
    
    var expected_msg = "Changing the next test date could make the patient's existing dosing schedule inaccurate. Please contact the patient to advise on a suitable dosing schedule.";
    var expected_array_1 = new Array();
    expected_array_1.push(
    "   1 x 5mg (Pink tablet)" + "\n(5mg total for the day)", 
    "   1 x 5mg (Pink tablet)" + "\n(5mg total for the day)", 
    "   1 x 5mg (Pink tablet)" + "\n(5mg total for the day)", 
    "   1 x 5mg (Pink tablet)" + "\n(5mg total for the day)",
    "   1 x 5mg (Pink tablet)" + "\n(5mg total for the day)"); 
    var expected_array_2 = new Array();
    expected_array_2.push(
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician", 
    "   Take warfarin as advised by clinician",
    "   Take warfarin as advised by clinician"); 
    
    var clinic_name = aqConvert.DateTimeToStr(aqDateTime.Now());
    var clinic_date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (7)), "%d/%m/%Y");
    tsa_add_a_clinic(clinic_name, clinic_date, false, false);
    add_patient("Regression", "Engage", "M", "Shared"); 
    add_treatment_plan("W", "Manual", "", "Shared","");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))), "2.5", "5.0", "5");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    warfarin_self_care("all");
    
    Log_Off();
    
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    
    var schedule_data = new Array();
    schedule_data = get_schedule_data();
    
    var result_set = new Array();
    var result_set_1 = checkArrays(schedule_data, expected_array_1, test_title);
    result_set.push(result_set_1);
    
    log_off_engage();
    login(5, "Shared");
    
    patient_search(pat_nhs);
    var current_test_date = aqDateTime.AddDays(aqDateTime.Today(), (5));
    var msg = tsa_clinic_make_appointment(clinic_name, clinic_date, current_test_date, 1);
    
    Log_Off();
    sign_in_engage(email_address);
    
    var schedule_data = new Array();
    schedule_data = get_schedule_data();
    complete_schedule(0); //0 is the label index for the "yes" button
    
    var result_set_1 = checkArrays(schedule_data, expected_array_2, test_title);
    result_set.push(result_set_1);
    var result_set_1 = compare_values(msg, expected_msg, test_title);
    result_set.push(result_set_1);
    submit_INR_with_answers("2.5", 0, "2.5", 1, 1, 1);
    
    log_off_engage();
    login(5, "Shared");
    
    var external_patient_data = get_hl7_patient_info(1);
    var ext_nhs = external_patient_data[3];
    result_set_1 = compare_values(pat_nhs, ext_nhs, test_title);
    result_set.push(result_set_1);
    
    var ext_inr = external_patient_data[5];
    result_set_1 = compare_values("2.5", ext_inr, test_title);
    result_set.push(result_set_1);
    
    Log_Off();
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_move_ntb_forward_from_five_to_seven_days_schedules_changed";
    handle_failed_tests(suite_name, test_name);
    restart_engage();
  }
}
//--------------------------------------------------------------------------------
function tc_add_inr_update_inr_delete_inr_confirm_original_schedule()
{
  try
  {
    var test_title = "Engage - Early INR (submitted by clinician) then delete treatment (Previous NTD in the future reinstating NTD, doses and schedule)";
    login(7, "Shared");
    add_patient("Regression", "Engage", "M", "Shared"); 
    add_treatment_plan("W", "Manual", "", "Shared","");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-2))), "2.5", "5.0", "7");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    warfarin_self_care("all");
    
    Log_Off();
    
    var expected_text = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%a %d %b %Y") + "\n" + "1 x 5mg (Pink tablet) (5mg total for the day)";
    var expected_date = "Due date: " + aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (5)), "%a %d %b %Y");
    var expected_array = new Array();
    expected_array.push(
    "   1 x 5mg (Pink tablet)" + "\n(5mg total for the day)", 
    "   1 x 5mg (Pink tablet)" + "\n(5mg total for the day)", 
    "   1 x 5mg (Pink tablet)" + "\n(5mg total for the day)", 
    "   1 x 5mg (Pink tablet)" + "\n(5mg total for the day)", 
    "   1 x 5mg (Pink tablet)" + "\n(5mg total for the day)", 
    "   1 x 5mg (Pink tablet)" + "\n(5mg total for the day)", 
    "   1 x 5mg (Pink tablet)" + "\n(5mg total for the day)");
    
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    
    var schedule_data = new Array();
    var result_set = new Array();
    var text = get_daily_dose();
    var result_set_1 = compare_values(text, expected_text, test_title);
    result_set.push(result_set_1);
    
    text = get_perform_inr_test_due_date();
    result_set_1 = compare_values(text, expected_date, test_title);
    result_set.push(result_set_1);
    
    schedule_data = get_schedule_data();
    result_set_1 = checkArrays(schedule_data, expected_array, test_title);
    result_set.push(result_set_1);
    
    log_off_engage();
    login(5, "Shared");
    
    patient_search(pat_nhs);
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))), "2.5", "2.5", "7", "PoCT");
    
    Log_Off();
    sign_in_engage(email_address);
    
    var expected_text_1 = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%a %d %b %Y") + "\n" + "½ x 5mg (Pink tablet) (2.5mg total for the day)";
    var expected_date_1 = "Due date: " + aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (7)), "%a %d %b %Y");
    var expected_array_1 = new Array();
    expected_array_1.push(
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)");
    
    text = get_daily_dose();
    result_set_1 = compare_values(text, expected_text_1, test_title);
    result_set.push(result_set_1);
    
    text = get_perform_inr_test_due_date();
    result_set_1 = compare_values(text, expected_date_1, test_title);
    result_set.push(result_set_1);
    
    schedule_data = get_schedule_data();
    result_set_1 = checkArrays(schedule_data, expected_array_1, test_title);
    result_set.push(result_set_1);
    
    log_off_engage();
    login(5, "Shared");
    
    patient_search(pat_nhs);
    delete_treatment();
    
    Log_Off();
    sign_in_engage(email_address);
    
    text = get_daily_dose();
    result_set_1 = compare_values(text, expected_text, test_title);
    result_set.push(result_set_1);
    
    text = get_perform_inr_test_due_date();
    result_set_1 = compare_values(text, expected_date, test_title);
    result_set.push(result_set_1);
    
    schedule_data = get_schedule_data();
    result_set_1 = checkArrays(schedule_data, expected_array, test_title);
    result_set.push(result_set_1);
    
    log_off_engage();
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_add_inr_update_inr_delete_inr_confirm_original_schedule";
    handle_failed_tests(suite_name, test_name);
    restart_engage();
  }
}
//--------------------------------------------------------------------------------
function tc_overdue_inr_switch_to_valid_inr_delete_latest_saved_completed_schedule()
{
  try
  {
    var test_title = "Engage - Overdue INR (submitted by clinician) then delete treatment (Previous NTD in the past - removes non-completed tasks)";
    login(7, "Shared");
    add_patient("Regression", "Engage", "M", "Shared"); 
    add_treatment_plan("W", "Manual", "", "Shared","");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))), "2.5", "5.0", "2");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    warfarin_self_care("all");
    
    Log_Off();
    
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    
    var result_set = new Array();
    var task_text = engage_things_to_do_soon_panel().Panel(1).innerText;
    var result_set_1 = compare_values(task_text, "You have no tasks", test_title);
    result_set.push(result_set_1);
    
    log_off_engage();
    login(5, "Shared");
    
    patient_search(pat_nhs);
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))), "2.5", "2.5", "7", "PoCT");
    
    Log_Off();
    sign_in_engage(email_address);
    
    var expected_array = new Array();
    expected_array.push(
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)");
    
    var schedule_data = get_schedule_data();
    result_set_1 = checkArrays(schedule_data, expected_array, test_title);
    result_set.push(result_set_1);
    
    complete_schedule(0); //0 is the label index for the "yes" button
    
    log_off_engage();
    login(5, "Shared");
    
    patient_search(pat_nhs);
    delete_treatment();
    
    Log_Off();
    sign_in_engage(email_address);
    
    task_text = engage_things_to_do_soon_panel().Panel(1).innerText;
    result_set_1 = compare_values(task_text, "You have no tasks", test_title);
    result_set.push(result_set_1);
    
    var schedule_text = Goto_Understand_Schedule_Tab(false);
    result_set_1 = compare_values(schedule_text, "Completed", test_title);
    result_set.push(result_set_1);
    
    log_off_engage();
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_overdue_inr_switch_to_valid_inr_delete_latest_saved_completed_schedule";
    handle_failed_tests(suite_name, test_name);
    restart_engage();
  }
}
//--------------------------------------------------------------------------------
function tc_submit_multiple_inrs_same_day_long_dose_schedule()
{
  try //this test will currently fail due to a known bug in engage
  {
    var test_title = "Engage - Correct behaviour when submitting multiple INRs on the same day, long dose schedule is displayed in engage";
    login(7, "Shared");
    add_patient("Regression", "Engage", "M", "Shared"); 
    add_treatment_plan("W", "Manual", "", "Shared","");
    var dose = "1.0";
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))), "2.5", dose, "3");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    warfarin_self_care("all");
    
    Log_Off();
    
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    
    var submitted_date_time = submit_INR_with_answers("2.2", 0, dose, 1, 1, 1);
    submit_INR_with_answers("2.3", 0, dose, 1, 1, 1);
        
    log_off_engage();
    login(5, "Shared");
    
    dose_patient_external_result(2);
    
    var external_dose_data = new Array();
    external_dose_data = dose_external_result("2.5", "70 Days");
    
    var result_set = new Array();
    var result_set_1 = compare_values(external_dose_data[0], "2.2", test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[1], aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y"), test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[2], false, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[3], false, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[4], false, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[6], true, test_title);
    result_set.push(result_set_1);
    
    var yesterday = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(),-1), "%A %d-%b-%Y");
    var expected_submission_comments = "Patient Self Testing INR taken on " + submitted_date_time +
    " No bleeding event reported. Patient states that they took " + dose + "mg Warfarin on " + yesterday;
    
    result_set_1 = compare_values(external_dose_data[5], expected_submission_comments, test_title);
    result_set.push(result_set_1);
    
    Log_Off();
    sign_in_engage(email_address);
    
    var expected_array = new Array();
    expected_array.push(
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)", 
    "   ½ x 5mg (Pink tablet)" + "\n(2.5mg total for the day)");
    var expected_date = "Due date: " + aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (70)), "%a %d %b %Y");
    
    var schedule_data = get_schedule_data();
    result_set_1 = checkArrays(schedule_data, expected_array, test_title);
    result_set.push(result_set_1);
    
    var text = get_perform_inr_test_due_date();
    result_set_1 = compare_values(text, expected_date, test_title);
    result_set.push(result_set_1);
    
    log_off_engage();
    login(5, "Shared");
    
    dose_patient_external_result(1, 1);
    
    var external_dose_data = new Array();
    external_dose_data = dose_external_result("2.5", "10 Days");
    
    var result_set = new Array();
    var result_set_1 = compare_values(external_dose_data[0], "2.3", test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[1], aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y"), test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[2], false, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[3], false, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[4], false, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[6], true, test_title);
    result_set.push(result_set_1);
    
    var yesterday = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(),-1), "%A %d-%b-%Y");
    var expected_submission_comments = "Patient Self Testing INR taken on " + submitted_date_time +
    " No bleeding event reported. Patient states that they took " + dose + "mg Warfarin on " + yesterday;
    
    result_set_1 = compare_values(external_dose_data[5], expected_submission_comments, test_title);
    result_set.push(result_set_1);
    
    Log_Off();
    sign_in_engage(email_address);
    
    expected_date = "Due date: " + aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (10)), "%a %d %b %Y");
    schedule_data = get_schedule_data();
    result_set_1 = checkArrays(schedule_data, expected_array, test_title);
    result_set.push(result_set_1);
    complete_schedule(0); //0 is the label index for the "yes" button
    
    text = get_perform_inr_test_due_date();
    result_set_1 = compare_values(text, expected_date, test_title);
    result_set.push(result_set_1);
    
    log_off_engage();
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_submit_multiple_inrs_same_day_long_dose_schedule";
    handle_failed_tests(suite_name, test_name);
    restart_engage();
  }
}
//--------------------------------------------------------------------------------
function tc_ensure_urgent_notification_is_displayed_when_patient_submits_an_INR_greater_than_5()
{
  try
  {
    var test_title = "Engage - Ensure urgent notification is displayed when patient submits an INR greater than 5";
    login(5, "Shared");
    add_patient("Regression", "Engage", "M", "Shared");
    add_treatment_plan("W","Hillingdon","","Shared","");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-14))), "2.0", "2.5", "0", "7", "2.5");
    add_maintenance_treatment('2.5',aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
    WaitSeconds(2);
   
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
   
    //enroll the patient onto engage self-care
    warfarin_self_care('all');
    Log_Off();
   
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
   
    //understand original schedule
    complete_schedule(0);
   
    //set INR and dose to be used for engage
    var INR = "6.8";
    var dose = "2.5";
    var submitted_date_time = submit_INR_with_answers(INR, 0, dose, 1, 1, 1);     
    log_off_engage();
   
    login(5, "Shared");
   
    var result_set = new Array();
    var urgent_message_text = get_urgent_patient_message_text(pat_nhs);
    var expected_urgent_text = "INR is greater than 5";
    var result_set_1 = compare_values(urgent_message_text, expected_urgent_text, test_title);
    result_set.push(result_set_1);
   
    //process the external result from engage
    dose_patient_external_result(1);
   
    var warning_message_check = pending_treatment_buttons().Panel("PatientTreatmentNewINRWrapper").Panel("NewINRMessages").contentText;
    var expected_warning_message = "Early INR test"
    result_set_1 = data_contains_checker(warning_message_check, expected_warning_message, test_title);
    result_set.push(result_set_1);
    
    var external_dose_data = new Array();
    external_dose_data = dose_external_result("2.0", "7 Days", "maintenance");
    
    result_set_1 = compare_values(external_dose_data[0], INR, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[1], aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y"), test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[2], false, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[3], false, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[4], false, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[6], true, test_title);
    result_set.push(result_set_1);
    
    var yesterday = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), -1), "%A %d-%b-%Y");
    var expected_submission_comments = "Patient Self Testing INR taken on " + submitted_date_time +
    " No bleeding event reported. Patient states that they took " + dose + "mg Warfarin on " + yesterday;
    
    result_set_1 = compare_values(external_dose_data[5], expected_submission_comments, test_title);
    result_set.push(result_set_1);
    
    Log_Off();
    sign_in_engage(email_address);
    
    //confirm the perform your INR test date - write a function to find the due date
    var testDueDate = engage_things_to_do_soon_panel().Panel(1).Panel(4).textContent.split(": ");
    var actualDueDate = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(),+5), "%a %d %b %Y");
    result_set_1 = compare_values(testDueDate[1],actualDueDate,test_title);
    result_set.push(result_set_1);
    //confirm the new schedule
    var expected_schedule_array = new Array();
    var new_schedule = get_schedule_data();
    expected_schedule_array.push(
    "   Do not take warfarin tablets today\n(0mg total for the day)",
    "   Do not take warfarin tablets today\n(0mg total for the day)",
    "   1½ x 1mg (Brown tablet)\n(1.5mg total for the day)",
    "   1½ x 1mg (Brown tablet)\n(1.5mg total for the day)",
    "   2 x 1mg (Brown tablet)\n(2mg total for the day)",);  
    result_set_1 = checkArrays(new_schedule, expected_schedule_array, test_title);
    result_set.push(result_set_1);
    log_off_engage();
   
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_ensure_urgent_notification_is_displayed_when_patient_submits_an_INR_greater_than_5";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_inrange_INR_with_bleeding_event_incorrect_previous_dose_change_to_medication_and_missed_dose_using_split_tablets()
{
  try
  {
    var test_title = "Engage - inrange INR with bleeding event incorrect previous dose change to medication and missed dose using split tablets";
    login(5, "Shared");
    var pat_no = new_guid(8);
    add_patient("Regression", "Engage", "M", "Shared", "", pat_no);
    add_treatment_plan("W", "Manual", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-14))), "2.0", "2.5", "0", "14", "2.5");
    WaitSeconds(2);
   
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
   
    //enroll the patient onto engage self-care
    warfarin_self_care('all');
    Log_Off();
   
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
   
    //set INR and dose to be used for submit INR
    var result_set = new Array(); 
    var INR = "2.8";
    var dose = "2.5";
    var returned_text = submit_INR_with_answers(INR, 1, dose, 1, 1, 1);
    var expected_text = "You have indicated that the INR value on this screen is not the same as the INR displayed on your machine. " +
                        "This could lead to incorrect dosing advice.\nPlease contact your anticoagulation clinic for further advice."
    var result_set_1 = compare_values(returned_text, expected_text, test_title);
    result_set.push(result_set_1);
    cancel_submit_INR("leave"); 
        
    log_off_engage();
    login(5, "Shared");
   
    //search for the external result from engage and comfirm it has not been sent back
    //retrieve the top patient details and compare to patient being tested
    //remove dob from top_patient_data as all our patients have the same dob
    var top_patient_data = get_hl7_patient_info(1); //surname, firstname, dob, nhs, pat_no
    var top_patient_data2 = new Array();
    top_patient_data2.push(top_patient_data[0], top_patient_data[1], top_patient_data[3], top_patient_data[4])
    
    var test_patient_data = new Array();
    test_patient_data.push(patient_demographics[3], patient_demographics[4], patient_demographics[1], patient_demographics[0]);
    
    var result_set_1 = validate_arrays_dont_match(top_patient_data2, test_patient_data, test_title);
    result_set.push(result_set_1);
    
    Log_Off();
    sign_in_engage(email_address);
    
    var INR = "2.8";
    var dose = "2.0";
    var submitted_date_time = submit_INR_with_answers(INR, 0, dose, 0, 0, 0);
    //complete the submit INR task
    complete_things_to_do_today_task("Perform your INR test"); 
      
    log_off_engage();
    login(5, "Shared");
    
    var urgent_message_text = get_urgent_patient_message_text(pat_nhs);
    var expected_urgent_text = "Patient has stated bleeding has occurred";
    var result_set_1 = compare_values(urgent_message_text, expected_urgent_text, test_title);
    result_set.push(result_set_1);
    
    //process the external result from engage
    dose_patient_external_result(1);
    
    var external_dose_data = new Array();
    external_dose_data = dose_external_result("1.5", "7 Days", "manual");
    
    result_set_1 = compare_values(external_dose_data[0], INR, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[1], aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y"), test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[2], true, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[3], true, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[4], true, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(external_dose_data[6], true, test_title);
    result_set.push(result_set_1);
    
    //check the comments contain the correct details entered into engage
    var yesterday = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(),-1), "%A %d-%b-%Y");
    var expected_submission_comments = "Patient Self Testing INR taken on " + submitted_date_time +
    " *** Patient has reported a bleeding event. *** Patient states that they took " + dose + "mg Warfarin on " + yesterday;
    
    result_set_1 = compare_values(external_dose_data[5], expected_submission_comments, test_title);
    result_set.push(result_set_1);
    
    Log_Off();
    sign_in_engage(email_address);
    
    //confirm the perform your INR test date - write a function to find the due date
    var testDueDate = engage_things_to_do_soon_panel().Panel(1).Panel(4).textContent.split(": ");
    var actualDueDate = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(),+5), "%a %d %b %Y");
    result_set_1 = compare_values(testDueDate[1],actualDueDate,test_title);
    result_set.push(result_set_1);
    
    //confirm the new schedule
    var expected_schedule_array = new Array();
    var new_schedule = get_schedule_data();
    expected_schedule_array.push(
    "   ½ x 3mg (Blue tablet)\n(1.5mg total for the day)",
    "   ½ x 3mg (Blue tablet)\n(1.5mg total for the day)",
    "   ½ x 3mg (Blue tablet)\n(1.5mg total for the day)",
    "   ½ x 3mg (Blue tablet)\n(1.5mg total for the day)",
    "   ½ x 3mg (Blue tablet)\n(1.5mg total for the day)",
    "   ½ x 3mg (Blue tablet)\n(1.5mg total for the day)",
    "   ½ x 3mg (Blue tablet)\n(1.5mg total for the day)");  
    result_set_1 = checkArrays(new_schedule, expected_schedule_array, test_title);
    result_set.push(result_set_1);
    log_off_engage();
   
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_inrange_INR_with_bleeding_event_incorrect_previous_dose_change_to_medication_and_missed_dose_using_split_tablets";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------