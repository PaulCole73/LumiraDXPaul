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
    login('clead@regression','INRstar_5','Shared');
    username = add_new_user("peter", "pickle", "automated_user", "INRstar_6");
    
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
    login('clead@regression','INRstar_5','Shared');
    username = add_new_user("cler", "ical", "a_u", "INRstar_6");
    
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
    login('clead@regression','INRstar_5','Shared');
    username = add_new_user("read", "only", "a_u", "INRstar_6");
    
    manage_user_permissions(username, "clerical 1");
    
    reset_user_permissions_to_readonly(username);
    
    //"Role set to [Read Only]."
    
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