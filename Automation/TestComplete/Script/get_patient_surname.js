//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_surname()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_demographics_path = patient_demographics_tab_demographics();
  var surname =  patient_demographics_tab_demographics_path.Panel(3).Label("Surname_DetachedLabel").contentText;
          
  return surname;
}