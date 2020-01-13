//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT Generic_Functions
//USEUNIT Navigation
//USEUNIT Test_Audit
//USEUNIT TSA_Users
//--------------------------------------------------------------------------------
function tc_users_add_a_new_user()
{
  try
  {
    var test_title = 'Users - Add a New User'
    var username;
    login('','Shared');
    username = add_new_user("add", "user", "add", "");
    
    var result_set = new Array();
    var result_set_1 = validate_top_system_audit(test_title, "Add User");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    Log.Message(results);
    
    //Pass in the result
    results_checker(results, test_title);     
  
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_users_manage_user_permissions()
{
  try
  {
    var test_title = 'Users - Manage User Permissions'
    var username;
    login('','Shared');
    username = add_new_user("manage", "perms", "manage", "");
    
    manage_user_permissions(username, "clerical 1");
    
    var result_set = new Array();
    var result_set_1 = validate_top_system_audit(test_title, "Edit user permissions");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    Log.Message(results);
    
    //Pass in the result
    results_checker(results, test_title);     
    
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_users_manage_change_permissions_to_read_only()
{
  try
  {
    var test_title = 'Users - Change Permission to Read Only'
    var username;
    login('');
    username = add_new_user("read", "only", "read", "");
    
    manage_user_permissions(username, "");
    
    reset_user_permissions_to_readonly(username);
    
    var result_set = new Array();
    var result_set_1 = validate_top_system_audit(test_title, "Edit user permissions");
    result_set.push(result_set_1);
    
    result_set_1 = more_info_top_system_audit("Role changed from [] to deleted.");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    Log.Message(results);
    
    //Pass in the result
    results_checker(results, test_title);  
     
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_users_reset_user_password()
{
  try
  {
    var test_title = 'Users - Reset Password'
    var username;
    login('');
    username = add_new_user("reset", "password", "reset", "");
    
    var user_data = reset_user_password(username);
    var new_password = aqString.SubString(user_data[1], 51, 8);
    
    var result_set = new Array();
    var result_set_1 = validate_top_system_audit(test_title, "Reset Password");
    result_set.push(result_set_1);
    
    result_set_1 = more_info_top_system_audit("User record ["+ user_data[0] +"] was updated.");
    result_set.push(result_set_1);
    
    Log_Off();
    
    login(username, new_password, 'Shared');
    
    var expected_text = "END USER PROGRAM LICENCE AGREEMENT";
    var header_text = INRstar_base().Panel("MainPage").Panel("main").TextNode(0).contentText;
    
    result_set_1 = compare_values(expected_text, header_text, "Confirm License Page Appears");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    Log.Message(results);
    
    //Pass in the result
    results_checker(results, test_title);
    
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_users_disable_user()
{
  try
  {
    var test_title = 'Users - Disable User'
    var username;
    login('');
    username = add_new_user("disable", "user", "disable", "");
    
    var text = disable_user_account(username);
    
    var result_set = new Array();
    var result_set_1 = validate_top_system_audit(test_title, "Disable User");
    result_set.push(result_set_1);
    
    result_set_1 = more_info_top_system_audit("Account Enabled changed from [True] to [False].");
    result_set.push(result_set_1);
    
    Log_Off();
    
    login(username, "INRstar_6", "Shared");
    
    var logon_page_path = log_on_form().Panel("LoginArea").Panel("Logon");
    
    if(logon_page_path.Exists == true)
    {
      result_set_1 = true;
      result_set.push(result_set_1);
    }
    else
    {
      result_set_1 = false;
      result_set.push(result_set_1);
    }
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    Log.Message(results);
    
    //Pass in the result
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_users_enable_user()
{
  try
  {
    var test_title = 'Users - Enable User'
    var username;
    login('');
    username = add_new_user("enable", "user", "enable", "");
    
    var text = disable_user_account(username);
    enable_user_account(username);
    
    var result_set = new Array();
    var result_set_1 = validate_top_system_audit(test_title, "Enable User");
    result_set.push(result_set_1);
    
    result_set_1 = more_info_top_system_audit("Account Enabled changed from [False] to [True].");
    result_set.push(result_set_1);
    
    Log_Off();
    
    login(username, "", "Shared");
    
    var expected_text = "END USER PROGRAM LICENCE AGREEMENT";
    var header_text = INRstar_base().Panel("MainPage").Panel("main").TextNode(0).contentText;
    
    result_set_1 = compare_values(expected_text, header_text, "Confirm License Page Appears");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    Log.Message(results);
    
    //Pass in the result
    results_checker(results, test_title);
    
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}