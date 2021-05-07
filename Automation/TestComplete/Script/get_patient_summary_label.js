//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Get_Functions
//USEUNIT Misc_Functions

//--------------------------------------------------------------------------------
//this return an array of key labels from the patient summary tab
function get_patient_summary_labels(patient_nhs) 
{
  var func_title = "Get Key Summary Labels";
  var smry_labels = new Array();
    
  patient_search(patient_nhs);
   
  var summary_button = summary_tab_path();
  summary_button.Click();
    
  var smry_test_date = patient_current_summary().Panel(0).Label("CurrentTreatment_LatestINRTestDate_DetachedLabel").innerText;
  var smry_inr = patient_current_summary().Panel(1).Label("CurrentTreatment_LatestINR_DetachedLabel").innerText;
  var smry_dose = patient_current_summary().Panel(2).Label("CurrentTreatment_LatestDose_DetachedLabel").innerText;
  var smry_review_date = patient_current_summary().Panel(3).Label("CurrentTreatment_LatestReview_DetachedLabel").innerText;
  var smry_next_test = aqConvert.DateTimeToStr(patient_current_summary().Panel(4).Label("CurrentTreatment_NextINRTestDate_DetachedLabel").innerText);
    
  smry_labels.push(smry_test_date, smry_inr, smry_dose, smry_review_date, smry_next_test);
    
  return smry_labels;
}
//--------------------------------------------------------------------------------