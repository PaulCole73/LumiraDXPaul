//USEUNIT TS_Adverse_Event
//USEUNIT TS_Demographics
//USEUNIT TS_Login_Page
//USEUNIT TS_Notes
//USEUNIT TS_Patient
//USEUNIT TS_Patient_Management
//USEUNIT TS_Patient_Tests_Due
//USEUNIT TS_PoCT
//USEUNIT TS_Reviews
//USEUNIT TS_Skip_Or_Boost
//USEUNIT TS_Treatment
//USEUNIT TS_Treatment_Plan
//USEUNIT TS_Options_IQC
//USEUNIT TS_Home_Page
//Deans comment
//--------------------------------------------------------------------------------
//This section you can pick and choose which suites to run
//function tr_master_run()
//{
//tp_inrstar_staging_regression();
//}
//--------------------------------------------------------------------------------
//INR star staging regression start, this will run all the regression tests
function tp_inrstar_staging_regression() 
{
//ts_staging_regression_login_page();
//ts_staging_regression_adverse_event();
//ts_staging_regression_notes();
//ts_staging_regression_patient_add();
//ts_staging_regression_patient_search();
//ts_staging_regression_patient_recently_viewed();
//ts_staging_regression_patient_tests_due();
//ts_staging_regression_options_iqc();
//ts_staging_regression_demographics();
//ts_staging_regression_reviews(); 
//ts_staging_regression_poct();
//ts_staging_regression_patient_management();
//ts_staging_regression_treatment_plan();
ts_staging_regression_treatment();
//ts_staging_regression_home_page();
}
//--------------------------------------------------------------------------------