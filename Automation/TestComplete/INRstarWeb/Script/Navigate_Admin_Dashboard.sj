//USEUNIT Common
//USEUNIT V5_Common
//===============================================================================
// SCSL Log on
function SCSL_Log_On()
{
    var w_system = Log_On_Where();
    
    Log.Message("About to logon as SCSL Admin, on " + w_system);
    
    login_page = SCSL_Set_login_page(w_system);
    Log.Message("Login Page set to : " + login_page);
 
    var w_user = "stu_admin@inrstar.co.uk";
    var w_pwrd = "Mary";
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
// Log Off
function SCSL_Log_Off()
{
    var INRstarV5 = set_admin_system();
        
    Log.Message ("About to log off");
    var panelHeader = INRstarV5.Panel("MainPage").Panel("header");
    var panelLoginStatus = panelHeader.Panel("logindisplay").Panel("LoginStatus");
    panelLoginStatus.Link(0).Click();     
}
//===============================================================================

//-------------------------------------------------------------------------------
// Navigate to New Client
function Goto_New_Client()
{
    var INRstarV5 = set_admin_system();

    Log.Message("Navigating to New Client");
    panel = INRstarV5.Panel("MainPage");
    fieldsetDC = panel.Fieldset("DashboardContent");
    // Click on Account Management
    fieldsetDC.Panel(0).Panel("navigation").Link("AccountManagementLink").Click();
    // Click on New client
    fieldsetDC.Panel("main").Panel("MainContentPanel").Panel(1).Button("New_Client").Click();
    
}
//-------------------------------------------------------------------------------
// Navigate to Client List
function Goto_Client_List()
{
  try
  {
    var INRstarV5 = set_admin_system();

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
function Goto_View_Client(p_client)
{
    var INRstarV5 = set_admin_system();

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
function Goto_Add_Org_Clincial_Lead()
{
  try
  {
    var INRstarV5 = set_admin_system();

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
function Goto_Locn_Licence(p_client)
{
  try
  {
    var INRstarV5 = set_admin_system();

    Goto_Manage_Location(p_client);
    
    Log.Message("Navigating to Add Administrator");
    panel = INRstarV5.Panel("MainPage");
    fieldsetDC = panel.Fieldset("DashboardContent");
    panelMCP = fieldsetDC.Panel("main").Panel("MainContentPanel");
    panelLTC = panelMCP.Panel("ClientAccountContent").Panel("LocationTabContent");
    // click on the Users Tab
    panelLTC.Panel("LocationTabs").Link("LocationLicenceLink").Click();
    // click on the Add button
    panelLTC.Panel("ManageLocationsTabContent").Panel(6).Button("EditLocationLicenceLink").Click();
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Add Location Administrator
function Goto_Add_Locn_Administrator(p_client)
{
  try
  {
    var INRstarV5 = set_admin_system();

    Goto_Manage_Location(p_client);
    
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
function Goto_Manage_Location(p_locn)
{
    var INRstarV5 = set_admin_system();

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
// Navigate to Client / Locations / New Location
function Goto_New_Location()
{
  try
  {
    //Goto_Location_Management(); 
  
    var INRstarV5 = set_admin_system();
        
    // Go to Admin Settings tab Page
    Log.Message("Navigating to Admin, New Location");
    var panelMCP = INRstarV5.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    // click locations tab
    panelMCP.Panel("AccountTabs").Link("AccountLocationsTab").Click();
    // click New button
    panelMCP.Panel("ClientAccountContent").Panel(1).Button("New_Location").Click();
    
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to SCSL / Location Management
function Goto_Location_Management()
{
  try
  {
    WaitSeconds(2,"Navigating to Admin, Location Management");

    var INRstarV5 = set_admin_system();
        
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
function Goto_Add_Location()
{
  try
  {
    Goto_Location_Management(); 
  
    var INRstarV5 = set_admin_system();
        
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
// Navigate to Admin / Location Management / Manage Location
function Goto_Manage_Location_Manage_User(p_location)
{
  try
  {
    Goto_Options_Location_Management(p_location); 
  
    var INRstarV5 = set_admin_system();

    // Go to Admin Settings tab Page
    Log.Message("Navigating to Admin, Add Location User");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelAC = panelMCP.Panel(0).Panel("AdminContent");
    var panelLC = panelAC.Panel("LocationContent");
    // click on User Tab
    panelLC.Panel(0).Panel("LocationTab").Link("LocationUsersLink").Click();
//    panelLC.Panel("LocationTab").Link("LocationUsersLink").Click();
    
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
