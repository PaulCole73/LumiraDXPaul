//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_banner_error_message()
{
  var add_patient_error_banner_path = add_patient_error_banner();
  error_text = add_patient_error_banner_path.TextNode(0).contentText;
 
  return error_text;
}