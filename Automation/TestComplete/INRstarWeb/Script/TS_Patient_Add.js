//USEUNIT Tested_Apps
//USEUNIT Login
//USEUNIT Patient_Add

//--------------------------------------------------------------------------------

//Suite of tests for add patient pre staging regression
  
function ts_psr_patient_add()

{

//Opens INRstar
  open_application("INRstar");

//Test cases to be run within the Test Suite
  tc_add_a_new_patient();
  tc_add_a_duplicate_patient_based_on_NHS_number();

//Closes INRstar
  close_application();

}
//--------------------------------------------------------------------------------

//Extra test suites can be added here
