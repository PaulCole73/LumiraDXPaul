//USEUNIT TSA_Engage
//USEUNIT TSA_Patient
//USEUNIT Failed_Test_Handlers
//USEUNIT engage_System_Paths
//USEUNIT System_Paths
//USEUNIT Tested_Apps
//USEUNIT Misc_Functions
//USEUNIT TC_Engage
//--------------------------------------------------------------------------------
function ts_master_create_engage_user(send_mail)
{
  reset_folder();
  
  tc_create_patient_enrolled_onto_engage()
 
  email_and_archive(send_mail, "ts_create_engage_master");
}
//--------------------------------------------------------------------------------
function tc_create_patient_enrolled_onto_engage()
{
  
var iterations = 5

for(i = 0 ; i <= iterations ; i++)
        { 
          tc_engage_DDD_user_setup(i);
        }
}
//--------------------------------------------------------------------------------
function tc_engage_DDD_user_setup(iterations)
{
  try
  {
    var test_title = "Engage DDD User Setup";
    Log.Message("Iteration no "+iterations);
    login(5, "Shared");
    add_patient_with_email_parameter(iterations, "DDD", "Engage", "M", "Shared"); 
    add_treatment_plan("W","Manual","","Shared","");
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))), "2.0", "2.5", "7");
    
    var pat_nhs = get_patient_nhs();
    var patient_demographics = get_patient_demographics();
    var email_address = patient_demographics[19];
    //write email address to output file
    var w_outfile = "C:\\Automation\\engageUsernames.csv"
    aqFile.WriteToTextFile(w_outfile, email_address + "\r\n", aqFile.ctANSI, false);
    WaitSeconds(2);
    var dob = patient_demographics[5]; //DD/MM/YYYY
    format_dob = aqConvert.DateTimeToFormatStr(dob, "%d/%m/%Y");
    
    //enroll the patient onto engage self-care
    self_care_DDD("1");
    Log_Off();
    
    register_engage(email_address,format_dob);
    sign_in_engage(email_address);
    complete_eula_questionnaire();    
    log_off_engage();

  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Engage";
    var test_name = "tc_ensure_urgent_notification_is_displayed_when_patient_does_not_understand_their_schedule";
    handle_failed_tests(suite_name, test_name);
    restart_engage();
  }
}
//--------------------------------------------------------------------------------
function add_patient_with_email_parameter(email, p_surname, p_firstname, gender, TestStepMode, nhs_num, pat_no)  
{
  add_patient_extended(email, p_surname, p_firstname, gender, TestStepMode, nhs_num, "1975", pat_no);
}

function add_patient_extended(email, p_surname, p_firstname, gender, TestStepMode, nhs_num, dobyr, pat_no)  
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
    
    //Need to add this back in at some point but it is now going to be doing different validation for Italy so blanking out for now
    panelEPCD.Panel(5).Textbox("Postcode").Text = "";
    
    var unique_email = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d%m%Y")+"_"+email;
    
    switch(language)   
    {
    case language: "Italian"
    panelEPCD.Panel(6).Textbox("Phone").Text = "01209 710999";
    panelEPCD.Panel(8).Textbox("Mobile").Text = "07111 225588";    
    panelEPCD.Panel(9).Textbox("Email").Text = "AutomationLumira+" + unique_email + "@gmail.com";
    break;
    case language: "English"
    panelEPCD.Panel(6).Textbox("Phone").Text = "01209 710999";
    panelEPCD.Panel(7).Textbox("Mobile").Text = "07111 225588";
    panelEPCD.Panel(8).Textbox("Email").Text = "AutomationLumira+" + unique_email + "@gmail.com";  
    break;
    default:
    Log.Warning("You didn't pass in a language I recognise you passed in " + language)
    }
    
    var button_area = add_patient_demographics_buttons_system_path()
    var save_button = button_area.Panel(0).SubmitButton("AddPatientDetails");
      
    save_button.Click();
  }
  
  var patient_root = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  wait_for_object(patient_root, "idStr", "PatientBannerContainer", 2, 1, 20);
}
//--------------------------------------------------------------------------------