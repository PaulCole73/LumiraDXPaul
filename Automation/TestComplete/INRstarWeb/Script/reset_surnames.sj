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
  schedule_process_overdue();  
}
//===============================================================================

function schedule_process_overdue()
{
  var INRstarV5 = set_system(); 

  Goto_Report_Overdue(INRstarV5);
   
  // Set some basic values
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
   
  var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");

  var tablePORT = panelUCR.panel("OverduePatients").table("PatientOverdueReportTable"); 
  
  wc_pt = 1;
   
  if (tablePORT.RowCount > 1)
    wf_cont = true;
  // Loop around list whilst some patients exist
  while (wf_cont == true)
  {     
      // Select patient (depending on how many are being ignored)
      tablePORT.Cell(wc_pt,0).Link("PatientLink").Click();
      var w_ret = "";
      
      // Increment the patient counter
      wc_pt++;

      // Check if Patient is Duplicate named
      process_confirm_sub_ret(INRstarV5, "Please confirm");

//      // Check if Patient is 'Manual'
//      process_confirm_sub_ret(INRstarV5, "The patient's dosing method is currently set to : Manual");
//
//      // Check if the patient is Induction & ignore
//      process_confirm_sub_ret(INRstarV5, "The patient's dosing method is currently set to : Induction Slow");
          
      // Change Surname
      change_surname(panelMCP);
                
      // All done, so go back to the report
      Goto_Report_Overdue(INRstarV5);
      if (tablePORT.RowCount < 2)
        wf_cont = false;


  }
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
    var panelPRIH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory").Panel("PatientTreatmentINRHistory");
    var tablePTHT = panelPRIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable");
    
    var w_dose = tablePTHT.Cell(tablePTHT.RowCount - 1,2).innerText;

    add_inr_manual("17", "10", "2012", w_inr, "PoCT", w_dose, "0 Days", "7 Days" );
}
   
