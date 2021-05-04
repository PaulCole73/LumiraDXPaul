//USEUNIT Admin_Dash_System_Paths
//USEUNIT System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Popup_Handlers
//--------------------------------------------------------------------------------

function add_a_banner_message(content)
{
  Goto_Banner_Message();
  admin_dash_banner_message().Panel(0).Button("Change").Click();
  
  admin_dash_banner_message_form().Textarea("News").innerText = content;
  admin_dash_banner_message_form().Panel(0).SubmitButton("Set").Click();
}