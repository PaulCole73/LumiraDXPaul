
// This is a bit of a point of failure, sometimes the location of the address bar is BrowserWindow() and sometimes it can be BrowserWindow(0)!
// Ideally need to fix this so it is identified rather than hard coded below but at least the problem is isolated in this file
function get_browser_address_bar_path(size)
{
  if(size == "full")
  {
     var stem = Aliases.iexplore1.BrowserWindow().Window("WorkerW", "Navigation Bar", 1).Window("ReBarWindow32", "", 1).Window("Address Band Root", "Address Bar", 1).Window("Edit", "", 1);
  }
  if(size == "short")
  {
    var stem = Aliases.iexplore1.BrowserWindow();
  }
  return stem;
}