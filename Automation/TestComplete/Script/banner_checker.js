//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Get_Functions
//USEUNIT Misc_Functions

//--------------------------------------------------------------------------------
function banner_checker(exp_err_mess)
{
  WaitSeconds(1)
  var INRstarV5 = INRstar_base(); 
  var patient_banner_yellow_bar_path = patient_banner_yellow_bar();
  var actual_err_mess = patient_banner_yellow_bar_path.contentText; 
   
  if (exp_err_mess==actual_err_mess)
  {
    Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess );
    return true; 
  } 
  else 
  {
    Log.Message('Message was displayed but the text did not match the expected result it was ' + actual_err_mess + " // And I was looking for //" + exp_err_mess);
    return false;
  }
} 
//--------------------------------------------------------------------------------