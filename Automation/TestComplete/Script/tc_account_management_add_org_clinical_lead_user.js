﻿//USEUNIT Admin_Dash_Get_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Misc_Functions
//USEUNIT TSA_AD_Account_Management
//USEUNIT TSA_AD_Login
//--------------------------------------------------------------------------------

function tc_account_management_add_org_clinical_lead_user()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Add Org Clinical Lead User";
    login_admin_dash();
    
    var parent_client = get_parent_client_name();
    var username = add_a_new_user(parent_client, "org clinical");
    
    log_off_admin_dash();
    log_in_new_user(username, get_login_details(21));
    
    var result_set = new Array();
    result_set_1 = validate_user_logged_in(username);
    result_set.push(result_set_1);
    
    Log_Off();
    login_admin_dash();
    
    var audit_text = get_audit_entry_admin_dash(1);
    result_set_1 = compare_values("Added new clinical lead to organisation account", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "tc_account_management_add_org_clinical_lead_user";
    var test_name = "tc_account_management_add_org_clinical_lead_user";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}