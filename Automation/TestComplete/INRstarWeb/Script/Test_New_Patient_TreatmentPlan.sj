//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation
//USEUNIT V5_Common_Presets

//===================================================================
// Add Patient's Treatment Plan details
       // Drug Options
        //    w    -  warfarin (default)
        //    a     - apixaban
        //    d     - dabigatran
        //    h     - dalteparin (LMWH)
        //    r      - rivaroxaban

        // Diagnosis Options - any valid standard full diagnosis name ( default: Atrial fibrillation)

        // Dose Method Options
        // c - Coventry  (default)
        // h - Hillingdon
        // o - Oates Induction
        // t - Tait Induction
        // m - Manual
//-------------------------------------------------------------------
function quick_start()
{
         var INRstarV5 = set_system();
         Goto_Patient_TreatmentPlan_Add();
         add_patient_TreatmentPlan(INRstarV5, "", "", "m"); 
}
//-------------------------------------------------------------------
function add_patient_TreatmentPlan(INRstarV5, p_drug, p_diagnosis, p_dose_method)
{
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
    var form = panelPCD.Form("AddTreatmentPlanForm");
    
    // Set default values if not pre-selected
    if (p_drug == "")
          p_drug = "w";
    if (p_diagnosis == "")
          p_diagnosis = "Atrial fibrillation";
    
    Log.Message("Adding New Patient Treatment Plan details");
    // common fields ----------------------------------------------------------------------------

    // Set Start Date 
    test_start_date(INRstarV5, form);
  
    // Select Diagnosis
    test_add_diagnosis(INRstarV5, form, p_diagnosis);
  
    // Drug options depend on Diagnosis selected
    var w_drug_list = "all";
    
    if ((p_diagnosis == "Antiphospholipid syndrome" )
        || (p_diagnosis == "Dilated cardiomyopathy" )
        || (p_diagnosis =="LV mural thrombus (post MI / LV aneurysm)" )
        || (p_diagnosis =="Prosthetic Heart Valve (bioprosthetic, corrected risk factors)" )
        || (p_diagnosis =="Prosthetic Heart Valve (bioprosthetic, mitral, no risk factors)" )
        || (p_diagnosis =="Prosthetic Heart Valve (bioprosthetic, permanent risk factors)" )
        || (p_diagnosis =="Prosthetic Heart Valve (mechanical, high risk)" )
        || (p_diagnosis =="Prosthetic Heart Valve (mechanical, low risk)" )
        || (p_diagnosis =="Prosthetic Heart Valve (mechanical, medium risk)" )
        || (p_diagnosis =="Rheumatic mitral valve disease" )
        || (p_diagnosis =="Thrombophilia (inherited)"))
           w_drug_list = "w,h";
    
    // Select Diagnosis
    test_add_drug(INRstarV5, form, p_drug, w_drug_list);


    //---------------------------------------------- Decide what to test next
    if (p_drug == "w")
    {
              // Select Duration
              test_duration_w(INRstarV5, form);

               // Select Target INR
               test_target_inr(INRstarV5, form);
  
                // Select Dosing Method
                test_dosing_method(INRstarV5, form, p_dose_method);

                 // Select Review Period      
                test_review_period(INRstarV5, form);
    
               // Select Tablets
                test_tablets(INRstarV5, form);

                // Select Diary print format needs more work
                //test_diary_format
                
                // Select Testing Method     - This is done last to allow other testing to complete
                test_testing_method(INRstarV5, form);
                
                
    }
    else
    {
          // Non-warfarin drug
          
              // Select Duration
              test_duration_x(INRstarV5, form);
          
    }
    //---------------------------------------------- Decide what to test next

}
//===================================================================
// Add Patient's Clinical details for an Induction Protocol
//-------------------------------------------------------------------
function add_patient_clinical_induction()
{
  try
  {
    var INRstarV5 = set_system();
    var form = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Fieldset(0).Panel("PatientCurrentClinicalDetails").Form("PatientEditClinicalForm");
    
    
    Log.Message("Adding New Patient Clinical details");

    // Set Start Date 
    test_start_date(INRstarV5, form);
  
    // Select Diagnosis
    test_diagnosis(INRstarV5, form);
  
    // Select Target INR
    test_target_inr(INRstarV5, form);
  
    // Select Duration
    test_duration(INRstarV5, form);

    // Select Dosing Method
    test_dosing_method_induction_slow(INRstarV5, form);

    // Select Tablets
    test_tablets(INRstarV5, form);

    // Select Review Period      
    test_review_period(INRstarV5, form);
    
    // Select Testing Method     - This is done last to allow other testing to complete
    test_testing_method(INRstarV5, form);


  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}


