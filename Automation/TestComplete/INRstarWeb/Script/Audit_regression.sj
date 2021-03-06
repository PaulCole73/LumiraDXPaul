//USEUNIT Navigation
//USEUNIT Quick_Patient
//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT Add_INR_Simple

//=================================================================
//
// Add a new patient demographics, then check the audit
// Add a warfarin treatmenmt plan, then check the audit
//Add a historical treatment, then check the audit
//
//=================================================================
function audit_regression()
{
          // define output file
         var w_outfile = "\\\\scslsrv1\\Shared\\Development and Testing\\testing\\testcomplete_results\\audit_regression.csv";
    
         var w_mess = "";  
          // Reset Output File
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

          //----------------------------------- Add Patient
          Goto_Add_Patient();
          quick_pt_demographics("Audit", "Fred", "M");
                    
          Goto_Patient_Audit();
          write_patient_audit("Add Patient", w_outfile);
          
           //----------------------------------- Add Treatment Plan
         Goto_Patient_TreatmentPlan_Add();
         
          var w_drug = "W";
          var w_dm = "";
          var w_start = "03/03/2014";
         
          quick_pt_treatmentplan(w_drug, w_dm, w_start);

          WaitSeconds(2,"Waiting for end of Treatment Plan");
          
          Goto_Patient_Audit();
          write_patient_audit("Add Treatment Plan Details", w_outfile);

           //----------------------------------- Add Historical Treatment
          Goto_Add_Historical();
         
           // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
          quick_pt_historical("03", "3", "2014", "2.5", "2.3", "2.5", "0", "21", "Quick Patient treatment");

          Goto_Patient_Audit();
          write_patient_audit("Add Historical Treatment", w_outfile);

           //----------------------------------- Add Treatment
          Goto_Patient_New_INR();
         
          add_inr_simple(2.5);
          
          Goto_Patient_Audit();
          write_patient_audit("Add New INR", w_outfile);
}
