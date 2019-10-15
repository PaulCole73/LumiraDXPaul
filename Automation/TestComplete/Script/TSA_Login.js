//USEUNIT System_Paths
//USEUNIT Navigation

//--------------------------------------------------------------------------------
function login(User,Password,TestStepMode)  
{
    var Mode = TestStepMode

    var INRstarV5 = INRstar_base();    
    var login_area = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("LoginArea");

    if(Mode == "Shared")
    { 
        //Navigating to the Login fields and entering the passed in values
        login_area.Panel("LoginInput").Panel(0).Textbox("Username").Text = User;
        login_area.Panel("LoginInput").Panel(1).Passwordbox("Password").Text = Password;
       
        // Click the button 
        var login_button = login_area.Panel(0).SubmitButton("LoginButton").Click();
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
        login_area_reset.Panel("ResetArea").Panel(0).Textbox("Username").Text = User;
                  
        // Click the button 
        var reset_code_button = login_area_reset.Panel("ResetArea").Panel(1).SubmitButton("submitButton").Click();
    }

    // Find out if the important info is on the screen maybe take this out into it's own method !

    WaitSeconds(4); 
    var important_info = INRstarV5.NativeWebObject.Find("innertext", "Do Not Show Again");
  
    WaitSeconds(2); 
    if (important_info.Exists) 
    {
       var important_info_path = warning_pop_up();
       important_info_path.Button(0).TextNode(0).Click();
    } 

    var email_address_confirm = INRstarV5.NativeWebObject.Find("innertext", "Confirm");
    WaitSeconds(2); 
      
    if (email_address_confirm.Exists) 
    {
       var email_address_pop_up = warning_pop_up();
       email_address_pop_up.Button(0).TextNode(0).Click();
    }
}
//--------------------------------------------------------------------------------










