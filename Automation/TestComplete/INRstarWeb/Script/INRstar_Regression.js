//USEUNIT TS_Login
//USEUNIT TS_Patient_Add
//USEUNIT TS_Treatment_Plan

//--------------------------------------------------------------------------------
//This section you can pick and choose which suites to run

//function ts_master_run()

//{
//ts_psr_login();
//ts_psr_add_patient();
//}

//--------------------------------------------------------------------------------

//INR star prestaging regression start, this will run all the pre staging regression tests if not commenting out

function tp_inrstar_regression() 

{

//ts_psr_login();
//ts_psr_patient_add();
ts_psr_treatment_plan();
//ts_psr_treatment();

}

