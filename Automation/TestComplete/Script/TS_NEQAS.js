//USEUNIT Tested_Apps
//USEUNIT TC_NEQAS
//--------------------------------------------------------------------------------
//Suite of tests for NEQAS staging regression
//--------------------------------------------------------------------------------
function ts_staging_regression_neqas()
{
  reset_folder();
  
  tc_neqas_add_new_from_eqc();
  tc_neqas_add_new_from_eqc_with_multiple_active_batches();
  tc_neqas_edit_existing_add_external_inr();
  tc_neqas_delete_ecq_entry();
  tc_neqas_add_complete_ecq_entry();
  
  email_and_archive("ts_neqas_regression");
}