//USEUNIT System_Paths
//USEUNIT V5_Common
//USEUNIT Test_Go_To

//USEUNIT System_Paths
//USEUNIT V5_Common


//--------------------------------------------------------------------------------
function tsa_patient_add(firstname,surname,title,sex,gender,add1,add2,add3,town,county,postcode,home_tel,mob,email,nhs,TestStepMode)  

{

 var Mode = TestStepMode

    if(Mode == "Shared")
    {
  //     Goto_Add_Patient();
//       var INRstarV5 = set_system_login_page();    
//       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//       var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm")
       var path = add_patient_path();
//       Log.Message(path.FullName);
//       var patient_demographics_form = path.Panel("PatientDetailsWrapper").Panel("EditPatientDetails");
//       var patient_contact_details_form = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails")

     
       
       //Navigating to the demographics fields and entering the passed in values
       path.Panel(0).Textbox("PatientNumber").Text = "pat_num_" + aqConvert.IntToStr(Math.floor(Math.random()*10000));
//       patient_demographics_form.Panel(0).Textbox("PatientNumber").Text = "pat_num_" + aqConvert.IntToStr(Math.floor(Math.random()*10000));
       
       //If nhs number provided then use else make a new one
            if(nhs == "")
            { 
                patient_demographics_form.Panel(1).Textbox("NHSNumber").Text = Get_New_Number_V5();
            }
               else 
                 patient_demographics_form.Panel(1).Textbox("NHSNumber").Text = nhs;
       
       patient_demographics_form.Panel(2).Select("Title").ClickItem(title);
       patient_demographics_form.Panel(3).Textbox("Surname").Text = surname + aqConvert.IntToStr(Math.floor(Math.random()*10000));
       patient_demographics_form.Panel(4).Textbox("FirstName").Text = firstname + aqConvert.IntToStr(Math.floor(Math.random()*10000));
       
       //Date of birth adding standard date can be made to be better if we want to pass in specific dates
       patient_demographics_form.Panel(5).Image("calendar_png").Click();
    
       var w_datepicker = INRstarV5.Panel("ui_datepicker_div");
       w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jan");
       w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("1975");
       w_datepicker.Table(0).Cell(3, 3).Link(0).Click();
       
       //Sex doesn't need to be entered with current Titles being passed in Dr and Prof wont work at the moment
       patient_demographics_form.Panel(6).Select("Sex").ClickItem(sex);
       
       //Gender doesn't need to be entered with current Titles being passed in Dr and Prof wont work at the moment
       patient_demographics_form.Panel(7).Select("Gender").ClickItem(gender);
       
       //Ethnicity will pick a random number
       patient_demographics_form.Panel(8).Select("Ethnicity").ClickItem(Math.floor((Math.random() * 17) + 1));
       
       //First Language will pick a random number
       patient_demographics_form.Panel(9).Select("SpokenLanguage").ClickItem(Math.floor((Math.random() * 188) + 1));
       
       //Martial Status will pick a random number
       patient_demographics_form.Panel(10).Select("MartialStatus").ClickItem(Math.floor((Math.random() * 8) + 1));
       
       //Contact Fields - uses all the passed in parameters
       patient_contact_details_form.Panel(0).Textbox("FirstLineAddress").Text = add1 + " " + aqConvert.IntToStr(Math.floor(Math.random()*100));
       patient_contact_details_form.Panel(1).Textbox("SecondLineAddress").Text = add2;
       patient_contact_details_form.Panel(2).Textbox("ThirdLineAddress").Text = add3;
       patient_contact_details_form.Panel(3).Textbox("Town").Text = town;
       patient_contact_details_form.Panel(4).Textbox("County").Text = county;
       patient_contact_details_form.Panel(5).Textbox("Postcode").Text = postcode;
       patient_contact_details_form.Panel(6).Textbox("Phone").Text = home_tel;
       patient_contact_details_form.Panel(7).Textbox("Mobile").Text = mob;
       patient_contact_details_form.Panel(8).Textbox("Email").Text = email;
       
      form.Panel(0).SubmitButton("AddPatientDetails").Click();
    }       
}