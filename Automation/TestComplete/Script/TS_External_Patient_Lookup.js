//USEUNIT Tested_Apps
//USEUNIT TC_External_Patient_Lookup
//--------------------------------------------------------------------------------
//Suite of tests for External Patient Lookup
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
//master suites are used for organised test groups
function ts_master_external_patient_lookup(send_mail)
{
  reset_folder();
  
  tc_external_patient_lookup_for_maintenance_patient();
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
  
  email_and_archive(send_mail, "ts_ext_lookup_master");
}
//--------------------------------------------------------------------------------
//regression suites are used for specific regression runs
function ts_staging_regression_external_patient_lookup()
{
  reset_folder();
  
  tc_external_patient_lookup_for_maintenance_patient();
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
  
  email_and_archive(true, "ts_ext_lookup_regression");
}
//--------------------------------------------------------------------------------



//==============================================================================//
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