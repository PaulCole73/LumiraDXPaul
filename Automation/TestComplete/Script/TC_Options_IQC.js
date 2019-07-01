//USEUNIT Generic_Functions
//USEUNIT TSA_Login
//USEUNIT TSA_Option_IQC

//--------------------------------------------------------------------------------
function tc_add_a_new_iqc_result()
{
try
 {
  var test_title = 'Options/IQC - Add a new IQC Result'
  login('cl3@regression','INRstar_5','Shared');
  var delete_existing_results =  delete_iqc_result_if_exists();
   
  var data_added_array = add_iqc_result();
  var data_saved_array = get_iqc_data();
  result_set = validateArrays(data_added_array, data_saved_array,'Options/IQC -  Add a new IQC Result');
  results_checker(result_set,test_title); 
  
  Log_Off();
 }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  } 
} 
//------------------------------------------
function tc_edit_iqc_result()
{
 try
 {
  var test_title = 'Options/IQC -  Edit a new IQC Result'
  login('cl3@regression','INRstar_5','Shared');
  var delete_existing_results =  delete_iqc_result_if_exists();
  add_iqc_result();
  
  var edited_data = edit_iqc_result();
  var data_after_edit = get_iqc_data();
  result_set = validateArrays(edited_data, data_after_edit,'Options/IQC -  Edit a new IQC Result');
  results_checker(result_set,test_title); 
  
  Log_Off();
  }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  } 
} 
//------------------------------------------
function tc_delete_iqc_result()
{
 try
 {
  var test_title = 'Options/IQC - Delete the new IQC result'
  login('clead@regression','INRstar_5','Shared');
  var delete_existing_results =  delete_iqc_result_if_exists();
 
  var data_added_array = add_iqc_result();
  delete_iqc_result();
  
  validate_top_system_audit(test_title,"IQC Deleted");
  Log_Off();
 }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  } 
} 
//------------------------------------------

