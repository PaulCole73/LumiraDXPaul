//USEUNIT Navigation
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common
//USEUNIT Common
//USEUNIT Add_INR_Refer
//USEUNIT Add_INR_Override_2
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Popups

//===============================================================================
// Create Patient, Patient Treatment Plan, Review & Historical Record

// Patient Driver Fields
//  0 - Run Indicator
//  1 - Title
//  2 - Surname
//  3 - Forename
//  4 - Address 1
//  5 - Addr 2
//  6 - Addr 3
//  7 - Town
//  8 - County
//  9 - Post Code
// 10 - DOB DD
// 11 - DoB MM
// 12 - DoB YY
// 13 - Gender
// 14 - NHS Number
// 15 - Active

// Treatment Plan Fields

// 16 - Diagnosis
// 17 - Target
// 18 - 5mg
// 19 - 3mg
// 20 - 1mg
// 21 - 0.5mg
// 22 - Split Tabs
// 23 - Protocol
// 24 - Last INR DD
// 25 - Last INR MMM
// 26 - Last INR YYYY
// 28 - Drug
// 29 - Duration

//Review Fields

// 32 - If the review should be cancelled or not
// 33 - Day of review
// 34 - Month of review
// 35 - Year of Review
// 36 - Review date not included this is just for ease of use for spreadsheet
// 37 - Compliance
// 38 - CHADS2
// 39 - HAS-BLED
// 40 - Weight
// 41 - Creatinine
// 42 - ALT
// 43 - Haemoglobin
// 44 - Dose
// 45 - Clinical Note
// 46 - Day of next review date
// 47 - Month of next review date
// 48 - Year of next review date
// 49 - Next Review date not included this is just for ease of use for spreadsheet

//-------------------------------------------------------------------------------
function quick_run()
{
  var w_run = "02";
  add_and_validate_patient_demographics(w_run);
//  add_patient_clinical(w_run);
//    add_patient_treatments(w_run);
}

function add_and_validate_patient_demographics(p_run)
{
    var w_nhs;
    
    // Read input file
//  driver = DDT.ExcelDriver("Y:\\TestComplete_Data\\Treatments03.xls","Treatments");
    driver = DDT.ExcelDriver("Q:\\Development and Testing\\Testing\\TestComplete_Test_Data\\Patients"+p_run+".xls","Patient"+p_run);
    

    // for each record, call the create process
    while (!driver.EOF())
    {
     if (driver.Value(0) == "Y"+p_run)
     {
         Goto_Add_Patient();
         
         w_nhs = quick_pt_demographics(driver);
         
         WaitSeconds(2,"");
         
         // Write the details out
         var w_mess = "Patient added," + driver.Value(1) + " " + driver.Value(3) + " " + driver.Value(2);
   
         Log.Message(w_mess);
         
         process_confirm_duplicate_patient(set_system());
         
      }
      // Next record
      driver.Next();      
    }
//    DDT.CloseDriver("d:\\Test_Data\\Patients"+p_run+".xls");
}
//-------------------------------------------------------------------------------
function quick_pt_demographics(driver)
{
    Log.Message("------ " + driver.Value(2));

    var INRstarV5 = set_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
//    var form = panelMCP.Panel("ManagePatients").Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Textbox("NHSNumber").Text = driver.Value(14);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Select("Title").ClickItem(driver.Value(1));

    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text = driver.Value(2);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text = driver.Value(3);

    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Image("calendar_png").Click();
    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(driver.Value(11));
    WaitSeconds(1,"");
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(12)));
    select_day(driver.Value(10), w_datepicker);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(6).Select("Sex").ClickItem(driver.Value(13))
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(7).Select("Gender").ClickItem(driver.Value(13));

    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text = driver.Value(4);
    if ((driver.Value(5) != "") && (driver.Value(5) != null))
       form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(1).Textbox("SecondLineAddress").Text = driver.Value(5);
    if ((driver.Value(6) != "") && (driver.Value(6) != null))
       form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(2).Textbox("ThirdLineAddress").Text = driver.Value(6);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text = driver.Value(7);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text = driver.Value(8);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(5).Textbox("Postcode").Text = driver.Value(9);
    
    //No longer works as it has moved so commented out DL
    //form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(9).Select("ClinicianId").ClickItem(1);

    
    form.Panel(0).SubmitButton("AddPatientDetails").Click();
}
//-------------------------------------------------------------------------------
function deactivate_patient()
{
    Goto_Patient_Clinical();
    
    var INRstarV5 = set_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientTabContent")
    
    // Click De-activate button
    panelPTC.Fieldset(1).Panel(0).Button("De_activatePatientButton").Click();
    formDP = panelPTC.Fieldset("DeactivatePatient").Form("DeactivatePatientForm");
    
    // Select Reason
    formDP.Panel(0).Select("InactiveReason").ClickItem("Other");
    
    // Add notes
    formDP.Panel(1).Textarea("Notes").Value = "Set Inactive on creation";
    
    // Deactivate
    formDP.Panel(2).SubmitButton("Confirm").Click();
    
         
}
//===============================================================================
//function add_patient_clinical(p_run)
//{
//    var w_nhs;
//    
//     Read input file
//    driver = DDT.ExcelDriver("Y:\\TestComplete_Data\\Patients"+p_run+".xls","Patients"+p_run);
//
//     for each record, call the create process
//    while (!driver.EOF())
//    {
//     Log.Message("Start Date " + driver.Value(27));
//     
//     if (driver.Value(0) == "Y"+p_run && driver.Value(27) != null)
//     {
//         Write the details out
//        var w_mess = "Clinical details," + driver.Value(1) + " " + driver.Value(3) + " " + driver.Value(2);
//        Log.Message("-------------------------------" + w_mess);
//   
//        var INRstarV5 = set_system();
//        Goto_Patient_Search();
//        preset_Fetch_Patient_NHS(INRstarV5, driver.Value(14));
//        
//        Goto_Patient_Clinical_Add();
//         
//        quick_pt_clinical(driver);
//
//      }
//       Next record
//      driver.Next();      
//    }
//    DDT.CloseDriver("d:\\Test_Data\\Patients"+p_run+".xls");
//}
//-------------------------------------------------------------------------------
//function quick_pt_clinical(driver)
//{
//    var INRstarV5 = set_system();
//    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
//    var panelPCD = panelPTC.Panel("PatientClinicalWrapper").Panel("PatientClinicalDetails");
//    var form = panelPCD.Form("AddClinicalRecordForm");
//    var panelEPCI = form.Panel("EditPatientClinicalInformation");
//    
//    panelEPCI.Panel(0).Image("calendar_png").Click();
//    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
//    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(driver.Value(25))); // Month
//    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(26))); // Year
//    select_day(driver.Value(24), w_datepicker); // Day
//    
//    panelEPCI.Panel(1).Select("DiagnosisId").ClickItem(driver.Value(16));
//    // Set Dosing Method
//    if (driver.Value(23) == "I")
//       panelEPCI.Panel(2).Select("DosingMethod").ClickItem("Induction Slow");
//    if (driver.Value(23) == "C")
//       panelEPCI.Panel(2).Select("DosingMethod").ClickItem("Coventry Maintenance");
//    // Acknowledge Dosing More Info window
//    process_more_information(INRstarV5);  
//     
//    panelEPCI.Panel(3).Select("TestingMethod").ClickItem("PoCT");
//    panelEPCI.Panel(4).Select("MaxReview").ClickItem("70 Days");
//    
//    // Set Tablets
//    var panelEPCTS = form.Panel("EditPatientClinicalTabletSelection");
//
//    panelEPCTS.Panel(0).Checkbox("NPSA").ClickChecked(false);    
//    set_cbx(panelEPCTS.Panel(1).Checkbox("Tablets_Use5"),driver.Value(18));
//    set_cbx(panelEPCTS.Panel(2).Checkbox("Tablets_Use3"),driver.Value(19));
//    set_cbx(panelEPCTS.Panel(3).Checkbox("Tablets_Use1"),driver.Value(20));
//    set_cbx(panelEPCTS.Panel(4).Checkbox("Tablets_UseHalf"),driver.Value(21));
//    set_cbx(panelEPCTS.Panel(5).Checkbox("Tablets_UseSplit"),driver.Value(22));
//    
//    // Update details
//    form.Panel("PatientClinicalInformation").SubmitButton("AddPatientClinical").Click();

//}


//===============================================================================
function add_treatment_plan(driver)

{
WaitSeconds(2,"About to go to Treatment Plan Tab");
    var INRstarV5 = set_system();

    Log.Message("Adding Treatment Plan");
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTPD = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");

    WaitSeconds(2,"");
    
    panelPTPD.Panel(0).Button("AddPatientTreatmentPlanLink").Click();

    //Add Treatment plan details in clinical screen
    
    var form = panelPTPD.Form("AddTreatmentPlanForm");
   
   //Plan start date  
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(0).Image("calendar_png").Click();
   
   x_datepicker = INRstarV5.Panel("ui_datepicker_div");
   x_datepicker.Panel(0).Panel(0).Select(0).ClickItem(driver.Value(25));
   WaitSeconds(1,"");
   x_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(26)));
   select_day(driver.Value(24), w_datepicker);
    
   //Diagnosis, Drug, and Duration
   
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(1).Select("DiagnosisSelected").ClickItem(driver.Value(16));
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(2).Select("DrugId").ClickItem(driver.Value(28));
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(3).Select("TreatmentDuration").ClickItem(driver.Value(29));
   form.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();
   
//Treatment Plan Created
   
 WaitSeconds(2,"Saving the Treatment Plan");

}

//===============================================================================
function add_review(driver)

    { 
          var INRstarV5 = set_system();
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
          var panelWRAP = panelPTC.Panel("WarfarinReviewAddPanel");
          var form = panelWRAP.Form("AddReviewForm");
          var panelWRSP = form.Panel("WarfarinReviewSummaryPanel");
          var panelRHSP = form.Panel("RHSPanel")
    
          Log.Message("Adding New Review");

          // Set Review Date - Dont need to do this yet

      //   panelWRSP.Panel("ReviewDate").Image("calendar_png").Click();
      //   x_datepicker = INRstarV5.Panel("ui_datepicker_div");
      //   x_datepicker.Panel(0).Panel(0).Select(0).ClickItem(driver.Value(25));
      //   WaitSeconds(1,"");
      //   x_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(26)));
      //   select_day(driver.Value(24), w_datepicker);
  
           //Set Compliance
          var panelQC = panelWRSP.Panel("Warfarin_Compliance").Panel("Question_Compliance");
          panelQC.Table(0).Cell(2, 1).RadioButton("Question1_Compliance2").checked = "true";
    
          //Set Risk Assesment
          var panelWRA = panelWRSP.Panel("Warfarin_RiskAssessment");
          panelWRA.Table("Warfarin_RiskAssessment_Table").Cell(0, 0).Panel("Question_Chads2Vasc").Select("reviewAnswers_2_value").ClickItem(driver.Value(38));
          panelWRA.Table("Warfarin_RiskAssessment_Table").Cell(0, 1).Panel("Question_HasBled").Select("reviewAnswers_3_value").ClickItem(driver.Value(39));
    
          //Set Test Results
          var panelWTRP = panelRHSP.Panel("WarfarinTestResultsPanel");
          panelWTRP.Panel("Question_TR_Weight").Textbox("TR_Weight").Value = (driver.Value(40));
          panelWTRP.Panel("Question_TR_Creatinine").Textbox("TR_Creatinine").Value = (driver.Value(41));
    
          WaitSeconds(2,"waiting for button to become enabled");
    
          //panelWTRP.Panel("Question_TR_CreatinineClearance").Button("TR_CreatinineClearance_Button").Click();
          panelWTRP.Panel("Question_TR_ALT").Textbox("TR_ALT").Value = (driver.Value(42));
          panelWTRP.Panel("Question_TR_Haemoglobin").Textbox("TR_Haemoglobin").Value = (driver.Value(43));
    
          WaitSeconds(2,"");
    
          //Set Dosing
          var panelRDP = panelRHSP.Panel("ReviewDosePanel"); 
          panelRDP.Panel("Question_Dose").Select("reviewAnswers_9_value").ClickItem(driver.Value(44));
    
          //Set Clinical Review Notes
          var panelWRCP = panelRHSP.Panel("WarfarinReviewClinicalPanel");
          panelWRCP.Textarea("Note").Value = (driver.Value(45));
    
          //Set Next Review Date
    
          var panelNRD = panelRHSP.Panel("WarfarinNextReviewDatePanel");
          panelNRD.Panel("NextReviewDate").Image("calendar_png").Click();
          
           x_datepicker = INRstarV5.Panel("ui_datepicker_div");
           x_datepicker.Panel(0).Panel(0).Select(0).ClickItem(driver.Value(47));
           WaitSeconds(1,"");
           x_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(48)));
           select_day(driver.Value(46), w_datepicker);
    
           //Save the review
           var panelARAA = form.Panel("AnnualReviewAddActions").Button("SaveWarfarinReviewLink").Click(); 
  }
//===============================================================================


function add_patient_treatments(p_run)
{
    var w_nhs;
    
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Treatments"+p_run+".xls","Treatments"+p_run);

    // for each record, call the create process
    while (!driver.EOF())
    {
     if (driver.Value(0) == "Y"+p_run)
     {
        var INRstarV5 = set_system();
        Goto_Patient_Search();
        Log.Message("********** Patient " + driver.Value(1));
        preset_Fetch_Patient_NHS(INRstarV5, driver.Value(1));
                
        Goto_Add_Historical()
        quick_pt_historical(6);

        if (driver.Value(16) != null)
        {
            insert_treatment(16);
        }
        if (driver.Value(23) != null)
        {
            insert_treatment(23);
        }
        if (driver.Value(30) != null)
        {
            insert_treatment(30);
        }
        if (driver.Value(37) != null)
        {
            insert_treatment(37);
        }
        if (driver.Value(44) != null)
        {
            insert_treatment(44);
        }
        if (driver.Value(51) != null)
        {
            insert_treatment(51);
        }
        if (driver.Value(58) != null)
        {
            insert_treatment(58);
        }
           
           
         // Write the details out
         var w_mess = "Clinical details," + driver.Value(1) + " " + driver.Value(3) + " " + driver.Value(2);
   
         Log.Message(w_mess);
      }
      // Next record
      driver.Next();      
    }
//    DDT.CloseDriver("d:\\Test_Data\\Treatments"+p_run+".xls");
}
//-------------------------------------------------------------------------------
function insert_treatment(p_num)
{
    w_type = check_which_type(driver.Value(p_num-4));
    if (w_type == "H")
    {
      Goto_Add_Historical()
      quick_pt_historical(p_num-3);
    }
    else
    {
      Goto_Patient_New_INR();
      add_inr_override(driver.Value(p_num),driver.Value(p_num-3),driver.Value(p_num-2),driver.Value(p_num-1), driver.Value(62));
    }
}
//-------------------------------------------------------------------------------
function check_which_type(p_date)
{
  var w_type;
  var w_prev_date =  aqDateTime.AddDays(aqDateTime.Today(), -43); // Why 43 days ???
  var w_test_date = p_date;
  
  if ( w_prev_date > w_test_date)
    w_type = "H";
  else
    w_type = "T";

  Log.Message(w_prev_date + ", " + p_date + ", " + w_type);
  return w_type;
}
//-------------------------------------------------------------------------------
function quick_pt_historical(p_start)
{
    // p_start is the starting point for the driver file, in increments of 7, min val = 6
    var w_date  =  driver.Value(p_start) + "/" + driver.Value(p_start+1) + "/" + aqConvert.FloatToStr(driver.Value(p_start+2));
    Log.Message("----- Adding historical treatment for " + driver.Value(2) + " - " + w_date);
    
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
//    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTab").Panel("PatientTabContent");
    var panelPTC2 = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment").Panel("PatientTreatmentNewHistoricalWrapper");
    var formNHT = panelPTC2.Form("NewHistoricalTreatmentForm");

    formNHT.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(driver.Value(p_start+1)));
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(p_start+2)));
    select_day(driver.Value(p_start), w_datepicker);

    formNHT.Table("AddHistoricalTreatmentTable").Cell(1, 1).Select("INR").ClickItem(FloatToString(driver.Value(p_start+3)));
    formNHT.Table("AddHistoricalTreatmentTable").Cell(1, 2).Select("Dose").ClickItem(FloatToString(driver.Value(p_start+4)));
    formNHT.Table("AddHistoricalTreatmentTable").Cell(1, 3).Select("Review").ClickItem(driver.Value(p_start+5)+" Days");
    formNHT.Table("AddHistoricalTreatmentTable").Cell(1, 4).Select("TargetINR").ClickItem(FloatToString(driver.Value(4)));
    formNHT.Textarea("Comments").innerText = "";
        
    formNHT.Panel(0).SubmitButton("Save").Click();

    // Click confirm panel
    process_confirm_historical_treatment(INRstarV5);
    
    WaitSeconds(1,"");
 
}
//-------------------------------------------------------------------------------
function inactivate_patient(p_run)
{
    var w_nhs;
    
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Treatments"+p_run+".xls","Treatments"+p_run);

    // for each record, call the create process
    while (!driver.EOF())
    {
     if (driver.Value(0) == "Y"+p_run && Driver.Value(3) == "Inactive")
     {
        // Write the details out
        var w_mess = "Inactivating " + driver.Value(1) + " " + driver.Value(3) + " " + driver.Value(2);
        Log.Message("-------------------------------" + w_mess);
   
        var INRstarV5 = set_system();
        Goto_Patient_Search();
        preset_Fetch_Patient_NHS(INRstarV5, driver.Value(14));
         
        deactivate_patient();
         

      }
      // Next record
      driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Treatments"+p_run+".xls");
}
//-------------------------------------------------------------------------------
//function add_inr_with_overide_date(p_ctr)
//{
//    Goto_Patient_New_INR();
//    add_inr_refer(driver.Value(p_ctr));
//    
//    // Override Treatement
//    var INRstarV5 = set_system();
//    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//    var panelPTC = panelMCP.Panel("PatientTabContent");
//    var panelPTC2 = panelPTC.Panel("PendingTreatmentContent");
//    
//    // Click the override button
//    panelPTC2.Panel(0).Button("OverridePendingTreatment").Click();
//    
//    // Change the date
//    var formEPT = panelPTC2.Form("EditPendingTreatmentForm");
//    var tableOST = formEPT.Table("OverrideSuggestedTreatmentTable");
//    tableOST.Cell(1, 0).Image("calendar_png").Click();
//    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
//    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(driver.Value(p_ctr-2)));
//    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(p_ctr-1)));
//    select_day(driver.Value(p_ctr-3), w_datepicker);
//    
//    // Save the Override
//    formEPT.Panel(0).Button("OverrideAccept").Click();
//
//    
//
//    // Now test if a single Schedule has been proposed or we need to choose one
//    var wf_no_exact = INRstarV5.NativeWebObject.Find("idStr", "DoseScheduleWarnings_ValidationSummary");
//    if(wf_no_exact.Exists)
//    {
//       // Click the top Use button
//       Log.Message("Clicking 1st 'Use' button");
//       panelPTC.Panel("PendingTreatmentContent").Panel("DosingScheduleContent").Panel("ScheduleGrid").Table("ScheduleSelectorTable").Cell(1, 2).Button("Use").Click();
//       WaitSeconds(1,"");
//    }
//    else
//       Log.Message("Exact Schedule found");
//
//    // Accept Treatment
//    panelPTC2.Panel(0).Button("AcceptPendingTreatment").Click(); 
//}
