//USEUNIT TSA_AD_Login
//USEUNIT Admin_Dash_System_Paths
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function set_admin_dash_url()
{
  var base = "INRstarWindows";
  
  switch(environment)
  {
    case base + "UK-test1": 
    admin_dash_url = "https://admin-uk-test1.caresolutions.lumiradx.com/";
    break;
    case base + "UK-test2": 
    admin_dash_url = "https://admin-uk-test2.caresolutions.lumiradx.com/";
    break;
    case base + "UK-int1": 
    admin_dash_url = "https://admin-uk-int1.caresolutions.lumiradx.com/";
    break;
    case base + "UK-preprod1": 
    admin_dash_url = "https://admin-uk-preprod1.caresolutions.lumiradx.com/";
    break;
    case base + "ITA-test1": 
    admin_dash_url = "https://admin-it-test1.caresolutions.lumiradx.com/";
    break;
    case base + "ITA-test2": 
    admin_dash_url = "https://admin-it-test2.caresolutions.lumiradx.com/";
    break;
    case base + "ITA-int1": 
    admin_dash_url = "https://admin-it-int1.caresolutions.lumiradx.com/";
    break;
    case base + "ITA-preprod1": 
    admin_dash_url = "https://admin-it-preprod1.caresolutions.lumiradx.com/";
    break;
  }
}