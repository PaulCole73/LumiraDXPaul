//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//USEUNIT engage_System_Paths
//USEUNIT System_Paths
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function login_engage()
{
  engage_username_login().innerText = get_login_details(23);
  admin_dash_password_login().innerText = get_login_details(20);
  admin_dash_login_button().Click();
  WaitSeconds(5, "Waiting to login...");
}
//--------------------------------------------------------------------------------
function log_off_engage()
{
  admin_dash_logoff_button().Click();
  WaitSeconds(2, "Waiting to log off...");
}
//--------------------------------------------------------------------------------