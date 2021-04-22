//USEUNIT Admin_Dash_Get_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Misc_Functions
//USEUNIT TSA_AD_Account_Management
//USEUNIT TSA_AD_Login
//--------------------------------------------------------------------------------

function tc_account_management_change_clinical_system()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Change Clinical System";
    login_admin_dash();
  
    var name = "Regression" + get_unique_number();
    add_new_client(name);
    
    var loc_name = "Reg_Loc_" + get_unique_number();
    loc_name = add_treatment_location(name, loc_name, 1, new_guid(7));
    
    var values = new Array();
    values = get_location_license_details(name, loc_name);
    
    var date = aqDateTime.AddDays(aqDateTime.Today(), 10);
    var edited_values = new Array();
    edited_values = edit_client_location_licenses(name, loc_name, 1, 3, 2, date, 1);
    
    var audit_text = get_audit_entry_admin_dash(1);
    var result_set = new Array();
    var result_set_1 = compare_values("Updated location's license details", audit_text, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(values[4], edited_values[4], test_title);
    result_set_1 = results_checker_are_false(result_set_1);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "tc_account_management_amend_a_clinical_system";
    var test_name = "tc_account_management_change_clinical_system";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}