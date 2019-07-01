//USEUNIT Navigation
//USEUNIT Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT Quick_Review_Dabigatran
//USEUNIT Navigate_Patient
//USEUNIT Navigate_Admin_Dashboard

//This checks if a button is enabled or not

function visable_check()
{
var INRstarV5 = set_system();

    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");
    var panelPMTC = panelPR.Panel("PatientMainTabContent");
    var panelAWRL = panelPMTC.Panel("PatientTabContent").Panel("AnnualReviewWrapper").Panel("AnnualReviewActions").Button("AddWarfarinReviewLink");
    
    if (panelAWRL.className == "Button disabled")
    {
     Log.Message("Button is disabled")
      }
      else
      {
        Log.Message("Button is enabled")
      }
}
//-------------------------------------------------------


function fullName()

{

    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPR = panelMCP.Panel("PatientRecord");
    var panelPT = panelPR.Panel("PatientTab");
    
    panelPT.Link("PatientManagementTab").Click();
    
    var panelPMTC = panelPR.Panel("PatientMainTabContent");
    var panelPMW = panelPMTC.Panel("PatientManagementWrapper");
    var panelPS = panelPMW.Panel("PatientStatus");

    panelPS.Panel(1).Button("SuspendPatientButton").Click();
    
    var form = panelPS.Form("SuspendPatientForm");



}










