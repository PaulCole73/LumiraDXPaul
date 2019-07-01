//USEUNIT Tested_Apps
//USEUNIT Login
//USEUNIT Patient_Add
//USEUNIT Treatment_Plan

//--------------------------------------------------------------------------------

//Suite of tests for add patient pre staging regression
  
function ts_psr_treatment_plan()
{
//Opens INRstar
  open_application("INRstar");

//Test cases to be run within the Test Suite
//  tc_add_first_maintenance_treatment_plan();
//  tc_add_first_manual_treatment_plan();
//  tc_add_a_new_treatment_plan_after_a_treatment_has_been_added_selecting_yes_to_using_previous();
//  tc_add_a_new_treatment_plan_after_treatments_have_been_added_patient_with_an_unknown_diagnosis();
//  tc_add_a_new_treatment_plan_before_any_treatments_have_been_added();
  tc_add_a_new_treatment_plan_after_treatments_have_been_added_Induction_patient();  

//Closes INRstar   
  close_application();
}
//--------------------------------------------------------------------------------