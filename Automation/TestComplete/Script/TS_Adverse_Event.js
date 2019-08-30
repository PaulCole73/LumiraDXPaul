//USEUNIT Tested_Apps
//USEUNIT TC_Adverse_Event
//USEUNIT TC_Skip_Or_Boost

//--------------------------------------------------------------------------------
//Suite of tests for adverse events

function ts_staging_regression_adverse_event()
{
  tc_add_a_new_adverse_event();
  tc_delete_adverse_event();
} 
//test to check
//--------------------------------------------------------------------------------