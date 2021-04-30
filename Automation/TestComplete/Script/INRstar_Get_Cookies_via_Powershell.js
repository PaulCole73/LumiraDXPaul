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
    
    function login_under_the_hood(login_user_number)
    {
      //Initialise variables
      var login_parameter,hostname;
      var login_details = new Array();
      var headers = new Object();
  
      //Get login parameter
      if (language == "Italian") {login_parameter = "Accedi";}
      else {login_parameter = "Log+In";}
  
      //Get username & password from 
      login_details = get_login_details();
    }
    
    var hostname = get_hostname();
    
    var oShell = getActiveXObject("WScript.Shell"); // Or oShell = WshShell
    var oExec = oShell.Exec('powershell -windowstyle hidden -file C:\\Automation\\INRstar_login_get_cookies.ps1 '+hostname+'| out-file C:\Automation\INRstar_login_get_cookies.txt');

    oExec.StdIn.Close(); // Close standard input before reading output

    // Get PowerShell output
    var strOutput = oExec.StdOut.ReadAll();
  
    // Trim leading and trailing empty lines
    strOutput = aqString.Trim(strOutput, aqString.stAll);
  
    //Get rid of whitespace and replace carriage returns for ;
    var modified_cookies = aqString.GetListItem(strOutput, 0).replace(/[\n\r]/g, ';').replace(/ /g,'');

    return modified_cookies
}