//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
//New file to maintain new/consistent style and minimise duplication
//Use functions from here before anywhere else
//Add functions (in current style) if they are missing from here
//Put functions to handle popups if an existing handler does not work here
//-----------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
// Process Popup
//Test complete can cache objects on find calls
//this improves optimisation but can cause issues
//when checking object properties
//when checking, check additional properties, height/visible updates dynamically
function process_popup(header, button)
{
  var INRstarV5 = INRstar_base();
  INRstarV5.Refresh();
  
  if(header == "Important Information")
  {
    if(environment == "INRstarWindowsTatooine")
    {
      WaitSeconds(1);
    }
    else
    {
      WaitSeconds(5);
    }
  }
  var wbx = INRstarV5.NativeWebObject.Find("innerText", header);
  if (wbx.Exists == false || wbx.Height == 0)
  { 
    //Log.Message("'" + header + "' box not displayed");
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
//Some popups have 0 height buttons which cannot be clicked through a find
//to click these buttons the full path to the button must be used
//these also have a separate path to the inner text
function process_alternate_popup(header, button, button_index)
{
  WaitSeconds(1);
  var INRstarV5 = INRstar_base();
  
  if(button_index == null)
  {
    button_index = 0;
  }
  
  var wbx = INRstarV5.NativeWebObject.Find("innerText", header);
  if (wbx.Exists == false || wbx.Height == 0)
  { 
    Log.Message("'" + header + "' box not displayed");
    return "";
  }
  else
  { 
    //Log.Message("'" + header + "' box displayed");
    var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", button, "BUTTON");
    if (wb_Ok.Exists == false || wb_Ok.Visible == false)
    {
      Log.Message("'" + header + "' "+ button +" button not found");
      return "";
    }
    else
    {
      var text = INRstarV5.Panel(4).Panel("modalDialogBoxSecondary").innerText;
      Log.Message("Clicking '" + header + "' "+ button +" button ");
      INRstarV5.Panel(4).Panel(1).Panel(0).Button(button_index).Click();
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
}
//-------------------------------------------------------------------------------
//Handles the popup for external patient lookup, as that popup requires data entry
//will need to be revisited if more popups are found in the future that require data entry
function process_external_lookup_popup()
{
  WaitSeconds(4);
  var INRstarV5 = INRstar_base();
  var wbx = INRstarV5.NativeWebObject.Find("innerText", "Professional Registration Credentials");
  
  if (wbx.Exists == false || wbx.Height == 0)
  { 
    Log.Message("Professional Registration Credentials box not displayed");
    return "";
  }
  else
  { 
    Log.Message("Professional Registration Credentials box displayed");
    
    var reg_number = get_unique_number();
    
    INRstarV5.Panel(3).Panel("modalDialogBox").Panel("Email").Panel(0).Select("ProfessionalRole").ClickItem(3);
    INRstarV5.Panel(3).Panel("modalDialogBox").Panel("Email").Panel(0).Panel(0).Textbox("RegistrationNumber").innerText = reg_number;
    
    var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", "Update", "BUTTON");
    if (wb_Ok.Exists == false || wb_Ok.Height == 0)
    {
      Log.Message("Professional Registration Credentials - Update button not found");
      return "";
    }
    else
    {
      var text = INRstarV5.Panel(3).Panel("modalDialogBox").innerText;
      Log.Message("Clicking Professional Registration Credentials - Update button");
      Sys.HighlightObject(wb_Ok, 2);
      wb_Ok.Click();
      return text;
    }
  }
}
//-------------------------------------------------------------------------------
//These need to be looked at and decided whether or not they should be consolidated
//into 1 handling method
//this would be do-able via passing an array which would hold all relevant path extensions
//and an array with the matching data to modify
function process_bespoke_letters_popup(header, button)
{
  WaitSeconds(1);
  var INRstarV5 = INRstar_base();
  
  var wbx = INRstarV5.NativeWebObject.Find("innerText", header);
  if (wbx.Exists == false || wbx.Height == 0)
  { 
    Log.Message(header + " box not displayed");
    return "";
  }
  else
  { 
    Log.Message(header + " box displayed");
    var name_number = "Regression: " + get_unique_number();
    INRstarV5.Panel(3).Panel("modalDialogBox").Panel(0).Textbox("newName").innerText = name_number;
    
    var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", button, "BUTTON");
    if (wb_Ok.Exists == false || wb_Ok.Height == 0)
    {
      Log.Message(header + " - " + button + " button not found");
      return name_number;
    }
    else
    {
      Log.Message("Clicking " + header + " - " + button + " button");
      Sys.HighlightObject(wb_Ok, 2);
      wb_Ok.Click();
      return name_number;
    }
  }
}
//-------------------------------------------------------------------------------
function process_bridging_popup(header, button, content)
{
  var wbx = INRstar_base().NativeWebObject.Find("innerText", header);
  if (wbx.Exists == false || wbx.Height == 0)
  { 
    Log.Message("'" + header + "' box not displayed");
    return "";
  }
  else
  { 
    Log.Message("'" + header + "' box displayed");
    var wb_Ok = INRstar_base().NativeWebObject.Find("innerText", button, "BUTTON");
    if (wb_Ok.Exists == false || wb_Ok.Height == 0)
    {
      Log.Message("'" + header + "' "+ button +" button not found");
    }
    else
    {
      INRstar_base().Panel(3).Panel("modalDialogBox").Panel(0).Textarea("modalTextInput").innerText = content;
      Log.Message("Clicking '" + header + "' "+ button +" button ");
      Sys.HighlightObject(wb_Ok, 2);
      wb_Ok.Click();
      //INRstar_base().Panel(3).Panel(1).Panel(0).Button(1).TextNode(0).Click();
    }
  }
}
//-------------------------------------------------------------------------------
function process_email_popup(header, button)
{
  WaitSeconds(1);
  var INRstarV5 = INRstar_base();
  
  var wbx = INRstarV5.NativeWebObject.Find("innerText", header);
  if (wbx.Exists == false || wbx.Height == 0)
  { 
    //Log.Message(header + " box not displayed");
    return;
  }

  //Log.Message(header + " box displayed");
  INRstarV5.Panel(3).Panel("modalDialogBox").Panel("Email").Panel(0).Textbox("emailAddress").Text = "test@lumiradx.com";
  INRstarV5.Panel(3).Panel("modalDialogBox").Panel("Email").Panel(1).Textbox("confirmEmailAddress").Text = "test@lumiradx.com";
    
  var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", button, "BUTTON");
  if (wb_Ok.Exists == false || wb_Ok.Height == 0)
  {
    Log.Message(header + " - " + button + " button not found");
    return;
  }
  else
  {
    //Log.Message("Clicking " + header + " - " + button + " button");
    Sys.HighlightObject(wb_Ok, 2);
    wb_Ok.Click();
    return;
  }
}
//-------------------------------------------------------------------------------
function process_blue_popup()
{
  var INRstarV5 = INRstar_base();
  INRstarV5.Refresh();
  
  WaitSeconds(3);
  var obj = INRstarV5.NativeWebObject.Find("idStr", "changeMessageDialog4");
  
  if(obj.Exists)
  {
    Log.Message("Blue popup displayed.");
    Log.Message("Clicking 'OK' button.");
    obj.Panel("changeMessageDialog4Text").Panel(0).Panel(1).Button(0).Click();
  }
}
//-------------------------------------------------------------------------------