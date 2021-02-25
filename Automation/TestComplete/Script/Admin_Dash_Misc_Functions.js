//USEUNIT TSA_AD_Login
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
  
  switch(environment)
  {
    case base + "UK-test1": 
    admin_dash_url = "https://admin-uk-test1.caresolutions.lumiradx.com/";
    break;
    case base + "UK-test2": 
    admin_dash_url = "https://admin-uk-test2.caresolutions.lumiradx.com/";
    break;
    case base + "UK-int1": 
    admin_dash_url = "https://admin-uk-int1.caresolutions.lumiradx.com/";
    break;
    case base + "UK-preprod1": 
    admin_dash_url = "https://admin-uk-preprod1.caresolutions.lumiradx.com/";
    break;
    case base + "ITA-test1": 
    admin_dash_url = "https://admin-it-test1.caresolutions.lumiradx.com/";
    break;
    case base + "ITA-test2": 
    admin_dash_url = "https://admin-it-test2.caresolutions.lumiradx.com/";
    break;
    case base + "ITA-int1": 
    admin_dash_url = "https://admin-it-int1.caresolutions.lumiradx.com/";
    break;
    case base + "ITA-preprod1": 
    admin_dash_url = "https://admin-it-preprod1.caresolutions.lumiradx.com/";
    break;
  }
}
//--------------------------------------------------------------------------------