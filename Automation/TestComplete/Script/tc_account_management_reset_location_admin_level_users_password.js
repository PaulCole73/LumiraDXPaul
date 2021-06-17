﻿//USEUNIT admin_dash_tsa_useunits
//USEUNIT admin_dash_get_useunits
//USEUNIT admin_dash_goto_useunits
//USEUNIT admin_dash_misc_useunits
//USEUNIT admin_dash_popup_useunits
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_System_Paths
//--------------------------------------------------------------------------------

function tc_account_management_reset_location_admin_level_users_password()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Reset location admin level users password";
    login_admin_dash();
    
    var parent_client = "LDxCS-Test-AutoTest1";
    var username = add_a_new_user(parent_client, "location admin");
    
    log_off_admin_dash();
    var val = new_guid(4);
    var pass = get_login_details(21);
    log_in_new_user(username, pass, null, "Reg_" + val);
    
    var result_set = new Array();
    result_set_1 = validate_user_logged_in(username);
    result_set.push(result_set_1);
    
    Log_Off();
    login_admin_dash();
    
    var pass = update_a_location_admin(parent_client, username, "reset password");
    
    log_off_admin_dash()
    log_in_new_user(username, pass, true)
    
    result_set_1 = validate_user_logged_in(username);
    result_set.push(result_set_1);
    
    Log_Off();
    login_admin_dash();
    
    var audit_text = get_audit_entry_admin_dash(1);
    result_set_1 = compare_values("Reset Password", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "tc_account_management_reset_location_admin_level_users_password";
    var test_name = "tc_account_management_reset_location_admin_level_users_password";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}