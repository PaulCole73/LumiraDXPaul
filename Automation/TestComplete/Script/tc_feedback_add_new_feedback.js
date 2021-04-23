//USEUNIT TSA_AD_Feedback
//USEUNIT TSA_AD_Login
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Get_Functions
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_feedback_add_new_feedback()
{
  try
  {
    var test_title = "Admin Dashboard - Feedback - Add New Feedback";
    login(5, "Shared");
    
    var location = "LDxCS-Test-AutoTest1";
    var feedback = "Regression test: " + test_title + ". Feedback testing text.";
    var datetime = add_inrstar_feedback(feedback);
    
    var expected_data = new Array();
    expected_data.push(datetime, feedback, location);
    
    Log_Off();
    login_admin_dash();
    
    var data = new Array();
    data = get_feedback(1);
    
    var result_set = new Array();
    var result_set_1 = checkArrays(data, expected_data, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_AD_Feedback";
    var test_name = "tc_feedback_add_new_feedback";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}