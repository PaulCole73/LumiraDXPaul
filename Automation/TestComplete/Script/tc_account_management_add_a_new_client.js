//USEUNIT admin_dash_tsa_useunits
//USEUNIT admin_dash_get_useunits
//USEUNIT admin_dash_goto_useunits
//USEUNIT admin_dash_misc_useunits
//USEUNIT admin_dash_popup_useunits
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_System_Paths
//--------------------------------------------------------------------------------

function tc_account_management_add_a_new_client()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Add a new client";
    login_admin_dash();
  
    var name_suffix = get_unique_number();
    var name = "Regression" + name_suffix;
    add_new_client(name);
    
    Goto_Client(name);
  
    var name_found = admin_dash_client_details().Panel(1).Label("Name_DetachedLabel").innerText;
    var audit_text = get_audit_entry_admin_dash(1);
  
    var result_set = new Array();
    var result_set_1 = compare_values(name, name_found, test_title);
    result_set.push(result_set_1);
  
    result_set_1 = compare_values("Added new client account", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "tc_account_management_add_a_new_client";
    var test_name = "tc_account_management_add_a_new_client";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}