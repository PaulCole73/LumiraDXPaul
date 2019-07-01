//USEUNIT Tested_Apps
//USEUNIT Login
//USEUNIT Emis_web_open_app
//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT EMIS_Data_Driver_File

//------------------------------------------------------------------------------

//Suite of tests for fileback
  
function Emis_tests()
{

//  bat_job_excel_emis();
//  WaitSeconds(4);
// // This updates the dates and calculations for the driver spreadhseet
//  ShutdownSaveExcel();
//  WaitSeconds(5);

  open_application("INRstar");
  
  WaitSeconds(10)
  
  login('dean@emisweb','INRstar_5','Shared');
  add_data();
  close_application();
}
//------------------------------------------------------------------------------

function login_emis(Username,password,OrganisationId)
{

    var emis = Sys.Process("EmisWeb");
    var login_form = emis.WinFormsObject("LoginForm").WinFormsObject("LoginFields");

    login_form.WinFormsObject("textBoxUserName").Text = Username;
    login_form.WinFormsObject("textBoxPassword").Text = password;
    login_form.WinFormsObject("textCDBNumber").Text = OrganisationId;

    WaitSeconds(2);
    login_form.WinFormsObject("buttonLogin").Click();
}
//------------------------------------------------------------------------------

function add_emis_patient(driver)
{

  WaitSeconds(2);
  var emisWeb;
  emisWeb = Aliases.EmisWeb;

  //navigating to registration
  WaitSeconds(2);
  emisWeb.MainForm.clientContainer.panelModuleContainer.EmisHomePage.panelMain.tableLayoutPanel.panelLHS.QuickLaunchMenuUserControl.PanelExQuickLaunchMenu.panelMain.MenuItem.tableLayoutPanel.panelMenuItemLeft.labelMenuItemLeft.Click(35, 11);

  //navigating to add patient

  emisWeb = Aliases.EmisWeb;
  
  //add patient drop down in 29392
//  emisWeb.MainForm.ribbonControl.ribbonPanelregistration.contrbarAddEdit.Click(26, 63);
//  emisWeb.PopupContainer.MenuPanel.Click(48, 144);
  
  //add patient drop down in 29391
  emisWeb.MainForm.ribbonControl.ribbonPanelregistration.contrbarAddEdit.Click(21, 66);
  emisWeb.PopupContainer.MenuPanel.Click(48, 10);
    
  var nhs = Get_New_Number_V5();
  var nhsNumberInputBox;
  nhsNumberInputBox = Aliases.EmisWeb.PatientTraceDialog.panel1.pnlMain.pnlSearchCriteria.panel3.pnlTraceCriteriaContainer.traceCriteriaInput.panel3.tbNhsNumber;
  nhsNumberInputBox.Click(50, 11);
  nhsNumberInputBox.SetText(nhs);
    
  emisWeb.PatientTraceDialog.panel1.pnlMain.pnlSearchCriteria.panel3.pnlTraceCriteriaContainer.traceCriteriaInput.panel3.btnFind.Click();
    
  emisWeb.WinFormsObject("EmisMessageBox").WinFormsObject("flowLayoutPanel2").WinFormsObject("EMBBtn-Yes").Click();

//  Filling out patient data to complete registration
  
  var patientDetails = emisWeb.WinFormsObject("AddEditPatientDialog").WinFormsObject("pageController").WinFormsObject("Panel", "").WinFormsObject("Panel", "", 1).WinFormsObject("Panel", "", 3).WinFormsObject("PersonalDetailsEnglandSection");
  
  var title = patientDetails.WinFormsObject("cbTitle").ClickItem("Mr");
  var familyName = patientDetails.WinFormsObject("tbFamilyName").Text = driver.Value(4);
  var givenName = patientDetails.WinFormsObject("tbGivenName").Text = driver.Value(5);
  
  var dobTextBox;
  dobTextBox = Aliases.EmisWeb.AddEditPatientDialog.pageController.Panel.Panel.Panel.PersonalDetailsEnglandSection.dtpDateOfBirth.mainPanel.txtInput;
  dobTextBox.Click(12, 12);
  dobTextBox.Keys("24[NumSlash]07[NumSlash]1981");
  
  var gender = patientDetails.WinFormsObject("cbGender").ClickItem("Male");
  
  var addressSection = emisWeb.WinFormsObject("AddEditPatientDialog").WinFormsObject("pageController").WinFormsObject("Panel", "").WinFormsObject("Panel", "", 1).WinFormsObject("Panel", "", 2).WinFormsObject("AddressSection");
  var houseNumber = addressSection.WinFormsObject("tbHouseNameFlatNumber").Text = "170";
  var street = addressSection.WinFormsObject("tbNoAndStreet").Text="Newquay Street";
  var town = addressSection.WinFormsObject("tbTown").Text="Newquay";
  emisWeb.WinFormsObject("AddEditPatientDialog").WinFormsObject("btnNextPage").Click();

  //add gp drop down in 29392    
//  var primaryCarePatientDetails = emisWeb.WinFormsObject("AddEditPatientDialog").WinFormsObject("pageController").WinFormsObject("Panel", "").WinFormsObject("Panel", "", 1).WinFormsObject("Panel", "", 2).WinFormsObject("PatientDetailsSection")
//  var usualGp = primaryCarePatientDetails.WinFormsObject("cbUsualGP").ClickItem("ACCENDA, Accenda (Mr)");

  //add gp drop down in 29391  
  var primaryCarePatientDetails = emisWeb.WinFormsObject("AddEditPatientDialog").WinFormsObject("pageController").WinFormsObject("Panel", "").WinFormsObject("Panel", "", 1).WinFormsObject("Panel", "", 3);
  var usualGp = primaryCarePatientDetails.WinFormsObject("PatientDetailsSection").WinFormsObject("cbUsualGP").ClickItem("ACCURX, Practice Manager (Mr)");

  //add ccg drop down in 29391 not required for org 29392 so comment out for SNOMED run
  var primaryCarePatientDetailsCcg = emisWeb.WinFormsObject("AddEditPatientDialog").WinFormsObject("pageController").WinFormsObject("Panel", "").WinFormsObject("Panel", "", 1).WinFormsObject("Panel", "", 1)
  var ccg = primaryCarePatientDetailsCcg.WinFormsObject("PCTInformationSection").WinFormsObject("cbTradingPartner").ClickItem("Leeds");
  
  emisWeb.WinFormsObject("AddEditPatientDialog").WinFormsObject("btnNextPage").Click();
    
  WaitSeconds(2);
  
  //finish add patient ok button 29391
  emisWeb.WinFormsObject("AddEditPatientDialog").WinFormsObject("btnOK").Click();
  WaitSeconds(5);
  
  emisWeb.WinFormsObject("NextPatientRegistrationDialog").WinFormsObject("btnExit").Click();
  
  return nhs;
  
}
//-----------------------------------------------------------------------------

function patient_emis_add(nhs, driver)  
{

   Goto_Add_Patient();
   var INRstarV5 = set_system_login_page();    
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
   var patient_demographics_form = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails");

   patient_demographics_form.Panel(1).Textbox("NHSNumber").Text = nhs;
   WaitSeconds(2)
       
   form.Panel(0).Button("SearchEmis").Click();
   WaitSeconds(5);
   panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Panel("ClinicalSystemSearchResults").Panel("PatientSearchResults").Table("PatientResults").Cell(1, 0).Link("SelectIntegrationPatientLink").Click();
   WaitSeconds(5);
       
   var patient_contact_details_form = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails");
   patient_demographics_form.Panel(4).Textbox("FirstName").Text = driver.Value(5);
   
   patient_contact_details_form.Panel(4).Textbox("County").Text = "county";
       
   form.Panel(0).SubmitButton("AddPatientDetails").Click();
}
//------------------------------------------------------------------------------

function open_emis()

{
TestedApps.EMISWeb.Run();
} 

//------------------------------------------------------------------------------

function close_emis()
{
  // Obtains the notepad.exe process
  var p = Sys.Process("EmisWeb");
  // Closes the process
  p.Close();
  // Checks whether the process is closed
  if (p.Exists)
  {
    // Terminates the process
    p.Terminate();
  }
}
//------------------------------------------------------------------------------
function bat_job_excel_emis()
{

// Wait for all the scheduled tasks to have run

 var obj = Sys.OleObject("WScript.Shell");
    var mypath = "C:\\Automation_Start_Excel_Batchfile\\Excel.bat";
    
    obj.Run("\"" + mypath +  "\"");
  
  WaitSeconds(5);
  
  }

//------------------------------------------------------------------------------

function ShutdownSaveExcel()

{
var excel;
  excel = Aliases.EXCEL.wndXLMAIN.XLDESK.EXCEL7;
  excel.Keys("^s");
  Aliases.EXCEL.wndXLMAIN.Close();
  
Log.Message("Excel saved and closed ready for next run")
}