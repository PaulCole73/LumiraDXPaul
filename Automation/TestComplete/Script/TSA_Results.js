//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions

//--------------------------------------------------------------------------------
function click_dose_patient_external_result_by_timestamp(timestamp_external_result)
{
  Goto_External_Results();
  var results_table_object = wait_for_object(path_patient_content_panel(), "idStr", "WarfarinResultsTable", 4);
  var results_table = patient_external_results_table();
  
  if(results_table_object.Exists)
    {
      var rowcount = results_table.rowcount

      for(var i=0; i < results_table.rowcount; i++)
      {
        if(results_table.Cell(i, 2).contentText == timestamp_external_result)
        {
          results_table.Cell(i, 4).Panel(0).Panel("Div1").Button("DosePatient").Click();
        }
      }
    } 
      else
      {
        Log.Message("External result table doesn't exist");
      }
}
//--------------------------------------------------------------------------------
function external_results_warning_checker()
{
  var INRstarV5 = INRstar_base();
  var treatment_buttons_path = inr_treatment_buttons();
  treatment_buttons_path.Button("DeleteLatestTreatment").Click();
  
  // Find out if the confirm button is on the screen
  var pop_up = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
  
  WaitSeconds(2);
  
  if (pop_up.Exists && pop_up.VisibleOnScreen == true)
  {
    //get message and validate
    var pop_up_warning_message_path = pop_up_warning_message();
    var pop_up_message = pop_up_warning_message_path.contentText;
    
    if(pop_up_message==expected_message)
    {
     return true; 
    } 
  }
  else
     Log.Message('The confirm box wasn\'t on the page'); 
     return false;    
} 
//--------------------------------------------------------------------------------