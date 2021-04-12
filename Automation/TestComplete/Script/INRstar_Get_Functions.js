//USEUNIT TSA_Patient
//-----------------------------------------------------------------------------------
//Returning details from blue banner as an object

function inrstar_get_patient_details_object_from_bluebar()
{
  var patient_details_blue_bar = new Object();
  var patient_banner_blue_bar_path = path_inrstar_patient_banner_blue_bar();
  
  var patient_details_blue_bar = {
  fullname_and_title : patient_banner_blue_bar_path.Panel(0).Label("Name").contentText,
  active_status : patient_banner_blue_bar_path.Panel(1).Panel(0).Label("PatientStatusDisplay_DetachedLabel").contentText,
  born_and_age : patient_banner_blue_bar_path.Panel(2).Panel(0).Label("DateOfBirth_DetachedLabel").contentText,
  gender : patient_banner_blue_bar_path.Panel(2).Panel(1).Label("Gender_DetachedLabel").contentText,
  patientid : patient_banner_blue_bar_path.Panel(3).Panel(0).Label("INRstarId_DetachedLabel").contentText,
  nhs_fiscal : patient_banner_blue_bar_path.Panel(3).Panel(1).Label("NHSNumber_DetachedLabel").contentText,
  patient_number : patient_banner_blue_bar_path.Panel(3).Panel(2).Label("PatientNumber_DetachedLabel").contentText
  }
  return patient_details_blue_bar;
}
//-----------------------------------------------------------------------------------