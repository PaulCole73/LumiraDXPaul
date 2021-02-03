﻿//USEUNIT Tested_Apps
//USEUNIT TC_Patient_Add
//USEUNIT TC_Patient_Search
//USEUNIT TC_Patient_Recently_Viewed
//--------------------------------------------------------------------------------
//Suite of tests for patient integration regression
//--------------------------------------------------------------------------------

//Master Suites
//==============================================================================//
//master suites are used for organised test groups
function ts_master_patient(send_mail)
{
  reset_folder();
  
  tc_add_a_new_patient();
  tc_add_a_new_patient_duplicate_nhs(); //Can add fiscale for Italy but leaving to the end a lot of work here
  tc_find_a_patient();
  tc_find_patient_recently_viewed();
  
  email_and_archive(send_mail, "ts_patient_master");
}
//==============================================================================//
//regression suites are used for specific regression runs
function ts_int_regression_patient(send_mail)
{
  reset_folder();
  
  tc_add_a_new_patient();
  tc_add_a_new_patient_duplicate_nhs();
  tc_find_a_patient();
  tc_find_patient_recently_viewed();
  
  email_and_archive(send_mail, "ts_patient_regression");
}
//==============================================================================//
//regression suites are used for specific regression runs
function ts_int_regression_patient_italy(send_mail)
{
  reset_folder();
  
  tc_add_a_new_patient(); 
  tc_find_a_patient();
  tc_find_patient_recently_viewed();
  
  email_and_archive(send_mail, "ts_patient_regression_ita");
}
//==============================================================================//



//==============================================================================//
//General Suites
//==============================================================================//