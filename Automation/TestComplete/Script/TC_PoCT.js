//USEUNIT TSA_PoCT
//USEUNIT TSA_Login
//USEUNIT TSA_NEQAS
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_add_a_new_poct()
{
  try
  {
    var test_title = 'Options/PoCT - Add a new PoCT batch'
    login(5, "Shared");
  
    var batch_numbers = new Array();
    batch_numbers = get_poct_batch_numbers();
    var data_added_array = tsa_poct_create_poct_batch(batch_numbers);
    var data_saved_array = get_top_poct_data();
  
    var result_set = new Array()
    var result_set_1 = checkArrays(data_added_array, data_saved_array, 'Options/PoCT - Add a new PoCT batch');
    result_set.push(result_set_1);
  
    //Check any other PoCT are now inactive
    var result_set_active_flag_data = get_poct_flag_data_minus_top_active_row()
    result_set_1 = results_checker_are_false(result_set_active_flag_data)
    result_set.push(result_set_1);

    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
  
    //Pass in the final result
    results_checker(results,test_title); 
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_PoCT";
    var test_name = "tc_add_a_new_poct";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------
function tc_edit_a_new_poct_batch()
{
  try
  {
    var test_title = 'Options/PoCT - Edit a new PoCT batch'
    login(5, "Shared");
    var result_set = new Array();
  
    var batch_numbers = new Array();
    batch_numbers = get_poct_batch_numbers();
    var poct_data = tsa_poct_create_poct_batch(batch_numbers);
  
    //Edit the batch to be inactive
    edit_poct_make_inactive(poct_data[0]);
  
    //  //Check flag is at the right status
    var result_set_flag_data = get_active_flag(poct_data[0]);
    var result_set_1 = results_checker_are_false(result_set_flag_data);
    result_set.push(result_set_1);

    //Edit the batch to be active
    edit_poct_make_active(poct_data[0]);
  
    //Check flag is now active_again
    result_set_1 = get_active_flag(poct_data[0]);
    result_set.push(result_set_1);

    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
  
    //Pass in the final result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_PoCT";
    var test_name = "tc_edit_a_new_poct_batch";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------