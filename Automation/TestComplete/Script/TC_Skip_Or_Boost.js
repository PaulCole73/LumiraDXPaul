//USEUNIT Add_INR_Induction
//USEUNIT Generic_Functions
//USEUNIT System_Paths
//USEUNIT Tested_Apps
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Self_Care
//USEUNIT TSA_SORB
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT Add_INR_Backdated
//--------------------------------------------------------------------------------
//Tests for testing the SORB button for user permission validation 
//--------------------------------------------------------------------------------
function tc_Ensure_SorB_button_is_displayed_but_disabled_for_any_user_lower_than_CL3_on_suggested_and_current_tab()
{
  //Data setup
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Coventry', 'user_perms_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
  add_pending_maintenance_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))));
  
  //Create the array of results for the final check to ensure all dosing algorithms pass the test
  var result_set = new Array()
  
  //Check the suggested tab button
  var sorb_button = sorb_button_suggested_path();
  var button = check_button(sorb_button);
  
  var cl3_suggested_tab = button_checker(button,'enabled','Testing cl3 level user on the suggested tab');
  result_set.push(cl3_suggested_tab);
  
  //Check the current tab button
  var sorb_button = sorb_button_current_path();
  var button = check_button(sorb_button);

  var cl3_current_tab = button_checker(button,'enabled','Testing cl3 level user on the current tab');
  result_set.push(cl3_current_tab);
  
  var pat_nhs = get_patient_nhs();
  
  Log_Off();
  
  //Check the lower level user has the button disabled
  login('cl2@regression','INRstar_5','Shared');
  
  patient_search(pat_nhs);
  
  var sorb_button = sorb_button_low_level_path();
  var button = check_button(sorb_button);
  
  var cl2_suggested_tab = button_checker(button,'disabled','Testing cl2 level user on the suggested tab');
  result_set.push(cl2_suggested_tab);
  
  //Check the current tab button
  var sorb_button = sorb_button_low_level_path();
  var button = check_button(sorb_button);

  var cl2_current_tab = button_checker(button,'disabled','Testing cl2 level user on the current tab');
  result_set.push(cl2_current_tab);

  Log_Off()
  
  //Check the lower level user has the button disabled
  login('cl1@regression','INRstar_5','Shared');

  patient_search(pat_nhs);
  
  var sorb_button = sorb_button_low_level_path();
  var button = check_button(sorb_button);
  
  var cl1_suggested_tab = button_checker(button,'disabled','Testing cl1 level user on the suggested tab');
  result_set.push(cl1_suggested_tab);
  
  //Check the current tab button
  var sorb_button = sorb_button_low_level_path();
  var button = check_button(sorb_button);

  var cl1_current_tab = button_checker(button,'disabled','Testing cl1 level user on the current tab');
  result_set.push(cl1_current_tab);
  
  //Validate all the result sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results,'Permissions - Ensure SorB button is displayed but disabled for any user lower than CL3 on suggested and current tab');
  
  Log_Off();
} 
//-----------------------------
function tc_Ensure_SorB_button_is_enabled_for_any_user_higher_than_CL2_on_suggested_and_current_tab()
{
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Coventry', 'review_period_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
  add_pending_maintenance_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))));

  //Create the array of results for the final check to ensure all dosing algorithms pass the test
  var result_set = new Array()
  
  var sorb_button = sorb_button_suggested_path();
  var button = check_button(sorb_button);
   
  if(button=="enabled")
  {
    Log.Message("button in correct enabled state")  
    click_sorb_button("suggested");  
    
    var sorb_page_heading_path = get_sorb_heading_path();
    var heading = sorb_page_heading_path.contentText;
    
     if(heading=="Skip or Boost\n(based on Suggested schedule)")
        {
         Log.Message("SORB schedule page displayed cl3 on suggested tab")
         result_set.push(true);
        } 
          else 
            {
            Log.Warning("Test Failed - Ensure SorB button is enabled for any user higher than CL2 on suggested and current tab" + " - SORB page was not displayed after clicking button")
            result_set.push(false);
            }
  } 
  if(button=="disabled")
  {
    Log.Message("Button was disabled and should not have been")
    result_set.push(false);
  } 
  
  cancel_pending_sorb_treatment();
  click_current_tab()
  
  var sorb_button = sorb_button_current_path();
  var button = check_button(sorb_button);
   
  if(button=="enabled")
  {
    Log.Message("button in correct enabled state")  
    click_sorb_button("current");  
    
    var sorb_page_heading_path = get_sorb_heading_path();
    var heading = sorb_page_heading_path.contentText;
    
     if(heading=="Skip or Boost\n(based on Current schedule)")
        {
         Log.Message("SORB schedule page displayed cl3 on current tab")
         result_set.push(true);
        } 
          else 
            {
            Log.Warning("Test Failed - Ensure SorB button is enabled for any user higher than CL2 on suggested and current tab" + " - SORB page was not displayed after clicking button")
            result_set.push(false);
            }
  } 
  if(button=="disabled")
  {
    Log.Message("Button was disabled and should not have been")
    result_set.push(false);
  } 
  
  cancel_pending_sorb_treatment();
  var pat_nhs = get_patient_nhs()
  Log_Off()

  //Check the next level up user
  login('clead@regression','INRstar_5','Shared');
  patient_search(pat_nhs);

  var sorb_button = sorb_button_suggested_path();
  var button = check_button(sorb_button);
   
  if(button=="enabled")
  {
    Log.Message("button in correct enabled state")  
    click_sorb_button("suggested");  
    
    var sorb_page_heading_path = get_sorb_heading_path();
    var heading = sorb_page_heading_path.contentText;
    
     if(heading=="Skip or Boost\n(based on Suggested schedule)")
        {
         Log.Message("SORB schedule page displayed cl3 on suggested tab")
         result_set.push(true);
        } 
          else 
            {
            Log.Warning("Test Failed - Ensure SorB button is enabled for any user higher than CL2 on suggested and current tab" + " - SORB page was not displayed after clicking button")
            result_set.push(false);
            }
  } 
  if(button=="disabled")
  {
    Log.Message("Button was disabled and should not have been")
    result_set.push(false);
  } 
  
  cancel_pending_sorb_treatment();
  click_current_tab()
  
  var sorb_button = sorb_button_current_path();
  var button = check_button(sorb_button);
   
  if(button=="enabled")
  {
    Log.Message("button in correct enabled state")  
    click_sorb_button("current");  
    
    var sorb_page_heading_path = get_sorb_heading_path();
    var heading = sorb_page_heading_path.contentText;
    
     if(heading=="Skip or Boost\n(based on Current schedule)")
        {
         Log.Message("SORB schedule page displayed cl3 on current tab")
         result_set.push(true);
        } 
          else 
            {
            Log.Warning("Test Failed - Ensure SorB button is enabled for any user higher than CL2 on suggested and current tab" + " - SORB page was not displayed after clicking button")
            result_set.push(false);
            }
  } 
  if(button=="disabled")
  {
    Log.Message("Button was disabled and should not have been")
    result_set.push(false);
  } 
  
  //Validate all the result sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results,'Ensure SorB button is enabled for any user higher than CL2 on suggested and current tab');

  Log.Message(result_set)
  Log_Off();
} 
//--------------------------------------------------------------------------------
//Tests for testing the SORB button for dosing method validation 
//--------------------------------------------------------------------------------
function tc_Patient_on_Induction_Fast_Fennerty_Gedge_dosing_gets_an_error_when_trying_to_use_the_SorB_button_suggested_tab()
{
  var test_title = 'SORB - Gets error when using SORB suggest button'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB', 'fast_induct_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Fast','','Shared','');
  add_pending_fast_induction_treatment('1.2','Shared');
  click_sorb_button("suggested"); 
  
  var actual_err_mess = get_sorb_button_error_message();
  var expected_err_mess = ("You cannot create a temporary Skip or Boost schedule for a patient on an induction protocol.");      
  
  var result_set = new Array();
  var result_set_1 = compare_values(actual_err_mess,expected_err_mess,'Patient on Induction Fast Fennerty Gedge dosing gets an error when trying to use the SorB button');
  result_set.push(result_set_1);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title); 
       
  var INRstar = INRstar_base()
  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  Log_Off();
}
//-----------------------------
function tc_Patient_on_Induction_Slow_Oates_dosing_gets_an_error_when_trying_to_use_the_SorB_button_suggested_tab()
{
  var test_title = 'SORB - Slow Oates Error'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB', 'oates_induct_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Oates','','Shared','');
  add_pending_induction_slow_treatment('1.2','Shared');
  click_sorb_button("suggested"); 
  
  var actual_err_mess = get_sorb_button_error_message();
  var expected_err_mess = ("You cannot create a temporary Skip or Boost schedule for a patient on an induction protocol.");      
  
  var result_set = new Array();
  var result_set_1 = compare_values(actual_err_mess,expected_err_mess,'Patient on Induction Slow Oates dosing gets an error when trying to use the SorB button');
  result_set.push(result_set_1);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title);
  
  var INRstar = INRstar_base()
  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  Log_Off();
} 
//-----------------------------
function tc_Patient_on_Induction_Slow_Tait_dosing_gets_an_error_when_trying_to_use_the_SorB_button_suggested_tab()
{
  var test_title = 'SORB - Slow Tait Error'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB', 'tait_induct_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Tait','','Shared','');
  add_pending_induction_slow_treatment('1.2','Shared');
  click_sorb_button("suggested"); 
  
  var actual_err_mess = get_sorb_button_error_message();
  var expected_err_mess = ("You cannot create a temporary Skip or Boost schedule for a patient on an induction protocol.");      
  
  var result_set = new Array();
  var result_set_1 = compare_values(actual_err_mess,expected_err_mess, 'Patient on Induction Slow Tait dosing gets an error when trying to use the SorB button');
  result_set.push(result_set_1);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title);       
  
  var INRstar = INRstar_base()
  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  Log_Off();
}
//-----------------------------
function tc_Patient_on_Manual_dosing_gets_an_error_when_trying_to_use_the_SorB_button_suggested_tab()
{
  var test_title = 'SORB - Manual Error'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB', 'manual_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
  add_pending_manual_treatment('2.0','PoCT','2.0', '14 Days');
  
  click_sorb_button("suggested"); 
  
  var actual_err_mess = get_sorb_button_error_message();
  var expected_err_mess = ("You cannot create a temporary Skip or Boost schedule for a patient who is on manual dosing.");      
  
  var result_set = new Array();
  var result_set_1 = compare_values(actual_err_mess,expected_err_mess,'SORB Button Validation - Patient on Manual dosing gets an error when trying to use the SorB button suggested tab')
  result_set.push(result_set_1);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title);   
  
  var INRstar = INRstar_base();
  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  Log_Off();
}
//-----------------------------
function tc_Patient_on_Manual_dosing_gets_an_error_when_trying_to_use_the_SorB_button_in_current_schedule_where_prev_treatment_is_coventry()
{
  var test_title = 'SORB - Manual Error, prev Coventry'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB', 'dosing_method_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
  
  edit_treatment_plan('Manual');
  add_pending_manual_treatment('2.0','PoCT','2.0', '14 Days');
  
  click_sorb_button("current"); 
  
  var actual_err_mess = get_sorb_button_error_message();
  var expected_err_mess = ("You cannot create a temporary Skip or Boost schedule for a patient who is on manual dosing.");        
  
  var result_set = new Array();
  var result_set_1 = compare_values(actual_err_mess,expected_err_mess,'Patient on Manual dosing gets an error when trying to use the SorB button in current schedule where prev treatment is coventry');
  result_set.push(result_set_1);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title);   
  
  var INRstar = INRstar_base()
  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  Log_Off();
}
//-----------------------------
function tc_Patient_on_Manual_dosing_gets_an_error_when_trying_to_use_the_SorB_button_in_current_schedule_where_prev_treatment_is_hillingdon()
{
  var test_title = 'SORB - Manual Error, prev Hillingdon'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB', 'dosing_method_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Hillingdon','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
  
  edit_treatment_plan('Manual');
  add_pending_manual_treatment('2.0','PoCT','2.0', '14 Days');
  
  click_sorb_button("current"); 
  
  var actual_err_mess = get_sorb_button_error_message();
  var expected_err_mess = ("You cannot create a temporary Skip or Boost schedule for a patient who is on manual dosing.");       
  
  var result_set = new Array();
  var result_set_1 = compare_values(actual_err_mess,expected_err_mess,'Patient on Manual dosing gets an error when trying to use the SorB button in current schedule where prev treatment is hillingdon'); 
  result_set.push(result_set_1);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title); 
  
  var INRstar = INRstar_base()
  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  Log_Off();
}
//-----------------------------
function tc_Patient_on_Coventry_dosing_gets_an_error_when_trying_to_use_the_SorB_button_in_current_schedule_where_prev_treatment_is_manual()
{
  var test_title = 'SORB - Coventry Error, prev Manual'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB', 'dosing_method_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
  add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))),'2.0','2.5','7');

  edit_treatment_plan('Coventry');
  add_pending_maintenance_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))));
  
  click_sorb_button("current"); 
  
  var actual_err_mess = get_sorb_button_error_message();
  var expected_err_mess = ("You cannot create a temporary skip or boost schedule for a patient when the current schedule was based on a manual dosing treatment.");      
    
  var result_set = new Array();
  var result_set_1 = compare_values(actual_err_mess,expected_err_mess,'SORB Button Validation - Patient on Coventry dosing gets an error when trying to use the SorB button in current schedule where prev treatment is manual');
  result_set.push(result_set_1);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title)  
  
  var INRstar = INRstar_base()
  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  Log_Off();
} 
//-----------------------------
function tc_Patient_on_Hillingdon_dosing_gets_an_error_when_trying_to_use_the_SorB_button_in_current_schedule_where_prev_treatment_is_manual()
{
  var test_title = 'SORB - Hillingdon Error, prev Manual'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB', 'dosing_method_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
  add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))),'2.0','2.5','7');

  edit_treatment_plan('Hillingdon');
  add_pending_maintenance_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))));
  
  click_sorb_button("current"); 
  
  var actual_err_mess = get_sorb_button_error_message();
  var expected_err_mess = ("You cannot create a temporary skip or boost schedule for a patient when the current schedule was based on a manual dosing treatment.");      
    
  var result_set = new Array();
  var result_set_1 = compare_values(actual_err_mess,expected_err_mess,'SORB Button Validation - Patient on Hillingdon dosing gets an error when trying to use the SorB button in current schedule where prev treatment is manual induction')
  result_set.push(result_set_1);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title)
  
  var INRstar = INRstar_base()
  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  Log_Off();
}
//-----------------------------
function tc_Sorb_button_disabled_on_current_tab_when_no_previous_treatment_exists_on_all_dosing_algorithms()
{
  var test_title = 'SORB - Disabled When No Previous Treatments'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB', 'no_current_treatment', 'M', 'Shared'); 
   
  //Manual dosing algorithm checks
  add_treatment_plan('W','Manual','','Shared','');
  add_pending_manual_treatment('2.0','PoCT','2.0', '14 Days');
  
  var sorb_button = sorb_button_current_path();
  var button = check_button(sorb_button);
  
  click_current_tab()
  
  //Create the array of results for the final check to ensure all dosing algorithms pass the test
  var result_set = new Array()
  
  var manual_no_current = button_checker(button,'disabled','Testing manual dosing treatment plan with no current treatment');
  result_set.push(manual_no_current);
  
  cancel_pending_sorb_treatment();
  
  //Coventry dosing algorithm checks
  edit_treatment_plan('Coventry');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_pending_maintenance_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))));
  
  var sorb_button = sorb_button_current_path();
  var button = check_button(sorb_button);
  click_current_tab();
  
  var coventry_no_current = button_checker(button,'disabled','Testing coventry dosing treatment plan with no current treatment');
  result_set.push(coventry_no_current);

  cancel_pending_sorb_treatment();

//  Hillingdon dosing algorithm checks
  edit_treatment_plan('Hillingdon');
  add_pending_maintenance_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))));
  
  var sorb_button = sorb_button_current_path();
  var button = check_button(sorb_button);
  click_current_tab();
 
  var hillingdon_no_current = button_checker(button,'disabled','Testing hillingdon dosing treatment plan with no current treatment');
  result_set.push(hillingdon_no_current);

  cancel_pending_sorb_treatment();
  delete_treatment();
  
  //Oates dising algorithm checks

  edit_treatment_plan('Oates');
  add_pending_induction_slow_treatment('1.2','Shared');
  
  var sorb_button = sorb_button_current_path();
  var button = check_button(sorb_button);
  click_current_tab();
 
  var oates_no_current = button_checker(button,'disabled','Testing oates dosing treatment plan with no current treatment');
  result_set.push(oates_no_current);

  cancel_pending_sorb_treatment();

  //Tait dosing algorithm checks

  edit_treatment_plan('Tait');
  add_pending_induction_slow_treatment('1.2','Shared');
  var sorb_button = sorb_button_current_path();
  var button = check_button(sorb_button);
  
  click_current_tab();
 
  var oates_no_current = button_checker(button,'disabled','Testing tait dosing treatment plan with no current treatment');
  result_set.push(oates_no_current);

  cancel_pending_sorb_treatment();
 
  Log.Message(result_set);
  
  //Validate all the result sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results,'SORB Button Validation - SorB button disabled on current tab when no previous treatment exists on all dosing algorithms');
     
  Log_Off();
}
//-----------------------------
function tc_SORB_Button_Validation_with_multiple_treatment_plans_Current_TP_is_Maintenance_current_schedule_on_old_plan_is_Manual_on_current_tab()
{
  var test_title = 'SORB - Long Title'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Coventry', 'review_period_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
  add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))),'2.2','2.0','7');
  add_treatment_plan('W','Coventry',aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(),(0))),'Shared','2');
  add_pending_maintenance_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(),(0))));
  
  //edit to maint here
  
  click_current_tab();
  
  var actual_err_mess = get_sorb_button_error_message();
  var expected_err_mess = ("You cannot create a temporary skip or boost schedule for a patient when the current schedule was based on a manual dosing treatment.");      
    
  var result_set = new Array();
  var result_set_1 = compare_values(actual_err_mess,expected_err_mess,'SORB Button Validation - Patient on Hillingdon dosing gets an error when trying to use the SorB button in current schedule where prev treatment is manual induction');
  result_set.push(result_set_1);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  Log.Message(results);
    
  //Pass in the result
  results_checker(results,test_title);  
  
  var INRstar = INRstar_base()
  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  Log_Off();
} 
//-----------------------------
function tc_SORB_Button_Validation_with_multiple_treatment_plans_Current_TP_is_Slow_Oates_current_schedule_on_old_plan_is_Maintenance_on_current_tab()
{
  
} 
//-----------------------------
function tc_SORB_Button_Validation_with_multiple_treatment_plans_Current_TP_is_Slow_Oates_current_schedule_on_old_plan_is_Manual_on_current_tab()
{
  
} 
//-----------------------------
function tc_SORB_Button_Validation_with_multiple_treatment_plans_Current_TP_is_Manual_current_schedule_on_old_plan_is_Maintentance()
{
  
} 
//--------------------------------------------------------------------------------
//Tests for testing the SORB button for review period validation
//--------------------------------------------------------------------------------
function tc_Coventry_maintenance_testing_review_period_boundaries_suggested_tab()
{
  var test_title = 'SORB - Coventry Maintenance Testing Review Period Boundaries'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Coventry', 'review_period_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_pending_maintenance_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))));

  var sorb_button = sorb_button_suggested_path();
  var button = check_button(sorb_button);
   
  if(button=="enabled")
  {
    Log.Message("button in correct state")  
     
    click_sorb_button("suggested");  
    
    var sorb_page_heading_path = get_sorb_heading_path();
    var heading = sorb_page_heading_path.contentText;
    
    if(heading=="Skip or Boost\n(based on Suggested schedule)")
    {
      Log.Message("SORB page exists on > 7 day review before override")
    } 
    else 
    {
      Log.Warning("Test Failed - SORB Button Validation - Coventry maintenance testing review period boundaries" + " - SORB page was not displayed after clicking button" )
    }
    //Cancel and go to next review period check
    cancel_pending_sorb_treatment();
  } 
  if(button=="disabled")
  {
    Log.Warning("Test Failed - SORB Button Validation - Coventry maintenance testing review period boundaries")
  } 
//---------------override for 7 day review period
  override_review(7);
  
  var sorb_button = sorb_button_suggested_path();
  var button = check_button(sorb_button);
   
  if(button=="enabled")
  {
    Log.Message("button in correct state")  
     
    click_sorb_button("suggested");  
    
    var sorb_page_heading_path = get_sorb_heading_path();
    var heading = sorb_page_heading_path.contentText;
    Log.Message(heading)
    
    if(heading=="Skip or Boost\n(based on Suggested schedule)")
    {
      Log.Message("SORB page exists on 7 day review")
    } 
    else
    { 
      Log.Warning("Test Failed - SORB Button Validation - Coventry maintenance testing review period boundaries" + " - SORB page was not displayed after clicking button" )
    }
    //Cancel and go to next review period check
    cancel_pending_sorb_treatment();
  } 
  if(button=="disabled")
  {
    Log.Warning("Test Failed - SORB Button Validation - Coventry maintenance testing review period boundaries")
  } 
//---------------override for invalid 6-1 day review periods
  var result_set = new Array();

  for (i=6; i>0; i--)
  {
    override_review(i);
    if(button=="enabled")
    {
      Log.Message("button in correct state")  
     
      click_sorb_button("suggested"); 
  
      var actual_err_mess = get_sorb_button_error_message();
      var expected_err_mess = ("The review period must be 7 days or greater to create Skip or Boost schedules.");      
      var result_set_1 = test_data_individual_step(actual_err_mess,expected_err_mess,"Coventry maintenance testing review period boundaries checking " + i + " day review"); 
    
      WaitSeconds(1);
      result_set.push(result_set_1)
    } 
    if(button=="disabled")
    {
      Log.Warning("Test Failed - SORB Button Validation - Coventry maintenance testing review period boundaries")
    } 
    var INRstar = INRstar_base()
    INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
   
    if(button=="disabled")
    {
      Log.Warning("Test Failed - SORB Button Validation - Coventry maintenance testing review period boundaries, button was not enabled")
    }
  } 
  //Validate all the result sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results,'SORB Button Validation - Coventry maintenance testing review period boundaries');
    
  Log_Off();
}
//--------------------------------------------------------------------------------
function tc_Hillingdon_maintenance_testing_review_period_boundaries_suggested_tab()
{
  var test_title = 'SORB - Hillingdon Review Period Boundaries'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Hillingdon', 'review_period_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Hillingdon','','Shared','');
  
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_pending_maintenance_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))));

  var sorb_button = sorb_button_suggested_path();
  var button = check_button(sorb_button);
   
  if(button=="enabled")
  {
    Log.Message("button in correct state")  
     
    click_sorb_button("suggested");  
    
    var sorb_page_heading_path = get_sorb_heading_path();
    var heading = sorb_page_heading_path.contentText;
    
    if(heading=="Skip or Boost\n(based on Suggested schedule)")
    {
      Log.Message("SORB page exists on > 7 day review before override")
    } 
    else 
    {
      Log.Warning("Test Failed - SORB Button Validation - Hillingdon maintenance testing review period boundaries" + " - SORB page was not displayed after clicking button" )
    }
    //Cancel and go to next review period check
    cancel_pending_sorb_treatment();
  } 
  if(button=="disabled")
  {
    Log.Warning("Test Failed - SORB Button Validation - Hillingdon maintenance testing review period boundaries")
  } 
//---------------override for 7 day review period
  override_review(7);
  
  var sorb_button = sorb_button_suggested_path();
  var button = check_button(sorb_button);
   
  if(button=="enabled")
  {
    Log.Message("button in correct state")  
     
    click_sorb_button("suggested");  
    
    var sorb_page_heading_path = get_sorb_heading_path();
    var heading = sorb_page_heading_path.contentText;
    Log.Message(heading)
    
    if(heading=="Skip or Boost\n(based on Suggested schedule)")
    {
      Log.Message("SORB page exists on 7 day review")
    } 
    else 
    {
      Log.Warning("Test Failed - SORB Button Validation - Hillingdon maintenance testing review period boundaries" + " - SORB page was not displayed after clicking button" )
    }
    //Cancel and go to next review period check
    cancel_pending_sorb_treatment();
  } 
  if(button=="disabled")
  {
    Log.Warning("Test Failed - SORB Button Validation - Hillingdon maintenance testing review period boundaries")
  } 
//---------------override for invalid 6-1 day review periods
  var result_set = new Array();

  for (i=6; i>0; i--)
  {
    override_review(i);
    if(button=="enabled")
    {
      Log.Message("button in correct state")  
     
      click_sorb_button("suggested"); 
  
      var actual_err_mess = get_sorb_button_error_message();
      var expected_err_mess = ("The review period must be 7 days or greater to create Skip or Boost schedules.");      
      var result_set_1 = test_data_individual_step(actual_err_mess,expected_err_mess,"Hillingdon maintenance testing review period boundaries checking " + i + " day review")  
      result_set.push(result_set_1);
    } 
    if(button=="disabled")
    {
      Log.Warning("Test Failed - SORB Button Validation - Hillingdon maintenance testing review period boundaries")
    }   
    var INRstar = INRstar_base()
    INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
   
    if(button=="disabled")
    {
      Log.Warning("Test Failed - SORB Button Validation - Hillingdon maintenance testing review period boundaries, button was not enabled")
    }     
    Log.Message(results + " This is the override result set"); 
  } 
  //Validate all the result sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results,'SORB Button Validation - Hillingdon maintenance testing review period boundaries');
    
  Log_Off();
}
//--------------------------------------------------------------------------------
function tc_Cant_skip_or_boost_current_schedule_if_suggested_review_period_is_invalid_and_current_review_period_is_valid()
{
  var test_title = 'SORB - No SORB Current Schedule if Suggested Review Period Invalid'  
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Maintenance', 'review_period_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');

//  Adding the treatments
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
  add_pending_maintenance_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))));

  var sorb_button = sorb_button_current_path();
  var button = check_button(sorb_button);
   
  if(button=="enabled")
  {
    Log.Message("button in correct state")  
     
    click_sorb_button("current");  
    
    var sorb_page_heading_path = get_sorb_heading_path();
    var heading = sorb_page_heading_path.contentText;
    
    if(heading=="Skip or Boost\n(based on Current schedule)")
    {
      Log.Message("SORB page exists on > 7 day review before override")
    } 
    else 
    {
      Log.Warning("Test Failed - SORB button validation - Can't skip or boost current schedule if suggested review period is invalid and current review period is valid" 
                  + " - SORB page was not displayed after clicking button" )
    }
    //Cancel and go to next review period check
    cancel_pending_sorb_treatment();
  } 
  if(button=="disabled")
  {
    Log.Warning("Test Failed - SORB button validation - Can't skip or boost current schedule if suggested review period is invalid and current review period is valid")
  } 
//---------------override for 7 day review period
  override_review(7);
  
  var sorb_button = sorb_button_current_path();
  var button = check_button(sorb_button);
   
  if(button=="enabled")
  {
    Log.Message("button in correct state")  
     
    click_sorb_button("current");  
    
    var sorb_page_heading_path = get_sorb_heading_path();
    var heading = sorb_page_heading_path.contentText;
    
    if(heading=="Skip or Boost\n(based on Current schedule)")
    {
      Log.Message("SORB page exists on > 7 day review before override")
    } 
    else 
    {
      Log.Warning("Test Failed - SORB button validation - Can't skip or boost current schedule if suggested review period is invalid and current review period is valid" 
                  + " - SORB page was not displayed after clicking button" )
    }
    //Cancel and go to next review period check
    cancel_pending_sorb_treatment();
  } 
  if(button=="disabled")
  {
    Log.Warning("Test Failed - SORB button validation - Can't skip or boost current schedule if suggested review period is invalid and current review period is valid")
  } 
//---------------override for invalid 6-1 day review periods
  var result_set = new Array();

  for (i=6; i>0; i--)
  {
    override_review(i);
    click_current_tab();
    var sorb_button = sorb_button_current_path();
    var button = check_button(sorb_button);
    
    if(button=="disabled")
       {
        Log.Message("button in correct state")    
        result_set.push(true);
       } 
    if(button=="enabled")
    {
      Log.Message("Test Failed - SORB button validation - Can't skip or boost current schedule if suggested review period is invalid and current review period is valid");
      result_set.push(false);
    } 
  } 
  
  //Validate all the result sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results,'SORB button validation - Can\'t skip or boost current schedule if suggested review period is invalid and current review period is valid');
    
  Log_Off();
}
//--------------------------------------------------------------------------------
function tc_Cant_skip_or_boost_current_schedule_if_suggested_review_period_is_valid_and_current_review_is_invalid()
{
  var test_title = 'SORB - No SORB Current Schedule if Suggested Review Period is Valid but Current is Invalid'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Maintenance', 'review_period_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');

//  Adding the treatments
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
   
  var result_set = new Array();

  for (i=6; i>0; i--)
  {
    add_override_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))),i); //change 6 to i once it works
    
    add_pending_maintenance_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))));
    override_review('7');
    
    click_current_tab();
    var sorb_button = sorb_button_current_path();
    var button = check_button(sorb_button);
        
    if(button=="disabled")
       {
        Log.Message("button in correct state")    
        result_set.push(true);
       } 
    if(button=="enabled")
    {
      Log.Message("Test Failed - SORB button validation - Cant' skip or boost current schedule if suggested review period is valid and current review is invalid");
      result_set.push(false);
    } 
    cancel_pending_sorb_treatment();
    delete_treatment(); 
  } 
  
  //Validate all the result sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results,'SORB button validation - Cant\' skip or boost current schedule if suggested review period is valid and current review is invalid');
  
 Log_Off();
} 
//--------------------------------------------------------------------------------
function tc_Cant_skip_or_boost_current_schedule_if_suggested_review_period_is_invalid_and_current_review_period_is_invalid()
{
  var test_title = 'SORB - No SORB is Suggested/Current Review Period is Invalid'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Maintenance', 'review_period_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');

  //Adding the treatments
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
  add_override_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))),'6');
  add_pending_maintenance_treatment('2.0', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))));
  override_review('6');  
  
  click_current_tab();
  var sorb_button = sorb_button_current_path();
  var button = check_button(sorb_button);
        
  if(button=="disabled")
  {
    Log.Checkpoint("Test Passed - SORB button validation - Cant' skip or boost current schedule if suggested review period is invalid and current review is invalid");    
  } 
  if(button=="enabled")
  {
    Log.Message("Test Failed - SORB button validation - Cant' skip or boost current schedule if suggested review period is invalid and current review is invalid");
  } 
  Log_Off();
} 
//--------------------------------------------------------------------------------
//Tests for self care programme validation on sorb button 
//--------------------------------------------------------------------------------
function tc_Patient_on_Warfarin_self_testing_cannot_action_skip_or_boost_function_with_self_tester_unticked_suggested_and_current_tab()
{
  var test_title = 'SORB - Long Title'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Coventry', 'engage_programme_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  Goto_Patient_New_INR();
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));

  var INRstar = INRstar_base();
  var result_set = new Array();
  
  for (i=1; i<4; i++)
  {
    warfarin_self_care(i);
  
    // Add new pending treatment
    add_pending_maintenance_treatment('2.2', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))))
    click_sorb_button("suggested");
  
    var actual_err_mess = get_sorb_button_error_message();
    var expected_err_mess = ("The patient is currently enrolled in the warfarin patient self testing programme. You cannot create a temporary skip or boost schedule for a patient who is on a care programme or is a self tester.");      
    var result_set_1 = test_data_individual_step(actual_err_mess,expected_err_mess,"Self Testing enrollment stage " + i + " - suggested tab")  
    result_set.push(result_set_1);
  
    INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();

    click_sorb_button("current");
  
    actual_err_mess = get_sorb_button_error_message();
    expected_err_mess = ("The patient is currently enrolled in the warfarin patient self testing programme. You cannot create a temporary skip or boost schedule for a patient who is on a care programme or is a self tester.");      
    result_set_1 = test_data_individual_step(actual_err_mess,expected_err_mess,"Self Testing enrollment stage " + i + " - current tab")  
    result_set.push(result_set_1);
  
    INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  
    //Cancel and go to next stage check
    cancel_pending_sorb_treatment();
  }
  Log.Message(results);
  
  //Validate all the result sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results,'Skip or Boost button disabled at all stages of Self Testing enrollment - suggested and current tab');

  Log_Off();
}
//--------------------------------------------------------------------------------
function tc_Patient_removed_from_Warfarin_self_testing_can_action_skip_or_boost_function_suggested_and_current_tab()
{
  var test_title = 'SORB - Long Title'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Coventry', 'engage_programme_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
  
  warfarin_self_care('disenrolled');  
  add_pending_maintenance_treatment('2.2', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))))
  
  click_sorb_button("suggested");
  
  var sorb_page_heading_path = get_sorb_heading_path();
  var heading = sorb_page_heading_path.contentText;
    
  if(heading=="Skip or Boost\n(based on Suggested schedule)")
  {
    Log.Checkpoint("Test Passed - Patient removed from Warfarin self testing program can action skip or boost function suggested tab")
  } 
  else
  { 
    Log.Warning("Test Failed - Patient removed from Warfarin self testing program can action skip or boost function suggested tab" + " - SORB page was not displayed after clicking button" )
  }      
  
  cancel_pending_sorb_treatment();
  
  click_sorb_button("current");
   
  if(heading=="Skip or Boost\n(based on Suggested schedule)")
  {
    Log.Checkpoint("Test Passed - Patient removed from Warfarin self testing program can action skip or boost function current tab")
  }
  else 
  {
    Log.Warning("Test Failed - Patient removed from Warfarin self testing program can action skip or boost function current tab" + " - SORB page was not displayed after clicking button" )      
  }
  
  Log_Off();
} 
//--------------------------------------------------------------------------------
function tc_Patient_on_Warfarin_self_testing_untick_on_treatment_suggested_and_current_tab()
{
  var test_title = 'SORB - Patient on Warfarin Self Testing Untick on Treatment Suggested/Current Tab'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Coventry', 'engage_programme_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
  
  warfarin_self_care('all');  
  add_pending_maintenance_treatment('2.2', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))),'N')
  
  click_sorb_button("suggested");
  
  var result_set = new Array();
  
  var actual_err_mess = get_sorb_button_error_message();
  var expected_err_mess = ("The patient is currently enrolled in the warfarin patient self testing programme. You cannot create a temporary skip or boost schedule for a patient who is on a care programme or is a self tester.");      
  var result_set_1 = test_data_individual_step(actual_err_mess,expected_err_mess,"Patient on Warfarin self testing program cannot action skip or boost function with self tester unticked suggested tab")  
  
  result_set.push(result_set_1);
  
  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();

  click_sorb_button("current");
  
  actual_err_mess = get_sorb_button_error_message();
  expected_err_mess = ("The patient is currently enrolled in the warfarin patient self testing programme. You cannot create a temporary skip or boost schedule for a patient who is on a care programme or is a self tester.");      
  result_set_1 = test_data_individual_step(actual_err_mess,expected_err_mess,"Patient on Warfarin self testing program cannot action skip or boost function with self tester unticked current tab")  
  
  result_set.push(result_set_1);
  
  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  
  Log.Message(result_set)
  
  //Validate all the result sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results,'Patient on Warfarin self testing program cannot action skip or boost function with self tester unticked suggested and current tab'); 
     
  Log_Off();
} 
//--------------------------------------------------------------------------------
function tc_Patient_on_DDD_program_gets_error_message_suggested_and_current_tab()
{
  var test_title = 'SORB - Patient_on_DDD_program_gets_error_message_suggested_and_current_tab'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Hillingdon', 'DDD_programme_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Hillingdon','','Shared','');
  
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
  
  self_care_DDD('1');

  var result_set = new Array();
  
  add_pending_maintenance_treatment('2.2', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))))
  click_sorb_button("suggested");
  
  var actual_err_mess = get_sorb_button_error_message();
  var expected_err_mess = ("The patient is currently enrolled in the digital dosing diary programme. You cannot create a temporary skip or boost schedule for a patient who is on a care programme or is a self tester.");      
  var result_set_1 = test_data_individual_step(actual_err_mess,expected_err_mess,"Patient on DDD program gets error message - suggested tab")  
  
  result_set.push(result_set_1);
  
  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();

  click_sorb_button("current");
  
  actual_err_mess = get_sorb_button_error_message();
  expected_err_mess = ("The patient is currently enrolled in the digital dosing diary programme. You cannot create a temporary skip or boost schedule for a patient who is on a care programme or is a self tester.");      
  result_set_1 = test_data_individual_step(actual_err_mess,expected_err_mess,"Patient on DDD program gets error message - current tab")  
  
  result_set.push(result_set_1);
  
  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  
  //Validate all the result sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results,'Patient on DDD program gets error message - suggested and current tab');
     
  Log_Off();
} 
//--------------------------------------------------------------------------------
function tc_Patient_removed_from_DDD_self_care_program_can_action_skip_or_boost_function()
{
  var test_title = 'SORB - Patient_removed_from_DDD_self_care_program_can_action_skip_or_boost_function'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Coventry', 'ddd_programme_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
  
  self_care_DDD('disenrolled');
  add_pending_maintenance_treatment('2.2', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))))
  
  click_sorb_button("suggested");
  
  var sorb_page_heading_path = get_sorb_heading_path();
  var heading = sorb_page_heading_path.contentText;
    
  if(heading=="Skip or Boost\n(based on Suggested schedule)")
  {
    Log.Checkpoint("Test Passed - Patient removed from DDD self care program can action skip or boost function suggested tab")
  } 
  else 
  {
    Log.Warning("Test Failed - Patient removed from DDD self care program can action skip or boost function suggested tab" + " - SORB page was not displayed after clicking button" )
  }     
  cancel_pending_sorb_treatment();
  
  click_sorb_button("current");
   
  if(heading=="Skip or Boost\n(based on Suggested schedule)")
  {
    Log.Checkpoint("Test Passed - Patient removed from DDD self care program can action skip or boost function current tab")
  }
  else 
  {
    Log.Warning("Test Failed - Patient removed from DDD self care program can action skip or boost function" + " - SORB page was not displayed after clicking button" )      
  }
   
  Log_Off();
} 
//--------------------------------------------------------------------------------
function tc_Patient_marked_as_a_manual_INR_self_tester_can_action_skip_or_boost_function_in_suggested_and_current_schedule()
{
  var test_title = 'SORB - Patient_marked_as_a_manual_INR_self_tester_can_action_skip_or_boost_function_in_suggested_and_current_schedule'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Coventry', 'manual_self_test_validation', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
  
  self_care_manaul();
  add_pending_maintenance_treatment('2.2', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))))
  
  click_sorb_button("suggested");
  
  var sorb_page_heading_path = get_sorb_heading_path();
  var heading = sorb_page_heading_path.contentText;
    
  if(heading=="Skip or Boost\n(based on Suggested schedule)")
  {
    Log.Message("Test Passed - Patient marked as a manual INR self tester can action skip or boost function in suggested and current schedule")
  } 
  else 
  {
    Log.Warning("Test Failed - Patient marked as a manual INR self tester can action skip or boost function in suggested and current schedule" + " - SORB page was not displayed after clicking button" )
  }      
  cancel_pending_sorb_treatment();
  
  click_sorb_button("current");
   
  if(heading=="Skip or Boost\n(based on Suggested schedule)")
  {
    Log.Checkpoint("Test Passed - Patient marked as a manual INR self tester can action skip or boost function in suggested and current schedule")
  }
  else 
  {      
    Log.Warning("Test Failed - Patient marked as a manual INR self tester can action skip or boost function in suggested and current schedule" + " - SORB page was not displayed after clicking button" )      
  }
     
  Log_Off();
}

//--------------------------------------------------------------------------------
//Tests for testing the SORB button with OMIT days
//--------------------------------------------------------------------------------
function tc_suggested_and_current_tab_with_an_omit_day_in_suggested_schedule_gets_an_error()
{
  try
  {
    var test_title = 'SORB Button Validation - Suggested and current tab with an omit day in Suggested schedule gets an error'
    var INRstarV5 = INRstar_base();
    login('cl3@regression','INRstar_5','Shared');
    add_patient('SORB_Coventry', 'omits', 'M', 'Shared'); 
    add_treatment_plan('W','Coventry','','Shared','');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
    add_pending_maintenance_treatment('2.2', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))))
    override_omits('1 Day');

    result_set = new Array();
  
    click_sorb_button("suggested");
  
    var actual_err_mess = get_sorb_button_error_message();
    var expected_err_mess = ("This dose schedule contains dose omission(s). If you wish to alter it you will need to use the ‘Override’ button.");      
    var result_set_1 = test_data_individual_step(actual_err_mess,expected_err_mess,"Patient on DDD program gets error message - suggested tab")  
  
    result_set.push(result_set_1);
  
    INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();

    click_sorb_button("current");
  
    actual_err_mess = get_sorb_button_error_message();
    expected_err_mess = ("This dose schedule contains dose omission(s). If you wish to alter it you will need to use the ‘Override’ button.");      
    result_set_1 = test_data_individual_step(actual_err_mess,expected_err_mess,"Patient on DDD program gets error message - current tab")  
  
    result_set.push(result_set_1);
  
    INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
  
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
function tc_suggested_and_current_tab_check_do_not_take_days_do_not_block_sorb()
{
//  try
// {
//  var test_title = 'SORB Button Validation - Suggested and current tab check do not take days do not block SORB'
//  var INRstarV5 = INRstar_base();
//  login('cl3@regression','INRstar_5','Shared');
//  add_patient('SORB_Coventry', 'do_not_take', 'M', 'Shared'); 
//  add_treatment_plan('W','Coventry','','Shared','');
//  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  
  //Need to override and select a schedule that will give do not take days
//  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
//  override_dose('3.0');
    select_more_schedules('5mg');
  
//  add_pending_maintenance_treatment('2.2', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))))
//  override_omits('1 Day');
//
//  result_set = new Array();
//  
//  click_sorb_button("suggested");
//  
//  var actual_err_mess = get_sorb_button_error_message();
//  var expected_err_mess = ("This dose schedule contains dose omission(s). If you wish to alter it you will need to use the ‘Override’ button.");      
//  var result_suggested = test_data_individual_step(actual_err_mess,expected_err_mess,"Patient on DDD program gets error message - suggested tab")  
//  
//  result_set.push(result_suggested);
//  
//  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
//
//  click_sorb_button("current");
//  
//  var actual_err_mess = get_sorb_button_error_message();
//  var expected_err_mess = ("This dose schedule contains dose omission(s). If you wish to alter it you will need to use the ‘Override’ button.");      
//  var result_current = test_data_individual_step(actual_err_mess,expected_err_mess,"Patient on DDD program gets error message - current tab")  
//  
//  result_set.push(result_current);
//  
//  INRstar.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
//  
//  //Validate all the results sets are true
//  var results = results_checker_are_true(result_set); 
//  
//  //Pass in the final result
//  results_checker(results,test_title);
//  
//Log_Off();
// }
//  catch (e)
//  {
//   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
////   Log_Off(); 
//  }
} 
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------


//--------------------------------------------------------------------------------
//Tests for the Treatment buttons after clicking ok with a skip or boost schedule
//--------------------------------------------------------------------------------
function tc_Treatment_Buttons_Ensure_relevant_treatment_buttons_are_disabled_after_clicking_ok_on_SORB_screen_using_a_suggested_schedule_on_suggested_and_current_tab()
{
  var test_title = 'SORB - Treatment_Buttons_Ensure_relevant_treatment_buttons_are_disabled_after_clicking_ok_on_SORB_screen_using_a_suggested_schedule_on_suggested_and_current_tab'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Coventry', 'disabling_buttons', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
  add_pending_maintenance_treatment('2.2', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))))
  add_sorb_based_on_suggested();

  //Create the array of results for the final check to ensure all dosing algorithms pass the test
  var result_set_suggested = new Array()
  
  var pending_treatment_buttons_path = pending_treatment_buttons();
  
  //Suggested tab buttons
  var override_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("OverridePendingTreatment");
  var refer_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("ReferPendingTreatment");
  var re_order_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Panel(0).Button("Re_Order_Schedule");
  var more_schedules_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Panel(0).Button("More_Schedules");
  var sorb_button_suggested = sorb_button_suggested_path()
  
  var override_button = check_button(override_button_path);
  var suggested_override = button_checker(override_button,'disabled','Testing refer button on suggested tab');
  result_set_suggested.push(suggested_override);
  
  var refer_button = check_button(refer_button_path);
  var suggested_refer = button_checker(refer_button,'disabled','Testing override button on suggested tab');
  result_set_suggested.push(suggested_refer);

  var re_order_button = check_button(re_order_button_path);
  var suggested_re_order = button_checker(re_order_button,'disabled','Testing re_order button on suggested tab');
  result_set_suggested.push(suggested_re_order);
  
  var more_schedules_button = check_button(more_schedules_button_path);
  var suggested_more_schedules = button_checker(more_schedules_button,'disabled','Testing more_schedules button on suggested tab');
  result_set_suggested.push(suggested_more_schedules);  
  
  var suggested_sorb_button = check_button(sorb_button_suggested);
  var suggested_sorb = button_checker(suggested_sorb_button,'disabled','Testing sorb button on suggested tab');
  result_set_suggested.push(suggested_sorb); 

  click_current_tab()
  
  var result_set_current = new Array()
  
  //Current tab buttons
  var sorb_button_current = sorb_button_current_path()
  
  var refer_button = check_button(refer_button_path);
  var current_refer = button_checker(refer_button,'disabled','Testing override button on current tab');
  result_set_current.push(current_refer);

  var override_button = check_button(override_button_path);
  var current_override = button_checker(override_button,'disabled','Testing refer button on current tab');
  result_set_current.push(current_override);
   
  var current_sorb_button = check_button(sorb_button_current);
  var current_sorb = button_checker(current_sorb_button,'disabled','Testing sorb button on current tab');
  result_set_current.push(current_sorb); 
  
  //Validate all the result sets are true
  var results_1 = results_checker_are_true(result_set_suggested); 
  var results_2 = results_checker_are_true(result_set_current); 
  
  //Pass in the final result
  results_checker(results_1,'Ensure relevant treatment buttons are disabled after clicking ok on SORB screen using a suggested schedule suggested tab');
  results_checker(results_2,'Ensure relevant treatment buttons are disabled after clicking ok on SORB screen using a suggested schedule current tab');
   
  Log_Off()
} 
//--------------------------------------------------------------------------------
function tc_Treatment_Buttons_Ensure_relevant_treatment_buttons_are_disabled_after_clicking_ok_on_SORB_screen_using_a_current_schedule_on_suggested_and_current_tab()
{
  var test_title = 'SORB - Treatment_Buttons_Ensure_relevant_treatment_buttons_are_disabled_after_clicking_ok_on_SORB_screen_using_a_current_schedule_on_suggested_and_current_tab'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('SORB_Coventry', 'disabling_buttons', 'M', 'Shared'); 
  add_treatment_plan('W','Coventry','','Shared','');
  add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));
  add_pending_maintenance_treatment('2.2', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))))
  add_sorb_based_on_current();

  //Create the array of results for the final check to ensure all dosing algorithms pass the test
  var result_set_suggested = new Array()
  
  var pending_treatment_buttons_path = pending_treatment_buttons();
  
  //Suggested tab buttons
  var override_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("OverridePendingTreatment");
  var refer_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("ReferPendingTreatment");
  var re_order_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Panel(0).Button("Re_Order_Schedule");
  var more_schedules_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Panel(0).Button("More_Schedules");
  var sorb_button_suggested = sorb_button_suggested_path()
  
  var override_button = check_button(override_button_path);
  var suggested_override = button_checker(override_button,'disabled','Testing refer button on suggested tab');
  result_set_suggested.push(suggested_override);

  
  var refer_button = check_button(refer_button_path);
  var suggested_refer = button_checker(refer_button,'disabled','Testing override button on suggested tab');
  result_set_suggested.push(suggested_refer);

  var re_order_button = check_button(re_order_button_path);
  var suggested_re_order = button_checker(re_order_button,'disabled','Testing re_order button on suggested tab');
  result_set_suggested.push(suggested_re_order);
  
  var more_schedules_button = check_button(more_schedules_button_path);
  var suggested_more_schedules = button_checker(more_schedules_button,'disabled','Testing more_schedules button on suggested tab');
  result_set_suggested.push(suggested_more_schedules);  
  
  var suggested_sorb_button = check_button(sorb_button_suggested);
  var suggested_sorb = button_checker(suggested_sorb_button,'disabled','Testing sorb button on suggested tab');
  result_set_suggested.push(suggested_sorb); 

  click_current_tab();
  
  var result_set_current = new Array();
  
  //Current tab buttons
  var sorb_button_current = sorb_button_current_path();
  
  var refer_button = check_button(refer_button_path);
  var current_refer = button_checker(refer_button,'disabled','Testing override button on current tab');
  result_set_current.push(current_refer);

  var override_button = check_button(override_button_path);
  var current_override = button_checker(override_button,'disabled','Testing refer button on current tab');
  result_set_current.push(current_override);
  
  var current_sorb_button = check_button(sorb_button_current);
  var current_sorb = button_checker(current_sorb_button,'disabled','Testing sorb button on current tab');
  result_set_current.push(current_sorb); 
  
  //Validate all the result sets are true
  var results_1 = results_checker_are_true(result_set_suggested); 
  var results_2 = results_checker_are_true(result_set_current); 
  
  //Pass in the final result
  results_checker(results_1,'Ensure relevant treatment buttons are disabled after clicking ok on SORB screen using a current schedule suggested tab');
  results_checker(results_2,'Ensure relevant treatment buttons are disabled after clicking ok on SORB screen using a current schedule current tab');   

  Log_Off()
} 
//--------------------------------------------------------------------------------