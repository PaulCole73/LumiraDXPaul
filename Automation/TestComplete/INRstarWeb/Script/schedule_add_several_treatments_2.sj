//USEUNIT V5_SQL
//USEUNIT Add_INR_Simple
//USEUNIT Navigation

//--------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------
//    var w_outfile = "c:\\Shared Stuff\\V5_Results\\InRangeDoseUnchanging_"+w_Run+".csv";
//
//    aqFile.WriteToTextFile(w_outfile, w_Run + "\r\n",  aqFile.ctANSI, true);
//    //----------------------------------------------------------------------------------------
//
//    set_parameters(w_Run, wf_round, w_RoundVal, wf_NPSA, wf_algo);
//    
//    Log_On(2); // Doctor2 at Location2
//    
//    var INRstarV5 = set_system(); 
//        
//    Goto_Patient_Search();
//    preset_Fetch_Patient(INRstarV5, w_Name);
//    
//    driver = DDT.ExcelDriver("C:\\Schedule_Testing\\TestData\\TestData-InRangeDoseUnchanging.csv");
//     //driver.Next(); //ignore header row
//    
//    // driver file details
//    var d_RecordNo;                     // column 13
//    var d_InputTargetINR;               // column 6    
//    var d_current_INR = "";             // column 7
//    var d_previous_dose = ""            // column 8
//    var d_previous_review = "";         // n/a
//    
//    // Overall working storage
//    var w_saved_Target_INR = ""; // Save the first value 
//    var w_saved_Prev_dose = "";
//    
//    // This bit reads the file of test values, and processes each row which matches the w_Run value 
//    while (!driver.EOF())
//    {
//      if (driver.Value(0) == w_Run)
//      {
//------------------------------------------------------------------------------------------------------
// Routine to read in several sets of patient treatments and add them in
//------------------------------------------------------------------------------------------------------

function add_several_treatments()
{

  var w_ptno = "ceh1";

  wa_inr = new Array(5);
  wa_inr[0] = "1.9";   // 7
  wa_inr[1] = "2.3";   // 7
  wa_inr[2] = "2.5";   // 14
  wa_inr[3] = "2.4";   // 28  
  wa_inr[4] = "1.7";   // 7 - total = 63
  
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  
  var w_row;

  var w_days = driver.Value(9);

// Loop around the number of reviews, adding each treatment, then resetting the dates  
  for (i=0; i<wa_inr.length; i++)
  {
      Goto_Patient_New_INR();
      add_inr_simple(wa_inr[i]);
     
      // Find the suggested Review Period
      var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
      var panelPTIH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory").Panel("PatientTreatmentINRHistory");
      var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper")
      wt_treatments = panelVPHTW.Table("PatientTreatmentHistoryTable");
      w_row = wt_treatments.Rowcount - 1;
      Log.Message ("w_row: " + w_row);
      w_review = aqConvert.StrToInt(wt_treatments.Cell(w_row,6).innerText);
      
      // Show the difference days and the review
      Log.Message("Diff: "+ w_days + ", Review : " + w_review);
      
      // Reset the treatment details
      SQL_Update_Dates_Maintenance(w_ptno, w_days, w_review);
      
      w_days = (w_days + w_review);
  }
  Goto_Patient_Treatment(); 
}