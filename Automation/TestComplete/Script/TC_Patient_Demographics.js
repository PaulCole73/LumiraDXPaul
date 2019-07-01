//USEUNIT TSA_Patient
//USEUNIT TSA_Patient_Management
//USEUNIT TSA_Patient_Demographics
//USEUNIT TSA_Patient
//USEUNIT Generic_Functions
//USEUNIT Navigation
//USEUNIT TSA_Login
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Reviews
//--------------------------------------------------------------------------------
function tc_edit_each_field_of_patient_demographics()
{
 try
 {
  var test_title = 'Patient Demographics - Edit each field of patient demographics'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Edit_patient', 'M', 'Shared'); 

  var demographics_before_edit = get_patient_demographics();
  Log.Message(demographics_before_edit + ' This is before');
  
  edit_all_patient_demographics('F');
  
  var demographics_after_edit = get_patient_demographics();
  Log.Message(demographics_after_edit + ' This is after');
  
  result_set_1 = validate_arrays_dont_match(demographics_before_edit,demographics_after_edit,test_title);
  
  //Pass in the result
  results_checker(result_set_1,test_title); 
  
  Log_Off();
 }
    catch (e)
    {
     Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
     Log_Off(); 
    } 
}
//--------------------------------------------------------------------------------
function tc_ensure_patients_age_cannot_be_edited_so_that_they_are_under_18_for_a_DOAC()
{
try
 {
  var test_title = 'Patient Demographics - Ensure patients age cannot be edited so that they are under 18 for a DOAC'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Edit_patient_age', 'M', 'Shared'); 
  add_treatment_plan('Apixaban','', aqConvert.StrToDate(aqDateTime.Today()),'Shared','','Indefinite');                 
  cancel_review();
  edit_patient_dob_to_be_under_18('216');

  var error_checker = edit_demographics_error_checker('This patient\'s current anticoagulant is not licensed for patients under the age of 18 years.');
  results_checker(error_checker,test_title);
  Log_Off();
 }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  } 
} 
//--------------------------------------------------------------------------------