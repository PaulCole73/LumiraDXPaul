//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function click_external_result_by_timestamp(timestamp_external_result, target)
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
        switch(target)
        {
          case "Dose": 
            results_table.Cell(i, 4).Panel(0).Panel("Div1").Button("DosePatient").Click();
            WaitSeconds(1, "Wait after selecting Dose Patient...");  
            break;
          case "Find": 
            results_table.Cell(i, 4).Panel(0).Panel("Div1").Button("FindPatient").Click();
            break;
          case "Patient_link": 
            results_table.Cell(i, 1).Panel(0).Link("PatientLink").Click();
            break;
          default:
            Log.Message("Incorrect target passed into click_external_result");
            break;
        }
        break;
      }
    }
  } 
  else
  {
    Log.Message("External result table doesn't exist");
  }
}
//--------------------------------------------------------------------------------
function post_multiple_external_results(location_id, number_of_results) //this belongs in tsa results
{
  //this posts a series of external results getting 1 hour older with each result
  var patient = get_patient_details_object_from_demographics();
  
  for(var i = 1; i <= number_of_results; i++)
  {  
    //Post in older external results
    var expected_older_blood_taken_time = get_timestamps_for_now_object_with_changed_hours('-', i);
    var body_data_older = json_body_data_instrument(patient, location_id, "2.2", expected_older_blood_taken_time.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data_older));
  } 
}
//--------------------------------------------------------------------------------