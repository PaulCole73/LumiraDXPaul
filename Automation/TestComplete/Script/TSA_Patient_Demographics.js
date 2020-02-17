//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function edit_all_patient_demographics(gender)
{
  //This function will read in the existing field, amend the data and check the data is then different, if the data is the same after the edit then re-run the change until it is different
  Goto_Edit_Patient_Demographics();
  
  var INRstarV5 = INRstar_base();
  var patient_edit_demographics_form_pat_details_path = patient_edit_demographics_form_pat_details();
  
  var obj_root = patient_edit_demographics_form_pat_details();
  wait_for_object(obj_root, "Name", "TextNode(0)", 1);
  
  //Pat number
  new_pat_num = new_guid(20);
  var data_before = patient_edit_demographics_form_pat_details_path.Panel(0).Textbox("PatientNumber").Text;
  patient_edit_demographics_form_pat_details_path.Panel(0).Textbox("PatientNumber").Text = new_pat_num;
  var data_after = patient_edit_demographics_form_pat_details_path.Panel(0).Textbox("PatientNumber").Text;
  
  //Check data is now different
  while (data_before == data_after)
  {
    new_pat_num = NewPat_num()
    patient_edit_demographics_form_pat_details_path.Panel(0).Textbox("PatientNumber").Text = new_pat_num;
    data_after = patient_edit_demographics_form_pat_details_path.Panel(0).Textbox("PatientNumber").Text;
  }
  
  //NHS Number
  data_before = patient_edit_demographics_form_pat_details_path.Panel(1).Textbox("NHSNumber").Text;
  var w_nhs = patient_edit_demographics_form_pat_details_path.Panel(1).Textbox("NHSNumber").Text = get_new_number_v5();
  data_after = patient_edit_demographics_form_pat_details_path.Panel(1).Textbox("NHSNumber").Text;
  
  //Check data is now different
  while (data_before == data_after)
  {
    var w_nhs = patient_edit_demographics_form_pat_details_path.Panel(1).Textbox("NHSNumber").Text = get_new_number_v5();
    data_after = patient_edit_demographics_form_pat_details_path.Panel(1).Textbox("NHSNumber").Text;
  } 
  
  //Title, Sex, and Gender this one is handled slightly differently due to complexity with defaulting other fields, always edit to be a male
  if (gender == "M" || gender == "m")
  {
    patient_edit_demographics_form_pat_details_path.Panel(2).Select("Title").ClickItem("Mr");
  }
  else
  {
    patient_edit_demographics_form_pat_details_path.Panel(2).Select("Title").ClickItem("Mrs");
  }
  
  //Family Name
  data_before = patient_edit_demographics_form_pat_details_path.Panel(3).Textbox("Surname").Text;
  patient_edit_demographics_form_pat_details_path.Panel(3).Textbox("Surname").Text = "Edited " + aqConvert.IntToStr(Math.floor(Math.random()*1000));
  data_after = patient_edit_demographics_form_pat_details_path.Panel(3).Textbox("Surname").Text;
  
  //Check data is now different
  while (data_before == data_after)
  {
    patient_edit_demographics_form_pat_details_path.Panel(3).Textbox("Surname").Text = "Edited" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
    data_after = patient_edit_demographics_form_pat_details_path.Panel(3).Textbox("Surname").Text;
  }
  
  //Given Name
  data_before = patient_edit_demographics_form_pat_details_path.Panel(4).Textbox("FirstName").Text;
  patient_edit_demographics_form_pat_details_path.Panel(4).Textbox("FirstName").Text = "Edited " + aqConvert.IntToStr(Math.floor(Math.random()*1000));
  data_after = patient_edit_demographics_form_pat_details_path.Panel(4).Textbox("FirstName").Text;
  
  //Check data is now different
  while (data_before == data_after)
  {
    patient_edit_demographics_form_pat_details_path.Panel(4).Textbox("FirstName").Text = "Edited" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
    data_after = patient_edit_demographics_form_pat_details_path.Panel(4).Textbox("FirstName").Text;
  } 
  
  //Born
  data_before = patient_edit_demographics_form_pat_details_path.Panel(5).Textbox("PatientBorn").text;
  var date = data_before;
  
  // Set the Treatment Date
  var w_yr = aqString.SubString(date,7,2);
  
  var w_yr_amended = w_yr + aqConvert.IntToStr(Math.floor(Math.random()*9)+1) + aqConvert.IntToStr(Math.floor(Math.random()*8));
  
  patient_edit_demographics_form_pat_details_path.Panel(5).Image("calendar_png").Click();
      
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr_amended));
  datepicker.Table(0).Cell(3, 3).Link(0).Click();
  
  data_after = patient_edit_demographics_form_pat_details_path.Panel(5).Textbox("PatientBorn").Text;
  
  //Check data is now different
  while (data_before == data_after)
  {
    var w_yr = aqString.SubString(date,7,2);
  
    var w_yr_amended = w_yr + aqConvert.IntToStr(Math.floor(Math.random()*9)) + aqConvert.IntToStr(Math.floor(Math.random()*9));
  
    patient_edit_demographics_form_pat_details_path.Panel(5).Image("calendar_png").Click();
      
    datepicker = INRstarV5.Panel("ui_datepicker_div");
    datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr_amended));
    datepicker.Table(0).Cell(3, 3).Link(0).Click();
    data_after = patient_edit_demographics_form_pat_details_path.Panel(5).Textbox("PatientBorn").Text;
  }

  //Ethnicity
  data_before = patient_edit_demographics_form_pat_details_path.Panel(8).Select("Ethnicity").wText;
  patient_edit_demographics_form_pat_details_path.Panel(8).Select("Ethnicity").ClickItem((Math.random()*17));
  data_after = patient_edit_demographics_form_pat_details_path.Panel(8).Select("Ethnicity").wText;
  
  //Check data is now different
  while (data_before == data_after)
  {
    patient_edit_demographics_form_pat_details_path.Panel(8).Select("Ethnicity").ClickItem((Math.random()*17));
    data_after = patient_edit_demographics_form_pat_details_path.Panel(8).Select("Ethnicity").wText;
  } 
  
  //First Language
  data_before = patient_edit_demographics_form_pat_details_path.Panel(9).Select("SpokenLanguage").wText;
  patient_edit_demographics_form_pat_details_path.Panel(9).Select("SpokenLanguage").ClickItem((Math.random()*188));
  data_after = patient_edit_demographics_form_pat_details_path.Panel(9).Select("SpokenLanguage").wText;
  
  //Check data is now different
  while (data_before == data_after)
  {
    patient_edit_demographics_form_pat_details_path.Panel(9).Select("SpokenLanguage").ClickItem((Math.random()*188));
    data_after = patient_edit_demographics_form_pat_details_path.Panel(9).Select("SpokenLanguage").wText;
  } 
  
  //Marital Status
  data_before = patient_edit_demographics_form_pat_details_path.Panel(10).Select("MartialStatus").wText;
  patient_edit_demographics_form_pat_details_path.Panel(10).Select("MartialStatus").ClickItem((Math.random()*8));
  data_after = patient_edit_demographics_form_pat_details_path.Panel(10).Select("MartialStatus").wText;
  
  //  Check data is now different
  while (data_before == data_after)
  {
    patient_edit_demographics_form_pat_details_path.Panel(10).Select("MartialStatus").ClickItem((Math.random()*8));
    data_after = patient_edit_demographics_form_pat_details_path.Panel(10).Select("MartialStatus").wText;
  } 
  
  var patient_edit_demographics_form_contact_details_path = patient_edit_demographics_form_contact_details();
  
  //Line 1
  data_before = patient_edit_demographics_form_contact_details_path.Panel(0).Textbox("FirstLineAddress").Text;
  patient_edit_demographics_form_contact_details_path.Panel(0).Textbox("FirstLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Amended Avenue";
  data_after = patient_edit_demographics_form_contact_details_path.Panel(0).Textbox("FirstLineAddress").Text;
  
  //Check data is now different
  while (data_before == data_after)
  {
    patient_edit_demographics_form_contact_details_path.Panel(0).Textbox("FirstLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Amended Avenue";
    data_after = patient_edit_demographics_form_contact_details_path.Panel(0).Textbox("FirstLineAddress").Text;
  } 
  
  //Line 2
  data_before = patient_edit_demographics_form_contact_details_path.Panel(1).Textbox("SecondLineAddress").Text;
  patient_edit_demographics_form_contact_details_path.Panel(1).Textbox("SecondLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Amended Line 2";
  data_after = patient_edit_demographics_form_contact_details_path.Panel(1).Textbox("SecondLineAddress").Text;
  
  //Check data is now different
  while (data_before == data_after)
  {
    patient_edit_demographics_form_contact_details_path.Panel(1).Textbox("SecondLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Amended Line 2";
    data_after = patient_edit_demographics_form_contact_details_path.Panel(1).Textbox("SecondLineAddress").Text;
  } 
  
  //Line 3
  data_before = patient_edit_demographics_form_contact_details_path.Panel(2).Textbox("ThirdLineAddress").Text;
  patient_edit_demographics_form_contact_details_path.Panel(2).Textbox("ThirdLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Amended Line 2";
  data_after = patient_edit_demographics_form_contact_details_path.Panel(2).Textbox("ThirdLineAddress").Text;
   
  //Check data is now different
  while (data_before == data_after)
  {
    patient_edit_demographics_form_contact_details_path.Panel(2).Textbox("ThirdLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Amended Line 3";
    data_after = patient_edit_demographics_form_contact_details_path.Panel(2).Textbox("ThirdLineAddress").Text;
  }     
   
  //Town
  data_before = patient_edit_demographics_form_contact_details_path.Panel(3).Textbox("Town").Text;
  patient_edit_demographics_form_contact_details_path.Panel(3).Textbox("Town").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Amended Town";
  data_after = patient_edit_demographics_form_contact_details_path.Panel(3).Textbox("Town").Text;
  
  //Check data is now different
  while (data_before == data_after)
  {
    patient_edit_demographics_form_contact_details_path.Panel(3).Textbox("Town").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Amended Town";
    data_after = patient_edit_demographics_form_contact_details_path.Panel(3).Textbox("Town").Text;
  }   
  
  //County
  data_before = patient_edit_demographics_form_contact_details_path.Panel(4).Textbox("County").Text;
  patient_edit_demographics_form_contact_details_path.Panel(4).Textbox("County").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Amended County";
  data_after = patient_edit_demographics_form_contact_details_path.Panel(4).Textbox("County").Text;
  
  //Check data is now different
  while (data_before == data_after)
  {
    patient_edit_demographics_form_contact_details_path.Panel(4).Textbox("County").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Amended County";
    data_after = patient_edit_demographics_form_contact_details_path.Panel(4).Textbox("County").Text;
  }  
  
  //PostCode - Come back to hard coded for the minute quite complicated
  patient_edit_demographics_form_contact_details_path.Panel(5).Textbox("Postcode").Text = "TR7 2RR";
  
  //Phone
  data_before = patient_edit_demographics_form_contact_details_path.Panel(6).Textbox("Phone").Text;
  patient_edit_demographics_form_contact_details_path.Panel(6).Textbox("Phone").Text = aqConvert.IntToStr(Math.floor(Math.random()*10000)) + " Amended Tel";
  data_after = patient_edit_demographics_form_contact_details_path.Panel(6).Textbox("Phone").Text;
  
  //Check data is now different
  while(data_before == data_after)
  {
    patient_edit_demographics_form_contact_details_path.Panel(6).Textbox("Phone").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Amended Tel";
    data_after = patient_edit_demographics_form_contact_details_path.Panel(6).Textbox("Phone").Text;
  }    

  //Mobile
  data_before = patient_edit_demographics_form_contact_details_path.Panel(7).Textbox("Mobile").Text;
  patient_edit_demographics_form_contact_details_path.Panel(7).Textbox("Mobile").Text = aqConvert.IntToStr(Math.floor(Math.random()*10000)) + " Amended Mob";
  data_after = patient_edit_demographics_form_contact_details_path.Panel(7).Textbox("Mobile").Text;
  
  //Check data is now different
  while (data_before == data_after)
  {
    patient_edit_demographics_form_contact_details_path.Panel(7).Textbox("Mobile").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Amended Mob";
    data_after = patient_edit_demographics_form_contact_details_path.Panel(7).Textbox("Mobile").Text;
  }    

  //Email
  var guid = new_guid();
  data_before = patient_edit_demographics_form_contact_details_path.Panel(8).Textbox("Email").Text;
  patient_edit_demographics_form_contact_details_path.Panel(8).Textbox("Email").Text = "test_user_+" + guid + "@gmail.com";
  data_after = patient_edit_demographics_form_contact_details_path.Panel(8).Textbox("Email").Text;
  
  //Check data is now different
  while (data_before == data_after)
  {
    patient_edit_demographics_form_contact_details_path.Panel(8).Textbox("Email").Text = "test_user_+" + guid + "@gmail.com";
    data_after = patient_edit_demographics_form_contact_details_path.Panel(8).Textbox("Email").Text;
  }    

  var save_button = patient_edit_demographics_form_buttons();
  var obj = save_button.SubmitButton("UpdatePatientDetails");
  
  click_navigation_wrapper(obj, INRstarV5, "idStr", "MainContentPanel", 3);
  
  obj_root = main_patient_tab();
  wait_for_object(obj_root, "idStr", "PatientDetails", 3);
} 
//--------------------------------------------------------------------------------
function edit_patient_dob_to_be_under_18(months)
{
  Goto_Edit_Patient_Demographics();
  var INRstarV5 = INRstar_base();   
  var patient_edit_demographics_form_pat_details_path = patient_edit_demographics_form_pat_details();
  
  // Set the Treatment Date to be less than the entered age
  var date_months = aqConvert.StrToDate(aqDateTime.AddMonths(aqDateTime.Today(), (-months)))
  var date = aqConvert.StrToDate(aqDateTime.AddDays(date_months, (+1)))
  
  var w_day = aqString.SubString(date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(date,3,2));
  var w_yr = aqString.SubString(date,6,4);
      
  patient_edit_demographics_form_pat_details_path.Panel(5).Image("calendar_png").Click();
      
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, w_datepicker);
  
  var save_button = patient_edit_demographics_form_buttons();
  save_button.SubmitButton("UpdatePatientDetails").Click();
  
  WaitSeconds(2, "Waiting for banner message...");
} 