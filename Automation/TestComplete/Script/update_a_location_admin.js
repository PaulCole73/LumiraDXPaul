//USEUNIT Admin_Dash_System_Paths
//USEUNIT System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Popup_Handlers
//--------------------------------------------------------------------------------

function update_a_location_admin(client_name, username, edit_type, edit_fullname, edit_username)
{
  Goto_Client_Location_Users(client_name);
  var table = admin_dash_location_details().Table("AccountAdministratorsTable");
  var user_index;
  
  for(var i = 1; i < table.RowCount; i++)
  {
    var temp = table.cell(i, 1).innerText;
    if(temp == username)
    {
      user_index = i;
    }
  }
  
  if(edit_type == "edit")
  {
    table.cell(user_index, 2).Button("Edit").Click();
    admin_dash_edit_location_admin_form().Panel(0).Textbox("UpdatedFullName").innerText = edit_fullname;
    admin_dash_edit_location_admin_form().Panel(1).Textbox("UpdatedUsername").innerText = edit_username;
    
    admin_dash_edit_location_admin_form().Panel(2).SubmitButton("Save").Click();
  }
  else if(edit_type == "reset password")
  {
    table.cell(user_index, 2).Button("Reset_Password").Click();
    process_admin_dash_popup("Confirmation Required", "Confirm");
    var text = process_admin_dash_popup("Reset Password", "OK");
    
    var words = new Array();
    words = text.split(" ");
    
    text = words[8];
    return text;
  }
  else if(edit_type == "remove")
  {
    table.cell(user_index, 2).Button("DeleteAdministrator").Click();
    process_admin_dash_popup("Confirmation Required", "Confirm");
  }
}