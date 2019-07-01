//USEUNIT Tested_Apps
//USEUNIT TSA_PoCT
//USEUNIT TSA_Login
//USEUNIT Generic_Functions
//USEUNIT Navigation
//--------------------------------------------------------------------------------
function tc_add_a_new_poct()
{
try
 {
  var test_title = 'Options/PoCT - Add a new PoCT batch'
  login('cl3@regression','INRstar_5','Shared');

  var data_added_array = add_poct('');
  var data_saved_array = get_top_poct_data();
  
  result_set_1 = validateArrays(data_added_array, data_saved_array,'Options/PoCT - Add a new PoCT batch');
  
  result_set = new Array()
  result_set.push(result_set_1);
  
  //Check any other PoCT are now inactive
  var result_set_active_flag_data = get_poct_flag_data_minus_top_active_row()
  var result_set_2 = results_checker_are_false(result_set_active_flag_data)
  result_set.push(result_set_2);

  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results,test_title); 
  
  Log_Off();
 }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  }
} 
//-------------------------------
function tc_edit_a_new_poct_batch()
{
try
 {
  var test_title = 'Options/PoCT - Edit a new PoCT batch'
  login('cl3@regression','INRstar_5','Shared');
  var result_set = new Array();
  
  var batch_num = new_num_20();
  add_poct(batch_num);
  
  //Edit the batch to be inactive
  edit_poct_make_inactive(batch_num);
  
//  //Check flag is at the right status
  var result_set_flag_data = get_active_flag(batch_num);
  var result_set_1 = results_checker_are_false(result_set_flag_data);
  result_set.push(result_set_1);

  //Edit the batch to be active
  edit_poct_make_active(batch_num);
  
  //Check flag is now active_again
  var result_set_2 = get_active_flag(batch_num);
  result_set.push(result_set_2);

  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results, test_title);
  
  Log_Off();
  }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  }
} 
//-------------------------------