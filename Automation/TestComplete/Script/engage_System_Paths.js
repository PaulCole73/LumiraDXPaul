﻿//USEUNIT Misc_Functions
//USEUNIT engage_Misc_Functions
//------------------------------------------------------------------------
////////////////////////////////  Engage  ////////////////////////////////
//------------------------------------------------------------------------
//------------------------------------------------------------------------
function gmail_account_main()
{
  var main = Sys.Browser("iexplore").Page("https://mail.google.com/mail/u/0/#inbox");
  
  return main;
}
//------------------------------------------------------------------------
function gmail_account_top_email()
{
  var base = gmail_account_main();
  var panel_seq1 = base.Panel(5).Panel(2).Panel(0).Panel(1).Panel(0).Panel(1);
  var panel_seq2 = panel_seq1.Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0);
  var top_email = panel_seq2.Panel(0).Panel(0).Panel(5).Panel(0).Panel("z").Panel(2).Panel(0).Table("k").Row("l");
  
  return top_email;
}
//------------------------------------------------------------------------
function engage_base()
{
  set_engage_url();
  var main = Sys.Browser("chrome").Page(engage_url);
  return main;
}
//------------------------------------------------------------------------
function engage_password_base()
{
  set_engage_url();
  var main = Sys.Browser("chrome").Page(engage_url + "#/password");
  return main;
}
//------------------------------------------------------------------------
function engage_login_base()
{
  set_engage_url();
  var main = Sys.Browser("chrome").Page(engage_url + "#/signin");
  return main;
}
//------------------------------------------------------------------------
function engage_questionnaire_base()
{
  set_engage_url();
  var main = Sys.Browser("chrome").Page(engage_url + "#/home/questionnaire");
  return main;
}
//------------------------------------------------------------------------
function engage_signin_login_tab()
{
  var base = engage_login_base();
  var signin_login_tab = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Button("button_loginleftpanel_signin");
    
  return signin_login_tab;
}
//------------------------------------------------------------------------
function engage_signin_register_tab()
{
  var base = engage_login_base();
  var signin_register_tab = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Button("button_loginleftpanel_register");
    
  return signin_register_tab;
}
//------------------------------------------------------------------------
function engage_username_login()
{
  var base = engage_login_base();
  var logon_form = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Form(0);
  var textbox = logon_form.Panel(0).EmailInput("input_signintab_emailaddress");
  
  return textbox;
}
//------------------------------------------------------------------------
function engage_password_login()
{
  var base = engage_login_base();
  var logon_form = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Form(0);
  var pass_box = logon_form.Panel(1).PasswordBox("input_signintab_password");
  
  return pass_box;
}
//------------------------------------------------------------------------
function engage_sign_in_button()
{
  var base = engage_login_base();
  var logon_form = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Form(0);
  var button = logon_form.Button("button_signintab_signin");
  
  return button;
}
//------------------------------------------------------------------------
function engage_register_base()
{
  set_engage_url();
  var main = Sys.Browser("chrome").Page(engage_url + "#/register");
  return main;
}
//------------------------------------------------------------------------
function engage_register_login_tab()
{
  var base = engage_register_base();
  var register_login_tab = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Button("button_loginleftpanel_signin");
    
  return register_login_tab;
}
//------------------------------------------------------------------------
function engage_register_register_tab()
{
  var base = engage_register_base();
  var register_register_tab = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Button("button_loginleftpanel_register");
    
  return register_register_tab;
}
//------------------------------------------------------------------------
function engage_username_register()
{
  var base = engage_register_base();
  var register_form = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var textbox = register_form.Panel(0).EmailInput(0);
  
  return textbox;
}
//------------------------------------------------------------------------
function engage_code_register()
{
  var base = engage_register_base();
  var register_form = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var code_box = register_form.Panel(1).Panel(0).Textbox(0);
  
  return code_box;
}
//------------------------------------------------------------------------
function engage_send_code_register()
{
  var base = engage_register_base();
  var register_form = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var link_box = register_form.Link(0);
  
  return link_box;
}
//------------------------------------------------------------------------
function engage_next_button_register()
{
  var base = engage_register_base();
  var register_form = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var next_button = register_form.Button(1);
  
  return next_button;
}
//------------------------------------------------------------------------
function engage_cancel_button_register()
{
  var base = engage_register_base();
  var register_form = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var cancel_button = register_form.Button(0);
  
  return cancel_button;
}
//------------------------------------------------------------------------
function engage_set_new_password()
{
  var base = engage_password_base();
  var password_box = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).PasswordBox(0);
  
  return password_box;
}
//------------------------------------------------------------------------
function engage_confirm_new_password()
{
  var base = engage_password_base();
  var password_box = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).PasswordBox(0);
  
  return password_box;
}
//------------------------------------------------------------------------
function engage_password_confirm_button()
{
  var base = engage_password_base();
  var button = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Button("button_password_submit");
  
  return button;
}