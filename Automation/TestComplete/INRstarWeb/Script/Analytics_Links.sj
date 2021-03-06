//USEUNIT Analytics_Common

//====================================================================================

function test_all_pages_all_links()

{

//Testing icon image links on the home page

home_page_icon_link_practice_activity();
Log.Checkpoint("User navigated to activity report page using large icon link on page - Test Pass");

home_page_icon_link_clinical_audit();
Log.Checkpoint("User navigated to clinical audit page using large icon link on page - Test Pass");

//Navigation bar links

navigation_bar_links_dashboard_page();
navigation_bar_links_patient_activity_page();
navigation_bar_links_clinical_audit_page();
//navigation_bar_hover_tips();

}

//===============================================================================

function home_page_icon_link_practice_activity()

{

 log_on_analytics();
 
 var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
 var link = analytics_home_page.Panel(1).Panel(0).Panel(0).Link(0);

//Click the Practive Activity Page Link
 link.Image("People_png").click();
 
log_out_analytics();
 
}

//===============================================================================

function home_page_icon_link_clinical_audit()

{

 log_on_analytics();
 
 var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
 var link = analytics_home_page.Panel(1).Panel(0).Panel(0).Link(1);

//Click the Practive Activity Page Link
 link.Image("ClinicalAudit_png").click();
 
log_out_analytics();
 
}

//====================================================================================

// Testing the navigation bar links from https://inrstaranalytics.test/Dashboard

function navigation_bar_links_dashboard_page()

{

db_inrstar_icon_link();
db_home_button();
db_patient_activity_page_link();
db_clinical_audit_link();

}
//====================================================================================

//Clicking INRstar icon link keeps you on the same page 

function db_inrstar_icon_link()

{

//login to the dashboard page
log_on_analytics();

//Clicking the inrstar icon link 
var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
var inrstar_icon_link = analytics_home_page.Panel(0);

inrstar_icon_link.Link(0).Click();

//Checking you are taken to the correct page

var page_link =  Sys.Process("iexplore").Page("*").URL;

if (page_link == "https://inrstaranalytics.test/Dashboard")
   Log.Checkpoint("Link has kept you on the correct page https://inrstaranalytics.test/Dashboard");
    else
       Log.Warning("Link has taken you to an incorrect page");
       
log_out_analytics();       
       
}

//------------------------------------------------------------------------------------

//Clicking Home Page link keeps you on the same page 

function db_home_button()

{

//login to the dashboard page
log_on_analytics();

//Clicking the home page link
var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
var home_page_link = analytics_home_page.Panel(0);

home_page_link.Link(4).Click();

//Checking you are taken to the correct page

var page_link = Sys.Process("iexplore").Page("*").URL;

if (page_link == "https://inrstaranalytics.test/Dashboard")
   Log.Checkpoint("Link has kept you on the correct page https://inrstaranalytics.test/Dashboard");
    else
       Log.Warning("Link has taken you to an incorrect page");
       
log_out_analytics();       
       
}

//------------------------------------------------------------------------------------

//Clicking Patient Activity page link takes you to the right page

function db_patient_activity_page_link()

{

//login to the dashboard page
log_on_analytics();

//Clicking the link for patient activity page
var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
var patient_activity_link = analytics_home_page.Panel(0);

patient_activity_link.Link(3).Click();

//Checking you are taken to the correct page

var page_link =  Sys.Process("iexplore").Page("*").URL;

if (page_link == "https://inrstaranalytics.test/Dashboard/1")
   Log.Checkpoint("Link has taken you to the correct page https://inrstaranalytics.test/Dashboard/1");
    else
       Log.Warning("Link has taken you to an incorrect page");
       
log_out_analytics();       
       
}

//------------------------------------------------------------------------------------

//Clicking Clinical audit page link takes you to the right page

function db_clinical_audit_link()

{

//login to the dashboard page
log_on_analytics();

//Clicking the link for clinical audit page
var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
var clinical_audit_link = analytics_home_page.Panel(0);

clinical_audit_link.Link(2).Click();

//Checking you are taken to the correct page

var page_link =  Sys.Process("iexplore").Page("*").URL;

if (page_link == "https://inrstaranalytics.test/Dashboard/2")
   Log.Checkpoint("Link has taken you to the correct page https://inrstaranalytics.test/Dashboard/2");
    else
       Log.Warning("Link has taken you to an incorrect page");
       
log_out_analytics();       
       
}

//====================================================================================

// Testing the navigation bar buttons from https://inrstaranalytics.test/Dashboard/1 (patient activity page)

function navigation_bar_links_patient_activity_page()

{

pa_inrstar_icon_link();
pa_home_page_link();
pa_patient_activity_link();
pa_clinical_audit_link();
pa_logout_link();

}

//------------------------------------------------------------------------------------

//Clicking INRstar icon link takes you to home page

function pa_inrstar_icon_link()

{

//login to the dashboard page
log_on_analytics();

//Clicking the link for patient activity page
var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
var patient_activity_link = analytics_home_page.Panel(0);

patient_activity_link.Link(3).Click();

WaitSeconds(2);

//Clicking the inrstar icon link 
var patient_activity_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard/1");
var inrstar_icon_link = patient_activity_page.Panel(0);

inrstar_icon_link.Link(0).Click();

WaitSeconds(2);

//Checking you are taken to the correct page

var page_link =  Sys.Process("iexplore").Page("*").URL;

if (page_link == "https://inrstaranalytics.test/Dashboard")
   Log.Checkpoint("Link has taken you on the correct page https://inrstaranalytics.test/Dashboard");
    else
       Log.Warning("Link has taken you to an incorrect page");
       
WaitSeconds(2);
       
log_out_analytics();    
       
}

//------------------------------------------------------------------------------------

//Clicking Home Page link takes you to the home page from patient activity page

function pa_home_page_link()

{

//login to the dashboard page
log_on_analytics();

//Clicking the link for patient activity page
var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
var patient_activity_link = analytics_home_page.Panel(0);

patient_activity_link.Link(3).Click();

WaitSeconds(2);

//Clicking the home page link
var patient_activity_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard/1");
var home_page_link = patient_activity_page.Panel(0);

home_page_link.Link(4).Click();

WaitSeconds(2);

//Checking you are taken to the correct page

var page_link =  Sys.Process("iexplore").Page("*").URL;

if (page_link == "https://inrstaranalytics.test/Dashboard")
   Log.Checkpoint("Link has taken you to the correct page https://inrstaranalytics.test/Dashboard");
    else
       Log.Warning("Link has taken you to an incorrect page");
       
WaitSeconds(2);

log_out_analytics();       
       
}

//------------------------------------------------------------------------------------

//Clicking Patient Activity page link keeps you on patient activity page

function pa_patient_activity_link()

{

//login to the dashboard page
log_on_analytics();

//Clicking the link for patient activity page
var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
var patient_activity_link = analytics_home_page.Panel(0);

patient_activity_link.Link(3).Click();

WaitSeconds(2);

//Clicking the patient activity link from patient activity page

var patient_activity_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard/1");
var patient_activity_link2 = patient_activity_page.Panel(0);

patient_activity_link2.Link(3).Click();

WaitSeconds(2);

//Checking you are taken to the correct page

var page_link =  Sys.Process("iexplore").Page("*").URL;

if (page_link == "https://inrstaranalytics.test/Dashboard/1")
   Log.Checkpoint("Link has kept you on the correct page https://inrstaranalytics.test/Dashboard/1");
    else
       Log.Warning("Link has taken you to an incorrect page");

WaitSeconds(2);
       
log_out_analytics();     
       
}

//------------------------------------------------------------------------------------

//Clicking INRstar icon link takes you to home page

function pa_clinical_audit_link()

{

//login to the dashboard page
log_on_analytics();

//Clicking the link for patient activity page
var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
var patient_activity_link = analytics_home_page.Panel(0);

patient_activity_link.Link(3).Click();

WaitSeconds(2);

//Clicking the clinical audit link 
var patient_activity_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard/1");
var clinical_audit_link = patient_activity_page.Panel(0);

clinical_audit_link.Link(2).Click();

WaitSeconds(2);

//Checking you are taken to the correct page

var page_link =  Sys.Process("iexplore").Page("*").URL;

if (page_link == "https://inrstaranalytics.test/Dashboard/2")
   Log.Checkpoint("Link has kept you on the correct page https://inrstaranalytics.test/Dashboard/2");
    else
       Log.Warning("Link has taken you to an incorrect page");

WaitSeconds(2);
       
log_out_analytics();    
       
}

//------------------------------------------------------------------------------------

//Clicking log out link from patient activity page

  function pa_logout_link()

{

//login to the dashboard page
log_on_analytics();

//Clicking the link for patient activity page
  var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
  var patient_activity_link = analytics_home_page.Panel(0);

  patient_activity_link.Link(3).Click();

  WaitSeconds(2);

  var patient_activity = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard/1");
  var panel = patient_activity.Panel(0);
 
 //Click Log Out
 
 panel.Link(1).Click();
 
 WaitSeconds(2);

//Checking you are taken to the correct page

  var page_link =  Sys.Process("iexplore").Page("*").URL;

  if (page_link == "https://inrstaranalytics.test/")
     Log.Checkpoint("Link has taken you to the correct page https://inrstaranalytics.test/");
      else
         Log.Warning("Link has taken you to an incorrect page");

}

//====================================================================================

// Testing the navigation bar buttons from https://inrstaranalytics.test/Dashboard/2 (clinical audit page)

function navigation_bar_links_clinical_audit_page()

{

ca_inrstar_icon_link();
ca_home_page_link();
ca_patient_activity_link();
ca_clinical_audit_link();
ca_logout_link();

}

//------------------------------------------------------------------------------------

//Clicking INRstar icon link takes you to home page from clinical audit page

function ca_inrstar_icon_link()

{

//login to the dashboard page
log_on_analytics();

//Clicking the link for clinical audit page
var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
var clinical_audit_link = analytics_home_page.Panel(0);

clinical_audit_link.Link(2).Click();

WaitSeconds(2);

//Clicking the inrstar icon link 
var patient_clinical_audit_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard/2");
var inrstar_icon_link = patient_clinical_audit_page.Panel(0);

inrstar_icon_link.Link(0).Click();

WaitSeconds(2);

//Checking you are taken to the correct page

var page_link =  Sys.Process("iexplore").Page("*").URL;

if (page_link == "https://inrstaranalytics.test/Dashboard")
   Log.Checkpoint("Link has taken you on the correct page https://inrstaranalytics.test/Dashboard");
    else
       Log.Warning("Link has taken you to an incorrect page");
       
WaitSeconds(2);
       
log_out_analytics();    
       
}

//------------------------------------------------------------------------------------

//Clicking Home Page link takes you to the home page from clinical audit page

function ca_home_page_link()

{

//login to the dashboard page
log_on_analytics();

//Clicking the link for clinical audit page
var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
var clinical_audit_link = analytics_home_page.Panel(0);

clinical_audit_link.Link(2).Click();

WaitSeconds(2);

//Clicking the home page link
var patient_clinical_audit_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard/2");
var home_page_link = patient_clinical_audit_page.Panel(0);

home_page_link.Link(4).Click();

WaitSeconds(2);

//Checking you are taken to the correct page

var page_link =  Sys.Process("iexplore").Page("*").URL;

if (page_link == "https://inrstaranalytics.test/Dashboard")
   Log.Checkpoint("Link has taken you to the correct page https://inrstaranalytics.test/Dashboard");
    else
       Log.Warning("Link has taken you to an incorrect page");
       
WaitSeconds(2);

log_out_analytics();       
       
}

//------------------------------------------------------------------------------------

//Clicking Patient Activity page link takes you to clinical audit page from patient activity page

function ca_patient_activity_link()

{

//login to the dashboard page
log_on_analytics();

//Clicking the link for clinical audit page
var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
var clinical_audit_link = analytics_home_page.Panel(0);

clinical_audit_link.Link(2).Click();

WaitSeconds(2);

//Clicking the patient activity link from clinical audit page

var patient_clinical_audit_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard/2");
var patient_activity_link2 = patient_clinical_audit_page.Panel(0);

patient_activity_link2.Link(3).Click();

WaitSeconds(2);

//Checking you are taken to the correct page

var page_link =  Sys.Process("iexplore").Page("*").URL;

if (page_link == "https://inrstaranalytics.test/Dashboard/1")
   Log.Checkpoint("Link has taken you to the correct page https://inrstaranalytics.test/Dashboard/1");
    else
       Log.Warning("Link has taken you to an incorrect page");

WaitSeconds(2);
       
log_out_analytics();     
       
}

//------------------------------------------------------------------------------------

//Clicking clinical audit link keeps you on clinical audit page

function ca_clinical_audit_link()

{

//login to the dashboard page
log_on_analytics();

//Clicking the link for clinical audit page
var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
var clinical_audit_link = analytics_home_page.Panel(0);

clinical_audit_link.Link(2).Click();

WaitSeconds(2);

//Clicking the clinical audit link from clinical audit page

var patient_clinical_audit_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard/2");
var patient_clinical_audit_page2 = patient_clinical_audit_page.Panel(0);

patient_clinical_audit_page2.Link(2).Click();

WaitSeconds(2);

//Checking you are taken to the correct page

var page_link =  Sys.Process("iexplore").Page("*").URL;

if (page_link == "https://inrstaranalytics.test/Dashboard/2")
   Log.Checkpoint("Link has kept you on the correct page https://inrstaranalytics.test/Dashboard/2");
    else
       Log.Warning("Link has taken you to an incorrect page");

WaitSeconds(2);
       
log_out_analytics();     
       
}

//------------------------------------------------------------------------------------

//Clicking log out link from patient activity page

  function ca_logout_link()

{

//login to the dashboard page
  log_on_analytics();

  //Clicking the link for clinical audit page
  var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
  var clinical_audit_link = analytics_home_page.Panel(0);

  clinical_audit_link.Link(2).Click();

  WaitSeconds(2);

  var patient_clinical_audit_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard/2");
  var panel = patient_clinical_audit_page.Panel(0);
 
 //Click Log Out
 
 panel.Link(1).Click();
 
 WaitSeconds(2);

//Checking you are taken to the correct page

  var page_link =  Sys.Process("iexplore").Page("*").URL;

  if (page_link == "https://inrstaranalytics.test/")
     Log.Checkpoint("Link has taken you to the correct page https://inrstaranalytics.test/");
      else
         Log.Warning("Link has taken you to an incorrect page");

}

//====================================================================================


//====================================================================================

//Tests for checking that if you resize the screen you get hover tips for the icons

// Changing the screen size
  function navigation_bar_hover_tips()

{

//  log_on_analytics();

//Changing the screen size here

 var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
 analytics_home_page.Keys("[F12]");
 WaitSeconds(1)
 Aliases.iexplore1.BrowserWindow.FrameTab.tabpage.BaseBar.ReBarWindow32.IEDEVTOOLS.SysTabControl32.Keys("[Hold]^!1")
 WaitSeconds(1)
 analytics_home_page.Keys("[F12]");

////Getting focus of the screen for the screenshot you must click a link on ie first
//  var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
//  var patient_activity_button = analytics_home_page.Panel(0);
//  var home_page_link = analytics_home_page.Panel(0);
//  home_page_link.Link(7).Click();
//
////Hovering over the link to get message
//  patient_activity_button.Link(5).Hovermouse();
//
////Taking the screenshot  
//  //var NewPict = Log.Picture(Sys.Desktop.ActiveWindow(), "Screenshot of navigation bar", "Extended Message Text", pmHighest);
//  var newscreenshot = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard").Picture().SaveToFile ("C:\\dean\\Picture14.png");
//  
  }

//====================================================================================

function Test1()
 {
  Pict1 = Utils.Picture;
  Pict2 = Utils.Picture;

  Pict1.LoadFromFile("C:\\dean\\Picture14.png");
  Pict2.LoadFromFile("C:\\dean\\Patient_Activity_Correct.png");

  // Comparing the images using the Compare method
  if (!Pict1.Compare(Pict2))
  {
    Log.Picture(Pict1);
    Log.Picture(Pict2);
    Log.Warning("The compared images are not identical");
  }

   }
