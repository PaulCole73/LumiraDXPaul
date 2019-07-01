function log_on_regression (p_user,p_pwrd)  {

 var page = Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding", "").Window("Shell DocObject View", "", 1).Window("Internet Explorer_Server", "", 1).Page("https://inrstar-starsky.lumiradxcaresolutions.com/Security/Authentication/LogOn?ReturnUrl=%2f")
 var form1 = page.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("LoginArea").Panel("LoginInput");
 form1.Panel(0).Textbox("Username").Text = p_user;
 form1.Panel(1).Passwordbox("Password").Text = p_pwrd;
    
 
var button = page.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("LoginArea")
 
 
    // click the button
 button.Panel(0).SubmitButton("LoginButton").Click();
}

function log_on_cl3_coruscant (p_user,p_pwrd)  {

 var page = Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding", "").Window("Shell DocObject View", "", 1).Window("Internet Explorer_Server", "", 1).Page("https://inrstar-coruscant.lumiradxcaresolutions.com/Security/Authentication/LogOn?ReturnUrl=%2f")
 var form1 = page.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("LoginArea").Panel("LoginInput");
 form1.Panel(0).Textbox("Username").Text = p_user;
 form1.Panel(1).Passwordbox("Password").Text = p_pwrd;
    
 
var button = page.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("LoginArea")
 
 
 // click the button
 button.Panel(0).SubmitButton("LoginButton").Click();
}