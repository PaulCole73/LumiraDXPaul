//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Popups

//USEUNIT Navigation
//USEUNIT V5_Common_Presets

//===============================================================================
//
// This process will delete the last treatment
//
function quick_start()
{
   Log_On(2); // 
   
   var INRstarV5 = set_system();  
   
   // View recent patients
   Goto_Recently_Viewed();
   // Select the last used
   preset_Fetch_Patient_Recent(INRstarV5);

   Goto_Patient_Treatment();
   delete_treatment(INRstarV5);

}
//---------------------------------------------------------------------------------------------------------
function delete_treatment(INRstarV5)
{
   WaitSeconds(2,"About to delete treatment");
  
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    

        // Click the Delete Latest Treatment button
        var wb_Delete = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment").Panel("TreatmentButtonsContainer").Fieldset("TreatmentButtons").Button("DeleteLatestTreatment");
        wb_Delete.Click();
    
        // Click the Confirm button
        Log.Message("Deleting latest Treatment");
        process_confirm_delete_treatment(INRstarV5);

}
//---------------------------------------------------------------------------------------------------------
function delete_part_treatment()
{
  try
  {
    var INRstarV5 = set_system();
    var panelPTC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent");
    var panelPTC2 = panelPTC.Panel("PendingTreatmentContent");
    
    panelPTC2.Panel(0).Button("CancelPendingTreatment").Click();

    process_confirm_delete_treatment(INRstarV5);
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}
function delete_all_treatments(INRstarV5)
{
  WaitSeconds(1,"");
  
  try
  {
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
    
    // Click the Delete Latest Treatment button
    var wb_Delete = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment").Panel(0).Button("DeleteLatestTreatment");
    wb_Delete.Click();
    
    // Click the Confirm button
    process_confirm_delete_treatment(INRstarV5);
  }
  catch(exception)
  {
    Log.Error("Exception", exception.description);
  }
}

