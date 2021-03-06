//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT Home_Page_Regression_Quick_Checking


//===============================================================================

//Script for validating the password requirements in INRstar and Admin Dashboard

function test_INRstar_password_validation()

{

//-----------Add new user validation in INRstar

//test_password_length_new ()



//-----------Reset Password validation in INRstar

test_password_length_reset ()

}

//-----------user clear down

//-----------Add new user validation in Admin Dashboard

//-----------Reset password validation in Admin Dashboard

//-----------user clear down

//-------------------------------------------------------------------------------

//Add new user validation in INRstar

function test_password_length_new ()

{

Log_On_User("cl3@regression","INRstar_5");
var INRstarV5 = set_system();

Goto_Add_User()

}

//-------------------------------------------------------------------------------

//Reset Password validation in INRstar

  function test_password_length_reset ()

{
  Log_On_User("cl3@regression","INRstar_5");
  var INRstarV5 = set_system();

  //Adding the new user to do the reset on 
  Goto_Add_User();
  add_user_details("test10", "test10", "Password1","Password1");
  log_off();
  Log.Checkpoint("User Added");
  
 //Reset the new users password on login again
  Log_On_User("cl3@regression","INRstar_5");
  Goto_Manage_User("test10");
  var new_pass = reset_password_inrstar();
  log_off();
  Log.Checkpoint("User Reset")
  
  //accept licence agreement
  Log_On_User("test10",new_pass);
  var window = Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding", "").Window("Shell DocObject View", "", 1);
  var agreement = window.Window("Internet Explorer_Server", "", 1).Page("http://scsl.inrstar.test/License/Agreement/View");
  agreement.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Button("AcceptLicenseAgreement").Click();
  
 //The test
  var window = Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding", "").Window("Shell DocObject View", "", 1);
  var page = window.Window("Internet Explorer_Server", "", 1).Page("http://scsl.inrstar.test/Security/Password/Expired");
  var panelpep = page.Panel("MainPage").Panel("main").Panel("passwordExpiredPage");
  var form = panelpep.Panel("passwordExpiredWrapper").Form("PasswordExpired");
  
  form.Panel(0).PasswordBox("currentPassword").Text(new_pass);
  form.Panel(1).PasswordBox("newPassword").Text("7charss");
  form.Panel(2).PasswordBox("confirmPassword").Text("7charss")
  
 // password_validator();
  
}

//-------------------------------------------------------------------------------

function add_user_details(p_user, p_role,p_pass,p_pass_confirm)

{
  
  var INRstarV5 = set_system();

  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelLC = panelMCP.Panel("AdminContent").Panel("LocationContent").Panel(0);
  var formUser = panelLC.Panel("LocationTabContent").Panel("CreateUserWrapper").Form("CreateUserForm");
  
  formUser.Panel(0).Textbox("FullName").Text = p_role;
  formUser.Panel(1).Textbox("Username").Text = p_user;
  formUser.Panel(2).PasswordBox("Password").Text = p_pass;
  formUser.Panel(3).PasswordBox("ConfirmPassword").Text = p_pass_confirm;
  formUser.Panel(4).SubmitButton("Add").Click();  
  
}

//-------------------------------------------------------------------------------

function reset_password(p_role,p_pass,p_pass_confirm)

{
  
  var INRstarV5 = set_system();

  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelLC = panelMCP.Panel("AdminContent").Panel("LocationContent").Panel(0);
  var formUser = panelLC.Panel("LocationTabContent").Panel("CreateUserWrapper").Form("CreateUserForm");
  
  formUser.Panel(0).Textbox("FullName").Text = p_role;
  formUser.Panel(1).Textbox("Username").Text = p_user;
  formUser.Panel(2).PasswordBox("Password").Text = p_pass;
  formUser.Panel(3).PasswordBox("ConfirmPassword").Text = p_pass_confirm;
  formUser.Panel(4).SubmitButton("Add").Click();  
  
}

  //-------------------------------------------------------------------------------

function reset_password_inrstar()

{

  var INRstarV5 = set_system();

  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelLC = panelMCP.Panel("AdminContent").Panel("LocationContent").Panel(0);
  var panelUDT = panelLC.Panel("LocationTabContent").Panel("UserContent").Panel("UserAccountContent").Panel("UserDetailsTab");
  
  //reset the password
  panelUDT.Panel(0).Button("ResetPasswordLink").Click();
   
 //send back the password for new login
  var modal = INRstarV5.Panel(2).Panel("modalDialogBox").Label("Message_DetachedLabel")
  var new_password = modal.ContentText
  var new_pass = aqString.SubString(new_password,51,62);
  
  //click okay
  INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  
  return (new_pass);

}



