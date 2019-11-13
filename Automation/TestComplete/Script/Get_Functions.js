﻿//USEUNIT System_Paths
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
//Returning an NHS of the current patient loaded
function get_patient_nhs()
{
  var patient_blue_banner_path = patient_banner_blue_bar()
  var nhs_num = patient_blue_banner_path.Panel(3).Panel(0).Label("NHSNumber_DetachedLabel").innerText;
          
  return nhs_num;
}
//Returning firstname of the current patient loaded
function get_patient_firstname()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_demographics_path = patient_demographics_tab_demographics();
  var firstname =  patient_demographics_tab_demographics_path.Panel(4).Label("FirstName_DetachedLabel").contentText;
          
  return firstname;
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
  
  patient_data_array.push(pat_num,nhs_num,title,surname,firstname,born,sex,gender,ethnicity,language,mar_status,line_1,line_2,line_3,town,county,post_code,tel,mobile,email); 
  
  //Log.Message(patient_data_array) 
  return patient_data_array;  
} 
//-----------------------------------------------------------------------------------
//gets the patients fullname
function get_patient_fullname()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_path = patient_demographics_tab_demographics();
  
  //Demograhics Pane
  var surname = patient_demographics_tab_path.Panel(3).Label("Surname_DetachedLabel").contentText;
  var firstname = patient_demographics_tab_path.Panel(4).Label("FirstName_DetachedLabel").contentText;  
  
  patient_fullname = surname + ', ' + firstname
 
  return patient_fullname;  
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
  var schedulegrid = dosing_schedule_table().Fieldset(0).Fieldset("ScheduleGrid");
  
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
  return pending_schedule;
}