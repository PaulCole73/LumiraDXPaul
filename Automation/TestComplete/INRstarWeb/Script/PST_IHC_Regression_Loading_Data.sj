//-------------------------------------------------------------------------------
function quick_pt_demographics_regression(driver)
{
 

    var INRstarV5 = set_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Textbox("NHSNumber").Text = driver.Value(20);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Select("Title").ClickItem(driver.Value(1));
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text = driver.Value(4);
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text = driver.Value(5);
    var w_nhs = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Textbox("NHSNumber").Text = Get_New_Number_V5();
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
   
   x_datepicker = INRstarV5.Panel("ui_datepicker_div");
   x_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(35)));
   WaitSeconds(1,"");
   x_datepicker.Panel(0).Panel(0).Select(0).ClickItem(driver.Value(34));
   
   select_day(driver.Value(33), w_datepicker);
    
   //Diagnosis, Drug, and Duration
   
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(1).Select("DiagnosisSelected").ClickItem(driver.Value(22));
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(2).Select("DrugId").ClickItem(driver.Value(43));
   form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(3).Select("TreatmentDuration").ClickItem(driver.Value(23));
   form.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();
   
//Treatment Plan Created
   
 WaitSeconds(2,"Saving the Treatment Plan");

}