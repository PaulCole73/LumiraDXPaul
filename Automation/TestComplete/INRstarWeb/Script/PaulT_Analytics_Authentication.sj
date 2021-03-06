//USEUNIT Common
//USEUNIT PaulT_BlogCopies
//USEUNIT PaulT_Browser

/* Set of tests, prefixed Test_ to be run individually checking Analytics 1 and Analytics 2 separately */

function Test_Valid_Login_Analytics1()
{ 
var patientActivityHomePageIcon;

  currentAnalyticsTab = Login_Single_App("Analytics1","Valid");
  patientActivityHomePageIcon = Aliases.iexplore1.Page("https://inrstaranalytics-1.inrstar.test/Dashboard").Panel(1).Panel(0).Panel(0).Link(0);
  if(patientActivityHomePageIcon.Visible)
      Log.Checkpoint("Test Passed");
  else
      Log.Checkpoint("Test Failed");  
}
function Test_Valid_Login_Analytics2()
{ 
var patientActivityHomePageIcon;
  
  currentAnalyticsTab = Login_Single_App("Analytics2","Valid");
  //patientActivityHomePageIcon = Aliases.iexplore1.Page("https://inrstaranalytics-2.inrstar.test/Dashboard").Panel(1).Panel(0).Panel(0).Link(0);
  patientActivityHomePageIcon = Aliases.chrome.Page("https://inrstaranalytics-2.inrstar.test/Dashboard").Panel(1).Panel(0).Panel(0).Link(0);
  if(patientActivityHomePageIcon.Visible)
      Log.Checkpoint("Test Passed");
  else
      Log.Checkpoint("Test Failed");  
}
function Test_InValid_Login_Analytics1()
{ 
var loginFailMessage;

  currentAnalyticsTab = Login_Single_App("Analytics1","Invalid");
  loginFailMessage = Aliases.iexplore1.Page("https://authenticationserver-1.inrstar.test/Account/Authenticate").Panel(0).Panel(0).Panel(0).Panel(0).TextNode(0).contentText;
  if(loginFailMessage == 'The login credentials provided are incorrect, please try again.')
      Log.Checkpoint("Test Passed");
  else
      Log.Checkpoint("Test Failed");  
}
function Test_InValid_Login_Analytics2()
{ 
var patientActivityHomePageIcon;

  currentAnalyticsTab = Login_Single_App("Analytics2","Invalid");
  loginFailMessage = Aliases.iexplore1.Page("https://authenticationserver-2.inrstar.test/Account/Authenticate").Panel(0).Panel(0).Panel(0).Panel(0).TextNode(0).contentText;
  if(loginFailMessage == 'The login credentials provided are incorrect, please try again.')
      Log.Checkpoint("Test Passed");
  else
      Log.Checkpoint("Test Failed");  
}



function submit_analytics_credentials(stem, Tab,Username,Password)
{

  var AnalyticsSplashPage = Sys.Process("iexplore").Page(Tab);
  AnalyticsSplashPage.Panel("splashscreen").Panel("centerconent").Button("splashButton").Click();
  
  // Use the Address bar to find the dynamic address for authenticationServer
  var stem = get_browser_address_bar_path("full");
  var Address = stem.wText;
  
  
  var AuthLoginPage = Sys.Process("iexplore").Page(Address); 
  
  var form = AuthLoginPage.Panel(0).Panel(0).Form(0);

  form.Textbox("username").Text = Username;
  form.PasswordBox("password").Text = Password; 
  form.SubmitButton("Log in").Click();

  var stem = get_browser_address_bar_path("full");
  var NewAddress = stem.wText;
  //Log.Message(NewAddress);
  return NewAddress;
}

//=======================================================================================================

// set which version of test system to use
function set_analytics_system(ChosenAnalyticsApp)
{
  if (ChosenAnalyticsApp == "Analytics1")
  {
        OpenNewTab("https://inrstaranalytics-1.inrstar.test/");

  }  
    
  if (ChosenAnalyticsApp == "Analytics2")
  {
        OpenNewTab("https://inrstaranalytics-2.inrstar.test/");

  }
}

function Login_Single_App(application, credentials)
{
var URL;
var username;
var password;
var currentAnalyticsTab;
  
  // Set credentials and URL based on which Analytics is being logged into
  if (application == "Analytics1")
  {
      if(credentials == "Valid")
      {
          URL="https://inrstaranalytics-1.inrstar.test/"; 
          username="paul.DW1";
          password="INRstar_5";
      }
      if(credentials == "Invalid")  // enter Analytics 2 credentials into Analytics 1 site
      {
          URL="https://inrstaranalytics-1.inrstar.test/"; 
          username="analytics";
          password="Mary";
      }
      if(credentials == "SouthDocs")
      {
          URL="https://inrstaranalytics-1.inrstar.test/"; 
          username="analytics1-southDocs";
          password="Mary";
      }
      if(credentials == "LeicesterCity")
      {
          URL="https://inrstaranalytics-1.inrstar.test/"; 
          username="analytics1-leicester";
          password="Mary";
      }
      if(credentials == "StackOneMegaMix")
      {
          URL="https://inrstaranalytics-1.inrstar.test/"; 
          username="analytics1-stack1MegaMix";
          password="Mary";
      }                
  }  

  if (application == "Analytics2")
  {
      if(credentials == "Valid")
      {
          URL="https://inrstaranalytics-2.inrstar.test/"; 
          username="analytics";
          password="Mary";
      }
      if(credentials == "Invalid") // enter Analytics 1 credentials into Analytics 2 site
      {
          URL="https://inrstaranalytics-2.inrstar.test/"; 
          username="paul.DW1";
          password="INRstar_5";
      }           
      if(credentials == "SouthDocs")
      {
          URL="https://inrstaranalytics-2.inrstar.test/"; 
          username="analytics2-southDocs";
          password="Mary";
      }          
      if(credentials == "LeicesterCity")
      {
          URL="https://inrstaranalytics-2.inrstar.test/"; 
          username="analytics2-leicester";
          password="Mary";
      }
      if(credentials == "StackOneMegaMix")
      {
          URL="https://inrstaranalytics-2.inrstar.test/"; 
          username="analytics2-stack1MegaMix";
          password="Mary";
      }                
  }  
  
  // return back what page you end up on
  currentAnalyticsTab = Login(URL, username, password);
  return currentAnalyticsTab;
}

function Login(URL, username, password)
{
  var currentAnalyticsTab;

  //Open a browser
  //Browsers.Item(btIExplorer).Run(URL);
  Browsers.Item(btChrome).Run(URL);
  
  //get the location of the address bar to aid in finding the auth page to enter login details into
  var stem = get_browser_address_bar_path("full"); 

  // return back what page you end up on  
  currentAnalyticsTab = submit_analytics_credentials(stem, URL, username, password);
  return currentAnalyticsTab;
}