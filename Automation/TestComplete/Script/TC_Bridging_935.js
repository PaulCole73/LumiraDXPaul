﻿//USEUNIT TSA_Home_Page
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
//CACUK-935
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
    var test_title = "Bridging - Pre-op Schedule Delete a day (Procedure date is yesterday's date)";
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