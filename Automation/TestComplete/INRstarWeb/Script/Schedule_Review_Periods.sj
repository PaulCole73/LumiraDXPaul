//USEUNIT Common
//USEUNIT V5_Common
////USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT V5_SQL
//USEUNIT Navigation

//USEUNIT Add_INR_Simple
//USEUNIT Delete_Treatments
//USEUNIT Quick_Patient

// In preparation :
// Set the In Range INR Stages 2 to 6 to specific values
// Define patient to use
// Login at patient's testing location

// This process
// a) Find the patient / add a new patient
// For the number of stages specified
//  -- b1) Create a new History with stage-1 review
//   b2) Create an in-range INR Treatment
//   b3) record the treatment values
//   b4) use SQL to reset the dates of the treatment back 


function quick_start()
{
 sched_review_periods()
}
//--------------------------------------------------------------------------------------------------------------------------------
function sched_review_periods()
{
 var w_num_treatments = 5;

 var wa_reviews = new Array(5);
 wa_reviews[0] = 14;
 wa_reviews[1] = 28;
 wa_reviews[2] = 42;
 wa_reviews[3] = 56;
 wa_reviews[4] = 70;

 // Total the number of days to go back for the first treatment date
  var w_total_days = 0;
  for (i=0; i < w_num_treatments; i++)
  {
          w_total_days = w_total_days + wa_reviews[i]; 
  }
  var w_first_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_total_days * -1))); 
  var w_first_NTD = aqConvert.StrToDate(aqDateTime.AddDays(w_first_date, wa_reviews[0])); 

  var wa_dates = new Array(5); // Treatment Dates
  var wa_dates2 = new Array(5); // Next Test Dates
    
  wa_dates[0] = w_first_date;
  wa_dates2[0] = w_first_NTD;
  
  // Add the rest of the dates, adding the review value to the previoud date
  for (i=1; i < w_num_treatments; i++)
  {
          wa_dates[i] = aqConvert.StrToDate(aqDateTime.AddDays(wa_dates[i-1] , (wa_reviews[i-1])));       
          wa_dates2[i] = aqConvert.StrToDate(aqDateTime.AddDays(wa_dates2[i-1], wa_reviews[i]));      
  }     
  
   Log.Message(wa_dates[0]+", "+wa_dates2[0]);
   Log.Message(wa_dates[1]+", "+wa_dates2[1]);
   Log.Message(wa_dates[2]+", "+wa_dates2[2]);
   Log.Message(wa_dates[3]+", "+wa_dates2[3]);
   Log.Message(wa_dates[4]+", "+wa_dates2[4]);
   
   var w_NHS = "6627713187";
//    
    var INRstarV5 = set_system(); 
    
    var w_outfile = "Q:\\Development and Testing\\Testing\\TestComplete_Results\\V5_Review_Periods.csv";
    Log.Message(w_outfile);
    
    var w_mess = "";  
    // Reset Output File
    w_mess="";
    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);
    
//    // Create new patient  
//    quick_patient();
//    
    var w_nhs = get_patient_nhs(INRstarV5);
    var w_pid = SQL_Find_Patient(w_nhs);

    Goto_Patient_Search();

    preset_Fetch_Patient_NHS(INRstarV5, w_NHS);
          
    //                  Day   Month   Year   Target        INR    Dose Omits Review   Comment
   Goto_Add_Historical();
    quick_pt_historical("23", "Jan", "2013", "2.5", "1.3", "6.0", "0","7", "");
   Goto_Add_Historical();
    quick_pt_historical("30", "Jan", "2013", "2.5", "1.3", "7.0", "0","7", "");
   Goto_Add_Historical();
    quick_pt_historical("06", "Feb", "2013", "2.5", "1.3", "8.0", "0","7", "");
   Goto_Add_Historical();
    quick_pt_historical("13", "Feb", "2013", "2.5", "1.3", "9.0", "0","7", "");
   Goto_Add_Historical();
    quick_pt_historical("20", "Feb", "2013", "2.5", "1.3", "10.0", "0","7", "");
    
    for (wc_period=0; wc_period<w_num_treatments; wc_period++)
    {
        Log.Checkpoint("================== Review Period " + wc_period);
                  
        // Navigate to the New INR page
        Goto_Patient_New_INR();
        
        
        // Add the INR
        add_inr_simple("2.6")
        
        // Record the values produced
        record_values(INRstarV5,  w_outfile);
        
        //reset the dates
        SQL_Update_Dates_specific(wa_dates[wc_period-1], wa_dates2[wc_period-1], w_pid)

        Goto_Patient_Treatment();
    } 
    
//    // Exit Patient Details
//    var panelMPC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//    panelMPC.Panel("PatientRecord").Panel("PatientTab").Link("ExitPatientRecordTab").Click();
      
}
