//USEUNIT Navigation
//USEUNIT Test_New_Patient_Demographics
//USEUNIT Test_New_Patient_TreatmentPlan
////USEUNIT Test_Add_Historical_Treatment

function quick_start()
{
 var inr_1 = 1.5;
 var inr_2 = 1.5;
 var inr_3 = 1.5;
 
 var wa_inr = new Array(6);
}
//===============================================================================
// Create Patient, Patient Clinical & Historical Record

//-------------------------------------------------------------------------------
function test_new_patient_induction_slow()
{
         Goto_Add_Patient();
         add_and_validate_patient_demographics();
         
         Goto_Patient_Clinical_Add();
         add_patient_clinical_induction();

         Goto_Add_Historical()
         add_Pre_Induction_INR();

//         Goto_Patient_Audit();
//         display_patient_audit("Insert Patient");

}