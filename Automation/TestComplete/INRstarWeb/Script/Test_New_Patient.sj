//USEUNIT Navigation
//USEUNIT V5_Common

//USEUNIT Test_New_Patient_Demographics
//USEUNIT Test_New_Patient_TreatmentPlan
//USEUNIT Test_Add_Historical_Treatment

//===============================================================================
// Create Patient, Patient Clinical & Historical Record
// Last run 22/10/2013
//-------------------------------------------------------------------------------
function test_new_patient()
{
//   Log_On(8); // 

   var INRstarV5 = set_system();  

   Goto_Add_Patient();
   add_and_validate_patient_demographics(INRstarV5);
   
   WaitSeconds(20,"After adding patient");

   Goto_Patient_Audit();
   display_patient_audit("Add Patient");
         
   Goto_Patient_TreatmentPlan_Add();
   add_patient_TreatmentPlan(INRstarV5);

   WaitSeconds(20,"After adding treatment plan");

//   Goto_Patient_Audit();
//   display_patient_audit("Add Treatment Plan Details");

   Goto_Add_Historical()
   add_historical_treatment(INRstarV5);

   WaitSeconds(2,"After adding historical treatment");

//   Goto_Patient_Audit();
//   display_patient_audit("Add Historical Treatment");

}