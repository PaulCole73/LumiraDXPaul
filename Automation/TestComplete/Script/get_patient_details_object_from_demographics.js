//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_details_object_from_demographics()
{
  var patient_details = new Object();
  Goto_Patient_Demographics();  
  
  var patient_banner_blue_bar_path = path_inrstar_patient_banner_blue_bar();
  var patient_demographics_tab_demographics_path = patient_demographics_tab_demographics();
  
  patient_details.patientid = patient_banner_blue_bar_path.Panel(3).Panel(0).Label("INRstarId_DetachedLabel").contentText;
  patient_details.first_name = patient_demographics_tab_demographics_path.Panel(4).Label("FirstName_DetachedLabel").contentText;
  patient_details.last_name = patient_demographics_tab_demographics_path.Panel(3).Label("Surname_DetachedLabel").contentText;
  patient_details.nhs_number = patient_demographics_tab_demographics_path.Panel(1).Label("NHSNumber_DetachedLabel").contentText.replace(/\s/g, ""); // Remove Whitespaces
  patient_details.dob = patient_demographics_tab_demographics_path.Panel(5).Label("Born_DetachedLabel").contentText;
  patient_details.dob_as_dd_mm_yyyy = convert_date_from_dd_mmm_yyyy_to_get_date_as_dd_mm_yyyy(patient_details.dob);
  patient_details.gender = patient_demographics_tab_demographics_path.Panel(7).Label("Gender_DetachedLabel").contentText.substring(0,1); //returns M or F
  patient_details.fullname = patient_details.last_name + ', ' + patient_details.first_name;  

  return patient_details;
}