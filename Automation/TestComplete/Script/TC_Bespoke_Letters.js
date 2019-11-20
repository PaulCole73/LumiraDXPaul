//USEUNIT TSA_Login
//USEUNIT TSA_Bespoke_Letters
//USEUNIT Navigation
//USEUNIT Misc_Functions
//-----------------------------------------------------------------------------------
function tc_bespoke_letters_create_new_letter()
{
  try
  {
    var test_title = "Bespoke Letters - Create a new bespoke letter";
    login("clead@regression", "INRstar_5", "Shared");
    
    var expected_content = new Array();
    var content = new Array();
    var perms = new Array();
    var result_set = new Array();
    
    //permissions array, each number represents a checkbox that will be checked
    //this ticks all the permissions boxes
    //but e.g. .push(1, 3, 5) would only tick 1st/3rd/5th boxes and leave the rest unticked
    perms.push(1, 2, 3, 4, 5, 6, 7);
    
    var name = add_a_bespoke_letter("", "Test", perms);
    content = get_bespoke_letter_content(name);
    expected_content.push(name, "", "Test");
    
    var result_set_1 = checkArrays(content, expected_content, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_bespoke_permissions(perms, name);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//-----------------------------------------------------------------------------------
function tc_bespoke_letters_edit_a_letter()
{
  try
  {
    var test_title = "Bespoke Letters - Edit a bespoke letter";
    login("clead@regression", "INRstar_5", "Shared");
    
    var expected_content = new Array();
    var content = new Array();
    var perms = new Array();
    var result_set = new Array();
    perms.push(1, 2, 3, 4, 5, 6, 7);
    
    var name = add_a_bespoke_letter("", "Test", perms);
    
    perms.length = 0;
    perms.push(1, 3, 5);
    expected_content.length = 0;
    expected_content.push(name, "Edited Data", "Edited Body Data");
    
    edit_a_bespoke_letter(name, "Edited Data", "Edited Body Data", perms)
    content = get_bespoke_letter_content(name);
    
    result_set_1 = checkArrays(content, expected_content, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_bespoke_permissions(perms, name);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//-----------------------------------------------------------------------------------
function tc_bespoke_letters_copy_a_letter()
{
  try
  {
    var test_title = "Bespoke Letters - Create a copy of a letter";
    login("clead@regression", "INRstar_5", "Shared");
    
    var expected_content = new Array();
    var content = new Array();
    var perms = new Array();
    var result_set = new Array();
    perms.push(1, 2, 3, 4, 5, 6, 7);
    
    var name = add_a_bespoke_letter("Copy a Letter", "Copy Body", perms);
    var copy_name = copy_a_bespoke_letter(name);
    
    expected_content.push(copy_name, "Copy a Letter", "Copy Body");
    content = get_bespoke_letter_content(copy_name);
    
    result_set_1 = checkArrays(content, expected_content, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_bespoke_permissions(perms, copy_name);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//-----------------------------------------------------------------------------------
function tc_bespoke_letters_rename_a_letter()
{
  try
  {
    var test_title = "Bespoke Letters - Rename a letter";
    login("clead@regression", "INRstar_5", "Shared");
    
    var expected_content = new Array();
    var content = new Array();
    var field_states = new Array();
    var expected_states = new Array();
    var perms = new Array();
    var result_set = new Array();
    perms.push(1, 2, 3, 4, 5, 6, 7);
    
    var name = add_a_bespoke_letter("Rename a Letter", "Rename Body", perms);
    
    field_states = rename_bespoke_letter_editable_fields(name)
    expected_states.push(true, false, false, false);
    
    var new_name = rename_a_bespoke_letter(name);
    
    expected_content.push(new_name, "Rename a Letter", "Rename Body");
    content = get_bespoke_letter_content(new_name);
    
    result_set_1 = checkArrays(field_states, expected_states, test_title);
    result_set.push(result_set_1);
    
    var exists = Goto_Bespoke_Letter(name);
    var result_set_1 = compare_values(exists, false, test_title);
    result_set.push(result_set_1);
    
    exists = Goto_Bespoke_Letter(new_name);
    var result_set_1 = compare_values(exists, true, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = checkArrays(content, expected_content, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_bespoke_permissions(perms, new_name);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//-----------------------------------------------------------------------------------
function tc_bespoke_letters_add_fields_to_a_letter() //not done - in progress
{
  try
  {
    var test_title = "Bespoke Letters - Edit a bespoke letter";
    login("clead@regression", "INRstar_5", "Shared");
    
    var expected_content = new Array();
    var content = new Array();
    var perms = new Array();
    var result_set = new Array();
    perms.push(1, 2, 3, 4, 5, 6, 7);
    
    var name = add_a_bespoke_letter("", "Test", perms);
    
    perms.length = 0;
    perms.push(1, 3, 5);
    expected_content.length = 0;
    expected_content.push(name, "Edited Data", "Edited Body Data");
    
    edit_a_bespoke_letter(name, "Edited Data", "Edited Body Data", perms)
    content = get_bespoke_letter_content(name);
    
    result_set_1 = checkArrays(content, expected_content, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_bespoke_permissions(perms, name);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}