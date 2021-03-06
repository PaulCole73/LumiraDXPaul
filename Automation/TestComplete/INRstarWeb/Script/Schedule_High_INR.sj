//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT V5_SQL
//USEUNIT Navigation
//USEUNIT Add_INR_Refer

// In preparation :
// Set a patient to have:
//    Target INR - 2.5
//    Maintenance dosed
//    Previous, in range INR with a dose of 10.0 
// Login at patient's testing location

// This process
// a) Find the patient
// b) Create a treatment with an INR each of 3.2, 3.7, 4.2, 5.2, 6.2, 8.2 

function quick_start()
{
//    var w_NHS = "6852083241";
//    
//    var wa_inr = new Array(6);
//    wa_inr[0] = "3.2";
//    wa_inr[1] = "3.7";
//    wa_inr[2] = "4.2";
//    wa_inr[3] = "5.2";
//    wa_inr[4] = "6.2";
//    wa_inr[5] = "8.2";
 
    var w_NHS = "4719559174";
    
    var wa_inr = new Array(5);
    wa_inr[0] = "3.7";
    wa_inr[1] = "4.2";
    wa_inr[2] = "5.2";
    wa_inr[3] = "6.2";
    wa_inr[4] = "8.2";
 
    sched_high_inrs(w_NHS, wa_inr)
 
}

function   sched_high_inrs(p_nhs, pa_inr)
{
    var w_pid = SQL_Find_Patient(p_nhs);
  
    var w_outfile = "Q:\\Development and Testing\\Testing\\TestComplete_Results\\V5_High_INR_35.csv";
    Log.Message(w_outfile);
    
    var w_mess = "";  
    // Reset Output File
    w_mess="";
    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

    var INRstarV5 = set_system(); 
      
    Goto_Patient_Search();

    preset_Fetch_Patient_NHS(INRstarV5, p_nhs);
          
    for (i=0; i < pa_inr.length;  i++)
    {
        // Navigate to the New INR page
        Goto_Patient_New_INR();
        
        
        // Add the INR
        add_inr_refer(pa_inr[i])
        
        // Record the values produced
        record_values_warnings(INRstarV5, w_outfile);
        
       // Click the Cancel button
       Log.Message("Clicking 'Cancel' button");
       var panelMPC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTW = panelMPC.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
       var panelPTI = panelPTW.Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");
       panelPTI.Panel(0).Button("CancelPendingTreatment").Click();
 
       // Confirm 'Confirm Cancel' window
       process_confirm_INR_cancel(INRstarV5);

    } 
    
    // Exit Patient Details
    var panelMPC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMPC.Panel("PatientRecord").Panel("PatientTab").Link("ExitPatientRecordTab").Click();
      
}
