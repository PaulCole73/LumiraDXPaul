﻿//USEUNIT Tested_Apps
//USEUNIT TC_Notes

//--------------------------------------------------------------------------------
//Picking what suites you want to run within the main suite
//--------------------------------------------------------------------------------
//function ts_notes()
{
// open_application("INRstarWindows");
// ts_staging_regression_notes();
// Close Application needed here ?
} 
//--------------------------------------------------------------------------------
//Test cases within each suite for Notes
//--------------------------------------------------------------------------------
function ts_staging_regression_notes(send_mail)
{
  reset_folder();  

  tc_add_a_new_note();
  
  email_and_archive(send_mail, "ts_note_regression");
} 
//--------------------------------------------------------------------------------