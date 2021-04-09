//USEUNIT TC_Treatment
//USEUNIT TC_Results
//USEUNIT TC_concurrency_error_displayed_when_demographics_amended_before_saving_the_treatment

//==============================================================================//
//LDx2 Barcode Scanning / Error in scanning the patient barcode ID within INRstar resulting in an inability to confirm demographics
//==============================================================================//

function cc_LDx2_C5_patient_identity_is_displayed_on_banner_visible_on_all_patient_specific_screens() 
{
   tc_ensure_the_blue_bar_contains_all_patient_data_fields_throughout_each_sub_tab_of_the_patient();
} 
//==============================================================================//
function cc_LDx2_C6_patient_identifiers_displayed_in_inrstar_external_results_list()
{
  //tests to cover control go here
}
//==============================================================================//
function cc_LDx2_C18_concurrency_error_displayed_when_demographics_amended_before_saving_the_treatment()
{
  //tests to cover control go here
}
//==============================================================================//