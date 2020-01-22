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
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
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
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------


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
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------



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



//CACUK-1126
//--------------------------------------------------------------------------------
function tc_bridging_view_display_cl1_to_clead_permissions()
{
  try
  {
    var test_title = "Bridging - View Display - CL1, CL2, CL3 and LCL (Pending record)";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var nhs = get_patient_nhs();
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), 28);
    add_bridging_record(date, 1);
    save_bridging_schedule();
    var state = view_bridging_schedule(1);
    
    var result_set = new Array();
    var result_set_1 = compare_values(state, true, test_title);
    result_set.push(result_set_1);
    
    patient_treatment_bridging_tab().Refresh();
    var obj_root = patient_treatment_bridging_tab().Form("BridgingForm");
    var obj = wait_for_object(obj_root, "idStr", "Schedules", 2);
      
    result_set_1 = obj.Exists;
    result_set.push(result_set_1);
    Log_Off();
    
    for(var i = 5; i >= 3; i--)
    {
      login(i, "Shared");
    
      patient_search(nhs);
      var state = view_bridging_schedule(1);
    
      result_set_1 = compare_values(state, true, test_title);
      result_set.push(result_set_1);
    
      obj_root.Refresh();
      obj = wait_for_object(obj_root, "idStr", "Schedules", 2);
      
      result_set_1 = obj.Exists;
      result_set.push(result_set_1);
      Log_Off();
    }
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_view_display_cl1_to_clead_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_view_display_clerical_level_permissions()
{
  try
  {
    var test_title = "Bridging - View Display - Clerical 1, Clerical 2, Clerical 3 and Location Admin (Pending record)";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var nhs = get_patient_nhs();
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1); 
    save_bridging_schedule();
    
    Log_Off();
    
    var result_set = new Array();
    for(var i = 0; i < 7; i++)
    {
      if(i != 3 && i != 4 && i != 5)
      {
        login(i, "Shared");
    
        patient_search(nhs);
        var state = view_bridging_schedule(1);
    
        var result_set_1 = compare_values(state, true, test_title);
        result_set.push(result_set_1);
    
        //add check for the post-view page
        Log_Off();
      }
    }
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_view_display_clerical_level_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}

//CACUK-1127
//--------------------------------------------------------------------------------
function tc_bridging_delete_schedule_clerical_permissions()
{
  try
  {
    var test_title = "Bridging - View Display - 'Delete' button (Pending record) Clerical 1,2 and 3";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var nhs = get_patient_nhs();
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1); 
    save_bridging_schedule();
    
    Log_Off();
    
    var result_set = new Array();
    for(var i = 0; i < 3; i++)
    {
      login(i, "Shared");
    
      patient_search(nhs);
      view_bridging_schedule(1);
    
      //add check for the post-view page
      
      //var state = delete_button.Enabled;
      //var result_set_1 = compare_values(state, false, test_title);
      //result_set.push(result_set_1);
      
      Log_Off();
    }
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_delete_schedule_clerical_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_edit_schedule_clerical_permissions()
{
  try
  {
    var test_title = "Bridging - View Display - 'Edit' button (Pending record) Clerical 1,2 and 3";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var nhs = get_patient_nhs();
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1); 
    save_bridging_schedule();
    
    Log_Off();
    
    var result_set = new Array();
    for(var i = 0; i < 3; i++)
    {
      login(i, "Shared");
    
      patient_search(nhs);
      view_bridging_schedule(1);
    
      //add check for the post-view page
      
      //var state = edit_button.Enabled;
      //var result_set_1 = compare_values(state, false, test_title);
      //result_set.push(result_set_1);
      
      Log_Off();
    }
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_edit_schedule_clerical_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_edit_schedule_disabled_permissions()
{
  try
  {
    var test_title = "Bridging - View Display - 'Edit' button (Pending record) CL1, CL2 and Location Admin ";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var nhs = get_patient_nhs();
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1); 
    save_bridging_schedule();
    
    Log_Off();
    
    var result_set = new Array();
    for(var i = 3; i <= 6; i++)
    {
      if(i != 5)
      {
        login(i, "Shared");
    
        patient_search(nhs);
        view_bridging_schedule(1);
        
        //add check for the post-view page
  
        //var state = path_to_button().Enabled;
        //var result_set_1 = compare_values(state, false, test_title);
        //result_set.push(result_set_1);
      
        Log_Off();
      }
    }
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_edit_schedule_disabled_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_delete_schedule_disabled_permissions()
{
  try
  {
    var test_title = "Bridging - View Display - 'Delete' button (Pending record) CL1, CL2 and Location Admin";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var nhs = get_patient_nhs();
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1); 
    save_bridging_schedule();
    
    Log_Off();
    
    var result_set = new Array();
    for(var i = 3; i <= 6; i++)
    {
      if(i != 5)
      {
        login(i, "Shared");
    
        patient_search(nhs);
        view_bridging_schedule(1);
        
        //add check for the post-view page
  
        //var state = path_to_button().Enabled;
        //var result_set_1 = compare_values(state, false, test_title);
        //result_set.push(result_set_1);
      
        Log_Off();
      }
    }
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_delete_schedule_disabled_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}