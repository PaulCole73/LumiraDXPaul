//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation
////USEUNIT V5_Common_Tests

//-------------------------------------------------------------------------------
function test_patient_adverse_events(INRstarV5)
{
  try
  {
      Goto_Patient_Adverse_Events();
      
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPTC = panelMCP.panel("PatientRecord").panel("PatientTabContent");
      var panelPAEW = panelPTC.Panel("PatientAdverseEventsWrapper");
      var panelPAEL = panelPAEW.Panel("PatientAdverseEventList");

      Log.Message("Testing Patient Adverse Events");
      
      // Click Add button
      panelPAEL.Panel(1).Button("AddAdverseEventLink").Click();
      
      test_adv_date(INRstarV5);
      
      test_adv_event(INRstarV5);
      
      test_adv_severity(INRstarV5);
      
      test_adv_treatment(INRstarV5);
      
//      test_adv_comments(INRstarV5);
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
function test_patient_adverse_events_delete()
{
      Goto_Patient_Adverse_Events();
      
      var INRstarV5 = set_system();
      
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("PatientTabContent");
      var panelPAEW = panelPTC.Panel("PatientAdverseEventsWrapper");

      Log.Message("Testing Patient Adverse Events");
      
      // Select 1st event
      panelPAEW.Panel("PatientAdverseEventList").Panel(0).Click(); 
      
      // Find Delete Button
      var wbx_Button = INRstarV5.NativeWebObject.Find("idStr", "DeleteClinic");
      
      if (wbx_Button.Exists == true)
      {
           Log.Message("Delete button found");
           // Click Delete button
           wbx_Button.Click();
           process_confirm_delete_adverse_event(INRstarV5);
      }
      else
           Log.Message("Delete button not found");
}
