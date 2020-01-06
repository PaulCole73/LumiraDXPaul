//USEUNIT TSA_Engage
//USEUNIT TSA_Patient
//USEUNIT Failed_Test_Handlers
//USEUNIT engage_System_Paths
//USEUNIT TSA_Clinics_Appointments
//USEUNIT TSA_External_Results_HL7
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
function ensure_urgent_notification_is_displayed_when_patient_submits_an_INR_greater_than_1_below_target()
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
   
    //understand original schedule
    engage_things_to_do_today_panel().Panel(1).Panel(0).Panel(0).Click();
    engage_new_dosing_schedule_understand_buttons().Panel(1).Panel(0).Label(0).TextNode(0).Click();
    engage_new_dosing_submit_buttons().Button("button_home_anticoagulation_questionnaire_submit").Click();
    process_engage_popup("PopUp__Container--1SBUF PopUp__ContainerLoaded--30PKc", "Dosing Schedule", "OK");
   
    //set INR and dose to be used for engage
    var INR = (StrToFloat(targetINR) - 1.1);
    var dose = '2.5'
    engage_submit_my_INR_tile().Click();
    var submitted_date_time = submit_INR_with_answers(INR,0,dose,1,1,1);
//     
    log_off_engage();
   
    login(5, "Shared");
   
    var result_set = new Array();
    var urgent_message_text = get_urgent_patient_message_text(pat_nhs);
    var expected_urgent_text = "INR is more than 1 below Target"
    result_set_1 = compare_values(urgent_message_text, expected_urgent_text, test_title);
    result_set.push(result_set_1);
   
    //process the external result from engage
    Goto_Patient_Results();
    dose_patient_external_result(1);
   
    var warning_message_check = pending_treatment_buttons().Panel("PatientTreatmentNewINRWrapper").Panel("NewINRMessages").contentText;
    var expected_warning_message = "Early INR test"
    result_set_1 = data_contains_checker(warning_message_check,expected_warning_message,test_title);
    result_set.push(result_set_1);
   
    //check INR value is the same as entered into engage
    var INR_value = pre_treatment_non_induct_path().Panel(1).Select("INR").wText;
    result_set_1 = compare_values(INR_value, INR, test_title);
    result_set.push(result_set_1);
   
    //check test date is the same as entered into engage
    var INR_date = pre_treatment_non_induct_path().Panel(0).Label("Date_Value_DetachedLabel").contentText;
    result_set_1 = compare_values(INR_date, aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y"), test_title);
    result_set.push(result_set_1);
   
    //check the clinical question tickboxes
    var changed_dose_checkbox = pending_treatment_buttons().Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm").Panel("PatientTreatmentNewINRQuestionsWrapper").Panel("PatientTreatmentNewINRConfirm").Panel("LastTreatment").Checkbox("PatientChangedLastTreatment").checked;
    result_set_1 = compare_values(changed_dose_checkbox, false, test_title);
    result_set.push(result_set_1);
   
    var missed_dose_checkbox = pending_treatment_buttons().Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm").Panel("PatientTreatmentNewINRQuestionsWrapper").Panel("PatientTreatmentNewINRConfirm").Panel("MissedDose").Checkbox("MissedDoses").checked;
    result_set_1 = compare_values(missed_dose_checkbox, false, test_title);
    result_set.push(result_set_1);
       
    var changed_medication_checkbox = pending_treatment_buttons().Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm").Panel("PatientTreatmentNewINRQuestionsWrapper").Panel("PatientTreatmentNewINRConfirm").Panel("ChangedMedications").Checkbox("ChangedMedication").checked;
    result_set_1 = compare_values(changed_medication_checkbox, false, test_title);
    result_set.push(result_set_1);
   
    Log.Message("clinical question tickboxes OK")
   
    //check the comments contain the correct details entered into engage
    var yesterday = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(),-1), "%A %d-%b-%Y");
    var actual_submission_comments = pending_treatment_buttons().Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm").Panel("PatientTreatmentNewINRQuestionsWrapper").Panel("PatientTreatmentNewINRConfirm").Panel("NewINRComments").Textarea("Comments").contentText;
    var expected_submission_comments = "Patient Self Testing INR taken on " + submitted_date_time +
    " No bleeding event reported. Patient states that they took " + dose + "mg Warfarin on " + yesterday;
    result_set_1 = compare_values(actual_submission_comments, expected_submission_comments, test_title);
    result_set.push(result_set_1);
   
    //complete and save the treatment
    var test_info_path = treatment_inr_test_info_path()
    test_info_path.Panel(0).Select("Dose").ClickItem("2.0");
    test_info_path.Panel(2).Select("Review").ClickItem("7 Days");
   
    var treatment_button_path = treatment_buttons_pre_schedule();
    treatment_button_path.SubmitButton("SubmitManualDose").Click();
    handle_poct_expired();
  
    //Confirm the values
    var INRstarV5 = INRstar_base();
    var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
    wbt_Confirm.Click();
 
    var popup = INRstarV5.NativeWebObject.Find("contentText", "Insert Confirmation");
    if(popup.Exists == true)
    {
      process_popup("Insert Confirmation", "Confirm");
    }
  
    WaitSeconds(2, "Saving the Treatment");
 
    //Save the INR
    var pending_treatment_buttons_path = pending_treatment_buttons();
    pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
   
    //login to engage
    sign_in_engage(email_address);
    //confirm the perform your INR test date
    var testDueDate = engage_things_to_do_soon_panel().Panel(1).Panel(6).textContent.split(": ");
    var actualDueDate = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(),+7), "%a %d %b %Y");
    result_set_1 = compare_values(testDueDate[1],actualDueDate,test_title);
    result_set.push(result_set_1);
    //confirm the new schedule
    var expected_schedule_array = new Array();
    var new_schedule = get_schedule_data();
    expected_schedule_array.push("   2 x 1mg (Brown tablet)\n(2mg total for the day)","   2 x 1mg (Brown tablet)\n(2mg total for the day)"
    ,"   2 x 1mg (Brown tablet)\n(2mg total for the day)","   2 x 1mg (Brown tablet)\n(2mg total for the day)"
    ,"   2 x 1mg (Brown tablet)\n(2mg total for the day)","   2 x 1mg (Brown tablet)\n(2mg total for the day)","   2 x 1mg (Brown tablet)\n(2mg total for the day)",);  
    result_set_1 = checkArrays(new_schedule, expected_schedule_array, test_title);
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