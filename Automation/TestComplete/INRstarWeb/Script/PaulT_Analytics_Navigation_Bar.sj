//USEUNIT Common
//USEUNIT PaulT_BlogCopies
//USEUNIT PaulT_Analytics_Authentication

function Quick_Test()
{
    Test_Navigation_Bar_Links("Analytics1");
}

function Test_Navigation_Bar_Links(application)
{
var PatientActivityURL;
var ClinicalAuditURL;
var HomePageURL;
var PageTitle;
var patientActivityHomePageIcon;
var splashButton;

  if(application == "Analytics1")
  {
      PatientActivityURL = "https://inrstaranalytics-1.inrstar.test/Dashboard/1";
      ClinicalAuditURL = "https://inrstaranalytics-1.inrstar.test/Dashboard/2";
      HomePageURL = "https://inrstaranalytics-1.inrstar.test/Dashboard";
  }
  if(application == "Analytics2")
  {
      PatientActivityURL = "https://inrstaranalytics-2.inrstar.test/Dashboard/1";
      ClinicalAuditURL = "https://inrstaranalytics-2.inrstar.test/Dashboard/2";
      HomePageURL = "https://inrstaranalytics-2.inrstar.test/Dashboard";
  }

  currentAnalyticsTab = Login_Single_App(application,"Valid");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"PatientActivity");
  PageTitle = Aliases.iexplore1.Page(PatientActivityURL).Panel(1).Panel("pageContainer").Panel("headingContainer").TextNode("headingText").contentText;
  if(PageTitle == 'Patient Activity')
      Log.Checkpoint("Test Passed");
  else
      Log.Checkpoint("Test Failed");  

  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"ClinicalAudit");
  PageTitle = Aliases.iexplore1.Page(ClinicalAuditURL).Panel(1).Panel("pageContainer").Panel("headingContainer").TextNode("headingText").contentText;
  if(PageTitle == 'Clinical Audit')
      Log.Checkpoint("Test Passed");
  else
      Log.Checkpoint("Test Failed");  
  
  
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"Home");
  patientActivityHomePageIcon = Aliases.iexplore1.Page(HomePageURL).Panel(1).Panel(0).Panel(0).Link(0);
  if(patientActivityHomePageIcon.Visible)
      Log.Checkpoint("Test Passed");
  else
      Log.Checkpoint("Test Failed");  

  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"Help");
  // Not sure how to validate the hover over message automatically?  

  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"Logout");
  if(application == "Analytics1")
  {
      splashButton = Aliases.iexplore1.pageThisPageCanTBeDisplayed.Panel("splashscreen").Panel("centerconent").Button("splashButton");
  }
  if(application == "Analytics2")
  {
      // Think I have certificate problems on Analytics 2 installation which means splashButton path name has weirdness in it?
      splashButton = Aliases.iexplore1.pageCertificateErrorNavigationBl.Panel("splashscreen").Panel("centerconent").Button("splashButton");
  }
  if(splashButton.Visible)
      Log.Checkpoint("Test Passed");
  else
      Log.Checkpoint("Test Failed");  
 
} 

function use_analytics_navigation_bar(CurrentPage, SelectedOption)
{
  if(SelectedOption == "Home")
  {
    var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
    analytics_page.Panel(0).Link("help").TextNode(0).HoverMouse();
    analytics_page.Panel(0).Link(4).Click();
  }
  if(SelectedOption == "PatientActivity")
  {
    var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
    analytics_page.Panel(0).Link(3).Click();
  }
  if(SelectedOption == "ClinicalAudit")
  {
    var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
    analytics_page.Panel(0).Link(2).Click();
  }
  if(SelectedOption == "Help")
  {
    var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
    analytics_page.Panel(0).Link("help");   
  }
  if(SelectedOption == "Logout")
  {
    var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
    analytics_page.Panel(0).Link(1).Click();
  }
  var stem = get_browser_address_bar_path("full");
  var NewAddress = stem.wText;
  return NewAddress;

}