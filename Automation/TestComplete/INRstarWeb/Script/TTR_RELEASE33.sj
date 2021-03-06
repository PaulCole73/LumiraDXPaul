//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation
//USEUNIT Quick_Patient

//USEUNIT Add_INR_Complex
//USEUNIT Delete_Treatments
//=====================================================================================
//
//=====================================================================================
function quick_start()
{
          var INRstarV5 = set_system(); 

          ttr_testing(INRstarV5);
}
//=============================================================== Main Routine
function ttr_testing(INRstarV5)
{
    // Define Treatment Plan options
    var wf_new_plan_after = 0; // leave as 0 to not change plans
    var wf_use_prev = true;
          
     // Define the output file name
    var w_File = "results_colin3";
    var w_outfile = "\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\testcomplete_results\\ttr\\"+w_File+".csv";
    Log.Message(w_outfile);
    
     // Reset Output File
    var w_mess="TTR Testing : " + w_File;
    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);
     // Write Headings
    w_mess="Pt no, NHS No, Date, Input INR, Recorded INR, Expected TTR, Summary TTR, Report TTR";
    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);

    // Define input file
   driver = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\testcomplete_test_data\\ttr_data\\test_data_plus_2_weeks.xls","TTR");
 
    //-----------------------------------------------------------------------
    // This bit reads the file of test values, and processes each row which matches the w_Run value 
    while (!driver.EOF())
    {
      if (driver.Value(0) == "Y")
      {
                // Add new Patient
               Goto_Add_Patient();
               quick_ttr_pt_demographics();
         
               WaitSeconds(2,"");
               
               // Reset Start Date back by this many days
               var w_adjust = 28;
                     
               Goto_Patient_TreatmentPlan_Add();
               var w_start_date =aqConvert.StrToDate(aqDateTime.AddDays(driver.Value(4), (w_adjust * -1))); 
               quick_ttr_pt_treatmentplan(w_start_date);

               var w_last_review = "7";

              //---------------------------------------------------------------------- Main Process      
              // Comment, treatment date, target_INR, INR, review, expected TTR 
              main_bit(INRstarV5, w_outfile,"1st treatment",driver.Value(1),driver.Value(4),FloatToString(driver.Value(6)),FloatToString(driver.Value(5)),driver.Value(13),driver.Value(7)); 
                    
               if (wf_new_plan_after == 1)
                         new_plan(INRstarV5,driver.Value(8),wf_use_prev);
              main_bit(INRstarV5, w_outfile,"2nd treatment",driver.Value(1),driver.Value(8),FloatToString(driver.Value(10)),FloatToString(driver.Value(9)),driver.Value(23),driver.Value(14));  

              if (wf_new_plan_after == 2)
                         new_plan(INRstarV5,driver.Value(18),wf_use_prev);
              main_bit(INRstarV5, w_outfile,"3rd treatment",driver.Value(1),driver.Value(18),FloatToString(driver.Value(20)),FloatToString(driver.Value(19)),driver.Value(36),driver.Value(29));  

              if (wf_new_plan_after == 3)
                         new_plan(INRstarV5,driver.Value(31),wf_use_prev);
              main_bit(INRstarV5, w_outfile,"4th treatment",driver.Value(1),driver.Value(31),FloatToString(driver.Value(33)),FloatToString(driver.Value(32)),w_last_review,driver.Value(42));   
         
               // Write blank line
              var w_mess="";
              aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);

          }
          driver.Next();      
  }
}
//--------------------------------------------------------------------------------------------------------
function main_bit(INRstarV5, w_outfile, p_comment, p_ptno, p_date, p_targetINR, p_inr, p_review, p_ttr)
{
       //---------------------------------------------------------------------- Main Process        
       // Add 1st historical record 
      Log.Message("Add treatment");
                    
      var w_day = aqString.SubString(p_date,0,2);
      var w_mth = aqConvert.StrToInt(aqString.SubString(p_date,3,2));
      var w_yr = aqString.SubString(p_date,6,4);
                    
 
      Goto_Add_Historical();
      // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
      quick_pt_historical(w_day, w_mth, w_yr, p_targetINR, p_inr, "1.0", "0", p_review, p_comment);
 
      //---------------------------------------------------------------------- Record values & Delete added treatments        
      // Record the values produced
      record_ttr_values(INRstarV5, w_outfile, p_ptno, get_patient_nhs(INRstarV5), p_inr, p_ttr);
}
//------------------------------------------------------------------------
// Record the Suggested Dose value
function record_ttr_values(INRstarV5, w_outfile, p_ptno, p_nhs, p_inr, p_ttr)
{  
    var w_row;

    WaitSeconds(2,"Recording TTR values");
   
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
    var panelPTIH = panelPTW.Panel("PatientTreatmentHistory").Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
    
    var wpnl_treat = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapper");
    if (wpnl_treat.Exists ==true)
          var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable");
    var wpnl_treat2 = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapperOverSix");
    if (wpnl_treat2.Exists ==true)
          var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Table("PatientTreatmentHistoryTable");

    WaitSeconds(1,"Still Recording TTR values");
          
    w_row = wt_treatments.Rowcount - 1;

    // Details
    var w_date = wt_treatments.Cell(w_row,0).innerText;    // (row, column (0 indexed))
    Sys.HighlightObject(wt_treatments.Cell(w_row,0),1);
    var w_inr = wt_treatments.Cell(w_row,1).innerText;   
    Sys.HighlightObject(wt_treatments.Cell(w_row,1),1);
   
    // Get Summary TTR Result
    var w_ttr = Get_Summary_TTR(INRstarV5);
   
    var w_mess = p_ptno + "," + p_nhs + "," + w_date +"," + p_inr + ","+ w_inr + "," + p_ttr + "," + w_ttr;
    
    Log.Message(w_mess);
   
    // Write the record to the file
    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n", aqFile.ctANSI);
}


 //---------------------------------------------------------------------- Get Patient NHS No
function get_patient_nhs(INRstarV5)
{
          // Main page definitions
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          // Find Patient NHS No
          var panelPBC = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer");
          var w_nhs_no = panelPBC.Panel("patientZone1").Panel(3).Panel(0).Label("NHSNumber_DetachedLabel").innerText;
          
          return w_nhs_no;
}
//--------------------------------------------------------------------------
function new_plan(INRstarV5, p_plan_date, p_use_prev)
{
            Goto_Patient_TreatmentPlan_Change_Diagnosis();
            quick_ttr_change_diagnosis(INRstarV5, p_plan_date, p_use_prev);
}