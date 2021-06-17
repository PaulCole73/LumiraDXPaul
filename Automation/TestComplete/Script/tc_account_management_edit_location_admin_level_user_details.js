//USEUNIT admin_dash_tsa_useunits
//USEUNIT admin_dash_get_useunits
//USEUNIT admin_dash_goto_useunits
//USEUNIT admin_dash_misc_useunits
//USEUNIT admin_dash_popup_useunits
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_System_Paths
//--------------------------------------------------------------------------------

function tc_account_management_edit_location_admin_level_user_details()
{
  try
  {
    var test_title = "Admin Dashboard - Account management - Edit location admin level user details";
    login_admin_dash();
    
    var parent_client = "LDxCS-Test-AutoTest1";
    var username = add_a_new_user(parent_client, "location admin");
    
    var new_fullname = get_unique_number();
    var new_username = get_unique_number();
    update_a_location_admin(parent_client, username, "edit", new_fullname, new_username);
    
    var audit_text = get_audit_entry_admin_dash(1);
    var result_set = new Array();
    var result_set_1 = compare_values("Updated a Location Administrators user details", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "tc_account_management_edit_location_admin_level_user_details";
    var test_name = "tc_account_management_edit_location_admin_level_user_details";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}