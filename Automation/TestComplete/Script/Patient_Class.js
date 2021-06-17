//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------

function patient_class()
{
  var patient_number;
  var nhs_number;
  var title;
  var last_name;
  var first_name;
  var dob;
  var sex;
  var gender;
  var first_addressline;
  var second_addressline;
  var third_addressline;
  var town;
  var county;
  var post_code;
  var phone;
  var email; 
}
//--------------------------------------------------------------------------------
patient_class.prototype.setup_default_patient_data = function()
{
  this.patient_number = new_guid(10);
  if(language == "English")
  {
    this.nhs_number = get_new_number_v5();
    this.post_code = "TR15 3NB";
  }
  else
  {
    this.nhs_number = get_fiscal_code();
    this.post_code = "12345";
  }
  this.title = get_string_translation("Mr");
  this.last_name = "patient_" + new_guid(4);
  this.first_name = "default_" + new_guid(4);
  this.dob = convert_date_format(get_date_with_days_from_today_dd_mm_yyyy(-7300), "numeric", "%d-%b-%Y");
  this.sex = "M";
  this.gender = "M";
  this.first_addressline = "first";
  this.second_addressline = "second";
  this.third_addressline = "third";
  this.town = "my town";
  this.county = "my county";
  this.phone = "0123456789";
  this.email = "automationlumira+" + new_guid(6) + "@gmail.com";
}
//--------------------------------------------------------------------------------
patient_class.prototype.override_default_patient_data = function(object_with_patient_overrides)
{ 
  if(object_with_patient_overrides != null)
  {
    for(var item in object_with_patient_overrides)
    {
      this[item] = object_with_patient_overrides[item];
    }
  }
}
//--------------------------------------------------------------------------------
patient_class.prototype.add_patient_to_inrstar = function(object_with_patient_overrides)
{
  this.setup_default_patient_data();
  this.output_patient_data();
  this.override_default_patient_data(object_with_patient_overrides);
  this.output_patient_data();
      
  Goto_Add_Patient();
  var patient_area = add_patient_demographics_system_path();
  var edit_patient_details_panel = patient_area.Panel("EditPatientDetails");
  var edit_patient_contact_details_panel = patient_area.Panel("EditPatientContactDetails");
  var datepicker_path = patient_area.Panel("EditPatientDetails");
 
  edit_patient_details_panel.Panel(1).Textbox("NHSNumber").Text = this.nhs_number;
  edit_patient_details_panel.Panel(0).Textbox("PatientNumber").Text = this.patient_number; 
  edit_patient_details_panel.Panel(2).Select("Title").ClickItem(this.title);
  edit_patient_details_panel.Panel(3).Textbox("Surname").Text = this.last_name;
  edit_patient_details_panel.Panel(4).Textbox("FirstName").Text = this.first_name;

  
  if(language == "Italian")
  {
    var date = convert_date_format(this.dob, "Italian", "%d/%m/%Y");
  }
  else
  {
    var date = convert_date_format(this.dob, "English", "%d/%m/%Y");
  }
  
  date_picker(datepicker_path, date);
  
  edit_patient_contact_details_panel.Panel(0).Textbox("FirstLineAddress").Text = this.first_addressline;
  edit_patient_contact_details_panel.Panel(1).Textbox("SecondLineAddress").Text = this.second_addressline;
  edit_patient_contact_details_panel.Panel(2).Textbox("ThirdLineAddress").Text = this.third_addressline;
  edit_patient_contact_details_panel.Panel(3).Textbox("Town").Text = this.town;
  edit_patient_contact_details_panel.Panel(4).Textbox("County").Text = this.county;
  edit_patient_contact_details_panel.Panel(6).Textbox("Phone").Text = this.phone;
  edit_patient_contact_details_panel.Panel(5).Textbox("Postcode").Text = this.post_code;
  edit_patient_contact_details_panel.FindChild("idStr", "Mobile", 3).Text = this.phone;
  edit_patient_contact_details_panel.FindChild("idStr", "Email", 3).Text = this.email;
    
  var save_button = add_patient_demographics_buttons_system_path().Panel(0).SubmitButton("AddPatientDetails");  
  save_button.Click();
  
  wait_for_object(path_main_content_panel(), "idStr", "PatientBannerContainer", 2, 1, 20);
}
//--------------------------------------------------------------------------------
patient_class.prototype.output_patient_data = function()
{
  Log.Message(JSON.stringify(this));
}