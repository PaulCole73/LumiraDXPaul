//USEUNIT loggin
//USEUNIT Navigate_Patient
//USEUNIT Navigation
//USEUNIT Quick_Patient
//USEUNIT Test_Audit
//USEUNIT Tested_Apps
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT Generic_Functions
//-------------------------------------------------------------------------------------------------------------------------------
function Get_SORB_Schedule_just_days()
{
  var INRstarV5 = set_system();
  var PanelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var PanelPTC = PanelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var PanelPPT = PanelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var table = PanelPPT.Panel("PendingTreatmentInfo").Table("sorbTable");
  
  var sorb_schedule = new Array();
   
  for(i=1; i<table.rowcount; i++)
   
  {
    var data = table.Cell(i, 0).contentText;
    var day = aqString.SubString(data,0,3);
    
    sorb_schedule.push(day);
  }
   return sorb_schedule;
}
//-------------------------------------------------------------------------------------------------------------------------------
function Get_SORB_Schedule_days_and_dose()
{
  var INRstarV5 = set_system();
  var PanelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var PanelPTC = PanelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var PanelPPT = PanelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var table = PanelPPT.Panel("PendingTreatmentInfo").Table("sorbTable");
  
  var sorb_schedule = new Array();
   
  for(i=0; i<3; i++)
   
  {
    var data = table.Cell(i + 1, 0).contentText;
    var day = aqString.SubString(data,0,3);
    var dose = table.Cell(i + 1, 2).Panel("sorbDose" + i).Panel("sorbSingle" + i).contentText;
    
    sorb_schedule.push(day + " " + dose);
  }
  
  for(i=3; i<table.rowcount -1; i++)
   
  {
    var data = table.Cell(i + 1, 0).contentText;
    var day = aqString.SubString(data,0,3);
    var dose = table.Cell(i + 1, 1).contentText;
    
    sorb_schedule.push(day + " " + dose);
  }
   return sorb_schedule;
}
//-------------------------------------------------------------------------------------------------------------------------------
function getting_expected_schedule_by_days(treatment_start,days)
{
//  Getting the start of the schedule, need to pass in the date you want to calculate from
  if(treatment_start=="today")
    {
    var startDate = new Date();
    //Log.Message(startDate)
    }
      else if (treatment_start=="backdate_1day")
      {
      var startDate = new Date();
      var date = startDate.setDate(startDate.getDate()-1);
      //Log.Message(startDate + " This is the calculated start date");
     }
       else if (treatment_start=="backdate_2day")
        {
        var startDate = new Date();
        var date = startDate.setDate(startDate.getDate()-2);
        //Log.Message( startDate + "  This is the calculated start date"); 
       }
        else if (treatment_start=="backdate_3day")
        {
        var startDate = new Date();
        var date = startDate.setDate(startDate.getDate()-3);
        //Log.Message(startDate + " This is the calculated start date");
       }
    
  //Getting the end date of the recurring part of the schedule, need to pass in the date you want the schedule to end on
  var endDate = new Date();
  var date_calc = endDate.setDate(endDate.getDate()+days);
  //Log.Message(endDate+ " This is the calculated end date")
  
//  Using the above dates specified this will get the full list of dates 
  var dateArr = Get_list_dates_between(startDate,endDate);
  //Log.Message(dateArr + " This is the full date list")
  
//  This returns the final expected list of formatted days to check against the actual schedule list
  var days = Brakedown_list_dates_to_days(dateArr);
  //Log.Message(days);
  return days;
} 
//-------------------------------------------------------------------------------------------------------------------------------
function Get_list_dates_between(startDate,endDate)
{
    var arr = new Array();
    
      while (endDate >= startDate) 
      {
          arr.push(new Date(startDate));         
          startDate.setDate(startDate.getDate() + 1);
      }
    return arr   
}
//-------------------------------------------------------------------------------------------------------------------------------
function Brakedown_list_dates_to_days(date_array)
{
  var array = date_array;
  var dateArr = array.length;
   
  var sorb_schedule_days = new Array();
  
  for(i=0; i<dateArr; i++)
   
        {
          var day = aqString.SubString(array[i],0,3);   
          sorb_schedule_days.push(day);
        }
        
        return sorb_schedule_days
}
//-------------------------------------------------------------------------------------------------------------------------------