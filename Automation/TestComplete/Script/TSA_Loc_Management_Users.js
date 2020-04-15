//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function add_new_user(u_firstname, u_surname, u_username, u_password)
{
  Goto_Options_Location_Management();
  var users_tab = location_management_users_button().Click();
  var content_panel = location_management_main_container();
  var is_user_valid = false;
  
  if (u_surname == "" || u_firstname == "")
  {
    var fullname = "No_Name_Given";
  }
  else
  {    
    fullname = u_firstname + "_" + u_surname;
  }
  
  do
  {  
    if (u_username == "")
    {
      var username = aqConvert.IntToStr(Math.floor(Math.random()*10000)) + "_user_" + 
      aqConvert.IntToStr(Math.floor(Math.random()*10000)) + "@regression";
    }
    else
    {
      username = u_username + aqConvert.IntToStr(Math.floor(Math.random()*10000)) + "@regression";
    }
    
    var select_user_dropdown = content_panel.Panel(0).Select("Users");
    
    for(var i = 0; i < select_user_dropdown.wItemCount; i++)
    {
      if(select_user_dropdown.wItem[i] == username)
      {
        is_user_valid = false;
        break;
      }
      else
      {
        is_user_valid = true;
      }
    }
    
  }while(is_user_valid = false);
  
  if (u_password == "")
  {
    var password = "";
  }
  else
  {
    password = u_password;
  }
  
  var add_user_button = content_panel.Panel(1).Button("AddNewUser").Click(); 
  location_management_create_user_form().Panel(0).Textbox("FullName").Text = fullname;
  location_management_create_user_form().Panel(1).Textbox("Username").Text = username;
  location_management_create_user_form().Panel(2).PasswordBox("Password").Text = password;
  location_management_create_user_form().Panel(3).PasswordBox("ConfirmPassword").Text = password;
  var submit_button = location_management_create_user_form().Panel(4).SubmitButton("Add").Click();
      
  return username;
}
//--------------------------------------------------------------------------------
function manage_user_permissions(username, p_level)
{
  Goto_Manage_User(username);
  
  var content_panel = location_management_main_container();
  var permission_tab = content_panel.Panel("UserContent").Panel("UserAdmin").Link("UserAuthorisationLink").Click();
  
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
  var permission_checkbox = permissions_panel.Table(0).Cell(1, p_level).Checkbox("roles").Click();
  var permission_update_button = permissions_panel.Panel(0).SubmitButton("Update").Click();
  
  process_popup("Confirmation Required", "Confirm");
}
//--------------------------------------------------------------------------------
function reset_user_permissions_to_readonly(username)
{
  Goto_Manage_User(username);
  
  var content_panel = location_management_main_container();
  var permission_tab = content_panel.Panel("UserContent").Panel("UserAdmin").Link("UserAuthorisationLink").Click();
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
  
  var permission_update_button = permissions_panel.Panel(0).SubmitButton("Update").Click();
}
//--------------------------------------------------------------------------------
//function reset_user_password()
function reset_user_password(username)
{
  Goto_Manage_User(username);
  var username = "reset_password";
  var details_path = location_management_user_details_tab();
  var full_name = details_path.Panel("Fullname").Label("Fullname_DetachedLabel").innerText;
  
  var obj = wait_for_object(details_path, "idStr", "ResetPasswordLink", 2);
  click_navigation_wrapper(obj, INRstar_base(), "idStr", "modalDialogBox", 2);
  var password_text = process_popup(get_string_translation("Reset Password"), get_string_translation("OK"));
  //var password_text = process_popup("Reimpostare password", "OK");
  
  var length = password_text.length;
  var new_length = length - 8;
  var new_password = aqString.SubString(password_text, new_length, 8);
  
  var user_data = new Array();
  user_data.push(full_name, new_password);
  
  return user_data;
}
//--------------------------------------------------------------------------------
function disable_user_account(username)
{
  Goto_Manage_User(username);
  
  var details_path = location_management_user_details_tab();
  var disable_user_button = details_path.Panel(0).Button("DisableUserAccountLink").Click();
  
  var popup_text = process_popup(get_string_translation("Confirmation Required"), get_string_translation("Confirm"));
  
  return popup_text;
}
//--------------------------------------------------------------------------------
function enable_user_account(username)
{
  var disabled_user = username + " (" + get_string_translation("disabled") + ")";

  Goto_Manage_User(disabled_user);
  
  var details_path = location_management_user_details_tab();
  var enable_user_button = details_path.Panel(0).Button("EnableUserAccountLink").Click();
}
//--------------------------------------------------------------------------------