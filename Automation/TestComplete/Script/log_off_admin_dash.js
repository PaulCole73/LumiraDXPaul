//USEUNIT Admin_Dash_System_Paths
//USEUNIT System_Paths
//--------------------------------------------------------------------------------

function log_off_admin_dash()
{
  admin_dash_logoff_button().Click();
  WaitSeconds(2, "Waiting to log off...");
}