//USEUNIT Navigation
//USEUNIT Add_INR_Simple
//USEUNIT Add_INR_Manual
//USEUNIT V5_Common
//USEUNIT V5_Common_Popups
//USEUNIT Add_Appointment

//===============================================================================
// Read each Test Due today patient and add an appointment

//-------------------------------------------------------------------------------
function quick_start()
{
         schedule_tests_due("10", "Jan", "2013","30", "Jan", "2013");
//         schedule_tests_due("", "", "");
}
//===============================================================================
// Read each Test Due today patient and add an appointment

//-------------------------------------------------------------------------------
function quick_start_2()
{
         schedule_tests_due("16", "Jan", "2013","17", "Jan", "2013");
         schedule_tests_due("18", "Jan", "2013","24", "Jan", "2013");
         schedule_tests_due("25", "Jan", "2013","31", "Jan", "2013");
         schedule_tests_due("1", "Feb", "2013","6", "Feb", "2013");
         schedule_tests_due("7", "Feb", "2013","11", "Feb", "2013");
}
//-------------------------------------------------------------------------------
// Run the process to add an appointment to all patients in the Test Due list
//-------------------------------------------------------------------------------
function schedule_tests_due(p_day1, p_month1, p_year1, p_day2, p_month2, p_year2)
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

    // Check if different start date required
    if (p_day1 != "")
      set_start_date(INRstarV5, p_day1, p_month1, p_year1);
    // Check if different end date required
    if (p_day2 != "")
      set_end_date(INRstarV5, p_day2, p_month2, p_year2);
      
    // Set the Patient Row value
    var wc_pt = 1;
    
    // Start the Loop down the list of patients displayed
    var wf_loop = true;
    while (wf_loop == true)
    
    {
        var tableTDT = panelTDR.Panel(0).Panel("TestDueResultsContainer").Table("TestDueTable");
        // Check if there are no patients listed
        if (tableTDT.Cell(1, 0).innerText == "For the selected options there are no patients due for a test.")
          wf_loop = false;
        // Check if completed all patients  
        if (wc_pt >= tableTDT.RowCount)
          wf_loop = false;

        if (wf_loop == true)
        {
            // Select Patient at Patient Row value
            tableTDT.Cell(wc_pt, 0).Link("PatientLink").Click();
            
            // Check if Patient is 'Manual'
            process_confirm_sub_ret(INRstarV5, "The patient's dosing method is currently set to : Manual");

            // Check if the patient is Induction
            process_confirm_sub_ret(INRstarV5, "The patient's dosing method is currently set to : Induction Slow");
               
            // Go to the Treatment page
            Goto_Patient_Treatment();
            
            // Check the patient does not already have an Appointment
            var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
            var panelPPT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
    
            if (panelPPT.Panel("TreatmentButtonsContainer").Fieldset("AppointmentButtons").Button("MakeAppointment").value == "Make")
            {
                // Find the suggested Review Period & Next Test Date
                var panelPTIH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory").Panel("PatientTreatmentINRHistory");
                var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper")
                var wt_treatments = panelVPHTW.Table("PatientTreatmentHistoryTable");
                var w_row = wt_treatments.Rowcount - 1;
      
                var w_review = wt_treatments.Cell(w_row,5).innerText;
        
                // Get treatment date last treatment
                var w_ntd = convert_date(aqConvert.StrToDate(wt_treatments.Cell(w_row,7).innerText));
  
                // Make an appointment
                var w_time_of_clinic = " Morning";
                var w_clinic_name = set_day(aqDateTime.GetDayOfWeek(w_ntd)) + w_time_of_clinic;

                Goto_Make_Appointment();
                add_appointment(INRstarV5, w_clinic_name, w_ntd);
            }
            // Increment the patient count
            wc_pt++;
                    
           
           // Check if the loop still needs to be run 
           if (wf_loop == true)
           {
              // Go round the loop again   
              Goto_Tests_Due();

              // Check if different start date required
              if (p_day1 != "")
                set_start_date(INRstarV5, p_day1, p_month1, p_year1);
              // Check if different end date required
              if (p_day2 != "")
                set_end_date(INRstarV5, p_day2, p_month2, p_year2);
           }
        }
    }
}
