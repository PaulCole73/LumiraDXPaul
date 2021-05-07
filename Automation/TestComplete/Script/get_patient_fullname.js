//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_fullname()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_path = patient_demographics_tab_demographics();
  
  //Demograhics Pane
  var surname = patient_demographics_tab_path.Panel(3).Label("Surname_DetachedLabel").contentText;
  var firstname = patient_demographics_tab_path.Panel(4).Label("FirstName_DetachedLabel").contentText;  
  
  var patient_fullname = surname + ', ' + firstname
 
  return patient_fullname;  
}