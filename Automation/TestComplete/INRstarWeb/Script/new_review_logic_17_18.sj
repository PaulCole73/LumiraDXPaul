//USEUNIT Common
//USEUNIT V5_Common
////USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT V5_SQL
//USEUNIT V5_Patient_Banner
//USEUNIT Navigation

//USEUNIT Add_INR_Simple
//USEUNIT Add_INR_Complex
//USEUNIT Add_INR_Complex_Override
//USEUNIT Add_INR_Complex_Override_Dose
//USEUNIT Delete_Treatments
//USEUNIT Quick_Patient


//=====================================================================================
function quick_start()
{
          var INRstarV5 = set_system(); 
      
          var w_stage = 1;
          var w_case = 18;
          
          var w_pmr = "70 Days";
          
          new_review_logic_17_18(INRstarV5, w_pmr, w_stage, w_case);
}
//=============================================================== Full Start
function full_start()
{
          var INRstarV5 = set_system(); 
      
          var w_case = 17;
          var w_case_limit = 18;  // Cases from 17 to 18     

          //--------------------------------------------------------------------------------------------
          // Set Patient Clinical Max Review Period
          var w_pmr = "70 Days";
          
          while (w_case <= w_case_limit)
          {
                    var w_stage = 1;
                    new_review_logic_17_18(INRstarV5, w_pmr, w_stage, w_case);
                    w_case++;
          }
}
//=============================================================== Main Routine
function new_review_logic_17_18(INRstarV5, w_pmr, w_stage, w_case)
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
  
          // Add new Patient
         Goto_Add_Patient();
         quick_pt_demographics();
         
         WaitSeconds(2,"");
         
         Goto_Patient_TreatmentPlan_Add();
         quick_pt_treatmentplan();

          // Find Patient Id
          var w_pid = SQL_Find_Patient(get_patient_nhs(INRstarV5) );

          // Start Main Loop
          while (w_stage <= 6)
          {
                    Log.Message("======================= Case: " + w_case + ", Stage: " + w_stage);
       
                    // Prepare working storage
                    var w_review = set_review (w_stage);
                    var w_adjusted_review = 0;
                    var w_treat_date= "";
      
                    //----------------------------------------------------------------------  Prepare patients based on Case requirements    
                     w_adjusted_review = w_review;
                     
                    if (w_case == 17)
                    {
                               // Create Historical Treatment with  Review set to Stage and Treatment date = today – (Stage * 50%) 
                              w_adjusted_review = Math.round(w_review /2 );
                    }
                    w_treat_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_adjusted_review * -1))); 
          
                    //---------------------------------------------------------------------- Main Process        
                    // Add primary historical record 
                    Log.Message("Add primary historical treatment on " & w_treat_date);
                    var w_day = aqString.SubString(w_treat_date,0,2);
                    var w_mth = aqConvert.StrToInt(aqString.SubString(w_treat_date,3,2));
                    var w_yr = aqString.SubString(w_treat_date,6,4);

                    Goto_Add_Historical();

                     // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
                      quick_pt_historical(w_day, w_mth, w_yr, "2.5", w_current_INR, "4.7", "0 Days", w_review, "Primary Historical with missed dose");
                     
                      WaitSeconds(2,"Waiting until Historical Treatment completed");
                       
                      // Get 1st treatment
                     var w_tid = SQL_Find_1st_Treatment(w_pid); 
                     
                      // Set Missed Dose indicator
                    SQL_Update_MissedDose(w_tid);
                    
                     //---------------------------------------------------------------------- Add the correct sort of INR        
                    // Navigate to the New INR page
                    Goto_Patient_New_INR();
        
                     add_inr_simple(w_current_INR);

                    //---------------------------------------------------------------------- Record values & Delete added treatments        
                    // Record the values produced
                    record_values_2(INRstarV5, w_outfile);
        
                     // Write blank line
                    var w_mess="";
                    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);

                    // Delete the latest treatment
                    Log.Message("Delete INR treatment");
                    delete_treatment(INRstarV5);
        
                    // Delete the historical treatment
                    Log.Message("Delete historical treatment");
                    delete_treatment(INRstarV5);

                    //---------------------------------------------------------------------- Additional Tidy ups        
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
            var w_treat_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_review * -1))); 
            var w_day = aqString.SubString(w_treat_date,0,2);
            var w_mth = aqConvert.StrToInt(aqString.SubString(w_treat_date,3,2));
            var w_yr = aqString.SubString(w_treat_date,6,4);

            Goto_Add_Historical();
            quick_pt_historical(w_day, w_mth, w_yr, "2.5", w_INR, "4.7", "0 Days", w_days, "");
            
            WaitSeconds(2,"Waiting after adding Historical");
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