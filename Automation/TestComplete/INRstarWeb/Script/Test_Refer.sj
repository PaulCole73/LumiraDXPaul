//USEUNIT Navigation
//USEUNIT V5_Common_Presets
//USEUNIT Add_INR_Refer


//===============================================================================
// Logon Test

//-------------------------------------------------------------------------------
function quick_refer()
{
    var w_Name = "PATIENT_358, Forename_341";

    // Logon as Nurse2
    Log_On(1);

    var INRstarV5 = set_system();

    Goto_Patient_Search();
    preset_Fetch_Patient(INRstarV5, w_Name)

    Goto_Patient_New_INR();
    add_inr_refer("2.5");

    // Refer Treatement
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientTabContent").Panel("PendingTreatmentContent");
    panelPTC.Panel(0).Button("ReferPendingTreatment").Click();
    
    // Log off Nurse2
    Log_Off()

    //-------------------------------------------------------------------------------
    
    // Logon Doctor2
    Log_On(2);
//    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMsgs = panelMCP.Panel("PatientTab").Panel("Messages").Fieldset(0).Panel("UserMessages");
    
    // Click the Referred Patient's Report
    panelMsgs.Link("ReferredPatientHeaderLink").Click();
    tableRP = panelMsgs.Panel("ReferredPatients").Table("ReferredPatientReportTable")
    
    // Find the row with the patient in
    for (i=1; i< tableRP.Rowcount; i++)
    {
        Log.Message(tableRP.Cell(i,0).Link(0).innerText + " i=" + i);
        if (tableRP.Cell(i,0).Link(0).innerText == w_Name)
        {
             tableRP.Cell(i, 0).Link(0).Click();
             i = tableRP.Rowcount;
        }
    }
    Goto_Patient_Treatment();
    
    // Accept Treatment
    var panelPTC = panelMCP.Panel("PatientTabContent").Panel("PendingTreatmentContent");
    panelPTC.Panel(0).Button("AcceptPendingTreatment").Click(); 
    WaitSeconds(1,""); 
    panelPTC.Panel(0).Button("AcceptPendingTreatment").Click();  

//    process_make_appointment_cancel(INRstarV5);
     
}