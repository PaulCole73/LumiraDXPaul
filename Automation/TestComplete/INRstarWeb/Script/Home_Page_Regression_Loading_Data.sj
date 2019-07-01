//USEUNIT Navigation
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common
//USEUNIT Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Popups

//===============================================================================
// Create Patient, Patient Treatment Plan, Review

// Patient Driver Fields
// 0 - Run Indicator
// 1 - Title
// 2 - Sex
// 3 - Gender
// 4 - Surname
// 5 - Forename
// 6 - Phone
// 7 - Mobile
// 8 - Email
// 9 - Address 1
// 10 - Addr 2
// 11 - Addr 3
// 12 - Town
// 13 - County
// 14 - Post Code
// 15 - Patient Number
// 16 - DOB DD
// 17 - DoB MM
// 18 - DoB YY
// 19 - Born
// 20 - NHS Number
// 21 - Active

// Treatment Plan Fields

// 22 - Diagnosis
// 23 - Duration
// 24 - Dosing Method
// 25 - Testing Method
// 26 - Target
// 27 - 5mg
// 28 - 3mg
// 29 - 1mg
// 30 - 0.5mg
// 31 - Split Tabs
// 32 - Protocol
// 33 - Start Date DD
// 34 - Start Date  MMM
// 35 - Start Date YYYY
// 36 - Start Date
// 37 - End Date DD
// 38 - End Date MMM
// 39 - End Date YYYY
// 40 - End Date
// 41 - Max Review
// 42 - Written Info
// 43 - Drug

//Review Fields

// 47 - Day of review
// 48 - Month of review
// 49 - Year of Review
// 50 - Review Date
// 51 - Compliance
// 52 - Adverse events
// 53 - Adverse events spare
// 54 - CHADS2
// 55 - HAS-BLED
// 56 - Weight
// 57 - Creatinine
// 58 - Creatinine Clearance
// 59 - ALT
// 60 - Haemoglobin
// 61 - Dose
// 62 - Clinical Note
// 63 - Day of next review date
// 64 - Month of next review date
// 65 - Year of next review date
// 66 - Next Review date

// For all messages

// 44 - The message under test
// 45 - Should the patient be on the home page or not
// 46 - Clicking cancel on the review page, required for validating the patient

//===============================================================================
function quick_pt_demographics_regression(driver)
{
 

    var INRstarV5 = set_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
//    var form = panelMCP.Panel("ManagePatients").Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("PatientNumber").Text = driver.Value(15);
    WaitSeconds(1,"");
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Textbox("NHSNumber").Text = driver.Value(20);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Select("Title").ClickItem(driver.Value(1));

    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text = driver.Value(4);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text = driver.Value(5);

    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Image("calendar_png").Click();
    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    WaitSeconds(1,"");
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(driver.Value(17));
    WaitSeconds(1,"");
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(18)));
    select_day(driver.Value(16), w_datepicker);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(6).Select("Sex").ClickItem(driver.Value(2))
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(7).Select("Gender").ClickItem(driver.Value(3));

    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text = driver.Value(9);
    if ((driver.Value(10) != "") && (driver.Value(10) != null))
       form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(1).Textbox("SecondLineAddress").Text = driver.Value(10);
    if ((driver.Value(11) != "") && (driver.Value(11) != null))
       form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(2).Textbox("ThirdLineAddress").Text = driver.Value(11);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text = driver.Value(12);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text = driver.Value(13);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(5).Textbox("Postcode").Text = driver.Value(14);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(6).Textbox("Phone").Text = driver.Value(6);

    form.Panel(0).SubmitButton("AddPatientDetails").Click();
}
//===============================================================================
function add_treatment_plan_regression(driver)

{
WaitSeconds(2,"About to go to Treatment Plan Tab");
    var INRstarV5 = set_system();

    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTPD = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");

    WaitSeconds(2,"");
    
    panelPTPD.Panel(0).Button("AddPatientTreatmentPlanLink").Click();

    //Add Treatment plan details in clinical screen
    
    var form = panelPTPD.Form("AddTreatmentPlanForm");
   
   //Plan start date  
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(0).Image("calendar_png").Click();
   WaitSeconds(2,"");
   x_datepicker = INRstarV5.Panel("ui_datepicker_div");
   x_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(35)));
   x_datepicker.Panel(0).Panel(0).Select(0).ClickItem(driver.Value(34));
   WaitSeconds(2,"");
   
   select_day(driver.Value(33), x_datepicker);
    
   //Diagnosis, Drug, and Duration
   
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(1).Select("DiagnosisSelected").ClickItem(driver.Value(22));
   WaitSeconds(2,"");
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(2).Select("DrugId").ClickItem(driver.Value(43));
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(3).Select("TreatmentDuration").ClickItem(driver.Value(23));
   form.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();
   
//Treatment Plan Created
   
 WaitSeconds(2,"Saving the Treatment Plan");

}

//===============================================================================
function add_review_regression(driver)

    { 
          var INRstarV5 = set_system();
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
          var form = panelPTC.Panel(0).Panel(0).Form("AddReviewForm");

          // Set Review Date

         form.Panel(0).Panel("ReviewDate").Image("calendar_png").Click();
         WaitSeconds(1,"");
         x_datepicker = INRstarV5.Panel("ui_datepicker_div");
         x_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(49)));
         x_datepicker.Panel(0).Panel(0).Select(0).ClickItem(driver.Value(48));
         WaitSeconds(1,"");
         select_day(driver.Value(47), x_datepicker);

         //Initiate
         if (driver.Value(46)== "Y")
        
         form.Panel(0).Panel(0).Checkbox("reviewAnswers_12_value_Value").checked = "true";
         
                  
         //Set Compliance
         var panelQC = form.Panel(0).Panel(1).Panel("Question_Compliance").Table(0);
         
         if (driver.Value(51)== 1)
          panelQC.Cell(0, 1).RadioButton("Question1_Compliance0").checked = "true"
         
            else if (driver.Value(51)== 2)
             panelQC.Cell(1, 1).RadioButton("Question1_Compliance1").checked = "true"
           
              else if (driver.Value(51)== 3)
                 panelQC.Cell(2, 1).RadioButton("Question1_Compliance2").checked = "true"
               
                   else if (driver.Value(51)== 4)
                         panelQC.Cell(3, 1).RadioButton("Question1_Compliance3").checked = "true" 
                       
    
          //Set Risk Assesment
          
          if (driver.Value(54)!= 'Unknown')
          {
          form.Panel(0).Panel(3).Table(0).Cell(0, 0).Panel("Question_Chads2Vasc").Select("reviewAnswers_2_value").ClickItem(driver.Value(54));
          }
          WaitSeconds(1)
          
          if (driver.Value(55)!= 'Unknown')
          {
          form.Panel(0).Panel(3).Table(0).Cell(0, 1).Panel("Question_HasBled").Select("reviewAnswers_3_value").ClickItem(driver.Value(55));
          }
          
          //Set Test Results
          if (driver.Value(56)!= "Unknown"){
          form.Panel(0).Panel(4).Panel("WarfarinTestResultsPanel").Panel("Question_TR_Weight").Textbox("TR_Weight").Text = (driver.Value(56));
          }
          
          form.Panel(0).Panel(4).Panel("WarfarinTestResultsPanel").Panel("Question_TR_Creatinine").Textbox("TR_Creatinine").Text = (driver.Value(57));
    
          form.Panel(0).Panel(4).Panel("WarfarinTestResultsPanel").Panel("Question_TR_Anti_Xa").Textbox("TR_Anti_Xa").Text = (driver.Value(53));
          
          form.Panel(0).Panel(4).Panel("WarfarinTestResultsPanel").Panel("Question_TR_Platelets").Textbox("TR_Platelets").Text = (driver.Value(68));
          
          WaitSeconds(2,"waiting for button to become enabled");
    
          //panelWTRP.Panel("Question_TR_CreatinineClearance").Button("TR_CreatinineClearance_Button").Click();
          
          form.Panel(0).Panel(4).Panel("WarfarinTestResultsPanel").Panel("Question_TR_ALT").Textbox("TR_ALT").Text = (driver.Value(59));
          form.Panel(0).Panel(4).Panel("WarfarinTestResultsPanel").Panel("Question_TR_Haemoglobin").Textbox("TR_Haemoglobin").Text = (driver.Value(60));
    
          WaitSeconds(1,"");
    
          //Set Dosing
          form.Panel(0).Panel("ReviewDosePanel").Panel("Question_Dose").Select("reviewAnswers_11_value").ClickItem(driver.Value(61));
    
          //Set Clinical Review Notes
          form.Panel(0).Panel(5).Textarea("Note").Value =(driver.Value(62));
    
          //Set Next Review Date
    
          form.Panel(0).Panel("WarfarinNextReviewDatePanel").Panel("NextReviewDate").Panel(0).Image("calendar_png").Click();
          
          WaitSeconds(2,"");
          
           x_datepicker = INRstarV5.Panel("ui_datepicker_div");
           x_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(65)));
           x_datepicker.Panel(0).Panel(0).Select(0).ClickItem(driver.Value(64));
           WaitSeconds(1,""); 
           
           select_day(driver.Value(63), x_datepicker);
    
           //Save the review
           form.Panel(0).Panel("AnnualReviewAddActions").Button("SaveWarfarinReviewLink").Click(); 
           
           
           
  }
//===============================================================================

function add_next_review_date_regression_not_on_tp(driver)
{
          var INRstarV5 = set_system();
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
          var panelARW = panelPTC.Panel("AnnualReviewWrapper");
          
          panelARW.Panel("ReviewDateSummary").Image("calendar_png").Click();
          
          WaitSeconds(1,"");
          
           x_datepicker = INRstarV5.Panel("ui_datepicker_div");
           x_datepicker.Panel(0).Panel(0).Select(0).ClickItem(driver.Value(64));
           WaitSeconds(1,"");
           x_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(65)));
           select_day(driver.Value(63), w_datepicker);
           
           INRstarV5.Panel(2).Panel(1).Panel(0).Button(1).TextNode(0).Click();
           
           //process_confirm_button_date;
          
}

//===============================================================================