//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT Add_INR_Induction
//USEUNIT Add_INR_Simple
//USEUNIT V5_SQL

//========================================================================
//
// Add treatments to a patient


//------------------------------------------------------------
function add_several_treatments()
{
          var INRstarV5 = set_system();

          // Get patient's last NTD
          var w_ntd = get_ntd(INRstarV5);
          
          while (aqDateTime.Compare(w_ntd, aqDateTime.Today()) == -1)
          {
                    add_treatment(INRstarV5, w_ntd);
                    w_ntd = get_ntd(INRstarV5);
          }



}
//-------------------------
function add_treatment(INRstarV5, p_ntd)
{
          // Add a new treatment (today)
          // Store the new review period
          // Reset the treatment date to the previous NTD (p_ntd)
          // Reset the new NTD to be the treatment date  + the new review period 

             Goto_Patient_New_INR(); 
             add_inr_simple(w_S2_INR);
             
             var w_review = get_treatment_review(INRstarV5);
             
             // Reset Dates

             w_tdate = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
             w_ntd = aqConvert.StrToDate( w_master_date);
             SQL_Set_Back_Ind_Dates(w_pid, w_stage, w_tdate, w_ntd);

             
             }