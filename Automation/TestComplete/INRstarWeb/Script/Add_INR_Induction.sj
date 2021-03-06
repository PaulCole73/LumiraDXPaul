//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Popups
//USEUNIT Navigation

function quick_start()
{
         Goto_Patient_New_INR();
         add_inr_induction(1.2);
}

function add_inr_induction(p_INR)
{
       WaitSeconds(1,"");
       
       var INRstarV5 = set_system();
       var panelMPC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMPC.panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
       var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").panel("PatientTreatmentWrapper")
       var panelPPTIW = panelPTW.Panel("PatientPendingTreatment").Panel("PatientPreTreatmentINRWrapper");
       var form = panelPPTIW.Form("PreTreatmentINRForm");
       var panelPPTIQW = form.Panel("PatientPreTreatmentINRQuestionsWrapper");
       var panelPPTITD = panelPPTIQW.Panel("PatientPreTreatmentINRTestDetails");

       var wf_complete = true;
    
        // Check the Patient Identity box
        panelPPTIQW.Panel("PatientPreTreatmentINRConfirm").Panel(0).Checkbox("ConfirmPatient").ClickChecked(true);
      
       // Set the Test date to today 
       var w_today = aqDateTime.Today();
       var w_day = aqString.SubString(w_today,0,2);
       var w_mth = aqConvert.StrToInt(aqString.SubString(w_today,3,2));
       var w_yr = aqString.SubString(w_today,6,4);

      panelPPTITD.Panel(0).Image("calendar_png").Click();
     w_datepicker = INRstarV5.Panel("ui_datepicker_div");
     w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
     w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
     select_day(w_day, w_datepicker);
 
        
       // Select the passed-in INR value
       var ws_INR = FloatToString(p_INR);
       Log.Message("INR is " + ws_INR);
       panelPPTITD.Panel(1).Select("INR").ClickItem(ws_INR);
   
       // Click the Go button
       form.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
       
       // Click the Confirm button in the confirm window
       process_confirm_INR_Induction(INRstarV5);

         {
           // --------------------- New page -------------------------------------
           // This is where pop-ups can occur
     //      process_Please_acknowledge(INRstarV5);
           // End of pop-ups

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
              
               // Now test if a single Schedule has been proposed or we need to choose one
               wf_no_exact = INRstarV5.NativeWebObject.Find("idStr", "DoseScheduleWarnings_ValidationSummary");
               if(wf_no_exact.Exists)
               {
                   // Click the top Use button
                   Log.Message("Clicking 1st 'Use' button");
                   panelPTC.Panel("PendingTreatmentContent").Panel("DosingScheduleContent").Panel("ScheduleGrid").Table("ScheduleSelectorTable").Cell(1, 2).Button("Use").Click();
                   WaitSeconds(1,"");
               }
               else
                   Log.Message("Exact Schedule found");
               

               // Click the Accept button                 panelPPT.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();

               Log.Message("Clicking 'Accept' button");
               var panelPTI = panelPTW.Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");
               panelPTI.Panel(0).Button("AcceptPendingTreatment").Click();

           }
       }
     return wf_complete;
}

