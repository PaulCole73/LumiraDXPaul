//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Popups
//USEUNIT Add_INR_Induction
//USEUNIT Add_INR_Simple
//USEUNIT Quick_Patient
//USEUNIT V5_SQL
//USEUNIT V5_Patient_Banner


//===============================================================================
//-------------------------------------------------------------------------------
function add_induction_treatments()
{

// **********************************************************
//
// IMPORTANT - Check circa line 208 before runing - exceptional 2nd stage INR value in use !! - not in use 04/04/16 Stu
//
// ***********************************************************

          var w_max = 1; // number of patients of each gender
         var w_algorithm = "Tait";  
         // var w_algorithm = "Oates";  
          
         //  Pick one stage only
          var w_create_stage1 = "no";
          var w_create_stage2 = "yes";
          var w_create_stage3 = "no";
          
          if (w_create_stage1 == "yes")
          {
                //--------------------------------- Stage 1
                var w_stage = 1;
                quick_patient_induction(w_stage, w_algorithm);
          }
          if (w_create_stage2 == "yes")
          {
                //--------------------------------- Stage 2
                var w_stage = 2;
                quick_patient_induction(w_stage, w_algorithm);
          }
           if (w_create_stage3 == "yes")
          {
               //--------------------------------- Stage 3
                var w_stage = 3;
                quick_patient_induction(w_stage, w_algorithm);
          }
}
//-------------------------------------------------------------------------------
function quick_patient_induction(p_stage, w_algorithm)
{
        // Define the number of days to reset the Induction period back by - Treatment Plan start date will match 1st Induction Date
        var w_fname;
        var w_start_days_to_go_back;

        var INRstarV5 = INRstar_base();

        if (w_algorithm == "Oates")
                 w_start_days_to_go_back = 21;
        if (w_algorithm == "Tait")
                 w_start_days_to_go_back = 14;
                 
        var w_master_date = aqDateTime.Today();
        var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, w_start_days_to_go_back * -1));
        
//        // Add new Patient
//       Goto_Add_Patient();
//       if (p_gender == "m")
//          w_fname = "John";
//       else
//          w_fname = "Judy";
//       
//      quick_pt_demographics(w_algorithm+"_" + p_stage + "_TTR",w_fname, p_gender);
//         
//       WaitSeconds(2,"");
         
       Goto_Patient_TreatmentPlan_Add();
       var w_drug = "W";
       quick_pt_treatmentplan(w_drug, w_algorithm, w_start_date);

       WaitSeconds(2,"Waiting for patient banner") ;
       var w_nhs = get_patient_nhs(INRstarV5);
       if (w_nhs != "")
                    var w_pid = SQL_Find_Patient(w_nhs);
       else
       {
                    var w_ptno = get_patient_ptno(INRstarV5);
                    var w_pid = SQL_Find_Patient_No(w_ptno);
       }
       
       if (w_algorithm == "Oates")
          process_oates(w_master_date, w_pid, p_stage);

       if (w_algorithm == "Tait")
          process_tait(w_master_date, w_pid, p_stage);
}
//------------------------------------------------------------------------
function process_oates(w_master_date, w_pid, p_stage)
{
       var w_stage;
       var w_tdate;
       var w_ntd;
       
        //----------------------------------------------------------        
          // Stage 1
         Goto_Patient_New_INR();  // Pre_Treatment INR
         add_inr_induction("1.2");
         w_stage = "Induction Slow Oates stage 1";
         w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
         w_ntd = aqConvert.StrToDate( w_master_date);
         SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
         
          if (p_stage > 1)
          {         
                   //----------------------------------------------------------        
                   //Stage 2
                   Goto_Patient_New_INR(); 
                   add_inr_simple("1.8");
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

                    if (p_stage > 2)
                    {         
                             //----------------------------------------------------------        
                             //Stage 3
                             Goto_Patient_New_INR();  
                             add_inr_simple("2.4");
                             // Reset Stage 3
                             w_stage = "Induction Slow Oates stage 3";
                             w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
                             w_ntd = aqConvert.StrToDate( w_master_date);
                             SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
                             // Reset Stage 2
                             w_stage = "Induction Slow Oates stage 2";
                             w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -14));
                             w_ntd = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
                             SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
                             // Reset Stage 1
                             w_stage = "Induction Slow Oates stage 1";
                             w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -21));
                             w_ntd = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -14));
                             SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);
                   }
         }
}
//------------------------------------------------------------------------
function process_tait(w_master_date, w_pid, p_stage)
{
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
         
         
        if (p_stage > 1)
        {         
                   //----------------------------------------------------------        
                   //Stage 2
                   Goto_Patient_New_INR(); 
                  add_inr_simple("2.2"); // usual INR value 
                   //add_inr_simple("3.9");  // ****************************  exceptional INR value
                   
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

                  if (p_stage > 2)
                  {         
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
                   }
         }
}