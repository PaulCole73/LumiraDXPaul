//USEUNIT Admin_Dash_System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function Goto_Client(name)
{
  admin_dash_navigation().Link("AccountManagementLink").Click();
  WaitSeconds(3, "Waiting for account management tab...");
  
  admin_dash_search_client_box().Text = name;
  //admin_dash_search_client_box().Keys("[F2]");
  admin_dash_search_client_box().Keys(" ");
  admin_dash_search_client_box().Keys("[BS]");
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
    admin_dash_search_client_box().Keys("[F2]");
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