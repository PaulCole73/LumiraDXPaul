//USEUNIT Login_to_INRstar

function TC_Log_On_To_INRstar_Valid_Credentials()
{

 SS_Login();
 
 var path1 = Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding", "").Window("Shell DocObject View", "", 1);
 var path2 = path1.Window("Internet Explorer_Server", "", 1).Page("http://scsl.inrstar.test/").Panel("MainPage").Panel("header").Panel("logindisplay").Panel("LoginStatus").TextNode(0);

 var logindetail = path2.contentText;
 //Log.Message(logindetail);
 
 if(logindetail == "clead @ Deans Testing Location")  
 {
    Log.Checkpoint("Pass");
 }
 else
    Log.Warning("Fail");
 
}