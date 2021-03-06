//USEUNIT Navigation
//USEUNIT V5_Common_Presets
//USEUNIT Delete_Treatments
//USEUNIT Add_INR_Refer
//USEUNIT Add_INR_Simple
//USEUNIT Add_INR_Override_2
//USEUNIT V5_Common_Field_Tests

function quick_start()
{
    test_out_of_range(6) ;
}


//===============================================================================
// Log on as Doctor
// Find patient
// For 1 to 6 Historical treatments
//    Add 1 Historical Treatment
//    Add Out of Range treatment
//    Record results
//    Delete latest treatment
//  

//-------------------------------------------------------------------------------
function test_out_of_range(wn_number_of_tests)
{
  wa_reviews = new Array(7);
  wa_reviews[0] = 7;
  wa_reviews[1] = 70;
  wa_reviews[2] = 56;
  wa_reviews[3] = 42;
  wa_reviews[4] = 28;
  wa_reviews[5] = 14;
  wa_reviews[6] = 7;

  wa_dates = new Array(7);
  wa_dates[0] = aqDateTime.AddDays(aqDateTime.Today(), -7);
  wa_dates[1] = aqDateTime.AddDays(wa_dates[0], -77);
  wa_dates[2] = aqDateTime.AddDays(wa_dates[0], -63);
  wa_dates[3] = aqDateTime.AddDays(wa_dates[0], -49);
  wa_dates[4] = aqDateTime.AddDays(wa_dates[0], -35);
  wa_dates[5] = aqDateTime.AddDays(wa_dates[0], -21);
  wa_dates[6] = aqDateTime.AddDays(wa_dates[0], -14);

  wd_eightyfour = aqDateTime.AddDays(aqDateTime.Today(), -84);
  
  Log.Message("Date 1: " + wa_dates[0]);
  Log.Message("Date 2: " + wa_dates[1]);
  Log.Message("Date 3: " + wa_dates[2]);
  Log.Message("Date 4: " + wa_dates[3]);
  Log.Message("Date 5: " + wa_dates[4]);
  Log.Message("Date 6: " + wa_dates[5]);
  Log.Message("Date 7: " + wa_dates[6]);
//----------------------------
  test_oor(wn_number_of_tests, wa_dates, wa_reviews)

}
function test_oor(p_count, pa_dates, pa_reviews)
{
  Log.Message("Number of Tests " + p_count);

//   Log_On(8); // Hugo Searle
//  var w_NHS = "580 379 0788";
  
  var INRstarV5 = set_system();

//  Goto_Patient_Search();
//  preset_Fetch_Patient_NHS(INRstarV5, w_NHS)
//  
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
       
  var panelPTH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
  var tablePTHT = panelPTH.Panel("PatientTreatmentINRHistory").Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable");

//  // Delete all existing treatments
//  while (tablePTHT.RowCount > 1 )
//  {
//       Goto_Patient_Treatment();
//       delete_treatment();
//  }
  
  // Navigate to the New INR page
  Goto_Patient_New_INR();
        
  // Add the Out of range INR

  var w_oor_day = aqDateTime.GetDay(pa_dates[0]);
  var w_oor_month = aqDateTime.GetMonth(pa_dates[0]);
  var w_oor_year = aqDateTime.GetYear(pa_dates[0]);
  var p_eqc = "N";
  add_inr_override_2("1.4",w_oor_day,w_oor_month,w_oor_year, p_eqc, pa_reviews[0]);
//  add_treatment(INRstarV5, pa_dates[0], "1.4", pa_reviews[0]);
  
  // Apply previous in-range treatments
  for (i=1; i < p_count+1 ; i++)
  {
    Log.Message(pa_dates[i]);
    if (pa_dates[i] > wd_eightyfour)
    {
      // Add Treatment with Override of date
      Log.Message("Treatment ");

      // Navigate to the New INR page
      Goto_Patient_New_INR();
        
      w_oor_day = aqDateTime.GetDay(pa_dates[i]);
      w_oor_month = aqDateTime.GetMonth(pa_dates[i]);
      w_oor_year = aqDateTime.GetYear(pa_dates[i]);
      add_inr_override_2("2.5",w_oor_day,w_oor_month,w_oor_year, p_eqc, pa_reviews[i])  ;
//      add_treatment(INRstarV5, pa_dates[i], "2.5", pa_reviews[i]);
      
    }
    else
    {
      // Add Historical Treatment
      Log.Message("Historical ");    

      Goto_Add_Historical()
      quick_pt_historical(INRstarV5, pa_dates[i], pa_reviews[i] );
    }
  }
  // Add the current in range INR and see what happens
  Goto_Patient_New_INR();
  add_inr_simple("2.5");

}
//-------------------------------------------------------------------------------
//
//function add_treatment(INRstarV5, p_inr_date, p_inr, p_review)
//{
//  Goto_Patient_New_INR();
//  add_inr_refer(p_inr);
//  
//  // Override Treatement
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
//  var panelPPT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
//  panelPPT.Panel(0).Button("OverridePendingTreatment").Click();
//  
//  // Click on Calendar icon
//  var formEPT = panelPPT.Form("EditPendingTreatmentForm");
//  var tableOST = formEPT.Table("OverrideSuggestedTreatmentTable");
//  tableOST.Cell(1, 0).Image("calendar_png").Click();
//  var w_datepicker = INRstarV5.Panel("ui_datepicker_div");
//  
//  var w_oor_day = aqDateTime.GetDay(p_inr_date);
//  var w_oor_month = aqDateTime.GetMonth(p_inr_date);
//  var w_oor_year = aqDateTime.GetYear(p_inr_date);
//  
//  // Set Date
//  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_oor_month));
//  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_oor_year));
//  select_day(w_oor_day, w_datepicker);
//
//  // Set Review period
//  w_vselect = tableOST.Cell(1, 3).Select("Treatment_Review");
//  w_vselect.ClickItem(p_review + " Days");
//
//  
//  // Click Save 
//  formEPT.Panel(0).Button("OverrideAccept").Click();
// 
//  // --------------------- New page -------------------------------------
//
//  // Test if a schedule exists           
//  var wf_no_sched = INRstarV5.NativeWebObject.Find("innerText", "There is no schedule available");
//  if (wf_no_sched.Exists)
//  {  
//     wf_complete = false;
//     Log.Message("Clicking Cancel button");
//               
//     // Record the values produced
//     var w_dose = panelPTC.panel("PendingTreatmentContent").Table("PendingTreatmentTable").Cell(0, 2).innerText;
//     Log.Warning("No Schedule for "+ p_INR+ ", Dose: " + w_dose);
//               
//     var panelABC = panelPTC.Panel("PendingTreatmentContent").Panel(0);
//     // Click the cancel button
//     panelABC.Button("CancelPendingTreatment").Click();
//  }
//  else
//  {
//     var panelPTT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
//   
//     // Now test if a single Schedule has been proposed or we need to choose one
//     wf_no_exact = INRstarV5.NativeWebObject.Find("idStr", "DoseScheduleWarnings_ValidationSummary");
//     if(wf_no_exact.Exists)
//     {
//         // Click the top Use button
//         Log.Message("Clicking 2nd 'Use' button");
//         panelPTT.Panel("DosingSchedule").Panel("DosingScheduleContent").Panel("ScheduleGrid").Table("ScheduleSelectorTable").Cell(2, 2).Button("Use").Click();
////                   panelPTC.Panel("PendingTreatmentContent").Panel("DosingScheduleContent").Panel("ScheduleGrid").Table("ScheduleSelectorTable").Cell(1, 2).Button("Use").Click();
//         WaitSeconds(1,"");
//     }
//     else
//         Log.Message("Exact Schedule found");
//
//     // Click the Accept button
//     Log.Message("Clicking 'Accept' button");
//     panelPTT.Panel(0).Button("AcceptPendingTreatment").Click();
//  }
//
//  
//}
//-------------------------------------------------------------------------------
//
function quick_pt_historical(INRstarV5, p_date, p_review)
{
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
    var panelPTC2 = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment").Panel("PatientTreatmentNewHistoricalWrapper");
    var formNHT = panelPTC2.Form("NewHistoricalTreatmentForm");

    formNHT.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
    var w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    var w_day = aqDateTime.GetDay(p_date);
    var w_month = aqDateTime.GetMonth(p_date);
    var w_year = aqDateTime.GetYear(p_date);
  
    // Set Date
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_month));
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_year));
    select_day(w_day, w_datepicker);


    formNHT.Table("AddHistoricalTreatmentTable").Cell(1, 1).Select("INR").ClickItem("2.5");
    formNHT.Table("AddHistoricalTreatmentTable").Cell(1, 2).Select("Dose").ClickItem("3.5");
    formNHT.Table("AddHistoricalTreatmentTable").Cell(1, 3).Select("Review").ClickItem(p_review);
    formNHT.Table("AddHistoricalTreatmentTable").Cell(1, 4).Select("TargetINR").ClickItem("2.5");
    formNHT.Textarea("Comments").innerText = "";
        
    formNHT.Panel(0).SubmitButton("Save").Click();

    // Click confirm panel
    process_confirm_historical_treatment(INRstarV5);
    
    WaitSeconds(1,"");
 
}

