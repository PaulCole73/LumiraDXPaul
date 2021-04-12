﻿//USEUNIT INRstar_Misc_Functions
//USEUNIT INRstar_Get_Functions
//--------------------------------------------------------------------------------
function tc_ensure_the_blue_bar_contains_all_patient_data_fields_throughout_each_sub_tab_of_the_patient() 
{
 try
  {
    var test_title = 'Patient - Add a new patient';
    login(5, "Shared");
    add_patient('Banner', 'Patient', 'M');  
    var pat_name = get_patient_surname();
    var expected_patient_details = inrstar_get_patient_details_object_from_bluebar();
    var result_set = new Array();
    
    //Go through each tab and check blue bar matches
    Goto_Patient_Demographics();
    var actual_banner_patient = inrstar_get_patient_details_object_from_bluebar();    
    var result_set_1 = compare_objects(expected_patient_details,actual_banner_patient);
    result_set.push(result_set_1);
    
    Goto_Patient_Management();
    actual_banner_patient = inrstar_get_patient_details_object_from_bluebar();
    var result_set_1 = compare_objects(expected_patient_details,actual_banner_patient);
    result_set.push(result_set_1);
    
    Goto_Patient_Notes();
    actual_banner_patient = inrstar_get_patient_details_object_from_bluebar();
    var result_set_1 = compare_objects(expected_patient_details,actual_banner_patient);
    result_set.push(result_set_1);
    
    Goto_Patient_Adverse_Events();
    actual_banner_patient = inrstar_get_patient_details_object_from_bluebar();
    var result_set_1 = compare_objects(expected_patient_details,actual_banner_patient);
    result_set.push(result_set_1);
    
    if(language=="English")
    {
     Goto_Patient_Letters();
     actual_banner_patient = inrstar_get_patient_details_object_from_bluebar();
     var result_set_1 = compare_objects(expected_patient_details,actual_banner_patient);
     result_set.push(result_set_1); 
     
     Goto_Patient_Summary();
     actual_banner_patient = inrstar_get_patient_details_object_from_bluebar();
     var result_set_1 = compare_objects(expected_patient_details,actual_banner_patient);
     result_set.push(result_set_1);
    }
    
    Goto_Patient_Audit();
    actual_banner_patient = inrstar_get_patient_details_object_from_bluebar();
    var result_set_1 = compare_objects(expected_patient_details,actual_banner_patient);
    result_set.push(result_set_1);
    
    Goto_Self_Care();
    actual_banner_patient = inrstar_get_patient_details_object_from_bluebar();
    var result_set_1 = compare_objects(expected_patient_details,actual_banner_patient);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set); 
    results_checker(results, test_title); 
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Banner";
    var test_name = "tc_ensure_the_blue_bar_contains_all_patient_data_fields_throughout_each_sub_tab_of_the_patient";
    handle_failed_tests(suite_name, test_name);
  } 
} 