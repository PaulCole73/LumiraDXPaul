//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_System_Paths
//--------------------------------------------------------------------------------

function get_banner_message()
{
  Goto_Banner_Message();
  var text = admin_dash_banner_message().Label("News_DetachedLabel").innerText;
  
  return text;
}