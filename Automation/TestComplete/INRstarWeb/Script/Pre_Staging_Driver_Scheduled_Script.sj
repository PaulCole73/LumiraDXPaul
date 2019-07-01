//USEUNIT Home_Page_Regression_Loading_Data
//USEUNIT Home_Page_Regression_Quick_Checking
//USEUNIT Home_Page_Regression_Setup
//USEUNIT Home_Page_Validation
//USEUNIT loggin
//USEUNIT Navigate_Patient
//USEUNIT Navigation
//USEUNIT Quick_Adverse_Event
//USEUNIT Quick_Patient
//USEUNIT Regression_Pre_staging_Section_4_1
//USEUNIT Regression_Pre_staging_Section_4_2
//USEUNIT Regression_Pre_staging_Section_4_3
//USEUNIT Regression_Pre_Staging_Section_5_0
//USEUNIT Regression_Pre_Staging_Section_5_1
//USEUNIT Regression_Pre_Staging_Section_5_2
//USEUNIT Regression_Pre_Staging_Section_5_3
//USEUNIT Regression_Pre_Staging_Section_6_2
//USEUNIT Test_Audit
//USEUNIT Test_Edit_Demographics
//USEUNIT Test_New_Patient_Demographics
//USEUNIT Test_Patient_Adverse_Events
//USEUNIT Test_Patient_Status
//USEUNIT Tested_Apps
//USEUNIT Transfer_Patient
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets

//===============================================================================
function pre_staging_regression_tests()
{

//  Loading INRstar

   inrstar_2();

//  WaitSeconds(5);
////  WaitSeconds(20);
//  
//  //Loading Excel
//
  bat_job_excel();
//
//// Waiting for all the scheduled tasks to have run
//  WaitSeconds(15);
//  
//// Reset the test location under test now a job within SQL so can be removed
////  SQL_location_reset();
//  
//// Need to add delete to the above SQL at some point so that it doesn't do dups on users
//// Not critical just would make it a not more streamline and less maintanance
//// user_setup();
//  
//// This updates the dates and calculations for the driver spreadhseet
//  ShutdownSaveExcel();
//  WaitSeconds(15);
//  
}
//
//// --------------------------------Main test section this is where all tests for the automation need to go-----------------------------------------------
//  
////  This does the quick check tests on the homepage tests 3.0.5, 3.0.7, 3.0.9, 3.0.16, 3.0.17
//  release_section_3_home_page_messages();
//
//// --------------------------------
//
////This adds and tests NOAC review home page message data
//  add_patient_and_data();
//  test_overdue_noac_review();
//  Log.Checkpoint("Home Page - View the Overdue an INR test message TESTS_PASS")
//  Log.Checkpoint("Home Page: View the Overdue a non wafarin review message - new patient with a DOAC treatment plan but no DOAC review - TESTS_PASS")
//  Log.Checkpoint("Home Page - View the Overdue a non wafarin review message - a  patient with a DOAC treatment plan, with a review including an overdue next review date - TESTS_PASS")
//  Log.Checkpoint("Home Page - View the Overdue a non wafarin review message - a patient with a DOAC treatment plan, with a review and a next review date that is not overdue - TESTS_PASS")
//  Log.Checkpoint("Home Page - View the Overdue a non wafarin review message - a patient with a DOAC treatment plan, without a review and a next review date that is not overdue - TESTS_PASS")
//
//// --------------------------------
//
//// Add and validate patient demographics
//  var INRstarV5 = set_system(); 
//  Goto_Add_Patient(); 
//  add_and_validate_patient_demographics(INRstarV5);
//  Goto_Patient_Audit();
//  display_top_patient_audit("Add Patient");
//  Log.Checkpoint("Maintenance Dosing Regression - Add a new patient - TEST_PASS");
// 
//// --------------------------------
//
////Edit patient demographics
//  edit_patient_demographics();
//  Log.Checkpoint("Maintenance Dosing Regression - Edit Demographics - TEST_PASS");
//  Log.Checkpoint("Maintenance Dosing Regression - View recent patients - TEST_PASS");
//  
//// --------------------------------
//
//////Find a patient
//  Preset_Find_Patient_Regression(); 
//  Log.Checkpoint("Maintenance Dosing Regression - Find a patient - TEST_PASS");
//  WaitSeconds(55, "Need to make sure the last patient in the list is the one that is loaded within the next step" )
////
//// --------------------------------
////
/////Maintenance Dosing Regression - Treatment Plan, Add First Treatment Plan
////
//  release_pre_s4_1();
//  Goto_Patient_Audit();
//  display_top_patient_audit("Add Treatment Plan Details");
//  Log.Checkpoint("Test 4.1 Add First Treatment Plan - TEST_PASS");
//  log_off();
//// --------------------------------
//
//// Maintenance Dosing Regression - Treatment Plan Clinical Details
//  release_pre_s4_2();
//  
//// --------------------------------
//
//// Maintenance Dosing Regression - Treatment tab
//  release_pre_s4_3();
//  
//// --------------------------------
//
//// Section Manual Dosing Regression - Patient tab
//  release_pre_s5_0();
//  
//// --------------------------------
//
//// Section Manual Dosing Regression - Treatment Plan tab
//  release_pre_s5_1();
//  
//// --------------------------------
//
//// Section Manual Dosing Regression - Treatment tab
//  release_pre_s5_2();
//
//// --------------------------------
//
//// Section Manual Dosing Regression - Review tab
////  release_pre_s5_3();
//  
//// --------------------------------
//
//// Section Induction Dosing Regression  - Treatment Tab
////  release_pre_s6_2();
//
//// --------------------------------
//
//// De-Activate a patient
//  Log_Off();
//  log_on_cl3();
//  Goto_Recently_Viewed();
//  preset_Fetch_Patient_Recent();
//  Goto_Patient_Management();
//  de_activate_patient_regression();
//  Goto_Patient_Audit();
//  display_top_patient_audit("Deactivate Patient");
//  Log.Checkpoint("Test 8.0.1 De-activate a patient - TEST_PASS");
//
//// --------------------------------
//  
////Activate a patient
//  Goto_Patient_Management();
//  activate_patient();
//  Log.Checkpoint("Test 8.0.2 Re-activate a patient - TEST_PASS");
//  log_off();
//  
////--------------------------------
//  
////Transfer a patient on induction protocol
//
//  log_on_cl3();
//  WaitSeconds(8);
//  
//  var patName = quick_pat_regression();
//  Goto_Patient_TreatmentPlan_Add();
//        
//     var w_drug = "W";
//     var w_dm = "Tait";
//     var w_master_date = aqDateTime.Today();
//     var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
//         
//  quick_pt_treatmentplan(w_drug, w_dm, w_start_date);
//  Goto_Patient_Management();
//  transfer_induction_regression();
//  log_off();
//  Log.Checkpoint("Home Page - View the Patient transfer requests to Accept or Decline - TESTS_PASS");
//  Log.Checkpoint("Home Page - Accept patient transfer - TESTS_PASS");
//  Log.Checkpoint("Test 8.0.7 Transfer a patient on induction protocol - TEST_PASS");
//
//////--------------------------------
////
//////Suspend a patient this is quite complicated as we need to return the path of something as a string and then check if the path contains content text
////
  log_on_cl3();
  WaitSeconds(8);
  var INRstarV5 = set_system();
  var patName = quick_pat_regression();
  Goto_Patient_TreatmentPlan_Add();
        
     var w_drug = "W";
     var w_dm = "Tait";
     var w_master_date = aqDateTime.Today();
     var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
         
  quick_pt_treatmentplan(w_drug, w_dm, w_start_date);
  suspend_patient_validate();
  Goto_Patient_Audit();
  Log.Checkpoint("Test 8.0.8 Suspend a patient - TEST_PASS");
////
//// --------------------------------
//
//// Add a note
//   log_on_cl3();
//   quick_patient_regression();
//   Goto_Patient_Notes();
//   test_patient_notes();   
//   Goto_Patient_Audit();
//   display_top_patient_audit("Add Note");
//   Log.Checkpoint("Test 9.0.1 Add a note - TEST_PASS");
//
//// --------------------------------
//
//// Add a new adverse event
//    quick_adverse_event_regression();
//    Goto_Patient_Audit();
//    display_top_patient_audit("Add Adverse Event");
//    Log.Checkpoint("Test 10.0.1 Add a new adverse event - TEST_PASS");
//    
//// --------------------------------
//
//// Delete adverse event
//    test_patient_adverse_events_delete();
//    Goto_Patient_Audit();
//    display_top_patient_audit("Delete Adverse Event");
//    Log.Checkpoint("Test 10.0.2 Delete adverse event - TEST_PASS");
//    
//// --------------------------------
//
//    log_off();
//
////  ------------------------------------------------------------------------------------------------------------------------------------------------
//
////  Save and send results to testing email inbox
//  ExportResults();
//  email_results();
//
//
////===============================================================================
//
//// This saves the result in the below location and is overriden each time
//
//function ExportResults()
// {
//  var FileName;
//  FileName = Project.ConfigPath + "Log\\Automation_run.mht";
//  Log.SaveResultsAs(FileName, lsMHT);
// }
//
////===============================================================================
//
////This sends the results vis email in a filterable report
//
//function email_results()
//
////  SendMail(ToAddress, FromHost, FromName, FromAddress, Subject, Body, FileName1, FileName2..FileNameN)
//
// {
//  SendMail("Testing@INRstar.co.uk","mailsrv1.scsl.network","Dean.Lester","dean.lester@inrstar.co.uk", "Automated regression results", "", "Q:\\Development and Testing\\Testing\\Test Complete Projects\\Version5\\INRstarV5 - V9.1\\Local config\\[TOL-TST-OFFLINE]\\Log\\Automation_run.mht")
// }
//
// 
////===============================================================================
//
//function ShutdownWithoutSaveExcel()
//
//{
//
//var excel;
//  excel = Aliases.EXCEL;
//  excel.wndXLMAIN.Close();
//  WaitSeconds(2);
//  excel.wndNUIDialog.NetUIHWND.Keys("~n");
//Log.Message("Excel closed without save");
//  
//}
//
////===============================================================================
//
//function ShutdownSaveExcel()
//
//{
//
//var excel;
//  excel = Aliases.EXCEL;
//  excel.wndXLMAIN.Keys("^s");
//  excel.wndXLMAIN.Close();
//Log.Message("Excel saved and closed ready for next run")
//}
//
////===============================================================================
//
//function UpdateAndSaveExcel()
//
//{
//
//var excel;
//  excel = Aliases.EXCEL;
//  excel.wndXLMAIN.Keys("^s");
//  excel.wndXLMAIN.Close();
//Log.Message("Excel saved and ready for next run")
//}
//
////===============================================================================
//
//function bat_job_inrstar()
//{
//
//// Wait for all the scheduled tasks to have run
//
// var obj = Sys.OleObject("WScript.Shell");
//    var mypath = "C:\\Automation_Start_INRstar_BatchFile\\INRstar.bat";
//    
//    obj.Run("\"" + mypath +  "\"");
//  
//  WaitSeconds(5);
//  
//  }
//  
//  //===============================================================================
//
//  
//function bat_job_inrstar_2()
//{
//
//// Wait for all the scheduled tasks to have run
// p = TestedApps.Items(0).Run();
//// if( ! p.Exists)
//
//  WaitSeconds(5);
//  
//  }
//  
//  //===============================================================================
//function bat_job_excel()
//{
//
//// Wait for all the scheduled tasks to have run
//
// var obj = Sys.OleObject("WScript.Shell");
//    var mypath = "C:\\Automation_Start_Excel_Batchfile\\Excel.bat";
//    
//    obj.Run("\"" + mypath +  "\"");
//  
//  WaitSeconds(5);
//  
//  }