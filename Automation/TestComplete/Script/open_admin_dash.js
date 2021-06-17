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