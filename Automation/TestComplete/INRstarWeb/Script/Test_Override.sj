//USEUNIT Navigation
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Field_Tests
//USEUNIT Add_INR_Refer

//-------------------------------------------------------------------------------
function test_override()
{
    var w_Name = "Halifax, Edna";

    var INRstarV5 = set_system();

    Goto_Patient_Search();
    preset_Fetch_Patient(INRstarV5, w_Name)

    Goto_Patient_New_INR();
    add_inr_refer("2.5");

    // Override Treatement
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper")
    var panelPTI = panelPTW.Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");
    
    panelPTI.Panel(0).Button("OverridePendingTreatment").Click();
    var formEPT = panelPTI.Form("EditPendingTreatmentForm");
    var tableOST = formEPT.Table("OverrideSuggestedTreatmentTable");
    test_oride_dose(INRstarV5, formEPT, tableOST);

    panelPTI.Panel(0).Button("OverridePendingTreatment").Click();
    var formEPT = panelPTI.Form("EditPendingTreatmentForm");
    var tableOST = formEPT.Table("OverrideSuggestedTreatmentTable");
    test_oride_omits(INRstarV5, formEPT, tableOST);

    panelPTI.Panel(0).Button("OverridePendingTreatment").Click();
    var formEPT = panelPTI2.Form("EditPendingTreatmentForm");
    var tableOST = formEPT.Table("OverrideSuggestedTreatmentTable");
    test_oride_review(INRstarV5, formEPT, tableOST);
    
    panelPTI.Panel(0).Button("OverridePendingTreatment").Click();
    var formEPT = panelPTI.Form("EditPendingTreatmentForm");
    var tableOST = formEPT.Table("OverrideSuggestedTreatmentTable");
    test_oride_ntd(INRstarV5, formEPT, tableOST);

    // Now test if a single Schedule has been proposed or we need to choose one
    wf_no_exact = INRstarV5.NativeWebObject.Find("idStr", "DoseScheduleWarnings_ValidationSummary");
    if(wf_no_exact.Exists)
    {
       // Click the top Use button
       Log.Message("Clicking 1st 'Use' button");
       panelPTC.Panel("PendingTreatmentContent").Panel("DosingScheduleContent").Panel("ScheduleGrid").Table("ScheduleSelectorTable").Cell(1, 2).Button("Use").Click();
       WaitSeconds(1,"");
    }
    else
       Log.Message("Exact Schedule found");

    // Accept Treatment
    var panelPTC2 = panelMCP.Panel("PatientTabContent").Panel("PendingTreatmentContent");
    panelPTC2.Panel(0).Button("AcceptPendingTreatment").Click(); 

//    process_make_appointment_cancel(INRstarV5);
     
}