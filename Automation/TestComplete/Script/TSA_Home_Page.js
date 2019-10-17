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
//    var row_count = transfer_list_table.rowcount;
//    
//    for(i=1; i<row_count; i++) 
//    {
       for (i=0; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText==pat_name)
          { 
            //Click checkbox against patient and then Unsuspend button    
//            table.Cell(i, 5).Checkbox("patients").ClickChecked(true);
//            home_page_messages_path.Panel("ExceededSuspendedPatients").Form("UnsuspendForm").Panel(0).SubmitButton("UnsuspendLink").Click();
            return true;
          }
      }
       
//       var transfer_list_pat = transfer_list_table.Cell(i, 0).contentText;
//       if(transfer_list_pat==messagename)
//       { 
//         while(transfer_list_table.Cell(i, 0).Link("PatientLink").VisibleOnScreen==false)
//         {
//         transfer_list_table.Cell(i, 0).Link("PatientLink").ScrollIntoView(true);
//         }       
//          transfer_list_table.Cell(i, 6).Button("AcceptChangePatientTestingLocation").Click(); 
//          process_confirm_change_location('');
//          return true;
//       }
    Log.Message('Patient was not found on the list')
  }
  catch (e)
      {
       Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------