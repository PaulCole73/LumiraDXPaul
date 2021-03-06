//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation
//USEUNIT V5_Common_Presets

//===================================================================
// Test New Review
//-------------------------------------------------------------------
function quick_review()
{
    Goto_Patient_TreatmentPlan_Review_New();
    
   var INRstarV5 = set_system();  
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelWRAP = panelPTC.Panel("WarfarinReviewAddPanel");
    var form = panelWRAP.Form("AddReviewForm");
    var panelWRAP = form.Panel("WarfarinReviewSummaryPanel");
    
    Log.Message("Adding New Review");

    // Set Review Date 
    w_days_ago = aqConvert.IntToStr(Math.floor(Math.random()*3)) * 7;
    w_review_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_days_ago * -1))); 
          
    var w_day = aqString.SubString(w_review_date,0,2);
    var w_mth = aqConvert.StrToInt(aqString.SubString(w_review_date,3,2));
    var w_yr = aqString.SubString(w_review_date,6,4);

    panelWRAP.Panel("ReviewDate").Image("calendar_png").Click();
     w_datepicker = INRstarV5.Panel("ui_datepicker_div");
     w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
     w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
     select_day(w_day, w_datepicker);
  
}
