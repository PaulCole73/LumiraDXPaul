//USEUNIT Generic_Functions
//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT Navigate_Patient
//USEUNIT V5_Common_Batch
//--------------------------------------------------------------------------------
function add_poct(batch_num)
{
  Goto_Options_add_PoCT()
  var INRstarV5 = INRstar_base();
  var options_poct_form_path = options_poct_form();
  
  var batch_num_to_use=batch_num;

  //Set the batch number if not provided 
  if(batch_num_to_use=='')
  {
  batch_num_to_use = new_num_20();
  options_poct_form_path.Panel(0).Textbox("BatchNumber").Text = batch_num_to_use;
  }
   else if(batch_num_to_use!='')
   {
    batch_num_to_use = options_poct_form_path.Panel(0).Textbox("BatchNumber").Text = batch_num_to_use;
   }
  
  //Set the expiry date
  var exp_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (+14)));
  options_poct_form_path.Panel(1).Image("calendar_png").Click();
  
  var w_yr = aqString.SubString(exp_date,6,4);
  var w_mth = aqConvert.StrToInt(aqString.SubString(exp_date,3,2));
  var w_day = aqString.SubString(exp_date,0,2);
   
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, datepicker);
  
  //Get the data to pass back before saving
  var poct_data = new Array();
  var expiry_date = options_poct_form_path.Panel(1).Textbox("ExpiryDate").Text;
  var active = true;
  
  //Add to array for validation
  poct_data.push(batch_num_to_use,expiry_date,active);
  
  //Save the batch
  options_poct_form_path.Panel(3).SubmitButton("SubmitNewPoCTBatchDetails").Click();
  
  return poct_data;
} 
//--------------------------------------------------------------------------------
function edit_poct_make_active(batch_num)
{
 try
 {
   Goto_Options_Edit_PoCT()
  
 //Find my batch and update the flag to be as per what is passed in
 var options_edit_poct_table_path = options_edit_poct_table();
 var options_poct_edit_buttons_path = options_poct_edit_buttons(); 
 
 var row = options_edit_poct_table_path.rowcount;
 Log.Message(row)
 
     for(i=1; i<row; i++) 
     {
         if(options_edit_poct_table_path.Cell(i, 0).contentText==batch_num)
         {      
            var status = options_edit_poct_table_path.Cell(i, 2).Checkbox("activeBatches").checked;
            Log.Message(status + " This is before state");
      
            var checkbox = options_edit_poct_table_path.Cell(i, 2).Checkbox("activeBatches");
            checkbox.ClickChecked(true);
      
            var status = options_edit_poct_table_path.Cell(i, 2).Checkbox("activeBatches").checked;
            Log.Message(status + " this is after state");
      
            options_poct_edit_buttons_path.SubmitButton("UpdatePoCTBatch").Click();  
            return true;
         }
      } 
  }
  catch(e)
  {
    Log.Error(e.message);
  }
} 
//--------------------------------------------------------------------------------
function edit_poct_make_inactive(batch_num)
{
  Goto_Options_Edit_PoCT()
  
 //Find my batch and update the flag to be as per what is passed in
 var options_edit_poct_table_path = options_edit_poct_table();
 var options_poct_edit_buttons_path = options_poct_edit_buttons(); 
 
 var row = options_edit_poct_table_path.rowcount;
  
 for(i=1; i<row; i++) 
 {
   if(options_edit_poct_table_path.Cell(i, 0).contentText==batch_num)
   {
      options_edit_poct_table_path.Cell(i, 2).Checkbox("activeBatches").ClickChecked(false);
      options_poct_edit_buttons_path.SubmitButton("UpdatePoCTBatch").Click();
      return true;
   }
 }  
} 
//--------------------------------------------------------------------------------
function get_active_flag(batch_num)
{
 var options_poct_table_path = options_poct_table();
 
 for(i=1; i<options_poct_table_path.rowcount; i++) 
 {
   if(options_poct_table_path.Cell(i, 0).contentText==batch_num)
   {
      var flag = options_poct_table_path.Cell(i, 2).Checkbox("isActive").checked;
      return flag; 
   }
 }
} 
//--------------------------------------------------------------------------------
function get_top_poct_data()
{
 var poct_table_path = options_poct_table();
 var data_array = new Array();
 
 for(i=0;i<3;i++) 
 {
  if(i==2)
  {
   var data = poct_table_path.Cell(1, i).Checkbox("isActive").checked;
  }
  else 
    {
    var data = poct_table_path.Cell(1, i).contentText;
    } 
  data_array.push(data);
 }
 return data_array;
} 
//-----------------------------------------------------------------------------------
//Returns all the flags of the PoCT table minus the first row as this should be active
function get_poct_flag_data_minus_top_active_row()
{
 var poct_table_path = options_poct_table();
 var data_array = new Array();
 
 for(i=2; i<poct_table_path.rowcount; i++) 
 {
  var data = poct_table_path.Cell(i, 2).Checkbox("isActive").checked;
  data_array.push(data);
 } 
 return data_array;
} 
//--------------------------------------------------------------------------------
//Returns all the flags of the PoCT table
function get_all_poct_flag_data()
{
 var poct_table_path = options_poct_table();
 var data_array = new Array();
 
 for(i=2; i<poct_table_path.rowcount; i++) 
 {
  var data = poct_table_path.Cell(i, 2).Checkbox("isActive").checked;
  data_array.push(data);
 } 
 return data_array;
}
//--------------------------------------------------------------------------------
