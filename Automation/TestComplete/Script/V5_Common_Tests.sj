//USEUNIT Common
//USEUNIT V5_Common_Popups

//===============================================================================
// Patient Demographic Tests
function test_field_add_patient_details(INRstarV5, err_mess, value, state)
{
 
  //
  // If the State value is set to true, it means the field should be valid, so error messages should
  // not be found.
  // If the State value is set to false, then the field ought to be invalid, so the err_mess value should be
  // found in the list of error messages.
  //
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPDAF = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset");
  var formPADF = panelPDAF.Form("PatientAddDetailsForm");
  
  // Click Save to see what happens
  formPADF.Panel(0).SubmitButton("AddPatientDetails").Click();
  
  WaitSeconds(2,"")
  
  var w_panel = INRstarV5.NativeWebObject.Find("idStr", "Errors");
  if (w_panel.Exists == true && w_panel.VisibleOnScreen == true)
  {  
      WaitSeconds(1,"Waiting for Patient Demographic Error Messages");
  
      // Check the Error panel for the text
    //  var w_err_text = "";
      var panelError = panelPDAF.Panel("AddPatientValidation").Panel("Errors");
      var w_err_text = panelError.innerText;

      Log.Message("Error text is: " + w_err_text);

      test_message(INRstarV5, w_err_text, err_mess, state);
  }
  else
  {
      Log.Message("NHS Number valid (or no Error messages found)");
  }
} 
//===============================================================================
// Patient Demographic Tests
function test_field_edit_patient_details(INRstarV5, err_mess, value, state)
{
  
  //
  // If the State value is set to true, it means the field should be valid, so error messages should
  // not be found.
  // If the State value is set to false, then the field ought to be invalid, so the err_mess value should be
  // found in the list of error messages.
  //

  var INRstarV5 = set_system(); 
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  
  // Click Save to see what happens
  panelPTC.Form("PatientEditDetailsForm").Panel(0).SubmitButton("UpdatePatientDetails").Click();
  
  WaitSeconds(2);
  
  var wbx_V = INRstarV5.NativeWebObject.Find("idStr", "EditDetails");
  if (wbx_V.Exists == false)
  {
    Log.Message("There are no Error messages");
  }
  else
  {
//  var wbx_V = INRstarV5.NativeWebObject.Find("idStr", "EditDetails");
//   if (wbx_V.Exists == true)
    //if (panelPTC.Panel("EditDetails").VisibleOnScreen == true)
    { 
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  
        var w_err_text = panelPTC.Panel("EditDetails").innerText;

        Log.Message("Error text is: " + w_err_text);

        test_message(INRstarV5, w_err_text, err_mess, state);
    }
  }
} 
//===============================================================================
// Patient Treatment Plan Tests
function test_field_add_patient_treatmentplan(INRstarV5, form, err_mess, value, state)
{
  Log.Message("------------- Patient Clinical Testing for : '" + value + "'");
  
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTPD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var form = panelPTPD.Form("AddTreatmentPlanForm");

  // Click Save to see what happens
  form.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();

  // Check the Error panel for the text
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTPD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var form = panelPTPD.Form("AddTreatmentPlanForm");
  if (form.Fieldset(0).Panel("TreatmentPlanValidation").VisibleOnScreen == true)
  {
    var w_err_text = form.Fieldset(0).Panel("TreatmentPlanValidation").innerText;
    test_message(INRstarV5, w_err_text, err_mess, state);
  }
} 
//===============================================================================
// Test Edit of Patient Treatment Plan
function test_field_update_patient_treatmentplan(INRstarV5, form, err_mess, value, state)
{
  Log.Message("------------- Patient Treatment Plan Testing for : '" + value + "'");
  
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var form = panelPCD.Form("PatientEditTreatmentPlanForm");

  // Click Save to see what happens
  form.Panel(0).Button("UpdatePatientTreatmentPlan").Click();

  var wbx_V = INRstarV5.NativeWebObject.Find("idStr", "TreatmentPlan");
  if (wbx_V.Exists == true)
  {  
      // Check the Error panel for the text
      var w_err_text = form.Panel("TreatmentPlanValidation").innerText;
      test_message(INRstarV5, w_err_text, err_mess, state);
  }
} 
//===============================================================================
// Historical Treatment Tests
function test_field_historical_treatments(INRstarV5, form, err_mess, value, state)
{
  Log.Message("------------- Add Historical Treatment Testing for : '" + value + "'");
  
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
    var panelPTNHW = panelPTW.Panel("PatientPendingTreatment").Panel("PatientTreatmentNewHistoricalWrapper");
    var form = panelPTNHW.Form("NewHistoricalTreatmentForm");
    
  // Click Save to see what happens
  form.Panel(0).SubmitButton("Save").Click();
  
  // Click confirm panel
  var w_complete = process_confirm_historical_treatment(INRstarV5);
 
  if (w_complete == false)
  {
    // Check the Error panel for the text
    var w_err_text = panelPTNHW.Panel("ValidationErrors").Panel("HistoricalTreatmentValidation").innerText;
    test_message(INRstarV5, w_err_text, err_mess, state);
  }
} 
//===============================================================================
// Override Tests
function test_field_override(INRstarV5, formEPT, err_mess, value, state)
{
  Log.Message("------------- Override Testing for : '" + value + "'");
  
  // Click Save to see what happens
  formEPT.Panel(0).Button("OverrideAccept").Click();

  // Check the Error panel for the text
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientTabContent").Panel("PatientMainTabContent").Panel("PendingTreatmentContent")
  var w_err_text = panelPTC.Panel("EditPendingTreatment_ValidationSummary").innerText;
//  var w_err_text = panelPTC.Form("EditPendingTreatmentForm").Panel("EditPendingTreatment_ValidationSummary").innerText;
  test_message(INRstarV5, w_err_text, err_mess, state);
} 
//===============================================================================
// Adverse Event Tests
function test_field_adverse_event(INRstarV5, form, err_mess, value, state)
{
  Log.Message("------------- Adverse Event Testing for : '" + value + "'");
  
  // Click Save to see what happens
  form.Panel(6).SubmitButton("SubmitAddAdverseEvent").Click();

  // Check the Error panel for the text
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var w_err_text = panelPTC.Panel("PatientAdverseEventsWrapper").Panel("AddAdverseEvent").innerText;

  test_message(INRstarV5, w_err_text, err_mess, state);
} 
//===============================================================================
// Test the error message
function test_message(INRstarV5, w_err_text, err_mess, state)
{
  WaitSeconds(2,"");

  if (state == true)
  {
      if (aqString.Contains(w_err_text, err_mess) < 0) 
      {
          // Test has not been found correctly
          Log.Message("Valid field - Error message: '" + err_mess + "' - Not found");
      }
      else
      {
          // Test has been found but should not have been
          Log.Message("Valid field - Error message : '" + err_mess + "' - Found"); 
      }
  }
  else
  {
      if (aqString.Contains(w_err_text, err_mess) < 0) 
      {
          // Test has not been found but should have been
          Log.Message("Invalid field - Error message : '" + err_mess + "' - Not found");
          
      }
      else
      {
          // Test has been found correctly
          Log.Message("Invalid field - Error message : '" + err_mess + "' - Found"); 
      }
  }
}
//===============================================================================
// Test the error message
function test_for_treatments(INRstarV5, panelPTC)
{
    var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory")
    var panelPTIH = panelPTH.Panel("PatientTreatmentINRHistory");

    var wpnl_treat = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapper");
    if (wpnl_treat.Exists ==true)
          var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable");
    var wpnl_treat2 = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapperOverSix");
    if (wpnl_treat2.Exists ==true)
          var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Table("PatientTreatmentHistoryTable");
    
    var wf_can_delete = true;
//    if (wt_treatments.Cell(1,0).innerText == "The patient has no historic treatments") 
//       wf_can_delete = false;
//    else
       if (wt_treatments.Rowcount < 3) 
              wf_can_delete = false;

    
    return wf_can_delete;    
}
//===============================================================================
// Client Details Tests
function test_field_new_client_details(INRstarV5, err_mess, value, state)
{
  Log.Message("------------- Client Details Testing for : '" + value + "'");
  //
  // If the State value is set to true, it means the field should be valid, so error messages should
  // not be found.
  // If the State value is set to false, then the field ought to be invalid, so the err_mess value should be
  // found in the list of error messages.
  //
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Fieldset(0).Form("NewClientForm");
  
  // Click Save to see what happens
  form.Panel(16).SubmitButton("Create").Click();
  
  var panelANC = panelMCP.Fieldset(0).Panel("AddNewClient");
  var w_err_text = panelANC.innerText;
  if (aqString.Find(w_err_text, err_mess) == -1)
  {
      Log.Message("No Client Error messages found");
  }
  else
  {  
      WaitSeconds(1,"Waiting for Client Error Messages");
  
      Log.Message("Error text is: " + err_mess);

      test_message(INRstarV5, w_err_text, err_mess, state);
  }
  var w_panel = INRstarV5.NativeWebObject.Find("idStr", "Errors");
}
