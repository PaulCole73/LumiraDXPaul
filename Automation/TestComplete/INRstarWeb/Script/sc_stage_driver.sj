//USEUNIT Quick_Patient
//USEUNIT V5_Common
//USEUNIT V5_SQL
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation
//USEUNIT V5_Common_Tests
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Batch
//USEUNIT Test_Patient_Status
//USEUNIT Add_INR_Override_Review
//USEUNIT Pre_Staging_Driver_Scheduled_Script

//-------------------------------------------------------------------------------------------

//This was designed for regression purposes
function quick_test_self_care()
{
    // Define the input file to drive the process
    driver = DDT.ExcelDriver("Q:\\Development and Testing\\Testing\\TestComplete_Test_Data\\sc_patients.xls","Patients");
//    // Define the output file to store the resulting NHS numbers
    var w_outfile = "Q:\\Development and Testing\\Testing\\TestComplete_Results\\self_care_pts.csv";

////Loading Excel

////  bat_job_excel();

//// This updates the dates and calculations for the driver spreadhseet
////  ShutdownSaveExcel();
////  WaitSeconds(5);
    
    // Prime / Reset Output File to empty
    aqFile.WriteToTextFile(w_outfile, "Run,NHS,Surname,Firstname,Gender,PlanStart,Review,Move,BeforeNTDCount,BeforeScheduleCount,ExpectedNTDCount,ExpectedDailyDoseCount,ExpectedScheduleCount \r\n",  aqFile.ctANSI, true);

    while (!driver.EOF())
    {
         if (driver.Value(0) == "Y")
         {
             self_care_Stage1(w_outfile, driver);
             
             var w_nhs = get_patient_nhs();
          
             var w_mess = driver.value(0) + "," + w_nhs + "," + driver.Value(1)+ "," + driver.Value(2)+ "," + driver.Value(3)+ "," + driver.Value(4)+ "," + driver.Value(5)+ "," + driver.Value(6)+ "," + driver.Value(7) + "," + driver.Value(8) + "," + driver.Value(9)+ "," + driver.Value(10)+ "," + driver.Value(11);
             // Write the record to the file
             aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n", aqFile.ctANSI);
         }
      // Next record
      driver.Next();      
    }
    // close the driver
   DDT.CloseDriver(DDT.CurrentDriver.Name);
    
   //   wait 10 mintues
// WaitSeconds(650,"Waiting for MPIs to be returned")
    
  
    
//    driver = DDT.CSVDriver("Q:\\Development and Testing\\Testing\\TestComplete_Results\\self_care_pts.csv");
//
//    var INRstarV5 = set_system();
//
//    while (!driver.EOF())
//    {
//         if (driver.Value(0) == "Y")
//         {
//                         Goto_Patient_Search();
//                         preset_Fetch_Patient_NHS(INRstarV5, driver.Value(1));
                             
//                         self_care_to_Stage3(INRstarV5);
//                         
//                         Goto_Patient_New_INR();
//                         add_inr_review("2.5",driver.Value(6)) //  (p_INR,  p_review)
                         
                         // Get patient id for SQL
                         
//                         var w_pid = SQL_Find_Patient(driver.Value(1));
////                         Log.Message(w_pid);
//                         
//                         // Run SQL for count of tasks before change
//                         
//                         var Next_Date_count_before = SQL_PSC_NTD_Count(w_pid);
////                         Log.Message("ntd task count before" + Next_Date_count_before);
//                         
//                         // Run SQL for count of tasks before change
//                         var Daily_Dose_count_before = SQL_PSC_DD_Count(w_pid);
////                         Log.Message("daily dose task count before" + Daily_Dose_count_before);
//
//                         // Run SQL for count of tasks before change
//                         var Schedule_count_before = SQL_PSC_Schedule_Count(w_pid);
//                         Log.Message("schedule task count before" + Schedule_count_before);

//  if (driver.Value(8) == Next_Date_count_before)
//      Log.checkpoint("Count NTD correct," + "SQL Count = " + Next_Date_count_before + "Driver count = " + driver.Value(8));
//      else Log.Warning("NTD before count not correct" + "SQL Count = " + Next_Date_count_before + "Driver count = " + driver.Value(8));
//      
//      if (driver.Value(6) == Daily_Dose_count_before)
//      Log.checkpoint("Count DD correct," + "SQL Count = " + Daily_Dose_count_before + "Driver count = " + driver.Value(6))
//      else Log.Warning("Daily dose before count not correct" + "SQL Count = " + Daily_Dose_count_before + "Driver count = " + driver.Value(6));
//      
//      if (driver.Value(9) == Schedule_count_before)
//      Log.checkpoint("Count Schedule correct," + "SQL Count = " + Schedule_count_before + "Driver count = " + driver.Value(9))
//      else Log.Warning("Schedule before count not correct" + "SQL Count = " + Schedule_count_before + "Driver count = " + driver.Value(9));   
                         
                         //Make the change under test
                         
//                         move_ntd_earlier(driver.Value(7));
                         
                         // Run SQL here for count of tasks after change
                         
//                         var Next_Date_count_after = SQL_PSC_NTD_Count(w_pid);
////                         Log.Message("ntd task count after" + Next_Date_count_after);
//                         
//                         // Run SQL for count of tasks after change
//                         var Daily_Dose_count_after = SQL_PSC_DD_Count(w_pid);
////                         Log.Message("daily dose task count after" + Daily_Dose_count_after);
//
//                         // Run SQL for count of tasks after change
//                         var Schedule_count_after = SQL_PSC_Schedule_Count(w_pid);
//                         Log.Message("schedule task count after" + Schedule_count_after);

//
//  if (driver.Value(10) == Next_Date_count_after)
//      Log.checkpoint("After count NTD correct," + "SQL Count = " + Next_Date_count_after + "Driver count = " + driver.Value(10))
//      else Log.Warning("NTD after count not correct" + "SQL Count = " + Next_Date_count_after + "Driver count = " + driver.Value(10))
//      
//      if (driver.Value(11) == Daily_Dose_count_after)
//      Log.checkpoint("After count DD correct," + "SQL Count = " + Daily_Dose_count_after + "Driver count = " + driver.Value(11))
//      else Log.Warning("Daily dose after count not correct" + "SQL Count = " + Daily_Dose_count_after + "Driver count = " + driver.Value(11))
//      
//      if (driver.Value(12) == Schedule_count_after)
//      Log.checkpoint("After count Schedule correct," + "SQL Count = " + Schedule_count_after + "Driver count = " + driver.Value(12))
//      else Log.Warning("Schedule after count not correct" + "SQL Count = " + Schedule_count_after + "Driver count = " + driver.Value(12))                   
         }
         
      // Next record
//      driver.Next();      
//    }
//}
//-------------------------------------------------------------------------------------------
function self_care_Stage1(w_outfile, driver)
{
          Log.Message("*** Self Care Stage 1");
         
          add_sc_patient(driver,"t");

          test_Self_Care_Send_Email(); 
          

          
}
//===========================================================
function test_Self_Care_Send_Email()
{
      Goto_Self_Care();
      var INRstarV5 = set_system();
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPQN = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("ProgramContainer").Panel("Program_engageAC");
      var panelS1C = panelPQN.Panel("Stage_1").Panel("Stage_1_Content");
      
      //Click Legal checkbox
      panelS1C.Checkbox("Stage_1_4_Content_Input").ClickChecked(true);
     Log.Message("Have ticked 'Legal'");
      
          if (panelS1C.Button("Stage_1_6_Content_Input").Enabled == true)
          {
                    // Click Send Email
                    panelS1C.Button("Stage_1_6_Content_Input").Click();
      
                    // Check for Error message
                    var wbx_V = INRstarV5.NativeWebObject.Find("idStr", "Errors");
                    if (wbx_V.Exists == false)
                     {
                        Log.Message("There are no Error messages");
                      }
                      else
                      {
                     if (wbx_V.Exists == true)
                           if (wbx_V.VisibleOnScreen == true)
                           { 
                                 var w_err_text = INRstarV5.NativeWebObject.Find("idStr", "Errors").innerText;
                                 Log.Message("Error text is: " + w_err_text);
                           }
                      }
          }
          else
          {
                    Log.Message("Send Email cannot be clicked");
          }
}
//-------------------------------------------------------------------------------------------
function test_Self_Care_Legal(p_valid)
{
          Goto_Self_Care();
          var INRstarV5 = set_system();
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          var panelPQN = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("ProgramContainer").Panel("Program_engageAC");
          var panelS1C = panelPQN.Panel("Stage_1").Panel("Stage_1_Content");
      
          //Click Legal checkbox
          if (panelS1C.Checkbox("Stage_1_4_Content_Input").Enabled == false)
          {
                    Log.Checkpoint("Cannot click 'Legal'");
          }
          else
          {          
                    if  (p_valid == "n")
                              Log.Warning("Should not be able to click 'Legal'");
                    else
                              Log.Checkpoint("Can click 'Legal'");
          }
}
//===============================================================
function add_sc_patient( driver, p_option)
{
        var INRstarV5 = set_system();

         Goto_Add_Patient();
         
         quick_pt_demographics(driver.Value(1), driver.Value(2),driver.Value(3));
         
         WaitSeconds(1,"");

          if (p_option == "p" || p_option == "t")
         {
                   Goto_Patient_TreatmentPlan_Add();
         
                   var w_drug = "W";
                   var w_dm = "";
                   var w_start =  driver.Value(4);
         
                  quick_pt_treatmentplan(w_drug, w_dm, w_start);
         }
          if (p_option == "t")
         {
                  var w_date = driver.Value(4);
                  var w_day = aqString.SubString(w_date,0,2);
                  var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
                  var w_yr = aqString.SubString(w_date,6,4);
                  
                  Goto_Add_Historical();
                  // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
                 quick_pt_historical(w_day,w_mth,w_yr, "2.5", "2.3", "2.5", "0", "7", "Quick Patient treatment");
         }
}
//-----------------------------------------------------------------------------------------------------
function self_care_to_Stage3(INRstarV5)
{
        // Stage 2 checkbox should now be active
      Goto_Self_Care();
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPQN = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("ProgramContainer").Panel("Program_engageAC");
      var panelS2C = panelPQN.Panel("Stage_2").Panel("Stage_2_Content");
      var panelS3C = panelPQN.Panel("Stage_3").Panel("Stage_3_Content");
      
       panelS2C.Checkbox("Stage_2_1_Content_Input").ClickChecked(true);
       panelS3C.Checkbox("Stage_3_1_Content_Input").ClickChecked(true);                
      process_self_care_confirm_INR(INRstarV5);
}
//--------------------------------------------------------------------------------------
function move_ntd_earlier(p_days)
{
   var INRstarV5 = set_system();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
   var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
   var panelPTIH = panelPTW.Panel("PatientTreatmentHistory").Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
      
    var wpnl_treat = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapper");
    if (wpnl_treat.Exists ==true)
    {
          Log.Message ("Using Short Table");
          var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper");
   }
   else
   {   
            var wpnl_treat2 = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapperOverSix");
            if (wpnl_treat2.Exists ==true)
            {      
                  Log.Message ("Using Long Table");
                  var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix");
            }
            else
                      Log.Error ("Not found a Table !!");

    }      
    var wt_treatments=panelVPHTW .Table("PatientTreatmentHistoryTable");   
    w_row = wt_treatments.RowCount - 1;
    
//    Log.Message (w_row);
      
      wt_treatments.Cell(w_row, 7).Panel("MoveNTDCalendarContainer").Image("calendar_png").Click();

      var w_date =  wt_treatments.Cell(w_row, 7).Panel("MoveNTDCalendarContainer").Textbox("ChangeNextTestDate").Text;
      
      // Adjust the NTD by the required days
      var w_ntd = aqConvert.DateTimeToStr(aqDateTime.AddDays(w_date,p_days));

      Log.Message("New NTD " +w_ntd);

      var w_day = aqString.SubString(w_ntd,0,2);
      var w_mth = aqString.SubString(w_ntd,3,2);
      var w_yr = aqString.SubString(w_ntd,6,4);
      
      Log.Message(w_day+" : "+w_mth+" : "+w_yr);
      
      w_datepicker = INRstarV5.Panel("ui_datepicker_div");
      w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
      w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
      select_day(w_day, w_datepicker);
      
      process_confirm_INR_cancel(INRstarV5);
      
}

//===============================================================================