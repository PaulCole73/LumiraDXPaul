//USEUNIT engage_System_Paths
//USEUNIT System_Paths
//--------------------------------------------------------------------------------
function process_engage_popup(class_name, header, button)
{
  WaitSeconds(2, "Waiting for popups...");
  var base = engage_base();
  
  var obj = base.NativeWebObject.Find("className", class_name);
  if(obj.Exists)
  {
    var popup = base.NativeWebObject.Find("innerText", header);
    if (popup.Exists == false || popup.Height == 0)
    { 
      Log.Message("'" + header + "' box not displayed");
      return "";
    }
    else
    { 
      Log.Message("'" + header + "' box displayed");
      var popup_button = base.NativeWebObject.Find("innerText", button, "BUTTON");
      if (popup_button.Exists == false || popup_button.Height == 0)
      {
        Log.Message("'" + header + "' "+ button +" button not found");
      }
      else
      {
        var text = obj.Panel(0).Panel(0).contentText;
        Log.Message("Clicking '" + header + "' "+ button +" button ");
        Sys.HighlightObject(popup_button, 2);
        popup_button.Click();
        
        return text;
      }
    }
  }
  else
  {
    Log.Message("No popup appeared");
  }
}