//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Reviews
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Patient_Management

//USEUNIT Generic_Functions
//USEUNIT Navigation
//--------------------------------------------------------------------------------
function tc_treatment_plan_add_first_manual_treatment_plan()
{
 try
 {
  var test_title = 'Treatment Plan - Add first manual treatment plan'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Add_manual_tp', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
  
  result_set = new Array();
  
  //Check the confirmation banner is displayed
  var result_set_1 = banner_checker('The patient\'s dosing method is currently set to : Manual Dosing')
  result_set.push(result_set_1);
  
  //Check the audit for adding the tp
  result_set_1 = display_top_patient_audit('Add Treatment Plan Details');
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
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }
}
//----------------------------------------
function tc_treatment_plan_add_first_maintenance_treatment_plan()
{
 try
 {
  var test_title = 'Treatment Plan - Add first maintenance treatment plan'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Add_maintenance_tp', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  
  //Check the audit for adding the tp
  var result = display_top_patient_audit('Add Treatment Plan Details');
    
  //Pass in the result
  results_checker(result,test_title); 
  
  Log_Off(); 
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
    }  
}
//----------------------------------------
function tc_treatment_plan_add_a_new_treatment_plan_before_any_treatments_have_been_added()
{
try
 {
  var test_title = 'Treatment Plan - Add a new treatment plan before any treatments have been added'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Add_new_tp', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  Goto_Patient_TreatmentPlan();
  
  var new_treatment_plan_button = new_treatment_plan_button_path();
  var button = check_button(new_treatment_plan_button);
  
  var results = button_checker(button,'disabled',test_title);
  
  //Pass in the result
  results_checker(results,test_title); 
  
  Log_Off(); 
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }  
} 
//----------------------------------------
function tc_treatment_plan_add_a_new_treatment_plan_after_treatments_have_been_added_induction_patient()
{
 try
 {  
  var test_title = 'Treatment Plan - Add a new treatment plan after treatments have been added - Induction patient'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'New_tp_induct_pat', 'M', 'Shared'); 
  add_treatment_plan('W','Fast','','Shared','');
  add_fast_induction_treatment('1.0');
  
  result_set = new Array();

  result_set_1 = new_tp_popup_checker('This patient is currently on an Induction protocol. Creating a new treatment plan will invalidate the Induction protocol');
  result_set.push(result_set_1);
  
  //need to continue with adding tp here so either continue or add then run the new tp function
  var ok_error_pop_up_buttons_path = ok_error_pop_up_buttons();
  ok_error_pop_up_buttons_path.Button(1).TextNode(0).Click();

  add_treatment_plan('W','Manual',aqConvert.StrToDate(aqDateTime.Today()),'Shared','3');

  result_set_2 = validate_top_patient_audit(test_title,'New Treatment Plan');
  result_set.push(result_set_2);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);

  //Pass in the result
  results_checker(results,test_title); 
  
 Log_Off(); 
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }
}
//----------------------------------------
function tc_treatment_plan_add_a_new_treatment_plan_for_an_induction_patient_yellow_banner_is_displayed()
{
 try
 {  
  var test_title = 'Treatment Plan - Add a new treatment plan for an induction patient yellow banner is displayed'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'New_tp_induct_pat', 'M', 'Shared'); 
  add_treatment_plan('W','Oates','','Shared','');
  
  result = banner_checker_includes('The patient\'s dosing method is currently set to : Induction');
  
  //Pass in the result
  results_checker(result,test_title); 
  
  Log_Off(); 
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }
} 
//----------------------------------------
function tc_treatment_plan_ensure_that_all_fields_are_editable_on_the_treatment_plan_if_no_treatments_have_been_added()
{
try
 {  
  var test_title = 'Treatment Plan - Ensure that all fields are editable on the treatment plan if no treatments have been added'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Add_new_tp', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
  
  //Testing the editable fields
  result_set = new Array();
  
  //Testing the start date
  result_set_1 = is_tp_date_picker_active();
  result_set.push(result_set_1);
     
  //Testing the rest of the treatment Plan fields
  var edit_treatment_plan = edit_treatment_plan_path();
  
  result_set_2 = test_field(edit_treatment_plan.Panel(1).Select("DiagnosisSelected"),'Diagnosis','editable_field'); 
  result_set.push(result_set_2);
  
  result_set_3 = test_field(edit_treatment_plan.Panel(2).Select("DrugId"), 'Drug','editable_field');
  result_set.push(result_set_3);
  
  result_set_4 = test_field(edit_treatment_plan.Panel(3).Select("TreatmentDuration"), 'Duration','editable_field');
  result_set.push(result_set_4);
     
  var edit_treatment_plan_warfarin_details = edit_treatment_plan_warfarin_details_path();
  
  result_set_5 = test_field(edit_treatment_plan_warfarin_details.Panel("DiagnosisDetails").Panel(0).Select("TargetINR"), 'Target INR','editable_field');
  result_set.push(result_set_5);
  
  result_set_6 = test_field(edit_treatment_plan_warfarin_details.Panel(0).Select("DosingMethod"),'Dosing Method','editable_field');
  result_set.push(result_set_6);
  
  result_set_7 = test_field(edit_treatment_plan_warfarin_details.Panel(1).Select("TestingMethod"),'Testing Method','editable_field');
  result_set.push(result_set_7);
  
  result_set_8 = test_field(edit_treatment_plan_warfarin_details.Panel(2).Select("MaxReview"),'Max Review','editable_field');
  result_set.push(result_set_8); 
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title); 
 
  Log_Off(); 
  
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }   
} 
//----------------------------------------
function tc_treatment_plan_dont_show_treatments_from_previous_treatment_plan_unless_requested_specifically()
{
try
 {  
  var test_title = 'Treatment Plan - Don\'t show treatments from previous treatment plan unless requested specifically'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'tp_dropdown', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  deactivate_patient();
  reactivate_patient('W', 'Coventry',aqConvert.StrToDate(aqDateTime.Today()));
  
  result_set = new Array();
  
  var all_treat_button = view_all_treatments_button();
  var button = check_button(all_treat_button);
  var result_set_1 = button_checker(button,'disabled',test_title);
  
  var tp_drop_down_path = tp_drop_down();
  tp_drop_down_path.ClickItem(1);
  
  result_set_2 = tp_banner_warning_checker('This treatment plan ended');
  banner_checker_includes
  result_set.push(result_set_2);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title); 
  
 Log_Off(); 
  
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }  
} 
//----------------------------------------
function tc_edit_treatment_plan_after_a_review_has_been_added()
{
try
 {  
  var test_title = 'Treatment Plan - Edit treatment plan after a review has been added'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Edit_tp', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
  add_warfarin_review_new_review_button();
  
  //Testing the editable fields
  result_set = new Array();
   
  Goto_Patient_TreatmentPlan_Edit();
  var edit_treatment_plan = edit_treatment_plan_path();
      
  //Testing the start date
  result_set_1 = test_field(edit_treatment_plan.Panel(0).Label("Start_DetachedLabel"),'Start_date', 'read_only');
  result_set.push(result_set_1);
    
  result_set_2 = test_field(edit_treatment_plan.Panel(1).Label("DiagnosisName_DetachedLabel"),'Diagnosis','read_only'); 
  result_set.push(result_set_2);
  
  result_set_3 = test_field(edit_treatment_plan.Panel(2).Label("DrugName_DetachedLabel"), 'Drug','read_only');
  result_set.push(result_set_3);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title); 
 
  Log_Off(); 
  
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }   
} 
//----------------------------------------
function tc_treatment_plan_add_a_new_treatment_plan_for_a_non_warfarin_drug_check_all_the_drugs_warn_the_user()
{
try
 {  
  var test_title = 'Treatment Plan - Add a new treatment plan for a non warfarin drug, check all the drugs warn the user'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Add_new_tp', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
  result_set = new Array();
  
  result_set_1 = add_treatment_plan_drug_warning_checker('Acenocoumarol','Please ensure that this patient has discontinued their existing' + 
  ' anticoagulation medication before commencing this treatment plan. Consult product literature for details.');
  result_set.push(result_set_1);
  
  var add_treatment_plan_button_path = add_treatment_plan_button();
  add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
  result_set_2 = add_treatment_plan_drug_warning_checker('Apixaban','Please ensure that this patient has discontinued their warfarin' +
  ' treatment and has an INR of less than 2.0 before commencing this treatment plan. Consult product literature for details.');
  result_set.push(result_set_2);
  
  add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
  result_set_3 = add_treatment_plan_drug_warning_checker('Dabigatran','Please ensure that this patient has discontinued their warfarin' + 
  ' treatment and has an INR of less than 2.0 before commencing this treatment plan. Consult product literature for details.');
  result_set.push(result_set_3);

  add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
  result_set_4 = add_treatment_plan_drug_warning_checker('Dalteparin (LMWH)','Please ensure that this patient has discontinued their existing' + 
  ' anticoagulation medication before commencing this treatment plan. Consult product literature for details.');
  result_set.push(result_set_4);

  add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
  result_set_5 = add_treatment_plan_drug_warning_checker('Edoxaban','Please ensure that this patient has discontinued their existing anticoagulation' +
  ' medication and has an INR less or equal to 2.5 before commencing this treatment plan. Consult product literature for details.');
  result_set.push(result_set_5);

  add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
  result_set_6 = add_treatment_plan_drug_warning_checker('Enoxaparin (LMWH)','Please ensure that this patient has discontinued their existing anticoagulation' +
  ' medication before commencing this treatment plan. Consult product literature for details.');
  result_set.push(result_set_6);

  add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
  result_set_7 = add_treatment_plan_drug_warning_checker('Rivaroxaban','Please ensure that this patient has discontinued their warfarin treatment and has an INR' +
  ' less or equal to 3.0 (stroke prevention) or 2.5(DVT/PE) before commencing this treatment plan. Consult product literature for details');
  result_set.push(result_set_7);

  add_treatment_plan_button_path.Button("CancelPatientTreatmentPlanEdit").Click();
  
  //Validate all the results sets are true
  Log.Message(result_set);
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title); 
  
  Log_Off(); 
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }  
} 
//----------------------------------------
function tc_edit_treatment_plan_change_dosing_method_to_another_maintenance_algorithm()
{
try
 {  
  var test_title = 'Edit treatment plan - Change Dosing Method to another maintenance algorithm'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Add_new_tp', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
  result_set = new Array();
  
  result_set_1 = edit_treatment_plan('Hillingdon');;
  result_set.push(result_set_1);
  
  result_set_2 = get_treatment_plan_single_field('dm');
  result_set.push(result_set_2); 

  result_set_3 = validate_top_patient_audit(test_title,'Edit Treatment Plan Details');
  result_set.push(result_set_3);
  
  Log.Message(result_set);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title); 
  
 Log_Off(); 
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }  
} 
//----------------------------------------
function tc_edit_treatment_plan_change_target_inr_and_other_edits_of_clinical_detail_with_existing_treatment()
{
try
 {  
  var test_title = 'Edit treatment plan - Change target INR and other edits of clinical detail with existing treatment'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Edit_tp_with_treat', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
 
  var clinical_details_before_edit = get_patient_clinical_details();
  Log.Message(clinical_details_before_edit + ' This is before');
  
  result_set = new Array();
  edit_all_fields_treatment_plan_with_treatment();
  
  var clinical_details_after_edit = get_patient_clinical_details();
  Log.Message(clinical_details_after_edit + ' This is after');
  
  result_set_1 = validate_arrays_dont_match(clinical_details_before_edit,clinical_details_after_edit,test_title);
  result_set.push(result_set_1);
  
  var result_set_2 = display_top_patient_audit("Edit Treatment Plan Details");
  result_set.push(result_set_2);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title); 

  Log_Off(); 
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }
}
//----------------------------------------
function tc_edit_treatment_plan_change_diagnosis()
{
try
 {  
  var test_title = 'Edit treatment plan - Change diagnosis'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Edit_tp_diagnosis', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  
  var clinical_details_before_edit = get_treatment_plan_single_field('diagnosis');
  Log.Message('This is before //' + clinical_details_before_edit);
  
  edit_treatment_plan_diagnosis();
  
  var clinical_details_after_edit = get_treatment_plan_single_field('diagnosis');
  Log.Message(clinical_details_after_edit + ' This is after');
  
  
  result_set = new Array();
  
  var result_set_1 = test_data_doesnt_match(clinical_details_before_edit,clinical_details_after_edit)
  result_set.push(result_set_1);
  
  var result_set_2 = display_top_patient_audit("Edit Treatment Plan Details");
  result_set.push(result_set_2);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
    
  //Pass in the result
  results_checker(results,test_title); 
  
  Log_Off(); 
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }
} 
//----------------------------------------
//C1248183
function tc_treatment_plan_add_second_treatment_using_previous()
{
  try
  {
    var test_title = 'Treatment Plan - Add a New Treatment Using Previous Plan Details';
		login('cl3@regression','INRstar_5','Shared');
    add_patient('Regression', 'Use_Previous', 'M', 'Shared');
    add_treatment_plan('W', 'Manual', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-5))), "2.4", "2.6", "0", "7", "2.5");
    
    var result_set = new Array();
    var current_values = new Array();
    var previous_values = new Array();
    current_values = get_treatment_row_key_values(0, "current");
    var date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d/%m/%Y");
    
    add_treatment_plan('W', 'Manual', date, 'Shared', '2');
    
    var previous_treatments_check = INRstar_base().NativeWebObject.Find("contentText", "Treatments from previous plan");   
    if(previous_treatments_check.Exists == true)
    {
      previous_values = get_treatment_row_key_values(0, "previous");
    }
    
    var result_set_1 = checkArrays(current_values, previous_values, "Compare Treatment Rows");
    result_set.push(result_set_1);
    result_set_1 = display_top_patient_audit("New Treatment Plan");
    result_set.push(result_set_1);
    result_set_1 = more_info_top_patient_audit("Is Treatment Plan In Use? set to [True]");
    result_set.push(result_set_1);
    result_set_1 = more_info_top_patient_audit("Are Previous Treatment Plan's Treatments Relevant? set to [1]");                                           
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    
    results_checker(results, test_title);
    
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//----------------------------------------

//----------------------------------------

//----------------------------------------

//----------------------------------------

//----------------------------------------

//----------------------------------------

//----------------------------------------