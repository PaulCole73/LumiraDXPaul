//USEUNIT V5_Common_Popups
//USEUNIT Navigate_Patient
//USEUNIT Misc_Functions
//USEUNIT INRstar_Navigation
//===============================================================================
//-------------------------------------------------------------------------------
// Navigate to Home 
/*
function Goto_Home()
{
    // Go to Home Page
    var INRstarV5 = INRstar_base();
    Log.Message("Navigating to Home");
    var panelM = INRstarV5.Panel("MainPage");
    panelM.Panel("header").Link("HomeLink").Click();
    WaitSeconds(4,"Waiting for Home Page")
}
//===============================================================================
//-------------------------------------------------------------------------------
// Navigate to Admin 
function Goto_Options()
{
  WaitSeconds(1, "Going to Options...");

  var INRstarV5 = INRstar_base();
  var panelM = INRstarV5.Panel("MainPage");
  panelM.Panel("header").Link("OptionsLink").Click();
}  
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Navigate to Admin / IQC 
function Goto_Admin_IQC()
{
  try
  {
    Goto_Options()
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel(0).Link("IQCTab").Click();
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Navigate to Options / Location Management
function Goto_Options_Location_Management()
{
  Goto_Options(); 
  
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel(0).Link("LocationManagementTab").Click();
    
  WaitSeconds(1, "Waiting for Location Management tab...");
}
//-------------------------------------------------------------------------------
// Navigate to Options / EQC
function Goto_Options_EQC()
{
  Goto_Options(); 
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel(0).Link("EQCTab").Click();
  WaitSeconds(1, "Waiting for EQC tab...");
}
//-------------------------------------------------------------------------------
// Navigate to Options / PoCT
function Goto_Options_PoCT()
{
  Goto_Options(); 
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel(0).Link("PoCTTab").Click();
  WaitSeconds(1, "Waiting for PoCT tab...");
}
//-------------------------------------------------------------------------------
// Navigate to Options / PoCT / Edit
function Goto_Options_Edit_PoCT()
{
  Goto_Options(); 
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel(0).Link("PoCTTab").Click();
  panelMCP.Panel("AdminContent").Panel(0).Panel(0).Button("EditPoCTBatch").Click();
  WaitSeconds(1, "Waiting for edit PoCT button...");
}
//-------------------------------------------------------------------------------
// Navigate to Options / IQC / Add
function Goto_Options_Add_IQC()
{
  try
  {
    var INRstarV5 = INRstar_base();
    var panelM = INRstarV5.Panel("MainPage");
    panelM.Panel("header").Link("OptionsLink").Click();
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   
    //Click IQC
    panelMCP.Panel(0).Link("IQCTab").Click();
    
    // Go to Add IQC
    panelMCP.Panel("AdminContent").Panel("IQCWrapper").Panel(0).Button("AddIQC").Click();

    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Options / IQC / Add
function Goto_Options_Edit_IQC()
{
  try
  {
    var INRstarV5 = INRstar_base();
    var panelM = INRstarV5.Panel("MainPage");
    panelM.Panel("header").Link("OptionsLink").Click();
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   
    //Click IQC
    panelMCP.Panel(0).Link("IQCTab").Click();
    
    // Go to Edit IQC
    panelMCP.Panel("AdminContent").Panel("IQCWrapper").Table("LocationsIQCTable").Cell(1, 8).Button("EditIQC").Click();

    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Clinics
function Goto_Clinics()
{
  var panel = INRstar_base().Panel("MainPage");
  var button = panel.Panel("header").Link("ClinicsLink").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Clinics
function Goto_Add_Clinic()
{
  Goto_Clinics();
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelMCTC = panelMCP.Panel("ManageClinicsTabContent");
    
  WaitSeconds(2,"Waiting because clinics...");    
  panelMCTC.Panel(0).Button("btnAddAppointment").Click();
  WaitSeconds(3,"Waiting for new clinic form");
}
















*/













































//===============================================================================
//===============================================================================
//                          Unused Nav                                         //
//===============================================================================
//===============================================================================
// Navigate to Overdue Report
function Goto_Report_Overdue()
{
  Goto_Home();
  var INRstarV5 = INRstar_base();
    
  WaitSeconds(3,"Waiting for Home Page");
    
  //WaitSeconds(8,"Waiting for Overdue Report");
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   
  //Open the overdue report list
  panelUCR.Link("OverduePatientHeaderLink").Click();
  WaitSeconds(2,"Opening Overdue Report");
    
  var w_stem = panelUCR.Panel("OverduePatients");
  
  return w_stem; 
}
//-------------------------------------------------------------------------------
// Navigate to Overdue Report
function Goto_Report_Overdue_NOAC_Review(INRstarV5)
{
    Goto_Home(INRstarV5);
    
    WaitSeconds(8,"Waiting for Home Page");
    
//    WaitSeconds(8,"Waiting for Overdue Report");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   
   // Open the overdue report list
   panelUCR.Link("OverdueReviewPatientHeaderLink").Click();
    WaitSeconds(8,"Opening non-warfarin Overdue Report");
    
  var w_stem = panelUCR.Panel("OverduePatients");

  return w_stem; 
}
//-------------------------------------------------------------------------------
// Navigate to No Diagnosis Report
function Goto_Report_No_Diagnosis(INRstarV5)
{
  try
  {
    Goto_Home();
    
    WaitSeconds(10,"Waiting for Home Page");
    
    WaitSeconds(8,"Waiting for No Diagnosis Report");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   
   // Open the overdue report list
   panelUCR.Link("PatientsWithNoDiagnosisHeaderLink").Click();
    WaitSeconds(10,"Opening No Diagnosis Report");
    
   Log.Message("Opened list of No Diagnosis patients");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Reports
function Goto_Reports()
{
    var INRstarV5 = INRstar_base();
    var panelM = INRstarV5.Panel("MainPage");
    panelM.Panel("header").Link("ReportLink").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Admin / Settings 
function Goto_Admin_Settings()
{
  try
  {
    Goto_Options(); 
  
    var INRstarV5 = INRstar_base();
        
    // Go to Admin Settings tab Page
    Log.Message("Navigating to Admin, Settings");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel(0).Link("SectionSettingsTab").Click();
    
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Admin / Settings / Algorithm
function Goto_Admin_Settings_Algorithm()
{
  try
  {
    Goto_Admin_Settings(); 
  
    var INRstarV5 = INRstar_base();
        
    // Go to Algorithm Pane
    Log.Message("Navigating to Admin, Settings, Algorithm");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel("AdminContent").Panel("LocationSettings").Link(0).Click();
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Navigate to Admin / Settings / Dose Rounding
function Goto_Admin_Settings_Dose_Rounding()
{
  try
  {
    Goto_Admin_Settings(); 
  
    var INRstarV5 = INRstar_base();
        
    // Go to Algorithm Pane
    Log.Message("Navigating to Admin, Settings, Dose Rounding");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel("AdminContent").Panel("LocationSettings").Link(2).Click();
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Admin / Settings / Tablets
function Goto_Admin_Settings_Tablets()
{
  try
  {
    Goto_Admin_Settings(); 
  
    var INRstarV5 = INRstar_base();
        
    // Go to Algorithm Pane
    Log.Message("Navigating to Admin, Settings, Tablets");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel("AdminContent").Panel("LocationSettings").Link(20).Click();
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Options / Clinicians 
function Goto_Options_Clinicians()
{
  try
  {
    Goto_Options(); 
  
    var INRstarV5 = INRstar_base();
        
    // Go to Admin Clinicians
    Log.Message("Navigating to Admin, Clinicians");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel(0).Link("SectionDoctorsTab").Click();
    
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Admin / NPT Batch 
function Goto_Admin_NPT_Batch()
{
  try
  {
    Goto_Options(); 
  
    var INRstarV5 = INRstar_base();
        
    // Go to Admin NPT tab Page
    Log.Message("Navigating to Admin, NPT");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel(0).Link("PoCTTab").Click();
    
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Admin / IQC / Add
function Goto_Admin_IQC_Add()
{
  try
  {
    Goto_Admin_IQC(); 
  
    var INRstarV5 = INRstar_base();
        
    // Go to Admin NPT tab Page
    Log.Message("Navigating to Admin, IQC, Add");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelABC = panelMCP.panel("AdminContent").panel("IqcWrapper").panel("ActionButtonContainer");
    panelABC.Panel(0).Link("IQCTab").Click();
    
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Options / PoCT
function Goto_Options_add_PoCT()
{
  try
  {
    Goto_Options(); 
    var INRstarV5 = INRstar_base();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    
    panelMCP.Panel(0).Link("PoCTTab").Click();
    panelMCP.Panel("AdminContent").Panel(0).Panel(1).Button("AddPoCTBatch").Click();

    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Options / Letter Management / New
/*function Goto_Options_Letter_Management()
{
  try
  {
    Goto_Options(); 
  
    var INRstarV5 = INRstar_base();
        
    // Go to Admin NPT tab Page
    Log.Message("Navigating to Admin, NPT");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel(0).Link("LetterManagementTab").Click();
    
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}*/
//-------------------------------------------------------------------------------
// Navigate to Options / Audit Trail
function Goto_Options_Audit()
{
  try
  {
    Goto_Options(); 
  
    var INRstarV5 = INRstar_base();
        
    // Go to Options / Audit tab Page
    Log.Message("Navigating to Options / Audit");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel(0).Link("AuditTab").Click();
        
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//===============================================================================
//-------------------------------------------------------------------------------
// Navigate to Options / Location Management / Manage Location
function Goto_Manage_Location_Add_User(p_location)
{
  try
  {
//    Goto_Manage_Location_Manage_User(p_location) 
  
    var INRstarV5 = INRstar_base();
        
    // Go to Admin Settings tab Page
    Log.Message("Navigating to Admin, Manage User");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelAC = panelMCP.Panel(0).Panel("AdminContent");
    var panelLC = panelAC.Panel("LocationContent");
    // click on Add User button
    panelLC.Panel(0).Panel("LocationTab").Panel("LocationTabContent").Panel(1).Button("AddNewUser").Click();
//    panelLC.Panel(0).Panel("LocationTabContent").Fieldset(0).Panel(1).Button("AddNewUser").Click();
    
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Options / Location Management / Manage Location
function Goto_Manage_Location_User_Permissions(p_location, p_user)
{
  try
  {
    Goto_Manage_Location_Manage_User(p_location) 
  
    var INRstarV5 = INRstar_base();
        
    // Go to Admin Settings tab Page
    Log.Message("Navigating to Admin, Manage User Permissions");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelAC = panelMCP.Panel(0).Panel("AdminContent");
    var panelLTC = panelAC.Panel("LocationContent").Panel(0).Panel("LocationTab").Panel("LocationTabContent");
    // Select User
    panelLTC.Panel(0).Select("Users").ClickItem(p_user);
    // Click Manage User button
    panelLTC.Panel(1).Button("ManageUser").Click();
    // Roles & Permissions
    panelLTC.Panel("UserContent").Fieldset(0).Panel("UserAdmin").Link("UserAuthorisationLink").Click();
    
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//===============================================================================
//===============================================================================
//-------------------------------------------------------------------------------
// Navigate to Admin / Location Management / Users / Add User
function Goto_Add_User()
{
  try
  {
    Goto_Options_Location_Management(); 
  
    var INRstarV5 = INRstar_base();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelLC = panelMCP.Panel("AdminContent").Panel("LocationContent").Panel(0);
    
    // Click on Users tab
    Log.Message("Navigating to Users");
    panelLC.Panel("LocationTab").Link("LocationUsersLink").Click();
        
    // Click the Add User button
    panelLC.Panel("LocationTabContent").Panel(1).Button("AddNewUser").Click();
    
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Admin / User Management / Select Location / Select User / Roles & Perms
function Goto_Add_Permission(p_location, p_user)
{
  try
  {
    Goto_Manage_Location_Manage_User(p_location) 
  
   var INRstarV5 = INRstar_base();
        
    // Go to Admin Settings tab Page
    Log.Message("Navigating to Add Permissions");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelAC2 = panelMCP.Panel(0).Panel("AdminContent").Panel("AdminContent");
    // Choose the location 
    panelAC2.fieldset(0).Panel(0).Select("ChildSections").ClickItem(p_location);
    
    var panelLUC = panelAC2.Panel("LocationsUsersContainer");
    // Choose the User
    panelLUC.Fieldset(0).Panel(0).Select("Users").ClickItem(p_user);
    // Click on the Role & Permissions Tab
    panelLUC.Panel("UserAccountContainer").Fieldset(0).Panel("UserAdmin").Link("UserRolesAndPermissionsLink").Click();
    
    
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Admin / User Management / Select Location / Select User / Roles & Perms
function Goto_Local_Add_Permission(p_location, p_user)
{
  try
  {
    Goto_Location_Management(); 
  
    var INRstarV5 = INRstar_base();
        
    // Go to Admin Settings tab Page
    Log.Message("Navigating to Admin, Select Location");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelAC2 = panelMCP.Panel(0).Panel("AdminContent").Panel("AdminContent");
    
    var panelLUC = panelAC2.Panel("LocationsUsersContainer");
    // Choose the User
    panelLUC.Fieldset(0).Panel(0).Select("Users").ClickItem(p_user);
    // Click on the Role & Permissions Tab
    panelLUC.Panel("UserAccountContainer").Fieldset(0).Panel("UserAdmin").Link("UserRolesAndPermissionsLink").Click();
    
    
    WaitSeconds(1,"");
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//===============================================================================
// Log on
function Log_On(p_ctr)
{
    wa_users = new Array(12);
    wa_users[0] = "";
    wa_users[1] = "";
    wa_users[2] = "";
    wa_users[3] = "";
    wa_users[4] = "";
    wa_users[5] = "";
    wa_users[6] = "";
    wa_users[7] = "";
    wa_users[8] = "";
    wa_users[9] = "";
    wa_users[10] = "";
    wa_users[11] = "";
        
    wa_pwrd = new Array(12);
    wa_pwrd[0] = "";
    wa_pwrd[1] = "";
    wa_pwrd[2] = "";
    wa_pwrd[3] = "";
    wa_pwrd[4] = "";
    wa_pwrd[5] = "";
    wa_pwrd[6] = "";
    wa_pwrd[7] = "";
    wa_pwrd[8] = "";
    wa_pwrd[9] = "";
    wa_pwrd[10] = "";
    wa_pwrd[11] = "";

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
}
//===============================================================================
// Log on
function Log_On_User(p_user,p_pwrd)
{
    var w_system = Log_On_Where();
//    var login_page  = "ERROR!";
    
    if (w_system == "Client")
    {
//       var p1 = Sys.Process("INRstarWindows");
//       p1 = p1.WinFormsObject("BrowserForm");
//       p1 = p1.WinFormsObject("INRstarBrowser");
//       p1 = p1.WinFormsObject("Shell Embedding","");
//       p1 = p1.Window("Shell DocObject View","",1);
//       p1 = p1.Window("Internet Explorer_Server","",1);
//       Log.Message(p1);
//      var login_page = p1.Page("http://scsl.inrstar.test/Security");
         var page = Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding","").Window("Shell DocObject View","",1).Window("Internet Explorer_Server","",1).Page("http://scsl.inrstar.test/Security/Authentication/LogOn?ReturnUrl=%2f")
 //        Log.Message(page);
         var p1 = Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding","").Window("Shell DocObject View","",1).Window("Internet Explorer_Server","",1).Page("http://scsl.inrstar.test/Security/Authentication/LogOn?ReturnUrl=%2f");
//         Log.Message(p1);
         var login_page = p1;

    }
    if (w_system == "AuditClient")
    {
       var p1 = Sys.Process("INRstarWindows");
       p1 = p1.WinFormsObject("BrowserForm");
       p1 = p1.WinFormsObject("INRstarBrowser");
       p1 = p1.WinFormsObject("Shell Embedding","");
       p1 = p1.Window("Shell DocObject View","",1);
       p1 = p1.Window("Internet Explorer_Server","",1);
                var login_page = p1.Page("http://192.168.16.158:8050/Security/Authentication/LogOn?ReturnUrl=%2f");
    }
    if (w_system == "IOKO")
                 var login_page = Sys.Process("iexplore", 2).Page("https://83.98.30.169/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Auto")
                 var login_page = Sys.Process("iexplore", 2).Page("http://inrstar5auto/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Test")
                 var login_page = Sys.Process("iexplore", 2).Page("http://192.168.16.158/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Test8050")
                 var login_page = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8050/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Man")
                var  login_page = Sys.Process("iexplore", 2).Page("http://inrstar5man/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Training")
                 var login_page = Sys.Process("iexplore", 2).Page("https://training.inrstar.co.uk/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Window")
                var  login_page = Aliases.INRstarWindows.wndINRstar.WindowsForms10Window8app033c0d9d.ShellEmbedding.ShellDocObjectView.browser.Page("http://inrstar5auto/Security/Authentication/LogOn?ReturnUrl=%2f");

//      var login_page = Sys.Process("iexplore", 2).Page("http://inrstar5testing/Authentication/LogOn?ReturnUrl=%2f");
//    var login_page = Sys.Process("iexplore", 2).Page("http://www.testingtolvaddon.com//Authentication/LogOn?ReturnUrl=%2f")

//    if (login_page == "ERROR!")
//          Log.Error("Something's wrong!");
          
    Log_On_Sub(login_page, p_user, p_pwrd);
}
//-------------------------------------------------------------------------------
// Log Off 
/*
function Log_Off()
{
    WaitSeconds(1, "Waiting for Log Off button...");
    var INRstarV5 = INRstar_base();
    var panelHeader = INRstarV5.Panel("MainPage").Panel("header");
    var panelLoginStatus = panelHeader.Panel("logindisplay").Panel("LoginStatus");
    panelLoginStatus.Link("LogoutLink").Click();     
}
*/
//-------------------------------------------------------------------------------
// Log on Process
function Log_On_Sub(login_page, p_user, p_pwrd)
{    

//    Log.Message(login_page, p_user, p_pwrd);
          
    var panelLogon = login_page.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper");
    var formLogon = panelLogon.Form("Logon");

//    // Click Disclaimer
//    formLogon.Panel("Disclaimer").Panel(0).Panel(1).RadioButton("AgreeDisclaimer").Click();
//    
    // Enter User & Password
    formLogon.Panel("LoginArea").Panel("LoginInput").Panel(0).Textbox("Username").Text = p_user;
    formLogon.Panel("LoginArea").Panel("LoginInput").Panel(1).Passwordbox("Password").Text = p_pwrd;
    
    // click the button
    formLogon.Panel("LoginArea").Panel(0).SubmitButton("LoginButton").Click();    

    WaitSeconds(2);
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
//===============================================================================
function Select_Overdue_Patient(w_name)
{
  var INRstarV5 = INRstar_base();
  var w_pt_link = INRstarV5.NativeWebObject.Find("innerText", w_name);
  if (w_pt_link.Exists == false)
  {
         Log.Warning("'" + w_hdg + "' link not displayed");
  }
  else
  {
         w_pt_link.Click();
  }
}