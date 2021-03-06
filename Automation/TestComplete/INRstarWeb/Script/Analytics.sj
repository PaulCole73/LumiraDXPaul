//USEUNIT Common


//=======================================================================================================

function analytics_tests()

{

WaitSeconds(1,"Waiting for Analytics page in case of new config file");

log_on_analytics();
Log.Checkpoint("User logged into analytics - Test Pass");
WaitSeconds(4);

log_out_analytics_home_page();
Log.Checkpoint("User logged out analytics - Test Pass");
WaitSeconds(4);

practice_activity_report_page();
WaitSeconds(4);
Log.Checkpoint("User navigated to activity report page using large icon link on page - Test Pass");

log_out_analytics_practice_activity_page();
WaitSeconds(4);
Log.Checkpoint("User logged out of analytics activity report page - Test Pass");

Log.Checkpoint("All analytics tests passed");
//
//ExportResults();
//
//email_results();

}



//=======================================================================================================

function log_on_analytics()

{
 var INRstar_Analytics = Sys.Process("iexplore", 2).Page("https://inrstaranalytics.test/");
 INRstar_Analytics.Panel(0).Panel(0).Panel(1).Link("loginLink").Click();
 
 //WaitSeconds(10); Need to implement function so that it waits for the page before running the next step as config file can cause a very long wait
 
 var INRstar_Auth = Sys.Process("iexplore").Page("*");
 var form = INRstar_Auth.Panel("wrap").Panel("main").Panel(0).Panel(0).Panel(1).Form(0)
 var panel_user_name = INRstar_Auth.Panel("wrap").Panel("main").Panel(0).Panel(0).Panel(1).Form(0).Panel(0).Panel(0);
 var panel_user_password = INRstar_Auth.Panel("wrap").Panel("main").Panel(0).Panel(0).Panel(1).Form(0).Panel(1).Panel(0);
 
 //Enter User Credentials
 
 panel_user_name.Textbox("username").Text = "Demo";
 panel_user_password.PasswordBox("password").Text = "Mary";
 
 //Submit User login details
 form.SubmitButton("Login").Click();
 
// WaitSeconds(10); Need to implement function so that it waits for the page before running the next step as config file can cause a very long wait
}

//=======================================================================================================

function login_using_alias()
{
// Using Find
var page = Sys.Browser("iexplore").Page("https://inrstaranalytics.test/")
// Using the Find method
var myBtn = page.NativeWebObject.Find("id","loginLink","a");
// Checks if the button exists
{
Sys.HighlightObject(myBtn);
if (myBtn.Exists)
  myBtn.Click(68,5);
}
}
//=======================================================================================================

function log_out_analytics_home_page()

{

 var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
 var panel = analytics_home_page.Panel(0);
 
 //Click Log Out
 
 panel.Link(1).Click();
 
 var INRstar_Analytics = Sys.Process("iexplore", 2).Page("https://inrstaranalytics.test/");
 var panelLL = INRstar_Analytics.Panel(0).Panel(0).Panel(1).Link("loginLink");

    if (panelLL.Exists);   
     Log.Message("Login button exists");
         
}

//=======================================================================================================

function practice_activity_report_page()

{
 log_on_analytics();
 
 var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard");
 var panel1 = analytics_home_page.Panel(2).Panel(0).Panel(1).Panel(2).Link(0).Panel(1);

//Click the Practive Activity Page Link
 panel1.Image("patient_png").click();
 
}

//=======================================================================================================

function log_out_analytics_practice_activity_page()

{

 var analytics_home_page = Sys.Process("iexplore").Page("https://inrstaranalytics.test/Dashboard/1");
 var panel = analytics_home_page.Panel(0);
 
 //Click Log Out
 
 panel.Link(1).Click();
 
// ----------------
 
 var INRstar_Analytics = Sys.Process("iexplore", 2).Page("https://inrstaranalytics.test/");
 var panelLL = INRstar_Analytics.Panel(0).Panel(0).Panel(1).Link("loginLink");

    if (panelLL.Exists);   
     Log.Message("Login button exists");
         
}

//===============================================================================

// This saves the result in the below location and is overriden each time

function ExportResults()
 {
  var FileName;
  FileName = Project.ConfigPath + "Log\\Automation_analytics_run.mht";
  Log.SaveResultsAs(FileName, lsMHT);
 }

//===============================================================================

//This sends the results vis email in a filterable report

function email_results()

//  SendMail(ToAddress, FromHost, FromName, FromAddress, Subject, Body, FileName1, FileName2..FileNameN)

 {
  SendMail("Testing@INRstar.co.uk","mailsrv1.scsl.network","Dean.Lester","dean.lester@inrstar.co.uk", "Automated analytics regression results", "", "Q:\\Development and Testing\\Testing\\Test Complete Projects\\Version5\\INRstarV5 - V9.1\\Local config\\[TOL-TST-OFFLINE]\\Log\\Automation_analytics_run.mht")
 }

