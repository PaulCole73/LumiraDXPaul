//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//USEUNIT INRstar_Misc_Functions
//USEUNIT Popup_Handlers
//USEUNIT API_Functions
//--------------------------------------------------------------------------------
function add_pending_fast_induction_treatment(inr, TestStepMode)
{
  var INRstarV5 = INRstar_base();
  var inr = get_string_translation(inr);    
 
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
    
    process_popup(get_string_translation("PoCT Batch Expired"), get_string_translation("Confirm"));
    
    process_popup(get_string_translation("Please confirm that the following is correct"), get_string_translation("Confirm"));
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
  
  process_popup(get_string_translation("Please confirm that the following is correct"), get_string_translation("Confirm"));
  
  save_inr_button().Click();
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
  save_inr_button().Click();

}
//--------------------------------------------------------------------------------
function add_pending_induction_slow_treatment(inr, TestStepMode)
{
  var INRstarV5 = INRstar_base();    
  var inr = get_string_translation(inr);
 
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
    
    process_popup(get_string_translation("Please confirm that the following is correct"), get_string_translation("Confirm"));
  }
}
//--------------------------------------------------------------------------------
function add_pending_manual_treatment(inr, tm, dose, review)
{
  var INRstarV5 = INRstar_base();
  Goto_Patient_New_INR();
  var inr_test_info_path = treatment_inr_test_info_path();
  var new_inr_test_info_path = new_inr_test_details();
  var inr = get_string_translation(inr);

   // Select the passed-in INR value
   inr_test_info_path.Panel("poctDetails").Panel(1).Select("INR").ClickItem(inr);

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
   
   // If an adjustment is required to tablet dosage breakdown - carry it out
   handle_dosing_modification_required();
}
//--------------------------------------------------------------------------------
function add_pending_maintenance_treatment(inr, date, selftest, test_method)
{
  var INRstarV5 = INRstar_base();
  var new_inr = get_string_translation(inr);
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
  test_info_pre_schedule_path.Panel("poctDetails").Panel(1).Select("INR").ClickItem(new_inr);
  
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
  
  // If an adjustment is required to tablet dosage breakdown - carry it out
  handle_dosing_modification_required();
  
  return text;
}
//--------------------------------------------------------------------------------
function add_pending_maintenance_treatment_pop_up_checker(inr, date, selftest)
{
  var INRstarV5 = INRstar_base();
  var inr = get_string_translation(inr);
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
  process_popup(get_string_translation("Please confirm that the following is correct"), get_string_translation("Confirm"));
}
//--------------------------------------------------------------------------------
function add_maintenance_treatment(inr, date) //this function does not save the INR?
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
  ws_INR = get_string_translation(ws_INR);
  Log.Message("INR is " + ws_INR);
  test_info_pre_schedule_path.Panel("poctDetails").Panel(1).Select("INR").ClickItem(ws_INR);
  
  // Select the Testing Method as Lab
  test_info_pre_schedule_path.Panel("poctDetails").Panel(2).Select("TestingMethod").ClickItem("Lab");
  
  var save_button_pre_schedule = treatment_buttons_pre_schedule();
  save_button_pre_schedule.SubmitButton("CalculateWarfarinDose").Click();
  
  // Click the Confirm button in the confirm window
  process_popup(get_string_translation("PoCT Batch Expired"), get_string_translation("Confirm"));
       
  // Click the Confirm button in the confirm window
  process_popup(get_string_translation("Please confirm that the following is correct"), get_string_translation("Confirm"));
  
  //Save the INR
  wait_for_object(path_patient_pending_treatment(), "idStr", "AcceptPendingTreatment", 3);
  save_inr_button().Click();
}
//--------------------------------------------------------------------------------
function add_override_treatment(inr,date,p_review)
{
  var INRstarV5 = INRstar_base();
  var inr = get_string_translation(inr);
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
  process_popup(get_string_translation("Please confirm that the following is correct"), get_string_translation("Confirm"));
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
  save_inr_button().Click();
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
  var inr = get_string_translation(inr);
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
  
  var days = "Days";
  if (review == "1") 
  {
    //Changes days string to day if review = 1
    days = days.substring(0,4-1)
  }
  test_info_path.Panel(2).Select("Review").ClickItem(review + " " + get_string_translation(days));

  test_info_path.Panel("poctDetails").Panel(1).Select("INR").ClickItem(inr);
  test_info_path.Panel("poctDetails").Panel(2).Select("TestingMethod").ClickItem(tm);
   
  var treatment_button_path = treatment_buttons_pre_schedule();
  treatment_button_path.SubmitButton("SubmitManualDose").Click();
  process_popup(get_string_translation("PoCT Batch Expired"), get_string_translation("Confirm"));
  
  //Confirm the values
  var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", get_string_translation("Confirm"));
  wbt_Confirm.Click();
  
  process_popup(get_string_translation("Insert Confirmation"), get_string_translation("Confirm"));
  WaitSeconds(2, "Saving the Treatment...");  
  
  // Handle any dosing mpodifications should they be needed.
  handle_dosing_modification_required();
  
  //Save the INR
  save_inr_button().Click();
}
//--------------------------------------------------------------------------------
function delete_treatment()
{
  Goto_Patient_Treatments_Tab();
  WaitSeconds(1);
  var treatment_buttons_path = inr_treatment_buttons();
  treatment_buttons_path.Button("DeleteLatestTreatment").Click();
  var msg = process_popup(get_string_translation("Confirmation Required"), get_string_translation("Confirm"));
  
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
function handle_dosing_modification_required()
{
  // Get relevant paths  
  var pending_treatment_path = path_patient_pending_treatment();
  
  // Check dosing modification table exists 
  var is_table_present = pending_treatment_path.Find("idStr", "MoreScheduleGrid", 3).Exists;

  // if the table exists handle it by selecting first suggested dosing modification 
  if (is_table_present == true)
  {
    //Get the schedule path, this path will only exist if the table is present
    //var dosing_schedule_content_path = dosing_schedule_content();  this is not being used in this file, will be deleted after testing/releases
  
     // Selecting first option listed in table
    more_schedule_table().Cell(1, 2).Button("Use").Click();
     
    // Confirm Pop -up
    process_popup(get_string_translation("Dose Change"), get_string_translation("Confirm"));
    
    // Wait for page to update before proceeding
    wait_for_object(path_main_patient_tab(), "idStr", "PendingTreatmentInfo", 5);
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
  /* this is no longer needed, this path is in system paths
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTI = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");

  panelPTI.Panel(0).Button("OverridePendingTreatment").Click();
  */
  override_button().Click();      
  //var formEPT = panelPTI.form("EditPendingTreatmentForm");
               
  // Set Review period
  var w_vselect = treatment_override_field_container().Cell(1, 3).Select("Treatment_Review");//formEPT.Table("OverrideSuggestedTreatmentTable").Cell(1, 3).Select("Treatment_Review");
  
  if(review > 1)
  {
      w_vselect.ClickItem(review + " " + get_string_translation("Days"));
  } 
  else if (p_review = 1)
  {
     w_vselect.ClickItem(review + " " + get_string_translation("Day"));
  }
  
  // Click 'ok'
  //formEPT.panel(0).Button("OverrideAccept").Click(); this is no longer needed, this path is in system paths
  overide_accept_button().Click();
  
  // -- End of Override section
  WaitSeconds(1,"Waiting for Override to complete");
}
//--------------------------------------------------------------------------------
function override_dose(dose)
{
  /* this is no longer needed, this path is in system paths
  var INRstarV5 = INRstar_base();
  var pending_treatment_buttons_path = pending_treatment_buttons()
  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("OverridePendingTreatment").Click();
  */
  override_button().Click();
               
  var treatment_override_field_container_path = treatment_override_field_container();
  treatment_override_field_container_path.Cell(1, 1).Select("Treatment_Dose").ClickItem(get_string_translation(dose));

  //pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Form("EditPendingTreatmentForm").Panel(0).Button("OverrideAccept").Click(); this is no longer needed, this path is in system paths
  overide_accept_button().Click();
  process_popup(get_string_translation("Please Confirm"), get_string_translation("Confirm"));
  WaitSeconds(1, "Waiting for Override to complete");
} 
//--------------------------------------------------------------------------------
function select_more_schedules(sched_required)
{
  var pending_treatment_buttons_path = pending_treatment_buttons();
  pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Fieldset(0).Panel(0).Button("MoreSchedulesLink").Click();
  
  var more_schedule_table_path = more_schedule_table();
  var row = more_schedule_table_path.rowcount;
  
  for(i = 1; i < row; i++)
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
  treatment_row_comment_box().innerText = comment;
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
function json_body_data_instrument(patient_details, location_id, inr_result, blood_test_timestamp) 
{
  //Formats: patient_details(object), location_id(GUID), inr_result(eg: "2.2"), blood_test_timestamp(eg: 2020-09-30T15:42:42)
  
  //Initialise a typical payload
  var payload = JSON.parse(`{
  "patient": {
    "identifiers": [{
        "alias": "8151589434",
        "aliasType": "RefNo1"}],
    "firstName": "Dave",
    "lastName": "SMITH",
    "dob": "1988-04-15",
    "gender": "F"  },
  "identifiers": [{
      "alias": "REEC-00256-02427|411",
      "aliasType": "ObservationID"}],
  "orderNumber": "REEC0025602427411",
  "organizationId": "014012d8-efbe-4902-b094-4816f1c31823",
  "category": "laboratory",
  "status": "Final",
  "code": "2",
  "effectiveDateTime": "2020-09-29T14:58:02",
  "resultValue": "2.2",
  "resultValueType": "string",
  "referenceRange": {"low": "0","high": "0"},
  "performer": {
    "id": "ea40b913-89cc-452e-8e53-a5b27b202abf",
    "fullName": "A White"},
  "instrument": {
    "serialNumber": "30717190300113",
    "wirelessId": "REEC-00256-02427"},
  "device": {
    "lotNumber": "88",
    "lotExpiryDate": "2024-04-04"}}`);

  //Replace payload content with imported variables
  payload.patient.identifiers[0].alias = patient_details.nhs_number;
  payload.patient.lastName = patient_details.lastname;
  payload.patient.firstName = patient_details.firstname;
  payload.patient.dob = patient_details.dob_as_dd_mm_yyyy;
  payload.patient.gender = patient_details.gender;
  payload.resultValue = inr_result
  
  //Replace Payload organizationId with locationID from Locations Details
  //Why are we passing this in and not setting here ?
  payload.organizationId = location_id; 
  
  //Replace Payload blood test timestamp
  //Why are we passing this in and not setting here ?
  payload.effectiveDateTime = blood_test_timestamp;
  
  Log.Message("Payload created as: " + JSON.stringify(payload));
    
  //Return the payload so it can be posted elsewhere
  return payload
}
//--------------------------------------------------------------------------------

function get_csp_url_from_the_inrstar_url()
{
  //Get the CSP URL from the INRstar URL 
  var address = Aliases.INRstarWindows.BrowserForm.INRstarBrowser.WebBrowserBaseNativeWindow.ShellDocObjectView.browser.URL;
  var matches = address.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  var domain = matches && matches[1];
  var domain = domain.replace("inrstar", "csp");
  var domain = "https://" + domain;
  Log.Message("Csp URL has been created as: " + domain);
  
  return domain
}

//--------------------------------------------------------------------------------

function get_bearer_token_for_instrument()
{
  //Obtain URL
  var address = get_csp_url_from_the_inrstar_url() + "/account/signin";
     
  //Define the request body_payload
  var body_payload = 
  '{'
  +' "grant_type": "password", '
  +' "scope": "quantum", '
  +' "client_id": "quantum", '
  +' "username":"Quantum", '
  +' "password": "W;b;8E:$Q?a~3bHVX3vyHzG"'
  +' }';
  
  //Create the Headers into an object
  var headers = new Object();
  headers["Content-Type"] = "application/json";
  headers["api-version"] = "2.1";

  //Perform the api request record the response
  var response = api_post(address, headers, body_payload)
  
  //Convert Response to JSON and extract the Bearer token
  var bearer_token = JSON.parse(response.text).access_token
    
  return bearer_token;
}

//--------------------------------------------------------------------------------

function post_external_result_instrument(body_payload)
{  
  //Get Token
  var token = get_bearer_token_for_instrument();
  
  //Obtain URL
  var address = get_csp_url_from_the_inrstar_url() + "/externalresults/observation";
  
  //Create the Headers into an object
  var headers = new Object();
  headers["Content-Type"] = "application/json";
  headers["Accepts"] = "application/json";
  headers["api-version"] = "2.1";
  headers["Authorization"] = "Bearer " + token; 

  //Call upon api_post() to send the request
  api_post(address, headers, body_payload)
}
//--------------------------------------------------------------------------------
function archive_treatment(row, action)
{
  if (row != false) 
  {
    //Click the archive button on the specified row
    var table = inr_results_received_table();
    var button = table.Cell(row, 4).Panel(0).Panel("UserAction2").Button("Archive").Click()
        
    //Wait for popup before proceeding avoids timeouts down the line
    wait_for_object(INRstar_base(), "contentText", "Discard", 5,"",2);
        
    //Pending the specified action (Discard/Cancel/Message) - handle the popup
    if (action == "Discard" || action == "Cancel")
    {
        process_popup("Archive Reason", action);
    }
    else if (action == "Message")
    {
        var message = provide_archive_reason_after_archiving_result();
        process_popup("Archive Reason", "Discard");  
        return message
    }
    else 
    {
        Log.Message("Unable to: " + action + " an archived result, must pass in Discard, Cancel or Message")
    }
  }
  else 
  {
      //Warn that table doesn't exist
      Log.Message("Failure Table row does not exist - so unable to select archive button");
  }
} 
//--------------------------------------------------------------------------------
function archive_test_result(row, action)
{
  if (row != false)  
  {
      //Click the archive button on the specified row
      var table = patient_external_results_table();
      var button = table.Cell(row, 4).Panel(0).Panel("Div2").Button("ArchiveResult").Click()
        
      //Wait for popup before proceeding avoids timeouts down the line
      wait_for_object(INRstar_base(), "contentText", "Discard", 5,"",2);
        
      //Pending the specified action (Discard/Cancel/Message) - handle the popup
      if (action == "Discard" || action == "Cancel")
      {
          process_popup("Archive Reason", action);
      }
      else if (action == "Message")
      {
          var message = provide_archive_reason_after_archiving_result();
          process_popup("Archive Reason", "Discard");  
          return message 
      }
      else 
      {
          Log.Message("Unable to: " + action + " an archived result, must pass in Discard, Cancel or Message")
      }
  }
  else 
  {
      //Warn that table doesn't exist
      Log.Message("Failure Table does not exist - so unable to select archive button");
  }
} 
//--------------------------------------------------------------------------------
function add_manual_treatment_using_test_results(dose, review, timestamp)
{
  //Obtain external result info from table
  var external_result = get_inr_results_received_by_timestamp(timestamp);
    
  //Select Use Result button
  if (external_result.row != false)  
  {
      //Click the Use-result button on the specified row
      var table = inr_results_received_table();
      var button = table.Cell(external_result.row, 4).Panel(0).Panel("UserAction1").Button("Use_Result").Click()
    
      var inr_test_info_path = treatment_inr_test_info_path();
  
      //Select Dose from dose dropdown
      inr_test_info_path.Panel(0).Select("Dose").ClickItem(get_string_translation(dose));
  
      //Select Review from review dropdown
      var days = "Days";
      if (review == "1") 
      {
        days = days.substring(0,4-1)
      }
      inr_test_info_path.Panel(2).Select("Review").ClickItem(review + " " + get_string_translation(days));
           
      //Select Save
      treatment_buttons_pre_schedule().SubmitButton("SubmitManualDose").Click();
   
      //Process Popups
      process_popup(get_string_translation("PoCT Batch Expired"),get_string_translation("Confirm"));   
      process_popup(get_string_translation("Please confirm that the following is correct"), get_string_translation("Confirm"));
  
      //Store the Dosage data into an object
      var dose_data = new Object();
      dose_data["dose"] = dose;
      dose_data["review"] = review;
  
      //Select Ok to confirm suggested treatment
      save_inr_button().Click()
  }
  else 
  {
      //Warn that table doesn't exist
      Log.Message("Failure Table row does not exist - so unable to select use result");
  }
  
  return dose_data
}
//--------------------------------------------------------------------------------
// Use when you expect the table - and want to be informed if not present
function Check_if_patients_inr_results_table_exists() 
{
  //Check if the link for the table is present
  var is_table_present = check_patient_results_table_header_showing_by_idStr_object("PatientExternalResultsTableWrapper", 14); 
  
  //Return true or false pending if link (and therfore table) is present
  return is_table_present
}
//--------------------------------------------------------------------------------
// Use when you expect the table - and want to be informed if not present
function Check_if_external_results_table_exists() 
{
  //Check if the link for the table is present
  var is_table_present = check_patient_results_table_header_showing_by_idStr_object("WarfarinResultsTable", 8); 
  
  //Return true or false pending if link (and therfore table) is present
  return is_table_present
}
//--------------------------------------------------------------------------------
// Use when you expect the table - and want to be informed if not present
function Check_if_treatment_table_exists() 
{
  //Check if the link for the table is present
  var is_table_present = check_patient_results_table_header_showing_by_idStr_object("PatientTreatmentHistoryTable", 13); 
  
  //Return true or false pending if link (and therfore table) is present
  return is_table_present
}
//--------------------------------------------------------------------------------
function check_patient_results_table_header_showing_by_idStr_object(string)
{  
  // Get the INRstarV5 base
  var INRstarV5 = INRstar_base();  
  
  // look for specified link_header idstr within INRstarV5
  var link = wait_for_object(INRstarV5, "idStr", string, 14, "", 2);
  
  // Return the result of the check
  return check_menu_header_exists(link);
}
//--------------------------------------------------------------------------------
function provide_archive_reason_after_archiving_result()
{
  var comments_section = archive_reason_comments_for_archived_result_confirmation_popup()
  
  var comment = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, " + 
  "making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words" +
  ", consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum" + 
  " comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a " +
  "treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32."
  
  //Enter comment into textbox
  comments_section.innerText = comment;
  
  return comment
}
//--------------------------------------------------------------------------------
function read_inr_results_received_from_table_by_timestamp(timestamp)
{
  //Check table exists before proceeding
  var table_exists = Check_if_patients_inr_results_table_exists(); 
   
  if (table_exists == true) 
  {
    //Get the path of the patient external results table
    var table = inr_results_received_table(); 
      
      //Loop through each row of table
      for (i=0; i<table.RowCount; i++)
      {
        //Check whether timestamp exists
        if (table.Cell(i, 1).contentText == timestamp)
        {
           var results = {
            "test_timestamp"         : table.Cell(i, 1).contentText,
            "source"                 : table.Cell(i, 2).contentText,
            "inr"                    : table.Cell(i, 3).contentText,
            "row"                    : i,
            "row_count"              : table.RowCount
            } 
           return results
        }
      }
      Log.Message("Table row containing timestamp does not exist");
  }
  
  // If data is unobtainable we can prevent further checks - checking row is not false 
  var results = {"row" : false, "row_count" : 0}
  return results;
}























                                           
