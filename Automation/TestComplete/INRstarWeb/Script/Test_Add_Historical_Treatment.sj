//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests

//===============================================================================
// Part of Test_New_Patient
//
// This process will validate each field when adding an Historical Treatment
//
function add_historical_treatment(INRstarV5)
{
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
    var panelPTNHW = panelPTW.Panel("PatientPendingTreatment").Panel("PatientTreatmentNewHistoricalWrapper");
    var form = panelPTNHW.Form("NewHistoricalTreatmentForm");
    
    Log.Message("Adding New Historical Treatment");
    
    // Test Comments
    test_ht_comments(INRstarV5, form);
    
    // Test date
    test_ht_start_date(INRstarV5, form);
    
    // Test Target INR - done out of sequence as it's pre-set
    test_ht_target_inr(INRstarV5, form);
    
    // Test INR
    test_ht_inr(INRstarV5, form);
    
    // Test Dose
    test_ht_dose(INRstarV5, form);
    
    // Test Omits
    test_ht_omits(INRstarV5, form);
    
    // Test Review
    test_ht_review(INRstarV5, form);
    
}
//================================================================================
// Add Historical Treatment as a Pre_Induction INR
function add_Pre_Induction_INR()
{
  try
  {
    var INRstarV5 = set_system();
    var form = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Fieldset("OverrideTreatmentFieldset").Form("NewHistoricalTreatmentForm");

    Log.Message("Adding New Historical Treatment");
    
    // Test Comments
    test_ht_comments(INRstarV5, form);
    
    // Test date
    test_ht_start_date(INRstarV5, form);
    
    // Test Target INR
    test_ht_target_inr(INRstarV5, form);
    
    // Test INR
    test_ht_inr_pre_induction(INRstarV5, form);
    
    // Test Dose
    test_ht_dose(INRstarV5, form);
    
    // Test Review
    test_ht_review(INRstarV5, form);
    
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}


