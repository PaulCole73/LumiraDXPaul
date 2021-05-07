//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_management_banner_message()
{
  Goto_Patient_Management();
  var text = pat_management_status_confirmation_message().contentText;
  
  return text;
}