//--------------------------------------------------------------------------------
//Suite of tests for all clinical control test
//--------------------------------------------------------------------------------

//Master Suites
//==============================================================================//
//Contains all clinical control tests
function ts_clinical_control_master()
{
  cc_ET5_C1_Access_to_external_results_functionality_is_restricted_to_Clinical_Level_users_and_above();
}

function cs_ldx2_barcode_scanning() //clinical control parent / risk name
{
  //note this control does not match with the parent this is currently just an example, update when possible
  cc_ET5_C1_Access_to_external_results_functionality_is_restricted_to_Clinical_Level_users_and_above(); //specific clinical control identified for parent risk
}