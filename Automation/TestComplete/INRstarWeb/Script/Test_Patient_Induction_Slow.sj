//USEUNIT Navigation
//USEUNIT Test_New_Patient_Demographics
//USEUNIT Test_New_Patient_TreatmentPlan
//USEUNIT Test_Add_Historical_Treatment

//===============================================================================
// Create Patient, Patient Clinical & Historical Record

//-------------------------------------------------------------------------------
function test_new_patient()
{
         Goto_Add_Patient();
         add_and_validate_patient_demographics();
         
         Goto_Patient_Clinical_Add();
         add_patient_clinical();

         Goto_Add_Historical()
         add_historical_treatment();

         Goto_Patient_Audit();
         display_patient_audit("Insert Patient");

}