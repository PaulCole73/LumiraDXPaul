//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Get_Functions
//USEUNIT Misc_Functions

//--------------------------------------------------------------------------------
function popup_warning_checker(exp_err_mess)
{
  var INRstarV5 = INRstar_base(); 
  var pop_up_warning_message_path = pop_up_warning_message();
  var actual_err_mess = pop_up_warning_message_path.contentText; 
  var warning_dialogue = INRstarV5.NativeWebObject.Find("idStr", "modalDialogBox");
  
    if (warning_dialogue.Exists && exp_err_mess==actual_err_mess)
    {
      Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess );
      return true; 
    } 
    else 
    {
      Log.Message('Message was either not displayed or the text did not match the expected result it was this //' + actual_err_mess + "// but this is what was expected //" + exp_err_mess + "//")
      return false;
    }
} 
//--------------------------------------------------------------------------------