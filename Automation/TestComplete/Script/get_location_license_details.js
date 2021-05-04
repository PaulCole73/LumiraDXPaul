//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_System_Paths
//--------------------------------------------------------------------------------

function get_location_license_details(client_name, location_name)
{
  Goto_Client_Location(client_name, location_name);
  admin_dash_client_details().Panel(1).Button("ManageLocation").Click();
  admin_dash_location_tabs().Link("LocationLicenceLink").Click();
  var details = new Array();
  
  for(var i = 0; i < 5; i++)
  {
    var temp = admin_dash_location_details().Panel(i).Child(0).innerText;
    Log.Message(temp);
    details.push(temp);
  }
  
  return details;
}