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
    case base + "Coruscant": 
    admin_dash_url = "https://admin-coruscant.lumiradxcaresolutions.com/";
    break;
    case base + "Coruscant2": 
    admin_dash_url = "https://admin-coruscant2.lumiradxcaresolutions.com/";
    break;
    case base + "Hoth": 
    admin_dash_url = "https://admin-hoth.lumiradxcaresolutions.com/";
    break;
    case base + "Tatooine": 
    admin_dash_url = "https://admin-tatooine.lumiradxcaresolutions.com/";
    break;
    case base + "Staging": 
    admin_dash_url = "https://admin-staging.lumiradxcaresolutions.com/";
    break;
    case base + "Alderaan": 
    admin_dash_url = "https://admin-alderaan.lumiradxcaresolutions.com/";
    break;
    case base + "Integration": 
    admin_dash_url = "https://admin-integration.lumiradxcaresolutions.com/";
    break;
    case base + "ItalyDev1": 
    admin_dash_url = "https://admin-it-dev1.caresolutions.lumiradx.com/";
    break;
<<<<<<< HEAD
    case base + "ItalyPreProd1": 
    admin_dash_url = "https://admin-it-preprod1.caresolutions.lumiradx.com/";
    break;
=======
>>>>>>> 92e82ad89d3eb9f38e737effcd4f8428cb820589
    case base + "CoruscantV4": 
    admin_dash_url = "https://admin-coruscant.lumiradxcaresolutions.com/";
    break;
    case base + "Coruscant2V4": 
    admin_dash_url = "https://admin-coruscant2.lumiradxcaresolutions.com/";
    break;
    case base + "HothV4": 
    admin_dash_url = "https://admin-hoth.lumiradxcaresolutions.com/";
    break;
    case base + "TatooineV4": 
    admin_dash_url = "https://admin-tatooine.lumiradxcaresolutions.com/";
    break;
    case base + "StagingV4": 
    admin_dash_url = "https://admin-staging.lumiradxcaresolutions.com/";
    break;
    case base + "AlderaanV4": 
    admin_dash_url = "https://admin-alderaan.lumiradxcaresolutions.com/";
    break;
  }
}
//--------------------------------------------------------------------------------