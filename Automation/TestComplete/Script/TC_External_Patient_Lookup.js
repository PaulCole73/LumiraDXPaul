//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Patient_Management
//USEUNIT TSA_Patient_Demographics
//USEUNIT TSA_External_Patient_Lookup
//USEUNIT TSA_Adverse_Event
//USEUNIT TSA_Notes
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_for_maintenance_patient()
{
  try
  {
    var test_title = "External Patient Lookup - Finding the patient - External patient lookup for a maintenance patient";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "External_Lookup", "M", "Shared");
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
    var expected_note = "External Patient Lookup was used to view this patient. Reason: Patient present requiring treatment" 
                        + "\r\n" + "Comments: Test";
    var exp_banner_msg = "The patient's recorded testing location is Deans Regression Testing Location 06925922205";
  
    var nhs = get_patient_nhs();
    patient_data = get_external_patient_lookup_data();
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);
  
    var text = get_top_note_text();
    var banner = patient_banner_yellow_bar().innerText;
  
    var result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
  
    result_set_1 = compare_values(expected_note, text, test_title);
    result_set.push(result_set_1);
  
    result_set_1 = compare_values(exp_banner_msg, banner, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_patient_audit(test_title, "External Patient Lookup - View Record");
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_delete_inr()
{
  try
  {
    var test_title = "External Patient Lookup - Treating the patient - Delete INR";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "External_Delete", "M", "Shared");
    add_treatment_plan('W', 'Coventry', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    add_maintenance_treatment("2.5", aqConvert.StrToDate(aqDateTime.Today()));
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
    var expected_msg = "This treatment cannot be deleted as it was created at another location.";
      
    var nhs = get_patient_nhs();
    patient_data = get_external_patient_lookup_data();
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);
    
    delete_treatment();
    
    var actual_msg = process_popup("Cannot Delete Treatment", "OK");
  
    var result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(expected_msg, actual_msg, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_patient_audit(test_title, "External Patient Lookup - View Record");
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_new_inr()
{
  try
  {
    var test_title = "External Patient Lookup - Treating the patient - New INR";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "External_INR", "M", "Shared");
    add_treatment_plan('W', 'Coventry', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
    var expected_item = 0;
    var expected_state = false;
      
    var nhs = get_patient_nhs();
    patient_data = get_external_patient_lookup_data();
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);
    
    Goto_Patient_New_INR();
    var item = new_inr_test_details().Panel("testDetails").Panel("poctDetails").Panel(2).Select("TestingMethod").wSelectedItem;
    var box_state = new_inr_test_details().Fieldset("Options").Panel(0).Panel(0).Checkbox("UseForEQC").enabled;
    
    add_maintenance_treatment("2.5", aqConvert.StrToDate(aqDateTime.Today()));
  
    var result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(expected_item, item, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(expected_state, box_state, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_patient_audit(test_title, "Add New INR");
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_same_day_maintenance_treatment()
{
  try
  {
    var test_title = "External Patient Lookup - Treating the patient - Same day maintenance treatment";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Ext_Second_Maint", "M", "Shared");
    add_treatment_plan('W', 'Coventry', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    add_maintenance_treatment("2.5", aqConvert.StrToDate(aqDateTime.Today()));
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
    var expected_msg = "This patient already has an INR result recorded on this date. It is not possible to enter more than " + 
                        "one INR result on the same day unless the patient is being dosed manually."
      
    var nhs = get_patient_nhs();
    patient_data = get_external_patient_lookup_data();
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);
    
    Goto_Patient_New_INR();
    
    var msg = treatment_banner_error_message().TextNode(0).innerText;
  
    var result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(expected_msg, msg, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_add_historic_inr()
{
  try
  {
    var test_title = "External Patient Lookup - Treating the patient - Add a historical treatment to the current treatment plan";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "External_Historic", "M", "Shared");
    add_treatment_plan('W', 'Coventry', '', 'Shared', '');
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
      
    var nhs = get_patient_nhs();
    patient_data = get_external_patient_lookup_data();
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);
    
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
  
    var result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_patient_audit(test_title, "Add Historical Treatment");
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_delete_multiple_inr()
{
  try
  {
    var test_title = "External Patient Lookup - Treating the patient - Delete the two last external treatments";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Ext_Delete_Two", "M", "Shared");
    add_treatment_plan('W', 'Coventry', '', 'Shared', '');
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
      
    var nhs = get_patient_nhs();
    patient_data = get_external_patient_lookup_data();
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);
    
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "11", "2.5");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-2))), "2.4", "2.6", "0", "11", "2.5");
    
    delete_treatment();
    delete_treatment();
  
    var result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_patient_audit(test_title, "Treatment Deleted");
    result_set.push(result_set_1);
    
    result_set_1 = validate_specific_entry_patient_audit(2, "Treatment Deleted", test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_add_adverse_event()
{
  try
  {
    var test_title = "External Patient Lookup - Treating the patient - Add an adverse event to the patient";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "External_Adverse", "M", "Shared");
    add_treatment_plan('W', 'Coventry', '', 'Shared', '');
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
      
    var nhs = get_patient_nhs();
    patient_data = get_external_patient_lookup_data();
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);
    
    add_adverse_event();
  
    var result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_patient_audit(test_title, "Add Adverse Event");
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_add_note()
{
  try
  {
    var test_title = "External Patient Lookup - Treating the patient - Add a patient note";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "External_Note", "M", "Shared");
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
      
    var nhs = get_patient_nhs();
    patient_data = get_external_patient_lookup_data();
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);
    
    add_a_new_note();
  
    var result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_patient_audit(test_title, "Add Note");
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_archive_note()
{
  try
  {
    var test_title = "External Patient Lookup - Treating the patient - Archive a patient note";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "External_Archive", "M", "Shared");
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
    var expected_state = true;
      
    var nhs = get_patient_nhs();
    patient_data = get_external_patient_lookup_data();
    
    add_a_new_note();
    
    Goto_Patient_Notes();
    var state = notes_archive_button().enabled;
    
    result_set_1 = compare_values(expected_state, state, test_title);
    result_set.push(result_set_1);
    
    expected_state = false;
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);
    
    Goto_Patient_Notes();
    state = notes_archive_button().enabled;
  
    var result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(expected_state, state, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_edit_treatment_plan()
{
  try
  {
    var test_title = "External Patient Lookup - Treating the patient - Edit the treatment plan";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Ext_Edit_Treat", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
    var expected_state = false;
      
    var nhs = get_patient_nhs();
    patient_data = get_external_patient_lookup_data();
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);
    
    Goto_Patient_Treatment_Plan();
    var state = change_treatment_plan_buttons().Panel(1).Button("EditPatientTreatmentPlanLink").enabled;
  
    var result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(expected_state, state, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_add_treatment_plan()
{
  try
  {
    var test_title = "External Patient Lookup - Treating the patient - Add treatment plan from external location";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Ext_Add_Treat", "M", "Shared");
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
    var expected_state = false;
      
    var nhs = get_patient_nhs();
    patient_data = get_external_patient_lookup_data();
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);
    
    Goto_Patient_Treatment_Plan();
    var state = change_treatment_plan_buttons().Panel(0).Button("AddPatientTreatmentPlanLink").enabled;
  
    var result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(expected_state, state, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_add_treatment_to_old_plan()
{
  try
  {
    var test_title = "External Patient Lookup - Treating the patient - Add treatment to a previous treatment plan";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Ext_Prev_Treat", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    add_treatment_plan("Apixaban", "Coventry", aqConvert.StrToDate(aqDateTime.Today()), "Shared", "2", "52 Weeks");
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
    var expected_state = false;
      
    var nhs = get_patient_nhs();
    patient_data = get_external_patient_lookup_data();
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);
    
    Goto_Patient_Treatments_Tab();
    tp_drop_down().ClickItem(1);
    patient_clinical_tab().Link("TreatmentItem").Click();
    
    var state = new_inr_button_path().enabled;
  
    var result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
    
    result_set_1 = compare_values(expected_state, state, test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_treat_overdue_patient()
{
  try
  {
    var test_title = "External Patient Lookup - Treating the patient - Overdue treatment checking";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "External_Overdue", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-14))), "2.0", "2.0", "0", "7", "2.5");
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
    var expected_state = false;
      
    var nhs = get_patient_nhs();
    var pat_name = get_patient_fullname();
    patient_data = get_external_patient_lookup_data();
    
    var result_set_1 = check_patient_on_overdue_INR_list(pat_name);
    result_set.push(result_set_1);
  
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);

    add_maintenance_treatment("2.5", aqConvert.StrToDate(aqDateTime.Today()));
  
    result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
  
    Log_Off();
    
    login("cl3@regression", "INRstar_5", "Shared");
    
    var state = check_patient_on_overdue_INR_list(pat_name);
    
    result_set_1 = compare_values(expected_state, state, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------
function tc_external_patient_lookup_refer_patient_treatment()
{
  try
  {
    var test_title = "External Patient Lookup - Treating the patient - Referred treatment checking";
    login("cl3@regression", "INRstar_5", "Shared");
    add_patient("Regression", "External_Referred", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-14))), "2.0", "2.0", "0", "7", "2.5");
  
    var result_set = new Array();
    var table_data = new Array();
    var patient_data = new Array();
    var expected_state = false;
      
    var nhs = get_patient_nhs();
    var pat_name = get_patient_fullname();
    patient_data = get_external_patient_lookup_data();
    
    Log_Off();
  
    login("cl3@regression2", "INRstar_5", "Shared");
    table_data = external_lookup_search_for_patient(nhs);

    add_pending_maintenance_treatment("2.0", aqDateTime.Today(), "", "poct");
    var refer_button_path = refer_pending_treat_button().Click();
    
    var result_set_1 = check_patient_on_refer_list(pat_name);
    result_set.push(result_set_1);
  
    result_set_1 = checkArrays(table_data, patient_data, test_title);
    result_set.push(result_set_1);
  
    Log_Off();
    
    login("cl3@regression", "INRstar_5", "Shared");
    
    var state = check_patient_on_refer_list(pat_name);
    
    result_set_1 = compare_values(expected_state, state, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
    
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}