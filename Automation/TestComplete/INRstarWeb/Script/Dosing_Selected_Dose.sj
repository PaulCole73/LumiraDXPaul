//USEUNIT Common
//USEUNIT V5_Common
////USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation

//USEUNIT Batch_Add_INR
//USEUNIT Delete_Treatments
//USEUNIT Quick_Patient

// This process creates INRtreatment records for a selected range of INR values,
// where the Dose remains constant at 5mg/day 

// Variable parameters that can affect the process are :
// Rounding, or not, of the dose value
// The Testing Methodolgy  

// In preparation, the process needs to :
// a) Find a patient

// Then, for each INR value, the process needs to
// b) Navigate to the New INR process
// c) Add the New INR values and click the Suggest button
// d) Click the Confirm button
// e) Click the Accept buton - this may be difficult if the INR does not give a single schedule option
// f) Click the Close button on the Make an Apointment pop-up
// g) Record the results of the INR treatment
// h) Delete the INR treatment

function quick_start()
{
 var wf_algo = false;
 var wf_round = true;
 var w_corh = "c";
 var wf_high_low = "H";
 
 schedule_fixed_dose(w_corh, wf_algo, wf_round, wf_high_low);
 
}

function   schedule_fixed_dose(w_corh, wf_algo, wf_round, wf_high_low)
{
//  try
//  {
    var w_algo;
    var w_round;
    if (wf_algo == true)
       w_algo = "A";   
    else
        w_algo = "B";
    if (wf_round == true)
       w_round = "R";
    else
        w_round = "NR";    
  
   // Define the output file name
    var w_File = "_" + w_corh + w_algo + w_round + wf_high_low;
  
    var w_Run = "Run" + w_algo;
    var w_Fixed_Dose = 5.0;
    var wf_NPSA = false;
    var w_RoundVal = 3;
  
    if (wf_high_low == "H")
    {
        var w_Target_INR = 3.5;    

        var wa_INR = new Array(10);
        wa_INR[0] = 3.5;
        wa_INR[1] = 3.6;
        wa_INR[2] = 4.0;
        wa_INR[3] = 4.1;
        wa_INR[4] = 5.0;
        wa_INR[5] = 5.1;
        wa_INR[6] = 6.0;
        wa_INR[7] = 6.1;
        wa_INR[8] = 7.9;
        wa_INR[9] = 8.0;
    }
    else
    {
        var w_Target_INR = 2.5;    

        var wa_INR = new Array(12);
        wa_INR[0] = 3.0;
        wa_INR[1] = 3.1;
        wa_INR[2] = 3.5;
        wa_INR[3] = 3.6;
        wa_INR[4] = 4.0;
        wa_INR[5] = 4.1;
        wa_INR[6] = 5.0;
        wa_INR[7] = 5.1;
        wa_INR[8] = 6.0;
        wa_INR[9] = 6.1;
        wa_INR[10] = 7.9;
        wa_INR[11] = 8.0;
    }
    
    var w_Name = "PATIENT_657, Forename_765";

  
    var w_outfile = "c:\\Shared Stuff\\V5_Results\\V5_Fixed_Dose"+w_File+".csv";
    Log.Message(w_outfile);
    
    var w_mess = "";  
    // Reset Output File
    w_mess="Algorithm : " + w_Run.substr(3,1) + w_File;
    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

    set_parameters(w_Run, wf_round, w_RoundVal, wf_NPSA, wf_algo);
    
    Log_On(2); // Doctor2 at Location2
    
    var INRstarV5 = set_system(); 
      
    Goto_Patient_Search();
    preset_Fetch_Patient(INRstarV5, w_Name);
    
    // Set Patient Clinical Target INR
    set_target_inr(INRstarV5, w_Target_INR);
    preset_patient_algorithm(INRstarV5, w_corh);
    
    Goto_Patient_Treatment();
    delete_treatment();
    Goto_Add_Historical()
    //                  Day            Month   Year   Target        INR    Dose          Review
    quick_pt_historical(find_day(-28), "Sep", "2010", w_Target_INR, "2.2", "5.0", "28 Days");
    
    
    for (i=0; i< wa_INR.length; i++)
    {
        Log.Message("================== INR of " + wa_INR[i]);
                  
        // Navigate to the New INR page
        Goto_Patient_New_INR();
        
        // Add the INR
        batch_add_inr(wa_INR[i], w_outfile);
        
        // Delete the part-latest treatment
        delete_part_treatment();
        
    }
//  }
//  catch(exception)
//  {
//     Log.Error("Exception", exception.description);
//  }
}


