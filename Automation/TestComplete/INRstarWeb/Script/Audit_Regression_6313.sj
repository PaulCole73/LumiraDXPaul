//USEUNIT Navigation
//USEUNIT Quick_Patient
//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT Add_INR_Simple
//USEUNIT Add_INR_Complex_Override_Dose
//USEUNIT Delete_Treatments
//USEUNIT Create_Clinics
//USEUNIT V5_Common_Letter
//USEUNIT quick_users
//USEUNIT Add_Appointment

//=================================================================
// Audit Regression Testing for Location Patient Audit
//=================================================================
// Run script to : 
//        Add Patient
//           Demographics
//           Patient Management
//           Treatment Plan (Warfarin)
//        Historical Treatment
//         Add INR
//
// Run script to:
//        Edit a Patient
//           Demographics
//           Patient Management
//           Treatment Plan (Warfarin)
//
// Run script to:
//        Add Appointment
//        Process an Appointment /// NB : Cannot be automated - cannot acess correct path to controls in DevExpress widget
//
// Run script to:
//        Check Patient Audit Trail pagination
//
// Run script to:
//        Add INR
//          Override
//          Refer
//          Authorise
//          Complete
//=================================================================
function audit_regression_6313()
{
//          ar_6313a();
//          ar_6312b();
//          ar_6312c();
//          ar_6313d();
          ar_6313e();
}
//=================================================================
function ar_6313a()
{
          // define output file
         var w_outfile = "\\\\scslsrv1\\Shared\\Development and Testing\\testing\\testcomplete_results\\audit_regression_6313a.csv";
    
         var w_mess = "";  
          // Reset Output File
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

          //----------------------------------- Logon
          Log_On_User("lead@s2","INRstar_5");
                    
          //----------------------------------- Set INRstarV5
          var INRstarV5 = set_system();
          
          //----------------------------------- Add Patient
          Goto_Add_Patient();
          quick_pt_demographics("Audit", "Fred", "M");
                    
          Goto_Patient_Audit();
          write_patient_audit("Add Patient", w_outfile);
          
          //----------------------------------- Add Patient Management Details
          var w_stem = Goto_Patient_Management_Edit(INRstarV5);
          quick_pt_management(INRstarV5);
                    
          Goto_Patient_Audit();
          write_patient_audit("Edit Patient Management Details", w_outfile);
          
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

           //----------------------------------- Logoff
         Log_Off()
}
//=================================================================
function ar_6313b()
{
          // define output file
         var w_outfile = "\\\\scslsrv1\\Shared\\Development and Testing\\testing\\testcomplete_results\\audit_regression_6313b.csv";
    
         var w_mess = "";  
          // Reset Output File
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

          //----------------------------------- Logon
//          Log_On_User("lead@s2","INRstar_5");
          
          //----------------------------------- Set INRstarV5
          var INRstarV5 = set_system();

          //----------------------------------- Edit a Patient Demographics
          Goto_Recently_Viewed();
          preset_Fetch_Patient_Recent(INRstarV5);
//
//          var w_stem = Goto_Edit_Patient_Demographics();
//          test_edit_address_line_1(w_stem);
//
//          Goto_Patient_Audit();
//          write_patient_audit("Edit Patient Details", w_outfile);
//          
          //----------------------------------- Edit a Patient Mangement Details
          Goto_Patient_Management_Edit(INRstarV5);
          add_self_test(INRstarV5);

          Goto_Patient_Audit();
          write_patient_audit("Edit Patient Management Details", w_outfile);
          
          //----------------------------------- Edit a Treatment Plan
          Goto_Patient_TreatmentPlan_Edit(INRstarV5);
          test_edit_review_period(INRstarV5);

          Goto_Patient_Audit();
          write_patient_audit("Edit Treatment Plan Details", w_outfile);
          
          
}
//=================================================================
function ar_6313c()
{
          // define output file
         var w_outfile = "\\\\scslsrv1\\Shared\\Development and Testing\\testing\\testcomplete_results\\audit_regression_6313c.csv";
    
         var w_mess = "";  
          // Reset Output File
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

          //----------------------------------- Logon
//          Log_On_User("LACEY.HOLLY18@inrstar","INRstar_5");
          
          //----------------------------------- Set INRstarV5
          var INRstarV5 = set_system();

          //-----------------------------------Fetch last used Patient
          Goto_Recently_Viewed();
          preset_Fetch_Patient_Recent(INRstarV5);

          //----------------------------------- Add Appointment
          // Add new INR
          Goto_Patient_New_INR();
         
          var w_ntd = get_ntd(INRstarV5);
          
          if (aqDateTime.Compare(w_ntd,aqDateTime.Today() ) == -1)
                    add_inr_simple(2.5);
          
          var w_ntd = get_ntd(INRstarV5);
          var w_clinic_name = set_day(aqDateTime.GetDayOfWeek(w_ntd)) + " Morning";

          Goto_Make_Appointment();
           add_appointment(INRstarV5, w_clinic_name, w_ntd);  
           //----------------------------------- Logoff
//         Log_Off()
}
//=================================================================
function ar_6313d()
{
          //----------------------------------- Logon
//          Log_On_User("LACEY.HOLLY18@inrstar","INRstar_5");
          //----------------------------------- Set INRstarV5
          var INRstarV5 = set_system();

//          //----------------------------------- Select Patient
//          var w_NHS = "9148448419";      //  2.5
//          Goto_Patient_Search();
//          preset_Fetch_Patient_NHS(INRstarV5, w_NHS);
          
         Goto_Patient_Audit();
         
         check_pagination();
           //----------------------------------- Logoff
         Log_Off()
}
//=================================================================
function ar_6313e()
{
          // define output file
         var w_outfile = "\\\\scslsrv1\\Shared\\Development and Testing\\testing\\testcomplete_results\\audit_regression_6313e.csv";
    
         var w_mess = "";  
          // Reset Output File
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

          //----------------------------------- Logon
          Log_On_User("lead@s2","INRstar_5");
                    
          //----------------------------------- Set INRstarV5
          var INRstarV5 = set_system();
          
          //-----------------------------------Fetch last used Patient
          Goto_Recently_Viewed();
          preset_Fetch_Patient_Recent(INRstarV5);

          var w_td = get_treatment_date(INRstarV5);
          
          // If Treatment Date is not in the past  (i.e. is today or in the future)
          if (aqDateTime.Compare(w_td,aqDateTime.Today() ) > -1)
          {
                    delete_treatment(INRstarV5);
          }
          //----------------------------------- Add a Pending INR Treatment
          Goto_Patient_New_INR();
         
          var w_INR = "2.3";
          var wf_missed = false;
          var wf_meds = false;
          var wf_limit = "n";
          var w_dose = "3.5";
          var w_review = "14";
          add_inr_complex_override_dose(w_INR, wf_missed, wf_meds, wf_limit, w_dose, w_review);

          Goto_Patient_Audit();
          write_patient_audit("Add New INR", w_outfile);
          
          Goto_Last_Treatment_Audit(INRstarV5);
          write_treatment_audit(w_outfile);

           //----------------------------------- Logoff
        Log_Off()
}


