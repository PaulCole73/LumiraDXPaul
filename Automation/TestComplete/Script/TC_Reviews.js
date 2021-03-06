//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Reviews
//USEUNIT Generic_Functions
//USEUNIT Navigation
//--------------------------------------------------------------------------------
function tc_add_a_new_warfarin_review()
{
try
 {
  var test_title = 'Reviews - Add a new warfarin review'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'add_a_review', 'M', 'Shared'); 
  add_treatment_plan('W','Manual','','Shared','');
  add_warfarin_review_new_review_button();
  
  var result_set = validate_top_patient_audit('Reviews - Add a new warfarin review','New review created');
  results_checker(result_set, test_title);
  
  Log_Off();
 }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  }
} 
//--------------------------------------------------------------------------------
function tc_add_a_non_warfarin_review_with_some_test_measurements_for_Creatinine_clearance()
{
 try
 {
  var test_title = 'Reviews - Add a non warfarin review with some test measurements for Creatinine clearance'
  login('cl3@regression','INRstar_5','Shared');
  add_patient('Regression', 'add_a_review', 'M', 'Shared'); 
  add_treatment_plan('Apixaban','', aqConvert.StrToDate(aqDateTime.Today()),'Shared','','Indefinite')
  
  var review_data_before = add_non_warfarin_review('','Y','','65','100');
  var review_data_after = get_review_tab_data();

  result_set = new Array();
  var result_set_1 = validateArrays(review_data_before, review_data_after,'Reviews - Add a non warfarin review with some test measurements for Creatinine clearance');
  var result_set_2 = validate_top_patient_audit('Reviews - Add a non warfarin review with some test measurements for Creatinine clearance','New review created');
  
  result_set.push(result_set_1,result_set_2);
  
  //Validate all the results sets are true
  var results = results_checker_are_true(result_set); 
  
  //Pass in the final result
  results_checker(results,test_title);
  
  Log_Off();
 }
  catch (e)
  {
   Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
   Log_Off(); 
  }
} 
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------