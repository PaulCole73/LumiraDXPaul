//USEUNIT Tested_Apps
//USEUNIT TC_Patient_Add
//USEUNIT TC_Patient_Search
//USEUNIT TC_Patient_Recently_Viewed

//--------------------------------------------------------------------------------
//Suite of tests for patient staging regression
//--------------------------------------------------------------------------------
function ts_staging_regression_patient()
{
  reset_folder();
  
  tc_add_a_new_patient();
  tc_add_a_new_patient_duplicate_nhs();
  tc_find_a_patient();
  tc_find_patient_recently_viewed();
  
  email_and_archive("ts_patient_regression");
}
//--------------------------------------------------------------------------------