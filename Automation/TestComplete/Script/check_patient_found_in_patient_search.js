//USEUNIT INRstar_Navigation
//USEUNIT System_Paths
//USEUNIT Translations

function check_patient_found_in_patient_search_table(search_criteria, expected_patient_fullname)
{
  search_for_a_patient(search_criteria);
  var results_table = patient_search_screen_results_table();
  
  if(results_table.Cell(1, 0).contentText != get_string_translation("No patient found"))
  {
    
    check_patient_exists_in_table_within_column()
	  for(var i = 0; i < results_table.rowCount; i++)
	  {
		  if(results_table.Cell(i, 0).contentText == expected_patient_fullname)
		  {
		    return true;
		  }
	  }
  }
  else
  {
	  return false;
  }
  
  return false;
}