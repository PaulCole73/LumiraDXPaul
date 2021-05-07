//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_login_details(index)
{
  var login_details = new Array();
  var user_path = "C:\\Automation\\UserDetails.txt";
  var file = aqFile.ReadWholeTextFile(user_path, aqFile.ctANSI);
  login_details = file.split(",");
  
  if(index == null)
  {
    return login_details;
  }
  else
  {
    return login_details[index];
  }
}