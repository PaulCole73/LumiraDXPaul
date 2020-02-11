//USEUNIT Admin_Dash_System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function Goto_Client(name)
{
  admin_dash_navigation().Link("AccountManagementLink").Click();
  WaitSeconds(3, "Waiting for account management tab...");
  
  admin_dash_search_client_box().text = name;
  admin_dash_search_client_box().Keys("[F2]");
  WaitSeconds(3, "Waiting for search box...");
  
  if(name == "St. O'  455 & QRNR Prison")
  {
    name = "St. O' 455 & QRNR Prison";
  }
  
  var counter = 0;
  var is_object_matching = false;
  do
  {
    admin_dash_base().Refresh();
    var obj = admin_dash_base().FindChild("Name", "Link(" + counter + ")", 0); 
    if(obj.Exists)
    {
      var temp = new Array();
      var temp_text = obj.innerText;
      temp = temp_text.split("\r\n");
      
      if(temp[0] == name)
      {
        obj.Click();
        is_object_matching = true;
        break;
      }
    }
    else
    {
      break;
    }
    counter++;
  }
  while(is_object_matching == false);
}
//--------------------------------------------------------------------------------
function Goto_Client_Location(client_name, location_name)
{
  Goto_Client_Locations(client_name);
  var list = admin_dash_client_details().Panel(0).Select("Locations");
  var is_location_in_list = false;
  
  for(var i = 1; i < list.wItemCount; i++)
  {
    if(list.wItem(i) == location_name)
    {
      list.ClickItem(i);
      is_location_in_list = true;
      break;
    }
  }
  
  if(is_location_in_list == false)
  {
    return false;
  }
  else
  {
    return true;
  }
}
//--------------------------------------------------------------------------------
function Goto_Client_Users(name)
{
  Goto_Client(name);
  WaitSeconds(1, "Waiting for client details...");
  admin_dash_account_tabs().Link("AccountAdministratorTab").Click();
  WaitSeconds(1, "Waiting for users tab...");
}
//--------------------------------------------------------------------------------
function Goto_Client_Location_Users(name)
{
  Goto_Client(name);
  WaitSeconds(1, "Waiting for client details...");
  admin_dash_location_tabs().Link("LocationAdministratorTab").Click();
  WaitSeconds(1, "Waiting for users tab...");
}
//--------------------------------------------------------------------------------
function Goto_Client_Locations(name)
{
  Goto_Client(name);
  WaitSeconds(1, "Waiting for client details...");
  admin_dash_account_tabs().Link("AccountLocationsTab").Click();
  WaitSeconds(1, "Waiting for locations tab...");
}
//--------------------------------------------------------------------------------
function Goto_Feedback()
{
  admin_dash_navigation().Link("ViewFeedbackLink").Click();
}
//--------------------------------------------------------------------------------
function Goto_Important_Information()
{
  admin_dash_navigation().Link("ImportInfoLink").Click();
}
//--------------------------------------------------------------------------------
function Goto_Banner_Message()
{
  admin_dash_navigation().Link("SiteInfoLink").Click();
}