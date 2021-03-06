//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation

// This script will test if a schedule exists for a given dose value.
// It will log in, find a patient, create a treatment, then override the Dose value in increments of 0.1
// testing in each case if a single schedule exists.
// For those thsat don't exist, an output record will be written.

function quick_start()
{
 
 var w_Start_Dose = 0.1;
 var w_End_Dose = 15.0;     
 schedule_missing(w_Start_Dose, w_End_Dose );
}
//---------------------------------------------------------------------------
function   schedule_missing(w_Start_Dose, w_End_Dose )
{
//  try
//  {
 
   // Define the output file name
    var w_File = "_Missing_No_Splits";
  
    var w_NHS = "978 822 2846";  // Ryan Smith
  
    var w_outfile = "d:\\Results\\V5"+w_File+".csv";
    Log.Message(w_outfile);
    
    var w_mess = "";  
    // Reset Output File
    w_mess="All tablets No splits";
    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);
  
    Log_On(8); // Hugo Searle
       
    var INRstarV5 = set_system(); 
      
    Goto_Patient_Search();
    preset_Fetch_Patient_NHS(INRstarV5, w_NHS);
    
    // Navigate to the New INR page
    Goto_Patient_New_INR();
        
    // Add the INR
    add_part_inr(INRstarV5, "2.5");
        
    var w_current_Dose = w_Start_Dose;
    
    while (w_current_Dose <= w_End_Dose)
    {
        Log.Message("================== Dose of " + w_current_Dose);
        
        test_schedule(INRstarV5, w_current_Dose, w_outfile)          
        
        // Increment w_current_Dose
        w_current_Dose = roundNumber(w_current_Dose + 0.1,1);
    }
//  }
//  catch(exception)
//  {
//     Log.Error("Exception", exception.description);
//  }
}
//---------------------------------------------------------------------------
function add_part_inr(INRstarV5, p_INR)
{
  try
  {
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
       
        // Check the Missed Doses 'No' box
       p2.Panel(2).Checkbox("MissedDosesNoCheckedValue").ClickChecked(true);
       // Ignore the Missed Doses ' Yes' box
       // .Panel(1).Checkbox("MissedDosesYesCheckedValue")
       
       // Check the New Medication 'No' box
       p2.Panel(5).Checkbox("OtherMedicationNoCheckedValue").ClickChecked(true);
       // Ignore the New Medication 'Yes' box
       // .Panel(4).Checkbox("OtherMedicationYesCheckedValue")
 
       // Select the passed-in INR value
       var ws_INR = FloatToString(p_INR);
       Log.Message("INR is " + ws_INR);
       p3.Panel(0).Select("INR").ClickItem(ws_INR);
       
       // Click the Go button
       form.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
       
       // Click the Confirm button in the confirm window
       process_confirm_INR(INRstarV5);
       
       process_Please_acknowledge_warnings(INRstarV5);
       
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//---------------------------------------------------------------------------
function test_schedule(INRstarV5, p_Dose, w_outfile)
{
  try
  {
       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
       var panelPPT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
       // click the override button
       var panelPTI = panelPPT.Panel("PendingTreatmentInfo");      
       panelPTI.Panel(0).Button("OverridePendingTreatment").Click();
       var formEPT = panelPTI.form("EditPendingTreatmentForm");
       // Override the Dose value    
       var select_dose = formEPT.Table("OverrideSuggestedTreatmentTable").Cell(1, 1).Select("Treatment_Dose")
       select_dose.ClickItem(FloatToString(p_Dose));
                      
       // Click 'ok'
       formEPT.panel(0).Button("OverrideAccept").Click();
        
       // Check if Dose change is > 20%
       process_Please_confirm(INRstarV5);
       
       // Test if a schedule exists           
       var wf_no_sched = INRstarV5.NativeWebObject.Find("innerText", "INRstar cannot provide a dosing schedule for this dose using the selected tablet strengths, please choose an alternative schedule.");
       if (wf_no_sched.Exists)
       {  
            w_mess="No schedule for : "+ p_Dose;
            aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);

       }
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}



