//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation
//USEUNIT Quick_Patient_Induction
//USEUNIT V5_SQL

//USEUNIT Add_INR_Simple
//USEUNIT Add_INR_Induction
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
function Schedule_Induction_Slow()
{
//  try
//  {
    var w_outfile = "d:\\Results\\Induction_Slow_Results.csv";

    aqFile.WriteToTextFile(w_outfile, "\r\n",  aqFile.ctANSI, true);
    //----------------------------------------------------------------------------------------

    Log_On(2); // Dr Jones @ studale
    
    // Create the Patient for Induction
    quick_patient_induction();
    
    var INRstarV5 = set_system();  
    
    driver = DDT.ExcelDriver("d:\\Test_Data\\Induction_Slow_data.xls","Induction_Slow_data");
    
    // driver file details
    var d_Pre_INR;      // column 1
    var d_Day5_INR;     // column 2    
    var d_Day8_1_INR;   // column 3
    var d_Day8_2_INR;   // column 4
    var d_Day8_3_INR;   // column 5
    var d_Day8_4_INR;   // column 6
    var d_Day8_5_INR;   // column 7
    var d_Day8_6_INR;   // column 8
    var d_Day8_7_INR;   // column 9
    var d_Day8_8_INR;   // column 10
    var d_Day8_9_INR;   // column 11

    // Working Storage    
    var w_mess;

    //Find Patient's Id value
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    //var w_NHS = panelMCP.panel("PatientRecord").Panel("PatientBannerContainer").Panel("patientZone1").Panel(3).Panel(0).Label("NHSNumber_DetachedLabel").InnerText;
    var w_PtNo = panelMCP.panel("PatientRecord").Panel("PatientBannerContainer").Panel("patientZone1").Panel(3).Panel(1).Label("PatientNumber_DetachedLabel").InnerText;    
    var w_pid = SQL_Find_Patient_No(w_PtNo);

    // This bit reads the file of test values, and processes each row which matches the w_Run value 
    while (!driver.EOF())
    {
      if (driver.Value(0) == "Y")
      {
      // Store driver file details
        d_Day5_INR = driver.value(2);    
        d_Day8_1_INR = driver.value(3);
        d_Day8_2_INR = driver.value(4);
        d_Day8_3_INR = driver.value(5);
        d_Day8_4_INR = driver.value(6);
        d_Day8_5_INR = driver.value(7);
        d_Day8_6_INR = driver.value(8);
        d_Day8_7_INR = driver.value(9);
        d_Day8_8_INR = driver.value(10);
        d_Day8_9_INR = driver.value(11);
       
        //----------------------------------------------------------        
        w_mess = "Day 5 INR ***," + d_Day5_INR+",";
        Log.Message(w_mess);
        aqFile.WriteToTextFile(w_outfile, w_mess,  aqFile.ctANSI);
        //----------------------------------------------------------        
        // Reset Dates on Pre-INR treatment - InductionStage = 1
        SQL_Update_Ind_Dates_specific(-4,1,0,w_pid);
        
        // Navigate to the New INR page
        Goto_Patient_New_INR();
        
        // Add the INR
        add_inr_simple(d_Day5_INR);
        
        // Record the values produced
        record_values(INRstarV5, d_Day5_INR, w_outfile);

         //----------------------------------------------------------   
        if (d_Day8_1_INR > 0)
           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_1_INR, w_outfile, w_pid);
        if (d_Day8_2_INR > 0)
           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_2_INR, w_outfile, w_pid);
        if (d_Day8_3_INR > 0)
           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_3_INR, w_outfile, w_pid);
        if (d_Day8_4_INR > 0)
           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_4_INR, w_outfile, w_pid);
        if (d_Day8_5_INR > 0)
           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_5_INR, w_outfile, w_pid);
        if (d_Day8_6_INR > 0)
           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_6_INR, w_outfile, w_pid);
        if (d_Day8_7_INR > 0)
           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_7_INR, w_outfile, w_pid);
        if (d_Day8_8_INR > 0)
           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_8_INR, w_outfile, w_pid);
        if (d_Day8_9_INR > 0)
           add_day_8_inr(INRstarV5, d_Day5_INR, d_Day8_9_INR, w_outfile, w_pid);

        //----------------------------------------------------------   
        // Delete the Day 5 treatment
        delete_treatment();
        
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
        w_mess = "Day 8 INR," + p_Day8_INR + ",";
        Log.Message(w_mess);
        aqFile.WriteToTextFile(w_outfile, w_mess,  aqFile.ctANSI);
        //----------------------------------------------------------        
        // Reset Dates on Stage 1 treatment - InductionStage = 2
        SQL_Update_Ind_Dates_specific(-3,2,0,w_pid);
        
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