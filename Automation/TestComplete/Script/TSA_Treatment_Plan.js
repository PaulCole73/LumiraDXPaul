//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT V5_Common_Batch
//--------------------------------------------------------------------------------
function add_treatment_plan(drug, dm, start_date, TestStepMode, tp_start_mode, td)
{
 try
 {
  var INRstarV5 = INRstar_base();    
  
  //If its your first tp for the patient then leave as '' when calling the function, there are 3 different forms for tp new tp, activate patient tp and not first tp
  //Also it may skip the got to if I just want to add treatment plan info and I am already in the treatment plan page as I have had to bypass some warning pop ups
  
  if(tp_start_mode=='')
  {
  Goto_Patient_TreatmentPlan_Add(); 
  var treatment_plan_area = add_treatment_plan_main_section_path();
  }
  if(tp_start_mode=='2')
  {
  Goto_Patient_TreatmentPlan_Add_more_1_treatmentPlan(); 
  var treatment_plan_area = add_treatment_plan_main_section_path();
  } 
  if(tp_start_mode=='3')
  {
  Goto_Patient_TreatmentPlan_pop_up(); 
  var treatment_plan_area = add_treatment_plan_main_section_path();
  }
      
   if(TestStepMode == "Shared")
    {
      treatment_plan_area.Panel(0).Image("calendar_png").Click();
      
      datepicker = INRstarV5.Panel("ui_datepicker_div");
      if (start_date=='')
      {
          datepicker.Panel(0).Panel(0).Select(1).ClickItem("2017");
          datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jun");        
          datepicker.Table(0).Cell(3, 3).Link(0).Click();
      }
      else
      {
           var w_yr = aqString.SubString(start_date,6,4);
           var w_mth = aqConvert.StrToInt(aqString.SubString(start_date,3,2));
           var w_day = aqString.SubString(start_date,0,2);
           
            datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
            datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
            select_day(w_day, datepicker);
      }
      
      treatment_plan_area.Panel(1).Select("DiagnosisSelected").ClickItem("Atrial fibrillation");
      
       if (drug == 'W')
          {
          WaitSeconds(2)
          treatment_plan_area.Panel(2).Select("DrugId").ClickItem("Warfarin");
          
          //proces the pop-ups
//        process_button(INRstarV5, "Is this patient currently taking Warfarin?", "No");
          process_button(INRstarV5, "New Warfarin Treatment Plan", "Yes"); 
     
          var treatment_plan_warfarin_details_path = add_treatment_plan_warfarin_details();
          
          if (dm == 'Coventry')
                    treatment_plan_warfarin_details_path.Panel(0).Select("DosingMethod").ClickItem("Coventry Maintenance");
          if (dm == 'Hillingdon')
                    treatment_plan_warfarin_details_path.Panel(0).Select("DosingMethod").ClickItem("Hillingdon Maintenance");
          if (dm == 'Tait')
                    treatment_plan_warfarin_details_path.Panel(0).Select("DosingMethod").ClickItem("Induction Slow Tait");
          if (dm == 'Oates')
                    treatment_plan_warfarin_details_path.Panel(0).Select("DosingMethod").ClickItem("Induction Slow Oates");
          if (dm == 'Fast')
                    treatment_plan_warfarin_details_path.Panel(0).Select("DosingMethod").ClickItem("Induction Fast Fennerty Gedge");
          if (dm == 'Manual')
                    treatment_plan_warfarin_details_path.Panel(0).Select("DosingMethod").ClickItem("Manual Dosing");
                    
          //Acknowledge Dosing More Info window
          process_more_information(INRstarV5);  

          treatment_plan_warfarin_details_path.Panel(1).Select("TestingMethod").ClickItem("PoCT");
          treatment_plan_warfarin_details_path.Panel(2).Select("MaxReview").ClickItem("70 Days");
          
          var tablet_selection_path = add_treatment_plan_tablet_selection();
                                     
          tablet_selection_path.Panel(1).Checkbox("Tablets_Use5").ClickChecked(true);
          tablet_selection_path.Panel(2).Checkbox("Tablets_Use3").ClickChecked(true);
          tablet_selection_path.Panel(3).Checkbox("Tablets_Use1").ClickChecked(true);
          tablet_selection_path.Panel(4).Checkbox("Tablets_UseHalf").ClickChecked(true);
          tablet_selection_path.Panel(5).Checkbox("Tablets_UseSplit").ClickChecked(true);
          }
           if (drug != 'W')
            {   
             treatment_plan_area.Panel(2).Select("DrugId").ClickItem(drug);
             treatment_plan_area.Panel(3).Select("TreatmentDuration").ClickItem(td);
            }
        var buttons_path = add_treatment_plan_button();
        buttons_path.SubmitButton("AddPatientTreatmentPlan").Click();     
        WaitSeconds(2);       
       }  
     } 
   catch(e)
   {
    Log.Warning('Adding a TP FAILED Exception Occured = ' + e);  
   }
}
//--------------------------------------------------------------------------------
function edit_treatment_plan(dm)
{
  var INRstarV5 = INRstar_base(); 
  Goto_Patient_TreatmentPlan_Edit_Existing_Plan();
  
  var treatment_plan_warfarin_details = edit_treatment_plan_warfarin_details_path();
          
    if (dm == 'Coventry')
              treatment_plan_warfarin_details.Panel(0).Select("DosingMethod").ClickItem("Coventry Maintenance");
    if (dm == 'Hillingdon')
              treatment_plan_warfarin_details.Panel(0).Select("DosingMethod").ClickItem("Hillingdon Maintenance");
    if (dm == 'Tait')
              treatment_plan_warfarin_details.Panel(0).Select("DosingMethod").ClickItem("Induction Slow Tait");
    if (dm == 'Oates')
              treatment_plan_warfarin_details.Panel(0).Select("DosingMethod").ClickItem("Induction Slow Oates");
    if (dm == 'Fast')
              treatment_plan_warfarin_details.Panel(0).Select("DosingMethod").ClickItem("Induction Fast Fennerty Gedge");
    if (dm == 'Manual')
              treatment_plan_warfarin_details.Panel(0).Select("DosingMethod").ClickItem("Manual Dosing");
                    
  // Acknowledge Dosing More Info window
  var more_info = process_more_information(INRstarV5);  

  var buttons = edit_treatment_plan_button_path();       
  buttons.Button("UpdatePatientTreatmentPlan").Click();
  
  return more_info;  
} 
//--------------------------------------------------------------------------------
function edit_treatment_plan_diagnosis()
{
  var INRstarV5 = INRstar_base(); 
  Goto_Patient_TreatmentPlan_Edit_Existing_Plan();
  var edit_treatment_plan = edit_treatment_plan_path();
  
  //Diagnosis
  var data_before = edit_treatment_plan.Panel(1).Select("DiagnosisSelected").wText;
  edit_treatment_plan.Panel(1).Select("DiagnosisSelected").ClickItem((Math.random()*20)+1);
  var data_after = edit_treatment_plan.Panel(1).Select("DiagnosisSelected").wText;
  
  //Check data is now different
  while (data_before==data_after)
  {
    edit_treatment_plan.Panel(1).Select("DiagnosisSelected").ClickItem((Math.random()*20)+1);
    var data_after = edit_treatment_plan.Panel(3).Select("TreatmentDuration").wText;
  } 
  Log.Message('This is data before amendment = // ' + data_before + ' //' + ' this is data after amendment = ' + '// ' + data_after + ' //')
  
  edit_treatment_plan.Panel(2).Select("DrugId").ClickItem('Warfarin');
  
  var buttons = edit_treatment_plan_button_path();       
  buttons.Button("UpdatePatientTreatmentPlan").Click(); 
}
//--------------------------------------------------------------------------------
function edit_all_fields_treatment_plan_with_treatment()
{
//This is for fields that are available with a treatment, when we need to do without a treatment this will need to be refactored a bit to work slightly differently
//This function will read in the existing field, amend the data and check the data is then different, if the data is the same after the edit then re-run the change until it is different

  var INRstarV5 = INRstar_base(); 
  Goto_Patient_TreatmentPlan_Edit();
  var edit_treatment_plan = edit_treatment_plan_path();
  var treatment_plan_warfarin_details = edit_treatment_plan_warfarin_details_path();
  var edit_treatment_plan_tab_select_path = edit_treatment_plan_tab_select();
  
  //Treatment Duration
  var data_before = edit_treatment_plan.Panel(3).Select("TreatmentDuration").wText;
  edit_treatment_plan.Panel(3).Select("TreatmentDuration").ClickItem((Math.random()*9)+1);
  process_confirm_sub('','Please Confirm');
  var data_after = edit_treatment_plan.Panel(3).Select("TreatmentDuration").wText;
  
  //Check data is now different
  while (data_before==data_after)
  {
    edit_treatment_plan.Panel(3).Select("TreatmentDuration").ClickItem((Math.random()*9)+1);
    process_confirm_sub('','Please Confirm');
    var data_after = edit_treatment_plan.Panel(3).Select("TreatmentDuration").wText;
  } 
  Log.Message('This is data before amendment = // ' + data_before + ' //' + ' this is data after amendment = ' + '// ' + data_after + ' //')
  
  //Target INR
  var data_before = treatment_plan_warfarin_details.Panel("DiagnosisDetails").Panel(0).Select("TargetINR").wText;
  treatment_plan_warfarin_details.Panel("DiagnosisDetails").Panel(0).Select("TargetINR").ClickItem((Math.random()*28)+1);
  process_confirm_sub('','Please Confirm');
  var data_after = treatment_plan_warfarin_details.Panel("DiagnosisDetails").Panel(0).Select("TargetINR").wText;
  
  //Check data is now different
  while (data_before==data_after)
  {
    treatment_plan_warfarin_details.Panel("DiagnosisDetails").Panel(0).Select("TargetINR").ClickItem((Math.random()*28)+1);
    process_confirm_sub('','Please Confirm');
    var data_after = treatment_plan_warfarin_details.Panel("DiagnosisDetails").Panel(0).Select("TargetINR").wText;
  } 
  Log.Message('This is data before amendment = // ' + data_before + ' //' + ' this is data after amendment = ' + '// ' + data_after + ' //')
  
  //Dosing Method
  var data_before = treatment_plan_warfarin_details.Panel(0).Select("DosingMethod").wText;
  treatment_plan_warfarin_details.Panel(0).Select("DosingMethod").ClickItem((Math.random()*3)+1);
  var more_info = process_more_information(INRstarV5);
  var data_after = treatment_plan_warfarin_details.Panel(0).Select("DosingMethod").wText;
  
  //Check data is now different
  while (data_before==data_after)
  {
    treatment_plan_warfarin_details.Panel(0).Select("DosingMethod").ClickItem((Math.random()*3)+1);
    var more_info = process_more_information(INRstarV5);
    var data_after = treatment_plan_warfarin_details.Panel(0).Select("DosingMethod").wText;
  } 
  Log.Message('This is data before amendment = // ' + data_before + ' //' + ' this is data after amendment = ' + '// ' + data_after + ' //')

  //Testing Method
  var data_before = treatment_plan_warfarin_details.Panel(1).Select("TestingMethod").wText;
  treatment_plan_warfarin_details.Panel(1).Select("TestingMethod").ClickItem("PoCT");
  var data_after = treatment_plan_warfarin_details.Panel(1).Select("TestingMethod").wText;
  
  //Check data is now different
  while (data_before==data_after)
  {
    treatment_plan_warfarin_details.Panel(1).Select("TestingMethod").ClickItem("Lab");
    var data_after = treatment_plan_warfarin_details.Panel(1).Select("TestingMethod").wText;
  } 
  Log.Message('This is data before amendment = // ' + data_before + ' //' + ' this is data after amendment = ' + '// ' + data_after + ' //')
  
  //Max Review
  var data_before = treatment_plan_warfarin_details.Panel(2).Select("MaxReview").wText;
  treatment_plan_warfarin_details.Panel(2).Select("MaxReview").ClickItem((Math.random()*69)+1);
  var data_after = treatment_plan_warfarin_details.Panel(2).Select("MaxReview").wText;
  
  //Check data is now different
  while (data_before==data_after)
  {
    treatment_plan_warfarin_details.Panel(2).Select("MaxReview").ClickItem((Math.random()*69)+1);
    var data_after = treatment_plan_warfarin_details.Panel(2).Select("MaxReview").wText;
  } 
  Log.Message('This is data before amendment = // ' + data_before + ' //' + ' this is data after amendment = ' + '// ' + data_after + ' //')

  //Tablet Selection
  var data_before = edit_treatment_plan_tab_select_path.Panel(1).Checkbox("Tablets_Use5").Checked;
  edit_treatment_plan_tab_select_path.Panel(1).Checkbox("Tablets_Use5").ClickChecked(true);
  var data_after = edit_treatment_plan_tab_select_path.Panel(1).Checkbox("Tablets_Use5").Checked;
  
  //Check data is now different
  while (data_before==data_after)
  {
    edit_treatment_plan_tab_select_path.Panel(1).Checkbox("Tablets_Use5").ClickChecked(false);
    var data_after = edit_treatment_plan_tab_select_path.Panel(1).Checkbox("Tablets_Use5").Checked;
  } 
  Log.Message('This is data before amendment = // ' + data_before + ' //' + ' this is data after amendment = ' + '// ' + data_after + ' //')
   
  //Commit changes
  var buttons = edit_treatment_plan_button_path();       
  buttons.Button("UpdatePatientTreatmentPlan").Click(); 
} 
//--------------------------------------------------------------------------------
function is_tp_date_picker_active()
{
  Goto_Patient_TreatmentPlan_Edit();
  var edit_treatment_plan = edit_treatment_plan_path();
  var startDate = edit_treatment_plan.Panel(0).Textbox("Start");
    
    if (startDate.className !== "DateInputPopUp hasDatepicker") 
    {
      Log.Message("Start date is disabled");
      return false;
    }
       else 
       {
         Log.Message("Start date can be edited - Field PASS");
         return true;
       }
}
//--------------------------------------------------------------------------------
function add_treatment_plan_drug_warning_checker(drug,exp_warn_mess)
{
 try
 {
  var INRstarV5 = INRstar_base();    
  
  Goto_Patient_TreatmentPlan_Add_more_1_treatmentPlan(); 
  var treatment_plan_area = add_treatment_plan_main_section_path();
        
  treatment_plan_area.Panel(1).Select("DiagnosisSelected").ClickItem("Atrial fibrillation");
  WaitSeconds(2);
  treatment_plan_area.Panel(2).Select("DrugId").ClickItem(drug);     
  
  var pop_up_warning_message_path = pop_up_warning_message();
  WaitSeconds(1);
  var actual_warn_mess = pop_up_warning_message_path.contentText; 
  WaitSeconds(2);
  
  Log.Message(actual_warn_mess)
   
     if (actual_warn_mess==exp_warn_mess)
       {
        WaitSeconds(1);
        Log.Message('The warning text exists' + ' / This is the expected / ' + exp_warn_mess + ' / This is the actual / ' + actual_warn_mess );
        var pop_up_button_path = ok_error_pop_up_buttons();
        pop_up_button_path.Click();
        return true; 
       } 
        else 
        {
        Log.Message('Message was displayed but the text did not match the expected result it was ' + actual_warn_mess);
        var pop_up_button_path = ok_error_pop_up_buttons();
        pop_up_button_path.Click();
        return false;
        }
 }
   catch(e)
   {
     Log.Warning('There was exception checking the drug warning pop up, exception was = ' + (e))
   }  
} 
//--------------------------------------------------------------------------------
function new_tp_popup_checker(exp_err_mess)
{
  var INRstarV5 = INRstar_base();    
  Goto_Patient_TreatmentPlan();
  var new_treatment_plan_button = new_treatment_plan_button_path();
  new_treatment_plan_button.Click();
  process_button(INRstarV5, "Confirmation Required", "Confirm");
  
  var pop_up_message = tp_popup_checker(exp_err_mess);
   
  return pop_up_message; 

} 
//--------------------------------------------------------------------------------
function get_treatment_plan_single_field(data)
{
  Goto_Patient_TreatmentPlan();
  var clinical_warfarin_details_path = clinical_warfarin_details();
  var clinical_tp_details_path = clinical_tp_details();
  
  if(data=='dm')
  {
    var dose_method = clinical_warfarin_details_path.Panel(1).Label("DosingMethod_DetachedLabel").contentText;
    Log.Message('The dose method found was ' + dose_method);
    return dose_method;
  } 
  
  if(data=='diagnosis')
  {
    var diagnosis_name = clinical_tp_details_path.Panel(2).Label("DiagnosisName_DetachedLabel").contentText;
    Log.Message('The diagnosis method found was ' + diagnosis_name);
    return diagnosis_name;
  }
} 
//--------------------------------------------------------------------------------
function get_patient_clinical_details()
{
  //Setup at the moment to be a specific list for a test if we need to add more in then might need a new one here or slightly different approach
  
  Goto_Patient_TreatmentPlan();
  var clinical_tp_details_path = clinical_tp_details();
  var clinical_warfarin_details_path = clinical_warfarin_details();
  var clinical_tablet_select_path = clinical_tablet_select();
  
  var clinical_data_array = new Array();
  
  //Treatment Plan Section
  var duration = clinical_tp_details_path.Panel(4).Label("TreatmentDuration_DetachedLabel").contentText;
  
  //Warfarin Details
  var target_inr = clinical_warfarin_details_path.Panel(0).Label("TargetINR_DetachedLabel").contentText;
  var dosing_method = clinical_warfarin_details_path.Panel(1).Label("DosingMethod_DetachedLabel").contentText;
  var testing_method = clinical_warfarin_details_path.Panel(2).Label("TestingMethod_DetachedLabel").contentText;
  var max_review = clinical_warfarin_details_path.Panel(3).Label("MaxReview_DetachedLabel").contentText;
  
  //Tablet Selection
  var tablet_5mg = clinical_tablet_select_path.Panel(1).Checkbox("Use5").checked;
  
  clinical_data_array.push(duration,target_inr,dosing_method,testing_method,max_review,tablet_5mg); 
  
//  Log.Message(clinical_data_array); 
  return clinical_data_array;  
} 
//--------------------------------------------------------------------------------
function tp_banner_warning_checker(exp_warn_mess)
 {
   var INRstarV5 = INRstar_base();
   var tp_banner_path = tp_banner();
   var actual_warn_mess = tp_banner_path.contentText; 
   WaitSeconds(2);
  
  Log.Message(actual_warn_mess)
   
     if (actual_warn_mess.includes(exp_warn_mess))
       {
        Log.Message('The error text exists' + ' / This is the expected / ' + exp_warn_mess + ' / This is the actual / ' + actual_warn_mess );
        return true; 
       } 
        else 
        {
        Log.Warning('Message was displayed but the text did not match the expected result it was ' + actual_warn_mess)
        return false;
        }
 }
//--------------------------------------------------------------------------------
function tp_popup_checker(exp_warn_mess)
 {
   var INRstarV5 = INRstar_base();
   var pop_up_warning_message_path = pop_up_warning_message();
   var actual_warn_mess = pop_up_warning_message_path.contentText; 
   WaitSeconds(2);
  
  Log.Message(actual_warn_mess)
   
     if (actual_warn_mess.includes(exp_warn_mess))
       {
        Log.Message('The error text exists' + ' / This is the expected / ' + exp_warn_mess + ' / This is the actual / ' + actual_warn_mess );
        return true; 
       } 
        else 
        {
        Log.Warning('Message was displayed but the text did not match the expected result it was ' + actual_warn_mess)
        return false;
        }
 }
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------