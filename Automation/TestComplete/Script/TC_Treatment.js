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