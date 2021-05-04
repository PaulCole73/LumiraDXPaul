//USEUNIT Admin_Dash_System_Paths
//USEUNIT System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Popup_Handlers
//--------------------------------------------------------------------------------

function add_a_new_user(client_name, user_level)
{
  if(user_level == "org clinical")
  {
    Goto_Client_Users(client_name);
    admin_dash_client_details().Panel(0).Button("Add").Click();
  
    var form = admin_dash_add_user_form();
  
    var val = get_unique_number();
    var username = val + "@regression";
    var password = get_login_details(21);
  
    form.Panel(0).Textbox("FullName").innerText = username;
    form.Panel(1).Textbox("Username").innerText = username;
    form.Panel(2).PasswordBox("Password").innerText = password;
    form.Panel(3).PasswordBox("ConfirmPassword").innertext = password;
  
    form.Panel(4).SubmitButton("Add").Click();
    WaitSeconds(2, "Waiting for add user...");
  }
  else if(user_level = "location admin")
  {
    Goto_Client_Location_Users(client_name);
    admin_dash_location_details().Panel(0).Button("Add").Click();
    
    var form = admin_dash_location_admin_form();
    
    var val = get_unique_number();
    var username = val + "@regression";
    var password = get_login_details(21);
    
    form.Panel(0).Textbox("FullName").innerText = username;
    form.Panel(1).Textbox("Username").innerText = username;
    form.Panel(2).PasswordBox("Password").innerText = password;
    form.Panel(3).PasswordBox("ConfirmPassword").innertext = password;
  
    form.Panel(4).SubmitButton("Add").Click();
    WaitSeconds(2, "Waiting for add user...");
  }
  
  return username;
}