//USEUNIT Navigation
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Popups

  // Get info for last treatment on page
  // Check details are present
  
function quick_start()
{
         Check_treatment_Information();
}

function Check_treatment_Information()
{
  try
  {
   var w_Name = "BLACKBURN, James";
   var INRstarV5 = set_system();

   Goto_Patient_Search();
   preset_Fetch_Patient(INRstarV5, w_Name)

   Goto_Patient_Treatment()

       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
       var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
       var panelVPHTW = panelPTW.Panel("PatientTreatmentHistory").Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory").Panel("ViewPatientHistoricalTreatmentsWrapper");


   var t_table = panelVPHTW.Table("PatientTreatmentHistoryTable");
   var w_last_row = t_table.Rowcount -1;
   
   t_table.cell(w_last_row,10).Click();

   // Report on data displayed
   wa_panel_fields = new Array(12);
   wa_panel_fields[0] = "Clinician_DetachedLabel";
   wa_panel_fields[1] = "Treatment_DosingMethod_DetachedLabel";
   wa_panel_fields[2] = "Treatment_Use5_DetachedLabel";
   wa_panel_fields[3] = "Treatment_Use3_DetachedLabel";
   wa_panel_fields[4] = "Treatment_Use1_DetachedLabel"
   wa_panel_fields[5] = "Treatment_UseHalf_DetachedLabel";
   wa_panel_fields[6] = "Treatment_UseSplit_DetachedLabel";
   wa_panel_fields[7] = "Treatment_Printed_DetachedLabel";
   wa_panel_fields[8] = "Treatment_NPTBatchNumber_DetachedLabel";
   wa_panel_fields[9] = "Treatment_Inserted_DetachedLabel";
   wa_panel_fields[10] = "Treatment_NextTest_DetachedLabel";
   wa_panel_fields[11] = "Treatment_TestingMethod_DetachedLabel";
   wa_panel_fields[12] = "TreatmentStatus_DetachedLabel";
   
   var w_path;
   for (i=0; i < wa_panel_fields.length; i++)
   {
       w_label = INRstarV5.NativeWebObject.Find("idStr", wa_panel_fields[i]);
       Log.Message(wa_panel_fields[i] + " : " + w_label.innerText);
   }
   
   // Close Treatment Info window
   process_treatment_information_cancel(INRstarV5);
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}

