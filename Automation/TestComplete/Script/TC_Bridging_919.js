//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Reviews
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Patient_Management
//USEUNIT TSA_Self_Care
//USEUNIT TSA_Bridging
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//USEUNIT Get_Functions
//--------------------------------------------------------------------------------
//CACUK-919
//--------------------------------------------------------------------------------
function tc_bridging_tab_visible_only_with_warfarin()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - Tab only visible on Warfarin";
    login(5, "Shared");
    
    var result_set = new Array();
    var drug_array = new Array();
    drug_array.push("Warfarin", "Acenocoumarol", "Apixaban", "Dabigatran", "Edoxaban", "Rivaroxaban", "Dalteparin (LMWH)", "Enoxaparin (LMWH)");
      
    for(var i = 0; i < drug_array.length; i++)
    {
      var drug = drug_array[i];
      add_patient("Regression", "tab_visible", "M", "Shared");
      add_treatment_plan(drug, "Coventry", aqConvert.StrToDate(aqDateTime.Today()), "Shared", "", "52 Weeks");
        
      var result_set_1 = validate_bridging_tab_exists(drug);
      result_set.push(result_set_1);
      var results = results_checker_are_true(result_set);
      results_checker(results, "Checking tab with " + drug);
    }
    Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_tab_visible_only_with_warfarin";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_with_historic_warfarin_treatment()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - Button disabled with historic Warfarin plan";
    login(5, "Shared");
    
    var state;
    var result_set = new Array();
    var drug_array = new Array();
    drug_array.push("Acenocoumarol", "Apixaban", "Dabigatran", "Edoxaban", "Rivaroxaban", "Dalteparin (LMWH)", "Enoxaparin (LMWH)");
    
    for(var i = 0; i < drug_array.length; i++)
    {
      state = "";
    
      add_patient("Regression", "Historic_warfarin", "M", "Shared");
      add_treatment_plan("W", "Coventry", "", "Shared", "");
      add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
      
      add_treatment_plan(drug_array[i], "Coventry", aqConvert.StrToDate(aqDateTime.Today()), "Shared", "2", "52 Weeks");
      cancel_review();
      
      WaitSeconds(2);
      tp_drop_down().ClickItem(1);
      WaitSeconds(2);
      
      state = get_new_bridging_record_button_state();
      result_set_1 = button_checker(state, "disabled", "Check Button State.");
      result_set.push(result_set_1);
      
      var results = results_checker_are_true(result_set);
      results_checker(results, test_title);
    }
    
    Log_Off();
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_button_state_with_historic_warfarin_treatment";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_new_bridging_record_permissions()
{
  try
  {
    var test_title = "Patient: Treatment: Bridging - Button - New Bridging Record, permissions";
    login(7, "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var pat_nhs = get_patient_nhs();
    var result_set = new Array();
    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var state = "";
    
      login(i, "Shared");
      patient_search(pat_nhs);
      state = get_new_bridging_record_button_state();
      
      if(i == 7 || i == 5)
      {
        result_set_1 = button_checker(state, "enabled", "Check " + i + " Permissions");
      }
      else
      {
        result_set_1 = button_checker(state, "disabled", "Check " + i + " Permissions");
      }
      result_set.push(result_set_1);
      var results = results_checker_are_true(result_set);
      results_checker(results, test_title);
      Log_Off();
    }
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_button_new_bridging_record_permissions";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------