//USEUNIT Tested_Apps
//USEUNIT TC_Bridging
//--------------------------------------------------------------------------------
//Suite of tests for treatment staging regression
//--------------------------------------------------------------------------------
function ts_bridging_master()
{
  ts_bridging_permissions();
  ts_bridging_button();
}

function ts_bridging_permissions()
{
  tc_bridging_button_new_bridging_record_permissions();
  tc_bridging_button_state_on_ddd_all_permissions();
  tc_bridging_button_state_on_warfarin_self_test_all_permissions();
}

function ts_bridging_button()
{
  tc_bridging_tab_visible_only_with_warfarin();
  tc_bridging_button_state_with_historic_warfarin_treatment();
  tc_bridging_button_state_on_ddd_stage_one();
  tc_bridging_button_state_on_warfarin_self_test_stage_one();
  tc_bridging_button_state_on_warfarin_self_test_stage_two();
  tc_bridging_button_state_on_warfarin_self_test_stage_three();
}