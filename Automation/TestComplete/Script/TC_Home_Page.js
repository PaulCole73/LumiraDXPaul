﻿//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Reviews
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Patient_Management
//USEUNIT Generic_Functions
//USEUNIT Navigation
//USEUNIT Test_Audit
//USEUNIT Create_Clinics
//--------------------------------------------------------------------------------
function tc_View_Overdue_INR_Test_Message()
{
 try
   {
    var test_title = 'Home Page - View the \'Overdue an INR test\' message'
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Overdue_INR_message', 'M', 'Shared');
    add_treatment_plan('W','Manual','','Shared','');
  
    //Get the patient details
    var patFirstname = get_patient_first_name();
    var patSurname = get_patient_surname();
    var message_name = (patSurname + ", " + patFirstname);
    Log.Message(message_name);
    
    var INRstarV5 = INRstar_base(); 
    Goto_Report_Overdue(INRstarV5);
  
    result_set = new Array(); 
  
    //Check patient on the overdue INR test list
    var result_set_1 = check_patient_on_overdue_INR_list(message_name)
    result_set.push(result_set_1);
		
		//Validate the results sets is True
		var results = results_checker_are_true(result_set);
		Log.Message(results);
		
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
function tc_View_Exceeded_Suspension_Period_Message()
{
 try
   {
    var test_title = 'Home Page - View the \'Exceeded suspension period\' message'
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Exceed_suspension_period', 'M', 'Shared');
    add_treatment_plan('W','Manual','','Shared','');
  
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var patFirstname = get_patient_first_name();
    var patSurname = get_patient_surname();
    var message_name = (patSurname + ", " + patFirstname);
    Log.Message(message_name);
    
    var num_of_days_from_today = 0;
    suspend_patient_days(num_of_days_from_today);
    
    var INRstarV5 = INRstar_base();
    Goto_Home(INRstarV5);
  
    result_set = new Array(); 
  
    //Check patient on the exceed suspension period list
    var result_set_1 = check_patient_on_exceed_suspension_period_list(message_name)
    Log.Message(result_set_1);
    result_set.push(result_set_1);
    
    patient_search(pat_nhs);
    
    //Check the audit
    WaitSeconds(1);
    Goto_Patient_Audit();
    var result_set_2 = display_top_patient_audit("Suspend Patient");
    Log.Message(result_set_2);
    result_set.push(result_set_2);
		
		//Validate the results sets is True
		var results = results_checker_are_true(result_set);
		Log.Message(results);
		
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
function tc_Unsuspend_Patient_Through_Message()
{
 try
   {
    var test_title = 'Home Page - Unsuspend patient through message'
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Unsuspend_message', 'M', 'Shared');
    add_treatment_plan('W','Manual','','Shared','');
  
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var patFirstname = get_patient_first_name();
    var patSurname = get_patient_surname();
    var message_name = (patSurname + ", " + patFirstname);
    Log.Message(message_name);
    
    var num_of_days_from_today = 0;
    suspend_patient_days(num_of_days_from_today);
    
    var INRstarV5 = INRstar_base();
    Goto_Home(INRstarV5);  
    result_set = new Array(); 
  
    //Unsuspend the patient in the list
    var result_set_1 = unsuspend_patient_on_exceed_suspension_period_list(message_name);
    Log.Message(result_set_1);
    result_set.push(result_set_1);
    
    //Warning dialogue confirmation
    var expected_message_1 = 'The patient(s) have been successfully unsuspended.';
    var expected_message_2 = 'The patient(s) may have been treated elsewhere during the suspension period. ' +
    'For warfarin patients please ensure that any recent INR results and warfarin doses are entered as historical treatments. ' +
    'For non-warfarin patients you should ensure review information is up to date.';
     
    //Get warning message text
    var warning_message_1_path = INRstarV5.Panel(3).Panel("modalDialogBox").Panel(0).TextNode(0);
    var error_message_text_1 = warning_message_1_path.innertext;
    var result_set_2 = test_data(error_message_text_1, expected_message_1, test_title);
    Log.Message(result_set_2);
    result_set.push(result_set_2);
    
    var warning_message_2_path = INRstarV5.Panel(3).Panel("modalDialogBox").Panel(0).TextNode(1)
    var error_message_text_2 = warning_message_2_path.innertext;
    var result_set_3 = test_data(error_message_text_2, expected_message_2, test_title);
    Log.Message(result_set_3);
    result_set.push(result_set_3);
    
    //Click OK button on warning message
    var pop_up_buttons_path = ok_error_pop_up_buttons();
    pop_up_buttons_path.Button(0).TextNode(0).Click();
        
    patient_search(pat_nhs);
    
    //Check the audit
    WaitSeconds(1);
    Goto_Patient_Audit();
    var result_set_4 = display_top_patient_audit("Unsuspend Patient");
    Log.Message(result_set_4);
    result_set.push(result_set_4);
		
		//Validate the results sets is True
		var results = results_checker_are_true(result_set);
		Log.Message(results);
		
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
function tc_View_Patient_Transfer_Request()
{
  try 
  {
    var test_title = 'Home Page - View the \'Patient transfer requests\''
    login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Transfer_request', 'M', 'Shared');
    
    //Get the patient details
    var pat_nhs = get_patient_nhs();
    var patFirstname = get_patient_first_name();
    var patSurname = get_patient_surname();
    var message_name = (patSurname + ", " + patFirstname);
    Log.Message(message_name);
    
    //Transfer the testing location
    var test_prac = 'Deans Regression Testing Location 2'
    change_test_practice(test_prac);
    WaitSeconds(2);
    Log_Off();
    
    //Login to transfered testing location
    login('cl3@regression2','INRstar_5','Shared');

    result_set = new Array();
    
    //Check the patient transfer shows on the home page message
    var result_set_1 = check_patient_in_transfer_request_message(message_name)
    Log.Message(result_set_1);
    result_set.push(result_set_1);
    Log_Off();
    
    //Login to original location
    login('cl3@regression','INRstar_5','Shared');
    
    patient_search(pat_nhs);
    
    process_popup('Please Confirm', 'Confirm');
    
    //Check the audit
    WaitSeconds(1);
    Goto_Patient_Audit();
    var result_set_2 = display_top_patient_audit("Requested change of patient's testing practice");
    Log.Message(result_set_2);
    result_set.push(result_set_2);
		
		//Validate the results sets is True
		var results = results_checker_are_true(result_set);
		Log.Message(results);
		
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