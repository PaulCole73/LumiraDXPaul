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
    login(5, "Shared");
    add_patient('Regression', 'find_a_patient', 'M'); 
    var pat_name = get_patient_surname();
    inrstar_patient_search(pat_name, pat_name);
    
    var pat_name_currently_loaded = get_patient_surname();
    
    var result_set = new Array();
    var result_set_1 = compare_values(pat_name, pat_name_currently_loaded, test_title);
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
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Search";
    var test_name = "tc_find_a_patient";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_user_can_search_for_a_patient_with_partial_or_full_fiscal_code()
{
  try
  {
    var test_title = 'Patient Search: Fiscal Code - User can search for a patient with partial or full fiscal code'
    login(5, "Shared");
    add_patient('fiscal', 'search', 'M'); 
    
    var pat_name = get_patient_fullname();
    var full_fiscal = get_patient_nhs();
    var start_char_fiscal = aqString.GetChar(full_fiscal, 0); 
    var half_fiscal= aqString.SubString(full_fiscal, 0, 5);
    
    var result_set = new Array();
    
    //Full fiscal code search
    var patient_found = inrstar_patient_search(full_fiscal, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
    result_set.push(result_set_1);
    
    //First char fiscal code search - Need this to be stronger so need to pass in fiscal/name
    var patient_found = inrstar_patient_search(start_char_fiscal, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
    result_set.push(result_set_1);
        
    //First half of the fiscal search
    var patient_found = inrstar_patient_search(half_fiscal, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
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
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Search";
    var test_name = "tc_user_can_search_for_a_patient_with_partial_or_full_fiscal_code";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_user_can_search_for_a_patient_when_putting_whitespace_anywhere_in_the_search_box_with_fiscal()
{
  try
  {
    var test_title = 'Patient Search: Fiscal Code - User can search for a patient when putting whitespace anywhere in the search box with fiscal'
    login(5, "Shared");
    add_patient('fiscalWhiteSpace', 'search', 'M'); 
    
    var pat_name = get_patient_fullname();
    var full_fiscal = get_patient_nhs();
    var first_half_fiscal = aqString.SubString(full_fiscal, 0, 5);
    var second_half_fiscal = aqString.SubString(full_fiscal, 5, 15);
    
    var fiscal_whitespace_begin = "    " + full_fiscal; 
    var fiscal_whitespace_middle = first_half_fiscal + "    " + second_half_fiscal; 
    var fiscal_whitespace_end = full_fiscal + "    "; 
    var fiscal_whitespace_all = "     " + first_half_fiscal + "    " + second_half_fiscal + "     "; 
    
    var result_set = new Array();
    
    //Fiscal whitespace beginning fiscal code search
    var patient_found = inrstar_patient_search(fiscal_whitespace_begin, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
    result_set.push(result_set_1);
    
    //Fiscal whitespace middle fiscal code search
    var patient_found = inrstar_patient_search(fiscal_whitespace_middle, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
    result_set.push(result_set_1);
        
    //Fiscal whitespace end fiscal code search
    var patient_found = inrstar_patient_search(fiscal_whitespace_end, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
    result_set.push(result_set_1);
    
    //Fiscal whitespace all fiscal code search
    var patient_found = inrstar_patient_search(fiscal_whitespace_all, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
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
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Search";
    var test_name = "tc_user_can_search_for_a_patient_when_putting_whitespace_anywhere_in_the_search_box_with_fiscal";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_user_can_search_for_a_patient_with_partial_or_full_nhs_number()
{
  try
  {
    var test_title = 'Patient Search: NHS Number - User can search for a patient with partial or full nhs number'
    login(5, "Shared");
    add_patient('nhsNum', 'search', 'M'); 
    
    var pat_name = get_patient_fullname();
    var full_nhs = get_patient_nhs();
    var start_nhs = aqString.GetChar(full_nhs, 0); 
    var half_nhs= aqString.SubString(full_nhs, 0, 5);
    
    var result_set = new Array();
    
    //Full fiscal code search
    var patient_found = inrstar_patient_search(full_nhs, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
    result_set.push(result_set_1);
    
    //First char fiscal code search - Need this to be stronger so need to pass in fiscal/name
    var patient_found = inrstar_patient_search(start_nhs, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
    result_set.push(result_set_1);
        
    //First half of the fiscal search
    var patient_found = inrstar_patient_search(half_nhs, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
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
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Search";
    var test_name = "tc_user_can_search_for_a_patient_with_partial_or_full_nhs_number";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_user_can_search_for_a_patient_when_putting_whitespace_anywhere_in_the_search_box_with_nhs_number()
{
  try
  {
    var test_title = 'Patient Search: Fiscal Code - User can search for a patient when putting whitespace anywhere in the search box with fiscal'
    login(5, "Shared");
    add_patient('fiscalWhiteSpace', 'search', 'M'); 
    
    var pat_name = get_patient_fullname();
    var full_nhs = get_patient_nhs();
    var first_half_nhs = aqString.SubString(full_nhs, 0, 5);
    var second_half_nhs = aqString.SubString(full_nhs, 5, 12);
    
    var nhs_whitespace_begin = "    " + full_nhs; 
    var nhs_whitespace_middle = first_half_nhs + "    " + second_half_nhs; 
    var nhs_whitespace_end = full_nhs + "    "; 
    var nhs_whitespace_all = "     " + first_half_nhs + "    " + second_half_nhs + "     "; 
    
    var result_set = new Array();
    
    //Fiscal whitespace beginning fiscal code search
    var patient_found = inrstar_patient_search(nhs_whitespace_begin, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
    result_set.push(result_set_1);
    
    //Fiscal whitespace middle fiscal code search
    var patient_found = inrstar_patient_search(nhs_whitespace_middle, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
    result_set.push(result_set_1);
        
    //Fiscal whitespace end fiscal code search
    var patient_found = inrstar_patient_search(nhs_whitespace_end, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
    result_set.push(result_set_1);
    
    //Fiscal whitespace all fiscal code search
    var patient_found = inrstar_patient_search(nhs_whitespace_all, pat_name);
    var result_set_1 = (patient_found == true) ? true : false;
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
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Search";
    var test_name = "tc_user_can_search_for_a_patient_when_putting_whitespace_anywhere_in_the_search_box_with_fiscal";
    handle_failed_tests(suite_name, test_name);
  }
}