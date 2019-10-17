//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT V5_Common_Batch
//--------------------------------------------------------------------------------
function manage_user(username)
{
  Goto_Options_Location_Management();
  var users_tab = location_management_users_button();
  users_tab.Click();
    
  var content_panel = location_management_main_container();
  var select_user_dropdown = content_panel.Panel(0).Select("Users").ClickItem(username);

  var button = content_panel.Panel(1).Button("ManageUser");
  button.Click();  
}
//--------------------------------------------------------------------------------
function add_new_user(u_firstname, u_surname, u_username, u_password)
{
  Goto_Options_Location_Management();
  var users_tab = location_management_users_button();
  users_tab.Click();
    
  var content_panel = location_management_main_container();
  var add_user_button = content_panel.Panel(1).Button("AddNewUser");
  add_user_button.Click();
      
  var user_details = new Array();
    
  var fullname_textbox = location_management_create_user_form().Panel(0).Textbox("FullName");
  var username_textbox = location_management_create_user_form().Panel(1).Textbox("Username");
  var password_textbox = location_management_create_user_form().Panel(2).PasswordBox("Password");
  var password_confirm_textbox = location_management_create_user_form().Panel(3).PasswordBox("ConfirmPassword");
  var submit_button = location_management_create_user_form().Panel(4).SubmitButton("Add");
      
  var username;
      
  if (u_surname == "" || u_firstname == "")
  {
    fullname_textbox.Text = "No_Name_Given" + aqConvert.IntToStr(Math.floor(Math.random()*10000));
  }
  else
  {    
    fullname_textbox.Text = u_firstname + "_" + u_surname + "_" + aqConvert.IntToStr(Math.floor(Math.random()*10000));
  }
      
  if (u_username == "")
  {
    username_textbox.Text = aqConvert.IntToStr(Math.floor(Math.random()*10000)) + "_user_" + 
    aqConvert.IntToStr(Math.floor(Math.random()*10000)) + "@regression";
    username = username_textbox.Text;
  }
  else
  {
    username_textbox.Text = u_username + aqConvert.IntToStr(Math.floor(Math.random()*10000)) + "@regression";
    username = username_textbox.Text;
  }
      
  if (u_password == "")
  {
    password_textbox.Text = "INRstar_6";
    password_confirm_textbox.Text = "INRstar_6";
  }
  else
  {
    password_textbox.Text = u_password;
    password_confirm_textbox.Text = u_password;
  }
      
  submit_button.Click();
      
  return username;
}
//--------------------------------------------------------------------------------
function manage_user_permissions(username, p_level)
{
  manage_user(username);
  
  var content_panel = location_management_main_container();
  var permission_tab = content_panel.Panel("UserContent").Panel("UserAdmin").Link("UserAuthorisationLink");
  permission_tab.Click();
  
  switch(p_level)
  {
    case 'clerical 1': 
    p_level = 1;
    break;
    case 'clerical 2': 
    p_level = 2;
    break;
    case 'clerical 3': 
    p_level = 3;
    break;
    case 'clinical 1': 
    p_level = 4;
    break;
    case 'clinical 2': 
    p_level = 5;
    break;
    case 'clinical 3': 
    p_level = 6;
    break;
    case 'administrator':
    p_level = 7;
    break;
    case 'clinical lead': 
    p_level = 8;
    break;
    case 'read only': 
    p_level = 9;
    break;
  }
  
  var permissions_panel = location_management_roles_and_permissions();
  
  var permission_checkbox = permissions_panel.Table(0).Cell(1, p_level).Checkbox("roles");
  permission_checkbox.Click();
  var permission_update_button = permissions_panel.Panel(0).SubmitButton("Update");
  permission_update_button.Click();
  
  process_confirm_INR_cancel();
}
//--------------------------------------------------------------------------------
function reset_user_permissions_to_readonly(username)
{
  manage_user(username);
  
  var content_panel = location_management_main_container();
  var permission_tab = content_panel.Panel("UserContent").Panel("UserAdmin").Link("UserAuthorisationLink");
  permission_tab.Click();
  
  var permissions_panel = location_management_roles_and_permissions();
  
  for(var i = 1; i <= 9; i++)
  {
    var permission_checkbox = permissions_panel.Table(0).Cell(1, i).Checkbox("roles");
    
    if(permission_checkbox.wState == cbChecked)
    {
      permission_checkbox.Click();
    }
    
    if(i == 9)
    {
      permission_checkbox.Click();
    }
  }
  
  var permission_update_button = permissions_panel.Panel(0).SubmitButton("Update");
  permission_update_button.Click();
}
//--------------------------------------------------------------------------------
function reset_user_password(username)
{
  manage_user(username);
  
  var details_path = location_management_user_details_tab();
  var full_name = details_path.Panel("Fullname").Label("Fullname_DetachedLabel").innerText;
  
  var reset_pass_button = details_path.Panel(0).Button("ResetPasswordLink");
  reset_pass_button.Click();
  
  var password_text = process_popup("Reset Password", "OK");
  
  var user_data = new Array();
  user_data.push(full_name, password_text);
  
  return user_data;
}
//--------------------------------------------------------------------------------
function disable_user_account(username)
{
  manage_user(username);
  
  var details_path = location_management_user_details_tab();
  var disable_user_button = details_path.Panel(0).Button("DisableUserAccountLink");
  disable_user_button.Click();
  
  var popup_text = process_popup("Confirmation Required", "Confirm");
  
  return popup_text;
}
//--------------------------------------------------------------------------------
function enable_user_account(username)
{
  var disabled_user = username + " (disabled)";

  manage_user(disabled_user);
  
  var details_path = location_management_user_details_tab();
  var enable_user_button = details_path.Panel(0).Button("EnableUserAccountLink");
  enable_user_button.Click();
}