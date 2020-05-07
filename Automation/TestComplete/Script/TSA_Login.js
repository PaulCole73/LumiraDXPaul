//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Popup_Handlers
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function login(user_index, TestStepMode, reset_password, new_login)
{
  Log.LockEvents(0);
  var counter = 0;
  var Mode = TestStepMode
  var INRstarV5 = INRstar_base(); 
  Aliases.INRstarWindows.BrowserForm.SetFocus();
  
  do
  {
    INRstarV5.Refresh();
    var obj = wait_for_object(INRstarV5, "idStr", "LogonPage", 3, 1, 20);

    if(obj != false)
    {
      var main = INRstarV5.Panel("MainPage").Panel("main");
      var login_area = main.Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("LoginArea");
      var login_details = new Array();
      var password = "";
      var username = "";
 
      login_details = get_login_details();
      if(user_index != null)
      {
        if(isNaN(user_index))
        {
          username = user_index;
        }
        else
        {
          username = login_details[user_index];
          password = login_details[20];
        }
        if(reset_password != null)
        {
          password = reset_password;
        }
      }
 
      if(Mode == "Shared")
      {
        login_area.Panel("LoginInput").Panel(0).Textbox("Username").Text = username;
        login_area.Panel("LoginInput").Panel(1).Passwordbox("Password").Text = password;
        login_area.Panel(0).SubmitButton("LoginButton").Click();
      }
      else if (Mode == "")
      {
        // Click the button
        login_area.Panel(0).SubmitButton("LoginButton").Click();
      }
      else if (Mode == "password_reset_section")
      {
        //Clicking password reset link
        login_area.Panel(0).Panel("ForgottonPassword").Link("SearchTypeLink").Click();
      }
      else if (Mode == "password_reset_email_code")
      {
        //Entering the username to reset
        var INRstarV5 = set_system_login_page();
        var login_area_reset = INRstarV5.Panel("MainPage").Panel("main").Panel("ResetPasswordWrapper").Form("ResetPassword").Panel("LoginArea");
        login_area_reset.Panel("ResetArea").Panel(0).Textbox("Username").Text = login_details[user_index];
                 
        // Click the button
        var reset_code_button = login_area_reset.Panel("ResetArea").Panel(1).SubmitButton("submitButton").Click();
      } 
      var text = process_popup(get_string_translation("Important Information"),"Do Not Show Again");
      process_email_popup(get_string_translation("Email Address"), get_string_translation("Confirm"));    
    }
    else
    {
      counter++;
      WaitSeconds(10, "Waiting for Logon page to exist.");
      Log.Message("Login Page does not Exist...");
    }
  }
  while(obj == false && counter < 3);
  
  if(aqString.Find(username, "disable") == -1 && new_login != true && Mode == "Shared")
  {
    var obj_root = INRstarV5;
    wait_for_object(obj_root, "idStr", "MainContentPanel", 5, 1, 30);
  }
  
  return text;
}
//--------------------------------------------------------------------------------
function log_in_new_user(username, current_pass, is_password_reset, new_password)
{
  var INRstarV5 = INRstar_base();
  login(username, "Shared", current_pass, true);
  
  var login_details = new Array();
  login_details = get_login_details();
  
  if(is_password_reset == null || is_password_reset == false)
  {
    var panelMCP = INRstar_base().Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var eula_agree_button = panelMCP.Panel(0).Button("AcceptLicenseAgreement");
    
    click_navigation_wrapper(eula_agree_button, INRstarV5, "idStr", "passwordExpiredPage", 3);
  }
  if(new_password == null)
  {
    new_password = login_details[20];
  }
    
  password_expired_form().Panel(0).PasswordBox("currentPassword").Text = current_pass;
  password_expired_form().Panel(1).PasswordBox("newPassword").Text = new_password;
  password_expired_form().Panel(2).PasswordBox("confirmPassword").Text = new_password;
  
  WaitSeconds(2);
  password_expired_form().Panel(3).SubmitButton("Update_Password").Click();

  var obj_root = INRstarV5;
  if(is_password_reset == null || is_password_reset == false)
  {
    wait_for_object(obj_root, "idStr", "modalDialogBox", 1);
  }

  process_popup("Important Information", "Do Not Show Again");
  WaitSeconds(2);
  process_email_popup(get_string_translation("Email Address"), get_string_translation("Confirm"));
  WaitSeconds(2);
  
  wait_for_object(obj_root, "idStr", "MainContentPanel", 5, 5);
}









