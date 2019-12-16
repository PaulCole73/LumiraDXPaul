//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Popup_Handlers
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function login(user_index, TestStepMode, reset_password)  
{
  var Mode = TestStepMode
  var INRstarV5 = INRstar_base();    
  var login_area = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("LoginArea");
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
    var counter = 0;
    var is_page_loaded = false;
    
    do
    {
      login_area.Refresh();
      var obj = INRstarV5.NativeWebObject.Find("idStr", "Username");
      
      if(obj.Exists == true && obj.isContentEditable == true)
      {
        is_page_loaded = true;
        //Navigating to the Login fields and entering the passed in values
        login_area.Panel("LoginInput").Panel(0).Textbox("Username").Text = username;
        login_area.Panel("LoginInput").Panel(1).Passwordbox("Password").Text = password;
       
        // Click the button 
        var login_button = login_area.Panel(0).SubmitButton("LoginButton").Click();
      }
      else
      {
        is_page_loaded = false;
        WaitSeconds(10, "Waiting for login page...");
        Log.Message("Login page not ready, automation still broke, try again tomorrow...");
      }
      
      counter++;
      Log.Message(counter);
    }
    while(is_page_loaded == false && counter < 3);
  }
  else if (Mode == "")
  { 
    // Click the button 
    var login_button = login_area.Panel(0).SubmitButton("LoginButton").Click();
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
  
  var text = process_popup("Important Information", "Do Not Show Again");
  process_popup("Email Address", "Cancel");
  
  return text;
}
//--------------------------------------------------------------------------------
function log_in_new_user(username, current_pass, is_password_reset, new_password)
{
  login(username, "Shared", current_pass);
  
  var login_details = new Array();
  login_details = get_login_details();
  
  if(is_password_reset == null || is_password_reset == false)
  {
    var panelMCP = INRstar_base().Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var eula_agree_button = panelMCP.Panel(0).Button("AcceptLicenseAgreement").Click();
  }
  if(new_password == null)
  {
    new_password = login_details[20];
  }
    
  password_expired_form().Panel(0).PasswordBox("currentPassword").Text = current_pass;
  password_expired_form().Panel(1).PasswordBox("newPassword").Text = new_password;
  password_expired_form().Panel(2).PasswordBox("confirmPassword").Text = new_password;
  password_expired_form().Panel(3).SubmitButton("Update_Password").Click();
  
  process_popup("Important Information", "Do Not Show Again");
  process_popup("Email Address", "Cancel");
}









