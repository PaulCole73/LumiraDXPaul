//USEUNIT Tested_Apps
//USEUNIT TC_Clinics_Appointments
//--------------------------------------------------------------------------------
//Suite of tests for Users staging regression
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
function ts_master_clinics_appointments()
{
  reset_folder();

  ts_clinics_appointments_create_clinics();
  ts_clinics_appointments_create_appointments();
  
  email_and_archive("ts_master_clinics");
}
//--------------------------------------------------------------------------------
function ts_staging_regression_clinics_appointments()
{
  reset_folder();
  
  tc_clinics_add_a_recurring_clinic();
  tc_clinics_make_appointment_today_for_overdue_patient();
  tc_clinics_move_seven_days_beyond_ntd();
  tc_clinics_cancel_future_appointment();
  tc_clinics_mark_unmark_dna();
  
  email_and_archive("ts_clinics_regression");
}
//--------------------------------------------------------------------------------

//General Suites
//--------------------------------------------------------------------------------
function ts_clinics_appointments_create_clinics()
{
  tc_clinics_add_a_recurring_clinic();
}
//--------------------------------------------------------------------------------
function ts_clinics_appointments_create_appointments()
{
  tc_clinics_make_appointment_today_for_overdue_patient();
  //tc_clinics_add_inr_for_patient_with_appointment_today();
  tc_clinics_move_seven_days_beyond_ntd();
  tc_clinics_cancel_future_appointment();
  tc_clinics_mark_unmark_dna();
}
//--------------------------------------------------------------------------------