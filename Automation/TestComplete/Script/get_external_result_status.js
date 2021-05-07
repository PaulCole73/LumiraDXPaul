//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------

function get_external_result_status(timestamp_external_result)
{
  WaitSeconds(2, "Waiting for table to update...");
  Goto_External_Results();
  
  var results_table_object = wait_for_object(path_patient_content_panel(), "idStr", "WarfarinResultsTable", 4);
  var external_result_status;

    if(results_table_object.Exists)
    {
      var results_table = patient_external_results_table();
      var rowcount = results_table.rowcount

      for(var i=0; i < results_table.rowcount; i++)
      {
        if(results_table.Cell(i, 2).contentText == timestamp_external_result)
        {
        external_result_status = results_table.Cell(i, 4).Panel(0).Panel("Div1").contentText; 
        break;     
        }
      }
    } 
    else
    {
      Log.Message("External result table doesn't exist");
    }
  return external_result_status;
}