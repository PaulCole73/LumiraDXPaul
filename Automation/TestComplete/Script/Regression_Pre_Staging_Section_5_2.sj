//USEUNIT Test_New_Patient
//USEUNIT Test_Edit_Demographics
//USEUNIT Navigation
//USEUNIT Quick_Patient
//USEUNIT Add_INR_Manual
//USEUNIT Home_Page_Regression_Quick_Checking
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups

//===============================================================================
// Section  5.2
//===============================================================================
function release_pre_s5_2()
{
        var patSurname = Step_5_2_1_Add_In_Range_INR(patSurname);
        Step_5_2_2_Manual_Dose_Privilege(patSurname);
        Step_5_2_3_Add_manual_historic_check_tests_due();
}
//-------------------------------------------------------------------------------
function Step_5_2_1_Add_In_Range_INR()

{
    Goto_Patient_New_INR();
    adding_new_manual_treatment();
    Goto_Patient_Audit();
    display_top_patient_audit("Add Manual Treatment");
    var patSurname = get_patient_surname();
    return patSurname
    Log.Checkpoint("Test 5.2.1 Add New Manual Add In Range INR - TESTS_PASS");
}
//-------------------------------------------------------------------------------
function Step_5_2_2_Manual_Dose_Privilege(patSurname)

{
    var name = patSurname
    Log_Off();
    log_on_cl2();
    
   Preset_Find_Patient_Regression_name(patSurname);
    
   var INRstarV5 = set_system(); 
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPR = panelMCP.Panel("PatientRecord");
   var panelPTC = panelPR.Panel("PatientMainTabContent").Panel("PatientTabContent");
   var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
   var Button = panelPTW.Panel("PatientPendingTreatment").Panel("TreatmentButtonsContainer").Fieldset("TreatmentButtons").Button("NewINR");
    
  if (Button.className == "Button disabled")
  {
   Log.Checkpoint("Test 5.2.2 Manual_Dose_Privilege - TESTS_PASS");
  }
    else 
      {
      Log.Warning("NEW INR Button should have been disabled");      
      }
}
//-------------------------------------------------------------------------------
function Step_5_2_3_Add_manual_historic_check_tests_due()

{
    Log_Off();
    log_on_cl3();
    
    //Add new patient for test
    var patName = quick_pat_regression();

    //Find patient
    var patFirstname = get_patient_first_name();
    var patSurname = get_patient_surname();
    var patName = (patSurname + ", " + patFirstname);

    
    //Add new treatment plan
    Goto_Patient_TreatmentPlan();
    Goto_Patient_TreatmentPlan_Add();
        
         var w_drug = "W";
         var w_dm = "";
         var w_master_date = aqDateTime.Today();
         var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
         
    quick_pt_treatmentplan(w_drug, w_dm, w_start_date);
    WaitSeconds(2,"");

    //Add the historic treatment
    Goto_Add_Historical();

    var w_date = aqDateTime.AddDays(aqDateTime.Today(), -2);
    var w_day = aqString.SubString(w_date,0,2);
    var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
    var w_yr = aqString.SubString(w_date,6,4);
  
    quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "2", "Regression 4.3.1 -  Historical Treatment");
    
    //Go to tests due
    Goto_Tests_Due();
    
    //Click tests due

    var INRstarV5 = set_system(); 
    var panelMCP=INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelDRSC=panelMCP.Panel("PatientContent").Panel("TestCriteriaContainer").Form("UpdateTestsDue").Panel("DateRangeSelectorContainer");
    var panelUDRS=panelDRSC.Panel("UpdateDateRangeSelector");
    var button=panelUDRS.SubmitButton("UpdateDateRangeSelector");
    
    button.Click();
    
    var INRstarV5 = set_system(); 
    var panelMCP=INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelTDR= panelMCP.Panel("PatientContent").Panel("TestsDueResults");
    var table = panelTDR.Panel(0).Panel("TestDueResultsContainer").Table("TestDueTable");
    
   

    var wf_found = false;
    
             for (i=0; i<table.rowcount; i++)
      {
                
  
                    if(table.Cell(i, 0).contentText==patName)
                            {
                                 i = table.rowcount;
                                 wf_found = true;
                            }
      }
  
if (wf_found == true )
               Log.Checkpoint("Test Step_5_2_3_Add_manual_historic_check_tests_due - TESTS_PASS");
else 
               Log.Warning("Not Found " + patName + "Step_5_2_3_Add_manual_historic_check_tests_due - TESTS_FAIL");

}
    
//-------------------------------------------------------------------------------