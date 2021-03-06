//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Popups
//USEUNIT Navigation
//USEUNIT Quick_Patient
//USEUNIT Regression_Message_Checker

function pre_treatment_invalid() 
{
         add_patient_data();
         
         oates_patient_induction_pre_treatment(1.4); 
         
//         oates_patient_induction_pre_treatment(1.4, "The pre-induction INR must be between '0.8' and '1.3'.", true); 
//         oates_patient_induction_pre_treatment(1.3, "", true); 
//         oates_patient_induction_pre_treatment(1.3, "The pre-induction INR must be between '0.8' and '1.3'.", false); 
//         oates_patient_induction_pre_treatment(1.4, "",false); 
               
}
//-------------------------------------------------------------------------------

function add_patient_data() {

             Goto_Add_Patient();
             quick_pt_demographics("Oates_Induction","Dean", "M");
             WaitSeconds(2,"");
         
               Goto_Patient_TreatmentPlan_Add();
               var w_days_to_go_back = 0;
               var w_master_date = aqDateTime.Today();
               var w_start_days_to_go_back = 14 + w_days_to_go_back;
               var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, w_start_days_to_go_back * -1));
             
             quick_pt_treatmentplan("W","Oates", w_start_date);
}

function oates_patient_induction_pre_treatment(p_INR,p_mess_expected,p_state)

{
       WaitSeconds(1,"");
       
       var INRstarV5 = set_system();
       var panelMPC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var panelPTC = panelMPC.panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
       var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").panel("PatientTreatmentWrapper");
       var panelPPT = panelPTW.Panel("PatientPendingTreatment")
       
       panelPPT.Panel("TreatmentButtonsContainer").Fieldset("TreatmentButtons").Button("NewINR").Click();
       
       var form = panelPPT.Panel("PatientPreTreatmentINRWrapper").Form("PreTreatmentINRForm");
       var panelPPTIQW = form.Panel("PatientPreTreatmentINRQuestionsWrapper");
       var panelPPTITD = panelPPTIQW.Panel("PatientPreTreatmentINRConfirm").Panel("PatientPreTreatmentINRTestDetails");
      
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
       panelPPTITD.Panel(1).Select("INR").ClickItem(ws_INR);
   
       // Click the Suggest button
       panelPPTIQW.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
       
       // Click the Confirm button in the confirm window
       process_confirm_INR_Induction(INRstarV5);
       
       //Get the error message for error checking
       var mess_1 = panelPPT.Panel("PatientPreTreatmentINRWrapper").Panel("ValidationErrors").Panel("PreTreatmentINR").innerText;
       Log.Message(mess_1)
       
          if (mess_1==""){
             Log.Warning("Error message not present when it should be")
             }  
               else {                  
                      generic_message_checker(mess_1);
                      //generic_message_checker(mess_1,p_mess_expected, p_state);
             }           
}




