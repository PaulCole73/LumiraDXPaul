﻿//USEUNIT V5_Common
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Tests
//USEUNIT System_Paths

//-----------------------------------------------------------------------------------
//A place to put generic functions
//-----------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------
//Function for testing if field passed in is a label or can be edited
function test_field(p_field, p_field_name, exp_object_type)
{
  //get the object type based on expected and pass in
  if(exp_object_type == "read_only")
  {
    if (p_field.ObjectType == "Label") 
    {
      Log.Message(p_field_name + " " + "Field is read only TEST PASS");
      return true;
    }
    else
    {
      Log.Message(p_field_name + " " + "Field can be edited Field FAIL");
      return false;
    }
  }
  //Going to need to add in other type of fields here at the moment this method only handles drop down or label but other valid ones could be check box, text entry etc
  if(exp_object_type == "editable_field")
  {
    if (p_field.ObjectType == "Label") 
    {
      Log.Message(p_field_name + " " + "Field is read only TEST FAIL");
      return false;
    }
    else
    {
      Log.Message(p_field_name + " " + "Field can be edited Field PASS");
      return true;
    }
  }
}
//----------------------------------------------------------------------------------
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
function click_sorb_button(tab)
{
  var path = pending_treatment_buttons();
  panelPTI = path.Panel("PendingTreatmentInfo");
  
  if(tab == "suggested")
  {
    panelPTI.Panel(0).Button("SkipOrBoost0").Click();
  }
  else if (tab == "current")
  {
    panelPTI.Panel("DosingSchedule").Link("CurrentTab").Click();
    panelPTI.Panel(0).Button("SkipOrBoost1").Click(); 
  }   
}
//-----------------------------------------------------------------------------------
function click_current_tab()
{
  var path = pending_treatment_buttons();
  panelPTI = path.Panel("PendingTreatmentInfo");
  panelPTI.Panel("DosingSchedule").Link("CurrentTab").Click();
}
//-----------------------------------------------------------------------------------
function get_sorb_button_error_message()
{
  var error_box = sorb_button_error_message_path()
  var expected_err_mess = error_box.contentText;
  
  return expected_err_mess; 
}