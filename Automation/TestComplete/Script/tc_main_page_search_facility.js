//USEUNIT TSA_AD_Login
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Get_Functions
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------

function tc_main_page_search_facility()
{
  try
  {
    var test_title = "Admin Dashboard - Main page - Search Facility";
    login_admin_dash();
  
    var name = "Regression" + get_unique_number();
    add_new_client(name);
    
    var loc_name = "Reg_Loc_" + get_unique_number();
    loc_name = add_treatment_location(name, loc_name, 2, new_guid(7));
    
    var result_set = new Array();
    var result_set_1 = Goto_Client_Location(name, loc_name)
    result_set.push(result_set_1);
    
    loc_name = "Reg_Loc_" + get_unique_number();
    loc_name = add_treatment_location(name, loc_name, 1, new_guid(7));
    
    result_set_1 = Goto_Client_Location(name, loc_name)
    result_set.push(result_set_1);
    
    Goto_Client(name);
    var name_found = admin_dash_client_details().Panel(1).Label("Name_DetachedLabel").innerText;
    
    result_set_1 = compare_values(name, name_found, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "tc_main_page_search_facility";
    var test_name = "tc_main_page_search_facility";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}