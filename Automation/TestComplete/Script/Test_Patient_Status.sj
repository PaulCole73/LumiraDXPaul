//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Tests
//USEUNIT V5_Common_Field_Tests
//===================================================================
// Test Patient Status
//
// De-Activate patient
// Re-Activate Patient


//-------------------------------------------------------------------
function de_activate_patient(INRstarV5)
{
 
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPR = panelMCP.Panel("PatientRecord"); 
   var panelPMTC = panelPR.Panel("PatientMainTabContent");

   panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanActiveStatus").Panel(0).Button("De_activatePatientButton").Click();    
          
   //Confirm Warning
   process_confirm_sub(INRstarV5, "De-activating a patient");
   // Select Reason & Add Notes
   var formDPF = panelPMTC.Panel("PatientTabContent").Fieldset("DeactivatePatient").Form("DeactivatePatientForm");
   formDPF.Panel(0).Select("InactiveReason").ClickItem("Other");
   formDPF.Panel(1).Textarea("Notes").Value = "Pre-release testing";
   
   // Click Button
   formDPF.Panel(2).SubmitButton("Confirm").Click();
}
//-------------------------------------------------------------------
function de_activate_patient_regression()
{
   var INRstarV5 = set_system();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPR = panelMCP.Panel("PatientRecord"); 
   var panelPMTC = panelPR.Panel("PatientMainTabContent");
   var panelPS = panelPMTC.Panel("PatientManagementWrapper").Panel("PatientStatus")
   
   panelPS.Panel(1).Button("De_activatePatientButton").Click();    
          
   //Confirm Warning
   process_confirm_sub(INRstarV5, "De-activating a patient");
   
   WaitSeconds(2);
   
   var formDPF = panelPS.Fieldset("DeactivatePatient").Form("DeactivatePatientForm");
   
   //Validation for not entering a reason here
   
   formDPF.Panel(1).SubmitButton("Confirm").Click();
   
   // Check the Error panel for the text
   
   var panelIPV = panelPS.Fieldset("DeactivatePatient");
   
      var w_err_text = panelIPV.Panel("InactivatePatientValidation").innerText;
      var w_err_mess = "Please select the reason for deactivation";
      test_message(INRstarV5, w_err_text, w_err_mess, false);
   
   // Select Reason & Add Notes
   
   formDPF.Panel("DeactivatingReason").Panel("DeactivatingReasonList").Select("InactiveReason").ClickItem("Other");
   formDPF.Panel(0).Textarea("Notes").Value = "Pre-release testing";
   
   // Click Button
   formDPF.Panel(1).SubmitButton("Confirm").Click();
}
//-------------------------------------------------------------------
function activate_patient()
{
   var INRstarV5 = set_system(); 
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPR = panelMCP.Panel("PatientRecord"); 
   var panelPMTC = panelPR.Panel("PatientMainTabContent");
   var panelPS = panelPMTC.Panel("PatientManagementWrapper").Panel("PatientStatus")

   // Click Activate button
   panelPS.Panel(1).Button("ActivatePatientButton").Click();
   
   // Set required fields
   set_activate_fields_regression(INRstarV5);
}
//-------------------------------------------------------------------
function set_activate_fields_regression(INRstarV5)
{
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var form = panelPTC.Form("ActivatePatientForm");
    var panelEPCI = form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation"); 
     
     // Set the date to today 
     var w_today = aqDateTime.Today();
     var w_day = aqString.SubString(w_today,0,2);
     var w_mth = aqConvert.StrToInt(aqString.SubString(w_today,3,2));
     var w_yr = aqString.SubString(w_today,6,4);

     panelEPCI.Panel(0).Image("calendar_png").Click();
     w_datepicker = INRstarV5.Panel("ui_datepicker_div");
     w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
     w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
     select_day(w_day, w_datepicker);
    
    panelEPCI.Panel(1).Select("DiagnosisSelected").ClickItem("Atrial fibrillation");
    panelEPCI.Panel(2).Select("DrugId").ClickItem("Warfarin");
    


    var panelEPTPI = panelEPCI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation")
    
    panelEPTPI.Panel(0).Select("DosingMethod").ClickItem("Manual Dosing");   
    
    // Acknowledge Dosing More Info window
    process_more_information(INRstarV5);  
    panelEPTPI.Panel(1).Select("TestingMethod").ClickItem("Lab");
     
    // Click Activate button
    form.Panel(0).SubmitButton("ActivatePatient").Click();
   
}