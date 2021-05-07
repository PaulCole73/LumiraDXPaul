//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_pending_suggested_treatment_schedule(days)
{
  wait_for_object(path_patient_pending_treatment(), "idStr", "DosingScheduleContent", 3);
  var schedulegrid = dosing_schedule_content().Fieldset(0).Fieldset("ScheduleGrid");
  
  //return schedule;
  var pending_schedule = new Array();
  if(days == "0")
  {
    for(i=0; i<7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  } 
  else if(days == "1")
  {
    for(var i= 0; i < 7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }

    for(var i = 0; i < 1; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  } 
  else if(days == "2")
  {
    for(var i= 0; i < 7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
    for(var i= 0; i < 2; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  } 
  else if(days == "3")
  {
    for(var i = 0; i < 7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
    for(var i = 0; i < 3; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  }
  else if(days == "4")
  {
    for(var i = 0; i < 7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
    for(var i = 0; i < 4; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  }
  else if(days == "5")
  {
    for(var i = 0; i < 7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
    for(var i = 0; i < 5; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  }
  else if(days == "6")
  {
    for(var i = 0; i < 7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
    for(var i = 0; i < 6; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  }
  else if(days == "7")
  {
    for(i=0; i<7; i++)
    {
      var data = schedulegrid.TextNode("ScheduleDays").TextNode(i).contentText;
      var day = aqString.SubString(data,0,3);
      var dose = schedulegrid.TextNode("sortableSchedule").TextNode(i).contentText;
      pending_schedule.push(day + " " + dose);
    }
  } 
  
  return pending_schedule;
}