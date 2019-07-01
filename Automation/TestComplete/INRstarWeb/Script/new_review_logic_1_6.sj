//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation

//USEUNIT Add_INR_Complex
//USEUNIT Delete_Treatments


//=====================================================================================
// 1- Missed dose - limit review
// 2- Changed Meds- limit review
// 3- Missed Dose & Changed Meds- limit review
// 4- Missed dose - don't limit review
// 5- Changed Meds- don't limit review
// 6- Missed Dose & Changed Meds- don't limit review
//=====================================================================================
function quick_start()
{
          var INRstarV5 = set_system(); 
      
          var w_stage = 1;
          var w_case = 6; //  Cases 1 - 6 only
          
          var w_pmr = "70 Days";
          
          new_review_logic_1_6(INRstarV5, w_pmr, w_stage, w_case);
}
//=============================================================== Full Start
function full_start()
{
          var INRstarV5 = set_system(); 
      
          var w_case = 1;
          var w_case_limit = 6;  // Max is 6 !!          

          //--------------------------------------------------------------------------------------------
          // Set Patient Clinical Max Review Period
          var w_pmr = "70 Days";
          
          // Main Loop
          while (w_case <= w_case_limit)
          {
                    var w_stage = 1;
                    new_review_logic_1_6(INRstarV5, w_pmr, w_stage, w_case);
                    w_case++;
          }
}
//=============================================================== Main Routine
function new_review_logic_1_6(INRstarV5, w_pmr, w_stage, w_case)
{
           // Define the output file name
          var w_File = "nrl_" + w_pmr + "_" + w_case;
          var w_outfile = "\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\testcomplete_results\\new_review_logic\\"+w_File+".csv";
          Log.Message(w_outfile);
    
           // Reset Output File
          var w_mess="New Review Logic - Patient Max Review :  " + w_File;
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);
           // Write Headings
          w_mess="Target INR,Date,INR,Dose,Sug Dose,Review,Sug Review,NTD,Date,INR,Dose,Sug Dose,Review,Sug Review,NTD";
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);

          //-----------------------------------------------------------------------
    
          // Set global variables
          var w_current_INR = "2.3";
  
         set_max_review(INRstarV5, w_pmr);
 
          // Start Main Loop
          while (w_stage <= 6)
          {
                    Log.Message("================== Stage " + w_stage);
       
                    // Set up previous historical treatments
                    set_up_patient(INRstarV5, w_stage, w_current_INR);
                    
                    // Prepare working storage
                    var w_review = set_review (w_stage);
                    var w_adjusted_review = 0;
                    var w_treat_date= "";
      
                    //----------------------------------------------------------------------  Prepare patients based on Case requirements    
                     w_adjusted_review = w_review;
                     
                    w_treat_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_adjusted_review * -1))); 
          
                    //---------------------------------------------------------------------- Main Process        
                    // Add primary historical record 
                    Log.Message("Add primary historical treatment");
                    var w_day = aqString.SubString(w_treat_date,0,2);
                    var w_mth = aqConvert.StrToInt(aqString.SubString(w_treat_date,3,2));
                    var w_yr = aqString.SubString(w_treat_date,6,4);

                    Goto_Add_Historical();
                     // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
                     quick_pt_historical(w_day, w_mth, w_yr, "2.5", w_current_INR, "1.7", "0", w_review, "");
 
                     //---------------------------------------------------------------------- Add the correct sort of INR        
                    // Navigate to the New INR page
                    Goto_Patient_New_INR();
        
                    var wf_missed;
                    var wf_meds;
                    var wf_limit;
                    var w_inr;
                    
                    // Add the INR
                    if (w_case == 1)
                    {
                              wf_missed = true;
                              wf_meds = false;
                              wf_limit = true;
                              add_inr_complex(w_current_INR, wf_missed, wf_meds, wf_limit);
                    }
                    if (w_case == 2)
                    {
                              wf_missed = false;
                              wf_meds = true;
                              wf_limit = true;
                              add_inr_complex(w_current_INR, wf_missed, wf_meds, wf_limit);
                    }
                    if (w_case == 3)
                    {
                              wf_missed =true;
                              wf_meds = true;
                              wf_limit = true;
                              add_inr_complex(w_current_INR, wf_missed, wf_meds, wf_limit);
                    }
                    if (w_case == 4)
                    {
                              wf_missed = true;
                              wf_meds = false;
                              wf_limit = false;
                              add_inr_complex(w_current_INR, wf_missed, wf_meds, wf_limit);
                    }
                    if (w_case == 5)
                    {
                              wf_missed = false;
                              wf_meds = true;
                              wf_limit = false;
                              add_inr_complex(w_current_INR, wf_missed, wf_meds, wf_limit);
                    }
                    if (w_case == 6)
                    {
                              wf_missed =true;
                              wf_meds = true;
                              wf_limit = false;
                              add_inr_complex(w_current_INR, wf_missed, wf_meds, wf_limit);
                    }

                    //---------------------------------------------------------------------- Record values & Delete added treatments        
                   // Record the values produced
                    record_values_2(INRstarV5, w_outfile);
         
                     // Write blank line
                    var w_mess="";
                    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);

                    // Delete the latest treatment
                    delete_treatment(INRstarV5);
        
                    // Delete the historical treatment
                    delete_treatment(INRstarV5);

                    //---------------------------------------------------------------------- Additional Tidy ups        
                    // Delete historicals according to stage
                    if (w_stage >=2)
                               delete_treatment(INRstarV5);
                    if (w_stage >=3)
                               delete_treatment(INRstarV5);
                    if (w_stage >=4)
                               delete_treatment(INRstarV5);
                    if (w_stage >=5)
                               delete_treatment(INRstarV5);
                    if (w_stage >=6)
                               delete_treatment(INRstarV5);
                           
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
 //---------------------------------------------------------------------- Set Up Patient - Additional Historic Treatments
function set_up_patient(INRstarV5, w_stage, w_current_INR)
{
          Log.Message("***************** About to add additional historical treatments for Stage "+w_stage);
          
          if (w_stage == 6)
          {
                    add_hist(INRstarV5, w_current_INR, 217, 7);
                    add_hist(INRstarV5, w_current_INR, 210, 14);
                    add_hist(INRstarV5, w_current_INR, 196, 28);
                    add_hist(INRstarV5, w_current_INR, 168, 42);
                    add_hist(INRstarV5, w_current_INR, 126, 56);
//                    add_hist(INRstarV5, w_current_INR, 70, 70);
          }          
          if (w_stage == 5)
          {
                    add_hist(INRstarV5, w_current_INR, 147, 7);
                    add_hist(INRstarV5, w_current_INR, 140, 14);
                    add_hist(INRstarV5, w_current_INR, 126, 28);
                    add_hist(INRstarV5, w_current_INR, 98, 42);
//                    add_hist(INRstarV5, w_current_INR, 56, 56);
          }          
          if (w_stage == 4)
          {
                    add_hist(INRstarV5, w_current_INR, 91, 7);
                    add_hist(INRstarV5, w_current_INR, 84, 14);
                    add_hist(INRstarV5, w_current_INR, 70, 28);
//                    add_hist(INRstarV5, w_current_INR, 42, 42);
          }          
          if (w_stage == 3)
          {
                    add_hist(INRstarV5, w_current_INR, 49, 7);
                    add_hist(INRstarV5, w_current_INR, 42, 14);
//                    add_hist(INRstarV5, w_current_INR, 28, 28);
          }          
          if (w_stage == 2)
          {
                    add_hist(INRstarV5, w_current_INR, 21, 7);
//                    add_hist(INRstarV5, w_current_INR, 14, 14);
          }    
                    Log.Message("****************** End of adding additional historical treatments for Stage "+w_stage);
       
}
 //---------------------------------------------------------------------- Add History
 function add_hist(INRstarV5, w_INR, w_review, w_days)
{
//            var w_adjusted_review = w_review + w_days;
            var w_treat_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_review * -1))); 
            var w_day = aqString.SubString(w_treat_date,0,2);
            var w_mth = aqConvert.StrToInt(aqString.SubString(w_treat_date,3,2));
            var w_yr = aqString.SubString(w_treat_date,6,4);

            Goto_Add_Historical();
            quick_pt_historical(w_day, w_mth, w_yr, "2.5", w_INR, "1.7", "0", w_days, "");
 }
