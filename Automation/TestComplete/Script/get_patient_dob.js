//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_dob()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_path = patient_demographics_tab_demographics();
  
  var dob =  patient_demographics_tab_path.Panel(5).Label("Born_DetachedLabel").contentText;
 
  return dob; 
}