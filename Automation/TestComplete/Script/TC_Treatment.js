//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Reviews
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Patient_Management
//USEUNIT TSA_Patient_Demographics
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//USEUNIT Popup_Handlers
//--------------------------------------------------------------------------------
function tc_treatment_add_a_historic_treatment()
{
  try
  {
    var test_title = 'Treatment - Add a historic treatment'
    login(5, "Shared");
    add_patient('Regression', 'Add_historic', 'M', 'Shared'); 
    add_treatment_plan('W','Manual','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
    var result_set = new Array(); 
    var treatment_data = new Array();
    var formatted_inr_date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(),(-7)), "%d-%b-%Y");
    var formatted_ntd = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y");
  
    treatment_data.push(formatted_inr_date, "2.0", "2.0", "", "0", "7", "", formatted_ntd, "-"); 
    var treatment_row = get_treatment_row(0);
  
    var result_set_1 = checkArrays(treatment_data, treatment_row, test_title);
    result_set.push(result_set_1);
  
    //Check the audit for adding the treatment
    result_set_1 = validate_top_patient_audit(test_title, "Add Historical Treatment");
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_add_a_historic_treatment";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_treatment_add_a_manual_INR()
{
  try
  {
    var test_title = 'Treatment - Add a manual INR'
    login(7, "Shared");
    add_patient('Regression', 'Manual_treatment', 'M', 'Shared'); 
    add_treatment_plan('W','Manual','','Shared','');
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))),'2.0','2.5','7');

    var result_set = new Array(); 
    var treatment_data = new Array();
    var formatted_inr_date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(),(-3)), "%d-%b-%Y");
    var formatted_ntd = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(),(+4)), "%d-%b-%Y");
  
    treatment_data.push(formatted_inr_date, "2.0", "2.5", "", "0", "7", "", formatted_ntd, "-");
    var treatment_row = get_treatment_row(0);
  
    var result_set_1 = checkArrays(treatment_data, treatment_row, test_title);
    result_set.push(result_set_1);
  
    //Check the audit for adding the treatment
    result_set_1 = validate_top_patient_audit(test_title, "Add Manual Treatment");
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_add_a_manual_INR";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_treatment_manual_dosing_permissions()
{
  try
  {
    var test_title = 'Treatment - Manual dosing permissions'
    login(4, "Shared");
    add_patient('Regression', 'Manual_permissions', 'M', 'Shared'); 
    add_treatment_plan('W','Manual','','Shared','');
 
    var result_set = new Array(); 
    var new_inr_button = new_inr_button_path();
    var button = new_inr_button.enabled;

    var result_set_1 = button_checker(button, 'disabled', 'Testing cl2 level user cannot click new inr for manual dosing');
    result_set.push(result_set_1);
  
    var pat_nhs = get_patient_nhs();
    Log_Off();
    login(5, "Shared");
    patient_search(pat_nhs);
    add_pending_manual_treatment('2.5','Lab','2.0','7 Days');
    Log_Off();
    login(4, "Shared");
    patient_search(pat_nhs);
  
    var save_inr_button_path = save_inr_button();
    button = save_inr_button_path.enabled;
  
    result_set_1 = button_checker(button,'disabled','Testing cl2 level user cannot click save inr on pending treatment for manual dosing');
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_manual_dosing_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_treatment_induction_dosing_permissions()
{
  try
  {
    var test_title = 'Treatment - Induction dosing permissions'
    login(5, "Shared");
    add_patient('Regression', 'Induction_permissions', 'M', 'Shared'); 
    add_treatment_plan('W','Oates','','Shared','');
    add_pending_induction_slow_treatment('1.2','Shared');
    
    result_set = new Array(); 
  
    var button = save_inr_button().enabled;
    var result_set_1 = button_checker(button, "enabled", "Testing cl3 level user can see new inr button enabled for induction dosing");
    result_set.push(result_set_1);
  
    var pat_nhs = get_patient_nhs();
    Log_Off();
    login(4, "Shared");
    patient_search(pat_nhs);
  
    button = save_inr_button().enabled;
    result_set_1 = button_checker(button, "disabled", "Testing cl2 level user cannot click new inr for induction dosing");
    result_set.push(result_set_1);
    
    Log_Off();
    login(3, "Shared");
    patient_search(pat_nhs);
  
    button = save_inr_button().enabled;
    result_set_1 = button_checker(button, "disabled", "Testing cl1 level user cannot click new inr for induction dosing");
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_induction_dosing_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_treatment_add_a_treatment_comment()
{
  try
  {
    var test_title = 'Treatment - Add a treatment comment'
    login(4, "Shared");
    add_patient('Regression', 'Treatment_comment', 'M', 'Shared'); 
    add_treatment_plan('W','Hillingdon','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
    var comment = "regression testing comments field"
    add_treatment_comment(comment);
  
    result_set = new Array(); 
  
    //Check the audit for adding the treatment
    var result_set_1 = validate_more_info_top_treatment_audit('Comments set to ['+ comment + ']');
    result_set.push(result_set_1);
  
    //Validate the results sets are true
    var results = results_checker_are_true(result_set); 
    Log.Message(results);
    
    //Pass in the result
    results_checker(results,test_title);
  
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_add_a_treatment_comment";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------
function tc_treatment_add_a_new_maintenance_in_range_inr()
{
  try
  {
    var test_title = 'Treatment - Add a new Maintenance in-range INR';
    login(4, "Shared");
    add_patient('Regression', 'treatment_inrange', 'M', 'Shared'); 
    add_treatment_plan('W','Hillingdon','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    add_maintenance_treatment('2.5',aqConvert.StrToDate(aqDateTime.Today()));
  
    var result_set = new Array(); 
    var treatment_data = new Array();
    var formatted_inr_date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y");
  
    var formatted_ntd = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(),(+14)), "%d-%b-%Y");
    treatment_data.push(formatted_inr_date, "2.5", "2.0", "2.0", "0", "14", "14", formatted_ntd, "-");
  
    //Get the treatment data from the treatment table
    var treatment_row = get_treatment_row(1);
  
    var result_set_1 = checkArrays(treatment_data, treatment_row, test_title);
    result_set.push(result_set_1);
  
    //Check the audit for adding the treatment
    result_set_1 = validate_top_patient_audit(test_title, "Add New INR");
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_add_a_new_maintenance_in_range_inr";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------
function tc_treatment_add_a_historical_treatment_to_an_induction_patient()
{
  try
  {
    var test_title = 'Treatment - Add a historical treatment to an induction patient';
    login(5, "Shared");
    add_patient('Regression', 'historic_induction', 'M', 'Shared'); 
    add_treatment_plan('W','Oates','','Shared','');
    click_historic_button();
  
    var result_set = new Array(); 
    var actual_warn_mess = process_popup("Please Confirm", "Confirm");
    var expected_warn_mess = "Adding a historical treatment to this patient will remove them from this induction protocol. The patient must be treated by manual dosing.";
    var result_set_1 = compare_values(actual_warn_mess, expected_warn_mess, test_title); 
    result_set.push(result_set_1);
  
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
    //Check the yellow banner message
    WaitSeconds(6);
    result_set_1 = banner_checker("The patient's dosing method is currently set to : No Protocol");
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_add_a_historical_treatment_to_an_induction_patient";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------
function tc_treatment_no_treatment_can_be_added_to_a_patient_on_no_protocol()
{
  try
  {
    var test_title = 'Treatment - No treatment can be added to a patient on no protocol';
    login(5, "Shared");
    add_patient('Regression', 'no_protocol_pat', 'M', 'Shared'); 
    add_treatment_plan('W','Oates','','Shared','');
  
    result_set = new Array(); 

    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
    Goto_Patient_New_INR();
    var actual_error_mess = get_treatment_error_banner();
    var expected_error_mess = "The patient currently has no dosing method, you will need to update their treatment plan details before you can dose the patient."; 
    var result_set_1 = compare_values(actual_error_mess, expected_error_mess, test_title); 
    result_set.push(result_set_1);
   
    var sugg_war_dose_button_path = sugg_war_dose_button();
    var button = sugg_war_dose_button_path.enabled;
    result_set_1 = button_checker(button, "disabled", test_title);
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_no_treatment_can_be_added_to_a_patient_on_no_protocol";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------
function tc_treatment_user_cannot_override_an_induction_result()
{
  try
  {
    var test_title = 'Treatment - user cannot override an induction result';
    login(5, "Shared");
    add_patient('Regression', 'override_induction', 'M', 'Shared'); 
    add_treatment_plan('W','Oates','','Shared','');
  
    result_set = new Array(); 
  
    add_pending_induction_slow_treatment('1.0','Shared')
  
    var button = override_button().enabled;
    var result_set_1 = button_checker(button, "disabled", "Treatment - user cannot override an induction result");
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_user_cannot_override_an_induction_result";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------
function tc_treatment_adding_a_result_earlier_than_last_recorded_result()
{
  try
  {
    var test_title = 'Treatment - Adding a result earlier than last recorded result';
    login(5, "Shared");
    add_patient('Regression', 'treatment_dated_before', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))), "2.0", "2.0", "0", "7", "2.5");
    add_pending_maintenance_treatment('2.5',aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-2))))
  
    result_set = new Array(); 
  
    var actual_error_mess = get_treatment_error_banner();
    var expected_error_mess = "You cannot add a treatment with a date that is older than the patient's latest treatment date.";
    var result_set_1 = compare_values(actual_error_mess, expected_error_mess, test_title); 
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_adding_a_result_earlier_than_last_recorded_result";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------
function tc_treatment_user_is_unable_to_add_two_treatments_for_the_same_day_when_on_maintenance()
{
  try
  {
    var test_title = 'Treatment - User is unable to add two treatments for the same day when on maintenance';
    login(5, "Shared");
    add_patient('Regression', 'treatment_same_day', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))), "2.0", "2.0", "0", "7", "2.5");
    add_pending_maintenance_treatment('2.5',aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))))
  
    result_set = new Array(); 
  
    var actual_error_mess = get_treatment_error_banner();
    var expected_error_mess = "This patient already has an INR result recorded on this date. It is not possible to enter more" +
                             " than one INR result on the same day unless the patient is being dosed manually.";
    var result_set_1 = compare_values(actual_error_mess, expected_error_mess, test_title);   
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_user_is_unable_to_add_two_treatments_for_the_same_day_when_on_maintenance";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------
function tc_treatment_add_a_new_maintenance_low_inr()
{
  try
  {
    var test_title = 'Treatment - Add a new maintenance low INR';
    login(5, "Shared");
    add_patient('Regression', 'mainteance_low', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))), "2.0", "2.0", "0", "7", "2.5");
    add_pending_maintenance_treatment_pop_up_checker('1.9',aqConvert.StrToDate(aqDateTime.Today()));
  
    result_set = new Array(); 
  
    var actual_error_mess = process_alternate_popup("Please acknowledge", "Confirm");
    var expected_error_mess = "Low INR warning: Patient may be at increased risk of thromboembolic events until INR is back in-range." + 
                     " Consult clinical lead for advice about the use of LMWH for very low INR if clinically appropriate.";      
    var result_set_1 = compare_values(actual_error_mess, expected_error_mess, test_title);  
    result_set.push(result_set_1);
  
    //Finish saving the treatment
    var pending_treatment_buttons_path = pending_treatment_buttons();
    pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
  
    //Check the audit for adding the treatment
    result_set_1 = validate_top_patient_audit(test_title, "Add New INR");
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_add_a_new_maintenance_low_inr";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------
function tc_treatment_add_a_new_maintenance_high_inr()
{
  try
  {
    //this test currently fails in hoth - because the dosing warning message has been changed
    var test_title = 'Treatment - Add a new maintenance high INR';
    login(5, "Shared");
    
    var dosing_data = new Array();
    dosing_data = get_dosing_settings_data(3);
    
    add_patient('Regression', 'mainteance_high', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))), "2.0", "2.0", "0", "7", "2.5");
    add_pending_maintenance_treatment_pop_up_checker("4.0",aqConvert.StrToDate(aqDateTime.Today()));
  
    var result_set = new Array();
    
    var actual_error_mess = process_alternate_popup("Please acknowledge", "Confirm");
    var expected_error_mess = dosing_data[0];
    var result_set_1 = compare_values(actual_error_mess, expected_error_mess, test_title);  
    result_set.push(result_set_1);
  
    //Finish saving the treatment
    var pending_treatment_buttons_path = pending_treatment_buttons();
    pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
  
    //Check the audit for adding the treatment
    result_set_1 = validate_top_patient_audit(test_title, "Add New INR");
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_add_a_new_maintenance_high_inr";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------
function tc_treatment_out_of_range_maintenance_permissions()
{
  try
  {
    var test_title = 'Treatment - Out of Range maintenance permissions'
    login(4, "Shared");
    add_patient('Regression', 'out_of_range_permissions', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    add_pending_maintenance_treatment('5.0',(aqDateTime.Today()));
 
    result_set = new Array(); 
  
    var button = save_inr_button().enabled;
    var result_set_1 = button_checker(button, "enabled", "Testing cl2 level user can click save inr button for out of range treatment");
    result_set.push(result_set_1);
  
    var pat_nhs = get_patient_nhs();
    Log_Off();
  
    login(3, "Shared");
    patient_search(pat_nhs);
  
    button = save_inr_button().enabled;
    result_set_1 = button_checker(button, "disabled", "Testing cl1 level user cannot click save inr button for out of range treatment");
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_out_of_range_maintenance_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_treatment_delete_the_last_treatment()
{
  try
  {
    var test_title = 'Treatment - Delete the last treatment'
    login(5, "Shared");
    add_patient('Regression', 'delete_treatment', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
 
    var result_set = new Array(); 
    var formatted_inr_date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (-7)), "%d-%b-%Y");
    var exp_message = 'Please confirm you want to delete the treatment added on the ' + formatted_inr_date + '.';
    
    var message = delete_treatment();
  
    var result_set_1 = compare_values(exp_message, message, test_title);
    result_set.push(result_set_1);
  
    //Check the audit for adding the treatment
    result_set_1 = validate_top_patient_audit(test_title, "Treatment Deleted");
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_delete_the_last_treatment";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_treatment_refer_a_treatment()
{
  try
  {
    var test_title = 'Treatment - Refer a treatment'
    login(5, "Shared");
    add_patient('Regression', 'refer_treatment', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    
    WaitSeconds(6);
    
    add_pending_maintenance_treatment("2.0",(aqDateTime.Today()));
  
    //Get all the patient details
    var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    Goto_Patient_Treatment();
  
    //Refer
    var refer_button_path = refer_pending_treat_button().Click();
  
    var result_set = new Array(); 
    //Check patient on the referred list
    var result_set_1 = check_patient_on_refer_list(message_name)
    result_set.push(result_set_1);
  
    patient_search(pat_nhs);
    //Check the audit
    Goto_Suggested_Treatment_Audit();
    result_set_1 = validate_top_treatment_audit('Treatment Referred');
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_refer_a_treatment";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_treatment_authorise_a_referral()
{
 try
 {
    var test_title = 'Treatment - Authorise a referral'
    login(5, "Shared");
    add_patient('Regression', 'authorise_treatment', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    add_pending_maintenance_treatment('2.0',(aqDateTime.Today()));
  
    //Get all the patient details
    var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    Goto_Patient_Treatment();
  
    //Refer
    var pending_treatment_buttons_path = pending_treatment_buttons();
    WaitSeconds(2);
    var refer_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("ReferPendingTreatment").Click();
 
    patient_search(pat_nhs);
  
    var result_set = new Array(); 
  
    //Authorise the referral and check patient is no longer on the home page
    var save_inr_button_path = save_inr_button();
    save_inr_button_path.click();
  
    //Check the patient in no longer on the referred list
    var result_set_1 = check_patient_not_on_refer_list(message_name)
    result_set.push(result_set_1);
  
    patient_search(pat_nhs);
  
    //Check the icon is green on the suggested treatment row
    var expected_state = 'Image("GreenIcon_1_PNG")'
    var actual_state = get_treatment_icon_state();
    result_set_1 = compare_values(expected_state, actual_state, test_title);
    result_set.push(result_set_1);
  
    //Check the audit
    Goto_Suggested_Treatment_Audit();
    result_set_1 = validate_top_treatment_audit('Treatment Authorised');
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
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_authorise_a_referral";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_treatment_edit_a_treatment_comment()
{
  try
  {
    var test_title = 'Treatment - Edit a treatment comment'
    login(5, "Shared");
    add_patient('Regression', 'edit_comment', 'M', 'Shared'); 
    add_treatment_plan('W','Hillingdon','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
    var old_comment = 'old comment'
    add_treatment_comment(old_comment);
  
    result_set = new Array(); 
  
    var new_comment = 'regression new comment'
    add_treatment_comment(new_comment);
  
    //Check the audit for adding the treatment
    var result_set_1 = validate_more_info_top_treatment_audit('Comments changed from [' + old_comment + '] to [' + new_comment + ']');
    result_set.push(result_set_1);
  
    //Validate the results sets are true
    var results = results_checker_are_true(result_set); 
    Log.Message(results);
    
    //Pass in the result
    results_checker(results,test_title);
  
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_edit_a_treatment_comment";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------
function tc_treatment_add_multiple_historic_treatments()
{
  try
  {
    var test_title = 'Treatment - Maintenance - Historical treatments all dated the same'
    login(5, "Shared");
    add_patient('Regression', 'multiple_historical', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
  
    var result_set = new Array(); 
    var treatment_data = new Array();
    var treatment_row = new Array();
    var date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7)));
    var format_date = aqConvert.DateTimeToFormatStr(date, "%d-%b-%Y");
    var format_date_1 = aqConvert.DateTimeToFormatStr(aqConvert.StrToDate(aqDateTime.Today()), "%d-%b-%Y");
  
    add_historic_treatment(date, "2.4", "1.9", "1", "7", "2.5");
    add_historic_treatment(date, "2.2", "2.2", "0", "7", "2.5");
    add_historic_treatment(date, "2.5", "2.0", "1", "7", "2.5");

    treatment_data.push(format_date, "2.4", "1.9", "", "1", "7", "", format_date_1, "-");
    treatment_row = get_treatment_row(0);
    var result_set_1 = checkArrays(treatment_row, treatment_data, "checking historic entry 1");
    result_set.push(result_set_1);
    treatment_data.length = 0;
    
    treatment_data.push(format_date, "2.2", "2.2", "", "0", "7", "", format_date_1, "-"); 
    treatment_row = get_treatment_row(1);
    result_set_1 = checkArrays(treatment_row, treatment_data, "checking historic entry 2");
    result_set.push(result_set_1);
    treatment_data.length = 0;
    
    treatment_data.push(format_date, "2.5", "2.0", "", "1", "7", "", format_date_1, "-"); 
    treatment_row = get_treatment_row(2);
    result_set_1 = checkArrays(treatment_row, treatment_data, "checking historic entry 3");
    result_set.push(result_set_1);
    treatment_data.length = 0;
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 

    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_add_multiple_historic_treatments";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_treatment_dosing_under_12_years_old()
{
  try
  {
    var test_title = 'Treatment - Maintenance/Manual - Dosing under 12 years old'
    login(5, "Shared");
    var w_yr = aqString.SubString(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-800))), 6, 4);
  
    add_patient_extended('Regression', 'under_12', 'M', 'Shared', null, w_yr); 
    add_treatment_plan('W','Manual','','Shared','');
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.Today()), "2.4", "1.0", "7");
    edit_treatment_plan('Coventry');
    
    var result_set = new Array();
    
    var INRstarV5 = INRstar_base();
 
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
    var form = panelPCD.Form("PatientEditTreatmentPlanForm");
  
    //Check the Error panel for the text
    var w_err_text = form.Panel("TreatmentPlanValidation").innerText;
    var result_set_1 = compare_values(w_err_text, "The patient is less than 12 years old; this patient can only be manually dosed");
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    
    results_checker(results, test_title);
  
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_dosing_under_12_years_old";
    handle_failed_tests(suite_name, test_name);
  }
}

//--------------------------------------------------------------------------------
//test to check that a new dosing schedule can be selected, checks the original does not match the new schedule
//C1248478
//Test Change Schedule
function tc_treatment_create_maintenance_use_alternate_schedules()
{
	try
	{
		var test_title = 'Treatment - Create Maintenance Use Alternate Schedules';
		login(5, "Shared");
		add_patient('Regression', 'Use_Alternate', 'M', 'Shared');
		add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.3", "1.2", "0", "11", "2.5");
		add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
		
		var result_set = new Array();
		var dosing_schedule = new Array();				
		var dosing_schedule_1 = new Array();		
		
		//get the current on screen treatment schedule
		dosing_schedule_1 = get_pending_suggested_treatment_schedule(0);
		
		//get path to "More Schedules" button, click button
		var schedule_table = pending_treatment_buttons();
    var dosing_schedule_content = schedule_table.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent");
		var more_schedule_button_path = dosing_schedule_content.Fieldset(0).Panel(0).Button("MoreSchedulesLink");
		var more_schedule_button = more_schedule_button_path.Click();
		
		//get path to "Use" button, click button
		var more_schedules = more_schedule_table();
		var table_row = more_schedules.Cell(2, 2);
		var use_button = table_row.Button("Use").Click();
		
		//get the current on screen treatment schedule
		dosing_schedule = get_pending_suggested_treatment_schedule(0);
		
		//Check the arrays are the same size, but values don't match
		var result_set_1 = checkArrays(dosing_schedule, dosing_schedule_1, test_title);
		result_set.push(result_set_1);
		
		//Validate the results sets are false
		var results = results_checker_are_false(result_set);
		
		//Pass in the result
		results_checker(results, test_title);
		
		Log_Off();
	}
	catch(e)
	{
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_create_maintenance_use_alternate_schedules";
    handle_failed_tests(suite_name, test_name);
	}
}

//--------------------------------------------------------------------------------
//checks to see if the correct error message displays for the specified treatment plan
//C1248484
function tc_treatment_maintenance_starting_algorithm_for_unstable_patient()
{
	try
	{
		var test_title = 'Treatment tab - Starting Algorithm for Unstable Patient';
		login(5, "Shared");
		add_patient('Regression', 'Unstable_Patient', 'M', 'Shared');
		add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-4))), "2.3", "1.2", "0", "4", "2.5");
		
		Goto_Patient_New_INR();
		
    var result_set = new Array();
		var expected_error = "To use this algorithm safely patients should be established on warfarin and have an interval between " +
                                  "the last 2 INR tests of at least 7 days. This patient does not currently meet this criterion."
		
		//get the message from the new INR page banner
		var error_banner_path = treatment_banner_error_message();
    var error_message_text = error_banner_path.TextNode(0).innerText;   

		var suggest_dose_button = treatment_buttons_pre_schedule().SubmitButton("CalculateWarfarinDose").enabled;
    var result_set_1 = results_checker_are_false(suggest_dose_button);
    result_set.push(result_set_1);
		
		//check the values match
		result_set_1 = compare_values(error_message_text, expected_error, test_title);
    result_set.push(result_set_1);
		var results = results_checker_are_true(result_set);
		results_checker(results, test_title);
	    
		Log_Off();
	}
	catch(e)
	{
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_maintenance_starting_algorithm_for_unstable_patient";
    handle_failed_tests(suite_name, test_name);
	}
}
//--------------------------------------------------------------------------------
//checks dose/review period can be overwritten and message displays for dose changes > 20%
function tc_treatment_maintenance_overriding_dose_greater_than_twenty_percent()
{
	try
	{
		var test_title = 'Treatment - Overriding Greater than 20%';
		login(5, "Shared");
		add_patient('Regression', 'Overriding_Twenty', 'M', 'Shared');
		add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.8", "1.3", "0", "11", "2.4");
		add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
		
		var new_dose = "3.0";
		var new_review_days = "21 Days";
		var result_set = new Array();
		var expected_values = new Array();
		var override_values = new Array();
   
    //add current values to array to check
		expected_values = get_treatment_row_key_values(0, "pending");
		
    //setup for test part 2
		var expected_message = "Dose change from 1.3mg/day to 3.0mg/day is greater than 20%. Please confirm that the new dose is appropriate."
		var output_message;
    
		//click the override button
		var override_button_path = override_button();
		override_button_path.Click();
		
		//update dose drop down value, save new dose drop down value
		var override_dose_path = treatment_override_field_container().Cell(1, 1).Select("Treatment_Dose").ClickItem(new_dose);
		
		//update review time drop down value, save new drop down value, save next review date value
		var override_review_date_path = treatment_override_field_container().Cell(1, 3).Select("Treatment_Review").ClickItem(new_review_days);
		
		//click the save button on override menu
		var override_finish_buttons = override_finish_buttons_path();
		override_finish_buttons.Button("OverrideAccept").Click();
		
	  //find the pop up window in the screen
    output_message = process_popup("Please confirm", "Confirm"); 
    
    var save_inr_path = save_inr_button();
    save_inr_path.Click();
    
    //add new values to array
		override_values = get_treatment_row_key_values(0, "pending");
    
    var strikethrough = pending_treatment_table().Cell(0, 3).Panel(0).style.textdecoration;
    var result_set_1 = compare_values(strikethrough, "line-through", test_title);
    result_set.push(result_set_1);
    strikethrough = pending_treatment_table().Cell(0, 6).Panel(0).style.textdecoration;
    result_set_1 = compare_values(strikethrough, "line-through", test_title);
    result_set.push(result_set_1);
    
    //compare original values, with changed values
		result_set_1 = checkArrays(expected_values, override_values, test_title);
    result_set_1 = results_checker_are_false(result_set_1);
		result_set.push(result_set_1);
    
    result_set_1 = compare_values(expected_message, output_message, test_title);
    result_set.push(result_set_1);
		
		//Pass in the result
    results = results_checker_are_true(result_set)
		results_checker(results, test_title);
		
		Log_Off();
	}
	catch(e)
	{
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_maintenance_overriding_dose_greater_than_twenty_percent";
    handle_failed_tests(suite_name, test_name);
	}
}
//--------------------------------------------------------------------------------
//checks that dose and review periods can be overwritten
function tc_treatment_maintenance_overriding_dose_and_review_period()
{
	try
	{
		var test_title = 'Treatment - Overriding Dose and Review Period';
		login(5, "Shared");
		add_patient('Regression', 'Dose_And_Review_Override', 'M', 'Shared');
		add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.8", "2.9", "0", "11", "2.4");
		add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
		
		//setup values to be altered/checked
		var new_dose = "3.0";
		var new_review_days = "13";
		var result_set = new Array();
		var expected_values = new Array();
		var override_values = new Array();
    
		//add all expected values to array
		expected_values = get_treatment_row_key_values(0, "pending");
		
		//update the dose, get the new value
		override_dose(new_dose);
		
		//update the review days, get new value, get new next test date
		override_review(new_review_days);
    
    var save_inr_path = save_inr_button();
    save_inr_path.Click();
    
    //add all to array of changed values
    override_values = get_treatment_row_key_values(0, "pending");
    
    var strikethrough = pending_treatment_table().Cell(0, 3).Panel(0).style.textdecoration;
    var result_set_1 = compare_values(strikethrough, "line-through", test_title);
    result_set.push(result_set_1);
    strikethrough = pending_treatment_table().Cell(0, 6).Panel(0).style.textdecoration;
    result_set_1 = compare_values(strikethrough, "line-through", test_title);
    result_set.push(result_set_1);
		
		//check arrays are same length but values do not match
		result_set_1 = checkArrays(expected_values, override_values, test_title);
    result_set_1 = results_checker_are_false(result_set_1);
		result_set.push(result_set_1);
		
		//Validate the results sets are false
		results = results_checker_are_true(result_set);
		Log.Message(results);
		
		//Pass in the result
		results_checker(results, test_title);
    
		Log_Off();
	}
	catch(e)
	{
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_maintenance_overriding_dose_and_review_period";
    handle_failed_tests(suite_name, test_name);
	}
}
//--------------------------------------------------------------------------------
//testing schedules can be re-order via drag/drop dosing values between days, checks schedules change after action
function tc_treatment_drag_and_drop_schedule_days()
{
  try
  {
    //setup a treatment
    var test_title = 'Treatment - Drag and Drop Schedule Days';
    login(5, "Shared");
	  add_patient('Regression', 'Drag_Drop', 'M', 'Shared');
	  add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.8", "2.9", "0", "11", "2.4");
		add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
    
    //set up arrays for result outputs
    var result_set = new Array();
    var result_set_1 = new Array();
    var results = new Array();
    
    //holds the original and updated dosing arrays
    var dosing_schedule = new Array();
    var dosing_schedule_1 = new Array();
    
    dosing_schedule = get_pending_suggested_treatment_schedule(0);
    
    //get path to re-order buttons
    var suggest_schedule_path = pending_treatment_buttons();
    var re_order_paths = suggest_schedule_path.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Fieldset(0);
    var re_order_button_path = re_order_paths.Panel(0).Button("Re_Order_Schedule").Click();
    var table_cell = re_order_paths.Fieldset("ScheduleGrid").TextNode(12);
    
    //function to drag drop item
    table_cell.Drag(30, 10, 0, -100);
    
    //confirm change
    re_order_paths.Panel(0).Button("Confirm_Re_Order").Click();
    
    dosing_schedule_1 = get_pending_suggested_treatment_schedule(0);
    
    //check outputs, display results
    result_set_1 = checkArrays(dosing_schedule, dosing_schedule_1, test_title);
    result_set.push(result_set_1);
    results = results_checker_are_false(result_set);
    results_checker(results, test_title);
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_drag_and_drop_schedule_days";
    handle_failed_tests(suite_name, test_name);
  }
}

//--------------------------------------------------------------------------------
//checks a pending treatment can be overwritten, saved, overwrite maintained, strikethrough values display
function tc_treatment_maintenance_save_override_treatment()
{
	try
	{
		var test_title = 'Treatment - Overriding Dose and Review Period and Save';
		login(5, "Shared");
		add_patient('Regression', 'DoseReview_OverrideSave', 'M', 'Shared');
		add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.8", "2.9", "0", "11", "2.4");
		add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
		
		//setup values to be altered/checked
		var new_dose = "3.0";
		var new_review_days = "13";
		var result_set = new Array();
		var expected_values = new Array();
		var override_values = new Array();
		
		//add all expected values to array
		expected_values = get_treatment_row_key_values(0, "pending");
		
		//update the dose, get the new value
		override_dose(new_dose);
		
		//update the review days, get new value, get new next test date
		override_review(new_review_days);
    
    var save_inr_path = save_inr_button();
    save_inr_path.Click();
    
    var strikethrough = treatment_table().Cell(1, 3).Panel(0).style.textdecoration;
    var result_set_1 = compare_values(strikethrough, "line-through", test_title);
    result_set.push(result_set_1);
    strikethrough = treatment_table().Cell(1, 6).Panel(0).style.textdecoration;
    result_set_1 = compare_values(strikethrough, "line-through", test_title);
    result_set.push(result_set_1);
    
    //add all to array of changed values
		override_values = get_treatment_row_key_values(1);
		
		//check arrays are same length but values do not match
		result_set_1 = checkArrays(expected_values, override_values, test_title);
    result_set_1 = results_checker_are_false(result_set_1);
		result_set.push(result_set_1);
		
		//Validate the results sets are false
		results = results_checker_are_true(result_set);
		Log.Message(results);
		
		//Pass in the result
		results_checker(results, test_title);
    
		Log_Off();
	}
	catch(e)
	{
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_maintenance_save_override_treatment";
    handle_failed_tests(suite_name, test_name);
	}
}

//--------------------------------------------------------------------------------
//testing for warning message when patient's last INR test exceeds max review period
function tc_treatment_maintenance_INR_more_then_max_review_period()
{
  try
  {
    var test_title = 'Treatment - INR More Than Max Review Period';
		login(5, "Shared");
    
    var options_button = home_page_options_tab().Click();
    var dosing_tab = dosing_settings_tab().Click();
    var inr_stage_six = location_dosing_settings().Link(12).Click();
    
    var max_review_period_str = location_dosing_settings().Panel(12).Panel("Review_Period_");
    var max_review_period_str_txt = max_review_period_str.Panel(0).Label("In_Range_INR_Stage_6_Review_Period_Value").innerText;
    var max_review_period_int = aqConvert.StrToInt(max_review_period_str_txt);
    var max_review_increment = max_review_period_int+1;
    
    add_patient('Regression', 'MoreThan_MaxReview', 'M', 'Shared');
    add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-(max_review_increment)))), 
                                                                                  "2.8", "2.9", "0", "11", "2.4");
                                                                                  
    Goto_Patient_New_INR();
    
    var expected_message = "The patient's last treatment was more than " + max_review_period_str_txt + 
                            " days ago, please ensure that the dose and review period are still current and accurate";
    //get the message from the new INR page banner
		var warning_banner_path = treatment_banner_warning_message();

    var warning_message_text = warning_banner_path.TextNode(1).innerText;
    Log.Message(warning_message_text);

    //check the values match
    var result_set = new Array();
		var result_set_1 = compare_values(warning_message_text, expected_message, test_title);
    result_set.push(result_set_1);
    
    var cancel_button = treatment_buttons_pre_schedule().Button("CancelNewINR");
    cancel_button.Click();
    
    delete_treatment();
    
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-(max_review_period_int)))), 
                                                                                  "2.8", "2.9", "0", "11", "2.4");
                                                                                  
    Goto_Patient_New_INR();
    
    result_set_1 = false;
    warning_message_text = warning_banner_path.contentText;
    Log.Message(warning_message_text);
    //check any warning banner paths, expected message should no longer be present
    if (aqString.Contains(warning_message_text, expected_message) == -1)
    {
      result_set_1 = true;
      result_set.push(result_set_1);
    }
    
    var results = results_checker_are_true(result_set);
    //Pass in the result
		results_checker(results, test_title);
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_maintenance_INR_more_then_max_review_period";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_treatment_manual_mutliple_historic_summary_check()
{
  try
  {
    var test_title = 'Treatment - Multiple Historic INRs, Summary Check';
		login(5, "Shared");
    add_patient('Regression', 'Mutliple_Historic', 'M', 'Shared');
    add_treatment_plan('W', 'Manual', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-20))), "2.0", "2.0", "0", "11", "2.5");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-12))), "2.2", "2.3", "0", "11", "2.5");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var patient_nhs = get_patient_nhs();
    add_pending_manual_treatment('2.6', 'PoCT', '2.9', '7 Days');
    
    var treatment_values = new Array();
    var summary_values = new Array();
    var result_set = new Array();
    var smry_dosing_schedule = new Array();
    var dosing_schedule = get_pending_suggested_treatment_schedule(0);
    
    save_inr_button().Click();
    
    treatment_values = get_treatment_row_key_values(3);
    treatment_values[2] = treatment_values[2] + " mg/day";
    treatment_values[3] = treatment_values[3] + " Days";
    treatment_values[4] = aqConvert.DateTimeToStr(treatment_values[4]);
    
    summary_values = get_patient_summary_labels(patient_nhs);
    
    smry_dosing_schedule = get_treatment_summary_table_schedule();
    
    var result_set_1 = check_summary_tab_image(patient_nhs);
    result_set.push(result_set_1);
    
    //Check the arrays are the same size + values match
		result_set_1 = checkArrays(treatment_values, summary_values, test_title);
		result_set.push(result_set_1);
    
    //Check the arrays are the same size + values match
    result_set_1 = checkArrays(dosing_schedule, smry_dosing_schedule, test_title);
    result_set.push(result_set_1);
		
		//Validate the results sets are true
		var results = results_checker_are_true(result_set);
		
		//Pass in the result
		results_checker(results, test_title);
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_manual_mutliple_historic_summary_check";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_treatment_maintenance_override_privilege()
{
  try
  {
    var test_title = 'Treatment - Override Privilege, in-range INR';
		login(5, "Shared");
    add_patient('Regression', 'Override_Privilege', 'M', 'Shared');
    add_treatment_plan('W', 'Coventry', '', 'Shared', '');
    var patient_nhs_number = get_patient_nhs();
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), 
                                                              "2.4", "2.6", "0", "11", "2.5");
    add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
    
    var result_set = new Array();
    var button = override_button().enabled;
    var result_set_1 = button_checker(button, "enabled", "Testing cl3 level user can click save inr on pending treatment for manual dosing");
    result_set.push(result_set_1);
    
    Log_Off();
    
    /* Needs database update to password - readonly needs password set / expiry set
    login(8, "Shared");
    patient_search(patient_nhs_number);
  
    button = override_button().enabled;
    result_set_1 = button_checker(button, "disabled", "Testing read-only level user cannot click " + 
                                                    "save inr on pending treatment for manual dosing");
    result_set.push(result_set_1);
  
    Log_Off();
    */
    
    login(3, "Shared");
    patient_search(patient_nhs_number);
  
    button = override_button().enabled;
    result_set_1 = button_checker(button, "disabled", "Testing cl1 level user cannot click save inr on pending treatment for manual dosing");
    result_set.push(result_set_1);
  
    Log_Off();

    login(4, "Shared");
    patient_search(patient_nhs_number);
    
    button = override_button().enabled;
    result_set_1 = button_checker(button, "disabled", "Testing cl2 level user cannot click save inr on pending treatment for manual dosing");
    result_set.push(result_set_1);
  
    Log_Off();
    
    login(7, "Shared");
    patient_search(patient_nhs_number);
  
    button = override_button().enabled;
    result_set_1 = button_checker(button, "enabled", "Testing clead level user can click save inr on pending treatment for manual dosing");
    result_set.push(result_set_1);
    
    var save_inr_button_path = save_inr_button();
    save_inr_button_path.Click();
    
    Log_Off(); 
    
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set);
    
    //Pass in the result
    results_checker(results,test_title);         
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_maintenance_override_privilege";
    handle_failed_tests(suite_name, test_name);
  }
}

//--------------------------------------------------------------------------------
function tc_treatment_maintenance_cancel_pending()
{
  try
  {
    var test_title = 'Treatment - Cancel Pending Treatment';
		login(5, "Shared");
    add_patient('Regression', 'Cancel_Pending', 'M', 'Shared');
    add_treatment_plan('W', 'Coventry', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var result_set = new Array();                                                                                                                    
    var treatment_values = new Array();
    var treatment_values_1 = new Array();
    
    treatment_values = get_treatment_row(0);
    var child_count = treatment_table().ChildCount;
                                                              
    add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
    
    var cancel_btn = cancel_pending_treat_button()
    cancel_btn.Click();
    process_popup("Confirmation Required", "Cancel");
    cancel_btn.Click();
    process_popup("Confirmation Required", "Confirm");
    
    treatment_values_1 = get_treatment_row(0);
    var child_count_1 = treatment_table().ChildCount;
    
    result_set_1 = compare_values(child_count, child_count_1, "Compare Child Counts");
    result_set.push(result_set_1);
    
    //Check the arrays are the same size + values match
    var result_set_1 = checkArrays(treatment_values, treatment_values_1, test_title);
    result_set.push(result_set_1);
    
    //Validate the results sets are true
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    
    //Pass in the result
		results_checker(results, test_title);
    
    Log_Off();          
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_maintenance_cancel_pending";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_treatment_maintenance_add_pending_treatment_with_pending_transfer()
{
  try
  {
    var test_title = 'Treatment - Add Pending Treatment to Patient with Pending Transfer Acceptance';
		login(5, "Shared");
    add_patient('Regression', 'PendingTreatment_PendingTransfer', 'M', 'Shared');
    
    var messagename = get_patient_fullname();
    
    add_treatment_plan('W', 'Coventry', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
                                                              
    var result_set = new Array();
    var expected_message = "This patient transfer cannot be accepted because they have a " + 
                            "pending treatment. Please contact their current testing location."
    
    var practice_name = "Deans Regression Testing Location 2";
    change_test_practice(practice_name);
    
    add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
    
    Log_Off();
     
    login(15, "Shared");
    
    var is_in_table = accept_transfer(messagename);
    
    if (is_in_table == true)
    {
      var pending_transfer_error = home_page_messages().Panel("TransferredPatients").Panel("AddTransferPatientValidation").Panel("Errors");
      var pending_transfer_errot_txt = pending_transfer_error.innerText;
    }
    else
    {
      Log.Message("Patient not found.")
    }
    
    var result_set_1 = compare_values(expected_message, pending_transfer_errot_txt, test_title);
    result_set.push(result_set_1);
    
    //Validate the results sets are true
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    
    //Pass in the result
		results_checker(results, test_title);
  
    Log_Off();          
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_maintenance_add_pending_treatment_with_pending_transfer";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_treatment_add_treatment_for_self_tester()
{
  try
  {
    var test_title = "Treatment - Add a treatment for a self-tester and check it within the database";
		login(5, "Shared");
    add_patient("Regression", "Self_tester", "M", "Shared");
    add_treatment_plan("W", "Manual", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    add_manual_self_test_group();
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.Today()), "2.5", "2.5", "7", "PoCT");
    
    var result_set = new Array();
    
    var result_set_1 = validate_specific_entry_patient_audit(2, "Edit Patient Management Details", test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_more_info_specific_entry_patient_audit(2, "INR Self Tester set to [True].", test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_patient_audit(test_title, "Add Manual Treatment");
    result_set.push(result_set_1);
    
    result_set_1 = validate_more_info_top_patient_audit("Self Tested set to [True].");
    result_set.push(result_set_1);
    
    //Validate the results sets are true
    var results = results_checker_are_true(result_set);
    
    //Pass in the result
		results_checker(results, test_title);
  
    Log_Off();          
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_add_treatment_for_self_tester";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------


//*** NOT READY TO USE YET ***

//function tc_treatment_cancel_pending_treatment() 
//{
//  try
//{
// var test_title = 'Treatment - Maintenance - Cancel pending treatment'
// login(5, "Shared");
//  
//  add_patient('Regression', 'Cancel_Pending', 'M', 'Shared');
//  add_treatment_plan('W','Coventry','','Shared','');
//  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.4", "1.0", "0", "7", "2.5");
//  add_pending_maintenance_treatment_pop_up_checker('2.0',aqConvert.StrToDate(aqDateTime.Today()));
// 
//  //Cancel pending treatment
//  panelPPT.Panel("PendingTreatmentInfo").Panel(0).Button("CancelPendingTreatment").Click();
//  process_confirm_sub(INRstarV5, "Confirmation Required");
//     
//    //Click the button 
////    var Cancel_PendingTreatment = 
////    
////  var INRstarV5 = set_system();
////  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
////  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
////  var panelPTI = panelPTC.Panel("PendingTreatmentInfo");
////
////    panelPTI.Panel(0).Button("CancelPendingTreatment").Click();
////    // Click the cancel button
//    //panelABC.Button("CancelPendingTreatment").Click();
//    
//    // Log_Off(); 
//  } 
//   catch(e)
//   {
//   // Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
//   //Log_Off();
//  }
//}
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//Current Function to track and test CACUK432 bug fix
//--------------------------------------------------------------------------------
function cacuk432_bug_fix_sequence()
{
  try
  {
    var test_title = "CACUK-432 - Bug Fix";
    var drug_array = new Array();
    drug_array.push("Warfarin", "Acenocoumarol", "Apixaban", "Dabigatran", "Edoxaban", "Rivaroxaban", "Dalteparin (LMWH)", "Enoxaparin (LMWH)");
    login(5, "Shared");
    
    for(var i = 0; i < drug_array.length; i++)
    {
      var drug_1 = drug_array[i];
      for(var j = 0; j < drug_array.length; j++)
      {
        var drug_2 = drug_array[j];
        if(drug_1 != drug_2)
        {
          add_patient('Regression', 'CACUK-432', 'M', 'Shared');
          add_treatment_plan(drug_1, "Coventry", aqConvert.StrToDate(aqDateTime.Today()), "Shared", "", "52 Weeks");
          
          if(drug_1 != "Warfarin")
          {
            add_review_form().Panel(0).Panel("AnnualReviewAddActions").Button("CancelWarfarinReviewLink").Click();
          }
          
          edit_treatment_plan_all(drug_2, "Coventry Maintenance");
          add_review(drug_2);
          add_treatment_plan(drug_1, "Coventry", aqConvert.StrToDate(aqDateTime.Today()), "Shared", "2", "52 Weeks");
          //Explicit Wait, current bug can cause extended wait
          WaitSeconds(6);
          
          var result_set = new Array();
          var result_set_1 = false;
          
          if(drug_1 != "Warfarin")
          {
            var is_treatment_add_success = INRstar_base().NativeWebObject.Find("idStr", "SaveWarfarinReviewLink");
          }
          else
          {
            var is_treatment_add_success = INRstar_base().NativeWebObject.Find("idStr", "PatientTreatmentINRHistory");
          }
          if(is_treatment_add_success.Exists == true)
          {
            result_set_1 = true;
          }
          
          result_set.push(result_set_1);
          var results = results_checker_are_true(result_set);
          
          var message = test_title + " - Checking: " + drug_1 + " " + drug_2;
          results_checker(results, message);
        }
      }
    }
    Log_Off();          
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "cacuk432_bug_fix_sequence";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function cacuk432_bug_fix_single()
{
  try
  {
    var test_title = "CACUK-432 - Bug Fix";
    login(5, "Shared");
    
    var drug_1 = "Acenocoumarol";
    var drug_2 = "Apixaban";
    var result_set = new Array();
    var result_set_1 = false;
    
    add_patient('Regression', 'Bug_Fix', 'M', 'Shared');
    add_treatment_plan(drug_1, "Coventry", aqConvert.StrToDate(aqDateTime.Today()), "Shared", "", "52 Weeks");
    
    if(drug_1 != "Warfarin")
    {
      add_review_form().Panel(0).Panel("AnnualReviewAddActions").Button("CancelWarfarinReviewLink").Click();
    }
    edit_treatment_plan_all(drug_2, "Coventry Maintenance");  
    add_review(drug_2);   
    add_treatment_plan(drug_1, "Coventry", aqConvert.StrToDate(aqDateTime.Today()), "Shared", "2", "52 Weeks");
    WaitSeconds(6);
    
    if(drug_1 != "Warfarin")
    {
      var is_treatment_add_success = INRstar_base().NativeWebObject.Find("idStr", "SaveWarfarinReviewLink");
    }
    else
    {
      var is_treatment_add_success = INRstar_base().NativeWebObject.Find("idStr", "PatientTreatmentINRHistory");
    } 
    if(is_treatment_add_success.Exists == true)
    {
      result_set_1 = true;
    }
          
    result_set.push(result_set_1);
    var results = results_checker_are_true(result_set);
    var message = test_title + " - Checking: " + drug_1 + " " + drug_2;
    results_checker(results, message);
  
    Log_Off();          
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "cacuk432_bug_fix_single";
    handle_failed_tests(suite_name, test_name);
  }
}