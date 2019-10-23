//USEUNIT System_Paths
//USEUNIT Navigation
//--------------------------------------------------------------------------------
function check_patient_on_refer_list(pat_name)
{
  var home_page_messages_path = home_page_messages(); 
  home_page_messages_path.Link("ReferredPatientHeaderLink").Click();
  
  var table = home_page_messages_path.Panel("ReferredPatients").Table("ReferredPatientReportTable");
  
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
//--------------------------------------------------------------------------------
function check_patient_not_on_refer_list(pat_name)
{
  var home_page_messages_path = home_page_messages(); 
  var INRstarV5 = INRstar_base();
  var link = INRstarV5.NativeWebObject.Find("idStr", "ReferredPatientHeaderLink");
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
     Log.Message('Home page message not displayed so must have been the only patient on the list');
     return true;
  } 
  
  WaitSeconds(2)
  home_page_messages_path.Link("ReferredPatientHeaderLink").Click();
  var table = home_page_messages_path.Panel("ReferredPatients").Table("ReferredPatientReportTable");
  
  if(link.Exists == true)
  {
  for (i=0; i<table.rowcount; i++)
    {
       if(table.Cell(i, 0).contentText==pat_name)
        {     
          Log.Message("Patient found " + pat_name + ' when they should no longer be on the list');
          return false;
        }
    } 
  } 
  return true; 
}
//--------------------------------------------------------------------------------
function check_patient_on_overdue_INR_list(pat_name)
{
  Goto_Home();
  var home_page_messages_path = home_page_messages(); 
  home_page_messages_path.Link("OverduePatientHeaderLink").Click();
  
  var table = home_page_messages_path.Panel("OverduePatients").Table("PatientOverdueReportTable");
  
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
//--------------------------------------------------------------------------------
function check_patient_on_exceed_suspension_period_list(pat_name)
{
  var home_page_messages_path = home_page_messages(); 
  home_page_messages_path.Link("ExceededSuspendedPatientsViewModelPatientHeaderLink").Click();
  
  var table = home_page_messages_path.Panel("ExceededSuspendedPatients").Form("UnsuspendForm").Table("ExceededSuspendedPatientReportTable");
  
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
//--------------------------------------------------------------------------------
function unsuspend_patient_on_exceed_suspension_period_list(pat_name)
{
  Goto_Home();
  var home_page_messages_path = home_page_messages();
  home_page_messages_path.Link("ExceededSuspendedPatientsViewModelPatientHeaderLink").Click();
  
  var table = home_page_messages_path.Panel("ExceededSuspendedPatients").Form("UnsuspendForm").Table("ExceededSuspendedPatientReportTable");
  
    for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText==pat_name)
          { 
            //Click checkbox against patient and then Unsuspend button    
            table.Cell(i, 5).Checkbox("patients").ClickChecked(true);
            home_page_messages_path.Panel("ExceededSuspendedPatients").Form("UnsuspendForm").Panel(0).SubmitButton("UnsuspendLink").Click();
            return true;
          }
      }
     
    Log.Message("Patient not found " + pat_name)
    return false; 
}
//--------------------------------------------------------------------------------
function check_patient_in_transfer_request_message(pat_name)
{
  Goto_Home();
  try
  {
    WaitSeconds(2);
    var home_page_messages_path = home_page_messages();
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    WaitSeconds(3);
    
    var table = home_page_messages_path.Panel("TransferredPatients").Table("TransferredTable");

    for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText==pat_name)
          { 
            //Click checkbox against patient and then Unsuspend button    
            return true;
          }
      }
    Log.Message('Patient was not found on the list')
  }
  catch (e)
      {
       Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function check_patient_not_in_transfer_request_message(pat_name)
{
  Goto_Home();
  try
  {
    WaitSeconds(2);
    var home_page_messages_path = home_page_messages();
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    WaitSeconds(3);
    
    var table = home_page_messages_path.Panel("TransferredPatients").Table("TransferredTable");

    for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText!=pat_name)
          { 
            //Click checkbox against patient and then Unsuspend button    
            return true;
          }
      }
    Log.Message('Patient was on the transfer request list')
  }
  catch (e)
      {
       Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function accept_patient_in_transfer_request_message(pat_name)
{
  Goto_Home();
  try
  {
    WaitSeconds(2);
    var home_page_messages_path = home_page_messages();
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    WaitSeconds(3);
    
    var table = home_page_messages_path.Panel("TransferredPatients").Table("TransferredTable");
    for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText==pat_name)
          { 
            //Click Accept button against patient and accept the transfer    
            table.Cell(i, 6).Button("AcceptChangePatientTestingLocation").Click(); 
            process_confirm_change_location('');
            return true;
          }
      }
    Log.Message('Patient was not found on the list')
  }
  catch (e)
      {
       Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function decline_patient_in_transfer_request_message(pat_name)
{
  Goto_Home();
  try
  {
    WaitSeconds(2);
    var home_page_messages_path = home_page_messages();
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    WaitSeconds(3);
    
    var table = home_page_messages_path.Panel("TransferredPatients").Table("TransferredTable");
    for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText==pat_name)
          { 
            //Click Decline button against patient and accept the transfer    
            table.Cell(i, 6).Button("DeclineChangePatientTestingLocation").Click(); 
            return true;
          }
      }
    Log.Message('Patient was not found on the list')
  }
  catch (e)
      {
       Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function acknowledge_declined_patient_in_message(pat_name)
{
  Goto_Home();
  try
  {
    WaitSeconds(2);
    var home_page_messages_path = home_page_messages();
    home_page_messages_path.Link("DeclinedPatientHeaderLink").Click();
    WaitSeconds(3);
    
    var table = home_page_messages_path.Panel("TransferDeclinedPatients").Table("TransferDeclinedTable");
    for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText==pat_name)
          { 
            //Click Decline button against patient and accept the transfer    
            table.Cell(i, 4).Button("AcknowledgeDeclinedPatient").Click(); 
            return true;
          }
      }
    Log.Message('Patient was not found on the list')
  }
  catch (e)
      {
       Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function check_patient_not_in_decline_patient_transfer_request_message(pat_name)
{
  Goto_Home();
  try
  {
    WaitSeconds(2);
    var home_page_messages_path = home_page_messages();
    home_page_messages_path.Link("DeclinedPatientHeaderLink").Click();
    WaitSeconds(3);
    
    var table = home_page_messages_path.Panel("TransferDeclinedPatients").Table("TransferDeclinedTable");

    for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText!=pat_name)
          { 
            //Click checkbox against patient and then Unsuspend button    
            return true;
          }
      }
    Log.Message('Patient was on the decline transfer list')
  }
  catch (e)
      {
       Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function get_overdue_patient(patient_name)
{
  Goto_Home();
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  
  var link = INRstarV5.NativeWebObject.Find("idStr", "OverduePatientHeaderLink");
  
  if(link.Exists == true)
  {
    home_page_messages_path.Link("OverduePatientHeaderLink").Click();
    var table = home_page_messages_path.Panel("OverduePatients").Table("PatientOverdueReportTable");
    
    for(var i = 1; i < table.rowCount; i++)
    {
      if(table.Cell(i, 0).contentText == patient_name)
      {
        table.Cell(i, 0).Click();
        break;
      }
    }
  }
}