//USEUNIT Admin_Dash_System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
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