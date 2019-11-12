//USEUNIT Tested_Apps
//USEUNIT TC_Bridging
//--------------------------------------------------------------------------------
//Suite of tests for treatment staging regression
//--------------------------------------------------------------------------------
function ts_staging_regression_bridging()
{
  tc_bridging_check_tab_visibility_changing_treatmentplans()
  tc_bridging_check_bridging_button_state();
}