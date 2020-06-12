//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function check_patient_on_refer_list(pat_name)
{
  Goto_Home();
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  var link = wait_for_object(INRstarV5, "idStr", "ReferredPatientHeaderLink", 10);
  
  //Check message exists
  if(link.Exists != true)
  {
    Log.Message('Home page message not displayed');
    return false;
  }
  else
  {
    home_page_messages_path.Link("ReferredPatientHeaderLink").Click();
    var table = wait_for_object(home_page_messages_path, "idStr", "ReferredPatientReportTable", 3);
    //var table = home_page_messages_path.Panel("ReferredPatients").Table("ReferredPatientReportTable");
  
    for (i=0; i<table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText==pat_name)
      {     
        return true;
      }
    } 
    Log.Message("Patient not found " + pat_name)
    return false; 
  }
}
//--------------------------------------------------------------------------------
function check_patient_not_on_refer_list(pat_name)
{
  Goto_Home();
  var home_page_messages_path = home_page_messages(); 
  var INRstarV5 = INRstar_base();
  var link = wait_for_object(INRstarV5, "idStr", "ReferredPatientHeaderLink", 10);
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
    Log.Message("Home page message not displayed so must have previously been the only patient on the list");
    return true;
  } 
  else
  {
    home_page_messages_path.Link("ReferredPatientHeaderLink").Click();
    var table = wait_for_object(home_page_messages_path, "idStr", "ReferredPatientReportTable", 3);
  
    for (var i = 0; i < table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText == pat_name)
      {     
        Log.Message("Patient found " + pat_name + " when they should no longer be on the list");
        return false;
      }
    } 
    return true;
  }
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
function unsuspend_patient_on_exceed_suspension_period_list(pat_name)
{
  // Navigate to the list table and wait for it to appear
  Goto_Home_Page_Suspension_List(); // from INRstar_Navigation
  
   // Get the path of the table
  var table = home_page_suspension_table(); // from System_paths
  
  // Unsuspend patient - start by cycling through table to find patient
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
function dothis()
{
  check_patient_in_transfer_not_yet_been_accepted_list("REGRESSION_115, Transfer_request_686")
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
function check_patient_not_in_transfer_request_message(pat_name)
{
  Goto_Home();
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  WaitSeconds(2);
  var link = wait_for_object(INRstarV5, "Name", "Link(\"TransferredPatientHeaderLink\")", 10);
  //var link = INRstarV5.NativeWebObject.Find("idStr", "TransferredPateintHeaderLink");
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
    Log.Message('Home page message not displayed');
    return true;
  }
  else
  {
    WaitSeconds(2);
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    
    wait_for_object(home_page_messages_path, "idStr", "TransferredTable", 2);
    var table = home_page_messages_path.Panel("TransferredPatients").Table("TransferredTable");
    for (var i = 0; i < table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText != pat_name)
      { 
        //Click checkbox against patient and then Unsuspend button    
        return true;
      }
    }
    Log.Message('Patient was on the transfer request list')
    return false;
  }
} 
//--------------------------------------------------------------------------------
function accept_patient_in_transfer_request_message(pat_name) //this and the below function should be consolidated
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
        WaitSeconds(2); //can use wait for function for this popup
        process_popup("Please confirm to continue", "Confirm");
        return true;
      }
    }
    Log.Message('Patient was not found on the list')
    return false;
  }
} 
//--------------------------------------------------------------------------------
function decline_patient_in_transfer_request_message(pat_name)
{
  Goto_Home();
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  WaitSeconds(2);
  var link = wait_for_object(INRstarV5, "Name", "Link(\"TransferredPatientHeaderLink\")", 10);
  //var link = INRstarV5.NativeWebObject.Find("idStr", "TransferredPatientHeaderLink");
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
    Log.Message("Home page message not displayed");
    return false;
  }
  else
  {
    WaitSeconds(2);
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    
    wait_for_object(home_page_messages_path, "idStr", "TransferredTable", 2);
    var table = home_page_messages_path.Panel("TransferredPatients").Table("TransferredTable");
    for (var i = 0; i < table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText == pat_name)
      { 
        //Click Decline button against patient and accept the transfer
        table.Cell(i, 6).scrollIntoView(true);    
        table.Cell(i, 6).Button("DeclineChangePatientTestingLocation").Click(); 
        return true;
      }
    }
    Log.Message('Patient was not found on the list')
    return false;
  }
} 
//--------------------------------------------------------------------------------
function acknowledge_declined_patient_in_message(pat_name)
{
  Goto_Home();
  var home_page_messages_path = home_page_messages();
  WaitSeconds(2);
  var INRstarV5 = INRstar_base();
  WaitSeconds(2);
  var link = wait_for_object(INRstarV5, "idStr", "DeclinedPatientHeaderLink", 10);
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
    Log.Message("Home page message not displayed");
    return false;
  }
  else
  {
    home_page_messages_path.Link("DeclinedPatientHeaderLink").Click();
    wait_for_object(home_page_messages_path, "idStr", "TransferDeclinedTable", 2);
    var table = home_page_messages_path.Panel("TransferDeclinedPatients").Table("TransferDeclinedTable");
    for (var i = 0; i < table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText == pat_name)
      { 
        //Click Decline button against patient and accept the transfer
        table.Cell(i, 4).scrollIntoView(true);    
        table.Cell(i, 4).Button("AcknowledgeDeclinedPatient").Click(); 
        return true;
      }
    }
    Log.Message("Patient was not found on the list");
    return false;
  }
} 
//--------------------------------------------------------------------------------
function check_patient_not_in_decline_patient_transfer_request_message(pat_name)
{
  Goto_Home();
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  var link = wait_for_object(INRstarV5, "idStr", "DeclinedPatientHeaderLink", 10);
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
    Log.Message("Home page message not displayed");
    return true;
  }
  else
  {
    home_page_messages_path.Link("DeclinedPatientHeaderLink").Click();
    var table = home_page_messages_path.Panel("TransferDeclinedPatients").Table("TransferDeclinedTable");
    wait_for_object(home_page_messages_path, "idStr", "TransferDeclinedTable", 2);
    for (var i = 0; i < table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText != pat_name)
      { 
        //Click checkbox against patient and then Unsuspend button
        Log.Message("Patient not in List")    
        return true;
      }
    }
    Log.Message('Patient was on the decline transfer list')
    return false;
  }
} 
//--------------------------------------------------------------------------------
function check_patient_in_transfer_request_not_accepted_message(pat_name)
{
  Goto_Home();
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  var link = wait_for_object(INRstarV5, "idStr", "TransferredPatientHeaderLink", 10);
  var link_2 = wait_for_object(INRstarV5, "ObjectIdentifier", "TransferredPatientHeaderLink_2", 10);
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
    Log.Message('Home page message not displayed');
    return false;
  }
  else
  {
    WaitSeconds(1);
    if(link_2.Exists == true)
    {
      home_page_messages_path.Link("TransferredPatientHeaderLink_2").Click();
    }
    else
    {
      home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    }
    
    var table = home_page_messages_path.Panel("TransferRequestPatients").Table("TransferRequestTable");
    for (i=0; i<table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText==pat_name)
      { 
        //Click checkbox against patient and then Unsuspend button    
        return true;
      }
    }
    return false; 
  }
} 
//--------------------------------------------------------------------------------
function check_patient_with_incomplete_treatment_message(pat_name)
{
  Goto_Home();
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  WaitSeconds(2);
  var link = INRstarV5.NativeWebObject.Find("contentText", get_string_translation("*patient(s) with incomplete treatment.*"));
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
    Log.Message('Home page message not displayed');
    return false;
  }
  else
  {
    WaitSeconds(2);
    home_page_messages_path.Link(0).Click();
    var table = home_page_messages_path.Panel("IncompleteTreatments").Table("IncompleteTreatmentsTable");

    for (var i = 0; i < table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText == pat_name)
      { 
      //Click checkbox against patient and then Unsuspend button    
      return true;
      }
    }
    Log.Message('Patient was not found on the list')
    return false; 
  }
} 
//--------------------------------------------------------------------------------
function check_patient_with_no_diagnosis_or_tp_message(pat_name)
{
  Goto_Home();
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  WaitSeconds(2);
  var link = wait_for_object(INRstarV5, "idStr", "PatientsWithNoDiagnosisHeaderLink", 10);
  //var link = INRstarV5.NativeWebObject.Find("idStr", "PatientsWithNoDiagnosisHeaderLink");
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
    Log.Message("Home page message not displayed");
    return false;
  }
  else
  {
    WaitSeconds(2);
    home_page_messages_path.Link("PatientsWithNoDiagnosisHeaderLink").Click();
    wait_for_object(home_page_messages_path, "idStr", "PatientWithNoDiagnosisReportTable", 2);
    var table = home_page_messages_path.Panel("PatientsWithNoDiagnosis").Table("PatientWithNoDiagnosisReportTable");

    for (i=0; i<table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText==pat_name)
      { 
        //Click checkbox against patient and then Unsuspend button    
        return true;
      }
    }
    Log.Message('Patient was not found on the list');
    return false; 
  }
} 
//--------------------------------------------------------------------------------
function check_overdue_non_warfarin_review_message(pat_name)
{
  Goto_Home();
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  WaitSeconds(2);
  var link = wait_for_object(INRstarV5, "idStr", "OverdueReviewPatientHeaderLink", 10);
  //var link = INRstarV5.NativeWebObject.Find("idStr", "OverdueReviewPatientHeaderLink");
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
    Log.Message("Home page message not displayed");
    return false;
  }
  else
  {
    WaitSeconds(2);
    home_page_messages_path.Link("OverdueReviewPatientHeaderLink").Click();
    wait_for_object(home_page_messages_path, "idStr", "PatientOverdueReviewReportTable", 2);
    var table = home_page_messages_path.Panel("OverdueReviewPatients").Table("PatientOverdueReviewReportTable");

    for (var i = 0; i < table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText == pat_name)
      { 
        Log.Message(pat_name);
        //Click checkbox against patient and then Unsuspend button    
        return true;
      }
    }
    Log.Message("Patient was not found on the list");
    return false;      
  }
} 
//--------------------------------------------------------------------------------
function check_patient_not_on_overdue_non_warfarin_review_message(pat_name)
{
  Goto_Home();  
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  WaitSeconds(2);
  var link = wait_for_object(INRstarV5, "idStr", "OverdueReviewPatientHeaderLink", 10);
  //var link = INRstarV5.NativeWebObject.Find("idStr", "OverdueReviewPatientHeaderLink");
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
    Log.Message("Home page message not displayed");
    return true;
  }
  else
  {
    WaitSeconds(2);
    home_page_messages_path.Link("OverdueReviewPatientHeaderLink").Click();
    var table = home_page_messages_path.Panel("OverdueReviewPatients").Table("PatientOverdueReviewReportTable");

    for (var i = 0; i < table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText == pat_name)
      { 
        Log.Message("Patient found on the list incorrectly " + pat_name);
        //Click checkbox against patient and then Unsuspend button    
        return false;
      }
    }
    Log.Message("Patient was not found on the list");
    return true;
  }
} 
//--------------------------------------------------------------------------------
function get_overdue_patient(patient_name)
{
  Goto_Home();
  WaitSeconds(5);
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  var link = wait_for_object(INRstarV5, "idStr", "OverduePatientHeaderLink", 10);
  //var link = INRstarV5.NativeWebObject.Find("idStr", "OverduePatientHeaderLink");
  
  if(link.Exists == true)
  {
    home_page_messages_path.Link("OverduePatientHeaderLink").Click();
    var table = wait_for_object(home_page_messages_path, "idStr", "PatientOverdueReportTable", 3);
    WaitSeconds(2);
    
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
  }
  return false;
  WaitSeconds(4, "Waiting to go to patient...");
}
//--------------------------------------------------------------------------------
function get_urgent_patient_message_text(patient_nhs)
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
  