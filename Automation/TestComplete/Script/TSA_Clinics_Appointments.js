//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT V5_Common_Batch
//USEUNIT Generic_Functions
//USEUNIT V5_Common_Popups
//--------------------------------------------------------------------------------
function tsa_add_a_clinic(day_no, add_no_months, add_no_years, is_recurring, is_end_by)
{
  var INRstarV5 = INRstar_base();
  Goto_Add_Clinic(INRstarV5);
  
  var recurring = is_recurring;
  
  var f_name = add_clinic_form().Table(0).Cell(0, 1).Table("Name_ET").Cell(0, 0).Table("Name").Cell(0, 0).Textbox("Name_I");
  var f_start = add_clinic_form().Table(0).Cell(2, 1).Table("StartTime_ET").Cell(0, 0).Table("StartTime").Cell(0, 0).Textbox("StartTime_I");
  var f_end = add_clinic_form().Table(0).Cell(3, 1).Table("EndTime_ET").Cell(0, 0).Table("EndTime").Cell(0, 0).Textbox("EndTime_I");
  
  var date_dropdown = add_clinic_form().Table(0).Cell(1, 1).Table("StartDate_ET").Cell(0, 0).Table("StartDate").Cell(0, 1).Click();
  for(var i = 0; i < add_no_years; i++)
  {
    date_picker_dropdown().Cell(0, 0).Table(0).Cell(0, 6).Image("StartDate_DDD_C_NYCImg").Click();
  }
  for(var i = 0; i < add_no_months; i++)
  {
    date_picker_dropdown().Cell(0, 0).Table(0).Cell(0, 4).Image("StartDate_DDD_C_NMCImg").Click();
  }
  
  var day_picker_container = date_picker_dropdown().Cell(1, 0).Table("StartDate_DDD_C_mt");
  for(var i = 0; i < day_picker_container.ChildCount; i++)
  {
    var child = day_picker_container.Child(i);
    if(child.contentText == day_no)
    {
      child.Click();
      break;
    }
  }
  WaitSeconds(1);
  
  f_name.Text = "Automation: " + day_no;
  f_start.Text = "06:00";
  f_end.Text = "10:00";
   
  add_clinic_form().Table(0).Cell(4, 1).Table("SlotLength_ET").Cell(0, 0).Table("SlotLength").Cell(0, 2).Click();
  select_clinic_time_slot().Cell(1, 0).Click();
  
  if(is_recurring == true)
  {
    var recur_form = add_clinic_form().Panel("appointmentRecurrenceForm_mainDiv");
    var recur_check = recur_form.Table(0).Cell(0, 0).Table("appointmentRecurrenceForm_ChkRecurrence");
    var recur_button = recur_check.Cell(0, 0).Click();
    
    if(is_end_by == true)
    {
      tsa_add_end_by_date();
    }
  }
  add_clinic_form_buttons().Cell(0, 0).Table("Apply").Cell(0, 0).Panel("Apply_CD").Click();
}
//--------------------------------------------------------------------------------
function tsa_add_end_by_date()
{
  clinic_end_by_panel().Cell(2, 0).Table("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEndByDate").Cell(0, 0).Click();
  clinic_end_by_panel().Cell(2, 1).Table(0).Cell(0, 0).Table("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEnd").Cell(0, 1).Click();

  for(var i = 0; i < 2; i++)
  {
    clinic_end_by_date_dropdown().Cell(0, 0).Table(0).Cell(0, 4).Image("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEnd_DDD_C_NMCImg").Click();
  }
  
  var date = aqDateTime.AddMonths(aqDateTime.Today(), 2);
  var day_of_week = aqDateTime.GetDayOfWeek(date);
  if(day_of_week == 7 || day_of_week == 1)
  {
    var date = aqDateTime.AddDays(aqDateTime.Today(), 2);
  }
  
  var w_day = aqString.SubString(date,0,2);
  
  var day_picker_container = clinic_end_by_date_dropdown().Cell(1, 0).Table("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEnd_DDD_C_mt");
  for(var i = 0; i < day_picker_container.ChildCount; i++)
  {
    var child = day_picker_container.Child(i);
    if(child.contentText == w_day)
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