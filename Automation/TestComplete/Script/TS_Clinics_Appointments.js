//USEUNIT Tested_Apps
//USEUNIT TC_Clinics_Appointments
//--------------------------------------------------------------------------------
//Suite of tests for Users staging regression
//--------------------------------------------------------------------------------
function ts_staging_regression_clinics_appointments()
{
  tc_clinics_add_a_recurring_clinic();
  tc_clinics_make_appointment_today_for_overdue_patient();
  tc_clinics_add_inr_for_patient_with_appointment_today();
  tc_clinics_move_ntd();
}