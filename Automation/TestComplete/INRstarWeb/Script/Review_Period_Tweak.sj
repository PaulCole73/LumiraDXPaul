//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Popups
//USEUNIT Navigation
//USEUNIT Delete_Treatments
//USEUNIT Add_INR_Simple
//USEUNIT V5_SQL

//======================================= Main Routine =================================
function Review_Period_Tweak()
{
    var w_outfile = "d:\\Results\\Review_Period_Tweak_7s.csv";

    aqFile.WriteToTextFile(w_outfile, "\r\n",  aqFile.ctANSI, true);
    
    //----------------------------------------------------------------------------------------

    driver = DDT.ExcelDriver("d:\\Test_Data\\Review_Period_Tweak.xls","Data");
    
    // 0 - Run
    // 1 - Pattern
    // 2 - Total Days
    // 3 - Start Date
    // 4 - 1st week RP
    // 5 - 1st week Date
    // 6 - 2nd week RP
    // 7 - 2nd week Date
    // 8 - 3rd week RP
    // 9 - 3rd week Date
    
    //----------------------------------------------------------------------------------------
    Log_On(8); // Gov @ Prison
    
    var INRstarV5 = set_system();  
    
    //---- Set variable details
    var w_NHS = "6764370745"; // Black
    var w_pnum = "BLK355";
    var w_t_ctr;
      
    Goto_Patient_Search();
    preset_Fetch_Patient_NHS(INRstarV5, w_NHS);
         
    while (!driver.EOF())
    {
      if (driver.Value(0) == "Y")
      {
        var w_mess = "Test: " + driver.Value(1);
        aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);
        
        w_t_ctr = 0;
        for (x=0; x < 10; x++)
        {
           w_col = (x*2)+3;      // counter * number of columns in repeat, plus off set of 1st repeat column

           Log.Message("w_col:" + w_col + "; Value in +1:" + driver.Value(w_col+1));

           if(driver.Value(w_col+1) > 0)
           {
              var p_day = aqDateTime.GetDay(driver.Value(w_col));
              var p_month = aqDateTime.GetMonth(driver.Value(w_col));
              var p_year = aqDateTime.GetYear(driver.Value(w_col));
              var p_target = "2.5";
              var p_inr = "2.4";
              var p_dose = "3.1";
              var p_review = driver.Value(w_col+1) + " Days"
              var p_comment = ""

              Goto_Add_Historical();
         
              quick_pt_historical(p_day, p_month, p_year, p_target, p_inr, p_dose, p_review, p_comment)
           
              
//              Log.Message(w_col);
//              Log.Message(w_pnum)+ ", "+(driver.Value(2))+ ", "+(driver.Value(w_col+1))+ ", "+(driver.Value(w_col+2))+ ", "+(driver.Value(w_col+3))+ ", "+(driver.Value(w_col))+ ", "+(driver.Value(w_col+4))+ ", "+(w_outfile);
//              // Parameters : Rounding, INR, Dose, Instructions, output file
//              process_treatment(INRstarV5, w_pnum, driver.Value(2), driver.Value(w_col+1), driver.Value(w_col+2), driver.Value(w_col+3), driver.Value(w_col), driver.Value(w_col+4), w_outfile);
              w_t_ctr++;
           }
           else
              x = 20;  // End Loop 
        }
        
        // Add the INR record
        Goto_Patient_New_INR();
        add_inr_simple(2.5);
        
        record_values(INRstarV5, "2.5", w_outfile) 
        
//        // Parameters : Rounding, INR, Dose, Instructions, output file
//        process_treatment(INRstarV5, "N", driver.Value(2), driver.Value(w_col+1), driver.Value(w_col+2), driver.Value(w_col+3), driver.Value(w_col), driver.Value(w_col+4), w_outfile);
        
        // Clean up
        for (x=0; x < w_t_ctr+1; x++)
        {
              // Delete the treatments
              delete_all_treatments(INRstarV5);
        }
       } 
      driver.Next();      
    }
//    DDT.CloseDriver("d:\\Test_Data\\review.xls");
}

function process_treatment(INRstarV5, p_pnum, p_round, p_inr, p_review, p_ins, p_t_date, p_ntd_date, w_outfile)
{
        wf_Missed = false;
        wf_Meds = false;
        if (p_ins == "D")
          wf_Missed = true;
        if (p_ins == "M")
          wf_Meds = true;

        // Navigate to the New INR page
        Goto_Patient_New_INR();
        
        if (p_ins == "Y")
        {
          add_inr_override_review(p_inr, p_review);
        }
        else
          add_inr_simple(p_inr);
          
        // find patient_id
        var w_pid = SQL_Find_Patient_No(p_pnum)  
        // reset treatment dates
        var w_sql_ntd_date = aqDateTime.AddDays(p_t_date, p_review);
        SQL_Update_Dates_specific(p_t_date, w_sql_ntd_date, w_pid);  
          
         // Record the values produced
        record_output(INRstarV5, p_inr, p_review, w_outfile);
}
//-------------------------------------------------------------------------------
function add_inr_override_date_review(p_INR,p_review,p_day,p_month,p_year, wf_Missed, wf_Meds)
{
  try
  {
//       WaitSeconds(1,"");
       
       var w_date = p_day + "/" + p_month+ "/" + p_year; 
       
       Log.Message("----- Adding INR treatment with Override: " + p_INR + " " + w_date);
       
       var INRstarV5 = set_system();
       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
       var panelPPT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
       var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
       var form = panelPTNIW.Form("NewINRForm");
       var panelPTQ  = form.Panel("PatientTreatmentNewINRQuestionsWrapper");
       var p1 = panelPTQ.Panel("PatientTreatmentNewINRConfirm");
       var p2 = panelPTQ.Panel("PatientTreatmentNewINRQuestions");
       var p3 = panelPTQ.Panel("PatientTreatmentNewINRTestDetails")
       
       var wf_complete = true;
    
        // Check the Patient Identity box
        p1.Panel(0).Checkbox("ConfirmPatient").ClickChecked(true);
      
        // Check the Dose 'Yes' box
       p1.Panel(2).Checkbox("ConfirmLastRecordedTreatment").ClickChecked(true);
       // Ignore the Dose ' No' box
       // .Panel(3).Checkbox("LastRecordedTreatmentIsNotCurrent")
       
        // Check the correct Missed Doses
        if (wf_Missed == true)
          p2.Panel(1).Checkbox("MissedDosesYesCheckedValue").ClickChecked(true);
        else
          p2.Panel(2).Checkbox("MissedDosesNoCheckedValue").ClickChecked(true);
       
        // Check the correct Other Medication
        if (wf_Meds == true)
          p2.Panel(4).Checkbox("OtherMedicationYesCheckedValue").ClickChecked(true);
        else
          p2.Panel(5).Checkbox("OtherMedicationNoCheckedValue").ClickChecked(true);
 
       // Select the passed-in INR value
       var ws_INR = FloatToString(p_INR);
       Log.Message("INR is " + ws_INR);
       p3.Panel(0).Select("INR").ClickItem(ws_INR);
       
       
       // Click the Go button
       form.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
       
       // Click the Confirm button in the confirm window
       process_confirm_INR(INRstarV5);
       
       process_Please_acknowledge_warnings(INRstarV5);
       

       // Test if a schedule exists           
       var wf_no_sched = INRstarV5.NativeWebObject.Find("innerText", "There is no schedule available");
       if (wf_no_sched.Exists)
       {  
           wf_complete = false;
           Log.Message("Clicking Cancel button");
               
           // Record the values produced
           var w_dose = panelPTC.panel("PendingTreatmentContent").Table("PendingTreatmentTable").Cell(0, 2).innerText;
           Log.Warning("No Schedule for "+ p_INR+ ", Dose: " + w_dose);
               
           var panelABC = panelPTC.Panel("PendingTreatmentContent").Panel(0);
           // Click the cancel button
           panelABC.Button("CancelPendingTreatment").Click();
       }
       else
       {
              
//           var panelPPT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
           var panelPTI = panelPPT.Panel("PendingTreatmentInfo");      
   
           // Override the date -------------------------------
           // click the override button
           panelPTI.Panel(0).Button("OverridePendingTreatment").Click();
//           panelPPT.Panel("DosingSchedule").Panel(0).Button("OverridePendingTreatment").Click();
           var formEPT = panelPTI.form("EditPendingTreatmentForm");
               
           formEPT.Table("OverrideSuggestedTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
           
           Log.Message("Overriding Date");
           
           w_datepicker = INRstarV5.Panel("ui_datepicker_div");
           w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(p_year));
           w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(p_month);
//           w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(p_month));
           select_day(p_day, w_datepicker);
           
           Log.Message("Overriding Review");
           formEPT.Table("OverrideSuggestedTreatmentTable").Cell(1, 3).Select("Treatment_Review").ClickItem(p_review+" Days");
           
           // Click 'OK'
           formEPT.panel(0).Button("OverrideAccept").Click();
           // -- End of Override section
        

           // Now test if a single Schedule has been proposed or we need to choose one
           wf_no_exact = INRstarV5.NativeWebObject.Find("innerText", "INRstar cannot provide a dosing schedule for this dose using the selected tablet strengths, please choose an alternative schedule.");
           if(wf_no_exact.Exists)
           {
               // Click the top Use button
               Log.Message("Clicking 1st 'Use' button");
//               var panelSG = panelPPT.Panel("DosingSchedule").Panel("DosingScheduleContent").Panel("ScheduleGrid");
               var panelSG = panelPTI.Panel("DosingScheduleContent").Panel("ScheduleGrid");
               var tableSST = panelSG.Table("ScheduleSelectorTable");
               tableSST.Cell(1, 2).Button("Use").Click();

               WaitSeconds(1,"");
           }
           else
               Log.Message("Exact Schedule found");
           
           // Click the Save/Print button
           Log.Message("Clicking 'Save/Print' button");
           panelPTI.Panel(0).Button("AcceptPendingTreatment").Click();
           
       }
       WaitSeconds(1,"");
       
       return wf_complete;
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
function add_inr_override_review(p_INR,p_review)
{
  try
  {
//       WaitSeconds(1,"");
       Log.Message("----- Adding INR treatment with Override: " + p_INR + " " + p_review);
       
       var INRstarV5 = set_system();
       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
       var panelPPT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
       var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
       var form = panelPTNIW.Form("NewINRForm");
       var panelPTQ  = form.Panel("PatientTreatmentNewINRQuestionsWrapper");
       var p1 = panelPTQ.Panel("PatientTreatmentNewINRConfirm");
       var p2 = panelPTQ.Panel("PatientTreatmentNewINRQuestions");
       var p3 = panelPTQ.Panel("PatientTreatmentNewINRTestDetails")
       
       var wf_complete = true;
    
        // Check the Patient Identity box
        p1.Panel(0).Checkbox("ConfirmPatient").ClickChecked(true);
      
        // Check the Dose 'Yes' box
       p1.Panel(2).Checkbox("ConfirmLastRecordedTreatment").ClickChecked(true);
       // Ignore the Dose ' No' box
       // .Panel(3).Checkbox("LastRecordedTreatmentIsNotCurrent")
       
        // Check the correct Missed Doses
        if (wf_Missed == true)
          p2.Panel(1).Checkbox("MissedDosesYesCheckedValue").ClickChecked(true);
        else
          p2.Panel(2).Checkbox("MissedDosesNoCheckedValue").ClickChecked(true);
       
        // Check the correct Other Medication
        if (wf_Meds == true)
          p2.Panel(4).Checkbox("OtherMedicationYesCheckedValue").ClickChecked(true);
        else
          p2.Panel(5).Checkbox("OtherMedicationNoCheckedValue").ClickChecked(true);
 
       // Select the passed-in INR value
       var ws_INR = FloatToString(p_INR);
       Log.Message("INR is " + ws_INR);
       p3.Panel(0).Select("INR").ClickItem(ws_INR);
       
       
       // Click the Go button
       form.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
       
       // Click the Confirm button in the confirm window
       process_confirm_INR(INRstarV5);
       
       process_Please_acknowledge_warnings(INRstarV5);
       

       // Test if a schedule exists           
       var wf_no_sched = INRstarV5.NativeWebObject.Find("innerText", "There is no schedule available");
       if (wf_no_sched.Exists)
       {  
           wf_complete = false;
           Log.Message("Clicking Cancel button");
               
           // Record the values produced
           var w_dose = panelPTC.panel("PendingTreatmentContent").Table("PendingTreatmentTable").Cell(0, 2).innerText;
           Log.Warning("No Schedule for "+ p_INR+ ", Dose: " + w_dose);
               
           var panelABC = panelPTC.Panel("PendingTreatmentContent").Panel(0);
           // Click the cancel button
           panelABC.Button("CancelPendingTreatment").Click();
       }
       else
       {
              
//           var panelPPT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
           var panelPTI = panelPPT.Panel("PendingTreatmentInfo");      
   
           // Override the date -------------------------------
           // click the override button
           panelPTI.Panel(0).Button("OverridePendingTreatment").Click();
//           panelPPT.Panel("DosingSchedule").Panel(0).Button("OverridePendingTreatment").Click();
           var formEPT = panelPTI.form("EditPendingTreatmentForm");
               
           Log.Message("Overriding Review");
           formEPT.Table("OverrideSuggestedTreatmentTable").Cell(1, 3).Select("Treatment_Review").ClickItem(p_review+" Days");
           
           // Click 'OK'
           formEPT.panel(0).Button("OverrideAccept").Click();
           // -- End of Override section
        

           // Now test if a single Schedule has been proposed or we need to choose one
           wf_no_exact = INRstarV5.NativeWebObject.Find("innerText", "INRstar cannot provide a dosing schedule for this dose using the selected tablet strengths, please choose an alternative schedule.");
           if(wf_no_exact.Exists)
           {
               // Click the top Use button
               Log.Message("Clicking 1st 'Use' button");
//               var panelSG = panelPPT.Panel("DosingSchedule").Panel("DosingScheduleContent").Panel("ScheduleGrid");
               var panelSG = panelPTI.Panel("DosingScheduleContent").Panel("ScheduleGrid");
               var tableSST = panelSG.Table("ScheduleSelectorTable");
               tableSST.Cell(1, 2).Button("Use").Click();

               WaitSeconds(1,"");
           }
           else
               Log.Message("Exact Schedule found");
           
           // Click the Save/Print button
           Log.Message("Clicking 'Save/Print' button");
           panelPTI.Panel(0).Button("AcceptPendingTreatment").Click();
           
       }
       WaitSeconds(1,"");
       
       return wf_complete;
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
function add_inr_override_date(p_INR,p_day,p_month,p_year, wf_Missed, wf_Meds)
{
  try
  {
//       WaitSeconds(1,"");
       
       var w_date = p_day + "/" + p_month+ "/" + p_year; 
       
       Log.Message("----- Adding INR treatment with Override: " + p_INR + " " + w_date);
       
       var INRstarV5 = set_system();
       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
       var panelPPT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
       var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
       var form = panelPTNIW.Form("NewINRForm");
       var panelPTQ  = form.Panel("PatientTreatmentNewINRQuestionsWrapper");
       var p1 = panelPTQ.Panel("PatientTreatmentNewINRConfirm");
       var p2 = panelPTQ.Panel("PatientTreatmentNewINRQuestions");
       var p3 = panelPTQ.Panel("PatientTreatmentNewINRTestDetails")
       
       var wf_complete = true;
    
        // Check the Patient Identity box
        p1.Panel(0).Checkbox("ConfirmPatient").ClickChecked(true);
      
        // Check the Dose 'Yes' box
       p1.Panel(2).Checkbox("ConfirmLastRecordedTreatment").ClickChecked(true);
       // Ignore the Dose ' No' box
       // .Panel(3).Checkbox("LastRecordedTreatmentIsNotCurrent")
       
        // Check the correct Missed Doses
        if (wf_Missed == true)
          p2.Panel(1).Checkbox("MissedDosesYesCheckedValue").ClickChecked(true);
        else
          p2.Panel(2).Checkbox("MissedDosesNoCheckedValue").ClickChecked(true);
       
        // Check the correct Other Medication
        if (wf_Meds == true)
          p2.Panel(4).Checkbox("OtherMedicationYesCheckedValue").ClickChecked(true);
        else
          p2.Panel(5).Checkbox("OtherMedicationNoCheckedValue").ClickChecked(true);
 
       // Select the passed-in INR value
       var ws_INR = FloatToString(p_INR);
       Log.Message("INR is " + ws_INR);
       p3.Panel(0).Select("INR").ClickItem(ws_INR);
       
       
       // Click the Go button
       form.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
       
       // Click the Confirm button in the confirm window
       process_confirm_INR(INRstarV5);
       
       process_Please_acknowledge_warnings(INRstarV5);
       

       // Test if a schedule exists           
       var wf_no_sched = INRstarV5.NativeWebObject.Find("innerText", "There is no schedule available");
       if (wf_no_sched.Exists)
       {  
           wf_complete = false;
           Log.Message("Clicking Cancel button");
               
           // Record the values produced
           var w_dose = panelPTC.panel("PendingTreatmentContent").Table("PendingTreatmentTable").Cell(0, 2).innerText;
           Log.Warning("No Schedule for "+ p_INR+ ", Dose: " + w_dose);
               
           var panelABC = panelPTC.Panel("PendingTreatmentContent").Panel(0);
           // Click the cancel button
           panelABC.Button("CancelPendingTreatment").Click();
       }
       else
       {
              
//           var panelPPT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
           var panelPTI = panelPPT.Panel("PendingTreatmentInfo");      
   
           // Override the date -------------------------------
           // click the override button
           panelPTI.Panel(0).Button("OverridePendingTreatment").Click();
//           panelPPT.Panel("DosingSchedule").Panel(0).Button("OverridePendingTreatment").Click();
           var formEPT = panelPTI.form("EditPendingTreatmentForm");
               
           formEPT.Table("OverrideSuggestedTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
           
           Log.Message("Overriding Date");
           
           w_datepicker = INRstarV5.Panel("ui_datepicker_div");
           w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(p_year));
           w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(p_month);
//           w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(p_month));
           select_day(p_day, w_datepicker);
           
           // Click 'OK'
           formEPT.panel(0).Button("OverrideAccept").Click();
           // -- End of Override section
        

           // Now test if a single Schedule has been proposed or we need to choose one
           wf_no_exact = INRstarV5.NativeWebObject.Find("innerText", "INRstar cannot provide a dosing schedule for this dose using the selected tablet strengths, please choose an alternative schedule.");
           if(wf_no_exact.Exists)
           {
               // Click the top Use button
               Log.Message("Clicking 1st 'Use' button");
//               var panelSG = panelPPT.Panel("DosingSchedule").Panel("DosingScheduleContent").Panel("ScheduleGrid");
               var panelSG = panelPTI.Panel("DosingScheduleContent").Panel("ScheduleGrid");
               var tableSST = panelSG.Table("ScheduleSelectorTable");
               tableSST.Cell(1, 2).Button("Use").Click();

               WaitSeconds(1,"");
           }
           else
               Log.Message("Exact Schedule found");
           
           // Click the Save/Print button
           Log.Message("Clicking 'Save/Print' button");
           panelPTI.Panel(0).Button("AcceptPendingTreatment").Click();
           
       }
       WaitSeconds(1,"");
       
       return wf_complete;
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
function record_output(INRstarV5, p_inr, p_review, w_outfile)
{
   var w_row;
   
   WaitSeconds(0.5);

   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
   var panelPTIH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory").Panel("PatientTreatmentINRHistory");
   var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable");
//   if (wt_treatments.Rowcount > 3)
      w_row = wt_treatments.Rowcount - 1;
//   w_row = wt_treatments.Rowcount;

   // Details
//   var w_dose = wt_treatments.Cell(w_row,2).innerText;    // (row, column (0 indexed))
//   var w_sugg_dose = wt_treatments.Cell(w_row,3).innerText;    // (row, column (0 indexed))
   var w_review = wt_treatments.Cell(w_row,5).innerText;
   var w_sugg_review = wt_treatments.Cell(w_row,6).innerText;
   var w_mess = p_inr + "," + p_review+ "," + w_review + "," + w_sugg_review;
   
   Log.Message(w_mess);
   
   // Write the record to the file
   aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n", aqFile.ctANSI);

}