//USEUNIT TSA_Engage
//USEUNIT TSA_Patient
//USEUNIT Failed_Test_Handlers
//USEUNIT engage_System_Paths
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
    
    //needs to get current daily dose here / also possibly date
    //needs validation at some point for correct task date?
    //needs to validate correct dosing schedule, current schedule must be retrieved here or in pending_manual_treatment?
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    
    //enroll the patient onto engage self-care
    warfarin_self_care('all');
    Log_Off();
    
    register_engage(email_address);
    sign_in_engage(email_address);
    complete_eula_questionnaire();
    
    //this needs to be its own function
    engage_things_to_do_today_panel().Panel(1).Panel(0).Panel(0).Click();
    engage_new_dosing_schedule_understand_buttons().Panel(1).Panel(0).Label(1).TextNode(0).Click();
    engage_new_dosing_submit_buttons().Button("button_home_anticoagulation_questionnaire_submit").Click();
    process_engage_popup("PopUp__Container--1SBUF PopUp__ContainerLoaded--30PKc", "Dosing Schedule", "OK");
    
    log_off_engage();
    
    login(5, "Shared");
    
    var result_set = new Array();
    var result_set_1 = get_urgent_patient_message(pat_nhs);
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