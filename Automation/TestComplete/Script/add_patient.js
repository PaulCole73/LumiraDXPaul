//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Get_Functions
//USEUNIT Misc_Functions

//--------------------------------------------------------------------------------
function add_patient(name_first, name_last, sex, nhs_num)
{ 
  var patient_details = create_patient_object_for_fiscal(name_first, name_last, sex);
    
  var INRstarV5 = INRstar_base();    
  Goto_Add_Patient();
  var patient_area = add_patient_demographics_system_path();

  var panelEPD = patient_area.Panel("EditPatientDetails");
    
  if(nhs_num == null || nhs_num == "")
  {
    if(language == "English")
    {
      var w_nhs = panelEPD.Panel(1).Textbox("NHSNumber").Text = get_new_number_v5();
    }
    else if(language == "Italian")
    {
      patient_details.nhs_number = get_fiscal_code();
      var w_nhs = panelEPD.Panel(1).Textbox("NHSNumber").Text = patient_details.nhs_number;
    }
  }
  else if(nhs_num == " ")
  {
    //do nothing, leave empty - use a single whitespace character to indicate no/null nhs field
  }
  else 
  {
    var w_nhs = panelEPD.Panel(1).Textbox("NHSNumber").Text = nhs_num;
  }
    
  panelEPD.Panel(0).Textbox("PatientNumber").Text = patient_details.patient_number;
       
  //Italy has removed the option for Ms and Miss 
  //If we want to add in the other titles to click then add new function when required     
  panelEPD.Panel(2).Select("Title").ClickItem(patient_details.title);
  panelEPD.Panel(3).Textbox("Surname").Text = patient_details.last_name;
  panelEPD.Panel(4).Textbox("FirstName").Text = patient_details.first_name;

  var path = add_patient_demographics_system_path().Panel("EditPatientDetails");
  
  if(language == "Italian")
  {
    var date = convert_date_format(patient_details.dob, "%d/%m/%Y", "Italian");
  }
  else
  {
    var date = convert_date_format(patient_details.dob, "%d/%m/%Y", "english");
  }
  
  date_picker(path, date);

  var panelEPCD = patient_area.Panel("EditPatientContactDetails");
  panelEPCD.Panel(0).Textbox("FirstLineAddress").Text = patient_details.first_addressLine;
  panelEPCD.Panel(1).Textbox("SecondLineAddress").Text = patient_details.second_addressLine;
  panelEPCD.Panel(2).Textbox("ThirdLineAddress").Text = patient_details.third_addressLine;
  panelEPCD.Panel(3).Textbox("Town").Text = patient_details.town;
  panelEPCD.Panel(4).Textbox("County").Text = patient_details.county;
  panelEPCD.Panel(6).Textbox("Phone").Text = patient_details.phone;
  panelEPCD.Panel(5).Textbox("Postcode").Text = patient_details.post_code;
  panelEPCD.FindChild("idStr", "Mobile", 3).Text = patient_details.phone;
  panelEPCD.FindChild("idStr", "Email", 3).Text = patient_details.email;
    
  var button_area = add_patient_demographics_buttons_system_path()
  var save_button = button_area.Panel(0).SubmitButton("AddPatientDetails");
      
  save_button.Click();
  //process_popup(get_string_translation("Unable to synchronize with the LumiraDX instrument"), get_string_translation("Close"));
  
  var patient_root = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  wait_for_object(patient_root, "idStr", "PatientBannerContainer", 2, 1, 20);
}
//--------------------------------------------------------------------------------