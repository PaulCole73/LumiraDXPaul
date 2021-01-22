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
    case base + "UK-test1": 
    engage_url = "https://engage-uk-test1.caresolutions.lumiradx.com/";
    break;
    case base + "UK-test2": 
    engage_url = "https://engage-uk-test2.caresolutions.lumiradx.com/";
    break;
    case base + "UK-int1": 
    engage_url = "https://engage-uk-int1.caresolutions.lumiradx.com/";
    break;
    case base + "UK-preprod1": 
    engage_url = "https://engage-uk-preprod1.caresolutions.lumiradx.com/";
    break;
    case base + "ITA-test1": 
    engage_url = "https://engage-it-test1.caresolutions.lumiradx.com/";
    break;
    case base + "ITA-test2": 
    engage_url = "https://engage-it-test2.caresolutions.lumiradx.com/";
    break;
    case base + "ITA-int1": 
    engage_url = "https://engage-it-int1.caresolutions.lumiradx.com/";
    break;
    case base + "ITA-preprod1": 
    engage_url = "https://engage-it-preprod1.caresolutions.lumiradx.com/";
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