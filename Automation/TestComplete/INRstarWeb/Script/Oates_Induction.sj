//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT Add_INR_Induction
//USEUNIT Add_INR_Simple
//USEUNIT Quick_Patient
//USEUNIT V5_SQL
//USEUNIT Delete_Treatments


//===============================================================================
//
// This script will create a patient & treatment plan for each incremental value of the Initial INR
// The script will then add INR treatments.
//
// The first Initiate treatment will be repeated for INRs of 0.8 to 1.3 inclusive
// For each of these, a 2nd treatment will be added for INR values of 0.8 to 2.0 inclusive
// For each of these, a 3rd treatment will be added for INR values of 1.0 to 4.0 inclusive
// A this point the details for the 3 treatments will be recorded.

// The plan start date is set to today - 14 days
// The 1st treatment is recorded today, then set back by 7 days
// The 2nd treatment is recorded today, then is set back by 7 days and the 1st treatment is set by by another 7 days
// The 3rd treatment is recorded today, then deleted, and the Dosing method reset to Oates induction
//  
//-------------------------------------------------------------------------------
function oates_patient_induction()
{
    var w_gender = "f";
    var w_firstname = "Jane";
    
//----------------------- Output file
    var w_outfile = "\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\testcomplete_results\\\Oates_" + w_gender + ".csv";
    Log.Message(w_outfile);
    
    var w_mess = "";  
    // Reset Output File
    w_mess="Oates : " + w_gender;
    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);
     // Write Headings
    w_mess="Target INR,Date,INR,Dose,Sug Dose,Review,Sug Review,NTD,Date,INR,Dose,Sug Dose,Review,Sug Review,NTD,Date,INR,Dose,Sug Dose,Review,Sug Review,NTD";
    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);
//-------------------------------------------------------------------------------

    // Define the number of days to reset the Induction period back by - Treatment Plan start date will match 1st Induction Date
   var w_days_to_go_back = 0;

    var w_master_date = aqDateTime.Today();
    var w_start_days_to_go_back = 14 + w_days_to_go_back;
    var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, w_start_days_to_go_back * -1));
        
   var INRstarV5 = set_system(); 

   var w_stage;
   var w_tdate;
   var w_ntd;
       
   var w_start_inr = 1.3; // 0.8
   var w_end_inr = 1.3; //1.3
       
   var w_S1_INR = w_start_inr;
   while (w_S1_INR  <= w_end_inr)
   {
              // Add new Patient
             Goto_Add_Patient();
             quick_pt_demographics("Oates_Induction",w_firstname, w_gender);
         
             WaitSeconds(2,"");
         
             Goto_Patient_TreatmentPlan_Add();
             quick_pt_treatmentplan("Oates", w_start_date);

             var w_nhs = get_patient_nhs(INRstarV5);
             var w_pid = SQL_Find_Patient(w_nhs);
             
              //----------------------------------------------------------        
                // Stage 1
               Goto_Patient_New_INR();  // Pre_Treatment INR
               add_inr_induction(FloatToString(w_S1_INR));
               
//               // Print diary
//               print_diary(INRstar);
               
               w_stage = "Induction Slow Oates stage 1";
               w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
               w_ntd = aqConvert.StrToDate( w_master_date);
               SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
         
              // Add all Stage 2 Treatment, and for each, add all Stage 3 treatments
             stage_2(INRstarV5, w_pid, w_outfile, w_master_date);
        
              // Delete the latest treatment
              delete_treatment(INRstarV5);
         
              w_S1_INR = roundNumber(w_S1_INR + 0.1,1);
    } 
}
//-------------------------------------------------------------------------------
function stage_2(INRstarV5, w_pid, w_outfile, w_master_date)
{
       var w_start_inr = 2.0; // 0.8
       var w_end_inr = 2; // 2.0
       
       var w_S2_INR = w_start_inr;
       while (w_S2_INR  <= w_end_inr)
       {  
             //----------------------------------------------------------        
             //Stage 2
             Goto_Patient_New_INR(); 
             add_inr_simple(w_S2_INR);
             // Reset Stage 2
             w_stage = "Induction Slow Oates stage 2";
             w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
             w_ntd = aqConvert.StrToDate( w_master_date);
             SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
             // Reset Stage 1
             w_stage = "Induction Slow Oates stage 1";
             w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -14));
             w_ntd = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
             SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);

              // Add all Stage 2 Treatment, and for each, add all Stage 3 treatments
             stage_3(INRstarV5, w_pid, w_outfile, w_master_date);
             
              // Delete the latest treatment
              delete_treatment(INRstarV5);
         
              w_S2_INR = roundNumber(w_S2_INR + 0.1,1);
        } 
}
//-------------------------------------------------------------------------------
function stage_3(INRstarV5, w_pid, w_outfile, w_master_date)
{
       var w_start_inr = 1.0;
       var w_end_inr = 4;
       
       var w_S3_INR = w_start_inr;
       while (w_S3_INR  <= w_end_inr)
       {  

               //----------------------------------------------------------        
               //Stage 3
               Goto_Patient_New_INR();  
               add_inr_simple(w_S3_INR);
//               // Reset Stage 3
//               w_stage = "Induction Slow Oates stage 3";
//               w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
//               w_ntd = aqConvert.StrToDate( w_master_date);
//               SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
//               // Reset Stage 2
//               w_stage = "Induction Slow Oates stage 2";
//               w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -14));
//               w_ntd = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
//               SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
//               // Reset Stage 1
//               w_stage = "Induction Slow Oates stage 1";
//               w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -21));
//               w_ntd = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -14));
//               SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);

                // Record the values produced
               record_values_3(INRstarV5, w_outfile)
        
                // Delete the latest treatment
                delete_treatment(INRstarV5);
                
                // Reset the Dosing Protocol
                SQL_Reset_Regime(w_pid, "Induction Slow Oates");
         
                w_S3_INR = roundNumber(w_S3_INR + 0.1,1);
        } 
}
