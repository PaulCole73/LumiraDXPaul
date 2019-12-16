//USEUNIT TSA_Account_Management
//USEUNIT TSA_AD_Login
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Get_Functions
//USEUNIT Misc_Functions
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
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_add_a_new_client";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function tc_account_management_edit_client_details()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Edit Client's Details";
    login_admin_dash();
  
    var name_suffix = get_unique_number();
    var name = "Regression" + name_suffix;
    add_new_client(name);
    
    var current_data = new Array();
    var new_data = new Array();
    current_data = get_client_details(name);
    Log.Message(current_data)
    
    name_suffix = get_unique_number();
    var new_name = "Edited" + name_suffix;
    edit_client_details(name, new_name);
    
    new_data = get_client_details(new_name);
    Log.Message(new_data);
    
    var audit_text = get_audit_entry_admin_dash(1);
    
    var result_set = new Array();
    result_set_1 = validate_arrays_dont_match(current_data, new_data, test_title);
    result_set.push(result_set_1);
  
    result_set_1 = compare_values("Updated client account details", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_edit_client_details";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function tc_account_management_add_org_clinical_lead_user()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Add Org Clinical Lead User";
    login_admin_dash();
    
    var parent_client = get_parent_client_name();
    var username = add_a_new_user(parent_client, "org clinical");
    
    log_off_admin_dash();
    log_in_new_user(username, get_login_details(21));
    
    var result_set = new Array();
    result_set_1 = validate_user_logged_in(username);
    result_set.push(result_set_1);
    
    Log_Off();
    login_admin_dash();
    
    var audit_text = get_audit_entry_admin_dash(1);
    result_set_1 = compare_values("Added new clinical lead to organisation account", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_add_org_clinical_lead_user";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function tc_account_management_reset_org_clinical_lead_user_password()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Reset Org Clinical Lead Password";
    login_admin_dash();
    
    var parent_client = get_parent_client_name();
    var username = add_a_new_user(parent_client, "org clinical");
    
    log_off_admin_dash();
    var val = new_guid(4);
    log_in_new_user(username, get_login_details(21), null,  "Reg_" + val);
    
    var result_set = new Array();
    result_set_1 = validate_user_logged_in(username);
    result_set.push(result_set_1);
    
    Log_Off();
    login_admin_dash();
    
    var pass = update_a_user(parent_client, username, "reset password");
    
    log_off_admin_dash()
    log_in_new_user(username, pass, true)
    
    result_set_1 = validate_user_logged_in(username);
    result_set.push(result_set_1);
    
    Log_Off();
    login_admin_dash();
    
    var audit_text = get_audit_entry_admin_dash(1);
    result_set_1 = compare_values("Reset Password", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_reset_org_clinical_lead_user_password";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function tc_account_management_remove_org_clinical_lead()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Remove Org Clinical Lead User";
    login_admin_dash();
    
    var parent_client = get_parent_client_name();
    var username = add_a_new_user(parent_client, "org clinical");
    
    update_a_user(parent_client, username, "remove");
    
    var audit_text = get_audit_entry_admin_dash(1);
    var result_set = new Array();
    var result_set_1 = compare_values("Removed clinical lead from organisation account", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_remove_org_clinical_lead";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function tc_account_management_add_admin_lead_user()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Add Location Admin User";
    login_admin_dash();
    
    var parent_client = "Deans Regression Testing Location";
    var username = add_a_new_user(parent_client, "location admin");
    
    log_off_admin_dash();
    log_in_new_user(username, get_login_details(21));
    
    var result_set = new Array();
    result_set_1 = validate_user_logged_in(username);
    result_set.push(result_set_1);
    
    Log_Off();
    login_admin_dash();
    
    var audit_text = get_audit_entry_admin_dash(1);
    result_set_1 = compare_values("Added new administrator to location", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_add_admin_lead_user";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function tc_account_management_edit_admin_lead_user()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Edit Location Admin Details";
    login_admin_dash();
    
    var parent_client = "Deans Regression Testing Location";
    var username = add_a_new_user(parent_client, "location admin");
    
    var new_fullname = get_unique_number();
    var new_username = get_unique_number();
    update_a_location_admin(parent_client, username, "edit", new_fullname, new_username);
    
    var audit_text = get_audit_entry_admin_dash(1);
    var result_set = new Array();
    var result_set_1 = compare_values("Updated a Location Administrators user details", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_edit_admin_lead_user";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function tc_account_management_reset_location_admin_user_password()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Reset Location Admin Password";
    login_admin_dash();
    
    var parent_client = "Deans Regression Testing Location";
    var username = add_a_new_user(parent_client, "location admin");
    
    log_off_admin_dash();
    var val = new_guid(4);
    log_in_new_user(username, get_login_details(21), null,  "Reg_" + val);
    
    var result_set = new Array();
    result_set_1 = validate_user_logged_in(username);
    result_set.push(result_set_1);
    
    Log_Off();
    login_admin_dash();
    
    var pass = update_a_location_admin(parent_client, username, "reset password");
    
    log_off_admin_dash()
    log_in_new_user(username, pass, true)
    
    result_set_1 = validate_user_logged_in(username);
    result_set.push(result_set_1);
    
    Log_Off();
    login_admin_dash();
    
    var audit_text = get_audit_entry_admin_dash(1);
    result_set_1 = compare_values("Reset Password", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_reset_location_admin_user_password";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function tc_account_management_remove_location_admin()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Remove Location Admin User";
    login_admin_dash();
    
    var parent_client = "Deans Regression Testing Location";
    var username = add_a_new_user(parent_client, "location admin");
    
    update_a_location_admin(parent_client, username, "remove");
    
    var audit_text = get_audit_entry_admin_dash(1);
    var result_set = new Array();
    var result_set_1 = compare_values("Removed administrator from location", audit_text, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_remove_location_admin";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function tc_account_management_create_treatment_location()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Create a Treatment Location";
    login_admin_dash();
  
    var name = "Regression" + get_unique_number();
    add_new_client(name);
    
    var loc_name = "Reg_Loc_" + get_unique_number();
    loc_name = add_treatment_location(name, loc_name, 1, new_guid(7));
    
    var result_set = new Array();
    var result_set_1 = Goto_Client_Location(name, loc_name)
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
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_create_treatment_location";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function tc_account_management_create_view_only_location()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Create a View Only Location";
    login_admin_dash();
  
    var name = "Regression" + get_unique_number();
    add_new_client(name);
    
    var loc_name = "Reg_Loc_" + get_unique_number();
    loc_name = add_treatment_location(name, loc_name, 2, new_guid(7));
    
    var result_set = new Array();
    var result_set_1 = Goto_Client_Location(name, loc_name)
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
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_create_view_only_location";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function tc_account_management_edit_treatment_location_details()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Edit a Treatment Location";
    login_admin_dash();
  
    var name = "Regression" + get_unique_number();
    add_new_client(name);
    
    var loc_name = "Reg_Loc_" + get_unique_number();
    add_treatment_location(name, loc_name, 1, new_guid(7));
    
    var original_data = new Array();
    original_data = get_location_details(name, loc_name, "editable");
    
    var new_name = "Edit_Loc_" + get_unique_number();
    edit_client_location(name, loc_name, new_name)
    
    var new_data = new Array();
    new_data = get_location_details(name, new_name, "editable");
    
    var audit_text = get_audit_entry_admin_dash(1);
    
    var result_set = new Array();
    var result_set_1 = compare_values("Updated location details", audit_text, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_arrays_dont_match(original_data, new_data, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_edit_treatment_location_details";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function tc_account_management_edit_treatment_location_license()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Create a Treatment Location";
    login_admin_dash();
  
    var name = "Regression" + get_unique_number();
    add_new_client(name);
    
    var loc_name = "Reg_Loc_" + get_unique_number();
    add_treatment_location(name, loc_name, 1, new_guid(7));
    
    var values = new Array();
    values = get_location_license_details(name, loc_name);
    Log.Message(values);
    
    var date = aqDateTime.AddDays(aqDateTime.Today(), 10);
    var edited_values = new Array();
    edited_values = edit_client_location_licenses(name, loc_name, 1, 3, 2, date);
    Log.Message(edited_values);
    
    var audit_text = get_audit_entry_admin_dash(1);
    var result_set = new Array();
    var result_set_1 = compare_values("Updated location's license details", audit_text, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(values[1], edited_values[1], test_title);
    result_set_1 = results_checker_are_false(result_set_1);
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(values[3], edited_values[3], test_title);
    result_set_1 = results_checker_are_false(result_set_1);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    log_off_admin_dash();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_edit_treatment_location_license";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function tc_account_management_search_facility()
{
  try
  {
    var test_title = "Admin Dashboard - Account Management - Search Facility";
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
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_search_facility";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}
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
    var suite_name = "TC_AD_Account_Management";
    var test_name = "tc_account_management_change_clinical_system";
    handle_failed_tests(suite_name, test_name);
    restart_admin_dash();
  }
}