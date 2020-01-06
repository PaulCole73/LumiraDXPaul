//USEUNIT Tested_Apps
//USEUNIT TC_Bridging
//--------------------------------------------------------------------------------
//Suite of tests for Bridging
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
function ts_master_bridging(send_mail)
{
  reset_folder();

  ts_bridging_permissions();
  ts_bridging_button();
  ts_bridging_tab();
  
  email_and_archive(send_mail, "ts_bridging_master");
}
//--------------------------------------------------------------------------------
function ts_regression_bridging()
{
  reset_folder();

  ts_bridging_permissions();
  ts_bridging_button();
  ts_bridging_tab();
  
  email_and_archive(true, "ts_bridging_regression");
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
//--------------------------------------------------------------------------------
function ts_bridging_checkboxes()
{
  tc_bridging_INR_checkbox();
}
//--------------------------------------------------------------------------------
function ts_bridging_cacuk_1030()
{
  tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_1_day();
  tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_1_day();
  tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_1_day();
  tc_bridging_lmwh_switch_from_tinzaparin_to_tinzaparin_max_schedule();
  tc_bridging_lmwh_switch_from_enoxaparin_to_enoxaparin_max_schedule();
  tc_bridging_lmwh_switch_from_dalteparin_to_dalteparin_max_schedule();
  tc_bridging_lmwh_switch_from_tinzaparin_to_enoxaparin_max_schedule();
  tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_max_schedule();
  tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_max_schedule();
  tc_bridging_lmwh_switch_from_enoxaparin_to_dalteparin_max_schedule();
  tc_bridging_lmwh_switch_from_dalteparin_to_tinzaparin_max_schedule();
  tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_max_schedule();
  tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_to_enoxaparin_to_tinzaparin_default_schedule();
  tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_to_dalteparin_to_enoxaparin_default_schedule();
  tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_to_tinzaparin_to_dalteparin_default_schedule();
  
  email_and_archive(true, "ts_bridging_cacuk_1030");
}
//--------------------------------------------------------------------------------
function ts_bridging_cacuk_1032()
{
  tc_bridging_amend_date_to_future_procedure_is_today_0_day_schedule();
  tc_bridging_amend_date_to_past_procedure_is_today_0_day_schedule();
  tc_bridging_amend_date_to_future_procedure_is_today();
  tc_bridging_amend_date_to_past_procedure_is_today();
  tc_bridging_amend_date_to_today_procedure_in_the_future();
  tc_bridging_amend_date_to_today_procedure_in_the_past();
  tc_bridging_amend_date_to_same_day_procedure_today();
  tc_bridging_amend_date_to_same_day_procedure_yesterday();
  tc_bridging_amend_date_to_same_day_procedure_tomorrow();
  tc_bridging_procedure_date_today_amend_to_past_max_schedule();
  tc_bridging_procedure_date_today_amend_to_future_max_schedule();
  tc_bridging_procedure_date_in_future_amended_to_past_and_then_today_and_then_back_to_original_date();
  tc_bridging_amend_date_to_today_procedure_in_the_future_and_amend_LMWH();
  tc_bridging_procedure_date_today_amend_to_past_and_then_future_then_back_to_original_date();
  
  email_and_archive(true, "ts_bridging_cacuk_1032");
}