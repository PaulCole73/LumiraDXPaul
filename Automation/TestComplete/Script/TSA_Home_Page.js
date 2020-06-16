﻿//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//-------------------------       Checking audits   ------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function check_top_patient_audit(test_title, pat_name, search_text)
{
    //Search for patient
    patient_search(pat_name);
    
    //Acknowledge pop-up if it is shown
    process_popup(get_string_translation("Please Confirm"), get_string_translation("Confirm"));
       
    //Check for search_text within audit
    return validate_top_patient_audit(test_title, get_string_translation(search_text));
}
//--------------------------------------------------------------------------------
function check_top_suggested_treatment_audit(pat_name, search_text)
{
    //Search for patient
    patient_search(pat_name);
    
    //Goto the audit for the patient
    Goto_Suggested_Treatment_Audit();
    
    //Check for search_text within audit
    return validate_top_treatment_audit(get_string_translation(search_text));
}
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//-------------------------       Checking sort orders   -------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function check_overdue_sort_order_of_home_page_list()
{ 
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Overdue_List(); // from INRstar_Navigation
  
  // Get the path of the table
  var table = home_page_overdue_table(); // from System_paths
  
  // Now that we have table - Pass it on together with the column number 7, to check sort order, return result
  return check_sort_order_of_table(table, 7) // from Misc_Functions
}
//--------------------------------------------------------------------------------
function check_non_warfarin_review_sort_order_of_home_page_list()
{ 
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Overdue_Non_Warfarin_Review_List(); // from INRstar_Navigation
  
   // Get the path of the table
  var table = home_page_overdue_non_warfarin_review_table(); // from System_paths 
  
  // Now that we have table - Pass it on together with the column number 7, to check sort order, return result
  return check_sort_order_of_table(table, 7) // from Misc_Functions
}
//--------------------------------------------------------------------------------
function check_date_sort_order_of_suspension_home_page_list() 
{  
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Suspension_List(); // from INRstar_Navigation
  
  // Get the path of the table
  var table = home_page_suspension_table(); // from System_paths
  
  // Now that we have table - Pass it on together with the column number, to check sort order, return result
  return check_date_sort_order_of_table(table, 4) // from Misc_Functions

}
//--------------------------------------------------------------------------------
function check_date_sort_order_of_exceeded_treatment_end_date_list() 
{  
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Exceeded_Treatment_End_Date_List(); // from INRstar_Navigation
  
  // Get the path of the table
  var table = home_page_exceeded_treatment_end_date_table(); // from System_paths
  
  // Now that we have table - Pass it on together with the column number, to check sort order, return result
  return check_date_sort_order_of_table(table, 5) // from Misc_Functions

}
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------       Checking home page messages / headers   -------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function Check_home_page_header_showing(link_header)
{
  // Get the homepage path
  var home_page_messages_path = home_page_messages();  
  
  // look for specified link_header within homepath
  var link = wait_for_object(home_page_messages_path, "Name", "Link(\""+ link_header +"\")", 10);
  
  //In case the link header in question is not on the list
  if(link.Exists != true)
  {
    Log.Message ('Problem: Link header ' + link_header + ' is NOT shown on home page')
    return false
  }
  Log.Message ('Link header ' + link_header + ' is correctly shown on home page')
  return true
}
//--------------------------------------------------------------------------------
function check_home_page_displays_transfer_request_message()
{
  // Go to the homepage
  Goto_Home();
  
  // Check the header - patient transfer request(s) to Accept or Decline message is showing 
  return Check_home_page_header_showing("TransferredPatientHeaderLink");
  
}
//--------------------------------------------------------------------------------
function check_home_page_displays_not_yet_been_accepted_message()
{
  // Go to the homepage
  Goto_Home();
  
  // Check the header - patient transfer request(s) not yet been accepted message is showing 
  return Check_home_page_header_showing("TransferredPatientHeaderLink_2");
  
}
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------       Checking patient exists within tables   -------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function check_patient_on_suspension_list(pat_name) 
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Suspension_List(); // from INRstar_Navigation
  
  // Get the path of the table
  var table = home_page_suspension_table(); // from System_paths
  
  // Check table for patient within column 0
  return check_patient_exists_in_table_within_column(0,table,pat_name) //0 = column to check
}
//--------------------------------------------------------------------------------
function check_patient_on_exceeded_treatment_end_date_list(pat_name) 
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Exceeded_Treatment_End_Date_List(); // from INRstar_Navigation
  
  // Get the path of the table
  var table = home_page_exceeded_treatment_end_date_table(); // from System_paths
  
  // Check table for patient within column 0
  return check_patient_exists_in_table_within_column(0,table,pat_name) //0 = column to check
}
//--------------------------------------------------------------------------------
function check_patient_on_refer_list(pat_name)
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Referred_Patient_List(); // from INRstar_Navigation
  
  // Get the path of the table
  var table = home_page_referred_patient_table(); // from System_paths
  
  // Now that we have table - Pass it on together with the column 0 to check sort order, return result
  return check_patient_exists_in_table_within_column(0,table,pat_name) //0 = column to check
}
//--------------------------------------------------------------------------------
function check_patient_on_overdue_INR_list(pat_name)
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Overdue_List(); // from INRstar_Navigation
  
  // Get the path of the table
  var table = home_page_overdue_table(); // from System_paths
  
  // Now that we have table - Pass it on together with the column 0 to check sort order, return result
  return check_patient_exists_in_table_within_column(0,table,pat_name) //0 = column to check
}
//--------------------------------------------------------------------------------
function check_patient_in_transfer_request_list(pat_name)
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Transfer_Request_List(); // from INRstar_Navigation
  
   // Get the path of the table
  var table = home_page_transfer_request_table(); // from System_paths
  
  // Check table for patient within column 0
  return check_patient_exists_in_table_within_column(0,table,pat_name) //0 = column to check
} 
//--------------------------------------------------------------------------------
function check_patient_in_declined_transfer_list(pat_name)
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Declined_Transfer_List(); // from INRstar_Navigation
  
   // Get the path of the table
  var table = home_page_declined_transfer_table(); // from System_paths
  
  // Check table for patient within column 0
  return check_patient_exists_in_table_within_column(0,table,pat_name) //0 = column to check
} 
//--------------------------------------------------------------------------------
function check_patient_not_in_transfer_request_list(pat_name)
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Transfer_Request_List(); // from INRstar_Navigation
  
   // Get the path of the table
  var table = home_page_transfer_request_table(); // from System_paths
  
  // Check table for patient within column 0
  return check_patient_does_not_exist_in_table_within_column(0,table,pat_name) //0 = column to check
} 
//--------------------------------------------------------------------------------
function check_patient_in_transfer_not_yet_been_accepted_list(pat_name)
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Transfer_Not_Yet_Been_Accepted_List(); // from INRstar_Navigation
  
   // Get the path of the table
  var table = home_page_transfer_not_yet_been_accepted_table(); // from System_paths
  
  // Check table for patient within column 0
  return check_patient_exists_in_table_within_column(0,table,pat_name) //0 = column to check
} 
//--------------------------------------------------------------------------------
function check_patient_in_incomplete_treatment_list(pat_name)
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Incomplete_Treatment_List(); // from INRstar_Navigation
  
   // Get the path of the table
  var table = home_page_incomplete_treatment_table(); // from System_paths
  
  // Check table for patient within column 0
  return check_patient_exists_in_table_within_column(0,table,pat_name) //0 = column to check
} 
//--------------------------------------------------------------------------------
function check_patient_in_overdue_non_warfarin_review_list(pat_name)
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Overdue_Non_Warfarin_Review_List(); // from INRstar_Navigation
  
   // Get the path of the table
  var table = home_page_overdue_non_warfarin_review_table(); // from System_paths 
  
  // Check table for patient within column 0
  return check_patient_exists_in_table_within_column(0,table,pat_name) //0 = column to check
} 
//--------------------------------------------------------------------------------
function check_patient_in_no_diagnosis_or_treatment_plan_message(pat_name)
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_No_Diagnosis_Or_Treatment_List(); // from INRstar_Navigation
  
   // Get the path of the table
  var table = home_page_no_diagnosis_or_treatment_table(); // from System_paths
  
  // Check table for patient within column 0
  return check_patient_exists_in_table_within_column(0,table,pat_name) //0 = column to check
} 
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//-------------------       Checking patient NOT in tables   ---------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function check_patient_not_in_decline_patient_transfer_request_list(pat_name)
{  
  // Navigate to the list table and wait for it to appear
  var can_see_table = Goto_Home_Page_Declined_Transfer_List(); // from INRstar_Navigation
  
  // If the table can be seen - Get the path of the table and check it
  if (can_see_table == true) 
  {
    var table = home_page_declined_transfer_table(); // from System_paths 
    
    // Check table for patient within column 0
    return check_patient_does_not_exist_in_table_within_column(0,table,pat_name) //0 = column to check
  }
  // otherwise if the table cannot be seen this check is a pass (since we are checking patient isn't on it)
  else 
  {
    Log.Message("Success: Table does not exist - so unable to check that patient doesn't exist")
    return true
  }
} 
//--------------------------------------------------------------------------------
function check_patient_not_on_overdue_non_warfarin_review_list(pat_name)
{
  // Navigate to the list table and wait for it to appear
  var can_see_table = Goto_Home_Page_Overdue_Non_Warfarin_Review_List(); // from INRstar_Navigation
  
  // If the table can be seen - Get the path of the table and check it
  if (can_see_table == true) 
  {
    var table = home_page_overdue_non_warfarin_review_table(); // from System_paths 
    
    // Check table for patient within column 0
    return check_patient_does_not_exist_in_table_within_column(0,table,pat_name) //0 = column to check
  }
  // otherwise if the table cannot be seen this check is a pass (since we are checking patient isn't on it)
  else 
  {
    Log.Message("Success: Table does not exist - so unable to check that patient doesn't exist")
    return true
  }
} 
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//-------------------    Actioning buttons within tables   ---------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function check_can_accept_patient_in_transfer_request(pat_name) 
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Transfer_Request_List(); // from INRstar_Navigation
  
   // Get the path of the table
  var table = home_page_transfer_request_table(); // from System_paths
  
  // Check can select accept patient button
  return can_accept_patient_transfer_request_from_table(table,pat_name);
} 
//--------------------------------------------------------------------------------
function check_can_decline_patient_in_transfer_request(pat_name) 
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Transfer_Request_List(); // from INRstar_Navigation
  
   // Get the path of the table
  var table = home_page_transfer_request_table(); // from System_paths
  
  // Check can select accept patient button
  return can_decline_patient_transfer_request_from_table(table,pat_name);
} 
//--------------------------------------------------------------------------------
function acknowledge_declined_patient_in_message(pat_name)
{
   // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Declined_Transfer_List(); // from INRstar_Navigation
  
   // Get the path of the table
  var table = home_page_declined_transfer_table(); // from System_paths
  
  // Acknowledge declined patient in table
  can_acknowledge_patient_declined_from_table(table,pat_name) // from TSA
  
  // Check patient not in list
  return check_patient_not_in_decline_patient_transfer_request_list(pat_name)
} 
//--------------------------------------------------------------------------------
function unsuspend_patient_on_exceed_suspension_period_list(pat_name)
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Suspension_List(); // from INRstar_Navigation
  
  // Get the path of the table
  var table = home_page_suspension_table(); // from System_paths
  
  // Unsuspend patient - start by cycling through table to find patient
  return can_unsuspend_patient_from_table(table,pat_name)
}
//--------------------------------------------------------------------------------
function can_unsuspend_patient_from_table(table,pat_name)
{
for (var i = 0; i < table.rowcount; i++)
  {
    if(table.Cell(i, 0).contentText == pat_name)
    { 
      //Click checkbox against patient
      table.Cell(i, 5).scrollIntoView(true);    
      table.Cell(i, 5).Checkbox("patients").ClickChecked(true);
      
      //Select Unsuspend button
      home_page_suspension_table_unsuspend_button().Click();
      
      return true;
    }
  }
     
  Log.Warning("Patient not found " + pat_name)
  return false;
}
//--------------------------------------------------------------------------------
function can_accept_patient_transfer_request_from_table(table,pat_name)
{
  for (i=0; i<table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText == pat_name)
      { 
        //Click Accept button against patient and accept the transfer
        table.Cell(i, 6).scrollIntoView(true);    
        table.Cell(i, 6).Button("AcceptChangePatientTestingLocation").Click(); 
        
        //Wait and process confirmation
        WaitSeconds(2); //can use wait for function for this popup
        process_popup("Please confirm to continue", "Confirm");
        return true;
      }
    }
    Log.Warning('Patient was not found on the list')
    return false;
}
//--------------------------------------------------------------------------------
function can_acknowledge_patient_declined_from_table(table,pat_name)
{
 for (var i = 0; i < table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText == pat_name)
      { 
        //Click Acknowledge button against specified patient 
        table.Cell(i, 4).scrollIntoView(true);    
        table.Cell(i, 4).Button("AcknowledgeDeclinedPatient").Click(); 
        return true;
      }
    }
    Log.Warning("Patient was not found on the list");
    return false;
}
//--------------------------------------------------------------------------------
function can_decline_patient_transfer_request_from_table(table,pat_name)
{
  for (var i = 0; i < table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText == pat_name)
      { 
        //Click Decline button against specified patient 
        table.Cell(i, 6).scrollIntoView(true);    
        table.Cell(i, 6).Button("DeclineChangePatientTestingLocation").Click(); 
        return true;
      }
    }
    Log.Message('Patient was not found on the list')
    return false;  
}
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------------------    Misc Actions      --------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function refer_pending_treatment()
{
  // Navigate to patient treatment
  Goto_Patient_Treatment(); // from INRstar_Navigation
  
  // Get the path of the refer pending treatment button
  var button_path = refer_pending_treat_button();
  
  // Select the refer pending treatment button
  button_path.Click();
} 
//--------------------------------------------------------------------------------
function check_next_review_date_warning(test_title)
{
    //Specify expected warning message
    var expected_message = get_string_translation("The patient's next review details have been successfully updated.")
    
    //Grab Actual warning message 
    var warning_message = get_next_review_date_warning();
    
    //Compare expected with warning
    return compare_values(warning_message, expected_message, test_title);
}
//--------------------------------------------------------------------------------
function check_unsuspend_warning_dialog_content(test_title)
{
    //Specify expected warning message
    var expected_message = get_string_translation("The patient(s) have been successfully unsuspended.") +
    get_string_translation("The patient(s) may have been treated elsewhere during the suspension period.") + " " +
    get_string_translation("For warfarin patients please ensure that any recent INR results and warfarin doses are entered as historical treatments.")  + " " +
    get_string_translation("For non-warfarin patients you should ensure review information is up to date.");
     
    //Get warning message text
    var warning_message = process_popup(get_string_translation("Unsuspend Patients"),"OK");
    
    //Compare expected with warning
    return compare_values(warning_message, expected_message, test_title);
}
//--------------------------------------------------------------------------------
function check_patient_registered_practice(message_name, expected_registered_practice, test_title)
{
  // Navigate to patient management
  Goto_Patient_Management(); // from INRstar_Navigation
  
  //Extract the listed registered practice
  var listed_registered_practice = registered_practice_field(); // from System_paths
  
  //Check the practice is correct
  return compare_values(listed_registered_practice, expected_registered_practice, test_title);
}
//--------------------------------------------------------------------------------
function get_overdue_patient(patient_name)
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Overdue_List(); // from INRstar_Navigation if(link.Exists == true)
  
  // Get the path of the table
  var table = home_page_overdue_table(); // from System_paths
  
  // Now that we have table - cycle through records and click specified patient
  for(var i = 1; i < table.rowCount; i++)
  {
    table.Cell(i, 1).scrollIntoView();
    move_mouse_sequence(i, 300);
    if(table.Cell(i, 0).contentText == patient_name)
    {
      WaitSeconds(2, "Waiting to click...");
      table.Cell(i, 0).Click();
      return true;
      break;
    }
  }
  return false;
  WaitSeconds(4, "Waiting to go to patient...");
}
//--------------------------------------------------------------------------------
function check_delay_day_of_patient_in_overdue_non_warfarin_review_list(delay_day, pat_name)
{ 
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Overdue_Non_Warfarin_Review_List(); // from INRstar_Navigation
  
   // Get the path of the table
  var table = home_page_overdue_non_warfarin_review_table(); // from System_paths 
  
  // Now that we have table - Pass on the expected_value(delay_day), table, column_to_check, patient, patient_name_column return result
  return check_value_of_specified_cell_in_table_for_patient(delay_day, table, 7, pat_name, 0) // 
}
//--------------------------------------------------------------------------------
function get_urgent_patient_message_text(patient_nhs) //this is used by code outside of the homepage functionality
{
  Goto_Home();
  var INRstarV5 = INRstar_base();
  
  var obj_root = INRstarV5;
  var link = wait_for_object(obj_root, "idStr", "urgentNotificationCount", 10);
  //var link = INRstarV5.NativeWebObject.Find("idStr", "urgentNotificationCount");
  
  if(link.Exists == true)
  {
    link.Click();
    
    var table = home_page_messages().Panel("urgentNotificationsPlaceholder").Panel("UrgentNotificationsContent").Table("UrgentNotificationsReportTable");
    
    for(var i = 1; i < table.rowCount; i++)
    {
      if(table.Cell(i, 1).Panel(1).Panel(0).Label("NHSNumber_DetachedLabel").contentText == patient_nhs)
      {
        table.Cell(i, 1).scrollIntoView(true);
        var urgent_message = table.Cell(i, 2).contentText;
        Log.Message(urgent_message);
        return urgent_message;
        //return true;
        break;
      }
    }
  }
  return false;
}
//--------------------------------------------------------------------------------
function accept_patient_in_transfer_request_message(pat_name) //this is used by code outside of the homepage functionality
{
  Goto_Home();
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  var link = wait_for_object(INRstarV5, "Name", "Link(\"TransferredPatientHeaderLink\")", 10);
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
    Log.Message('Home page message not displayed');
    return false;
  }
  else
  {
    WaitSeconds(2);
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    
    wait_for_object(home_page_messages_path, "idStr", "TransferredTable", 2);
    var table = home_page_messages_path.Panel("TransferredPatients").Table("TransferredTable");
    for (i=0; i<table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText == pat_name)
      { 
        //Click Accept button against patient and accept the transfer
        table.Cell(i, 6).scrollIntoView(true);    
        table.Cell(i, 6).Button("AcceptChangePatientTestingLocation").Click(); 
        
        //Wait and process confirmation
        WaitSeconds(2); //can use wait for function for this popup
        process_popup("Please confirm to continue", "Confirm");
        return true;
      }
    }
    Log.Message('Patient was not found on the list')
    return false;
  }
} 
  