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
//CACUK-1176
//--------------------------------------------------------------------------------
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
  
      var state = bridging_schedule_buttons().Button("edit").Enabled;
      var result_set_1 = compare_values(state, false, test_title);
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
    var test_name = "tc_bridging_edit_schedule_disabled_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------