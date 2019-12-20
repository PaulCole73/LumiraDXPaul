﻿//USEUNIT engage_System_Paths
//USEUNIT System_Paths
//--------------------------------------------------------------------------------
function process_engage_popup(base_path_suffix, class_name, header, button)
{
  var base;
  if(base_path_suffix == "register")
  {
    base = engage_register_base();
  }
  else if(base_path_suffix == "signin")
  {
    base = engage_login_base();
  }
  else if(base_path_suffix == "main")
  {
    base = engage_base();
  }
  else if(base_path_suffix == "questionnaire")
  {
    base = engage_questionnaire_base();
  }
  
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
        Log.Message("Clicking '" + header + "' "+ button +" button ");
        Sys.HighlightObject(popup_button, 2);
        popup_button.Click();
      }
    }
  }
}