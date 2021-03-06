//USEUNIT Navigation
//USEUNIT V5_Common_Presets
//USEUNIT Test_New_Patient_Demographics
//USEUNIT Test_New_Patient_TreatmentPlan
//USEUNIT Test_Add_Historical_Treatment
//USEUNIT Test_Edit_Demographics
//USEUNIT Test_Edit_Patient_Clinical
//USEUNIT Add_INR_Simple
//USEUNIT Add_INR_Override_2
//USEUNIT Add_INR_Refer
//USEUNIT Test_Change_Schedule
//USEUNIT Delete_Treatments
//USEUNIT Test_Audit
//USEUNIT Test_Patient_Status
//USEUNIT Test_Patient_Adverse_Events
//USEUNIT Common

//===============================================================================
// All tests to be added here using test numbers from the spreadsheet //

//Pre-requisties for regression, Setup the printer settings

// 2.0) Web & Windows Regression
      //2.0.1) Logon

// 3.0) Home page
     //  3.0.1) View overdue patient report
     //  3.0.2) Print overdue report - not yet setup
     //  3.0.3) Print overdue letters - not yet setup

// 4.0 ) Maintenance Dosing Regression - Patient
     // 4.0.1) Add a new patient
     // 4.0.2) Edit Demographics
     // 4.0.3) View recent patients
     // 4.0.4) Find a patient
     // 4.0.5) Add new duplicate patient (NHS number)

//===============================================================================
function schedule_release()
{
//  Step_2_0_1_Logon();
//
  var INRstarV5 = set_system();

//  Step_3_0_1_View_patient_report(INRstarV5);
//  Step_3_0_2_Print_Overdue_Report(INRstarV5);
//  Step_3_0_3_Overdue_patient_report(INRstarV5);
////  
//  Step_4_0_1_Add_a_new_test_patient(INRstarV5)
    Step_4_0_2_Edit_Demographics(INRstarV5);
//  Step_4_0_3_View_recent_patients(INRstarV5);
//  Step_4_0_4_Find_a_patient(INRstarV5);
//  Step_4_0_5_Add_new_duplicate_patient_NHS_number(INRstarV5);
}
//===============================================================================
// 2.0.) Web & Windows Regression
      //2.0.1) Logon
//-------------------------------------------------------------------------------
function Step_2_0_1_Logon()  
{
   Log.Message("Step_1_Logon");
   Log_On(11);
   Log.Checkpoint("Login 2_0_1- TEST_PASS");
}
//===============================================================================
// 3.0) Home page
     //  3.0.1) View overdue patient report
     //  3.0.2) Print overdue report - not yet setup
     //  3.0.3) Print overdue letters - not yet setup
//-------------------------------------------------------------------------------
//  3.0.1)  View overdue patient report

function Step_3_0_1_View_patient_report(INRstarV5)  
{
  Log.Message("Step_3_0_1_View_overdue_patient_report");
  w_stem = Goto_Report_Overdue(INRstarV5);
  w_stem.Table("PatientOverdueReportTable").Cell(1, 0).Link("PatientLink").Click();
  Log.Checkpoint("View overdue patient report 3_0_1 - TEST_PASS");
} 

// 3.0.2)  Print overdue report  

function Step_3_0_2_Print_Overdue_Report(INRstarV5)
{
   Log.Message("Step_3_0_2_Print_Overdue_Report");
    Goto_Home(INRstarV5);
    WaitSeconds(4,"Waiting for Home Page");
    
//  WaitSeconds(8,"Waiting for Overdue Report");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
    panelUCR.Link("OverduePatientHeaderLink").Click();
    WaitSeconds(6,"Opening Overdue Report");
    panelUCR.Panel("OverduePatients").Panel(0).Button("PrintOverdueReport").Click();
    Log.Checkpoint("View overdue patient report 3_0_2 - TEST_PASS");
}

// 3.0.3)  Print overdue letters

function Step_3_0_3_Overdue_patient_report(INRstarV5)
{
   Log.Message("Step_3_0_3_Overdue_patient_report");
   WaitSeconds(10,"Waiting for Printing");
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   panelUCR.Panel("OverduePatients").Panel(0).Button("PrintOverdueLetters").Click();
   Log.Checkpoint("Overdue_patient_report 3_0_3 - TEST_PASS");
}
//===============================================================================
// 4.0 ) Maintenance Dosing Regression - Patient
     // 4.0.1) Add a new patient
     // 4.0.2) Edit Demographics
     // 4.0.3) View recent patients
     // 4.0.4) Find a patient
     // 4.0.5) Add new duplicate patient (NHS number)
//-------------------------------------------------------------------------------
// 4.0.1) Add a new patient

function Step_4_0_1_Add_a_new_test_patient(INRstarV5)  
{
   Log.Message("Step_4_0_1_Add_a_new_test_patient");
   Goto_Add_Patient();
   add_and_validate_patient_demographics(INRstarV5);
   Log.Checkpoint("Add a new patient 4_0_1 - TEST_PASS");   
}

// 4.0.2) Edit Demographics

function Step_4_0_2_Edit_Demographics(INRstarV5)
{
   Log.Message("Step_4_0_2_Edit_Demographics");
   edit_patient_demographics(INRstarV5);
   Log.Checkpoint("Edit Demographics 4_0_2 - TEST_PASS");
}

// 4.0.3) View recent patients

function Step_4_0_3_View_recent_patients(INRstarV5)

{
   Log.Message("Step_4.0.3_View_recent_patients");
   
   Goto_Recently_Viewed();
   // Select the last used
   preset_Fetch_Patient_Recent(INRstarV5);
   Log.Checkpoint("View recent patients 4_0_3 - TEST_PASS"); 
}

// 4.0.4) Find a patient

function Step_4_0_4_Find_a_patient(INRstarV5)
 
{
   Log.Message("Step_3i_Find_a_patient");
      //var w_NHS = "180 898 0328";
   var w_NHS = "4921991294";
   Log.Checkpoint("Find a patient 4_0_4 - TEST_PASS"); 
}



