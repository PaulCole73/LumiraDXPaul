//USEUNIT Common
//USEUNIT V5_Common
////USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT V5_SQL
//USEUNIT Navigation
//USEUNIT Quick_Patient

//USEUNIT Add_INR_Simple
//USEUNIT Add_INR_Complex
//USEUNIT Add_INR_Complex_Override
//USEUNIT Add_INR_Complex_Override_Dose
//USEUNIT Delete_Treatments



//=====================================================================================
// 7- Best route
// 8 - Best route but back early
// 9 - Range limit - low - back early
// 10 - Range limit - low - back on time
// 11 - Range limit - high - back early
// 12 - Range limit - high - back on time
//=====================================================================================
function quick_start()
{
          var INRstarV5 = set_system(); 
      
          var w_stage = 2;
          var w_case = 8 //  Cases 7 - 12 only
          var w_ts = 0;  // Number of treatments in new plan before adding new INR     
          
          var w_pmr = "70 Days";
          
          split_plan_7_12(INRstarV5, w_pmr, w_stage, w_case, w_ts);
}
//=============================================================== Full Start
function full_start()
{
          var INRstarV5 = set_system(); 
      
          var w_case = 11;
          var w_case_limit = 12;  // Max is 12 !!     
          var w_ts = 0;  // Number of treatments in new plan before adding new INR     

          //--------------------------------------------------------------------------------------------
          // Set Patient Clinical Max Review Period
          var w_pmr = "70 Days";
          
          // Main Loop
          while (w_case <= w_case_limit)
          {
                    var w_stage = 1;
                    split_plan_7_12(INRstarV5, w_pmr, w_stage, w_case, w_ts);
                    w_case++;
          }
}
//=============================================================== Main Routine
function split_plan_7_12(INRstarV5, w_pmr, w_stage, w_case, w_ts)
{
           // Define the output file name
          var w_File = "SplitPlan_" + w_pmr + "_" + w_case;
          var w_outfile = "\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\testcomplete_results\\split_plan\\"+w_File+".csv";
          Log.Message(w_outfile);
    
           // Reset Output File
          var w_mess=w_File;
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

           // Write Headings
          w_mess="Patient,, Date, INR, Dose, Sug Dose, Review, Sug Review, NTD";
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);

          //-----------------------------------------------------------------------
    
          // Set global variables
          var w_current_INR = "2.3";
  
          // Start Main Loop
          while (w_stage <= 6)
          {
                    Log.Message("================== Stage " + w_stage);
       
                      // Add new Patient
                     Goto_Add_Patient();
                     quick_pt_demographics();
         
                     WaitSeconds(2,"");
         
                     Goto_Patient_TreatmentPlan_Add();
                     quick_pt_treatmentplan();

                    var w_review = set_review (w_stage);
                    var w_adjust_value = 7;
                    var w_adjusted_review = w_review + w_adjust_value;

                  // Set up previous historical treatments
                    set_up_patient(INRstarV5, w_stage, w_current_INR, w_adjust_value, w_outfile);
                    
                    //----------------------------------------------------------------------  Prepare patients based on Case requirements    
                    if (w_case == 8 || w_case == 9 || w_case == 11 )
                    {
                               // Create Historical Treatment with  Review set to Stage and Treatment date = today – (Stage * 50%) 
                              w_adjusted_review = Math.round(w_review /2 );
                    }
                    var w_treat_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_adjusted_review * -1))); 
                     
                    if (w_ts == 1)
                    {
                               // Create new plan
                              Goto_Patient_TreatmentPlan_Change_Diagnosis();
                              w_plan_date = aqConvert.StrToDate(aqDateTime.AddDays(w_treat_date, 2)); 
                              quick_change_diagnosis(INRstarV5, w_plan_date);
                   }

                    //---------------------------------------------------------------------- Main Process        
                    // Add primary historical record 
                    Log.Message("Add primary historical treatment");
                    var w_day = aqString.SubString(w_treat_date,0,2);
                    var w_mth = aqConvert.StrToInt(aqString.SubString(w_treat_date,3,2));
                    var w_yr = aqString.SubString(w_treat_date,6,4);

                    Goto_Add_Historical();

                     // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
                     quick_pt_historical(w_day, w_mth, w_yr, "2.5", w_current_INR, "1.7", "0 Days", w_review, "Primary historical treatment");
                      
                   // Record the values produced
                    record_values(INRstarV5, w_outfile, w_current_INR);

                    if (w_ts == 0)
                    {
                              // Create new plan
                              Goto_Patient_TreatmentPlan_Change_Diagnosis();
                              w_plan_date = aqConvert.StrToDate(aqDateTime.AddDays(w_treat_date, 2)); 
                              quick_change_diagnosis(INRstarV5, w_plan_date);
                    }
                     //---------------------------------------------------------------------- Add the correct sort of INR        
                    // Navigate to the New INR page
                    Goto_Patient_New_INR();
        
                    var wf_missed;
                    var wf_meds;
                    var wf_limit;
                    var w_inr;
                    
                    // Add the INR
                    if (w_case == 7 || w_case == 8 )
                    {
                              add_inr_simple(w_current_INR);
                    }
                    if (w_case == 9 || w_case == 10 )
                     {
                              add_inr_simple("2.0");
                    }
                   if (w_case == 11 || w_case == 12 )
                     {
                              add_inr_simple("3.0");
                    }

                    //---------------------------------------------------------------------- Record values & Delete added treatments        
                    // Record the values produced
                    record_values(INRstarV5, w_outfile, w_current_INR);
        
                     // Write blank line
                    var w_mess="";
                    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);

                    //---------------------------------------------------------------------- Go round the loop again        
                    // Increment w_current_INR
                    w_stage = w_stage + 1;
                    Log.Message("********************************************************** Stage is now :"+w_stage);
          }
}
//---------------------------------------------------------------------- Set Review based on Stage
function set_review(p_stage)
{
          wa_review = new Array(6);
          wa_review[0] = 7;           
          wa_review[1] =14;  
          wa_review[2] =28;  
          wa_review[3] =42;  
          wa_review[4] =56;  
          wa_review[5] =70;  
      
          var w_review = wa_review[p_stage - 1];
          return w_review;
}
