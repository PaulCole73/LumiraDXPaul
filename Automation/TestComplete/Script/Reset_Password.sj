﻿//USEUNIT Navigation
//USEUNIT V5_SQL

//========================================================================================
//
// Run as users with email addresses and request a Reset code

//
//========================================================================================
function quick_start()
{
          var p1 = Sys.Process("INRstarWindows");
         p1 = p1.WinFormsObject("BrowserForm");
         p1 = p1.WinFormsObject("INRstarBrowser");
         p1 = p1.WinFormsObject("Shell Embedding","");
         p1 = p1.Window("Shell DocObject View","",1);
         p1 = p1.Window("Internet Explorer_Server","",1);
         var INRstarV5 = p1.Page("http://192.168.16.158/Security/Authentication/LogOn?ReturnUrl=%2f");

          var wa_users = new Array(22);
          wa_users[0] = "";
          wa_users[1] = "";
          wa_users[2] = "";
          wa_users[3] = "";
          wa_users[4] = "";
          wa_users[5] = "";
          wa_users[6] = "";
          wa_users[7] = "";
          wa_users[8] = "";
          wa_users[9] = "";
          wa_users[10] = "";
          wa_users[11] = "";
          wa_users[12] = "";
          wa_users[13] = "";
          wa_users[14] = "";
          wa_users[15] = "";
          wa_users[16] = "";
          wa_users[17] = "";
          wa_users[18] = "";
          wa_users[19] = "";
          wa_users[20] = "";
          wa_users[21] = "";
          
          
          
          for (i = 0; i < wa_users.length; i++)
          {
                    forgot_password(INRstarV5, wa_users[i])
          }
}

function forgot_password(INRstarV5, p_user)
{
          var panelM = INRstarV5.panel("MainPage").panel("Main");
         
          // Login Page
         var form = panelM.panel("LogonPage").panel("LogonFormWrapper").form("Logon");
         var panelFP = form.panel("LoginArea").panel(0).Panel("ForgottonPassword")

         panelFP.Link("SearchTypeLink").Click();
         
         
          // Reset Request Page 
          // .Panel("MainPage").Panel("main").Panel("ResetPasswordWrapper").Form("ResetPassword").Panel("ResetArea").Panel(0).Textbox("Username")
          var panelM = INRstarV5.panel("MainPage").panel("Main");
         
          panelRA = panelM.Panel("ResetPasswordWrapper").Form("ResetPassword").Panel("ResetArea");
          panelRA.Panel(0).Textbox("Username").Text = p_user;  // Set Username
          
          panelRA.Panel(1).SubmitButton("submitButton").Click(); // Click 'Email my reset code'
          
          // Fetch user id
          w_userid = SQL_Get_UserId(p_user);
          
          //Fetch Reset Code
          w_resetcode = SQL_Get_User_Reset_Code(w_userid);
          
          // Enter Reset code Page
          var panelM = INRstarV5.panel("MainPage").panel("Main");
          panelRA = panelM.Panel("ResetPasswordWrapper").Form("ResetPassword").Panel("ResetArea");
         
//        panelRA.Panel(2).Button("CancelResetPassword").Click(); // Click 'Cancel'
          panelRA.Panel(1).Textbox("ResetCode").Text = w_resetcode;   
          panelRA.Panel(2).SubmitButton("NextButton").Click();

          // Change Password Page
          var panelM = INRstarV5.panel("MainPage").panel("Main");
          panelM.Button("CancelResetPassword").Click();


}         