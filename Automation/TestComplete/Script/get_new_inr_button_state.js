//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_new_inr_button_state()
{
  var state;
  Goto_Patient_Treatment();
  var new_inr_button = new_inr_button_path();
  state = new_inr_button.enabled;
  
  return state;
}