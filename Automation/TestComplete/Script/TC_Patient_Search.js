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
    patient_search(pat_name);
    
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
function tc_user_can_search_for_a_patient_when_putting_whitespace_anywhere_in_the_search_box_with_nhs_fiscal()
{
  try
  {
    var test_title = 'Patient Search: Fiscal/NHS - User can search for a patient when putting whitespace anywhere in the search box with nhs or fiscal'
    login(5, "Shared");
    add_patient('whiteSpace', 'nhsSearch', 'M'); 
    var patient = get_patient_details_object_from_demographics();
    inrstar_make_patient_search_criteria_start_char_unique(patient);
    
    var full_nhs = patient.nhs_number;
    
    if(language == "English")
    {
     var first_half_nhs = aqString.SubString(full_nhs, 0, 5);
     var second_half_nhs = aqString.SubString(full_nhs, 5, 12);
    }
    else if(language == "Italian")
    {
     var first_half_nhs = aqString.SubString(full_nhs, 0, 5);
     var second_half_nhs = aqString.SubString(full_nhs, 5, 15);
    }
    
    var nhs_whitespace_begin = "    " + full_nhs; 
    var nhs_whitespace_middle = first_half_nhs + "    " + second_half_nhs; 
    var nhs_whitespace_end = full_nhs + "    "; 
    var nhs_whitespace_all = "     " + first_half_nhs + "    " + second_half_nhs + "     "; 
    
    var result_set = new Array();
    
    //Whitespace beginning code search
    get_patient_search_results(nhs_whitespace_begin, patient.fullname);
    var results_table = patient_search_screen_results_table();
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //Whitespace middle code search
    get_patient_search_results(nhs_whitespace_middle, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
        
    //Whitespace end code search
    get_patient_search_results(nhs_whitespace_end, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //Whitespace all code search
    get_patient_search_results(nhs_whitespace_all, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results,test_title); 
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Search";
    var test_name = "tc_user_can_search_for_a_patient_when_putting_whitespace_anywhere_in_the_search_box_with_nhs_fiscal";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_user_can_search_for_a_patient_when_putting_whitespace_at_the_beginning_or_end_within_the_search_box_with_patient_number()
{
  try
  {
    var test_title = 'Patient Search: Patient Number - User can search for a patient when putting whitespace anywhere in the search box with patient number'
    login(5, "Shared");
    add_patient('whiteSpace', 'patNumSearch', 'M'); 
    var patient = get_patient_details_object_from_demographics();
    inrstar_make_patient_search_criteria_start_char_unique(patient);
    
    var full_pat_num = patient.pat_number;
    var pat_num_whitespace_begin = "    " + full_pat_num; 
    var pat_num_whitespace_end = full_pat_num + "    "; 
    
    var result_set = new Array();
    
    //Whitespace beginning search
    get_patient_search_results(pat_num_whitespace_begin, patient.fullname);
    var results_table = patient_search_screen_results_table();
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
        
    //Whitespace end search
    get_patient_search_results(pat_num_whitespace_end, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results,test_title); 
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Search";
    var test_name = "tc_user_can_search_for_a_patient_when_putting_whitespace_at_the_beginning_or_end_within_the_search_box_with_patient_number";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_user_can_search_for_a_patient_when_putting_whitespace_at_the_beginning_or_end_within_the_search_box_with_surname()
{
  try
  {
    var test_title = 'Patient Search: Surname - User can search for a patient when putting whitespace at the beginning or end in the search box with surname'
    login(5, "Shared");
    add_patient('whiteSpace', 'surname', 'M'); 
    var patient = get_patient_details_object_from_demographics();
    inrstar_make_patient_search_criteria_start_char_unique(patient);
    
    var full_surname = patient.last_name;
    var surname_whitespace_begin = "    " + full_surname; 
    var surname_whitespace_end = full_surname + "    "; 
    
    var result_set = new Array();
    
    //Whitespace beginning search
    get_patient_search_results(surname_whitespace_begin, patient.fullname);
    var results_table = patient_search_screen_results_table();
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
        
    //Whitespace end search
    get_patient_search_results(surname_whitespace_end, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results,test_title); 
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Search";
    var test_name = "tc_user_can_search_for_a_patient_when_putting_whitespace_at_the_beginning_or_end_within_the_search_box_with_surname";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_user_can_search_for_a_patient_when_putting_whitespace_at_the_beginning_or_end_within_the_search_box_with_firstname()
{
  try
  {
    var test_title = 'Patient Search: Firstname - User can search for a patient when putting whitespace at the beginning or end in the search box with firstname'
    login(5, "Shared");
    add_patient('whiteSpace', 'surname', 'M'); 
    var patient = get_patient_details_object_from_demographics();
    inrstar_make_patient_search_criteria_start_char_unique(patient);
    
    var full_firstname = patient.first_name;
    var firstname_whitespace_begin = "    " + full_firstname; 
    var firstname_whitespace_end = full_firstname + "    "; 
    
    var result_set = new Array();
    
    //Whitespace beginning search
    get_patient_search_results(firstname_whitespace_begin, patient.fullname);
    var results_table = patient_search_screen_results_table();
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
        
    //Whitespace end search
    get_patient_search_results(firstname_whitespace_end, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results,test_title); 
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Search";
    var test_name = "tc_user_can_search_for_a_patient_when_putting_whitespace_at_the_beginning_or_end_within_the_search_box_with_firstname";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_user_can_search_for_a_patient_with_partial_or_full_nhs_fiscal()
{
  try
  {
    var test_title = 'Patient Search: Fiscal/NHS - User can search for a patient with partial or full nhs/fiscal'
    login(5, "Shared");
    add_patient('partial', 'search', 'M');   
    var patient = get_patient_details_object_from_demographics();
    inrstar_make_patient_search_criteria_start_char_unique(patient);
    
    var full_nhs = patient.nhs_number;
    var start_nhs = aqString.GetChar(full_nhs, 0); 
    var half_nhs= aqString.SubString(full_nhs, 0, 5);
    
    var result_set = new Array();
    
    //Full code search
    get_patient_search_results(full_nhs, patient.fullname);
    var results_table = patient_search_screen_results_table();
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //First char code search
    get_patient_search_results(start_nhs, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
        
    //First half of the code search
    get_patient_search_results(half_nhs, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results,test_title); 
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Search";
    var test_name = "tc_user_can_search_for_a_patient_with_partial_or_full_nhs_fiscal";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_user_can_search_for_a_patient_with_partial_or_full_patient_number()
{
  try
  {
    var test_title = 'Patient Search: Patient Number - User can search for a patient with partial or full patient number'
    login(5, "Shared");
    add_patient('patnum', 'search', 'M'); 
    var patient = get_patient_details_object_from_demographics();
    inrstar_make_patient_search_criteria_start_char_unique(patient);
    
    var full_pat_num = patient.pat_number;
    var start_pat_num = aqString.GetChar(full_pat_num, 0); 
    var half_pat_num = aqString.SubString(full_pat_num, 0, 5);
    
    var result_set = new Array();
    
    //Patient Number full code search
    get_patient_search_results(full_pat_num, patient.fullname);
    var results_table = patient_search_screen_results_table();
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //Patient Number first char code search
    get_patient_search_results(start_pat_num, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
        
    //Patient Number partial code search
    get_patient_search_results(half_pat_num, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results,test_title); 
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Search";
    var test_name = "tc_user_can_search_for_a_patient_with_partial_or_full_patient_number";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_user_can_search_for_a_patient_with_partial_or_full_surname()
{
  try
  {
    var test_title = 'Patient Search: Surname - User can search for a patient with partial or full surname'
    login(5, "Shared");
    add_patient('surname', 'search', 'M'); 
    var patient = get_patient_details_object_from_demographics();
    inrstar_make_patient_search_criteria_start_char_unique(patient);
    
    var full_surname = patient.last_name;
    var start_pat_surname = aqString.GetChar(full_surname, 0); 
    var half_pat_surname = aqString.SubString(full_surname, 0, 5);
    
    var result_set = new Array();
    
    //Full search
    get_patient_search_results(full_surname, patient.fullname);
    var results_table = patient_search_screen_results_table();
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //First char search
    get_patient_search_results(start_pat_surname, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
        
    //Partial search
    get_patient_search_results(half_pat_surname, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results,test_title); 
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Search";
    var test_name = "tc_user_can_search_for_a_patient_with_partial_or_full_surname";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_user_can_search_for_a_patient_with_partial_or_full_firstname()
{
  try
  {
    var test_title = 'Patient Search: Firstname - User can search for a patient with partial or full firstname'
    login(5, "Shared");
    add_patient('firstname', 'search', 'M'); 
    var patient = get_patient_details_object_from_demographics();
    inrstar_make_patient_search_criteria_start_char_unique(patient);
    
    var full_firstname = patient.first_name;
    var start_pat_firstname = aqString.GetChar(full_firstname, 0); 
    var half_pat_firstname = aqString.SubString(full_firstname, 0, 5);
    
    var result_set = new Array();
    
    //Full search
    get_patient_search_results(full_firstname, patient.fullname);
    var results_table = patient_search_screen_results_table();
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //First char search
    get_patient_search_results(start_pat_firstname, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
        
    //Partial search
    get_patient_search_results(half_pat_firstname, patient.fullname);
    var result_set_1 = check_patient_exists_in_table_within_column(0, results_table, patient.fullname);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results,test_title); 
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Patient_Search";
    var test_name = "tc_user_can_search_for_a_patient_with_partial_or_full_firstname";
    handle_failed_tests(suite_name, test_name);
  }
}
