//USEUNIT Admin_Dash_Get_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Misc_Functions
//USEUNIT TSA_AD_Account_Management
//USEUNIT TSA_AD_Login
//--------------------------------------------------------------------------------

function tc_account_management_edit_location_details()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Edit location details";
    login_admin_dash();
  
    var name = "Regression" + get_unique_number();
    add_new_client(name);
    
    var loc_name = "Reg_Loc_" + get_unique_number();
    add_treatment_location(name, loc_name, 1, new_guid(7));
    
    var original_data = new Array();
    original_data = get_location_details(name, loc_name, "editable");
    
    var new_name = "Edit_Loc_" + get_unique_number();
    edit_client_location(name, loc_name, new_name)
    
    var new_data = new Array();
    new_data = get_location_details(name, new_name, "editable");
    
    var audit_text = get_audit_entry_admin_dash(1);
    
    var result_set = new Array();
    var result_set_1 = compare_values("Updated location details", audit_text, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_arrays_dont_match(original_data, new_data, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "tc_account_management_edit_location_details";
    var test_name = "tc_account_management_edit_location_details";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}