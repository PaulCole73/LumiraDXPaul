//USEUNIT Navigation
//USEUNIT Navigate_Patient
//USEUNIT Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT V5_SQL

//USEUNIT Test_Audit

//USEUNIT Quick_Patient
//========================================================================

function release_pre_s4_1()
 {
         var INRstarV5 = set_system();

         Goto_Add_Patient();
         
         quick_pt_demographics("Pink", "Penny", "F");
         
         WaitSeconds(2,"");
         
         Goto_Patient_TreatmentPlan_Add();
         
         var w_drug = "W";
         var w_dm = "";
         var w_master_date = aqDateTime.Today();
         var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
         
         quick_pt_treatmentplan(w_drug, w_dm, w_start_date);
}    