//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//------------------------------------------------------------------------
////////////////////////////  Admin Dashboard  ///////////////////////////
//------------------------------------------------------------------------
//------------------------------------------------------------------------
function admin_dash_base()
{
  set_admin_dash_url();
  var main = Sys.Browser("iexplore").Page(admin_dash_url);
  return main;
}
//------------------------------------------------------------------------
function admin_dash_login_base()
{
  set_admin_dash_url();
  var main = Sys.Browser("iexplore").Page(admin_dash_url + "Security/Authentication/LogOn?ReturnUrl=%2f");
  return main;
}
//------------------------------------------------------------------------
function admin_dash_username_login()
{
  var base = admin_dash_login_base();
  var logon_form = base.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon");
  var textbox = logon_form.Panel("LoginArea").Panel("LoginInput").Panel(0).Textbox("Username");
  
  return textbox;
}
//------------------------------------------------------------------------
function admin_dash_password_login()
{
  var base = admin_dash_login_base();
  var logon_form = base.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon");
  var pass_box = logon_form.Panel("LoginArea").Panel("LoginInput").Panel(1).PasswordBox("Password");
  
  return pass_box;
}
//------------------------------------------------------------------------
function admin_dash_login_button()
{
  var base = admin_dash_login_base();
  var logon_form = base.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon");
  var button = logon_form.Panel("LoginArea").Panel(0).SubmitButton("LoginButton");
  
  return button;
}
//------------------------------------------------------------------------
function admin_dash_logoff_button()
{
  var base = admin_dash_base();
  var link = base.Panel("MainPage").Panel("header").Panel("logindisplay").Panel("LoginStatus").Link(0);
  
  return link;
}
//------------------------------------------------------------------------
function admin_dash_navigation()
{
  var base = admin_dash_base();
  var nav = base.Panel("MainPage").Fieldset("DashboardContent").Panel(0).Panel("navigation")
  
  return nav;
}
//------------------------------------------------------------------------
function admin_dash_new_client_button()
{
  var base = admin_dash_base();
  var panel = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
  var button = panel.Panel(1).Panel(0).Button("New_Client");
  
  return button;
}
//------------------------------------------------------------------------
function admin_dash_search_client_box()
{
  var base = admin_dash_base();
  var search_box = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel").Panel(0).Panel(0).Textbox("searchbox")
  
  return search_box;
}
//------------------------------------------------------------------------
function admin_dash_new_client_form()
{
  var base = admin_dash_base();
  var form = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel").Fieldset(0).Form("NewClientForm");
  
  return form;
}
//------------------------------------------------------------------------
function admin_dash_edit_client_form()
{
  var edit_page = admin_dash_client_details();
  var form = edit_page.Fieldset(0).Form("EditClientForm");
  
  return form;
}
//------------------------------------------------------------------------
function admin_dash_add_location_admin_form()
{
  var base = admin_dash_base();
  var content = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel")
}
//------------------------------------------------------------------------
function admin_dash_client_details()
{
  var base = admin_dash_base();
  var panel = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel")
  var container = panel.Panel("ClientAccountContent");
  
  return container;
}
//------------------------------------------------------------------------
function admin_dash_location_details()
{
  var base = admin_dash_client_details();
  var panel = base.Panel("LocationTabContent").Panel("ManageLocationsTabContent");
  
  return panel;
}
//------------------------------------------------------------------------
function admin_dash_location_admin_form()
{
  var base = admin_dash_client_details();
  var form = base.Panel("LocationTabContent").Panel("ManageLocationsTabContent").Panel("AddAdministratorWrapper").Form("AddLocationUser");
  
  return form;
}
//------------------------------------------------------------------------
function admin_dash_edit_location_admin_form()
{
  var base = admin_dash_location_details();
  var form = base.Panel("EditLocationAdmin").Form("EditLocationAdministrator");
  
  return form;
}
//------------------------------------------------------------------------
function admin_dash_account_tabs()
{
  var base = admin_dash_base();
  var tabs = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel").Panel("AccountTabs");
  
  return tabs;
}
//------------------------------------------------------------------------
function admin_dash_location_tabs()
{
  var base = admin_dash_base();
  var tabs = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
  var location = tabs.Panel("ClientAccountContent").Panel("LocationTabContent").Panel("LocationTabs");
  
  return location;
}
//------------------------------------------------------------------------
function admin_dash_add_user_form()
{
  var base = admin_dash_base();
  var panel = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
  var form = panel.Panel("ClientAccountContent").Panel("AddAdministratorWrapper").Form("AddAdministrator");
  
  return form;
}
//------------------------------------------------------------------------
function admin_dash_account_leads_table()
{
  var base = admin_dash_base();
  var panel = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
  var table = panel.Panel("ClientAccountContent").Table("AccountClinicalLeadsTable");
  
  return table;
}
//------------------------------------------------------------------------
function admin_dash_new_location_form()
{
  var base = admin_dash_client_details();
  var form = base.Panel("LocationTabContent").Fieldset(0).Form("NewLocationForm");
  
  return form;
}
//------------------------------------------------------------------------
function admin_dash_audit_table()
{
  var base = admin_dash_base();
  var panel = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
  var table = panel.Panel("TreatmentAuditTrailWrapper").Table("AuditTrailTable");
  
  return table;
}
//------------------------------------------------------------------------
function admin_dash_feedback_table()
{
  var base = admin_dash_base();
  var panel = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
  var table = panel.Form("FeebackForm").Table("AllUserFeedbackTable");
  
  return table;
}
//------------------------------------------------------------------------
function admin_dash_important_info_panel()
{
  var base = admin_dash_base();
  var panel = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel").Panel("ImportantInfoWrapper");
  
  return panel;
}
//------------------------------------------------------------------------
function admin_dash_important_info_form()
{
  var base = admin_dash_base();
  var main = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main");
  var form = main.Panel("MainContentPanel").Panel("InfoContainer").Form("InfoForm");
  
  return form;
}
//------------------------------------------------------------------------
function admin_dash_banner_message()
{
  var base = admin_dash_base();
  var panel = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel").Panel("SiteInforWrapper");
  
  return panel;
}
//------------------------------------------------------------------------
function admin_dash_banner_message_form()
{
  var base = admin_dash_base();
  var form = base.Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel").Panel("NewsContainer").Form("NewsForm");
  
  return form;
}