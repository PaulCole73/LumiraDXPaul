//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_NEQAS
//USEUNIT INRstar_Navigation
//USEUNIT System_Paths
//USEUNIT Misc_Functions
//USEUNIT Popup_Handlers
//USEUNIT INRstar_Misc_Functions

//--------------------------------------------------------------------------------
function tc_neqas_add_new_from_eqc()
{
  try
  {
    var test_title = 'NEQAS - Add a NEQAS from the EQC tab'
    login(7, "Shared");
      
    var batch_numbers = new Array();
    var row_data = new Array();
    var row_data_1 = new Array();
    var result_set = new Array();
    
    tsa_neqas_delete_entries();
    tsa_neqas_setup_poct_batches(1);
    batch_numbers = get_poct_batch_numbers(); 
    
    var batch_reference = tsa_neqas_add_eqc_result(batch_numbers[0], "2.5", "~Select INR");
    
    row_data = get_eqc_table_row(batch_reference);
    row_data_1.push(aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y"), batch_reference, "NEQAS", batch_numbers[0], "2.5", "", "No Value");
    
    var result_set_1 = checkArrays(row_data, row_data_1);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_system_audit(test_title,get_string_translation("Added EQC Result"));
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_NEQAS";
    var test_name = "tc_neqas_add_new_from_eqc";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_neqas_add_new_from_eqc_with_multiple_active_batches()
{
  try
  {
    var test_title = 'NEQAS - Add a NEQAS from the EQC tab with multiple batches'
    login(7, "Shared");
      
    var batch_numbers = new Array();
    var row_data = new Array();
    var row_data_1 = new Array();
    var result_set = new Array();
    
    tsa_neqas_delete_entries();
    tsa_neqas_setup_poct_batches(2);
    batch_numbers = get_poct_batch_numbers();
    
    for(var i = 0; i < 2; i++)
    {
      var batch_reference = tsa_neqas_add_eqc_result(batch_numbers[i], "2.5", "~Select INR");
        
      row_data = get_eqc_table_row(batch_reference);
      row_data_1.length = 0;
      row_data_1.push(aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y"), batch_reference, "NEQAS", batch_numbers[i], "2.5", "", "No Value");
                                                
      var result_set_1 = checkArrays(row_data, row_data_1);
      result_set.push(result_set_1);
    }
    
    result_set_1 = validate_top_system_audit(test_title,get_string_translation("Added EQC Result"));
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_NEQAS";
    var test_name = "tc_neqas_add_new_from_eqc_with_multiple_active_batches";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_neqas_edit_existing_add_external_inr()
{
  try
  {
    var test_title = 'NEQAS - Edit Existing External INR'
    login(7, "Shared");
      
    var batch_numbers = new Array();
    var row_data = new Array();
    var row_data_1 = new Array();
    var result_set = new Array();
    
    tsa_neqas_delete_entries();
    tsa_neqas_setup_poct_batches(1);
    batch_numbers = get_poct_batch_numbers(); 
    
    var batch_reference = tsa_neqas_add_eqc_result(batch_numbers[0], "2.5", "~Select INR");
        
    row_data = get_eqc_table_row(batch_reference);
    row_data_1.push(aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y"), batch_reference, "NEQAS", batch_numbers[0], "2.5", "", "No Value");
                                                
    var result_set_1 = checkArrays(row_data, row_data_1);
    result_set.push(result_set_1);                                            
                                                
    tsa_neqas_edit_eqc_result(1, batch_numbers[0], "2.5", "3.0"); 
    
    var percent_error = (1 - (2.5/3)) * 100;
    percent_error = percent_error.toFixed(2);                              
    
    row_data = get_eqc_table_row(batch_reference);
    result_set_1 = checkArrays(row_data, row_data_1);
    result_set_1 = results_checker_are_false(result_set_1);
    result_set.push(result_set_1);
    
    result_set_1 = false;
    if(row_data[6] == (percent_error + "%"))
    {
      result_set_1 = true;
    }
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_system_audit(test_title, "Updated EQC Result");
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_NEQAS";
    var test_name = "tc_neqas_edit_existing_add_external_inr";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_neqas_delete_ecq_entry()
{
  try
  {
    var test_title = 'NEQAS - Delete ECQ Entry'
    login(7, "Shared");
      
    var batch_numbers = new Array();
    var row_data = new Array();
    var row_data_1 = new Array();
    var result_set = new Array();
    var result_set_1;
    
    tsa_neqas_delete_entries();
    tsa_neqas_setup_poct_batches(1);
    batch_numbers = get_poct_batch_numbers(); 
    
    var batch_reference = tsa_neqas_add_eqc_result(batch_numbers[0], "2.5", "~Select INR");
    row_data = get_eqc_table_row(batch_reference);
    tsa_neqas_delete_entries();
    
    var table_data = options_eqc_form_buttons().Table("LocationsEQCTable");
    if(table_data.Cell(1, 0).contentText != "There are no EQCs recorded")
    {
      row_data_1 = get_eqc_table_row(batch_reference);
      result_set_1 = checkArrays(row_data, row_data_1);
      result_set_1 = results_checker_are_false(result_set_1);
    }
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_system_audit(test_title, "Delete EQC Result");
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_NEQAS";
    var test_name = "tc_neqas_delete_ecq_entry";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_neqas_add_complete_ecq_entry()
{
  try
  {
    var test_title = 'NEQAS - Add a NEQAS from the EQC tab'
    login(7, "Shared");
      
    var batch_numbers = new Array();
    var row_data = new Array();
    var row_data_1 = new Array();
    var result_set = new Array();
    
    tsa_neqas_delete_entries();
    tsa_neqas_setup_poct_batches(1);
    batch_numbers = get_poct_batch_numbers(); 
    
    var batch_reference = tsa_neqas_add_eqc_result(batch_numbers[0], "2.5", "3.0");
    
    row_data = get_eqc_table_row(batch_reference);
    row_data_1.push(aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y"), batch_reference, 
                                                "NEQAS", batch_numbers[0], "2.5", "3.0", "16.67%");
    
    var result_set_1 = checkArrays(row_data, row_data_1);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_system_audit(test_title, "Added EQC Result");
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_NEQAS";
    var test_name = "tc_neqas_add_complete_ecq_entry";
    handle_failed_tests(suite_name, test_name);
  }
}