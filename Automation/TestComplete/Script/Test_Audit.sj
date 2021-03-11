//USEUNIT V5_Common_Popups

//===================================================================
// Test Audit - Treatment
//-------------------------------------------------------------------
function quick_start()
{
          var INRstarV5 = set_system();
          test_audit_treatment(INRstarV5);
}
//-------------------------------------------------------------------
function test_audit_treatment(INRstarV5)
{
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
   var panelTPW = panelPMTC.Panel("PatientTabContent").Panel("TreatmentPlanWrapper");
   var panelPTH = panelTPW.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
   var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
   
    if (panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Exists == true)
               var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix");
    else
             var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper")
   //var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix")
   var table = panelVPHTW.Table("PatientTreatmentHistoryTable");

   w_row = table.Rowcount - 1;

   // Click last treatment's information link
   table.Cell(w_row,10).Link("TreatmentInformationActionLink").Click();  
   
   // Click Audit 
   INRstarV5.Panel(1).Panel(1).Panel(0).Button(1).Click();
   
   // Read all audit records
   w_au_table = INRstarV5.Panel(1).Panel("DialogContent").Panel("TreatmentAuditTrailWrapper").Table("AuditTrailTable");
   w_au_row = w_au_table.Rowcount -1;
   
   for (w_au_row =w_au_table.Rowcount -1; w_au_row > 0; w_au_row--)
   {
               var w_audit_code = w_au_table.Cell(w_au_row, 1).innerText;
               var w_audit_text = w_au_table.Cell(w_au_row, 3).Label("MoreInformation_DetachedLabel").innerText;
   
               Log.Message(w_audit_code + ": " + w_audit_text);
   }
   
   //Close Information window
   INRstarV5.Panel(1).Panel(1).Panel(0).Button(0).Click();
}
//---------------------------------------------------------
function display_second_treatment_audit(w_data)
{  
   var INRstar = INRstar_base();
   WaitSeconds(2)
   w_au_table = INRstarV5.Panel(2).Panel("DialogContent").Panel("TreatmentAuditTrailWrapper").Table("AuditTrailTable");
   
   var wt_row = w_au_table.Cell(2, 1).innerText;

    if (wt_row == w_data)
       Log.Message(wt_row + " - " + w_au_table.Cell(2,2).innerText);
     else
        {
       Log.Warning("Treatment audit record not found : " + w_data);
            
       //Close Information window
         }
       INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).Click();
}
//---------------------------------------------------------
function display_specific_treatment_audit(w_data, p_row)
{  
   var INRstar = INRstar_base();
   w_au_table = INRstar.Panel(2).Panel("DialogContent").Panel("TreatmentAuditTrailWrapper").Table("AuditTrailTable");
   var wt_row = w_au_table.Cell(p_row, 3).innerText;

    if (wt_row == w_data)
    {
       Log.Message(wt_row + " - " + w_au_table.Cell(p_row,2).innerText);
       return true;
    }
     else
       Log.Warning("Treatment audit record not found : " + w_data);
       return false;       
   //Close Information window
   INRstar.Panel(2).Panel(1).Panel(0).Button(0).Click();
}
//---------------------------------------------------------
