//USEUNIT V5_Common
//USEUNIT V5_Common_Tests
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Presets
//USEUNIT Navigation
//===============================================================================
// Common Routines
//------------------------------------------------------------------------
function set_month(p_m)
{
  // Note - input month must be in numeric format !!
          
  var wa_Mth = new Array(13);                   
  wa_Mth[0] = "";
  wa_Mth[1] = "Jan";
  wa_Mth[2] = "Feb";
  wa_Mth[3] = "Mar";
  wa_Mth[4] = "Apr";
  wa_Mth[5] = "May";
  wa_Mth[6] = "Jun";
  wa_Mth[7] = "Jul";
  wa_Mth[8] = "Aug";
  wa_Mth[9] = "Sep";
  wa_Mth[10] = "Oct";
  wa_Mth[11] = "Nov";
  wa_Mth[12] = "Dec";
  
  var w_Month = wa_Mth[p_m];
//  Log.Message("p_m: " + p_m + " = " + w_Month);
  
  return w_Month;
}
//===============================================================================
// Patient Demographic fields
//-------------------------------------------------------------------------------
// Test Patient Number 
function test_patient_number(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var w_err_mess1 = "Please enter an NHS number or a Patient number";
  var w_err_mess2 = "Please enter a patient number of no more than 20 characters.";

  if (form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("PatientNumber").Text != "")
  {
      // Define test data
      wa_pno = new Array(4);
      wa_pno[0] = "000 000 0000";             // Invalid, all 0s
      wa_pno[1] = "<>4";                      // Invalid, characters
      wa_pno[2] = "123456789012345678901";    // Invalid, too long
      wa_pno[3] = "900001";                   // Valid

      wa_state = new Array(4);
      wa_state[0] = false;              
      wa_state[1] = false;              
      wa_state[2] = false;              
      wa_state[3] = true;                

      // Apply test data
      for (i=0; i < wa_pno.length; i++)
      {
         Log.Message("Testing Patient number: " + wa_pno[i]+ " i: "+i);

         // Reset the form definition
         form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

         form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("PatientNumber").Text = wa_pno[i];
     
         Log.Message("Field set to : " + form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("PatientNumber").Text);
         test_field_add_patient_details(INRstarV5,  err_mess, wa_pno[i], wa_state[i]);
  }

  }    
//  // Empty fields & try to save
//  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("PatientNumber").Text = "";
//  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Textbox("NHSNumber").Text = "";
//  test_field_add_patient_details(INRstarV5, w_err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("PatientNumber").Text, false);
//  
//  // Reset the form definition
//  form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
//  
//  // Add Patient number
//  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("PatientNumber").Text = "Patient_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
//  test_field_add_patient_details(INRstarV5, w_err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("PatientNumber").Text, true);
 
}
//-------------------------------------------------------------------------------
// Test NHS Number
//
// Ensure the NHS duplicate number exists for steps 5,6,7 at location under test
function test_NHS_number(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  if (form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Textbox("NHSNumber").Text == "")
  {

     // var err_mess1 = "Please enter an NHS Number"; NO longer valid as you can't have a patient without NHS
      var err_mess2 = "Please enter a valid NHS number (xxx xxx xxxx)";
      var err_mess3 = "This patient may already exist at this location as "; 
      var err_mess4 = "Please enter an NHS number of 10 digits";

      // Define test data
      wa_nhs = new Array(9);
      wa_nhs[0] = "000 000 0000";             // Invalid, all 0s
      wa_nhs[1] = "1234";                     // Invalid, wrong format
      wa_nhs[2] = "abc efg hijk";             // Invalid, wrong format
      wa_nhs[3] = "123 456 789";              // Invalid, too short
      wa_nhs[4] = "1234567890123456789";      // Invalid, too long
      
      // This number must exist in the database do not change at the moment it is held on deans driver spreadhseet so will always exist
      wa_nhs[5] = "8424224248";               // Duplicate number
      wa_nhs[6] = "842 422 4248";             // Duplicate number
      wa_nhs[7] = "  842 422 4248  ";         // Duplicate number
      //----------------------------------
      
      wa_nhs[8] = Get_New_Number_V5();        // New generated number
      Log.Message("Generated NHS No is : " + wa_nhs[6]);

      // Define test state
      wa_state = new Array(9);
      wa_state[0] = false;               // Invalid, all 0s
      wa_state[1] = false;               // Invalid, wrong format
      wa_state[2] = false;               // Invalid, wrong format
      wa_state[3] = false;               // Invalid, too short
      wa_state[4] = false;               // Invalid, too long
      wa_state[5] = false;               // Duplicate number
      wa_state[6] = false;               // Duplicate number
      wa_state[7] = false;               // Duplicate number
      wa_state[8] = true;                // New generated number
  
            // Define test state
      wa_mess = new Array(9);
      wa_mess[0] = err_mess2;            
      wa_mess[1] = err_mess4;               
      wa_mess[2] = err_mess2;              
      wa_mess[3] = err_mess4;               
      wa_mess[4] = err_mess4;              
      wa_mess[5] = err_mess3;               
      wa_mess[6] = err_mess3;              
      wa_mess[7] = err_mess3;              
      wa_mess[8] = true;               
  
    //  // Empty field & try to save
    //form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Textbox("NHSNumber").Text = "";
    //test_field_add_patient_details(INRstarV5,  err_mess1, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Textbox("NHSNumber").Text, false);

      // Apply test data
      for (i=0; i < wa_nhs.length; i++)
      {
         Log.Message("Testing NHS number: " + wa_nhs[i]+ " i: "+i);

         WaitSeconds(2);
         // Reset the form definition
         form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

         form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Textbox("NHSNumber").Text = wa_nhs[i];
     
         Log.Message("Field set to : " + form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Textbox("NHSNumber").Text);
    
            test_field_add_patient_details(INRstarV5,  wa_mess[i], wa_nhs[i], wa_state[i]);
  }
  }
}
//-------------------------------------------------------------------------------
// Test Title
function test_title(INRstarV5, form)
{
  var w_err_mess = "Please select a Title";
  var w_vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Title";
  wa_data[1] = "Mr";
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Title: " + wa_data[i]);
    w_vselect = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Select("Title");
    w_vselect.ClickItem(wa_data[i]);
    test_field_add_patient_details(INRstarV5, w_err_mess, wa_data[i], wa_state[i]);
  }
}  
//-------------------------------------------------------------------------------
// Test FAMILY Name
function test_family_name(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var w_err_mess = "Please enter a FAMILY name";
//  var w_txtfield = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Textbox("Surname");
//  var w_val = "Patient_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
  
  // Empty field & try to save
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text = "";
  test_field_add_patient_details(INRstarV5, w_err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  
  // Add name
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text = "O'Dowd_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
  test_field_add_patient_details(INRstarV5, w_err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text, true);
 
}
//-------------------------------------------------------------------------------
// Test Given Name
function test_given_name(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var w_err_mess = "Please enter a Given name";
//  var w_txtfield = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("FirstName");
//  var w_val = "Forename_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
  
  // Empty field & try to save
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text = "";
  test_field_add_patient_details(INRstarV5, w_err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  
  // Add name
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text = "Forename_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
  test_field_add_patient_details(INRstarV5, w_err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text, true);
}
//-------------------------------------------------------------------------------
// Test Date of Birth
function test_born(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  
  var w_err_mess1 = "Please enter the Date of Birth";
  var w_err_mess2 = "Invalid age (must be between 0 and 110 years)";
  
//  var w_textbox;
  var w_datepicker;
   
  // Empty field & try to save
//  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Textbox("PatientBorn").Text = "";
//  test_field_add_patient_details(INRstarV5, w_err_mess1, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Textbox("PatientBorn").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  // Click on Calendar icon
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Image("calendar_png").Click();
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  // Set Invalid Date
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jan");
  WaitSeconds(1,"");
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("1903");
  w_datepicker.Table(0).Cell(3, 3).Link(0).Click();
    
//  w_textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("PatientBorn");
  test_field_add_patient_details(INRstarV5, w_err_mess2, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Textbox("PatientBorn").Text, false);

  // Reset the form definition
  form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  // Click on Calendar icon
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Image("calendar_png").Click();
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  // Set Valid Date
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("May");
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("1930");
  w_datepicker.Table(0).Cell(3, 3).Link(0).Click();
    
//  w_textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("PatientBorn");

//  // Reset date to use current day value
//  var w_dayval = aqString.SubString(aqConvert.DateTimeToStr(aqDateTime.Now()),0,2);
//  textbox = w_dayval + aqString.SubString(textbox,2,aqString.GetLength(textbox));
  
  test_field_add_patient_details(INRstarV5, w_err_mess1, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Textbox("PatientBorn").Text, true);
  // Reset the form definition
  form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  test_field_add_patient_details(INRstarV5, w_err_mess2, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Textbox("PatientBorn").Text, true);

}
//-------------------------------------------------------------------------------
// Test Sex
function test_sex(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var err_mess = "Please select a Sex";
  var  vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Sex";
  wa_data[1] = "Male";
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Sex: " + wa_data[i]);
    vselect = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(6).Select("Sex");
    vselect.ClickItem(wa_data[i]);
    test_field_add_patient_details(INRstarV5,  err_mess, wa_data[i], wa_state[i]);

  // Reset the form definition
    form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  }
}  
//-------------------------------------------------------------------------------
// Test Gender
function test_gender(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var err_mess = "Please select a valid gender";
  var  vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "Not Specified";
  wa_data[1] = "Male";
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = true;
  wa_state[1] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Gender: " + wa_data[i]);
    vselect = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(7).Select("Gender");
    vselect.ClickItem(wa_data[i]);
    test_field_add_patient_details(INRstarV5, err_mess, wa_data[i], wa_state[i]);
    
    // Reset the form definition
    form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  }
}  
//-------------------------------------------------------------------------------
// Test Ethnicity
function test_ethnicity(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var err_mess = "";
  var  vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Ethnicity";
  wa_data[1] = "White - British";
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = true;
  wa_state[1] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Gender: " + wa_data[i]);
    vselect = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(8).Select("Ethnicity");
    vselect.ClickItem(wa_data[i]);
    test_field_add_patient_details(INRstarV5, err_mess, wa_data[i], wa_state[i]);
    
    // Reset the form definition
    form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  }
}  
//-------------------------------------------------------------------------------
// Test Spoken Language
function test_language(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var err_mess = "";
  var  vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select First Language";
  wa_data[1] = "English";
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = true;
  wa_state[1] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Gender: " + wa_data[i]);
    vselect = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(9).Select("SpokenLanguage");
    vselect.ClickItem(wa_data[i]);
    test_field_add_patient_details(INRstarV5, err_mess, wa_data[i], wa_state[i]);
    
    // Reset the form definition
    form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  }
}  
//-------------------------------------------------------------------------------
// Test Marital Status
function test_marital_status(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var err_mess = "";
  var  vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Marital Status";
  wa_data[1] = "Married";
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = true;
  wa_state[1] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Gender: " + wa_data[i]);
    vselect = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(10).Select("MartialStatus");
    vselect.ClickItem(wa_data[i]);
    test_field_add_patient_details(INRstarV5, err_mess, wa_data[i], wa_state[i]);
    
    // Reset the form definition
    form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  }
}  
//-------------------------------------------------------------------------------
// Test Address Line 1
function test_address_line_1(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var err_mess = "Please enter Line 1 of the address";
 
  // Empty field & try to save
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text = "";
  test_field_add_patient_details(INRstarV5, err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  // Add value
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Privet Drive";
  test_field_add_patient_details(INRstarV5,  err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text, true);
}
////-------------------------------------------------------------------------------
//// Test Address Line 2
//function test_address_line_2(INRstarV5, form)
//{
//  var err_mess = "Please enter Line 2 of the address";
//  var textbox;
// 
//  // Empty field & try to save
//  textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(1).Textbox("SecondLineAddress");
//  textbox.Text = "";
//  test_field_add_patient_details(INRstarV5, err_mess, textbox.Text, false);
//  
//  // Add value
//  textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(1).Textbox("SecondLineAddress");
//  textbox.Text = "Little Whinging";
//  test_field_add_patient_details(INRstarV5,  err_mess, textbox.Text, true);
//}
////-------------------------------------------------------------------------------
//// Test Address Line 3
//function test_address_line_3(INRstarV5, form)
//{
//  var err_mess = "Please enter Line 3 of the address";
//  var textbox;
// 
//  // Empty field & try to save
//  textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(2).Textbox("ThirdLineAddress");
//  textbox.Text = "";
//  test_field_add_patient_details(INRstarV5, err_mess, textbox.Text, true);
//  
//  // Add value
//  textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(2).Textbox("ThirdLineAddress");
//  textbox.Text = "Large Moaning";
//  test_field_add_patient_details(INRstarV5,  err_mess, textbox.Text, true);
//}
//-------------------------------------------------------------------------------
// Test Address Town
function test_address_town(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var err_mess = "Please enter a City/Town";
 
  // Empty field & try to save
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text = "";
  test_field_add_patient_details(INRstarV5, err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  // Add value
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text = "Colchester";
  test_field_add_patient_details(INRstarV5,  err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text, true);
}
//-------------------------------------------------------------------------------
// Test Address County
function test_address_county(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var err_mess = "Please enter a County";
 
  // Empty field & try to save
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text = "";
  test_field_add_patient_details(INRstarV5, err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  // Add value
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text = "Cornshire";
  WaitSeconds(1,"");
  test_field_add_patient_details(INRstarV5,  err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text, true);
}
//-------------------------------------------------------------------------------
// Test Address PostCode
function test_address_postcode(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var err_mess = "Please enter a Postcode";
 
//  // Empty field & try to save
//  textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(5).Textbox("Postcode");
//  textbox.Text = "";
//  test_field_add_patient_details(INRstarV5,  err_mess1, textbox.Text, false);
//  
  // Add invalid value
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(5).Textbox("Postcode").Text = "CO12";
  test_field_add_patient_details(INRstarV5,  err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(5).Textbox("Postcode").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  // Add valid value
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(5).Textbox("Postcode").Text = "CO12 1HW";
  test_field_add_patient_details(INRstarV5,  err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(5).Textbox("Postcode").Text, true);
}
//-------------------------------------------------------------------------------
// Test Email
function test_email(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var err_mess = "Please enter a valid email";
 
//  // Empty field & try to save
//  textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(5).Textbox("Postcode");
//  textbox.Text = "";
//  test_field_add_patient_details(INRstarV5,  err_mess1, textbox.Text, false);
//  
  // Add invalid value
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(8).Textbox("Email").Text = "email";
  test_field_add_patient_details(INRstarV5,  err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(8).Textbox("Email").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  // Add valid value
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(8).Textbox("Email").Text = "email.name@email.co.uk";
  test_field_add_patient_details(INRstarV5,  err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(8).Textbox("Email").Text, true);
}
//-------------------------------------------------------------------------------
// Test Clinician
function test_clinician(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var err_mess = "Please choose a Clinician";
  var  vselect;
 
  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select A/C Clinician";
  wa_data[1] = "Dr Emrys Jones";
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = true;
  wa_state[1] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Clinician: " + wa_data[i]);
    vselect = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(9).Select("ClinicianId");
    //            .Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_ClinicianId")
    vselect.ClickItem(wa_data[i]);
    test_field_add_patient_details(INRstarV5,  err_mess, wa_data[i], wa_state[i]);
    // Reset the form definition
    form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  }
}
//-------------------------------------------------------------------------------
// Test GP Name
function test_GPName(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var err_mess = "";
 
  // Add valid value
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(11).Textbox("GPName").Text = "Dr Mark Sullivan";
  test_field_add_patient_details(INRstarV5,  err_mess, form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(5).Textbox("Postcode").Text, true);
}
//-------------------------------------------------------------------------------
// Test Patient Groups
function test_groups(INRstarV5, form)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

  var err_mess = ""; // None required
  
  var panelPG = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("PatientGroups")
  panelPG.Panel(0).Checkbox("Transport").ClickChecked(true);
  panelPG.Panel(1).Checkbox("HomeVisit").ClickChecked(true);
  
}
//-------------------------------------------------------------------------------
// Test Text Field
function test_text_field(INRstarV5, p_txtfield, p_val, p_err_mess)
{
  // Empty field & try to save
  p_txtfield.Text = "";
  test_field_add_patient_details(INRstarV5, p_err_mess, p_txtfield.Text, false);
  
  // Add name
  p_txtfield.Text = p_val;
  test_field_add_patient_details(INRstarV5, p_err_mess, p_txtfield.Text, true);
}

//===============================================================================
// Patient Treatment Plan fields - Add
//-------------------------------------------------------------------------------
// Test Start Date
function test_start_date(INRstarV5, form)
{
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
//  var form = panelPCD.Form("AddTreatmentPlanForm");

  var err_mess1 = "Please select a Started Warfarin date that is on or before today's date.";
  var err_mess2 = "The patients start date cannot be before their date of birth";
  var textbox;
  var datepicker;
  var panel = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(0);   

  // Set Valid Date -------------------------------------------
  // Click on Calendar icon
  panel.Image("calendar_png").Click();
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  // Set Date
  datepicker.Panel(0).Panel(0).Select(1).ClickItem("2014");
  datepicker.Panel(0).Panel(0).Select(0).ClickItem("Aug");
  datepicker.Table(0).Cell(3, 3).Link(0).Click();
    
  textbox = panel.Textbox("Start");
  test_field_add_patient_treatmentplan(INRstarV5, form, err_mess1, textbox.Text, true);
}
//-------------------------------------------------------------------------------
// Test Add Diagnosis
function test_add_diagnosis(INRstarV5, form, p_diagnosis)
{
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
//  var form = panelPCD.Form("AddTreatmentPlanForm");

  var err_mess = "Please select a Diagnosis from the list.";
  var vselect;
  var panelECD = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation"); 

  // Define Test data
  wa_data = new Array(4);
  wa_data[0] = "~Select Diagnosis";
  wa_data[1] = "DVT or PE (Recurrent during treatment)";
  wa_data[2] = "DVT (proximal, permanent risk factors)";
  wa_data[3] = p_diagnosis;
  
  // Define test state
  wa_state = new Array(4);
  wa_state[0] = false;
  wa_state[1] = true;
  wa_state[2] = true;
  wa_state[3] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Diagnosis: " + wa_data[i]);
    vselect = panelECD.Panel(1).Select("DiagnosisSelected");
    vselect.ClickItem(wa_data[i]);
    
    test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, wa_data[i], wa_state[i]);
    
    // Reset the form definition
    //form = panelPCD.Form("AddTreatmentPlanForm");
  }
}  
//-------------------------------------------------------------------------------
// Test Add Drug
function test_add_drug(INRstarV5, form, p_drug, p_drug_list)
{
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
//  var form = panelPCD.Form("AddTreatmentPlanForm");

  var err_mess = "Please select a Drug from the list.";
  var vselect;
  var panelECD = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation"); 

  // Expand drug code
  var w_drug;
  if (p_drug == "w")
   w_drug = "Warfarin";
  if (p_drug == "a")
   w_drug = "Apixaban";
  if (p_drug == "d")
   w_drug = "Dabigatran";
  if (p_drug == "h")
   w_drug = "Dalteparin (LMWH)";
  if (p_drug == "r")
   w_drug = "Rivaroxaban";
   
  // Test what can be selected
  if (p_drug_list == "all" && panelECD.Panel(2).Select("DrugId").wItemList != "~Select Drug;Apixaban;Dabigatran;Dalteparin (LMWH);Rivaroxaban;Warfarin;Edoxaban")
                    Log.Warning("Drug list incorrect");
  if (p_drug_list == "w,h" && panelECD.Panel(2).Select("DrugId").wItemList != "~Select Drug;Dalteparin (LMWH);Warfarin")
                    Log.Warning("Drug list incorrect");
  
  // Define Test data
  wa_data = new Array(4);
  wa_data[0] = "~Select Drug";
  wa_data[1] = "Dalteparin (LMWH)";
  wa_data[2] = "Warfarin";
  wa_data[3] = w_drug;
  
  // Define test state
  wa_state = new Array(4);
  wa_state[0] = false;
  wa_state[1] = true;
  wa_state[2] = true;
  wa_state[3] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Drug: " + wa_data[i]);
    vselect = panelECD.Panel(2).Select("DrugId");
    vselect.ClickItem(wa_data[i]);
    
    test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, wa_data[i], wa_state[i]);
    
    // Reset the form definition
    //form = panelPCD.Form("AddTreatmentPlanForm");
  }
}  
//===============================================================================
// Patient Treatment Plan fields - Edit
//-------------------------------------------------------------------------------
// Test Edit Diagnosis
function test_edit_diagnosis(INRstarV5, form, p_diagnosis)
{
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
//  var form = panelPCD.Form("PatientEditTreatmentPlanForm");

  var err_mess = "Please select a Diagnosis from the list.";
  var vselect;
  var panelECD = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation"); 

  // Define Test data
  wa_data = new Array(4);
  wa_data[0] = "~Select Diagnosis";
  wa_data[1] = "DVT or PE (Recurrent during treatment)";
  wa_data[2] = "DVT (proximal, permanent risk factors)";
  wa_data[3] = p_diagnosis;
  
  // Define test state
  wa_state = new Array(4);
  wa_state[0] = false;
  wa_state[1] = true;
  wa_state[2] = true;
  wa_state[3] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Diagnosis: " + wa_data[i]);
    vselect = panelECD.Panel(1).Select("DiagnosisId");
    vselect.ClickItem(wa_data[i]);
    
    test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, wa_data[i], wa_state[i]);
    
    // Reset the form definition
    //form = panelPCD.Form("AddTreatmentPlanForm");
  }
}  
//-------------------------------------------------------------------------------
//// Test Diagnosis
//function test_edit_diagnosis(INRstarV5, form)
//{
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
//  var form = panelPCD.Form("PatientEditTreatmentPlanForm");
//
//  var err_mess = "Please select a Diagnosis from the list.";
//  var vselect;
//  var panelECD = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation"); 
//
//  // Define Test data
//  wa_data = new Array(4);
//  wa_data[0] = "~Select Diagnosis";
//  wa_data[1] = "DVT or PE (Recurrent during treatment)";
//  wa_data[2] = "DVT (proximal, permanent risk factors)";
//  wa_data[3] = "Atrial fibrillation";
//  
//  // Define Test data  - associated Target INR
//  wa_data2 = new Array(4);
//  wa_data2[0] = "";
//  wa_data2[1] = "3.5";
//  wa_data2[2] = "2.5";
//  wa_data2[3] = "2.5";
//  
//  // Define Test data  - associated Duration
//  wa_data3 = new Array(4);
//  wa_data3[0] = "";
//  wa_data3[1] = "Indefinite";
//  wa_data3[2] = "26 Weeks";
//  wa_data3[3] = "Indefinite";
//
//  // Define test state
//  wa_state = new Array(4);
//  wa_state[0] = false;
//  wa_state[1] = true;
//  wa_state[2] = true;
//  wa_state[3] = true;
//  
//  // Apply test data
//  for (i=0; i < wa_data.length; i++)
//  {
//    Log.Message("Testing Diagnosis: " + wa_data[i]);
//    vselect = panelECD.Panel(1).Select("DiagnosisId");
//    vselect.ClickItem(wa_data[i]);
//    
//    if (i > 0)
//    {
//        WaitSeconds(5,"");   // to allow values to be preset 
//    
//        // Test associated fields - Target INR
//        Log.Message("Testing Target INR: " + wa_data2[i]);
//        if (panelECD.Panel("DiagnosisDetails").Panel(0).Select("TargetINR").wText != wa_data2[i])
//        {
//                 Log.Warning("Wrong Target INR displayed: " + panelECD.Panel("DiagnosisDetails").Panel(0).Select("TargetINR").Value)
//        }
//        else
//        {
//                 Log.Message("Correct Target INR displayed")
//        }
//        
//        // Test associated fields - Duration
//        Log.Message("Testing Duration: " + wa_data3[i]);
//        if (panelECD.Panel("DiagnosisDetails").Panel(1).Select("TreatmentDuration").wText != wa_data3[i])
//        {
//                 Log.Warning("Wrong Duration displayed: " + panelECD.Panel("DiagnosisDetails").Panel(1).Select("TreatmentDuration").Value)
//        }
//        else
//        {
//                 Log.Message("Correct Duration displayed")
//        }
//        
//    }
//    test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, wa_data[i], wa_state[i]);
//    
//    // Reset the form definition
//    form = panelPCD.Form("AddTreatmentPlanForm");
//  }
//}  
//-------------------------------------------------------------------------------
// Test Review Period
function test_edit_review_period(INRstarV5)
{
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
//  var form = panelPCD.Form("PatientEditTreatmentPlanForm");
  var panelEPTPI = form.Panel("EditPatientTreatmentPlanInformation").Panel("WarfarinDetailsPanel").Panel("EditPatientTreatmentPlanInformation");
 
  var err_mess = "You must select a maximum review period to complete the TreatmentPlan details.";
  var  vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Review Period";
  wa_data[1] = "63 Days";

  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
            Log.Message("Max Review: " + wa_data[i]);
            vselect = panelEPTPI.Panel(2).Select("MaxReview");
            vselect.ClickItem(wa_data[i]);
             test_field_update_patient_treatmentplan(INRstarV5, form, err_mess, wa_data[i], wa_state[i]);

             if (i < wa_data.length - 1)
             {
                   // Reset the form definition
                  //   form = panelPCD.Form("PatientEditTreatmentPlanForm");
             }
  }
  
} 
//-------------------------------------------------------------------------------
// Test Target INR
function test_target_inr(INRstarV5, form)
{
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
//  var form = panelPCD.Form("AddTreatmentPlanForm");

  var err_mess = "Please select a Target INR from the list.";
  var  vselect;
  var panelEPTPI = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation");   
  var panelPTPI = panelEPTPI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation");
  var panelEPTPI2 = panelPTPI.Panel(0).Panel("EditPatientTreatmentPlanInformation");

    // Save the pre-selected duration
  var w_old_target =panelEPTPI2.Panel("DiagnosisDetails").Panel(0).Select("TargetINR").wText;

  // Define Test data
  wa_data = new Array(5);
  wa_data[0] = "~Select Target";
  wa_data[1] = "3.1";
  wa_data[2] = "1.4";
  wa_data[3] = "2.5";
  wa_data[4] = w_old_target;
  
  // Define test state
  wa_state = new Array(4);
  wa_state[0] = false;
  wa_state[1] = true;
  wa_state[2] = true;
  wa_state[3] = true;
  wa_state[4] = true;
  
    // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Target INR: " + wa_data[i]);
    vselect = panelEPTPI2.Panel("DiagnosisDetails").Panel(0).Select("TargetINR");
    vselect.ClickItem(wa_data[i]);
    
    process_confirm_change_INR(INRstarV5);
    
    test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, wa_data[i], wa_state[i]);

    // Reset the form definition
   // form = panelPCD.Form("AddTreatmentPlanForm");
  }
} 
//-------------------------------------------------------------------------------
// Test Duration - Warfarin
function test_duration_w(INRstarV5, form)
{
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
//  var form = panelPCD.Form("AddTreatmentPlanForm");
  
  var err_mess = "Please select a Treatment Duration from the list.";
  var  vselect;
  var panelEPTPI = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation"); 
  
  // Save the pre-selected duration
  var w_old_dur =panelEPTPI.Panel(3).Select("TreatmentDuration").wText;

  // Define Test data
  wa_data = new Array(3);
  wa_data[0] = "~Select Duration";
  wa_data[1] = "26 Weeks";
  wa_data[2] = w_old_dur;

  // Define test state
  wa_state = new Array(3);
  wa_state[0] = false;
  wa_state[1] = true;
  wa_state[2] = true;

    // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing duration: " + wa_data[i]);
    vselect = panelEPTPI.Panel(3).Select("TreatmentDuration");
    vselect.ClickItem(wa_data[i]);
    
    process_confirm_change_duration(INRstarV5);
    
    test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, wa_data[i], wa_state[i]);
    
    // Reset the form definition
    // form = panelPCD.Form("AddTreatmentPlanForm");
  }
} 
//-------------------------------------------------------------------------------
// Test Duration - Non-Warfarin
function test_duration_x(INRstarV5, form)
{
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
//  var form = panelPCD.Form("AddTreatmentPlanForm");

  var err_mess = "Please select a Treatment Duration from the list.";
  var  vselect;
  var panel = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation"); 

  // Define Test data
  wa_data = new Array(3);
  wa_data[0] = "~Select Duration";
  wa_data[1] = "26 Weeks";
  wa_data[2] = "Indefinite";

  // Define test state
  wa_state = new Array(3);
  wa_state[0] = false;
  wa_state[1] = true;
  wa_state[2] = true;

    // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing duration: " + wa_data[i]);
    vselect = panel.Panel("DiagnosisDetails").Panel(1).Select("TreatmentDuration");
    vselect.ClickItem(wa_data[i]);
    
    process_confirm_change_duration(INRstarV5);
    
    test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, wa_data[i], wa_state[i]);
    
    // Reset the form definition
    // form = panelPCD.Form("AddTreatmentPlanForm");
  }
} 
//-------------------------------------------------------------------------------
// Test Dosing Method
function test_dosing_method(INRstarV5, form, p_dose_method)
{
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
//  var form = panelPCD.Form("AddTreatmentPlanForm");

  var err_mess = "Please select a Dosing Method from the list.";
  var  vselect;
  var panelEPTPI = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation"); 
  var panelPTPI = panelEPTPI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation");
  var panelEPTPI2 = panelPTPI.Panel(0).Panel("EditPatientTreatmentPlanInformation");

  // Expand dose method code
  var w_dose_method;
  if (p_dose_method == "c")
   w_dose_method = "Coventry Maintenance";
  if (p_dose_method == "h")
   w_dose_method = "Hillingdon Maintenance";
  if (p_dose_method == "o")
   w_dose_method = "Induction Slow Oates";
  if (p_dose_method == "t")
   w_dose_method = "Induction Slow Tait";
  if (p_dose_method == "m")
   w_dose_method = "Manual Dosing";
   
  // Define Test data
  wa_data = new Array(4);
  wa_data[0] = "~Select Dosing Method";
  wa_data[1] = "Manual Dosing";
  wa_data[2] = "Coventry Maintenance";
  wa_data[3] = w_dose_method;

  // Define test state
  wa_state = new Array(4);
  wa_state[0] = false;
  wa_state[1] = true;
  wa_state[2] = true;
  wa_state[3] = true;

  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
        Log.Message("Dosing Method: " + wa_data[i]);
        vselect = panelEPTPI2.Panel(0).Select("DosingMethod");
        vselect.ClickItem(wa_data[i]);
    
        // Test if process box displayed
        if (i > 0 )
        {
               // Test for Maintenance information window
               process_more_information(INRstarV5);
        }
        test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, wa_data[i], wa_state[i]);

        // Reset the form definition
       // form = panelPCD.Form("AddTreatmentPlanForm");
  }
} 
//-------------------------------------------------------------------------------
// Test Dosing Method - Induction
function test_dosing_method_induction_slow(INRstarV5, form)
{
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var form = panelPCD.Form("AddTreatmentPlanForm");

  var err_mess = "You must select a dosing method to complete the TreatmentPlan details";
  var  vselect;
  var panel = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation"); 

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Dosing Method";
  wa_data[1] = "Induction Slow";

  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;

  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Dosing Method: " + wa_data[i]);
    vselect = panel.Panel(2).Select("DosingMethod");
    vselect.ClickItem(wa_data[i]);
    
    // Test if process box displayed
    if (i > 0 )
    {
       // Test for Maintenance information window
       process_more_information(INRstarV5);
    }
    test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, wa_data[i], wa_state[i]);

    // Reset the form definition
    form = panelPCD.Form("AddTreatmentPlanForm");
  }
} 
//-------------------------------------------------------------------------------
// Test Testing Method
function test_testing_method(INRstarV5, form)
{
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var form = panelPCD.Form("AddTreatmentPlanForm");

  var err_mess = "Please select a Testing Method from the list.";
  var  vselect;
  var panelEPTPI = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation"); 

  var panelPTPI = panelEPTPI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation")
  var panel = panelPTPI.Panel(0).Panel("EditPatientTreatmentPlanInformation")
  
  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Method";
  wa_data[1] = "PoCT";

  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Method: " + wa_data[i]);
    vselect = panel.Panel(1).Select("TestingMethod");
    vselect.ClickItem(wa_data[i]);
    test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, wa_data[i], wa_state[i]);

    // Special test as this is the last field to be tested
    if (i < wa_data.length - 1)  // i.e. don't do this for the last array item
    {
      // Reset the form definition
      form = panelPCD.Form("AddTreatmentPlanForm");
    }
  }
} 
//-------------------------------------------------------------------------------
// Test Review Period
function test_review_period(INRstarV5, form)
{
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
//  var form = panelPCD.Form("AddTreatmentPlanForm");

  var err_mess = "Please select a Max Review from the list.";
  var  vselect;
  var panelEPTPI = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation"); 
  var panelPTPI = panelEPTPI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation");
  var panelEPTPI2 = panelPTPI.Panel(0).Panel("EditPatientTreatmentPlanInformation");

    // Save the pre-selected review
  var w_old_rev =panelEPTPI2.Panel(2).Select("MaxReview").wText;

  // Define Test data
  wa_data = new Array(4);
  wa_data[0] = "~Select Review Period";
  wa_data[1] = "20 Days";
  wa_data[2] = "70 Days";
  wa_data[3] = w_old_rev;

  // Define test state
  wa_state = new Array(4);
  wa_state[0] = false;
  wa_state[1] = true;
  wa_state[2] = true;
  wa_state[3] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Method: " + wa_data[i]);
    vselect = panelEPTPI2.Panel(2).Select("MaxReview");
    vselect.ClickItem(wa_data[i]);
    test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, wa_data[i], wa_state);

    // Reset the form definition
   // form = panelPCD.Form("AddTreatmentPlanForm");
  }
} 
//-------------------------------------------------------------------------------
// Test Tablets
function test_tablets(INRstarV5, form)
{
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
//  var form = panelPCD.Form("AddTreatmentPlanForm");

  var panelEPTPI = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation"); 
  var panelPTPI = panelEPTPI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation");
  var panelEPTPTS = panelPTPI.Panel(0).Panel("EditPatientTreatmentPlanTabletSelection");

  var err_mess = "Please choose at least one tablet strength.";

  var vselect;

  // The options here are either choose NPSA, with the optional 5mg
  // or don't choose NPSA and pick the tablets individually
  
  // Choose NPSA
  panelEPTPTS.Panel(0).Checkbox("NPSA").ClickChecked(true);
  
  // Choose not to use 5mg
  panelEPTPTS.Panel(1).Checkbox("Tablets_Use5").ClickChecked(false);
  test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, "NPSA, not 5mg", true);

  // Reset the form definition
 // form = panelPCD.Form("AddTreatmentPlanForm");

  // Choose not NPSA
  panelEPTPTS.Panel(0).Checkbox("NPSA").ClickChecked(false);
  test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, "Not NPSA, no tablets", false);

  // Reset the form definition
 // form = panelPCD.Form("AddTreatmentPlanForm");

  // Choose Split tablets only
  panelEPTPTS.Panel(5).Checkbox("Tablets_UseSplit").ClickChecked(true);
  test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, "Not NPSA, only split tablets", false);

  // Reset the form definition
  //form = panelPCD.Form("AddTreatmentPlanForm");
  
  // Choose 3mg and 1mg 
  panelEPTPTS.Panel(2).Checkbox("Tablets_Use3").ClickChecked(true);
  panelEPTPTS.Panel(3).Checkbox("Tablets_Use1").ClickChecked(true);
  test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, "Not NPSA, 3mg & 1mg", true);
} 
//===============================================================================
// Patient Warfarin Review fields
//-------------------------------------------------------------------------------
// Test Review Date
function test_review_date(INRstarV5, form)
{
// As yet, no validation occurs on this field. Range is pre-determined by other data (start of plan & today)

//  var err_mess1 = "Please select a Started Warfarin date that is on or before today's date.";
//  var err_mess2 = "The patients start date cannot be before their date of birth";
//  var textbox;
//  var datepicker;
//  var panel = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(0);   
//
//  // Set Valid Date -------------------------------------------
//  // Click on Calendar icon
//  panel.Image("calendar_png").Click();
//  datepicker = INRstarV5.Panel("ui_datepicker_div");
//  
//  // Set Date
//  datepicker.Panel(0).Panel(0).Select(0).ClickItem("Oct");
//  datepicker.Panel(0).Panel(0).Select(1).ClickItem("2013");
//  datepicker.Table(0).Cell(3, 3).Link(0).Click();
//    
//  textbox = panel.Textbox("Start");
//  test_field_add_patient_treatmentplan(INRstarV5, form, err_mess1, textbox.Text, true);
}
//-------------------------------------------------------------------------------
// Test Review Compliance
function test_review_compliance(INRstarV5, form)
{
// As yet, no validation occurs on this field. 
}
//-------------------------------------------------------------------------------
// Test Review Chads2 Vasc
function test_review_chads(INRstarV5, form)
{
// As yet, no validation occurs on this field. 
}
//-------------------------------------------------------------------------------
// Test Review Hasbled
function test_review_hasbled(INRstarV5, form)
{
// As yet, no validation occurs on this field. 
}
//-------------------------------------------------------------------------------
// Test Review Comments
function test_review_comments(INRstarV5, form)
{
// As yet, no validation occurs on this field. Range is pre-determined by other data (today & +2 years, 6 months)
}
//-------------------------------------------------------------------------------
// Test Review Next Date
function test_review_next_date(INRstarV5, form)
{
// As yet, no validation occurs on this field. Range is pre-determined by other data (today & +2 years, 6 months)
}
//===============================================================================
// Historical Treatment fields
//-------------------------------------------------------------------------------
// Test Start Date of Treatment
function test_ht_start_date(INRstarV5, form)
{
  var w_err_mess1 = "Please select a treatment date that is not in the future";
  var w_err_mess2 = "Please select a treatment date that is after the Patient's Date of Birth";
  var w_textbox;
  var w_datepicker;
   
//  // Empty field & try to save  - not a valid user option
//  w_textbox = form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Textbox("Date");
//  w_textbox.Text = "";
//  test_field_historical_treatments(INRstarV5, form, w_err_mess, w_textbox.Text);
  
  // Click on Calendar icon -----------
  form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  // Set Invalid Date
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jan");
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("2015");
  w_datepicker.Table(0).Cell(3, 3).Link(0).Click();
    
  w_textbox = form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Textbox("Date");
  test_field_historical_treatments(INRstarV5, form, w_err_mess1, w_textbox.Text, false);

  // Click on Calendar icon --------------
  form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  // Set Invalid Date before DoB
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Oct");
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("1900");
  w_datepicker.Table(0).Cell(2, 2).Link(0).Click();
    
  w_textbox = form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Textbox("Date");
  test_field_historical_treatments(INRstarV5, form, w_err_mess2, w_textbox.Text, false);

  // Click on Calendar icon --------------
  form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  // Set Valid Date
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Oct");
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("2013");
  w_datepicker.Table(0).Cell(3, 4).Link(0).Click();
    
  w_textbox = form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Textbox("Date");
  test_field_historical_treatments(INRstarV5, form, w_err_mess1, w_textbox.Text, true);
  test_field_historical_treatments(INRstarV5, form, w_err_mess2, w_textbox.Text, true);

}
//-------------------------------------------------------------------------------
// Test Historical Treatment INR
function test_ht_inr(INRstarV5, form)
{
  var w_err_mess = "Please select a valid INR";
  var w_vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select INR";
  wa_data[1] = "2.3";
  
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;
    
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing INR: " + wa_data[i]);
    w_vselect = form.Table("AddHistoricalTreatmentTable").Cell(1, 1).Select("INR");
    w_vselect.ClickItem(wa_data[i]);
    test_field_historical_treatments(INRstarV5, form, w_err_mess, wa_data[i], wa_state[i]);
  }
}  
//-------------------------------------------------------------------------------
// Test Historical Treatment INR
function test_ht_inr_pre_induction(INRstarV5, form)
{
  var w_err_mess = "Please select a valid INR";
  var w_vselect;

  // Define Test data
  wa_data = new Array(3);
  wa_data[0] = "~Select INR";
  wa_data[1] = "1.5";
  wa_data[2] = "1.4";
  
  // Define test state
  wa_state = new Array(3);
  wa_state[0] = false;
  wa_state[1] = false
  wa_state[2] = true;
    
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing INR: " + wa_data[i]);
    w_vselect = form.Table("AddHistoricalTreatmentTable").Cell(1, 1).Select("INR");
    w_vselect.ClickItem(wa_data[i]);
    test_field_historical_treatments(INRstarV5, form, w_err_mess, wa_data[i], wa_state[i]);
  }
}  
//-------------------------------------------------------------------------------
// Test Historical Treatment Dose
function test_ht_dose(INRstarV5, form)
{
  var w_err_mess = "Please select a valid dose";
  var w_vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Dose";
  wa_data[1] = "2.7";
  
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;
    
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing INR: " + wa_data[i]);
    w_vselect = form.Table("AddHistoricalTreatmentTable").Cell(1, 2).Select("Dose");
    w_vselect.ClickItem(wa_data[i]);
    test_field_historical_treatments(INRstarV5, form, w_err_mess, wa_data[i],wa_state[i]);
  }
}  
//-------------------------------------------------------------------------------
// Test Historical Treatment Omits
function test_ht_omits(INRstarV5, form)
{
  var w_err_mess = "Please select a valid Omits";
  var w_vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Omits";
  wa_data[1] = "0 Days";
  
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;
    
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Omits: " + wa_data[i]);
    w_vselect = form.Table("AddHistoricalTreatmentTable").Cell(1, 3).Select("Omits");
    w_vselect.ClickItem(wa_data[i]);
    test_field_historical_treatments(INRstarV5, form, w_err_mess, wa_data[i],wa_state[i]);
  }
}  
//-------------------------------------------------------------------------------
// Test Historical Treatment Review
function test_ht_review(INRstarV5, form)
{
  var w_err_mess = "Please select a valid review period";
  var w_vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Review Period";
  wa_data[1] = "35 Days";
  
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;
    
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing INR: " + wa_data[i]);
    w_vselect = form.Table("AddHistoricalTreatmentTable").Cell(1, 4).Select("Review");
    w_vselect.ClickItem(wa_data[i]);
    test_field_historical_treatments(INRstarV5, form, w_err_mess, wa_data[i], wa_state[i]);
  }
}  
//-------------------------------------------------------------------------------
// Test Historical Treatment Target INR
function test_ht_target_inr(INRstarV5, form)
{
  var w_err_mess = "Please select a valid target INR";
  var w_vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Target";
  wa_data[1] = "2.5";

  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;
    
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Target INR: " + wa_data[i]);
    w_vselect = form.Table("AddHistoricalTreatmentTable").Cell(1, 5).Select("TargetINR");
    w_vselect.ClickItem(wa_data[i]);
    test_field_historical_treatments(INRstarV5, form, w_err_mess, wa_data[i], wa_state[i]);
  }
}  
//-------------------------------------------------------------------------------
// Test Historical Treatment Comments
function test_ht_comments(INRstarV5, form)
{
  var w_comment = "This is a comment added on " + aqDateTime.Today();

  form.Textarea("Comments").innerText = w_comment;  
}  
//===============================================================================
// Override Fields
//-------------------------------------------------------------------------------
// Test Override NTDate
function test_oride_ntd(INRstarV5, formEPT, tableOST)
{
  var err_mess1 = "Please select a treatment date that is not in the future";
  var err_mess2 = "Treatment date cannot be too far in the past, it must be between today and the patients maximum review";
  var textbox;
  var datepicker;
  Log.Message("Testing Override: Date");

  // Set Invalid Date - Future ---------------------------------
  // Click on Calendar icon
  tableOST.Cell(1, 4).Image("calendar_png").Click();
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  // Set Date
  datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jan");
  datepicker.Panel(0).Panel(0).Select(1).ClickItem("2015");
  datepicker.Table(0).Cell(3, 3).Link(0).Click();
    
  textbox = tableOST.Cell(1, 4).Textbox("Date");
  test_field_override(INRstarV5, formEPT, err_mess1, textbox.Text, false);

  // Set Invalid Date - before DoB -----------------------------
  // Click on Calendar icon
  tableOST.Cell(1, 4).Image("calendar_png").Click();
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  // Set Date
  datepicker.Panel(0).Panel(0).Select(0).ClickItem("Feb");
  datepicker.Panel(0).Panel(0).Select(1).ClickItem("1900");
  datepicker.Table(0).Cell(3, 3).Link(0).Click();
    
  textbox = tableOST.Cell(1, 4).Textbox("Date");
  test_field_override(INRstarV5, formEPT, err_mess2, textbox.Text, false);

  // Set Valid Date -------------------------------------------
  // Click on Calendar icon
  tableOST.Cell(1, 4).Image("calendar_png").Click();
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  // Set Date
  datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jan");
  datepicker.Panel(0).Panel(0).Select(1).ClickItem("2014");
  datepicker.Table(0).Cell(3, 3).Link(0).Click();
    
  textbox = tableOST.Cell(1, 4).Textbox("Treatment_NextTest");
  test_field_override(INRstarV5, formEPT, err_mess1, textbox.Text, true);

}
//-------------------------------------------------------------------------------
// Test Override Treatment Dose
function test_oride_dose(INRstarV5, formEPT, tableOST)
{
  var w_err_mess = "Please select a valid dose";
  var w_vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Dose";
  wa_data[1] = "2.7";
  
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;
    
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Override: " + wa_data[i]);
    w_vselect = tableOST.Cell(1, 1).Select("Treatment_Dose");
    w_vselect.ClickItem(wa_data[i]);
    test_field_override(INRstarV5, formEPT, w_err_mess, wa_data[i],wa_state[i]);
  }
}  
//-------------------------------------------------------------------------------
// Test Override Omits
function test_oride_omits(INRstarV5, formEPT, tableOST)
{
  //var w_err_mess = "Please select a omit value between 0 and 6";
  var w_err_mess = "Please select a omit value between 0 and 7"; // Invalid test for now
  var w_vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Omits";
  wa_data[1] = "0 Days";
  
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;
    
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Override: " + wa_data[i]);
    w_vselect = tableOST.Cell(1, 2).Select("Treatment_Omits");
    w_vselect.ClickItem(wa_data[i]);
    test_field_override(INRstarV5, formEPT, w_err_mess, wa_data[i],wa_state[i]);
  }
}  
//-------------------------------------------------------------------------------
// Test Historical Treatment Review
function test_oride_review(INRstarV5, formEPT, tableOST)
{
  var w_err_mess = "Please select a valid review period";
  var w_vselect;

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Review Period";
  wa_data[1] = "21 Days";
  
  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;
    
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Override: " + wa_data[i]);
    w_vselect = tableOST.Cell(1, 3).Select("Treatment_Review");
    w_vselect.ClickItem(wa_data[i]);
    test_field_override(INRstarV5, formEPT, w_err_mess, wa_data[i], wa_state[i]);
  }
}  
//===============================================================================
// Edit Fields
//-------------------------------------------------------------------------------
// Test Patient Title
function test_edit_title()
{
  var INRstarV5 = set_system(); 
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  var err_mess = "Please select a Title";
 
  var w_old_demographics = form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Select("Title").Value;

  // Empty field & try to save
  form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Select("Title").ClickItem("~Select Title");
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Select("Title").Value, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  // Add value
  var panelEPD = form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails");
  panelEPD.Panel(2).Select("Title").ClickItem(w_old_demographics);
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Select("Title").Value, true);
}
//-------------------------------------------------------------------------------
// Test Patient Family Name
function test_edit_family()
{
  var INRstarV5 = set_system(); 
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  var err_mess = "Please enter a FAMILY name";
 
  var w_old_demographics = form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text;

  // Empty field & try to save
  form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text = "";
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  // Add value
  var panelEPD = form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails");
  panelEPD.Panel(3).Textbox("Surname").Text = "O'carrol-"+ w_old_demographics;
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text, true);
}
//-------------------------------------------------------------------------------
// Test Patient Given Name
function test_edit_firstname()
{
  var INRstarV5 = set_system(); 
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  var err_mess = "Please enter a Given name";
 
  var w_old_demographics = form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text;

  // Empty field & try to save
  form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text = "";
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  // Add value
  var panelEPD = form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails");
  panelEPD.Panel(4).Textbox("FirstName").Text = w_old_demographics + " Sam" ;
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text, true);
}
//-------------------------------------------------------------------------------
// Test Patient Sex
function test_edit_sex()
{
  var INRstarV5 = set_system(); 
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  var err_mess = "Please enter a Given name";
 
  var w_old_demographics = form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text;

  // Empty field & try to save
  form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text = "";
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  // Add value
  var panelEPD = form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails");
  panelEPD.Panel(4).Textbox("FirstName").Text = w_old_demographics + " Sam" ;
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text, true);
}
//-------------------------------------------------------------------------------
// Test Address Line 1
function test_edit_address_line_1(INRstarV5)
{
  var INRstarV5 = set_system(); 
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  var err_mess = "Please enter Line 1 of the address";
 
  var w_old_address = form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text;

  // Empty field & try to save
  form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text = "";
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  // Add value
  var panelEPCD = form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails");
  panelEPCD.Panel(0).Textbox("FirstLineAddress").Text = "Flat 1, " + w_old_address;
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text, true);
}
//-------------------------------------------------------------------------------
// Test Address Line 1
function test_edit_address_town(INRstarV5)
{
  var INRstarV5 = set_system(); 
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  var err_mess = "Please enter a City/Town";
 
  var w_old_address = form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text;

  // Empty field & try to save
  form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text = "";
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  // Add value
  var panelEPCD = form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails");
  panelEPCD.Panel(3).Textbox("Town").Text = w_old_address + "-on-Sea";
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text, true);
}
//-------------------------------------------------------------------------------
// Test Address Line - County
function test_edit_address_county(INRstarV5)
{
  var INRstarV5 = set_system(); 
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  var err_mess = "Please enter a County";
 
  var w_old_address = form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text;

  // Empty field & try to save
  form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text = "";
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text, false);
  
  // Reset the form definition
  form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  // Add value
  var panelEPCD = form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails");
  panelEPCD.Panel(4).Textbox("County").Text = "County " + w_old_address;
  test_field_edit_patient_details(INRstarV5, err_mess, form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text, true);
}
//-------------------------------------------------------------------------------
// Test Date of Birth

  // We need to put in test here for when patient under 12 maintenance
  // We need do test when patient under 18 for NOAC
  // Also we could do these tests on edit for a coupe lof different places so worth thinking about before doing

function test_edit_date_of_birth(INRstarV5, w_dob_year, w_dob_month, w_dob_day)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");

  var w_err_mess1 = "Please select a date in the past";
  var w_err_mess2 = "Invalid age (must be between 0 and 110 years)";
  var w_datepicker;
  form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Image("calendar_png").Click();
    
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_dob_month)); // Month
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_dob_year)); // Year
  select_day(w_dob_day, w_datepicker); // Day

  // Test the dob
  test_field_edit_patient_details(INRstarV5, w_err_mess2, form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Textbox("PatientBorn").Text, true);

}

//-------------------------------------------------------------------------------

// Test Date of Birth for regression test

function test_edit_date_of_birth_regression()
{
  var INRstarV5 = set_system();
  
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientEditDetailsForm");
  var panelPDW = form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails");
  
  var old_dob = panelPDW.Panel(5).Textbox("PatientBorn").Text;
  
  var w_dob = aqConvert.StrToDate(aqDateTime.AddDays(old_dob, -365));
  
  var w_testdob = aqConvert.DateTimeToStr(w_dob);

       var w_day = aqString.SubString(w_testdob,0,2);
       var w_mth = aqConvert.StrToInt(aqString.SubString(w_testdob,3,2));
       var w_yr = aqString.SubString(w_testdob,6,4);

  panelPDW.Panel(5).Image("calendar_png").Click();
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, w_datepicker);
  
  form.Panel(0).SubmitButton("UpdatePatientDetails").Click();
  
  WaitSeconds(2);
  
  var panelPD = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientDetailsWrapper").Panel("PatientDetails");
  var new_dob = panelPD.Panel(5).Label("Born_DetachedLabel").contentText;
  Log.Message(new_dob)
  if (new_dob == old_dob)
             {
                     Log.Warning("Look into why the dob are the same indicates this has not been saved");
             }
}
//=====================================================================================
//-------------------------------------------------------------------------------
// Test Testing Method
function test_edit_testing_method(INRstarV5)
{
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientClinicalWrapper").Panel("PatientClinicalDetails");
  var form = panelPCD.Form("PatientEditClinicalForm");

  var err_mess = "Please select a Testing Method from the list.";
  var  vselect;
  var panel = form.Panel("EditPatientClinicalInformation");   

  // Define Test data
  wa_data = new Array(2);
  wa_data[0] = "~Select Method";
  wa_data[1] = "PoCT";

  // Define test state
  wa_state = new Array(2);
  wa_state[0] = false;
  wa_state[1] = true;
  
  // Apply test data
  for (i=0; i < wa_data.length; i++)
  {
    Log.Message("Testing Method: " + wa_data[i]);
    vselect = panel.Panel(3).Select("TestingMethod");
    vselect.ClickItem(wa_data[i]);
    test_field_update_patient_clinical(INRstarV5, form, err_mess, wa_data[i], wa_state[i]);

    // Reset the form definition
//    form = form.Panel("EditPatientClinicalInformation");
  }
}  
//===============================================================================
// Patient Notes fields
//-------------------------------------------------------------------------------
// Test Patient Notes
function test_patient_notes(INRstarV5)
{
      var INRstarV5 = set_system();
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("NotesContent");
      var panelPNW = panelPTC.Panel("PatientNotesWrapper");
      var form = panelPNW.Form("NotesForm");

      Log.Message("Testing Patient Notes");
      
      // Click Add button
      form.Panel(0).Button("AddNoteLink").Click();
      
      var formPNF = panelPNW.Form("PatientNotesForm")
      
      // Test blank Note
      formPNF.Panel(0).SubmitButton("AddNote").Click();
      // Check the Error panel for the text
      var w_err_text = panelPNW.Panel("PatientNoteValidation").innerText;
      var w_err_mess = "Please enter a note for this patient";
      test_message(INRstarV5, w_err_text, w_err_mess, 0, 0);

      // Enter Notes
      formPNF.Textarea("Note").innerText = "Test note";
      formPNF.Panel(0).SubmitButton("AddNote").Click();

}
//===============================================================================
// Adverse Event Fields
//-------------------------------------------------------------------------------
// Test Adverse Event Date
function test_adv_date(INRstarV5)
{
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("PatientTabContent");
   var panelPAEW = panelPTC.Panel("PatientAdverseEventsWrapper");
   var formAAEF = panelPAEW.Form("AddAdverseEventForm");

  var w_err_mess = "You cannot enter a date in the future";
  var textbox;
  var datepicker;
  Log.Message("Testing Adverse Event: Date");

  // Set Invalid Date - Future ---------------------------------
  // Click on Calendar icon
  formAAEF.Panel(0).Image("calendar_png").Click();
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  // Set Date  
  datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jan");
  WaitSeconds(0.5) ;
  datepicker.Panel(0).Panel(0).Select(1).ClickItem("2015");
  datepicker.Table(0).Cell(3, 3).Link(0).Click();
    
  textbox = formAAEF.Panel(0).Textbox("AdverseEvent_Date");
  test_field_adverse_event(INRstarV5, formAAEF, w_err_mess, textbox.Text, false);

  // Set Valid Date -------------------------------------------
  // Click on Calendar icon
  formAAEF.Panel(0).Image("calendar_png").Click();
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  // Set Date
  datepicker.Panel(0).Panel(0).Select(0).ClickItem("Sep");
  datepicker.Panel(0).Panel(0).Select(1).ClickItem("2011");
  datepicker.Table(0).Cell(3, 3).Link(0).Click();
    
  textbox = formAAEF.Panel(0).Textbox("AdverseEvent_Date");
  test_field_adverse_event(INRstarV5, formAAEF, w_err_mess, textbox.Text, true);

}
//-------------------------------------------------------------------------------
// Test Adverse_Event_Event
function test_adv_event(INRstarV5)
{
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("PatientTabContent");
   var panelPAEW = panelPTC.Panel("PatientAdverseEventsWrapper");
   var formAAEF = panelPAEW.Form("AddAdverseEventForm");
   
   var w_err_mess = "select a valid event";
 
   // Define Test data
   wa_data = new Array(2);
   wa_data[0] = "~Select Event";
   wa_data[1] = "Other";
  
   // Define test state
   wa_state = new Array(2);
   wa_state[0] = false;
   wa_state[1] = true;
    
   // Apply test data
   for (i=0; i < wa_data.length; i++)
   {
    Log.Message("Testing Adverse Event: " + wa_data[i]);
    w_vselect = formAAEF.Panel(1).Select("AdverseEvent_EventId");
    w_vselect.ClickItem(wa_data[i]);
    test_field_adverse_event(INRstarV5, formAAEF, w_err_mess, wa_data[i], wa_state[i]);
    
    // Reset the form definition
    var formAAEF = panelPAEW.Form("AddAdverseEventForm");

   }
} 
//-------------------------------------------------------------------------------
// Test Adverse Event Severity
function test_adv_severity(INRstarV5)
{
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("PatientTabContent");
   var panelPAEW = panelPTC.Panel("PatientAdverseEventsWrapper");
   var formAAEF = panelPAEW.Form("AddAdverseEventForm");
   
   var w_err_mess = "select a valid severity for the event";
 
   // Define Test data
   wa_data = new Array(2);
   wa_data[0] = "~Select Severity";
   wa_data[1] = "Unknown";
  
   // Define test state
   wa_state = new Array(2);
   wa_state[0] = false;
   wa_state[1] = true;
    
   // Apply test data
   for (i=0; i < wa_data.length; i++)
   {
    Log.Message("Testing Adverse Event Severity: " + wa_data[i]);
    w_vselect = formAAEF.Panel(2).Select("AdverseEvent_SeverityId");
    w_vselect.ClickItem(wa_data[i]);
    test_field_adverse_event(INRstarV5, formAAEF, w_err_mess, wa_data[i], wa_state[i]);
    
    // Reset the form definition
    var formAAEF = panelPAEW.Form("AddAdverseEventForm");

   }
} 
//-------------------------------------------------------------------------------
// Test Adverse Event Treatment
function test_adv_treatment(INRstarV5)
{
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("PatientTabContent");
   var panelPAEW = panelPTC.Panel("PatientAdverseEventsWrapper");
   var formAAEF = panelPAEW.Form("AddAdverseEventForm");
   
   var w_err_mess = "select a valid treatment for the event";
 
   // Define Test data
   wa_data = new Array(2);
   wa_data[0] = "~Select Treatment";
   wa_data[1] = "Unknown";
  
   // Define test state
   wa_state = new Array(2);
   wa_state[0] = false;
   wa_state[1] = true;
    
   // Apply test data
   for (i=0; i < wa_data.length; i++)
   {
    Log.Message("Testing Adverse Event Treatment: " + wa_data[i]);
    w_vselect = formAAEF.Panel(3).Select("AdverseEvent_TreatmentId");
    w_vselect.ClickItem(wa_data[i]);
    test_field_adverse_event(INRstarV5, formAAEF, w_err_mess, wa_data[i], wa_state[i]);
    
    // Reset the form definition
    var formAAEF = panelPAEW.Form("AddAdverseEventForm");

   }
} 
//-------------------------------------------------------------------------------
// Test Adverse Event Outcome
function test_adv_outcome(INRstarV5)
{
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("PatientTabContent");
   var panelPAEW = panelPTC.Panel("PatientAdverseEventsWrapper");
   var formAAEF = panelPAEW.Form("AddAdverseEventForm");
   
   var w_err_mess = "select a valid outcome for the event";
 
   // Define Test data
   wa_data = new Array(2);
   wa_data[0] = "~Select Outcome";
   wa_data[1] = "Unknown";
  
   // Define test state
   wa_state = new Array(2);
   wa_state[0] = false;
   wa_state[1] = true;
    
   // Apply test data
   for (i=0; i < wa_data.length; i++)
   {
    Log.Message("Testing Adverse Event Outcome: " + wa_data[i]);
    w_vselect = formAAEF.Panel(4).Select("AdverseEvent_OutcomeId");
    w_vselect.ClickItem(wa_data[i]);
    test_field_adverse_event(INRstarV5, formAAEF, w_err_mess, wa_data[i], wa_state[i]);
    
    // Reset the form definition
    var formAAEF = panelPAEW.Form("AddAdverseEventForm");

   }
} 
////-------------------------------------------------------------------------------
//// Test Adverse Event Comments
//function test_adv_comments(INRstarV5)
//{
////  try
////  {
//   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//   var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("PatientTabContent");
//   var panelPAEW = panelPTC.Panel("PatientAdverseEventsWrapper");
//   var formAAEF = panelPAEW.Form("AddAdverseEventForm");
//   
//   var w_err_mess = "select a valid outcome for the event";
// 
//      // Click Add button
//      panelPNW.Panel(0).Button("AddNoteLink").Click();
//      
//      formPNF = panelPNW.Form("PatientNotesForm");
//      
//      // Test blank Note
//      formPNF.Panel(0).SubmitButton("AddNote").Click();
//      // Check the Error panel for the text
//      var w_err_text = panelPNW.Panel("PatientNoteValidation").innerText;
//      var w_err_mess = "Please enter a note for this patient";
//      test_message(INRstarV5, w_err_text, w_err_mess, 0, 0);
//
//      // Enter Notes
//      formPNF.Textarea("Note").innerText = "Test note";
//      formPNF.Panel(0).SubmitButton("AddNote").Click();
//     
//
////      }
////  catch(exception)
////  {
////    Log.Error("Exception", exception.description);
////  }
//}
  
//===============================================================================
// Admin Dashboard Client fields
//-------------------------------------------------------------------------------
// Test Client field
function test_client_field(INRstarV5, p_field, p_err_mess, p_gen_text)
{
  // Empty field & try to save
  p_field.Text = "";
  test_field_new_client_details(INRstarV5, p_err_mess, p_field.Text, false);
  
//  // Reset the form definition
//  form = panelMCP.Fieldset(0).Form("NewClientForm");
  // Add value
  p_field.Text = p_gen_text + aqConvert.IntToStr(Math.floor(Math.random()*100));
  test_field_new_client_details(INRstarV5, p_err_mess, p_field.Text, true);
}
////-------------------------------------------------------------------------------
//// Test Client Name
//function test_client_name(INRstarV5)
//{
//  var panelMain = INRstarV5.Panel("MainPage");
//  var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
//  var form = panelMCP.Fieldset(0).Form("NewClientForm");
//
//  var err_mess = "Please enter an Account Name";
// 
//  // Empty field & try to save
//  form.Panel(0).Textbox("Name").Text = "";
//  test_field_new_client_details(INRstarV5, err_mess, form.Panel(0).Textbox("Name").Text, false);
//  
//  // Reset the form definition
//  form = panelMCP.Fieldset(0).Form("NewClientForm");
//  // Add value
//  form.Panel(0).Textbox("Name").Text = "Client_" + aqConvert.IntToStr(Math.floor(Math.random()*100));
//  test_field_new_client_details(INRstarV5, err_mess, form.Panel(0).Textbox("Name").Text, true);
//}
////-------------------------------------------------------------------------------
//// Test NHS Location code
//// No test required
//
////-------------------------------------------------------------------------------
//// Test Contact
//function test_client_contact(INRstarV5)
//{
//  var panelMain = INRstarV5.Panel("MainPage");
//  var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
//  var form = panelMCP.Fieldset(0).Form("NewClientForm");
//
//  var err_mess = "Please enter a Contact";
// 
//  // Empty field & try to save
//  form.Panel(3).Textbox("Contact").Text = "";
//  test_field_new_client_details(INRstarV5, err_mess, form.Panel(0).Textbox("Name").Text, false);
//  
//  // Reset the form definition
//  form = panelMCP.Fieldset(0).Form("NewClientForm");
//  // Add value
//  form.Panel(3).Textbox("Contact").Text = "Client_" + aqConvert.IntToStr(Math.floor(Math.random()*100));
//  test_field_new_client_details(INRstarV5, err_mess, form.Panel(3).Textbox("Contact").Text, true);
//}
////-------------------------------------------------------------------------------
//// Test Job Title
//function test_client_job_title(INRstarV5)
//{
//  var panelMain = INRstarV5.Panel("MainPage");
//  var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
//  var form = panelMCP.Fieldset(0).Form("NewClientForm");
//
//  var err_mess = "Please enter a Job Title";
// 
//  // Empty field & try to save
//  form.Panel(4).Textbox("Title").Text = "";
//  test_field_new_client_details(INRstarV5, err_mess, form.Panel(4).Textbox("Title").Text, false);
//  
//  // Reset the form definition
//  form = panelMCP.Fieldset(0).Form("NewClientForm");
//  // Add value
//  form.Panel(4).Textbox("Title").Text = "Client_" + aqConvert.IntToStr(Math.floor(Math.random()*100));
//  test_field_new_client_details(INRstarV5, err_mess, form.Panel(4).Textbox("Title").Text, true);
//}
////-------------------------------------------------------------------------------
//// Test Contact
//function test_client_contact(INRstarV5)
//{
//  var panelMain = INRstarV5.Panel("MainPage");
//  var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
//  var form = panelMCP.Fieldset(0).Form("NewClientForm");
//
//  var err_mess = "Please enter a Contact";
// 
//  // Empty field & try to save
//  form.Panel(3).Textbox("Contact").Text = "";
//  test_field_new_client_details(INRstarV5, err_mess, form.Panel(0).Textbox("Name").Text, false);
//  
//  // Reset the form definition
//  form = panelMCP.Fieldset(0).Form("NewClientForm");
//  // Add value
//  form.Panel(3).Textbox("Contact").Text = "Client_" + aqConvert.IntToStr(Math.floor(Math.random()*100));
//  test_field_new_client_details(INRstarV5, err_mess, form.Panel(3).Textbox("Contact").Text, true);
//}
////-------------------------------------------------------------------------------
//// Test Contact
//function test_client_contact(INRstarV5)
//{
//  var panelMain = INRstarV5.Panel("MainPage");
//  var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
//  var form = panelMCP.Fieldset(0).Form("NewClientForm");
//
//  var err_mess = "Please enter a Contact";
// 
//  // Empty field & try to save
//  form.Panel(3).Textbox("Contact").Text = "";
//  test_field_new_client_details(INRstarV5, err_mess, form.Panel(0).Textbox("Name").Text, false);
//  
//  // Reset the form definition
//  form = panelMCP.Fieldset(0).Form("NewClientForm");
//  // Add value
//  form.Panel(3).Textbox("Contact").Text = "Client_" + aqConvert.IntToStr(Math.floor(Math.random()*100));
//  test_field_new_client_details(INRstarV5, err_mess, form.Panel(3).Textbox("Contact").Text, true);
//}
////-------------------------------------------------------------------------------
//// Test Contact
//function test_client_contact(INRstarV5)
//{
//  var panelMain = INRstarV5.Panel("MainPage");
//  var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
//  var form = panelMCP.Fieldset(0).Form("NewClientForm");
//
//  var err_mess = "Please enter a Contact";
// 
//  // Empty field & try to save
//  form.Panel(3).Textbox("Contact").Text = "";
//  test_field_new_client_details(INRstarV5, err_mess, form.Panel(0).Textbox("Name").Text, false);
//  
//  // Reset the form definition
//  form = panelMCP.Fieldset(0).Form("NewClientForm");
//  // Add value
//  form.Panel(3).Textbox("Contact").Text = "Client_" + aqConvert.IntToStr(Math.floor(Math.random()*100));
//  test_field_new_client_details(INRstarV5, err_mess, form.Panel(3).Textbox("Contact").Text, true);
//}
