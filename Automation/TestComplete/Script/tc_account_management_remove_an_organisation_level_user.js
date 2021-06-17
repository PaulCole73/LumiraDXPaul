//USEUNIT admin_dash_tsa_useunits
//USEUNIT admin_dash_get_useunits
//USEUNIT admin_dash_goto_useunits
//USEUNIT admin_dash_misc_useunits
//USEUNIT admin_dash_popup_useunits
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_System_Paths
//--------------------------------------------------------------------------------

function tc_account_management_remove_an_organisation_level_user()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Remove an organisation level user";
    login_admin_dash();
    
    var parent_client = get_parent_client_name();
    var username = add_a_new_user(parent_client, "org clinical");
    
    update_a_user(parent_client, username, "remove");
    
    var audit_text = get_audit_entry_admin_dash(1);
    var result_set = new Array();
    var result_set_1 = compare_values("Removed clinical lead from organisation account", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "tc_account_management_remove_an_organisation_level_user";
    var test_name = "tc_account_management_remove_an_organisation_level_user";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}