//USEUNIT V5_Common
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Tests
//USEUNIT System_Paths

//-----------------------------------------------------------------------------------
//A place to put generic functions
//-----------------------------------------------------------------------------------
function NewGuid()
{
  var sGuid="";
  for (var i=0; i<25; i++)
    {
    sGuid+=Math.floor(Math.random()*0xF).toString(0xF);
    }
      return sGuid;       
}
//-----------------------------------------------------------------------------------
function new_num_20()
{
  var sGuid="";
  for (var i=0; i<20; i++)
    {
    sGuid+=Math.floor(Math.random()*0xF).toString(0xF);
    }
      return sGuid;       
}
//-------------------------------------------------------------------------------
function format_date(date)
{
    var day = aqString.SubString(date,0,2);
//    Log.Message(day)
    
    var w_mth = aqString.SubString(date,3,2);
    var month = get_text_month(w_mth);
//    Log.Message(month)
    
    var year = aqString.SubString(date,6,4);
//    Log.Message(year)
 
    var formatted_date = day + "-" + month + "-" + year;
    
    return formatted_date;
}  
//----------------------------------------------------------------------------------- 
//Pass in the path of the date picker, the date you want to check and if the day should be selectable
function date_picker_status_day(path,date,status)
{
  var INRstarV5 = INRstar_base(); 
  
  //Suspended Until
  path.Panel(0).Image("calendar_png").Click();     
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  var expiry_date = date; 
    
  var w_yr = aqString.SubString(expiry_date,6,4);
  var w_mth = aqConvert.StrToInt(aqString.SubString(expiry_date,3,2));
  var w_day = aqString.SubString(expiry_date,0,2);
           
  datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  var status = select_day_status(w_day, datepicker, status);
  
  return status;
} 
//----------------------------------------------------------------------------------- 
//Pass in the path of the date picker, the date you want to check and if the day should be selectable
function check_status_date_picker(status, exp_status)
{
  if(exp_status=='active')
  {
    if(status=='Link(0)')
    {
     Log.Message('The status passed in matched the expected result it was set to ' + status);
     return true; 
    } 
    else
    {
     Log.Message('The status passed in didn\'t match the expected result it was set to ' + status + ' but should have been Link(0) meaning active day to select');
     return false; 
    } 
  } 
  
  if(exp_status=='inactive')
  {
    if(status=='TextNode(0)')
    {
     Log.Message('The status passed in matched the expected result it was set to ' + status);
     return true; 
    } 
    else
    {
     Log.Message('The status passed in didn\'t match the expected result it was set to ' + status + ' but should have been TextNode(0) meaning not able to pick day');
     return false; 
    } 
  }
} 
//----------------------------------------------------------------------------------- 
function cancel_pending_sorb_treatment()
{
  var INRstarV5 = INRstar_base();
  var sorb_finish_buttons = sorb_schedule_finish_buttons()
  sorb_finish_buttons.Button("CancelPendingTreatment").Click();
  WaitSeconds(1);
  INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).TextNode(0).Click();
} 
//-----------------------------------------------------------------------------------
function click_sorb_button(tab)
{
  var path = pending_treatment_buttons();
  panelPTI = path.Panel("PendingTreatmentInfo");
  
  if(tab=="suggested")
  {
  panelPTI.Panel(0).Button("SkipOrBoost0").Click();
  }
   else if (tab == "current")
   {
    panelPTI.Panel("DosingSchedule").Link("CurrentTab").Click();
    panelPTI.Panel(0).Button("SkipOrBoost1").Click(); 
   }   
} 
//-----------------------------------------------------------------------------------
function click_current_tab()
{
  var path = pending_treatment_buttons();
  panelPTI = path.Panel("PendingTreatmentInfo");
  panelPTI.Panel("DosingSchedule").Link("CurrentTab").Click();
} 
//-----------------------------------------------------------------------------------
 function return_pending_suggested_treatment_schedule(days)
{
  var INRstarV5 = INRstar_base();
  var PanelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var PanelPTC = PanelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var PanelPPT = PanelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var schedulegrid = PanelPPT.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Fieldset(0).Fieldset("ScheduleGrid");
  
  //return schedule;
  var pending_schedule = new Array();
   
  if(days=="0")
  {
       for(i=0; i<7; i++)
      {
        var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
        var day = aqString.SubString(data,0,3);
        var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
        pending_schedule.push(day + " " + dose);
      }
  } 
  
    else if(days=="1")
  {
       for(i=0; i<7; i++)
      {
        var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
        var day = aqString.SubString(data,0,3);
        var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
        pending_schedule.push(day + " " + dose);
      }

       for(i=0; i<1; i++)
      {
        var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
        var day = aqString.SubString(data,0,3);
        var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
        pending_schedule.push(day + " " + dose);
      }
  } 
  
    else if(days=="2")
  {
       for(i=0; i<7; i++)
      {
        var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
        var day = aqString.SubString(data,0,3);
        var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
        pending_schedule.push(day + " " + dose);
      }
       for(i=0; i<2; i++)
      {
        var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
        var day = aqString.SubString(data,0,3);
        var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
        pending_schedule.push(day + " " + dose);
      }
  } 
  
   else if(days=="3")
  {
       for(i=0; i<7; i++)
      {
        var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
        var day = aqString.SubString(data,0,3);
        var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
        pending_schedule.push(day + " " + dose);
      }

       for(i=0; i<3; i++)
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
function get_sorb_button_error_message()
{
  var error_box = sorb_button_error_message_path()
  var expected_err_mess = error_box.contentText;
  
  return expected_err_mess; 
} 
//-----------------------------------------------------------------------------------
function test_data_individual_step(data_1,data_2,test_mess)
{
 if (data_1 == null)
      {
        Log.Warning("Error message not found");
        return false;
      } 
 
  if (data_1 == data_2)
  {
  Log.Message("Test Passed - " + test_mess);
  return true;
  }
   else 
   Log.Warning("Messages dont match test failed - " + test_mess + " //" + data_1 + "//" + data_2 + "//");
   return false;
}
//-----------------------------------------------------------------------------------
function compare_values(data_1,data_2,test_mess)
{
  if(data_1 == null)
  {
    Log.Warning("Data 1 not found");
    return false;
  } 
  if(data_1 == data_2)
  {
    //Log.Checkpoint(test_mess);
    return true;
  }
  else
  { 
    Log.Warning("Data doesn't match test failed - " + test_mess + " //" + data_1 + "//" + data_2 + "//");
    return false;
  }
}
//-----------------------------------------------------------------------------------
function test_data_contains(data_1,data_2,test_mess)
{
 if (data_1 == null)
      {
        Log.Warning("Data 1 not found");
        return false;
      } 
      
  var result = aqString.Find(data_1, data_2)
//  if(data_1.includes(data_2))
  if (result != -1)
  {
  Log.Message(test_mess + ' The data passed in was - ' + data_1 + ' // This matched the expected data ' + data_2);
  return true;
  }
   else 
   Log.Message("Data doesn't match test failed - " + test_mess + " //" + data_1 + "//" + data_2 + "//");
   return false;
}
//-----------------------------------------------------------------------------------
function test_data_doesnt_match(data_1,data_2,test_mess)
{
 if (data_1 == null || data_2 == null)
      {
        Log.Warning("Data not found");
        return false;
      } 
 
  if (data_1 != data_2)
  {
  return true;
  }
   else 
   Log.Message("Data matches test failed - " + test_mess + " //" + data_1 + "//" + data_2 + "//");
   return false;
}
//-----------------------------------------------------------------------------------
function data_checker(data_1,data_2)
{
 if (data_1 == null || data_2 == null)
      {
        Log.Warning("Data not found");
        return false;
      } 
 
  if (data_1 == data_2)
  {
  Log.Message('Data matched');
  return true;
  }
   else 
   Log.Message('Data doesn\'t match');
   return false;
}
//-----------------------------------------------------------------------------------
//Generic method for checking a buttons status when you pass in the path for the button
function check_button(path)
{
    if (path.className == "Button disabled" || path.className == "disabled")
      {
       Log.Message("Button is disabled")
       return "disabled"
      }
        else
        {
          Log.Message("Button is enabled")
          return "enabled"
        }
}
//-----------------------------------------------------------------------------------
//Generic method for checking a buttons status when you pass in the path for the button if the button doesn't work on classname
function check_button_enabled(path)
{
 if (path == null)
      {
        Log.Warning("Path to button not found");
        return false;
      } 
    if (path.isDisabled == true)
      {
       Log.Message("Button is disabled")
       return "disabled"
      }
        else
        {
          Log.Message("Button is enabled")
          return "enabled"
        }
}
//-----------------------------------------------------------------------------------
//Generic method for checking state of a button

function button_checker(actual_state,expected_state,test_mess)
{
  if(actual_state==expected_state)
  {
    Log.Message("Button state matches expected state " + test_mess)
    return true;
  }
  else
  {
    Log.Message("Button states dont match for " + test_mess + " Actual state was " + actual_state)
    return false;
  }
}
//-----------------------------------------------------------------------------------
function checkArrays( arrA, arrB, mess )
{  
    if(arrA.length !== arrB.length) 
     {
     Log.Warning(mess + "//" + arrA + "//" + arrB + "//");
       return false;
     }
     
    for(var i=0;i<arrA.length;i++)
    {
     if(arrA[i]!=arrB[i])
     { 
        Log.Warning("This is actual //" + "  " + arrA[i] + " //This is the expected //" + "  " + arrB[i])
        return false;
     }   
    }
  return true;
}
//-----------------------------------------------------------------------------------
function validateArrays( arrA, arrB, mess )
{
    if(arrA.length !== arrB.length) 
     {
     Log.Warning(mess + " - TEST FAILED incorrect length of arrays");
       return false;
     }

    for(var i=0;i<arrA.length;i++)
    {
     if(arrA[i]!=arrB[i])
     { 
      Log.Message(mess)
      return false;
     }   
    }  
    Log.Message(mess);
  return true;
}
//-----------------------------------------------------------------------------------
function validate_arrays_dont_match(arrA, arrB, mess)
{
    for(var i=0;i<arrA.length;i++)
    {
     if(arrA[i]==arrB[i])
     { 
      Log.Message(mess + " - TEST FAILED" + ' ON the following ' + arrB[i] + ' was the same as ' + arrA[i])
      return false;
     }   
    }
    Log.Message(mess); 
  return true;
}
//-----------------------------------------------------------------------------------
//Returning an NHS of the current patient loaded
function get_patient_nhs()
{
  var patient_blue_banner_path = patient_banner_blue_bar()
  var nhs_num = patient_blue_banner_path.Panel(3).Panel(0).Label("NHSNumber_DetachedLabel").innerText;
          
  return nhs_num;
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
//Returning surname of the current patient loaded
function get_patient_surname()
{
  Goto_Patient_Demographics();
  var patient_demographics_tab_demographics_path = patient_demographics_tab_demographics();
  var surname =  patient_demographics_tab_demographics_path.Panel(3).Label("Surname_DetachedLabel").contentText;
          
  return surname;
}
//-----------------------------------------------------------------------------------
//Checking confirm banner deleting an adverse event

function check_banner_confirmation_adverse_event()
{
  var adverse_event_tab_confirm_box_path = adverse_event_tab_confirm_box();  
  var adverse_confirmation_banner = adverse_event_tab_confirm_box_path.Panel(0).Panel("PatientsAdverseEventsMessages").TextNode(0).contentText;
  
  if(adverse_confirmation_banner == 'The adverse event was successfully added')
  {
    Log.Message('Confirmation box displayed')
    return true;
  } 
  else
  {
    Log.Warning("Adverse Event - Add a new adverse event - TEST_FAIL" + " The confirmation box was not displayed");
    return false;
  } 
}
//-----------------------------------------------------------------------------------
//Checking top audit on the patient tab
function validate_top_patient_audit(test_case_title,w_data)
{  
   Goto_Patient_Audit();
   var patient_audit_path = patient_audit()
   var audit_data = patient_audit_path.Cell(1, 1).innerText;

    if (audit_data == w_data)
    {
       Log.Message(test_case_title + '- Audit was written');
       return true;
    }
      else 
      {
       Log.Message(test_case_title + ' Test Failed - Patient audit record not found ' + ' This is the actual audit // ' + audit_data + ' // This is the expected audit // '
        + w_data + ' //');
       return false;
       }
}
//-----------------------------------------------------------------------------------
//Checking top audit on the system audit
function validate_top_system_audit(test_case_title,w_data)
{  
   Goto_System_Audit();
   var system_audit_path = system_audit()
   var audit_data = system_audit_path.Cell(1, 1).innerText;

    if (audit_data == w_data)
    {
       Log.Checkpoint(test_case_title);
       return true;
    }
      else 
      {
       Log.Warning(test_case_title + "Test Failed - Patient audit record not found " + audit_data + " - " + w_data);
       return false;
       }
}
//-----------------------------------------------------------------------------------
function patient_banner_error_message()
{
 var add_patient_error_banner_path = add_patient_error_banner();
 error_text = add_patient_error_banner_path.TextNode(0).contentText;
 
 return error_text;
}
//-----------------------------------------------------------------------------------
function data_contains_checker(actual_array,expected_data,test_mess)
{ 
  if (actual_array.includes(expected_data))
        {
        Log.Checkpoint(test_mess);
        }
           else 
           {
           Log.Warning(test_mess);
           } 
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
//This is to test the data given only contains false as an answer
function results_checker_are_false(result_set)
{
    for(var i=0;i<result_set.length;i++)
    {
     if(result_set[i])
     { 
      Log.Warning('found a true')
      return false;
     }  
    }
  return true;
}   
//-----------------------------------------------------------------------------------
//This is to test the data given only contains true as an answer
function results_checker_are_true(result_set)
{
    for(var i=0;i<result_set.length;i++)
    {
     if(result_set[i]==false)
     { 
      Log.Warning('found a false')
      return false;
     }  
    }
  return true;
}   
//-----------------------------------------------------------------------------------
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
  
//  Log.Message(patient_data_array) 
  return patient_data_array;  
} 
//-----------------------------------------------------------------------------------
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
function get_treatment_row(row_num)
{
  Goto_Patient_Treatment();
  var treatment_table_path = treatment_table();
  
  var treatment_row_array = new Array()
  
  for(var i = 0; i < 11; i++)
  {
    var treatment_value = treatment_table_path.Cell(row_num, i).contentText;
    treatment_row_array.push(treatment_value);
  }
  
  return treatment_row_array;  
}
//-----------------------------------------------------------------------------------
function get_treatment_row_key_values(row_num) //returns test date, inr, dose, review days, next test date
{
  Goto_Patient_Treatment();
  var treatment_table_path = treatment_table();
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
function get_pending_treatment_row_key_values(row_num) //returns test date, inr, dose, review days, next test date
{
  var treatment_table_path = pending_treatment_table();
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
function edit_demographics_error_checker(exp_err_mess)
{
  var INRstarV5 = INRstar_base(); 
  var error_pane_demographics_path = error_pane_demographics();
  var err_box = INRstarV5.NativeWebObject.Find("idStr", "EditDetails");
  
   if (err_box.Exists == false)
  {
    Log.Message("There were no Error messages displayed on the page");
    return false;
  }

  var actual_err_mess = error_pane_demographics_path.contentText; 
   
  if (err_box.Exists)
  {
     if (exp_err_mess==actual_err_mess)
       {
        Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess );
        return true; 
       } 
        else Log.Warning('Message was displayed but the text did not match the expected result it was ' + actual_err_mess)
        return false;
  }
} 
//-----------------------------------------------------------------------------------
//This is to test the result set of a test case and return pass or fail
function results_checker(result_set, test_case)
{
    if(result_set==true)
    {
    Log.Checkpoint(test_case);
    } 
     else
     Log.Warning(test_case);
}
//-----------------------------------------------------------------------------------
//Function for testing if field passed in is a label or can be edited
 
function test_field(p_field,p_field_name, exp_object_type)
{

  //get the object type based on expected and pass in
 if(exp_object_type=='read_only')
  {
    if (p_field.ObjectType=="Label") 
    {
       Log.Message(p_field_name + " " + "Field is read only TEST PASS");
       return true;
    }
       else
       {
          Log.Message(p_field_name + " " + "Field can be edited Field FAIL");
          return false;
       }
  }

//Going to need to add in other type of fields here at the moment this method only handles drop down or label but other valid ones could be check box, text entry etc
  if(exp_object_type=='editable_field')
  {
    if (p_field.ObjectType=="Label") 
    {
       Log.Message(p_field_name + " " + "Field is read only TEST FAIL");
       return false;
    }
       else
       {
          Log.Message(p_field_name + " " + "Field can be edited Field PASS");
          return true;
       }
  }
}
//-----------------------------------------------------------------------------------
 
//-----------------------------------------------------------------------------------
 
//-----------------------------------------------------------------------------------
 
//-----------------------------------------------------------------------------------
 
//-----------------------------------------------------------------------------------