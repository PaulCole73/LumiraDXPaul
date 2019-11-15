//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Reviews
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Patient_Management
//USEUNIT TSA_Self_Care
//USEUNIT TSA_Bridging
//USEUNIT Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
//CACUK-919 CACUK-920
function tc_bridging_tab_visible_only_with_warfarin()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - Tab only visible on Warfarin";
    login("cl3@regression", "INRstar_5", "Shared");
    
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
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_new_bridging_record_permissions()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - Button - New Bridging Record, permissions";
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var pat_nhs = get_patient_nhs();
    var result_set = new Array();
    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var user = get_user_level(i);
      var state = "";
    
      login(user + "@regression", "INRstar_5", "Shared");
      patient_search(pat_nhs);
      state = get_new_bridging_record_button_state();
      
      if(user == "clead" || user == "cl3")
      {
        result_set_1 = button_checker(state, "enabled", "Check " + user + " Permissions");
      }
      else
      {
        result_set_1 = button_checker(state, "disabled", "Check " + user + " Permissions");
      }
      result_set.push(result_set_1);
      var results = results_checker_are_true(result_set);
      results_checker(results, test_title);
      Log_Off();
    }
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_with_historic_warfarin_treatment()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - Button disabled with historic Warfarin plan";
    login('cl3@regression','INRstar_5','Shared');
    
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
      
      tp_drop_down().ClickItem(1);
      
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
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_ddd_all_permissions()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - 'New Bridging Record' button disabled - on DDD - All permission levels";
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    self_care_DDD("1");
    
    var pat_nhs = get_patient_nhs();
    var result_set = new Array();
    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var user = get_user_level(i);
      var state = "";
    
      login(user + "@regression", "INRstar_5", "Shared");
      patient_search(pat_nhs);
      state = get_new_bridging_record_button_state();
      
      result_set_1 = button_checker(state, "disabled", "Check " + user + " Permissions");
      result_set.push(result_set_1);
      
      var results = results_checker_are_true(result_set);
      results_checker(results, test_title);
      Log_Off();
    }
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_banner_msg_on_ddd_all_permissions()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - Banner is displayed - on DDD - All permission levels";
    login("clead@regression", "INRstar_5", "Shared");
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
      var user = get_user_level(i);
      var state = "";
    
      login(user + "@regression", "INRstar_5", "Shared");
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
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_ddd_stage_one()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - 'New Bridging Record' button disabled - Part 1 DDD";
    login("cl3@regression", "INRstar_5", "Shared");
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
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_warfarin_self_test_all_permissions()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - 'New Bridging Record' button disabled - PST - All permissions";
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    warfarin_self_care("1");
    
    var pat_nhs = get_patient_nhs();
    var result_set = new Array();
    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var user = get_user_level(i);
      var state = "";
    
      login(user + "@regression", "INRstar_5", "Shared");
      patient_search(pat_nhs);
      state = get_new_bridging_record_button_state();
      
      result_set_1 = button_checker(state, "disabled", "Check " + user + " Permissions");
      result_set.push(result_set_1);
        
      var results = results_checker_are_true(result_set);
      results_checker(results, test_title);  
      Log_Off();
    }
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_banner_msg_on_warfarin_self_test_all_permissions()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - Banner is displayed - PST - All permissions";
    login("clead@regression", "INRstar_5", "Shared");
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
      var user = get_user_level(i);
      var state = "";
    
      login(user + "@regression", "INRstar_5", "Shared");
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
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_warfarin_self_test_stage_one()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - 'New Bridging Record' button disabled - Part 1 PST";
    login("clead@regression", "INRstar_5", "Shared");
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
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_warfarin_self_test_stage_two()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - 'New Bridging Record' button disabled - Part 2 PST";
    login("clead@regression", "INRstar_5", "Shared");
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
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_warfarin_self_test_stage_three()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - 'New Bridging Record' button disabled - Part 3 PST";
    login("clead@regression", "INRstar_5", "Shared");
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
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
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
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var result_set = new Array();
    var expected_row_data;
    var row_data;
    var date = aqDateTime.Today();
    
    add_bridging_record(date);
    /*remove_bridging_table_rows(3);
    
    for(var i = 0; i < 6; i++)
    {
      expected_row_data = add_bridging_table_row(date);
      row_data = get_bridging_schedule_table_row(i+1);
      
      var result_set_1 = checkArrays(expected_row_data, row_data, test_title);
      result_set.push(result_set_1);
      
      var results = results_checker_are_true(result_set);
      results_checker(results, test_title);
    }*/
    var rows_to_validate = 3;
    
    var results = validate_bridging_table_dates(date, rows_to_validate);
    results_checker(results, test_title);
    
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_create_schedule_add_days_procedure_today()
{
  try
  {
    var test_title = "Bridging - Pre-op Schedule +Add a day - Procedure is today.";
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var date = aqDateTime.Today();
    add_bridging_record(date);
    
    var result_set = new Array();
    
    var result_set_1 = false;
    result_set.push(result_set_1);
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    //Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_create_schedule_add_days_procedure_tomorrow()
{
  try
  {
    var test_title = "Bridging - Pre-op Schedule +Add a day - Procedure is tomorrow.";
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var date = aqDateTime.Today();
    add_bridging_record(date);
    
    var result_set = new Array();
    
    var result_set_1 = false;
    result_set.push(result_set_1);
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    //Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_create_schedule_add_days_procedure_yesterday()
{
  try
  {
    var test_title = "Bridging - Pre-op Schedule +Add a day - Procedure was yesterday.";
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var date = aqDateTime.Today();
    add_bridging_record(date);
    
    var result_set = new Array();
    
    var result_set_1 = false;
    result_set.push(result_set_1);
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    //Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_create_schedule_delete_six_days()
{
  try
  {
    var test_title = "Bridging - Pre-op Schedule -Delete a day (0-6)";
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var result_set = new Array();
    var date = aqDateTime.Today();
    add_bridging_record(date);
    add_bridging_table_rows(3);
    
    var row_data = new Array();
    var expected_row_data = new Array();
    var table;
    
    for(var i = table.rowCount; i > 0; i++)
    {
      remove_bridging_table_rows(1);
      for(var i = 0; i < table.rowCount; i++)
      {
        var row_date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(date, (-table.rowCount)), "%d-%b-%Y");
        expected_row_data.push(row_data, "-" + table.rowCount, "", "", "", "", "+ Add comment");
        row_data = get_bridging_schedule_table_row(i);
      
        var result_set_1 = checkArrays(row_data, expected_row_data, test_title);
        result_set.push(result_set_1);
      }
    }
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_create_schedule_delete_days_procedure_tomorrow()
{
  try
  {
    var test_title = "Bridging - Pre-op Schedule -Delete a day - Procedure is tomorrow.";
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var date = aqDateTime.Today();
    add_bridging_record(date);
    
    var result_set = new Array();
    
    var result_set_1 = false;
    result_set.push(result_set_1);
        
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    //Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}








//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_various_dms()
{
  try
  {
    var test_title = "Bridging - Check Bridging Button State";
    login("cl3@regression", "INRstar_5", "Shared");
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
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}




