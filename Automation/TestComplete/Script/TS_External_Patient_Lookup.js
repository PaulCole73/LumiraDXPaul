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
//Suites to identify specific areas of testing - allow specific feature automation sets to be tested in isolation
//--------------------------------------------------------------------------------
function ts_external_patient_lookup_find_patient()
{
   tc_external_patient_lookup_for_maintenance_patient();
}
//--------------------------------------------------------------------------------
function ts_external_patient_lookup_treat_patient()
{
   tc_external_patient_lookup_delete_inr();
   tc_external_patient_lookup_new_inr();
   tc_external_patient_lookup_add_historic_inr();
   tc_external_patient_lookup_same_day_maintenance_treatment();
   tc_external_patient_lookup_add_historic_inr();
   tc_external_patient_lookup_delete_multiple_inr();
   tc_external_patient_lookup_add_adverse_event();
   tc_external_patient_lookup_add_note();
   tc_external_patient_lookup_archive_note();
   tc_external_patient_lookup_edit_treatment_plan();
   tc_external_patient_lookup_add_treatment_plan();
   tc_external_patient_lookup_add_treatment_to_old_plan();
   tc_external_patient_lookup_treat_overdue_patient();
   tc_external_patient_lookup_refer_patient_treatment();
}