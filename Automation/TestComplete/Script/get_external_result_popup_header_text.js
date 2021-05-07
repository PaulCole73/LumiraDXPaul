//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_external_result_popup_header_text(timestamp_external_result)
{
  click_external_result_by_timestamp(timestamp_external_result, "Dose");
  
  var INRstarV5 = INRstar_base();
  var warning_dialogue = INRstarV5.NativeWebObject.Find("idStr", "modalDialogBox");
  var header_text;

    if(warning_dialogue.Exists)
    {
      header_text = INRstarV5.Panel(3).Panel(0).TextNode("ui_dialog_title_modalDialogBox").contentText;      
      var pop_up_button_path = warning_pop_up();
      pop_up_button_path.Button(0).Click();
    }
    else
    {
      Log.Message("Warning pop up doesn't exist");
    }
    return header_text;
}