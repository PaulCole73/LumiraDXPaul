//USEUNIT engage_System_Paths
//USEUNIT engage_Popup_Handlers
//------------------------------------------------------------------------
function Goto_Understand_Schedule_Tab()
{
  var obj = engage_things_to_do_today_panel().Panel(1);
  var task = obj.FindChild("innerText", "Confirm your new warfarin tablet schedule", 3);
  task.Click();
  
  var text = process_engage_popup("PopUp__Container--1SBUF PopUp__ContainerLoaded--30PKc", "Confirm your new warfarin tablet schedule", "OK");
  
  return text;
}