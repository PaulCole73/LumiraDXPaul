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
   
   w_where = "Studale Read Only";
   edit_patient_registered_location(INRstarV5, w_where);
   
   w_where = "Studale Prison";
   edit_patient_registered_location(INRstarV5, w_where);

}
function edit_patient_registered_location(INRstarV5, p_where)
{
  Log.Message("Changing Patient's Registered location to : " + p_where);

  Goto_Change_Registered_Location();
  
  // --------------- Page 1
      
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPC = panelMCP.Panel("PatientContent");
  var formWRLCSF = panelPC.Form("WizardRegisteredLocationChangeStep1Form");
  var panelCPRLSR = formWRLCSF.Panel("ChangePatientRegisteredLocationSearchContainer");
  var tableCPRLSR = panelCPRLSR.Table("ChangePatientRegisteredLocationSearchResults");
  
  // Select 1st 2 patients
  tableCPRLSR.Cell(1,7).Checkbox("selectedPatients").ClickChecked(true);
  tableCPRLSR.Cell(2,7).Checkbox("selectedPatients").ClickChecked(true);
  
  // Click Next
  formWRLCSF.Panel(1).SubmitButton("WizardChangeRegisteredLocatonStep2Link").Click();
  
  // --------------- Page 2
  
  var panelWRLS2 = panelPC.Panel("WizardRegisteredLocationStep2Container");
  var formSRLF = panelWRLS2.Form("SearchRegisteredLocationForm");
  
  // Set search parameters
  formSRLF.Panel(0).Panel(0).Select("SearchType").ClickItem("Name");
  formSRLF.Panel(0).Panel(1).Textbox("SearchCriteria").Value = p_where;
  
  // Click Search
  formSRLF.Panel(0).Panel(1).SubmitButton("Search").Click();
  
  // Select the first returned practice
  var tableLR = panelWRLS2.Panel("LocationSearchResults").Table("LocationResults");
  tableLR.Cell(1, 0).Label("Name_DetachedLabel").Click();
  
  // Click Next
  var formWRLCS2 = panelWRLS2.Form("WizardRegisteredLocationChangeStep2Form");
  formWRLCS2.Panel(0).SubmitButton("btnNext").Click();
  
  // --------------- Page 3
  
  // Click Confirm
  var panelWRLS3 = panelPC.Panel("WizardRegisteredLocationStep3Container");
  var formWRLCS3 = panelWRLS3.Form("WizardRegisteredLocationChangeStep3Form");
  formWRLCS3.Panel(0).SubmitButton("ConfirmChangeLocationDetails").Click(); 
  
  // Click Pop-up
  process_confirm_change_registered_location(INRstarV5);
  
      
      
}