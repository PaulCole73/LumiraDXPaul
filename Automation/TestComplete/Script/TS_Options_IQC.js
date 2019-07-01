//USEUNIT TC_Options_IQC

//--------------------------------------------------------------------------------
//Picking what suites you want to run within the main suite
//--------------------------------------------------------------------------------
//function ts_options_iqc()
//{
// ts_staging_regression_options_iqc();
//// Close Application needed here ?
//} 
//--------------------------------------------------------------------------------
//Test cases within each suite for Notes
//--------------------------------------------------------------------------------
function ts_staging_regression_options_iqc()
{
  tc_add_a_new_iqc_result();
  tc_edit_iqc_result();
  tc_delete_iqc_result();
} 
//--------------------------------------------------------------------------------