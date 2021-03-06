//USEUNIT Common
//USEUNIT V5_Common
////USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation

//USEUNIT Add_INR_Simple
//USEUNIT Delete_Treatments
//USEUNIT Quick_Patient

// This process creates INRtreatment records for a range of INR values,
// where the Dose remains constant at 5mg/day 

// Variable parameters that can affect the process are :
// Rounding, or not, of the dose value
// The Testing Methodolgy  

// In preparation, the process needs to :
// a) Find a patient, note the NHS number and insert it into the code below

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
 var wf_round = false;
 var w_corh = "c";
 
 var w_Start_INR = 0.8; // 0.8
 var w_End_INR = 0.9; // 9.9  - 10.0 fails as INRstar cannot provide a schedule 
 schedule_fixed_dose(w_corh, wf_algo, wf_round, w_Start_INR, w_End_INR );
 
// var w_Start_INR = 2.1;
// var w_End_INR = 5.0;     
// schedule_fixed_dose(w_corh, wf_algo, wf_round, w_Start_INR, w_End_INR );
// var w_Start_INR = 5.1;
// var w_End_INR = 8.0;     
// schedule_fixed_dose(w_corh, wf_algo, wf_round, w_Start_INR, w_End_INR );
// var w_Start_INR = 8.1;
// var w_End_INR = 10.0;     
// schedule_fixed_dose(w_corh, wf_algo, wf_round, w_Start_INR, w_End_INR );
// 
}

function   schedule_fixed_dose(w_corh, wf_algo, wf_round, w_Start_INR, w_End_INR)
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
    var w_File = "_" + w_corh + w_algo + w_round;
  
    var w_Run = "Run" + w_algo;
  

    var w_Target_INR = 2.5;    // Normally 2.5 or 3.5 !!
    var w_Fixed_Dose = 5.0;
    var wf_NPSA = false;
    var w_RoundVal = 3;
    
//    var w_NHS = "5892244377 ";      //  2.5, all Algorithm
//   var w_NHS = "8844667193 "       //  2.5, Baglin over 4
 //   var w_NHS = "6545482696"       //  2.5, Algorithm
 //var w_NHS = "1170286518" // 3.5, Baglin over 4
  
  var w_NHS = "914 286 8335" // for testing schedule pk

  
    var w_outfile = "\\\\scslsrv1\\Shared\\Development and Testing\\testing\\testcomplete_results\\\V5_Fixed_Dose"+w_File+"_"+w_Start_INR+".csv";
//    var w_outfile_audit = "\\\\scslsrv1\\Shared\\Development and Testing\\testing\\testcomplete_results\\audit_regression_sfd"+w_File+"_"+w_Start_INR+".csv";
    
    var w_mess = "";  
    // Reset Output File
    w_mess="Algorithm : " + w_Run.substr(3,1) + w_File;
    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

//     // Reset Output Audit File
//    aqFile.WriteToTextFile(w_outfile_audit, w_mess + "\r\n",  aqFile.ctANSI, true);

//    set_parameters(w_Run, wf_round, w_RoundVal, wf_NPSA, wf_algo);
    
//    Log_On(2); // Jones @ Studale
    
    var INRstarV5 = set_system(); 
      
    Goto_Patient_Search();
    preset_Fetch_Patient_NHS(INRstarV5, w_NHS);
    
//    // Set Patient Clinical Target INR
//    set_target_inr(INRstarV5, w_Target_INR);
//    preset_patient_algorithm(INRstarV5, w_corh);
//    
//    Goto_Patient_Treatment();
//    Log.Message ("Delete Treatment");
//    delete_treatment();
//    Log.Message("Add historical");
//    Goto_Add_Historical()
//    //                  Day            Month   Year   Target        INR    Dose          Review
//    quick_pt_historical(find_day(-28), "Dec", "2011", w_Target_INR, "2.2", "5.0", "28 Days");
    
    
    var w_current_INR = w_Start_INR;
    
    while (w_current_INR <= w_End_INR)
    {
        Log.Message("================== INR of " + w_current_INR);
                  
        // Navigate to the New INR page
        Goto_Patient_New_INR();
        
        // Add the INR
        add_inr_simple(w_current_INR);
        
        // Record the values produced
        record_values(INRstarV5, w_outfile);
             
        // Delete the latest treatment
        delete_treatment(INRstarV5);
        
//        //-------------------------------------------------------------- New Audit bit------------
//        Goto_Patient_Audit();
//        write_patient_audit("Add New INR", w_outfile_audit);
//        write_patient_audit("Treatment Deleted", w_outfile_audit);
//
//        //--------------------------------------------------------------- End of New Audit bit-----------
        
        
        // Increment w_current_INR
        w_current_INR = roundNumber(w_current_INR + 0.1,1);
    }
//  }
//  catch(exception)
//  {
//     Log.Error("Exception", exception.description);
//  }
}


