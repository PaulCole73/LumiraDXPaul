//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Reviews
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Patient_Management
//USEUNIT TSA_Clinics_Appointments
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//USEUNIT INRstar_Misc_Functions
//--------------------------------------------------------------------------------
function tc_treatment_plan_add_first_manual_treatment_plan()
{
  try
  {
    var test_title = 'Treatment Plan - Add first manual treatment plan'
    login(5, "Shared");
    add_patient('Regression', 'Add_manual_tp', 'M'); 
    add_treatment_plan('W','Manual','','Shared','');
  
    result_set = new Array();
  
    //Check the confirmation banner is displayed
    //var result_set_1 = banner_checker('The patient\'s dosing method is currently set to : Manual Dosing')
    var result_set_1 = banner_checker(get_string_translation("The patient's dosing method is currently set to :") + " " + get_string_translation("Manual Dosing"));
    result_set.push(result_set_1);
  
    //Check the audit for adding the tp
    result_set_1 = validate_top_patient_audit(test_title, get_string_translation("Add Treatment Plan Details"));
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
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_treatment_plan_add_first_manual_treatment_plan";
    handle_failed_tests(suite_name, test_name);
  }
}
//----------------------------------------
function tc_treatment_plan_add_first_maintenance_treatment_plan()
{
  try
  {
    var test_title = 'Treatment Plan - Add first maintenance treatment plan'
    login(5, "Shared");
    add_patient('Regression', 'Add_maintenance_tp', 'M'); 
    add_treatment_plan('W','Coventry','','Shared','');
  
    //Check the audit for adding the tp
    var results = validate_top_patient_audit(test_title, get_string_translation("Add Treatment Plan Details"));
    
    //Pass in the result
    results_checker(results, test_title); 
  
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_treatment_plan_add_first_maintenance_treatment_plan";
    handle_failed_tests(suite_name, test_name);
  }  
}
//----------------------------------------
function tc_treatment_plan_add_a_new_treatment_plan_before_any_treatments_have_been_added()
{
  try
  {
    var test_title = 'Treatment Plan - Add a new treatment plan before any treatments have been added'
    login(5, "Shared");
    add_patient('Regression', 'Add_new_tp', 'M'); 
    add_treatment_plan('W','Coventry','','Shared','');
    Goto_Patient_Treatment_Plan();
  
    var button = new_treatment_plan_button_path().enabled;
    var results = button_checker(button,"disabled", test_title);
  
    //Pass in the result
    results_checker(results,test_title); 
  
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_treatment_plan_add_a_new_treatment_plan_before_any_treatments_have_been_added";
    handle_failed_tests(suite_name, test_name);
  }  
} 
//----------------------------------------
function tc_treatment_plan_add_a_new_treatment_plan_after_treatments_have_been_added_induction_patient()
{
  try
  { 
    var test_title = "Treatment Plan - Add a new treatment plan after treatments have been added - Induction patient";
    login(5, "Shared");
    add_patient("Regression", "New_tp_induct_pat", "M");
    add_treatment_plan("W", "Tait", "", "Shared", "");
    add_induction_slow_treatment('1.0');
  
    var result_set = new Array();

    Goto_Patient_Treatment_Plan();
    new_treatment_plan_button_path().Click();
    process_popup(get_string_translation("Confirmation Required"), get_string_translation("Confirm"));
    var popup_msg = process_popup(get_string_translation("New treatment plan will invalidate Induction protocol"),"OK");
    var result_set_1 = compare_values(popup_msg, get_string_translation("This patient is currently on an Induction protocol. Creating a new treatment plan will invalidate the Induction protocol")); 
    result_set.push(result_set_1);

    add_treatment_plan("W", "Manual", aqConvert.StrToDate(aqDateTime.Today()), "Shared", "2");

    result_set_1 = validate_top_patient_audit(test_title, get_string_translation("New Treatment Plan"));
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
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_treatment_plan_add_a_new_treatment_plan_after_treatments_have_been_added_induction_patient";
    handle_failed_tests(suite_name, test_name);
  }
}
//----------------------------------------
function tc_treatment_plan_add_a_new_treatment_plan_for_an_induction_patient_yellow_banner_is_displayed()
{
  try
  {  
    var test_title = 'Treatment Plan - Add a new treatment plan for an induction patient yellow banner is displayed'
    login(5, "Shared");
    add_patient('Regression', 'New_tp_induct_pat', 'M'); 
    add_treatment_plan('W','Oates','','Shared','');
  
    result = banner_checker_includes(get_string_translation("The patient's dosing method is currently set to :")  + " " + get_string_translation("Induction"));
  
    //Pass in the result
    results_checker(result,test_title); 
  
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_treatment_plan_add_a_new_treatment_plan_for_an_induction_patient_yellow_banner_is_displayed";
    handle_failed_tests(suite_name, test_name);
  }
} 
//----------------------------------------
function tc_treatment_plan_ensure_that_all_fields_are_editable_on_the_treatment_plan_if_no_treatments_have_been_added()
{
  try
  { 
    var test_title = 'Treatment Plan - Ensure that all fields are editable on the treatment plan if no treatments have been added'
    login(5, "Shared");
    add_patient('Regression', 'Add_new_tp', 'M'); 
    add_treatment_plan('W','Manual','','Shared','');
  
    //Testing the editable fields
    var result_set = new Array();
  
    //Testing the start date
    var result_set_1 = is_tp_date_picker_active();
    result_set.push(result_set_1);
     
    //Testing the rest of the treatment Plan fields
    var edit_treatment_plan = edit_treatment_plan_path();
  
    result_set_1 = test_field(edit_treatment_plan.Panel(1).Select("DiagnosisSelected"), "Diagnosis", "editable_field"); 
    result_set.push(result_set_1);
  
    result_set_1 = test_field(edit_treatment_plan.Panel(2).Select("DrugId"), "Drug", "editable_field");
    result_set.push(result_set_1);
  
    result_set_1 = test_field(edit_treatment_plan.Panel(3).Select("TreatmentDuration"), "Duration", "editable_field");
    result_set.push(result_set_1);
     
    var edit_treatment_plan_warfarin_details = edit_treatment_plan_warfarin_details_path();
  
    result_set_1 = test_field(edit_treatment_plan_warfarin_details.Panel("DiagnosisDetails").Panel(0).Select("TargetINR"), "Target INR", "editable_field");
    result_set.push(result_set_1);
  
    result_set_1 = test_field(edit_treatment_plan_warfarin_details.Panel(0).Select("DosingMethod"), "Dosing Method", "editable_field");
    result_set.push(result_set_1);
  
    result_set_1 = test_field(edit_treatment_plan_warfarin_details.Panel(1).Select("TestingMethod"), "Testing Method", "editable_field");
    result_set.push(result_set_1);
  
    result_set_1 = test_field(edit_treatment_plan_warfarin_details.Panel(2).Select("MaxReview"), "Max Review", "editable_field");
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
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_treatment_plan_ensure_that_all_fields_are_editable_on_the_treatment_plan_if_no_treatments_have_been_added";
    handle_failed_tests(suite_name, test_name);
  }   
} 
//----------------------------------------
function tc_treatment_plan_dont_show_treatments_from_previous_treatment_plan_unless_requested_specifically()
{
  try
  {  
    var test_title = 'Treatment Plan - Don\'t show treatments from previous treatment plan unless requested specifically'
    login(5, "Shared");
    add_patient('Regression', 'tp_dropdown', 'M'); 
    add_treatment_plan('W','Manual','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    deactivate_patient();
    reactivate_patient('W', 'Coventry',aqConvert.StrToDate(aqDateTime.Today()));
  
    var result_set = new Array();
  
    var button = view_all_treatments_button().enabled;
    var result_set_1 = button_checker(button, "disabled", test_title);
    result_set.push(result_set_1);
  
    var tp_drop_down_path = tp_drop_down();
    tp_drop_down_path.ClickItem(1);
  
    result_set_1 = tp_banner_warning_checker(get_string_translation("This treatment plan ended on the"));
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
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_treatment_plan_dont_show_treatments_from_previous_treatment_plan_unless_requested_specifically";
    handle_failed_tests(suite_name, test_name);
  }  
} 
//----------------------------------------
function tc_edit_treatment_plan_after_a_review_has_been_added()
{
  try
  {  
    var test_title = 'Treatment Plan - Edit treatment plan after a review has been added'
    login(5, "Shared");
    add_patient('Regression', 'Edit_tp', 'M'); 
    add_treatment_plan('W','Manual','','Shared','');
    add_warfarin_review_new_review_button();
  
    //Testing the editable fields
    var result_set = new Array();
   
    Goto_Patient_Treatment_Plan_Edit_Existing_Plan();
    var edit_treatment_plan = edit_treatment_plan_path();
      
    //Testing the start date
    var result_set_1 = test_field(edit_treatment_plan.Panel(0).Label("Start_DetachedLabel"),'Start_date', 'read_only');
    result_set.push(result_set_1);
    
    result_set_1 = test_field(edit_treatment_plan.Panel(1).Label("DiagnosisName_DetachedLabel"),'Diagnosis','read_only'); 
    result_set.push(result_set_1);
  
    result_set_1 = test_field(edit_treatment_plan.Panel(2).Label("DrugName_DetachedLabel"), 'Drug','read_only');
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
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_edit_treatment_plan_after_a_review_has_been_added";
    handle_failed_tests(suite_name, test_name);
  }   
} 
//----------------------------------------
function tc_treatment_plan_add_a_new_treatment_plan_for_a_non_warfarin_drug_check_all_the_drugs_warn_the_user()
{
  try
  {  
    var test_title = 'Treatment Plan - Add a new treatment plan for a non warfarin drug, check all the drugs warn the user'
    login(5, "Shared");
    add_patient('Regression', 'Add_new_tp', 'M'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
    var result_set = new Array();
  
    var result_set_1 = add_treatment_plan_drug_warning_checker('Acenocoumarol','Please ensure that this patient has discontinued their existing' + 
    ' anticoagulation medication before commencing this treatment plan. Consult product literature for details.');
    result_set.push(result_set_1);
  
    var add_treatment_plan_button_path = add_treatment_plan_button();
    add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
    result_set_1 = add_treatment_plan_drug_warning_checker('Apixaban','Please ensure that this patient has discontinued their warfarin' +
    ' treatment and has an INR of less than 2.0 before commencing this treatment plan. Consult product literature for details.');
    result_set.push(result_set_1);
  
    add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
    result_set_1 = add_treatment_plan_drug_warning_checker('Dabigatran','Please ensure that this patient has discontinued their warfarin' + 
    ' treatment and has an INR of less than 2.0 before commencing this treatment plan. Consult product literature for details.');
    result_set.push(result_set_1);

    add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
    result_set_1 = add_treatment_plan_drug_warning_checker('Dalteparin (LMWH)','Please ensure that this patient has discontinued their existing' + 
    ' anticoagulation medication before commencing this treatment plan. Consult product literature for details.');
    result_set.push(result_set_1);

    add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
    result_set_1 = add_treatment_plan_drug_warning_checker('Edoxaban','Please ensure that this patient has discontinued their existing anticoagulation' +
    ' medication and has an INR less or equal to 2.5 before commencing this treatment plan. Consult product literature for details.');
    result_set.push(result_set_1);

    add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
    result_set_1 = add_treatment_plan_drug_warning_checker('Enoxaparin (LMWH)','Please ensure that this patient has discontinued their existing anticoagulation' +
    ' medication before commencing this treatment plan. Consult product literature for details.');
    result_set.push(result_set_1);

    add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
    result_set_1 = add_treatment_plan_drug_warning_checker('Rivaroxaban','Please ensure that this patient has discontinued their warfarin treatment and has an INR' +
    ' less or equal to 3.0 (stroke prevention) or 2.5(DVT/PE) before commencing this treatment plan. Consult product literature for details');
    result_set.push(result_set_1);

    add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results, test_title); 
  
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_treatment_plan_add_a_new_treatment_plan_for_a_non_warfarin_drug_check_all_the_drugs_warn_the_user";
    handle_failed_tests(suite_name, test_name);
  }  
} 
//----------------------------------------
function tc_edit_treatment_plan_change_dosing_method_to_another_algorithm()
{
  try
  {  
    var test_title = 'Edit treatment plan - Change Dosing Method to another algorithm'
    login(5, "Shared");
    add_patient('Regression', 'Add_new_tp', 'M'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
    var result_set = new Array();
  
    var result_set_1 = edit_treatment_plan('Manual');
    result_set.push(result_set_1);
  
    result_set_1 = get_treatment_plan_single_field('dm');
    result_set.push(result_set_1); 

    result_set_1 = validate_top_patient_audit(test_title,get_string_translation('Edit Treatment Plan Details'));
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
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_edit_treatment_plan_change_dosing_method_to_another_algorithm";
    handle_failed_tests(suite_name, test_name);
  }  
} 
//----------------------------------------
function tc_edit_treatment_plan_change_target_inr_and_other_edits_of_clinical_detail_with_existing_treatment()
{
  try
  {  
    var test_title = 'Edit treatment plan - Change target INR and other edits of clinical detail with existing treatment'
    login(5, "Shared");
    add_patient('Regression', 'Edit_tp_with_treat', 'M'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
 
    var result_set = new Array();
    
    var clinical_details_before_edit = get_patient_clinical_details();
    edit_all_fields_treatment_plan_with_treatment();
    var clinical_details_after_edit = get_patient_clinical_details();
    Log.Message(clinical_details_before_edit);
    Log.Message(clinical_details_after_edit);
  
    var result_set_1 = validate_arrays_dont_match(clinical_details_before_edit, clinical_details_after_edit, test_title);
    result_set.push(result_set_1);
  
    result_set_1 = validate_top_patient_audit(test_title,get_string_translation("Edit Treatment Plan Details"));
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
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_edit_treatment_plan_change_target_inr_and_other_edits_of_clinical_detail_with_existing_treatment";
    handle_failed_tests(suite_name, test_name);
  }
}
//----------------------------------------
function tc_edit_treatment_plan_change_diagnosis()
{
  try
  {  
    var test_title = 'Edit treatment plan - Change diagnosis'
    login(5, "Shared");
    add_patient('Regression', 'Edit_tp_diagnosis', 'M'); 
    add_treatment_plan('W','Coventry','','Shared','');
  
    var clinical_details_before_edit = get_treatment_plan_single_field('diagnosis');    
    edit_treatment_plan_diagnosis();
    WaitSeconds(2);
    var clinical_details_after_edit = get_treatment_plan_single_field('diagnosis');
  
    var result_set = new Array();
    
    var result_set_1 = compare_values_dont_match(clinical_details_before_edit, clinical_details_after_edit, test_title);
    //result_set_1 = results_checker_is_false(result_set_1); This can be removed once I can test currently blocked due to the buttons being moved
    result_set.push(result_set_1);
  
    result_set_1 = validate_top_patient_audit(test_title,get_string_translation("Edit Treatment Plan Details"));
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
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_edit_treatment_plan_change_diagnosis";
    handle_failed_tests(suite_name, test_name);
  }
} 
//----------------------------------------
function tc_treatment_plan_add_a_new_treatment_plan_after_a_treatment_has_been_added_selecting_yes_to_using_previous()
{
  try
  {
    var test_title = 'Treatment Plan - Add a new treatment plan after a treatment has been added selecting yes to using previous';
		login(5, "Shared");
    add_patient('Regression', 'Use_Previous', 'M');
    add_treatment_plan('W', 'Manual', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "7", "2.5");
    
    var result_set = new Array();
    var current_values = new Array();
    var previous_values = new Array();
    var date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d/%m/%Y");
    
    current_values = get_treatment_row_key_values(0, "current");
    add_treatment_plan('W', 'Manual', date, 'Shared', '2', '', true);
    
    if(process_object_exists("contentText", get_string_translation("Treatments from previous plan")))
    {
      previous_values = get_treatment_row_key_values(0, "previous");
    }
    
    var result_set_1 = checkArrays(current_values, previous_values, "Compare Treatment Rows");
    result_set.push(result_set_1);  

    result_set_1 = validate_top_patient_audit(test_title, get_string_translation("New Treatment Plan"));
    result_set.push(result_set_1);
    result_set_1 = validate_more_info_top_patient_audit(get_string_translation("Is Treatment Plan In Use?") + " " + get_string_translation("set to") + " [" + 
                                                        get_string_translation("True") + "]");
    result_set.push(result_set_1);

    result_set_1 = validate_more_info_top_patient_audit(get_string_translation("Are Previous Treatment Plan's Treatments Relevant?") + " " 
                                                        + get_string_translation("set to") + " " + "[1]");                                            
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    
    results_checker(results, test_title);
    
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_treatment_plan_add_a_new_treatment_plan_after_a_treatment_has_been_added_selecting_yes_to_using_previous";
    handle_failed_tests(suite_name, test_name);
  }
}
//----------------------------------------
function tc_treatment_plan_add_treatment_patient_with_future_appointment()
{
  try
  {
    var test_title = "Treatment Plan - Add Treatment With Future Appointment";
		login(7, "Shared");
    var result_set = new Array();
    
    var clinic_name = aqConvert.DateTimeToStr(aqDateTime.Now());
    var clinic_date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (+10)), "%d/%m/%Y");
    tsa_add_a_clinic(clinic_name, clinic_date, false, false);
    
    add_patient('Regression', 'Future_Appointment', 'M');
    add_treatment_plan('W', 'Coventry', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "7", "2.5");
    
    Log.Message(clinic_name);
    Log.Message(clinic_date);
    tsa_clinic_make_appointment(clinic_name, clinic_date);
     
    var date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d/%m/%Y");
    var msg = add_treatment_plan("Warfarin", "Manual", date, "Shared", "2", "", false);
    
    //This will need to become something better also (it's yucky) once I get another method/test that requires it
    clinic_date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (+10)), "%A %d-%B-%Y");
    var clinic_day = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (+10)), "%A");
    var clinic_day_num = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (+10)), "%d");
    var clinic_month = set_italian_long_month(aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (+10)), "%B")); //date time functions are relative to the pc locale, should be reworked using a region identifier
    var clinic_year = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (+10)), "%Y");
    
    //Way too much happening here now needs to be in a test step but not got enough time right now
    if(language == "Italian")
    {
      var expected_msg = get_string_translation("This patient has the following booked appointment(s):") + "\r\n\r\n"
      + get_string_translation(clinic_day) + " " + clinic_day_num + "-" + clinic_month + "-" + clinic_year + " " + get_string_translation("at")
      + " " + "12:10" + " (" + get_string_translation("INR Test") + ")" + "\r\n\r\n" 
      + get_string_translation("All appointments will be cancelled.");
    }
      else
      {
       var expected_msg = ("This patient has the following booked appointment(s):") + "\r\n\r\n"
                          + clinic_date + " at 12:10" + " [INR Test]" + "\r\n\r\n" 
                          + ("All appointments will be cancelled.");
      }
     
    var result_set_1 = compare_values(aqString.Trim(msg, aqString.stAll), aqString.Trim(expected_msg, aqString.stAll),test_title);
    result_set.push(result_set_1); 
    
    result_set_1 = validate_top_patient_audit(test_title, get_string_translation("New Treatment Plan"));
    result_set.push(result_set_1);
    
    //Setting back to short month for the audit check                     
    //var clinic_month = aqString.ToLower(aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (+10)), "%b"));
    var clinic_month = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(), (+10)), "%b");

    if(language == "Italian")
    {
    //Added in space here Italy build is going to fail as spaces missing - string_translation("Booked") + "] "
    result_set_1 = validate_more_info_top_patient_audit("Appointment " + get_string_translation("record") + " [" + clinic_day_num + "-" + get_string_translation(clinic_month) + "-" + clinic_year +"] " 
                                                         + get_string_translation("was updated") + ". "  + get_string_translation("Status") + " " + get_string_translation("changed from") 
                                                         + " [" + get_string_translation("Booked") + "]" + get_string_translation("to") + " [" + get_string_translation("Cancelled") + "]");
    }
    else
    {
    result_set_1 = validate_more_info_top_patient_audit("Appointment " + get_string_translation("record") + " [" + clinic_day_num + "-" + get_string_translation(clinic_month) + "-" + clinic_year +"] " 
                                                         + get_string_translation("was updated") + ". "  + get_string_translation("Status") + " " + get_string_translation("changed from") 
                                                         + " [" + get_string_translation("Booked") + "] " + get_string_translation("to") + " [" + get_string_translation("Cancelled") + "]");
    }
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment_Plan";
    var test_name = "tc_treatment_plan_add_treatment_patient_with_future_appointment";
    handle_failed_tests(suite_name, test_name);
  }
}
//----------------------------------------

//----------------------------------------

//----------------------------------------

//----------------------------------------

//----------------------------------------

//----------------------------------------