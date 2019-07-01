//------------------------------------------------------------------------
// Main page at login  area

function set_system_login_page()
{
    var w_system = "Client";
    
    if (w_system == "Client")
    {
       var p1 = Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding", "")
       var INRstar = p1.Window("Shell DocObject View", "", 1).Window("Internet Explorer_Server", "", 1).Page("https://inrstar-starsky.lumiradxcaresolutions.com/*");
    }
   return INRstar;
} 
//------------------------------------------------------------------------
// Main page once logged in

function set_system()
{
    var w_system = "Client";
    
    if (w_system == "Client")
    {
       var p1 = Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding", "")
       INRstar = p1.Window("Shell DocObject View", "", 1).Window("Internet Explorer_Server", "", 1).Page("https://inrstar-starsky.lumiradxcaresolutions.com/*");
    }
   return INRstar;
} 