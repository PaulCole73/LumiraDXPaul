//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT V5_Common_Field_Tests
//--------------------------------------------------------------------------------
function add_iqc_result()
{
  Goto_Options_Add_IQC();
  var INRstarV5 = INRstar_base();
  var options_iqc_form_path = options_iqc_form();
  
  //Populate the form based on values passed in
  options_iqc_form_path.Panel(0).Textbox("Date").Text;
  options_iqc_form_path.Panel(1).Textbox("BatchNumber").Text = "Batch" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
  
  //Setting the expiry date
  var exp_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (+7)))
  options_iqc_form_path.Panel(2).Image("calendar_png").Click();
  
  var w_yr = aqString.SubString(exp_date,6,4);
  var w_mth = aqConvert.StrToInt(aqString.SubString(exp_date,3,2));
  var w_day = aqString.SubString(exp_date,0,2);
   
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, datepicker);
  
  options_iqc_form_path.Panel(3).Select("LowerBound").ClickItem('0.8');
  options_iqc_form_path.Panel(4).Select("UpperBound").ClickItem('4.8');
  options_iqc_form_path.Panel(5).Select("Result").ClickItem('2.5'); 
  options_iqc_form_path.Panel(6).Textbox("MachineId").Text = "Mac_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
  
  //Add the data to array so I can compare after it has been saved
  var date = options_iqc_form_path.Panel(0).Textbox("Date").Text;
  var batch_number = options_iqc_form_path.Panel(1).Textbox("BatchNumber").Text;
  var expiry_date = options_iqc_form_path.Panel(2).Textbox("ExpiryDate").Text;
  var lower_inr = '0.8'
  var upper_inr = '4.8'
  var inr = '2.5'
  var machine_id = options_iqc_form_path.Panel(6).Textbox("MachineId").Text;
  
  var data = new Array()
  
  data.push(date,batch_number,expiry_date,lower_inr,upper_inr,inr,machine_id);

  Log.Message(data + " This is the data being passed back before saving");
 
  var options_iqc_form_buttons_path = options_iqc_form_buttons();
  options_iqc_form_buttons_path.Panel(0).SubmitButton("AddIQCResult").Click();
   
  return data;
}
//--------------------------------------------------------------------------------
function edit_iqc_result()
{
  //At the moment this function is being used in conjunction with add iqc for regression if we need to utilise this for other tests then we need to refactor so that when we do the edit test case 
  //we are checking the data prior to edit to ensure it is different on edit. 
  
  Goto_Options_Edit_IQC();
  var INRstarV5 = INRstar_base();
  var options_iqc_form_edit_path = options_iqc_edit_form();
  
  //Populate the form based on values passed in
  
  //Setting the date
  var date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-2)))
  options_iqc_form_edit_path.Panel(0).Image("calendar_png").Click();
  
  var w_yr = aqString.SubString(date,6,4);
  var w_mth = aqConvert.StrToInt(aqString.SubString(date,3,2));
  var w_day = aqString.SubString(date,0,2);
   
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, datepicker);
  
//  options_iqc_form_edit_path.Panel(0).Textbox("Date").Text;
  options_iqc_form_edit_path.Panel(1).Textbox("BatchNumber").Text = "Batch" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
  
  //Setting the expiry date
  var exp_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (+14)))
  options_iqc_form_edit_path.Panel(2).Image("calendar_png").Click();
  
  var w_yr = aqString.SubString(exp_date,6,4);
  var w_mth = aqConvert.StrToInt(aqString.SubString(exp_date,3,2));
  var w_day = aqString.SubString(exp_date,0,2);
   
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, datepicker);
  
  //Other fields
  options_iqc_form_edit_path.Panel(3).Select("LowerBound").ClickItem('0.9');
  options_iqc_form_edit_path.Panel(4).Select("UpperBound").ClickItem('4.9');
  options_iqc_form_edit_path.Panel(5).Select("Result").ClickItem('2.6'); 
  options_iqc_form_edit_path.Panel(6).Textbox("MachineId").Text = "Mac_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
  
  //Add the data to array so I can compare after it has been saved
  var date = options_iqc_form_edit_path.Panel(0).Textbox("Date").Text;
  var batch_number = options_iqc_form_edit_path.Panel(1).Textbox("BatchNumber").Text;
  var expiry_date = options_iqc_form_edit_path.Panel(2).Textbox("ExpiryDate").Text;
  var lower_inr = '0.9'
  var upper_inr = '4.9'
  var inr = '2.6'
  var machine_id = options_iqc_form_edit_path.Panel(6).Textbox("MachineId").Text;
  
  var data = new Array()
  
  data.push(date,batch_number,expiry_date,lower_inr,upper_inr,inr,machine_id);

  Log.Message(data + " This is the data being passed back before saving on edit");
 
  var options_iqc_edit_form_buttons_path = options_iqc_edit_form_buttons();
  options_iqc_edit_form_buttons_path.Panel(0).SubmitButton("UpdateIQCResult").Click();
   
  return data;
} 
//--------------------------------------------------------------------------------
function delete_iqc_result()
{
  Goto_Admin_IQC();
  var INRstarV5 = INRstar_base();
  var options_iqc_table_path = options_iqc_table();
  var delete_button = options_iqc_table_path.Cell(1, 8).Button("DeleteIQC");
  
  delete_button.Click();
  process_confirm_button_IQC();
  
  WaitSeconds(2)
}
//--------------------------------------------------------------------------------
function delete_iqc_result_if_exists()
{
 Goto_Admin_IQC();
 var iqc_table_path = options_iqc_table();
  if(iqc_table_path.Cell(1, 0).contentText!='There are no IQCs recorded')
  {
//    Goto_Admin_IQC();
    var INRstarV5 = INRstar_base();
    var options_iqc_table_path = options_iqc_table();
    var delete_button = options_iqc_table_path.Cell(1, 8).Button("DeleteIQC");
  
      while(delete_button.Exists == true)
      {
        delete_button.Click();
        process_confirm_button_IQC();
        WaitSeconds(2)
      } 
  } 
  else 
  {
      Log.Message('No IQC results exist')
  }
}
//--------------------------------------------------------------------------------


 