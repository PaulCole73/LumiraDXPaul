//USEUNIT Common
//USEUNIT PaulT_BlogCopies
//USEUNIT PaulT_Analytics_Authentication
//USEUNIT PaulT_Analytics_Navigation_Bar

function Quick_Test()
{
    Test_Home_Page_Links("Analytics1");
}

function Test_Home_Page_Links(application)
{
var PatientActivityURL;
var ClinicalAuditURL;
var HomePageURL;
var PageTitle;

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
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"Home");
  Log.Message(currentAnalyticsTab);
  currentAnalyticsTab = navigate_home_page_links(currentAnalyticsTab, "PatientActivity");
  PageTitle = Aliases.iexplore1.Page(PatientActivityURL).Panel(1).Panel("pageContainer").Panel("headingContainer").TextNode("headingText").contentText;
  if(PageTitle == 'Patient Activity')
      Log.Checkpoint("Test Passed");
  else
      Log.Checkpoint("Test Failed");  

  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"Home");
  currentAnalyticsTab = navigate_home_page_links(currentAnalyticsTab, "ClinicalAudit");
  PageTitle = Aliases.iexplore1.Page(ClinicalAuditURL).Panel(1).Panel("pageContainer").Panel("headingContainer").TextNode("headingText").contentText;
  if(PageTitle == 'Clinical Audit')
      Log.Checkpoint("Test Passed");
  else
      Log.Checkpoint("Test Failed");  

  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"Logout");
} 

function navigate_home_page_links(CurrentPage, SelectedOption)
{
  if(SelectedOption == "PatientActivity")
  {
      var analytics_home_page = Sys.Process("iexplore").Page(CurrentPage);
      var link = analytics_home_page.Panel(1).Panel(0).Panel(0).Link(0);
      link.Image("People_png").click();
  }
  if(SelectedOption == "ClinicalAudit")
  {
      var analytics_home_page = Sys.Process("iexplore").Page(CurrentPage);
      var link = analytics_home_page.Panel(1).Panel(0).Panel(0).Link(1);
      link.Image("ClinicalAudit_png").click();
  }
 var stem = get_browser_address_bar_path("full");
 var NewAddress = stem.wText;
 Log.Message(NewAddress);
 return NewAddress;

}