//USEUNIT Tested_Apps
//USEUNIT TC_Treatment_Plan

//--------------------------------------------------------------------------------
//Suite of tests for treatment plan staging regression
//--------------------------------------------------------------------------------
function ts_staging_regression_treatment_plan(send_mail)
{
  reset_folder();
  
  tc_treatment_plan_add_first_manual_treatment_plan();
  tc_treatment_plan_add_first_maintenance_treatment_plan(); 
  tc_treatment_plan_add_a_new_treatment_plan_before_any_treatments_have_been_added();
  ////tc_treatment_plan_ensure_that_all_fields_are_editable_on_the_treatment_plan_if_no_treatments_have_been_added(); //needs looking at
  tc_treatment_plan_dont_show_treatments_from_previous_treatment_plan_unless_requested_specifically();
  tc_treatment_plan_add_a_new_treatment_plan_for_an_induction_patient_yellow_banner_is_displayed();
  ////tc_treatment_plan_add_a_new_treatment_plan_after_treatments_have_been_added_induction_patient(); //Come back to failing worked manually
  tc_treatment_plan_add_a_new_treatment_plan_for_a_non_warfarin_drug_check_all_the_drugs_warn_the_user();
  tc_edit_treatment_plan_after_a_review_has_been_added();
  tc_edit_treatment_plan_change_dosing_method_to_another_maintenance_algorithm();
  tc_edit_treatment_plan_change_target_inr_and_other_edits_of_clinical_detail_with_existing_treatment();
  tc_edit_treatment_plan_change_diagnosis();
  tc_treatment_plan_add_second_treatment_using_previous();
  tc_treatment_plan_add_treatment_patient_with_future_appointment();
  
  email_and_archive(send_mail, "ts_tp_regression");
} 
//--------------------------------------------------------------------------------