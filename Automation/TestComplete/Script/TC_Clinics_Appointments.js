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
    login('clead@regression','INRstar_5','Shared');
    tsa_add_a_clinic("23", 0, 0, true, false);
    
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
    var date = aqConvert.StrToDate(aqDateTime.Today());
    var day = aqString.SubString(date,0,2);
    tsa_add_a_clinic(clinic_name, day, 0, 0, false, false);
    
    add_patient('Regression', 'make_appointment', 'M', 'Shared');
    add_treatment_plan('W', 'Manual', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-15))), "2.0", "2.0", "0", "7", "2.5");
    
    var result_set = new Array();
    //var name = get_patient_fullname();
    
    //get_overdue_patient(name);
    
    var result_set_1 = tsa_clinic_confirm_default_ntd();
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