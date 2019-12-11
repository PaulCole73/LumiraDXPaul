﻿//USEUNIT Tested_Apps
//USEUNIT TC_Clinics_Appointments
//--------------------------------------------------------------------------------
//Suite of tests for Clinics staging regression
//--------------------------------------------------------------------------------

//Master Suites
//--------------------------------------------------------------------------------
function ts_master_clinics_appointments(send_mail)
{
  reset_folder();

  tc_clinics_add_a_recurring_clinic();
  tc_clinics_make_appointment_today_for_overdue_patient();
  tc_clinics_move_seven_days_beyond_ntd();
  tc_clinics_cancel_future_appointment();
  tc_clinics_mark_unmark_dna();
  
  email_and_archive(send_mail, "ts_clinics_master");
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
  
  email_and_archive(true, "ts_clinics_regression");
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