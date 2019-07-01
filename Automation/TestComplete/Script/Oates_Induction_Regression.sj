//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT Add_INR_Induction
//USEUNIT Add_INR_Simple
//USEUNIT Quick_Patient
//USEUNIT V5_SQL

//===============================================================================

function oates_patient_induction()
{
    var w_gender = "f";
    var w_firstname = "Jane";
    
//-------------------------------------------------------------------------------

    // Define the number of days to reset the Induction period back by - Treatment Plan start date will match 1st Induction Date
    var w_days_to_go_back = 0;

    var w_master_date = aqDateTime.Today();
    var w_start_days_to_go_back = 14 + w_days_to_go_back;
    var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, w_start_days_to_go_back * -1));
        
    Log.Message(w_start_date)
    
    var INRstarV5 = set_system(); 

    var w_stage;
    var w_tdate;
    var w_ntd;

   {
     // Add new Patient
             Goto_Add_Patient();
             quick_pt_demographics("Oates_Induction",w_firstname, w_gender);
             WaitSeconds(2,"");
         
             Goto_Patient_TreatmentPlan_Add();
             Log.Message(w_start_date)
             quick_pt_treatmentplan("W","Oates", w_start_date);

             var w_nhs = get_patient_nhs(INRstarV5);
             var w_pid = SQL_Find_Patient(w_nhs);
                    
     // Stage 1

     add_inr_induction_stage_1_limit(1.4);
               
               w_stage = "Induction Slow Oates stage 1";
               w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
               w_ntd = aqConvert.StrToDate( w_master_date);
               SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);         

    } 
}
//-------------------------------------------------------------------------------
function stage_2(INRstarV5, w_pid, w_master_date)
{     
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
        } 
}
