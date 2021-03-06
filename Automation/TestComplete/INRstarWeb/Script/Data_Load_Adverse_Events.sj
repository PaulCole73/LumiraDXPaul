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
      data_loading()
      WaitSeconds(2);
}

//-------------------------------------------------------------------------------------------

function log_on_cl3()
{
     Log_On_User("adverse","INRstar_5");
}

//-------------------------------------------------------------------------------------------

function data_loading()
{

// Read input file

    driver = DDT.ExcelDriver("Q:\\Development and Testing\\Testing\\TestComplete_Test_Data\\Adverse_Event_Driver_File.xls","adverse_events");
    
    var INRstarV5 = set_system();
    WaitSeconds(2);
     
    // for each record, call the create process
    while (!driver.EOF())
    {
     if (driver.Value(0) == "Y")
     {
         adverse_event_data_load(driver);
//         WaitSeconds(2,"");
     }
     
      // Next record
      driver.Next();      
    }
}
//-------------------------------------------------------------------------------------------


function adverse_event_data_load()

{

      var INRstarV5 = set_system();
      
      Goto_Patient_Search();
      preset_Fetch_Patient_NHS(INRstarV5, driver.Value(1));
      Goto_Patient_Adverse_Events();
         
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("PatientTabContent");
      var panelPAEW = panelPTC.Panel("PatientAdverseEventsWrapper");
      var panelPAEL = panelPAEW.Panel("PatientAdverseEventList");
      
      // Click Add button
      panelPAEL.Panel(1).Button("AddAdverseEventLink").Click();

      var panelPAAEW = panelPAEW.Panel("PatientAddAdverseEventsWrapper");
      var form = panelPAAEW.Form("AddAdverseEventForm");
      
      form.Panel(1).Select("AdverseEvent_EventId").ClickItem(driver.Value(3));
//      WaitSeconds(1);
      form.Panel(2).Select("DrugId").ClickItem(driver.Value(4));
//      WaitSeconds(1);
      form.Panel(3).Select("AdverseEvent_SeverityId").ClickItem(driver.Value(5));
//      WaitSeconds(1);
      form.Panel(4).Select("AdverseEvent_TreatmentId").ClickItem(driver.Value(6));
//      WaitSeconds(1);
      form.Panel(5).Select("AdverseEvent_OutcomeId").ClickItem(driver.Value(7));
//      WaitSeconds(1);
      
      //Save the Adverse Event
      
      form.Panel(7).SubmitButton("SubmitAddAdverseEvent").Click();
}


