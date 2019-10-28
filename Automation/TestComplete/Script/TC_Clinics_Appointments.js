//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT Generic_Functions
//USEUNIT Navigation
//USEUNIT Test_Audit
//USEUNIT TSA_Clinics_Appointments
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//--------------------------------------------------------------------------------
function tc_clinics_add_a_recurring_clinic()
{
  try
  {
    var test_title = "Clinics/Appointments - Add a Recurring Clinic";
    var clinic_name = aqConvert.DateTimeToStr(aqDateTime.Now());
    login('clead@regression','INRstar_5','Shared');
    tsa_add_a_clinic(clinic_name, "24/10/2019", true, false);
    
    var result_set = new Array();
    
    var result_set_1 = validate_top_system_audit(test_title, "Created Clinic");
    result_set.push(result_set_1);
    
    result_set_1 = more_info_top_system_audit("Recurring Clinic set to [True].");
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
//--------------------------------------------------------------------------------
function tc_clinics_make_appointment_today_for_overdue_patient()
{
  try
  {
    var test_title = "Clinics/Appointments - Make Appointment for Overdue Patient";
    login('clead@regression','INRstar_5','Shared');
    
    var clinic_name = aqConvert.DateTimeToStr(aqDateTime.Now());
    var clinic_date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d/%m/%Y");
    tsa_add_a_clinic(clinic_name, clinic_date, false, false);
    
    add_patient('Regression', 'appointment_overdue', 'M', 'Shared');
    add_treatment_plan('W', 'Manual', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-15))), "2.0", "2.0", "0", "7", "2.5");
    
    var result_set = new Array();
    var name = get_patient_fullname();
    
    var result_set_1 = check_patient_on_overdue_INR_list(name);
    result_set.push(result_set_1);
    
    get_overdue_patient(name);
    
    result_set_1 = tsa_clinic_confirm_default_ntd();
    result_set.push(result_set_1);
    
    tsa_clinic_make_appointment(clinic_name);
    
    result_set_1 = validate_top_patient_audit(test_title, "Created Appointment");
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
//--------------------------------------------------------------------------------
function tc_clinics_add_inr_for_patient_with_appointment_today()
{
  try
  {
    var test_title = "Clinics/Appointments - Add INR for Patient with Appointment Today";
    login('clead@regression','INRstar_5','Shared');
    
    var clinic_name = aqConvert.DateTimeToStr(aqDateTime.Now());
    var clinic_date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d/%m/%Y");
    tsa_add_a_clinic(clinic_name, clinic_date, false, false);
    
    add_patient('Regression', 'complete_appointment', 'M', 'Shared');
    add_treatment_plan('W', 'Manual', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-15))), "2.0", "2.0", "0", "7", "2.5");
    
    tsa_clinic_make_appointment(clinic_name);
    
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.Today()), "2.5", "2.5", "7",);
    
    WaitSeconds(1);
    var f_name = get_patient_first_name();
    var s_name = get_patient_surname();
    var p_nhs = get_patient_nhs();
    
    tsa_clinic_check_patient_status(clinic_name, f_name, s_name);
    
    patient_search(p_nhs);
    
    var result_set = new Array();
    
    var result_set_1 = validate_top_patient_audit(test_title, "Add Manual Treatment");
    result_set.push(result_set_1);
    
    result_set_1 = more_info_top_patient_audit("Date set to [" + aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y") + "]")
    result_set.push(result_set_1);
    
    result_set_1 = validate_specific_entry_patient_audit(2, "Created Appointment", test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_more_info_specific_entry_patient_audit(2, "Appointment Start set to [" + 
                                                                  aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y"), test_title);
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
//--------------------------------------------------------------------------------
function tc_clinics_move_seven_days_beyond_ntd()
{
  try
  {
    var test_title = "Clinics/Appointments - Move NTD Beyond 7 Day Threshold";
    login('clead@regression','INRstar_5','Shared');
    
    var clinic_name = aqConvert.DateTimeToStr(aqDateTime.Now());
    var date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), 1));
    tsa_add_a_clinic(clinic_name, aqConvert.DateTimeToFormatStr(date, "%d/%m/%Y"), false, false);
    
    var clinic_name_1 = aqConvert.DateTimeToStr(aqDateTime.Now());
    var date_1 = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), 2));
    tsa_add_a_clinic(clinic_name_1, aqConvert.DateTimeToFormatStr(date_1, "%d/%m/%Y"), false, false);
    
    add_patient('Regression', 'beyond_seven', 'M', 'Shared');
    add_treatment_plan('W', 'Manual', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-6))), "2.0", "2.0", "0", "7", "2.5");
    
    var p_nhs = get_patient_nhs();
    WaitSeconds(2);
    
    Log_Off();
    login('cl1@regression','INRstar_5','Shared');
    
    patient_search(p_nhs);
    
    var msg = tsa_clinic_make_appointment(clinic_name, aqConvert.DateTimeToFormatStr(date, "%d/%m/%Y"));
    WaitSeconds(1);
    treatment_appointment_buttons().Button("CancelAppointment").Click();
    WaitSeconds(1);
    var text = process_popup("Confirmation Required", "Confirm Authorisation");
    WaitSeconds(1);
    Goto_Patient_Treatment();
    var msg = tsa_clinic_make_appointment(clinic_name_1, aqConvert.DateTimeToFormatStr(date_1, "%d/%m/%Y"));
    WaitSeconds(1);
    
    var result_set = new Array();
    var result_set_1 = compare_values(msg, "Making this appointment will change the patients review period from 7 days to 8 days." +
                                            " This is an auditable action, that MUST be authorised by a supervising Clinician.", test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_patient_audit(test_title, "Created Appointment");
    result_set.push(result_set_1);
    
    result_set_1 = validate_specific_entry_patient_audit(2, "User confirmed adding appointment was authorised", test_title);
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
//--------------------------------------------------------------------------------
function tc_clinics_cancel_future_appointment()
{
  try
  {
    var test_title = "Clinics/Appointments - Cancel Appointment In The Future";
    login('clead@regression','INRstar_5','Shared');
    
    var clinic_name = aqConvert.DateTimeToStr(aqDateTime.Now());
    var date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), 1));
    tsa_add_a_clinic(clinic_name, aqConvert.DateTimeToFormatStr(date, "%d/%m/%Y"), false, false);
    
    add_patient('Regression', 'cancel_appointment', 'M', 'Shared');
    add_treatment_plan('W', 'Manual', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-6))), "2.0", "2.0", "0", "7", "2.5");
    
    var msg = tsa_clinic_make_appointment(clinic_name, aqConvert.DateTimeToFormatStr(date, "%d/%m/%Y"));
    WaitSeconds(1);
    treatment_appointment_buttons().Button("CancelAppointment").Click();
    WaitSeconds(1);
    var text = process_popup("Confirmation Required", "Confirm");
    WaitSeconds(1);
    
    var result_set = new Array();
    var result_set_1 = compare_values(text, "Are you sure you wish to cancel this patient's next appointment? Please confirm that either " + 
            "this patient does not need another test, or that you have made other suitable arrangements for them to be tested.", test_title);
    result_set.push(result_set_1);
    
    result_set_1 = validate_top_patient_audit(test_title, "Appointment Cancelled");
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
//--------------------------------------------------------------------------------
function tc_clinics_mark_unmark_dna()
{
  try
  {
    var test_title = "Clinics/Appointments - Move NTD Beyond 7 Day Threshold";
    login('clead@regression','INRstar_5','Shared');
    
    var clinic_name = aqConvert.DateTimeToStr(aqDateTime.Now());
    var clinic_date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d/%m/%Y");
    tsa_add_a_clinic(clinic_name, clinic_date, false, false);
    
    var clinic_name_1 = aqConvert.DateTimeToStr(aqDateTime.Now());
    tsa_add_a_clinic(clinic_name_1, clinic_date, false, false);
    
    add_patient('Regression', 'markunmark_dna', 'M', 'Shared');
    add_treatment_plan('W', 'Manual', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-6))), "2.0", "2.0", "0", "7", "2.5");
    
    var msg = tsa_clinic_make_appointment(clinic_name, clinic_date);
    WaitSeconds(1);
    
    treatment_dna_buttons().Button("SetLatestTestDateAsDNA").Click(); 
    
    var treatment_row = new Array();
    treatment_row = get_treatment_row(0, "current");
    
    var result_set = new Array();
    var result_set_1 = compare_values("1", treatment_row[8], "Comparing DNA Counter");
    result_set.push(result_set_1);
    
    treatment_dna_buttons().Button("SetLatestTestDateAsNotDNA").Click(); 
    
    treatment_row = get_treatment_row(0, "current");
    result_set_1 = compare_values("-", treatment_row[8], "Comparing DNA Counter");
    result_set.push(result_set_1);
    
    treatment_dna_buttons().Button("SetLatestTestDateAsDNA").Click(); 
    
    var msg = tsa_clinic_make_appointment(clinic_name_1, clinic_date);
    WaitSeconds(1);
    
    treatment_dna_buttons().Button("SetLatestTestDateAsDNA").Click(); 
    
    treatment_row = get_treatment_row(0, "current");
    result_set_1 = compare_values("2", treatment_row[8], "Comparing DNA Counter");
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