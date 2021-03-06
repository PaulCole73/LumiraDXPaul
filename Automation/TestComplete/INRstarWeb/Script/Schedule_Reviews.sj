//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Popups
//USEUNIT Navigation
//USEUNIT Delete_Treatments

function quick_start()
{
  var w_prev = "2"; 
  var wf_Missed = false;
  var wf_Meds = false;
  
  Main(w_prev, wf_Missed, wf_Meds);
}



//======================================= Main Routine =================================
function Main(w_prev, wf_Missed, wf_Meds)
{
  try
  {
    if (wf_Missed == true)
      ws_Mess_Dose = "Dose(Missed)_";
    else
      ws_Mess_Dose = "Dose(OK)_";
      
    if (wf_Meds == true)
      ws_Mess_Meds = "Meds(New)_";
    else
      ws_Mess_Meds = "Meds(OK)_";
    
    var ws_mess = ws_Mess_Dose + ws_Mess_Meds + w_prev;  
    
    var w_outfile = "d:\\Results\\Review_Testing_Over_"+ws_mess+".csv";

    aqFile.WriteToTextFile(w_outfile, "\r\n",  aqFile.ctANSI, true);
    aqFile.WriteToTextFile(w_outfile, ws_mess + "\r\n",  aqFile.ctANSI);
    //----------------------------------------------------------------------------------------

    Log_On(5); // Peter Brown
    
    var INRstarV5 = set_system();  
    
    //---- Set variable details
    switch(w_prev)
    {
     case "2":
          var w_NHS = "668 310 6630"; // Simon Clark     580 379 0788
          var wt_row = 2;
          break;
     case "3":
          var w_NHS = "580 379 078"; // Edna Smith     580 379 0788
          var wt_row = 3;
          break;
     case "5":
          var w_NHS = "151 067 5329"; // Fred O'Connor
          var wt_row = 5;
          break;
    }  
    //---- End of Set Patient
      
    Goto_Patient_Search();
    preset_Fetch_Patient_NHS(INRstarV5, w_NHS);
    
    driver = DDT.ExcelDriver("d:\\Test_Data\\Review_Testing_over.xls","Treatments");
     //driver.Next(); //ignore header row
    
    // driver file details
    var d_Run;                    // column A  (0)
    var d_desc;                   // column B  (1) 
    var d_1st_INR = "";           // column C  (2)
    var d_2nd_INR = ""            // column D  (3)
    var d_3rd_INR = "";           // column E  (4)
    
    
    // This bit reads the file of test values, and processes each row marked as 'Y'
    
    // for each row, create three new treatments, using the INR values given
    // for the first treatment, set the Missed Dose or New Meds setting as indicated
    // override the treatment date to that of the correct value (prev NTD)
    // record te three treatment Review periods
    // delete the three treatments
     
    while (!driver.EOF())
    {
      if (driver.Value(0) == "Y")
      {
      // Store driver file details
        d_desc = driver.value(1);
        d_1st_INR = driver.value(2);
        d_2nd_INR = driver.value(3);
        d_3rd_INR = driver.value(4);
        
        Log.Message("========= "+ d_desc + " =========");
        aqFile.WriteToTextFile(w_outfile, d_desc + "\r\n",  aqFile.ctANSI);
        
        // Parameters : INR from file, wf_Missed, wf_Meds, Row value of date, output file
        process_treatment(INRstarV5, wf_Missed, wf_Meds, d_1st_INR, wt_row, w_outfile);
        process_treatment(INRstarV5, false, false, d_2nd_INR, wt_row+1, w_outfile);
        process_treatment(INRstarV5, false, false, d_3rd_INR, wt_row+2, w_outfile);
          
        
        // Delete the treatments
        delete_treatment();
        delete_treatment();
        delete_treatment();
        
      }
      driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Review_Testing_over.xls");
  }
  catch(exception)
  {
     Log.Error("Exception", exception.description);
  }
}

function process_treatment(INRstarV5, wf_Missed, wf_Meds, p_INR, p_row, w_outfile)
{
       // Reduce p_row if greater than 6, as only 6 treatments are shown
       if (p_row > 6)
           p_row = 6;
        
       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
       var panelPTH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
       var panelVPHTW = panelPTH.Panel("PatientTreatmentINRHistory").Panel("ViewPatientHistoricalTreatmentsWrapper");
       
       var tablePTH = panelVPHTW.Table("PatientTreatmentHistoryTable");
       // Determine NTD from previous row
       var w_NTD = tablePTH.Cell(p_row,7).InnerText;
       var w_NTD_day =  aqConvert.IntToStr(aqConvert.StrToInt(aqString.SubString(w_NTD,0,2)));
       var w_NTD_month = aqString.SubString(w_NTD,3,3); 
       var w_NTD_year = aqString.SubString(w_NTD,7,4); 

        // Navigate to the New INR page
        Goto_Patient_New_INR();
        
        // Add the INR
        add_inr_override(p_INR, w_NTD_day, w_NTD_month, w_NTD_year, wf_Missed, wf_Meds);
        
        // Record the values produced
        record_values(INRstarV5, p_INR, w_outfile);
}

function add_inr_override(p_INR,p_day,p_month,p_year, wf_Missed, wf_Meds)
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
           w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(p_month);
//           w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(p_month));
//           w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(p_year));
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

