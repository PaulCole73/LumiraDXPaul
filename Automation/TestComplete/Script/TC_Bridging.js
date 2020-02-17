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


//--------------------------------------------------------------------------------
//CACUK-934 CACUK-935
//--------------------------------------------------------------------------------
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
  
        var state = bridging_schedule_buttons().Button("edit").Enabled;
        var result_set_1 = compare_values(state, false, test_title);
        result_set.push(result_set_1);
      
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

//CACUK-1127
//--------------------------------------------------------------------------------


