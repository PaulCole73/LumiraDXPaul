//USEUNIT TSA_AD_Login
//USEUNIT Admin_Dash_System_Paths
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function setup_automation_admin_dash(env_url)
{
  environment = env_url;
  setup_automation(environment);
  open_admin_dash();
  reset_tests_array();
}