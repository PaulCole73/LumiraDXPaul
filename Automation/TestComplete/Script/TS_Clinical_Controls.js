//USEUNIT TC_Clinical_Controls

//--------------------------------------------------------------------------------
//Suite of tests for all clinical control test
//--------------------------------------------------------------------------------
//Master Suites
//==============================================================================//
//Contains all clinical control tests
function ts_clinical_control_master()
{
  cc_ET5_C1_access_to_external_results_functionality_is_restricted_to_clinical_level_users_and_above();
}
//==============================================================================//
function cs_ET5_external_treatment_management_functionality() //clinical control parent / risk name
{
  cc_ET5_C1_access_to_external_results_functionality_is_restricted_to_clinical_level_users_and_above(); //specific clinical control identified for parent risk
  cc_ET5_C2_duplicated_messages_identified_and_highlighted_in_the_work_list();
  cc_ET5_C18_external_results_can_be_archived();
  cc_ET5_C21_external_results_can_be_archived();
}
