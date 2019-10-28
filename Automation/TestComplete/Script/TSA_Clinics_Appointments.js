//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT V5_Common_Batch
//USEUNIT Generic_Functions
//USEUNIT V5_Common_Popups
//--------------------------------------------------------------------------------
function tsa_add_a_clinic(name, date, is_recurring, is_end_by, end_by_date)
{
  var date_split = new Array();
  date_split = tsa_clinic_split_date(date);
  var INRstarV5 = INRstar_base();
  Goto_Add_Clinic(INRstarV5);
  
  var class_name = "dxeCalendarDay_INRstarTheme";
  var class_name_1 = "dxeCalendarDay_INRstarTheme dxeCalendarToday_INRstarTheme dxeCalendarSelected_INRstarTheme";
  
  var f_name = add_clinic_form().Table(0).Cell(0, 1).Table("Name_ET").Cell(0, 0).Table("Name").Cell(0, 0).Textbox("Name_I");
  var f_start = add_clinic_form().Table(0).Cell(2, 1).Table("StartTime_ET").Cell(0, 0).Table("StartTime").Cell(0, 0).Textbox("StartTime_I");
  var f_end = add_clinic_form().Table(0).Cell(3, 1).Table("EndTime_ET").Cell(0, 0).Table("EndTime").Cell(0, 0).Textbox("EndTime_I");
  
  var date_dropdown = add_clinic_form().Table(0).Cell(1, 1).Table("StartDate_ET").Cell(0, 0).Table("StartDate").Cell(0, 1).Click();
  for(var i = 0; i < date_split[2]; i++)
  {
    date_picker_dropdown().Cell(0, 0).Table(0).Cell(0, 6).Image("StartDate_DDD_C_NYCImg").Click();
  }
  for(var i = 0; i < date_split[1]; i++)
  {
    date_picker_dropdown().Cell(0, 0).Table(0).Cell(0, 4).Image("StartDate_DDD_C_NMCImg").Click();
  }
  
  var day_picker_container = date_picker_dropdown().Cell(1, 0).Table("StartDate_DDD_C_mt");
  for(var i = day_picker_container.ChildCount - 1; i > 0; i--)
  {
    var child = day_picker_container.Child(i);
    if(child.contentText == aqConvert.IntToStr(date_split[0]) && (child.className == class_name || child.className == class_name_1))
    {
      child.Click();
      break;
    }
  }
  WaitSeconds(1);
  f_name.Text = name;
  WaitSeconds(1);
  f_start.Text = "06:00";
  WaitSeconds(1);
  f_end.Text = "10:00";
  WaitSeconds(1);
   
  add_clinic_form().Table(0).Cell(4, 1).Table("SlotLength_ET").Cell(0, 0).Table("SlotLength").Cell(0, 2).Click();
  select_clinic_time_slot().Cell(1, 0).Click();
  
  if(is_recurring == true)
  {
    var recur_form = add_clinic_form().Panel("appointmentRecurrenceForm_mainDiv");
    var recur_check = recur_form.Table(0).Cell(0, 0).Table("appointmentRecurrenceForm_ChkRecurrence");
    var recur_button = recur_check.Cell(0, 0).Click();
    
    if(aqDateTime.Compare(aqConvert.StrToDate(date), aqConvert.StrToDate(end_by_date)) == -1)
    {
      if(is_end_by == true)
      {
        tsa_add_end_by_date(end_by_date);
      }
    }
  }
  add_clinic_form_buttons().Cell(0, 0).Table("Apply").Cell(0, 0).Panel("Apply_CD").Click();
}
//--------------------------------------------------------------------------------
function tsa_add_end_by_date(end_by_date)
{
  var date_split = new Array();
  date_split = tsa_clinic_split_date(end_by_date);

  clinic_end_by_panel().Cell(2, 0).Table("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEndByDate").Cell(0, 0).Click();
  clinic_end_by_panel().Cell(2, 1).Table(0).Cell(0, 0).Table("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEnd").Cell(0, 1).Click();

  for(var i = 0; i < date_split[2]; i++)
  {
    clinic_end_by_date_dropdown().Cell(0, 0).Table(0).Cell(0, 6).Image("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEnd_DDD_C_NYCImg").Click();
  }
  for(var i = 0; i < date_split[1]; i++)
  {
    clinic_end_by_date_dropdown().Cell(0, 0).Table(0).Cell(0, 4).Image("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEnd_DDD_C_NMCImg").Click();
  }

  var day_picker_container = clinic_end_by_date_dropdown().Cell(1, 0).Table("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEnd_DDD_C_mt");
  for(var i = day_picker_container.ChildCount - 1; i > 0; i--)
  {
    var child = day_picker_container.Child(i);
    if(child.contentText == aqConvert.IntToStr(date_split[0]) && child.columnIndex != 0)
    {
      child.Click();
      break;
    }
  }
  WaitSeconds(1);
}
//--------------------------------------------------------------------------------
function tsa_add_clinic_on_every_weekday()
{
  var date = aqDateTime.Today();
  var day_of_week = aqDateTime.GetDayOfWeek(date);
  var days_to_monday = 9 - day_of_week;
  
  date = aqDateTime.AddDays(aqDateTime.Today(), days_to_monday); 
  var w_day = aqString.SubString(date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(date,3,2));
  var w_yr = aqConvert.StrToInt(aqString.SubString(date,6,4));
  
  var max_days = get_days_in_month(w_mth, w_yr);
  
  for(var i = 0; i < 5; i++)
  {
    tsa_add_a_clinic(w_day, 0, 0, false, false);
    if(w_day < max_days)
    {
      w_day++;
    }
    else
    {
      w_day = 1;
      if(w_mth != 12)
      {
        max_days = get_days_in_month(w_mth + 1, w_yr);
      }
      else
      {
        w_mth = 1;
        max_days = get_days_in_month(w_mth, w_yr + 1);
      }
    }
    WaitSeconds(1);
  }
}
//--------------------------------------------------------------------------------
function get_days_in_month(month_no, year_no)
{
  var no_of_days;

  switch(month_no)
  {
    case 1: 
    no_of_days = "31";
    break;
    case 2:
    if(year_no % 4 == 0)
    {
      if(year_no % 100 == 0)
      {
        if(year_no % 400 == 0)
        {
          no_of_days = "29";
        }
        else
        {
          no_of_days = "28";
        }
      }
      else
      {
        no_of_days = "29";
      }
    }
    else
    {
      no_of_days = "28";
    }
    break;
    case 3: 
    no_of_days = "31";
    break;
    case 4: 
    no_of_days = "30";
    break;
    case 5: 
    no_of_days = "31";
    break;
    case 6: 
    no_of_days = "30";
    break;
    case 7:
    no_of_days = "31";
    break;
    case 8: 
    no_of_days = "31";
    break;
    case 9: 
    no_of_days = "30";
    break;
    case 10:
    no_of_days = "31";
    break;
    case 11: 
    no_of_days = "30";
    break;
    case 12: 
    no_of_days = "31";
    break;
  }
  return no_of_days;
}
//--------------------------------------------------------------------------------
function goto_patient_clinic_tab_appointment_name(name, weeks_ahead)
{ 
  treatment_appointment_buttons().Button("MakeAppointment").Click(20, 20);
  
  for(var i = 0; i < weeks_ahead; i++)
  {
    clinic_move_calendar_forward().Click();
  }
  var clinic_names = clinic_patients_appointments_container();
  for(var i = 0; i < clinic_names.ChildCount; i++)
  {
    var child = clinic_names.Child(i).Panel("appointmentDiv").Table(0).Cell(0, 1).Table(0).Cell(0, 1).Table(0).Cell(2, 0).TextNode("lblDescription");
    if(child.contentText == name)
    {
     //child.Parent.Parent.Parent.Parent.Parent.Parent.Parent;
      for(var j = 0; j <= 24; j++)
      {
        var box = clinic_patients_appointments_container().FindChild("contentText", "Appts:" + j + "/24" + "\n" + name);
        if(box.Exists == true)
        {
          box.ClickR();
          break;
        }
      }
      break;
    }
  }
}
//--------------------------------------------------------------------------------
function goto_clinic_tab_appointment_name(name, weeks_ahead)
{
  Goto_Clinics();
  WaitSeconds(1);
  
  for(var i = 0; i < weeks_ahead; i++)
  {
    clinic_move_calendar_forward().Click();
  }
  var clinic_names = clinic_appointments_container();
  for(var i = 0; i < clinic_names.ChildCount; i++)
  {
    var child = clinic_names.Child(i).Panel("appointmentDiv").Table(0).Cell(0, 1).Table(0).Cell(0, 1).Table(0).Cell(2, 0).TextNode("lblDescription");
    if(child.contentText == name)
    {
      //child.Parent.Parent.Parent.Parent.Parent.Parent.Parent;
      for(var j = 0; j <= 24; j++)
      {
        var box = clinic_appointments_container().FindChild("contentText", "Appts:" + j + "/24" + "\n" + name);
        if(box.Exists == true)
        {
          box.ClickR();
          break;
        }
      }
      break;
    }
  }
}
//--------------------------------------------------------------------------------
function tsa_clinic_confirm_default_ntd()
{
  treatment_appointment_buttons().Button("MakeAppointment").Click();
    
  var panel = clinic_schedule_container();
  var tab_name = new Array();
  tab_name = panel.QuerySelectorAll("div.NextTestDate");
  var format_date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%a, %d-%b");
    
  var result_set_1 = false;
  for(var i = 0; i < tab_name.length; i++)
  {
    if(tab_name[i].contentText == format_date)
    {
      result_set_1 = true;
      break;
    }
  }
  
  var close = INRstar_base().Panel(3).Panel(1).Panel(0).Button(0).TextNode(0);
  close.Click();
  
  return result_set_1;
}
//--------------------------------------------------------------------------------
function tsa_clinic_make_appointment(clinic_name, clinic_date)
{
  var weeks_ahead = tc_clinics_weeks_to_progress(clinic_date)
  goto_patient_clinic_tab_appointment_name(clinic_name, weeks_ahead);
  var close = INRstar_base().Panel(3).Panel(1).Panel(0).Button(0).TextNode(0);
  var popup_msg = "";

  var popup_button = INRstar_base().NativeWebObject.Find("innerHTML", "Select This Clinic");
  if(popup_button.Exists == true && popup_button.VisibleOnScreen == true)
  {
    popup_button.Click();
    
    clinic_make_appointment_container().Panel("selectionLayer").Panel("appointmentsScheduler_commonControlsBlock_selectionDiv").Click(700, 20);
    clinic_make_appointment_container().Table("appointmentsScheduler_containerBlock_vertTable").Cell(1, 1).ClickR(700, 20);
    
    popup_button = INRstar_base().NativeWebObject.Find("innerHTML", "Make Appointment");
    if(popup_button.Exists == true && popup_button.VisibleOnScreen == true)
    {
      popup_button.Click();
      WaitSeconds(4);
      popup_msg = process_clinic_popup("Authorisation Required", "Authorise");
    }
  }
  WaitSeconds(4);
  close.Click();
  return popup_msg;
}
//--------------------------------------------------------------------------------
function tsa_clinic_check_patient_status(clinic_name, f_name, s_name, clinic_date)
{
  var weeks_ahead = tc_clinics_weeks_to_progress(clinic_date)
  goto_clinic_tab_appointment_name(clinic_name, weeks_ahead);
  
  var popup_button = INRstar_base().NativeWebObject.Find("innerHTML", "View Appointments");
  if(popup_button.Exists == true && popup_button.VisibleOnScreen == true)
  {
    popup_button.Click();
    var patient_block = clinic_appointments_internal_container().Panel("appointmentsScheduler_aptsBlock_AptDiv0").Panel("appointmentDiv").Table(0).Cell(0, 1);
    if(aqString.Contains(patient_block.contentText, s_name) != -1 && aqString.Contains(patient_block.contentText, f_name) != -1)
    {
      var pic = patient_block.Picture();
      Log.Picture(pic);
    }
  }
}
//--------------------------------------------------------------------------------
function tsa_clinic_split_date(date)
{
  var todays_date = aqConvert.StrToDate(aqDateTime.Today());
  var f_date = aqConvert.StrToDate(date);
  var date_split = new Array(); 
     
  var t_day = aqString.SubString(todays_date,0,2);
  var t_mth = aqConvert.StrToInt(aqString.SubString(todays_date, 3, 2));
  var t_yr = aqString.SubString(todays_date, 6, 4);
  
  var day = aqString.SubString(f_date,0,2);
  var mth = aqConvert.StrToInt(aqString.SubString(f_date,3,2));
  var yr = aqString.SubString(f_date,6,4);
  
  if(aqDateTime.Compare(f_date, todays_date) != -1)
  {
    var day_no = day;
    date_split.push(aqConvert.StrToInt(day_no));
  
    if(t_mth <= mth)
    {
      var add_no_months = mth - t_mth;
      date_split.push(aqConvert.StrToInt(add_no_months));
    }
    else
    {
      var add_no_months = (12 - t_mth) + mth;
      date_split.push(aqConvert.StrToInt(add_no_months));
    }
  
    var add_no_years = yr - t_yr - 1;
    date_split.push(add_no_years);
    
    return date_split;
  }
  else
  {
    add_no_months = 0;
    add_no_years = 0;
    date_split.push(t_day, add_no_months, add_no_years);
    return date_split;
  } 
}
//--------------------------------------------------------------------------------
function tc_clinics_weeks_to_progress(clinic_date)
{
  var weeks_ahead = 0;
  if(clinic_date != null)
  {
    var t_date = aqConvert.DateTimeToStr(aqConvert.StrToDate(aqDateTime.Today()));
    var day_of_week = aqDateTime.GetDayOfWeek(t_date);
    var days_to_monday = 2 - day_of_week;
    var m_date = aqConvert.DateTimeToStr(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), days_to_monday)));
    var difference = aqDateTime.TimeInterval(aqConvert.StrToDate(m_date), aqConvert.StrToDate(clinic_date));
    var difference_in_days = aqConvert.TimeIntervalToStr(difference).split(":")[0]
    weeks_ahead = aqConvert.VarToInt(difference_in_days / 7);
  }
  return weeks_ahead;
}