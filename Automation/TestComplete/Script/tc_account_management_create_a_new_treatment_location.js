﻿//USEUNIT TSA_AD_Main_Page
//USEUNIT TSA_AD_Login
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Get_Functions
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------

function tc_account_management_create_a_new_treatment_location()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Create a new treatment location";
    login_admin_dash();
  
    var name = "Regression" + get_unique_number();
    add_new_client(name);
    
    var loc_name = "Reg_Loc_" + get_unique_number();
    loc_name = add_treatment_location(name, loc_name, 1, new_guid(7));
    
    var result_set = new Array();
    var result_set_1 = Goto_Client_Location(name, loc_name);
    result_set.push(result_set_1);
    
    var audit_text = get_audit_entry_admin_dash(1);
  
    result_set_1 = compare_values("Added a new location", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "tc_account_management_create_a_new_treatment_location";
    var test_name = "tc_account_management_create_a_new_treatment_location";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}