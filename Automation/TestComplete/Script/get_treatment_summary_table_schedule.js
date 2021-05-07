//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_treatment_summary_table_schedule()
{
  //needs a goto statement here
  var smry_dosing_schedule = new Array();
  var smry_schedule_day;
  var smry_schedule_dose;
  for(var i = 1; i <= 7; i++)
  {
    smry_schedule_day = aqString.SubString(patient_summary_schedule_table().Cell(i, 0).innerText, 0, 3);
    smry_schedule_dose = smry_schedule_day + " " + patient_summary_schedule_table().Cell(i, 1).innerText;
    smry_dosing_schedule.push(smry_schedule_dose);
  }
  
  return smry_dosing_schedule;
}