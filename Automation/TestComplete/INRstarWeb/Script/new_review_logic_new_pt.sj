//USEUNIT Common
//USEUNIT V5_Common
////USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT V5_SQL
//USEUNIT Navigation

//USEUNIT Add_INR_Simple
//USEUNIT Add_INR_Complex
//USEUNIT Add_INR_Complex_Override
//USEUNIT Delete_Treatments
//USEUNIT Quick_Patient


//=====================================================================================
function quick_start()
{
          var INRstarV5 = set_system(); 
      
          var w_stage = 1;
          var w_case = 17;
          
          var w_pmr = "70";
          
          new_review_logic(INRstarV5,w_pmr, w_stage, w_case);
}
//=============================================================== Full Start
function full_start()
{
          var INRstarV5 = set_system(); 
      
          var w_case = 17;
          var w_case_limit = 18;

          //--------------------------------------------------------------------------------------------
          // Set Patient Clinical Max Review Period
          var w_pmr = 70; 
          
          main_loop(INRstarV5, w_pmr, w_case, w_case_limit);

}
//=============================================================== Main Routine
function main_loop(INRstarV5, w_pmr, w_case, w_case_limit)
{
          // Main Loop
          while (w_case <= w_case_limit)
          {
                    var w_stage = 1;
                    new_review_logic(INRstarV5, w_pmr, w_stage, w_case);
                    w_case++;
          }
}
//=============================================================== Main Routine
function new_review_logic(INRstarV5, w_pmr, w_stage, w_case)
{
           // Define the output file name
          var w_File = "nrl_" + w_pmr + "_" + w_case;
          var w_outfile = "\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\testcomplete_results\\new_review_logic\\"+w_File+".csv";
          Log.Message(w_outfile);
    
           // Reset Output File
          var w_mess="New Review Logic - Patient Max Review :  " + w_File;
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);
           // Write Headings
          w_mess="Date,INR,Dose,Sug Dose,Review,Sug Review";
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);

          //-----------------------------------------------------------------------
    
          // Set global variables
          var w_current_INR = "2.3";
  
          // Start Main Loop
          while (w_stage <= 6)
          {
                    Log.Message("================== Stage " + w_stage);
       
                    quick_patient();
 
                    // Prepare working storage
                    var w_review = set_review (w_stage);
                    var w_adjusted_review = 0;
                    var w_treat_date= "";
      
                    //----------------------------------------------------------------------  Prepare patients based on Case requirements    
                     w_adjusted_review = w_review + 90;
                     
                    w_treat_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_adjusted_review * -1))); 
          
                    //---------------------------------------------------------------------- Main Process        
                    // Add primary historical record 
                    Log.Message("Add primary historical treatment");
                    var w_day = aqString.SubString(w_treat_date,0,2);
                    var w_mth = aqConvert.StrToInt(aqString.SubString(w_treat_date,3,2));
                    var w_yr = aqString.SubString(w_treat_date,6,4);

                    Goto_Add_Historical();
                     // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
                      quick_pt_historical(w_day, w_mth, w_yr, "2.5", w_current_INR, "1.7", "0 Days", w_review, "");
                     //---------------------------------------------------------------------- Add the correct sort of INR        
                    // Navigate to the New INR page
                    Goto_Patient_New_INR();
        
                    var wf_missed;
                    var wf_meds;
                    var wf_limit;
                    
                    // Add the INR
                    if(w_case == 18)          
                               wf_limit = false;
                   else
                              wf_limit = true;

                    // Create INR Treatment with Missed Dose 
                    w_review = set_review (w_stage);
                    wf_missed = true;
                    wf_meds = false;
                    add_inr_complex(w_current_INR, wf_missed, wf_meds, wf_limit);
  
                    // Reset treatment dates back by 7 days
                    reset_dates(INRstarV5);
                              
                    // Delete first treatment
                    delete_1st_treatment(INRstarV5);
                              
                    // Navigate to the New INR page
                    Goto_Patient_New_INR();
                              
                     // Record the reset values - screen needs to refresh first
                     record_values(INRstarV5, w_current_INR, w_outfile);
             
                    add_inr_simple(w_current_INR);
 
                    //---------------------------------------------------------------------- Record values & Delete added treatments        
                    // Record the values produced
                    record_values(INRstarV5, w_current_INR, w_outfile);
        
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
 //---------------------------------------------------------------------- Reset Dates
function reset_dates(INRstarV5)
{
         var w_locn_id = get_locn_id(INRstarV5);
      
          var w_nhs_no = get_patient_nhs(INRstarV5) ;
               
           // Set back-date amount
          var w_days = -7;
          var w_days2 = 7;
      
           // Update the Treatment
          SQL_Update_Dates_Maintenance_NHS(w_locn_id, w_nhs_no, w_days, w_days2);

       WaitSeconds(2,"Resetting Treatment Dates");
 }
 //---------------------------------------------------------------------- Reset Dates
function delete_1st_treatment(INRstarV5)
{
//          var w_nhs_no = get_patient_nhs(INRstarV5);
//          
//          var w_pt_id = SQL_Find_Patient(w_nhs_no)
//          
//          // Get 1st treatment id for patient
//          var w_Tid = SQL_Find_1st_Treatment(w_pt_id);
//          
//          // Delete treatment
//         SQL_Delete_treatment(w_Tid); 
         SQL_Delete_treatment(SQL_Find_1st_Treatment(SQL_Find_Patient(get_patient_nhs(INRstarV5)))); 
}
  //---------------------------------------------------------------------- Get Patient NHS No
function get_patient_nhs(INRstarV5)
{
          // Main page definitions
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          // Find Patient NHS No
          var panelPBC = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer");
          var w_nhs_no = panelPBC.Panel("patientZone1").Panel(3).Panel(0).Label("NHSNumber_DetachedLabel").innerText;
          
          return w_nhs_no;
}