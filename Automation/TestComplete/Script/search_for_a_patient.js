//USEUNIT INRstar_Navigation
//USEUNIT System_Paths
//USEUNIT Translations

function search_for_a_patient(search_criteria)
{
  Goto_Patient_Search();
  var patient_search_screen_path = patient_search_screen();
  
  patient_search_screen_path.Textbox("searchCriteria").Text = search_criteria;
  patient_search_screen_path.SubmitButton("Search").Click();
} 