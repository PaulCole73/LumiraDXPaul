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
 
 CHR_RunC1(w_Name);
 
}
    // Run No				InputAlgorithmType	InputReduceType		InputUseRounding	InputUseNPSA
    // ------       ------------------  ---------------   ----------------  ------------
    // RunC1				Coventry	          Algorithm		      FALSE	            FALSE
//    // RunC2				Coventry	          Algorithm		      FALSE           	TRUE      n/a
    // RunC3				Coventry	          Algorithm		      TRUE	            FALSE
    // RunC4				Coventry	          Algorithm		      TRUE	            TRUE
    // RunC5				Coventry	          Baglin		        FALSE	            FALSE
//    // RunC6				Coventry	          Baglin		        FALSE	            TRUE
    // RunC7				Coventry	          Baglin		        TRUE	            FALSE
    // RunC8				Coventry	          Baglin		        TRUE	            TRUE
    //
    // RunH1				Hillingdon	        Algorithm		      FALSE	            FALSE
//    // RunH2				Hillingdon	        Algorithm		      FALSE	            TRUE     n/a
    // RunH3				Hillingdon	        Algorithm		      TRUE	            FALSE
    // RunH4				Hillingdon	        Algorithm		      TRUE	            TRUE
    // RunH5				Hillingdon	        Baglin		        FALSE	            FALSE
//    // RunH6				Hillingdon	        Baglin		        FALSE	            TRUE
    // RunH7				Hillingdon	        Baglin		        TRUE	            FALSE
    // RunH8				Hillingdon	        Baglin		        TRUE	            TRUE

    // Driver Values (Columns) :
    // 0 - Run Y/N 
    // 1 - Record number             - for log/error checking
    // 2 - High Range Id
    // 3 - Target Type               - Low / High
    // 4 - Baglin Dose Percent Reduction
    // 5 - Input Algorith Type       - Coventry / Hillingdon
    // 6 - Input Reduce Type         - Algorithm / Baglin
    // 7 - Input Hillingdon Factor
    // 8 - Input Use Rounding        - t / f
    // 9 - Input Use NPSA            - t / f
    // 10 - Input RoundingDoseLimit
    // 11 - Input Target INR         - this is the overall target for the patient
    // 12 - Input Current INR        - this is the latest reading to be entered 
    // 13 - Input Current Dose
    // 14 - Input Previous Review Period
    // 15 - Input Consecutive In Range
    // 16 - Expected Suggested Dose   - this is what the system should suggest
    // 17 - Expected Suggested Review Period
    // 18 - Expected Suggested Omit Days
    
// function test(){var w_name="patient761";CHR_RunC1(w_name);}

function CHR_RunC1(w_Name)
{
  var w_Run = "RunC1";
  var wf_round = false;
  var wf_NPSA = false;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}
function CHR_RunC3(w_Name)
{
  var w_Run = "RunC3";
  var wf_round = true;
  var wf_NPSA = false;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}
function CHR_RunC4(w_Name)
{
  var w_Run = "RunC4";
  var wf_round = true;
  var wf_NPSA = true;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}
function CHR_RunC5(w_Name)
{
  var w_Run = "RunC5";
  var wf_round = false;
  var wf_NPSA = false;
  var wf_algo = false; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}
function CHR_RunC7(w_Name)
{
  var w_Run = "RunC7";
  var wf_round = true;
  var wf_NPSA = false;
  var wf_algo = false; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}
function CHR_RunC8(w_Name)
{
  var w_Run = "RunC8";
  var wf_round = true;
  var wf_NPSA = true;
  var wf_algo = false; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}
function CHR_RunH1(w_Name)
{
  var w_Run = "RunH1";
  var wf_round = false;
  var wf_NPSA = false;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}
function CHR_RunH3(w_Name)
{
  var w_Run = "RunH3";
  var wf_round = true;
  var wf_NPSA = false;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}
function CHR_RunH4(w_Name)
{
  var w_Run = "RunH4";
  var wf_round = true;
  var wf_NPSA = true;
  var wf_algo = true; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}
function CHR_RunH5(w_Name)
{
  var w_Run = "RunH5";
  var wf_round = false;
  var wf_NPSA = false;
  var wf_algo = false; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}
function CHR_RunH7(w_Name)
{
  var w_Run = "RunH7";
  var wf_round = true;
  var wf_NPSA = false;
  var wf_algo = false; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}
function CHR_RunH8(w_Name)
{
  var w_Run = "RunH8";
  var wf_round = true;
  var wf_NPSA = true;
  var wf_algo = false; 
  
  Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo);
}



//======================================= Main Routine =================================
function Main(w_Run, w_Name, wf_NPSA, wf_round, wf_algo)
{
    var w_outfile = "\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\testcomplete_results\\Common_High_Range"+w_Run+".csv";

    aqFile.WriteToTextFile(w_outfile, w_Run + "\r\n",  aqFile.ctANSI, true);
    //----------------------------------------------------------------------------------------

//    set_parameters(w_Run, wf_round, w_RoundVal, wf_NPSA, wf_algo);
    
//    Log_On(2); // Doctor2 at Location2
    
    var INRstarV5 = set_system();  
    
//    Goto_Patient_Search();
//    preset_Fetch_Patient(INRstarV5, w_Name);
    
    driver = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\testcomplete_data\\Schedule_Testing\\TestData\\TestData-CommonHighRange.xls","TestData-CommonHighRange");
   
     //driver.Next(); //ignore header row
    
    // driver file details
    var d_RecordNo;                     // column 1
    var d_InputTargetINR;               // column 11    
    var d_current_INR = "";             // column 12
    var d_previous_dose = ""            // column 13
    var d_previous_review = "";         // column 14
    
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
        d_InputTargetINR =  RemoveColon(driver.value(11));
        d_current_INR = RemoveColon(driver.value(12));
        d_previous_dose = RemoveColon(driver.value(13));
        d_previous_review = RemoveColon(driver.value(14));
        
        Log.Message("========= Record No : " + d_RecordNo + " --------------------------------------");
        
        // test if the Target INR has changed from the previous record and if so reset it
        if(w_saved_Target_INR != d_InputTargetINR)
        {
           Goto_Patient_TreatmentPlan_Edit(INRstarV5)
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
           quick_pt_historical("12", "10", "2013", "2.5", "2.3", "2.5", "0", "21", "Quick Patient treatment");
//           quick_pt_historical(p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment)
//           insert_historical_treatment(INRstarV5, d_InputTargetINR, d_current_INR, d_previous_dose, d_previous_review);

           w_saved_Prev_dose = RemoveColon(driver.value(13));
        }  
          
        // Navigate to the New INR page
        Goto_Patient_New_INR();
        
        // Add the INR
        add_inr_simple(d_current_INR);
        
        // Record the values produced
        record_values(INRstarV5, d_current_INR, w_outfile);
        
        // Delete the latest treatment
        delete_treatment(INRstarV5);
        
      }
      driver.Next();      
    }
}
