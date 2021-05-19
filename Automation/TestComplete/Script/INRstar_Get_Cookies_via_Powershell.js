//USEUNIT Get_Functions
//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                    INRstar Login via powershell & return cookies                //
//---------------------------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------
function login_under_the_hood(login_user)
{
    
    get_hostname(); 
    var login_details = get_login_details();
    
    if (login_user != null)
    {
      var username = login_details[17];
    }
    else
    {
      var username = login_details[7];
    }
          
    var password = login_details[20];
    
    var oShell = getActiveXObject("WScript.Shell"); // Or oShell = WshShell
    var oExec = oShell.Exec("powershell -windowstyle hidden -file C:\\GIT\\Automation\\TestComplete\\Stores\\Files\\INRstar_login_get_cookies.ps1 "+Project.Variables.hostname+" "+username+" "+password+" | Out-Null");

    oExec.StdIn.Close(); // Close standard input before reading output

    // Get PowerShell output
    var strOutput = oExec.StdOut.ReadAll();
  
    // Trim leading and trailing empty lines
    strOutput = aqString.Trim(strOutput, aqString.stAll);
  
    //Get rid of whitespace and replace carriage returns for ;
    var modified_cookies = aqString.GetListItem(strOutput, 0).replace(/[\n\r]/g, ';').replace(/ /g,'');

    Project.Variables.cookie_jar = modified_cookies;
}
//-----------------------------------------------------------------------------------