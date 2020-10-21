//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_Loc_Management_Users
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_users_add_a_new_user()
{
  try
  {
    var test_title = 'Users - Add a New User';
    login(7, "Shared");
    var new_pass = get_login_details(21);
    
    var username = add_new_user("add", "user", "add", new_pass);
    
    var result_set = new Array();
    var result_set_1 = validate_top_system_audit(test_title,get_string_translation("Add User"));
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set);
    
    //Pass in the result
    results_checker(results, test_title);     
  
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Loc_Management_Users";
    var test_name = "tc_users_add_a_new_user";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_users_manage_user_permissions()
{
  try
  {
    var test_title = 'Users - Manage User Permissions';
    login(7, "Shared");
    var new_pass = get_login_details(21);
    
    var username = add_new_user("manage", "perms", "manage", new_pass);
    
    manage_user_permissions(username, "clerical 1");
    
    var result_set = new Array();
    var result_set_1 = validate_top_system_audit(test_title, get_string_translation("Edit user permissions"));
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results, test_title);     
    
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Loc_Management_Users";
    var test_name = "tc_users_manage_user_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_users_manage_change_permissions_to_read_only()
{
  try
  {
    var test_title = 'Users - Change Permission to Read Only';
    login(7, "Shared");
    var new_pass = get_login_details(21);
    var username = add_new_user("read", "only", "read", new_pass);
    
    manage_user_permissions(username, "clerical 1");    
    reset_user_permissions_to_readonly(username);
    
    var result_set = new Array();
    var result_set_1 = validate_top_system_audit(test_title,get_string_translation("Edit user permissions"));
    result_set.push(result_set_1);
    
    result_set_1 = validate_more_info_top_system_audit(get_string_translation("Role changed from") + " [" + get_string_translation("Clerical 1") + "] " 
                                                       + get_string_translation("to deleted") + ".");
    result_set.push(result_set_1);
    
    Log_Off();
    log_in_new_user(username, new_pass);
    
    Goto_Patient_Search();
    var obj = INRstar_base().Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("ManagePatients").Panel("PatientTab").Link("AddPatientDetailsTab"); 
  
    result_set_1 = false;
    if(obj.onclick == null)
    {
      result_set_1 = true;
    }
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set);
    
    //Pass in the result
    results_checker(results, test_title);  
     
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Loc_Management_Users";
    var test_name = "tc_users_manage_change_permissions_to_read_only";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_users_reset_user_password()
{
  try
  {
    var test_title = 'Users - Reset Password';
    login(7, "Shared");
    var new_pass = get_login_details(21);
    var username = add_new_user("reset", "password", "reset", new_pass);
    
    var user_data = reset_user_password(username);
    var new_password = user_data[1];
    
    var result_set = new Array();
    var result_set_1 = validate_top_system_audit(test_title, get_string_translation("Reset Password"));
    result_set.push(result_set_1);
    
    result_set_1 = validate_more_info_top_system_audit("User" + " " + (get_string_translation("record") + " ["+ user_data[0] +"] " + get_string_translation("was updated") + "."));
    result_set.push(result_set_1);
    
    Log_Off();
    
    login(username, "Shared", new_password);
    
    if(language == "English")
    {
      var expected_text = "END USER PROGRAM LICENCE AGREEMENT";
    }
     else
     {
       var expected_text = "ITALIAN END USER PROGRAM LICENCE AGREEMENT";
     }
     
    var header_text = INRstar_base().Panel("MainPage").Panel("main").TextNode(0).contentText;
    
    result_set_1 = compare_values(expected_text, header_text,"Confirm License Page Appears");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results, test_title);
    
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Loc_Management_Users";
    var test_name = "tc_users_reset_user_password";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_users_disable_user()
{
  try
  {
    var test_title = 'Users - Disable User';
    login(7, "Shared");
    var new_pass = get_login_details(21);
    var username = add_new_user("disable", "user", "disable", new_pass);
    
    var text = disable_user_account(username);
    
    var result_set = new Array();
    var result_set_1 = validate_top_system_audit(test_title, get_string_translation("Disable User"));
    result_set.push(result_set_1);
    
    if (language == "Italian")
    {
    result_set_1 = validate_more_info_top_system_audit(get_string_translation("Account Enabled") + " " + get_string_translation("changed from") + " [" + get_string_translation("True") + "]" 
                                                       + get_string_translation("to") + " [" + get_string_translation("False") + "]" + ".");
    }
    else
    {
    result_set_1 = validate_more_info_top_system_audit(get_string_translation("Account Enabled") + " " + get_string_translation("changed from") + " [" + get_string_translation("True") + "] " 
                                                       + get_string_translation("to") + " [" + get_string_translation("False") + "]" + ".");
    }
    result_set.push(result_set_1);
    
    Log_Off();
    
    login(username, "Shared", new_pass);
    var result_set_1 = tsv_logoff_inrstar('1',get_string_translation("The login details are incorrect, please re-enter"));
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set);
    
    //Pass in the result
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Loc_Management_Users";
    var test_name = "tc_users_disable_user";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_users_enable_user()
{
  try
  {
    var test_title = 'Users - Enable User'
    login(7, "Shared");
    var new_pass = get_login_details(21);
    var username = add_new_user("enable", "user", "enable", new_pass);
    
    var text = disable_user_account(username);
    enable_user_account(username);
    
    var result_set = new Array();
    var result_set_1 = validate_top_system_audit(test_title, get_string_translation("Enable User"));
    result_set.push(result_set_1);
    
    if (language == "Italian")
    {
    result_set_1 = validate_more_info_top_system_audit(get_string_translation("Account Enabled") + " " + get_string_translation("changed from") + " [" + get_string_translation("False") + "]" 
                                                       + get_string_translation("to") + " [" + get_string_translation("True") + "]" + ".");
    }
    else
    {
    result_set_1 = validate_more_info_top_system_audit(get_string_translation("Account Enabled") + " " + get_string_translation("changed from") + " [" + get_string_translation("False") + "] " 
                                                       + get_string_translation("to") + " [" + get_string_translation("True") + "]" + ".");      
    }
    result_set.push(result_set_1);
    
    Log_Off();
    
    login(username, "Shared", new_pass);
    
    if(language == "English")
    {
      var expected_text = "END USER PROGRAM LICENCE AGREEMENT";
    }
     else
     {
       var expected_text = "ITALIAN END USER PROGRAM LICENCE AGREEMENT";
     }
     
    var header_text = INRstar_base().Panel("MainPage").Panel("main").TextNode(0).contentText;
    
    result_set_1 = compare_values(expected_text, header_text, "Confirm License Page Appears");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set);
    
    //Pass in the result
    results_checker(results, test_title);
    
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Loc_Management_Users";
    var test_name = "tc_users_enable_user";
    handle_failed_tests(suite_name, test_name);
  }
}