//USEUNIT engage_System_Paths
//USEUNIT engage_Popup_Handlers
//------------------------------------------------------------------------
function Goto_Understand_Schedule_Tab(isTaskPending)
{
  var obj = engage_things_to_do_today_panel().Panel(1);
  //find pending task
  var task = obj.FindAllChildren("innerText", "Confirm your new warfarin tablet schedule\nDue date: " + aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%a %d %b %Y"), 3);
  for (i=0; i<task.length; i++ )
    {
      var pendingTask = aqString.Find(task[i].className,"TaskPending");
      if (isTaskPending == true)
        {if (pendingTask != -1)
          {
            task[i].Click();
            break;
          }
        }
      else if (isTaskPending == false)
        {if (pendingTask == -1)
          {
            task[i].Click();
            break;
          }
        }
    }
   
  var text = process_engage_popup("PopUp__Container--1SBUF PopUp__ContainerLoaded--30PKc", "Confirm your new warfarin tablet schedule", "OK");
  
  return text;
}