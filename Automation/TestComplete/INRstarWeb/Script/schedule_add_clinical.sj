//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT Quick_Patient
//USEUNIT V5_Common_Popups


//===============================================================================
// For each patient in the no diagnosis / missing clinical report
//  Update the diagnosis / add a clinical record
//===============================================================================

function quick_start()
{
  schedule_add_clinical();  
}
//===============================================================================
function schedule_add_clinical()
{
  var INRstarV5 = set_system(); 

  Goto_Report_No_Diagnosis(INRstarV5);
   
  // Set some basic values
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
   
  var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");

  var tablePWNDRT = panelUCR.Panel("PatientsWithNoDiagnosis").Table("PatientWithNoDiagnosisReportTable"); 
  
  wc_pt = 1;
   
  if (tablePWNDRT.RowCount > 1)
    wf_cont = true;
  // Loop around list whilst some patients exist
  while (wf_cont == true)
  {     
      // Test if Add Clinical or Add Diagnosis
      if (tablePWNDRT.Cell(wc_pt,2).innerText != "")
      {
         tablePWNDRT.Cell(wc_pt,0).Link("PatientLink").Click();
         process_confirm_button(INRstarV5);
         
         Goto_Patient_Clinical_Edit();
        
         // Add a diagnosis
         set_diagnosis(INRstarV5);
      } 
      else
      {
         tablePWNDRT.Cell(wc_pt,0).Link("PatientLink").Click();
         
         Goto_Patient_Clinical_Add();
         
         // Add a clinical record
         quick_pt_clinical();
      }
      // All done, so go back to the report
      Goto_Report_No_Diagnosis(INRstarV5);
   
      if (tablePWNDRT.RowCount < 2)
        wf_cont = false;


  }
}
function set_diagnosis(INRstarV5)
{
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
    var form = panelPTC.Panel("PatientClinicalWrapper").Panel("PatientClinicalDetails").Form("PatientEditClinicalForm");
    var panelEPCI = form.Panel("EditPatientClinicalInformation"); 

    if (panelEPCI.Panel("DiagnosisDetails").Panel(0).Select("TargetINR").value == "3.0")    
      panelEPCI.Panel(1).Select("DiagnosisId").ClickItem("Prosthetic Heart Valve (mechanical, medium risk)");
    else
    {
      if (panelEPCI.Panel("DiagnosisDetails").Panel(0).Select("TargetINR").value == "3.5")    
        panelEPCI.Panel(1).Select("DiagnosisId").ClickItem("DVT or PE (Recurrent during treatment)");
      else
      {  
          var w_target = panelEPCI.Panel("DiagnosisDetails").Panel(0).Select("TargetINR").value;
          panelEPCI.Panel(1).Select("DiagnosisId").ClickItem("Atrial fibrillation");
          panelEPCI.Panel("DiagnosisDetails").Panel(0).Select("TargetINR").value = w_target;
          INRstarV5.pageInrstar.panel("UiDialogUiWidgetUiWidgetCon").Panel(1).Panel(0).Button(1).Click();
      }
    }    
    //form.Fieldset(0).Panel(0).SubmitButton("UpdatePatientClinical")
    form.Panel(0).Button("UpdatePatientClinical").Click();

}
   
