//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
//function add_patient(p_surname, p_firstname, gender, TestStepMode, nhs_num, pat_no)  
//{
//  add_patient_extended(p_surname, p_firstname, gender, TestStepMode, nhs_num, "1975", pat_no);
//}

function add_patient_extended(p_surname, p_firstname, gender, TestStepMode, nhs_num, dobyr, pat_no)  
{
  var Mode = TestStepMode

  var INRstarV5 = INRstar_base();    
  Goto_Add_Patient();
  var patient_area = add_patient_demographics_system_path();

  if(Mode == "Shared")
  {
    var panelEPD = patient_area.Panel("EditPatientDetails");
    
    //Italy has different nhs number rules so not populating
    if(language == "English")
    {
      if(nhs_num == null || nhs_num == "")
      {
        if(nhs_num == " ")
        {
        
        }
        else
        {
          var w_nhs = panelEPD.Panel(1).Textbox("NHSNumber").Text = get_new_number_v5();
        }
      }
      else 
      {
        var w_nhs = panelEPD.Panel(1).Textbox("NHSNumber").Text = nhs_num;
      }
    }
    
    if(pat_no != null)
    {
      panelEPD.Panel(0).Textbox("PatientNumber").Text = pat_no;
    }
    else if(language != "English")
    {
      panelEPD.Panel(0).Textbox("PatientNumber").Text = new_guid(20);
    }
       
    //Italy has removed the option for Ms and Miss 
    //If we want to add in the other titles to click then add new function when required     
    if (gender == "M" || gender == "m")
    {
      panelEPD.Panel(2).Select("Title").ClickItem(get_string_translation("Mr"));
    }
    else
    {
      panelEPD.Panel(2).Select("Title").ClickItem(get_string_translation("Mrs"));
    }
             
    if (p_surname == "")
    {
      panelEPD.Panel(3).Textbox("Surname").Text = "No_Name_Given" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
    }
    else
    {
      panelEPD.Panel(3).Textbox("Surname").Text = p_surname+"_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
    }
    if (p_firstname == "")
    {
      panelEPD.Panel(4).Textbox("FirstName").Text = "No_Name_Given" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
    }
    else
    {      
      panelEPD.Panel(4).Textbox("FirstName").Text = p_firstname+"_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
    }
                       
    panelEPD.Panel(5).Image("calendar_png").Click();
    
    var w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(get_string_translation("Jan"));
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(dobyr);
    w_datepicker.Table(0).Cell(3, 3).Link(0).Click();

    var panelEPCD = patient_area.Panel("EditPatientContactDetails");
      
    panelEPCD.Panel(0).Textbox("FirstLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Arndale Avenue";
    panelEPCD.Panel(1).Textbox("SecondLineAddress").Text = "Wetherfield";
    panelEPCD.Panel(2).Textbox("ThirdLineAddress").Text = "";
    panelEPCD.Panel(3).Textbox("Town").Text = "Manchester";
    panelEPCD.Panel(4).Textbox("County").Text = "Granadaland";
    panelEPCD.Panel(6).Textbox("Phone").Text = "01209 710999";
    
    //Need to add this back in at some point but it is now going to be doing different validation for Italy so blanking out for now
    panelEPCD.Panel(5).Textbox("Postcode").Text = "";
    
    var guid = new_guid(15);
    
    if(language == "Italian")   
    {
      panelEPCD.Panel(8).Textbox("Mobile").Text = "07111 225588";    
      panelEPCD.Panel(9).Textbox("Email").Text = "AutomationLumira+" + guid + "@gmail.com";
    }
    if(language == "English")  
    {
      panelEPCD.Panel(7).Textbox("Mobile").Text = "07111 225588";
      panelEPCD.Panel(8).Textbox("Email").Text = "AutomationLumira+" + guid + "@gmail.com";  
    }
    
    var button_area = add_patient_demographics_buttons_system_path()
    var save_button = button_area.Panel(0).SubmitButton("AddPatientDetails");
      
    save_button.Click();
    //process_popup(get_string_translation("Unable to synchronize with the LumiraDX instrument"), get_string_translation("Close"));
  }
  
  var patient_root = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  wait_for_object(patient_root, "idStr", "PatientBannerContainer", 2, 1, 20);
}
//--------------------------------------------------------------------------------
function patient_search(data)
{
  //This expects you to only have 1 result returned so needs to be a unique name being passed in
  Goto_Patient_Search();
  var patient_search_screen_path = patient_search_screen();

  patient_search_screen_path.Textbox("searchCriteria").Text = data;
  patient_search_screen_path.SubmitButton("Search").Click();

  WaitSeconds(1, "Wait after patient search...");

  var results_table = patient_search_screen_results_table();
  results_table.Cell(1, 0).Link("PatientLink").Click();

  WaitSeconds(1, "Wait after patient search...");
} 
//--------------------------------------------------------------------------------
function patient_search_for_unmatched_result(patient_search_criteria)
{
  //This searches for patient - after selecting find patient button on unmatched result via external result form
  //It will select the first result in the list on the assumption of uniqueness - if results are returned
  
  wait_for_object(path_main_content_panel(), "idStr", "searchCriteria", 3, 1, 20);
    
  inrstar_path_external_patient_search_form_search_criteria().Text = patient_search_criteria;
  inrstar_path_external_patient_search_form_search_button().Click();
    
  WaitSeconds(1, "Wait after patient search...");
   
  //After Search - table will always appear - even if no results
  var results_table = patient_search_screen_results_table();
  var cell_content = results_table.Cell(1, 0).contentText;
  
  //This will check if the search was unsuccessful and return the displayed text if that is so
  if (cell_content == get_string_translation("No patient found"))
  {
    return cell_content;
  }
  else //Otherwise go ahead and click the patient checkbox and use selected patient button
  {
    var patient_found = results_table.Cell(1, 1).Link("PatientLink").contentText;
    results_table.Cell(1, 0).RadioButton("patientId").Click();
    inrstar_path_external_test_patient_search_form_use_selected_patient_button().Click();
    WaitSeconds(1, "Wait after selecting use selected patient...");
    return patient_found;
  }  
} 
//--------------------------------------------------------------------------------
function inactive_patient_search(data)
{
  Goto_Patient_Search();
  var patient_search_screen_path = patient_search_screen();
  
  patient_search_screen_path.Checkbox("active").ClickChecked(false);
  patient_search_screen_path.Textbox("searchCriteria").Text = data;
  patient_search_screen_path.SubmitButton("Search").Click();
  
  var results_table = patient_search_screen_results_table();
  results_table.Cell(1, 0).Link("PatientLink").Click();
} 
//--------------------------------------------------------------------------------
function patient_recently_viewed_list()
{
  Goto_Recently_Viewed();
  var patient_table = patient_recently_viewed_table();
  var patient_list = new Array()
   
  for(i=1; i < patient_table.rowcount; i++)
  {
    var patient = patient_table.Cell(i, 0).Link("PatientLink").contentText;
    patient_list.push(patient) 
  } 
   
  return patient_list;
} 
//--------------------------------------------------------------------------------
function popup_warning_checker(exp_err_mess)
{
  var INRstarV5 = INRstar_base(); 
  var pop_up_warning_message_path = pop_up_warning_message();
  var actual_err_mess = pop_up_warning_message_path.contentText; 
  var warning_dialogue = INRstarV5.NativeWebObject.Find("idStr", "modalDialogBox");
  
    if (warning_dialogue.Exists && exp_err_mess==actual_err_mess)
    {
      Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess );
      return true; 
    } 
    else 
    {
      Log.Message('Message was either not displayed or the text did not match the expected result it was this //' + actual_err_mess + "// but this is what was expected //" + exp_err_mess + "//")
      return false;
    }
} 
//--------------------------------------------------------------------------------
function popup_error_checker(exp_err_mess)
{
  var INRstarV5 = INRstar_base(); 
  var pop_up_error_message_path = pop_up_error_message();
  var actual_err_mess = pop_up_error_message_path.contentText; 
   
     if (exp_err_mess==actual_err_mess)
       {
        Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess );
        return true; 
       } 
        else 
        {
        Log.Warning('Message was displayed but the text did not match the expected result it was ' + actual_err_mess)
        return false;
        }
} 
//--------------------------------------------------------------------------------
function banner_checker(exp_err_mess)
{
  WaitSeconds(1)
  var INRstarV5 = INRstar_base(); 
  var patient_banner_yellow_bar_path = patient_banner_yellow_bar();
  var actual_err_mess = patient_banner_yellow_bar_path.contentText; 
   
  if (exp_err_mess==actual_err_mess)
  {
    Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess );
    return true; 
  } 
  else 
  {
    Log.Message('Message was displayed but the text did not match the expected result it was ' + actual_err_mess + " // And I was looking for //" + exp_err_mess);
    return false;
  }
} 
//--------------------------------------------------------------------------------
function banner_checker_includes(exp_err_mess)
{
  var INRstarV5 = INRstar_base(); 
  var patient_banner_yellow_bar_path = patient_banner_yellow_bar();
  var actual_err_mess = patient_banner_yellow_bar_path.contentText; 
   
  if (actual_err_mess.includes(exp_err_mess))
  {
    Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess );
    return true; 
  } 
  else 
  {
    Log.Message('Message was displayed but the text did not match the expected result it was ' + actual_err_mess + " // And I was looking for //" + exp_err_mess);
    return false;
  }
} 
//--------------------------------------------------------------------------------
//this return an array of key labels from the patient summary tab
function get_patient_summary_labels(patient_nhs) 
{
  var func_title = "Get Key Summary Labels";
  var smry_labels = new Array();
    
  patient_search(patient_nhs);
   
  var summary_button = summary_tab_path();
  summary_button.Click();
    
  var smry_test_date = patient_current_summary().Panel(0).Label("CurrentTreatment_LatestINRTestDate_DetachedLabel").innerText;
  var smry_inr = patient_current_summary().Panel(1).Label("CurrentTreatment_LatestINR_DetachedLabel").innerText;
  var smry_dose = patient_current_summary().Panel(2).Label("CurrentTreatment_LatestDose_DetachedLabel").innerText;
  var smry_review_date = patient_current_summary().Panel(3).Label("CurrentTreatment_LatestReview_DetachedLabel").innerText;
  var smry_next_test = aqConvert.DateTimeToStr(patient_current_summary().Panel(4).Label("CurrentTreatment_NextINRTestDate_DetachedLabel").innerText);
    
  smry_labels.push(smry_test_date, smry_inr, smry_dose, smry_review_date, smry_next_test);
    
  return smry_labels;
}
//--------------------------------------------------------------------------------
//checks for populated summary tab image, returns false if image doesn't exist or is blank
function check_summary_tab_image(patient_nhs) 
{
  var func_title = "Check Image";
  var is_image_there = false;
    
  patient_search(patient_nhs);
   
  var summary_button = summary_tab_path();
  summary_button.Click();
    
  var results_chart = patient_summary_result_chart();
    
  if(results_chart.Child(0).Exists)
  {
    results_chart = results_chart.Child(0).Name;
    if (aqString.Contains(results_chart, "treatmentPlanId") != -1)
    {
      is_image_there = true;
    }
  }
  return is_image_there;
}
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
    var date = convert_date_format(patient_details.dob, "Italian", "%d/%m/%Y");
  }
  else
  {
    var date = convert_date_format(patient_details.dob, "english", "%d/%m/%Y");
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
//this function sets up the variable elements of a patients data
//non identifier elements e.g. address, phone number etc are hard coded in the patient object
function create_variable_patient_data(name_first, name_last, sex)
{
    var title;
    var first_name_string = create_random_char_string(15);
    var patient_details = new Object();  

    //if no value is passed in for first name then generate a random character string
    if(name_first == null || name_first == "")
    {
      name_first = first_name_string.charAt(0).toUpperCase() + first_name_string.slice(1);
    }
    else
    {
      name_first = create_random_char_string(7) + name_first;
    }
    
    //if no value is passed in for last name then generate a random character string
    if(name_last == null || name_last == "")
    {
      name_last = create_random_char_string(15).toUpperCase();
    }
    else
    {
      name_last = create_random_char_string(7) + name_last;
    }
    
    //adjust sex code for full word and set appropriate title
    //if no value is passed in then male / mr is default
    if(sex == "M")
    {
      sex = "Male";
      title = "Mr";
    }
    else if(sex == "F")
    {
      sex = "Female";
      title = "Mrs";
    }
    else if(sex == null || sex == "")
    {
      sex = "Male";
      title = "Mr";
    }
    
    //postcode format varies between uk and ita
    var postcode;
    if(language == "English")
    {
      postcode = "TR16 4SQ" 
    }
    else
    {
      postcode = "12345"
    }
    
    //add all values SET or GENERATED to the object for reference
    var patient_details = {
      first_name: name_first,
      last_name: name_last,
      gender: sex,
      known_as: title,
      post_code: postcode
    }
    
    return patient_details;
}
//--------------------------------------------------------------------------------
function inrstar_check_patient_search_criteria_start_char_unique(patient_object)
{
 var patient_details_array = new Array();
 
 //Get the array to check for uniqueness
 var pat_num = aqString.GetChar(patient_object.pat_number, 0);
 var nhs_or_fiscal = aqString.GetChar(patient_object.nhs_number, 0);
 var surname = aqString.GetChar(patient_object.last_name, 0);
 var firstname = aqString.GetChar(patient_object.first_name, 0);
 
 patient_details_array.push(pat_num,nhs_or_fiscal,surname,firstname);
 //Log.Message(patient_details_array);
 
 //check if the array has any duplicated start chars
 var dup_count = count_duplicates(patient_details_array);
 
 return dup_count;
}
//--------------------------------------------------------------------------------
function inrstar_make_patient_search_criteria_start_char_unique(patient_object)
{
 //Needed to make the first char of the following fields unique so that when you search for a patient you know which one it is using for the search
 //The patient search will only search for a field if it begins with the correct char so it doesn't do a partial mid way search
 var dup_count = inrstar_check_patient_search_criteria_start_char_unique(patient_object);
 
 while(dup_count != 0)
 {
  add_patient();
  patient = get_patient_details_object_from_demographics();
  dup_count = inrstar_check_patient_search_criteria_start_char_unique(patient);
 }
}
//--------------------------------------------------------------------------------