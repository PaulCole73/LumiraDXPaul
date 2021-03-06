//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation
//USEUNIT Quick_Patient_Induction_Tait
//USEUNIT V5_SQL
//USEUNIT Quick_Patient

//USEUNIT Add_INR_Simple
//USEUNIT Delete_Treatments

// Create a new Patient
// Add Clinical Details
// Add Pre-Treatment INR

// For each active Row in the input file
//   Reset the dates on the database to -5 days
//   Create the Day 5 INR
//   Record the Dose value
//   Reset the dates to -3 days
//   Create the Day 8 INR
//   Record the Dose & Review
//   Delete all treatment records for the patient

// Driver Values (Columns) :
// 0 - Run Y/N 
// 1 - Pre INR value
// 2 - Day 5 INR value
// 3 - Day 8 INR value - 1
// 4 - Day 8 INR value - 2
// 5 - Day 8 INR value - 3
// 6 - Day 8 INR value - 4
// 7 - Day 8 INR value - 5
// 8 - Day 8 INR value - 6
// 9 - Day 8 INR value - 7
// 10 - Day 8 INR value - 8
// 11 - Day 8 INR value - 9

//======================================= Main Routine =================================
function Load_Training_INRs()
{
//  try
//  {
    var w_outfile = "C:\\Schedule_Testing\\Results\\Load_Training_INRs.csv";

    aqFile.WriteToTextFile(w_outfile, "\r\n",  aqFile.ctANSI, true);
    //----------------------------------------------------------------------------------------

    var INRstarV5 = set_system();  
    
    driver = DDT.ExcelDriver("C:\\Schedule_Testing\\TestData\\Training_InputData_INR.csv");
    
    // driver file details
    var d_Run;    // column 0 A
    var d_Surname;         // column 1 B
    var d_Forename;        // column 2 C   
    var d_Hist_Date;       // column 3 D
    var d_Hist_Target;     // column 4 E
    var d_Hist_INR;        // column 5 F
    var d_Hist_Dose;       // coluimn 6 G
    var d_Hist_Days;       // column 7 H
    var d_Hist_Review;     // column 8 I
    var d_INR2_Date;       // column 9 J
    var d_INR2_INR;        // column  10 K
    var d_INR2_Review;     // column 11 L
    var d_INR3_Date;       // column 12 M
    var d_INR3_INR;        // column 13 N
    var d_INR3_Review;     // column 14 O
    var d_INR4_Date;       // column 15 P
    var d_INR4_INR;        // column 16 Q
    var d_INR4_Review;     // column 17 R
    var d_INR5_Date;       // column 18 S
    var d_INR5_INR;        // column 19 T
    var d_INR5_Review;     // column 20 U
    var d_INR6_Date;       // column 21 V

    // Working Storage    
    var w_mess;

//    //Find Patient's Id value
//    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//    var w_NHS = panelMCP.Panel("PatientIndexHeader").Panel("PatientBannerContainer").Panel("patientZone1").Panel(1).Panel(2).Label("NHSNumber_DetachedLabel").InnerText;
    
//    var w_pid = SQL_Find_Patient(w_NHS);

    // This bit reads the file of test values, and processes each row which matches the w_Run value 
    while (!driver.EOF())
    {
    
      if (driver.Value(0) == "Y")
      {
        d_Surname = driver.value(1);
        d_Forename = driver.value(2); 
      
        Goto_Patient_Search();
        preset_Fetch_Patient_NHS(INRstarV5, d_Surname + ", " + d_Forename);
        
        d_Hist_Date = driver.value(3);
        d_Hist_Target = driver.value(4);
        d_Hist_INR = driver.value(5);
        d_Hist_Dose = driver.value(6);
        d_Hist_Days =  driver.value(7);
        d_Hist_Review = driver.value(8);

       Goto_Patient_Treatment();

       Goto_Add_Historical();

       var w_day = aqString.SubString(d_Hist_Date,0,2);
       var w_mth = aqString.SubString(d_Hist_Date,3,2);
       var w_yr = aqString.SubString(d_Hist_Date,7,4);
       
       quick_pt_historical(w_day, set_month(w_mth), w_yr, d_Hist_Target, d_Hist_INR, d_Hist_Dose, d_Hist_Days, "");

//       //----------------------------------------------------------        
//        w_mess = "------, Day 5 INR," + d_Day5_INR;
//        Log.Message(w_mess);
//        aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);
//        //----------------------------------------------------------        
//        // Reset Dates on Pre-INR treatment - InductionStage = 1
//        SQL_Update_Dates(-4,1);
//        
//        // Navigate to the New INR page
//        Goto_Patient_New_INR();
//        
//        // Add the INR
//        add_inr_simple(d_Day5_INR);
//        
//        // Record the values produced
//        record_values(INRstarV5, d_Day5_INR, w_outfile);
//
//         //----------------------------------------------------------   
//        if (d_Day8_1_INR > 0)
//           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_1_INR, w_outfile, w_pid);
//        if (d_Day8_2_INR > 0)
//           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_2_INR, w_outfile, w_pid);
//        if (d_Day8_3_INR > 0)
//           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_3_INR, w_outfile, w_pid);
//        if (d_Day8_4_INR > 0)
//           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_4_INR, w_outfile, w_pid);
//        if (d_Day8_5_INR > 0)
//           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_5_INR, w_outfile, w_pid);
//        if (d_Day8_6_INR > 0)
//           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_6_INR, w_outfile, w_pid);
//        if (d_Day8_7_INR > 0)
//           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_7_INR, w_outfile, w_pid);
//        if (d_Day8_8_INR > 0)
//           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_8_INR, w_outfile, w_pid);
//        if (d_Day8_9_INR > 0)
//           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_9_INR, w_outfile, w_pid);
//
//        //----------------------------------------------------------   
//        // Delete the Day 5 treatment
//        delete_treatment();
        
      }
      driver.Next();      
    }
//  }
//  catch(exception)
//  {
//     Log.Error("Exception", exception.description);
//  }
}
function add_day_8_inr(INRstarV5, d_Day5_INR, p_Day8_INR, w_outfile, w_pid)
{
        w_mess = ",Day 8 INR," + p_Day8_INR;
        Log.Message(w_mess);
        aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);
        //----------------------------------------------------------        
        // Reset Dates on Stage 1 treatment - InductionStage = 2
        SQL_Update_Dates(-3,2);
        
        // Navigate to the New INR page
        Goto_Patient_New_INR();
        
        // Add the INR
        add_inr_simple(p_Day8_INR);
        
        // Record the values produced
        record_values(INRstarV5, p_Day8_INR, w_outfile);

        //----------------------------------------------------------        
        // Delete the Day 8 treatment
        delete_treatment();

        // Reset the patient to "Induction Slow"
        SQL_Reset_Regime(w_pid, "Induction Slow");
        
        

}