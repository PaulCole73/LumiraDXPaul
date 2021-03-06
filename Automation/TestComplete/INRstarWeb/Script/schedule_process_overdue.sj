//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT Add_INR_Simple
//USEUNIT Add_INR_Manual
//USEUNIT V5_SQL
//USEUNIT V5_Common_Popups
//USEUNIT Add_Appointment


//===============================================================================
// For each patient in the overdue report
//  Add a treatment
//  Reset the treatment date to the correct Next Test Date
//===============================================================================

function quick_start()
{
  wf_all_treatments = true;
  wf_add_appointment = false;
  schedule_process_overdue(wf_all_treatments, wf_add_appointment);  
}
//===============================================================================

function schedule_process_overdue(pf_all, pf_add)
{
  var INRstarV5 = set_system(); 

  Goto_Report_Overdue(INRstarV5);
   
  // Set some basic values
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
   
  var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");

  var tablePORT = panelUCR.panel("OverduePatients").table("PatientOverdueReportTable"); 
  
  // Get Location Id
  var w_locn_id = get_locn_id(INRstarV5);
      
  wc_pt = 1;
   
  if (tablePORT.RowCount > 1)
    wf_cont = true;
  // Loop around list whilst some patients exist
  while (wf_cont == true)
  {     
      // Add check for Overdue being greater than 7
 //      if (tablePORT.Cell(wc_pt,6).innerText < 190) //- temp tweak to improve performance
     if (tablePORT.Cell(wc_pt,6).innerText < 8)
      {
         wf_cont = false;
      }
      else
      {
                      // Select patient (depending on how many are being ignored)
                      tablePORT.Cell(wc_pt,0).Link("PatientLink").Click();
                      var w_ret = "";
      
                      // Check if Patient is 'Manual'
                      if (process_confirm_sub_ret(INRstarV5, "The patient's dosing method is currently set to : Manual") == true)
                         w_ret = "M";
                      else
                      {
                              // Check if the patient is Induction & ignore
                              if (process_confirm_sub_ret(INRstarV5, "The patient's dosing method is currently set to : Induction Slow") == true)
                              {
                                 w_ret = "I";
                                 wc_pt++;
                              }
                              else
                              {
                                        // Check if the patient is Passed End Date & ignore
                                        if (process_confirm_sub_ret(INRstarV5, "Please confirm") == true)
                                        {
                                                    w_ret = "E";
                                                    wc_pt++;
                                        }
                              }
                      }
                      if (w_ret == "" || w_ret == "M")      
                      {      
          
            //                // Change Surname
            //                change_surname(panelMCP);
                
                            // Go to the relevant New INR page
                            Goto_Patient_New_INR();
                            
                            WaitSeconds(2,"Watingin for New INR page");
            
                            // Find the NHS Number, Patient Number & target INR
                            var panelPBC = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer");
                            var w_nhs = panelPBC.Panel("patientZone1").Panel(3).Panel(0).Label("NHSNumber_DetachedLabel").innerText;
                            var w_ptno = panelPBC.Panel("patientZone1").Panel(3).Panel(1).Label("PatientNumber_DetachedLabel").innerText;
                            var w_target_inr = panelPBC.Panel("PatientBanner").Panel(1).Panel(2).Label("TargetINR_DetachedLabel").innerText;

                            // Process an INR for this patient
                            if (w_ret == "M")
                               do_manual_treatment(INRstarV5,set_INR(w_target_inr))
                            if (w_ret == "")
                               add_inr_simple(set_INR(w_target_inr));
                   
                            WaitSeconds(2);
          
                            // Find the suggested Review Period & Next Test Date
                            var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
                            var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
                            var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
  
                            if (panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Exists == true)
                                      var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Table("PatientTreatmentHistoryTable")
                            else
                                      var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable")

                            var w_row = wt_treatments.Rowcount - 1;
      
                            var w_review = wt_treatments.Cell(w_row,5).innerText;
                
                            if (pf_all == true)
                            {
                                      // Get treatment date from previous row
                                      var w_treatdate = convert_date(aqConvert.StrToDate(wt_treatments.Cell(w_row-1,7).innerText));
  
                                      var w_ntd = convert_date(aqConvert.StrToDate(aqDateTime.AddDays(w_treatdate, aqConvert.StrToInt(w_review))));

                                      Log.Message("w_ntd : " + w_ntd);

                                      // Reset the treatment details
                                      var w_section = get_locn_id(INRstarV5);
                                      if (w_nhs != "None")
                                          var w_pid = SQL_Find_Patient_By_NHS_Status_Section(w_nhs, "Active", w_section)  
                                      else
                                          var w_pid = SQL_Find_Patient_No(w_ptno);

                                      SQL_Update_Treatment_Dates_NHS(w_locn_id, w_pid, w_treatdate, w_ntd);
                
//                                      if (w_ntd >= aqDateTime.Today() && pf_add == true)
//                                      {
//                                              // Make an appointment
//                                              var w_time_of_clinic = " Morning";
//                                              var w_clinic_name = set_day(aqDateTime.GetDayOfWeek(w_ntd)) + w_time_of_clinic;
//
//                                              Goto_Make_Appointment();
//                                              add_appointment(INRstarV5, w_clinic_name, w_ntd);
//                                      }
                            }
                            else
                            {
//                                      if (pf_add == true)
//                                      {
//                                                // Get treatment date from treatment
//                                                var w_ntd = convert_date(aqConvert.StrToDate(wt_treatments.Cell(w_row,7).innerText));
//
//                                                // Make an appointment
//                                                var w_time_of_clinic = " Morning";
//                                                var w_clinic_name = set_day(aqDateTime.GetDayOfWeek(w_ntd)) + w_time_of_clinic;
//
//                                                Goto_Make_Appointment();
//                                                add_appointment(INRstarV5, w_clinic_name, w_ntd);
//                                      }
                            }
                }            
       } // end of :       if (tablePORT.Cell(wc_pt,6).innerText >= 8)
      
      // All done, so go back to the report
      Goto_Report_Overdue(INRstarV5);
      if (tablePORT.RowCount < 2)
        wf_cont = false;


  }  //end of: while (wf_cont == true)
}
//------------------------------------------------------------------
function change_surname(panelMCP)
{
  // View page
  Goto_Patient_Demographics();
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent")
  var butEdit = panelPTC.Panel("PatientDetailsWrapper").Panel(0).Button("EditPatientDetailsLink");
   
  butEdit.Click();
  
  // Edit Page
  var panelPDW = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
  var form = panelPDW.Form("PatientEditDetailsForm");

  form.Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text = "Patient_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));

  form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text = "Redruth";
  form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text = "Cornwall";
  form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(5).Textbox("Postcode").Text = "TR14 0HX";
  
  panelPTC.Form("PatientEditDetailsForm").Panel(0).SubmitButton("UpdatePatientDetails").Click();
   
}
//------------------------------------------------------------ Test
function test_set_INR()
{
  for (i=0;i<20;i++)
  {
    set_INR("2.5");
  }  
}

//--------------------------------------------------------------------
function get_locn_id(INRstarV5)
{
  var panelLS = INRstarV5.Panel("MainPage").panel("Header").Panel("logindisplay").Panel("LoginStatus");
  var w_text = panelLS.TextNode(0).innerText;
  var w_at = aqString.Find(w_text,"@");
  var w_locn_name = aqString.Substring(w_text,w_at+2,50);
  
  return SQL_Get_Testing_Location_id(w_locn_name);
}
//--------------------------------------------------------------------
function get_review(INRstarV5)
{  
   var w_row;

   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
   var panelPTIH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory").Panel("PatientTreatmentINRHistory");
   var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable");
//   if (wt_treatments.Rowcount > 3)
      w_row = wt_treatments.Rowcount - 1;
//   w_row = wt_treatments.Rowcount;

   // Details
   return wt_treatments.Cell(w_row,5).innerText;
}
//-------------------------------------------------------------------------------
// Perform a Manual treatment
//-------------------------------------------------------------------------------
function do_manual_treatment(INRstarV5,w_inr)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
    var panelPTIH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory").Panel("PatientTreatmentINRHistory");

     var wpnl_treat = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapper");
    if (wpnl_treat.Exists ==true)
          var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable");
    var wpnl_treat2 = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapperOverSix");
    if (wpnl_treat2.Exists ==true)
          var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Table("PatientTreatmentHistoryTable");
   

//    var tablePTHT = panelPRIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable");
    
    var w_dose = wt_treatments.Cell(wt_treatments.RowCount - 1,2).innerText;
    add_inr_manual("17", "10", "2012", w_inr, "PoCT", w_dose, "0 Days", "14 Days" );
}
   
