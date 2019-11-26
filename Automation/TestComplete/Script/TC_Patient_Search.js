//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_find_a_patient()
{ 
  try
  {
    var test_title = 'Patient Search - Find a patient'
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'find_a_patient', 'M', 'Shared'); 
    var pat_nhs = get_patient_nhs();
    patient_search(pat_nhs);
  
    var banner_path = patient_banner_blue_bar();
    var banner_nhs = banner_path.Panel(3).Panel(0).Label("NHSNumber_DetachedLabel").contentText;
  
    var result_set = new Array();
    var result_set_1 = compare_values(pat_nhs, banner_nhs, test_title);
    result_set.push(result_set_1);
  
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    Log.Message(results);
    
    //Pass in the result
    results_checker(results,test_title); 
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------