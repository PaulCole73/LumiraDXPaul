//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_external_result_popup_new_inr_button_text(timestamp_external_result)
{
  click_external_result_by_timestamp(timestamp_external_result, "Dose");
  
  var INRstarV5 = INRstar_base();
  var warning_dialogue = INRstarV5.NativeWebObject.Find("idStr", "modalDialogBox");
  var button_text

    if(warning_dialogue.Exists)
    {
      var pop_up_button_path = warning_pop_up();
      button_text = pop_up_button_path.Button(1).contentText
      pop_up_button_path.Button(0).Click();      
    }
    else
    {
      Log.Message("Warning pop up doesn't exist");
    }
   return button_text;
}