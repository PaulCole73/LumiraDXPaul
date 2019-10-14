//USEUNIT Tested_Apps
//USEUNIT TC_Treatment
//--------------------------------------------------------------------------------
//Suite of tests for treatment staging regression
//--------------------------------------------------------------------------------
function ts_staging_regression_treatment()
{
//tc_treatment_add_a_historic_treatment();
//tc_treatment_add_a_manual_INR();
//tc_treatment_manual_dosing_permissions();
//tc_treatment_induction_dosing_permissions();
//tc_treatment_add_a_treatment_comment();
//tc_treatment_add_a_new_maintenance_in_range_inr();
//tc_treatment_add_a_historical_treatment_to_an_induction_patient(); //This kept giving warning then worked when run on its own looks like timing again
//tc_treatment_no_treatment_can_be_added_to_a_patient_on_no_protocol();
//tc_treatment_user_cannot_override_an_induction_result();
//tc_treatment_adding_a_result_earlier_than_last_recorded_result(); //Come back to failing looks like timing again
//tc_treatment_user_is_unable_to_add_two_treatments_for_the_same_day_when_on_maintenance();
//tc_treatment_add_a_new_maintenance_low_inr();
//tc_treatment_add_a_new_maintenance_high_inr();
//tc_treatment_out_of_range_maintenance_permissions();
//tc_treatment_delete_the_last_treatment();
//tc_treatment_refer_a_treatment();
//tc_treatment_authorise_a_referral();

tc_treatment_create_maintenance_use_alternate_schedules();
tc_treatment_maintenance_starting_algorithm_for_unstable_patient();
tc_treatment_maintenance_overriding_dose_greater_than_twenty_percent(); 
tc_treatment_maintenance_overriding_dose_and_review_period();
tc_treatment_maintenance_save_override_treatment();
tc_treatment_drag_and_drop_schedule_days();
tc_treatment_maintenance_INR_more_then_max_review_period();
tc_treatment_manual_mutliple_historic_summary_check();
tc_treatment_maintenance_override_privilege(); //unfinished
tc_treatment_maintenance_cancel_pending();
tc_treatment_maintenance_add_pending_treatment_with_pending_transfer()
}
//-------------------------------------------------------------------------------- 