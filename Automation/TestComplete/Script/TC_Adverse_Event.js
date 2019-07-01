//USEUNIT TSA_Adverse_Event
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Treatment_Plan
//--------------------------------------------------------------------------------
function tc_add_a_new_adverse_event()
{
 try
 {
  var test_title = 'Adverse Event - Add a new adverse event'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'add_adverse_event', 'M', 'Shared'); 
  add_adverse_event();
  
  //Create the array of results for the final check to ensure steps pass the test
  var result_set = new Array()
  
  var banner_confirm = check_banner_confirmation_adverse_event();
  result_set.push(banner_confirm);
  
  var adverse_event_audit = validate_top_patient_audit(test_title,"Add Adverse Event");
  result_set.push(adverse_event_audit);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results, test_title)
  
  Log_Off();
 }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  } 
} 
//--------------------------------------------------------------------------------
function tc_delete_adverse_event()
{
 try
 {
  var test_title = 'Adverse Event - Delete adverse event'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'delete_adverse_event', 'M', 'Shared'); 
  add_adverse_event();
  delete_adverse_event();
  
  var result_set = validate_top_patient_audit(test_title,"Delete Adverse Event");
  results_checker(result_set, test_title)
  
  Log_Off();  
  }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  } 
} 
//--------------------------------------------------------------------------------