//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Reviews
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Patient_Management
//USEUNIT TSA_Self_Care
//USEUNIT TSA_Bridging
//USEUNIT Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_bridging_check_tab_visibility_changing_treatmentplans()
{
  try
    {
      var test_title = "Bridging - Check Tab Visibility";
      login("cl3@regression", "INRstar_5", "Shared");
      var drug_array = new Array();
      drug_array.push("Warfarin", "Acenocoumarol", "Apixaban", "Dabigatran", "Edoxaban", "Rivaroxaban", "Dalteparin (LMWH)", "Enoxaparin (LMWH)");
      
      for(var i = 0; i < drug_array.length; i++)
      {
        var drug = drug_array[i];
        add_patient("Regression", "bridging", "M", "Shared");
        add_treatment_plan(drug, "Coventry", aqConvert.StrToDate(aqDateTime.Today()), "Shared", "", "52 Weeks");
        
        var result_set = new Array();
        var result_set_1 = false;
        
        var tab = INRstar_base().NativeWebObject.Find("idStr", "PatientBridgingTab");
        
        if(tab.Exists == true && drug == "Warfarin")
        {
          Log.Message("Drug is " + drug + " . Tab Exists.")
          result_set_1 = true;
        }
        else if(tab.Exists != true && drug != "Warfarin")
        {
          Log.Message("Drug is " + drug + " . Tab Doesn't Exist.")
          result_set_1 = true;
        }
        else
        {
          result_set_1 = false;
        }
        
        result_set.push(result_set_1);
        var results = results_checker_are_true(result_set);
        results_checker(results, "Checking tab with " + drug);
      }
      Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_check_bridging_button_state()
{
  try
  {
    var test_title = "Bridging - Check Bridging Button State";
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    
    var pat_nhs = get_patient_nhs();
    var result_set = new Array();
    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var user = get_user_level(i);
      if(user != "locadmin")
      {  
        var state = "";
    
        login(user + "@regression", "INRstar_5", "Shared");
        patient_search(pat_nhs);
        state = tsa_bridging_check_button_state();
      
        if(user == "clead" || user == "cl3")
        {
          result_set_1 = button_checker(state, "enabled", "Check " + user + " Permissions");
        }
        else
        {
          result_set_1 = button_checker(state, "disabled", "Check " + user + " Permissions");
        }
        result_set.push(result_set_1);
        Log_Off();
      }
    }
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_check_bridging_button_state_on_ddd()
{
  try
  {
    var test_title = "Bridging - Check Bridging Button State";
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    self_care_DDD("1");
    
    var pat_nhs = get_patient_nhs();
    var result_set = new Array();
    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var user = get_user_level(i);
      if(user != "locadmin")
      {  
        var state = "";
    
        login(user + "@regression", "INRstar_5", "Shared");
        patient_search(pat_nhs);
        state = tsa_bridging_check_button_state();
      
        result_set_1 = button_checker(state, "disabled", "Check " + user + " Permissions");
        result_set.push(result_set_1);
        Log_Off();
      }
    }
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_check_bridging_button_state_on_warfarin_self_test()
{
  try
  {
    var test_title = "Bridging - Check Bridging Button State";
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    warfarin_self_care("1");
    
    var pat_nhs = get_patient_nhs();
    var result_set = new Array();
    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var user = get_user_level(i);
      if(user != "locadmin")
      {  
        var state = "";
    
        login(user + "@regression", "INRstar_5", "Shared");
        patient_search(pat_nhs);
        state = tsa_bridging_check_button_state();
      
        result_set_1 = button_checker(state, "disabled", "Check " + user + " Permissions");
        result_set.push(result_set_1);
        Log_Off();
      }
    }
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_check_bridging_button_state_on_warfarin_self_test_stage_2()
{
  try
  {
    var test_title = "Bridging - Check Bridging Button State";
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    warfarin_self_care("1");
    warfarin_self_care("2");
    
    var pat_nhs = get_patient_nhs();
    var result_set = new Array();
    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var user = get_user_level(i);
      if(user != "locadmin")
      {  
        var state = "";
    
        login(user + "@regression", "INRstar_5", "Shared");
        patient_search(pat_nhs);
        state = tsa_bridging_check_button_state();
      
        result_set_1 = button_checker(state, "disabled", "Check " + user + " Permissions");
        result_set.push(result_set_1);
        Log_Off();
      }
    }
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_check_bridging_button_state_on_warfarin_self_test_stage_3()
{
  try
  {
    var test_title = "Bridging - Check Bridging Button State";
    login("clead@regression", "INRstar_5", "Shared");
    add_patient("Regression", "Button_State_Check", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
    add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
    warfarin_self_care("1");
    warfarin_self_care("2");
    warfarin_self_care("3");
    
    var pat_nhs = get_patient_nhs();
    var result_set = new Array();
    Log_Off();
    
    for(var i = 0; i < 9; i++)
    {
      var user = get_user_level(i);
      if(user != "locadmin")
      {  
        var state = "";
    
        login(user + "@regression", "INRstar_5", "Shared");
        patient_search(pat_nhs);
        state = tsa_bridging_check_button_state();
      
        result_set_1 = button_checker(state, "disabled", "Check " + user + " Permissions");
        result_set.push(result_set_1);
        Log_Off();
      }
    }
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_button_state_on_various_dms()
{
  try
  {
    var test_title = "Bridging - Check Bridging Button State";
    var result_set = new Array();
    
    for(var i = 0; i < 6; i++)
    {
      var dose = get_dosing_method(i);
      login("clead@regression", "INRstar_5", "Shared");
      add_patient("Regression", "Button_State_Check", "M", "Shared");
      add_treatment_plan("W", dose, "", "Shared", "");
      var pat_nhs = get_patient_nhs();
      Log_Off();
      
      for(var j = 0; j < 9; j++)
      {
        var user = get_user_level(j);
        if(user != "locadmin")
        {  
          var state = "";
    
          login(user + "@regression", "INRstar_5", "Shared");
          patient_search(pat_nhs);
          state = tsa_bridging_check_button_state();
      
          if(user == "clead" || user == "cl3")
          {
            result_set_1 = button_checker(state, "enabled", "Check " + user + " Permissions");
          }
          else
          {
            result_set_1 = button_checker(state, "disabled", "Check " + user + " Permissions");
          }
          result_set.push(result_set_1);
      
          Log_Off();
        }
      }
    }
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_check_bridging_tab_with_historic_warfarin_treatment()
{
  try
  {
    var test_title = "Bridging Tab - Historic Warfarin Treatment";
    login('cl3@regression','INRstar_5','Shared');
    
    var state;
    var result_set = new Array();
    var drug_array = new Array();
    drug_array.push("Acenocoumarol", "Apixaban", "Dabigatran", "Edoxaban", "Rivaroxaban", "Dalteparin (LMWH)", "Enoxaparin (LMWH)");
    
    for(var i = 0; i < drug_array.length; i++)
    {
      state = "";
    
      add_patient("Regression", "Button_State_Check", "M", "Shared");
      add_treatment_plan("W", "Coventry", "", "Shared", "");
      add_historic_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7))), "2.0", "2.0", "0", "7", "2.5");
      
      add_treatment_plan(drug_array[i], "Coventry", aqConvert.StrToDate(aqDateTime.Today()), "Shared", "2", "52 Weeks");
      cancel_review();
      
      state = tsa_bridging_check_button_state();
      result_set_1 = button_checker(state, "undefined", "Check Button State.");
      result_set.push(result_set_1);
      
      tp_drop_down().ClickItem(1);
      
      state = tsa_bridging_check_button_state();
      result_set_1 = button_checker(state, "disabled", "Check Button State.");
      result_set.push(result_set_1);
    }
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  } 
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    Log_Off();
  }
}