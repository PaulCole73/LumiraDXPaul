//USEUNIT Tested_Apps
//USEUNIT TC_Skip_Or_Boost

//To be removed once fully refactored for schedule ordering stuff
//USEUNIT SORB_Schedule_Ordering
//USEUNIT SORB_Schedule_Testing
//USEUNIT Add_INR_Backdated
//USEUNIT Common
//USEUNIT SORB_Functions
//USEUNIT loggin
//USEUNIT Navigate_Patient
//USEUNIT Navigation
//USEUNIT Quick_Patient
//USEUNIT Test_Audit
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Presets
//USEUNIT V5_SQL
//--------------------------------------------------------------------------------
//Picking what suites you want to run within the main suite
//--------------------------------------------------------------------------------
function ts_skip_or_boost()
{
// open_application("INRstarWindows");

  ts_skip_or_boost_sorb_button_user_permissions();
  ts_skip_or_boost_sorb_button_dosing_method_validation();
  ts_skip_or_boost_sorb_button_review_period_validation();
  ts_skip_or_boost_sorb_button_self_test_validation();
  ts_skip_or_boost_sorb_button_omit_validation();
//  ts_sorb_schedule(); // Needs to be refactored removed the 3 days form the view only displayed after ok button now
  ts_treatment_button_disabling();

// close application needed here ?
} 
//--------------------------------------------------------------------------------
//Test cases within each suite for skip or boost
//--------------------------------------------------------------------------------
function ts_skip_or_boost_sorb_button_user_permissions()
{
  tc_Ensure_SorB_button_is_displayed_but_disabled_for_any_user_lower_than_CL3_on_suggested_and_current_tab();
  tc_Ensure_SorB_button_is_enabled_for_any_user_higher_than_CL2_on_suggested_and_current_tab(); 
} 
//--------------------------------------------------------------------------------
function ts_skip_or_boost_sorb_button_dosing_method_validation()
{
// No current schedule scenario
 tc_Sorb_button_disabled_on_current_tab_when_no_previous_treatment_exists_on_all_dosing_algorithms(); 
  
 //Single TP Scenarios
 tc_Patient_on_Induction_Fast_Fennerty_Gedge_dosing_gets_an_error_when_trying_to_use_the_SorB_button_suggested_tab(); 
 tc_Patient_on_Induction_Slow_Oates_dosing_gets_an_error_when_trying_to_use_the_SorB_button_suggested_tab(); 
 tc_Patient_on_Induction_Slow_Tait_dosing_gets_an_error_when_trying_to_use_the_SorB_button_suggested_tab();
 tc_Patient_on_Manual_dosing_gets_an_error_when_trying_to_use_the_SorB_button_suggested_tab(); 

 // Previous Treatment Scenarios
 tc_Patient_on_Coventry_dosing_gets_an_error_when_trying_to_use_the_SorB_button_in_current_schedule_where_prev_treatment_is_manual(); 
 tc_Patient_on_Hillingdon_dosing_gets_an_error_when_trying_to_use_the_SorB_button_in_current_schedule_where_prev_treatment_is_manual();
 tc_Patient_on_Manual_dosing_gets_an_error_when_trying_to_use_the_SorB_button_in_current_schedule_where_prev_treatment_is_coventry(); 
 tc_Patient_on_Manual_dosing_gets_an_error_when_trying_to_use_the_SorB_button_in_current_schedule_where_prev_treatment_is_hillingdon(); 

 //Multiple TP Scenarios
// tc_SORB_Button_Validation_with_multiple_treatment_plans_Current_TP_is_Maintenance_current_schedule_on_old_plan_is_Manual_on_current_tab();
// tc_SORB_Button_Validation_with_multiple_treatment_plans_Current_TP_is_Slow_Oates_current_schedule_on_old_plan_is_Maintenance_on_current_tab();
// tc_SORB_Button_Validation_with_multiple_treatment_plans_Current_TP_is_Slow_Oates_current_schedule_on_old_plan_is_Manual_on_current_tab();
// tc_SORB_Button_Validation_with_multiple_treatment_plans_Current_TP_is_Manual_current_schedule_on_old_plan_is_Maintentance();
} 
//--------------------------------------------------------------------------------
function ts_skip_or_boost_sorb_button_review_period_validation()
{
 //Suggested tab tests
 tc_Coventry_maintenance_testing_review_period_boundaries_suggested_tab();
 tc_Hillingdon_maintenance_testing_review_period_boundaries_suggested_tab();
 
 //Current tab tests
 tc_Cant_skip_or_boost_current_schedule_if_suggested_review_period_is_invalid_and_current_review_period_is_valid();
 tc_Cant_skip_or_boost_current_schedule_if_suggested_review_period_is_valid_and_current_review_is_invalid();
 tc_Cant_skip_or_boost_current_schedule_if_suggested_review_period_is_invalid_and_current_review_period_is_invalid();
} 
//--------------------------------------------------------------------------------
function ts_skip_or_boost_sorb_button_self_test_validation()
{
 tc_Patient_on_Warfarin_self_testing_cannot_action_skip_or_boost_function_with_self_tester_unticked_suggested_and_current_tab();
 tc_Patient_on_Warfarin_self_testing_untick_on_treatment_suggested_and_current_tab();
 tc_Patient_removed_from_Warfarin_self_testing_can_action_skip_or_boost_function_suggested_and_current_tab();
 tc_Patient_on_DDD_program_gets_error_message_suggested_and_current_tab();
 tc_Patient_removed_from_DDD_self_care_program_can_action_skip_or_boost_function();
 tc_Patient_marked_as_a_manual_INR_self_tester_can_action_skip_or_boost_function_in_suggested_and_current_schedule();
} 
//--------------------------------------------------------------------------------
function ts_skip_or_boost_sorb_button_omit_validation()
{
 tc_suggested_and_current_tab_with_an_omit_day_in_suggested_schedule_gets_an_error(); 
 tc_suggested_and_current_tab_check_do_not_take_days_do_not_block_sorb();
 
 
 
 
 
 
 

} 
//--------------------------------------------------------------------------------
function tc_treatment_buttons()
{
 tc_Treatment_Buttons_Ensure_relevant_treatment_buttons_are_disabled_after_clicking_ok_on_SORB_screen_suggested_and_current_tab();
} 
//--------------------------------------------------------------------------------
function ts_sorb_schedule()
{
 tc_Schedule_ordering_suggested_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_for_today_for_7_8_9_10_day_review_periods();
 tc_Schedule_ordering_suggested_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_1_days_for_7_8_9_10_day_review_periods();
 tc_Schedule_ordering_suggested_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_2_days_for_7_8_9_10_day_review_periods();
 tc_Schedule_ordering_suggested_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_3_days_for_7_8_9_10_day_review_periods();
 
 tc_Schedule_ordering_current_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_for_today_for_7_8_9_10_day_review_periods();
 tc_Schedule_ordering_current_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_1_days_for_7_8_9_10_day_review_periods();
 tc_Schedule_ordering_current_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_2_days_for_7_8_9_10_day_review_periods();
} 
//--------------------------------------------------------------------------------
function ts_treatment_button_disabling()
{
 tc_Treatment_Buttons_Ensure_relevant_treatment_buttons_are_disabled_after_clicking_ok_on_SORB_screen_using_a_suggested_schedule_on_suggested_and_current_tab();
 tc_Treatment_Buttons_Ensure_relevant_treatment_buttons_are_disabled_after_clicking_ok_on_SORB_screen_using_a_current_schedule_on_suggested_and_current_tab()
} 

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
