﻿//USEUNIT Misc_Functions
//USEUNIT engage_Misc_Functions
//------------------------------------------------------------------------
////////////////////////////////  Engage  ////////////////////////////////
//------------------------------------------------------------------------
//------------------------------------------------------------------------
function gmail_account_main()
{
  //var main = Sys.Browser("iexplore").Page("https://mail.google.com/mail/u/0/#inbox");
  var main = Sys.Browser("chrome").ToUrl("https://mail.google.com/mail/u/1/#inbox");
  return main;
}
//------------------------------------------------------------------------
function gmail_account_top_email()
{
  var base = gmail_account_main();
  var panel_seq1 = base.Panel(5).Panel(2).Panel(0).Panel(1).Panel(0).Panel(1);
  var panel_seq2 = panel_seq1.Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0);
  var top_email = panel_seq2.Panel(0).Panel(0).Panel(7).Panel(0).Panel("z").Panel(2).Panel(0).Table("d");
  
  return top_email;
}
//------------------------------------------------------------------------
function gmail_account_delete_button()
{
  var base = gmail_account_main();
  var button = base.Panel(26).FindChild("contentText", "Delete", 2);
  
  return button;
}
//------------------------------------------------------------------------
function engage_base()
{
  var url = get_current_url();
  var main = Sys.Browser("chrome").Page(url);
  return main;
}
//------------------------------------------------------------------------
function engage_navigation_menu_button()
{
  var base = engage_base();
  var panel = base.Panel(1).Panel(0).Panel(0).Panel(0);
  
  var button = panel.FindChild("idStr", "button_navbar_menubutton", 5);
  return button;
}
//------------------------------------------------------------------------
function engage_navigation_signout_button()
{
  var base = engage_base();
  var button = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(2).Panel(0).Link("link_menu_signout").TextNode(0);
  
  return button;
}
//------------------------------------------------------------------------
function engage_signin_login_tab()
{
  var base = engage_base();
  var signin_login_tab = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Button("button_loginleftpanel_signin");
    
  return signin_login_tab;
}
//------------------------------------------------------------------------
function engage_signin_register_tab()
{
  var base = engage_base();
  var signin_register_tab = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Button("button_loginleftpanel_register");
    
  return signin_register_tab;
}
//------------------------------------------------------------------------
function engage_username_login()
{
  var base = engage_base();
  var logon_form = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Form(0);
  var textbox = logon_form.Panel(0).EmailInput("input_signintab_emailaddress");
  
  return textbox;
}
//------------------------------------------------------------------------
function engage_password_login()
{
  var base = engage_base();
  var logon_form = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Form(0);
  var pass_box = logon_form.Panel(1).PasswordBox("input_signintab_password");
  
  return pass_box;
}
//------------------------------------------------------------------------
function engage_sign_in_button()
{
  var base = engage_base();
  var logon_form = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Form(0);
  var button = logon_form.Button("button_signintab_signin");
  
  return button;
}
//------------------------------------------------------------------------
function engage_register_login_tab()
{
  var base = engage_base();
  var register_login_tab = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Button("button_loginleftpanel_signin");
    
  return register_login_tab;
}
//------------------------------------------------------------------------
function engage_register_register_tab()
{
  var base = engage_base();
  var register_register_tab = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Button("button_loginleftpanel_register");
    
  return register_register_tab;
}
//------------------------------------------------------------------------
function engage_username_register()
{
  var base = engage_base();
  var register_form = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var textbox = register_form.Panel(0).EmailInput(0);
  
  return textbox;
}
//------------------------------------------------------------------------
function engage_dob_register()
{
  var base = engage_base();
  var register_form = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var textbox = register_form.Panel(1).Panel(0).Panel(0).Textbox(0);
  
  return textbox;
}
//------------------------------------------------------------------------
function engage_dob_entry()
{
  var base = engage_base();
  var register_form = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var textbox = register_form.Textbox(0);
  
  return textbox;
}
//------------------------------------------------------------------------
function engage_close_dob_entry()
{
  var base = engage_base();
  var screen = base.Panel("overlays").Panel(0).Panel(0);
  
  return screen;
}
//------------------------------------------------------------------------
function engage_code_register()
{
  var base = engage_base();
  var register_form = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var code_box = register_form.Panel(1).Panel(0).Textbox(0);
  
  return code_box;
}
//------------------------------------------------------------------------
function engage_send_code_register()
{
  var base = engage_base();
  var register_form = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var link_box = register_form.Button(0);
  
  return link_box;
}
//------------------------------------------------------------------------
function engage_submit_button_register()
{
  var base = engage_base();
  var register_form = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var submit_button = register_form.Button(0);
  
  return submit_button;
}
//------------------------------------------------------------------------
function engage_next_button_register()
{
  var base = engage_base();
  var register_form = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var next_button = register_form.Button(1);
  
  return next_button;
}
//------------------------------------------------------------------------
function engage_cancel_button_register()
{
  var base = engage_base();
  var register_form = base.Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var cancel_button = register_form.Button(0);
  
  return cancel_button;
}
//------------------------------------------------------------------------
function engage_set_new_password()
{
  var base = engage_base();
  var password_box = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).PasswordBox(0);
  
  return password_box;
}
//------------------------------------------------------------------------
function engage_confirm_new_password()
{
  var base = engage_base();
  var password_box = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).PasswordBox(0);
  
  return password_box;
}
//------------------------------------------------------------------------
function engage_password_confirm_button()
{
  var base = engage_base();
  var button = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Button("button_engage_passwordregister_submit");
  
  return button;
}
//------------------------------------------------------------------------
function engage_things_to_do_today_panel()
{
  var base = engage_base();
  //var panel = base.Panel(1).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).Panel("taskmodule_thingstodotoday");  
  var panel = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).Panel("taskmodule_thingstodotoday")
  
  return panel;
}
//------------------------------------------------------------------------
function engage_things_i_did_yesterday_panel()
{
  var base = engage_base();
  //var panel = base.Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).Panel("taskmodule_thingsididyesterday");
  var panel = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).Panel("taskmodule_thingsididyesterday")
  
  return panel;
}
//------------------------------------------------------------------------
function engage_new_dosing_schedule_understand_buttons()
{
  var base = engage_base();
//var panel = base.Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel("question_radio_objectobject_");
  var panel = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel("question_radio_objectobject_");
  
  return panel;
}
//------------------------------------------------------------------------
function engage_new_dosing_submit_buttons()
{
  var base = engage_base();
//var panel = base.Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(2);
  var panel = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(2);
  
  return panel;
}
//------------------------------------------------------------------------
function engage_submit_my_INR_tile()
{
  var base = engage_base();
//var panel = base.Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var panel = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  
  return panel;
}
//------------------------------------------------------------------------
function engage_things_to_do_soon_panel()
{
  var base = engage_base();
//var panel = base.Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).Panel("taskmodule_thingstodosoon");
  var panel = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).Panel("taskmodule_thingstodosoon");
  
  return panel;
}
//------------------------------------------------------------------------
function engage_dosing_schedule()
{
  var base = engage_base();
//var panel = base.Panel(1).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var panel = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
  var questionaire = panel.Panel("question_preformattedtext_objectobject_").Panel(0).TextNode(0);
  
  return questionaire;
}
//------------------------------------------------------------------------
function engage_submit_INR_questionnaire()
{
  var base = engage_base();
//var questionnaire = base.Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0);
  var questionnaire = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0);
  
  return questionnaire;
}
//------------------------------------------------------------------------
function engage_licence_agreement_checkbox()
{
  var base = engage_base();
  var checkbox = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel(2).Panel(0).Panel("question_checkbox_objectobject_").Panel(1);
  
  return checkbox;
}
//------------------------------------------------------------------------
function engage_privacy_policy_checkbox()
{
  var base = engage_base();
  var checkbox = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).Panel(2).Panel(0).Panel("question_checkbox_objectobject_").Panel(1);
  
  return checkbox;
}
//------------------------------------------------------------------------
function engage_agreements_submit_button()
{
  var base = engage_base();
  var button = base.Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(2).Button("button_engage_home_questionnaire_submit");
  
  return button;
}
