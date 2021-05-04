//USEUNIT System_Paths
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------

function add_inrstar_feedback(feedback)
{
  var INRstarV5 = INRstar_base();
  var obj = feedback_tab();
  click_navigation_wrapper(obj, INRstarV5, "idStr", "CollectFeedbackForm", 3);
  
  WaitSeconds(1);
  
  feedback_tab_textarea().innerText = feedback;
  INRstarV5.Panel(6).Panel(0).Panel(0).Button(1).TextNode(0).Click();
  var datetime = aqConvert.DateTimeToFormatStr(aqDateTime.Now(), "%d-%b-%Y %H:%M");
  
  return datetime;
}