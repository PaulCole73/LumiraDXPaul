//USEUNIT Tested_Apps
//USEUNIT TC_receive_data_from_iguana
//--------------------------------------------------------------------------------
//Suite of tests for INRstar_API
//--------------------------------------------------------------------------------
//Master Suites
//--------------------------------------------------------------------------------
//Think we could have a test suite per end point for API products we put in here
function ts_receive_data_from_iguana_regression()
{
  tc_new_patient_all_demographic_fields_populated_full_patient_data_can_be_imported_into_inrstar();
}
//-------------------------------------------------------------------------------- 
function ts_receive_data_from_iguana()
{
  reset_folder();
    
  tc_new_patient_all_demographic_fields_populated_full_patient_data_can_be_imported_into_inrstar();
  tc_new_patient_sex_field_if_sex_field_is_13_chars_then_it_will_not_create_a_patient();
  tc_new_patient_sex_field_if_sex_field_is_not_in_the_correct_casing_then_it_will_not_create_a_patient();
  tc_new_patient_sex_field_if_sex_field_is_not_in_the_list_of_accepted_sex_then_it_will_not_create_patient();
}
//-------------------------------------------------------------------------------- 