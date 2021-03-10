//USEUNIT TSA_Adverse_Event
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Treatment_Plan
//USEUNIT Misc_Functions
//USEUNIT INRstar_Misc_Functions
//--------------------------------------------------------------------------------
function tc_add_a_new_adverse_event()
{
  try
  {
    var test_title = 'Adverse Event - Add a new adverse event'
    login(5, "Shared");
    add_patient('Regression', 'add_adverse_event', 'M', 'Shared');
    add_adverse_event();
    
    var adverse_confirmation_banner = adverse_event_tab_confirm_box().Panel(0).Panel("PatientsAdverseEventsMessages").TextNode(0).contentText;
    
    //Create the array of results for the final check to ensure steps pass the test
    var result_set = new Array()
    var result_set_1 = compare_values(get_string_translation("The adverse event was successfully added"), adverse_confirmation_banner, test_title);
    result_set.push(result_set_1);
  
    result_set_1 = validate_top_patient_audit(test_title,get_string_translation("Add Adverse Event"));
    result_set.push(result_set_1);
  
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
  
    //Pass in the final result
    results_checker(results, test_title)
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Adverse_Event";
    var test_name = "tc_add_a_new_adverse_event";
    handle_failed_tests(suite_name, test_name); 
  } 
} 
//--------------------------------------------------------------------------------
function tc_delete_adverse_event()
{
  try
  {
    var test_title = 'Adverse Event - Delete adverse event'
    login(5, "Shared");
    add_patient('Regression', 'delete_adverse_event', 'M', 'Shared'); 
    add_adverse_event();
    delete_adverse_event();
  
    var results = validate_top_patient_audit(test_title,get_string_translation("Delete Adverse Event"));
    results_checker(results, test_title)
  
    Log_Off();  
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Adverse_Event";
    var test_name = "tc_delete_adverse_event";
    handle_failed_tests(suite_name, test_name); 
  } 
} 
//--------------------------------------------------------------------------------