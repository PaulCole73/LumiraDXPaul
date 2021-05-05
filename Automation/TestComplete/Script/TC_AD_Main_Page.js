//USEUNIT TSA_AD_Login
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Get_Functions
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_main_page_todays_date_displayed()
{
  try
  {
    var test_title = "Admin Dashboard - Main Page - Header Contains Correct Date";
    login_admin_dash();
    
    var path = admin_dash_base().Panel("MainPage").Panel("header").Panel("logindisplay").Panel("LoginStatus");
    var text = path.innerText;
    var text_split = new Array();
    text_split = text.split(" ");
    text = text_split[0] + " " + text_split[1];
    
    var today_date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%A %d-%b-%Y");
    
    var result_set = new Array();
    var result_set_1 = compare_values(today_date, text, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_AD_Main_Page";
    var test_name = "tc_main_page_todays_date_displayed";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}