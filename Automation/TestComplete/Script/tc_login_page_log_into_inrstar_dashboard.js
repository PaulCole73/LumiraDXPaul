//USEUNIT admin_dash_tsa_useunits
//USEUNIT admin_dash_get_useunits
//USEUNIT admin_dash_goto_useunits
//USEUNIT admin_dash_misc_useunits
//USEUNIT admin_dash_popup_useunits
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_System_Paths
//--------------------------------------------------------------------------------

function tc_login_page_log_into_admin_dashboard()
{
  try
  {
    var test_title = "Admin Dashboard - Login page - Log into Admin Dash";
    login_admin_dash();
    
    var username = validate_login();
    
    var result_set = new Array();
    var result_set_1 = compare_values(username, get_login_details(23), test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "tc_login_page_log_into_inrstar_dashboard";
    var test_name = "tc_login_page_log_into_admin_dashboard";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}