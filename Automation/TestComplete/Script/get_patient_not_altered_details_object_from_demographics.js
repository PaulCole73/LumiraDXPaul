//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_not_altered_details_object_from_demographics()
{
  var patient_demographics = new Object();
  Goto_Patient_Demographics();  
  
  var patient_demographics_tab_demographics_path = patient_demographics_tab_demographics();
  var patient_demographics_tab_contact_address_path = patient_demographics_tab_contact_address();
  
  var patient_demographics = {
  patient_number: patient_demographics_tab_demographics_path.Panel(0).Label("PatientNumber_DetachedLabel").contentText, 
  nhs_number: patient_demographics_tab_demographics_path.Panel(1).Label("NHSNumber_DetachedLabel").contentText,
  title: patient_demographics_tab_demographics_path.Panel(2).Label("Title_DetachedLabel").contentText,
  last_name: patient_demographics_tab_demographics_path.Panel(3).Label("Surname_DetachedLabel").contentText,
  first_name: patient_demographics_tab_demographics_path.Panel(4).Label("FirstName_DetachedLabel").contentText,
  dob: patient_demographics_tab_demographics_path.Panel(5).Label("Born_DetachedLabel").contentText,
  sex: patient_demographics_tab_demographics_path.Panel(6).Label("Sex_DetachedLabel").contentText,
  gender: patient_demographics_tab_demographics_path.Panel(7).Label("Gender_DetachedLabel").contentText,
  first_addressLine: patient_demographics_tab_contact_address_path.Panel(0).Label("FirstAddressLine_DetachedLabel").contentText,
  second_addressLine: patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(0).Label("SecondAddressLine_DetachedLabel").contentText,
  third_addressLine: patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(1).Label("ThirdAddressLine_DetachedLabel").contentText,
  town: patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(2).Label("FourthAddressLine_DetachedLabel").contentText,
  county: patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(3).Label("FifthAddressLine_DetachedLabel").contentText,
  post_code: patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(4).Label("PostCode_DetachedLabel").contentText,
  phone: patient_demographics_tab_contact_address_path.Panel(1).Label("Phone_DetachedLabel").contentText,
  email: patient_demographics_tab_contact_address_path.FindChild("idStr", "Email_DetachedLabel", 2).contentText}; //Panel(4).Label("Email_DetachedLabel").contentText};
  
  return patient_demographics;
}