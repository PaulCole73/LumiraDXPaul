//USEUNIT Navigation
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common
//USEUNIT Add_INR_Simple


//===============================================================================
// Load Multiple Patients, each with a Patient Clinical & Historical Record

//-------------------------------------------------------------------------------
function quick_patient()
{
    var w_set = "Load Multiple";
    var w_nhs;
    var w_start_num = 51;
    var w_num_patients = 10;
    var w_num_treatments = 5;
    var INRstarV5 = set_system();
    
    var w_outfile = "c:\\Shared stuff\\Scenario Testing\\" + w_set + ".csv";

    aqFile.WriteToTextFile(w_outfile, "Set " + w_set + "\r\n",  aqFile.ctANSI, true);

    // for each record, call the create process
    for (i=w_start_num;i<w_start_num + w_num_patients;i++)
    {
         Goto_Add_Patient();
         w_nhs = load_pt_demographics(INRstarV5,i);
         
         WaitSeconds(2,"");
         
         Goto_Patient_Clinical_Add();
         load_pt_clinical(INRstarV5);

         Goto_Add_Historical()
         
         load_pt_historical(INRstarV5);
         
         for (x=0;x<w_num_treatments;x++)
         {
             Goto_Patient_New_INR();
             add_inr_simple(set_random_inr())
         }
         // Write the details out
         var w_mess = "NHS Number," + w_nhs;
   
         Log.Message("----------------- " + w_mess);
         aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n", aqFile.ctANSI);
         
    }
}
function load_pt_demographics(INRstarV5,i)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

    var w_nhs = Get_New_Number_V5();
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("Patient_NHSNumber").Text = w_nhs;
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Select("Patient_Title").ClickItem("Mr");

    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Textbox("Patient_Surname").Text = "Patient_" + aqConvert.IntToStr(i);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Patient_FirstName").Text = "Multi_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));

    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Image("calendar_png").Click();
    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(aqConvert.IntToStr(Math.floor(Math.random()*12))));
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("19"+aqConvert.IntToStr(10+Math.floor(Math.random()*40)));
    w_datepicker.Table(0).Cell(3, 3).Link(0).Click();
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Select("Patient_Gender").ClickItem("Male");
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(6).Select("Patient_Sex").ClickItem("Male")
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " North Crofty";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(1).Textbox("SecondLineAddress").Text = "Tolvaddon Energy Park";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(2).Textbox("ThirdLineAddress").Text = "Pool";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text = "Redruth";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text = "Cornwall";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(5).Textbox("Postcode").Text = "TR14 0HX";
    
    var w_loc =  panelMain.Panel("header").Panel("logindisplay").Panel("LoginStatus").TextNode(0).innerText;
    if (aqString.Find(w_loc,"Office") > -1)
    {
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(0).Select("Patient_RegisteredSectionId").ClickItem("Office");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(1).Select("Patient_RegisteredTestingSectionId").ClickItem("Office");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_ClinicianId").ClickItem("Blue");
    }
    if (aqString.Find(w_loc,"Location2") > -1)
    {
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(0).Select("Patient_RegisteredSectionId").ClickItem("Location2");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(1).Select("Patient_RegisteredTestingSectionId").ClickItem("Location2");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_ClinicianId").ClickItem("Doctor2");
    }
    if (aqString.Find(w_loc,"Location3") > -1)
    {
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(0).Select("Patient_RegisteredSectionId").ClickItem("Location3");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(1).Select("Patient_RegisteredTestingSectionId").ClickItem("Location3");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_ClinicianId").ClickItem("Doctor3");
    }
    if (aqString.Find(w_loc,"Lemon Street 1") > -1)
    {
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(0).Select("Patient_RegisteredSectionId").ClickItem("Lemon Street 1");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(1).Select("Patient_RegisteredTestingSectionId").ClickItem("Lemon Street 1");
        //form.Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_ClinicianId").ClickItem("Doctor2");
    }
    if (aqString.Find(w_loc,"Lemon Street 2") > -1)
    {
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(0).Select("Patient_RegisteredSectionId").ClickItem("Lemon Street 2");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(1).Select("Patient_RegisteredTestingSectionId").ClickItem("Lemon Street 2");
        //form.Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_ClinicianId").ClickItem("Doctor2");
    }
    if (aqString.Find(w_loc,"Load Test Site 1") > -1)
    {
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(0).Select("Patient_RegisteredSectionId").ClickItem("Load Test Site 1");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(1).Select("Patient_RegisteredTestingSectionId").ClickItem("Load Test Site 1");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_ClinicianId").ClickItem("Dr Black");
    }
    if (aqString.Find(w_loc,"Load Test Site 2") > -1)
    {
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(0).Select("Patient_RegisteredSectionId").ClickItem("Load Test Site 2");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(1).Select("Patient_RegisteredTestingSectionId").ClickItem("Load Test Site 2");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_ClinicianId").ClickItem("Dr Green");
    }
    if (aqString.Find(w_loc,"Load Test Site 3") > -1)
    {
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(0).Select("Patient_RegisteredSectionId").ClickItem("Load Test Site 3");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(1).Select("Patient_RegisteredTestingSectionId").ClickItem("Load Test Site 3");
        form.Fieldset(0).Panel("editPatientLocationDetails").Panel(2).Select("Patient_ClinicianId").ClickItem("Dr Blue");
    }
    form.Panel(0).SubmitButton("AddPatientDetails").Click();
    return w_nhs;
}
function load_pt_clinical(INRstarV5)
{
    var form = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Fieldset(0).Panel("PatientCurrentClinicalDetails").Form("PatientEditClinicalForm");

    form.Fieldset(0).Fieldset(0).Panel("EditClinicalDetails").Panel(0).Image("calendar_png").Click();
    datepicker = INRstarV5.Panel("ui_datepicker_div");
    datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(aqConvert.IntToStr(Math.floor(Math.random()*8))));
    datepicker.Panel(0).Panel(0).Select(1).ClickItem("2010");
    datepicker.Table(0).Cell(3, 3).Link(0).Click();
    var panelECD = form.Fieldset(0).Fieldset(0).Panel("EditClinicalDetails");
    panelECD.Panel(1).Select("Clinical_DiagnosisId").ClickItem("Atrial fibrillation");
    panelECD.Panel(2).Select("Clinical_DosingMethod").ClickItem("Coventry Maintenance");
    panelECD.Panel(3).Select("Clinical_TestingMethod").ClickItem("NPT");
    panelECD.Panel(4).Select("Clinical_MaxReview").ClickItem("70 Days");
    
    // Set Tablets
    panelECD.Panel(5).Checkbox("Clinical_NPSA").ClickChecked(false);    
    var panelX = form.Fieldset(0).Fieldset(0).Panel(0);  
    panelX.Panel(0).Checkbox("Clinical_Use5").ClickChecked("TRUE");  
    panelX.Panel(1).Checkbox("Clinical_Use3").ClickChecked("TRUE");    
    panelX.Panel(2).Checkbox("Clinical_Use1").ClickChecked("TRUE");    
    panelX.Panel(3).Checkbox("Clinical_UseHalfTablets").ClickChecked("FALSE");    
    panelX.Panel(4).Checkbox("Clinical_UseSplit").ClickChecked("FALSE");    
    
    //form.Fieldset(0).Panel(0).SubmitButton("UpdatePatientClinical")
    form.Fieldset(0).Fieldset(0).Panel(1).Button("UpdatePatientClinical").Click();

}
function load_pt_historical(INRstarV5)
{
    var form = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Fieldset("OverrideTreatmentFieldset").Form("NewHistoricalTreatmentForm");

    form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Sep");
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("2010");
    w_datepicker.Table(0).Cell(2, 3).Link(0).Click();

    form.Table("AddHistoricalTreatmentTable").Cell(1, 1).Select("Treatment_TargetINR").ClickItem("2.5");
    form.Table("AddHistoricalTreatmentTable").Cell(1, 2).Select("Treatment_INR").ClickItem(set_random_inr());
    w_dose = set_random_dose()
    form.Table("AddHistoricalTreatmentTable").Cell(1, 3).Select("Treatment_Dose").ClickItem(w_dose);
//    if (w_dose < 2 || w_dose > 3)
       form.Table("AddHistoricalTreatmentTable").Cell(1, 4).Select("Treatment_Review").ClickItem("7 Days");
//    else   
//       form.Table("AddHistoricalTreatmentTable").Cell(1, 4).Select("Treatment_Review").ClickItem(set_random_review());
    form.Textarea("Treatment_Comments").innerText = "Load Multiple Patients treatment";
        
    form.Panel(0).Button("Save").Click();

    // Click confirm panel
    process_confirm_historical_treatment(INRstarV5);
 
}