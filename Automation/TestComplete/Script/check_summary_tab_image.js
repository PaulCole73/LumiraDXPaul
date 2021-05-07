//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Get_Functions
//USEUNIT Misc_Functions

//--------------------------------------------------------------------------------
//checks for populated summary tab image, returns false if image doesn't exist or is blank
function check_summary_tab_image(patient_nhs) 
{
  var func_title = "Check Image";
  var is_image_there = false;
    
  patient_search(patient_nhs);
   
  var summary_button = summary_tab_path();
  summary_button.Click();
    
  var results_chart = patient_summary_result_chart();
    
  if(results_chart.Child(0).Exists)
  {
    results_chart = results_chart.Child(0).Name;
    if (aqString.Contains(results_chart, "treatmentPlanId") != -1)
    {
      is_image_there = true;
    }
  }
  return is_image_there;
}
//--------------------------------------------------------------------------------