//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Reviews
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Patient_Management
//USEUNIT TSA_Patient_Demographics
//USEUNIT TSA_External_Patient_Lookup
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_external_lookup_external_patient_lookup_for_maintenance_patient()
{
  try
  {
    var test_title = "Treatment - Add a treatment for a self-tester and check it within the database";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Self_tester", "M", "Shared");
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
    var expected_note = "External Patient Lookup was used to view this patient. Reason: Patient present requiring treatment" 
                        + "\r\n" + "Comments: Test";
    var exp_banner_msg = "The patient's recorded testing location is Deans Regression Testing Location 06925922205";
  
    var nhs = get_patient_nhs();
    patient_data = get_external_patient_lookup_data();
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);
  
    var text = get_top_note_text();
    var banner = patient_banner_yellow_bar().innerText;
  
    var result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
  
    result_set_1 = compare_values(expected_note, text, test_title);
    result_set.push(result_set_1);
  
    result_set_1 = compare_values(exp_banner_msg, banner, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}