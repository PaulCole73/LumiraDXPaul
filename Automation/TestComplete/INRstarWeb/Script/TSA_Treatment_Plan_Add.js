//USEUNIT System_Paths
//USEUNIT V5_Common
//USEUNIT Navigate_Patient

//--------------------------------------------------------------------------------
//Parameters to pass in - (StartDate,Diagnosis,Drug,TreatmentDuration,DosingMethod,TestingMethod,UsePrev,TestStepMode)
function tsa_treatment_plan_add(StartDate,Diagnosis,Drug,TreatmentDuration,DosingMethod,TestingMethod,UsePrev,TestStepMode)  

{
 var Mode = TestStepMode
 if(Mode == "Shared")
 
 {
   //If you have previous treatments/treatment plan
    if(UsePrev=="Y" || UsePrev=="N")
     {
     Goto_Patient_TreatmentPlan_Add_more_1_treatmentPlan();
     }
     
      if (UsePrev=="")
      {
       Goto_Patient_TreatmentPlan_Add();
      } 
      
     var INRstarV5 = set_system();
      
     WaitSeconds(2,"About to go to Treatment Plan Tab");
     var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent");
     var add_treatment_plan_form = panelMCP.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("AddTreatmentPlanForm"); 
     var treatment_plan_fields = add_treatment_plan_form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation");     
          
     //Add Treatment plan details
        
     //Plan start date  
     treatment_plan_fields.Panel(0).Image("calendar_png").Click();
     datepicker = INRstarV5.Panel("ui_datepicker_div");
     
     if (StartDate!='')
     {
       var w_day = aqString.SubString(StartDate,0,2);
       var w_mth = aqConvert.StrToInt(aqString.SubString(StartDate,3,2));
       var w_yr = aqString.SubString(StartDate,6,4);
          datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
          datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
          select_day(w_day, datepicker);
     }
    
     //Diagnosis, Drug, Duration, Dosing Method, Testing Method
     treatment_plan_fields.Panel(1).Select("DiagnosisSelected").ClickItem(Diagnosis);
     WaitSeconds(1,"");
     treatment_plan_fields.Panel(2).Select("DrugId").ClickItem(Drug);
     
     if(UsePrev == "" || UsePrev=="W")
     {
             
           treatment_plan_fields.Panel(3).Select("TreatmentDuration").ClickItem(TreatmentDuration);
           WaitSeconds(1,"");

           //Confirming the change in duration if it exists
       
             var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
               if(wbt_Confirm.Exists)
               {
                 wbt_Confirm.Click();
               } 
       
           //Dosing Method
           var warfarin_detail_fields = treatment_plan_fields.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation");
           warfarin_detail_fields.Panel(0).Select("DosingMethod").ClickItem(DosingMethod);

           WaitSeconds(1,"");
      
           //Confirming the more information if exists
       
             var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", "Ok", "BUTTON");
               if (wb_Ok.Exists && wb_Ok.VisibleOnScreen == true)
                 {
                   wb_Ok.Click();
                 }
           
           //Testing Method
           warfarin_detail_fields.Panel(1).Select("TestingMethod").ClickItem(TestingMethod);
 
           //Save the TreatmentPlan   
           add_treatment_plan_form.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();
     }
        else if (UsePrev == 'Y')
         {
            //proces the pop-ups
            process_button(INRstarV5, "Is this patient currently taking Warfarin?", "Yes");
            process_button(INRstarV5, "New Warfarin Treatment Plan", "Yes");
    
            WaitSeconds(1,"");
            
            //Save the plan
            add_treatment_plan_form.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();
      
         } 
           else if (UsePrev == 'N')
         
             {
             WaitSeconds(2);
             //proces the pop-ups
                 process_button(INRstarV5, "Is this patient currently taking Warfarin?", "Yes");
                 process_button(INRstarV5, "New Warfarin Treatment Plan", "No");
                 
                 treatment_plan_fields.Panel(3).Select("TreatmentDuration").ClickItem(TreatmentDuration);
                 WaitSeconds(1,"");

                 //Confirming the change in duration if it exists
                 var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
                   if(wbt_Confirm.Exists)
                   {
                     wbt_Confirm.Click();
                   } 
                   
                 //Dosing Method
                 var warfarin_detail_fields = treatment_plan_fields.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation");
                 warfarin_detail_fields.Panel(0).Select("DosingMethod").ClickItem(DosingMethod);

                 WaitSeconds(1,"");
      
                 // Confirming the more information if exists
                 var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", "Ok", "BUTTON");
                   if (wb_Ok.Exists && wb_Ok.VisibleOnScreen == true)
                     {
                       wb_Ok.Click();
                     }
           
                 //Testing Method
                 warfarin_detail_fields.Panel(1).Select("TestingMethod").ClickItem(TestingMethod);
 
                 //Save the TreatmentPlan   
                 add_treatment_plan_form.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();
            }      
    
 }
  if(Mode == "Validate")
 {
   //If you have previous treatments/treatment plan
    if(UsePrev=="Y" || UsePrev=="N")
     {
     Goto_Patient_TreatmentPlan_Add_more_1_treatmentPlan();
     }
     
      if (UsePrev=="")
      {
       Goto_Patient_TreatmentPlan_Add();
      } 
      
     var INRstarV5 = set_system();
      
     WaitSeconds(2,"About to go to Treatment Plan Tab");
     var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent");
     var add_treatment_plan_form = panelMCP.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Form("AddTreatmentPlanForm"); 
     var treatment_plan_fields = add_treatment_plan_form.Fieldset(0).Panel("EditPatientTreatmentPlanInformation");     
          
     //Add Treatment plan details
        
     //Plan start date  
     treatment_plan_fields.Panel(0).Image("calendar_png").Click();
     datepicker = INRstarV5.Panel("ui_datepicker_div");
     
    if (StartDate!='')
     {
       var w_day = aqString.SubString(StartDate,0,2);
       var w_mth = aqConvert.StrToInt(aqString.SubString(StartDate,3,2));
       var w_yr = aqString.SubString(StartDate,6,4);
          datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
          datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
          select_day(w_day, datepicker);
     }
    
     //Diagnosis, Drug, Duration, Dosing Method, Testing Method
     treatment_plan_fields.Panel(1).Select("DiagnosisSelected").ClickItem(Diagnosis);
     WaitSeconds(1,"");
     treatment_plan_fields.Panel(2).Select("DrugId").ClickItem(Drug);
     
     if(UsePrev == "" || UsePrev=="W")
     {
             
           treatment_plan_fields.Panel(3).Select("TreatmentDuration").ClickItem(TreatmentDuration);
           WaitSeconds(1,"");

           //Confirming the change in duration if it exists
       
             var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
               if(wbt_Confirm.Exists)
               {
                 wbt_Confirm.Click();
               } 
       
           //Dosing Method
           var warfarin_detail_fields = treatment_plan_fields.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation");
           warfarin_detail_fields.Panel(0).Select("DosingMethod").ClickItem(DosingMethod);

           WaitSeconds(1,"");
      
           //Confirming the more information if exists
       
             var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", "Ok", "BUTTON");
               if (wb_Ok.Exists && wb_Ok.VisibleOnScreen == true)
                 {
                   wb_Ok.Click();
                 }
           
           //Testing Method
           warfarin_detail_fields.Panel(1).Select("TestingMethod").ClickItem(TestingMethod);
 
           //Save the TreatmentPlan   
           add_treatment_plan_form.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();
     }
        else if (UsePrev == 'Y')
         {
            //proces the pop-ups
            process_button(INRstarV5, "Is this patient currently taking Warfarin?", "Yes");
            process_button(INRstarV5, "New Warfarin Treatment Plan", "Yes");
    
            WaitSeconds(1,"");
            
            //Save the plan
            add_treatment_plan_form.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();
      
         } 
           else if (UsePrev == 'N')
         
             {
             WaitSeconds(2);
             //proces the pop-ups
                 process_button(INRstarV5, "Is this patient currently taking Warfarin?", "Yes");
                 process_button(INRstarV5, "New Warfarin Treatment Plan", "No");
                 
                 treatment_plan_fields.Panel(3).Select("TreatmentDuration").ClickItem(TreatmentDuration);
                 WaitSeconds(1,"");

                 //Confirming the change in duration if it exists
                 var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
                   if(wbt_Confirm.Exists)
                   {
                     wbt_Confirm.Click();
                   } 
                   
                 //Dosing Method
                 var warfarin_detail_fields = treatment_plan_fields.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation");
                 warfarin_detail_fields.Panel(0).Select("DosingMethod").ClickItem(DosingMethod);

                 WaitSeconds(1,"");
      
                 // Confirming the more information if exists
                 var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", "Ok", "BUTTON");
                   if (wb_Ok.Exists && wb_Ok.VisibleOnScreen == true)
                     {
                       wb_Ok.Click();
                     }
           
                 //Testing Method
                 warfarin_detail_fields.Panel(1).Select("TestingMethod").ClickItem(TestingMethod);
 
                 //Save the TreatmentPlan   
                 add_treatment_plan_form.Panel("PatientTreatmentPlanInformation").SubmitButton("AddPatientTreatmentPlan").Click();
            }      
 }
}
//--------------------------------------------------------------------------------