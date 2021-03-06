//USEUNIT Navigation
//USEUNIT Add_INR_Simple
//USEUNIT Delete_Treatments
//USEUNIT Quick_Patient
//USEUNIT V5_Common_Batch




//------------------------------------------------------------------------------
function quick_start()
{
          var w_stage = 4;
          var w_end_stage = 4;
          
           var INRstarV5 = set_system(); 

           // Define the output file name
          var w_File = "early_70";
          var w_outfile = "\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\testcomplete_results\\new_review_logic\\"+w_File+".csv";
          Log.Message(w_outfile);
    
           // Reset Output File
          var w_mess="New Review Logic - Patient Max Review :  " + w_File;
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);
           // Write Headings
          var w_mess="Date,INR,Dose,Sug Dose,Review,Sug Review";
          aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);
          
          // Main Loop
           while (w_stage <= w_end_stage)
           {
                     var w_review = set_review(w_stage);
                     test_70(INRstarV5, w_review, w_outfile);  
                     w_stage++; 
           }
}
//------------------------------------------------------------------------------
function test_70(INRstarV5, w_review, w_outfile)
{
          var w_adj_days = 0;
          
          while (w_adj_days <= Math.round(w_review /2 ))  //limit to 50% of review
          {                    
                    var w_current_INR = "2.3";
                    
                     // Create Historical Treatment with  Review set to Stage and Treatment date = today – (Stage * 50%) 
                    var w_adjusted_review = w_review - w_adj_days;
                    Log.Message ("w_review = " + w_adjusted_review);
                    var w_treat_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_adjusted_review * -1))); 
                    
                    Log.Message("Add historical");
                    Goto_Add_Historical();
                    var w_day = aqString.SubString(w_treat_date,0,2);
                    var w_mth = aqConvert.StrToInt(aqString.SubString(w_treat_date,3,2));
                    var w_yr = aqString.SubString(w_treat_date,6,4);

                     quick_pt_historical(w_day, w_mth, w_yr, "2.5",w_current_INR, "1.7", "0 Days", w_review, "");
                     
                    // add INR
                    Goto_Patient_New_INR();
                    add_inr_simple(w_current_INR);
                    
                    // Record values
                     var w_mess=w_review+","+w_adj_days+","+w_treat_date;
                    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);
                    record_values(INRstarV5, w_current_INR, w_outfile);
        
                    // Delete the latest treatment
                    delete_treatment();
        
                    // Delete the historical treatment
                    delete_treatment();
                    
                    // Increment the counter
                    w_adj_days++;

         }

}
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
