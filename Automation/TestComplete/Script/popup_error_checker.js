//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Get_Functions
//USEUNIT Misc_Functions

//--------------------------------------------------------------------------------
function popup_error_checker(exp_err_mess)
{
  var INRstarV5 = INRstar_base(); 
  var pop_up_error_message_path = pop_up_error_message();
  var actual_err_mess = pop_up_error_message_path.contentText; 
   
     if (exp_err_mess==actual_err_mess)
       {
        Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess );
        return true; 
       } 
        else 
        {
        Log.Warning('Message was displayed but the text did not match the expected result it was ' + actual_err_mess)
        return false;
        }
} 
//--------------------------------------------------------------------------------