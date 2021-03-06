//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation
//USEUNIT Add_INR_Simple

//======================================================================================
// Add a treatment to the top patient in the Overdue list
// Repeat for all patients over due by more than xx days
//======================================================================================
function add_treatment()
{
//   Log_On(1); // training.user @ lake.com (Training system)
   Log_On(7); // dr_parry@studale
  
  var INRstarV5 = set_system();
  var w_max_overdue = 20;
  var w_skip_patients = 0;    // Choose a patient other than the top of the list
  
  var w_days_overdue = get_first_overdue(INRstarV5, w_skip_patients);
  
  while (w_days_overdue > w_max_overdue)
  {
    Goto_Patient_New_INR();
    add_inr_simple(2.9);
  
    // Get next patient
    w_days_overdue = get_first_overdue(INRstarV5, w_skip_patients);
  }
}
//===============================================================================
// 2) Home page
//  i)   View overdue patient report
//  ii)  Print report  (not possible in browser version)
//-------------------------------------------------------------------------------
function get_first_overdue(INRstarV5, w_skip_patients)  
{
  Goto_Report_Overdue(INRstarV5);
   
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
   
  var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
  var tablePORT = panelUCR.panel("OverduePatients").table("PatientOverdueReportTable")
  
  var w_row = w_skip_patients + 1;
   
  //Extract Overdue amount
  w_overdue = tablePORT.Cell(w_row, 6).Label("OverdueDays_DetachedLabel").innerText;
  
  //Select 1st patient
  tablePORT.Cell(w_row,0).Link("PatientLink").Click();

  
  return w_overdue;
}
