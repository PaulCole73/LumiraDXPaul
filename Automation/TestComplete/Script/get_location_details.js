//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_System_Paths
//--------------------------------------------------------------------------------

function get_location_details(client_name, location_name, amount_of_details)
{
  Goto_Client_Location(client_name, location_name);
  admin_dash_client_details().Panel(1).Button("ManageLocation").Click();
  var form = admin_dash_location_details();
  var details = new Array();
  
  if(amount_of_details == null || amount_of_details == "full")
  {
    for(var i = 0; i < form.ChildCount - 3; i++)
    {
      var temp = form.Panel(i).Child(0).innerText;
      details.push(temp);
    }
  }
  else if(amount_of_details == "editable");
  {
    for(var i = 0; i < form.ChildCount - 3; i++)
    {
      if(i == 0 || i == 2 || i == 4 || i == 5)
      {
        
      }
      else
      {
        var temp = form.Panel(i).Child(0).innerText;
        details.push(temp);
      }
    }
  }
  
  Log.Message(details);
  return details;
}