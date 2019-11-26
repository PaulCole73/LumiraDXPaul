//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation
//USEUNIT V5_Common_Tests
//USEUNIT V5_Common_Presets
//-------------------------------------------------------------------------------------------

//This was designed for regression purposes



function test_execute_test()

{

log_on_cl3()
WaitSeconds(2);
Goto_Recently_Viewed();
preset_Fetch_Patient_Recent();
quick_adverse_event_regression();

}
//-------------------------------------------------------------------------------------------


function quick_adverse_event_regression()

{      
      Goto_Patient_Adverse_Events();

      var INRstarV5 = set_system();
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("PatientTabContent");
      var panelPAEW = panelPTC.Panel("PatientAdverseEventsWrapper");
      var panelPAEL = panelPAEW.Panel("PatientAdverseEventList");
      
      // Click Add button
      panelPAEL.Panel(1).Button("AddAdverseEventLink").Click();

      var panelPAAEW = panelPAEW.Panel("PatientAddAdverseEventsWrapper");
      var form = panelPAAEW.Form("AddAdverseEventForm");
      
      form.Panel(1).Select("AdverseEvent_EventId").ClickItem(1);
      form.Panel(2).Select("DrugId").ClickItem(1);
      form.Panel(3).Select("AdverseEvent_SeverityId").ClickItem(1);
      form.Panel(4).Select("AdverseEvent_TreatmentId").ClickItem(1);
      form.Panel(5).Select("AdverseEvent_OutcomeId").ClickItem(1);
      
      //Save the Adverse Event
      
      form.Panel(7).SubmitButton("SubmitAddAdverseEvent").Click();
}

//-------------------------------------------------------------------------------------------

function log_on_cl3()
{
     Log_On_User("");
}