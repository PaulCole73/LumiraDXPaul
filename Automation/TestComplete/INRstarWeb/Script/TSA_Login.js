//USEUNIT System_Paths


//--------------------------------------------------------------------------------
function login(User,Password,TestStepMode)  
{
var Mode = TestStepMode

    if(Mode == "Shared")
    {
       var INRstarV5 = set_system_login_page();    
       var login_area = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("LoginArea")
       
       //Navigating to the Login fields and entering the passed in values
       login_area.Panel("LoginInput").Panel(0).Textbox("Username").Text = User;
       login_area.Panel("LoginInput").Panel(1).Passwordbox("Password").Text = Password;
       
       // Click the button 
       var login_button = login_area.Panel(0).SubmitButton("LoginButton").Click();
    }
          else if (Mode == "")
          {
             var INRstarV5 = set_system_login_page();    
             var login_area = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("LoginArea")
             // Click the button 
             var login_button = login_area.Panel(0).SubmitButton("LoginButton").Click();
          }
                else if (Mode == "password_reset_section")
                {
                  var INRstarV5 = set_system_login_page();    
                  var login_area = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("LoginArea")
                  //Clicking password reset link
                  login_area.Panel(0).Panel("ForgottonPassword").Link("SearchTypeLink").Click();
                }
                 else if (Mode == "password_reset_email_code")
                {
                  //Entering the username to reset
                  var INRstarV5 = set_system_login_page(); 
                  var login_area_reset = INRstarV5.Panel("MainPage").Panel("main").Panel("ResetPasswordWrapper").Form("ResetPassword").Panel("LoginArea")
                  login_area_reset.Panel("ResetArea").Panel(0).Textbox("Username").Text = User;
                  
                   // Click the button 
                  var reset_code_button = login_area_reset.Panel("ResetArea").Panel(1).SubmitButton("submitButton").Click();
                }
}
//--------------------------------------------------------------------------------