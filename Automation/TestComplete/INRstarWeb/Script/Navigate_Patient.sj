//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Popups
//USEUNIT System_Paths

//===============================================================================
//
//  Patient Navigation Routines
//
//-------------------------------------------------------------------------------
// Navigate to Patient Search
function Goto_Patient_Search()
{
    WaitSeconds(4,"Pause - Waiting for Patient Search");
    
    var INRstarV5 = set_system_login_page();

    panel = INRstarV5.Panel("MainPage");
    panel.Panel("header").Link("MainPatientLink").Click();

    WaitSeconds(2,"Pause - Waiting at Patient Search");
}
//-------------------------------------------------------------------------------
// Uncheck Active Patients Only
function Uncheck_Active_patients()
{
    var INRstarV5 = set_system();

    Log.Message("Unchecking Active Patients only");
    panel = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panel.Panel("PatientContent").Form("PatientSearchForm").Checkbox("active").ClickChecked(false);
}
//-------------------------------------------------------------------------------
// Navigate to Add Patient
function Goto_Add_Patient()
{
    WaitSeconds(4,"Going to Add Patient");
    var INRstarV5 = set_system_login_page();


    panel = INRstarV5.Panel("MainPage");
    panel.Panel("header").Link("MainPatientLink").Click();
    
    var panelMCP = panel.Panel("main").Panel("MainContentPanel")
    panelMCP.Panel("ManagePatients").Panel("PatientTab").Link("AddPatientDetailsTab").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Tests Due
function Goto_Tests_Due()
{
    var INRstarV5 = set_system();
    Log.Message("Navigating to Patient Search");
    panel = INRstarV5.Panel("MainPage");
    panel.Panel("header").Link("MainPatientLink").Click();

    var panelMCP = panel.Panel("main").Panel("MainContentPanel")
    panelMCP.Panel("ManagePatients").Panel("PatientTab").Link("TestDueTabLink").Click();
}
//-------------------------------------------------------------------------------
// Navigate to External Patient Lookup
function Goto_Patient_EPL()
{
    var INRstarV5 = set_system();

    Log.Message("Navigating to Patient EPL");
    panel = INRstarV5.Panel("MainPage");
    panel.Panel("header").Link("MainPatientLink").Click();

    var panelMCP = panel.Panel("main").Panel("MainContentPanel")
    panelMCP.Panel("ManagePatients").Panel("PatientTab").Link("ExternalPatientLookupTabLink").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Edit Patient Demographics
function Goto_Patient_Demographics()
{
    var INRstarV5 = set_system();
    Log.Message("Navigating to Patient Demographics");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");
    // Click on Details Tab
    panelPR.Panel("PatientTab").Link("PatientDemographicsTab").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Edit Patient  Demographics
function Goto_Edit_Patient_Demographics()
{
    WaitSeconds(4,"Going to Edit Patient Demographics");
    var INRstarV5 = set_system();

    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");
    // Click on Details Tab
    panelPR.Panel("PatientTab").Link("PatientDemographicsTab").Click();
    
    // Go to Edit Details
    var panelPMTC = panelPR.Panel("PatientMainTabContent")
    var panelPDW = panelPMTC.Panel("PatientTabContent").Panel("PatientDetailsWrapper")
    panelPDW.Panel(0).Button("EditPatientDetailsLink").Click();
    
    var w_stem = panelPR.Panel("PatientMainTabContent");
    
    return w_stem;
}
//-------------------------------------------------------------------------------
// Navigate to Patient Management
function Goto_Patient_Management()
{
// function to simply open the patient management tab inside patient (not test the contents)
// written by Paul Tierney Jan 2014

    Log.Message("Navigating to Patient Management");
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");

    panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientManagementTab").Click();
    
    
//    //w_address_stem = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper");
//    w_address_stem = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper");
//    WaitSeconds(1,"Gathering field address stem");
//    return(w_address_stem);      
}
//----------------------------------------------------------------------------------------------------
function Goto_Patient_Management_Edit(INRstarV5)
{
// function to simply open the patient management tab inside patient (not test the contents)

    Log.Message("Navigating to Patient Management");
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");

    panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientManagementTab").Click();
    
    var panelPP = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper").Panel("PatientPreferences")

    WaitSeconds(2,"Clicking on Edit");
        
    // click on the Edit button
   panelPP.Panel(0).Button("EditPatientManagementLink").Click(); 
     
}
//-------------------------------------------------------------------------------
// Navigate to Patient Management
function Goto_Self_Care()
{
// function to simply open the patient management tab inside patient (not test the contents)
// written by Paul Tierney Jan 2014

    Log.Message("Navigating to Self Care");
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");

    panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientSelfCaringTab").Click();
    
}
//-------------------------------------------------------------------------------
// Navigate to Recently Viewed Patient List
function Goto_Recently_Viewed()
{

    WaitSeconds(4,"Going to Recently Viewed");
    var INRstarV5 = set_system();
    Log.Message("Navigating to Recently Viewed");
    panel = INRstarV5.Panel("MainPage");
    panel.Panel("header").Link("MainPatientLink").Click();
    
    var panelMCP = panel.Panel("main").Panel("MainContentPanel")
    panelMCP.Panel("ManagePatients").Panel("PatientTab").Link("RecentPatientsTabLink").Click();

}
//===============================================================================
//
// Treatment Plan Navigation
//
//===============================================================================

//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan
function Goto_Patient_TreatmentPlan()
{
    WaitSeconds(2,"About to go to Treatment Plan Tab");

    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");
    // Click onPatient Treatment Tab
    WaitSeconds(1)
    panelPR.Panel("PatientTab").Link("PatientTreatmentPlanTab").Click();
   
    var panelPMTC = panelPR.Panel("PatientMainTabContent");
     
    // Click on Clinical Details Sub Tab
    panelPMTC.Panel("TreatmentPlanSubTab").Panel("PatientTreatmentPlanTabSubMenu").Link("PatientTreatmentPlanTab").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Add - If no prior treatment plan exists as the path will be different otherwise
function Goto_Patient_TreatmentPlan_Add()
{
    WaitSeconds(2,"About to go to Treatment Plan Tab");

    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");
    
    // Click onPatient Treatment Tab
    panelPR.Panel("PatientTab").Link("PatientTreatmentPlanTab").Click();
   
    var panelPMTC = panelPR.Panel("PatientMainTabContent");
     
    // Click on Clinical Details Sub Tab
    panelPMTC.Panel("TreatmentPlanSubTab").Panel("PatientTreatmentPlanTabSubMenu").Link("PatientTreatmentPlanTab").Click();
    
    // Go to Add Details
    panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Panel(0).Button("AddPatientTreatmentPlanLink").Click();
    
    WaitSeconds(2,"Going to Patient Treatment Plan Add");
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Add - If a treatment plan exists
function Goto_Patient_TreatmentPlan_Add_more_1_treatmentPlan()
{
    WaitSeconds(2,"About to go to Treatment Plan Tab");

    var INRstarV5 = set_system();

    // Log.Message("Navigating to Patient, Treatment Plan, Add");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");
    // Click onPatient Treatment Tab
    panelPR.Panel("PatientTab").Link("PatientTreatmentPlanTab").Click();
   
    var panelPMTC = panelPR.Panel("PatientMainTabContent");
     
    // Click on Clinical Details Sub Tab
    panelPMTC.Panel("TreatmentPlanSubTab").Panel("PatientTreatmentPlanTabSubMenu").Link("PatientTreatmentPlanTab").Click();
    
    // Go to Add Details
    panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Panel(1).Button("AddPatientTreatmentPlanLink").Click();
    
    //Confirming add new treatment plan pop up
    process_button(INRstarV5, "Confirmation Required", "Confirm") ;
    WaitSeconds(2,"Going to Patient Treatment Plan Add");
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Change Diagnosis
function Goto_Patient_TreatmentPlan_Change_Diagnosis()
{
    WaitSeconds(2,"Going to Patient Treatment Plan Change Diagnosis");
        
    var INRstarV5 = set_system();

    Log.Message("Navigating to Patient, Treatment Plan, Edit");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");
    // Click on Treatment Plan Tab
    panelPR.Panel("PatientTab").Link("PatientTreatmentPlanTab").Click();
    
    WaitSeconds(1,"Clicking 'Change Diagnosis'");
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Edit
function Goto_Patient_TreatmentPlan_Edit(INRstarV5)
{

    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");

    // Click on Patient Treatment Tab -----------------------------------------------------------
    panelPR.Panel("PatientTab").Link("PatientTreatmentPlanTab").Click();
     
    WaitSeconds(2,"About to go to Treatment Plan Details Tab");

    // Click on Clinical Details Sub Tab ---------------------------------------------------------
    var panelPMTC = panelPR.Panel("PatientMainTabContent");
    var panelPTPTSM = panelPMTC.Panel("TreatmentPlanSubTab").Panel("PatientTreatmentPlanTabSubMenu");
    panelPTPTSM.Link("PatientTreatmentPlanTab").Click();
    
    WaitSeconds(1,"Clicking 'Edit Plan Details'");
        
    // Click on Edit Button --------------------------------------------------------------------------
    var panelPCW = panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper")
    var panelPCD = panelPCW.Panel("PatientTreatmentPlanDetails");
    panelPCD.Panel(0).Button("EditPatientTreatmentPlanLink").Click();
   
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Edit with existing treatment plan
function Goto_Patient_TreatmentPlan_Edit_Existing_Plan()
{

    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");
    
    WaitSeconds(2,"About to go to Treatment Plan Details Tab");

    // Click on Patient Treatment Tab -----------------------------------------------------------
    panelPR.Panel("PatientTab").Link("PatientTreatmentPlanTab").Click();
     
    WaitSeconds(2,"About to go to Treatment Plan Details Tab");

    // Click on Clinical Details Sub Tab ---------------------------------------------------------
    var panelPMTC = panelPR.Panel("PatientMainTabContent");
    var panelPTPTSM = panelPMTC.Panel("TreatmentPlanSubTab").Panel("PatientTreatmentPlanTabSubMenu");
    panelPTPTSM.Link("PatientTreatmentPlanTab").Click();
    
    WaitSeconds(1,"Clicking 'Edit Plan Details'");
        
    // Click on Edit Button --------------------------------------------------------------------------
    var panelPCW = panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper")
    var panelPCD = panelPCW.Panel("PatientTreatmentPlanDetails");
    panelPCD.Panel(1).Button("EditPatientTreatmentPlanLink").Click();
   
}
//================================================================================
//
// INR Treatment Navigation
//
//-------------------------------------------------------------------------------
// Navigate to Patient New INR
function Goto_Patient_New_INR()
{
    var INRstarV5 = set_system();

    Goto_Patient_Treatment();

    WaitSeconds(1, "Going to  New INR");
        
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
    panelPPT.Panel("TreatmentButtonsContainer").Fieldset("TreatmentButtons").Button("NewINR").Click();
    
//    WaitSeconds(3,"Waiting for New INR page");
        
    process_Please_acknowledge_maintenance(INRstarV5);
    
}
//-------------------------------------------------------------------------------
// Navigate to Patient New Initiate INduction

function Goto_Patient_New_Initiate()
{
    var INRstarV5 = set_system();

    Goto_Patient_Treatment();

    WaitSeconds(1, "Going to  New INR");
        
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
    panelPPT.Panel("TreatmentButtonsContainer").Fieldset("TreatmentButtons").Button("NewINR").Click();
    }
    
//-------------------------------------------------------------------------------

// Navigate to Patient / Treatment
function Goto_Patient_Treatment()
{
    WaitSeconds(3,"Going to Patient, Treatment History");

    var INRstarV5 = set_system();

    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPT = panelMCP.Panel("PatientRecord").Panel("PatientTab");
    panelPT.Link("PatientTreatmentPlanTab").Click();

   WaitSeconds(2,"Going to Patient Treatments");
   
    var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
    var panelPTPTSM = panelPMTC.Panel("TreatmentPlanSubTab").Panel("PatientTreatmentPlanTabSubMenu");
    panelPTPTSM.TextNode(0).TextNode(0).Link("TreatmentItem").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Treatment Plan / INR Treatments / Add Historical Treatment
function Goto_Add_Historical()
{
      var INRstarV5 = set_system();

      Goto_Patient_Treatment();
      
      WaitSeconds(2,"Waiting to go to Add Historical");

      var w_hdg = "AddHistoricalTreatment";
  
      // Find the 'Add Historical' button
      var wbt_add = INRstarV5.NativeWebObject.Find("idStr", w_hdg);
      if (wbt_add.Exists == false)
      {
             Log.Warning("'" + w_hdg + "' button not displayed");
      }
      else
      {
//         Log.Message("'" + w_hdg + "' button displayed");
         // Click the button
            wbt_add.Click();
            
            WaitSeconds(2,"Waiting after going to Add Historical");
      }
}

//================================================================================
//
// Reviews Navigation
//
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Reviews
function Goto_Patient_TreatmentPlan_Review()
{
    WaitSeconds(2,"About to go to Treatment Plan/ Reviews Tab");

    var INRstarV5 = set_system();

    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");
    // Click on Patient Treatment Tab
    panelPR.Panel("TreatmentPlanSubTab").Panel("PatientTreatmentPlanTabSubMenu").Link("PatientReviewTab").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Reviews
function Goto_Patient_TreatmentPlan_Review_New()
{
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPT = panelMCP.Panel("PatientRecord").Panel("PatientTab");
    panelPT.Link("PatientTreatmentPlanTab").Click();

    Goto_Patient_TreatmentPlan_Review();
    
    WaitSeconds(2,"About to go to Treatment Plan/ Reviews/New Review");

    var INRstarV5 = set_system();

    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    // Click on Patient Treatment Tab / Review / New Review Button
    panelPTC.Panel("AnnualReviewWrapper").Panel("AnnualReviewActions").Button("AddWarfarinReviewLink").Click();
}
//================================================================================
//
// Appointment Navigation
//
//-------------------------------------------------------------------------------
// Navigate to Make Appointment
function Goto_Make_Appointment()
{
    var INRstarV5 = set_system();

    WaitSeconds(1.5, "Going to Make Appointment");
        
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
    
    panelPPT.Panel("TreatmentButtonsContainer").Fieldset("AppointmentButtons").Button("MakeAppointment").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Move Appointment
function Goto_Move_Appointment()
{
    var INRstarV5 = set_system();

//    Goto_Patient_Treatment();

    WaitSeconds(1.5, "Going to Make Appointment");
        
    Log.Message("Navigating to Patient, New INR");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPPT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
    
    panelPPT.Panel("TreatmentButtonsContainer").Fieldset("AppointmentButtons").Button("MakeAppointment").Click();
}
//================================================================================
//
// Subsiduary Patient Navigation
//
//-------------------------------------------------------------------------------
// Navigate to Patient / Notes
function Goto_Patient_Notes()
{

   Log.Message("Navigating to Patient, Notes");
   WaitSeconds(1,"Going to  Patient Notes");
    
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientNotesTab").Click();
    //.panelPatientrecord.Panel("PatientTab").Link("PatientNotesTab")

    
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Adverse Events
function Goto_Patient_Adverse_Events()
{
  try
  {
    var INRstarV5 = set_system();

    Log.Message("Navigating to Patient, Adverse Event");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientAdverseEventTab").Click();
        
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Letters
function Goto_Patient_Letters()
 {
    var INRstarV5 = set_system();

    Log.Message("Navigating to Patient, Goto Patient Letters");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientLettersTab").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Summary
function Goto_Patient_Summary()
{
    var INRstarV5 = set_system();

    Log.Message("Navigating to Patient, Summary");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientSummaryTab").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Audit
function Goto_Patient_Audit()
{
    var INRstarV5 = set_system();
    WaitSeconds(1);
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientAuditTraiTab").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Treatment / Audit

function Goto_Patient_Treatment_Audit()
{
   Goto_Patient_Treatment();

   var INRstarV5 = set_system();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
   var panelTPW = panelPMTC.Panel("PatientTabContent").Panel("TreatmentPlanWrapper");
   var panelPTH = panelTPW.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
   var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
   
   
   var w_over6 = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapperOverSix");
   if (w_over6.Exists == true)
               var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix");
    else
             var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper")
   //var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix")
   var table = panelVPHTW.Table("PatientTreatmentHistoryTable");

   w_row = table.Rowcount - 1;

   // Click last treatment's information link
   table.Cell(w_row,10).Link("TreatmentInformationActionLink").Click(); 
   
   // Click Audit 
   INRstarV5.Panel(1).Panel(1).Panel(0).Button(1).Click();
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Change Registered Location
function Goto_Change_Registered_Location()
{
    var INRstarV5 = set_system();

    Log.Message("Navigating to Patient / Change Registered Location");
    panel = INRstarV5.Panel("MainPage");
    panel.Panel("header").Link("MainPatientLink").Click();
    
    var panelMCP = panel.Panel("main").Panel("MainContentPanel")
    panelMCP.Panel("ManagePatients").Panel("PatientTab").Link("ChangePatientLocationTabLink").Click();
}
//===============================================================================
//-------------------------------------------------------------------------------
// Navigate to Last Treatment  / Audit
function Goto_Last_Treatment_Audit(INRstarV5)
{
 Goto_Patient_Treatment();
 
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
  var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
  
  if (panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Exists == true)
  {
     var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Table("PatientTreatmentHistoryTable")
      } 
  else
  {
  var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable")
  var w_row = wt_treatments.Rowcount - 1;
  wt_treatments.Cell(w_row,10).Link("TreatmentInformationActionLink").Click();
  // click on View Audit Trail button
  INRstarV5.Panel(1).Panel(1).Panel(0).Button(1).Click();
}
}
