//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Get_Functions
//USEUNIT Misc_Functions

//--------------------------------------------------------------------------------
function inactive_patient_search(data)
{
  Goto_Patient_Search();
  var patient_search_screen_path = patient_search_screen();
  
  patient_search_screen_path.Checkbox("active").ClickChecked(false);
  patient_search_screen_path.Textbox("searchCriteria").Text = data;
  patient_search_screen_path.SubmitButton("Search").Click();
  
  var results_table = patient_search_screen_results_table();
  results_table.Cell(1, 0).Link("PatientLink").Click();
} 
//--------------------------------------------------------------------------------