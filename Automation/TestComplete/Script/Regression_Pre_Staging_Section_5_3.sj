//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT Quick_Review
//USEUNIT Test_New_Patient
//USEUNIT Test_Edit_Demographics
//USEUNIT Navigation
//USEUNIT Quick_Patient
//USEUNIT Add_INR_Manual
//USEUNIT Home_Page_Regression_Quick_Checking


//===============================================================================
// Section  5.3
//===============================================================================
function release_pre_s5_3()
{
   Step_5_3_1_Checking_Default_Review_Screen();
}
//-------------------------------------------------------------------------------

function Step_5_3_1_Checking_Default_Review_Screen()

{
         Log_Off();
         log_on_cl3();
         
         var INRstarV5 = set_system();
         
         quick_patient_regression();
         
         //Add treatment plan
         Goto_Patient_TreatmentPlan_Add();
        
         var w_drug = "W";
         var w_dm = "Manual";
         var w_master_date = aqDateTime.Today();
         var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
              
         quick_pt_treatmentplan(w_drug, w_dm, w_start_date);
         
         //Checking the review screen
         Goto_Patient_TreatmentPlan_Review_New();
        
        //Check the screen default values
        panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
        panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent")
        panelWRSP = panelPTC.Panel("WarfarinReviewAddPanel").Form("AddReviewForm").Panel("WarfarinReviewSummaryPanel")
        
        //Checking the date
        panelWRSP.Panel("ReviewDate").Textbox("Date")
        
        //Checking the INR Control
        
        panelWC = panelWRSP.Panel("Warfarin_Control")
        
        panelWC.Panel("Question_TTR12Month").TextNode("TTR12Month_text")
    
}























