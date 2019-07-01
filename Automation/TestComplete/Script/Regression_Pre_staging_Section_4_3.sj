//USEUNIT Navigation
//USEUNIT Navigate_Patient
//USEUNIT Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT V5_SQL
//USEUNIT Home_Page_Regression_Quick_Checking
//USEUNIT Test_Add_Historical_Treatment
//USEUNIT Add_INR_Backdated
//USEUNIT Add_INR_Simple
//USEUNIT Add_INR_Complex_Override
//USEUNIT Add_INR_Complex_Override_Dose
//USEUNIT Add_INR_Override_2
//USEUNIT Add_INR_Refer
//USEUNIT Delete_Treatments
//USEUNIT Test_Audit
//USEUNIT Test_Change_Schedule
//USEUNIT Quick_Patient

//===============================================================================
function release_pre_s4_3()
{
//        Step_4_3_1_Add_Historical_Treatment(); //in new so deleted
        Step_4_3_2_Add_in_range_INR();   // (includes 4_3_3: Save INR and 4_3_4: Print summary & Diary)
        Step_4_3_5_Delete_last_treatment() ;
        Step_4_3_6_Add_Low_INR_Treatment();  // (includes 4_3_7: Override and 4_3_8: Save)
        Step_4_3_9_Add_High_INR_Treatment();  // (includes 4_3_10 to 4_3_15)
        Step_4_3_16_View_Treatment_Audit();
        Step_4_3_17_Historical_Treatment_Order(); 
        Step_4_3_18_Unstable_Patient();       
        Step_4_3_19_New_Maintenance_Patient(); // (includes 4_3_20)

//////////       Step_4_3_21_Concurrency(INRstarV5); // Not doing this via automation yet !!

       Step_4_3_22_Add_2nd_Maintenance_On_Same_Day();
       Step_4_3_23_Add_Early_INR();
       Step_4_3_24_Override_20Pcent();

////////       Step_4_3_25_Override_Permissions(INRstarV5) // Not doing this via automation yet !!

        Step_4_3_27_Transfer_a_patient_who_has_a_pending_treatment(); // (includes 4.3.28: cancelling_pending_treatment) 
        
}
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
function Step_4_3_2_Add_in_range_INR(INRstarV5)  
{
   
   
     // select patient
    Goto_Recently_Viewed();
    preset_Fetch_Patient_Recent(INRstarV5);
 
     //  i)   Add an in-range INR, Print the diary and summary sheet
    Goto_Patient_New_INR();
    add_inr_simple(2.5);
    Goto_Patient_Audit();
    display_top_patient_audit("Add New INR");
    WaitSeconds(2);
    Goto_Patient_Treatment_Audit();
    display_top_treatment_audit("Accept Treatment");
    
    //Need to check the test machine has printing and adobe before uncomment this section lines 81-97, also may now need a Goto as I added in audit trail lines 82 and 83
    
//    Log.Message("Step_4_3_4_Print Diary & Summary");
//    WaitSeconds(2,"Waiting before prints");
//    
////  Print the diary and summary sheet
//    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//    var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
//    var panelTPW = panelPMTC.Panel("PatientTabContent").Panel("TreatmentPlanWrapper");
//    var panelPPT = panelTPW.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
//    var panelPB = panelPPT.Panel("TreatmentButtonsContainer").Fieldset("PrintButtons");
//    
//    panelPB.Button("PrintSummarySheet").Click();
//
//    WaitSeconds(5,"Waiting between prints");
//    
//    panelPB.Button("PrintLatestDosingDiary").Click();

Log.Checkpoint("Test 4.3.2 - 4.3.3 Add_and_save_in_range_ - TEST_PASS");
}
//-------------------------------------------------------------------------------
function Step_4_3_5_Delete_last_treatment(INRstarV5)  
{
    
   
     // select patient
    Goto_Recently_Viewed();
    preset_Fetch_Patient_Recent(INRstarV5);
 
//  Delete the last treatment
    delete_treatment(INRstarV5);
    Goto_Patient_Audit();
    display_top_patient_audit("Treatment Deleted");
    
Log.Checkpoint("Step Test 4_3_5 Delete_Last_Treatment - TEST_PASS");
}
//-------------------------------------------------------------------------------
function Step_4_3_6_Add_Low_INR_Treatment(INRstarV5)  
{
    
   
     // select patient
    Goto_Recently_Viewed();
    preset_Fetch_Patient_Recent(INRstarV5);

    Goto_Patient_New_INR();
    
     var w_inr = 1.7;
     var wf_missed = false;
     var wf_meds = false;
     var wf_limit = false;
     var w_dose = "4.5";
     var w_review = "8";
 
    add_inr_complex_override_dose(w_inr, wf_missed, wf_meds, wf_limit, w_dose, w_review);
    
    Goto_Patient_Audit();
    display_top_patient_audit("Add New INR");
    Goto_Patient_Treatment_Audit();
    display_top_treatment_audit("Accept Treatment");
    WaitSeconds(1,"Waiting for second GoTo");
    Goto_Patient_Treatment_Audit();
    display_second_treatment_audit("Override Treatment");
    
    Log.Checkpoint("Step Test 4_3_6 - 4_3_8 Add a low INR result, Override dose, review period,  - TEST_PASS");
    
   // tidy up
   delete_treatment(INRstarV5);
}
//-------------------------------------------------------------------------------
function Step_4_3_9_Add_High_INR_Treatment(INRstarV5)  
{
     // select patient
    Goto_Recently_Viewed();
    preset_Fetch_Patient_Recent(INRstarV5);

    Step_4_3_9_High(INRstarV5);
    Step_4_3_10_Comment(INRstarV5);
    Step_4_3_11_Schedule(INRstarV5);
    Step_4_3_12_Change_Schedule(INRstarV5);
    Step_4_3_13_Refer(INRstarV5);      
    Step_4_3_14_Authorise(INRstarV5);
    Step_4_3_15_Save(INRstarV5);
}
//-------------------------------------------------------------------------------
function Step_4_3_9_High(INRstarV5)  
{
//    delete_treatment();
    Goto_Patient_New_INR();
    add_inr_refer("3.3");
    
    Log.Checkpoint("Step Test 4_3_9 Add a high INR  - TEST_PASS");
}
//-------------------------------------------------------------------------------
//function Step_4_3_10_Comment(INRstarV5)  
//{
//
//    // 1st - cancel Edit
//    var INRstarV5 = set_system();
//    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//    var panelPTI = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");
//    panelPTI.Panel(0).Button("EditComments").Click();
//    add_comments(INRstarV5, "This is a new comment.");
//    
//    Log.Checkpoint("Step Test 4_3_10 Add a comment  - TEST_PASS");
//}
//-------------------------------------------------------------------------------
function Step_4_3_11_Schedule(INRstarV5)  
{
    // Select other schedule
    change_schedule(INRstarV5);
    
     Log.Checkpoint("Step Test 4_3_11 Select another schedule  - TEST_PASS");
}
//-------------------------------------------------------------------------------
function Step_4_3_12_Change_Schedule(INRstarV5)  
{
    // Re-order schedule
    re_order_schedule(INRstarV5);
    
    Log.Checkpoint("Step Test 4_3_12 Drag-and-drop schedule days  - TEST_PASS");
}
//-------------------------------------------------------------------------------
function Step_4_3_13_Refer()  
{
  // Refer Treatement
   var INRstarV5 = set_system();                                        
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
   var panelPTI = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");
   
   panelPTI.Panel(0).Button("ReferPendingTreatment").Click();
   
   Log.Checkpoint("Step Test 4_3_13 Refer the treatment  - TEST_PASS");
   
}
//-------------------------------------------------------------------------------
function Step_4_3_14_Authorise()  
{
  
    var INRstarV5 = set_system();
    
    //Getting the patient so that you can find them on the list
    Goto_Recently_Viewed();
    preset_Fetch_Patient_Recent();
    var patFirstname = get_patient_first_name();
    var patSurname = get_patient_surname();
    var messagename = (patSurname + ", " + patFirstname);
    Log.Message(messagename);
    
   // Click the Referred Patient's Report
   
    Goto_Home();
    
   //Getting the row number from the list for the given patient and accept the transfer

    var row_number
  
    row_number=check_pat_on_refer_list(messagename);
    Log.Message(row_number)
    
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
    var panelUTC = panelMCP.Panel("UserTabContent").Panel("UserMessages").Panel("UserClinicalReports");
    
    var table = panelUTC.Panel("ReferredPatients").Table("ReferredPatientReportTable");  
    
    table.Cell(row_number,0).Link("PatientLink").Click();
  
    Goto_Patient_Treatment();
    WaitSeconds(2,"Awaiting screen");
    
    // On the pending treatment page, Accept Treatment
    var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent")
    var panelPTW = panelPMTC.Panel("PatientTabContent").Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
    var panelPTI = panelPTW.Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");
    panelPTI.Panel(0).Button("AcceptPendingTreatment").Click(); 
    
    Log.Checkpoint("Step Test 4_3_14 Authorise the referral  - TEST_PASS");
    
}
//-------------------------------------------------------------------------------
function Step_4_3_15_Save()  
{
     // select patient
     var INRstarV5 = set_system();
    Goto_Recently_Viewed();
    preset_Fetch_Patient_Recent(INRstarV5);
    WaitSeconds(2,"Awaiting screen");
    // Complete Treatement                                        
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent")
    var panelPTW = panelPMTC.Panel("PatientTabContent").Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
    var panelPTI = panelPTW.Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");
    // Click the Accept button
    Log.Message("Clicking 'Accept' button");
    panelPTI.Panel(0).Button("AcceptPendingTreatment").Click();
    
    Log.Checkpoint("Step Test 4_3_15 Save the treatment  - TEST_PASS");
    Log_Off();
}
//-------------------------------------------------------------------------------
function Step_4_3_16_View_Treatment_Audit()  
{

     // select patient
    log_on_cl3();
    Goto_Recently_Viewed();
    preset_Fetch_Patient_Recent();

    //Checkign the audit
    Goto_Patient_Treatment_Audit();
    display_specific_treatment_audit("Confirmed Warnings",7);
    Goto_Patient_Treatment_Audit();
    display_specific_treatment_audit("Edit Comments",6);
    Goto_Patient_Treatment_Audit();
    display_specific_treatment_audit("More Schedules",5);
    Goto_Patient_Treatment_Audit();
    display_specific_treatment_audit("Select Schedule",4);
    Goto_Patient_Treatment_Audit();
    display_specific_treatment_audit("Treatment Referred",3);
    Goto_Patient_Treatment_Audit();
    display_specific_treatment_audit("Treatment Authorised",2);
    Goto_Patient_Treatment_Audit();
    display_specific_treatment_audit("Accept Treatment",1);
    
    Log.Checkpoint("Step Step_4_3_16_View_Treatment_Audit  - TEST_PASS");
    Log_Off();
}
//-------------------------------------------------------------------------------
function Step_4_3_17_Historical_Treatment_Order()  
{
    
    // Add two historical treatments on same day - check displayed order is correct
   log_on_cl3(); 
   Goto_Add_Patient();
         
   quick_pt_demographics("Regression", "Joe", "M");
         
   WaitSeconds(2,"");
         
   Goto_Patient_TreatmentPlan_Add();
         
   var w_drug = "W";
   var w_dm = "";
   var w_start =  aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7)));  // 1 week ago
          
    var w_day = aqString.SubString(w_start,0,2);
    var w_mth = aqConvert.StrToInt(aqString.SubString(w_start,3,2));
    var w_yr = aqString.SubString(w_start,6,4);
         
   quick_pt_treatmentplan(w_drug, w_dm, w_start);

    var w_inr_1 = "2.2";
    var w_inr_2 = "2.7";
    
   // Add 1st Historical Treatment
   Goto_Add_Historical();
   // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
   quick_pt_historical(w_day, w_mth, w_yr, "2.5",w_inr_1, "2.5", "0", "21", "1st historical treatment");

   // Add 2nd Historical Treatment
   Goto_Add_Historical();
   quick_pt_historical(w_day, w_mth, w_yr, "2.5", w_inr_2, "2.5", "0", "21", "2nd historical treatment");

   WaitSeconds(2,"Waiting for treatment history table");
    
    // Test treatments are in correct order...
   var INRstarV5 = set_system();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
   var panelTPW = panelPMTC.Panel("PatientTabContent").Panel("TreatmentPlanWrapper");
   var panelPTH = panelTPW.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
   var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
   
   var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper")
   var table = panelVPHTW.Table("PatientTreatmentHistoryTable");

   w_row = table.Rowcount - 1;

   // Click last treatment's information link

   if (table.Cell(w_row,1).innerText == w_inr_2)
          Log.Checkpoint("Last treatment is correct");
   else
          Log.Warning("Last treatment is incorrect:" + w_inr_2 + " : " + table.Cell(w_row,1).innerText );

   if (table.Cell(w_row-1,1).innerText == w_inr_1)
          Log.Checkpoint("First treatment is correct");
   else
          Log.Warning("First treatment is incorrect:" + w_inr_1 + " : " + table.Cell(w_row-1,1).innerText );
   
   Log.Message(w_inr_1 + w_inr_2)
   
   Log.Checkpoint("Step_4_3_17_Historical_Treatment_Order  - TEST_PASS");
   
   Log_Off();
          
}
//-------------------------------------------------------------------------------
function Step_4_3_18_Unstable_Patient()  
{
    log_on_cl3(); 
    
    // Add three historical treatments, all with less than 7 day review
    
   Goto_Add_Patient();
         
   quick_pt_demographics("Unstable", "Joe", "M");
         
   WaitSeconds(2,"");
         
   Goto_Patient_TreatmentPlan_Add();
         
   var w_drug = "W";
   var w_dm = "";
   var w_start =  aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-14)));  // 14 days
//    var w_day = aqString.SubString(w_start,0,2);
//    var w_mth = aqConvert.StrToInt(aqString.SubString(w_start,3,2));
//    var w_yr = aqString.SubString(w_start,6,4);
//         
   quick_pt_treatmentplan(w_drug, w_dm, w_start);

   // Set up variable INR  & Review values
   var wa_inr = new Array(3);
   wa_inr[0] = "1.3";
   wa_inr[1] = "1.5";
   wa_inr[2] = "1.7";
   
   var wa_review = new Array(3);
   wa_review[0] = "3";
   wa_review[1] = "2";
   wa_review[2] = "4";
   
   var w_date = w_start;
   for (i=0; i<3; i++)
   {
          // Set historical treatment date
          w_date = aqConvert.StrToDate(aqDateTime.AddDays(w_date, (wa_review[i])));
          var w_day = aqString.SubString(w_date,0,2);
          var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
          var w_yr = aqString.SubString(w_date,6,4);
    
         // Add Historical Treatment
         Goto_Add_Historical();
         // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
         quick_pt_historical(w_day, w_mth, w_yr, "2.5",wa_inr[i], "2.5", "0", wa_review[i], "Historical treatment");
   }
   Goto_Patient_New_INR();

   // Find error message 
    var INRstarV5 = set_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
    var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
    
    if (panelPTNIW.Panel("ValidationErrors").Exists == true)
    {
          if (panelPTNIW.Panel("ValidationErrors").Panel("NewINR").innerText = "To use this algorithm safely patients should be established on warfarin and have an interval between the last 2 INR tests of at least 7 days. This patient does not currently meet this criterion.")
          {
                    Log.Checkpoint("Step_4_3_18_Unstable_Patient  - TEST_PASS")
          }
          else
          {
                    Log.Warning("Incorrect error messge shown");
          }
    }
    
    // Cancel new INR
    panelPTNIW.Form("NewINRForm").Panel(0).Button("CancelNewINR").Click();
    
    Log_Off();
   
}
//-------------------------------------------------------------------------------
function Step_4_3_19_New_Maintenance_Patient()  
{
          Step_4_3_19a_New_Maintenance_Patient();

          //This one prooves the test but others are valid and working for different combinations can be run adhoc
          Step_4_3_19b1_New_Maintenance_Patient();
          
          Step_4_3_19b2_New_Maintenance_Patient();
          Step_4_3_19b3_New_Maintenance_Patient();

 Log.Checkpoint("Step_4_3_19_New_Maintenance_Patient  - TEST_PASS");
}
//-------------------------------------------------------------------------------
function Step_4_3_19a_New_Maintenance_Patient()  
{
    log_on_cl3();
    
    // Add one historical treatment, so due date is within 14 days of treatment plan start
    
   Goto_Add_Patient();
         
   quick_pt_demographics("New_Maintenance", "Sam", "M");
         
   WaitSeconds(2,"");
         
   Goto_Patient_TreatmentPlan_Add();
         
   var w_drug = "W";
   var w_dm = "";
   var w_start =  aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-7)));  // 7 days

   quick_pt_treatmentplan(w_drug, w_dm, w_start);

    // Set historical treatment date
    var w_day = aqString.SubString(w_start,0,2);
    var w_mth = aqConvert.StrToInt(aqString.SubString(w_start,3,2));
    var w_yr = aqString.SubString(w_start,6,4);
    
     // Add Historical Treatment
     Goto_Add_Historical();
     // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
     quick_pt_historical(w_day, w_mth, w_yr, "2.5","2.3", "2.5", "0","7", "Historical treatment");

   Goto_Patient_New_INR();
   add_inr_simple("2.6");
   Log_Off();
   
}
//-------------------------------------------------------------------------------
function Step_4_3_19b1_New_Maintenance_Patient()  
{
    log_on_cl3();
    
    // Add three historical treatments, all with less than 7 day review
    
   Goto_Add_Patient();
         
   quick_pt_demographics("New_Maintenance", "Jane", "F");
         
   WaitSeconds(2,"");
         
   Goto_Patient_TreatmentPlan_Add();
         
   var w_drug = "W";
   var w_dm = "";
   var w_start =  aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-12)));  // 12 days

   quick_pt_treatmentplan(w_drug, w_dm, w_start);

   // Set up variable INR  & Review values
   var wa_inr = new Array(3);
   wa_inr[0] = "1.3";
   wa_inr[1] = "1.5";
   wa_inr[2] = "1.7";
   
   var wa_review = new Array(3);
   wa_review[0] = "3";
   wa_review[1] = "2";
   wa_review[2] = "7";
   
   Step_4_3_19b_sub(wa_inr, wa_review, w_start);
   Log_Off();
}
//-------------------------------------------------------------------------------
function Step_4_3_19b2_New_Maintenance_Patient()  
{
    log_on_cl3();
    
    // Add three historical treatments, all with less than 7 day review
    
   Goto_Add_Patient();
         
   quick_pt_demographics("New_Maintenance", "Mary", "F");
         
   WaitSeconds(2,"");
         
   Goto_Patient_TreatmentPlan_Add();
         
   var w_drug = "W";
   var w_dm = "";
   var w_start =  aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-12)));  // 12 days

   quick_pt_treatmentplan(w_drug, w_dm, w_start);

   // Set up variable INR  & Review values
   var wa_inr = new Array(3);
   wa_inr[0] = "1.3";
   wa_inr[1] = "1.5";
   wa_inr[2] = "1.7";
   
   var wa_review = new Array(3);
   wa_review[0] = "3";
   wa_review[1] = "7";
   wa_review[2] = "2";
   
   Step_4_3_19b_sub(wa_inr, wa_review, w_start);
   Log_Off();
}
//-------------------------------------------------------------------------------
function Step_4_3_19b3_New_Maintenance_Patient()  
{
    log_on_cl3();
    
    // Add three historical treatments, all with less than 7 day review
    
   Goto_Add_Patient();
         
   quick_pt_demographics("New_Maintenance", "Sue", "F");
         
   WaitSeconds(2,"");
         
   Goto_Patient_TreatmentPlan_Add();
         
   var w_drug = "W";
   var w_dm = "";
   var w_start =  aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-12)));  // 12 days

   quick_pt_treatmentplan(w_drug, w_dm, w_start);

   // Set up variable INR  & Review values
   var wa_inr = new Array(3);
   wa_inr[0] = "1.3";
   wa_inr[1] = "1.5";
   wa_inr[2] = "1.7";
   
   var wa_review = new Array(3);
   wa_review[0] = "7";
   wa_review[1] = "2";
   wa_review[2] = "3";
   
   Step_4_3_19b_sub(wa_inr, wa_review, w_start);
   Log_Off();
}
//--------------------------------------------------------------------------------
function Step_4_3_19b_sub(pa_inr, pa_review, p_start)
{
   var w_date = p_start;
   for (i=0; i<3; i++)
   {
          // Set historical treatment date
          var w_day = aqString.SubString(w_date,0,2);
          var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
          var w_yr = aqString.SubString(w_date,6,4);
    
         // Add Historical Treatment
         Goto_Add_Historical();
         // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
         quick_pt_historical(w_day, w_mth, w_yr, "2.5",pa_inr[i], "2.5", "0", pa_review[i], "Historical treatment");
         
         // set the next treatment date
          w_date = aqConvert.StrToDate(aqDateTime.AddDays(w_date, (pa_review[i])));
   }
   Goto_Patient_New_INR();
   add_inr_simple("2.6");
}
//--------------------------------------------------------------------------------
function Step_4_3_22_Add_2nd_Maintenance_On_Same_Day() 
{
    
    // Add one historical treatment today, then try to add a maintenance treatment
   log_on_cl3();
   var INRstarV5 = set_system();
   Goto_Add_Patient();
         
   quick_pt_demographics("New_Maintenance", "Sam", "M");
         
   WaitSeconds(2,"");
         
   Goto_Patient_TreatmentPlan_Add();
         
   var w_drug = "W";
   var w_dm = "";
   var w_start =  aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-20)));  // 20 days

   quick_pt_treatmentplan(w_drug, w_dm, w_start);

    // Set historical treatment date
    var w_day = aqString.SubString(w_start,0,2);
    var w_mth = aqConvert.StrToInt(aqString.SubString(w_start,3,2));
    var w_yr = aqString.SubString(w_start,6,4);
    
     // Add Historical Treatment
    Goto_Add_Historical();
   
    var w_start =  aqConvert.StrToDate(aqDateTime.Today());  
                   
    // Set historical treatment date
    var w_day = aqString.SubString(w_start,0,2);
    var w_mth = aqConvert.StrToInt(aqString.SubString(w_start,3,2));
    var w_yr = aqString.SubString(w_start,6,4);
     
    quick_pt_historical(w_day, w_mth, w_yr, "2.5","2.3", "2.5", "0","7", "Historical treatment");

    Goto_Patient_New_INR();
   
   // Find error message 
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
    var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
    
    if (panelPTNIW.Panel("ValidationErrors").Exists == true)
    {
          if (panelPTNIW.Panel("ValidationErrors").Panel("NewINR").innerText = "This patient already has an INR result recorded on this date. It is not possible to enter more than one INR result on the same day unless the patient is being dosed manually.")
          {
                    Log.Checkpoint("Step_4_3_22_Add_2nd_Maintenance_On_Same_Day  - TEST_PASS")
          }
          else
          {
                    Log.Warning("Incorrect error message shown");
          }
    }
    
    // Cancel new INR
    panelPTNIW.Form("NewINRForm").Panel(0).Button("CancelNewINR").Click();
    Log_Off();
}
//--------------------------------------------------------------------------------
function Step_4_3_23_Add_Early_INR()
{
    log_on_cl3();
    var INRstarV5 = set_system();
    
    //----------------------------------- Fetch last view patient
    Goto_Recently_Viewed();
    preset_Fetch_Patient_Recent();

    // Delete last treatment
    Goto_Patient_Treatment();
    delete_treatment();
    
    var w_date = aqDateTime.AddDays(aqDateTime.Today(), -7);
    var w_day = aqString.SubString(w_date,0,2);
    var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
    var w_yr = aqString.SubString(w_date,6,4);
    
     Goto_Add_Historical();
     quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "14", "Historical Treatment");
     
    // Add a treatment dated yesterday
    Goto_Patient_New_INR();
    var wf_ok = add_inr_backdated_regression("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))));  // 1 days

    // Try to add a treatment dated 3 days ago
   Goto_Patient_New_INR();
   wf_ok = add_inr_backdated_regression("2.5", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));  // 3 days
   if (wf_ok == false)
   
          Log.Checkpoint("Step_4_3_23_Add_Early_INR - TEST PASS");
}
//--------------------------------------------------------------------------------
function Step_4_3_24_Override_20Pcent()
{

    var w_td = get_treatment_date_regression();
    var w_tinr = get_treatment_inr_regression();
    
    var wf_missed = false;
    var wf_meds = false;
    var wf_limit = "n";
    var w_tdose = aqConvert.StrToFloat(get_treatment_dose_regression());
    var w_newdose = aqConvert.FloatToStr(roundNumber((w_tdose*1.25),1));
    var w_treview = get_treatment_review_regression();

    Goto_Patient_New_INR();
    add_inr_complex_override_dose(w_tinr, wf_missed, wf_meds, wf_limit, w_newdose, w_treview);
    Log.Checkpoint("Step_4_3_24_Override_20Pcent  - TEST_PASS");
    Log_Off();
    
}
//--------------------------------------------------------------------------------
function Step_4_3_25_Override_Permissions(INRstarV5)
{
    Log.Checkpoint("Step 4_3_25");
 
    // Need to consider how to trap if the user can ort cannot override.
   //  Need to determine if the adding of the INR was successful, so that it needsto be deleted before the end of the use loop
       
//    // Log off current user (if logged on)
//    if(INRstarV5.Panel("MainPage").Panel("header").Panel("logindisplay").Panel("LoginStatus").Exists == true)
//    {     
//        Log_Off();
//    }
//    
//    //----------------------------------- Logon
//    Log_On_User("lead@s2","INRstar_5");
//    Step_4_3_25_sub();
//    var w_NHS = get_patient_nhs(INRstarV5);
   Log_Off();
    
// Temp code
    var w_NHS = "353 045 1738";
//End of Temp Code
    //---------------------------------------------------------------------------------------           
    var w_locn = "@s2";
    var wa_Users = new Array(4);
    wa_Users[0] = "lead"+w_locn;
    wa_Users[1] = "cl3"+w_locn;
    wa_Users[2] = "cl2"+w_locn;
    wa_Users[3] = "cl1"+w_locn;
    
    var w_inr="2.3";
    var w_meds=false;
    var w_review = "21";

    for (u = 0; u <wa_Users.length; u++)
    {
              // Log on as User
              Log_On_User(wa_Users[u],"INRstar_5");
                    
              Goto_Patient_Search();
              preset_Fetch_Patient_NHS(INRstarV5, w_NHS);
                     
              // Add INR & try to Override 
              Goto_Patient_New_INR();
              var w_inr = "2.7";
              var w_meds = false;
              var w_review = "21";
              add_inr_complex_override(w_inr, w_meds, w_review)
                              
                   
              // Log off
              Log_Off();
     }
}
function Step_4_3_25_sub()
{
          //----------------------------------- Add Patient
          Goto_Add_Patient();
          quick_pt_demographics("R4.3.25", "Fred", "M");
                    
           //----------------------------------- Add Treatment Plan
         Goto_Patient_TreatmentPlan_Add();
         
         var w_review = "21";
          var w_drug = "W";
          var w_dm = "";
          var w_start = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_review * -1))); 
                   
          quick_pt_treatmentplan(w_drug, w_dm, w_start);

          WaitSeconds(2,"Waiting for end of Treatment Plan");
          
           //----------------------------------- Add Historical Treatment
          Goto_Add_Historical();
         
          var w_day = aqString.SubString(w_start,0,2);
          var w_mth = aqConvert.StrToInt(aqString.SubString(w_start,3,2));
          var w_yr = aqString.SubString(w_start,6,4);
           // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
          quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", w_review, "Quick Patient treatment");

}

//--------------------------------------------------------------------------------

function Step_4_3_27_Transfer_a_patient_who_has_a_pending_treatment()

{
    log_on_cl3();
    var INRstarV5 = set_system();
    quick_patient_regression();
    Goto_Patient_TreatmentPlan_Add();
        
         var w_drug = "W";
         var w_dm = "Manual";
         var w_master_date = aqDateTime.Today();
         var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
         quick_pt_treatmentplan(w_drug, w_dm, w_start_date);
         
    WaitSeconds(2);
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
    var button = panelPPT.Panel("TreatmentButtonsContainer").Fieldset("TreatmentButtons").Button("NewINR");
    
    button.Click();
    
    var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
    var form = panelPTNIW.Form("NewINRForm");
    var panelPTMIQW = form.Panel("PatientTreatmentNewINRQuestionsWrapper");
    var panelPTNIC = panelPTMIQW.Panel("PatientTreatmentNewINRConfirm");  
    var panelTD = panelPTMIQW.Panel("PatientTreatmentNewINRTestDetails").Panel("testDetails")
    
          panelTD.Panel("poctDetails").Panel(1).Select("INR").ClickItem("2.5");
          panelTD.Panel(2).Select("Review").ClickItem("14 Days");
          panelTD.Panel(0).Select("Dose").ClickItem("2.5");
    
    var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
    var form = panelPTNIW.Form("NewINRForm").Panel(0).SubmitButton("SubmitManualDose");
    
    form.Click();
    process_confirm_INR(INRstarV5);
    
    Goto_Patient_Management();
  
    var panelPR = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord")
    var panelPMTC = panelPR.Panel("PatientMainTabContent");
    var Button = panelPMTC.Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper").Panel("PatientPreferences").Panel(0);

    Button.Button("EditPatientTestingSectionLink").Click();  
    
    //Check the transfer warning exists for induction and then confirm
  
    var w_popup = INRstarV5.NativeWebObject.Find("innerText", "Patient Transfer Error");
       if (w_popup.Exists == false)
                           {
                              Log.Warning("Error box not displayed");
                           }
                            else
                              Log.Checkpoint("Step_4_3_27_Transfer_a_patient_who_has_a_pending_treatment  - TEST_PASS");
                            
     INRstarV5.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click(); 
     
     Goto_Patient_Treatment();
     
     //Cancel pending treatment
     panelPPT.Panel("PendingTreatmentInfo").Panel(0).Button("CancelPendingTreatment").Click();
     process_confirm_sub(INRstarV5, "Confirmation Required");
     Log.Checkpoint("Step_4_3_28_Cancel_pending_treatment  - TEST_PASS");
     
}

//--------------------------------------------------------------------------------

function Step_4_3_30_Out_of_Range_INR_save_privilege()

{
    var INRstarV5 = set_system(); 
    var name = patSurname
    Log_Off();
    log_on_cl2();
    
   Preset_Find_Patient_Regression_name(patSurname);
    
   var INRstarV5 = set_system(); 
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPR = panelMCP.Panel("PatientRecord");
   var panelPTC = panelPR.Panel("PatientMainTabContent").Panel("PatientTabContent");
   var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
   var Button = panelPTW.Panel("PatientPendingTreatment").Panel("TreatmentButtonsContainer").Fieldset("TreatmentButtons").Button("NewINR");
    
  if (Button.className == "Button disabled")
  {
   Log.Checkpoint("Test 5.2.2 Manual_Dose_Privilege - TESTS_PASS");
  }
    else 
      {
      Log.Warning("NEW INR Button should have been disabled");      
      }
}



