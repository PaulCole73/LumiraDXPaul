//USEUNIT System_Paths
//USEUNIT Navigation
//--------------------------------------------------------------------------------
function check_patient_on_refer_list(pat_name)
{
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  WaitSeconds(2);
  var link = INRstarV5.NativeWebObject.Find("idStr", "ReferredPatientHeaderLink");
  
  //Check message exists
  if(link.Exists != true)
    {
       Log.Message('Home page message not displayed');
       return false;
    }
  
  WaitSeconds(2);
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
  
  WaitSeconds(2);
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
  var INRstarV5 = INRstar_base();
  WaitSeconds(2);
  var link = INRstarV5.NativeWebObject.Find("idStr", "OverduePatientHeaderLink");
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
     Log.Message('Home page message not displayed');
     return false;
  }
  
  WaitSeconds(2); 
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
  Goto_Home();
  WaitSeconds(2);
  var home_page_messages_path = home_page_messages();
  var INRstarV5 = INRstar_base();
  WaitSeconds(2);
  var link = INRstarV5.NativeWebObject.Find("idStr", "ExceededSuspendedPatientsViewModelPatientHeaderLink");
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
     Log.Message('Home page message not displayed');
     return false;
  }
  
  WaitSeconds(2); 
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
  var INRstarV5 = INRstar_base();
  WaitSeconds(2);
  var link = INRstarV5.NativeWebObject.Find("idStr", "ExceededSuspendedPatientsViewModelPatientHeaderLink");
  
  //In case the patient in question was the only one on the list
  if(link.Exists != true)
  {
     Log.Message('Home page message not displayed');
     return false;
  }
  
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
    var home_page_messages_path = home_page_messages();
    var INRstarV5 = INRstar_base();
    WaitSeconds(2);
    var link = INRstarV5.NativeWebObject.Find("idStr", "TransferredPatientHeaderLink");
  
  //In case the patient in question was the only one on the list
    if(link.Exists != true)
      {
       Log.Message('Home page message not displayed');
       return false;
      }
  
    WaitSeconds(2);
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    
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
    return false;
  }
  catch (e)
      {
       Log.Warning('Test check_patient_in_transfer_request FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function check_patient_not_in_transfer_request_message(pat_name)
{
  Goto_Home();
  try
  {
    var home_page_messages_path = home_page_messages();
    var INRstarV5 = INRstar_base();
    WaitSeconds(2);
    var link = INRstarV5.NativeWebObject.Find("idStr", "TransferredPateintHeaderLink");
  
    //In case the patient in question was the only one on the list
    if(link.Exists != true)
    {
     Log.Message('Home page message not displayed');
     return true;
    }
    
    WaitSeconds(2);
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    
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
    return false;
  }
  catch (e)
      {
       Log.Warning('Test check_patient_not_in_transfer_request FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function accept_patient_in_transfer_request_message(pat_name)
{
  Goto_Home();
  try
  {
    var home_page_messages_path = home_page_messages();
    var INRstarV5 = INRstar_base();
    WaitSeconds(2);
    var link = INRstarV5.NativeWebObject.Find("idStr", "TransferredPatientHeaderLink");
  
    //In case the patient in question was the only one on the list
    if(link.Exists != true)
    {
     Log.Message('Home page message not displayed');
     return false;
    }
    
    WaitSeconds(2);
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    
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
    return false;
  }
  catch (e)
      {
       Log.Warning('Test accept_patient_in_transfer_request FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function decline_patient_in_transfer_request_message(pat_name)
{
  Goto_Home();
  try
  {
    var home_page_messages_path = home_page_messages();
    var INRstarV5 = INRstar_base();
    WaitSeconds(2);
    var link = INRstarV5.NativeWebObject.Find("idStr", "TransferredPatientHeaderLink");
  
    //In case the patient in question was the only one on the list
    if(link.Exists != true)
    {
     Log.Message('Home page message not displayed');
     return false;
    }
    
    WaitSeconds(2);
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    
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
    return false;
  }
  catch (e)
      {
       Log.Warning('Test decline_patient_in_transfer_request FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function acknowledge_declined_patient_in_message(pat_name)
{
  Goto_Home();
  try
  {
    var home_page_messages_path = home_page_messages();
    WaitSeconds(2);
    var INRstarV5 = INRstar_base();
    WaitSeconds(2);
    var link = INRstarV5.NativeWebObject.Find("idStr", "DeclinedPatientHeaderLink");
  
    //In case the patient in question was the only one on the list
    if(link.Exists != true)
    {
     Log.Message('Home page message not displayed');
     return false;
    }
  
    WaitSeconds(2);
    home_page_messages_path.Link("DeclinedPatientHeaderLink").Click();
    
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
    return false;
  }
  catch (e)
      {
       Log.Warning('Test acknowledge_declined_patient FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function check_patient_not_in_decline_patient_transfer_request_message(pat_name)
{
  Goto_Home();
  try
  {
    var home_page_messages_path = home_page_messages();
    var INRstarV5 = INRstar_base();
    WaitSeconds(2);
    var link = INRstarV5.NativeWebObject.Find("idStr", "DeclinedPatientHeaderLink");
  
    //In case the patient in question was the only one on the list
    if(link.Exists != true)
    {
     Log.Message('Home page message not displayed');
     return true;
    }
  
    WaitSeconds(2);
    home_page_messages_path.Link("DeclinedPatientHeaderLink").Click();
    var table = home_page_messages_path.Panel("TransferDeclinedPatients").Table("TransferDeclinedTable");

    for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText!=pat_name)
          { 
            //Click checkbox against patient and then Unsuspend button
            Log.Message("Patient not in List")    
            return true;
          }
      }
    Log.Message('Patient was on the decline transfer list')
    return false;
  }
  catch (e)
      {
       Log.Warning('Test - Decline_Patient_Transfer_Request - FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function check_patient_in_transfer_request_not_accepted_message(pat_name)
{
  Goto_Home();
  try
  {
    var home_page_messages_path = home_page_messages();
    var INRstarV5 = INRstar_base();
    WaitSeconds(2);
    var link = INRstarV5.NativeWebObject.Find("idStr", "TransferredPatientHeaderLink");
  
  //In case the patient in question was the only one on the list
    if(link.Exists != true)
      {
       Log.Message('Home page message not displayed');
       return false;
      }
  
    WaitSeconds(2);
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    
    var table = home_page_messages_path.Panel("TransferRequestPatients").Table("TransferRequestTable");

    for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText==pat_name)
          { 
            //Click checkbox against patient and then Unsuspend button    
            return true;
          }
      }
    Log.Message('Patient was not found on the list')
    return false;
  }
  catch (e)
      {
       Log.Warning('Test patient_in_transfer_request_not_accepted FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function check_patient_with_incomplete_treatment_message(pat_name)
{
  Goto_Home();
  try
  {
    var home_page_messages_path = home_page_messages();
    var INRstarV5 = INRstar_base();
    WaitSeconds(2);
    var link = INRstarV5.NativeWebObject.Find("contentText", "*patient(s) with incomplete treatment.*");
  
  //In case the patient in question was the only one on the list
    if(link.Exists != true)
      {
       Log.Message('Home page message not displayed');
       return false;
      }
  
    WaitSeconds(2);
    home_page_messages_path.Link(0).Click();
    
    var table = home_page_messages_path.Panel("IncompleteTreatments").Table("IncompleteTreatmentsTable");

    for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText==pat_name)
          { 
            //Click checkbox against patient and then Unsuspend button    
            return true;
          }
      }
    Log.Message('Patient was not found on the list')
    return false;
  }
  catch (e)
      {
       Log.Warning('Test patient_in_referred_for_further_action FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function check_patient_with_no_diagnosis_or_tp_message(pat_name)
{
  Goto_Home();
  try
  {
    var home_page_messages_path = home_page_messages();
    var INRstarV5 = INRstar_base();
    WaitSeconds(2);
    var link = INRstarV5.NativeWebObject.Find("idStr", "PatientsWithNoDiagnosisHeaderLink");
  
  //In case the patient in question was the only one on the list
    if(link.Exists != true)
      {
       Log.Message('Home page message not displayed');
       return false;
      }
  
    WaitSeconds(2);
    home_page_messages_path.Link("PatientsWithNoDiagnosisHeaderLink").Click();
    
    var table = home_page_messages_path.Panel("PatientsWithNoDiagnosis").Table("PatientWithNoDiagnosisReportTable");

    for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText==pat_name)
          { 
            //Click checkbox against patient and then Unsuspend button    
            return true;
          }
      }
    Log.Message('Patient was not found on the list')
    return false;
  }
  catch (e)
      {
       Log.Warning('Test patient_with_no_diagnosis_or_tp FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function check_overdue_non_warfarin_review_message(pat_name)
{
  Goto_Home();
  try
  {
    var home_page_messages_path = home_page_messages();
    var INRstarV5 = INRstar_base();
    WaitSeconds(2);
    var link = INRstarV5.NativeWebObject.Find("idStr", "OverdueReviewPatientHeaderLink");
  
  //In case the patient in question was the only one on the list
    if(link.Exists != true)
      {
       Log.Message('Home page message not displayed');
       return false;
      }
  
    WaitSeconds(2);
    home_page_messages_path.Link("OverdueReviewPatientHeaderLink").Click();
    
    var table = home_page_messages_path.Panel("OverdueReviewPatients").Table("PatientOverdueReviewReportTable");

    for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText==pat_name)
          { 
            Log.Message(pat_name);
            //Click checkbox against patient and then Unsuspend button    
            return true;
          }
      }
    Log.Message('Patient was not found on the list')
    return false;
  }
  catch (e)
      {
       Log.Warning('Test overdue_non_warfarin_review FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------

function check_patient_not_on_overdue_non_warfarin_review_message(pat_name)
{
  Goto_Home();
  try
  {
    var home_page_messages_path = home_page_messages();
    var INRstarV5 = INRstar_base();
    WaitSeconds(2);
    var link = INRstarV5.NativeWebObject.Find("idStr", "OverdueReviewPatientHeaderLink");
  
  //In case the patient in question was the only one on the list
    if(link.Exists != true)
      {
       Log.Message('Home page message not displayed');
       return true;
      }
  
    WaitSeconds(2);
    home_page_messages_path.Link("OverdueReviewPatientHeaderLink").Click();
    
    var table = home_page_messages_path.Panel("OverdueReviewPatients").Table("PatientOverdueReviewReportTable");

    for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText==pat_name)
          { 
            Log.Message('Patient found on the list incorrectly ' + pat_name);
            //Click checkbox against patient and then Unsuspend button    
            return false;
          }
      }
    Log.Message('Patient was not found on the list')
    return true;
  }
  catch (e)
      {
       Log.Warning('Test patient_not_on_overdue_non_warfarin_review FAILED Exception Occured = ' + e);
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