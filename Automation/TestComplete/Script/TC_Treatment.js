//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Reviews
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Patient_Management
//USEUNIT Generic_Functions
//USEUNIT Navigation
//USEUNIT Test_Audit
//--------------------------------------------------------------------------------
function tc_treatment_add_a_historic_treatment()
{
 try
 {
  var test_title = 'Treatment - Add a historic treatment'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Add_historic', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
  result_set = new Array(); 
  
  var treatment_data = new Array();
  
  var inr_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(),(-7)));
  var formatted_inr_date = format_date(inr_date);
  Log.Message(formatted_inr_date);
  
  var ntd = aqConvert.StrToDate(aqDateTime.Today()); 
  var formatted_ntd = format_date(ntd);
  treatment_data.push(formatted_inr_date,"2.0", "2.0", "0", "7",formatted_ntd); 
  
  Log.Message(treatment_data + ' This is data passed in for adding treatment');
  
  var treatment_row = get_treatment_row(0);
  Log.Message(treatment_row)
  
  result_set_1 = checkArrays(treatment_data,treatment_row,test_title);
  result_set.push(result_set_1);
  
  //Check the audit for adding the treatment
  var result_set_2 = display_top_patient_audit('Add Historical Treatment');
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
//--------------------------------------------------------------------------------
function tc_treatment_add_a_manual_INR()
{
 try
 {
  var test_title = 'Treatment - Add a manual INR'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Manual_treatment', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
  add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))),'2.0','2.5','7');

  result_set = new Array(); 
  
  var treatment_data = new Array();
  
  var inr_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(),(-3)));
  var formatted_inr_date = format_date(inr_date);
  Log.Message(formatted_inr_date);
  
  var ntd = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(),(+4))); 
  var formatted_ntd = format_date(ntd);
  treatment_data.push(formatted_inr_date,"2.0", "2.5", "0", "7",formatted_ntd); 
  
  Log.Message(treatment_data + ' This is data passed in for adding treatment');
  
  var treatment_row = get_treatment_row(0);
  Log.Message(treatment_row)
  
  result_set_1 = checkArrays(treatment_data,treatment_row,test_title);
  result_set.push(result_set_1);
  
  //Check the audit for adding the treatment
  var result_set_2 = display_top_patient_audit('Add Manual Treatment');
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
//--------------------------------------------------------------------------------
function tc_treatment_manual_dosing_permissions()
{
 try
 {
  var test_title = 'Treatment - Manual dosing permissions'
  login('cl2@regression','INRstar_5','Shared');
  add_patient('Regression', 'Manual_permissions', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
 
  result_set = new Array(); 
  
  var new_inr_button = new_inr_button_path();
  var button = check_button(new_inr_button);
  
  var result_set_1 = button_checker(button,'disabled','Testing cl2 level user cannot click new inr for manual dosing');
  result_set.push(result_set_1);
  
  var pat_nhs = get_patient_nhs();
  Log_Off();
  
  login('cl3@regression','INRstar_5','Shared');
  
  patient_search(pat_nhs);
  add_pending_manual_treatment('2.5','Lab','2.0','7 Days');
  Log_Off();
  
  login('cl2@regression','INRstar_5','Shared');
  patient_search(pat_nhs);
  
  var save_inr_button_path = save_inr_button();
  var button = check_button(save_inr_button_path);
  
  var result_set_2 = button_checker(button,'disabled','Testing cl2 level user cannot click save inr on pending treatment for manual dosing');
  result_set.push(result_set_2);
  
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
//--------------------------------------------------------------------------------
function tc_treatment_induction_dosing_permissions()
{
 try
 {
  var test_title = 'Treatment - Induction dosing permissions'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'Induction_permissions', 'M', 'Shared'); 
  add_treatment_plan('W','Oates','','Shared','');
  add_pending_induction_slow_treatment('1.2','Shared');
    
  result_set = new Array(); 
  
  var new_inr_button_path = save_inr_button();
  var button_cl3 = check_button(new_inr_button_path);
  var result_set_1 = button_checker(button_cl3,'enabled','Testing cl3 level user can see new inr button enabled for induction dosing');
  result_set.push(result_set_1);
  
  var pat_nhs = get_patient_nhs();
  Log_Off();
  login('cl2@regression','INRstar_5','Shared');
  patient_search(pat_nhs);
  
  var new_inr_button_path = save_inr_button();
  var button_cl2 = check_button(new_inr_button_path);
  var result_set_2 = button_checker(button_cl2,'disabled','Testing cl2 level user cannot click new inr for induction dosing');
  result_set.push(result_set_2);
    
  Log_Off();
  login('cl1@regression','INRstar_5','Shared');
  patient_search(pat_nhs);
  
  var new_inr_button_path = save_inr_button();
  var button_cl3 = check_button(new_inr_button_path);
  var result_set_3 = button_checker(button_cl3,'disabled','Testing cl1 level user cannot click new inr for induction dosing');
  result_set.push(result_set_3);
    
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
//--------------------------------------------------------------------------------
function tc_treatment_add_a_treatment_comment()
{
  try
 {
  var test_title = 'Treatment - Add a treatment comment'
  login('cl2@regression','INRstar_5','Shared');
  add_patient('Regression', 'Treatment_comment', 'M', 'Shared'); 
  add_treatment_plan('W','Hillingdon','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
  var comment = "regression testing comments field"
  add_treatment_comment(comment);
  
  result_set = new Array(); 
  
  //Check the audit for adding the treatment
  var result_set_1 = more_info_top_treatment_audit('Comments set to ['+ comment + ']');
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
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }
} 
//--------------------------------------------------------------------------------
function tc_treatment_add_a_new_maintenance_in_range_inr()
{
  try
 {
  var test_title = 'Treatment - Add a new Maintenance in-range INR';
  login('cl2@regression','INRstar_5','Shared');
  add_patient('Regression', 'treatment_inrange', 'M', 'Shared'); 
  add_treatment_plan('W','Hillingdon','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_maintenance_treatment('2.5',aqConvert.StrToDate(aqDateTime.Today()));
  
  result_set = new Array(); 
  var treatment_data = new Array();
  
  var inr_date = aqConvert.StrToDate(aqDateTime.Today());
  var formatted_inr_date = format_date(inr_date);
  Log.Message(formatted_inr_date);
  
  //Create my expected data for comparison against the treatment row
  var ntd = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(),(+14))); 
  var formatted_ntd = format_date(ntd);
  treatment_data.push(formatted_inr_date,"2.5", "2.0", "0", "14",formatted_ntd); 
  
  Log.Message(treatment_data + ' This is data passed in for adding treatment');
  
  //Get the treatment data from the treatment table
  var treatment_row = get_treatment_row(1);
  Log.Message(treatment_row);
  
  result_set_1 = checkArrays(treatment_data,treatment_row,test_title);
  result_set.push(result_set_1);
  
  //Check the audit for adding the treatment
  var result_set_2 = display_top_patient_audit('Add New INR');
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
//--------------------------------------------------------------------------------
function tc_treatment_add_a_historical_treatment_to_an_induction_patient()
{
try
 {
  var test_title = 'Treatment - Add a historical treatment to an induction patient';
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'historic_induction', 'M', 'Shared'); 
  add_treatment_plan('W','Oates','','Shared','');
  
  result_set = new Array(); 

  click_historic_button();
   
  var actual_warn_mess = get_pre_treatment_warning_message();
  var expected_warn_mess = ("Adding a historical treatment to this patient will remove them from this induction protocol. The patient must be treated by manual dosing.");
  WaitSeconds(2);      
  var result_set_1 = test_data_individual_step(actual_warn_mess,expected_warn_mess,test_title);  
  result_set.push(result_set_1);
  
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  WaitSeconds(2)
  
  //Check the yellow banner message
  var result_set_2 = banner_checker('The patient\'s dosing method is currently set to : No Protocol');
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
//--------------------------------------------------------------------------------
function tc_treatment_no_treatment_can_be_added_to_a_patient_on_no_protocol()
{
try
 {
  var test_title = 'Treatment - No treatment can be added to a patient on no protocol';
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'no_protocol_pat', 'M', 'Shared'); 
  add_treatment_plan('W','Oates','','Shared','');
  
  result_set = new Array(); 

  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
  Goto_Patient_New_INR();
  var actual_error_mess = get_treatment_error_banner();
  var expected_error_mess = ("The patient currently has no dosing method, you will need to update their treatment plan details before you can dose the patient.");      
  var result_set_1 = test_data_individual_step(actual_error_mess,expected_error_mess,test_title);  
  result_set.push(result_set_1);
   
  var sugg_war_dose_button_path = sugg_war_dose_button();
  var button = check_button_enabled(sugg_war_dose_button_path);
  var result_set_2 = button_checker(button,'disabled','Treatment - No treatment can be added to a patient on no protocol');
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
//--------------------------------------------------------------------------------
function tc_treatment_user_cannot_override_an_induction_result()
{
try
 {
  var test_title = 'Treatment - user cannot override an induction result';
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'override_induction', 'M', 'Shared'); 
  add_treatment_plan('W','Oates','','Shared','');
  
  result_set = new Array(); 
  
  add_pending_induction_slow_treatment('1.0','Shared')
   
  var override_button_path = override_button();
  var button = check_button(override_button_path);
  var result_set_1 = button_checker(button,'disabled','Treatment - user cannot override an induction result');
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
//--------------------------------------------------------------------------------
function tc_treatment_adding_a_result_earlier_than_last_recorded_result()
{
try
 {
  var test_title = 'Treatment - Adding a result earlier than last recorded result';
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'treatment_dated_before', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))), "2.0", "2.0", "0", "7", "2.5");
  add_pending_maintenance_treatment('2.5',aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-2))))
  
  result_set = new Array(); 
  
  var actual_error_mess = get_treatment_error_banner();
  Log.Message(actual_error_mess);
  var expected_error_mess = ('You cannot add a treatment with a date that is older than the patient\'s latest treatment date.');      
  var result_set_1 = test_data_contains(actual_error_mess,expected_error_mess,test_title);  
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
//--------------------------------------------------------------------------------
function tc_treatment_user_is_unable_to_add_two_treatments_for_the_same_day_when_on_maintenance()
{
try
 {
  var test_title = 'Treatment - User is unable to add two treatments for the same day when on maintenance';
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'treatment_same_day', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))), "2.0", "2.0", "0", "7", "2.5");
  add_pending_maintenance_treatment('2.5',aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))))
  
  result_set = new Array(); 
  
  var actual_error_mess = get_treatment_error_banner();
  Log.Message(actual_error_mess);
  var expected_error_mess = ('This patient already has an INR result recorded on this date. It is not possible to enter more' +
                             ' than one INR result on the same day unless the patient is being dosed manually.');      
  var result_set_1 = test_data_contains(actual_error_mess,expected_error_mess,test_title);  
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
//--------------------------------------------------------------------------------
function tc_treatment_add_a_new_maintenance_low_inr()
{
try
 {
  var test_title = 'Treatment - Add a new maintenance low INR';
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'mainteance_low', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))), "2.0", "2.0", "0", "7", "2.5");
  add_pending_maintenance_treatment_pop_up_checker('1.0',aqConvert.StrToDate(aqDateTime.Today()));
  
  result_set = new Array(); 
  
  var actual_error_mess = get_dosing_engine_popup_text();
  var expected_error_mess = ('Low INR warning: Patient may be at increased risk of thromboembolic events until INR is back in-range.' + 
                             ' Consult clinical lead for advice about the use of LMWH for very low INR if clinically appropriate.');      
  var result_set_1 = test_data_contains(actual_error_mess,expected_error_mess,test_title);  
  result_set.push(result_set_1);
  
  //Finish saving the treatment
  var pending_treatment_buttons_path = pending_treatment_buttons();
  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
  
  //Check the audit for adding the treatment
  var result_set_2 = display_top_patient_audit('Add New INR');
  result_set.push(result_set_2);
  Log.Message(result_set);
  
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
//--------------------------------------------------------------------------------
function tc_treatment_add_a_new_maintenance_high_inr()
{
try
 {
  var test_title = 'Treatment - Add a new maintenance high INR';
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'mainteance_high', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))), "2.0", "2.0", "0", "7", "2.5");
  add_pending_maintenance_treatment_pop_up_checker('4.0',aqConvert.StrToDate(aqDateTime.Today()));
  
  result_set = new Array(); 
  
  var actual_error_mess = get_dosing_engine_popup_text();
  var expected_error_mess = ('INR above target. Dose and review period adjusted. Check for signs of bruising or bleeding.' + 
  ' Check INR in 2/3 days to confirm INR reduction. See BNF section 2.8.2 or NICE guideline at http://tinyurl.com/NICEscenario3 for details');      
  var result_set_1 = test_data_contains(actual_error_mess,expected_error_mess,test_title);  
  result_set.push(result_set_1);
  
  //Finish saving the treatment
  var pending_treatment_buttons_path = pending_treatment_buttons();
  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
  
  //Check the audit for adding the treatment
  var result_set_2 = display_top_patient_audit('Add New INR');
  result_set.push(result_set_2);
  Log.Message(result_set);
  
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
//--------------------------------------------------------------------------------
function tc_treatment_out_of_range_maintenance_permissions()
{
 try
 {
  var test_title = 'Treatment - Out of Range maintenance permissions'
  login('cl2@regression','INRstar_5','Shared');
  add_patient('Regression', 'out_of_range_permissions', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_pending_maintenance_treatment('5.0',(aqDateTime.Today()));
 
  result_set = new Array(); 
  
  var save_inr_button_path = save_inr_button();
  var button = check_button(save_inr_button_path);
  
  var result_set_1 = button_checker(button,'enabled','Testing cl2 level user can click save inr button for out of range treatment');
  result_set.push(result_set_1);
  
  var pat_nhs = get_patient_nhs();
  Log_Off();
  
  login('cl1@regression','INRstar_5','Shared');
  patient_search(pat_nhs);
  
  var save_inr_button_path = save_inr_button();
  var button = check_button(save_inr_button_path);
  
  var result_set_2 = button_checker(button,'disabled','Testing cl1 level user cannot click save inr button for out of range treatment');
  result_set.push(result_set_2);
  
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
//--------------------------------------------------------------------------------
function tc_treatment_delete_the_last_treatment()
{
 try
 {
  var test_title = 'Treatment - Delete the last treatment'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'delete_treatment', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
 
  result_set = new Array(); 
  
  var inr_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7)));
  var formatted_inr_date = format_date(inr_date);
  var message = 'Please confirm you want to delete the treatment added on the ' + formatted_inr_date + '.';
  Log.Message(message)
  
  var result_set_1 = delete_treatment_confim_checker(message);
  result_set.push(result_set_1);
  
  delete_treatment();
  
  //Check the audit for adding the treatment
  WaitSeconds(1);
  var result_set_2 = display_top_patient_audit('Treatment Deleted');
  result_set.push(result_set_2);
  
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
//--------------------------------------------------------------------------------
function tc_treatment_refer_a_treatment()
{
 try
 {
  var test_title = 'Treatment - Refer a treatment'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'refer_treatment', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_pending_maintenance_treatment('2.0',(aqDateTime.Today()));
  
  //Get all the patient details
  var pat_nhs = get_patient_nhs();
  var patFirstname = get_patient_first_name();
  var patSurname = get_patient_surname();
  var message_name = (patSurname + ", " + patFirstname);
  Log.Message(message_name); 
  Goto_Patient_Treatment();
  
  //Refer
  var pending_treatment_buttons_path = pending_treatment_buttons();
  var refer_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("ReferPendingTreatment").Click();
  
  result_set = new Array(); 
  
  //Check patient on the referred list
  var result_set_1 = check_patient_on_refer_list(message_name)
  result_set.push(result_set_1);
  
  patient_search(pat_nhs);
  
  //Check the audit
  WaitSeconds(1);
  Goto_suggested_treatment_audit();
  var result_set_2 = display_top_treatment_audit('Treatment Referred');
  result_set.push(result_set_2);
  
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
//--------------------------------------------------------------------------------
function tc_treatment_authorise_a_referral()
{
 try
 {
  var test_title = 'Treatment - Authorise a referral'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'authorise_treatment', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_pending_maintenance_treatment('2.0',(aqDateTime.Today()));
  
  //Get all the patient details
  var pat_nhs = get_patient_nhs();
  var patFirstname = get_patient_first_name();
  var patSurname = get_patient_surname();
  var message_name = (patSurname + ", " + patFirstname);
  Log.Message(message_name); 
  Goto_Patient_Treatment();
  
  //Refer
  var pending_treatment_buttons_path = pending_treatment_buttons();
  var refer_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("ReferPendingTreatment").Click();
 
  patient_search(pat_nhs);
  
  result_set = new Array(); 
  
  //Authorise the referral and check patient is no longer on the home page
  var save_inr_button_path = save_inr_button();
  save_inr_button_path.click();
  
  //Check the patient in no longer on the referred list
  var message_name='REGRESSION_492, Authorise_treatment_847'
  var result_set_1 = check_patient_not_on_refer_list(message_name)
  result_set.push(result_set_1);
  
  patient_search(pat_nhs);
  
  //Check the icon is green on the suggested treatment row
  var expected_state = 'Image("GreenIcon_1_PNG")'
  var actual_state = get_treatment_icon_state();
  Log.Message(actual_state)
  var result_set_2 = data_checker(expected_state,actual_state);
  result_set.push(result_set_2);
  
  //Check the audit
  WaitSeconds(1);
  Goto_suggested_treatment_audit();
  var result_set_3 = display_top_treatment_audit('Treatment Authorised');
  result_set.push(result_set_3);
  
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
//--------------------------------------------------------------------------------
function tc_treatment_edit_a_treatment_comment()
{
  try
 {
  var test_title = 'Treatment - Edit a treatment comment'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'edit_comment', 'M', 'Shared'); 
  add_treatment_plan('W','Hillingdon','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
  var old_comment = 'old comment'
  add_treatment_comment(old_comment);
  
  result_set = new Array(); 
  
  var new_comment = 'regression new comment'
  add_treatment_comment(new_comment);
  
  //Check the audit for adding the treatment
  var result_set_1 = more_info_top_treatment_audit('Comments changed from [' + old_comment + '] to [' + new_comment + ']');
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
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
   }
} 
//--------------------------------------------------------------------------------
function tc_treatment_add_multiple_historic_treatments()
{
  try
{
  var test_title = 'Treatment - Maintenance - Historical treatments all dated the same'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'multiple_historical', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  
  var treatment_data = new Array();
  result_set = new Array();
  
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "3.0", "1.5", "0", "7", "2.5");
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "4.0", "1.0", "0", "7", "2.5");
  
  //Setup
  treatment_data.push(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  treatment_data.push(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "3.0", "1.5", "0", "7", "2.5"); 
  treatment_data.push(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "4.0", "1.0", "0", "7", "2.5"); 

  for(var i = 0 ; i < 2 ; i++)
  {
    var treatment_row = get_treatment_row(i);
    result_set.push(treatment_row);
  }
    
  //Assert  
  var results = results_checker_are_true(checkArrays(treatment_data,treatment_row,test_title));
  
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

function tc_treatment_dosing_under_12_years_old()
{
  try
{
  var test_title = 'Treatment - Maintenance/Manual - Dosing under 12 years old'
  login('cl3@regression','INRstar_5','Shared');
  
  var w_yr = aqString.SubString(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-800))), 6, 4);
  
  add_patient_extended('Regression', 'under_12', 'M', 'Shared', null, w_yr); 
  add_treatment_plan('W','Manual','','Shared','');
  add_manual_treatment(aqConvert.StrToDate(aqDateTime.Today()), "2.4", "1.0", "7");
  
  edit_treatment_plan('Coventry');
  var INRstarV5 = set_system(); 
 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var form = panelPCD.Form("PatientEditTreatmentPlanForm");
  
   //Check the Error panel for the text
   var w_err_text = form.Panel("TreatmentPlanValidation").innerText;
   test_message(INRstarV5, w_err_text, "The patient is less than 12 years old; this patient can only be manually dosed", true);
  
   Log_Off(); 
  } 
   catch(e)
   {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off();
   }
}

//--------------------------------------------------------------------------------

//test to check that a new dosing schedule can be selected, checks the original does not match the new schedule
//C1248478
function tc_treatment_create_maintenance_use_alternate_schedules()
{
	try
	{
		var test_title = 'Treatment - Create Maintenance Use Alternate Schedules';
		login('cl3@regression','INRstar_5','Shared');
		add_patient('Regression', 'Use_Alternate', 'M', 'Shared');
		add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), 
																"2.3", "1.2", "0", "11", "2.5");
		add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
		
		var result_set = new Array();
		var dosing_schedule = new Array();				
		var dosing_schedule_1 = new Array();		
		
		//get the current on screen treatment schedule
		dosing_schedule_1 = return_pending_suggested_treatment_schedule(0);
		
		//get path to "More Schedules" button, click button
		var schedule_table = pending_treatment_buttons();
		var more_schedule_button_path = schedule_table.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Fieldset(0).Panel(0).Button("MoreSchedulesLink");
		var more_schedule_button = more_schedule_button_path.Click();
		
		//get path to "Use" button, click button
		var more_schedules = more_schedule_table();
		var table_row = more_schedules.Cell(2, 2);
		var use_button = table_row.Button("Use").Click();
		
		//get the current on screen treatment schedule
		dosing_schedule = return_pending_suggested_treatment_schedule(0);
		
		//Check the arrays are the same size, but values don't match
		var result_set_1 = validateArrays(dosing_schedule, dosing_schedule_1, test_title);
		result_set.push(result_set_1);
		
		//Validate the results sets are false
		var results = results_checker_are_false(result_set);
		Log.Message(results);
		
		//Pass in the result
		results_checker(results, test_title);
		
		Log_Off();
	}
	catch(e)
	{
		Log.Warning('Test "' + test_title + '" Failed Exception Occured = ' + e);
		Log_Off();
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
		login('cl3@regression','INRstar_5','Shared');
		add_patient('Regression', 'Unstable_Patient', 'M', 'Shared');
		add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-4))), 
																                              "2.3", "1.2", "0", "6", "2.5");
		
		Goto_Patient_New_INR();
		
		var expected_error = "To use this algorithm safely patients should be established on warfarin and have an interval between the last 2 INR tests of at least 7 days. This patient does not currently meet this criterion."
		
		//get the message from the new INR page banner
		var error_banner_path = treatment_banner_error_message();
		var error_message_text = error_banner_path.TextNode(0).innerText;
  
		var suggest_dose_button = treatment_buttons_pre_schedule().SubmitButton("CalculateWarfarinDose").enabled;
		
		//check the values match
		var result_set = test_data(error_message_text, expected_error, test_title);
    
		var results = results_checker_are_false(suggest_dose_button);
		results_checker(results, test_title);
	    
		Log_Off();
	}
	catch(e)
	{
		Log.Warning('Test "' + test_title + '" Failed Exception Occured = ' + e);
		Log_Off();
	}
}

//--------------------------------------------------------------------------------

//checks dose/review period can be overwritten and message displays for dose changes > 20%
//C1248488
function tc_treatment_maintenance_overriding_dose_greater_than_twenty_percent()
{
	try
	{
		var test_title = 'Treatment - Overriding Greater than 20%';
		login('cl3@regression','INRstar_5','Shared');
		add_patient('Regression', 'Overriding_Twenty', 'M', 'Shared');
		add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), 
																"2.8", "1.3", "0", "11", "2.4");
		add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
		
		var new_dose = "3.0";
		var new_review_days = "21 Days";
		var result_set = new Array();
		var expected_values = new Array();
		var override_values = new Array();
    
    var pending_dose = pending_treatment_table().Cell(0, 2).innerText;
    var pending_review = pending_treatment_table().Cell(0, 5).innerText;
    var pending_next_test_date = pending_treatment_table().Cell(0, 7).innerText;
		
    //setup for test part 2
		var expected_message = "Dose change from 1.3mg/day to 3.0mg/day is greater than 20%. Please confirm that the new dose is appropriate."
		var output_message;
    
		//click the override button
		var override_button_path = override_button();
		override_button_path.Click();
		
    //add current values to array to check
		expected_values.push(pending_dose, pending_review, pending_next_test_date);
		
		//update dose drop down value, save new dose drop down value
		var override_dose_path = treatment_override_field_container().Cell(1, 1).Select("Treatment_Dose").ClickItem(new_dose);
		
		//update review time drop down value, save new drop down value, save next review date value
		var override_review_date_path = treatment_override_field_container().Cell(1, 3).Select("Treatment_Review").ClickItem(new_review_days);
		
		//click the save button on override menu
		var override_finish_buttons = override_finish_buttons_path();
		override_finish_buttons.Button("OverrideAccept").Click();
		
	  //find the pop up window in the screen
    //---------------------------------------------------------------------------//
    //This should be in a function, couldn't find one that fit this gap
		WaitSeconds(2,"");
  
		var INRstarV5 = INRstar_base();
		var w_hdg = "Please Confirm";
  
		// Find the Panel
		var wbx = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
		if (wbx.Exists == false || wbx.VisibleOnScreen == false)
		{  
			Log.Message("'" + w_hdg + "' box not displayed");
		}
		else
		{
			output_message = INRstarV5.Panel(3).Panel("modalDialogBox").innerText;
			// Just click the correct button...
			INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).Click();    
		}
    //---------------------------------------------------------------------------//
    
    var overwritten_dose = pending_treatment_table().Cell(0, 2).innerText;
    var overwritten_review = pending_treatment_table().Cell(0, 5).innerText;
    var overwritten_next_test_date = pending_treatment_table().Cell(0, 7).innerText;
    
    var strikethrough = pending_treatment_table().Cell(0, 3).Panel(0).style.textdecoration;
    var result_set_2 = test_data(strikethrough, "line-through", test_title);
    var strikethrough_1 = pending_treatment_table().Cell(0, 6).Panel(0).style.textdecoration;
    result_set_2 = test_data(strikethrough, "line-through", test_title);
    
    //add new values to array
		override_values.push(overwritten_dose, overwritten_review, overwritten_next_test_date);
    
    //compare original values, with changed values
		var result_set_1 = validateArrays(expected_values, override_values, test_title);
		result_set.push(result_set_1);
		
		//Validate the results sets are true
		var results = results_checker_are_false(result_set);
		Log.Message(results);
		
		//Pass in the result
		results_checker(results, test_title);
    
    result_set.length = 0;
    
		//check popup message matches the expected message
		result_set = test_data(expected_message, output_message, test_title);
		
		Log_Off();
	}
	catch(e)
	{
		Log.Warning('Test "' + test_title + '" Failed Exception Occured = ' + e);
		Log_Off();
	}
}

//--------------------------------------------------------------------------------

//checks that dose and review periods can be overwritten and saved
//C1248497
function tc_treatment_maintenance_overriding_dose_and_review_period()
{
	try
	{
		var test_title = 'Treatment - Overriding Dose and Review Period';
		login('cl3@regression','INRstar_5','Shared');
		add_patient('Regression', 'Dose_And_Review_Override', 'M', 'Shared');
		add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), 
																"2.8", "2.9", "0", "11", "2.4");
		add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
		
		//setup values to be altered/checked
		var new_dose = "3.0";
		var new_review_days = "13";
		var result_set = new Array();
		var expected_values = new Array();
		var override_values = new Array();
    
    var pending_dose = pending_treatment_table().Cell(0, 2).innerText;
    var pending_review = pending_treatment_table().Cell(0, 5).innerText;
    var pending_next_test_date = pending_treatment_table().Cell(0, 7).innerText;
		
		//add all expected values to array
		expected_values.push(pending_dose, pending_review, pending_next_test_date);
		
		//update the dose, get the new value
		override_dose(new_dose);
		
		//update the review days, get new value, get new next test date
		override_review(new_review_days);
    
    var overwritten_dose = pending_treatment_table().Cell(0, 2).innerText;
    var overwritten_review = pending_treatment_table().Cell(0, 5).innerText;
    var overwritten_next_test_date = pending_treatment_table().Cell(0, 7).innerText;
    
    var strikethrough = pending_treatment_table().Cell(0, 3).Panel(0).style.textdecoration;
    var result_set_2 = test_data(strikethrough, "line-through", test_title);
    var strikethrough_1 = pending_treatment_table().Cell(0, 6).Panel(0).style.textdecoration;
    result_set_2 = test_data(strikethrough, "line-through", test_title);
    
		//add all to array of changed values
		override_values.push(overwritten_dose, overwritten_review, overwritten_next_test_date);
		
		//check arrays are same length but values do not match
		var result_set_1 = validateArrays(expected_values, override_values, test_title);
		result_set.push(result_set_1);
		
		//Validate the results sets are false
		var results = results_checker_are_false(result_set);
		Log.Message(results);
		
		//Pass in the result
		results_checker(results, test_title);
    
		Log_Off();
	}
	catch(e)
	{
		Log.Warning('Test "' + test_title + '" Failed Exception Occured = ' + e);
		Log_Off();
	}
}

//--------------------------------------------------------------------------------
//testing schedules can be re-order via drag/drop dosing values between days, checks schedules change after action
//C1248479
function tc_treatment_drag_and_drop_schedule_days()
{
  try
  {
    //setup a treatment
    var test_title = 'Treatment - Drag and Drop Schedule Days';
    login('cl3@regression','INRstar_5','Shared');
	  add_patient('Regression', 'Dose_And_Review_Override', 'M', 'Shared');
	  add_treatment_plan('W', 'Coventry', '', 'Shared', '');
		add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), 
		                                                        "2.8", "2.9", "0", "11", "2.4");
		add_pending_maintenance_treatment('2.4', aqConvert.StrToDate(aqDateTime.Today()));
    
    //set up arrays for result outputs
    var result_set = new Array();
    var result_set_1 = new Array();
    var results = new Array();
    
    //holds the original and updated dosing arrays
    var dosing_schedule = new Array();
    var dosing_schedule_1 = new Array();
    
    dosing_schedule = return_pending_suggested_treatment_schedule(0);
    
    //get path to re-order buttons
    var suggest_schedule_path = pending_treatment_buttons();
    var re_order_paths = suggest_schedule_path.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Fieldset(0);
    var re_order_button_path = re_order_paths.Panel(0).Button("Re_Order_Schedule").Click();
    var table_cell = re_order_paths.Fieldset("ScheduleGrid").TextNode(12);
    
    //function to drag drop item
    table_cell.Drag(30, 10, 0, -100);
    
    //confirm change
    re_order_paths.Panel(0).Button("Confirm_Re_Order").Click();
    
    dosing_schedule_1 = return_pending_suggested_treatment_schedule(0);
    
    //check outputs, display results
    result_set_1 = validateArrays(dosing_schedule, dosing_schedule_1, test_title);
    result_set.push(result_set_1);
    results = results_checker_are_false(result_set);
    results_checker(results, test_title);
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" Failed Exception Occured = ' + e);
		Log_Off();
  }
}

//--------------------------------------------------------------------------------

//*** NOT READY TO USE YET ***

//function tc_treatment_cancel_pending_treatment() 
//{
//  try
//{
// var test_title = 'Treatment - Maintenance - Cancel pending treatment'
// login('cl3@regression', 'INRstar_5', 'Shared');
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