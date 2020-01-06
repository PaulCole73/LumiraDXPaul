//USEUNIT TSA_AD_Login
//USEUNIT engage_System_Paths
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function open_engage()
{
  set_engage_url();
  
  TestedApps.Engage.PageAddress = engage_url;
  WaitSeconds(2, "Waiting to get page address...");

  TestedApps.Engage.Run(0, true);
  WaitSeconds(10, "Waiting for application to open...");
  
  Sys.Browser("chrome").BrowserWindow(0).Maximize();
  WaitSeconds(2);
  Sys.Browser("chrome").BrowserWindow(0).SetFocus();
  
  var page = Sys.Browser("chrome").Page("*").URL;
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
function restart_engage()
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
    engage_url = "https://engage-hoth.lumiradxcaresolutions.com/";
    break;
    case base + "Tatooine": 
    engage_url = "https://engage-tatooine.lumiradxcaresolutions.com/";
    break;
    case base + "Staging": 
    engage_url = "https://engage-staging.lumiradxcaresolutions.com/";
    break;
  }
  
  Log.Message(engage_url);
}
//--------------------------------------------------------------------------------
function get_current_url()
{
  set_engage_url();
  var url;
  var page_array = new Array();
  page_array = Sys.Browser("chrome").FindAllChildren("ObjectType", "Page", 1, true);
  
  for(var i = 0; i < page_array.length; i++)
  {
    var string_val = aqString.Find(page_array[i].URL, engage_url);
    if(string_val != -1)
    {
      url = page_array[i].URL;
      break;
    }
  }
  
  Log.Message(url);
  return url;
}