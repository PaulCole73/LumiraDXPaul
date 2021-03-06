//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT Test_Add_Historical_Treatment
//USEUNIT Quick_Review_Dabigatran

function test()
{

var w_drug="W"
var w_dm=""
var w_start_date=""

quick_pt_treatmentplan(w_drug, w_dm, w_start_date)
}


function quick_pt_treatmentplan(p_drug, p_dm, p_start)

{


    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
    var formATPF = panelPCD.Form("AddTreatmentPlanForm");
    var panelEPCI = formATPF.FieldSet(0).Panel("EditPatientTreatmentPlanInformation");
   
    panelEPCI.Panel(0).Image("calendar_png").Click();
    datepicker = INRstarV5.Panel("ui_datepicker_div");
    if (p_start=="")
    {
        datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jun");
        datepicker.Panel(0).Panel(0).Select(1).ClickItem("2015");
        datepicker.Table(0).Cell(3, 3).Link(0).Click();
    }
    else
    {
 
         var w_day = aqString.SubString(p_start,0,2);
         var w_mth = aqConvert.StrToInt(aqString.SubString(p_start,3,2));
         var w_yr = aqString.SubString(p_start,6,4);
          datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
          datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
          select_day(w_day, datepicker);
    }
    panelEPCI.Panel(1).Select("DiagnosisSelected").ClickItem("Atrial fibrillation");

   if (p_drug == "W")
   {
                          panelEPCI.Panel(2).Select("DrugId").ClickItem("Warfarin");
    
                        //  panelWF = panelEPCI.Panel("WarfarinDetailsPanel").Panel("EditPatientTreatmentPlanInformation")
                         panelWF = panelEPCI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation");
                          if (p_dm == "")
                                    panelWF.Panel(0).Select("DosingMethod").ClickItem("Coventry Maintenance");
                          if (p_dm == "Tait")
                                    panelWF.Panel(0).Select("DosingMethod").ClickItem("Induction Slow Tait");
                          if (p_dm == "Oates")
                                    panelWF.Panel(0).Select("DosingMethod").ClickItem("Induction Slow Oates");
                          if (p_dm == "Manual")
                                    panelWF.Panel(0).Select("DosingMethod").ClickItem("Manual Dosing");
              
                           // Acknowledge Dosing More Info window
                          process_more_information(INRstarV5);  

                          panelWF.Panel(1).Select("TestingMethod").ClickItem("PoCT");
                          panelWF.Panel(2).Select("MaxReview").ClickItem("70 Days");
    
                      //    panelEPCI.Panel(5).Checkbox("WrittenInfoProvided").ClickChecked(true);
                      //    
                      //    panelEPCTS.Panel(0).Checkbox("NPSA").ClickChecked(false); 
                      //    panelEPCTS.Panel(1).Checkbox("Tablets_Use5").ClickChecked(false);
                      //    panelEPCTS.Panel(2).Checkbox("Tablets_Use3").ClickChecked(true);
                      //    panelEPCTS.Panel(3).Checkbox("Tablets_Use1").ClickChecked(true);
                      //    panelEPCTS.Panel(4).Checkbox("Tablets_UseHalf").ClickChecked(true);
                      //    panelEPCTS.Panel(5).Checkbox("Tablets_UseSplit").ClickChecked(false);
          } 
          if(p_drug == "D")
          {
              panelEPCI.Panel(2).Select("DrugId").ClickItem("Dabigatran");
              panelEPCI.Panel(1).Select("DiagnosisSelected").ClickItem("Atrial fibrillation");
              panelEPCI.Panel(2).Select("DrugId").ClickItem("Dabigatran");
              panelEPCI.Panel(3).Select("TreatmentDuration").ClickItem("Indefinite");

          }   
    formATPF.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();

}