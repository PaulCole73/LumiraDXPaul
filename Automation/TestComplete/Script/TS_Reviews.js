//USEUNIT Tested_Apps
//USEUNIT TC_Reviews
//--------------------------------------------------------------------------------
//Suite of tests for reviews
//--------------------------------------------------------------------------------
//Master Suites
//--------------------------------------------------------------------------------
//master suites are used for organised test groups
function ts_master_reviews(send_mail)
{
  reset_folder();
  
  tc_add_a_new_warfarin_review();
  tc_add_a_non_warfarin_review_with_some_test_measurements_for_Creatinine_clearance();
  
  email_and_archive(send_mail, "ts_reviews_master");
}
//--------------------------------------------------------------------------------
//regression suites are used for specific regression runs
function ts_staging_regression_reviews()
{
  reset_folder();
  
  tc_add_a_new_warfarin_review();
  tc_add_a_non_warfarin_review_with_some_test_measurements_for_Creatinine_clearance();
  
  email_and_archive(true, "ts_reviews_regression");
} 
//--------------------------------------------------------------------------------
//==============================================================================//
//General Suites
//--------------------------------------------------------------------------------