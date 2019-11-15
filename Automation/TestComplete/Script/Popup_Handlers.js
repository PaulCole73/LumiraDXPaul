//USEUNIT System_Paths
//USEUNIT Navigation

//-----------------------------------------------------------------------------------
//New file to maintain new/consistent style and minimise duplication
//Use functions from here before anywhere else
//Add functions (in current style) if they are missing from here
//Put functions to handle popups if an existing handler does not work here
//-----------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
// Process Popup 
function process_popup(header, button)
{
  WaitSeconds(1);
  var INRstarV5 = INRstar_base();
  var wbx = INRstarV5.NativeWebObject.Find("innerText", header);
  
  if (wbx.Exists == false || wbx.Height == 0)
  { 
    Log.Message("'" + header + "' box not displayed");
    return "";
  }
  else
  { 
    Log.Message("'" + header + "' box displayed");
    var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", button, "BUTTON");
    if (wb_Ok.Exists == false || wb_Ok.Height == 0)
    {
      Log.Message("'" + header + "' "+ button +" button not found");
      return "";
    }
    else
    {
      var text = INRstarV5.Panel(3).Panel("modalDialogBox").innerText;
      Log.Message("Clicking '" + header + "' "+ button +" button ");
      Sys.HighlightObject(wb_Ok, 2);
      wb_Ok.Click();
      return text;
    }
  }
}
//-------------------------------------------------------------------------------
// Process Clinic Popup 
function process_clinic_popup(header, button)
{
  var INRstarV5 = INRstar_base();
  
  // Find the 'Confirmation Required' Panel
  var wbx = INRstarV5.NativeWebObject.Find("innerText", header);
  if (wbx.Exists == false || wbx.Height == 0)
  {  
    Log.Message("'" + header + "' box not displayed");
  }
  else
  {
    Log.Message("'" + header + "' box displayed");
  }
  // Find the button
  var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", button, "BUTTON");

  if (wb_Ok.Exists == false || wb_Ok.Height == 0)
  {
    Log.Message("'" + header + "' "+ button +" button not found");
    return "";
  }
  else
  {
    var text = INRstarV5.Panel(4).Panel("modalDialogBoxSecondary").innerText;
    Log.Message("Clicking '" + header + "' "+ button +" button "); 
    WaitSeconds(3);
    Sys.HighlightObject(wb_Ok, 3);
    wb_Ok.Click();
    return text;
  } 
}