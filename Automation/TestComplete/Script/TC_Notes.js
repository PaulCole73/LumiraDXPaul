﻿//USEUNIT TSA_Notes
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_add_a_new_note()
{
  try
  {
    var test_title = "Notes - Add a new note";
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'add_note', 'M', 'Shared'); 
    add_a_new_note();
  
    var results = validate_top_patient_audit(test_title, "Add Note");
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