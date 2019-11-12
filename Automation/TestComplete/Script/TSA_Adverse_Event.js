//USEUNIT System_Paths
//USEUNIT Navigation

//--------------------------------------------------------------------------------
function add_adverse_event()
{
  Goto_Patient_Adverse_Events();
  var adverse_event_tab_path = adverse_event_tab();
  
  // Click Add button
  adverse_event_tab_path.Panel(1).Button("AddAdverseEventLink").Click();

  var adverse_event_form_path = adverse_event_form();
     
  adverse_event_form_path.Panel(1).Select("AdverseEvent_EventId").ClickItem(1);
  adverse_event_form_path.Panel(2).Select("DrugId").ClickItem(1);
  adverse_event_form_path.Panel(3).Select("AdverseEvent_SeverityId").ClickItem(1);
  adverse_event_form_path.Panel(4).Select("AdverseEvent_TreatmentId").ClickItem(1);
  adverse_event_form_path.Panel(5).Select("AdverseEvent_OutcomeId").ClickItem(1);
      
  //Save the Adverse Event
  adverse_event_form_path.Panel(7).SubmitButton("SubmitAddAdverseEvent").Click();
}
//--------------------------------------------------------------------------------
function delete_adverse_event()
{
  Goto_Patient_Adverse_Events();
  var adverse_event_tab_path = adverse_event_tab();
  adverse_event_tab_path.Panel(0).Click(); 
  var INRstarV5 = INRstar_base();
  
  // Find Delete Button
  var wbx_Button = INRstarV5.NativeWebObject.Find("idStr", "DeleteClinic");
      
  if (wbx_Button.Exists == true)
  {
    Log.Message("Delete button found");
    wbx_Button.Click();
    process_confirm_delete_adverse_event();
  }
  else
  {
    Log.Message("Delete button not found");  
  }
} 
//--------------------------------------------------------------------------------