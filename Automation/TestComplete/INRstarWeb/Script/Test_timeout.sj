//USEUNIT Navigation
//USEUNIT Common
//USEUNIT V5_Common

//=====================================================================================
//
// Test for time out
//
//=====================================================================================

function start_admin()
{
  SCSL_Log_On();
  
  WaitSeconds(3540);
  
  Log.Message("About to do something");
  
  Goto_New_Client();
  
  WaitSeconds(120);
  
  Log.Message("About to do something else");
  
  Goto_Feedback();
  
  WaitSeconds(3660);
  
  Log.Message("Should be logged out");
  
  Goto_New_Client();
  
  
}
function start()
{
  Log_On(2);
  
  WaitSeconds(3540);
  
  Log.Message("About to do something");
  
  Goto_Add_Patient();
  
  WaitSeconds(120);
  
  Log.Message("About to do something else");
  
  Goto_Patient_Search()
  
  WaitSeconds(3660);
  
  Log.Message("Should be logged out");
  
  Goto_Add_Patient();
  
  
}