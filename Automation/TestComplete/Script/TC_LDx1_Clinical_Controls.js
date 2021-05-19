//USEUNIT TC_Results

//==============================================================================//
//LDx1
 
//==============================================================================//
function cc_LDx1_C56_error_when_importing_an_inr_result_into_inrstar() 
{
//  LDx1/C56-INRstar mandatory fields will reflect that of the instrument, so results 
//  sent will always be received with a min result, time and date stamp shown. 
//  The clinician will be able to archive and comment, or find the patient in INRstar 
//  in line with existing functionality to ensure results are not missed.

   tc_patient_column_contains_the_patient_details_for_an_instrument_result();
   tc_patient_result_contains_the_correct_information_for_an_instrument_result();
   tc_unmatched_patient_can_be_manually_matched();
   tc_results_tab_discard_button_can_archive_results_sent_in_from_instrument();
} 
//==============================================================================//
