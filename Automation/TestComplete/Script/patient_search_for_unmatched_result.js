//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Get_Functions
//USEUNIT Misc_Functions

//--------------------------------------------------------------------------------
function patient_search_for_unmatched_result(patient_search_criteria)
{
  //This searches for patient - after selecting find patient button on unmatched result via external result form
  //It will select the first result in the list on the assumption of uniqueness - if results are returned
  
  wait_for_object(path_main_content_panel(), "idStr", "searchCriteria", 3, 1, 20);
    
  inrstar_path_external_patient_search_form_search_criteria().Text = patient_search_criteria;
  inrstar_path_external_patient_search_form_search_button().Click();
    
  WaitSeconds(1, "Wait after patient search...");
   
  //After Search - table will always appear - even if no results
  var results_table = patient_search_screen_results_table();
  var cell_content = results_table.Cell(1, 0).contentText;
  
  //This will check if the search was unsuccessful and return the displayed text if that is so
  if (cell_content == get_string_translation("No patient found"))
  {
    return cell_content;
  }
  else //Otherwise go ahead and click the patient checkbox and use selected patient button
  {
    var patient_found = results_table.Cell(1, 1).Link("PatientLink").contentText;
    results_table.Cell(1, 0).RadioButton("patientId").Click();
    inrstar_path_external_test_patient_search_form_use_selected_patient_button().Click();
    WaitSeconds(1, "Wait after selecting use selected patient...");
    return patient_found;
  }  
} 
//--------------------------------------------------------------------------------