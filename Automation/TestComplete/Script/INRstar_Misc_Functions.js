//USEUNIT System_Paths
//USEUNIT Admin_Dash_System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Get_Functions
//USEUNIT Failed_Test_Handlers
//USEUNIT Misc_Functions

//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                            INRstar Misc Functions                               //
//---------------------------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//This is going to get ripped out by andys method for create generic patient,
//at the moment this is geared up to return Italian data need to tweak if you want english
function create_patient_object_for_fiscal(name_first, name_last, sex_gender)
{
    //this object retrieves the variable / generated patient data
    //null or "" parameters will return a generated value, populated parameters will be returned appropriately
    var patient_formatted_data = create_variable_patient_data(name_first, name_last, sex_gender);
    var patient_details = new Object();
    
    //Ensure data is in the format that it will end up in INRstar, ensure you dont change the order of fields here it will brake in the object compare.
    //If you add new fields in here then you also need to add them to the actual patient object for comparing.
    var sex_gen = get_string_translation(patient_formatted_data.gender);
    
    var patient_details = {
    patient_number: new_guid(10),
    nhs_number: "",                                                     //this has to be generated after you have all the other data needed to generate it
    title: get_string_translation(patient_formatted_data.known_as),
    last_name: patient_formatted_data.last_name,
    first_name: patient_formatted_data.first_name,
    //dob: get_timestamps_for_now_object_with_changed_hours(),
    dob: convert_date_format(get_date_with_days_from_today_dd_mm_yyyy(-7300), "numeric", "%d-%b-%Y"),  //format is dd-mmm-yyyy 01-mag-2001
    sex: sex_gen,                                                                                      //when writing for the generic we need to ensure this is only Male or Female for Italy.
    gender: sex_gen,                                                                                   //hard coded for now not required as yet.
    first_addressLine: aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Arndale Avenue",
    second_addressLine: "SecondLineAddress",
    third_addressLine: "ThirdLineAddress",
    town: "Manchester",
    county: "Granadaland",
    post_code: patient_formatted_data.post_code,
    phone: "07111 225588",
    email: "AutomationLumira+" + new_guid(8) + "@gmail.com"
  };
  
  return patient_details;
}
//-----------------------------------------------------------------------------------
function restart_INRstar()
{
  WaitSeconds(2);
  //if you are logged in then log off first
  var INRstarV5 = INRstar_base();
  var login_link = INRstarV5.NativeWebObject.Find("idStr", "LogoutLink");
  if (login_link.Exists == true)
  {
    login_link.Click();
  }
  WaitSeconds(2);

  var path = Sys.Process("INRstarWindows").Path;
  Log.Message(path);
  Sys.Process("INRstarWindows").Terminate();
  WaitSeconds(2, "Waiting to close...");
  Win32API.WinExec(path, SW_SHOWNORMAL);
  Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").Maximize();
}
//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                            Check Functions                                      //
//---------------------------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------
function check_menu_header_exists(menu_header)
{
if(menu_header.Exists != true)
  {
    Log.Message("Menu Header does not exist");
    return false;
  }
else
  {
  Log.Message("Menu Header exists");
  return true
  }
}
//-------------------------------------------------------------------------------- 
//This is to test that a patient does not exist in a specified column of a table
function check_patient_does_not_exist_in_table_within_column(column,table,pat_name)
{
   for (var i = 0; i < table.rowcount; i++)
    {
      if(table.Cell(i, column).contentText == pat_name)
      {    
        Log.Warning("Patient " + pat_name + " was incorrectly found in table ")
        return false;
      }
    }
    Log.Message("Patient " + pat_name + " was successfully NOT found in table ")
    return true;
}
//----------------------------------------------------------------------------------
//This is to test that a patient exists in a specified column of a table
function check_patient_exists_in_table_within_column(column,table,pat_name)
{
  for (var i = 0; i < table.rowcount; i++)
  {
    if(table.Cell(i, column).contentText == pat_name)
    {
      Log.Message("Patient " + pat_name + " was successfully found in table ")
      return true;
    }
  } 
  Log.Message("Patient not found " + pat_name)
  return false;
}
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                            Audit Check Functions                                //
//---------------------------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------
//Checking top audit on the patient tab
function validate_top_patient_audit(test_case_title, audit_action)
{  
  Goto_Patient_Audit();
  var patient_audit_path = patient_audit()
  var audit_data = patient_audit_path.Cell(1, 1).innerText;
  
  if(audit_data == null || audit_action == null)
  {
    Log.Message("Fail - Data not found / Parameter value missing.");
    Log.Message("Actual Audit: " + audit_data + "-------------- Expected Audit: " + audit_action);
    return false;
  } 

  if(audit_data == audit_action)
  {
    Log.Message(test_case_title + " Test Passed - Patient audit record was found " + " This is the actual audit // " 
                                + audit_data + " // This is the expected audit // " + audit_action + " //");
    return true;
  }
  else 
  {
    Log.Message(test_case_title + " Test Failed - Patient audit record not found " + " This is the actual audit // " 
                                + audit_data + " // This is the expected audit // " + audit_action + " //");
    return false;
  }
}
//-----------------------------------------------------------------------------------
//Checking top audit on the treatment
function validate_top_treatment_audit(w_data)
{  
  var INRstarV5 = INRstar_base();
  w_au_table = INRstarV5.Panel(2).Panel("DialogContent").Panel("TreatmentAuditTrailWrapper").Table("AuditTrailTable");
  var wt_row = w_au_table.Cell(1, 1).innerText;

  if (wt_row == w_data)
  {
    Log.Message(wt_row + " - " + w_au_table.Cell(1,2).innerText);
    return true;
  }
  else
  {
    Log.Message("Treatment audit record not found : " + w_data);
    return false;
  }
  INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).Click();
}
//-----------------------------------------------------------------------------------
//Checking top audit on the system audit
function validate_top_system_audit(test_case_title, audit_action)
{  
  Goto_System_Audit();
  var audit_data = system_audit().Cell(1, 1).innerText;

  if (audit_data == audit_action)
  {
    Log.Message(test_case_title + " - Correct Top Audit");
    return true;
  }
  else 
  {
    Log.Message(test_case_title + " Test Failed - Patient audit record not found " + audit_data + " - " + audit_action);
    return false;
  }
}
//------------------------------------------------------------------------------------
//Checking top audit on the patient tab after performing a patient search
function validate_top_patient_audit_with_patient_search(test_title, pat_name, expected_search_text)
{
    //Search for patient
    patient_search(pat_name);
    
    //Acknowledge pop-up if it is shown
    process_popup(get_string_translation("Please Confirm"), get_string_translation("Confirm"));
       
    //Check for search_text within audit
    return validate_top_patient_audit(test_title, get_string_translation(expected_search_text));
}
//--------------------------------------------------------------------------------
//Checking top audit on the treatment after performing a patient search
function validate_top_suggested_treatment_audit_with_patient_search(pat_name, expected_search_text)
{
    //Search for patient
    patient_search(pat_name);
    
    //Goto the audit for the patient
    Goto_Suggested_Treatment_Audit();
    
    //Check for search_text within audit
    return validate_top_treatment_audit(get_string_translation(expected_search_text));
}
//-----------------------------------------------------------------------------------
// Get the top patient audit record more information
function validate_more_info_top_patient_audit(w_data)
{  
  Goto_Patient_Audit();
  var wt_row = patient_audit().Cell(1, 3).innerText;

  if(wt_row.includes(w_data))
  {
    Log.Message('Found the audit - This is the row data // ' + wt_row + " // - This is what I am looking for // " + w_data + ' //');
    return true;
  }
  else 
  {
    Log.Message("Audit data not found " + wt_row + "\r\n\r\n" + "This is what I am looking for // " + w_data);
    return false;
  }
}
//-----------------------------------------------------------------------------------
// Get the top treatment audit record more information
function validate_more_info_top_treatment_audit(w_data)
{  
  Goto_Patient_Treatment_Audit();
  var wt_row = treatment_audit().Cell(1, 3).innerText;

  if(wt_row.includes(w_data))
  {
    Log.Message("This is the row data // " + wt_row + " // - This is what I am looking for // " + w_data + " //");
    return true;
  }
  else 
  {
    Log.Message("Audit data not found: " + wt_row + "\r\n\r\n" + "This is what I am looking for // " + w_data);
    return false;
  }
}
//-----------------------------------------------------------------------------------
// Get the top system audit record more information
function validate_more_info_top_system_audit(w_data)
{  
  Goto_System_Audit()
  var wt_audit = system_audit();
  var wt_row = wt_audit.Cell(1, 3).innerText;

  if(wt_row.includes(w_data))
  {
    Log.Message('Audit data found // ' + wt_row + " // - This is what I am looking for // " + w_data + ' //');
    return true;
  }
  else 
  {
    Log.Message("Audit data not found // " + wt_row + "// - This is what I am looking for // " + w_data + ' //');
    return false;
  }
}
//-----------------------------------------------------------------------------------
//Checking specific audit more info on the patient tab
function validate_more_info_specific_entry_patient_audit(item_no, data, title)
{  
  Goto_Patient_Audit();
  var audit_data = patient_audit().Cell(item_no, 3).innerText;
  
  if(audit_data.includes(data))
  {
    Log.Message("This is the row data: // " + audit_data + " // - This is what I am looking for: // " + data + " //");
    return true;
  }
  else 
  {
    Log.Warning("Audit data not found " + audit_data + " - " + audit_data);
    return false;
  }
}
//-----------------------------------------------------------------------------------
//Checking specific audit on the patient tab
function validate_specific_entry_patient_audit(item_no, data, title)
{  
  Goto_Patient_Audit();
  var audit_data = patient_audit().Cell(item_no, 1).innerText;

  if (audit_data == data)
  {
    Log.Message(title + " - Audit was written");
    return true;
  }
  else 
  {
    Log.Message(title + " Test Failed - Patient audit record not found." + " This is the actual audit: // " 
                                      + audit_data + " // This is the expected audit: // " + data + " //");
    return false;
  }
}
//-----------------------------------------------------------------------------------
//Checking bottom audit on the patient tab
function validate_bottom_patient_audit(test_case_title, w_data)
{  
  Goto_Patient_Audit();
  var patient_audit_path = patient_audit()
  var first_row_entry = patient_audit_path.RowCount -1;
  var audit_data = patient_audit_path.Cell(first_row_entry, 1).innerText;

  if(audit_data == w_data)
  {
    Log.Message(test_case_title + "- Audit was written");
    return true;
  }
  else 
  {
    Log.Message(test_case_title + " Test Failed - Patient audit record not found " + " This is the actual audit // " 
                                + audit_data + " // This is the expected audit // " + w_data + " //");
    return false;
  }
}
//-----------------------------------------------------------------------------------