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
function quick_start()
{
          var INRstarV5 = set_system(); 
      
          var w_stage = 6;
          var w_case = 13;
          var w_ts = 0;  // Number of treatments in new plan before adding new INR     
          
          var w_pmr = "70 Days";
          
          split_plan_13_16(INRstarV5, w_pmr, w_stage, w_case, w_ts);
}
//=============================================================== Full Start
function full_start()
{
          var INRstarV5 = set_system(); 
      
          var w_case = 14;
          var w_case_limit = 16;  // Cases from 13 to 16     
          var w_ts = 0;  // Number of treatments in new plan before adding new INR     

          //--------------------------------------------------------------------------------------------
          // Set Patient Clinical Max Review Period
          var w_pmr = "70 Days";
          
          while (w_case <= w_case_limit)
          {
                    var w_stage = 1;
                    split_plan_13_16(INRstarV5, w_pmr, w_stage, w_case, w_ts);
                    w_case++;
          }
}
//=============================================================== Main Routine
function split_plan_13_16(INRstarV5, w_pmr, w_stage, w_case, w_ts)
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
                    Log.Message("======================= Case: " + w_case + ", Stage: " + w_stage);
       
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
                    if (w_case == 13 ||w_case == 14)
                    {
                              set_NPSA(INRstarV5, true);
                     }
                     
                    if (w_case == 13)
                    {
                               // Create Historical Treatment with  Review set to Stage and Treatment date = today – (Stage * 50%) 
                              w_adjusted_review = Math.round(w_review /2 );
                    }
                    if (w_case == 15 )
                    {
                              // Create Historical Treatment with  Review set to Stage and Treatment date = today – Stage - 3 days (<50% of 7 days)
                              w_adjusted_review = w_review + 3;
                    }
                   if (w_case == 16 )
                    {
                              // Create Historical Treatment with  Review set to Stage and Treatment date = today – Stage - 7 days
                              w_adjusted_review = w_review + 7;
                    }
                    w_treat_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_adjusted_review * -1))); 
          
                    if (w_ts == 1)
                    {
                               // Create new plan
                              Goto_Patient_TreatmentPlan_Change_Diagnosis();
                              w_plan_date = aqConvert.StrToDate(aqDateTime.AddDays(w_treat_date, 2)); 
                              quick_change_diagnosis(INRstarV5, w_plan_date);
                   }

                    //---------------------------------------------------------------------- Main Process        
                    // Add primary historical record 
                    Log.Message("Add primary historical treatment on " & w_treat_date);
                    var w_day = aqString.SubString(w_treat_date,0,2);
                    var w_mth = aqConvert.StrToInt(aqString.SubString(w_treat_date,3,2));
                    var w_yr = aqString.SubString(w_treat_date,6,4);

                    Goto_Add_Historical();

                     // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
                      quick_pt_historical(w_day, w_mth, w_yr, "2.5", w_current_INR, "4.7", "0 Days", w_review, "Primary Historical");

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
                    if (w_case >= 15)
                    {
                             w_inr = 3.6;
                              // Create INR Treatment with Missed Dose 
                              w_review = set_review (w_stage);
                              wf_missed = true;
                              wf_meds = false;
                              add_inr_complex(w_inr, wf_missed, wf_meds, wf_limit);
  
                              // reset treatment dates back by 7 days
                              reset_dates(INRstarV5);

                             // Record the values produced
                              record_values(INRstarV5, w_outfile, w_current_INR);
                   }
                    
                    // Navigate to the New INR page
                    Goto_Patient_New_INR();
                              
                     add_inr_simple(w_current_INR);

                    //---------------------------------------------------------------------- Record values & Delete added treatments        
                    // Record the values produced
                    record_values(INRstarV5, w_outfile, w_current_INR);
        
                     // Write blank line
                    var w_mess="";
                    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);

                    if (w_case == 13|| w_case == 14)
                    {
                              set_NPSA(INRstarV5, false);
                     }
                    //---------------------------------------------------------------------- Go round the loop again        
                    // Increment w_current_INR
                    w_stage = w_stage + 1;
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
 //---------------------------------------------------------------------- Get Location Id
function get_locn_id(INRstarV5)
{
          // Main page definitions
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");

          var panelLS = INRstarV5.Panel("MainPage").panel("Header").Panel("logindisplay").Panel("LoginStatus");
          var w_text = panelLS.TextNode(0).innerText;
           var w_at = aqString.Find(w_text,"@");
          var w_locn_name = aqString.Substring(w_text,w_at+2,50);
          
         // Find Location ID
          var w_locn_id = SQL_Get_Testing_Location_id(w_locn_name);

          return w_locn_id;
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