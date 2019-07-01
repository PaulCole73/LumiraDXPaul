//USEUNIT Navigation
//USEUNIT Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT Quick_Review_Dabigatran
//USEUNIT loggin

//USEUNIT Navigate_Patient
//USEUNIT Navigate_Admin_Dashboard

//These tests are for testing the home page messages//

//Step 1 log in
//Steps 2 creating the data
//Step 3 checking the home page

//==============================================================================

function release_section_3_home_page_messages()
{

Step_3_0_5();
Step_3_0_7();
Step_3_0_9();
Step_3_0_16();
Step_3_0_17();

}

//Test Step_3_0_5_View overdue a non wafarin review message
function Step_3_0_5()

{
log_on_cl3();
WaitSeconds(8);
var INRstarV5 = set_system();
var patName = quick_pat_regression();

quick_noac_treatmentPlan_Add();
cancel_review();
home_page();
check_message_overdue_noac_review();
log_off();
Log.Checkpoint("Login page - Log off INRstar TESTS_PASS")


// For validating the patient just added is on the list
//check_pat_on_message_overdue_noac_review(patName);
}

//Test Step_3_0_7_View the patient exceeded their treatment end date message
function Step_3_0_7()

{
log_on_cl3();

var INRstarV5 = set_system();
var patName = quick_pat_regression();

quick_warfarin_treatmentPlan_Add();
home_page();
check_message_exceeded_end_date();
log_off()
}


//Test Step_3_0_9_View_the_exceeded_suspension_period_message
function Step_3_0_9()

{
log_on_cl3();

var INRstarV5 = set_system();
var patName = quick_pat_regression();

suspend_patient();
home_page();


check_message_exceeded_suspension();


log_off()
}

//Test Step 3_0_10 Unsuspend a patient using the unsuspend button 



//Test Step_3_0_16_View the patients with incomplete treatment message
function Step_3_0_16()

{

log_on_cl2();

var INRstarV5 = set_system();
var patName = quick_pat_regression();
quick_warfarin_treatmentPlan_CL2_Add();
adding_historic_treatment();
adding_new_treatment();
check_message_incomplete_treatment();
log_off()
}

//Test Step_3_0_17_View the patients with no diagnosis or treatment plan message
function Step_3_0_17()

{

log_on_cl3();

var INRstarV5 = set_system();
var patName = quick_pat_regression();

home_page();
check_message_no_diag_or_no_treatment_plan();
log_off()
//This one validates the patient from the list
//check_pat_on_no_treatmentPlan(patName);
}

//==============================================================================

// Step 1 login

function log_on_cl2()
{
     log_on_regression("cl2@regression","INRstar_5");
}

function log_on_cl3()
{
    log_on_regression("cl3@regression","INRstar_5");
}

function log_on_cl3_regression2()
{
    log_on_regression("cl3@regression2","INRstar_5");
}

function log_on_clead()
{
     log_on_regression("clead@regression","INRstar_5");
}

//==============================================================================

//Step 2 Creating the data

//Adding the patient for test

function quick_pat_regression(INRstarV5)
{
    WaitSeconds(4,"Going to add a patient");
    var INRstarV5 = set_system();

   
    WaitSeconds(2)
    panel = INRstarV5.Panel("MainPage");
    panel.Panel("header").Link("MainPatientLink").Click();
    var panelMCP = panel.Panel("main").Panel("MainContentPanel")
    panelMCP.Panel("ManagePatients").Panel("PatientTab").Link("AddPatientDetailsTab").Click();
    
//Add minimum info to save patient, pat number, title, name, dob, line1, town, county    

   var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
   form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("PatientNumber").Text="AB_" + aqConvert.IntToStr(Math.floor(Math.random()*100000));
   form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Select("Title").ClickItem("Mr");
   var surname = "LESTER_" + aqConvert.IntToStr(Math.floor(Math.random()*10000));  
   form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text=surname;
   form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("Firstname").Text="Dean_" + aqConvert.IntToStr(Math.floor(Math.random()*10000));;
   //dob
   form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Image("calendar_png").Click();
   w_datepicker = INRstarV5.Panel("ui_datepicker_div");
   w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Aug");
   w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("1974");
   w_datepicker.Table(0).Cell(3, 3).Link(0).Click();
   //address
   form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text="Line 1";
   form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text="Town";
   form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text="County";
   form.Panel(0).SubmitButton("AddPatientDetails").Click();
   
   var patName=surname + ", " + "Dean";
   return patName;
   //Patient Created can do no treatment plan check here
}

//-------------------------------------------------------------------------------

//Create NOAC Treatment plan 
   
function quick_noac_treatmentPlan_Add()
{
    WaitSeconds(5,"About to go to Treatment Plan Tab");
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTPD = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");

    panelPTPD.Panel(0).Button("AddPatientTreatmentPlanLink").Click();

    //Add Treatment plan details in clinical screen
    WaitSeconds(5)
    var form = panelPTPD.Form("AddTreatmentPlanForm");
   
   //Plan start date  
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(0).Image("calendar_png").Click();
   
   x_datepicker = INRstarV5.Panel("ui_datepicker_div");
   x_datepicker.Panel(0).Panel(0).Select(1).ClickItem("2000");
   x_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jan");
   
   x_datepicker.Table(0).Cell(3, 3).Link(0).Click();
    
   //Diagnosis, Drug, and Duration
   
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(1).Select("DiagnosisSelected").ClickItem("Atrial fibrillation");
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(2).Select("DrugId").ClickItem("Dabigatran");
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(3).Select("TreatmentDuration").ClickItem("Indefinite");
   form.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();
   
//Treatment Plan Created
   
 WaitSeconds(2,"Saving the Treatment Plan");
}

//-------------------------------------------------------------------------------

//Create Warfarin Treatment plan as CL3 where you can change duration
   
function quick_warfarin_treatmentPlan_Add ()
{
    WaitSeconds(2,"About to go to Treatment Plan Tab");
    var INRstarV5 = set_system();

    Log.Message("Adding Treatment Plan");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTPD = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");

    panelPTPD.Panel(0).Button("AddPatientTreatmentPlanLink").Click();

    //Add Treatment plan details in clinical screen
    
    var form = panelPTPD.Form("AddTreatmentPlanForm");
   
   //Plan start date  
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(0).Image("calendar_png").Click();
   
   x_datepicker = INRstarV5.Panel("ui_datepicker_div");
   x_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jan");
   x_datepicker.Panel(0).Panel(0).Select(1).ClickItem("2000");
   x_datepicker.Table(0).Cell(3, 3).Link(0).Click();
    
   //Diagnosis, Drug, Duration, Dosing Method, Testing Method
   
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(1).Select("DiagnosisSelected").ClickItem("Atrial fibrillation");
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(2).Select("DrugId").ClickItem("Warfarin");
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(3).Select("TreatmentDuration").ClickItem("6 Weeks");

   WaitSeconds(2,"");

   // Confirming the change in duration

   var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
       Log.Message("'Confirm change of Duration' box displayed");
   wbt_Confirm.Click();
   
   var panelPTPI = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation");
   panelPTPI.Panel(0).Select("DosingMethod").ClickItem("Coventry Maintenance");

   // Process More Information window

   // Find out if the OK Button is on the screen
   var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", "Ok", "BUTTON");
     if (wb_Ok.Exists && wb_Ok.VisibleOnScreen == true)
       {
         Log.Message("'More information' box displayed");
         wb_Ok.Click();
       }
   
   panelPTPI.Panel(1).Select("TestingMethod").ClickItem("PoCT");
 
   //Save the TreatmentPlan
   
   form.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click(); 
   
   WaitSeconds(2,"Saving the Treatment Plan");  
}     

//-------------------------------------------------------------------------------

//Create Warfarin Treatment plan as CL2

function quick_warfarin_treatmentPlan_CL2_Add ()
{
    WaitSeconds(2,"About to go to Treatment Plan Tab");
    var INRstarV5 = set_system();

    Log.Message("Adding Treatment Plan");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTPD = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");

    panelPTPD.Panel(0).Button("AddPatientTreatmentPlanLink").Click();

    //Add Treatment plan details in clinical screen
    
    var form = panelPTPD.Form("AddTreatmentPlanForm");
   
   //Plan start date  
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(0).Image("calendar_png").Click();
   
   x_datepicker = INRstarV5.Panel("ui_datepicker_div");
   x_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jan");
   x_datepicker.Panel(0).Panel(0).Select(1).ClickItem("2000");
   x_datepicker.Table(0).Cell(3, 3).Link(0).Click();
    
   //Diagnosis, Drug, Dosing Method, Testing Method
   
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(1).Select("DiagnosisSelected").ClickItem("Atrial fibrillation");
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(2).Select("DrugId").ClickItem("Warfarin");
   
   WaitSeconds(2,"");

   
   var panelPTPI = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation");
   panelPTPI.Panel(0).Select("DosingMethod").ClickItem("Coventry Maintenance");

   // Process More Information window

   // Find out if the OK Button is on the screen
   var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", "Ok", "BUTTON");
     if (wb_Ok.Exists && wb_Ok.VisibleOnScreen == true)
       {
         Log.Message("'More information' box displayed");
         wb_Ok.Click();
       }
   
   panelPTPI.Panel(1).Select("TestingMethod").ClickItem("PoCT");
 
   //Save the TreatmentPlan
   
   form.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click(); 
   
   WaitSeconds(2,"Saving the Treatment Plan");  
}     

//-------------------------------------------------------------------------------

function adding_historic_treatment()

{

var INRstarV5 = set_system();

    Log.Message("Adding treatments for 3_0_16");
  
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");
    var panelTPW = panelPR.Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("TreatmentPlanWrapper");
    var panelPPT = panelTPW.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
    var panelTBC = panelPPT.Panel("TreatmentButtonsContainer").Fieldset("TreatmentButtons");
    
    //Adding the first historic treatment
    
    panelTBC.Button("AddHistoricalTreatment").Click();
    
    var panelPTNHW = panelPPT.Panel("PatientTreatmentNewHistoricalWrapper")
    var form = panelPTNHW.Form("NewHistoricalTreatmentForm")

    form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
    
    x_datepicker = INRstarV5.Panel("ui_datepicker_div");
    x_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jan");
    x_datepicker.Panel(0).Panel(0).Select(1).ClickItem("2013");
    x_datepicker.Table(0).Cell(3, 3).Link(0).Click();

    //INR
    form.Table("AddHistoricalTreatmentTable").Cell(1, 1).Select("INR").ClickItem("2.4");
    
    //Dose   
    form.Table("AddHistoricalTreatmentTable").Cell(1, 2).Select("Dose").ClickItem("2.2");
 
    //Omits
    form.Table("AddHistoricalTreatmentTable").Cell(1, 3).Select("Omits").ClickItem("0 Days");   
    
    //Review Days
    form.Table("AddHistoricalTreatmentTable").Cell(1, 4).Select("Review").ClickItem("7 Days");
    
    //Save the treatment
    form.Panel(0).SubmitButton("Save").Click();
    
    //Confirm the values
    var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
       Log.Message("'Confirm change of Duration' box displayed");
       wbt_Confirm.Click();
       
    WaitSeconds(2,"Saving the Treatment");  

}

//-------------------------------------------------------------------------------

function adding_new_treatment()

{

//Add the New INR
   
 var INRstarV5 = set_system();

    Log.Message("Adding treatments for 3_0_16");
  
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPR = panelMCP.Panel("PatientRecord");
   var panelTPW = panelPR.Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("TreatmentPlanWrapper");
   var panelPPT = panelTPW.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
   var panelTBC = panelPPT.Panel("TreatmentButtonsContainer").Fieldset("TreatmentButtons");
       
   panelTBC.Button("NewINR").Click();
   
   process_Please_acknowledge_maintenance(INRstarV5)
   
   var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
   var form = panelPTNIW.Form("NewINRForm");
   var panelPTMIQW = form.Panel("PatientTreatmentNewINRQuestionsWrapper");
   var panelPTNIC = panelPTMIQW.Panel("PatientTreatmentNewINRConfirm");  
   var panelTD = panelPTMIQW.Panel("PatientTreatmentNewINRTestDetails").Panel("testDetails")
   
   panelTD.Panel("poctDetails").Panel(1).Select("INR").ClickItem("2.5");
   panelTD.Panel("poctDetails").Panel(2).Select("TestingMethod").ClickItem("Lab");
   
   form.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
   
      //Confirm the values
    var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
       wbt_Confirm.Click();
//       
     // process_Please_acknowledge(INRstarV5);
   
   WaitSeconds(2,"Saving the Treatment");  
   
   // Referring the treatment
   
   var panelPTI = panelPPT.Panel("PendingTreatmentInfo");
   
   panelPTI.Panel(0).Button("ReferPendingTreatment").Click();
}
//-------------------------------------------------------------------------------

function adding_new_manual_treatment()

{

//Add the New INR
   
   var INRstarV5 = set_system();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPR = panelMCP.Panel("PatientRecord");
   var panelTPW = panelPR.Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("TreatmentPlanWrapper");
   var panelPPT = panelTPW.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
   var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
   var form = panelPTNIW.Form("NewINRForm");
   var panelPTMIQW = form.Panel("PatientTreatmentNewINRQuestionsWrapper");
   var panelPTNIC = panelPTMIQW.Panel("PatientTreatmentNewINRConfirm");
   var panelTD = panelPTMIQW.Panel("PatientTreatmentNewINRTestDetails").Panel("testDetails");
   
   panelTD.Panel(0).Select("Dose").ClickItem("2.5");
   panelTD.Panel(2).Select("Review").ClickItem("7 Days");
   panelTD.Panel("poctDetails").Panel(1).Select("INR").ClickItem("2.5");
   panelTD.Panel("poctDetails").Panel(2).Select("TestingMethod").ClickItem("Lab");
   
   form.Panel(0).SubmitButton("SubmitManualDose").Click();
   
      //Confirm the values
    var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
       wbt_Confirm.Click();
   
   WaitSeconds(2,"Saving the Treatment");  
   
   var panelPTI = panelPPT.Panel("PendingTreatmentInfo");
   panelPTI.Panel(0).Button("AcceptPendingTreatment").Click();
}
//-------------------------------------------------------------------------------

//Suspending a patient quick job

function suspend_patient()
{
var INRstarV5 = set_system();

    Log.Message("Suspending the patient");
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");
    var panelPT = panelPR.Panel("PatientTab");
    
    panelPT.Link("PatientManagementTab").Click();
    
    var panelPMTC = panelPR.Panel("PatientMainTabContent");
    var panelPMW = panelPMTC.Panel("PatientManagementWrapper");
    var panelPS = panelPMW.Panel("PatientStatus");

    panelPS.Panel(1).Button("SuspendPatientButton").Click();
    
    var form = panelPS.Form("SuspendPatientForm");
    
  //Picking todays date so they are on overdue list  
    var w_date = Date();
    Log.Message(w_date);

    var p_day = aqString.SubString(w_date,8,2);
    Log.Message(p_day);
    
    form.Panel(0).Image("calendar_png").Click();
    
    x_datepicker = INRstarV5.Panel("ui_datepicker_div");
    select_day(p_day, x_datepicker);
    
  //Picking the reason
  
    form.Panel(1).Select("SuspensionReasonId").ClickItem(1);
    
  //Save
         
    form.Panel(3).SubmitButton("Confirm").Click();
}
//-------------------------------------------------------------------------------

//Suspending a patient with validation

function suspend_patient_validate()
{
    var INRstarV5 = set_system();

    Log.Message("Suspending the patient");
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");
    var panelPT = panelPR.Panel("PatientTab");
    
    panelPT.Link("PatientManagementTab").Click();
    
    var panelPMTC = panelPR.Panel("PatientMainTabContent");
    var panelPMW = panelPMTC.Panel("PatientManagementWrapper");
    var panelPS = panelPMW.Panel("PatientStatus");
    panelPS.Panel(1).Button("SuspendPatientButton").Click();
    
    var form = panelPS.Form("SuspendPatientForm");
    
    var s_date = (aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (+190))));  // Over 6 months in the future   
    Log.Message(s_date);
    
     // Set the Suspend Date
      var w_day = aqString.SubString(s_date,0,2);
      var w_mth = aqConvert.StrToInt(aqString.SubString(s_date,3,2));
      var w_yr = aqString.SubString(s_date,6,4);
      
      form.Panel(0).Image("calendar_png").Click();
      w_datepicker = INRstarV5.Panel("ui_datepicker_div");
      w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
      w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
      
      Aliases.INRstarWindows.BrowserForm.INRstarBrowser.WebBrowserBaseNativeWindow.ShellDocObjectView.browser.Page("http://scsl.inrstar.test/").Panel("ui_datepicker_div").Table(0).Cell(3, 3).TextNode(0)
      
      select_day(w_day, w_datepicker);
    
    //----------------
    
//    wf_ok = (aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (+80))));  // 3 days
//    if (wf_ok == false)
//   
//          Log.Checkpoint("8.0.8 Correctly cannot suspend beyond 6 months in the future");
          
//    wf_ok = add_inr_backdated("2.5", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (+80))));  // 3 days
//    if (wf_ok == false)
//   
//          Log.Checkpoint("8.0.8 Correctly cannot suspend beyond 6 months in the future");
          
          //-----------------------------------
    
  //Picking todays date so they are on overdue list  
//    var w_date = Date();
//    Log.Message(w_date);
//
//    var p_day = aqString.SubString(w_date,8,2);
//    Log.Message(p_day);
//    
//    form.Panel(0).Image("calendar_png").Click();
//    
//    x_datepicker = INRstarV5.Panel("ui_datepicker_div");
//    select_day(p_day, x_datepicker);
//    
//  //Picking the reason
//  
//    form.Panel(1).Select("SuspensionReasonId").ClickItem(1);
//    
//  //Save
//         
//    form.Panel(3).SubmitButton("Confirm").Click();
}

//-------------------------------------------------------------------------------

//Cancelling the review for Step_3_0_5

function cancel_review()
{
var INRstarV5 = set_system();

    WaitSeconds(2);
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    WaitSeconds(2);
    var panelWRP = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent")
    
    panelWRP.Panel(0).Panel(0).Form("AddReviewForm").Panel(0).Panel("AnnualReviewAddActions").Button("CancelWarfarinReviewLink").Click();
}

//-------------------------------------------------------------------------------

//Navigate to Home 
function home_page(INRstarV5)
{
    var INRstarV5 = set_system();
    var panelM = INRstarV5.Panel("MainPage");
    panelM.Panel("header").Link("HomeLink").Click();
    
    WaitSeconds(4,"Waiting till home page is loaded");
}
    
//==============================================================================

// Step 3 Message checking

//Validating a message for the Patient loaded, need to adjust this for each message

function check_pat_on_message_overdue_noac_review(patName)

{
var INRstarV5 = set_system();

    Log.Message("Checking the review for 3_0_5");
    
    WaitSeconds(1,"Waiting for Home Page");
    
//    WaitSeconds(8,"Waiting for Overdue Report");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   
   // Open the overdue report list
   panelUCR.Link("OverdueReviewPatientHeaderLink").Click();
    WaitSeconds(1,"Opening non-warfarin Overdue Report");
    
 var table = panelUCR.Panel("OverdueReviewPatients").Table("PatientOverdueReviewReportTable");
 var wf_found = false;
    
for (i=0; i<table.rowcount -1; i++)
  {
         // Sys.HighlightObject(table.Cell(i, 0),3);
  
        if(table.Cell(i, 0).contentText==patName)
        {
               i = table.rowcount;
               wf_found = true;
        }
  }
if (wf_found == true )
               Log.Checkpoint("Found " + patName)
else 
               Log.Warning("Not Found " + patName)

}
//==============================================================================

function check_pat_on_transfer_list(patName)

{
    var INRstarV5 = set_system();

    Log.Message("Checking for patient" + " " + patName);
    WaitSeconds(1,"Waiting for Home Page");
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   
   // Open the transfer list
    panelUCR.Link("TransferredPatientHeaderLink").Click();
    WaitSeconds(1,"Opening transfer message");
    
    var table = panelUCR.Panel("TransferredPatients").Table("TransferredTable");
    var wf_found = false;
    var row_count
            
        for (i=0; i<table.rowcount; i++)
          {
                WaitSeconds(1)
  
                if(table.Cell(i, 0).contentText==patName)
                {
                       row_count = i;
                       wf_found = true;
                }
          }
        if (wf_found == true )
           
            Log.Checkpoint("Found " + patName) 
                 else 
                   Log.Warning("Not Found " + patName)
        
     return row_count                    
}

//==============================================================================

function check_pat_on_refer_list(patName)

{
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.Panel("UserTabContent").Panel("UserMessages").Panel("UserClinicalReports");
   
   // Open the refer list
    panelUCR.Link("ReferredPatientHeaderLink").Click();
    WaitSeconds(1,"Opening refer message");
    
    var table = panelUCR.Panel("ReferredPatients").Table("ReferredPatientReportTable");
    var wf_found = false;
    var row_count
            
    
        for (i=0; i<table.rowcount; i++)
          {
                WaitSeconds(1)
                if(table.Cell(i, 0).contentText==patName)
                {
                       row_count = i;
                       wf_found = true;
                }
          }
        if (wf_found == true )
           
            Log.Checkpoint("Found " + patName) 
                 else 
                   Log.Warning("Not Found " + patName)
        
     return row_count                    
}
//-------------------------------------------------------------------------------

//Validating a patient has been removed for the Unsuspend message 

function check_pat_on_suspended_message(patName)

{
var INRstarV5 = set_system();

    Log.Message("Checking the patient is removed for 3_0_10");
    
    WaitSeconds(1,"Waiting for Home Page");
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   
   // Open the suspended list
   panelUCR.Link("ExceededSuspendedPatientsViewModelPatientHeaderLink").Click();
    WaitSeconds(1,"Opening suspended message");
    
   var table = panelUCR.Panel("ExceededSuspendedPatients").Form("UnsuspendForm").Table("ExceededSuspendedPatientReportTable");
   var wf_found = false;
    
for (i=0; i<table.rowcount -1; i++)
  {
         // Sys.HighlightObject(table.Cell(i, 0),3);
  
        if(table.Cell(i, 0).contentText==patName)
        {
               i = table.rowcount;
               wf_found = true;
        }
  }
if (wf_found == true )
               Log.Checkpoint("Found " + patName)
else 
               Log.Warning("Not Found " + patName)

}

// Simple message check just clicking the message

function check_message_overdue_noac_review()

{
var INRstarV5 = set_system();

    Log.Message("Checking the message exists for 3_0_5");
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   
   // Open the list
   panelUCR.Link("OverdueReviewPatientHeaderLink").Click();
   
   Log.Checkpoint("Test 3.0.5 Non warfarin patient overdue a review message - TEST_PASS");
    
}

//-------------------------------------------------------------------------------

// Simple message check just clicking the message

function check_message_no_diag_or_no_treatment_plan()

{
var INRstarV5 = set_system();

    Log.Message("Checking the message exists for 3_0_17");
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   
   // Open the list
   panelUCR.Link("PatientsWithNoDiagnosisHeaderLink").Click();
   
   Log.Checkpoint("Home Page - View the Patients with no diagnosis or treatment plan message - TEST_PASS");
    
}

//-------------------------------------------------------------------------------

// Simple message check just clicking the message

function check_message_exceeded_end_date()

{
var INRstarV5 = set_system();

    Log.Message("Checking the message exists for 3_0_7");
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   
   // Open the list
   panelUCR.Link("ExceededPatientsHeaderLink").Click();
   
   Log.Checkpoint("Home Page - View the Patient exceeded their treatment end date message - TEST_PASS");
    
}

//-------------------------------------------------------------------------------

function check_message_incomplete_treatment()

{
var INRstarV5 = set_system();

    Log.Message("Checking the message exists for 3_0_9");
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   
   // Open the list
   panelUCR.Link(0).Click();
   
   Log.Checkpoint("Home Page - View the Patients with incomplete treatment message - TEST_PASS");
   
}

//-------------------------------------------------------------------------------

function check_message_exceeded_suspension()

{
var INRstarV5 = set_system();

    WaitSeconds(5)
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   
   // Open the list
   panelUCR.Link("ExceededSuspendedPatientsViewModelPatientHeaderLink").Click();
   
   Log.Checkpoint("Home Page - View the Exceeded suspension period message - TEST_PASS");
   
}

//------------------------------------------------------------------------------- 

//Run this for quick setup of patients on a list but change out what to run in the loop for the given message

function quick_patient_message_volume()
{
          var w_max = 100; // number of patients
          
                for (i=0; i<w_max; i++)
                {
                          quick_pat_regression();
                          quick_noac_treatmentPlan_Add();
                          cancel_review();
                          home_page();
                }
}

//-------------------------------------------------------------------------------

//Step 4 logoff

function log_off()
{
var INRstarV5 = set_system();
var panelLS = INRstarV5.Panel("MainPage").Panel("header").Panel("logindisplay").Panel("LoginStatus");

panelLS.Link("LogoutLink").Click();

WaitSeconds(5,"Waiting for Logout");

}

//-------------------------------------------------------------------------------

