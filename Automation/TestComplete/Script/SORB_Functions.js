//USEUNIT V5_Common
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Tests
//USEUNIT System_Paths

//-----------------------------------------------------------------------------------
//SORB Functions
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SORB ONLY FUNCTIONS //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------
//Generic method for checking a buttons status when you pass in the path for the button
function check_button(path)
{
  if (path.className == "Button disabled" || path.className == "disabled")
  {
    Log.Message("Button is disabled")
    return "disabled"
  }
  else
  {
    Log.Message("Button is enabled")
    return "enabled"
  }
}
//-----------------------------------------------------------------------------------
function test_data_individual_step(data_1,data_2,test_mess)
{
  if (data_1 == null)
  {
    Log.Warning("Error message not found");
    return false;
  } 
 
  if (data_1 == data_2)
  {
    Log.Message("Test Passed - " + test_mess);
    return true;
  }
  else
  { 
    Log.Warning("Messages dont match test failed - " + test_mess + " //" + data_1 + "//" + data_2 + "//");
    return false;
  }
}
//----------------------------------------------------------------------------------- 
function cancel_pending_sorb_treatment()
{
  var INRstarV5 = INRstar_base();
  var sorb_finish_buttons = sorb_schedule_finish_buttons()
  sorb_finish_buttons.Button("CancelPendingTreatment").Click();
  WaitSeconds(1);
  INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).TextNode(0).Click();
}
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
function get_sorb_button_error_message()
{
  var error_box = sorb_button_error_message_path()
  var expected_err_mess = error_box.contentText;
  
  return expected_err_mess; 
}