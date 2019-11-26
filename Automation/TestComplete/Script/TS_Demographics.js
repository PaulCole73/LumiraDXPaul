//USEUNIT Tested_Apps
//USEUNIT TC_Patient_Demographics
//--------------------------------------------------------------------------------
//Test cases within each suite for Demographics
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
//master suites are used for organised test groups
function ts_master_demographics(send_mail)  
{
  reset_folder();

  tc_edit_each_field_of_patient_demographics();  
  tc_ensure_patients_age_cannot_be_edited_so_that_they_are_under_18_for_a_DOAC();
  
  email_and_archive(send_mail, "ts_demographics_master");
}
//--------------------------------------------------------------------------------
//regression suites are used for specific regression runs
function ts_staging_regression_demographics() 
{
  reset_folder();  

  tc_edit_each_field_of_patient_demographics();  
  tc_ensure_patients_age_cannot_be_edited_so_that_they_are_under_18_for_a_DOAC();
  
  email_and_archive(true, "ts_demographics_regression");
}
//--------------------------------------------------------------------------------



//==============================================================================//
//General Suites
//--------------------------------------------------------------------------------
function ts_demographics_edit()
{
  tc_edit_each_field_of_patient_demographics();  
  tc_ensure_patients_age_cannot_be_edited_so_that_they_are_under_18_for_a_DOAC(); 
}