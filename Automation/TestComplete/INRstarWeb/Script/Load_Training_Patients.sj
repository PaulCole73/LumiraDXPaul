//USEUNIT Navigation
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common


//===============================================================================
// Create Patient, Patient Clinical & Historical Record

// Driver Fields
// 0 - Title
// 1 - Surname
// 2 - Forename
// 3 - Diagnosis
// 4 - Target
// 5 - Last INR
// 6 - Last Dose
// 7 - Last Review
// 8 - 5mg
// 9 - 3mg
// 10 - 1mg
// 11 - 0.5mg
// 12 - Split Tabs
// 13 - Missed Dose
// 14 - Meds
// 15 - Current INR
// 16 - Address 1
// 17 - Addr 2
// 18 - Addr 3
// 19 - Town
// 20 - County
// 21 - Post Code
// 22 - DOB DD
// 23 - DoB MM
// 24 - DoB YY
// 25 - Gender
// 26 - Last INR DD
// 27 - Last INR MM
// 28 - Last INR YY   
// 29 - Row for Last Treatment date
//-------------------------------------------------------------------------------
//function quick_patient()
//{
//    var w_set = "Training Surgery";
//    var w_nhs;
//    
//    var w_outfile = "c:\\Shared stuff\\Scenario Testing\\Nurse_Scenario_Patient_Output_Set_" + w_set + ".csv";
//
//    aqFile.WriteToTextFile(w_outfile, "Set " + w_set + "\r\n",  aqFile.ctANSI, true);
//
//    // Read input file
//    driver = DDT.CSVDriver("c:\\Shared stuff\\Scenario Testing\\Training_InputData.csv");
//
//    // for each record, call the create process
//    while (!driver.EOF())
//    {
//         Goto_Add_Patient();
//         
//         w_nhs = quick_pt_demographics(driver);
//         
//         WaitSeconds(2);
//         
//         Goto_Patient_Clinical_Add();
//         
//         quick_pt_clinical(driver);
//
//         Goto_Add_Historical()
//         
//         quick_pt_historical(driver);
//         
//         add_inr_simple(driver.Value(0)
//         // Write the details out
//         var w_mess = "Patient," + driver.Value(0) + " " + driver.Value(2) + " " + driver.Value(1) + ",NHS Number," + w_nhs;
//   
//         Log.Message("----------------- " + w_mess);
//         aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n", aqFile.ctANSI);
//
//         
//         // Next record
//         driver.Next();      
//
//    }
//}
function quick_pt_demographics(driver)
{
    var INRstarV5 = set_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

    var w_nhs = Get_New_Number_V5();
    form.Fieldset(0).Panel("editPatientDetails").Panel(0).Textbox("Patient_NHSNumber").Text = w_nhs;
    form.Fieldset(0).Panel("editPatientDetails").Panel(1).Select("Patient_Title").ClickItem(driver.Value(0));

    form.Fieldset(0).Panel("editPatientDetails").Panel(2).Textbox("Patient_Surname").Text = driver.Value(1);
    form.Fieldset(0).Panel("editPatientDetails").Panel(3).Textbox("Patient_FirstName").Text = driver.Value(2);
//    form.Fieldset(0).Panel("editPatientDetails").Panel(2).Textbox("Patient_Surname").Text = "Patient_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
//    form.Fieldset(0).Panel("editPatientDetails").Panel(3).Textbox("Patient_FirstName").Text = "Forename_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));

    form.Fieldset(0).Panel("editPatientDetails").Panel(4).Image("calendar_png").Click();
    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(driver.Value(23));
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("1945");
    w_datepicker.Table(0).Cell(3, 3).Link(0).Click();
    form.Fieldset(0).Panel("editPatientDetails").Panel(5).Select("Patient_Gender").ClickItem(driver.Value(25));
    form.Fieldset(0).Panel("editPatientDetails").Panel(6).Select("Patient_Sex").ClickItem(driver.Value(25))
    form.Fieldset(0).Panel("editPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " North Crofty";
    form.Fieldset(0).Panel("editPatientContactDetails").Panel(1).Textbox("SecondLineAddress").Text = "Tolvaddon Energy Park";
    form.Fieldset(0).Panel("editPatientContactDetails").Panel(2).Textbox("ThirdLineAddress").Text = "Pool";
    form.Fieldset(0).Panel("editPatientContactDetails").Panel(3).Textbox("Town").Text = "Redruth";
    form.Fieldset(0).Panel("editPatientContactDetails").Panel(4).Textbox("County").Text = "Cornwall";
    form.Fieldset(0).Panel("editPatientContactDetails").Panel(5).Textbox("Postcode").Text = "TR14 0HX";
    
    var w_loc =  panelMain.Panel("header").Panel("logindisplay").Panel("LoginStatus").TextNode(0).innerText;
    if (aqString.Find(w_loc,"Office") > -1)
    {
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(0).Select("Patient_RegisteredSectionId").ClickItem("Office");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(1).Select("Patient_RegisteredTestingSectionId").ClickItem("Office");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_DoctorId").ClickItem("Blue");
    }
    if (aqString.Find(w_loc,"Location2") > -1)
    {
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(0).Select("Patient_RegisteredSectionId").ClickItem("Location2");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(1).Select("Patient_RegisteredTestingSectionId").ClickItem("Location2");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_DoctorId").ClickItem("Doctor2");
    }
    if (aqString.Find(w_loc,"Location3") > -1)
    {
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(0).Select("Patient_RegisteredSectionId").ClickItem("Location3");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(1).Select("Patient_RegisteredTestingSectionId").ClickItem("Location3");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_DoctorId").ClickItem("Doctor3");
    }
    if (aqString.Find(w_loc,"Lemon Street 1") > -1)
    {
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(0).Select("Patient_RegisteredSectionId").ClickItem("Lemon Street 1");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(1).Select("Patient_RegisteredTestingSectionId").ClickItem("Lemon Street 1");
        //form.Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_DoctorId").ClickItem("Doctor2");
    }
    if (aqString.Find(w_loc,"Lemon Street 2") > -1)
    {
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(0).Select("Patient_RegisteredSectionId").ClickItem("Lemon Street 2");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(1).Select("Patient_RegisteredTestingSectionId").ClickItem("Lemon Street 2");
        //form.Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_DoctorId").ClickItem("Doctor2");
    }
    form.Panel(0).SubmitButton("AddPatientDetails").Click();
    return w_nhs;
}
function quick_pt_clinical(driver)
{
    var INRstarV5 = set_system();
    var form = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Fieldset(0).Panel("PatientCurrentClinicalDetails").Form("PatientEditClinicalForm");

    form.Fieldset(0).Fieldset(0).Panel("EditClinicalDetails").Panel(0).Image("calendar_png").Click();
    datepicker = INRstarV5.Panel("ui_datepicker_div");
    datepicker.Panel(0).Panel(0).Select(0).ClickItem("May");
    datepicker.Panel(0).Panel(0).Select(1).ClickItem("2010");
    datepicker.Table(0).Cell(3, 3).Link(0).Click();
    var panelECD = form.Fieldset(0).Fieldset(0).Panel("EditClinicalDetails");
    panelECD.Panel(1).Select("Clinical_DiagnosisId").ClickItem(driver.Value(3));
    panelECD.Panel(2).Select("Clinical_DosingMethod").ClickItem("Coventry Maintenance");
    panelECD.Panel(3).Select("Clinical_TestingMethod").ClickItem("NPT");
    panelECD.Panel(4).Select("Clinical_MaxReview").ClickItem("70 Days");
    
    // Set Tablets
    panelECD.Panel(5).Checkbox("Clinical_NPSA").ClickChecked(false);    
    var panelX = form.Fieldset(0).Fieldset(0).Panel(0);  
    panelX.Panel(0).Checkbox("Clinical_Use5").ClickChecked(driver.Value(8));  
    panelX.Panel(1).Checkbox("Clinical_Use3").ClickChecked(driver.Value(9));    
    panelX.Panel(2).Checkbox("Clinical_Use1").ClickChecked(driver.Value(10));    
    panelX.Panel(3).Checkbox("Clinical_UseHalfTablets").ClickChecked(driver.Value(11));    
    panelX.Panel(4).Checkbox("Clinical_UseSplit").ClickChecked(driver.Value(12));    
    
    //form.Fieldset(0).Panel(0).SubmitButton("UpdatePatientClinical")
    form.Fieldset(0).Fieldset(0).Panel(1).SubmitButton("UpdatePatientClinical").Click();

}
function quick_pt_historical(driver)
{
    var INRstarV5 = set_system();
    var form = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Fieldset("OverrideTreatmentFieldset").Form("NewHistoricalTreatmentForm");

    form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Aug");
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("2010");
    w_datepicker.Table(0).Cell(driver.Value(29), 6).Link(0).Click();

    form.Table("AddHistoricalTreatmentTable").Cell(1, 1).Select("TargetINR").ClickItem(FloatToString(driver.Value(4)));
    form.Table("AddHistoricalTreatmentTable").Cell(1, 2).Select("INR").ClickItem(FloatToString(driver.Value(5)));
    form.Table("AddHistoricalTreatmentTable").Cell(1, 3).Select("Dose").ClickItem(FloatToString(driver.Value(6)));
    form.Table("AddHistoricalTreatmentTable").Cell(1, 4).Select("Review").ClickItem(driver.Value(7));
    form.Textarea("Comments").innerText = "Scenario Quick Patient treatment";
        
    form.Panel(0).Button("Save").Click();

    // Click confirm panel
    process_confirm_historical_treatment(INRstarV5);
 
}