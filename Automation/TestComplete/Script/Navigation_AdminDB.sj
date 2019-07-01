//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Popups

//-------------------------------------------------------------------------------
// Navigate to New Client
function Goto_New_Client(INRstarV5)
{
    
    panel = INRstarV5.Panel("MainPage");
    fieldsetDC = panel.Fieldset("DashboardContent");
    // Click on Account Management
    fieldsetDC.Panel(0).Panel("navigation").Link("AccountManagementLink").Click();
    WaitSeconds(2);
    // Click on New client
    fieldsetDC.Panel("main").Panel("MainContentPanel").Panel(1).Panel(0).Button("New_Client").Click(); 
      
}
//-------------------------------------------------------------------------------
// Navigate to Client List
function Goto_Client_List(INRstarV5)
{
  try
  {
    Log.Message("Navigating to New Client");
    panel = INRstarV5.Panel("MainPage");
    fieldsetDC = panel.Fieldset("DashboardContent");
    // Click on Account Management
    fieldsetDC.Panel(0).Panel("navigation").Link("AccountManagementLink").Click();
    
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Feedback
function Goto_Feedback()
{
  try
  {
    var INRstarV5 = set_admin_system();

    Log.Message("Navigating to New Client");
    panel = INRstarV5.Panel("MainPage");
    fieldsetDC = panel.Fieldset("DashboardContent");
    // Click on Feedback
    fieldsetDC.Panel(0).Panel("navigation").Link("ViewFeedbackLink").Click();
    
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to View Client
function Goto_View_Client(INRstarV5,p_client)
{
    Log.Message("Navigating to View Client : "+ p_client);
    panel = INRstarV5.Panel("MainPage");
    fieldsetDC = panel.Fieldset("DashboardContent");
    // Click on Account Management
    fieldsetDC.Panel(0).Panel("navigation").Link("AccountManagementLink").Click();
    panelMCP = fieldsetDC.Panel("main").Panel("MainContentPanel");
    // Select Client from List
    panelMCP.Panel(0).Select("ClientAccounts").ClickItem(p_client);
    // click View
    panelMCP.Panel(1).Button("Manage_Client").Click();
    
}
//-------------------------------------------------------------------------------
// Navigate to New Org_Admin
function Goto_Add_Org_Clincial_Lead(INRstarV5)
{
  try
  {
    Log.Message("Navigating to Add Org Clinical Lead");
    panel = INRstarV5.Panel("MainPage");
    fieldsetDC = panel.Fieldset("DashboardContent");
    panelMCP = fieldsetDC.Panel("main").Panel("MainContentPanel");
    // click ion the Administrator Tab
    panelMCP.Panel("AccountTabs").Link("AccountAdministratorTab").Click();
    // click on the Add button
    panelMCP.Panel("ClientAccountContent").Panel(0).Button("Add").Click();
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Location Licence
function Goto_Locn_Licence(INRstarV5, p_client)
{
    Goto_Manage_Location(INRstarV5, p_client);
    
    Log.Message("Navigating to Add Administrator");
    panel = INRstarV5.Panel("MainPage");
    fieldsetDC = panel.Fieldset("DashboardContent");
    panelMCP = fieldsetDC.Panel("main").Panel("MainContentPanel");
    panelLTC = panelMCP.Panel("ClientAccountContent").Panel("LocationTabContent");
    // click on the Users Tab
    panelLTC.Panel("LocationTabs").Link("LocationLicenceLink").Click();
    // click on the Add button
    panelLTC.Panel("ManageLocationsTabContent").Panel(7).Button("EditLocationLicenceLink").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Add Location Administrator
function Goto_Add_Locn_Administrator(INRstarV5, p_client)
{
  try
  {
    Goto_Manage_Location(INRstarV5, p_client);
    
    Log.Message("Navigating to Add Administrator");
    panel = INRstarV5.Panel("MainPage");
    fieldsetDC = panel.Fieldset("DashboardContent");
    panelMCP = fieldsetDC.Panel("main").Panel("MainContentPanel");
    panelLTC = panelMCP.Panel("ClientAccountContent").Panel("LocationTabContent");
    // click on the Users Tab
    panelLTC.Panel("LocationTabs").Link("LocationAdministratorTab").Click();
    // click on the Add button
    panelLTC.Panel("ManageLocationsTabContent").Panel(0).Button("Add").Click();
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Manage Location
function Goto_Manage_Location(INRstarV5, p_locn)
{
    Log.Message("Navigating to View Locations");
    panel = INRstarV5.Panel("MainPage");
    fieldsetDC = panel.Fieldset("DashboardContent");
    panelMCP = fieldsetDC.Panel("main").Panel("MainContentPanel");
    // click on the Locations Tab
    panelMCP.Panel("AccountTabs").Link("AccountLocationsTab").Click();
    // Select Client from List
    panelMCP.Panel("ClientAccountContent").Panel(0).Select("Locations").ClickItem(p_locn);
    // click View
    panelMCP.Panel("ClientAccountContent").Panel(1).Button("ManageLocation").Click();
    
}
//-------------------------------------------------------------------------------
// Navigate to SCSL / Location Management
function Goto_Location_Management(INRstarV5)
{
  try
  {
    WaitSeconds(2,"Navigating to Admin, Location Management");

    // Go to Admin Settings tab Page
    var panelMCP = INRstarV5.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel("AccountTabs").Link("AccountLocationsTab").Click();
    
    WaitSeconds(3,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to SCSL / Location Management / Add Location
function Goto_Add_Location(INRstarV5)
{
  try
  {
    Goto_Location_Management(INRstarV5); 
  
    // Go to Admin Settings tab Page
    Log.Message("Navigating to Admin, Add Location");
    var panelMCP = INRstarV5.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel("ClientAccountContent").Panel(1).Button("New_Location").Click();
    
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------

//===============================================================================
// Log on
function Log_On(p_ctr)
{
//  try
//  {
    wa_users = new Array(11);
    wa_users[0] = "Mary";
    wa_users[1] = "hugo.searle@maplestead.com";
    wa_users[2] = "dr_jones@studale";
    wa_users[3] = "doc@prison";
    wa_users[4] = "dr_dawn@studale";
    wa_users[5] = "dr_extractv4@studale";
    wa_users[6] = "dr_tierney@studale";
    wa_users[7] = "dr_parry@studale";
    wa_users[8] = "gov@prison";
    wa_users[9] = "dr_jones@sterndale_practice";
    wa_users[10] = "pt_dawn6";
        
    wa_pwrd = new Array(11);
    wa_pwrd[0] = "INRstar_5";
    wa_pwrd[1] = "INRstar_5";
    wa_pwrd[2] = "INRstar_5";
    wa_pwrd[3] = "INRstar_5";
    wa_pwrd[4] = "Dawn6_01";
    wa_pwrd[5] = "ExtractV4_11";
    wa_pwrd[6] = "Tierney_1";
    wa_pwrd[7] = "Parry_11";
    wa_pwrd[8] = "INRstar_5";
    wa_pwrd[9] = "INRstar_5";
    wa_pwrd[10] = "INRstar_5";


    var w_system = Log_On_Where();
    
    if (w_system == "IOKO")
      var login_page = Sys.Process("iexplore", 2).Page("https://83.98.30.169/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Auto")
      var login_page = Sys.Process("iexplore", 2).Page("http://inrstar5auto/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Test")
      var login_page = Sys.Process("iexplore", 2).Page("http://192.168.16.158/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Client")
    {
       var p1 = Sys.Process("INRstarWindows");
       p1 = p1.WinFormsObject("BrowserForm");
       p1 = p1.WinFormsObject("INRstarBrowser");
       p1 = p1.WinFormsObject("Shell Embedding","");
       p1 = p1.Window("Shell DocObject View","",1);
       p1 = p1.Window("Internet Explorer_Server","",1);
       login_page = p1.Page("http://192.168.16.158/Security/Authentication/LogOn?ReturnUrl=%2f");
    }
    if (w_system == "Man")
      var login_page = Sys.Process("iexplore", 2).Page("http://inrstar5man/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Window")
      var login_page = Aliases.INRstarWindows.wndINRstar.WindowsForms10Window8app033c0d9d.ShellEmbedding.ShellDocObjectView.browser.Page("http://inrstar5auto/Security/Authentication/LogOn?ReturnUrl=%2f");

    Log_On_Sub(login_page, wa_users[p_ctr], wa_pwrd[p_ctr]);
    
//  }
//  catch(exception)
//  {
//    Log.Error("Exception", exception.description);
//  }
}
//===============================================================================
// Log on
function Log_On_User(p_user,p_pwrd)
{
//  try
//  {
    var w_system = Log_On_Where();
    
    if (w_system == "IOKO")
      var login_page = Sys.Process("iexplore", 2).Page("https://83.98.30.169/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Auto")
      var login_page = Sys.Process("iexplore", 2).Page("http://inrstar5auto/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Test")
      var login_page = Sys.Process("iexplore", 2).Page("http://192.168.16.158/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Test8050")
      var login_page = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8050/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Man")
      var login_page = Sys.Process("iexplore", 2).Page("http://inrstar5man/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Training")
      var login_page = Sys.Process("iexplore", 2).Page("https://training.inrstar.co.uk/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Window")
      var login_page = Aliases.INRstarWindows.wndINRstar.WindowsForms10Window8app033c0d9d.ShellEmbedding.ShellDocObjectView.browser.Page("http://inrstar5auto/Security/Authentication/LogOn?ReturnUrl=%2f");

//      var login_page = Sys.Process("iexplore", 2).Page("http://inrstar5testing/Authentication/LogOn?ReturnUrl=%2f");
//    var login_page = Sys.Process("iexplore", 2).Page("http://www.testingtolvaddon.com//Authentication/LogOn?ReturnUrl=%2f");

    Log_On_Sub(login_page, p_user, p_pwrd);
    
//  }
//  catch(exception)
//  {
//    Log.Error("Exception", exception.description);
//  }
}
//-------------------------------------------------------------------------------
// Log Off
function Log_Off()
{
    WaitSeconds(1,"");
    var INRstarV5 = INRstar_base();
        
    var panelHeader = INRstarV5.Panel("MainPage").Panel("header");
    var panelLoginStatus = panelHeader.Panel("logindisplay").Panel("LoginStatus");
    panelLoginStatus.Link("LogoutLink").Click();     
}
//===============================================================================
// SCSL Log on
function SCSL_Log_On()
{
    var w_system = Log_On_Where();
    
    Log.Message("About to logon as SCSL Admin, on " + w_system);
    
    login_page = SCSL_Set_login_page(w_system);
    Log.Message("Login Page set to : " + login_page);
 
    var w_user = "Mary";
    var w_pwrd = "INRstar_5";
    Log_On_Sub(login_page, w_user, w_pwrd);

    Log.Message("Just logged on as SCSL Admin");
}
//===============================================================================
// SCSL Log on User
function SCSL_Log_On_User(p_user)
{
  try
  {
    var w_system = Log_On_Where();
    
    Log.Message("About to logon as SCSL Admin");
    
    login_page = SCSL_Set_login_page(w_system);
 
    if (p_user == "Stu")
    {
      var w_user = "stu_admin@inrstar.co.uk";
      var w_pwrd = "Mary";
    }
    if (p_user == "Paul")
    {
      var w_user = "paul_admin@inrstar.co.uk";
      var w_pwrd = "Mary";
    }
    if (w_user == "")
    {
      var w_user = "Sys.Admin_SCSL@INRstar.co.uk";
      var w_pwrd = "B1Scsl_INR";
    }
    Log_On_Sub(login_page, w_user, w_pwrd);
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
      Log.Message("About to logon as SCSL Admin");
}
//===============================================================================
// SCSL Log on
function SCSL_Set_login_page(w_system)
{
  var login_page  = "";
    
    if (w_system == "IOKO")
      login_page = Sys.Process("iexplore", 2).Page("https://83.98.30.169/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Auto")
      login_page = Sys.Process("iexplore", 2).Page("http://admin.inrstar5auto/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Test")
      login_page = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8080/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Test8050")
      login_page = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8051/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Client")
    {
       var p1 = Sys.Process("INRstarWindows");
       p1 = p1.WinFormsObject("BrowserForm");
       p1 = p1.WinFormsObject("INRstarBrowser");
       p1 = p1.WinFormsObject("Shell Embedding","");
       p1 = p1.Window("Shell DocObject View","",1);
       p1 = p1.Window("Internet Explorer_Server","",1);
       login_page = p1.Page("http://inrstar5testing:8080/Security/Authentication/LogOn?ReturnUrl=%2f");
    }
    if (w_system == "Man")
      login_page = Sys.Process("iexplore", 2).Page("http://inrstar5man/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Window")
      login_page = Aliases.INRstarWindows.wndINRstar.WindowsForms10Window8app033c0d9d.ShellEmbedding.ShellDocObjectView.browser.Page("http://inrstar5man/Security/Authentication/LogOn?ReturnUrl=%2f");

      
    Log.Message (w_system + " " + login_page);    
    return login_page;  
}
//-------------------------------------------------------------------------------
// Log on Process
function Log_On_Sub(login_page, p_user,p_pwrd)
{    
//  try
  {
  
    var panelLogon = login_page.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper");
    var formLogon = panelLogon.Form("Logon");

//    // Click Disclaimer
//    formLogon.Panel("Disclaimer").Panel(0).Panel(1).RadioButton("AgreeDisclaimer").Click();
//    
    // Enter User & Password
    formLogon.Panel("LoginArea").Panel("LoginInput").Panel(0).Textbox("Username").Text = p_user;
    formLogon.Panel("LoginArea").Panel("LoginInput").Panel(1).Passwordbox("Password").Text = p_pwrd;

    Log.Message("Logging on as " + p_user);
    
    // click the button
    formLogon.Panel("LoginArea").Panel(0).SubmitButton("LoginButton").Click();    

    WaitSeconds(2);
    
  }
//  catch(exception)
//  {
//    Log.Error("Exception", exception.description);
//  }
}
//-------------------------------------------------------------------------------
// Reset Password
function reset_password(p_pwrd)
{
    var panelM = Sys.Process("iexplore", 2).Page("http://inrstar5auto/Security/Password/Expired").Panel("MainPage").Panel("main");
    var formPE = panelM.Panel("passwordExpiredPage").Panel("passwordExpiredWrapper").Form("PasswordExpired");
    formPE.Panel(0).PasswordBox("currentPassword").Text = "Password_1";
    formPE.Panel(1).PasswordBox("newPassword").Text = p_pwrd;
    formPE.Panel(2).PasswordBox("confirmPassword").Text = p_pwrd;
    
    formPE.Panel(3).SubmitButton("Update").Click();
}
//-------------------------------------------------------------------------------
// Log Off
function SCSL_Log_Off()
{
    var INRstarV5 = set_admin_system();
        
    Log.Message ("About to log off");
    var panelHeader = INRstarV5.Panel("MainPage").Panel("header");
    var panelLoginStatus = panelHeader.Panel("logindisplay").Panel("LoginStatus");
    panelLoginStatus.Link(0).Click();     
}
