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