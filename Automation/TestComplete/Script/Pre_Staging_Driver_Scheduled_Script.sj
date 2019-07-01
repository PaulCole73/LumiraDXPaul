//USEUNIT Home_Page_Regression_Loading_Data
//USEUNIT Home_Page_Regression_Quick_Checking
//USEUNIT Home_Page_Regression_Setup
//USEUNIT Home_Page_Validation
//USEUNIT loggin
//USEUNIT Navigate_Patient
//USEUNIT Navigation
//USEUNIT Quick_Adverse_Event
//USEUNIT Quick_Patient
//USEUNIT Regression_Pre_staging_Section_4_2
//USEUNIT Regression_Pre_staging_Section_4_3
//USEUNIT Regression_Pre_Staging_Section_5_2
//USEUNIT Regression_Pre_Staging_Section_5_3
//USEUNIT Test_Audit
//USEUNIT Test_Edit_Demographics
//USEUNIT Test_New_Patient_Demographics
//USEUNIT Test_Patient_Adverse_Events
//USEUNIT Test_Patient_Status
//USEUNIT Tested_Apps
//USEUNIT Transfer_Patient
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets

//Tests now using new setup as below
//USEUNIT TC_Adverse_Event
//USEUNIT TC_Notes
//USEUNIT TC_Patient_Add
//USEUNIT TP_INRstar_Regression
//===============================================================================
function pre_staging_regression_tests()
{

  //Loading INRstar
  RunINRStarWindows();
  WaitSeconds(5, "Waiting for INRstar to load");  
  
  //Loading Excel
  bat_job_excel();

// Waiting for all the scheduled tasks to have run
//  WaitSeconds(5, "Waiting for all the scheduled tasks to have run");
  
// Reset the test location under test now a job within SQL so can be removed
//  SQL_location_reset();
  
// Need to add delete to the above SQL at some point so that it doesn't do dups on users
// Not critical just would make it a not more streamline and less maintanance
// user_setup();
  
// This updates the dates and calculations for the driver spreadhseet
  UpdateAndSaveExcel();
  WaitSeconds(5,"Waiting for excel to update and close");
  
//--------------------------------Main test section this is where all tests for the automation need to go-----------------------------------------------

//  This does the quick check tests on the homepage tests 3.0.5, 3.0.7, 3.0.9, 3.0.16, 3.0.17
  release_section_3_home_page_messages();

// --------------------------------

//This adds and tests NOAC review home page message data
  add_patient_and_data();
  test_overdue_noac_review();
  Log.Checkpoint("Home Page - View the Overdue an INR test message TESTS_PASS")
  Log.Checkpoint("Home Page - View the Overdue a non wafarin review message - new patient with a DOAC treatment plan but no DOAC review - TESTS_PASS")
  Log.Checkpoint("Home Page - View the Overdue a non wafarin review message - a  patient with a DOAC treatment plan, with a review including an overdue next review date - TESTS_PASS")
  Log.Checkpoint("Home Page - View the Overdue a non wafarin review message - a patient with a DOAC treatment plan, with a review and a next review date that is not overdue - TESTS_PASS")
  Log.Checkpoint("Home Page - View the Overdue a non wafarin review message - a patient with a DOAC treatment plan, without a review and a next review date that is not overdue - TESTS_PASS")
// --------------------------------
// Add patient - Now uses new setup 
// Add a note - Now uses new setup
// Add a new adverse event - Now uses new setup
// Delete adverse event - Now uses new setup
// Find a patient - Now uses new setup
// add_and_validate_patient_demographics - Now uses new setup
// De-Activate a patient - Now uses new setup
// Activate a patient
// Suspend a patient
// Transfer a patient on induction protocol - Need to add the other location run the scripts to setup
// Maintenance Dosing Regression - Treatment Plan, Add First Treatment Plan
// Section Manual Dosing Regression - Treatment Plan tab - release_pre_s5_1();
// --------------------------------
  //Edit patient demographics
//  edit_patient_demographics();
// --------------------------------
//Runs all the above test areas that have been moved to the new and better way
 tp_inrstar_staging_regression(); 
// --------------------------------
// Maintenance Dosing Regression - Treatment Plan Clinical Details
  release_pre_s4_2();
// --------------------------------
// Maintenance Dosing Regression - Treatment tab
  release_pre_s4_3(); 
// --------------------------------
// Section Manual Dosing Regression - Treatment tab
  release_pre_s5_2();
// --------------------------------
// Section Manual Dosing Regression - Review tab dont think this has ever worked
  release_pre_s5_3();  
  // --------------------------------
//  ------------------------------------------------------------------------------------------------------------------------------------------------
//  Save and send results to testing email inbox
//  ExportResults();
//  //email_results();
//  SendEmail("dean.lester@lumiradx.com", "Testing@inrstar.co.uk", "Automated regression results", "Message body", "Q:\\Development and Testing\\Testing\\Test Complete Projects\\Version5\\INRstarV5 - V9.1\\Local config\\[TOL-TST-OFFLINE]\\Log\\Automation_run.mht") 
  //"Q:\\Development and Testing\\Testing\\Test Complete Projects\\Version5\\INRstarV5 - V9.1\\Local config\\[TOL-TST-OFFLINE]\\Log\\Automation_run.mht");
}
//===============================================================================
// This saves the result in the below location and is overriden each time
function ExportResults()
 {
  var FileName;
  FileName = Project.ConfigPath + "Log\\Automation_run.mht";
  Log.SaveResultsAs(FileName, lsMHT);
 }
//===============================================================================
//This sends the results vis email in a filterable report

function SendEmail(mFrom, mTo, mSubject, mBody, mAttach)
{
  var i, schema, mConfig, mMessage;

  try
  {
    schema = "https://";
    mConfig = Sys.OleObject("CDO.Configuration");
    mConfig.Fields.Item(schema + "sendusing") = 2; // cdoSendUsingPort
    mConfig.Fields.Item(schema + "smtpserver") = "smtp.office365.com"; // SMTP server
    mConfig.Fields.Item(schema + "smtpserverport") = 587; // Port number

    mConfig.Fields.Item("smtpauthenticate") = 1; // Authentication mechanism
    mConfig.Fields.Item("sendusername") = "dean.lester@lumiradx.com"; // User name (if needed)
    mConfig.Fields.Item("sendpassword") = "INRstar_5"; // User password (if needed)
    mConfig.Fields.Update();

    mMessage = Sys.OleObject("CDO.Message");
    mMessage.Configuration = mConfig;
    mMessage.From = mFrom;
    mMessage.To = mTo;
    mMessage.Subject = mSubject;
    mMessage.HTMLBody = mBody;

    aqString.ListSeparator = ",";
    for(i = 0; i < aqString.GetListLength(mAttach); i++)
      mMessage.AddAttachment(aqString.GetListItem(mAttach, i));
    mMessage.Send();
  }
  catch (exception)
  {
    Log.Error("Email cannot be sent", exception.description);
    return false;
  }
  Log.Message("Message to <" + mTo + "> was successfully sent");
  return true;
}
// SendEmail("dean.lester@lumiradx.co.uk", "Testing@inrstar.co.uk", "Automated regression results", 
//             "Message body", "Q:\\Development and Testing\\Testing\\Test Complete Projects\\Version5\\INRstarV5 - V9.1\\Local config\\[TOL-TST-OFFLINE]\\Log\\Automation_run.mht"))
   
 

//function email_results()
//
////  SendMail(ToAddress, FromHost, FromName, FromAddress, Subject, Body, FileName1, FileName2..FileNameN)
// {
// if(SendMail("Testing@inrstar.co.uk" ,"smtp.office365.com:587","Dean.Lester","dean.lester@lumiradx.co.uk", "Automated regression results", "",
// "Q:\\Development and Testing\\Testing\\Test Complete Projects\\Version5\\INRstarV5 - V9.1\\Local config\\[TOL-TST-OFFLINE]\\Log\\Automation_run.mht"))
//   Log.Message("Mail was sent") 
//   else
//   Log.Warning("Mail was not sent") 
// }
//===============================================================================
function ShutdownWithoutSaveExcel()
{
var excel;
  excel = Aliases.EXCEL;
  excel.wndXLMAIN.Close();
  WaitSeconds(2);
  excel.wndNUIDialog.NetUIHWND.Keys("~n");
Log.Message("Excel closed without save");
}
//===============================================================================
function ShutdownSaveExcel()
{
  var wndXLMAIN;
  var excel7;
  wndXLMAIN = Aliases.EXCEL.wndXLMAIN2;
  excel7 = wndXLMAIN.XLDESK.EXCEL7;
  excel7.Keys("^s");
  wndXLMAIN.Close();
  Log.Message("Excel saved and closed ready for next run")
}
//===============================================================================
function UpdateAndSaveExcel()
{
var wndXLMAIN;
  var excel7;
  wndXLMAIN = Aliases.EXCEL.wndXLMAIN2;
  excel7 = wndXLMAIN.XLDESK.EXCEL7;
  excel7.Keys("^s");
  wndXLMAIN.Close();
  Log.Message("Excel saved and ready for next run")
}
//===============================================================================
function bat_job_inrstar()
{
// Wait for all the scheduled tasks to have run

 var obj = Sys.OleObject("WScript.Shell");
    var mypath = "C:\\Automation_Start_INRstar_BatchFile\\INRstar.bat";
    
    obj.Run("\"" + mypath +  "\"");
  
  WaitSeconds(5); 
}
//===============================================================================
function bat_job_inrstar_2()
{
// Wait for all the scheduled tasks to have run
 p = TestedApps.Items(0).Run();
// if( ! p.Exists)
  WaitSeconds(5);
  }
//===============================================================================
function bat_job_excel()
{
// Wait for all the scheduled tasks to have run

 var obj = Sys.OleObject("WScript.Shell");
    var mypath = "C:\\Automation_Start_Excel_Batchfile\\Excel.bat";
    
    obj.Run("\"" + mypath +  "\"");
  
  WaitSeconds(5);
}
//===============================================================================
function RunINRStarWindows()
{
    //TestedApps.INRStarWindows.Run();
    //TestedApps.INRstarWindows.Run(1, true);
    TestedApps.INRstarWindows.Run(1, true);
} 