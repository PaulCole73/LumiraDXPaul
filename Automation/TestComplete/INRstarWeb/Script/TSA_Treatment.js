//USEUNIT Navigate_Patient

//--------------------------------------------------------------------------------
function tsa_add_historical(TreatDate,INR,Dose,Omits,Review,TestStepMode)  
{
 var Mode = TestStepMode
 if(Mode == "Shared")
 {
    var INRstarV5 = set_system();
    Goto_Add_Historical();

    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelTPW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("TreatmentPlanWrapper");
    var panelPTW = panelTPW.Panel("PatientTreatmentWrapper");
    var panelPTNHW = panelPTW.Panel("PatientPendingTreatment").Panel("PatientTreatmentNewHistoricalWrapper");

    var form = panelPTNHW.Form("NewHistoricalTreatmentForm");
    form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
    
    datepicker = INRstarV5.Panel("ui_datepicker_div");
     
     if (TreatDate!='')
     {
       var w_day = aqString.SubString(TreatDate,0,2);
       var w_mth = aqConvert.StrToInt(aqString.SubString(TreatDate,3,2));
       var w_yr = aqString.SubString(TreatDate,6,4);
          datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
          datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
          select_day(w_day, datepicker);
     }

    form.Table("AddHistoricalTreatmentTable").Cell(1, 1).Select("INR").ClickItem(INR);
    form.Table("AddHistoricalTreatmentTable").Cell(1, 2).Select("Dose").ClickItem(Dose);
    form.Table("AddHistoricalTreatmentTable").Cell(1, 3).Select("Omits").ClickItem(Omits);
    form.Table("AddHistoricalTreatmentTable").Cell(1, 4).Select("Review").ClickItem(Review);
        
    form.Panel(0).SubmitButton("Save").Click();

    // Click confirm panel
    process_confirm_historical_treatment(INRstarV5);
 }
}
//--------------------------------------------------------------------------------
function tsa_add_initiate_induction(INR,TestStepMode)  
{
 var Mode = TestStepMode
 if(Mode == "Shared")
 {
    Goto_Patient_New_Initiate();
WaitSeconds()
    var INRstarV5 = set_system();
    var panelMPC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMPC.panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").panel("PatientTreatmentWrapper")
    var form = panelPTW.Panel("PatientPendingTreatment").Panel("PatientPreTreatmentINRWrapper").Form("PreTreatmentINRForm").Panel("PatientPreTreatmentINRQuestionsWrapper");
    var inr_test_info = form.Panel("PatientPreTreatmentINRConfirm");
    
    //Selecting the INR value
    var inr_value = inr_test_info.Panel("PatientPreTreatmentINRTestDetails").Panel(1).Select("INR").ClickItem(INR);
    
    //Suggest warfarin dose   
    form.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
    
    // Click the Confirm button in the confirm window
    process_confirm_INR_Induction(INRstarV5);
    
    //Save the INR
    var save_inr_button = panelPTW.Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
 }
}
//--------------------------------------------------------------------------------