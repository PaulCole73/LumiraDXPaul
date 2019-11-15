//USEUNIT Tested_Apps
//USEUNIT TC_Bridging
//--------------------------------------------------------------------------------
//Suite of tests for Bridging
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
function ts_bridging_master()
{
  reset_folder();

  ts_bridging_permissions();
  ts_bridging_button();
  ts_bridging_tab();
  
  email_and_archive("ts_bridging_master");
}
//--------------------------------------------------------------------------------

//General Suites
//--------------------------------------------------------------------------------
function ts_bridging_permissions()
{
  tc_bridging_button_new_bridging_record_permissions();
  tc_bridging_button_state_on_ddd_all_permissions();
  tc_bridging_banner_msg_on_ddd_all_permissions()
  tc_bridging_button_state_on_warfarin_self_test_all_permissions();
  tc_bridging_banner_msg_on_warfarin_self_test_all_permissions()
}
//--------------------------------------------------------------------------------
function ts_bridging_button()
{
  tc_bridging_button_state_with_historic_warfarin_treatment();
  tc_bridging_button_state_on_ddd_stage_one();
  tc_bridging_button_state_on_warfarin_self_test_stage_one();
  tc_bridging_button_state_on_warfarin_self_test_stage_two();
  tc_bridging_button_state_on_warfarin_self_test_stage_three();
}
//--------------------------------------------------------------------------------
function ts_bridging_tab()
{
  tc_bridging_tab_visible_only_with_warfarin();
}