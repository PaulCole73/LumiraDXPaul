//USEUNIT Tested_Apps
//USEUNIT TC_Adverse_Event

//--------------------------------------------------------------------------------
//Suite of tests for adverse events

function ts_staging_regression_adverse_event(send_mail)
{
  reset_folder();

  tc_add_a_new_adverse_event();
  tc_delete_adverse_event();
  
  email_and_archive(send_mail, "ts_adverse_event_regression");
} 
//--------------------------------------------------------------------------------