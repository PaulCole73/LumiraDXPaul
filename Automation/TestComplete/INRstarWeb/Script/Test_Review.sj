//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation
//USEUNIT V5_Common_Presets

//===================================================================
// Test New Review
//-------------------------------------------------------------------
function test_review()
{
    Goto_Patient_TreatmentPlan_Review_New();
    
   var INRstarV5 = set_system();  
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelWRAP = panelPTC.Panel("WarfarinReviewAddPanel");
    var form = panelWRAP.Form("AddReviewForm");
    
    
    Log.Message("Adding New Review");

    // Set Review Date 
    test_review_date(INRstarV5, form);
  
    // INR Control
    // test_diagnosis(INRstarV5, form);
  
    // Compliance
    test_review_compliance(INRstarV5, form);
    
    //  Chads2Vasc
    test_review_chads(INRstarV5, form);
  
    //  HASBLED
    test_review_hasbled(INRstarV5, form);
  
    // Comments
    test_review_comments(INRstarV5, form);

    // Set Next Review Date 
    test_review_next_date(INRstarV5, form);
}
