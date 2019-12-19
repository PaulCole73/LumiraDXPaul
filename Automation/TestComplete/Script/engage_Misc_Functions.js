//USEUNIT TSA_AD_Login
//USEUNIT engage_System_Paths
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function open_engage()
{
  set_engage_url();
  
  TestedApps.Engage.PageAddress = admin_dash_url;
  WaitSeconds(2, "Waiting to get page address...");

  TestedApps.Engage.Run(0, true);
  WaitSeconds(10, "Waiting for application to open...");
  
  Sys.Browser("iexplore").BrowserWindow(0).Maximize();
  WaitSeconds(2);
  Sys.Browser("iexplore").BrowserWindow(0).SetFocus();
  
  var page = Sys.Browser("iexplore").Page("*").URL;
  if(page == engage_url)
  {
    log_off_engage();
  }
}
//--------------------------------------------------------------------------------
function close_engage()
{
  Sys.Browser("*").Terminate();
  WaitSeconds(10, "Waiting for application to close...");
}
//--------------------------------------------------------------------------------
function restart_admin_dash()
{
  close_engage();
  open_engage();
}
//--------------------------------------------------------------------------------
function setup_automation_engage(env_url)
{
  environment = env_url;
  setup_automation(environment);
  open_engage();
  reset_tests_array();
}
//--------------------------------------------------------------------------------
function set_engage_url()
{
  var base = "INRstarWindows";
  Log.Message(environment);
  
  switch(environment)
  {
    case base + "Hoth": 
    admin_dash_url = "https://engage-hoth.lumiradxcaresolutions.com/";
    break;
    case base + "Tatooine": 
    admin_dash_url = "https://engage-tatooine.lumiradxcaresolutions.com/";
    break;
    case base + "Staging": 
    admin_dash_url = "https://engage-staging.lumiradxcaresolutions.com/";
    break;
  }
  
  Log.Message(engage_url);
}