﻿//USEUNIT Tested_Apps
//USEUNIT TC_External_Results_HL7
//--------------------------------------------------------------------------------
//Suite of tests for External Results and HL7 messages

//Master Suites
//--------------------------------------------------------------------------------
function ts_master_external_results_hl7(send_mail)
{
  reset_folder();
  
  tc_external_results_hl7_message_todays_date_patient_match();
  tc_external_results_hl7_message_4_days_passed_with_dosing();
  tc_external_results_hl7_message_today_does_not_match_patient();
  
  email_and_archive(send_mail, "ts_external_results_master");
}