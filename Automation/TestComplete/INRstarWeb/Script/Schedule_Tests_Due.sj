//USEUNIT Navigation
//USEUNIT Add_INR_Simple
//USEUNIT Add_INR_Manual
//USEUNIT V5_Common
//USEUNIT V5_Common_Popups
//USEUNIT Add_Appointment

//===============================================================================
// Read each Test Due today patient and add an INR

//-------------------------------------------------------------------------------
function quick_start()
{
         schedule_tests_due("18", "Jul", "2013");
//         schedule_tests_due("", "", "");
}
//-------------------------------------------------------------------------------
// Run the process to add an new treatment to all patients in the Test Due list
//-------------------------------------------------------------------------------
function schedule_tests_due(p_day, p_month, p_year)
{
//   Log_On(9); // 
//   
    var INRstarV5 = set_system();  
    Goto_Tests_Due();

    // Set the parts of the screen for future use    
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelPC = panelMCP.Panel("PatientContent");
    var panelTDR = panelPC.Panel("TestsDueResults");
    var tableTDT = panelTDR.Panel(0).Panel("TestDueResultsContainer").Table("TestDueTable");

    // Check if different end date required
    if (p_day != "")
      set_end_date(INRstarV5, p_day, p_month, p_year);
      
    // Set the Patient Row value
    var wc_pt = 1;
    
    // Start the Loop down the list of patients displayed
    var wf_loop = true;
    while (wf_loop == true)
    
    {
        // Check if there are no patients listed
        if (tableTDT.Cell(1, 0).innerText == "For the selected options there are no patients due for a test.")
          wf_loop = false;
        else
        {
            // Select Patient at Patient Row value
            tableTDT.Cell(wc_pt, 0).Link("PatientLink").Click();
            var w_ret = "";
        
            // Check if Patient is 'Manual'
            if (process_confirm_sub_ret(INRstarV5, "The patient's dosing method is currently set to : Manual") == true)
               w_ret = "M";

            // Check if the patient is Induction
            if (process_confirm_sub_ret(INRstarV5, "The patient's dosing method is currently set to : Induction Slow") == true)
               w_ret = "I";
            
            // Go to the relevant New INR page
           Goto_Patient_New_INR();
            
            // Find the NHS Number, Patient Number & target INR
            var panelPBC = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer");
            var w_nhs = panelPBC.Panel("patientZone1").Panel(3).Panel(0).Label("NHSNumber_DetachedLabel").innerText;
            var w_ptno = panelPBC.Panel("patientZone1").Panel(3).Panel(1).Label("PatientNumber_DetachedLabel").innerText;
            var w_target_inr = panelPBC.Panel("PatientBanner").Panel(1).Panel(1).Label("TargetINR_DetachedLabel").innerText;

            // Process an INR for this patient
            if (w_ret == "M")
            {
             do_manual_treatment(INRstarV5,set_INR(w_target_inr));
               add_appt(INRstarV5);
            }
            if (w_ret == "")
            {
              add_inr_simple(set_INR(w_target_inr));
               add_appt(INRstarV5);
            }   
            // Don't process Induction - and set the count to +1 to skip this patient   
            if (w_ret == "I")
            {
               wc_pt++;
               
               // Check if Patient Row count is now greater than the Table row count
               if (wc_pt >= tableTDT.RowCount)
                  wf_loop = false;
           }
           
           // Check if the loop still needs to be run 
           if (wf_loop == true)
           {
            // Go round the loop again   
            Goto_Tests_Due();

            if (p_day != "")
              set_end_date(INRstarV5, p_day, p_month, p_year);
           }
        }
    }
}
//===============================================================================
// Test the setting of the End Date
//-------------------------------------------------------------------------------
function test_inr()
{
  for (i=0;i<30;i++)
  {
    Log.Message(set_INR());
  }
}  
//-------------------------------------------------------------------------------
// Perform a Manual treatment
//-------------------------------------------------------------------------------
function do_manual_treatment(INRstarV5,w_inr)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
    var panelPRIH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory").Panel("PatientTreatmentINRHistory");
    var tablePTHT = panelPRIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable");
    
    var w_dose = tablePTHT.Cell(tablePTHT.RowCount - 1,2).innerText;

    add_inr_manual("17", "10", "2012", w_inr, "PoCT", w_dose, "0 Days", "7 Days" );
}  
//-------------------------------------------------------------------------------
// Add an appointment
//-------------------------------------------------------------------------------
function add_appt(INRstarV5)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
  var panelPTIH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory").Panel("PatientTreatmentINRHistory");
  var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper")
  var wt_treatments = panelVPHTW.Table("PatientTreatmentHistoryTable");
  var w_row = wt_treatments.Rowcount - 1;
  var w_ntd = convert_date(aqConvert.StrToDate(wt_treatments.Cell(w_row,7).innerText));
    // Highlight the field
  Sys["HighlightObject"](wt_treatments.Cell(w_row,7),1);

  w_clinic_name = set_day(aqDateTime.GetDayOfWeek(w_ntd)) + " Morning";
  
  Goto_Make_Appointment();
  add_appointment(INRstarV5, w_clinic_name, w_ntd);  
}