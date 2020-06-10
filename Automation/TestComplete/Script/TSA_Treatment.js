//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//USEUNIT Popup_Handlers
//--------------------------------------------------------------------------------
function add_pending_fast_induction_treatment(inr, TestStepMode)
{
  var INRstarV5 = INRstar_base();    
 
  if(TestStepMode == 'Shared')
  {
    Goto_Patient_New_INR(); //Pre_Treatment INR
    
    var risk_factors = fast_induction_risk_factors_path(); 
    risk_factors.Cell(0, 0).Panel(0).Checkbox("NoRiskFactors").ClickChecked(true);
    var pre_treatment_info = pre_treatment_induction_path()
    
    pre_treatment_info.Panel(1).Select("INR").ClickItem(inr);
     
    pre_treatment_info.Panel(2).Select("TestingMethod").ClickItem('PoCT');
     
    // PoCT special handling due to all the things this can be set to and a bug
    handle_PoCT(pre_treatment_info);
     
    var buttons = pre_treatment_induction_buttons_path();
    buttons.SubmitButton("CalculateWarfarinDose").Click();
    process_popup("PoCT Batch Expired", "Confirm");
    
    process_popup("Please confirm that the following is correct", "Confirm");
    //process_confirm_INR(INRstarV5);
  }
}
//--------------------------------------------------------------------------------
function add_fast_induction_treatment(inr)
{
  var INRstarV5 = INRstar_base();    
  var inr = get_string_translation(inr);
  Goto_Patient_New_INR();  // Pre_Treatment INR
    
  var risk_factors = fast_induction_risk_factors_path(); 
  risk_factors.Cell(0, 0).Panel(0).Checkbox("NoRiskFactors").ClickChecked(true);
  WaitSeconds(2);
  var pre_treatment_info = pre_treatment_info_induction_path();
     
  pre_treatment_info.Panel(1).Select("INR").ClickItem(inr);
     
  pre_treatment_info.Panel(2).Select("TestingMethod").ClickItem('PoCT');
     
  // PoCT special handling due to all the things this can be set to and a bug
  handle_PoCT(pre_treatment_info);
     
  var buttons = pre_treatment_induction_buttons_path();
  buttons.SubmitButton("CalculateWarfarinDose").Click();
  process_popup("PoCT Batch Expired", "Confirm");
  
  process_popup("Please confirm that the following is correct", "Confirm");
  
  var pending_treatment_buttons_path = pending_treatment_buttons();
  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
}
//--------------------------------------------------------------------------------
function add_induction_slow_treatment(inr)
{
  var INRstarV5 = INRstar_base();    
  var inr = get_string_translation(inr);
  Goto_Patient_New_INR();  // Pre_Treatment INR
    
  var pre_treatment_info = pre_treatment_info_induction_path()
     
  pre_treatment_info.Panel(1).Select("INR").ClickItem(inr);
  WaitSeconds(2);    
  pre_treatment_info.Panel(2).Select("TestingMethod").ClickItem('PoCT');
     
  // PoCT special handling due to all the things this can be set to and a bug
  handle_PoCT(pre_treatment_info);
     
  var buttons = pre_treatment_induction_buttons_path();
  buttons.SubmitButton("CalculateWarfarinDose").Click();
  
  process_popup(get_string_translation("Please confirm that the following is correct"), get_string_translation("Confirm"));
  var pending_treatment_buttons_path = pending_treatment_buttons();
  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();

}
//--------------------------------------------------------------------------------
function add_pending_induction_slow_treatment(inr,TestStepMode)
{
  var INRstarV5 = INRstar_base();    
 
  if(TestStepMode == 'Shared')
  {
    Goto_Patient_New_INR();  // Pre_Treatment INR
    
    var pre_treatment_info = pre_treatment_info_induction_path()
     
    pre_treatment_info.Panel(1).Select("INR").ClickItem(inr);
    WaitSeconds(2);    
    pre_treatment_info.Panel(2).Select("TestingMethod").ClickItem('PoCT');
     
    // PoCT special handling due to all the things this can be set to and a bug
    handle_PoCT(pre_treatment_info);
     
    var buttons = pre_treatment_induction_buttons_path();
    buttons.SubmitButton("CalculateWarfarinDose").Click();
    
    process_popup("Please confirm that the following is correct", "Confirm");
  }
}
//--------------------------------------------------------------------------------
function add_pending_manual_treatment(inr, tm, dose, review)
{
  var INRstarV5 = INRstar_base();
  Goto_Patient_New_INR();
  var inr_test_info_path = treatment_inr_test_info_path();
  var new_inr_test_info_path = new_inr_test_details();

   // Select the passed-in INR value
   inr_test_info_path.Panel("poctDetails").Panel(1).Select("INR").ClickItem(get_string_translation(inr));

   // Testing Method
   inr_test_info_path.Panel("poctDetails").Panel(2).Select("TestingMethod").ClickItem(tm);
   
   // PoCT special handling due to all the things this can be set to and a bug
   var new_inr_test_details_path = new_inr_test_details();
   handle_PoCT(new_inr_test_details_path);
      
   // Dose
   inr_test_info_path.Panel(0).Select("Dose").ClickItem(get_string_translation(dose));
       
   // Review
   if (review != "1")
    {
      inr_test_info_path.Panel(2).Select("Review").ClickItem(review + " " + get_string_translation("Days"));
    }
    else
    {
      inr_test_info_path.Panel(2).Select("Review").ClickItem(review + " " + get_string_translation("Day"));
    }
       
   var save_button_pre_schedule = treatment_buttons_pre_schedule();
   save_button_pre_schedule.SubmitButton("SubmitManualDose").Click();
   
   process_popup(get_string_translation("PoCT Batch Expired"),get_string_translation("Confirm"));   
   process_popup(get_string_translation("Please confirm that the following is correct"), get_string_translation("Confirm"));
   WaitSeconds(2);
}
//--------------------------------------------------------------------------------
function add_pending_maintenance_treatment(inr, date, selftest, test_method)
{
  var INRstarV5 = INRstar_base();
  Goto_Patient_New_INR();
  
  var test_info_pre_schedule_path = treatment_inr_test_info_path();
  var treatment_inr_test_options_path = treatment_inr_test_options();
  
  // Set the Treatment Date
  var w_day = aqString.SubString(date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(date,3,2));
  var w_yr = aqString.SubString(date,6,4);
      
  test_info_pre_schedule_path.Panel("poctDetails").Panel(0).Image("calendar_png").Click();
      
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, w_datepicker);
      
  // Select the passed-in INR value
  test_info_pre_schedule_path.Panel("poctDetails").Panel(1).Select("INR").ClickItem(inr);
  
  if(test_method != null)
  {
    if(test_method == "poct")
    {
      new_inr_test_details().Panel("testDetails").Panel("poctDetails").Panel(2).Select("TestingMethod").ClickItem(1);
    }
    else if(test_method == "lab")
    {
      new_inr_test_details().Panel("testDetails").Panel("poctDetails").Panel(2).Select("TestingMethod").ClickItem(2);
    }
  }
  
  // PoCT special handling due to all the things this can be set to and a bug
  var new_inr_test_details_path = new_inr_test_details();
  handle_PoCT(new_inr_test_details_path);
  
  if(selftest=='N')
  {
    treatment_inr_test_options_path.Panel(1).Checkbox("SelfTested").ClickChecked(false);
  }
  
  var save_button_pre_schedule = treatment_buttons_pre_schedule();
  save_button_pre_schedule.SubmitButton("CalculateWarfarinDose").Click();
  
  //handle bunch of popups
  handle_no_poct("non_induct");
  process_popup(get_string_translation("PoCT Batch Expired"), get_string_translation("Confirm"));
  process_popup(get_string_translation("Please confirm that the following is correct"), get_string_translation("Confirm"));
  var text = process_alternate_popup(get_string_translation("Please acknowledge"), get_string_translation("Confirm"));
  
  wait_for_object(main_patient_tab(), "idStr", "PendingTreatmentInfo", 5);
  
  return text;
}
//--------------------------------------------------------------------------------
function add_pending_maintenance_treatment_pop_up_checker(inr, date, selftest)
{
  var INRstarV5 = INRstar_base();
  Goto_Patient_New_INR();
  var test_info_pre_schedule_path = treatment_inr_test_info_path();
  var treatment_inr_test_options_path = treatment_inr_test_options();
  
  
  // Set the Treatment Date
  var w_day = aqString.SubString(date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(date,3,2));
  var w_yr = aqString.SubString(date,6,4);
      
  test_info_pre_schedule_path.Panel("poctDetails").Panel(0).Image("calendar_png").Click();
      
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, w_datepicker);
      
  // Select the passed-in INR value
  test_info_pre_schedule_path.Panel("poctDetails").Panel(1).Select("INR").ClickItem(inr);
  
  // PoCT special handling due to all the things this can be set to and a bug
  var new_inr_test_details_path = new_inr_test_details();
  handle_PoCT(new_inr_test_details_path);
  
  if(selftest=='N')
  {
  treatment_inr_test_options_path.Panel(1).Checkbox("SelfTested").ClickChecked(false);
  }
  
  var save_button_pre_schedule = treatment_buttons_pre_schedule();
  save_button_pre_schedule.SubmitButton("CalculateWarfarinDose").Click();
  
  //  WaitSeconds(2)
  handle_no_poct('non_induct');
  process_popup("PoCT Batch Expired", "Confirm");
   
  WaitSeconds(1);   
   
  // Click the Confirm button in the confirm window but not the yellow warning
  process_popup("Please confirm that the following is correct", "Confirm");
}
//--------------------------------------------------------------------------------
function add_maintenance_treatment(inr, date)
{
  var INRstarV5 = INRstar_base();
  Goto_Patient_New_INR();
  var test_info_pre_schedule_path = treatment_inr_test_info_path();
  var treatment_inr_test_options_path = treatment_inr_test_options();
  
  // Set the Treatment Date
  var w_day = aqString.SubString(date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(date,3,2));
  var w_yr = aqString.SubString(date,6,4);
  
  var obj = wait_for_object(test_info_pre_schedule_path, "name", "Image(\"calendar_png\")", 3);
  obj.Click();
  //test_info_pre_schedule_path.Panel("poctDetails").Panel(0).Image("calendar_png").Click();
      
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, w_datepicker);
      
  // Select the passed-in INR value
  var ws_INR = aqConvert.FloatToStr(inr);
  Log.Message("INR is " + ws_INR);
  test_info_pre_schedule_path.Panel("poctDetails").Panel(1).Select("INR").ClickItem(ws_INR);
  
  test_info_pre_schedule_path.Panel("poctDetails").Panel(2).Select("TestingMethod").ClickItem("Lab");
  
  var save_button_pre_schedule = treatment_buttons_pre_schedule();
  save_button_pre_schedule.SubmitButton("CalculateWarfarinDose").Click();
  
  process_popup("PoCT Batch Expired", "Confirm");
       
  // Click the Confirm button in the confirm window
  process_popup("Please confirm that the following is correct", "Confirm");
  
   //Save the INR
  var pending_treatment_buttons_path = pending_treatment_buttons();
  wait_for_object(pending_treatment_buttons_path, "idStr", "DosingScheduleContent", 2);
  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
}
//--------------------------------------------------------------------------------
function add_override_treatment(inr,date,p_review)
{
  var INRstarV5 = INRstar_base();
  Goto_Patient_New_INR();
  var test_info_pre_schedule_path = new_inr_test_details();
  var treatment_options = test_info_pre_schedule_path.Fieldset("Options");
  var treatment_buttons = pending_treatment_buttons();

  // Set the Treatment Date
  var w_day = aqString.SubString(date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(date,3,2));
  var w_yr = aqString.SubString(date,6,4);
      
  test_info_pre_schedule_path.Panel("testDetails").Panel("poctDetails").Panel(0).Image("calendar_png").Click();
      
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, w_datepicker);
      
  // Select the passed-in INR value
  test_info_pre_schedule_path.Panel("testDetails").Panel("poctDetails").Panel(1).Select("INR").ClickItem(inr);
  
  //Check if the batch field is on screen
   var poct_batch_field = test_info_pre_schedule_path.contentText;

  //PoCT special handling due to all the things this can be set to and a bug
  handle_PoCT(test_info_pre_schedule_path);
  
  var save_button_pre_schedule = treatment_buttons_pre_schedule();
  save_button_pre_schedule.SubmitButton("CalculateWarfarinDose").Click();
  process_popup("PoCT Batch Expired", "Confirm");
       
  //Click the Confirm button in the confirm window
  process_popup("Please confirm that the following is correct", "Confirm");
  //process_confirm_INR(INRstarV5);
  
  //Click override
  treatment_buttons.Panel("PendingTreatmentInfo").Panel(0).Button("OverridePendingTreatment").Click();
  var override_buttons = override_treatment_buttons_path();
               
  //Set Review period
  var w_vselect = override_buttons.Cell(1, 3).Select("Treatment_Review");
  
  if (p_review > 1)
  {
  w_vselect.ClickItem(p_review + " Days");
  } 
    else if (p_review == 1)
  {
    w_vselect.ClickItem(p_review + " Day");
  }
  
  //Click 'ok'
  var final_override_buttons = override_finish_buttons_path();
  final_override_buttons.Button("OverrideAccept").Click();

  //End of Override section
  WaitSeconds(1,"Waiting for Override to complete");
  
  //Save the INR
  var pending_treatment_buttons_path = pending_treatment_buttons();
  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
}
//-----------------------------------------------------------------------------------
function add_historic_treatment(date,inr,dose,omits,review,target)
{
    var INRstarV5 = INRstar_base();
    Goto_Add_Historical();
    process_popup(get_string_translation("Please Confirm"), get_string_translation("Confirm"));
    
    var historic_treatment_form = historic_treatment_path();
    
    // Set the Treatment Date
    var w_day = aqString.SubString(date,0,2);
    var w_mth = aqConvert.StrToInt(aqString.SubString(date,3,2));
    var w_yr = aqString.SubString(date,6,4);
      
    historic_treatment_form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
      
    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
    select_day(w_day, w_datepicker);

    historic_treatment_form.Table("AddHistoricalTreatmentTable").Cell(1, 1).Select("INR").ClickItem(get_string_translation(inr));
    historic_treatment_form.Table("AddHistoricalTreatmentTable").Cell(1, 2).Select("Dose").ClickItem(get_string_translation(dose));
    historic_treatment_form.Table("AddHistoricalTreatmentTable").Cell(1, 3).Select("Omits").ClickItem(omits + " " + get_string_translation("Days"));
    if (review != "1")
    {
      historic_treatment_form.Table("AddHistoricalTreatmentTable").Cell(1, 4).Select("Review").ClickItem(review + " " + get_string_translation("Days"));
    }
    else
    {
      historic_treatment_form.Table("AddHistoricalTreatmentTable").Cell(1, 4).Select("Review").ClickItem(review + " " + get_string_translation("Day"));
    }   
    
    historic_treatment_form.Table("AddHistoricalTreatmentTable").Cell(1, 5).Select("TargetINR").ClickItem(get_string_translation(target));
    //Once full run done on UK and Italy then remove
    //historic_treatment_form.Table("AddHistoricalTreatmentTable").Cell(1, 5).Select("TargetINR").ClickItem(aqConvert.FloatToStr(get_string_translation(target)));
    //historic_treatment_form.Panel("HistoricalExtras").Panel("HistoricalComments").Textarea("Comments").innerText = p_comment;
        
    historic_treatment_form.Panel(0).SubmitButton("Save").Click();
    wait_for_object(INRstarV5, "idStr", "modalDialogBox", 2);

    // Click confirm panel
    process_popup(get_string_translation("Please confirm treatment date"), get_string_translation("Confirm"));
    process_popup(get_string_translation("Please confirm that the following is correct"), get_string_translation("Confirm"));
    
    WaitSeconds(5, "Waiting for Add Historic...");
}
//--------------------------------------------------------------------------------
function add_manual_treatment(date, inr, dose, review, tm)
{
  var INRstarV5 = INRstar_base();
  Goto_Patient_New_INR();
  var test_info_path = treatment_inr_test_info_path()
  
  if(tm == null)
  {
    tm = "Lab";
  }

  // Set the Treatment Date
  var w_day = aqString.SubString(date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(date,3,2));
  var w_yr = aqString.SubString(date,6,4);
      
  test_info_path.Panel("poctDetails").Panel(0).Image("calendar_png").Click();
 
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, w_datepicker);

  test_info_path.Panel(0).Select("Dose").ClickItem(get_string_translation(dose));
  if(review != "1")
  {
    test_info_path.Panel(2).Select("Review").ClickItem(review + " " + get_string_translation("Days"));
  }
  else
  {
    test_info_path.Panel(2).Select("Review").ClickItem(review + " " + get_string_translation("Day"));
  }
  test_info_path.Panel("poctDetails").Panel(1).Select("INR").ClickItem(get_string_translation(inr));
  test_info_path.Panel("poctDetails").Panel(2).Select("TestingMethod").ClickItem(tm);
   
  var treatment_button_path = treatment_buttons_pre_schedule();
  treatment_button_path.SubmitButton("SubmitManualDose").Click();
  process_popup(get_string_translation("PoCT Batch Expired"), get_string_translation("Confirm"));
  
  //Confirm the values
  var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", get_string_translation("Confirm"));
  wbt_Confirm.Click();
  
  process_popup("Insert Confirmation", get_string_translation("Confirm"));
  WaitSeconds(2, "Saving the Treatment...");  
  
  //Save the INR
  var pending_treatment_buttons_path = pending_treatment_buttons();
  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
}
//--------------------------------------------------------------------------------
function delete_treatment()
{
  Goto_Patient_Treatments_Tab();
  WaitSeconds(1);
  var treatment_buttons_path = inr_treatment_buttons();
  treatment_buttons_path.Button("DeleteLatestTreatment").Click();
  var msg = process_popup("Confirmation Required", "Confirm");
  
  return msg;
} 
//--------------------------------------------------------------------------------
function delete_treatment_confim_checker(expected_message)
{
  var INRstarV5 = INRstar_base();
  var treatment_buttons_path = inr_treatment_buttons();
  treatment_buttons_path.Button("DeleteLatestTreatment").Click();
  
  // Find out if the confirm button is on the screen
  var pop_up = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
  
  WaitSeconds(2);
  
  if (pop_up.Exists && pop_up.VisibleOnScreen == true)
  {
    //get message and validate
    var pop_up_warning_message_path = pop_up_warning_message();
    var pop_up_message = pop_up_warning_message_path.contentText;
    
    if(pop_up_message==expected_message)
    {
     return true; 
    } 
  }
  else
     Log.Message('The confirm box wasn\'t on the page'); 
     return false;    
} 
//--------------------------------------------------------------------------------
//Need to handle PoCT field and existing bugs that live in this field then add to all tests that need to use this method
function handle_PoCT(main_path)
{
   var inr_test_info_path = main_path;
   
   //Check if the batch field is on screen
   var poct_batch_field = main_path.contentText;
   
   if(poct_batch_field.includes(get_string_translation('Enter pre-treatment INR test information')))
   {
     // Check PoCT
     if(poct_batch_field.includes(get_string_translation('PoCT Batch')))
     {
        //changed to for induction/italy ??
        var field_enabled = inr_test_info_path.Panel(3).Select("MedicalDeviceStripBatchNo").Enabled;
        //Was this before is this normal inr ?
        //var field_enabled = inr_test_info_path.Panel("BatchDetailsWrapper").Select("MedicalDeviceStripBatchNo").Enabled;
           
        //Added for Instrument changes and the PoCT selector not being disabled when selecting 'Lab' as testing method           
        var testing_method = inr_test_info_path.Panel(2).Select("TestingMethod").wText;
                      
        //chnaged to for induction/italy ??
        var batch = inr_test_info_path.Panel(3).Select("MedicalDeviceStripBatchNo").wText;
        //Was this before is this normal inr ?
        //var batch = inr_test_info_path.Panel("BatchDetailsWrapper").Select("MedicalDeviceStripBatchNo").wText;

          if(batch==get_string_translation('~Select PoCT Batch') && field_enabled == true && testing_method == 'PoCT')
          {
          //changed to this again for induction/italy??
          inr_test_info_path.Panel(3).Select("MedicalDeviceStripBatchNo").ClickItem(1);
          //Was this before is this normal inr ?
          //inr_test_info_path.Panel("BatchDetailsWrapper").Select("MedicalDeviceStripBatchNo").ClickItem(1);
          }  
            else          
            {
            Log.Message("Field was incorrectly disabled due to existing bug, changed to lab but didn't remove the PoCT field from UI");           
            } 
     }
   }       
   
   if(poct_batch_field.includes(get_string_translation("Enter new INR test information")))
   {
     // Check PoCT
     if(poct_batch_field.includes(get_string_translation('PoCT Batch')))
     {
           var field_enabled = inr_test_info_path.Panel("testDetails").Panel("poctDetails").Panel("BatchDetailsWrapper").Select("MedicalDeviceStripBatchNo").Enabled;
           
           //Added for Instrument changes and the PoCT selector not being disabled when selecting 'Lab' as testing method           
           var testing_method = inr_test_info_path.Panel("testDetails").Panel("poctDetails").Panel(2).Select("TestingMethod").wText;          
           var batch = inr_test_info_path.Panel("testDetails").Panel("poctDetails").Panel("BatchDetailsWrapper").Select("MedicalDeviceStripBatchNo").wText;
           
           if(batch==get_string_translation('~Select PoCT Batch') && field_enabled == true && testing_method == 'PoCT')
           {
             inr_test_info_path.Panel("testDetails").Panel("poctDetails").Panel("BatchDetailsWrapper").Select("MedicalDeviceStripBatchNo").ClickItem(1);
             //inr_test_info_path.Panel("BatchDetailsWrapper").Select("MedicalDeviceStripBatchNo").ClickItem(1);
           }  
            else          
            {
             Log.Message('Field was incorrectly disabled due to existing bug, changed to lab but didn\'t remove the PoCT field from UI');           
            } 
     }
   }       
}   
//--------------------------------------------------------------------------------
function handle_no_poct(dose_method) //probably also needs changing
{
 //Handle if there is no PoCT
 var INRstarV5 = INRstar_base(); 
 
 //Add something here to find out if you have made it past the pre schedule page
 var suggest_tab = INRstarV5.NativeWebObject.Find("idStr", "ProposedTab");
 
 if(suggest_tab.Exists)
 {
   return;
 } 
 
   if(dose_method=='non_induct')
   {
      var pre_treatment_info_path = pre_treatment_non_induct_path();
   } 
 
   if(dose_method=='induct')
   {
      var pre_treatment_info_path = pre_treatment_induction_path();
   } 
 
 var no_poct = INRstarV5.NativeWebObject.Find("innerText", "There is no PoCT batch recorded, you must record one before you can perform a treatment.");

     if (no_poct.Exists)
     {  
      pre_treatment_info_path.Panel(2).Select("TestingMethod").ClickItem("Lab");
      var buttons = treatment_buttons_pre_schedule();
      buttons.SubmitButton("CalculateWarfarinDose").Click();
     }             
}   
//--------------------------------------------------------------------------------
function override_omits(days)
{
  var pending_treatment_buttons_path = pending_treatment_buttons()
  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("OverridePendingTreatment").Click();
               
  var treatment_override_field_container_path = treatment_override_field_container();
  treatment_override_field_container_path.Cell(1, 2).Select("Treatment_Omits").ClickItem(days);
  
  treatment_override_field_container_path.Cell(1, 3).Select("Treatment_Review").ClickItem('7 Days');

  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Form("EditPendingTreatmentForm").Panel(0).Button("OverrideAccept").Click();
  WaitSeconds(1,"Waiting for Override to complete");
}
//--------------------------------------------------------------------------------
function override_review(review)
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTI = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");

  panelPTI.Panel(0).Button("OverridePendingTreatment").Click();
        
  var formEPT = panelPTI.form("EditPendingTreatmentForm");
               
  // Set Review period
  var w_vselect = formEPT.Table("OverrideSuggestedTreatmentTable").Cell(1, 3).Select("Treatment_Review");
  
  if (review>1)
  {
  w_vselect.ClickItem(review + " Days");
  } 
    else if (p_review=1)
     {
     w_vselect.ClickItem(review + " Day");
     }
  
  // Click 'ok'
  formEPT.panel(0).Button("OverrideAccept").Click();

  // -- End of Override section
  WaitSeconds(1,"Waiting for Override to complete");
}
//--------------------------------------------------------------------------------
function override_dose(dose)
{
  var INRstarV5 = INRstar_base();
  var pending_treatment_buttons_path = pending_treatment_buttons()
  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("OverridePendingTreatment").Click();
               
  var treatment_override_field_container_path = treatment_override_field_container();
  treatment_override_field_container_path.Cell(1, 1).Select("Treatment_Dose").ClickItem(dose);

  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Form("EditPendingTreatmentForm").Panel(0).Button("OverrideAccept").Click();
  process_popup("Please Confirm", "Confirm");
  WaitSeconds(1,"Waiting for Override to complete");
} 
//--------------------------------------------------------------------------------
function select_more_schedules(sched_required)
{
  var pending_treatment_buttons_path = pending_treatment_buttons();
  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Fieldset(0).Panel(0).Button("MoreSchedulesLink").Click();
  
  var more_schedule_table_path = more_schedule_table();
  var row = more_schedule_table_path.rowcount;
  
  for(i=1; i<row; i++)
  {
    var tablets_used = more_schedule_table_path.Cell(i, 1).contentText;
    if(tablets_used==sched_required)
    {
      while(more_schedule_table_path.Cell(i, 2).Button("Use").VisibleOnScreen==false)
      {
      more_schedule_table_path.Cell(i, 2).Button("Use").ScrollIntoView(true);
      } 
      Log.Message('Schedule was found in the list');
      more_schedule_table_path.Cell(i, 2).Button("Use").Click();
      return true;
    }   
  } 
  Log.Message('Tablets required were not found within the more schedules list');
  return false;
}
//--------------------------------------------------------------------------------
function add_treatment_comment(comment)
{
  Goto_Add_Treatment_Comment();
  var INRstarV5 = INRstar_base();
  var treatment_comment_box_path = treatment_comment_box();
  treatment_comment_box_path.innerText = comment;
  INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).Click();
}
//--------------------------------------------------------------------------------
//    for(i=1; i<row_count; i++) 
//    {
//       var overdue_list_pat = overdue_list_table.Cell(i, 0).contentText;
//       if(overdue_list_pat==messagename)
//       { 
//         while(overdue_list_table.Cell(i, 0).Link("PatientLink").VisibleOnScreen==false)
//         {
//         overdue_list_table.Cell(i, 0).Link("PatientLink").ScrollIntoView(true);
//         }       
//          return true;
//       }
//    }
//    Log.Message('Patient was not found on the list');
//    return false;
//--------------------------------------------------------------------------------
function get_pre_treatment_warning_message()
{
  var treatment_pop_up_warning_message_path = treatment_pop_up_warning_message();
  var warning_text = treatment_pop_up_warning_message_path.contentText;
  process_popup("Please Confirm", "Confirm");
  return warning_text;
} 
//--------------------------------------------------------------------------------                                        
function get_treatment_error_banner()
{
 var treatment_banner_error_banner_path = treatment_banner_error_message();
 var error_text = treatment_banner_error_banner_path.contentText;
 return error_text;         
}              
//--------------------------------------------------------------------------------                                        
function get_dosing_engine_popup_text()
{
 var dosing_engine_warning_popup_path = dosing_engine_warning_popup();
 var warning_text = dosing_engine_warning_popup_path.contentText;
 process_Please_acknowledge_warnings();
 
 return warning_text;
}  
//--------------------------------------------------------------------------------             
function click_historic_button()             
{
  var inr_treatment_buttons_path = inr_treatment_buttons();
  inr_treatment_buttons_path.Button("AddHistoricalTreatment").click();
}    
//--------------------------------------------------------------------------------  
function get_treatment_icon_state()
{
  var INRstarV5 = INRstar_base();
  var pending_treatment_table_path = pending_treatment_table();
  var treat_row = INRstarV5.NativeWebObject.Find("idStr", "PatientPendingTreatmentDetails");
      
    if (treat_row.Exists == true)
    {
    var icon_state = pending_treatment_table_path.Cell(0, 10).Image('*').Name;
    Log.Message(icon_state);
    return icon_state;
    }
     else
        Log.Message('Could not find the treatment row icon');  
} 
//--------------------------------------------------------------------------------


























                                           
