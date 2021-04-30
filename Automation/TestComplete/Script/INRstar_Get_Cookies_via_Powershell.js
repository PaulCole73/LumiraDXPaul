//USEUNIT Get_Functions
//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                    INRstar Login via powershell & return cookies                //
//---------------------------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------
function get_cookies_for_under_the_hood()
{
    var login_details = get_login_details();
    var hostname = get_hostname();
    var username = login_details[7];    
    var password = login_details[20];
    
    var oShell = getActiveXObject("WScript.Shell"); // Or oShell = WshShell
    var oExec = oShell.Exec("powershell -windowstyle hidden -file C:\\Automation\\INRstar_login_get_cookies.ps1 "+hostname+" "+username+" "+password+" | Out-Null");

    oExec.StdIn.Close(); // Close standard input before reading output

    // Get PowerShell output
    var strOutput = oExec.StdOut.ReadAll();
     Log.Message(strOutput)
  
    // Trim leading and trailing empty lines
    strOutput = aqString.Trim(strOutput, aqString.stAll);
  
    //Get rid of whitespace and replace carriage returns for ;
    var modified_cookies = aqString.GetListItem(strOutput, 0).replace(/[\n\r]/g, ';').replace(/ /g,'');

    return modified_cookies
    Log.Message(modified_cookies)
}