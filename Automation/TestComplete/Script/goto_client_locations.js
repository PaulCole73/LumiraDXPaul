//USEUNIT Admin_Dash_System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function Goto_Client_Locations(name)
{
  Goto_Client(name);
  WaitSeconds(1, "Waiting for client details...");
  admin_dash_account_tabs().Link("AccountLocationsTab").Click();
  WaitSeconds(1, "Waiting for locations tab...");
}