//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT V5_Common_Batch
//USEUNIT Generic_Functions
//--------------------------------------------------------------------------------
function add_patient(p_surname, p_firstname, p_gender, TestStepMode, nhs_num)  
{
  add_patient_extended(p_surname, p_firstname, p_gender, TestStepMode, nhs_num, "1975")
}

function add_patient_extended(p_surname, p_firstname, p_gender, TestStepMode, nhs_num, dobyr)  
{
  var Mode = TestStepMode

  var INRstarV5 = INRstar_base();    
  Goto_Add_Patient();
  var patient_area = add_patient_demographics_system_path();

    if(Mode == "Shared")
    {
      var panelEPD = patient_area.Panel("EditPatientDetails");
    
      if(nhs_num == null)
      {
      var w_nhs = panelEPD.Panel(1).Textbox("NHSNumber").Text = Get_New_Number_V5();
      }
       else 
       {
       var w_nhs = panelEPD.Panel(1).Textbox("NHSNumber").Text = nhs_num;
       }

      if (p_gender == "M" || p_gender == "m")
            panelEPD.Panel(2).Select("Title").ClickItem("Mr");
            else
                  panelEPD.Panel(2).Select("Title").ClickItem("Mrs");
                
      if (p_surname == "")
            panelEPD.Panel(3).Textbox("Surname").Text = "No_Name_Given" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
            else
                  panelEPD.Panel(3).Textbox("Surname").Text = p_surname+"_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
      if (p_firstname == "")
                panelEPD.Panel(4).Textbox("FirstName").Text = "No_Name_Given" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
            else      
                  panelEPD.Panel(4).Textbox("FirstName").Text =p_firstname+"_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
                       
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
      
      var guid = NewGuid();
      panelEPCD.Panel(8).Textbox("Email").Text = "test_user_+" + guid + "@gmail.com";

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

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------












