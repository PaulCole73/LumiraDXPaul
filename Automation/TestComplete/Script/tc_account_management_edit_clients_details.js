//USEUNIT Admin_Dash_Get_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Misc_Functions
//USEUNIT TSA_AD_Account_Management
//USEUNIT TSA_AD_Login
//--------------------------------------------------------------------------------

function tc_account_management_edit_client_details()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Edit Client's Details";
    login_admin_dash();
  
    var name_suffix = get_unique_number();
    var name = "Regression" + name_suffix;
    add_new_client(name);
    
    var current_data = new Array();
    var new_data = new Array();
    current_data = get_client_details(name);
    Log.Message(current_data)
    
    name_suffix = get_unique_number();
    var new_name = "Edited" + name_suffix;
    edit_client_details(name, new_name);
    
    new_data = get_client_details(new_name);
    Log.Message(new_data);
    
    var audit_text = get_audit_entry_admin_dash(1);
    
    var result_set = new Array();
    result_set_1 = validate_arrays_dont_match(current_data, new_data, test_title);
    result_set.push(result_set_1);
  
    result_set_1 = compare_values("Updated client account details", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "tc_account_management_edit_clients_details";
    var test_name = "tc_account_management_edit_client_details";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}