//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT Test_Add_Historical_Treatment
//USEUNIT Quick_Review_Dabigatran

//===============================================================================
// Create Patient, Patient Clinical & Historical Record

//-------------------------------------------------------------------------------
function quick_patient_only()
{
        var INRstarV5 = set_system();

          for (i=0; i<5; i++)
          {
                    Goto_Add_Patient();
                    quick_pt_demographics("Test", "Fred", "M");
          }
 }
//-------------------------------------------------------------------------------
function quick_patient_loop()
{

          for (i=0; i<10; i++)
          {
                   quick_patient();
          }
 }
//-------------------------------------------------------------------------------
function quick_patient()
{

        var INRstarV5 = set_system();

         Goto_Add_Patient();
         
         quick_pt_demographics("Pink", "Penny", "F");
         
         WaitSeconds(2,"");
         
         Goto_Patient_TreatmentPlan_Add();
         
         var w_drug = "W";
         var w_dm = "";
         var w_start = "02/04/2016";
         
         quick_pt_treatmentplan(w_drug, w_dm, w_start);

//         if (w_drug == "W")
//         {
//                 Goto_Add_Historical();
//         
//                 // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
//                 quick_pt_historical("21", 8, "2014", "2.5", "2.3", "2.5", "0", "7", "Quick Patient treatment");
//
//                 Goto_Add_Historical();
//         
//                 // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
//                 quick_pt_historical("28", 8, "2014", "2.2", "2.3", "2.5", "0", "14", "Quick Patient treatment");
//          }
//         if (w_drug == "D")
//         {
//                   // Goto_Patient_TreatmentPlan_Review();
//                   WaitSeconds(2,"Waiting before adding a review");
//                   quick_review_dabigatran(INRstarV5);
//          }
}
//-------------------------------------------------------------------------------
function quick_patient_regression()
{

        var INRstarV5 = set_system();
        Goto_Add_Patient();  
        quick_pt_demographics("Test", "Regression", "M");
        WaitSeconds(2,"");
      
}
//===============================================================================
function quick_pt_demographics(p_surname, p_firstname, p_gender)
{
    var INRstarV5 = set_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    WaitSeconds(1)
    var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
    
    var w_nhs = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Textbox("NHSNumber").Text = Get_New_Number_V5();
//    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("PatientNumber").Text = "PatNum."+aqConvert.IntToStr(Math.floor(Math.random()*1000));
    if (p_gender == "M" || p_gender == "m")
          form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Select("Title").ClickItem("Mr");
    else
          form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Select("Title").ClickItem("Mrs");
    if (p_surname == "")
          form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text = "SplitPlan_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
    else
          form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text = p_surname+"_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
    if (p_firstname == "")
              form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text = "Arthur_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
    else      
              form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text =p_firstname+"_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
              
              
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Image("calendar_png").Click();
    
    var w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jan");
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("1975");
    w_datepicker.Table(0).Cell(3, 3).Link(0).Click();

    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Arndale Avenue";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(1).Textbox("SecondLineAddress").Text = "Wetherfield";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(2).Textbox("ThirdLineAddress").Text = "";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text = "Manchester";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text = "Granadaland";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(5).Textbox("Postcode").Text = "CO12 1LW";
    
     form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(6).Textbox("Phone").Text = "01209 710999";
     form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(7).Textbox("Mobile").Text = "07111 225588";
     form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(8).Textbox("Email").Text = "joeythebird@home.com";

    
    
 //   form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(9).Select("ClinicianId").ClickItem(1);

    form.Panel(0).SubmitButton("AddPatientDetails").Click();
    return w_nhs

}
//===============================================================================
function quick_pt_management(INRstarV5)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var form = panelPTC.Form("PatientManagementForm");
    form.Panel("PatientManagementWrapper").Panel("PatientManagementDetails").Panel(2).Select("ClinicianId").ClickItem(1);
    form.Panel("PatientManagementWrapper").Panel("PatientGroups").Panel(0).Checkbox("Transport").ClickChecked(true);
          
          // click Save 
    form.Panel(0).SubmitButton("UpdatePatientManagementDetails").Click();
}
//===============================================================================
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
   
    WaitSeconds(4,"Waiting for the drug dropdown")
    
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
                          
                      var panelEPTPTS = panelEPCI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanTabletSelection");
                      
                         // panelEPCTS.Panel(0).Checkbox("NPSA").ClickChecked(false); 
                          panelEPTPTS.Panel(1).Checkbox("Tablets_Use5").ClickChecked(true);
                          panelEPTPTS.Panel(2).Checkbox("Tablets_Use3").ClickChecked(true);
                          panelEPTPTS.Panel(3).Checkbox("Tablets_Use1").ClickChecked(true);
                          panelEPTPTS.Panel(4).Checkbox("Tablets_UseHalf").ClickChecked(true);
                          panelEPTPTS.Panel(5).Checkbox("Tablets_UseSplit").ClickChecked(true);
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
//----------------------------------------------------------------------------------------------------------------
function quick_change_diagnosis(INRstarV5, w_plan_date)
{
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPTPD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
    
    // click the Change Diagnosis button
    panelPTPD.Panel(0).Button("AddPatientTreatmentPlanLink").Click();
    
    // proces the pop-ups
    process_button(INRstarV5, "Is this patient currently taking Warfarin?", "Yes") ;
    process_button(INRstarV5, "Changing Diagnosis", "Yes") ;

   var w_day = aqString.SubString(w_plan_date,0,2);
   var w_mth = aqConvert.StrToInt(aqString.SubString(w_plan_date,3,2));
   var w_yr = aqString.SubString(w_plan_date,6,4);
   
    var formATPF = panelPTPD.Form("AddTreatmentPlanForm");
    var panelEPCI = formATPF.FieldSet(0).Panel("EditPatientTreatmentPlanInformation");
    
    panelEPCI.Panel(0).Image("calendar_png").Click();
    datepicker = INRstarV5.Panel("ui_datepicker_div");
    datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
    datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
    select_day(w_day, datepicker);
    panelEPCI.Panel(1).Select("DiagnosisId").ClickItem("Atrial fibrillation");
        
    formATPF.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();
    

}
function quick_ttr_pt_demographics()
{
    var INRstarV5 = set_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");

    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Textbox("NHSNumber").Text = Get_New_Number_V5();
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Select("Title").ClickItem("Mr");
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text = "Jones_TTR_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
//    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(3).Textbox("Surname").Text = "TTR_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("FirstName").Text = "Charles_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(5).Image("calendar_png").Click();
    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Aug");
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("1974");
    w_datepicker.Table(0).Cell(3, 3).Link(0).Click();
//    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(6).Select("Sex").ClickItem("Male")
//    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(7).Select("Gender").ClickItem("Male");
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(0).Textbox("FirstLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)) + " Arndale Avenue";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(1).Textbox("SecondLineAddress").Text = "Wetherfield";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(2).Textbox("ThirdLineAddress").Text = "";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(3).Textbox("Town").Text = "Manchester";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(4).Textbox("County").Text = "Granadaland";
    form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(5).Textbox("Postcode").Text = "CO12 1LW";
    
    //form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(9).Select("ClinicianId").ClickItem(1);

    form.Panel(0).SubmitButton("AddPatientDetails").Click();

}
function quick_ttr_pt_treatmentplan(p_start)
{
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
    var formATPF = panelPCD.Form("AddTreatmentPlanForm");
    var panelEPCI = formATPF.FieldSet(0).Panel("EditPatientTreatmentPlanInformation");
    
    //commented below line for a moment as this is not available unless warfarin treatment plan!
    //var panelEPCTS = formATPF.FieldSet(0).Panel("EditPatientTreatmentPlanTabletSelection");
  
    Log.Message("Start Date is :" + p_start); 
   var w_day = aqString.SubString(p_start,0,2);
   var w_mth = aqConvert.StrToInt(aqString.SubString(p_start,3,2));
   var w_yr = aqString.SubString(p_start,6,4);

    panelEPCI.Panel(0).Image("calendar_png").Click();
    datepicker = INRstarV5.Panel("ui_datepicker_div");
    datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
    datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
    select_day(w_day, datepicker);
    panelEPCI.Panel(1).Select("DiagnosisSelected").ClickItem("Antiphospholipid syndrome");
    panelEPCI.Panel(2).Select("DrugId").ClickItem("Warfarin");

    var panelWDP = panelEPCI.Panel("WarfarinDetailsPanel");
    //var panelEPTPI = panelWDP.Panel("EditPatientTreatmentPlanInformation");
    var panelPTPI = panelWDP.Panel("PatientTreatmentPlanInformation");
    var panelEPTPI = panelPTPI.Panel(0).Panel("EditPatientTreatmentPlanInformation");
//.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation").Panel(1).Select("TestingMethod")
    
    
    panelEPTPI.Panel(1).Select("TestingMethod").ClickItem("PoCT");
    panelEPTPI.Panel(2).Select("MaxReview").ClickItem("70 Days");

    panelEPTPI.Panel(0).Select("DosingMethod").ClickItem("Coventry Maintenance");
    // Acknowledge Dosing More Info window
    process_more_information(INRstarV5);  
    
    
        
    //var panelEPTPTS = panelWDP.Panel("EditPatientTreatmentPlanTabletSelection");
    var panelEPTPTS = panelPTPI.Panel(0).Panel("EditPatientTreatmentPlanTabletSelection");
    
    
//.Panel("EditPatientTreatmentPlanInformation").Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanTabletSelection").Panel(0).Checkbox("NPSA")
    //panelEPCI.Panel(3).Select("TestingMethod").ClickItem("PoCT");
    //panelEPCI.Panel(4).Select("MaxReview").ClickItem("70 Days");
    
    //panelEPCI.Panel(5).Checkbox("WrittenInfoProvided").ClickChecked(true);
    
    panelEPTPTS.Panel(0).Checkbox("NPSA").ClickChecked(false); 
    panelEPTPTS.Panel(1).Checkbox("Tablets_Use5").ClickChecked(false);
    panelEPTPTS.Panel(2).Checkbox("Tablets_Use3").ClickChecked(true);
    panelEPTPTS.Panel(3).Checkbox("Tablets_Use1").ClickChecked(true);
    panelEPTPTS.Panel(4).Checkbox("Tablets_UseHalf").ClickChecked(true);
    panelEPTPTS.Panel(5).Checkbox("Tablets_UseSplit").ClickChecked(false);
    
    formATPF.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();

}
function quick_AF_pt_treatmentplan(p_start)
{
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
    var formATPF = panelPCD.Form("AddTreatmentPlanForm");
    var panelEPCI = formATPF.FieldSet(0).Panel("EditPatientTreatmentPlanInformation");
    
    //commented below line for a moment as this is not available unless warfarin treatment plan!
    //var panelEPCTS = formATPF.FieldSet(0).Panel("EditPatientTreatmentPlanTabletSelection");
  
    Log.Message("Start Date is :" + p_start); 
   var w_day = aqString.SubString(p_start,0,2);
   var w_mth = aqConvert.StrToInt(aqString.SubString(p_start,3,2));
   var w_yr = aqString.SubString(p_start,6,4);

    panelEPCI.Panel(0).Image("calendar_png").Click();
    datepicker = INRstarV5.Panel("ui_datepicker_div");
    datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
    datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
    select_day(w_day, datepicker);
    panelEPCI.Panel(1).Select("DiagnosisSelected").ClickItem("Atrial fibrillation");
    panelEPCI.Panel(2).Select("DrugId").ClickItem("Warfarin");

    var panelWDP = panelEPCI.Panel("WarfarinDetailsPanel");
    var panelEPTPI = panelWDP.Panel("EditPatientTreatmentPlanInformation");


    panelEPTPI.Panel(1).Select("TestingMethod").ClickItem("PoCT");
    panelEPTPI.Panel(2).Select("MaxReview").ClickItem("70 Days");

    panelEPTPI.Panel(0).Select("DosingMethod").ClickItem("Coventry Maintenance");
    // Acknowledge Dosing More Info window
    process_more_information(INRstarV5);  
    
    
        
    var panelEPTPTS = panelWDP.Panel("EditPatientTreatmentPlanTabletSelection");
    

    //panelEPCI.Panel(3).Select("TestingMethod").ClickItem("PoCT");
    //panelEPCI.Panel(4).Select("MaxReview").ClickItem("70 Days");
    
    //panelEPCI.Panel(5).Checkbox("WrittenInfoProvided").ClickChecked(true);
    
    panelEPTPTS.Panel(0).Checkbox("NPSA").ClickChecked(false); 
    panelEPTPTS.Panel(1).Checkbox("Tablets_Use5").ClickChecked(false);
    panelEPTPTS.Panel(2).Checkbox("Tablets_Use3").ClickChecked(true);
    panelEPTPTS.Panel(3).Checkbox("Tablets_Use1").ClickChecked(true);
    panelEPTPTS.Panel(4).Checkbox("Tablets_UseHalf").ClickChecked(true);
    panelEPTPTS.Panel(5).Checkbox("Tablets_UseSplit").ClickChecked(false);
    
    formATPF.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();

}


//----------------------------------------------------------------------------------------------------------------
function quick_ttr_change_diagnosis(INRstarV5, w_plan_date, wf_use_prev)
{
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    
    // release 33
    //var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    //var panelPTPD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");

    // click the Change Diagnosis button
//    panelPTPD.Panel(0).Button("EditPatientTreatmentPlanLink").Click();
//    
//    // process the pop-ups
//    if(wf_use_prev == true)
//    {
//             process_button(INRstarV5, "Is this patient currently taking Warfarin?", "Yes") ;
//             process_button(INRstarV5, "Changing Diagnosis", "Yes") ;
//    }
//    else
//    {
//              process_button(INRstarV5, "Is this patient currently taking Warfarin?", "No") ;
//    }
//
//   var w_day = aqString.SubString(w_plan_date,0,2);
//   var w_mth = aqConvert.StrToInt(aqString.SubString(w_plan_date,3,2));
//   var w_yr = aqString.SubString(w_plan_date,6,4);
//   
//    var formATPF = panelPTPD.Form("AddTreatmentPlanForm");
//    var panelEPCI = formATPF.FieldSet(0).Panel("EditPatientTreatmentPlanInformation");
//    
//    panelEPCI.Panel(0).Image("calendar_png").Click();
//    datepicker = INRstarV5.Panel("ui_datepicker_div");
//    datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
//    datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
//    select_day(w_day, datepicker);
//    panelEPCI.Panel(1).Select("DiagnosisId").ClickItem("Atrial fibrillation");
//        
//    formATPF.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();

    // release 35
    WaitSeconds(1,"Going to Clinical Details");    
    var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
    var panelPTPTSM = panelPMTC.Panel("TreatmentPlanSubTab").Panel("PatientTreatmentPlanTabSubMenu");
    
    panelPTPTSM.Link("PatientTreatmentPlanTab").Click();

    // click New Treatment Plan button
    panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Panel(0).Button("AddPatientTreatmentPlanLink").Click();

    var w_day = aqString.SubString(w_plan_date,0,2);
    var w_mth = aqConvert.StrToInt(aqString.SubString(w_plan_date,3,2));
    var w_yr = aqString.SubString(w_plan_date,6,4);
    
    // pick date
    panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("AddTreatmentPlanForm").Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(0).Image("calendar_png").Click();
        
    datepicker = INRstarV5.Panel("ui_datepicker_div");
    datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
    datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
    select_day(w_day, datepicker);

    // pick diagnosis
    panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("AddTreatmentPlanForm").Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(1).Select("DiagnosisSelected").ClickItem("Atrial fibrillation");

    // pick drug
    panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("AddTreatmentPlanForm").Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel(2).Select("DrugId").ClickItem("Warfarin");

    // process the pop-ups
    if(wf_use_prev == true)
    {
             process_button(INRstarV5, "Is this patient currently taking Warfarin?", "Yes") ;
             process_button(INRstarV5, "New Warfarin Treatment Plan", "Yes") ;

              // Save the plan          
              panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("AddTreatmentPlanForm").Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();    

    }
    else
    {
              process_button(INRstarV5, "Is this patient currently taking Warfarin?", "No") ;

              // Complete form (Dosing Method, Testing Method)

              // 1st do testing method
              panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("AddTreatmentPlanForm").Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel("WarfarinDetailsPanel").Panel("EditPatientTreatmentPlanInformation").Panel(1).Select("TestingMethod").ClickItem("PoCT");

              // then do dosing method
              panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("AddTreatmentPlanForm").Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel("WarfarinDetailsPanel").Panel("EditPatientTreatmentPlanInformation").Panel(0).Select("DosingMethod").ClickItem("Coventry Maintenance");
              
              // process the maintenance dosing information popup
              process_more_information(INRstarV5);

              // Save the plan          
              panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("AddTreatmentPlanForm").Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();    

              // process the popup about needing to add a historical treatment
              Aliases.iexplore1.pageInrstar.panelUiDialogUiWidgetUiWidgetCon.Panel(1).Panel(0).Button(0).Click();
              //process_button(INRstarV5, "You will need to add an historical treatment", "OK") ;             
              
    } 
        
//    // Save the plan          
//    panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("AddTreatmentPlanForm").Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();    
//
//    // process the popup about needing to add a historical treatment
//    Aliases.iexplore1.pageInrstar.panelUiDialogUiWidgetUiWidgetCon.Panel(1).Panel(0).Button(0).Click();
//    //process_button(INRstarV5, "You will need to add an historical treatment", "OK") ;
//
    WaitSeconds(10,"Just waiting for dialog to clear?");
        
}


