//USEUNIT Admin_Dash_System_Paths
//USEUNIT System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function process_admin_dash_popup(header, button)
{
  admin_dash_base().Refresh();
  wait_for_object(admin_dash_base(), "idStr", "modalDialogBox", 2);
  var obj = admin_dash_base().NativeWebObject.Find("contentText", header);
  
  if (obj.Exists == false || obj.Height == 0)
  { 
    Log.Message("'" + header + "' box not displayed");
    return "";
  }
  else
  { 
    Log.Message("'" + header + "' box displayed");
    var obj_button = admin_dash_base().NativeWebObject.Find("innerText", button, "BUTTON");
    if (obj_button.Exists == false || obj_button.Height == 0)
    {
      Log.Message("'" + header + "' "+ button +" button not found");
      return "";
    }
    else
    {
      var text = admin_dash_base().Panel(2).Panel("modalDialogBox").innerText;
      Log.Message("Clicking '" + header + "' "+ button +" button ");
      Sys.HighlightObject(obj_button, 2);
      obj_button.Click();
      return text;
    }
  }
}