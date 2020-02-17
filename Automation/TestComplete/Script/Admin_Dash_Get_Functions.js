//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_System_Paths
//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT TSA_AD_Account_Management
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
//--------------------------------------------------------------------------------
function get_audit_entry_admin_dash(audit_item)
{
  wait_for_object(admin_dash_navigation(), "idStr", "ViewAuditTrailLink", 1);
  admin_dash_navigation().Link("ViewAuditTrailLink").Click();

  var table = admin_dash_audit_table();
  var text = table.Cell(audit_item, 1).innerText;
  WaitSeconds(2, "Waiting for audit value...");
  
  return text;
}
//--------------------------------------------------------------------------------
function get_parent_client_name()
{
  var name;
  
  if(environment == "INRstarWindowsStaging")
  {
    name = "0433117D";
  }
  else
  {
    name = "St. O'  455 & QRNR Prison";
  }
  
  return name;
}
//--------------------------------------------------------------------------------
function get_feedback(item_index)
{
  Goto_Feedback();
  var table = admin_dash_feedback_table();
  var data = new Array();
  
  if(table.Cell(1, 0).innerText != "There is no new feedback to review.")
  {
    for(var i = 0; i < 3; i++) //getting the first 3 entries from a feedback item, these can be validated against
    {
      var temp = table.Cell(item_index, i).innerText;
      data.push(temp);
    }
  }
  else
  {
    data.push("", "", "");
  }
  
  return data;
}
//--------------------------------------------------------------------------------
function get_banner_message()
{
  Goto_Banner_Message();
  var text = admin_dash_banner_message().Label("News_DetachedLabel").innerText;
  
  return text;
}