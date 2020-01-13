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
//CACUK-919 CACUK-920
function tc_bridging_tab_visible_only_with_warfarin()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - Tab only visible on Warfarin";
    login(5, "Shared");
    
    var result_set = new Array();
    var drug_array = new Array();
    drug_array.push("Warfarin", "Acenocoumarol", "Apixaban", "Dabigatran", "Edoxaban", "Rivaroxaban", "Dalteparin (LMWH)", "Enoxaparin (LMWH)");
      
    for(var i = 0; i < drug_array.length; i++)
    {
      var drug = drug_array[i];
      add_patient("Regression", "tab_visible", "M", "Shared");
      add_treatment_plan(drug, "Coventry", aqConvert.StrToDate(aqDateTime.Today()), "Shared", "", "52 Weeks");
        
      var result_set_1 = validate_bridging_tab_exists(drug);
      result_set.push(result_set_1);
      var results = results_checker_are_true(result_set);
      results_checker(results, "Checking tab with " + drug);
    }
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_tab_visible_only_with_warfarin";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_new_bridging_record_permissions()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - Button - New Bridging Record, permissions";
    login(7, "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var pat_nhs = get_patient_nhs();
    var result_set = new Array();
    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var state = "";
    
      login(i, "Shared");
      patient_search(pat_nhs);
      state = get_new_bridging_record_button_state();
      
      if(i == 7 || i == 5)
      {
        result_set_1 = button_checker(state, "enabled", "Check " + i + " Permissions");
      }
      else
      {
        result_set_1 = button_checker(state, "disabled", "Check " + i + " Permissions");
      }
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
    var test_name = "tc_bridging_button_new_bridging_record_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_with_historic_warfarin_treatment()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - Button disabled with historic Warfarin plan";
    login(5, "Shared");
    
    var state;
    var result_set = new Array();
    var drug_array = new Array();
    drug_array.push("Acenocoumarol", "Apixaban", "Dabigatran", "Edoxaban", "Rivaroxaban", "Dalteparin (LMWH)", "Enoxaparin (LMWH)");
    
    for(var i = 0; i < drug_array.length; i++)
    {
      state = "";
    
      add_patient("Regression", "Historic_warfarin", "M", "Shared");
      add_treatment_plan("W", "Coventry", "", "Shared", "");
      add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
      
      add_treatment_plan(drug_array[i], "Coventry", aqConvert.StrToDate(aqDateTime.Today()), "Shared", "2", "52 Weeks");
      cancel_review();
      
      WaitSeconds(2);
      tp_drop_down().ClickItem(1);
      WaitSeconds(2);
      
      state = get_new_bridging_record_button_state();
      result_set_1 = button_checker(state, "disabled", "Check Button State.");
      result_set.push(result_set_1);
      
      var results = results_checker_are_true(result_set);
      results_checker(results, test_title);
    }
    
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_button_state_with_historic_warfarin_treatment";
    handle_failed_tests(suite_name, test_name);
  }
}
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
//--------------------------------------------------------------------------------
//CACUK-934 CACUK-935
//--------------------------------------------------------------------------------
function tc_bridging_create_schedule_add_six_days()
{
  try
  {
    var test_title = "Bridging - Pre-op Schedule +Add a day (0-6)";
    login(7, "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var result_set = new Array();
    var date = aqDateTime.Today();
    
    add_bridging_record(date);
    remove_bridging_table_rows(3, "pre-op");
    
    bridging_schedule_buttons().Button("Cancel").scrollIntoView();
    
    var data = new Array();
  
    for(var i = 1; i <= 6; i++)
    {
      data.length = 0;
      data.push(date, "0", false, false, false, "Once dailyTwice daily", "+ Add comment");
      add_bridging_table_rows(1, "pre-op");
      data = set_table_data(i, data, "pre-op");
      result_set.push(validate_table(i, "pre-op", data));
    }
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_create_schedule_add_six_days";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_create_schedule_add_days_procedure_today()
{
  try
  {
    var test_title = "Bridging - Pre-op Schedule +Add a day - Procedure is today.";
    login(7, "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var date = aqDateTime.Today();
    add_bridging_record(date);
    bridging_schedule_buttons().Button("Cancel").scrollIntoView();
    
    var result_set = new Array();
    var data = new Array();
    
    data.push(date, "0", false, false, false, "Once dailyTwice daily", "+ Add comment");
    data = set_table_data(3, data, "pre-op");
    result_set.push(validate_table(3, "pre-op", data));
    
    for(var i = 1; i <= 3; i++)
    {
      data.length = 0;
      data.push(date, "0", false, false, false, "", "+ Add comment");
      add_bridging_table_rows(1, "pre-op");
      data = set_table_data((3 + i), data, "pre-op");
      result_set.push(validate_table((3 + i), "pre-op", data));
    }
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_create_schedule_add_days_procedure_today";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_create_schedule_add_days_procedure_tomorrow()
{
  try
  {
    var test_title = "Bridging - Pre-op Schedule +Add a day - Procedure is tomorrow.";
    login(7, "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var date = aqDateTime.AddDays(aqDateTime.Today(), 1);
    add_bridging_record(date);
    bridging_schedule_buttons().Button("Cancel").scrollIntoView();
    
    var result_set = new Array();
    var data = new Array();
    
    data.push(date, "0", false, false, false, "Once dailyTwice daily", "+ Add comment");
    data = set_table_data(3, data, "pre-op");
    result_set.push(validate_table(3, "pre-op", data));
    
    for(var i = 1; i <= 3; i++)
    {
      data.length = 0;
      data.push(date, "0", false, false, false, "Once dailyTwice daily", "+ Add comment");
      add_bridging_table_rows(1, "pre-op");
      data = set_table_data((3 + i), data, "pre-op");
      result_set.push(validate_table((3 + i), "pre-op", data));
    }
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_create_schedule_add_days_procedure_tomorrow";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_create_schedule_add_days_procedure_yesterday()
{
  try
  {
    var test_title = "Bridging - Pre-op Schedule +Add a day - Procedure was yesterday.";
    login(7, "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var date = aqDateTime.AddDays(aqDateTime.Today(), -1);
    add_bridging_record(date);
    bridging_schedule_buttons().Button("Cancel").scrollIntoView();
    
    var result_set = new Array();
    var data = new Array();
    
    data.push(date, "0", false, false, false, "Once dailyTwice daily", "+ Add comment");
    data = set_table_data(3, data, "pre-op");
    result_set.push(validate_table(3, "pre-op", data));
    
    for(var i = 1; i <= 3; i++)
    {
      data.length = 0;
      data.push(date, "0", false, false, false, "Once dailyTwice daily", "+ Add comment");
      add_bridging_table_rows(1, "pre-op");
      data = set_table_data((3 + i), data, "pre-op");
      result_set.push(validate_table((3 + i), "pre-op", data));
    }
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_create_schedule_add_days_procedure_yesterday";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_create_schedule_delete_six_days()
{
  try
  {
    var test_title = "Bridging - Pre-op Schedule -Delete a day (0-6)";
    login(7, "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var result_set = new Array();
    var data = new Array();
    var date = aqDateTime.Today();
    add_bridging_record(date);
    bridging_schedule_buttons().Button("Cancel").scrollIntoView();
    
    add_bridging_table_rows(3, "pre-op");
    
    for(var i = 0; i < 6; i++)
    {
      data.length = 0;
      data.push(date, "0", false, false, false, "Once dailyTwice daily", "+ Add comment");
      data = set_table_data((6-i), data, "pre-op");
      result_set.push(validate_table((6-i), "pre-op", data));
      remove_bridging_table_rows(1, "pre-op");
    }
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_create_schedule_delete_six_days";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_create_schedule_delete_days_procedure_tomorrow()
{
  try
  {
    var test_title = "Bridging - Pre-op Schedule -Delete a day - Procedure is tomorrow.";
    login(7, "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var result_set = new Array();
    var data = new Array();
    
    var date = aqDateTime.AddDays(aqDateTime.Today(), 1);
    add_bridging_record(date);
    bridging_schedule_buttons().Button("Cancel").scrollIntoView();
    
    for(var i = 0; i < 3; i++)
    {
      data.length = 0;
      data.push(date, "0", false, false, false, "Once dailyTwice daily", "+ Add comment");
      data = set_table_data((3-i), data, "pre-op");
      result_set.push(validate_table((3-i), "pre-op", data));
      remove_bridging_table_rows(1, "pre-op");
    }
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_create_schedule_delete_days_procedure_tomorrow";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
//Sprint 22
function tc_bridging_procedure_schedule_delete_days_procedure_today()
{
  try
  {
    var test_title = "Bridging - Pre-op Schedule -Delete a day - Procedure is today.";
    login(7, "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var result_set = new Array();
    var data = new Array();
    
    var date = aqDateTime.Today();
    add_bridging_record(date);
    bridging_schedule_buttons().Button("Cancel").scrollIntoView();
    
    for(var i = 0; i < 3; i++)
    {
      data.length = 0;
      data.push(date, "0", false, false, false, "Once dailyTwice daily", "+ Add comment");
      data = set_table_data((3-i), data, "pre-op");
      result_set.push(validate_table((3-i), "pre-op", data));
      remove_bridging_table_rows(1, "pre-op");
    }
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_procedure_schedule_delete_days_procedure_today";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
//Sprint 22
function tc_bridging_procedure_schedule_delete_days_procedure_yesterday()
{
  try
  {
    var test_title = "Bridging - Procedure Schedule -Delete a day (0-6)";
    login(7, "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var result_set = new Array();
    var data = new Array();
    var date = aqDateTime.Today();
    add_bridging_record(date);
    bridging_schedule_buttons().Button("Cancel").scrollIntoView();
    
    add_bridging_table_rows(5, "procedure");
    
    for(var i = 0; i < 6; i++)
    {
      data.length = 0;
      data.push(date, "0", false, false, false, "Once dailyTwice daily", "+ Add comment");
      data = set_table_data((6-i), data, "procedure");
      result_set.push(validate_table((6-i), "procedure", data));
      remove_bridging_table_rows(1, "procedure");
    }
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_procedure_schedule_delete_days_procedure_yesterday";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
//CACUK945
function tc_bridging_procedure_schedule_delete_six_days()
{
  try
  {
    var test_title = "Bridging - Procedure Schedule -Delete a day (0-6)";
    login(7, "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var result_set = new Array();
    var data = new Array();
    var date = aqDateTime.Today();
    add_bridging_record(date);
    bridging_schedule_buttons().Button("Cancel").scrollIntoView();
    
    add_bridging_table_rows(5, "procedure");
    
    for(var i = 0; i < 5; i++)
    {
      data.length = 0;
      data.push(date, "0", false, false, false, "Once dailyTwice daily", "+ Add comment");
      data = set_table_data((6-i), data, "procedure");
      result_set.push(validate_table((6-i), "procedure", data));
      remove_bridging_table_rows(1, "procedure");
    }
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_procedure_schedule_delete_six_days";
    handle_failed_tests(suite_name, test_name);
  }
}


//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_various_dms()
{
  try
  {
    var test_title = "Bridging - Check Bridging Button State";
    login(5, "Shared");
    var result_set = new Array();
    
    for(var i = 0; i < 6; i++)
    {
      var dose = get_dosing_method(i);
      add_patient("Regression", "Button_State_Check", "M", "Shared");
      add_treatment_plan("W", dose, "", "Shared", "");
      
      var result_set_1 = get_new_bridging_record_button_state();
      result_set.push(result_set_1);    
      
      var results = results_checker_are_true(result_set);
      results_checker(results, test_title);
    }
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_button_state_on_various_dms";
    handle_failed_tests(suite_name, test_name);
  }
}

//--------------------------------------------------------------------------------



//--------------------------------------------------------------------------------
function bridging_test()
{
  login(7, "Shared");
  
  add_patient("Bridging", "Schedule", "M", "Shared");
  add_treatment_plan("W", "Coventry", "", "Shared", "");
  
  var date = aqDateTime.Today();
  add_bridging_record(date, 1);
  
  populate_table_column("pre-op", "all", 3);
  var table_data = new Array();
  table_data = get_table_column_data("pre-op", "all", 3);
  
  var start_date = aqDateTime.Today();
  var new_date = aqDateTime.AddDays(aqDateTime.Today(), 1);
  var expected_data = new Array();
  expected_data = update_bridging_array_dates(table_data, start_date, new_date);
  
  update_procedure_date(new_date);
  
  table_data = get_table_column_data("pre-op", "all", 3);
  
  var result_set = new Array();
  var result_set_1 = checkArrays(expected_data, table_data);
  result_set.push(result_set_1);
  
  var results = results_checker_are_true(result_set);
  results_checker(results);
  
  Log_Off();
}
//CACUK-1034
//--------------------------------------------------------------------------------
function tc_bridging_check_combo_warnings_inr_and_lmwh_dalteparin_6_day_schedule()
{
  try
  {
    var test_title = "Bridging - Checkbox combo warnings - INR and LMWH (Dalteparin) - 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "inr_checkbox", 6);
    populate_table_column("all", "lmwh_checkbox", 6);
  
    var result_set = new Array();
    bridging_schedule_save_button().Click();
//    var expected_message = "INR value(s) required. Please ensure a value has been chosen where 'INR' has been ticked.";
//    var expected_message_1 = "Dalteparin value(s) required. Please ensure a value has been chosen where 'Dalteparin (IU)' has been ticked.";
//    var message = get_banner_message_text();
//    var result_set_1 = compare_values(expected_message + "\r\n" + expected_message_1, message, test_title);
//    result_set.push(result_set_1);
//  
//    populate_table_column("pre-op", "inr_dropdown", 6);
//    populate_table_column("procedure", "inr_dropdown", 6);
//    populate_table_column("post", "inr_dropdown", 5);
//  
//    save_button.Click();
//    message = get_banner_message_text();
//    var result_set_1 = compare_values(expected_message + "\r\n" + expected_message_1, message, test_title);
//    result_set.push(result_set_1);
//
//    bridging_schedule_post_discharge_table().Cell(6, 2).Child(0).ClickItem(2);
//  
//    save_button.Click();
//    message = get_banner_message_text();
//    result_set_1 = compare_values(expected_message_1, message, test_title);
//    result_set.push(result_set_1);
//  
//    populate_table_column("all", "inr_checkbox", 6);
//    populate_table_column("all", "inr_checkbox", 6);
//  
//    save_button.Click();
//    message = get_banner_message_text();
//    var result_set_1 = compare_values(expected_message + "\r\n" + expected_message_1, message, test_title);
//    result_set.push(result_set_1);
//  
//    populate_table_column("pre-op", "frequency", 6);
//    populate_table_column("procedure", "frequency", 6);
//    populate_table_column("post", "frequency", 5);
//  
//    save_button.Click();
//    message = get_banner_message_text();
//    var result_set_1 = compare_values(expected_message + "\r\n" + expected_message_1, message, test_title);
//    result_set.push(result_set_1);
//  
//    bridging_schedule_post_discharge_table().Cell(6, 5).Child(0).ClickItem(1);
//  
//    save_button.Click();
//    message = get_banner_message_text();
//    result_set_1 = compare_values(expected_message, message, test_title);
//    result_set.push(result_set_1);
//  
//    populate_table_column("all", "lmwh_checkbox", 6);
//    populate_table_column("all", "lmwh_checkbox", 6);
//    populate_table_column("all", "lmwh_dropdown", 6);
//  
//    save_button.Click();
//    message = get_banner_message_text();
//    var result_set_1 = compare_values(expected_message + "\r\n" + expected_message_1, message, test_title);
//    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_check_combo_warnings_inr_and_lmwh_dalteparin_6_day_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function bridging_test_3()
{
  login(7, "Shared");
  
  add_patient("Bridging", "Schedule", "M", "Shared");
  add_treatment_plan("W", "Coventry", "", "Shared", "");
  
  var date = aqDateTime.Today();
  add_bridging_record(date, 1);
  
  populate_table_column("pre-op", "lmwh_checkbox", 3);
  populate_table_column("pre-op", "lmwh_dropdown", 3);
  populate_table_column("procedure", "lmwh_checkbox", 1);
  populate_table_column("procedure", "lmwh_dropdown", 1);
  populate_table_column("post", "lmwh_checkbox", 3);
  populate_table_column("post", "lmwh_dropdown", 3);
  
  var result_set = new Array();
  //save_button.Click();
  //var expected_message = "...";
  //var message = get_banner_message_text();
  //var result_set_1 = compare_values(expected_message, message, test_title);
  //result_set.push(result_set_1);
  
  populate_table_column("pre-op", "frequency", 3);
  populate_table_column("procedure", "frequency", 1);
  populate_table_column("post", "frequency", 3);
  
  //save_button.Click();
  //result_set_1 = INRstar_base().NativeWebObject.Find("idStr", "*the id*").Exists;   check warning message exists - should not exist
  //result_set.push(result_set_1);
  
  remove_bridging_table_rows(3, "pre-op");
  remove_bridging_table_rows(3, "post-discharge");
  
  add_bridging_table_rows(1, "pre-op");
  add_bridging_table_rows(1, "procedure");
  add_bridging_table_rows(1, "post-discharge");
  
  //save_button.Click();
  //result_set_1 = INRstar_base().NativeWebObject.Find("idStr", "*the id*").Exists;   check warning message exists - should not exist
  //result_set.push(result_set_1);
  
  populate_table_column("procedure", "lmwh_checkbox", 1);
  populate_table_column("procedure", "lmwh_checkbox", 2);
  populate_table_column("procedure", "lmwh_dropdown", 2);
  populate_table_column("pre-op", "lmwh_checkbox", 1);
  populate_table_column("pre-op", "lmwh_dropdown", 1);
  populate_table_column("post", "lmwh_checkbox", 1);
  populate_table_column("post", "lmwh_dropdown", 1);
  
  //save_button.Click();
  //message = get_banner_message_text();
  //result_set_1 = compare_values(expected_message, message, test_title);
  //result_set.push(result_set_1);
  
  //var results = results_checker_are_true(result_set);
  //results_checker(results);
  
  //Log_Off();
}
//CACUK-1030
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Dalteparin to Enoxaparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 2);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(2, "Cancel");
    update_bridging_lmwh(2, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Enoxaparin (mg)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 6, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 6, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 6, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_dalteparin_to_tinzaparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Dalteparin to Tinzaparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 2);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(0, "Cancel");
    update_bridging_lmwh(0, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 6, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 6, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 6, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_dalteparin_to_tinzaparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_enoxaparin_to_dalteparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Enoxaparin to Dalteparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 3);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(1, "Cancel");
    update_bridging_lmwh(1, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 6, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 6, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 6, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_enoxaparin_to_dalteparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Enoxaparin to Tinzaparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 3);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(0, "Cancel");
    update_bridging_lmwh(0, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 6, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 6, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 6, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Tinzaparin to Dalteparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(1, "Cancel");
    update_bridging_lmwh(1, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 6, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 6, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 6, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_tinzaparin_to_enoxaparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Tinzaparin to Enoxaparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(2, "Cancel");
    update_bridging_lmwh(2, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Enoxaparin (mg)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 6, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 6, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 6, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_tinzaparin_to_enoxaparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_dalteparin_to_dalteparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Dalteparin to Dalteparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 2);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(1, "Cancel");
  
    var result_set = new Array();
    var expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
    
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "lmwh_checkbox", "lmwh_dropdown", "comments");
  
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_dalteparin_to_dalteparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_enoxaparin_to_enoxaparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Enoxaparin to Enoxaparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 3);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(2, "Cancel");
  
    var result_set = new Array();
    var expected_title = "Enoxaparin (mg)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "lmwh_checkbox", "lmwh_dropdown", "comments");
  
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_enoxaparin_to_enoxaparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_tinzaparin_to_tinzaparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Tinzaparin to Tinzaparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(0, "Cancel");
  
    var result_set = new Array();
    var expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "lmwh_checkbox", "lmwh_dropdown", "comments");
  
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_tinzaparin_to_tinzaparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_1_day()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Dalteparin to Enoxaparin - 1 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 2);
    
    remove_bridging_table_rows(2, "pre-op");
    remove_bridging_table_rows(2, "post-discharge");
    
    populate_table_column("all", "all", 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 1);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 1);
    
    update_bridging_lmwh(2, "Cancel");
    update_bridging_lmwh(2, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Enoxaparin (mg)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 1, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 1, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 1, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 1, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_1_day";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_1_day()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Enoxaparin to Tinzaparin - 1 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 3);
    
    remove_bridging_table_rows(2, "pre-op");
    remove_bridging_table_rows(2, "post-discharge");
    
    populate_table_column("all", "all", 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 1);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 1);
    
    update_bridging_lmwh(0, "Cancel");
    update_bridging_lmwh(0, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 1, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 1, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 1, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 1, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_1_day";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_1_day()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Tinzaparin to Dalteparin - 1 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    remove_bridging_table_rows(2, "pre-op");
    remove_bridging_table_rows(2, "post-discharge");
    
    populate_table_column("all", "all", 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 1);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 1);
    
    update_bridging_lmwh(1, "Cancel");
    update_bridging_lmwh(1, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 1, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 1, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 1, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 1, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_1_day";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_to_enoxaparin_to_tinzaparin_default_schedule()
{
  try
  {
    var test_title = "Bridging - LMWH switch from Tinzaparin to Dalteparin to Enoxaparin and back to Tinzaparin - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
     
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    update_bridging_lmwh(1, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    update_bridging_lmwh(2, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Enoxaparin (mg)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
    
    update_bridging_lmwh(0, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);

    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_to_enoxaparin_to_tinzaparin_default_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_to_dalteparin_to_enoxaparin_default_schedule()
{
  try
  {
    var test_title = "Bridging - LMWH switch from Enoxaparin to Tinzaparin to Dalteparin and back to Enoxaparin - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 3);
     
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    update_bridging_lmwh(0, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    update_bridging_lmwh(1, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
    
    update_bridging_lmwh(2, "Confirm");
  
    expected_title = "Enoxaparin (mg)";
    bridging_schedule_preop_table().Refresh();
    title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);

    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_to_dalteparin_to_enoxaparin_default_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_to_tinzaparin_to_dalteparin_default_schedule()
{
  try
  {
    var test_title = "Bridging - LMWH switch from Dalteparin to Enoxaparin to Tinzaparin and back to Dalteparin - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 2);
     
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    update_bridging_lmwh(2, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Enoxaparin (mg)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    update_bridging_lmwh(0, "Confirm");

    expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
    
    update_bridging_lmwh(1, "Confirm");
  
    expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);

    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_to_tinzaparin_to_dalteparin_default_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
//CACUK-1032
function tc_bridging_amend_date_to_same_day_procedure_tomorrow()
{
  try
  {
    var test_title = "Bridging: Procedure date is tomorrow's date and amended to same date - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), 1);
    add_bridging_record(date, 2);
    
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    update_procedure_date(date);
  
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    var result_set = new Array();
    var result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_same_day_procedure_tomorrow";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_same_day_procedure_yesterday()
{
  try
  {
    var test_title = "Bridging: Procedure date is yesterday's date and amended to same date - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), -1);
    add_bridging_record(date, 3);
    
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    update_procedure_date(date);
  
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    var result_set = new Array();
    var result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_same_day_procedure_yesterday";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_same_day_procedure_today()
{
  try
  {
    var test_title = "Bridging:  Procedure date is today's date and amended to same date - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    update_procedure_date(date);
  
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    var result_set = new Array();
    var result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_same_day_procedure_today";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_today_procedure_in_the_past()
{
  try
  {
    var test_title = "Bridging: Procedure date in past amended to today's date - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), -6);
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var result_set = new Array();
    var new_date = aqDateTime.Today();
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "+");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "+");
    post_data = update_bridging_array_dates(post_data, date, new_date, "+");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    var result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_today_procedure_in_the_past";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_today_procedure_in_the_future()
{
  try
  {
    var test_title = "Bridging: Procedure date in future amended to today's date - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), 20);
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var result_set = new Array();
    var new_date = aqDateTime.Today();
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    var result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_today_procedure_in_the_future";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_past_procedure_is_today()
{
  try
  {
    var test_title = "Bridging: Procedure date is today's date and amended to 11 days in the past - 1 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    remove_bridging_table_rows(2, "pre-op");
    remove_bridging_table_rows(2, "post-discharge");
    
    populate_table_column("pre-op", "all", 1);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 1);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), -12);
    var date_path = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent").Panel("BridgingScheduleDetails");
    date_path.scrollIntoView();
    new_date = aqConvert.DateTimeToFormatStr(new_date, "%d/%m/%Y");
    var status = date_picker(date_path, new_date, "INRstar");
    date_path.Panel(0).Image("calendar_png").Click();
    
    var result_set = new Array();
    var result_set_1 = compare_values("inactive", status, test_title);
    result_set.push(result_set_1);
    
    new_date = aqDateTime.AddDays(aqDateTime.Today(), -11);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_past_procedure_is_today";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_future_procedure_is_today()
{
  try
  {
    var test_title = "Bridging: Procedure date is today's date and amended to 6 weeks in the future - 1 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    remove_bridging_table_rows(2, "pre-op");
    remove_bridging_table_rows(2, "post-discharge");
    
    populate_table_column("pre-op", "all", 1);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 1);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), 43);
    var date_path = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent").Panel("BridgingScheduleDetails");
    date_path.scrollIntoView();
    new_date = aqConvert.DateTimeToFormatStr(new_date, "%d/%m/%Y");
    var status = date_picker(date_path, new_date, "INRstar");
    date_path.Panel(0).Image("calendar_png").Click();
    
    var result_set = new Array();
    var result_set_1 = compare_values("inactive", status, test_title);
    result_set.push(result_set_1);
    
    new_date = aqDateTime.AddDays(aqDateTime.Today(), 42);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "+");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "+");
    post_data = update_bridging_array_dates(post_data, date, new_date, "+");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_future_procedure_is_today";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_past_procedure_is_today_0_day_schedule()
{
  try
  {
    var test_title = "Bridging: Procedure date is today's date and amended to 11 days in the past - 0 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    remove_bridging_table_rows(3, "pre-op");
    remove_bridging_table_rows(3, "post-discharge");
    populate_table_column("procedure", "all", 1);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), -12);
    var date_path = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent").Panel("BridgingScheduleDetails");
    date_path.scrollIntoView();
    new_date = aqConvert.DateTimeToFormatStr(new_date, "%d/%m/%Y");
    var status = date_picker(date_path, new_date, "INRstar");
    date_path.Panel(0).Image("calendar_png").Click();
    
    var result_set = new Array();
    var result_set_1 = compare_values("inactive", status, test_title);
    result_set.push(result_set_1);
    
    new_date = aqDateTime.AddDays(aqDateTime.Today(), -11);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_past_procedure_is_today_0_day_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_future_procedure_is_today_0_day_schedule()
{
  try
  {
    var test_title = "Bridging: Procedure date is today's date and amended to 6 weeks in the future - 0 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    remove_bridging_table_rows(3, "pre-op");
    remove_bridging_table_rows(3, "post-discharge");
    
    populate_table_column("procedure", "all", 1);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), 43);
    var date_path = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent").Panel("BridgingScheduleDetails");
    date_path.scrollIntoView();
    new_date = aqConvert.DateTimeToFormatStr(new_date, "%d/%m/%Y");
    var status = date_picker(date_path, new_date, "INRstar");
    date_path.Panel(0).Image("calendar_png").Click();
    var result_set = new Array();
    var result_set_1 = compare_values("inactive", status, test_title);
    result_set.push(result_set_1);
    
    new_date = aqDateTime.AddDays(aqDateTime.Today(), 42);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "+");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "+");
    post_data = update_bridging_array_dates(post_data, date, new_date, "+");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_future_procedure_is_today_0_day_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_procedure_date_today_amend_to_past_max_schedule()
{
  try
  {
    var test_title = "Bridging: Procedure date is today's date and amended to 11 days in the past - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
    
    populate_table_column("pre-op", "all", 6);
    populate_table_column("procedure", "all", 6);
    populate_table_column("post", "all", 6);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), -12);
    
    var date_path = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent").Panel("BridgingScheduleDetails");
    date_path.scrollIntoView();
    new_date = aqConvert.DateTimeToFormatStr(new_date, "%d/%m/%Y");
    var status = date_picker(date_path, new_date, "INRstar");
    date_path.Panel(0).Image("calendar_png").Click();
    var result_set = new Array();
    var result_set_1 = compare_values("inactive", status, test_title);
    result_set.push(result_set_1);
    
    new_date = aqDateTime.AddDays(aqDateTime.Today(), -11);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_procedure_date_today_amend_to_past_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_procedure_date_today_amend_to_future_max_schedule()
{
  try
  {
    var test_title = "Bridging: Procedure date is today's date and amended to 6 weeks in the future - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
    
    populate_table_column("pre-op", "all", 6);
    populate_table_column("procedure", "all", 6);
    populate_table_column("post", "all", 6);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), 43);
    
    var date_path = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent").Panel("BridgingScheduleDetails");
    date_path.scrollIntoView();
    new_date = aqConvert.DateTimeToFormatStr(new_date, "%d/%m/%Y");
    var status = date_picker(date_path, new_date, "INRstar");
    date_path.Panel(0).Image("calendar_png").Click();
    var result_set = new Array();
    var result_set_1 = compare_values("inactive", status, test_title);
    result_set.push(result_set_1);
    
    new_date = aqDateTime.AddDays(aqDateTime.Today(), 42);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "+");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "+");
    post_data = update_bridging_array_dates(post_data, date, new_date, "+");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_procedure_date_today_amend_to_future_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_procedure_date_today_amend_to_past_and_then_future_then_back_to_original_date()
{
  try
  {
    var result_set = new Array();
    var test_title = "Bridging - Procedure date is today's date and amended to 11 days in the past and then 6 weeks in the future and then back to original today's date";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 3);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var new_date = aqDateTime.AddDays(date, -11);
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    var result_set = new Array();
    var result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");

    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
        
    new_date_2 = aqDateTime.AddDays(new_date, 42);
    exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date_2, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    popup_text = update_procedure_date(new_date_2);
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    preop_data = update_bridging_array_dates(preop_data, new_date, new_date_2, "+");
    procedure_data = update_bridging_array_dates(procedure_data, new_date, new_date_2, "+");
    post_data = update_bridging_array_dates(post_data, new_date, new_date_2, "+");
    
    preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
     
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);   
    
    new_date_3 = aqDateTime.Today();
    preop_data = update_bridging_array_dates(preop_data, new_date_2, new_date_3, "-");
    procedure_data = update_bridging_array_dates(procedure_data, new_date_2, new_date_3, "-");
    post_data = update_bridging_array_dates(post_data, new_date_2, new_date_3, "-");
    
    exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date_3, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    popup_text = update_procedure_date(new_date_3);
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);

    preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
     
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);   
         
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_procedure_date_today_amend_to_past_and_then_future_then_back_to_original_date";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_today_procedure_in_the_future_and_amend_LMWH()
{
  try
  {
    var test_title = "Bridging - Procedure date is future date and amended to today's date and LMWH changed";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), 20);
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var new_date = aqDateTime.Today();
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");
    
    var result_set = new Array();
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    var result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    update_bridging_lmwh(1, "Confirm");
    
    var expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    /*
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
    */
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_today_procedure_in_the_future_and_amend_LMWH";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_procedure_date_in_future_amended_to_past_and_then_today_and_then_back_to_original_date()
{
  try
  {
    var test_title = "Bridging - Procedure date is future date and amended to 11 days in the past and then to today's date and then back to original future date";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), 20);
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), -11);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");
    
    var result_set = new Array();
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    var result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);

    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
   
    var new_date_2 = aqDateTime.Today();
    preop_data = update_bridging_array_dates(preop_data, date, new_date_2, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date_2, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date_2, "-");
    
    exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date_2, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    popup_text = update_procedure_date(new_date_2);
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
     
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);   
    
    var new_date_3 = aqDateTime.AddDays(aqDateTime.Today(), 20);
    preop_data = update_bridging_array_dates(preop_data, date, new_date_3, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date_3, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date_3, "-");
    
    exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date_3, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    popup_text = update_procedure_date(new_date_3);
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);

    preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
     
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);   
         
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_procedure_date_in_future_amended_to_past_and_then_today_and_then_back_to_original_date";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------