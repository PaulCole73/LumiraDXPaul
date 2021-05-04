//USEUNIT Admin_Dash_System_Paths
//USEUNIT System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Popup_Handlers
//--------------------------------------------------------------------------------

function update_a_user(client_name, username, edit_type)
{
  Goto_Client_Users(client_name);
  var table = admin_dash_account_leads_table();
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
  }
  else if(edit_type == "reset password")
  {
    table.cell(user_index, 2).Button("Reset_Password").Click();
    wait_for_object(admin_dash_base(), "idStr", "modalDialogBox", 2);
    process_admin_dash_popup("Confirmation Required", "Confirm");
    wait_for_object(admin_dash_base(), "idStr", "modalDialogBox", 2);
    var text = process_admin_dash_popup("Reset Password", "OK");
    
    var words = new Array();
    words = text.split(" ");
    
    text = words[8];
    return text;
  }
  else if(edit_type == "remove")
  {
    table.cell(user_index, 2).Button("DeleteClinicalLead").Click();
    process_admin_dash_popup("Confirmation Required", "Confirm");
  }
}