﻿//USEUNIT TSA_AD_Login
//USEUNIT Admin_Dash_System_Paths
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function open_admin_dash()
{
  set_admin_dash_url();
  
  TestedApps.Admin_Dashboard.PageAddress = admin_dash_url;
  WaitSeconds(2, "Waiting to get page address...");

  TestedApps.Admin_Dashboard.Run(0, true);
  WaitSeconds(10, "Waiting for application to open...");
  
  Sys.Browser("iexplore").BrowserWindow(0).Maximize();
  WaitSeconds(2);
  Sys.Browser("iexplore").BrowserWindow(0).SetFocus();
  
  var page = Sys.Browser("iexplore").Page("*").URL;
  if(page == admin_dash_url)
  {
    log_off_admin_dash();
  }
}
//--------------------------------------------------------------------------------
function close_admin_dash()
{
  Sys.Browser("*").Terminate();
  WaitSeconds(10, "Waiting for application to close...");
}
//--------------------------------------------------------------------------------
function restart_admin_dash()
{
  close_admin_dash();
  open_admin_dash();
}
//--------------------------------------------------------------------------------
function setup_automation_admin_dash(env_url)
{
  environment = env_url;
  setup_automation(environment);
  open_admin_dash();
  reset_tests_array();
}
//--------------------------------------------------------------------------------
function set_admin_dash_url()
{
  var base = "INRstarWindows";
  Log.Message(environment);
  
  switch(environment)
  {
    case base + "Hoth": 
    admin_dash_url = "https://admin-hoth.lumiradxcaresolutions.com/";
    break;
    case base + "Tatooine": 
    admin_dash_url = "https://admin-tatooine.lumiradxcaresolutions.com/";
    break;
    case base + "Staging": 
    admin_dash_url = "https://admin-staging.lumiradxcaresolutions.com/";
    break;
  }
  
  Log.Message(admin_dash_url);
}
//--------------------------------------------------------------------------------