//USEUNIT admin_dash_tsa_useunits
//USEUNIT admin_dash_get_useunits
//USEUNIT admin_dash_goto_useunits
//USEUNIT admin_dash_misc_useunits
//USEUNIT admin_dash_popup_useunits
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_System_Paths
//--------------------------------------------------------------------------------

function tc_main_page_header_contains_the_correct_date()
{
  try
  {
    var test_title = "Admin Dashboard - Main page - Header contains correct date";
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
    var suite_name = "tc_main_page_header_contains_the_correct_date";
    var test_name = "tc_main_page_header_contains_the_correct_date";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
