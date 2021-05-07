//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_demographics()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_path = patient_demographics_tab_demographics();
  
  var patient_data_array = new Array()
  
  if(language == "English") 
  {
    //Demograhics Pane
    var pat_num = patient_demographics_tab_path.Panel(0).Label("PatientNumber_DetachedLabel").contentText;
    var nhs_num = patient_demographics_tab_path.Panel(1).Label("NHSNumber_DetachedLabel").contentText;
    var title = patient_demographics_tab_path.Panel(2).Label("Title_DetachedLabel").contentText;
    var surname = patient_demographics_tab_path.Panel(3).Label("Surname_DetachedLabel").contentText;
    var firstname = patient_demographics_tab_path.Panel(4).Label("FirstName_DetachedLabel").contentText;  
    var born =  patient_demographics_tab_path.Panel(5).Label("Born_DetachedLabel").contentText;
    var sex =  patient_demographics_tab_path.Panel(6).Label("Sex_DetachedLabel").contentText;
    var gender =  patient_demographics_tab_path.Panel(7).Label("Gender_DetachedLabel").contentText;
    var ethnicity =  patient_demographics_tab_path.Panel(8).Label("Ethnicity_DetachedLabel").contentText;
    var lang =  patient_demographics_tab_path.Panel(9).Label("SpokenLanguage_DetachedLabel").contentText;
    var mar_status =  patient_demographics_tab_path.Panel(10).Label("MartialStatus_DetachedLabel").contentText;
  
    var patient_demographics_tab_contact_address_path = patient_demographics_tab_contact_address();
  
    var line_1 = patient_demographics_tab_contact_address_path.Panel(0).Label("FirstAddressLine_DetachedLabel").contentText;
    var line_2 = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(0).Label("SecondAddressLine_DetachedLabel").contentText;
    var line_3 = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(1).Label("ThirdAddressLine_DetachedLabel").contentText;
    var town = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(2).Label("FourthAddressLine_DetachedLabel").contentText;
    var county = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(3).Label("FifthAddressLine_DetachedLabel").contentText;
    var post_code = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(4).Label("PostCode_DetachedLabel").contentText;
    var tel = patient_demographics_tab_contact_address_path.Panel(1).Label("Phone_DetachedLabel").contentText;
    var mobile = patient_demographics_tab_contact_address_path.Panel(2).Label("Mobile_DetachedLabel").contentText;
    var email = patient_demographics_tab_contact_address_path.Panel(3).Label("Email_DetachedLabel").contentText;
  
    patient_data_array.push(pat_num, nhs_num, title, surname, firstname, born, sex, gender, ethnicity, lang, mar_status, line_1, line_2, line_3, town, county , post_code, tel, mobile, email); 
  }
  else
  {
    //Demograhics Pane
    var pat_num = patient_demographics_tab_path.Panel(0).Label("PatientNumber_DetachedLabel").contentText;
    var nhs_num = patient_demographics_tab_path.Panel(1).Label("NHSNumber_DetachedLabel").contentText;
    var title = patient_demographics_tab_path.Panel(2).Label("Title_DetachedLabel").contentText;
    var surname = patient_demographics_tab_path.Panel(3).Label("Surname_DetachedLabel").contentText;
    var firstname = patient_demographics_tab_path.Panel(4).Label("FirstName_DetachedLabel").contentText;  
    var born =  patient_demographics_tab_path.Panel(5).Label("Born_DetachedLabel").contentText;
    var sex =  patient_demographics_tab_path.Panel(6).Label("Sex_DetachedLabel").contentText;
    var gender =  patient_demographics_tab_path.Panel(7).Label("Gender_DetachedLabel").contentText;
    //var ethnicity =  patient_demographics_tab_path.Panel(8).Label("Ethnicity_DetachedLabel").contentText;
    //var language =  patient_demographics_tab_path.Panel(9).Label("SpokenLanguage_DetachedLabel").contentText;
    //var mar_status =  patient_demographics_tab_path.Panel(10).Label("MartialStatus_DetachedLabel").contentText;
  
    var patient_demographics_tab_contact_address_path = patient_demographics_tab_contact_address();
  
    var line_1 = patient_demographics_tab_contact_address_path.Panel(0).Label("FirstAddressLine_DetachedLabel").contentText;
    var line_2 = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(0).Label("SecondAddressLine_DetachedLabel").contentText;
    var line_3 = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(1).Label("ThirdAddressLine_DetachedLabel").contentText;
    var town = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(2).Label("FourthAddressLine_DetachedLabel").contentText;
    var county = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(3).Label("FifthAddressLine_DetachedLabel").contentText;
    var post_code = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(4).Label("PostCode_DetachedLabel").contentText;
    var tel = patient_demographics_tab_contact_address_path.Panel(1).Label("Phone_DetachedLabel").contentText;
    var mobile = patient_demographics_tab_contact_address_path.Panel(3).Label("Mobile_DetachedLabel").contentText;
    var email = patient_demographics_tab_contact_address_path.Panel(4).Label("Email_DetachedLabel").contentText;
  
    patient_data_array.push(pat_num, nhs_num, title, surname, firstname, born, sex, gender, "ethnicity", "language", "mar_status", line_1, line_2, line_3, town, county , post_code, tel, mobile, email); 
  }

  for(var i = 0; i < patient_data_array.length; i++)
  {
    Log.Message("Array element: " + i + " is " + patient_data_array[i]);
  }
   
  return patient_data_array;  
}