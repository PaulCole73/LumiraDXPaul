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
    
    var date = aqConvert.StrToDate(aqDateTime.Today());
    var day = aqString.SubString(date,0,2);
    tsa_add_a_clinic(day, 0, 0, false, false);
    
    add_patient('Regression', 'make_appointment', 'M', 'Shared');
    add_treatment_plan('W', 'Manual', '', 'Shared', '');
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-15))), "2.0", "2.0", "0", "7", "2.5");
    
    var result_set = new Array();
    var name = get_patient_fullname();
    
    get_overdue_patient(name);
    treatment_appointment_buttons().Button("MakeAppointment").Click();
    
    var panel = clinic_schedule_container();
    var tab_name = new Array();
    tab_name = panel.QuerySelectorAll("div.NextTestDate");
    var format_date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%a, %d-%b")
    var columnValue;
    
    var result_set_1 = false;
    for(var i = 0; i < tab_name.length; i++)
    {
      if(tab_name[i].contentText == format_date)
      {
        result_set_1 = true;
        columnValue = tab_name[i].ColumnIndex;
        break;
      }
    }
    result_set.push(result_set_1);
    
    var schedule = clinic_appointments_container().Panel("scheduler_aptsBlock_AptDiv2").Panel("appointmentDiv").Table(0).Cell(0, 1);
    schedule.ClickR();
    
    var INRstarV5 = INRstar_base();
    var popup_button = INRstarV5.NativeWebObject.Find("contentText", "Select This Clinic");
    if(popup_button.Exists == true)
    {
      INRstarV5.Panel(3).Panel("modalDialogBox").Panel(0).Table("scheduler").Cell(4, 0).Panel("scheduler_aptMenuBlock_innerContent").Panel("scheduler_aptMenuBlock_SMAPT").Table("scheduler_aptMenuBlock_SMAPT_DXMST_").Cell(0, 0).Click();
    }
    
    INRstarV5.Panel(3).Panel("modalDialogBox").Panel(1).Table("appointmentsScheduler").Cell(4, 0).Panel("appointmentsScheduler_containerBlock_innerContent").Table("appointmentsScheduler_containerBlock_content").Cell(1, 0).Panel("appointmentsScheduler_containerBlock_verticalScrollContainer").Panel("appointmentsScheduler_containerBlock_verticalContainer").Panel("selectionLayer").Panel("appointmentsScheduler_commonControlsBlock_selectionDiv").Click();
    
    INRstarV5.Panel(3).Panel("modalDialogBox").Panel(1).Table("appointmentsScheduler").Cell(4, 0).Panel("appointmentsScheduler_containerBlock_innerContent").Table("appointmentsScheduler_containerBlock_content").Cell(1, 0).Panel("appointmentsScheduler_containerBlock_verticalScrollContainer").Panel("appointmentsScheduler_containerBlock_verticalContainer").Panel("selectionLayer").Panel("appointmentsScheduler_commonControlsBlock_selectionDiv").ClickR();
    container = clinic_make_appointment_container();
    
    
    popup_button = INRstarV5.NativeWebObject.Find("contentText", "Make Appointment");
    if(popup_button.Exists == true)
    {
      INRstarV5.Panel(3).Panel("modalDialogBox").Panel(1).Table("appointmentsScheduler").Cell(4, 0).Panel("appointmentsScheduler_viewMenuBlock_innerContent").Panel("appointmentsScheduler_viewMenuBlock_SMVIEW").Table("appointmentsScheduler_viewMenuBlock_SMVIEW_DXMST_").Cell(0, 0).Click();
    }
    
    INRstarV5.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click(); 
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}