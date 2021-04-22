//USEUNIT Admin_Dash_Get_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Misc_Functions
//USEUNIT TSA_AD_Account_Management
//USEUNIT TSA_AD_Login
//--------------------------------------------------------------------------------

function tc_account_management_add_a_new_client()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Add a New Client";
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