//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_postcode()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_contact_address_path = patient_demographics_tab_contact_address();
  
  var post_code = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(4).Label("PostCode_DetachedLabel").contentText;
 
  return post_code;
}