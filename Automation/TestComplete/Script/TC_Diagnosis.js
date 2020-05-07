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
    var result_set_1 = check_diagnosis_in_list(diagnosis_name);
    result_set.push(result_set_1);
    
    var result_set_1 = validate_top_system_audit(test_title, get_string_translation("Added Diagnosis"));
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
    
    var edited_data = new Array();
    var result_set = new Array();
  
    var diagnosis_name = add_diagnosis();
    var new_name = "Edited - " + get_unique_number();

    var edited_data = edit_diagnosis(diagnosis_name,new_name);
    data_after_edit = get_diagnosis_details(new_name);  
    Log.Message("This is the data after saving " + data_after_edit);
    var results = checkArrays(edited_data, data_after_edit, test_title);

    var result_set_1 = results_checker_are_true(results);
    result_set.push(result_set_1);
    Log.Message(result_set_1);
    
    result_set_1 = validate_top_system_audit(test_title, get_string_translation("Edit Diagnosis"));
    Log.Message(result_set_1);
    result_set.push(result_set_1);
    
    Log.Message(result_set);
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
    var diagnosis_list_count_before_delete = get_diagnosis_count();  
    delete_diagnosis(diagnosis_name);
    var diagnosis_list_count_after_delete = get_diagnosis_count(); 
     
    var result_set = new Array();
    var is_diagnosis_available = check_diagnosis_in_list(diagnosis_name);
    var result_set_1 = results_checker_is_false(is_diagnosis_available);
    result_set.push(result_set_1);
    
    var result_set_1 = (diagnosis_list_count_before_delete == diagnosis_list_count_after_delete + 1) ? true : false ;
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_system_audit(test_title,get_string_translation("Delete Diagnosis"));
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    Log.Message(result_set);
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