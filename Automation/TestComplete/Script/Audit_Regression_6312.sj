//USEUNIT Navigation
//USEUNIT Quick_Patient
//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT Add_INR_Simple
//USEUNIT Create_Clinics
//USEUNIT V5_Common_Letter
//USEUNIT quick_users

//=================================================================
// Audit Regression Testing for Location System Audit
//=================================================================
// Run script to : 
//        Logon
//        Edit a PoCT batch
//         Add a Neqas result
//         Add an A/C Clinician
//         View the Overdue report
//
// Run script to:
//         Add a clinic
//
// Run script to:
//         view the Tests Due List
//        Run a report
//        Add a bespoke letter
//        Add a user
//
//=================================================================
function audit_regression_6312()
{
          ar_6312a();
          ar_6312b();
          ar_6312c();
          ar_6312d();
}
//=================================================================
function ar_6312a()
{
          // define output file
         var w_outfile = "\\\\scslsrv1\\Shared\\Development and Testing\\testing\\testcomplete_results\\audit_regression_6312a.csv";
    
         var w_mess = "";  
          // Reset Output File
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

          //----------------------------------- Logon
          Log_On_User("","");
                    
          Goto_Options_Audit();
          write_system_audit("Log on", w_outfile);
          
          //----------------------------------- Set INRstarV5
          var INRstarV5 = set_system();
          
          //----------------------------------- Add a PoCT batch
          add_poct_batch();
                    
          Goto_Options_Audit();
          write_system_audit("Add PoCT Batch", w_outfile);
          
          //----------------------------------- Add a NEQAS record
          Goto_Options_EQC();
          add_NEQAS();
                    
          Goto_Options_Audit();
          write_system_audit("Added EQC Result", w_outfile);
          
          //----------------------------------- Add an A/C Clinician
          Goto_Options_Clinicians();
          add_clinician();
                    
          Goto_Options_Audit();
          write_system_audit("Add A/C Clinician", w_outfile);
          
          //----------------------------------- View Overdue Report
          Goto_Report_Overdue(INRstarV5);
                    
          Goto_Options_Audit();
          write_system_audit("View Overdue Report", w_outfile);

          //----------------------------------- Select Overdue Report Patient
          Goto_Report_Overdue(INRstarV5);
          
          select_overdue_patient();
                    
          Goto_Options_Audit();
          write_system_audit("View Record", w_outfile);

          //----------------------------------- Select non-Warfarin Overdue Report Patient
          Goto_Report_Overdue_NOAC_Review(INRstarV5);
          
          select_overdue_noac_patient();
                    
          Goto_Options_Audit();
          write_system_audit("View Record", w_outfile);
          
           //----------------------------------- Logoff
         Log_Off()
}
//=================================================================
function ar_6312b()
{
          // define output file
         var w_outfile = "\\\\scslsrv1\\Shared\\Development and Testing\\testing\\testcomplete_results\\audit_regression_6312b.csv";
    
         var w_mess = "";  
          // Reset Output File
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

          //----------------------------------- Logon
          Log_On_User("","");
          
          //----------------------------------- Set INRstarV5
          var INRstarV5 = set_system();

          //----------------------------------- Add a Clinic
          wa_days = new Array(6);
          wa_days[0] = "";
          wa_days[1] = "Y";
          wa_days[2] = "N";
          wa_days[3] = "N";
          wa_days[4] = "N";
          wa_days[5] = "N";
          
         create_clinics(wa_days);

          Goto_Options_Audit();
          write_system_audit("Created Clinic", w_outfile);

           //----------------------------------- Logoff
         Log_Off()
}
//=================================================================
function ar_6312c()
{
          // define output file
         var w_outfile = "\\\\scslsrv1\\Shared\\Development and Testing\\testing\\testcomplete_results\\audit_regression_6312c.csv";
    
         var w_mess = "";  
          // Reset Output File
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

          //----------------------------------- Logon
         Log_On_User("");
          
          //----------------------------------- Set INRstarV5
          var INRstarV5 = set_system();

          //----------------------------------- View Tests Due
         Goto_Tests_Due();
         var w_start_date = aqConvert.StrToDate(aqDateTime.Today());
         var w_end_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), 60));  // today + 60
         
         set_start_date(INRstarV5, aqString.SubString(w_start_date,0,2), aqConvert.StrToInt(aqString.SubString(w_start_date,3,2)), aqString.SubString(w_start_date,6,4));
         set_end_date(INRstarV5, aqString.SubString(w_end_date,0,2), aqConvert.StrToInt(aqString.SubString(w_end_date,3,2)), aqString.SubString(w_end_date,6,4));

         Goto_Options_Audit();
         write_system_audit("View Test Due Report", w_outfile);

          //----------------------------------- Run a Report
          Goto_Reports();
          Run_report_no_written_info();
          
         Goto_Options_Audit();
         write_system_audit("View Patients Without Written Information Report", w_outfile);
        
          //----------------------------------- Create a bespoke letter
         create_letter("Audit Test Letter", "1", "This is the Audit Test Letter");
         
         Goto_Options_Audit();
         write_system_audit("Add Letter", w_outfile);

          //----------------------------------- Add a User
          var w_user = "test_user"+ aqConvert.IntToStr(Math.floor(Math.random()*1000))+""
         Goto_Add_User();
         add_user_details(INRstarV5, w_user, "");
 
         Goto_Options_Audit();
         write_system_audit("Add User", w_outfile);
            
         Goto_Manage_User(w_user);
         set_low_users_permissions(INRstarV5, 4);
 
         Goto_Options_Audit();
         write_system_audit("Edit user permissions", w_outfile);

           //----------------------------------- Logoff
         Log_Off()
}
//=================================================================
function ar_6312d()
{
          //----------------------------------- Logon
//          Log_On_User("","");
          //----------------------------------- Set INRstarV5
          var INRstarV5 = set_system();

//          //----------------------------------- Select Patient
//          var w_NHS = "9148448419";      //  2.5
//          Goto_Patient_Search();
//          preset_Fetch_Patient_NHS(INRstarV5, w_NHS);
          
         Goto_Options_Audit();
         
         check_system_audit_pagination();
           //----------------------------------- Logoff
         Log_Off()
}


