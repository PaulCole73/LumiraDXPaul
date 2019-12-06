//USEUNIT TSA_Login
//USEUNIT TSA_Diagnosis
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//-----------------------------------------------------------------------------------
function tc_diagnosis_add_new_diagnosis()
{
  try
  {
    var test_title = "Diagnosis - Add a new diagnosis";
    login(9, "Shared");
    
    var result_set = new Array();
    
    var diagnosis_name = add_diagnosis();
    var result_set_1 = validate_diagnosis(diagnosis_name);
    result_set.push(result_set_1);
    
    var result_set_1 = validate_top_system_audit(test_title, "Added Diagnosis");
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Diagnosis";
    var test_name = "tc_diagnosis_add_new_diagnosis";
    handle_failed_tests(suite_name, test_name);
  }
}
//-----------------------------------------------------------------------------------
function tc_diagnosis_edit_diagnosis() 
{
  try
  {
    var test_title = "Diagnosis - Edit a diagnosis";
    login(9, "Shared");
    
    var original_data = new Array();
    var edited_data = new Array();
    
    var diagnosis_name = add_diagnosis();
    orginal_data = get_diagnosis_details(diagnosis_name);
    var edited_name = edit_diagnosis(diagnosis_name);
    edited_data = get_diagnosis_details(edited_name);
    
    var result_set = new Array();
    var is_false = compare_values(original_data, edited_data, test_title);
    var result_set_1 = results_checker_are_false(is_false);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_system_audit(test_title, "Edit Diagnosis");
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Diagnosis";
    var test_name = "tc_diagnosis_edit_diagnosis";
    handle_failed_tests(suite_name, test_name);
  }
}
//-----------------------------------------------------------------------------------
function tc_diagnosis_delete_diagnosis() 
{
  try
  {
    var test_title = "Diagnosis - Delete a diagnosis";
    login(9, "Shared");
    
    var diagnosis_name = add_diagnosis();
    
    delete_diagnosis(diagnosis_name);
    
    var result_set = new Array();
    var is_false = validate_diagnosis(diagnosis_name);
    var result_set_1 = results_checker_are_false(is_false);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_system_audit(test_title, "Delete Diagnosis");
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Diagnosis";
    var test_name = "tc_diagnosis_delete_diagnosis";
    handle_failed_tests(suite_name, test_name);
  }
}