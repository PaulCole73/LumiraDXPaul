//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation
//USEUNIT V5_Common_Presets

//===================================================================
// Test New Review
//-------------------------------------------------------------------
function quick_start()
{
    
   var INRstarV5 = set_system();  
   quick_review_dabigatran(INRstarV5);
   
}
//===================================================================
function quick_review_dabigatran(INRstarV5)
{
    
     
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelWRAP = panelPTC.Panel("WarfarinReviewAddPanel");
    var form = panelWRAP.Form("AddReviewForm");
    var panelWRSP = form.Panel("WarfarinReviewSummaryPanel");
    var panelRHSP = form.Panel("RHSPanel")
    
    Log.Message("Adding New Review");

    // Set Review Date 
    w_days_ago = aqConvert.IntToStr(Math.floor(Math.random()*3)) * 7;
    w_review_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_days_ago * -1))); 
          
    var w_day = aqString.SubString(w_review_date,0,2);
    var w_mth = aqConvert.StrToInt(aqString.SubString(w_review_date,3,2));
    var w_yr = aqString.SubString(w_review_date,6,4);

    panelWRSP.Panel("ReviewDate").Image("calendar_png").Click();
     w_datepicker = INRstarV5.Panel("ui_datepicker_div");
     w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
     w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
     select_day(w_day, w_datepicker);
  
     //Set Compliance
    var panelQC = panelWRSP.Panel("Warfarin_Compliance").Panel("Question_Compliance");
    panelQC.Table(0).Cell(2, 1).RadioButton("Question1_Compliance2").checked = "true";
    
    //Set Risk Assesment
    var panelWRA = panelWRSP.Panel("Warfarin_RiskAssessment");
    panelWRA.Table("Warfarin_RiskAssessment_Table").Cell(0, 0).Panel("Question_Chads2Vasc").Select("reviewAnswers_2_value").ClickItem("4");
    panelWRA.Table("Warfarin_RiskAssessment_Table").Cell(0, 1).Panel("Question_HasBled").Select("reviewAnswers_3_value").ClickItem("4");
    
    //Set Test Results
    var panelWTRP = panelRHSP.Panel("WarfarinTestResultsPanel");
    panelWTRP.Panel("Question_TR_Weight").Textbox("TR_Weight").Text = "95";
    panelWTRP.Panel("Question_TR_Creatinine").Textbox("TR_Creatinine").Text = "100";
    
    WaitSeconds(2,"waiting for button to become enabled");
    
    panelWTRP.Panel("Question_TR_CreatinineClearance").Button("TR_CreatinineClearance_Button").Click();
    panelWTRP.Panel("Question_TR_ALT").Textbox("TR_ALT").Text = "45";
    panelWTRP.Panel("Question_TR_Haemoglobin").Textbox("TR_Haemoglobin").Text = "100";
    
    WaitSeconds(2,"");
    
    //Set Dosing
    var panelRDP = panelRHSP.Panel("ReviewDosePanel"); 
    panelRDP.Panel("Question_Dose").Select("reviewAnswers_9_value").ClickItem(1);
    
    //Set Clinical Review Notes
    var panelWRCP = panelRHSP.Panel("WarfarinReviewClinicalPanel");
    panelWRCP.Textarea("Note").Value = "Notes test";
    
    //Set Next Review Date
    
    w_next_review_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), 365)); 
    var w_day = aqString.SubString(w_next_review_date,0,2);
    var w_mth = aqConvert.StrToInt(aqString.SubString(w_next_review_date,3,2));
    var w_yr = aqString.SubString(w_next_review_date,6,4);
    
    var panelNRD = panelRHSP.Panel("WarfarinNextReviewDatePanel");
    panelNRD.Panel("NextReviewDate").Image("calendar_png").Click();
    
     w_datepicker = INRstarV5.Panel("ui_datepicker_div");
     w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
     w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
     select_day(w_day, w_datepicker);
     
     //Save the review
     var panelARAA = form.Panel("AnnualReviewAddActions").Button("SaveWarfarinReviewLink").Click(); 

}
