//USEUNIT Tested_Apps
//USEUNIT Misc_Functions
//USEUNIT TC_Engage
//--------------------------------------------------------------------------------
//Suite of tests for Engage

//Master Suites
//--------------------------------------------------------------------------------
function ts_master_engage(send_mail)
{
  reset_folder();
  
  tc_ensure_urgent_notification_is_displayed_when_patient_does_not_understand_their_schedule();
  tc_ensure_urgent_notification_is_displayed_when_patient_submits_an_INR_greater_than_1_below_target();
  tc_new_historical_treatment_is_not_most_recent_with_NTD_greater_than_existing_NTD();
  tc_new_historical_treatment_is_most_recent_with_NTD_less_than_than_existing_NTD();
  tc_accept_engage_eula_web();
  tc_reenrol_user_can_log_into_engage();
  tc_disenrol_user_with_current_treatment_plan();
  tc_move_ntb_back_from_ten_to_seven_days_schedules_unchanged();
  tc_move_ntb_back_from_seven_to_six_days_schedules_changed();
  tc_move_ntb_forward_from_five_to_seven_days_schedules_changed();
  tc_add_inr_update_inr_delete_inr_confirm_original_schedule();
  tc_overdue_inr_switch_to_valid_inr_delete_latest_saved_completed_schedule();
  tc_submit_multiple_inrs_same_day_long_dose_schedule();
  
  email_and_archive(send_mail, "ts_engage_master");
}