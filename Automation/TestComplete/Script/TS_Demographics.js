//USEUNIT Tested_Apps
//USEUNIT TC_Patient_Demographics

//--------------------------------------------------------------------------------
//Picking what suites you want to run within the main suite
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//Test cases within each suite for Demographics
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
function ts_master_demographics()
{
  reset_folder();

  ts_demographics_edit()
  
  email_and_archive("ts_master_demographics");
}
//--------------------------------------------------------------------------------
function ts_staging_regression_demographics(send_mail)
{
  reset_folder();  

  tc_edit_each_field_of_patient_demographics();  
  tc_ensure_patients_age_cannot_be_edited_so_that_they_are_under_18_for_a_DOAC();
  
  email_and_archive(send_mail, "ts_demographics_regression");
}
//--------------------------------------------------------------------------------

//General Suites
//--------------------------------------------------------------------------------
function ts_demographics_edit()
{
  tc_edit_each_field_of_patient_demographics();  
  tc_ensure_patients_age_cannot_be_edited_so_that_they_are_under_18_for_a_DOAC(); 
}