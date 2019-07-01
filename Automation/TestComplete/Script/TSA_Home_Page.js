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