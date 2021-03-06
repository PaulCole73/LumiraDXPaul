//USEUNIT Navigation
//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Popups
//USEUNIT V5_SQL
//USEUNIT V5_Common_Field_Tests



function quickstart()
{
  INRstarV5 = set_admin_system()
  // ADM_0009 : Check Client List
  //Check_Client_List(INRstarV5);


}
//===============================================================================
//-------------------------------------------------------------------------------
// 
//-------------------------------------------------------------------------------
function Admin_Dashboard_Regression()
{
  pre_login_tests();
  
  post_login_tests();
}
//-------------------------------------------------------------------------------
// Pre-login tests 
//-------------------------------------------------------------------------------
function pre_login_tests()
{

  var INRstarV5 = set_pre_login_system();         
  
  // ADM_0001 : Mandatory Misuse Accept
  Check_Mandatory_Misuse_Act_Accept(INRstarV5);

  // ADM_0002 : Check Hyper link - Computer Misue Act
  Check_Hyperlink_Computer_Misuse(INRstarV5);
  
//  // ADM_0003 : Check Hyper link - INRstar
//  Check_Hyperlink_INRstar(INRstarV5);
//  
//  // ADM_0004 : Check Hyper link - Privacy Policy
//  Check_Hyperlink_INRstar_Privacy(INRstarV5);
  
  // ADM_0005 : Check Password
  Check_Password(INRstarV5);
  
}
//-------------------------------------------------------------------------------
// Post-login tests 
//-------------------------------------------------------------------------------
function post_login_tests()
{

  // Login to Admin Dashboard 
  SCSL_Log_On_User("Stu");   
  
  INRstarV5 = set_admin_system()
  
//  // ADM_0006 : Check Navigation 
//  Check_Main_Navigation(INRstarV5)
//
//  // ADM_0011 : Check Client List
//  Check_Client_List(INRstarV5);
//  
  // ADM_0012
  Check_New_Client_Validation(INRstarV5);
  
  // Logoff from Admin Dashboard
  SCSL_Log_Off();
}
//-------------------------------------------------------------------------------
//Check by default that "I do not accept" is selected
function Check_Mandatory_Misuse_Act_Accept(INRstarV5)
{
  Log.Message ("START ADM_0001 : Mandatory Misuse Accept --------------------------------");

  var panelLogon = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper");
  var formLogon = panelLogon.Form("Logon");

  // Click Disclaimer
  var w_DoNotAgree = formLogon.panel("Disclaimer").panel(0).Panel(0).RadioButton("DoNotAgreeDisclaimer");
    
  if (w_DoNotAgree.checked == true )
     Log.Message("Non Acceptance is default value");
  else
     Log.Warning("Non Acceptance is NOT default value?");
}
//===============================================================================
//-------------------------------------------------------------------------------
// Check Hyper Link - Computer Misuse
function Check_Hyperlink_Computer_Misuse(INRstarV5)
{
  Log.Message ("START ADM_0002 : Check Hyper Link - Computer Misuse --------------------------------");

  var panelLogon = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper");
  var formLogon = panelLogon.Form("Logon");
 
  var hyper_link = formLogon.Panel("Disclaimer").TextNode(0).Link(0);
  
  // click Link
  hyper_link.Click();         

  if (Sys.Process("iexplore", 3).Page("http://www.legislation.gov.uk/ukpga/1990/18/contents").Exists)
  {  
    Log.Message("Computer Misuse Webpage displayed");
    Sys.Process("iexplore").IEFrame(1).Close();
  }
  else
  {
    Log.Warning("Computer Misuse webpage not displayed");
  }
}  
//-------------------------------------------------------------------------------
// Check Hyper Link - Computer Misuse
function Check_Hyperlink_INRstar(INRstarV5)
{
  Log.Message ("START ADM_0003 : Check Hyper Link - INRstar --------------------------------");

  var panelLogon = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper");
  var formLogon = panelLogon.Form("Logon");
 
  var hyper_link = formLogon.Panel("Disclaimer").TextNode(0).Link(0);
  
  // click Link
  hyper_link.Click();         

  if (Sys.Process("iexplore", 3).Page("http://www.inrstar.co.uk").Exists)
  {  
    Log.Message("INRstar webpage displayed");
    Sys.Process("iexplore").IEFrame(1).Close();
  }
  else
  {
    Log.Warning("INRstar webpage not displayed");
  }
}  
//-------------------------------------------------------------------------------
// Check Hyper Link - Computer Misuse
function Check_Hyperlink_Privacy(INRstarV5)
{
  Log.Message ("START ADM_0004 : Check Hyper Link - Privacy Policy --------------------------------");

  var panelLogon = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper");
  var formLogon = panelLogon.Form("Logon");
 
  var hyper_link = formLogon.Panel("Disclaimer").TextNode(0).Link(0);
  
  // click Link
  hyper_link.Click();         

  if (Sys.Process("iexplore", 3).Page("http://www.inrstar.co.uk/privacy").Exists)
  {  
    Log.Message("Privacy Policy webpage displayed");
    Sys.Process("iexplore").IEFrame(1).Close();
  }
  else
  {
    Log.Warning("Privacy Policy webpage not displayed");
  }

}  
//-------------------------------------------------------------------------------
// Check Password
function Check_Password(INRstarV5)
{
  Log.Message ("START ADM_0005 : Check Password --------------------------------");
  
  var panelLogon = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper");
  var formLogon = panelLogon.Form("Logon");
  var loginarea = formLogon.Panel("LoginArea");

  // Click Disclaimer
  formLogon.Panel("Disclaimer").Panel(0).Panel(1).RadioButton("AgreeDisclaimer").Click();
  
  var w_err_mess1 = "Please enter a password";
  var w_err_mess2 = "The login details are incorrect, please re-enter";
  
  var w_user = "Sys.Admin_SCSL@INRstar.co.uk";

  // Define Test data
  wa_data = new Array(4);
  wa_data[0] = "";
  wa_data[1] = "a";
  wa_data[2] = "b1scsl_inr";
  wa_data[3] = "B1Scsl_INR";
  
  // Define test state
  wa_state = new Array(4);
  wa_state[0] = false;
  wa_state[1] = false;
  wa_state[2] = false;
  wa_state[3] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Password: " + wa_data[i]);
    if(i == 0)
      Test_Log_On_Sub(loginarea, w_user, wa_data[i], wa_state[i], w_err_mess1);
    else
      Test_Log_On_Sub(loginarea, w_user, wa_data[i], wa_state[i], w_err_mess2);
  }
  // Logoff from Admin Dashboard
  SCSL_Log_Off();

}
//-------------------------------------------------------------------------------
function Test_Log_On_Sub(p_login_area, p_user, p_pwrd, p_state, p_mess)
{    
    // Enter User & Password
    p_login_area.Panel("LoginInput").Panel(0).Textbox("Username").Text = p_user;
    p_login_area.Panel("LoginInput").Panel(1).Passwordbox("Password").Text = p_pwrd;

    // click the button
    p_login_area.Panel(0).SubmitButton("LoginButton").Click();    
    
    if (p_login_area.Exists == true && p_login_area.VisibleOnscreen == true)
    {
        if(p_state == false && p_login_area.Panel("Logon").TextNode(0).innerText == p_mess)
        {
          Log.Message("Password invalid - message displayed")
        }
        else
        {
          Log.Warning("Something is wrong");
        }
    }
    else
    {
      Log.Message("Logged in successfully");
    }

}
//===============================================================================
// Application functions
//-------------------------------------------------------------------------------
// Check Main Navigation options
function Check_Main_Navigation(INRstarV5)
{
  Log.Message ("START ADM_0006 : Navigation Links Exists --------------------------------");
  
  run_testcase_navigation(INRstarV5);
  
  run_testcase_linknames(INRstarV5)
  
}  
//-------------------------------------------------------------------------------
function run_testcase_navigation(INRstarV5)
{
  var w_linkAM  = "Account Managment";
  var w_linkSI  = "Site Information";
  var w_linkFB  = "Feedback";
  var w_linkAT  = "Audit Trail";

  var w_Navigation = INRstarV5.Panel("MainPage").Fieldset("DashboardContent").Panel(0).Panel("navigation");
  
  // Test for Account Management
  check_link_exist(w_Navigation.Link("AccountManagementLink"),w_linkAM);
  check_link_exist(w_Navigation.Link("SiteInfoLink"), w_linkSI);  
  check_link_exist(w_Navigation.Link("ViewFeedbackLink"), w_linkFB);
  check_link_exist(w_Navigation.Link("ViewAuditTrailLink"), w_linkAT);  
  
}
//-------------------------------------------------------------------------------
function check_link_exist(p_link,p_name)
{

// red = 255
// green = 65280
// blue = 16711680

  //highlight where you are in blue
  Sys["HighlightObject"](p_link,1,16711680);
      
  if (p_link.Exists == true && p_link.VisibleOnScreen == true )
    Log.Message(p_name + " Link found");
  else
    Log.Warning(p_name + " Link not found");
}
//-------------------------------------------------------------------------------
function run_testcase_linknames(INRstarV5)
{
  Log.Message ("Testcase : Navigation Link Names --------------------------------");
  
  var w_linkAM  = "Account Management";
  var w_linkSI  = "Site Information";
  var w_linkFB  = "Feedback";
  var w_linkAT  = "Audit Trail";

  var w_Navigation = INRstarV5.Panel("MainPage").Fieldset("DashboardContent").Panel(0).Panel("navigation");
  
  // Test for Account Management
  check_link_text(w_Navigation.Link("AccountManagementLink"),w_linkAM);
  check_link_text(w_Navigation.Link("SiteInfoLink"), w_linkSI);  
  check_link_text(w_Navigation.Link("ViewFeedbackLink"), w_linkFB);
  check_link_text(w_Navigation.Link("ViewAuditTrailLink"), w_linkAT);  
    
}
//-------------------------------------------------------------------------------
function check_link_text(p_link,p_name)
{
      //highlight where you are in green
      Sys["HighlightObject"](p_link,1,65280);
      
      if (p_link.innerText == p_name)
      
        Log.Message(p_name + " Text description correct");
      else
      {
        Log.Warning(p_name + " Text description wrong");
  //      Task.Stop();
      }
}
//===============================================================================
// Account Management
//-------------------------------------------------------------------------------
function Check_Client_List(INRstarV5)
{
  Log.Message ("START ADM_0011 : Check Client List --------------------------------");
  // Store list of clients
  SQL_Get_All_Clients();   

  driver = DDT.CSVDriver("d:\\Results\\list_of_clients.csv");
  //driver = DDT.ExcelDriver("d:\\Test_Data\\Review_Testing_over.xls","Treatments");
  
  // Go to Accout Management
  Goto_Client_List();
  
  var panelMCP = INRstarV5.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel")
  w_clientlist = panelMCP.Panel(0).Select("ClientAccounts");

  wc_item = 0;
  // This bit reads the file of test values, and processes each row which matches the w_Run value 
  while (!driver.EOF())
  {
      // compare driver with screen list
      w_clientlist.ClickItem(wc_item);
      w_client = w_clientlist.wText;
      
      if (driver.Value(0) != w_client)
        Log.Warning("SQL value : " + driver.Value(0) + " not equal to INRstar value :" + w_client);
      else
        Log.Message (w_client + " Matched");  

      wc_item++;

      driver.Next();      
  }
 




}
//-------------------------------------------------------------------------------
function Check_New_Client_Validation(INRstarV5)
{
  Log.Message ("START ADM_0012 : Check New Client Validation --------------------------------");
  // Go to Accout Management

  Goto_New_Client();
  
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Fieldset(0).Form("NewClientForm");

  test_client_field(INRstarV5, form.Panel(0).Textbox("Name"), "Please enter an Account Name.", "Client_");
  form = panelMCP.Fieldset(0).Form("NewClientForm");
  test_client_field(INRstarV5, form.Panel(3).Textbox("Contact"), "Please enter a Contact.", "Contact_");
  form = panelMCP.Fieldset(0).Form("NewClientForm");
  test_client_field(INRstarV5, form.Panel(4).Textbox("Title"), "Please enter a Job Title.", "Title_");
  form = panelMCP.Fieldset(0).Form("NewClientForm");
  test_client_field(INRstarV5, form.Panel(5).Textbox("PhoneNumber"), "Please enter a Phone Number.", "Phone_");
  form = panelMCP.Fieldset(0).Form("NewClientForm");
  test_client_field(INRstarV5, form.Panel(6).Textbox("MobileNumber"), "Please enter a Contact.", "Contact_");
  form = panelMCP.Fieldset(0).Form("NewClientForm");
  test_client_field(INRstarV5, form.Panel(7).Textbox("AddressLine1"), "Please enter an Address.", "Street_");
  form = panelMCP.Fieldset(0).Form("NewClientForm");
  test_client_field(INRstarV5, form.Panel(10).Textbox("Town"), "Please enter a Town.", "Redruth");
  form = panelMCP.Fieldset(0).Form("NewClientForm");
  test_client_field(INRstarV5, form.Panel(11).Textbox("County"), "Please enter a County.", "Cornwall");
  form = panelMCP.Fieldset(0).Form("NewClientForm");
  test_client_field(INRstarV5, form.Panel(12).Textbox("PostCode"), "Please enter a Post Code.", "TR14 0HX");
  form = panelMCP.Fieldset(0).Form("NewClientForm");
  test_client_field(INRstarV5, form.Panel(13).Textbox("Country"), "Please enter a Country.", "England");
}