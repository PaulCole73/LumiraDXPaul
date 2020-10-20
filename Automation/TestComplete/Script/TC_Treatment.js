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
//USEUNIT Get_Functions
//--------------------------------------------------------------------------------
function tc_treatment_add_a_historic_treatment()
{
  try
  {
    var test_title = 'Treatment - Add a historic treatment';
    
    // Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Add_historic', 'M', 'Shared'); 
    add_treatment_plan('W','Manual','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    
    // Initialise Test Results array
    var result_set = new Array(); 
    var treatment_data = new Array();
    
    //Setup and record expected data
    var formatted_inr_date = get_date_with_days_from_today_dd_mmm_yyyy(-7);
    var formatted_ntd = get_todays_date_in_dd_mmm_yyyy();
    treatment_data.push(formatted_inr_date, "2.0", "2.0", "", "0", "7", "", formatted_ntd, "-");
    
    //Get the actual data 
    var treatment_row = get_treatment_row(0);
  
    //Compare the expected vs the actual data
    var result_set_1 = checkArrays_containing_inr_values(treatment_row, treatment_data, test_title);
    result_set.push(result_set_1);
  
    //Check the audit for adding the treatment
    var result_set_1 = validate_top_patient_audit(test_title, get_string_translation("Add Historical Treatment"));
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
    var test_title = 'Treatment - Add a manual INR';
    
    // Setup test scenario
    login(7, "Shared");
    add_patient('Regression', 'Manual_treatment', 'M', 'Shared'); 
    add_treatment_plan('W','Manual','','Shared','');
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))),'2.0','2.5','7');
    
    // Initialise Test Results array
    var result_set = new Array(); 
    var treatment_data = new Array();
    
    //Setup and record expected data
    var formatted_inr_date = get_date_with_days_from_today_dd_mmm_yyyy(-3);
    var formatted_ntd = get_date_with_days_from_today_dd_mmm_yyyy(+4);
    treatment_data.push(formatted_inr_date, "2.0", "2.5", "", "0", "7", "", formatted_ntd, "-");

    //Get the actual data
    var treatment_row = get_treatment_row(0);
  
    //Compare the expected vs the actual data
    var result_set_1 = checkArrays_containing_inr_values(treatment_row, treatment_data, test_title);
    result_set.push(result_set_1);
  
    //Check the audit for adding the treatment
    var result_set_1 = validate_top_patient_audit(test_title, get_string_translation("Add Manual Treatment"));
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
    var test_title = 'Treatment - Manual dosing permissions';
    
    // Setup test scenario
    login(4, "Shared");
    add_patient('Regression', 'Manual_permissions', 'M', 'Shared'); 
    add_treatment_plan('W','Manual','','Shared','');
    
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var patient_fullname = get_patient_fullname();
    
    // Initialise Test Results array
    var result_set = new Array(); 
  
    // Check to ensure button is disabled for cl2 level user
    var button = new_inr_button_path().enabled;
    var result_set_1 = button_checker(button, 'disabled', 'Testing cl2 level user cannot click new inr for manual dosing');
    result_set.push(result_set_1);
  
    // Login as high level user and add pending manual treatment
    Log_Off();
    login(5, "Shared");
    patient_search(patient_fullname);
    add_pending_manual_treatment('2.5','Lab','2.0','7');
    
    // login as cl2 level user
    Log_Off();
    login(4, "Shared");
    patient_search(patient_fullname);
  
    // Check to ensure button is disabled for cl2 level user
    var button = save_inr_button().enabled;
    var result_set_1 = button_checker(button, 'disabled', 'Testing cl2 level user cannot click save inr on pending treatment for manual dosing');
    result_set.push(result_set_1);
  
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results, test_title); 
  
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
    var test_title = 'Treatment - Induction dosing permissions';
    
    // Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'Induction_permissions', 'M', 'Shared'); 
    add_treatment_plan('W','Oates','','Shared','');
    add_pending_induction_slow_treatment('1.2','Shared');
    
    //Get the patient details
    //var pat_nhs = get_patient_nhs();
    var patient_fullname = get_patient_fullname();
    
    // Initialise Test Results array
    var result_set = new Array(); 
  
    // Check to ensure button is enabled for cl3 level user
    var button = save_inr_button().enabled;
    var result_set_1 = button_checker(button, "enabled", "Testing cl3 level user can see new inr button enabled for induction dosing");
    result_set.push(result_set_1);
    
    // Login as cl2 level user
    Log_Off();
    login(4, "Shared");
    patient_search(patient_fullname);
  
    // Check to ensure button is disabled for cl2 level user
    var button2 = save_inr_button().enabled;
    var result_set_1 = button_checker(button2, "disabled", "Testing cl2 level user cannot click new inr for induction dosing");
    result_set.push(result_set_1);
    
    // Login as cl1 level user
    Log_Off();
    login(3, "Shared");
    patient_search(patient_fullname);
  
    // Check to ensure button is disabled for cl1 level user
    var button3 = save_inr_button().enabled;
    var result_set_1 = button_checker(button3, "disabled", "Testing cl1 level user cannot click new inr for induction dosing");
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
    
    // Setup test scenario
    login(4, "Shared");
    add_patient('Regression', 'Treatment_comment', 'M', 'Shared'); 
    add_treatment_plan('W','Hillingdon','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    
    // Setup and add a comment
    var comment = "regression testing comments field";
    add_treatment_comment(comment);
        
    // Initialise Test Results array
    var result_set = new Array(); 
  
    //Check the audit for comment
    var result_set_1 = validate_more_info_top_treatment_audit(get_string_translation("Comments set to") + " [" + comment + "]");
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
    
    // Setup test scenario
    login(4, "Shared");
    add_patient('Regression', 'treatment_inrange', 'M', 'Shared'); 
    add_treatment_plan('W','Hillingdon','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    add_maintenance_treatment('2.5',aqConvert.StrToDate(aqDateTime.Today()));
    
    // Setup and record expected data
    var formatted_inr_date = get_todays_date_in_dd_mmm_yyyy();
    var formatted_ntd = get_date_with_days_from_today_dd_mmm_yyyy(+14);
    var treatment_data = new Array();
    treatment_data.push(formatted_inr_date, "2.5", "2.0", "2.0", "0", "14", "14", formatted_ntd, "-");
      
    //Get the actual treatment data from the treatment table
    var treatment_row = get_treatment_row(0, "pending");
        
    // Initialise Test Results array
    var result_set = new Array(); 
    
    // Comparse the actual and expected data 
    var result_set_1 = checkArrays_containing_inr_values(treatment_row, treatment_data, test_title);
    result_set.push(result_set_1);
  
    //Check the audit for adding the treatment
    var result_set_1 = validate_top_patient_audit(test_title, get_string_translation("Add New INR"));
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
    
    // Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'historic_induction', 'M', 'Shared'); 
    add_treatment_plan('W','Oates','','Shared','');
    click_historic_button();
  
    // Initialise Test Results array
    var result_set = new Array(); 
    
    // Check warning message content
    var actual_warn_mess = process_popup(get_string_translation("Please Confirm"), get_string_translation("Confirm"));
    var expected_warn_mess = get_string_translation("Adding a historical treatment to this patient will remove them from this induction protocol. The patient must be treated by manual dosing.");
    var result_set_1 = compare_values(actual_warn_mess, expected_warn_mess, test_title); 
    result_set.push(result_set_1);
  
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
    //Check the yellow banner message
    WaitSeconds(6);
    var result_set_1 = banner_checker(get_string_translation("The patient's dosing method is currently set to :") + " " + get_string_translation("No Protocol"));
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
    
    // Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'no_protocol_pat', 'M', 'Shared'); 
    add_treatment_plan('W','Oates','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
    //Navigate to relevant page to perform checks
    Goto_Patient_New_INR();
    
    // Initialise Test Results array
    var result_set = new Array(); 
    
    //Check red banner message content
    var actual_error_mess = get_treatment_error_banner();
    var expected_error_mess = get_string_translation("The patient currently has no dosing method, you will need to update their treatment plan details before you can dose the patient."); 
    var result_set_1 = compare_values(actual_error_mess, expected_error_mess, test_title); 
    result_set.push(result_set_1);
   
    //Check button is disabled
    var button = sugg_war_dose_button().enabled;
    var result_set_1 = button_checker(button, "disabled", test_title);
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
    
    // Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'override_induction', 'M', 'Shared'); 
    add_treatment_plan('W','Oates','','Shared','');
    add_pending_induction_slow_treatment('1.0','Shared')
  
    // Initialise Test Results array
    result_set = new Array(); 
  
    // Check button is disabled
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
    
    // Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'treatment_dated_before', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))), "2.0", "2.0", "0", "7", "2.5");
    add_pending_maintenance_treatment('2.5',aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-2))))
  
    // Initialise Test Results array
    result_set = new Array();  
  
    //Check banner message is as expected
    var actual_error_mess = get_treatment_error_banner();
    var expected_error_mess = get_string_translation("You cannot add a treatment with a date that is older than the patient's latest treatment date.");
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
    
    // Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'treatment_same_day', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))), "2.0", "2.0", "0", "7", "2.5");
    add_pending_maintenance_treatment('2.5',aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))))
  
    // Initialise Test Results array
    result_set = new Array(); 
  
    // Check Red Banner content
    var actual_error_mess = get_treatment_error_banner();
    var expected_error_mess = get_string_translation("This patient already has an INR result recorded on this date. It is not possible to enter more" +
        " than one INR result on the same day unless the patient is being dosed manually.");
    var results = compare_values(actual_error_mess, expected_error_mess, test_title);   
    
    //Pass in the result
    results_checker(results, test_title); 
  
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
    
    // Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'mainteance_low', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))), "2.0", "2.0", "0", "7", "2.5");
    
    // Initialise Test Results array
    result_set = new Array();
    
    // Get table row count for treatment history table before adding next treatment
    var treatment_history_row_count_before = treatment_table().rowcount;
    
    // Get actual warning messgage 
    var actual_error_mess = add_pending_maintenance_treatment("1.9", aqConvert.StrToDate(aqDateTime.Today()), "", "poct");
    
    // Finish saving the INR
    save_inr_button().Click() 
    
    // Get table row count for treatment history table
    Goto_Patient_Treatments_Tab()
    var treatment_history_row_count_after = treatment_table().rowcount;
    
    // Check first half of message is correct and present
    var expected_error_mess1 = get_string_translation("Low INR warning: Patient may be at increased risk of thromboembolic events until INR is back in-range.");      
    var result_set_1 = data_contains_checker(actual_error_mess, expected_error_mess1, test_title);  
    result_set.push(result_set_1);
    
     // Check second half of message is correct and present
    var expected_error_mess2 = get_string_translation("Consult clinical lead for advice about the use of LMWH for very low INR if clinically appropriate.");      
    var result_set_1 = data_contains_checker(actual_error_mess, expected_error_mess2, test_title);  
    result_set.push(result_set_1);
    
    // Check table has grown a row - therefore treatment added despite warning
    var result_set_1 = (treatment_history_row_count_after == treatment_history_row_count_before +1);
    result_set.push(result_set_1);
  
    // Check the audit for adding the treatment
    var result_set_1 = validate_top_patient_audit(test_title, get_string_translation("Add New INR"));
    result_set.push(result_set_1);
  
    // Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    // Pass in the result
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
    var test_title = 'Treatment - Add a new maintenance high INR';
    
    // Setup test scenario
    login(5, "Shared");    
    add_patient('Regression', 'mainteance_high', 'M', 'Shared'); 
    //Get all the patient details
    //var pat_nhs = get_patient_nhs();
    var patient_fullname = get_patient_fullname();
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))), "2.0", "2.0", "0", "7", "2.5");
    
    // Initialise Test Results array
    var result_set = new Array();
    
    // Get table row count for treatment history table before adding next treatment
    var treatment_history_row_count_before = treatment_table().rowcount;
    
    // Get the Actual data/errror
    var actual_error_mess = add_pending_maintenance_treatment("4.0", aqConvert.StrToDate(aqDateTime.Today()), "", "poct");
    
    // Finish saving the INR
    save_inr_button().Click();
    
    // Get table row count for treatment history table
    Goto_Patient_Treatments_Tab()
    var treatment_history_row_count_after = treatment_table().rowcount;
    
    // Get Expected data into an array field
    var dosing_data = new Array();
    dosing_data = get_dosing_settings_data(3);
    var expected_error_mess = dosing_data[0];
    
    // Check table has grown a row - therefore treatment added despite warning
    var result_set_1 = (treatment_history_row_count_after == treatment_history_row_count_before +1);
    result_set.push(result_set_1);
    
    // Check dosing details are correct
    var result_set_1 = compare_values(actual_error_mess, expected_error_mess, test_title);  
    result_set.push(result_set_1);
  
    // Check the audit for adding the treatment
    var result_set_1 = validate_top_patient_audit_with_patient_search(test_title, patient_fullname, "Add New INR")
    result_set.push(result_set_1);
  
    // Validate all the results sets are true
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
    var test_title = 'Treatment - Out of Range maintenance permissions';
    
    // Setup test scenario
    login(4, "Shared"); 
    add_patient('Regression', 'out_of_range_permissions', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    add_pending_maintenance_treatment('5.0',(aqDateTime.Today()));
 
    // Initialise Test Results array
    var result_set = new Array();
  
    // Check button is enabled for Cl2 user
    var button1 = save_inr_button().enabled;
    var result_set_1 = button_checker(button1, "enabled", "Testing cl2 level user can click save inr button for out of range treatment");
    result_set.push(result_set_1);
    
    //Get all the patient details
    //var pat_nhs = get_patient_nhs();
    var patient_fullname = get_patient_fullname();
  
    // Log on as a Cl1 level user and search for the user
    Log_Off(); 
    login(3, "Shared");
    patient_search(patient_fullname);
    
    // Check button is disabled for Cl1 user  
    var button2 = save_inr_button().enabled;
    var result_set_1 = button_checker(button2, "disabled", "Testing cl1 level user cannot click save inr button for out of range treatment");
    result_set.push(result_set_1);
  
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set);
    
    //Pass in the result
    results_checker(results, test_title); 
  
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
    var test_title = 'Treatment - Delete the last treatment';
    
    // Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'delete_treatment', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    
    // Initialise Test Results array
    var result_set = new Array();
    
    // Calculate expected results
    var formatted_inr_date = get_date_with_days_from_today_dd_mmm_yyyy(-7);
    var expected_message = get_string_translation("Please confirm you want to delete the treatment added on the") + ' ' + formatted_inr_date + '.';
    
    // Extract actual results
    var actual_message = delete_treatment();
  
    // Check expected and actual messages match
    var result_set_1 = compare_values(expected_message, actual_message, test_title);
    result_set.push(result_set_1);
  
    //Check the audit for the deleted treatment
    var result_set_1 = validate_top_patient_audit(test_title, get_string_translation("Treatment Deleted"));
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
    var test_title = 'Treatment - Refer a treatment';
    
    // Setup test scenario
    login(5, "Shared");
    add_patient('Regression', 'refer_treatment', 'M', 'Shared'); 
    var patient_fullname = get_patient_fullname();
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");    
    add_pending_maintenance_treatment("2.0",(aqDateTime.Today()));
    refer_pending_treat_button().Click();
  
    // Initialise Test Results array
    var result_set = new Array();
    
    //Check patient on the referred list
    var result_set_1 = check_patient_on_refer_list(patient_fullname)
    result_set.push(result_set_1);
  
    //Goto_Suggested_Treatment_Audit();
    var result_set_1 = validate_top_suggested_treatment_audit_with_patient_search(patient_fullname, "Treatment Referred")
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
    var patient_fullname = get_patient_fullname();
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    add_pending_maintenance_treatment('2.0',(aqDateTime.Today()));
    
    // Initialise Test Results array
    var result_set = new Array();

    // refer the patient
    refer_pending_treat_button().Click();
       
    // Wait and Search for the patient
    WaitSeconds(1);
    patient_search(patient_fullname);
     
    //Authorise the referral 
    save_inr_button().Click();
    
    //Check the patient in no longer on the referred list
    var result_set_1 = check_patient_not_on_refer_list(patient_fullname)
    result_set.push(result_set_1);
    
    // Wait and Search for the patient
    WaitSeconds(1);
    patient_search(patient_fullname);
  
    //Check the icon is green on the suggested treatment row
    var expected_state = 'Image("GreenIcon_1_PNG")'
    var actual_state = get_treatment_icon_state();
    var result_set_1 = compare_values(expected_state, actual_state, test_title);
    result_set.push(result_set_1);
    
    //Goto_Suggested_Treatment_Audit();
    var result_set_1 = validate_top_suggested_treatment_audit_with_patient_search(patient_fullname, "Treatment Authorised")
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
    
    var format_date = get_date_with_days_from_today_dd_mmm_yyyy(-7);
    var format_date_1 = get_todays_date_in_dd_mmm_yyyy();
    
    //var date = String(format_date);
    
//    var format_date = aqConvert.DateTimeToFormatStr(date, "%d-%b-%Y");
//    var format_date_1 = aqConvert.DateTimeToFormatStr(aqConvert.StrToDate(aqDateTime.Today()), "%d-%b-%Y");
  
    add_historic_treatment(date, "2.4", "1.9", "1", "7", "2.5");
    add_historic_treatment(date, "2.2", "2.2", "0", "7", "2.5");
    add_historic_treatment(date, "2.5", "2.0", "1", "7", "2.5");

    treatment_data.push(format_date, "2.4", "1.9", "", "1", "7", "", format_date_1, "-");
    treatment_row = get_treatment_row(0);
    var result_set_1 = checkArrays_containing_inr_values(treatment_row, treatment_data, "checking historic entry 1");
    result_set.push(result_set_1);
    treatment_data.length = 0;
    
    treatment_data.push(format_date, "2.2", "2.2", "", "0", "7", "", format_date_1, "-"); 
    treatment_row = get_treatment_row(1);
    result_set_1 = checkArrays_containing_inr_values(treatment_row, treatment_data, "checking historic entry 2");
    result_set.push(result_set_1);
    treatment_data.length = 0;
    
    treatment_data.push(format_date, "2.5", "2.0", "", "1", "7", "", format_date_1, "-"); 
    treatment_row = get_treatment_row(2);
    result_set_1 = checkArrays_containing_inr_values(treatment_row, treatment_data, "checking historic entry 3");
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
    var test_title = 'Treatment - Maintenance/Manual - Dosing under 12 years old';
    
    // Setup test scenario
    login(5, "Shared");
    var w_yr = aqString.SubString(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-800))), 6, 4);
    add_patient_extended('Regression', 'under_12', 'M', 'Shared', null, w_yr); 
    add_treatment_plan('W','Manual','','Shared','');
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.Today()), "2.4", "1.0", "7");
    edit_treatment_plan('Coventry');
    
    // Initialise Test Results array
    var result_set = new Array();
    
    // Extract the actual warning message text
    var error_panel_text = clinical_details_banner_bar().innerText;
    
    // Compare actual warning text with expected warning text
    var result = compare_values(error_panel_text, get_string_translation("The patient is less than 12 years old; this patient can only be manually dosed"));
    
    results_checker(result, test_title);
  
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
		
    // Setup test scenario
    login(5, "Shared");
		add_patient('Regression', 'Use_Alternate', 'M', 'Shared');
		add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.3", "1.2", "0", "11", "2.5");
		add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
		
		// Initialise Test Results arrays
    var result_set = new Array();
		var dosing_schedule = new Array();				
		var dosing_schedule_1 = new Array();		
		
		//get the current on screen treatment schedule
		dosing_schedule_1 = get_pending_suggested_treatment_schedule(0);
		
		//get path to "More Schedules" button, click button
    var dosing_schedule_content_path = dosing_schedule_content();
		var more_schedule_button_path = dosing_schedule_content_path.Fieldset(0).Panel(0).Button("MoreSchedulesLink");
		var more_schedule_button = more_schedule_button_path.Click();
		
		//get path to "Use" button, click button
		var more_schedules = more_schedule_table();
    if (more_schedules.Cell(2, 2).disabled == true)
		{
      var table_row = more_schedules.Cell(2, 2);
    }
    else
    {
      var table_row = more_schedules.Cell(1, 2);
    }
		var use_button = table_row.Button("Use").Click();
		
		//get the current on screen treatment schedule
		dosing_schedule = get_pending_suggested_treatment_schedule(0);
		
		//Check the arrays are the same size, but values DON'T match
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
    
    // Setup test scenario
		login(5, "Shared");
		add_patient('Regression', 'Unstable_Patient', 'M', 'Shared');
		add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-4))), "2.3", "1.2", "0", "4", "2.5");
    
    // Initialise Test Results arrays
    var result_set = new Array();
		
    // Navigate to enter a new INR
    Goto_Patient_New_INR();
    process_popup(get_string_translation("This patient has recently started Warfarin. Please confirm that they are appropriately stable for a maintenance algorithm"), +
      get_string_translation("Confirm"));
		
    // Get the expected message
    var expected_error_text = get_string_translation("To use this algorithm safely patients should be established on Warfarin and have an interval between " +
      "the last 2 INR tests of at least 7 days. This patient does not currently meet this criterion.")
		
		// Get the actual message from the new INR page banner
		var error_banner_path = treatment_banner_error_message();
    var actual_message_text = error_banner_path.TextNode(0).innerText;
    
    // Check the expected message and actual message match
		var result_set_1 = compare_values(actual_message_text, expected_error_text, test_title);
    result_set.push(result_set_1);
    
    // Is the Calculate Warfarin Dose button enabled
    var suggest_dose_button = treatment_buttons_pre_schedule().SubmitButton("CalculateWarfarinDose").enabled;   

		// Ensure that the Calculate Warfarin Dose button is not enabled
    var result_set_1 = results_checker_are_false(suggest_dose_button);
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
    
    // Setup test scenario
		login(5, "Shared");
		add_patient('Regression', 'Overriding_Twenty', 'M', 'Shared');
		add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.8", "1.3", "0", "11", "2.4");
		add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
		
		var new_dose = get_string_translation("3.0");
		var new_review_days = "21 " + get_string_translation("Days");
		var result_set = new Array();
		var original_values = new Array();
		var overriden_values = new Array();
   
    // Add original values from treatment table to an array - for checking later
		original_values = get_treatment_row_key_values(0, "pending");
    
		// Click the override button
		override_button().Click();
		
		// Overide Dose settings
		treatment_override_field_container().Cell(1, 1).Select("Treatment_Dose").ClickItem(new_dose);
		treatment_override_field_container().Cell(1, 3).Select("Treatment_Review").ClickItem(new_review_days);
		
		// Click the save button - to save the overidden values
		overide_accept_button().Click();
		
	   // Specify the expected message to appear
		var expected_message_content = get_string_translation("Dose change from 1.3mg/day to 3.0mg/day is greater than 20%. Please confirm that the new dose is appropriate.");
    
    // Extract the actual message from the pop up window
    var actual_message_content = process_popup(get_string_translation("Please Confirm"), get_string_translation("Confirm"));
    
    // Check expected message content matches the actual
    var result_set_1 = compare_values(expected_message_content, actual_message_content, test_title);
    result_set.push(result_set_1);
    
    // Save the INR 
    handle_dosing_modification_required();
    save_inr_button().Click();
    
    // Add the new (overidden) values to an array from treatment table 
		overriden_values = get_treatment_row_key_values(0, "pending");
    
    // Compare original and overidden values from treatment table to ensure they don't match
		var result_set_1 = checkArrays_containing_inr_values(original_values, overriden_values, test_title);
    var result_set_1 = results_checker_are_false(result_set_1);
		result_set.push(result_set_1);
    
    // Check the overidden values are striked through
    var strikethrough = treatment_table().Cell(1, 3).Panel(0).style.textdecoration;
    var result_set_1 = compare_values(strikethrough, "line-through", test_title);
    result_set.push(result_set_1);
    
    var strikethrough = treatment_table().Cell(1, 6).Panel(0).style.textdecoration;
    var result_set_1 = compare_values(strikethrough, "line-through", test_title);
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
		result_set_1 = checkArrays_containing_inr_values(expected_values, override_values, test_title);
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
		result_set_1 = checkArrays_containing_inr_values(expected_values, override_values, test_title);
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
    add_pending_manual_treatment('2.6', 'PoCT', '2.9', '7');
    
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
		result_set_1 = checkArrays_containing_inr_values(treatment_values, summary_values, test_title);
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
    
    login(8, "Shared");
    patient_search(patient_nhs_number);
  
    button = override_button().enabled;
    result_set_1 = button_checker(button, "disabled", "Testing read-only level user cannot click " + 
                                                    "save inr on pending treatment for manual dosing");
    result_set.push(result_set_1);
  
    Log_Off();
    
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
    
    var patient_fullname = get_patient_fullname();
    
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
    
    var is_in_table = accept_patient_in_transfer_request_message(patient_fullname);
    
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
    
    result_set_1 = validate_top_patient_audit(test_title, get_string_translation("Add Manual Treatment"));
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
function tc_inr_test_results_received_from_instrument_match_to_patient()
{
  try
  {
    var test_title = "External Results - Sent from CSP auto associate to patient"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results_Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 3);
    
    //Post in external results
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared','');
    
    //Get external result that matches timestamp
    var actual_results = get_inr_results_received_with_timestamp(inr_test_timestamp.inr_patient_results);
    
    //Prepare result array
    var result_set = new Array();
    
    //Check INR value in table matches that of sent
    var result_set_1 = compare_values(body_data.resultValue, actual_results.inr, "Checking INR values on table Matches incoming results");
    result_set.push(result_set_1);
    
    //Check time value in table matches that of sent
    var result_set_1 = compare_values(inr_test_timestamp.inr_patient_results, actual_results.test_timestamp, "Checking Blood Taken Times on table Matches incoming results"); 
    result_set.push(result_set_1);
    
    //Check source value in table matches that of sent
    var result_set_1 = data_contains_checker(actual_results.source, "instrument", "Checking source of result in table is Instrument");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_from_instrument_match_to_patient";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inr_test_results_received_from_instrument_most_recent_result_appears_at_bottom_of_table()
{
  try
  {
    var test_title = "External Results - Sent from CSP most recent appears at bottom of table"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results_Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 3);
    var inr_test_timestamp2 = get_timestamps_for_now_object_with_changed_hours('-', 2);
    
    //Post in external results
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    var body_data2 = json_body_data_instrument(patient, location_id, "2.3", inr_test_timestamp2.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    post_external_result_instrument(JSON.stringify(body_data2)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared',''); 
    
    //Get row value of latest posted entry
    var actual_results = get_inr_results_received_with_timestamp(inr_test_timestamp2.inr_patient_results);
    
    //Prepare result array
    var result_set = new Array();
    
    //Check latest of posted entries appears at bottom of list
    var result_set_1 = compare_values(2, actual_results.row, "Checking row value of most recently posted result reflects bottom of table containing 2 rows");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_from_instrument_most_recent_result_appears_at_bottom_of_table";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inr_test_results_received_from_instrument_matched_to_patient_do_not_appear_if_over_3_days_old()
{
  try
  {
    var test_title = "External Results - Sent from CSP: do not appear on patient results - if more than 3 days old"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results_Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 96);
    
    //Post in external results
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared',''); 
    
    //Goto New INR page - Check the patient result table is present - return true/false
    Goto_Patient_New_INR();
    var table_exists = Check_if_patients_inr_results_table_exists();
    
    //Prepare result array
    var result_set = new Array();
    
    //Check table does not exist
    var result_set_1 = compare_values(false, table_exists, "Checking that table does not exist");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off();  
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_from_instrument_matched_to_patient_do_not_appear_if_over_3_days_old";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inr_test_results_received_from_instrument_matched_to_patient_can_dose_a_manual_patient()
{
  try
  {
    var test_title = "External Results - Sent from CSP: can be used to dose a patient on manual treatment plan"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results_Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 1);
    
    //Post in external results
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared',''); 
    
    //Obtain external result info from table
    var external_result = get_inr_results_received_with_timestamp(inr_test_timestamp.inr_patient_results);
    
    //Select Use Result button
    select_use_external_result_button_from_row(external_result.row);
    
    //Dose the patient
    var dose_data = continue_adding_manual_treatment_after_using_result("1.2", "7");
    
    //Select Ok to confirm suggested treatment
    save_inr_button().Click()
    
    //Prepare result array
    var result_set = new Array();
    
    //Grab values from INR treatments table get_historic_treatment_with_timestamp
    actual_results = get_treatment_with_timestamp(inr_test_timestamp.historic_treatments);
    
    //Check values from INR treatments table - inr
    var result_set_1 = compare_values(body_data.resultValue, actual_results.inr, "Checking INR result on historic treatment table Matches incoming results");
    result_set.push(result_set_1);
    
    //Check values from INR treatments table - dose
    var result_set_1 = compare_values(dose_data.dose, actual_results.dose, "Checking INR dose on historic treatment table Matches incoming results");
    result_set.push(result_set_1);
    
    //Check values from INR treatments table - review_days
    var result_set_1 = compare_values(dose_data.review, actual_results.review_days, "Checking INR review_days on historic treatment table Matches incoming results");
    result_set.push(result_set_1);
    
    //Check values from INR treatments table - test_date
    var result_set_1 = compare_values(inr_test_timestamp.historic_treatments, actual_results.test_date, "Checking INR test_date on historic treatment table Matches incoming results");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_from_instrument_matched_to_patient_can_dose_a_manual_patient";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inr_test_results_received_archive_button_archiving_last_result_removes_patient_result_table()
{
  try
  {
    var test_title = "External Results - Sent from CSP: archiving last result removes patient result table"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results_Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 3);
    
    //Post in external results
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    //Add Treatment plan 
    add_treatment_plan('W','Manual','','Shared','');
    
    //Get external result that matches timestamp
    var actual_results = get_inr_results_received_with_timestamp(inr_test_timestamp.inr_patient_results);
    
    //Select Archive result and discard 
    archive_treatment(actual_results.row, "Discard");
   
    //Check if table exists - goto will return true or false pending if present
    var table_exists = Check_if_patients_inr_results_table_exists();
    
    //Prepare result array
    var result_set = new Array();
    
    //Check that the table vanished after last result archived
    var result_set_1 = compare_values(false, table_exists, "Checking that table does not exist");
    result_set.push(result_set_1);
    
    //Check the top audit information section includes rejection
    var result_set_1 = validate_more_info_top_patient_audit("User Rejected");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_archive_button_archiving_last_result_removes_patient_result_table";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inr_test_results_received_archive_button_archiving_two_results_in_sequence_starting_with_oldest()
{
  try
  {
    var test_title = "External Results - Sent from CSP: can archive multiple results in succession starting with oldest"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results_Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    
    //Post in older external results
    var expected_older_blood_taken_time = get_timestamps_for_now_object_with_changed_hours('-', 3);
    var body_data_older = json_body_data_instrument(patient, location_id, "2.2", expected_older_blood_taken_time.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data_older)); 
    
    //Post in most recent external results
    var expected_newer_blood_taken_time = get_timestamps_for_now_object_with_changed_hours('-', 2);
    var body_data_newer = json_body_data_instrument(patient, location_id, "2.5", expected_newer_blood_taken_time.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data_newer)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared','');
    
    //Get external result that matches timestamp of older posted result
    var actual_results = get_inr_results_received_with_timestamp(expected_older_blood_taken_time.inr_patient_results);
      
    //Select Archive result and discard for oldest result
    archive_treatment(actual_results.row, "Discard");
    
    //Get remaining result - newer
    var remaining_results = read_inr_results_received_from_table_with_timestamp(expected_newer_blood_taken_time.inr_patient_results);
    
    //Prepare result array
    var result_set = new Array();
    
    //Checking that there is only 2 rows left in the table (1 being the header row).
    var result_set_1 = compare_values(2, remaining_results.row_count, "Checking: That there is only 2 rows left in the table (1 being the header row)"); 
    result_set.push(result_set_1);
    
    //Checking that the remaining entry in the table reflects the newer of the posted results.
    var result_set_1 = compare_values(expected_newer_blood_taken_time.inr_patient_results, remaining_results.test_timestamp, "Checking: The newer of the two results entries now sits atop the table."); 
    result_set.push(result_set_1);
    
    //Select Archive, Comment & discard result for remaining result - recording comments as we do so
    var comments = archive_treatment(remaining_results.row, "Message");
    
    //Check the audit information section includes the comments
    var result_set_1 = validate_more_info_top_patient_audit(comments);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off();  
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_archive_button_archiving_two_results_in_sequence_starting_with_oldest";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inr_test_results_received_archive_button_archiving_two_results_in_sequence_starting_with_most_recent()
{
  try
  {
    var test_title = "External Results - Sent from CSP: can archive multiple results in succession starting with most recent"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results_Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    
    //Post in older external results
    var expected_older_blood_taken_time = get_timestamps_for_now_object_with_changed_hours('-', 3);
    var body_data_older = json_body_data_instrument(patient, location_id, "2.2", expected_older_blood_taken_time.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data_older)); 
    
    //Post in newer external results
    var expected_newer_blood_taken_time = get_timestamps_for_now_object_with_changed_hours('-', 2);
    var body_data_newer = json_body_data_instrument(patient, location_id, "2.5", expected_newer_blood_taken_time.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data_newer)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared','');
    
    //Get external result that matches timestamp of newer posted result
    var actual_results = get_inr_results_received_with_timestamp(expected_newer_blood_taken_time.inr_patient_results);
    
    //Select Archive & discard result for newer result
    archive_treatment(actual_results.row, "Discard");
    
    //Now that table has refreshed get the results for the oldest result
    var remaining_results = read_inr_results_received_from_table_with_timestamp(expected_older_blood_taken_time.inr_patient_results);
    
    //Prepare result array
    var result_set = new Array();
    
    //Checking that there is only 2 rows left in the table (1 being the header row).
    var result_set_1 = compare_values(2, remaining_results.row_count, "Checking: That there is only 2 rows left in the table (1 being the header row)"); 
    result_set.push(result_set_1);
    
    //Checking that the remaining entry in the table reflects the older of the posted results.
    var result_set_1 = compare_values(expected_older_blood_taken_time.inr_patient_results, remaining_results.test_timestamp, "Checking: The older of the two results entries now sits atop the table."); 
    result_set.push(result_set_1);
    
    //Select Archive, Comment & discard result for remaining result - recording comments as we do so
    var comments = archive_treatment(remaining_results.row, "Message");
    
    //Check the audit information section includes the comments
    var result_set_1 = validate_more_info_top_patient_audit(comments);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_archive_button_archiving_two_results_in_sequence_starting_with_most_recent";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inr_test_results_received_archive_button_archiving_process_can_be_cancelled_if_selected_in_error()
{
  try
  {
    var test_title = "External Results - Sent from CSP archiving process can be cancelled if selected in error"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results_Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 3);
    
    //Post in external results
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared','');
    
    //Get external result that matches timestamp
    var actual_results = get_inr_results_received_with_timestamp(inr_test_timestamp.inr_patient_results);
    
    //Select Archive result and cancel 
    archive_treatment(actual_results.row, "Cancel");
    
    //Extract data from external results
    var remaining_results = read_inr_results_received_from_table_with_timestamp(inr_test_timestamp.inr_patient_results);
    
    //Prepare result array
    var result_set = new Array();
    
     //Check time value in table matches that of sent
    var result_set_1 = compare_values(inr_test_timestamp.inr_patient_results, remaining_results.test_timestamp, "Checking Blood Taken Times on table Matches incoming result"); 
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_archive_button_archiving_process_can_be_cancelled_if_selected_in_error";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inr_test_results_received_archive_button_archiving_process_can_be_commented_upon()
{
  try
  {
    var test_title = "External Results - Sent from CSP: archiving process can be commented upon"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results_Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 3);
    
    //Post in external results
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared','');
    
    //Get external result that matches timestamp
    var actual_results = get_inr_results_received_with_timestamp(inr_test_timestamp.inr_patient_results);
    
    //Select Archive result and add comments as it is discarded - record comments
    var comments = archive_treatment(actual_results.row, "Message");
    
    //Prepare result array
    var result_set = new Array();
        
    //Check the top audit information section includes the comments
    var result_set_1 = validate_more_info_top_patient_audit(comments);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_archive_button_archiving_process_can_be_commented_upon";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inr_test_results_received_archive_button_archiving_process_can_remove_results_received_by_instrument()
{
  try
  {
    var test_title = "External Results - Sent from CSP: archiving process can remove results received by instrument"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results_Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 3);
    
    //Post in external results
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared','');
    
    //Get external result that matches timestamp
    var actual_results = get_inr_results_received_with_timestamp(inr_test_timestamp.inr_patient_results);
    
    //Select Archive result and add comments as it is discarded 
    var comments = archive_treatment(actual_results.row, "Message");
    
    //Check the patient result table is present
    var table_exists = Check_if_patients_inr_results_table_exists();
    
    //Prepare result array
    var result_set = new Array();
    
    //Check that the table vanished after last result archived
    var result_set_1 = compare_values(false, table_exists, "Checking that table does not exist");
    result_set.push(result_set_1);
        
    //Check the top audit information section includes the comments
    var result_set_1 = validate_more_info_top_patient_audit(comments);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_archive_button_archiving_process_can_remove_results_received_by_instrument";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inr_test_results_received_archive_button_archived_results_can_be_obtained()
{
  try
  {
    var test_title = "External Results - Sent from CSP: archived results can be obtained"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results_Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 1);
    
    //Post in external results
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    //Add Treatment plan
    add_treatment_plan('W','Manual','','Shared',''); 
    
    //Get external result that matches timestamp
    var actual_results = get_inr_results_received_with_timestamp(inr_test_timestamp.inr_patient_results);
    
    //Select Archive result and add comments as it is discarded 
    var comments = archive_treatment(actual_results.row, "Message");
    
    //Prepare result array
    var result_set = new Array();
    
    //Navigate to External Results & get latest archived
    var archived_results = get_external_results_received_with_timestamp(inr_test_timestamp.external_results, "Archived")
    
    //Check archived results being shown is true - inr
    var result_set_1 = compare_values(archived_results.inr, body_data.resultValue, "Checking that archived INR result is obtainable");
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_archive_button_archived_results_can_be_obtained";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//--------------------------------------------------------------------------------
function tc_inr_test_results_received_from_instrument_archiving_results_from_external_results_tab_is_possible()
{
  try
  {
    var test_title = "External Results - Sent from CSP: archiving results from external results tab is possible"
    
    //Setup test scenario
    login(7, "Shared");
    var location_id = get_organization_id_from_current_location();
    add_patient('Regression', 'External_Results_Processing', 'M', 'Shared');
    var patient = get_patient_details_object_from_demographics();
    var inr_test_timestamp = get_timestamps_for_now_object_with_changed_hours('-', 1);
    var inr_test_timestamp2 = get_timestamps_for_now_object_with_changed_hours('-', 2);
    
    //Post in two lots of external results - that way when we archive one = table still remains    
    var body_data = json_body_data_instrument(patient, location_id, "2.2", inr_test_timestamp.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data)); 
    
    var body_data2 = json_body_data_instrument(patient, location_id, "2.7", inr_test_timestamp2.csp_payload); 
    post_external_result_instrument(JSON.stringify(body_data2)); 
    
    //Get latest result_data from table
    var external_result = get_external_results_received_with_timestamp(inr_test_timestamp.external_results)
            
    //Prepare result array
    var result_set = new Array();
    
    //Check latest result data reflects a posted results
    var result_set_1 = compare_values(external_result.inr, body_data.resultValue, "Checking an expected entry in external results is present");
    result_set.push(result_set_1);
       
    //Select Archive result and discard with message - store message as comments 
    var comments = archive_test_result(external_result.row, "Message")
    
    //Search for patient
    patient_search(patient.fullname);
    
    //Check the top audit information section includes the comments
    var result_set_1 = validate_more_info_top_patient_audit(comments);
    result_set.push(result_set_1);
    
    //Validate all the results sets are true & Pass in the result
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title); 
    Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_inr_test_results_received_from_instrument_archiving_results_from_external_results_tab_is_possible";
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
//--------------------------------------------------------------------------------
function tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_coventry_dosing()
{
  try
  {
    var test_title = "Treatment - Permissions - New INR button, make sure correct permission levels are applied for coventry dosing";
		login(5, "Shared");
    add_patient("Regression", "Permissions Coventry", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var pat_nhs = get_patient_nhs();    
    var result_set = new Array();
    
    Log_Off();
    
    for(var i = 0; i < 8; i++)
    {
      var state = "";
    
      login(i, "Shared");
      patient_search(pat_nhs);
      state = get_new_inr_button_state();
      
      if(i == 3 || i == 4 || i == 5 || i == 7)
      {
        result_set_1 = button_checker(state, "enabled", "Check " + i + " Permissions");
      }
      else
      {
        result_set_1 = button_checker(state, "disabled", "Check " + i + " Permissions");
      }
      result_set.push(result_set_1);
      var results = results_checker_are_true(result_set);
      

      Log_Off();
    }       
      results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_coventry_dosing";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_hillingdon_dosing()
{
  try
  {
    var test_title = "Treatment - Permissions - New INR button, make sure correct permission levels are applied for hillingdon dosing";
		login(5, "Shared");
    add_patient("Regression", "Permissions Hillingdon", "M", "Shared");
    add_treatment_plan("W", "Hillingdon", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var pat_nhs = get_patient_nhs();    
    var result_set = new Array();
    
    Log_Off();
    
    for(var i = 0; i < 8; i++)
    {
      var state = "";
    
      login(i, "Shared");
      patient_search(pat_nhs);
      state = get_new_inr_button_state();
      
      if(i == 3 || i == 4 || i == 5 || i == 7)
      {
        result_set_1 = button_checker(state, "enabled", "Check " + i + " Permissions");
      }
      else
      {
        result_set_1 = button_checker(state, "disabled", "Check " + i + " Permissions");
      }
      result_set.push(result_set_1);
      var results = results_checker_are_true(result_set);
      Log_Off();
    }       
      results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_hillingdon_dosing";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_manual_dosing()
{
  try
  {
    var test_title = "Treatment - Permissions - New INR button, make sure correct permission levels are applied for manual dosing";
		login(5, "Shared");
    add_patient("Regression", "Permissions Manual", "M", "Shared");
    add_treatment_plan('W','Manual','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    
    var pat_nhs = get_patient_nhs();    
    var result_set = new Array();
    
    Log_Off();
    
    for(var i = 0; i < 8; i++)
    {
      var state = "";
    
      login(i, "Shared");
      patient_search(pat_nhs);
      state = get_new_inr_button_state();
      
      if(i == 5 || i == 7)
      {
        result_set_1 = button_checker(state, "enabled", "Check " + i + " Permissions");
      }
      else
      {
        result_set_1 = button_checker(state, "disabled", "Check " + i + " Permissions");
      }
      result_set.push(result_set_1);
      var results = results_checker_are_true(result_set);
      Log_Off();
    }       
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_manual_dosing";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_tait_dosing()
{
  try
  {
    var test_title = "Treatment - Permissions - New INR button, make sure correct permission levels are applied for tait dosing";
		login(5, "Shared");
    add_patient("Regression", "Permissions Tait", "M", "Shared");
    add_treatment_plan('W','Tait','','Shared','');
    add_induction_slow_treatment('1.0')
    
    var pat_nhs = get_patient_nhs();    
    var result_set = new Array();
    
    Log_Off();
    
    for(var i = 0; i < 8; i++)
    {
      var state = "";
    
      login(i, "Shared");
      patient_search(pat_nhs);
      state = get_new_inr_button_state();
      
      if(i == 3 || i == 4 || i == 5 || i == 7)
      {
        result_set_1 = button_checker(state, "enabled", "Check " + i + " Permissions");
      }
      else
      {
        result_set_1 = button_checker(state, "disabled", "Check " + i + " Permissions");
      }
      result_set.push(result_set_1);
      var results = results_checker_are_true(result_set);
      Log_Off();
    }       
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_tait_dosing";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_oates_dosing()
{
  try
  {
    var test_title = "Treatment - Permissions - New INR button, make sure correct permission levels are applied for oates dosing";
		login(5, "Shared");
    add_patient("Regression", "Permissions Oates", "M", "Shared");
    add_treatment_plan('W','Oates','','Shared','');
    add_induction_slow_treatment('1.0')
    
    var pat_nhs = get_patient_nhs();    
    var result_set = new Array();
    
    Log_Off();
    
    for(var i = 0; i < 8; i++)
    {
      var state = "";
    
      login(i, "Shared");
      patient_search(pat_nhs);
      state = get_new_inr_button_state();
      
      if(i == 3 || i == 4 || i == 5 || i == 7)
      {
        result_set_1 = button_checker(state, "enabled", "Check " + i + " Permissions");
      }
      else
      {
        result_set_1 = button_checker(state, "disabled", "Check " + i + " Permissions");
      }
      result_set.push(result_set_1);
      var results = results_checker_are_true(result_set);
      Log_Off();
    }       
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_oates_dosing";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_fast_dosing()
{
  try
  {
    var test_title = "Treatment - Permissions - New INR button, make sure correct permission levels are applied for fast dosing";
		login(5, "Shared");
    add_patient("Regression", "Permissions Fast", "M", "Shared");
    add_treatment_plan('W','Fast','','Shared','');
    add_fast_induction_treatment('1.0')
    
    var pat_nhs = get_patient_nhs();    
    var result_set = new Array();
    
    Log_Off();
    
    for(var i = 0; i < 8; i++)
    {
      var state = "";
    
      login(i, "Shared");
      patient_search(pat_nhs);
      state = get_new_inr_button_state();
      
      if(i == 3 || i == 4 || i == 5 || i == 7)
      {
        result_set_1 = button_checker(state, "enabled", "Check " + i + " Permissions");
      }
      else
      {
        result_set_1 = button_checker(state, "disabled", "Check " + i + " Permissions");
      }
      result_set.push(result_set_1);
      var results = results_checker_are_true(result_set);
      Log_Off();
    }       
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_permissions_new_inr_button_make_sure_correct_permission_levels_are_applied_for_fast_dosing";
    handle_failed_tests(suite_name, test_name);
  }
}

