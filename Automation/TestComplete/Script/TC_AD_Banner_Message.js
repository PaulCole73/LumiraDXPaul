//USEUNIT TSA_AD_Banner_Message
//USEUNIT TSA_AD_Login
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Get_Functions
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_banner_message_add_a_banner_message()
{
  try
  {
    var test_title = "Admin Dashboard - Banner Message - Add a Banner Message";
    login_admin_dash();
    
    var content = "Regression automation test message.";
    add_a_banner_message(content);
    var text = get_banner_message();
    
    var result_set = new Array();
    var result_set_1 = compare_values(content, text, test_title);
    result_set.push(result_set_1);
    
    text = get_audit_entry_admin_dash(1);
    result_set_1 = compare_values("Updated site message", text, test_title);
    result_set.push(result_set_1);
    
    log_off_admin_dash();

    login(7, "Shared");
    text = INRstar_base().Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("NewsMessages").innerText;
    
    result_set_1 = compare_values(content, text, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    Log_Off();
    
    login_admin_dash();
    add_a_banner_message("");
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_AD_Banner_Message";
    var test_name = "tc_banner_message_add_a_banner_message";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}