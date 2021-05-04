//USEUNIT Admin_Dash_System_Paths
//USEUNIT System_Paths
//--------------------------------------------------------------------------------

function validate_login()
{
  var name_split = new Array();
  if(admin_dash_base().Exists)
  {
    var username = admin_dash_base().Panel("MainPage").Panel("header").Panel("logindisplay").Panel("LoginStatus").TextNode(0).innerText;
    name_split = username.split(" ");
    username = name_split[0];
  }
  
  return username;
}