//USEUNIT Navigation
//USEUNIT Navigate_Patient
//USEUNIT Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT V5_SQL
//USEUNIT Quick_Patient
//USEUNIT Home_Page_Regression_Quick_Checking
//USEUNIT Create_Clinics

//===============================================================================
function release_pre_s4_2()

{
//      Step_4_2_1_Add_TreatmentPlan_No_Treatments(); //Now in new style
//      Step_4_2_1_1_Edit_TreatmentPlan_No_Treatments(); //Now in new style
      Step_4_2_2_Add_TreatmentPlan_With_Treatment(); 
//      Step_4_2_3_Edit_TreatmentPlan_Treatments(); //Now in new style
      Step_4_2_4_Add_TreatmentPlan_Unknown_Diagnosis();
//         Step_4_2_5_Add_TreatmentPlan_Future_Appointment();
////      Step_4_2_6_Change_Dose_Method(); //Now in new style
}        
//===============================================================================       
 
//function Step_4_2_1_Add_TreatmentPlan_No_Treatments()
//
//{
//  log_on_cl3();
//  var INRstarV5 = set_system();
//  
//  quick_patient_regression();
//  
//  WaitSeconds(2,"");
//         
//   Goto_Patient_TreatmentPlan_Add();
//  
//   var w_master_date = aqDateTime.Today();
//   var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
//         
//  quick_pt_treatmentplan("W", "", w_start_date);
//  
//  Goto_Patient_TreatmentPlan();
//  
//  WaitSeconds(2)
//  
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelPR = panelMCP.Panel("PatientRecord");
//  var panelPTC = panelPR.Panel("PatientMainTabContent").Panel("PatientTabContent");
//  var panelAPTPD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
//  var panelAPTPL = panelAPTPD.Panel(1).Button("AddPatientTreatmentPlanLink");
//    
//  if (panelAPTPL.className == "Button disabled")
//  {
//   Log.Checkpoint("Test 4.2.1 Can't add second treatment plan - TEST_PASS");
//  }
//    else 
//      {
//      Log.Warning("Treatment plan should have been disabled");      
//      }
//    
//  log_off();
//    
//}
//===============================================================================       
//function Step_4_2_1_1_Edit_TreatmentPlan_No_Treatments()
//
//{
//  log_on_cl3();
//  var INRstarV5 = set_system();
//  
//  quick_patient_regression();
//  
//   WaitSeconds(2,"");
//         
//   Goto_Patient_TreatmentPlan_Add();
//  
//    var w_master_date = aqDateTime.Today();
//    var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
//         
//    quick_pt_treatmentplan("W", "", w_start_date);
//
////Testing the editable fields
//
// Goto_Patient_TreatmentPlan_Edit_Existing_Plan()
//    
////Testing the start date
//    var w_main_path = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("PatientEditTreatmentPlanForm").Panel("EditPatientTreatmentPlanInformation");
//    var startDate = w_main_path.Panel(0).Textbox("Start");
//    
//    if (startDate.className !== "DateInputPopUp hasDatepicker") 
//    {
//      Log.Warning("Start date is disabled");
//    }
//       else 
//       {
//         Log.Checkpoint("Start date can be edited - Field PASS");
//       }
//     
////Testing the rest of the treatment Plan fields
//     
//     var w_main_path = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("PatientEditTreatmentPlanForm").Panel("EditPatientTreatmentPlanInformation");
//
//     test_field_select(w_main_path.Panel(1).Select("DiagnosisSelected"),"Diagnosis"); 
//     test_field_select(w_main_path.Panel(2).Select("DrugId"), "Drug"); 
//     test_field_select(w_main_path.Panel(3).Select("TreatmentDuration"), "Duration");
//     
//     var w_main_path_war_details = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("PatientEditTreatmentPlanForm").Panel("EditPatientTreatmentPlanInformation").Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation");
//     
//     test_field_select(w_main_path_war_details.Panel("DiagnosisDetails").Panel(0).Select("TargetINR"), "Target INR");
//     test_field_select(w_main_path_war_details.Panel(0).Select("DosingMethod"),"Dosing Method");
//     test_field_select(w_main_path_war_details.Panel(1).Select("TestingMethod"),"Testing Method");
//     test_field_select(w_main_path_war_details.Panel(2).Select("MaxReview"),"Max Review");
//     
//     log_off();
//     
//     Log.Checkpoint("Step_4_2_1_1_Edit_TreatmentPlan_No_Treatments - TEST_PASS");
//}
 //===============================================================================  
 //Function for testing if field passed in is a label or can be edited
 
 function test_field_select(p_field,p_field_name)

{
    if (p_field.ObjectType=="Label") 
    {
       Log.Warning(p_field_name + " " + "Field is read only TEST FAIL");
    }
       else
       {
          Log.Checkpoint(p_field_name + " " + "Field can be edited Field PASS");
       }
 }
//===============================================================================  
function Step_4_2_2_Add_TreatmentPlan_With_Treatment()

{

  log_on_cl3();
  var INRstarV5 = set_system();
  
  //Adding a quick patient
  quick_patient_regression();
  
  //Adding a quick treatment plan      
  Goto_Patient_TreatmentPlan_Add();
         
   var w_master_date = aqDateTime.Today();
   var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
         
  quick_pt_treatmentplan("W", "", w_start_date);
  
  //Adding a quick treatment
  Goto_Add_Historical();

   var w_date = aqDateTime.AddDays(aqDateTime.Today(), -6);
   var w_day = aqString.SubString(w_date,0,2);
   var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
   var w_yr = aqString.SubString(w_date,6,4);
    
  quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "2", "Regression 4.3.1 -  Historical Treatment");
  
  //Adding an additional treatment plan
  Goto_Patient_TreatmentPlan_Add_more_1_treatmentPlan();

  var INRstarV5 = set_system();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var formATPF = panelPCD.Form("AddTreatmentPlanForm");
  var panelEPCI = formATPF.FieldSet(0).Panel("EditPatientTreatmentPlanInformation");
  var panelPTPI = formATPF .Panel("PatientTreatmentPlanInformation");
   
  panelEPCI.Panel(0).Image("calendar_png").Click();
   w_datepicker = INRstarV5.Panel("ui_datepicker_div");
   w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
   w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
   select_day(w_day, w_datepicker);
     
  panelEPCI .Panel(1).Select("DiagnosisSelected").ClickItem("Atrial fibrillation");
  panelEPCI.Panel(2).Select("DrugId").ClickItem("Warfarin");
  
  //proces the pop-ups
  process_button(INRstarV5, "Is this patient currently taking Warfarin?", "Yes") ;
  process_button(INRstarV5, "New Warfarin Treatment Plan", "Yes") ;
    
  //Save the plan
  panelPTPI.SubmitButton("AddPatientTreatmentPlan").Click();
  
  WaitSeconds(4)
  Log.Checkpoint("Test 4.2.2 Start a new treatment plan after a treatment has been added select yes to warning messages - TEST_PASS");
    
  log_off();
}
//===============================================================================  
//function Step_4_2_3_Edit_TreatmentPlan_Treatments()
//
//{
//
//  log_on_cl3();
//  var INRstarV5 = set_system();
//  
//  //Adding a quick patient
//  quick_patient_regression();
//  WaitSeconds(2,"");
//  
//  //Adding a quick treatment plan      
//  Goto_Patient_TreatmentPlan_Add();
//  
//  var w_master_date = aqDateTime.Today();
//  var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
//         
//  quick_pt_treatmentplan("W", "", w_start_date);
//  
//  //Adding a quick treatment
//  Goto_Add_Historical();
//
//   var w_date = aqDateTime.AddDays(aqDateTime.Today(), -6);
//   var w_day = aqString.SubString(w_date,0,2);
//   var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
//   var w_yr = aqString.SubString(w_date,6,4);
//    
//  quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "2", "Regression 4.3.1 -  Historical Treatment");
//
//  Goto_Patient_TreatmentPlan_Edit_Existing_Plan()
//  
//   var INRstarV5 = set_system();
//   var w_main_path = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("PatientEditTreatmentPlanForm").Panel("EditPatientTreatmentPlanInformation");
//   
//   test_field_label(w_main_path.Panel(0).Label("Start_DetachedLabel"),"Start Date")
//   test_field_label(w_main_path.Panel(1).Label("DiagnosisName_DetachedLabel"),"Diagnosis"); 
//   test_field_label(w_main_path.Panel(2).Label("DrugName_DetachedLabel"), "Drug"); 
//   
//   test_field_select(w_main_path.Panel(3).Select("TreatmentDuration"), "Duration");
//     
//   var w_main_path_war_details = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("PatientEditTreatmentPlanForm").Panel("EditPatientTreatmentPlanInformation").Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation");
//     
//   test_field_select(w_main_path_war_details.Panel("DiagnosisDetails").Panel(0).Select("TargetINR"), "Target INR");
//   test_field_select(w_main_path_war_details.Panel(0).Select("DosingMethod"),"Dosing Method");
//   test_field_select(w_main_path_war_details.Panel(1).Select("TestingMethod"),"Testing Method");
//   test_field_select(w_main_path_war_details.Panel(2).Select("MaxReview"),"Max Review");
//   
//   var form = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("PatientEditTreatmentPlanForm");
//   form.Panel(0).Button("CancelPatientTreatmentPlanEdit").Click();
//   
//   log_off();
//   
//   Log.Checkpoint("Step_4_2_3_Edit_TreatmentPlan_Treatments - TEST_PASS");
//   
//}
 //===============================================================================  
 //Function for testing if field passed in is a label or can be edited
 
 function test_field_label(p_field,p_field_name)

 {
    if (p_field.ObjectType=="Label") 
     {
       Log.Checkpoint(p_field_name + " " + "Field is read only TEST PASS");
     }
       else
       {
         Log.Warning(p_field_name + " " + "Field can be edited TEST Fail");
       }
     
 }
 //===============================================================================   
function Step_4_2_4_Add_TreatmentPlan_Unknown_Diagnosis()

{
  log_on_cl3();
  var INRstarV5 = set_system();
  WaitSeconds(2,"");
  //Adding a quick patient
  quick_patient_regression();
  WaitSeconds(2,"");
  
  //Adding a quick treatment plan      
  Goto_Patient_TreatmentPlan_Add();
         
   var w_master_date = aqDateTime.Today();
   var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
         
  quick_pt_treatmentplan("W", "", w_start_date);
  
  //Adding a quick treatment
  Goto_Add_Historical();

   var w_date = aqDateTime.AddDays(aqDateTime.Today(), -6);
   var w_day = aqString.SubString(w_date,0,2);
   var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
   var w_yr = aqString.SubString(w_date,6,4);
    
  quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "2", "Regression");

  var w_nhs_no = get_patient_nhs();
  var w_first_name = get_patient_first_name();
  var w_id = SQL_Find_Patient_Regression(w_nhs_no, w_first_name);
  SQL_update_diagnosis(w_id);
  
  Goto_Patient_TreatmentPlan();

  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord");
  var panelPTC = panelPR.Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelAPTPD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var panelAPTPL = panelAPTPD.Panel(1).Button("AddPatientTreatmentPlanLink");
    
  if (panelAPTPL.className == "Button disabled")
  {
   Log.Checkpoint("Step_4_2_4_Add_TreatmentPlan_Uknown_Diagnosis - TEST_PASS");
  }
    else 
      {
      Log.Warning("Treatment plan should have been disabled");      
      }

    log_off();
  
  }

//===============================================================================   
function Step_4_2_5_Add_TreatmentPlan_Future_Appointment()

{
  
  log_on_clead();
  var INRstarV5 = set_system();
  quick_start_clinic();
   
  //Adding a quick patient
  quick_patient_regression();
  WaitSeconds(2,"");

  //Adding a quick treatment plan      
  Goto_Patient_TreatmentPlan_Add();
         
   var w_master_date = aqDateTime.Today();
   var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
         
  quick_pt_treatmentplan("W", "", w_start_date);
  
  //Adding a quick treatment
  Goto_Add_Historical();

   var w_date = aqDateTime.AddDays(aqDateTime.Today(), -6);
   var w_day = aqString.SubString(w_date,0,2);
   var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
   var w_yr = aqString.SubString(w_date,6,4);
    
  quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "2", "Regression");

}

function Step_4_2_5_Add_Appointment()
{

   var INRstarV5 = set_system();

}

//===============================================================================  

//function Step_4_2_6_Change_Dose_Method()
//{
//  log_on_cl3();
//  var INRstarV5 = set_system();
//  
//  //Adding a quick patient
//  quick_patient_regression();
//  WaitSeconds(2,"");
//  
//  //Adding a quick treatment plan      
//  Goto_Patient_TreatmentPlan_Add();
//  
//  var w_master_date = aqDateTime.Today();
//  var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -7));
//         
//  quick_pt_treatmentplan("W", "", w_start_date);
//  
//  //Edit the treatment plan 
//  Goto_Patient_TreatmentPlan_Edit_Existing_Plan();
//  
//  var INRstarV5 = set_system();
//  var w_main_path = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
//  var form= w_main_path.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("PatientEditTreatmentPlanForm")
//  var panelEPTI = form.Panel("EditPatientTreatmentPlanInformation");
//  var panelEPTPI= panelEPTI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation")
//  
//  panelEPTPI.Panel(0).Select("DosingMethod").ClickItem("Hillingdon Maintenance");
//  
//  WaitSeconds(2)
//  
//  var text=INRstarV5.Panel(3).Panel("modalDialogBox").Panel(0).TextNode(0).ContentText;
//  
//  if (text=="This algorithm is designed for the maintenance control of patients already established on warfarin treatment. The warfarin dose should be stable. The interval between the last 2 INR tests should be at least 7 days for this algorithm to be suitable.") {
//      Log.Checkpoint("Step_4_2_6_Change_Dose_Method - TEST_PASS");
//     }
//     else 
//        log.Warning("Maintenance wording not corect or not present");
//  
//  INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).Click();
//  form.Panel(0).Button("UpdatePatientTreatmentPlan").Click();
//  
//  log_off();
//}






