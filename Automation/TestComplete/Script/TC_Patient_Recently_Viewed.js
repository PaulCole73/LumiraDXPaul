//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT Generic_Functions
//USEUNIT Navigation
//--------------------------------------------------------------------------------
function tc_find_patient_recently_viewed()
{
try
 {
  var test_title = 'Patient Recently Viewed - Find patient recently viewed'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'add_a_new_patient', 'M', 'Shared'); 
  
  var first_name = get_patient_firstname();
  var surname = get_patient_surname();
  var patient_name = surname + ', ' + first_name;
  Log.Message(patient_name);
  
  var actual_list = patient_recently_viewed_list();
  Log.Message(patient_recently_viewed_list())
  
  data_contains_checker(actual_list,patient_name,test_title)

  Log_Off()
  }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  }
}
//--------------------------------------------------------------------------------