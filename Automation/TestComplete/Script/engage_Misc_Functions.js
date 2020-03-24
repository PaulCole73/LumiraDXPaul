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
}
//--------------------------------------------------------------------------------
function set_engage_url()
{
  var base = "INRstarWindows";
  
  switch(environment)
  {
    case base + "Coruscant": 
    engage_url = "https://engage-coruscant.lumiradxcaresolutions.com/";
    break;
    case base + "Coruscant2": 
    engage_url = "https://engage-coruscant2.lumiradxcaresolutions.com/";
    break;
    case base + "Hoth": 
    engage_url = "https://engage-hoth.lumiradxcaresolutions.com/";
    break;
    case base + "Tatooine": 
    engage_url = "https://engage-tatooine.lumiradxcaresolutions.com/";
    break;
    case base + "Staging": 
    engage_url = "https://engage-staging.lumiradxcaresolutions.com/";
    break;
    case base + "Alderaan": 
    engage_url = "https://engage-alderaan.lumiradxcaresolutions.com/";
    break;
    //case base + "Integration": 
    //engage_url = "https://engage-integration.lumiradxcaresolutions.com/";
    //break;
    case base + "CoruscantV4": 
    admin_dash_url = "https://engage-coruscant.lumiradxcaresolutions.com/";
    break;
    case base + "Coruscant2V4": 
    admin_dash_url = "https://engage-coruscant2.lumiradxcaresolutions.com/";
    break;
    case base + "HothV4": 
    engage_url = "https://engage-hoth.lumiradxcaresolutions.com/";
    break;
    case base + "TatooineV4": 
    engage_url = "https://engage-tatooine.lumiradxcaresolutions.com/";
    break;
    case base + "StagingV4": 
    engage_url = "https://engage-staging.lumiradxcaresolutions.com/";
    break;
    case base + "AlderaanV4": 
    engage_url = "https://engage-alderaan.lumiradxcaresolutions.com/";
    break;
  }
}
//--------------------------------------------------------------------------------
function get_current_url()
{
  set_engage_url();
  var url;
  var page_array = new Array();
  Sys.WaitBrowser("chrome");
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
  return url;
}