//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_System_Paths
//--------------------------------------------------------------------------------

function get_client_details(name)
{
  Goto_Client(name)

  var form = admin_dash_client_details();
  var details = new Array();

  for(var i = 1; i < form.ChildCount - 1; i++)
  {
    var temp = form.Panel(i).Child(0).innerText;
    details.push(temp);
  }
  
  return details;
}