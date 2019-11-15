//USEUNIT Tested_Apps
//USEUNIT TC_External_Patient_Lookup
//--------------------------------------------------------------------------------
//Suite of tests for External Patient Lookup
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
function ts_external_patient_lookup_master()
{
  reset_folder();
  
  email_and_archive("ts_bridging_master");
}
//--------------------------------------------------------------------------------
function ts_staging_regression_external_patient_lookup()
{
  reset_folder();
  
  ts_external_patient_lookup_find_patient();
  ts_external_patient_lookup_treat_patient()
  
  email_and_archive("ts_bridging_master");
}
//--------------------------------------------------------------------------------


//General Suites
//--------------------------------------------------------------------------------
function ts_external_patient_lookup_find_patient()
{
   tc_external_lookup_external_patient_lookup_for_maintenance_patient();
}
//--------------------------------------------------------------------------------
function ts_external_patient_lookup_treat_patient()
{
   
}