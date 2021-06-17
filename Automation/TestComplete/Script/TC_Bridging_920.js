//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Reviews
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Patient_Management
//USEUNIT TSA_Self_Care
//USEUNIT TSA_Bridging
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//USEUNIT Get_Functions
//--------------------------------------------------------------------------------
//CACUK-920
//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_ddd_all_permissions()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - 'New Bridging Record' button disabled - on DDD - All permission levels";
    login(7, "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    self_care_DDD("1");
    
    var pat_nhs = get_patient_nhs();
    var result_set = new Array();
    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var state = "";
    
      login(i, "Shared");
      patient_search(pat_nhs);
      state = get_new_bridging_record_button_state();
      
      result_set_1 = button_checker(state, "disabled", "Check " + i + " Permissions");
      result_set.push(result_set_1);
      
      var results = results_checker_are_true(result_set);
      results_checker(results, test_title);
      Log_Off();
    }
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_button_state_on_ddd_all_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_banner_msg_on_ddd_all_permissions()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - Banner is displayed - on DDD - All permission levels";
    login(7, "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    self_care_DDD("1");
    
    var pat_nhs = get_patient_nhs();
    var result_set = new Array();
    var expected_msg = "The patient is currently enrolled in the Digital Dosing Diary programme. You cannot create a bridging record for a patient who is on a care programme."

    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var state = "";
    
      login(i, "Shared");
      patient_search(pat_nhs);

      
      if(validate_bridging_tab_exists() == true)
      {
        patient_clinical_tab().Link("PatientBridgingTab").Click();
        var actual_msg = patient_treatment_bridging_tab().Panel("BridgingMessages").innerText
      }   
      
      result_set_1 = compare_values(expected_msg, actual_msg, test_title);
      result_set.push(result_set_1);
      
      var results = results_checker_are_true(result_set);
      results_checker(results, test_title);
      Log_Off();
    }
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_banner_msg_on_ddd_all_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_ddd_stage_one()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - 'New Bridging Record' button disabled - Part 1 DDD";
    login(5, "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    self_care_DDD("1");
    
    var result_set = new Array();
    Goto_Patient_Treatment();
    var state = get_new_bridging_record_button_state();
      
    result_set_1 = button_checker(state, "disabled", test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_button_state_on_ddd_stage_one";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_warfarin_self_test_all_permissions()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - 'New Bridging Record' button disabled - PST - All permissions";
    login(7, "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    warfarin_self_care("1");
    
    var pat_nhs = get_patient_nhs();
    var result_set = new Array();
    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var state = "";
    
      login(i, "Shared");
      patient_search(pat_nhs);
      state = get_new_bridging_record_button_state();
      
      result_set_1 = button_checker(state, "disabled", "Check " + i + " Permissions");
      result_set.push(result_set_1);
        
      var results = results_checker_are_true(result_set);
      results_checker(results, test_title);  
      Log_Off();
    }
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_button_state_on_warfarin_self_test_all_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_banner_msg_on_warfarin_self_test_all_permissions()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - Banner is displayed - PST - All permissions";
    login(7, "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    warfarin_self_care("1");
    
    var pat_nhs = get_patient_nhs();
    var expected_msg = "The patient is currently enrolled in the Warfarin self-testing programme. You cannot create a bridging record for a patient who is on a care programme."
    var result_set = new Array();
    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var state = "";
    
      login(i, "Shared");
      patient_search(pat_nhs);
      
      if(validate_bridging_tab_exists() == true)
      { 
        patient_clinical_tab().Link("PatientBridgingTab").Click();
        var actual_msg = patient_treatment_bridging_tab().Panel("BridgingMessages").innerText
      }   
      
      var result_set_1 = compare_values(expected_msg, actual_msg, test_title);
      result_set.push(result_set_1);
        
      var results = results_checker_are_true(result_set);
      results_checker(results, test_title);  
      Log_Off();
    }
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_banner_msg_on_warfarin_self_test_all_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_warfarin_self_test_stage_one()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - 'New Bridging Record' button disabled - Part 1 PST";
    login(7, "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    warfarin_self_care("1");
    
    var result_set = new Array();
    Goto_Patient_Treatment();
    state = get_new_bridging_record_button_state();
      
    var result_set_1 = button_checker(state, "disabled", test_title);
    result_set.push(result_set_1);
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_button_state_on_warfarin_self_test_stage_one";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_warfarin_self_test_stage_two()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - 'New Bridging Record' button disabled - Part 2 PST";
    login(7, "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    warfarin_self_care("1");
    warfarin_self_care("2");
    
    var result_set = new Array();
    Goto_Patient_Treatment();
    state = get_new_bridging_record_button_state();
      
    var result_set_1 = button_checker(state, "disabled", test_title);
    result_set.push(result_set_1);
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_button_state_on_warfarin_self_test_stage_two";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_warfarin_self_test_stage_three()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - 'New Bridging Record' button disabled - Part 3 PST";
    login(7, "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    warfarin_self_care("1");
    warfarin_self_care("2");
    warfarin_self_care("3");
    
    var result_set = new Array();
    Goto_Patient_Treatment();
    state = get_new_bridging_record_button_state();
      
    var result_set_1 = button_checker(state, "disabled", test_title);
    result_set.push(result_set_1);
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_button_state_on_warfarin_self_test_stage_three";
    handle_failed_tests(suite_name, test_name);
  }
}