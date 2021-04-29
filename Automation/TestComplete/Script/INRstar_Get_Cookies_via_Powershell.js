//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                    INRstar Login via powershell & return cookies                //
//---------------------------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------
function get_cookies_for_under_the_hood()
{
    var oShell = getActiveXObject("WScript.Shell"); // Or oShell = WshShell
    var oExec = oShell.Exec("powershell -file C:\\PUNDER\\INRstar_login_get_cookies.ps1");
    oExec.StdIn.Close(); // Close standard input before reading output

    // Get PowerShell output
    var strOutput = oExec.StdOut.ReadAll();
  
    // Trim leading and trailing empty lines
    strOutput = aqString.Trim(strOutput, aqString.stAll);
  
    //Get rid of whitespace and replace carriage returns for ;
    var modified_cookies = aqString.GetListItem(strOutput, 0).replace(/[\n\r]/g, ';').replace(/ /g,'');
    
    return modified_cookies
}