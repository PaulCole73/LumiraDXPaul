//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function add_patient(p_surname, p_firstname, p_gender, TestStepMode, nhs_num, pat_no)  
{
  add_patient_extended(p_surname, p_firstname, p_gender, TestStepMode, nhs_num, "1975", pat_no);
  WaitSeconds(3, "Waiting for patient to add...");
}

function add_patient_extended(p_surname, p_firstname, p_gender, TestStepMode, nhs_num, dobyr, pat_no)  
{
  var Mode = TestStepMode

  var INRstarV5 = INRstar_base();    
  Goto_Add_Patient();
  var patient_area = add_patient_demographics_system_path();

  if(Mode == "Shared")
  {
    var panelEPD = patient_area.Panel("EditPatientDetails");
    
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
    
    if(pat_no != null)
    {
      panelEPD.Panel(0).Textbox("PatientNumber").Text = pat_no;
    }

    if (p_gender == "M" || p_gender == "m")
    {
      panelEPD.Panel(2).Select("Title").ClickItem("Mr");
    }
    else
    {
      panelEPD.Panel(2).Select("Title").ClickItem("Mrs");
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
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jan");
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(dobyr);
    w_datepicker.Table(0).Cell(3, 3).Link(0).Click();

    var panelEPCD = patient_area.Panel("EditPatientContactDetails");
      
    panelEPCD.Panel(0).Textbox("FirstLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Arndale Avenue";
    panelEPCD.Panel(1).Textbox("SecondLineAddress").Text = "Wetherfield";
    panelEPCD.Panel(2).Textbox("ThirdLineAddress").Text = "";
    panelEPCD.Panel(3).Textbox("Town").Text = "Manchester";
    panelEPCD.Panel(4).Textbox("County").Text = "Granadaland";
    panelEPCD.Panel(5).Textbox("Postcode").Text = "CO12 1LW";
    
    panelEPCD.Panel(6).Textbox("Phone").Text = "01209 710999";
    panelEPCD.Panel(7).Textbox("Mobile").Text = "07111 225588";

    var guid = new_guid(15);
    panelEPCD.Panel(8).Textbox("Email").Text = "AutomationLumira+" + guid + "@gmail.com";
    
    var button_area = add_patient_demographics_buttons_system_path()
    var save_button = button_area.Panel(0).SubmitButton("AddPatientDetails");
      
    save_button.Click();
  }   
}
//--------------------------------------------------------------------------------
function patient_search(data)
{
  Goto_Patient_Search();
  var patient_search_screen_path = patient_search_screen();
  
  patient_search_screen_path.Textbox("searchCriteria").Text = data;
  patient_search_screen_path.SubmitButton("Search").Click();
  
  var results_table = patient_search_screen_results_table();
  results_table.Cell(1, 0).Link("PatientLink").Click();
  
  WaitSeconds(1, "Wait after patient search...");
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
        Log.Warning('Message was displayed but the text did not match the expected result it was ' + actual_err_mess)
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
        Log.Message('Message was displayed but the text did not match the expected result it was ' + actual_err_mess)
        return false;
        }
} 
//--------------------------------------------------------------------------------
//this return an array of key labels from the patient summary tab
function get_patient_summary_labels(patient_nhs) 
{
  try
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
  catch(e)
  {
    Log.Warning("Function \"" + func_title + "\" Failed Exception Occured = " + e);
  }
}
//--------------------------------------------------------------------------------
//checks for populated summary tab image, returns false if image doesn't exist or is blank
function check_summary_tab_image(patient_nhs) 
{
  try
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
  catch(e)
  {
    Log.Warning("Function \"" + func_title + "\" Failed Exception Occured = " + e);
  }
}
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------












