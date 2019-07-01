//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Popups
//USEUNIT Navigation

function quick_start()
{
//         quick_pt_historical("8", "Oct", "2010", "2.5", "2.3", "2.5", "21 Days", "Quick Patient treatment");
           Goto_Patient_New_INR();
           // Date, INR, Testing Method, Dose, Omits, Review
           add_inr_manual("16","Oct", "2012", "2.3", "PoCT", "4.5", "0 Days", "21 Days");
}

function add_inr_manual(p_outfile, p_day, p_month, p_year, p_inr, p_testing, p_dose, p_omits, p_review, p_dy1, p_dy2, p_dy3, p_dy4, p_dy5, p_dy6, p_dy7)
{
  try
  {
//       var w_outfile = "\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Results\\s_30.csv";


       var INRstarV5 = set_system();
       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
       var panelPPT = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
       var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper");
       var form = panelPTNIW.Form("NewINRForm");
       var panelPTQ  = form.Panel("PatientTreatmentNewINRQuestionsWrapper");
       var p1 = panelPTQ.Panel("PatientTreatmentNewINRConfirm");
       var p2 = panelPTQ.Panel("PatientTreatmentNewINRQuestions");
       var p3 = panelPTQ.Panel("PatientTreatmentNewINRTestDetails")
       
       var wf_complete = true;
    
        // Check the Patient Identity box
        p1.Panel(0).Checkbox("ConfirmPatient").ClickChecked(true);
      
        // Check the Dose 'Yes' box
       p1.Panel(2).Checkbox("ConfirmLastRecordedTreatment").ClickChecked(true);
       // Ignore the Dose ' No' box
       // .Panel(3).Checkbox("LastRecordedTreatmentIsNotCurrent")
       
       // -- Step 2 fields
 
        // Check the Missed Doses 'No' box
       p2.Panel(2).Checkbox("MissedDosesNoCheckedValue").ClickChecked(true);
       // Ignore the Missed Doses ' Yes' box
       // .Panel(1).Checkbox("MissedDosesYesCheckedValue")
       
       // Check the New Medication 'No' box
       p2.Panel(5).Checkbox("OtherMedicationNoCheckedValue").ClickChecked(true);
       
       // Ignore the New Medication 'Yes' box
       // .Panel(4).Checkbox("OtherMedicationYesCheckedValue")
       
       // -- Step 3 fields
 
//       // Set the Manual Date
//           p3.Panel("testDetails").Panel("poctDetails").Panel(0).Image("calendar_png").Click();
//           
//           w_datepicker = INRstarV5.Panel("ui_datepicker_div");
//           w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(p_year));
//           w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(p_month));
//           select_day(p_day, w_datepicker);

       // Select the passed-in INR value
       var ws_INR = FloatToString(p_inr);
       Log.Message("INR is " + ws_INR);
       p3.Panel("testDetails").Panel("poctDetails").Panel(1).Select("INR").ClickItem(ws_INR);

       // Testing Method
       p3.Panel("testDetails").Panel("poctDetails").Panel(2).Select("TestingMethod").ClickItem(p_testing);
       
       // Dose
       p3.Panel("testDetails").Panel(0).Select("Dose").ClickItem(FloatToString(p_dose));
       
       // Omits
       p3.Panel("testDetails").Panel(1).Select("Omits").ClickItem(p_omits);
       
       // Review
       p3.Panel("testDetails").Panel(2).Select("Review").ClickItem(p_review);
 
       // Click the Go button
       form.Panel(0).SubmitButton("SubmitManualDose").Click();
       
       // Click the Confirm button in the confirm window
       process_confirm_INR(INRstarV5);
       
       // Test for Dosing Engine errors
       wf_errors = INRstarV5.NativeWebObject.Find("idStr", "ValidationErrors");
//       if (wf_errors.VisibleOnScreen)
//       {
//          Log.Warning("Dosing Engine Errors");
//          form.Fieldset("NewINR").Panel(0).Button("CancelNewINR").Click();
//          wf_complete = false;
//       }
//       else
         {
           // --------------------- New page -------------------------------------
           // This is where pop-ups can occur
           process_Please_acknowledge(INRstarV5);
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
           // Scedule exists. Click Save & carry on
           {
              
//               var panel2 = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Panel("PendingTreatmentContent");
   
               // Now test if a single Schedule has been proposed or we need to choose one
               wf_no_exact = INRstarV5.NativeWebObject.Find("innerText", "INRstar cannot provide a dosing schedule for this dose using the selected tablet strengths, please choose an alternative schedule.");
               if(wf_no_exact.Exists)
               {

                  /* Stu's code

                   // Click the top Use button
                   Log.Message("Clicking 1st 'Use' button");
//                   panelPTC.Panel("PendingTreatmentContent").Panel("DosingScheduleContent").Panel("ScheduleGrid").Table("ScheduleSelectorTable").Cell(1, 2).Button("Use").Click();
                   panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Panel("ScheduleGrid").Table("ScheduleSelectorTable").Cell(1, 2).Button("Use").Click();
                   WaitSeconds(1,"");
                   
                   */
                   
/* start of PT change to implement additionl try-catch */

                    // try "MoreScheduleGrid"
                    
                   try
                   {
                       // Click the top Use button
                       Log.Message("Clicking 1st 'Use' button");
                       panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Panel("MoreScheduleGrid").Table("ScheduleSelectorTable").Cell(1, 2).Button("Use").Click();
                       WaitSeconds(1,"");
                    }
                    catch(exception)
                    {
                        Log.Error("ffffffffffffffffffffffffffff", exception.description);
                    }


                    // alternatively try "ScheduleGrid"
                    
//                   try
//                   {
//                       // Click the top Use button
//                       Log.Message("Clicking 1st 'Use' button");
//                       panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Panel("ScheduleGrid").Table("ScheduleSelectorTable").Cell(1, 2).Button("Use").Click();
//                       WaitSeconds(1,"");
//                    }
//                    catch(exception)
//                    {
//                        Log.Error("gggggggggggggggggggggggg", exception.description);
//                    }
//                    


/* end of PT change to implement additional try-catch */                   

               }
               else
               {
                   Log.Message("Exact Schedule found");
               }
               
               // Test Schedule Lines
               var panelDSC = panelPPT.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent");
               var fsSC = panelDSC.Fieldset(0).Fieldset("ScheduleGrid");
                   
//                   var wa_day = new Array(7);
//                  wa_day[0] = p_dy1; wa_day[1] = p_dy2; wa_day[2] = p_dy3; wa_day[3] = p_dy4;  wa_day[4] = p_dy5; wa_day[5] = p_dy6; wa_day[6] = p_dy7;
//                   
//                   for (w_tn=7;w_tn<13; w_tn++);
//                   {
//                      write_result(w_outfile, fsSC, w_tn, wa_day); 
//                   }
               write_result_2(p_outfile,1, fsSC.TextNode(7).outerText, p_dy1);   
               write_result_2(p_outfile,2, fsSC.TextNode(8).outerText, p_dy2);   
               write_result_2(p_outfile,3, fsSC.TextNode(9).outerText, p_dy3);   
               write_result_2(p_outfile,4, fsSC.TextNode(10).outerText, p_dy4);   
               write_result_2(p_outfile,5, fsSC.TextNode(11).outerText, p_dy5);   
               write_result_2(p_outfile,6, fsSC.TextNode(12).outerText, p_dy6);   
               write_result_2(p_outfile,7, fsSC.TextNode(13).outerText, p_dy7);   
               

               // Click the Accept button
               Log.Message("Clicking 'Accept' button");
//               panelPTC.Panel("PendingTreatmentContent").Panel(0).Button("AcceptPendingTreatment").Click();
               panelPPT.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
              }
       }
  }
  catch(exception)
  {
    Log.Error("Stu's Exception", exception.description);
  }
}
function write_result(p_outfile, p_field, p_tn, pa_day)
{
  var wa_ctr = p_tn-7;
  var w_result = "";
     if(p_field.TextNode(p_tn).outerText == pa_day[wa_ctr])
        w_result = "Line " + wa_ctr + " OK, " + p_field.TextNode(p_tn).outerText;
     else
        w_result = "Line " + wa_ctr + " Wrong, " + p_field.TextNode(p_tn).outerText + " , " + pa_day[wa_ctr];

     Log.Message(w_result);

   // Write the record to the file
   aqFile.WriteToTextFile(p_outfile, w_result + "\r\n", aqFile.ctANSI);

}
function write_result_2(p_outfile, p_ctr, p_field, p_day)
{
  var w_result = "";
     if(p_field == p_day)
        w_result = "Line " + p_ctr + " OK, " + p_field;
     else
        w_result = "Line " + p_ctr + " Wrong, " + p_field + " , " + p_day;

     Log.Message(w_result);

   // Write the record to the file
   aqFile.WriteToTextFile(p_outfile, w_result + "\r\n", aqFile.ctANSI);

}