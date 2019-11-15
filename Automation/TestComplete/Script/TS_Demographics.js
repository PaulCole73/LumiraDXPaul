﻿//USEUNIT Tested_Apps
//USEUNIT TC_Patient_Demographics


//--------------------------------------------------------------------------------
//Picking what suites you want to run within the main suite
//--------------------------------------------------------------------------------
//function ts_notes()
{
// open_application("INRstarWindows");
// ts_staging_regression_demographics();
// Close Application needed here ?
} 
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
function ts_staging_regression_demographics()
{
  tc_edit_each_field_of_patient_demographics();  
  tc_ensure_patients_age_cannot_be_edited_so_that_they_are_under_18_for_a_DOAC(); 
}
//--------------------------------------------------------------------------------

//General Suites
//--------------------------------------------------------------------------------
function ts_demographics_edit()
{
  tc_edit_each_field_of_patient_demographics();  
  tc_ensure_patients_age_cannot_be_edited_so_that_they_are_under_18_for_a_DOAC(); 
}