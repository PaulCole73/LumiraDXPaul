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
      
          var w_stage = 2;
          var w_case = 19;
          
          var w_pmr = "70 Days";
          
          new_review_logic_19(INRstarV5, w_pmr, w_stage, w_case);
}
//=============================================================== Full Start
function full_start()
{
          var INRstarV5 = set_system(); 
      
          var w_case = 19;

          //--------------------------------------------------------------------------------------------
          // Set Patient Clinical Max Review Period
          var w_pmr = "70 Days";
          
          var w_stage = 1;
          new_review_logic_19(INRstarV5, w_pmr, w_stage, w_case);
}
//=============================================================== Main Routine
function new_review_logic_19(INRstarV5, w_pmr, w_stage, w_case)
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
                    Log.Message("======================= Case: " + w_case + ", Stage: " + w_stage);
       
                    var w_review = set_review (w_stage);
                    var w_adjust_value = 7;
                    var w_adjusted_review = w_review + w_adjust_value;
                    // Set up previous historical treatments
                    set_up_patient(INRstarV5, w_stage, w_current_INR, w_adjust_value );
                    
      
                    //----------------------------------------------------------------------  Prepare patients based on Case requirements    
                    var w_treat_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_adjusted_review * -1))); 
                    Log.Message ("Treatment Date is :" + w_treat_date);
          
                    //---------------------------------------------------------------------- Main Process        
                    // Add primary historical record 
                    Log.Message("Add primary historical treatment on " & w_treat_date);
                    var w_day = aqString.SubString(w_treat_date,0,2);
                    var w_mth = aqConvert.StrToInt(aqString.SubString(w_treat_date,3,2));
                    var w_yr = aqString.SubString(w_treat_date,6,4);

                    Goto_Add_Historical();

                     // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
                    quick_pt_historical(w_day, w_mth, w_yr, "2.5", w_current_INR, "4.7", "0 Days", w_review, "Primary Historical");

                    // Record the historic treatment
                    record_values(INRstarV5, w_inr, w_outfile);
                    //---------------------------------------------------------------------- Add the correct sort of INR        
                    // Navigate to the New INR page
                    Goto_Patient_New_INR();
        
                    var wf_missed;
                    var wf_meds;
                    var wf_limit;
                    var w_inr;
                    
                    // Create Previous INR Treatment with Missed Dose 
                    w_review = set_review (w_stage);
                    wf_missed = true;
                    wf_meds = false;
                    wf_limit = true;
                    add_inr_complex(w_current_INR, wf_missed, wf_meds, wf_limit);
  
                    // reset treatment dates back by 7 days
                    reset_dates(INRstarV5);
                    
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
                    // Delete the extra historical treatment
                   delete_treatment(INRstarV5);

                    // Delete historicals according to stage
                    if (w_stage >=2)
                    {
                               Log.Message("Delete Stage 2 treatment");
                               delete_treatment(INRstarV5);
                    }
                    if (w_stage >=3)
                    {
                               Log.Message("Delete Stage 3 treatment");
                               delete_treatment(INRstarV5);
                     }          
                    if (w_stage >=4)
                    {
                               Log.Message("Delete Stage 4 treatment");
                               delete_treatment(INRstarV5);
                     }          
                    if (w_stage >=5)
                    {
                               Log.Message("Delete Stage 5 treatment");
                               delete_treatment(INRstarV5);
                     }          
                    if (w_stage >=6)
                    {
                               Log.Message("Delete Stage 6 treatment");
                               delete_treatment(INRstarV5);
                     }          
                           
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