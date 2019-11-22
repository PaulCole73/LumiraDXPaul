//USEUNIT Tested_Apps
//USEUNIT TC_Patient_Management
//--------------------------------------------------------------------------------
//Suite of tests for Patient Management
//--------------------------------------------------------------------------------
//Suite of tests for Patient Management

function ts_staging_regression_patient_management(send_mail)
{
  reset_folder();
  
  tc_patient_deactivate_a_patient();
  tc_patient_reactivate_a_patient();
  tc_patient_amend_a_patient_to_be_a_manual_self_tester();
  tc_patient_suspend_a_patient();
  tc_patient_unsuspend_a_patient();
  tc_patient_change_the_patients_registered_practice();
  tc_transfer_a_patient_who_has_a_pending_treatment(); //PROBLEM LOOK AT AGAIN
  tc_transfer_a_patient_where_the_patient_will_be_a_duplicate_of_an_existing_inactive_patient_at_the_destination_location();
  tc_transfer_a_patient_who_is_on_an_induction_protocol();
  tc_reactivate_a_potential_duplicate_patient();
  tc_suspending_an_overdue_patient_removes_them_from_the_overdue_report();
  tc_suspend_a_patient_user_unable_to_select_a_date_more_than_6_months_in_the_future();
  
  email_and_archive(send_mail, "ts_pat_manage_regression");
}
//--------------------------------------------------------------------------------