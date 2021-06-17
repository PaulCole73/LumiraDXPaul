//USEUNIT Admin_Dash_System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function Goto_Client_Location_Users(name)
{
  Goto_Client(name);
  WaitSeconds(1, "Waiting for client details...");
  admin_dash_location_tabs().Link("LocationAdministratorTab").Click();
  WaitSeconds(1, "Waiting for users tab...");
}