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
function tc_home_page_view_overdue_inr_test_message()
{
  try
  {
    var test_title = "Home Page - View the 'Overdue an INR test' message"
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Overdue_INR_message', 'M', 'Shared');
    add_treatment_plan('W','Manual','','Shared','');
  
    //Get the patient details
    var message_name = get_patient_fullname();
  
    var result_set = new Array(); 
  
    //Check patient on the overdue INR test list
    var result_set_1 = check_patient_on_overdue_INR_list(message_name)
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off(); 
  } 
}
//-------------------------------------------------------------------------------- 
function tc_home_page_view_exceeded_suspension_period_message()
{
  try
  {
    var test_title = "Home Page - View the 'Exceeded suspension period' message"
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Exceed_suspension_period', 'M', 'Shared');
    add_treatment_plan('W','Manual','','Shared','');
  
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    suspend_patient_days(0);
    
    var result_set = new Array();
    var result_set_1 = check_patient_on_exceed_suspension_period_list(message_name)
    result_set.push(result_set_1);
    
    patient_search(pat_nhs);
    
    //Check the audit
    var result_set_1 = validate_top_patient_audit(test_title, "Suspend Patient");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off(); 
  } 
}
//-------------------------------------------------------------------------------- 
function tc_home_page_unsuspend_patient_through_message()
{
  try
  {
    var test_title = "Home Page - Unsuspend patient through message"
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Unsuspend_message', 'M', 'Shared');
    add_treatment_plan('W','Manual','','Shared','');
  
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    suspend_patient_days(0);
    var result_set = new Array(); 
  
    //Unsuspend the patient in the list
    var result_set_1 = unsuspend_patient_on_exceed_suspension_period_list(message_name);
    result_set.push(result_set_1);

    //Warning dialogue confirmation
    var expected_message = 'The patient(s) have been successfully unsuspended.' +
    'The patient(s) may have been treated elsewhere during the suspension period. ' +
    'For warfarin patients please ensure that any recent INR results and warfarin doses are entered as historical treatments. ' +
    'For non-warfarin patients you should ensure review information is up to date.';
     
    //Get warning message text
    var warning_message = process_popup("Unsuspend Patients","OK");
    
    result_set_1 = compare_values(warning_message, expected_message, test_title);
    result_set.push(result_set_1);
 
    patient_search(pat_nhs);
    
    //Check the audit
    result_set_1 = validate_top_patient_audit(test_title, "Unsuspend Patient");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off(); 
  } 
}
//--------------------------------------------------------------------------------
function tc_home_page_view_patient_transfer_request()
{
  try 
  {
    var test_title = "Home Page - View the 'Patient transfer requests'"
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Transfer_request', 'M', 'Shared');
    
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    //Transfer the testing location
    change_test_practice('Deans Regression Testing Location 2');
    Log_Off();
    
    //Login to transfered testing location
    login('cl3@regression2','INRstar_5','Shared');

    var result_set = new Array();
    
    //Check the patient transfer shows on the home page message
    var result_set_1 = check_patient_in_transfer_request_message(message_name)
    result_set.push(result_set_1);
    Log_Off();
    
    //Login to original location
    login('cl3@regression','INRstar_5','Shared');
    
    patient_search(pat_nhs);
    
    process_popup('Please Confirm', 'Confirm');
    
    //Check the audit
    result_set_1 = validate_top_patient_audit(test_title, "Requested change of patient's testing practice");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off(); 
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_accept_patient_transfer_request()
{
  try 
  {
    var test_title = "Home Page - View the 'Accept patient transfer requests'"
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Accept_transfer_request', 'M', 'Shared');
    
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
  
    //Transfer the testing location
    var test_prac = 'Deans Regression Testing Location 2';
    change_test_practice(test_prac);
    Log_Off();
    
    //Login to transfered testing location
    login('cl3@regression2','INRstar_5','Shared');

    var result_set = new Array();
    
    //Check the patient transfer shows on the home page message
    var result_set_1 = accept_patient_in_transfer_request_message(message_name)
    result_set.push(result_set_1);
    
    //Patient Management Testing Location check
    Goto_Patient_Management();
    var care_team_path = patient_management_care_team();
    var pat_testing_location = care_team_path.Panel(0).Label("TestingSectionId_DetachedLabel").innerText;
    result_set_1 = compare_values(pat_testing_location, test_prac, test_title);
    result_set.push(result_set_1);
    
    //Check the audit
    result_set_1 = validate_top_patient_audit(test_title, "Transfer patient testing location accepted");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off(); 
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_decline_patient_transfer_request()
{
  try 
  {
    var test_title = "Home Page - View the 'Decline patient transfer'";
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Decline_transfer_request', 'M', 'Shared');
    
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    //Transfer the testing location
    change_test_practice('Deans Regression Testing Location 2');
    Log_Off();
    
    //Login to transfered testing location
    login('cl3@regression2','INRstar_5','Shared');

    var result_set = new Array();
    
    //Decline the patient transfer on the home page message
    var result_set_1 = decline_patient_in_transfer_request_message(message_name)
    result_set.push(result_set_1);
    
    //Check the patient transfer removed on the home page message
    result_set_1 = check_patient_not_in_transfer_request_message(message_name)
    result_set.push(result_set_1);
    Log_Off();
    
    //Login to Sending location to Acknowledge declined transfer
    login('cl3@regression','INRstar_5','Shared');
    result_set_1 = acknowledge_declined_patient_in_message(message_name)
    result_set.push(result_set_1);
        
    result_set_1 = check_patient_not_in_decline_patient_transfer_request_message(message_name)
    result_set.push(result_set_1);
    
    //Check the audit
    patient_search(pat_nhs);
    result_set_1 = validate_top_patient_audit(test_title, "Transfer patient testing location declined Acknowledged");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off(); 
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_view_patient_transfer_requests_not_yet_accepted()
{
  try 
  {
    var test_title = "Home Page - View the 'Patient transfer requests not accepted'"
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Not_accepted_transfer', 'M', 'Shared');
    
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    //Transfer the testing location
    change_test_practice('Deans Regression Testing Location 2');
    
    var result_set = new Array();
    
    //Check the patient transfer shows on the home page message
    var result_set_1 = check_patient_in_transfer_request_not_accepted_message(message_name)
    result_set.push(result_set_1);
    
    patient_search(pat_nhs);
    
    process_popup('Please Confirm', 'Confirm');
    
    //Check the audit
    result_set_1 = validate_top_patient_audit(test_title, "Requested change of patient's testing practice");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off(); 
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_view_patient_with_incomplete_treatment()
{
  try 
  {
    var test_title = "Home Page - View the 'Patient with incomplete treatment'"
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Incomplete_treatment', 'M', 'Shared');
    add_treatment_plan('W','Hillingdon','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.3", "1.2", "0", "7", "2.5");
    add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
    
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    var result_set = new Array();
    
    //Check the patient incomplete treatment shows on the home page message
    var result_set_1 = check_patient_with_incomplete_treatment_message(message_name)
    result_set.push(result_set_1);
    
    patient_search(pat_nhs);
    
    //Check the audit
    result_set_1 = validate_top_patient_audit(test_title, "Add New INR");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off(); 
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_view_patient_with_no_diagnosis_or_tp()
{
  try 
  {
    var test_title = "Home Page - View the 'Patient with no diagnosis or TP'"
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'No_diagnosis', 'M', 'Shared');
    
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    result_set = new Array();
    
    //Check the patient shows on the home page message for No Diagnosis
    var result_set_1 = check_patient_with_no_diagnosis_or_tp_message(message_name)
    result_set.push(result_set_1);
    
    patient_search(pat_nhs);
    //Check the audit
    result_set_1 = validate_top_patient_audit(test_title, "Add Patient");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off(); 
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_view_overdue_non_warfarin_review_with_tp_but_no_review()
{
  try 
  {
    var test_title = "Home Page - View the 'Overdue a non warfarin review' - with TP but no DOAC review"
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Overdue_non_warf_review', 'M', 'Shared');
    add_treatment_plan('Apixaban','', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), -7)),'Shared','','Indefinite');
    
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    var result_set = new Array();
    
    //Check the patient shows on the home page message for Overdue non-warfarin review
    var result_set_1 = check_overdue_non_warfarin_review_message(message_name)
    result_set.push(result_set_1);
    
    patient_search(pat_nhs);
    //Check the audit
    result_set_1 = validate_top_patient_audit(test_title, "Add Treatment Plan Details");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off(); 
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_view_overdue_non_warfarin_review_with_tp_and_review_not_overdue()
{
  try 
  {
    var test_title = "Home Page - View the 'Overdue a non warfarin review' - with TP and review, not overdue"
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Not_overdue_non_warf_review', 'M', 'Shared');
    add_treatment_plan('Apixaban','', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), -150)),'Shared','','Indefinite');
    add_non_warfarin_review('','Y',aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), -1)),'65','100');
    
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    
    var result_set = new Array();
    //Check the patient does not shows on the home page message for Overdue non-warfarin review 
    var result_set_1 = check_patient_not_on_overdue_non_warfarin_review_message(message_name)
    result_set.push(result_set_1);
    
    patient_search(pat_nhs);
    //Check the audit
    result_set_1 = validate_top_patient_audit(test_title, "New review created");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off(); 
  }
}
//--------------------------------------------------------------------------------
function tc_home_page_view_overdue_non_warfarin_review_with_tp_and_not_overdue()
{
  try 
  {
    var test_title = "Home Page - View the 'Overdue a non warfarin review' - with TP and review, not overdue"
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Not_overdue_non_warf_review', 'M', 'Shared');
    add_treatment_plan('Apixaban','',aqConvert.StrToDate(aqDateTime.Today()),'Shared','','Indefinite');
    
    //Click cancel on the new review and set future date for next review
    var add_review_form_path = add_review_form();
    add_review_form_path.Panel(0).Panel("AnnualReviewAddActions").Button("CancelWarfarinReviewLink").click();
    Goto_Patient_Treatment_Plan_Review();
    edit_next_review_date(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), 7)));
    
    var result_set = new Array();
    
    //Check warning message displayed on change of review date
    var expected_message = "The patient's next review details have been successfully updated."
    var warning_message = get_next_review_date_warning();
    var result_set_1 = compare_values(warning_message, expected_message, test_title);
    result_set.push(result_set_1);
    
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
        
    //Check the patient does not shows on the home page message for Overdue non-warfarin review 
    result_set_1 = check_patient_not_on_overdue_non_warfarin_review_message(message_name)
    result_set.push(result_set_1);
    
    patient_search(pat_nhs);
    //Check the audit
    result_set_1 = validate_top_patient_audit(test_title, "Changed Next Review Date - Face-to-face.");
    result_set.push(result_set_1);
		
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
		
    //Pass in the result
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch (e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off(); 
  }
}
//--------------------------------------------------------------------------------
