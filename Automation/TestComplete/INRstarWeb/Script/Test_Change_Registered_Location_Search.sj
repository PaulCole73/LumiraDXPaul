//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation
//USEUNIT V5_Common_Presets

//===============================================================================
//
// This process will change the registered location of a patient, 
// then change it back to the Testing location
//
function quick_start()
{
   Log_On(8); // gov@studale -- (Prison)
   
   var INRstarV5 = set_system();  
   
   Goto_Change_Registered_Location();
  
   // --------------- Page 1
      
   var panelMain = INRstarV5.Panel("MainPage");
   var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
   var panelPC = panelMCP.Panel("PatientContent");
   var formWRLCSF = panelPC.Form("WizardRegisteredLocationChangeStep1Form");
   var panelCPRLSR = formWRLCSF.Panel("ChangePatientRegisteredLocationSearchContainer");
   var tableCPRLSR = panelCPRLSR.Table("ChangePatientRegisteredLocationSearchResults");

   // Select 1st patients
   tableCPRLSR.Cell(1,7).Checkbox("selectedPatients").ClickChecked(true);
  
   // Click Next
   formWRLCSF.Panel(1).SubmitButton("WizardChangeRegisteredLocatonStep2Link").Click();
  
   // --------------- Page 2
      
   w_location = "Studale Read Only";
   
   
   // Test search by Town
   w_value = "rhyl";
   w_param = "Town"
   search_patient_registered_location(INRstarV5, w_param, w_value, w_location);
   
   // Test search by part Town
   w_value = "rh";
   w_param = "Town"
   search_patient_registered_location(INRstarV5, w_param, w_value, w_location);
   
   // Test search by Name
   w_value = "Studale Practice";
   w_param = "Name"
   search_patient_registered_location(INRstarV5, w_param, w_value, w_location);
   
   // Test search by part Name
   w_value = "stu";
   w_param = "Name"
   search_patient_registered_location(INRstarV5, w_param, w_value, w_location);
   
   // Test search by Address Line 1
   w_value = "3 Russell Road";
   w_param = "Address Line 1"
   search_patient_registered_location(INRstarV5, w_param, w_value, w_location);
   
   // Test search by Address Line 1
   w_value = "3 Russ";
   w_param = "Address Line 1"
   search_patient_registered_location(INRstarV5, w_param, w_value, w_location);
   
   // Test search by County
   w_value = "Denbighshire";
   w_param = "County"
   search_patient_registered_location(INRstarV5, w_param, w_value, w_location);
   
   // Test search by part County
   w_value = "Den";
   w_param = "County"
   search_patient_registered_location(INRstarV5, w_param, w_value, w_location);
   
   // Test search by Postcode
   w_value = "LL18 3PD";
   w_param = "Postcode"
   search_patient_registered_location(INRstarV5, w_param, w_value, w_location);
   
   // Test search by part Postcode
   w_value = "LL18";
   w_param = "Postcode"
   search_patient_registered_location(INRstarV5, w_param, w_value, w_location);
   
   // Test search by Location Code
   w_value = "SRO";
   w_param = "Location Code"
   search_patient_registered_location(INRstarV5, w_param, w_value, w_location);
   
   // Test search by part Location Code
   w_value = "S";
   w_param = "Location Code"
   search_patient_registered_location(INRstarV5, w_param, w_value, w_location);
   
}
function search_patient_registered_location(INRstarV5, p_param, p_value, p_location)
{
  Log.Message("Testing search for Patient's Registered location by : " + p_param + " with " + p_value);

  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPC = panelMCP.Panel("PatientContent");
  var panelWRLS2 = panelPC.Panel("WizardRegisteredLocationStep2Container");
  var formSRLF = panelWRLS2.Form("SearchRegisteredLocationForm");
  
  // Set search parameters
  formSRLF.Panel(0).Panel(0).Select("SearchType").ClickItem(p_param);
  formSRLF.Panel(0).Panel(1).Textbox("SearchCriteria").Value = p_value;
  
  // Click Search
  formSRLF.Panel(0).Panel(1).SubmitButton("Search").Click();
  
  // Search the list of returned Locations for the target
  var tableLR = panelWRLS2.Panel("LocationSearchResults").Table("LocationResults");

  for (i=0; i<tableLR.RowCount; i++)
  {
    if (tableLR.Cell(i,0).Label("Name_DetachedLabel").innerText == p_location)
      Log.Message("Location found");
  }
}