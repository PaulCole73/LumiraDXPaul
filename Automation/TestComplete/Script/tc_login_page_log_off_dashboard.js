//USEUNIT TSA_AD_Login
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Get_Functions
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------

function tc_login_log_off_admin_dashboard()
{
  try
  {
    var test_title = "Admin Dashboard - Login - Log Off Admin Dash";
    login_admin_dash();
    log_off_admin_dash();
    
    var result_set = new Array();
    
    var result_set_1 = false;
    if(admin_dash_login_base().Exists)
    {
      result_set_1 = true;
    }
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "tc_login_page_log_off_dashboard";
    var test_name = "tc_login_log_off_admin_dashboard";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}