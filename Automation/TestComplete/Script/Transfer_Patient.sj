//USEUNIT Navigate_Patient
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Batch
//USEUNIT Home_Page_Regression_Quick_Checking

//------------------------------------------------------------------------------

function transfer_induction_regression()

{
  var INRstarV5 = set_system();
  var panelPR = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord")
  var panelPMTC = panelPR.Panel("PatientMainTabContent");
  var Button = panelPMTC.Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper").Panel("PatientPreferences").Panel(0);

  Button.Button("EditPatientTestingSectionLink").Click();
  
  //Check the transfer warning exists for induction and then confirm
  process_confirm_sub(INRstarV5, "Patient Transfer Warning");
  
  var panelPMDW = panelPMTC.Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper");
  var form = panelPMDW.Panel("ChangeTestingSectionContainer").Form("SearchRegisteredLocationForm");
  
  //Selecting location name, search, and confirm the transfer
  form.Panel("SearchTestingLocations").Panel("SearchContainerInnerContainer").Select("SearchType").ClickItem("Name");
  form.Panel("SearchTestingLocations").Panel("SearchContainerInnerContainer").Textbox("SearchCriteria").Text = "LDxCS-Test-AutoTest2";
  form.Panel("SearchTestingLocations").Panel("SearchContainerInnerContainer").SubmitButton("Search").Click();
  
  var locationtable = panelPMDW.Panel("ChangeTestingSectionContainer").Panel("LocationSearchResults").Table("LocationResults");
  
  locationtable.Cell(1, 0).Label("Name_DetachedLabel").Click();
  
  var form2= panelPMDW.Panel("ChangeTestingSectionContainer").Form("ChangeLocationForm");
  form2.Panel("SelectedPracticeWrapper").Button("ConfirmChangeLocationDetails").Click();
  
  //Confirm the final transfer confirmation
  var popup=INRstarV5.Panel(2).Panel(1).Panel(0);
  popup.Button(1).Click();
  
  //Getting patient name for the message checking and accept the transfer
  var patFirstname = get_patient_first_name();
  var patSurname = get_patient_surname();
  var messagename = (patSurname + ", " + patFirstname);
  Log.Message(messagename);
  
  var row_number
  
  log_off();
  log_on_cl3_regression2();
  
  row_number=check_pat_on_transfer_list(messagename);
  
  var INRstarV5 = set_system();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
  var table = panelUCR.Panel("TransferredPatients").Table("TransferredTable")  
  table.Cell(row_number, 6).Button("AcceptChangePatientTestingLocation").click();
  
}




