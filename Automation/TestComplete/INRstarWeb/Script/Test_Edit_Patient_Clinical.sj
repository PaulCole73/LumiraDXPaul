//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation
//USEUNIT V5_Common_Presets
//===============================================================================
//
// This process will edit selected fields for the Patient Clinical details
//
function quick_start()
{
//   Log_On(2); // 
   
   var INRstarV5 = set_system();  
   
//   // View recent patients
//   Goto_Recently_Viewed();
//   // Select the last used
//   preset_Fetch_Patient_Recent(INRstarV5);

   edit_patient_clinical(INRstarV5);

}
function edit_patient_clinical(INRstarV5)
{
  try
  {
      Log.Message("Editing Patient Clinical");

      Goto_Patient_TreatmentPlan_Edit(INRstarV5);
//      test_edit_testing_method(INRstarV5);
      test_edit_diagnosis(INRstarV5);
   }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}