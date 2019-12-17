//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//USEUNIT engage_System_Paths
//USEUNIT System_Paths
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function add_patient(p_surname, p_firstname, p_gender, TestStepMode, nhs_num)  
{
  add_patient_engage(p_surname, p_firstname, p_gender, TestStepMode, nhs_num, "1975")
}

function add_patient_engage(p_surname, p_firstname, p_gender, TestStepMode, nhs_num, dobyr)  
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
      var w_nhs = panelEPD.Panel(1).Textbox("NHSNumber").Text = get_new_number_v5();
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
      
      var guid = new_guid();
      panelEPCD.Panel(8).Textbox("Email").Text = "AutomationLumira+" + guid + "@gmail.com";

      var button_area = add_patient_demographics_buttons_system_path()
      var save_button = button_area.Panel(0).SubmitButton("AddPatientDetails");
      
      save_button.Click();
    }   
}
//--------------------------------------------------------------------------------
function login_engage()
{
  engage_username_login().innerText = get_login_details(23);
  admin_dash_password_login().innerText = get_login_details(20);
  admin_dash_login_button().Click();
  WaitSeconds(5, "Waiting to login...");
}
//--------------------------------------------------------------------------------
function log_off_engage()
{
  admin_dash_logoff_button().Click();
  WaitSeconds(2, "Waiting to log off...");
}