//USEUNIT TSA_Notes
//USEUNIT Generic_Functions
//USEUNIT TSA_Login
//USEUNIT TSA_Patient

//--------------------------------------------------------------------------------
function tc_add_a_new_note()
{
try
 {
  var test_title = 'Notes - Add a new note","Add Note'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'add_note', 'M', 'Shared'); 
  add_a_new_note();
  
  var result_set = validate_top_patient_audit("Notes - Add a new note","Add Note");
  results_checker(result_set, test_title);
  
  Log_Off();
 }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  } 
} 
//--------------------------------------------------------------------------------