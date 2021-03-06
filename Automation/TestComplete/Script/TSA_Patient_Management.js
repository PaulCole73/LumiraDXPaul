//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT V5_Common_Batch
//USEUNIT Generic_Functions
//USEUNIT TSA_Patient

//--------------------------------------------------------------------------------
function deactivate_patient()
{
 WaitSeconds(1);
 Goto_Patient_Management();
 WaitSeconds(1);  
 var pat_managment_tab_status_buttons_path = pat_managment_tab_status_buttons();
 pat_managment_tab_status_buttons_path.Button("De_activatePatientButton").Click();
 process_confirm_sub('','De-Activating a patient');
 
 var patient_management_deactivate_form_path = patient_management_deactivate_form();
 patient_management_deactivate_form_path.Panel("DeactivatingReason").Panel("DeactivatingReasonList").Select("InactiveReason").ClickItem(5);
 
 patient_management_deactivate_form_path.Panel(1).SubmitButton("Confirm").Click();
} 
//--------------------------------------------------------------------------------
function deactivating_patient_confirmation_checker(exp_err_mess)
{
  var INRstarV5 = INRstar_base(); 
  var deactivate_confirmation_message_path = pat_management_status_confirmation_message();
  var actual_err_mess = deactivate_confirmation_message_path.contentText; 
  
  Log.Message(actual_err_mess)
   
     if (exp_err_mess==actual_err_mess)
       {
        Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess );
        return true; 
       } 
        else 
        {
        Log.Warning('Message was displayed but the text did not match the expected result it was ' + actual_err_mess)
        return false;
        }
} 
//--------------------------------------------------------------------------------
function deactivating_patient_banner_warning_checker(exp_err_mess)
{
  var INRstarV5 = INRstar_base(); 
  var deactivate_warning_message_path = deactivate_warning_message();
  var err_box = INRstarV5.NativeWebObject.Find("idStr", "DeactivateMessages");
  
  if (err_box.Exists == false)
  {
    Log.Message("There were no Error messages displayed on the page");
    return false;
  }

  var actual_err_mess = deactivate_warning_message_path.contentText; 
   
  if (err_box.Exists)
  {
     if (exp_err_mess==actual_err_mess)
       {
        Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess );
        return true; 
       } 
        else Log.Warning('Message was displayed but the text did not match the expected result it was ' + actual_err_mess)
        return false;
  }
} 
//--------------------------------------------------------------------------------
function deactivating_patient_banner_error_checker(exp_err_mess)
{
  var INRstarV5 = INRstar_base(); 
  var deactivate_error_message_path = deactivate_error_message();
  var err_box = INRstarV5.NativeWebObject.Find("idStr", "DeactivateMessages");
  
   if (err_box.Exists == false)
  {
    Log.Message("There were no Error messages displayed on the page");
    return false;
  }

  var actual_err_mess = deactivate_error_message_path.contentText; 
   
  if (err_box.Exists)
  {
     if (exp_err_mess==actual_err_mess)
       {
        Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess );
        return true; 
       } 
        else Log.Warning('Message was displayed but the text did not match the expected result it was ' + actual_err_mess)
        return false;
  }
} 
//--------------------------------------------------------------------------------
function suspend_patient_banner_error_checker(exp_err_mess)
{
  var INRstarV5 = INRstar_base(); 
  var suspend_error_message_path = suspend_error_message();
  var err_box = INRstarV5.NativeWebObject.Find("idStr", "SuspendPatient");
  
   if (err_box.Exists == false)
  {
    Log.Message("There were no Error messages displayed on the page");
    return false;
  }

  var actual_err_mess = suspend_error_message_path.contentText; 
   
  if (err_box.Exists)
  {
     if (exp_err_mess==actual_err_mess)
       {
        Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess );
        return true; 
       } 
        else Log.Warning('Message was displayed but the text did not match the expected result it was ' + actual_err_mess)
        return false;
  }
} 
//--------------------------------------------------------------------------------
function check_tp_page_displayed_on_activate()
{
 Goto_Patient_Management();
 var pat_managment_tab_status_buttons_path = pat_managment_tab_status_buttons();
 pat_managment_tab_status_buttons_path.Button("ActivatePatientButton").Click();
 
 var patient_clinical_tab_path = patient_clinical_tab()
 var tab_heading = patient_clinical_tab_path.Link("PatientTreatmentPlanTab").contentText;
 Log.Message(tab_heading)
 
 if(tab_heading=='Clinical Details')
 {
   Log.Message('Treatment plan tab is displayed with heading ' + tab_heading)
   return true;
 } 
 else
 { 
 Log.Message('Treatment plan tab not displayed')
 return false;
 }
} 
//--------------------------------------------------------------------------------
function check_deactivate_warning()
{
 Goto_Patient_Management();  
 var pat_managment_tab_status_buttons_path = pat_managment_tab_status_buttons();
 pat_managment_tab_status_buttons_path.Button("De_activatePatientButton").Click();
 
 var wording_check = popup_warning_checker('De-activating a patient should only be done if they have completed their treatment and are no longer taking anticoagulant drugs.' +
 '\nIt should not be done if the patient is simply going to be away for a period of time (eg on holiday or admitted to hospital etc).')
 
 Log.Message(wording_check)
 
 return wording_check;
} 
//--------------------------------------------------------------------------------
function reactivate_patient(drug, dm, start_date)
{
  var INRstarV5 = INRstar_base();    
  WaitSeconds(1);
  Goto_Patient_Management();
  WaitSeconds(1);
  
  var pat_managment_tab_status_buttons_path = pat_managment_tab_status_buttons();
  pat_managment_tab_status_buttons_path.Button("ActivatePatientButton").Click(); 
  var treatment_plan_area = add_treatment_plan_main_section_activate_path();
  
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
          treatment_plan_area.Panel(2).Select("DrugId").ClickItem("Warfarin");

          var treatment_plan_warfarin_details_path = add_treatment_plan_warfarin_activate_details();  
          
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
                    
          // Acknowledge Dosing More Info window
          process_more_information(INRstarV5);  

          treatment_plan_warfarin_details_path.Panel(1).Select("TestingMethod").ClickItem("PoCT");
          treatment_plan_warfarin_details_path.Panel(2).Select("MaxReview").ClickItem("70 Days");
          
          var tablet_selection_path = add_treatment_plan_activate_tablet_selection();
          
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
      
          var buttons_path = add_treatment_plan_activate_button(); 
          buttons_path.SubmitButton("ActivatePatient").Click();
                    
}   
//--------------------------------------------------------------------------------
function activating_patient_confirmation_checker(exp_err_mess)
{
  var INRstarV5 = INRstar_base(); 
  var activate_confirmation_message_path = activate_confirmation_message();
  var actual_err_mess = activate_confirmation_message_path.contentText; 
  
  Log.Message(actual_err_mess)
   
     if (exp_err_mess==actual_err_mess)
       {
        Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess );
        return true; 
       } 
        else 
        {
        Log.Warning('Message was displayed but the text did not match the expected result it was ' + actual_err_mess + 'and you passed in ' + exp_err_mess)
        return false;
        }
}
//--------------------------------------------------------------------------------
function activating_patient_error_checker(exp_err_mess)
{
  var INRstarV5 = INRstar_base(); 
  var activate_error_banner_path = activate_error_banner();
  var actual_err_mess = activate_error_banner_path.contentText; 
  
  Log.Message(actual_err_mess)
   
     if (exp_err_mess==actual_err_mess)
       {
        Log.Message('The error text exists' + ' / This is the expected / ' + exp_err_mess + ' / This is the actual / ' + actual_err_mess);
        return true; 
       } 
        else 
        {
        Log.Warning('Message was displayed but the text did not match the expected result it was ' + actual_err_mess + 'and you passed in ' + exp_err_mess)
        return false;
        }
} 
//--------------------------------------------------------------------------------
function suspend_patient_confirmation_checker(exp_warn_mess)
{
  var INRstarV5 = INRstar_base(); 
  var suspend_confirmation_message_path = pat_management_status_confirmation_message();
  WaitSeconds(2);
  var actual_warn_mess = suspend_confirmation_message_path.contentText; 
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
function patient_confirmation_checker(exp_warn_mess)
{
  var INRstarV5 = INRstar_base(); 
  var reg_practice_confirmation_path = reg_practice_confirmation();
  var actual_warn_mess = reg_practice_confirmation_path.contentText; 
  
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
function add_manual_self_test_group()
{
  Goto_Patient_Management_Edit();
  
  var patient_management_groups_path = patient_management_groups();
  patient_management_groups_path.Panel(3).Checkbox("SelfTester").ClickChecked(true);
  
  var manual_self_testing_pop_up_buttons_path = ok_error_pop_up_buttons();
  manual_self_testing_pop_up_buttons_path.Button(1).TextNode(0).Click();
  
  var patient_management_buttons_path = patient_management_buttons();
  patient_management_buttons_path.SubmitButton("UpdatePatientManagementDetails").Click();
} 
//--------------------------------------------------------------------------------
function check_self_test_warning()
{
  Goto_Patient_Management_Edit();
  
  var patient_management_groups_path = patient_management_groups();
  patient_management_groups_path.Panel(3).Checkbox("SelfTester").ClickChecked(true);

  var wording_check = popup_warning_checker('I confirm that this patient has received sufficient training and is competent to perform INR self-testing.');
    
  var manual_self_testing_pop_up_buttons_path = ok_error_pop_up_buttons();
  manual_self_testing_pop_up_buttons_path.Button(0).TextNode(0).Click();
  
  return wording_check;
} 
//--------------------------------------------------------------------------------
function check_suspend_errors()
{
  Goto_Patient_Management();
  var pat_managment_tab_status_buttons_path = pat_managment_tab_status_buttons();
  pat_managment_tab_status_buttons_path.Button("SuspendPatientButton").Click();
  
  var suspend_pat_form_buttons_path = suspend_pat_form_buttons();
  suspend_pat_form_buttons_path.SubmitButton("Confirm").Click();
  
  var error_check = suspend_patient_banner_error_checker('Please select a Suspended Until date\nPlease select a Reason for suspension');
  
  suspend_pat_form_buttons_path.Button("CancelSuspendingPatient").Click();
  
  return error_check;
} 
//--------------------------------------------------------------------------------
function suspend_patient()
{
  Goto_Patient_Management();
  var INRstarV5 = INRstar_base(); 
  
  var pat_managment_tab_status_buttons_path = pat_managment_tab_status_buttons();
  pat_managment_tab_status_buttons_path.Button("SuspendPatientButton").Click();
  
  var suspend_pat_form_path = suspend_pat_form();
  
  //Suspended Until
  suspend_pat_form_path.Panel(0).Image("calendar_png").Click();     
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  var expiry_date = (aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (+7)))); 
    
  var w_yr = aqString.SubString(expiry_date,6,4);
  var w_mth = aqConvert.StrToInt(aqString.SubString(expiry_date,3,2));
  var w_day = aqString.SubString(expiry_date,0,2);
           
  datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, datepicker);
      
  //Suspension Reason
  suspend_pat_form_path.Panel(1).Select("SuspensionReasonId").ClickItem(2);
  
  suspend_pat_form_path.Panel(3).SubmitButton("Confirm").Click(); 
} 
//--------------------------------------------------------------------------------
function unsuspend_patient(nhs_num)
{
  Goto_Patient_Management();
  
  var pat_managment_tab_status_buttons_path = pat_managment_tab_status_buttons();
  pat_managment_tab_status_buttons_path.Button("UnsuspendPatientButton").Click();
} 
//--------------------------------------------------------------------------------
function change_reg_practice(prac_name)
{
 Goto_Change_Registered_Location();

 var pat_management_reg_practice_path = pat_management_reg_practice();
 
 pat_management_reg_practice_path.Panel(0).Select("SearchType").ClickItem('Name');
 pat_management_reg_practice_path.Panel(1).Textbox("SearchCriteria").Text = prac_name
 
 pat_management_reg_practice_path.Panel(1).SubmitButton("Search").Click()
 
 var reg_practice_table_path = reg_practice_table();
 var row_count = reg_practice_table_path.rowcount;
 
 for(i=1; i<row_count; i++) 
  {
     if(reg_practice_table_path.Cell(i, 0).contentText==prac_name)
     {           
        reg_practice_table_path.Cell(i, 0).Label("Name_DetachedLabel").Click(); 
      i = row_count
     }
       else 
       {
         Log.Warning('Location was not found');
       } 
  }
  var pat_management_change_loc_path = pat_management_change_loc();
  
  pat_management_change_loc_path.SubmitButton("btnNext").Click();
  
  var reg_practice_final_buttons_path = reg_practice_final_buttons();
  reg_practice_final_buttons_path.SubmitButton("ConfirmChangeLocationDetails").Click();
  
  process_confirm_change_location('');
} 
//--------------------------------------------------------------------------------
function change_test_practice(prac_name)
{

 Goto_Change_Testing_Location();
 WaitSeconds(2);
 
// var test_loc_confirm_pop_up_buttons_path = warning_pop_up();
// var button = test_loc_confirm_pop_up_buttons_path.Button(1);
// 
// if(button.Exists)
// {
//  button.Click();
// }
 
 var pat_management_test_practice_search_path = pat_management_test_practice_search();

 pat_management_test_practice_search_path.Select("SearchType").ClickItem('Name');
 pat_management_test_practice_search_path.Textbox("SearchCriteria").Text = prac_name
 pat_management_test_practice_search_path.SubmitButton("Search").Click()
 
 var test_practice_table_path = test_practice_table();
 var row_count = test_practice_table_path.rowcount;
 
 for(i=1; i<row_count; i++) 
  {
     if(test_practice_table_path.Cell(i, 0).contentText==prac_name)
     {           
        test_practice_table_path.Cell(i, 0).Label("Name_DetachedLabel").Click(); 
        i = row_count
     }
     else 
     {
       Log.Warning('Location was not found');
     } 
  }
  
  var pat_management_change_test_loc_path = pat_management_change_test_loc();
  pat_management_change_test_loc_path.Panel("SelectedPracticeWrapper").Button("ConfirmChangeLocationDetails").Click();
  
  var test_loc_confirm_pop_up_buttons_path = warning_pop_up();
  test_loc_confirm_pop_up_buttons_path.Button(1).Click();
} 
//--------------------------------------------------------------------------------
function change_test_practice_with_warning(prac_name)
{

 Goto_Change_Testing_Location();
 WaitSeconds(2)
 
 var test_loc_confirm_pop_up_buttons_path = warning_pop_up();
 var button = test_loc_confirm_pop_up_buttons_path.Button(1).Click();
 
 var pat_management_test_practice_search_path = pat_management_test_practice_search();

 pat_management_test_practice_search_path.Select("SearchType").ClickItem('Name');
 pat_management_test_practice_search_path.Textbox("SearchCriteria").Text = prac_name
 pat_management_test_practice_search_path.SubmitButton("Search").Click()
 
 var test_practice_table_path = test_practice_table();
 var row_count = test_practice_table_path.rowcount;
 
 for(i=1; i<row_count; i++) 
  {
     if(test_practice_table_path.Cell(i, 0).contentText==prac_name)
     {           
        test_practice_table_path.Cell(i, 0).Label("Name_DetachedLabel").Click(); 
        i = row_count
     }
     else 
     {
       Log.Warning('Location was not found');
     } 
  }
  
  var pat_management_change_test_loc_path = pat_management_change_test_loc();
  pat_management_change_test_loc_path.Panel("SelectedPracticeWrapper").Button("ConfirmChangeLocationDetails").Click();
  
  var test_loc_confirm_pop_up_buttons_path = warning_pop_up();
  test_loc_confirm_pop_up_buttons_path.Button(1).Click();
} 
//--------------------------------------------------------------------------------
function get_patient_reg_prac()
{
  Goto_Patient_Management()
  var patient_management_care_team_path = patient_management_care_team();
  var reg_prac = patient_management_care_team_path.Panel(1).Label("RegisteredSectionId_DetachedLabel").contentText;
  
  return reg_prac;
} 
//--------------------------------------------------------------------------------
function get_patient_test_prac()
{
  Goto_Patient_Management()
  var patient_management_care_team_path = patient_management_care_team();
  var test_prac = patient_management_care_team_path.Panel(0).Label("TestingSectionId_DetachedLabel").contentText;
  
  return test_prac;
} 
//--------------------------------------------------------------------------------
function check_transfer_test_location_errors()
{
   Goto_Patient_Management()
   var pat_managment_tab_preferences_buttons_path = pat_managment_tab_preferences_buttons();
   pat_managment_tab_preferences_buttons_path.Button("EditPatientTestingSectionLink").Click();
   var wording_check = popup_error_checker('This patient cannot be transferred because they have a pending treatment.')
   
   return wording_check;
} 
//--------------------------------------------------------------------------------
function check_transfer_test_location_warning()
{
   Goto_Change_Testing_Location();
   var wording_check = popup_warning_checker('This patient\'s dosing method is currently set to Induction Fast Fennerty Gedge Protocol. Are you sure you want to transfer them?')
   
   WaitSeconds(2);
   
   var test_loc_confirm_pop_up_buttons_path = warning_pop_up();
   test_loc_confirm_pop_up_buttons_path.Button(1).Click();
   
   return wording_check;
}
//--------------------------------------------------------------------------------
function accept_transfer_with_warning(messagename)
{
  Goto_Home();
  try
  {
    WaitSeconds(2);
    var home_page_messages_path = home_page_messages();
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    WaitSeconds(3);
    
    var transfer_list_table = home_page_messages_path.Panel("TransferredPatients").Table("TransferredTable");
    var row_count = transfer_list_table.rowcount;
    
    for(i=1; i<row_count; i++) 
    {
       var transfer_list_pat = transfer_list_table.Cell(i, 0).contentText;
       if(transfer_list_pat==messagename)
       { 
         while(transfer_list_table.Cell(i, 0).Link("PatientLink").VisibleOnScreen==false)
         {
         transfer_list_table.Cell(i, 0).Link("PatientLink").ScrollIntoView(true);
//       home_page_messages_path.Panel("TransferredPatients").Table("TransferredTable").Cell(1, 1).Click();
//       Aliases.INRstarWindows.BrowserForm.INRstarBrowser.Keys("[Down]");
         }       
          transfer_list_table.Cell(i, 6).Button("AcceptChangePatientTestingLocation").Click(); 
          process_confirm_change_location('');
          return true;
       }
    }
    Log.Message('Patient was not found on the list')
  }
  catch (e)
      {
       Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function accept_transfer(messagename)
{
  Goto_Home();
  try
  {
    var home_page_messages_path = home_page_messages();
    home_page_messages_path.Link("TransferredPatientHeaderLink").Click();
    WaitSeconds(2);
    
    var transfer_list_table = home_page_messages_path.Panel("TransferredPatients").Table("TransferredTable");
    var row_count = transfer_list_table.rowcount;
    
    for(i=1; i<row_count; i++) 
    {
       var transfer_list_pat = transfer_list_table.Cell(i, 0).contentText;
       if(transfer_list_pat==messagename)
       { 
         while(transfer_list_table.Cell(i, 0).Link("PatientLink").VisibleOnScreen==false)
         {
         transfer_list_table.Cell(i, 0).Link("PatientLink").ScrollIntoView(true);
//       home_page_messages_path.Panel("TransferredPatients").Table("TransferredTable").Cell(1, 1).Click();
//       Aliases.INRstarWindows.BrowserForm.INRstarBrowser.Keys("[Down]");
         }       
          transfer_list_table.Cell(i, 6).Button("AcceptChangePatientTestingLocation").Click(); 
          return true;
       }
    }
    Log.Message('Patient was not found on the list')
  }
  catch (e)
      {
       Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 

//--------------------------------------------------------------------------------
function find_patient_overdue_list(messagename)
{
  Goto_Home();
  try
  {
    WaitSeconds(3);
    var test_title = 'Patient Management - Suspending an overdue patient removes them from the overdue report'
    var home_page_messages_path = home_page_messages();
    home_page_messages_path.Link("OverduePatientHeaderLink").Click();
    WaitSeconds(3);
    
    var overdue_list_table = home_page_messages_path.Panel("OverduePatients").Table("PatientOverdueReportTable");
    var row_count = overdue_list_table.rowcount;
    
    for(i=1; i<row_count; i++) 
    {
       var overdue_list_pat = overdue_list_table.Cell(i, 0).contentText;
       if(overdue_list_pat==messagename)
       { 
         while(overdue_list_table.Cell(i, 0).Link("PatientLink").VisibleOnScreen==false)
         {
         overdue_list_table.Cell(i, 0).Link("PatientLink").ScrollIntoView(true);
         }       
          return true;
       }
    }
    Log.Message('Patient was not found on the list');
    return false;
  }
  catch (e)
      {
       Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------
function dont_find_patient_overdue_list(messagename)
{
WaitSeconds(2);
  Goto_Home();
  try
  {
    WaitSeconds(3);
    var test_title = 'Patient Management - Suspending an overdue patient removes them from the overdue report'
    var home_page_messages_path = home_page_messages();
    home_page_messages_path.Link("OverduePatientHeaderLink").Click();
    WaitSeconds(3);
    
    var overdue_list_table = home_page_messages_path.Panel("OverduePatients").Table("PatientOverdueReportTable");
    var row_count = overdue_list_table.rowcount;
    
    for(i=1; i<row_count; i++) 
    {
       var overdue_list_pat = overdue_list_table.Cell(i, 0).contentText;
       if(overdue_list_pat==messagename)
       { 
         while(overdue_list_table.Cell(i, 0).Link("PatientLink").VisibleOnScreen==false)
         {
         overdue_list_table.Cell(i, 0).Link("PatientLink").ScrollIntoView(true);
         }       
          return false;
       }
    }
    Log.Message('Patient was not found on the list');
    return true;
  }
  catch (e)
      {
       Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
       Log_Off(); 
      }
} 
//--------------------------------------------------------------------------------














