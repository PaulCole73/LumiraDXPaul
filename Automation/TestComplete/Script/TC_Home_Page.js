//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Reviews
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Patient_Management
//USEUNIT Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_home_page_view_the_overdue_an_inr_test_message_on_the_home_page()
{
  try
  {
    var test_title = "Home Page - View the 'Overdue an INR test' message on the home page"
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Overdue_INR_message', 'M', 'Shared');
    add_treatment_plan('W','Manual','','Shared','');
  
    //Get the patient details
    var message_name = get_patient_fullname();
    
    //Prepare results vessel
    var result_set = new Array();
    
    //Check patient on the overdue INR test list
    var result_set_1 = check_patient_on_overdue_INR_list(message_name)
    result_set.push(result_set_1);
    
    //Check patients are listed with most overdue at top
    var result_set_1 = check_overdue_sort_order_of_home_page_list()
    result_set.push(result_set_1);
    
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
    
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_view_the_overdue_an_inr_test_message_on_the_home_page";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//-------------------------------------------------------------------------------- 
function tc_home_page_view_the_patient_exceeded_their_treatment_end_date_message()
{
  try
  {
    var test_title = "Home Page - View the 'Patient exceeded their treatment end date' message"
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Exceed_suspension_period', 'M', 'Shared');
    //add_treatment_plan('W','Manual','aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), -35))','Shared','');
    add_treatment_plan('Apixaban','', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), -35)),'Shared','','4 Weeks');
  
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    //Initialise test array
    var result_set = new Array();
    
    //Check Patient exists on list
    var result_set_1 = check_patient_on_exceeded_treatment_end_date_list(message_name)
    result_set.push(result_set_1);
    
    //Check patients are listed with most overdue at top
    var result_set_1 = check_date_sort_order_of_exceeded_treatment_end_date_list()
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_view_the_patient_exceeded_their_treatment_end_date_message";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//-------------------------------------------------------------------------------- 
function tc_home_page_view_the_exceeded_suspension_period_message()
{
  try
  {
    var test_title = "Home Page - View the 'Exceeded suspension period' message"
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Exceed_suspension_period', 'M', 'Shared');
    add_treatment_plan('W','Manual','','Shared','');
  
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    // Suspend Patient days
    suspend_patient_days(0);
    
    //Check Patient exists on list
    var results = check_patient_on_suspension_list(message_name)
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_view_the_exceeded_suspension_period_message";
    handle_failed_tests(suite_name, test_name); 
  }
}
//-------------------------------------------------------------------------------- 
function tc_home_page_unsuspend_button_patient_can_be_unsuspended_using_the_home_page_button()
{
  try
  {
    var test_title = "Home Page - Unsuspend Button, patient can be unsuspended using the home page button"
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Unsuspend_message', 'M', 'Shared');
    add_treatment_plan('W','Manual','','Shared','');
  
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    // Suspend Patient days
    suspend_patient_days(0);
    
    //Initialise test array
    var result_set = new Array();
    
    //Unsuspend the patient in the list
    var result_set_1 = unsuspend_patient_on_exceed_suspension_period_list(message_name);
    result_set.push(result_set_1);
    
    //Check the Unsuspend warning appears as expected
    var result_set_1 = check_unsuspend_warning_dialog_content();
    result_set.push(result_set_1);
    
    //Check the audit for Unsuspend Patient
    var result_set_1 = check_top_patient_audit(test_title, message_name, "Unsuspend Patient");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_unsuspend_button_patient_can_be_unsuspended_using_the_home_page_button";
    handle_failed_tests(suite_name, test_name);
  } 
}
//--------------------------------------------------------------------------------
function tc_home_page_view_the_patient_transfer_requests_to_accept_or_decline()
{
  try 
  {
    var test_title = "Home Page - View the 'Patient transfer requests to Accept or Decline'"
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Transfer_request', 'M', 'Shared');
    
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    //Transfer the testing location
    change_test_practice('Deans Regression Testing Location 2');
    
    //Logoff and then Login to transfered testing location
    Log_Off();
    login(15, "Shared");

    //Initialise test array
    var result_set = new Array();
    
    //Check the patient transfer message shows on the home page 
    var result_set_1 = check_home_page_displays_transfer_request_message()
    result_set.push(result_set_1);
    
    //Check the patient transfer shows on the home page message
    var result_set_1 = check_patient_in_transfer_request_list(message_name)
    result_set.push(result_set_1);
    
    //Logoff and then Login to original location
    Log_Off();
    login(5, "Shared");
    
    //Check the audit for Requested change of patient's testing practice
    var result_set_1 = check_top_patient_audit(test_title, message_name, "Requested change of patient's testing practice");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_view_the_patient_transfer_requests_to_accept_or_decline";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_accept_button_transfer_can_be_accepted_on_home_page()
{
  try 
  {
    var test_title = "Home Page - Accept button, transfer can be accepted on home page"
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Accept_transfer_request', 'M', 'Shared');
    
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    //Transfer the testing location
    var test_prac = "Deans Regression Testing Location 2";
    change_test_practice(test_prac);
    
    //Logoff and then Login to transfered testing location
    Log_Off();
    login(15, "Shared");

    //Initialise test array
    var result_set = new Array();
	
	  //Check can select accept patient transfer button on home page transfer list
    var result_set_1 = check_can_accept_patient_in_transfer_request(message_name)
    result_set.push(result_set_1);
    
    //Check patient registered practice shows correct location
    var result_set_1 = check_patient_registered_practice(message_name, test_prac, test_title)
    result_set.push(result_set_1);
    
    //Check the audit for Transfer patient testing location accepted
    var result_set_1 = check_top_patient_audit(test_title, message_name, "Transfer patient testing location accepted");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_accept_button_transfer_can_be_accepted_on_home_page";
    handle_failed_tests(suite_name, test_name); 
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_decline_button_transfer_can_be_declined_on_home_page()
{
  try 
  {
    var test_title = "Home Page - Decline button, transfer can be declined on home page";
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Decline_transfer_request', 'M', 'Shared');
    
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    //Transfer the testing location
    var test_prac = "Deans Regression Testing Location 2";
    change_test_practice(test_prac);
    
    //Logoff and then Login to transfered testing location
    Log_Off();
    login(15, "Shared");

    //Initialise test array
    var result_set = new Array();
	
	  //Decline patient transfer button on home page transfer list
    check_can_decline_patient_in_transfer_request(message_name)
    
    //Check the patient transfer removed on the home page transfer list
    var result_set_1 = check_patient_not_in_transfer_request_list(message_name)
    result_set.push(result_set_1);
    
    //Logoff and then Login to original testing location - to confirm decline at source
    Log_Off();
    login(5, "Shared");
    
    //Check patient is shown on declined transfer list
    var result_set_1 = check_patient_in_declined_transfer_list(message_name)
    result_set.push(result_set_1);
    
    //Check confirming acknowledgement of declined transfer removes patient from declined transfer list
    var result_set_1 = acknowledge_declined_patient_in_message(message_name)
    result_set.push(result_set_1);
    
    //Check the audit for Transfer patient testing location accepted
    var result_set_1 = check_top_patient_audit(test_title, message_name, "Transfer patient testing location declined Acknowledged");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_decline_button_transfer_can_be_declined_on_home_page";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_view_the_patient_transfer_requests_not_yet_accepted_message()
{
  try 
  {
    var test_title = "Home Page - View the 'Patient transfer requests not yet accepted' message"
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Transfer_request', 'M', 'Shared');
    
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    //Transfer the testing location
    change_test_practice('Deans Regression Testing Location 2');

    //Initialise test array
    var result_set = new Array();
    
    //Check the patient transfer request unaccepted message header shows on the home page
    var result_set_1 = check_home_page_displays_not_yet_been_accepted_message()
    result_set.push(result_set_1);
    
    //Check the patient transfer shows on the home page message
    var result_set_1 = check_patient_in_transfer_not_yet_been_accepted_list(message_name)
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_view_the_patient_transfer_requests_not_yet_accepted_message";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_view_the_patients_referred_to_you_for_further_action_message()
{
  try
  {
    var test_title = "Home Page - View the 'Patients referred to you for further action' message"
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'refer_treatment', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");    
    add_pending_maintenance_treatment(get_string_translation("2.0"),(aqDateTime.Today()));
    refer_pending_treatment(); 
  
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
  
    //Initialise test array
    var result_set = new Array();
    
    //Check patient on the referred list
    var result_set_1 = check_patient_on_refer_list(message_name)
    result_set.push(result_set_1);
    
    //Check the audit for Treatment Referred
    var result_set_1 = check_top_suggested_treatment_audit(message_name, "Treatment Referred");
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
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_view_the_patients_referred_to_you_for_further_action_message";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_view_the_patients_with_incomplete_treatment_message()
{
  try 
  {
    var test_title = "Home Page - View the 'Patient with incomplete treatment' message"
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Incomplete_treatment', 'M', 'Shared');
    add_treatment_plan('W','Hillingdon','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.3", "1.2", "0", "7", "2.5");
    add_pending_maintenance_treatment(get_string_translation("2.4"), aqConvert.StrToDate(aqDateTime.Today()));
    
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    //Initialise test array
    var result_set = new Array();
    
    //Check the patient incomplete treatment shows on the home page message
    var result_set_1 = check_patient_in_incomplete_treatment_list(message_name)
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_view_the_patients_with_incomplete_treatment_message";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_view_the_patients_with_no_diagnosis_or_treatment_plan_message()
{
  try 
  {
    var test_title = "Home Page - View the 'Patients with no diagnosis or treatment plan' message"
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'No_diagnosis', 'M', 'Shared');
    
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    //Check the patient shows on the home page message for No Diagnosis
    var results = check_patient_in_no_diagnosis_or_treatment_plan_message(message_name)
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_view_the_patients_with_no_diagnosis_or_treatment_plan_message";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_table_contents_overdue_a_non_wafarin_review_patient_with_a_doac_treatment_plan_but_no_doac_review()
{
  try 
  {
    var test_title = "Home Page - Table contents, Overdue a non wafarin review patient with a DOAC treatment plan but no DOAC review"
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Overdue_non_warf_review', 'M', 'Shared');
    add_treatment_plan('Apixaban','', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), -7)),'Shared','','Indefinite');
    
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    //Initialise test array
    var result_set = new Array();
    
    //Check the patient shows on the home page message for Overdue non-warfarin review
    var result_set_1 = check_patient_in_overdue_non_warfarin_review_list(message_name)
    result_set.push(result_set_1);
    
    //Check patients are listed with most overdue at top
    var result_set_1 = check_non_warfarin_review_sort_order_of_home_page_list()
    result_set.push(result_set_1);
    
    //Check days overdue for patient is 7 - since this reflecs treatment plan
    var result_set_1 = check_delay_day_of_patient_in_overdue_non_warfarin_review_list("7", message_name)
    result_set.push(result_set_1);
    
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_table_contents_overdue_a_non_wafarin_review_patient_with_a_doac_treatment_plan_but_no_doac_review";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_table_contents_overdue_a_non_wafarin_review_patient_with_a_doac_treatment_plan_with_a_review_and_a_next_review_date_that_is_not_overdue()
{
  try 
  {
    var test_title = "Home Page - Table contents, Overdue a non wafarin review patient with a DOAC treatment plan, with a review and a next review date that is not overdue"
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Not_overdue_non_warf_review', 'M', 'Shared');
    add_treatment_plan('Apixaban','', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), -150)),'Shared','','Indefinite');
    add_non_warfarin_review('','Y',aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), -1)),'65','100');
    
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    //Initialise test array
    var result_set = new Array();
    
    //Check the patient does not shows on the home page message for Overdue non-warfarin review 
    var result_set_1 = check_patient_not_on_overdue_non_warfarin_review_list(message_name)
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_table_contents_overdue_a_non_wafarin_review_patient_with_a_doac_treatment_plan_with_a_review_and_a_next_review_date_that_is_not_overdue";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_table_contents_overdue_a_non_wafarin_review_patient_with_a_doac_treatment_plan_without_a_review_and_a_next_review_date_that_is_not_overdue()
{
  try 
  {
    var test_title = "Home Page - Table contents, Overdue a non wafarin review patient with a DOAC treatment plan, without a review and a next review date that is not overdue"
    
    //Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Not_overdue_non_warf_review', 'M', 'Shared');
    add_treatment_plan('Apixaban','',aqConvert.StrToDate(aqDateTime.Today()),'Shared','','Indefinite');
    
    //Click cancel on the new review and set future date for next review
    cancel_review();
    Goto_Patient_Treatment_Plan_Review();
    edit_next_review_date(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), 7)));
        
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    //Initialise test array
    var result_set = new Array();
        
    //Check the patient does not shows on the home page message for Overdue non-warfarin review 
    var result_set_1 = check_patient_not_on_overdue_non_warfarin_review_list(message_name)
    result_set.push(result_set_1);
    
    //Check the audit for Changed Next Review Date - Face-to-face.
    var result_set_1 = check_top_patient_audit(test_title, message_name, "Changed Next Review Date - Face-to-face.");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch (e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Home_Page";
    var test_name = "tc_home_page_table_contents_overdue_a_non_wafarin_review_patient_with_a_doac_treatment_plan_without_a_review_and_a_next_review_date_that_is_not_overdue";
    handle_failed_tests(suite_name, test_name); 
  }
}
//--------------------------------------------------------------------------------







//wait for object testing/demo function
function test()
{
  login(5, "Shared");
  
  var INRstarV5 = INRstar_base();
  
  var obj_root = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  
  obj = wait_for_object(obj_root, "idStr", "PatientsWithNoDiagnosisHeaderLink", 4, 2);
  
  if(obj.Exists)
  {
    obj.Click();
    WaitSeconds(10);
  }
}















