//USEUNIT Common
//USEUNIT V5_Common
////USEUNIT V5_Common_Field_Tests
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
 var w_Name = "638 485 4457";  
 
 CHR_RunC(w_Name);
 
}

function CHR_RunC(w_Name)
{
  var w_Run = "RunC";
  var wf_round = false;
  var wf_NPSA = false;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}
function CHR_RunH(w_Name)
{
  var w_Run = "RunH";
  var wf_round = false;
  var wf_NPSA = false;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}



//======================================= Main Routine =================================
function Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo)
{
//  try
//  {
//   Log_On(9); // 
    
    
    var w_outfile = "\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\testcomplete_results\\Low_Range_Dose_Increases_"+w_Run+".csv";

    aqFile.WriteToTextFile(w_outfile, w_Run + " " + aqDateTime.Now() + "\r\n",  aqFile.ctANSI, true);
    //----------------------------------------------------------------------------------------

//    set_parameters(w_Run, wf_round, w_RoundVal, wf_NPSA, wf_algo);
    
    var INRstarV5 = set_system();  
       
//    Goto_Patient_Search();
//    preset_Fetch_Patient_NHS(INRstarV5, w_Name);

//    driver = DDT.ExcelDriver("d:\\Test_Data\\TestData-LowRangeDoseIncreases.xls","TestData-LowRangeDoseIncreases");
    driver = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\testcomplete_data\\Schedule_Testing\\TestData\\TestData-LowRangeDoseIncreases.xls","TestData-LowRangeDoseIncreases");
    //driver.Next(); //ignore header row
    
    // driver file details
    var d_RecordNo;                     // column 1
    var d_InputTargetINR;               // column 7    
    var d_current_INR = "";             // column 8
    var d_previous_dose = ""            // column 9
    var d_previous_review = "1";        // Not included in this input file, so default value used (in weeks)
    
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
        
        Log.Message("========= Record No : " + d_RecordNo + " --------------------------------------");
        
//        // test if the Target INR has changed from the previous record and if so reset it
//        if(w_saved_Target_INR != d_InputTargetINR)
//        {
           Goto_Patient_Clinical_Edit();
           set_target_inr(INRstarV5, d_InputTargetINR);
           
//           w_saved_Target_INR = d_InputTargetINR;
//        }     
        // Test if the Dose has changed from the previous record and if so, delete the previous historical record and
        // insert a new one with the new settings 
//        if (w_saved_Prev_dose != d_previous_dose)
//        {
//           Goto_Patient_Treatment();
//           delete_treatment(INRstarV5);
           
           Goto_Add_Historical();
           insert_historical_treatment(INRstarV5, d_InputTargetINR, d_current_INR, d_previous_dose, d_previous_review);
         
//           w_saved_Prev_dose = d_previous_dose;
//        }  
          
        // Navigate to the New INR page
        Goto_Patient_New_INR();
        
        // Add the INR
        add_inr_simple(d_current_INR);
        
        // Record the values produced
        record_values_2(INRstarV5, w_outfile);
        
        // Delete the latest treatment
        delete_treatment(INRstarV5);
        // Delete the historical treatment
        delete_treatment(INRstarV5);
        
      }
      driver.Next();      
    }
//  }
//  catch(exception)
//  {
//     Log.Error("Exception", exception.description);
//  }
}
