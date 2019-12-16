//USEUNIT Tested_Apps
//USEUNIT TC_Account_Management
//--------------------------------------------------------------------------------
//Suite of tests for Admin Dashboard Account Management

//Master Suites
//--------------------------------------------------------------------------------
function ts_master_admin_dash_account_management(send_mail)
{
  reset_folder();
  
  tc_account_management_add_a_new_client();
  tc_account_management_edit_client_details();
  tc_account_management_add_org_clinical_lead_user();
  tc_account_management_reset_org_clinical_lead_user_password();
  tc_account_management_remove_org_clinical_lead();
  tc_account_management_add_admin_lead_user();
  tc_account_management_edit_admin_lead_user();
  tc_account_management_reset_location_admin_user_password();
  tc_account_management_remove_location_admin();
  tc_account_management_create_treatment_location();
  tc_account_management_create_view_only_location();
  tc_account_management_edit_treatment_location_details();
  tc_account_management_edit_treatment_location_license();
  tc_account_management_search_facility();
  tc_account_management_change_clinical_system();
  
  email_and_archive(send_mail, "ts_account_management_master");
}