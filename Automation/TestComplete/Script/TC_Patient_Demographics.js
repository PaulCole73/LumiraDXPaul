//USEUNIT TSA_Patient
//USEUNIT TSA_Patient_Management
//USEUNIT TSA_Patient_Demographics
//USEUNIT TSA_Patient
//USEUNIT TSA_Login
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Reviews
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_edit_each_field_of_patient_demographics()
{
  try
  {
    var test_title = 'Patient Demographics - Edit each field of patient demographics'
    login(5, "Shared");
    add_patient('Regression', 'Edit_patient', 'M'); 

    var demographics_before_edit = get_patient_demographics();
  
    edit_all_patient_demographics('F');
  
    var demographics_after_edit = get_patient_demographics();
  
    var results = validate_arrays_dont_match(demographics_before_edit, demographics_after_edit, test_title);
  
    //Pass in the result
    results_checker(results, test_title); 
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Demographics";
    var test_name = "tc_edit_each_field_of_patient_demographics";
    handle_failed_tests(suite_name, test_name);
  } 
}
//--------------------------------------------------------------------------------
function tc_ensure_patients_age_cannot_be_edited_so_that_they_are_under_18_for_a_DOAC()
{
  try
  {
    var test_title = 'Patient Demographics - Ensure patients age cannot be edited so that they are under 18 for a DOAC'
    login(5, "Shared");
    add_patient('Regression', 'Edit_patient_age', 'M'
    ); 
    add_treatment_plan('Apixaban','', aqConvert.StrToDate(aqDateTime.Today()),'Shared','','Indefinite');                 
    cancel_review();
    edit_patient_dob_to_be_under_18('216');
    
    var err_box = INRstar_base().NativeWebObject.Find("idStr", "EditDetails");
    var results;
    if(err_box.Exists == true)
    {
      results = compare_values("This patient's current anticoagulant is not licensed for patients under the age of 18 years.", err_box.contentText);
    }
    else
    {
      results = false;
    }
    
    results_checker(results, test_title);
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Demographics";
    var test_name = "tc_ensure_patients_age_cannot_be_edited_so_that_they_are_under_18_for_a_DOAC";
    handle_failed_tests(suite_name, test_name);
  } 
} 
//--------------------------------------------------------------------------------