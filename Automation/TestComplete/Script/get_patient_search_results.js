//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_search_results(search_criteria)
{
  Goto_Patient_Search();
  var patient_search_screen_path = patient_search_screen();
  
  patient_search_screen_path.Textbox("searchCriteria").Text = search_criteria;
  patient_search_screen_path.SubmitButton("Search").Click();
  
  WaitSeconds(1, "Wait after patient search...");
   
  var results_table = patient_search_screen_results_table();
  
  var search_results = results_table.Cell(1, 0).contentText;
  
  return search_results;
}