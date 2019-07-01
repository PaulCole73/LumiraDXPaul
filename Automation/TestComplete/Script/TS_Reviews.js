//USEUNIT Tested_Apps
//USEUNIT TC_Reviews

//--------------------------------------------------------------------------------
//Suite of tests for reviews
//--------------------------------------------------------------------------------

//Suite of tests for patient staging regression

function ts_staging_regression_reviews()
{
  tc_add_a_new_warfarin_review();
  tc_add_a_non_warfarin_review_with_some_test_measurements_for_Creatinine_clearance();
} 
//--------------------------------------------------------------------------------