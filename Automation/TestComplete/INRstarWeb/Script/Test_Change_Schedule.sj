//USEUNIT V5_Common_Popups

//===================================================================
// Test Changing Schedule by choosing another
//-------------------------------------------------------------------
function change_schedule()
{
   var INRstarV5 = set_system();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
   var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment")
   var panelDSC = panelPPT.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent")
    
   
   // Click the 'More Schedule button'
   panelDSC.Fieldset(0).Panel(0).Button("MoreSchedulesLink").Click();
    
   // Click the top 'Use' button
   Log.Message("Clicking 1st 'Use' button");
   var panelSG = panelPPT.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Panel("MoreScheduleGrid");
   var tableSST = panelSG.Table("ScheduleSelectorTable");
   tableSST.Cell(2, 2).Button("Use").Click();
   WaitSeconds(1,"");
               
   // Check if a dose change has occured
   process_Dose_change(INRstarV5);
}
//===================================================================
// Test Changing Schedule by Re-Ordering
//-------------------------------------------------------------------
function re_order_schedule()
{
   var INRstarV5 = set_system();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
   var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment")
   var panelDSC = panelPPT.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent")

   // Click 'Re-Order Schedule' button   
   panelDSC.Fieldset(0).Panel(0).Button("Re_Order_Schedule").Click();
   
   // Drag the top daily schedule downwards
   panelDSC.Fieldset(0).Fieldset("ScheduleGrid").TextNode(7).Drag(22, 1, 1, 100);
   
   //Confirm the re-schedule
   panelDSC.Fieldset(0).Panel(0).Button("Confirm_Re_Order").Click();
   

}