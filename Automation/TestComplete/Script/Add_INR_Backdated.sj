//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Popups
//USEUNIT Navigation
//USEUNIT TSA_Treatment
//USEUNIT System_Paths

function quick_start()
{
         Goto_Patient_New_INR();
         add_inr_backdated("2.5", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));  // 3 days
}
//--------------------------------------------------------------------------------
function add_inr_backdated(p_INR, p_date)
{

      Goto_Patient_New_INR();
      var INRstarV5 = INRstar_base();
      var treatment_inr_test_info = treatment_inr_test_info_path();        

      var wf_complete = true;
 
       // Set the Treatment Date
      var w_day = aqString.SubString(p_date,0,2);
      var w_mth = aqConvert.StrToInt(aqString.SubString(p_date,3,2));
      var w_yr = aqString.SubString(p_date,6,4);
      
      treatment_inr_test_info.Panel("poctDetails").Panel(0).Image("calendar_png").Click();
      
      w_datepicker = INRstarV5.Panel("ui_datepicker_div");
      w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
      w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
      select_day(w_day, w_datepicker);

       // Select the passed-in INR value
       var ws_INR = FloatToString(p_INR);
      
       treatment_inr_test_info.Panel("poctDetails").Panel(1).Select("INR").ClickItem(ws_INR);
   
       var test_method = treatment_inr_test_info.Panel("poctDetails").Panel(2).Select("TestingMethod").wText
       
       // PoCT special handling due to all the things this can be set to and a bug
       var new_inr_test_details_path = new_inr_test_details();
       handle_PoCT(new_inr_test_details_path);

       var save_button_pre_schedule = treatment_buttons_pre_schedule();
       save_button_pre_schedule.SubmitButton("CalculateWarfarinDose").Click();
       
       handle_poct_expired();
       
//       // Test if date is valid - no other treatments exist after this date
//      wf_validation_messages = INRstarV5.NativeWebObject.Find("innerText", "You cannot add a treatment with a date that is older than the patient's latest treatment date.");
//      if(wf_validation_messages.Exists == true)
//      {
//              wf_complete = false;
//              form.Panel(0).Button("CancelNewINR").Click();
//      }
//      else
//      {
              // Click the Confirm button in the confirm window
               process_confirm_INR(INRstarV5);
//       
//               process_Please_acknowledge_warnings(INRstarV5);
//       
//               // Test if INR is out of range
//               var wf_oor = INRstarV5.NativeWebObject.Find("innerText", "This INR is out of range for this induction algorithm. You will need to dose this patient manually.");
//               if (wf_oor.Exists)
//               {  
//                       wf_complete = false;
//                       Log.Message("Clicking Cancel button");
//               
//                       // Record the values produced
//                       var w_dose = p3.Panel(0).Select("INR").wText;
//                       Log.Warning("Dose of of range "+ p_INR+ ", Dose: " + w_dose);
//               
//                       // Click the cancel button
//                       form.Panel(0).Button("CancelNewINR").Click();
//               }
//               else
//               {
//       
//                   // Test if a schedule exists           
//                   var wf_no_sched = INRstarV5.NativeWebObject.Find("innerText", "There is no schedule available");
//                   if (wf_no_sched.Exists)
//                   {  
//                       wf_complete = false;
//                       Log.Message("Clicking Cancel button");
//               
//                       // Record the values produced
//                       var w_dose = panelPTC.panel("PendingTreatmentContent").Table("PendingTreatmentTable").Cell(0, 2).innerText;
//                       Log.Warning("No Schedule for "+ p_INR+ ", Dose: " + w_dose);
//               
//                       var panelABC = panelPTC.Panel("PendingTreatmentContent").Panel(0);
//                       // Click the cancel button
//                       panelABC.Button("CancelPendingTreatment").Click();
//                   }
//                   else
//                   {
//                             var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
//   
//                             // Now test if a single Schedule has been proposed or we need to choose one
//                             wf_no_exact = INRstarV5.NativeWebObject.Find("innerText", "INRstar cannot provide a dosing schedule for this dose using the selected tablet strengths, please choose an alternative schedule.");
//                             if(wf_no_exact.Exists && wf_no_exact.VisibleOnScreen) 
//                             {
//                                 // Click the top Use button
//                                 Log.Message("Clicking 1st 'Use' button");
//                                 var panelSG = panelPPT.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Panel("MoreScheduleGrid");
//                                 var tableSST = panelSG.Table("ScheduleSelectorTable");
//                                 tableSST.Cell(1, 2).Button("Use").Click();
//               
//                                 // Check if a dose change has occured
//                                 process_Dose_change(INRstarV5);
//                             }
//                             else
//                                 Log.Message("Exact Schedule found");
//               
//
//                             // Click the Accept button
                             var pending_treatment_buttons_path = pending_treatment_buttons();
                             pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
               
//                        }
//              }
//       }
//       WaitSeconds(1,"");
       
       return wf_complete;
}
////       WaitSeconds(0.5,"Start of Add INR Simple");
//       
//       Log.Message("----- Adding simple INR treatment: " + p_INR);
//       
//       var INRstarV5 = set_system();
//       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//       var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
//       var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
//       var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
//       var form = panelPTNIW.Form("NewINRForm");
//       var panelPTQ  = form.Panel("PatientTreatmentNewINRQuestionsWrapper");
//       var p1 = panelPTQ.Panel("PatientTreatmentNewINRConfirm");
//       var p2 = panelPTQ.Panel("PatientTreatmentNewINRQuestions");
//       var p3 = panelPTQ.Panel("PatientTreatmentNewINRTestDetails")
//       
//       var wf_complete = true;
//    
//        // Check the Patient Identity box
//        p1.Panel(0).Checkbox("ConfirmPatient").ClickChecked(true);
//      
//        // Check the Dose 'Yes' box
//       p1.Panel("LastTreatment").Checkbox("PatientChangedLastTreatment").ClickChecked(true);
//       // Ignore the Dose ' No' box
//       // .Panel(3).Checkbox("LastRecordedTreatmentIsNotCurrent")
//       
//        // Check the Missed Doses 'No' box
//       p2.Panel(2).Checkbox("MissedDosesNoCheckedValue").ClickChecked(true);
//       // Ignore the Missed Doses ' Yes' box
//       // .Panel(1).Checkbox("MissedDosesYesCheckedValue")
//       
//       // Check the New Medication 'No' box
//       p2.Panel(5).Checkbox("OtherMedicationNoCheckedValue").ClickChecked(true);
//       
//       // Ignore the New Medication 'Yes' box
//       // .Panel(4).Checkbox("OtherMedicationYesCheckedValue")
// 
//       // Set the Treatment Date
//      var w_day = aqString.SubString(p_date,0,2);
//      var w_mth = aqConvert.StrToInt(aqString.SubString(p_date,3,2));
//      var w_yr = aqString.SubString(p_date,6,4);
//      
//      p3.Panel("testDetails").Panel("poctDetails").Panel(0).Image("calendar_png").Click();
//      w_datepicker = INRstarV5.Panel("ui_datepicker_div");
//      w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
//      w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
//      select_day(w_day, w_datepicker);
//
//       // Select the passed-in INR value
//       var ws_INR = FloatToString(p_INR);
//       Log.Message("INR is " + ws_INR);
//       p3.Panel("testDetails").Panel("poctDetails").Panel(1).Select("INR").ClickItem(ws_INR);
//   
//       // Click the Go button
//       form.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
//       
//       // Test if date is valid - no other treatments exist after this date
//      wf_validation_messages = INRstarV5.NativeWebObject.Find("innerText", "You cannot add a treatment with a date that is older than the patient's latest treatment date.");
//      if(wf_validation_messages.Exists == true)
//      {
//              wf_complete = false;
//              form.Panel(0).Button("CancelNewINR").Click();
//      }
//      else
//      {
//               // Click the Confirm button in the confirm window
//               process_confirm_INR(INRstarV5);
//       
//               process_Please_acknowledge_warnings(INRstarV5);
//       
//               // Test if INR is out of range
//               var wf_oor = INRstarV5.NativeWebObject.Find("innerText", "This INR is out of range for this induction algorithm. You will need to dose this patient manually.");
//               if (wf_oor.Exists)
//               {  
//                       wf_complete = false;
//                       Log.Message("Clicking Cancel button");
//               
//                       // Record the values produced
//                       var w_dose = p3.Panel(0).Select("INR").wText;
//                       Log.Warning("Dose of of range "+ p_INR+ ", Dose: " + w_dose);
//               
//                       // Click the cancel button
//                       form.Panel(0).Button("CancelNewINR").Click();
//               }
//               else
//               {
//       
//                   // Test if a schedule exists           
//                   var wf_no_sched = INRstarV5.NativeWebObject.Find("innerText", "There is no schedule available");
//                   if (wf_no_sched.Exists)
//                   {  
//                       wf_complete = false;
//                       Log.Message("Clicking Cancel button");
//               
//                       // Record the values produced
//                       var w_dose = panelPTC.panel("PendingTreatmentContent").Table("PendingTreatmentTable").Cell(0, 2).innerText;
//                       Log.Warning("No Schedule for "+ p_INR+ ", Dose: " + w_dose);
//               
//                       var panelABC = panelPTC.Panel("PendingTreatmentContent").Panel(0);
//                       // Click the cancel button
//                       panelABC.Button("CancelPendingTreatment").Click();
//                   }
//                   else
//                   {
//                             var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
//   
//                             // Now test if a single Schedule has been proposed or we need to choose one
//                             wf_no_exact = INRstarV5.NativeWebObject.Find("innerText", "INRstar cannot provide a dosing schedule for this dose using the selected tablet strengths, please choose an alternative schedule.");
//                             if(wf_no_exact.Exists && wf_no_exact.VisibleOnScreen) 
//                             {
//                                 // Click the top Use button
//                                 Log.Message("Clicking 1st 'Use' button");
//                                 var panelSG = panelPPT.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Panel("MoreScheduleGrid");
//                                 var tableSST = panelSG.Table("ScheduleSelectorTable");
//                                 tableSST.Cell(1, 2).Button("Use").Click();
//               
//                                 // Check if a dose change has occured
//                                 process_Dose_change(INRstarV5);
//                             }
//                             else
//                                 Log.Message("Exact Schedule found");
//               
//
//                             // Click the Accept button
//                             Log.Message("Clicking 'Accept' button");
//                             panelPPT.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
//               
//                        }
//              }
//       }
////       WaitSeconds(1,"");
//       
//       return wf_complete;
//}

//--------------------------------------------------------------------------------
function add_inr_backdated_regression(p_INR, p_date)
{
       
       var INRstarV5 = INRstar_base();
       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
       var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
       var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
       var form = panelPTNIW.Form("NewINRForm");
       var panelPTQ  = form.Panel("PatientTreatmentNewINRQuestionsWrapper");
       var p1 = panelPTQ.Panel("PatientTreatmentNewINRConfirm");
       var p3 = panelPTQ.Panel("PatientTreatmentNewINRTestDetails")
       
       var wf_complete = true;
 
       // Set the Treatment Date
      var w_day = aqString.SubString(p_date,0,2);
      var w_mth = aqConvert.StrToInt(aqString.SubString(p_date,3,2));
      var w_yr = aqString.SubString(p_date,6,4);
      
      p3.Panel("testDetails").Panel("poctDetails").Panel(0).Image("calendar_png").Click();
      
      w_datepicker = INRstarV5.Panel("ui_datepicker_div");
      w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
      w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
      select_day(w_day, w_datepicker);

       // Select the passed-in INR value
       var ws_INR = FloatToString(p_INR);
      
       p3.Panel("testDetails").Panel("poctDetails").Panel(1).Select("INR").ClickItem(ws_INR);
   
       // Click the Go button
       form.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
       
       // Test if date is valid - no other treatments exist after this date
      wf_validation_messages = INRstarV5.NativeWebObject.Find("innerText", "You cannot add a treatment with a date that is older than the patient's latest treatment date.");
      if(wf_validation_messages.Exists == true)
      {
              wf_complete = false;
              form.Panel(0).Button("CancelNewINR").Click();
      }
      else
      {
               // Click the Confirm button in the confirm window
               process_confirm_INR(INRstarV5);
       
               process_Please_acknowledge_warnings(INRstarV5);
       
               // Test if INR is out of range
               var wf_oor = INRstarV5.NativeWebObject.Find("innerText", "This INR is out of range for this induction algorithm. You will need to dose this patient manually.");
               if (wf_oor.Exists)
               {  
                       wf_complete = false;
                       Log.Message("Clicking Cancel button");
               
                       // Record the values produced
                       var w_dose = p3.Panel(0).Select("INR").wText;
                       Log.Warning("Dose of of range "+ p_INR+ ", Dose: " + w_dose);
               
                       // Click the cancel button
                       form.Panel(0).Button("CancelNewINR").Click();
               }
               else
               {
       
                   // Test if a schedule exists           
                   var wf_no_sched = INRstarV5.NativeWebObject.Find("innerText", "There is no schedule available");
                   if (wf_no_sched.Exists)
                   {  
                       wf_complete = false;
                       Log.Message("Clicking Cancel button");
               
                       // Record the values produced
                       var w_dose = panelPTC.panel("PendingTreatmentContent").Table("PendingTreatmentTable").Cell(0, 2).innerText;
                       Log.Warning("No Schedule for "+ p_INR+ ", Dose: " + w_dose);
               
                       var panelABC = panelPTC.Panel("PendingTreatmentContent").Panel(0);
                       // Click the cancel button
                       panelABC.Button("CancelPendingTreatment").Click();
                   }
                   else
                   {
                             var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
   
                             // Now test if a single Schedule has been proposed or we need to choose one
                             wf_no_exact = INRstarV5.NativeWebObject.Find("innerText", "INRstar cannot provide a dosing schedule for this dose using the selected tablet strengths, please choose an alternative schedule.");
                             if(wf_no_exact.Exists && wf_no_exact.VisibleOnScreen) 
                             {
                                 // Click the top Use button
                                 Log.Message("Clicking 1st 'Use' button");
                                 var panelSG = panelPPT.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Panel("MoreScheduleGrid");
                                 var tableSST = panelSG.Table("ScheduleSelectorTable");
                                 tableSST.Cell(1, 2).Button("Use").Click();
               
                                 // Check if a dose change has occured
                                 process_Dose_change(INRstarV5);
                             }
                             else
                                 Log.Message("Exact Schedule found");
               

                             // Click the Accept button
                             Log.Message("Clicking 'Accept' button");
                             panelPPT.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
               
                        }
              }
       }
//       WaitSeconds(1,"");
       
       return wf_complete;
}

//--------------------------------------------------------------------------------
function add_treatment(p_INR, p_date)
{     
       var INRstarV5 = INRstar_base();
       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
       var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
       var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
       var form = panelPTNIW.Form("NewINRForm");
       var panelPTQ  = form.Panel("PatientTreatmentNewINRQuestionsWrapper");
       var p1 = panelPTQ.Panel("PatientTreatmentNewINRConfirm");
       var p3 = panelPTQ.Panel("PatientTreatmentNewINRTestDetails")
 
       Log.Message(p_date + "This is the calculated back date");
        
       // Set the Treatment Date
      var w_day = aqString.SubString(p_date,0,2);
      var w_mth = aqConvert.StrToInt(aqString.SubString(p_date,3,2));
      var w_yr = aqString.SubString(p_date,6,4);
      
      p3.Panel("testDetails").Panel("poctDetails").Panel(0).Image("calendar_png").Click();
      
      w_datepicker = INRstarV5.Panel("ui_datepicker_div");
      w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
      w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
      select_day(w_day, w_datepicker);

       // Select the passed-in INR value
       var ws_INR = FloatToString(p_INR);      
       p3.Panel("testDetails").Panel("poctDetails").Panel(1).Select("INR").ClickItem(ws_INR);
    
       // PoCT special handling due to all the things this can be set to and a bug
       handle_PoCT();  
   
       // Click the Go button
       form.Panel(0).SubmitButton("CalculateWarfarinDose").Click()
     
       // Click the Confirm button in the confirm window
       process_confirm_INR(INRstarV5);
       process_Please_acknowledge_warnings(INRstarV5); //out of range pop up
}