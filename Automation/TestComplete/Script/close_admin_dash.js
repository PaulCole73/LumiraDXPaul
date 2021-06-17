//USEUNIT TSA_AD_Login
//USEUNIT Admin_Dash_System_Paths
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function close_admin_dash()
{
  Sys.Browser("*").Terminate();
  WaitSeconds(10, "Waiting for application to close...");
}