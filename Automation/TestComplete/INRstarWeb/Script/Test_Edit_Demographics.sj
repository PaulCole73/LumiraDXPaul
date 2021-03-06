//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation
//USEUNIT V5_Common_Presets

//===============================================================================
//
// This process will edit selected fields for the Patient Demographics and is used for regression so please dont amend without asking
//
function quick_start()
{
   var INRstarV5 = set_system();  
   
   // View recent patients
   Goto_Recently_Viewed();
   
   // Select the last used
   preset_Fetch_Patient_Recent(INRstarV5);

   // Edit the patient
   edit_patient_demographics(INRstarV5);
}

function edit_patient_demographics(INRstarV5)
{
      Log.Message("Editing Patient Demographics");

      Goto_Edit_Patient_Demographics();
      test_edit_title();
      Goto_Patient_Audit();
      display_top_patient_audit("Edit Patient Details");
      
       Goto_Edit_Patient_Demographics();
      test_edit_family();
      Goto_Patient_Audit();
      display_top_patient_audit("Edit Patient Details");
      
     Goto_Edit_Patient_Demographics();
      test_edit_address_line_1();
      Goto_Patient_Audit();
      display_top_patient_audit("Edit Patient Details");
      
      Goto_Edit_Patient_Demographics();
      test_edit_address_town();
      Goto_Patient_Audit();
      display_top_patient_audit("Edit Patient Details");
      
      Goto_Edit_Patient_Demographics();
      test_edit_address_county();
      Goto_Patient_Audit();
      display_top_patient_audit("Edit Patient Details");
      
      Goto_Edit_Patient_Demographics();
      test_edit_date_of_birth_regression();
      Goto_Patient_Audit();
      display_top_patient_audit("Edit Patient Details");
}