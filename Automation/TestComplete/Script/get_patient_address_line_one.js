//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_address_line_one()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_contact_address_path = patient_demographics_tab_contact_address();
  
  var line_1 = patient_demographics_tab_contact_address_path.Panel(0).Label("FirstAddressLine_DetachedLabel").contentText;
  var line_2 = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(0).Label("SecondAddressLine_DetachedLabel").contentText;
  
  var address = line_1 + " " + line_2;
 
  return address;
}