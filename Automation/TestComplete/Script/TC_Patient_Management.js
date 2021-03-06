//USEUNIT Tested_Apps
//USEUNIT TSA_Patient
//USEUNIT TSA_Patient_Demographics
//USEUNIT TSA_Patient_Management
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Login
//USEUNIT Generic_Functions
//USEUNIT Navigation

//USEUNIT V5_Common
//--------------------------------------------------------------------------------
function tc_patient_deactivate_a_patient()
{
try
 {
  var test_title = 'Patient Management - De-activate a patient'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Deactivate_patient', 'M', 'Shared'); 
  
  result_set = new Array();
  
  //Checking the yellow pop up for deactivation
  var result_set_1 = check_deactivate_warning();
  result_set.push(result_set_1);
  
  //Checking the yellow banner message for deactivation
  process_confirm_sub('','De-Activating a patient');
  result_set_2 = deactivating_patient_banner_warning_checker('Deactivating this patient will archive all existing treatment information and will cancel any unsaved treatment results.');
  result_set.push(result_set_2);
  
  //Checking the red error when you dont select a reason
  var patient_management_deactivate_form_path = patient_management_deactivate_form();
  patient_management_deactivate_form_path.Panel(1).SubmitButton("Confirm").Click();
  result_set_3 = deactivating_patient_banner_error_checker('Please select the reason for deactivation');
  result_set.push(result_set_3);
  
  deactivate_patient();
 
  //Check the confirmation banner is displayed
  result_set_4 = deactivating_patient_confirmation_checker('The patient has been successfully deactivated');
  result_set.push(result_set_4);
  
  //Check the patient audit is written
  result_set_5 = display_top_patient_audit("Deactivate Patient");
  result_set.push(result_set_5);
  
  Log.Message(result_set)
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
//  Log.Message(results);
 
  //Pass in the final result
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
function tc_patient_reactivate_a_patient()
{
try
 {
  var test_title = 'Patient Management - Re-activate a patient'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Activate_patient', 'M', 'Shared'); 
  deactivate_patient();
  
  WaitSeconds(2);
  
  result_set = new Array();
  
  //Checking the tp page is displayed when clicking on activate
  var result_set_1 = check_tp_page_displayed_on_activate();
  result_set.push(result_set_1);

  reactivate_patient('W', 'Coventry','')
  //Check the confirmation banner is displayed
  var result_set_2 = activating_patient_confirmation_checker('This patient has successfully been reactivated, you will now need to' +
  ' enter the current warfarin dose and review period before using the system to calculate a new warfarin dose.');
  result_set.push(result_set_2);
  
  //Check the view all treatment buttons is disabled
  var all_treatment_button = view_all_treatments_button();
  var button = check_button(all_treatment_button);
  var result_set_3 = button_checker(button,'disabled','Patient - Re-activate a patient checking the view all treatment button');
  result_set.push(result_set_3);
  
  var result_set_4 = display_top_patient_audit("Activate Patient");
  result_set.push(result_set_4);
  
  Log.Message(result_set)
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
 
  //Pass in the final result
  results_checker(results, test_title); 

  Log_Off()
 }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  } 
} 
//--------------------------------------------------------------------------------
function tc_patient_amend_a_patient_to_be_a_manual_self_tester()
{
try
 {
  var test_title = 'Patient Management - Amend a patient to be a self tester'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'self_test_patient', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
  result_set = new Array();

  //Checking the yellow pop up
  var result_set_1 = check_self_test_warning();
  result_set.push(result_set_1);
  
  //Change to self tester
  add_manual_self_test_group();
  
  var result_set_2 = more_info_top_patient_audit('INR Self Tester set to [True');
  result_set.push(result_set_2);
  
  Log.Message(result_set)
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
 
  //Pass in the final result
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
function tc_patient_suspend_a_patient()
{
  try
  {
  var test_title = 'Patient Management - Suspend a patient'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'suspend_patient', 'M', 'Shared'); 
  
  result_set = new Array();

  //Checking the red error when you dont select a reason or date
  result_set_1 = check_suspend_errors()
  result_set.push(result_set_1);
  
  suspend_patient();
  
  //Check the confirmation banner is displayed
  var result_set_2 = suspend_patient_confirmation_checker('The patient has been successfully suspended');
  result_set.push(result_set_2);
  
  Goto_Patient_Audit();
  var result_set_3 = display_top_patient_audit("Suspend Patient");
  result_set.push(result_set_3);
  
  Log.Message(result_set)
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
 
  //Pass in the final result
  results_checker(results,test_title); 
  
  Log_Off();
  }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  } 
}
//--------------------------------------------------------------------------------
function tc_suspend_a_patient_user_unable_to_select_a_date_more_than_6_months_in_the_future()
{
 try
  {
  var test_title = 'Patient Management - Suspend a patient user unable to select a date more than 6 months in the future'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'suspend_limit', 'M', 'Shared'); 

  result_set = new Array();
  
  Goto_Patient_Suspend();
  
  //Set the variables for the active day check this is the day before the date becomes inactive
  var path = suspend_pat_form();
  var active_date = (aqConvert.StrToDate(aqDateTime.AddMonths(aqDateTime.Today(), (+6))));  // 6 months in the future   
  Log.Message(active_date);
  
  var date_active_status = date_picker_status_day(path,active_date,'1');
  Log.Message(date_active_status);
  
  result_set_1 = check_status_date_picker(date_active_status,'active')
  result_set.push(result_set_1);
  
  //Set the variables for the inactive day the following day after the last active day
  Goto_Patient_Suspend();
  Log.Message(active_date)
  var inactive_date = (aqConvert.StrToDate(aqDateTime.AddDays(active_date, (+1))));  // 6 months in the future plus 1 day   
  Log.Message(inactive_date);
  
  var date_inactive_status = date_picker_status_day(path,inactive_date,'0');
  Log.Message(date_inactive_status);
  
  result_set_2 = check_status_date_picker(date_inactive_status,'inactive')
  result_set.push(result_set_2);
  
  Log.Message(result_set)
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
 
  //Pass in the final result
  results_checker(results,test_title); 

 Log_Off();
  }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  } 
} 
//--------------------------------------------------------------------------------
function tc_patient_unsuspend_a_patient()
{
 try
 {
  var test_title = 'Patient Management - Unsuspend a patient'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Unsuspend_patient', 'M', 'Shared'); 
  suspend_patient(); 
  WaitSeconds(2);
  unsuspend_patient();
  
  result_set = new Array();
  
  //Check the confirmation banner is displayed
  var result_set_1 = suspend_patient_confirmation_checker('The patient has been successfully unsuspended.' +
  '\nThe patient may have been treated elsewhere during the suspension period. For warfarin patients please ensure that any recent' +
  ' INR results and warfarin doses are entered as historical treatments. For non-warfarin patients you should ensure review information is up to date.');
  result_set.push(result_set_1);
  
  Goto_Patient_Audit();
  var result_set_2 = display_top_patient_audit("Unsuspend Patient");
  result_set.push(result_set_2);
  
  Log.Message(result_set)
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
 
  //Pass in the final result
  results_checker(results,test_title); 
  
  Log_Off();
  }
  catch(e){
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  } 
}
//--------------------------------------------------------------------------------
function tc_patient_change_the_patients_registered_practice()
{
  try
  {
  var test_title = 'Patient Management - Change the patients registered practice'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Registered_practice', 'M', 'Shared'); 
  
  var reg_prac = 'Deans Regression Testing Location 2'
  change_reg_practice(reg_prac);
  WaitSeconds(2)
  
  result_set = new Array();
  
  //Check the confirmation banner is displayed
  var result_set_1 = patient_confirmation_checker('The patient(s) registered practice has been successfully changed.');
  result_set.push(result_set_1);
  
  //Check the reg practice been updated on tab
  var reg_prac_after = get_patient_reg_prac();
  var result_set_2 = data_checker(reg_prac,reg_prac_after)
  result_set.push(result_set_2);
  
  var result_set_3 = display_top_patient_audit('Changed patient\'s registered practice');
  result_set.push(result_set_3);
  
  Log.Message(result_set)
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
 
  //Pass in the final result
  results_checker(results,test_title); 
   
   Log_Off() 
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   } 
} 
//--------------------------------------------------------------------------------
function tc_transfer_a_patient_who_has_a_pending_treatment()
{
  try
  {
  var test_title = 'Patient Management - Transfer a patient who has a pending treatment'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Transfer_pending', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
  add_pending_manual_treatment('2.5','Lab','2.0','7 Days');
  
  //Check the error pop up is displayed
  var result = check_transfer_test_location_errors();
  
    //Pass in the result
  results_checker(result,test_title); 
  
  var pop_up_buttons_path = ok_error_pop_up_buttons();
  pop_up_buttons_path.Button(0).TextNode(0).Click();
  
  Log_Off(); 
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }
}
//--------------------------------------------------------------------------------
function tc_transfer_a_patient_where_the_patient_will_be_a_duplicate_of_an_existing_inactive_patient_at_the_destination_location()
{
try
 {
  var test_title = 'Patient Management - Transfer a patient where the patient will be a duplicate of an existing INACTIVE patient at the destination location'
  
  //Adding the patient that is the duplicate at test location
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Transfer_inactive_patient', 'M', 'Shared'); 
  var nhs_num_one = get_patient_nhs();
  deactivate_patient();
  Log_Off();
  
  //Add second duplicate and send to the test location
  login('cl3@regression2','INRstar_5','Shared');
  add_patient('Regression', 'Trans_inactive_pat', 'M', 'Shared',nhs_num_one); 
  
  var patFirstname = get_patient_first_name();
  var patSurname = get_patient_surname();
  var messagename = (patSurname + ", " + patFirstname);
  
  var test_prac = 'Deans Regression Testing Location'
  change_test_practice(test_prac);
  WaitSeconds(2);
  Log_Off();
  login('cl3@regression','INRstar_5','Shared');

  result_set = new Array();
  
  //Check the warning is displayed and accept the transfer
  var result_set_1 = accept_transfer_with_warning(messagename);
  result_set.push(result_set_1);
  
  //Check the test practice been updated on management tab
  var test_prac_after = get_patient_test_prac();
  var result_set_2 = data_checker(test_prac,test_prac_after)
  result_set.push(result_set_2);
  
  //Check the audit for accepting the transfer
  var result_set_3 = display_top_patient_audit('Transfer patient testing location accepted');
  result_set.push(result_set_3);
  
  Log.Message(result_set)
  
//  Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
 
//  Pass in the final result
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
function tc_transfer_a_patient_who_is_on_an_induction_protocol()
{
try
 {
  var test_title = 'Patient Management - Transfer a patient who is on an induction protocol'
  
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Transfer_induction_patient', 'M', 'Shared'); 
  var patFirstname = get_patient_first_name();
  var patSurname = get_patient_surname();
  var messagename = (patSurname + ", " + patFirstname);
  WaitSeconds(2);
  add_treatment_plan('W','Fast','','Shared','');
 
  result_set = new Array();
  
  //Check the warning pop up is displayed
  var result_set_1 = check_transfer_test_location_warning();
  result_set.push(result_set_1);
  
  var test_prac = 'Deans Regression Testing Location 2'
  change_test_practice_with_warning(test_prac);
  
  Log_Off();
  login('cl3@regression2','INRstar_5','Shared');
  
  //Accept the transfer
  var result_set_2 = accept_transfer(messagename);
  result_set.push(result_set_2);
  
  //Check the audit for accepting the transfer
  var result_set_3 = display_top_patient_audit('Transfer patient testing location accepted');
  result_set.push(result_set_3);
  
  Log.Message(result_set)
  
//  Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
 
//  Pass in the final result
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
function tc_reactivate_a_potential_duplicate_patient()
{
try
 {
  var test_title = 'Patient Management - Re-activate a potential duplicate patient'
  
  //Adding patient and making them inactive
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'reactivate_dup_patient', 'M', 'Shared'); 
  var patFirstname_one = get_patient_first_name();
  var patSurname_one = get_patient_surname();
  var nhs_num_one = get_patient_nhs();
  deactivate_patient();
  Log_Off();
  
  //Add second duplicate and send to the test location
  login('cl3@regression2','INRstar_5','Shared');
  add_patient('Regression', 'Trans_inactive_pat', 'M', 'Shared',nhs_num_one);
  var patFirstname = get_patient_first_name();
  var patSurname = get_patient_surname();
  var messagename = (patSurname + ", " + patFirstname);
  var nhs_num = get_patient_nhs();
  var test_prac = 'Deans Regression Testing Location'
  change_test_practice(test_prac);
  WaitSeconds(2);
  Log_Off();
  
  //Log back in accept transfer then try to reactivate the patient
  login('cl3@regression','INRstar_5','Shared');
  accept_transfer_with_warning(messagename);
  inactive_patient_search(patSurname_one);
  Goto_Patient_Management();
  var pat_managment_tab_status_buttons_path = pat_managment_tab_status_buttons();
  pat_managment_tab_status_buttons_path.Button("ActivatePatientButton").Click(); 

  //Check the error is displayed
  var result = activating_patient_error_checker('This patient may already exist at this location as ' + patSurname + ', ' + patFirstname + ' ['+ nhs_num + ']');
  
  //Validate the result set
  results_checker(result, test_title); 
  
  Log_Off();
 }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  }
} 
//--------------------------------------------------------------------------------
function tc_suspending_an_overdue_patient_removes_them_from_the_overdue_report()
{
try
 {
  var test_title = 'Patient Management - Suspending an overdue patient removes them from the overdue report'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'overdue_suspend_patient', 'M', 'Shared'); 
  add_treatment_plan('W','Manual',aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))),'Shared','');
  var patFirstname = get_patient_first_name();
  var patSurname = get_patient_surname();
  var messagename = (patSurname + ", " + patFirstname);
  
  //Check the patient is displayed on the overdue report
  result_set = new Array();
  var result_set_1 = find_patient_overdue_list(messagename);
  
  patient_search(patSurname);
  suspend_patient();
  
  //Check the patient is now not on the overdue list
  var result_set_2 = dont_find_patient_overdue_list(messagename);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
 
  //Pass in the final result
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


//--------------------------------------------------------------------------------


