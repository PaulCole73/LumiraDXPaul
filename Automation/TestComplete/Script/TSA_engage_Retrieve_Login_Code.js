//USEUNIT System_Paths
//USEUNIT Misc_Functions
//USEUNIT engage_System_Paths
//-----------------------------------------------------------------------------------
function get_engage_login_code() //in progress
{
  WaitSeconds(10);
  TestedApps.gmail.Run();
  WaitSeconds(15, "Waiting for application to open...");
  
  Sys.Browser("iexplore").BrowserWindow(0).Maximize();
  Sys.Browser("iexplore").BrowserWindow(0).SetFocus();
  
  gmail_account_main().Refresh();
  WaitSeconds(1);
  gmail_account_top_email().Click();
  WaitSeconds(10);
  
  //testcomplete alters dynamic names/idstr in the object browser
  //if an object can have a dynamic string appended to the end of the name
  //or id this can be stripped out by testcomplete so the object can be accesed via the static name.
  var obj = Sys.Browser("iexplore").FindChild("Name", "Page(\"https://mail.google.com/mail/u/0/#inbox\")");
  var msg = obj.Panel(5).Panel(2).Panel(0).Panel(1).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Table(0).Cell(0, 0).innerText;
  
  var code_pos = aqString.Find(msg, "Your code is ", 0, true);
  var code = aqString.SubString(msg, code_pos + 13, 9);
  obj.Keys("[BS]");
  
  TestedApps.gmail.Terminate();
  WaitSeconds(2, "Waiting for application to close...");
  
  return code;
}