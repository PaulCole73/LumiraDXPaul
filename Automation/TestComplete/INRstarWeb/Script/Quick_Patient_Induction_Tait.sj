//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Popups
//USEUNIT Add_INR_Induction
//USEUNIT Add_INR_Simple
//USEUNIT Quick_Patient
//USEUNIT V5_SQL


//===============================================================================
//-------------------------------------------------------------------------------
function quick_patient_induction_loop()
{
          for (i=0; i<1; i++)
          {
                    quick_patient_induction();
          }
}
//-------------------------------------------------------------------------------
function quick_patient_induction()
{
          // Define the number of days to reset the Induction period back by - Treatment Plan start date will match 1st Induction Date
         var w_days_to_go_back = 0;


        var INRstarV5 = set_system(); 

        var w_master_date = aqDateTime.Today();
        var w_start_days_to_go_back = 14 + w_days_to_go_back;
        var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, w_start_days_to_go_back * -1));
        
        // Add new Patient
       Goto_Add_Patient();
       quick_pt_demographics("Induction","John");
         
       WaitSeconds(2,"");
         
       Goto_Patient_TreatmentPlan_Add();
       quick_pt_treatmentplan("Tait", w_start_date);

       var w_nhs = get_patient_nhs(INRstarV5);
       var w_pid = SQL_Find_Patient(w_nhs);
       
       var w_stage;
       var w_tdate;
       var w_ntd;
        //----------------------------------------------------------        
          // Stage 1
         Goto_Patient_New_INR();  // Pre_Treatment INR
         add_inr_induction("1.2");
         w_stage = "Induction Slow Tait stage 1";
         w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -4));
         w_ntd = aqConvert.StrToDate( w_master_date);
         SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
         
         
         //----------------------------------------------------------        
         //Stage 2
         Goto_Patient_New_INR(); 
         add_inr_simple("2.2");
         // Reset Stage 2
         w_stage = "Induction Slow Tait stage 2";
         w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -3));
         w_ntd = aqConvert.StrToDate( w_master_date);
         SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
         // Reset Stage 1
         w_stage = "Induction Slow Tait stage 1";
         w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
         w_ntd = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -3));
         SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);

         //----------------------------------------------------------        
         //Stage 3
         Goto_Patient_New_INR();  
         add_inr_simple("2.4");
         // Reset Stage 3
         w_stage = "Induction Slow Tait stage 3";
         w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
         w_ntd = aqConvert.StrToDate( w_master_date);
         SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
         // Reset Stage 2
         w_stage = "Induction Slow Tait stage 2";
         w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -10));
         w_ntd = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
         SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
         // Reset Stage 1
         w_stage = "Induction Slow Tait stage 1";
         w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -14));
         w_ntd = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -10));
         SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);

         //------------------------------------------------------------------------------------------------------------------------------
         
         reset_induction_dates(INRstarV5,w_pid,w_days_to_go_back);
         
         Goto_Patient_Treatment();

}
//------------------------------------------------------------------------------------------------------------------------------
function quick_start_reset_induction_dates()
{
        var INRstarV5 = set_system(); 

       var w_nhs = get_patient_nhs(INRstarV5);
       var w_pid = SQL_Find_Patient(w_nhs);
       
       var w_days_to_go_back = 7;
       
        reset_induction_dates(INRstarV5,w_pid, w_days_to_go_back); 
}
//------------------------------------------------------------------------------------------------------------------------------
function reset_induction_dates(INRstarV5,w_pid, w_days_to_go_back)
{
       var w_master_date = aqConvert.StrToDate(aqDateTime.AddDays( aqDateTime.Today(), w_days_to_go_back * -1));

       var w_stage;
       var w_tdate;
       var w_ntd;

        w_stage = "Induction Slow Tait stage 3";
        w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
        w_ntd = aqConvert.StrToDate( w_master_date);
        SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
        // Reset Stage 2
        w_stage = "Induction Slow Tait stage 2";
        w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -10));
        w_ntd = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
        SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
        // Reset Stage 1
        w_stage = "Induction Slow Tait stage 1";
        w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -14));
        w_ntd = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -10));
        SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
}