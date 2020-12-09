//USEUNIT TSA_Login
//USEUNIT TSV_Login
//USEUNIT TSV_Logoff
//--------------------------------------------------------------------------------
function tc_multi_tests()
{
  var INRstarV5 = INRstar_base();
  var inrstar_current_version = login_page_version_number().contentText
  Log.Message("Current INRstar " + inrstar_current_version)
  //test Login, user can log into INRstar
  try
  {
    var test_title = 'Login - Log on to INRstar valid credentials'   
    login(5, "Shared");
    tsv_login_inrstar("1", "cl3@auto1 @ LDxCS-Test-AutoTest1");
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  
  //test Patient Add: Save button, add a new patient
  var patient_demographics = "";
  try
  {
    var test_title = 'Patient - Add a new patient';
    add_patient('Regression', 'Multi-Test', 'M', 'Shared');
    var results = validate_top_patient_audit(test_title,get_string_translation("Add Patient"));
    var patient_demographics = get_patient_demographics();
    
    results_checker(results, test_title)
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  } 
  
  //test Adverse Event: Add a new adverse event
  try
  {
    var test_title = 'Adverse Event - Add a new adverse event'
    add_adverse_event();
    
    var adverse_confirmation_banner = adverse_event_tab_confirm_box().Panel(0).Panel("PatientsAdverseEventsMessages").TextNode(0).contentText;
    
    //Create the array of results for the final check to ensure steps pass the test
    var result_set = new Array()
    var result_set_1 = compare_values(get_string_translation("The adverse event was successfully added"), adverse_confirmation_banner, test_title);
    result_set.push(result_set_1);
  
    result_set_1 = validate_top_patient_audit(test_title,get_string_translation("Add Adverse Event"));
    result_set.push(result_set_1);
  
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
  
    //Pass in the final result
    results_checker(results, test_title)
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  } 
  
  WaitSeconds(2);
  //test Note: Add a new note
  try
  {
    var test_title = "Notes - Add a new note";
    add_a_new_note();
  
    var results = validate_top_patient_audit(test_title,get_string_translation("Add Note"));
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  } 
  
  WaitSeconds(2);
  //test Adverse Event: Delete adverse event
  try
  {
    var test_title = 'Adverse Event - Delete adverse event'
    delete_adverse_event();
  
    var results = validate_top_patient_audit(test_title,get_string_translation("Delete Adverse Event"));
    results_checker(results, test_title)
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  } 
  
  WaitSeconds(2);
  //test Patient Demographics: Edit button, can edit demographics field
  var demographics_after_edit = "";
  try
  {
    var test_title = 'Patient Demographics - Edit each field of patient demographics'
    edit_all_patient_demographics('F');
    demographics_after_edit = get_patient_demographics();
    var results = validate_arrays_dont_match(patient_demographics, demographics_after_edit, test_title);
    
    //Pass in the result
    results_checker(results, test_title); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  //set patient demographics to be the edited values 
  patient_demographics = demographics_after_edit;
  
  //test Treatment Plan: add first manual treatment plan
  try
  {
    var test_title = 'Treatment Plan - Add first manual treatment plan'
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
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  
  //test Treatment Plan: Edit treatment plan, ensure all fields are editable on TP if no treatments have been added
  try
  { 
    var test_title = 'Treatment Plan - Ensure that all fields are editable on the treatment plan if no treatments have been added'
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
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  
  //test Home page "Overdue an INR test" message
  try
  {
    var test_title = "Home Page - View the 'Overdue an INR test' message on the home page"
    
    //Get the patient details
    var message_name = get_patient_fullname();
    
    //Prepare results vessel
    var result_set = new Array();
    
    //Check patient on the overdue INR test list
    var result_set_1 = check_patient_on_overdue_INR_list(message_name);
    result_set.push(result_set_1);
    
    //Check patients are listed with most overdue at top
    var result_set_1 = check_overdue_sort_order_of_home_page_list();
    result_set.push(result_set_1);
    
    //Validate the results sets is True
    var results = results_checker_are_true(result_set);
    
    //Pass in the result
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  
  //test Patient Recently Viewed: Find patient recently viewed
  //var patient_fullname = get_patient_fullname();
  try
  {
    var test_title = 'Patient Recently Viewed - Find patient recently viewed'
    var patients_list = new Array();
    patients_list = patient_recently_viewed_list();
  
    var results = table_contains_checker(patients_list, message_name, test_title)
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  
  //test Patient Search: Find a patient 
  Goto_Home();
  try
  {
    var test_title = 'Patient Search - Find a patient'
    //edited patient name not being found so have changed to use patient number
    patient_search(patient_demographics[0]);
    
    var pat_name_currently_loaded = get_patient_fullname();
    
    var result_set = new Array();
    var result_set_1 = compare_values(message_name, pat_name_currently_loaded, test_title);
    result_set.push(result_set_1);
  
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    Log.Message(results);
    
    //Pass in the result
    results_checker(results,test_title); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  
  //test Treatment: Add historical, user can add a historical treatment
  try
  {
    var test_title = 'Treatment - Add a historic treatment'
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.5", "0", "7", "2.5");
  
    var result_set = new Array(); 
    var treatment_data = new Array();
    var formatted_inr_date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(),(-7)), "%d-%b-%Y");
    var formatted_ntd = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y");
  
    if (language == "English")
    {
      treatment_data.push(formatted_inr_date, "2.0", "2.5", "", "0", "7", "", formatted_ntd, "-");
    }
    else
    {
      //translate the month string to italian
      var inr_date_month = aqString.SubString(formatted_inr_date, 3, 3);
      var translated_inr_date_month = get_string_translation(inr_date_month);
      var italian_formatted_inr_date = aqString.Replace(formatted_inr_date, inr_date_month, translated_inr_date_month);
      var ntd_month = aqString.SubString(formatted_ntd, 3, 3);
      var translated_ntd_month = get_string_translation(ntd_month);
      var italian_formatted_ntd = aqString.Replace(formatted_ntd, inr_date_month, translated_inr_date_month); 
      treatment_data.push(italian_formatted_inr_date, "2,0", "2,5", "", "0", "7", "", italian_formatted_ntd, "-");
    }
    var treatment_row = get_treatment_row(0);
  
    var result_set_1 = checkArrays(treatment_data, treatment_row, test_title);
    result_set.push(result_set_1);
  
    //Check the audit for adding the treatment
    result_set_1 = validate_top_patient_audit(test_title, get_string_translation("Add Historical Treatment"));
    result_set.push(result_set_1);
 
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results,test_title);
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  
  //test Treatment Plan: Edit treatment plan - Change target INR and other edits of clinical detail with existing treatment
  try
  {  
    var test_title = 'Edit treatment plan - Change target INR and other edits of clinical detail with existing treatment'
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
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  
  //test Treatment plan: New treatment plan button, add a new treatment plan after a treatment has been added selecting yes to using previous
  try
  {
    var test_title = 'Treatment Plan - Add a new treatment plan after a treatment has been added selecting yes to using previous';
		var result_set = new Array();
    var current_values = new Array();
    var previous_values = new Array();
    var date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d/%m/%Y");
    Goto_Patient_Treatment();
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
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  
  //test Treatment: can refer a maintenance treatment
  try
  {
    var test_title = 'Treatment - Refer a treatment'
    
    add_pending_maintenance_treatment('2.0',(aqDateTime.Today()));
  
    //Get all the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
    Goto_Patient_Treatment();
  
    //Refer
    var refer_button_path = refer_pending_treat_button().Click();
  
    var result_set = new Array(); 
    //Check patient on the referred list
    var result_set_1 = check_patient_on_refer_list(message_name)
    result_set.push(result_set_1);
  
    patient_search(patient_demographics[0]);
    //Check the audit
    Goto_Patient_Treatments_Tab();
    Goto_Suggested_Treatment_Audit();
    result_set_1 = validate_top_treatment_audit(get_string_translation("Treatment Referred"));
    result_set.push(result_set_1);
  
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set);   
    //Pass in the result
    results_checker(results,test_title); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  
  //test Treatment: can authorise a referral
  try
 {
    var test_title = 'Treatment - Authorise a referral'
    //Get all the patient details
    //var pat_nhs = get_patient_nhs();
    var message_name = get_patient_fullname();
  
    patient_search(patient_demographics[0]);
  
    var result_set = new Array(); 
  
    //Authorise the referral and check patient is no longer on the home page
    Goto_Patient_Treatments_Tab();
    var save_inr_button_path = save_inr_button();
    save_inr_button_path.click();
  
    //Check the patient in no longer on the referred list
    var result_set_1 = check_patient_not_on_refer_list(message_name)
    result_set.push(result_set_1);
  
    patient_search(patient_demographics[0]);
  
    //Check the icon is green on the suggested treatment row
    Goto_Patient_Treatments_Tab();
    var expected_state = 'Image("GreenIcon_1_PNG")'
    var actual_state = get_treatment_icon_state();
    result_set_1 = compare_values(expected_state, actual_state, test_title);
    result_set.push(result_set_1);
  
    //Check the audit
    Goto_Suggested_Treatment_Audit();
    result_set_1 = validate_top_treatment_audit(get_string_translation("Treatment Authorised"));
    result_set.push(result_set_1);
  
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results,test_title); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  //test Treatment: More schedules button, can select an alternate schedule
  try
	{
		var test_title = 'Treatment - Create Maintenance Use Alternate Schedules';
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
    
    process_popup(get_string_translation("Dose Change"), get_string_translation("Confirm"));
		
		//get the current on screen treatment schedule
		dosing_schedule = get_pending_suggested_treatment_schedule(0);
		
		//Check the arrays are the same size, but values don't match
		var result_set_1 = checkArrays(dosing_schedule, dosing_schedule_1, test_title);
		result_set.push(result_set_1);
		
		//Validate the results sets are false
		var results = results_checker_are_false(result_set);
		
		//Pass in the result
		results_checker(results, test_title);
	}
	catch(e)
	{
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
	}
  
  //test Treatment: Re-Order schedule, drag and drop schedule days
  try
  {
    //setup a treatment
    var test_title = 'Treatment - Drag and Drop Schedule Days';
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
    var table_cell = re_order_paths.Fieldset("ScheduleGrid").TextNode(7);
    
    //function to drag drop item
    //table_cell.Drag(30, 10, 0, -100);
    table_cell.Drag(30, 10, 0, 100);
    
    //confirm change
    re_order_paths.Panel(0).Button("Confirm_Re_Order").Click();
    
    dosing_schedule_1 = get_pending_suggested_treatment_schedule(0);
    
    //check outputs, display results
    result_set_1 = checkArrays(dosing_schedule, dosing_schedule_1, test_title);
    result_set.push(result_set_1);
    results = results_checker_are_false(result_set);
    results_checker(results, test_title);
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  
  //test Treatment: Override button, can override dose and review period
  try
	{
		var test_title = 'Treatment - Overriding Dose and Review Period';
		//setup values to be altered/checked
		var new_dose = "5.0";
		var new_review_days = "7";
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
    override_values = get_treatment_row_key_values(0, "current");
    
    var strikethrough = treatment_table().Cell(0, 3).Panel(0).style.textdecoration;
    var result_set_1 = compare_values(strikethrough, "line-through", test_title);
    result_set.push(result_set_1);
    strikethrough = treatment_table().Cell(0, 6).Panel(0).style.textdecoration;
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
	}
	catch(e)
	{
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
	}
  
  //test Treatment: Comment hyperlink, add and edit a comment using the hyperlink
  try
  {
    var test_title = 'Treatment - Add a treatment comment'
    var comment = "regression testing comments field"
    add_treatment_comment(comment);
  
    result_set = new Array(); 
  
    //Check the audit for adding the treatment
    var result_set_1 = validate_more_info_top_treatment_audit(get_string_translation("Comments set to [")+ comment + "]");
    result_set.push(result_set_1);
  
    //Validate the results sets are true
    var results = results_checker_are_true(result_set); 
    Log.Message(results);
    
    //Pass in the result
    results_checker(results,test_title);
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  
  //test Treatment: Delete Latest Button, delete the last treatment using the delete button
  try
  {
    var test_title = 'Treatment - Delete the last treatment'
    var result_set = new Array();
    if (language=="English")
    { 
      var formatted_inr_date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y");
    }
    else
    {
      //translate the inr_date
      var inr_date_month = aqString.SubString(aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y"), 3, 3);
      var translated_inr_date_month = get_string_translation(inr_date_month);
      var formatted_inr_date = aqString.Replace(aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y"), inr_date_month, translated_inr_date_month);
    }
    var exp_message = get_string_translation("Please confirm you want to delete the treatment added on the ") + formatted_inr_date + '.';
    
    var message = delete_treatment();
  
    var result_set_1 = compare_values(exp_message, message, test_title);
    result_set.push(result_set_1);
  
    //Check the audit for adding the treatment
    result_set_1 = validate_top_patient_audit(test_title, get_string_translation("Treatment Deleted"));
    result_set.push(result_set_1);
  
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
    
    //Pass in the result
    results_checker(results,test_title);
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
  }
  Log_Off();      
}
//--------------------------------------------------------------------------------