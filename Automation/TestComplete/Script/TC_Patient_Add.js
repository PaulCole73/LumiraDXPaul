//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Patient_Management
//USEUNIT TSA_Patient_Demographics
//USEUNIT Generic_Functions
//USEUNIT Navigation
//--------------------------------------------------------------------------------
function tc_add_a_new_patient()
{
 try
 {
  var test_title = 'Patient - Add a new patient';
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'add_a_new_patient', 'M', 'Shared'); 
  var results = validate_top_patient_audit(test_title,"Add Patient");
  
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
function tc_add_a_new_patient_duplicate_nhs()
{
try
 {
  var test_title = 'Patient - Add a duplicate patient based on NHS number'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'add_a_new_dup_patient', 'M', 'Shared'); 
  var nhs_num = get_patient_nhs();
  var first_name = get_patient_firstname();
  var surname = get_patient_surname();
  
  add_patient('Regression', 'add_a_new_patient_duplicate', 'M', 'Shared',nhs_num); 
  
  var actual_err_mess = patient_banner_error_message();
  Log.Message(actual_err_mess);
  var expected_err_mess = ('This patient may already exist at this location as ' + surname + ', ' + first_name + ' [' + nhs_num + ']');     

  var result_set = new Array();
  var result_set_1 = compare_values(actual_err_mess,expected_err_mess,test_title)
  result_set.push(result_set_1);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title); 
  
  
  Log_Off();
 }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  } 
} 
//--------------------------------------------------------------------------------