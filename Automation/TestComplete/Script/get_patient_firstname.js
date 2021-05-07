//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_firstname()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_demographics_path = patient_demographics_tab_demographics();
  var firstname =  patient_demographics_tab_demographics_path.Panel(4).Label("FirstName_DetachedLabel").contentText;
          
  return firstname;
}