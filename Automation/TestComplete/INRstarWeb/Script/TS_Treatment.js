//USEUNIT Tested_Apps
//USEUNIT Login
//USEUNIT Patient_Add
//USEUNIT Treatment_Plan

//--------------------------------------------------------------------------------

//Suite of tests for add patient pre staging regression
  
function ts_psr_treatment()

{

//Opens INRstar
  open_application("INRstar");

//Test cases to be run within the Test Suite

//parameters ()
  tc_add_historic
  
//Closes INRstar
  close_application();

}
//--------------------------------------------------------------------------------