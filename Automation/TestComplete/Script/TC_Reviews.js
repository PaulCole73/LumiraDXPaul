//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Reviews
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_add_a_new_warfarin_review()
{
  try
  {
    var test_title = 'Reviews - Add a new warfarin review'
    login(5, "Shared");
    add_patient('Regression', 'add_a_review', 'M', 'Shared'); 
    add_treatment_plan('W','Manual','','Shared','');
    add_warfarin_review_new_review_button();
  
    var results = validate_top_patient_audit(test_title, "New review created");
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Reviews";
    var test_name = "tc_add_a_new_warfarin_review";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------
function tc_add_a_non_warfarin_review_with_some_test_measurements_for_Creatinine_clearance()
{
  try
  {
    var test_title = 'Reviews - Add a non warfarin review with some test measurements for Creatinine clearance'
    login(5, "Shared");
    add_patient('Regression', 'add_a_review', 'M', 'Shared'); 
    add_treatment_plan('Apixaban','', aqConvert.StrToDate(aqDateTime.Today()),'Shared','','Indefinite')
    WaitSeconds(2, "Waiting after tp...");
    
    var review_data_before = add_non_warfarin_review('','Y','','65','100');
    var review_data_after = get_review_tab_data();

    var result_set = new Array();
    var result_set_1 = checkArrays(review_data_before, review_data_after, test_title);
    result_set.push(result_set_1);
    result_set_1 = validate_top_patient_audit(test_title, "New review created");
    result_set.push(result_set_1);
  
    //Validate all the results sets are true
    var results = results_checker_are_true(result_set); 
  
    //Pass in the final result
    results_checker(results,test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Reviews";
    var test_name = "tc_add_a_non_warfarin_review_with_some_test_measurements_for_Creatinine_clearance";
    handle_failed_tests(suite_name, test_name);
  }
} 
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------