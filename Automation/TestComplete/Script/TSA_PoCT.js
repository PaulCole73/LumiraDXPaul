//USEUNIT Generic_Functions
//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT Navigate_Patient
//USEUNIT V5_Common_Batch
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function tsa_poct_create_poct_batch(batch_numbers, batches_to_add)
{
  var poct_details = new Array();
  var batch_nos = new Array(); 

  if(batches_to_add == null)
  {
    batches_to_add = 1;
  }
  if(batch_numbers == null)
  {
    batch_nos = get_poct_batch_numbers();
  }
  else
  {
    batch_nos = batch_numbers;
  }

  for(var i = 1; i <= batches_to_add; i++)
  {
    var add_poct_button = options_poct_buttons().Panel(1).Button("AddPoCTBatch").Click();
    var batch_no_textbox = options_poct_form().Panel(0).Textbox("BatchNumber");
    var options_poct_form_path = options_poct_form(); 
  
    do
    {
      var is_batch_unique = false;
      var batch_text = aqConvert.DateTimeToStr(aqDateTime.Today()) + "_" + i + "_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
      
      for(var j = 0; j < batch_nos.length; j++)
      {
        if(batch_text != batch_nos[j])
        { 
          is_batch_unique = true;
        }
      }
    }while (is_batch_unique == false);
    
    batch_no_textbox.Text = batch_text;
    
    var date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (+90)));
    
    var w_day = aqString.SubString(date,0,2);
    var w_mth = aqConvert.StrToInt(aqString.SubString(date,3,2));
    var w_yr = aqString.SubString(date,6,4);
      
    options_poct_form().Panel(1).Image("calendar_png").Click();
      
    w_datepicker = INRstar_base().Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
    select_day(w_day, w_datepicker);
    
    var expiry_date = options_poct_form_path.Panel(1).Textbox("ExpiryDate").Text;
    var active = true;
    
    poct_details.push(batch_text, expiry_date, active);
    
    options_poct_form().Panel(3).SubmitButton("SubmitNewPoCTBatchDetails").Click();
    
    return poct_details;
  }
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
