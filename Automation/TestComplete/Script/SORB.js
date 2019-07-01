//USEUNIT loggin
//USEUNIT Navigate_Patient
//USEUNIT Navigation
//USEUNIT Quick_Patient
//USEUNIT Tested_Apps
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets

function getting_expected_schedule_by_days(days)
{
  //Getting the start of the schedule, need to pass in the date you want to calculate from
  var startDate = new Date();
  
  //Getting the end date of the recurring part of the schedule, need to pass in the date you want the schedule to end on
  var endDate = new Date();
  var date_calc = endDate.setDate(endDate.getDate()+days);
  
  //Using the above dates specified this will get the full list of dates 
  var dateArr = Get_list_dates_between(startDate,endDate);
  Log.Message(dateArr + " This is the full date list")
  
  //This returns the final expected list of formatted days to check against the actual schedule list
  var days = Brakedown_list_dates_to_days(dateArr);
  Log.Message(days)
} 

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