//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation

//USEUNIT Add_INR_Simple
//USEUNIT Delete_Treatments

// For each Row in the input file
//  If the Target INR has changed from the previous Row, reset the Target INR for the Patient
//  If the Current Dose has changed from the previous Row, then delete the previous treatment and insert an historical one

function quick_start()
{
         var w_Name = "Patient_Batch, Test";
 
         RunC1(w_Name);
 
}
    //         Algorithm  Use Rounding  Use NPSA
    // RunC1 - Coventry   False         False 
    // RunC2 - Coventry   True          False 
    // RunC3 - Coventry   True          True 
    
    // RunH1 - Hillingdon False         False 
    // RunH2 - Hillingdon True          False 
    // RunH3 - Hillingdon True          True 

      
    // Driver Values (Columns) :
    // 0 - Run Y/N 
    // 1 - Record number           - for log/error checking
    // 2 - High Range              -
    // 3 - Target Type             -
    // 4 - Baglin Dose             -
    // 5 - Algorithm               - Coventry / Hillingdon
    // 6 - Use Algorith / Baglin   - 
    // 7 - Hillingdon Factor       -
    // 8 - InputUseRounding        - t/f
    // 9 - InputUseNPSA            - t/f
    // 10 - InputRoundingDoseLimit -
    // 11 - InputTargetINR         - this is the overall target for the patient
    // 12 - InputCurrentINR        - this is the latest reading to be entered 
    // 13 - InputCurrentDose       - this is the previous reading (and needs to be reset prior to each driver test)
    // 14 - Input Previous Review Period
    // 15 - Input Previous consecutive in Range
    // 16 - ExpectedSuggestedDose  - this is what the system should suggest
    // 17 - Expected Suggested review Peroid
    // 18 - Expected suggested Omit Days

function RunC1(w_Name)
{
  var w_Run = "RunC1";
  var w_Rounding = false;
  var w_NPSA = false;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, w_NPSA, w_Rounding, wf_algo);
}

function RunC2(w_Name)
{
  var w_Run = "RunC2";
  var w_Rounding = true;
  var w_NPSA = false;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, w_NPSA, w_Rounding, wf_algo);
}
function RunC3(w_Name)
{
  var w_Run = "RunC3";
  var w_Rounding = true;
  var w_NPSA = true;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, w_NPSA, w_Rounding, wf_algo);
}
function RunH1(w_Name)
{
  var w_Run = "RunH1";
  var w_Rounding = false;
  var w_NPSA = false;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, w_NPSA, w_Rounding, wf_algo);
}
function RunH2(w_Name)
{
  var w_Run = "RunH2";
  var w_Rounding = true;
  var w_NPSA = false;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, w_NPSA, w_Rounding, wf_algo);
}
function RunH3(w_Name)
{
  var w_Run = "RunH3";
  var w_Rounding = true;
  var w_NPSA = true;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, w_NPSA, w_Rounding, wf_algo);
}



//======================================= Main Routine =================================
function Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo)
{
//  try
//  {
    var w_outfile = "c:\\Shared Stuff\\V5_Results\\MidRangeDoseDecreases_"+w_Run+".csv";

    aqFile.WriteToTextFile(w_outfile, w_Run + "\r\n",  aqFile.ctANSI, true);
    //----------------------------------------------------------------------------------------

    set_parameters(w_Run, wf_round, w_RoundVal, wf_NPSA, wf_algo);
    
    Log_On(2); // Doctor2 at Location2
    
    var INRstarV5 = set_system();  
        
    Goto_Patient_Search();
    preset_Fetch_Patient(INRstarV5, w_Name);
    
    driver = DDT.ExcelDriver("C:\\Schedule_Testing\\TestData\\TestData-MidRangeDoseDecreases.csv");
     //driver.Next(); //ignore header row
    
    // driver file details
    var d_RecordNo;                     // column 1
    var d_InputTargetINR;               // column 7    
    var d_current_INR = "";             // column 8
    var d_previous_dose = ""            // column 9
    var d_previous_review = "";         // column 10
    
    // Overall working storage
    var w_saved_Target_INR = ""; // Save the first value 
    var w_saved_Prev_dose = "";
    
    // This bit reads the file of test values, and processes each row which matches the w_Run value 
    while (!driver.EOF())
    {
      if (driver.Value(0) == w_Run)
      {
      // Store driver file details
        d_RecordNo = driver.value(1);
        d_InputTargetINR =  RemoveColon(driver.value(7));
        d_current_INR = RemoveColon(driver.value(8));
        d_previous_dose = RemoveColon(driver.value(9));
        d_previous_review = 2; // Default value in weeks as input file has no data
        
        Log.Message("========= Record No : " + d_RecordNo + " --------------------------------------");
        
        // test if the Target INR has changed from the previous record and if so reset it
        if(w_saved_Target_INR != d_InputTargetINR)
        {
           Goto_Patient_Clinical_Edit();
           set_target_inr(INRstarV5, d_InputTargetINR);
           
           w_saved_Target_INR = RemoveColon(driver.value(11));
        }     
        // Test if the Dose has changed from the previous record and if so, delete the previous historical record and
        // insert a new one with the new settings 
        if (w_saved_Prev_dose != d_previous_dose)
        {
           Goto_Patient_Treatment();
           delete_treatment(INRstarV5);
           
           Goto_Add_Historical();
           insert_historical_treatment(INRstarV5, d_InputTargetINR, d_current_INR, d_previous_dose, d_previous_review);

           w_saved_Prev_dose = d_previous_dose;
        }  
          
        // Navigate to the New INR page
        Goto_Patient_New_INR();
        
        // Add the INR
        add_inr_simple(d_current_INR);
        
        // Record the values produced
        record_values(INRstarV5, d_current_INR, w_outfile);
        
        // Delete the latest treatment
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
