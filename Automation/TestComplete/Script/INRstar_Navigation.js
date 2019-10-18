//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Popups
//USEUNIT Navigation
//USEUNIT Navigate_Patient
//USEUNIT Navigate_Admin_Dashboard
//===============================================================================

//-----------------------------------------------------------------------------//
///////////////////////////Options/Location Management///////////////////////////
//-----------------------------------------------------------------------------//
function Goto_Manage_User(username)
{
  Goto_Options_Location_Management();
  var users_tab = location_management_users_button();
  users_tab.Click();
    
  var content_panel = location_management_main_container();
  var select_user_dropdown = content_panel.Panel(0).Select("Users").ClickItem(username);

  var button = content_panel.Panel(1).Button("ManageUser");
  button.Click();  
}
//-----------------------------------------------------------------------------//