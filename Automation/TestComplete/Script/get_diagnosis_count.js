//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------

function get_diagnosis_count()
{
  Goto_Options_Diagnosis();
  var list = options_diagnosis_list();
  var list_count = list.wItemCount; 
  
  return list_count;
}