//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
//New file to maintain new/consistent style and minimise duplication
//Use functions from here before anywhere else
//Add functions (in current style) if they are missing from here
//Put "Get" function in here, these are functions to return/retrieve specific data
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                            Get Functions                                        //
//---------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

//Returning an NHS of the current patient loaded
function get_patient_nhs()
{
  var patient_blue_banner_path = patient_banner_blue_bar()
  var nhs_num = patient_blue_banner_path.Panel(3).Panel(0).Label("NHSNumber_DetachedLabel").innerText;
          
  return nhs_num;
}

//-----------------------------------------------------------------------------------
//Returning details from demographics as an object
function get_patient_details_object_from_demographics()
{
  var patient_details = new Object();
  Goto_Patient_Demographics();  
  
  var patient_demographics_tab_demographics_path = patient_demographics_tab_demographics();
  
  patient_details.firstname = patient_demographics_tab_demographics_path.Panel(4).Label("FirstName_DetachedLabel").contentText;
  patient_details.lastname = patient_demographics_tab_demographics_path.Panel(3).Label("Surname_DetachedLabel").contentText;
  patient_details.nhs_number = patient_demographics_tab_demographics_path.Panel(1).Label("NHSNumber_DetachedLabel").contentText.replace(/\s/g, ""); // Remove Whitespaces
  patient_details.dob = patient_demographics_tab_demographics_path.Panel(5).Label("Born_DetachedLabel").contentText;
  patient_details.gender = patient_demographics_tab_demographics_path.Panel(7).Label("Gender_DetachedLabel").contentText.substring(0,1); //returns M or F
  patient_details.fullname = patient_details.lastname + ', ' + patient_details.firstname
  patient_details.dob_as_dd_mm_yyyy = convert_date_from_dd_mmm_yyyy_to_get_date_as_dd_mm_yyyy(patient_details.dob)
          
  return patient_details;
}

//-----------------------------------------------------------------------------------
//Returning firstname of the current patient loaded
function get_patient_firstname()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_demographics_path = patient_demographics_tab_demographics();
  var firstname =  patient_demographics_tab_demographics_path.Panel(4).Label("FirstName_DetachedLabel").contentText;
          
  return firstname;
}
//-----------------------------------------------------------------------------------
function get_fiscal_code(patient_data)
{
  TestedApps.FiscalCodeGenerator.Run();
  Sys.WaitBrowser("iexplore", 30000, 1);
  WaitSeconds(5, "Waiting for application to open...");
  var main_page = fiscal_generator_main_page_path();
   
  //If it's the first tiem on the page you will get a pop up need to find the id str to put in the below
//  var cookie_popup = main_page.Panel("cookieChoiceInfo").Link("cookieChoiceDismiss"); 
//  if(cookie_popup.Exists)
//  {
//    cookie_popup.Click();
//  }

  //edit the object to fit the form
  var fiscal_form_day = aqString.SubString(date,0,2);
  var fiscal_form_month = aqConvert.StrToInt(aqString.SubString(date,3,2));
  var fiscal_form_year = aqString.SubString(date,6,4);
  var sex = (patient_data.sex=="Male") ? "M" : "F";
  
  //Add patient data to the form here
  var fiscal_form = fiscal_form_path();
  
  fiscal_form.Panel(0).Panel(1).Panel(0).Panel(0).Textbox("cg").Text=(patient_data.last_name);
  fiscal_form.Panel(0).Panel(1).Panel(1).Panel(0).Textbox("nm").Text=(patient_data.first_name);
  fiscal_form.Panel(0).Panel(1).Panel(2).Panel(0).Panel(0).Panel(0).Panel(0).Select("aa").ClickItem("1982");
  fiscal_form.Panel(0).Panel(1).Panel(2).Panel(0).Panel(0).Panel(0).Panel(0).Select("mm").ClickItem("JUL");
  fiscal_form.Panel(0).Panel(1).Panel(2).Panel(0).Panel(0).Panel(0).Panel(0).Select("gg").ClickItem("10");
  fiscal_form.Panel(0).Panel(1).Panel(2).Panel(1).Panel(0).Panel(0).Select("ss").ClickItem(sex);
  fiscal_form.Panel(0).Panel(1).Panel(3).Panel(0).Panel(0).Panel(0).Textbox("lg").Text=(patient_data.place_of_birth);
  
  fiscal_form_path().Panel(2).Button(0).Click();
  
  //Retrieve the fiscal
  var fiscal = fiscal_form.Panel(0).Panel(1).Panel(0).Panel(0).Textbox("cf").Text

  return fiscal;
}
//-----------------------------------------------------------------------------------
//Returning surname of the current patient loaded
function get_patient_surname()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_demographics_path = patient_demographics_tab_demographics();
  var surname =  patient_demographics_tab_demographics_path.Panel(3).Label("Surname_DetachedLabel").contentText;
          
  return surname;
}
//-----------------------------------------------------------------------------------
//gets all of the patient demographics
function get_patient_demographics()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_path = patient_demographics_tab_demographics();
  
  var patient_data_array = new Array()
  
  if(Misc_Functions.language == "English") //putting the useunit for misc is not working here?
  {
    //Demograhics Pane
    var pat_num = patient_demographics_tab_path.Panel(0).Label("PatientNumber_DetachedLabel").contentText;
    var nhs_num = patient_demographics_tab_path.Panel(1).Label("NHSNumber_DetachedLabel").contentText;
    var title = patient_demographics_tab_path.Panel(2).Label("Title_DetachedLabel").contentText;
    var surname = patient_demographics_tab_path.Panel(3).Label("Surname_DetachedLabel").contentText;
    var firstname = patient_demographics_tab_path.Panel(4).Label("FirstName_DetachedLabel").contentText;  
    var born =  patient_demographics_tab_path.Panel(5).Label("Born_DetachedLabel").contentText;
    var sex =  patient_demographics_tab_path.Panel(6).Label("Sex_DetachedLabel").contentText;
    var gender =  patient_demographics_tab_path.Panel(7).Label("Gender_DetachedLabel").contentText;
    var ethnicity =  patient_demographics_tab_path.Panel(8).Label("Ethnicity_DetachedLabel").contentText;
    var language =  patient_demographics_tab_path.Panel(9).Label("SpokenLanguage_DetachedLabel").contentText;
    var mar_status =  patient_demographics_tab_path.Panel(10).Label("MartialStatus_DetachedLabel").contentText;
  
    var patient_demographics_tab_contact_address_path = patient_demographics_tab_contact_address();
  
    var line_1 = patient_demographics_tab_contact_address_path.Panel(0).Label("FirstAddressLine_DetachedLabel").contentText;
    var line_2 = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(0).Label("SecondAddressLine_DetachedLabel").contentText;
    var line_3 = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(1).Label("ThirdAddressLine_DetachedLabel").contentText;
    var town = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(2).Label("FourthAddressLine_DetachedLabel").contentText;
    var county = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(3).Label("FifthAddressLine_DetachedLabel").contentText;
    var post_code = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(4).Label("PostCode_DetachedLabel").contentText;
    var tel = patient_demographics_tab_contact_address_path.Panel(1).Label("Phone_DetachedLabel").contentText;
    var mobile = patient_demographics_tab_contact_address_path.Panel(2).Label("Mobile_DetachedLabel").contentText;
    var email = patient_demographics_tab_contact_address_path.Panel(3).Label("Email_DetachedLabel").contentText;
  
    patient_data_array.push(pat_num, nhs_num, title, surname, firstname, born, sex, gender, ethnicity, language, mar_status, line_1, line_2, line_3, town, county , post_code, tel, mobile, email); 
  }
  else
  {
    //Demograhics Pane
    var pat_num = patient_demographics_tab_path.Panel(0).Label("PatientNumber_DetachedLabel").contentText;
    var nhs_num = patient_demographics_tab_path.Panel(1).Label("NHSNumber_DetachedLabel").contentText;
    var title = patient_demographics_tab_path.Panel(2).Label("Title_DetachedLabel").contentText;
    var surname = patient_demographics_tab_path.Panel(3).Label("Surname_DetachedLabel").contentText;
    var firstname = patient_demographics_tab_path.Panel(4).Label("FirstName_DetachedLabel").contentText;  
    var born =  patient_demographics_tab_path.Panel(5).Label("Born_DetachedLabel").contentText;
    var sex =  patient_demographics_tab_path.Panel(6).Label("Sex_DetachedLabel").contentText;
    var gender =  patient_demographics_tab_path.Panel(7).Label("Gender_DetachedLabel").contentText;
    //var ethnicity =  patient_demographics_tab_path.Panel(8).Label("Ethnicity_DetachedLabel").contentText;
    //var language =  patient_demographics_tab_path.Panel(9).Label("SpokenLanguage_DetachedLabel").contentText;
    //var mar_status =  patient_demographics_tab_path.Panel(10).Label("MartialStatus_DetachedLabel").contentText;
  
    var patient_demographics_tab_contact_address_path = patient_demographics_tab_contact_address();
  
    var line_1 = patient_demographics_tab_contact_address_path.Panel(0).Label("FirstAddressLine_DetachedLabel").contentText;
    var line_2 = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(0).Label("SecondAddressLine_DetachedLabel").contentText;
    var line_3 = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(1).Label("ThirdAddressLine_DetachedLabel").contentText;
    var town = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(2).Label("FourthAddressLine_DetachedLabel").contentText;
    var county = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(3).Label("FifthAddressLine_DetachedLabel").contentText;
    var post_code = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(4).Label("PostCode_DetachedLabel").contentText;
    var tel = patient_demographics_tab_contact_address_path.Panel(1).Label("Phone_DetachedLabel").contentText;
    var mobile = patient_demographics_tab_contact_address_path.Panel(3).Label("Mobile_DetachedLabel").contentText;
    var email = patient_demographics_tab_contact_address_path.Panel(4).Label("Email_DetachedLabel").contentText;
  
    patient_data_array.push(pat_num, nhs_num, title, surname, firstname, born, sex, gender, "ethnicity", "language", "mar_status", line_1, line_2, line_3, town, county , post_code, tel, mobile, email); 
  }

  for(var i = 0; i < patient_data_array.length; i++)
  {
    Log.Message("Array element: " + i + " is " + patient_data_array[i]);
  }
   
  return patient_data_array;  
} 
//-----------------------------------------------------------------------------------
// Gets pat_num, nhs_num, born and tel from demographics and drug & date from treatments - returns array
function get_patient_details_for_overdue_non_warfarin_review_table_comparison(pat_name, expected_overdue_days)
{
  //Search for patient
  patient_search(pat_name);
  
  //Acknowledge pop-up if it is shown
  process_popup(get_string_translation("Please Confirm"), get_string_translation("Confirm"));
    
  //Navigate to Demographics Overview
  Goto_Patient_Demographics();
  
  // Grab path of Demographics tab
  var patient_demographics_tab_path = patient_demographics_tab_demographics();

  //Extract basic required info from form
  var pat_num = patient_demographics_tab_path.Panel(0).Label("PatientNumber_DetachedLabel").contentText;
  var nhs_num = patient_demographics_tab_path.Panel(1).Label("NHSNumber_DetachedLabel").contentText;
  var born =  patient_demographics_tab_path.Panel(5).Label("Born_DetachedLabel").contentText;
  
  // Grab path of Demographics contacts tab
  var patient_demographics_tab_contact_address_path = patient_demographics_tab_contact_address();

  //Extract basic required contact info from form
  var tel = patient_demographics_tab_contact_address_path.Panel(1).Label("Phone_DetachedLabel").contentText;
  
  //Navigate to treatment plan overview
  Goto_Patient_Treatment_Plan()
  
  // Grab path of treatment plan overview
  var patient_treatment_details_path = clinical_tp_details();
  
  // Extract treatment plan drug and date
  var drug = patient_treatment_details_path.Panel(3).Label("DrugName_DetachedLabel").contentText;
  var date = patient_treatment_details_path.Panel(0).Label("Start_DetachedLabel").contentText;
  
  // Initialise an array
  var patient_data_array = new Array()
  
  // Store all extracted variables into array
  patient_data_array.push(pat_name, pat_num, nhs_num, born, tel, drug, date, expected_overdue_days); 
   
  return patient_data_array;  
} 
//-----------------------------------------------------------------------------------
// Gets pat_num, nhs_num, born, tel, drug, date and due_days from overdue non warfarin review list table - returns array
function get_patients_column_data_from_overdue_non_warfarin_review_table(table, pat_name) 
{
   for (i=0; i<table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText == pat_name)
      { 
        // Grabbing pat_num, nhs_num, born, tel, drug, date, due_days
        name =    table.Cell(i, 0).contentText;
        drug =    table.Cell(i, 1).contentText;
        born =    table.Cell(i, 2).contentText;
        tel =     table.Cell(i, 3).contentText;
        nhs_num = table.Cell(i, 4).contentText;
        pat_num = table.Cell(i, 5).contentText;
        date =    table.Cell(i, 6).contentText;
        due_days =table.Cell(i, 7).contentText;
        
        // Initialise an array
        var patient_data_array = new Array();
  
        // Store all extracted variables into array
        patient_data_array.push(name, pat_num, nhs_num, born, tel, drug, date, due_days); 
   
        return patient_data_array;
      }
    }
    Log.Warning("Patient: " + pat_name + " was not found in the table")
    return false;
}
//--------------------------------------------------------------------------------

function get_inr_results_received_by_timestamp(timestamp)
{
  Goto_Patient_New_INR();
  
  //Check table exists before proceeding
  var table_exists = Check_if_patients_inr_results_table_exists(); 
   
  if (table_exists == true) 
  {    
    //Get the path of the patient external results table
    var table = inr_results_received_table(); 
      
      //Loop through each row of table
      for (i=0; i<table.RowCount; i++)
      {
        //Check whether timestamp exists
        if (table.Cell(i, 1).contentText == timestamp)
        {
           var results = {
            "test_timestamp"         : table.Cell(i, 1).contentText,
            "source"                 : table.Cell(i, 2).contentText,
            "inr"                    : table.Cell(i, 3).contentText,
            "row"                    : i,
            "row_count"              : table.RowCount
            } 
           return results
        }
      }
      Log.Message("Table row containing timestamp does not exist");
  }
  // If data is unobtainable we can prevent further checks - checking row is not false 
  var results = {"row" : false, "row_count" : 0}
  return results;
}
//--------------------------------------------------------------------------------
function get_external_results_received_by_timestamp(timestamp, archived)
{
  Goto_External_Results();
  
  //Check table exists before proceeding
  var table_exists = Check_if_external_results_table_exists();
   
  if (table_exists == true) 
  {
    if (archived == "Archived" || archived == "Archived")
    {
      //Toggle the show archived checkbox
      show_archived_results_checkbox().ClickChecked(true);
  
      //Press the filter button
      external_results_filter_button().Click()
      
      //Get the path of the patient external results archived table
      var table = patient_external_results_archived_table(); 
    }
    else
    {    
      //Get the path of the patient external results table
      var table = patient_external_results_table();
    }
      
    //Loop through each row of table
    for (row=0; row<table.RowCount; row++)
    {
      //Check whether timestamp exists
      if (table.Cell(row, 2).contentText == timestamp)
      {
         var results = {
        "blood_taken_timestamp"  : table.Cell(row, 2).contentText,
        "inr"                    : table.Cell(row, 3).contentText,
        "row"                    : row}
         return results
      }
    }
    Log.Message("Table row containing timestamp does not exist");
  }
  // If data is unobtainable we can prevent further checks - checking row is not false 
  var results = {"row" : false}
  return results;
}
//--------------------------------------------------------------------------------
function get_treatment_by_timestamp(timestamp) 
{
  //Goto Patient Treatments 
  Goto_Patient_Treatment()
  
  //Check table exists before proceeding
  var table_exists = Check_if_treatment_table_exists();
  
  //If treatment table exists grab values from it
  if (table_exists == true)  
  {
    //Get the path of the treatments table
    var table = treatment_table(); 
    
    //Loop through each row of table
      for (i=0; i<table.RowCount; i++)
      {
        //Check whether timestamp exists
        if (table.Cell(i, 0).contentText == timestamp)
        {
          //if so grab results
          var treatment = {
            "test_date"     : table.Cell(i, 0).contentText,
            "inr"           : table.Cell(i, 1).contentText,
            "dose"          : table.Cell(i, 2).contentText,
            "suggested_dose": table.Cell(i, 3).contentText,
            "omits"         : table.Cell(i, 4).contentText,
            "review_days"   : table.Cell(i, 5).contentText,
            "row"           : i}
          return treatment
        }
      }
      //warn that specified row does not exist
      Log.Message("Row number: " + i + " Does not exist in results table, table has a rowcount of: " + table.RowCount)

  }
  var treatment = {"row" : false}  
  return treatment;
}
//--------------------------------------------------------------------------------
//gets the patients fullname
function get_patient_fullname()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_path = patient_demographics_tab_demographics();
  
  //Demograhics Pane
  var surname = patient_demographics_tab_path.Panel(3).Label("Surname_DetachedLabel").contentText;
  var firstname = patient_demographics_tab_path.Panel(4).Label("FirstName_DetachedLabel").contentText;  
  
  var patient_fullname = surname + ', ' + firstname
 
  return patient_fullname;  
}
//-----------------------------------------------------------------------------------
//gets the patients date of birth
function get_patient_dob()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_path = patient_demographics_tab_demographics();
  
  var dob =  patient_demographics_tab_path.Panel(5).Label("Born_DetachedLabel").contentText;
 
  return dob; 
}
//-----------------------------------------------------------------------------------
//gets the patients address
function get_patient_address_line_one()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_contact_address_path = patient_demographics_tab_contact_address();
  
  var line_1 = patient_demographics_tab_contact_address_path.Panel(0).Label("FirstAddressLine_DetachedLabel").contentText;
  var line_2 = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(0).Label("SecondAddressLine_DetachedLabel").contentText;
  
  var address = line_1 + " " + line_2;
 
  return address;
}
//-----------------------------------------------------------------------------------
//gets the patients postcode
function get_patient_postcode()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_contact_address_path = patient_demographics_tab_contact_address();
  
  var post_code = patient_demographics_tab_contact_address_path.Panel("patientAddress").Panel(4).Label("PostCode_DetachedLabel").contentText;
 
  return post_code;
}
//--------------------------------------------------------------------------------
function get_patient_test_prac()
{
  Goto_Patient_Management()
  var patient_management_care_team_path = patient_management_care_team();
  var test_prac = patient_management_care_team_path.Panel(0).Label("TestingSectionId_DetachedLabel").contentText;
  
  return test_prac;
} 
//--------------------------------------------------------------------------------
function get_new_inr_button_state()
{
  var state;
  Goto_Patient_Treatment();
  var new_inr_button = new_inr_button_path();
  state = new_inr_button.enabled;
  
  return state;
}
//-----------------------------------------------------------------------------------
//gets all data from specified table
function get_treatment_row(row_num, table_type)
{
  if(table_type == "current" || table_type == null)
  {
    Goto_Patient_Treatment();
    var treatment_table_path = treatment_table();
  }
  else if(table_type == "pending")
  {
    var treatment_table_path = pending_treatment_table();
  }
  else if(table_type == "previous")
  {
    Goto_Patient_Treatment();
    var treatment_table_path = treatment_table_from_previous_plan();
  }
  var treatment_row_array = new Array()
  
  for(var i = 0; i < 9; i++)
  {
    var treatment_value = treatment_table_path.Cell(row_num, i).contentText;
    treatment_row_array.push(treatment_value);
  }
  
  return treatment_row_array;  
}
//-----------------------------------------------------------------------------------
//gets the test date, inr, dose, review days, next test date from specified table
function get_treatment_row_key_values(row_num, table_type) 
{
  if(table_type == "current" || table_type == null)
  {
    Goto_Patient_Treatment();
    var treatment_table_path = treatment_table();
  }
  else if(table_type == "pending")
  {
    var treatment_table_path = pending_treatment_table();
  }
  else if(table_type == "previous")
  {
    Goto_Patient_Treatment();
    var treatment_table_path = treatment_table_from_previous_plan();
  }
  var treatment_row_array = new Array()
  
  for(var i = 0; i < 11; i++)
  {
    if(i == 0 || i == 1 || i == 2 || i == 5 || i == 7)
    {
      var treatment_value = treatment_table_path.Cell(row_num, i).contentText;
      treatment_row_array.push(treatment_value);
    }
  }
  
  return treatment_row_array;  
}
//-----------------------------------------------------------------------------------
function get_treatment_summary_table_schedule()
{
  //needs a goto statement here
  var smry_dosing_schedule = new Array();
  var smry_schedule_day;
  var smry_schedule_dose;
  for(var i = 1; i <= 7; i++)
  {
    smry_schedule_day = aqString.SubString(patient_summary_schedule_table().Cell(i, 0).innerText, 0, 3);
    smry_schedule_dose = smry_schedule_day + " " + patient_summary_schedule_table().Cell(i, 1).innerText;
    smry_dosing_schedule.push(smry_schedule_dose);
  }
  
  return smry_dosing_schedule;
}
//-----------------------------------------------------------------------------------
//gets the data from the eqc table where the batch_ref matches
function get_eqc_table_row(batch_ref)
{
  Goto_Options_EQC();

  var table_data = options_eqc_form_buttons().Table("LocationsEQCTable");
  var row_data = new Array();
  var row_num;
  
  if(table_data.Cell(1,0).contentText != "There are no EQCs recorded")
  {
    for(var i = 1; i < table_data.RowCount; i++)
    {
      for(var j = 0; j < 7; j++)
      {
        if(table_data.Cell(i, j).contentText == batch_ref)
        {
          row_num = i;
          break;
        }
      }
    }
    for(var i = 0; i < 7; i++)
    {
      var temp = table_data.Cell(row_num, i).contentText;
      row_data.push(temp);
    }
  }
  
  return (row_data);
}
//-----------------------------------------------------------------------------------
//gets the current batch numbers from all poct batches
function get_poct_batch_numbers()
{
  Goto_Options_PoCT()
    
  var INRstarV5 = INRstar_base();
  var poct_table = options_poct_table();
  var poct_batch_nos = new Array();
  
  for(var i = 1; i < poct_table.RowCount; i++)
  {
    var temp = poct_table.Cell(i, 0).contentText;
    poct_batch_nos.push(temp);
  }
  
  return(poct_batch_nos);
}
//-----------------------------------------------------------------------------------
function get_iqc_data()
{
  var iqc_table_path = options_iqc_table();
  var data_saved = new Array();
  
  for(i=0; i<7; i++)
  {
    var data = iqc_table_path.Cell(1, i).contentText;
    data_saved.push(data);
  } 
  Log.Message(data_saved + ' This is the data after it has been saved')
  return data_saved;
}
//-----------------------------------------------------------------------------------
function get_patient_banner_error_message()
{
  var add_patient_error_banner_path = add_patient_error_banner();
  error_text = add_patient_error_banner_path.TextNode(0).contentText;
 
  return error_text;
}
//-----------------------------------------------------------------------------------
function get_pending_suggested_treatment_schedule(days)
{
  wait_for_object(patient_pending_treatment_path(), "idStr", "DosingScheduleContent", 2);
  var schedulegrid = dosing_schedule_content().Fieldset(0).Fieldset("ScheduleGrid");
  
  //return schedule;
  var pending_schedule = new Array();
  if(days == "0")
  {
    for(i=0; i<7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  } 
  else if(days == "1")
  {
    for(var i= 0; i < 7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }

    for(var i = 0; i < 1; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  } 
  else if(days == "2")
  {
    for(var i= 0; i < 7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
    for(var i= 0; i < 2; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  } 
  else if(days == "3")
  {
    for(var i = 0; i < 7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
    for(var i = 0; i < 3; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  }
  else if(days == "4")
  {
    for(var i = 0; i < 7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
    for(var i = 0; i < 4; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  }
  else if(days == "5")
  {
    for(var i = 0; i < 7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
    for(var i = 0; i < 5; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  }
  else if(days == "6")
  {
    for(var i = 0; i < 7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
    for(var i = 0; i < 6; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  }
  else if(days == "7")
  {
    for(i=0; i<7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  } 
  
  return pending_schedule;
}
//-----------------------------------------------------------------------------------
function get_bridging_schedule_table_row(row_num, table_type)
{
  var row_data = new Array();
  var table;
  row_data.length = 0;
  
  if(table_type == "pre-op")
  {
    table = bridging_schedule_preop_table();
  }
  else if(table_type == "procedure")
  {
    table = bridging_schedule_procedure_table();
    row_num -= 1;
  }
  else if(table_type == "post-discharge")
  {
    table = bridging_schedule_post_discharge_table();
  }
  //when performing looping actions, test complete will cache objects
  //these need to be refreshed or the test will fail
  table.Refresh();
  
  for(var i = 0; i < 7; i++)
  {
    if(i == 2 || i == 3 || i == 4)
    {
      row_data.push(table.Cell(row_num, i).Child(1).checked);
    }
    else
    {
      row_data.push(aqString.Trim(table.Cell(row_num, i).innerText));
    }
  }
  return row_data;
}
//-----------------------------------------------------------------------------------
function get_external_patient_lookup_data()
{
  var patient_data = new Array();

  var fullname = get_patient_fullname();
  var dob = get_patient_dob();
  var nhs = get_patient_nhs();
  var addr_line_one = get_patient_address_line_one();
  var post_code = get_patient_postcode();
  var test_prac = get_patient_test_prac();
  patient_data.push(fullname, dob, nhs, addr_line_one, post_code, test_prac);
  
  return patient_data;
}
//-----------------------------------------------------------------------------------
function get_top_note_text()
{
  Goto_Patient_Notes();
  var note_text_path = notes_tab().Table("PatientNotesTable").Cell(1, 0);
  var text = aqString.Trim(note_text_path.innerText);
  
  return text;
}
//-----------------------------------------------------------------------------------
function get_dosing_method(dm)
{
  var dose_method;
  
  switch(dm)
  {
    case 0: 
    dose_method = "Coventry";
    break;
    case 1: 
    dose_method = "Hillingdon";
    break;
    case 2: 
    dose_method = "Fast";
    break;
    case 3: 
    dose_method = "Oates";
    break;
    case 4: 
    dose_method = "Tait";
    break;
    case 5: 
    dose_method = "Manual";
    break;
  }
  
  return dose_method;
}
//-----------------------------------------------------------------------------------
function get_patient_management_banner_message()
{
  Goto_Patient_Management();
  var text = pat_management_status_confirmation_message().contentText;
  
  return text;
}

//---------------------------------------------------------------------------------//
//                                  Login                                          //
//---------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------
function get_login_details(index)
{
  var login_details = new Array();
  var user_path = "C:\\Automation\\UserDetails.txt";
  var file = aqFile.ReadWholeTextFile(user_path, aqFile.ctANSI);
  login_details = file.split(",");
  
  if(index == null)
  {
    return login_details;
  }
  else
  {
    return login_details[index];
  }
}
//---------------------------------------------------------------------------------//
//                            Bespoke Letters                                      //
//---------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------
function get_bespoke_letter_content(letter_name)
{
  Goto_Options_Letter_Management();
  Goto_Bespoke_Letter(letter_name);
  
  var content = new Array();
  
  var temp = letter_editor_panel().Panel("LetterTemplatePropertiesPanel").Panel(0).Textbox("Name").value;
  content.push(temp);
  temp = letter_editor_panel().Panel("LetterTemplatePropertiesPanel").Panel(1).Textarea("Description").innerText;
  content.push(temp);
  temp = letter_editor_panel().Panel("ContentTextEditor").Panel(1).Panel(0).innerText;
  content.push(temp);
  
  return content;
}
//-----------------------------------------------------------------------------------
function get_bespoke_letter_permissions(letter_name)
{
  Goto_Options_Letter_Management();
  Goto_Bespoke_Letter(letter_name);
  
  var content = new Array();
  for(var i = 1; i <= 7; i++)
  {
    var temp = letter_management_permissions_field().panel(i).Child(0).checked;
    content.push(temp);
  }
  
  return content;
}
//---------------------------------------------------------------------------------//
//                                  Diagnosis                                      //
//---------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------
function get_diagnosis_details(name)
{
  Goto_Options_Diagnosis();
  options_diagnosis_list().ClickItem(name);

  var diagnosis_data = new Array();
  
  var temp = diagnosis_details().Panel(0).Label("Name_DetachedLabel").innerText;
  diagnosis_data.push(temp);
  temp = diagnosis_details().Panel(1).Label("TargetINR_DetachedLabel").innerText;
  diagnosis_data.push(temp);
  temp = diagnosis_details().Panel(2).Label("TreatmentDuration_DetachedLabel").innerText;
  diagnosis_data.push(temp);
  
  return diagnosis_data;
}
//-----------------------------------------------------------------------------------
//---------------------------------------------------------------------------------//
//                              Dosing Settings                                    //
//---------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------
function get_dosing_settings_data(item_no)
{
  Goto_Options();
  dosing_settings_tab().Click();
  location_dosing_settings().Link(item_no).Click();
  
  var panel = location_dosing_settings().Panel(item_no);
  var dosing_data = new Array();
  var string_array = new Array();
  
  for(var i = 1; i < panel.ChildCount; i++)
  {
    var temp = panel.Child(i).innerText;
    string_array = temp.split("[" + get_string_translation("set at") + "] "); 
    dosing_data.push(aqString.Trim(string_array[1], 3));
    Log.Message("string_array="+string_array);
    Log.Message("dosing_data.push="+aqString.Trim(string_array[1], 3));
  }
  
  return dosing_data;
}
//-----------------------------------------------------------------------------------
//---------------------------------------------------------------------------------//
//                              Diagnosis                                          //
//---------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------
function get_diagnosis_count()
{
  Goto_Options_Diagnosis();
  var list = options_diagnosis_list();
  var list_count = list.wItemCount; 
  
  return list_count;
}
//-----------------------------------------------------------------------------------
//---------------------------------------------------------------------------------//
//                                      HL7                                        //
//---------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------
function get_hl7_file_folder()
{
  var folder_name;
  var base = "INRstarWindows";
  
  Log.Message(environment);
  
  switch(environment)
  {
    case base + "Coruscant": 
    folder_name = "Test_Coruscant HL7 Channel";
    break;
    case base + "Coruscant2": 
    folder_name = "Test_Coruscant2 HL7 Channel";
    break;
    case base + "Hoth": 
    folder_name = "Test_Hoth HL7 Channel";
    break;
    case base + "Tatooine": 
    folder_name = "Test_Tatooine HL7 Channel";
    break;
    case base + "Staging": 
    folder_name = "Staging HL7 Channel";
    break;
    case base + "Alderaan": 
    folder_name = "Test_Alderaan HL7 Channel";
    break;
    case base + "Naboo": 
    folder_name = "Test_Naboo HL7 Channel Wolves";
    break;
    case base + "Integration": 
    folder_name = "Integration HL7 Channel";
    break;
    case base + "CoruscantV4": 
    folder_name = "Test_Coruscant HL7 Channel";
    break;
    case base + "Coruscant2V4": 
    folder_name = "Test_Coruscant2 HL7 Channel";
    break;
    case base + "HothV4": 
    folder_name = "Test_Hoth HL7 Channel";
    break;
    case base + "TatooineV4": 
    folder_name = "Test_Tatooine HL7 Channel";
    break;
    case base + "StagingV4": 
    folder_name = "Staging HL7 Channel";
    break;
    case base + "AlderaanV4": 
    folder_name = "Test_Alderaan HL7 Channel";
    break;
  }
  
  Log.Message(folder_name);
  return folder_name;
}
//-----------------------------------------------------------------------------------
function get_hl7_patient_info(table_position)
{
  WaitSeconds(5, "Waiting for table to update...");
  Goto_External_Results();
  var patient_data = new Array();

  if(table_position == null)
  {
    table_position = 1;  
  }
  
  if(patient_external_results_table().Cell(1, 0).innerText != "There are no new results")
  {
    var obj = patient_external_results_table().Cell(table_position, 1).Panel(0).FindChild("name", "Link(\"PatientLink\")");
    var obj_alt = patient_external_results_table().Cell(table_position, 1).Panel(0).FindChild("name", "Label(\"Name_DetachedLabel\")");

    var name;
    if(obj.Exists)
    {
      name = obj.innerText;
    }
    else if(obj_alt.Exists)
    {
      name = obj_alt.innerText;
    }
    else
    {
      name = "";
    }
    
    var name_split = name.split(",");
  
    var surname = aqString.Trim(name_split[0]);
    var firstname = aqString.Trim(name_split[1]);
    var dob = patient_external_results_table().Cell(table_position, 1).Panel(0).Label("Born_DetachedLabel").innerText;
    var nhs = patient_external_results_table().Cell(table_position, 1).Panel(1).Panel(0).Label("NHSNumber_DetachedLabel").innerText;
    var pat_no = patient_external_results_table().Cell(table_position, 1).Panel(1).Panel(1).Label("PatientNumber_DetachedLabel").innerText;
    var inr = patient_external_results_table().Cell(table_position, 3).innerText;
  
    patient_data.push(surname, firstname, dob, nhs, pat_no, inr);
    Log.Message(patient_data);
  }
  else
  {
    Log.Message("No table entries!");
    patient_data.push("", "", "", "", "", "");
  }
  
  return patient_data;
}
//-----------------------------------------------------------------------------------
//---------------------------------------------------------------------------------//
//                              Location Management                                //
//---------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------
function get_organization_id_from_current_location()
{
  Goto_Options_Location_Management();
  var location_details_tab_path = location_management_details_tab();
  var outer_html_of_tab = location_details_tab_path.outerHTML;
  
  var organizationId = outer_html_of_tab.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/);
  Log.Message("Location/Organisation ID of current location is: " + organizationId)
  
  return organizationId[0]
}
