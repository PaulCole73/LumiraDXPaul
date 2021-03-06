//USEUNIT Common
//USEUNIT V5_Common
////USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation

//USEUNIT Add_INR_Simple
//USEUNIT Delete_Treatments
//USEUNIT Quick_Patient

// This process creates INR treatment records for a range of INR values,
// where the Dose remains constant at 5mg/day 

// Variable parameters that can affect the process are :
// Rounding, or not, of the dose value
// The Testing Methodolgy  

// In preparation, the process needs to :
// a) Find a patient
// b) Create a new History with only 7 days review
// c) Set the In Range INR Stages 2 to 6 to specific values

// Then, for a fixed, in range INR, the process needs to
// d) Create a new Treatment
// e) Record the new Review Period
// f ) repeat d & e until the Review Period is equal to Stage 6


function quick_start()
{
 var wf_algo = true;
 var wf_round = false;
 var w_corh = "c";
 
 schedule_fixed_dose(w_corh, wf_algo, wf_round);
 
}

function   schedule_fixed_dose(w_corh, wf_algo, wf_round)
{
//  try
//  {
    var w_algo;
    var w_round;
    if (wf_algo == true)
       w_algo = "A";   
    else
        w_algo = "B";
    if (wf_round == true)
       w_round = "R";
    else
        w_round = "NR";    
  
   // Define the output file name
    var w_File = "_" + w_corh + w_algo + w_round;
  
    var w_Run = "Run" + w_algo;
  

    var w_Target_INR = 2.5; 
    var w_Fixed_Dose = 5.0;
    var wf_NPSA = false;
    var w_RoundVal = 3;
    var w_treatment_INR = 2.4;
    
    var w_Name = "wehetc, amelie";
    var w_NHS = "3875335783";

  
    var w_outfile = "d:\\results\\V5_Review_Periods"+w_File+".csv";
    Log.Message(w_outfile);
    
    var w_mess = "";  
    // Reset Output File
    w_mess="Algorithm : " + w_Run.substr(3,1) + w_File;
    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

//    // Log on as Clinical Lead
//    set_parameters(w_Run, wf_round, w_RoundVal, wf_NPSA, wf_algo);
//    set_INR_Stage_values("7","21","35","49","63","84"); 
//    // End of Clinical Lead stuff 
    
 //   Log_On(8); // Hugo Searle
    
    var INRstarV5 = set_system(); 
      
    Goto_Patient_Search();
//    preset_Fetch_Patient(INRstarV5, w_Name);
      preset_Fetch_Patient_NHS(INRstarV5, w_NHS);
          
    // Set Patient Clinical Target INR
//    set_target_inr(INRstarV5, w_Target_INR);
//    preset_patient_algorithm(INRstarV5, w_corh);
    
//    Goto_Patient_Treatment();
//    delete_treatment();

    Goto_Add_Historical();
    //                  Day   Month   Year   Target        INR    Dose Omits Review   Comment
    quick_pt_historical("23", "Jan", "2014", w_Target_INR, "2.2", "5.0", "0","7", "");
    
    for (wc_period=1; wc_period<7; wc_period++)
    {
        Log.Message("================== Review Period " + wc_period);
                  
        // Navigate to the New INR page
        Goto_Patient_New_INR();
        
        // Override date - this needs to be changed by 1 day per treatment, starting 7 days ago.
        w_override_days = (7 - wc_period) * -1;
        
        // Override date  = today - override days
        w_override_date = days_from_today(w_override_days);
        
        w_NTD_day = aqDateTime.GetDay(w_override_date);
        w_NTD_month = aqDateTime.GetMonth(w_override_date);
        w_NTD_year = aqDateTime.GetYear(w_override_date);
        
        // Add the INR
        add_inr_override(w_treatment_INR, w_NTD_day, w_NTD_month, w_NTD_year, false, false);
        
        // Record the values produced
        record_values(INRstarV5, w_treatment_INR, w_outfile);

//        Goto_Patient_Treatment();
    } 
    
    // Exit Patient Details
    var panelMPC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMPC.Panel("PatientRecord").Panel("PatientTab").Link("ExitPatientRecordTab").Click();
      
//  }
//  catch(exception)
//  {
//     Log.Error("Exception", exception.description);
//  }
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
//           w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(p_month);
           w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(p_month));
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



