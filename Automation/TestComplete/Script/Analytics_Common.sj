//USEUNIT Common

//=======================================================================================================

function initial_log_on_analytics()

{
 var INRstar_Analytics = Sys.Process("iexplore", 2).Page("https://inrstaranalytics.test/");
 INRstar_Analytics.Panel(0).Panel(0).Button("splashButton").Click();
 
 //Need to implement function so that it waits for the page before running the next step as config file can cause a very long wait
 
 WaitSeconds(15); 
 
 var INRstar_Auth = Sys.Process("iexplore").Page("*");
 var form = INRstar_Auth.Panel(0).Panel(0).Form(0);
 
 //Enter User Credentials
 WaitSeconds(4);
 form.Textbox("username").Text = "Demo";
 WaitSeconds(4);
 form.PasswordBox("password").Text = "Mary";
 
 //Submit User login details
 form.SubmitButton("Log in").Click();
 
 //Need to implement function so that it waits for the page before running the next step as config file can cause a very long wait

//WaitSeconds(15,"Waiting for Analytics page");

}

//=======================================================================================================

function log_on_analytics()

{
 var INRstar_Analytics = Sys.Process("iexplore", 2).Page("https://inrstaranalytics.test/");
 INRstar_Analytics.Panel(0).Panel(0).Button("splashButton").Click();
 
 //WaitSeconds(10); Need to implement function so that it waits for the page before running the next step as config file can cause a very long wait
 WaitSeconds(2);
 var INRstar_Auth = Sys.Process("iexplore").Page("*");
 var form = INRstar_Auth.Panel(0).Panel(0).Form(0);
 
 //Enter User Credentials
 
 form.Textbox("username").Text = "Demo";
 WaitSeconds(1);
 form.PasswordBox("password").Text = "Mary";
 
 //Submit User login details
 form.SubmitButton("Log in").Click();

}

//=======================================================================================================

function log_out_analytics()

{

 var analytics = Sys.Process("iexplore").Page("*");
 var panel = analytics.Panel(0);
 
 //Click Log Out
 
 panel.Link(1).Click();
 
 var INRstar_Analytics = Sys.Process("iexplore", 2).Page("*");
 var panelLL = INRstar_Analytics.Panel(0).Panel(0).Button("splashButton");

    if (panelLL.Exists);   
     Log.Message("Login button exists");
         
}