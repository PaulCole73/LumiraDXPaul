//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_details_for_overdue_non_warfarin_review_table_comparison(pat_name, expected_overdue_days)
{
  //Search for patient
  patient_search(pat_name);
  
  //Acknowledge pop-up if it is shown
  process_popup(get_string_translation("Please Confirm"), get_string_translation("Confirm"));
    
  //Navigate to Demographics Overview
  Goto_Patient_Demographics();
  
  // Grab path of Demographics tab
  var patient_demographics_tab_path = patient_demographics_tab_demographics();

  //Extract basic required info from form
  var pat_num = patient_demographics_tab_path.Panel(0).Label("PatientNumber_DetachedLabel").contentText;
  var nhs_num = patient_demographics_tab_path.Panel(1).Label("NHSNumber_DetachedLabel").contentText;
  var born =  patient_demographics_tab_path.Panel(5).Label("Born_DetachedLabel").contentText;
  
  // Grab path of Demographics contacts tab
  var patient_demographics_tab_contact_address_path = patient_demographics_tab_contact_address();

  //Extract basic required contact info from form
  var tel = patient_demographics_tab_contact_address_path.Panel(1).Label("Phone_DetachedLabel").contentText;
  
  //Navigate to treatment plan overview
  Goto_Patient_Treatment_Plan()
  
  // Grab path of treatment plan overview
  var patient_treatment_details_path = clinical_tp_details();
  
  // Extract treatment plan drug and date
  var drug = patient_treatment_details_path.Panel(3).Label("DrugName_DetachedLabel").contentText;
  var date = patient_treatment_details_path.Panel(0).Label("Start_DetachedLabel").contentText;
  
  // Initialise an array
  var patient_data_array = new Array()
  
  // Store all extracted variables into array
  patient_data_array.push(pat_name, pat_num, nhs_num, born, tel, drug, date, expected_overdue_days); 
   
  return patient_data_array;  
}