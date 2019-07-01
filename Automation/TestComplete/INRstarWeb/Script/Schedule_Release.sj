//USEUNIT Navigation
//USEUNIT V5_Common_Presets
//USEUNIT Test_New_Patient_Demographics
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

////USEUNIT add_and_validate_patient_demographics
////USEUNIT New_Patient_Clinical
//===============================================================================
function schedule_release()
{
  Step_1_Logon();
  
  var INRstarV5 = set_system();
  
  Step_2_Overdue_patient_report(INRstarV5);


  Step_3i_Find_a_patient(INRstarV5);
  Step_3ii_View_recent_patients(INRstarV5);
  Step_3iii_Add_a_new_test_patient(INRstarV5);
  Step_3iv_Edit_a_patient(INRstarV5);
  
  Step_4i_Add_in_range_INR(INRstarV5);
  Step_4ii_Add_in_range_INR_comment_and_change_schedule(INRstarV5);
  Step_4iii(INRstarV5);
  Step_4iv(INRstarV5);
  Step_4v(INRstarV5);
  Step_4vi(INRstarV5);
  Step_4vii(INRstarV5);
  Step_5i(INRstarV5);
  Step_5ii(INRstarV5);
  Step_6i(INRstarV5); 
  Step_7i(INRstarV5); 
  Step_7ii(INRstarV5); 
  Step_8i(INRstarV5); 
}

//===============================================================================
// Run pre-Release testing against system
//1) Logon
//
//2) Home page
//  i)   View overdue patient report
//  ii)  Print report  (not possible)
//
//3) Patient tab
//  i)   Find a patient
//  ii)  View recent patients
//  iii) Add a new test patient
//    (a)  Demographics
//    (b)  Clinical
//    (c)  Historical treatment
//  iv)  Edit a patient
//    (a)  Demographics
//    (b)  Clinical
//
//4) Treatment tab
//  i)   Add an in-range INR, Print the diary and summary sheet
//  ii)  Add an in-range INR, Add a comment, Select another schedule, Drag-and-drop schedule days
//  iii) Add a low INR result, Override date, dose, review period
//  iv)  Add a high INR, Refer the treatment
//  v)   Accept the referral, Authorise the referral
//  vi)  Delete the last treatment
//  vii) View treatment audit trail
//
//5) Clinical tab
//  i)   De-activate a patient
//  ii)  Re-activate a patient
//
//6) Notes
//  i)   Add a note
//
//7) Adverse events
//  i)   Add a new adverse event
//  ii)  Delete adverse event
//8) Audit trail
//  i)   View patient audit trail
//
//===============================================================================
// 1a) Logon
//-------------------------------------------------------------------------------
function Step_1_Logon()  
{
   Log.Message("Step_1_Logon");
   //Log_On(6); // John Smith @ Crofty
   Log_On(8); // gov@prison
}
//===============================================================================
// 2) Home page
//  i)   View overdue patient report
//  ii)  Print report  
//-------------------------------------------------------------------------------
function Step_2_Overdue_patient_report(INRstarV5)  
{
   Log.Message("Step_2i_View_overdue_patient_report");
//  i)   View overdue patient report

  Goto_Report_Overdue(INRstarV5);
   
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
   
  var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
  
// ii) Print Overdue Report    
   Log.Message("Step_2ii_Print_Overdue_Report");
   panelUCR.Panel("OverduePatients").Panel(0).Button("PrintOverdueReport").Click();

// iii) Print Letters
   Log.Message("Step_2iii_Print_Overdue_Letters");
   panelUCR.Panel("OverduePatients").Panel(0).Button("PrintOverdueLetters").Click();
}
//===============================================================================
// 3) Patient tab
//  i)   Find a patient
//  ii)  View recent patients
//  iii) Add a new test patient
//    (a)  Demographics
//    (b)  Clinical
//    (c)  Historical treatment
//  iv)  Edit a patient
//    (a)  Demographics
//    (b)  Clinical
//-------------------------------------------------------------------------------
function Step_3i_Find_a_patient(INRstarV5)  
{
   Log.Message("Step_3i_Find_a_patient");
//  i)   Find a patient

   var w_NHS = "180 898 0328";
   
   Goto_Patient_Search();
   preset_Fetch_Patient_NHS(INRstarV5, w_NHS);
}
//-------------------------------------------------------------------------------
function Step_3ii_View_recent_patients(INRstarV5)  
{
   Log.Message("Step_3ii_View_recent_patients");
//  ii)  View recent patients
   
   Goto_Recently_Viewed();
   // Select the last used
   preset_Fetch_Patient_Recent(INRstarV5);
}
//-------------------------------------------------------------------------------
function Step_3iii_Add_a_new_test_patient(INRstarV5)  
{
   Log.Message("Step_3iii_Add_a_new_test_patient");
   
//  iii) Add a new test patient
//    (a)  Demographics
   add_and_validate_patient_demographics(INRstarV5);
    
//    (b)  Clinical
   add_patient_clinical(INRstarV5);
    
//    (c)  Historical treatment
   Goto_Add_Historical();
   add_historical_treatment(INRstarV5);
}
//-------------------------------------------------------------------------------
function Step_3iv_Edit_a_patient(INRstarV5)  
{
   Log.Message("Step_3iv_Edit_a_patient");
   
//  iv)  Edit a patient
//    (a)  Demographics
    edit_patient_demographics(INRstarV5);
//    (b)  Clinical
    edit_patient_clinical(INRstarV5);
}
//===============================================================================
//4) Treatment tab
//  i)   Add an in-range INR, Print the diary and summary sheet
//  ii)  Add an in-range INR, Add a comment, Select another schedule, Drag-and-drop schedule days
//  iii)  Add a low INR result, Override date, dose, review period
//  iv)  Add a high INR, Refer the treatment
//  v)   Accept the referral
//  vi)  Authorise the referral
//  vii) Delete the last treatment
//  viii)  View treatment audit trail
//-------------------------------------------------------------------------------
function Step_4i_Add_in_range_INR(INRstarV5)  
{
   Log.Message("Step_4i_Add_in_range_INR");
   
//  i)   Add an in-range INR, Print the diary and summary sheet
    Goto_Patient_New_INR();
    add_inr_simple(2.5);
//  Print the diary and summary sheet   - not possible in browser mode
}
//-------------------------------------------------------------------------------
function Step_4ii_Add_in_range_INR_comment_and_change_schedule(INRstarV5)  
{
   Log.Message("Step_4ii_Add_in_range_INR_comment_and_change_schedule");
   
//  ii)  Add an in-range INR, Add a comment, Select another schedule, Drag-and-drop schedule days
    //delete_treatment();
    delete_treatment();
    Goto_Patient_New_INR();
    add_inr_refer(2.5);
    
    // Select other schedule
    change_schedule(INRstarV5);
    
    // Re-order schedule
    re_order_schedule(INRstarV5);
    
    // Complete Treatement                                        
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTW = panelMCP.Panel("PatientRecord").Panel("PatientTabContent").Panel("PatientTreatmentWrapper");
    var panelPTI = panelPTW.Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");
    // Click the Accept button
    Log.Message("Clicking 'Accept' button");
    panelPTI.Panel(0).Button("AcceptPendingTreatment").Click();

}
//-------------------------------------------------------------------------------
function Step_4iii(INRstarV5)  
{
   Log.Message("Step 4iii");
   
//  iii)  Add a low INR result, Override date, dose, review period  
    delete_treatment();
    Goto_Patient_New_INR();
    
    // Set the dates up for the Override
    var w_days_diff = 14;
    var w_date = aqDateTime.AddDays(aqDateTime.Today(), -w_days_diff);  
    
    var w_oor_day = aqDateTime.GetDay(w_date);
    var w_oor_month = aqDateTime.GetMonth(w_date);
    var w_oor_year = aqDateTime.GetYear(w_date);
    var w_eqc = "N";

    add_inr_override_2(1.5,w_oor_day,w_oor_month,w_oor_year, w_eqc, w_days_diff);
}
//-------------------------------------------------------------------------------
function Step_4iv(INRstarV5)  
{
   Log.Message("Step 4iv");
   
//  iv)  Add a high INR, Refer the treatment
    delete_treatment();
    Goto_Patient_New_INR();
    add_inr_refer("3.3");

    // Refer Treatement                                        
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTW = panelMCP.Panel("PatientRecord").Panel("PatientTabContent").Panel("PatientTreatmentWrapper");
    var panelPTI = panelPTW.Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");
    panelPTI.Panel(0).Button("ReferPendingTreatment").Click();
}
//-------------------------------------------------------------------------------
function Step_4v(INRstarV5)  
{
   Log.Message("Step 4v");
   
//  v)   Accept the referral, authorise the referral
    Goto_Home();
    
    WaitSeconds(2,"");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelMsgs =  panelMCP.Panel("UserTabContent").Panel("UserMessages").Panel("UserClinicalReports");
//    var panelMsgs = panelMCP.Panel("PatientTab").Panel("Messages").Fieldset(0).Panel("UserMessages");
    
    // Click the Referred Patient's Report
    panelMsgs.Link("ReferredPatientHeaderLink").Click();
    tableRP = panelMsgs.Panel("ReferredPatients").Table("ReferredPatientReportTable")
    
//    // Find the row with the patient in
//    for (i=1; i< tableRP.Rowcount; i++)
//    {
//        Log.Message(tableRP.Cell(i,0).Link(0).innerText + " i=" + i);
//        if (tableRP.Cell(i,0).Link(0).innerText == w_Name)
//        {
//             tableRP.Cell(i, 0).Link(0).Click();
//             i = tableRP.Rowcount;
//        }
//    }
    // Select the top patient
    tableRP.Cell(1, 0).Link("PatientLink").Click();
    Goto_Patient_Treatment();
    
    // On the pending treatment page, Accept Treatment
    var panelPTW = panelMCP.Panel("PatientRecord").Panel("PatientTabContent").Panel("PatientTreatmentWrapper");
    var panelPTI = panelPTW.Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");
    panelPTI.Panel(0).Button("AcceptPendingTreatment").Click(); 
    
    // Re-fetch patient record
    Step_1b_Find_recent_patient(INRstarV5);
   
    // Complete Treatement                                        
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTW = panelMCP.Panel("PatientRecord").Panel("PatientTabContent").Panel("PatientTreatmentWrapper");
    var panelPTI = panelPTW.Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");
    // Click the Accept button
    Log.Message("Clicking 'Accept' button");
    panelPTI.Panel(0).Button("AcceptPendingTreatment").Click();
    
}
//-------------------------------------------------------------------------------
function Step_4vi(INRstarV5)  
{
    Log.Message("Step 4vi");
   
    // Re-fetch patient record
    Step_1b_Find_recent_patient(INRstarV5);
   
//  vi) Delete the last treatment
    delete_treatment();
}
//-------------------------------------------------------------------------------
function Step_4vii(INRstarV5)  
{
   Log.Message("Step 4vii");
   
//  vii)  View treatment audit trail
    test_audit_treatment(INRstarV5);
}
//===============================================================================
//5) Clinical tab
//  i)   De-activate a patient
//  ii)  Re-activate a patient
//-------------------------------------------------------------------------------
function Step_5i(INRstarV5)  
{
   Log.Message("Step 5i");
   
//  i)   De-activate a patient
    Goto_Patient_Clinical();
    de_activate_patient(INRstarV5);
}
function Step_5ii(INRstarV5)  
{
   Log.Message("Step 5ii");
   
//  ii)  Re-activate a patient
    Goto_Patient_Clinical();
    activate_patient(INRstarV5);
}
//===============================================================================
// 6) Notes
//  i)   Add a note
//-------------------------------------------------------------------------------
function Step_6i(INRstarV5)  
{
   Log.Message("Step 6i");
   
//  i)   Add a note
    Goto_Patient_Notes();
    test_patient_notes(INRstarV5);    
}
//===============================================================================
// 7) Adverse events
//  i)   Add a new adverse event
//  ii)  Delete adverse event
//-------------------------------------------------------------------------------
function Step_7i(INRstarV5)  
{
   Log.Message("Step 7i");
   
//  i)   Add a new adverse event
    test_patient_adverse_events(INRstarV5);
}
//-------------------------------------------------------------------------------
function Step_7ii(INRstarV5)  
{
   Log.Message("Step 7ii");
   
//  ii)  Delete adverse event
    test_patient_adverse_events_delete(INRstarV5);
}
//===============================================================================
//8) Audit trail
//  i)   View patient audit trail
//-------------------------------------------------------------------------------
function Step_8i(INRstarV5)  
{
   Log.Message("Step 8i");
   
//  i)   View patient audit trail
    Goto_Patient_Audit();
}