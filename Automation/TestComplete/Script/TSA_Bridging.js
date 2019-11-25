//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function get_new_bridging_record_button_state()
{
  var state;
  patient_clinical_tab().Link("PatientBridgingTab").Click();
  state = patient_treatment_bridging_tab().Panel(0).Button("New_Bridging_Record").enabled;
  
  return state;
}
//--------------------------------------------------------------------------------
function validate_bridging_tab_exists(drug)
{
  if(drug == null)
  {
    drug = "Warfarin";
  }
  
  Goto_Patient_Treatments_Tab();
  
  var tab = INRstar_base().NativeWebObject.Find("idStr", "PatientBridgingTab");
  if(tab.Exists == true && drug == "Warfarin")
  {
    return true;
  }
  else if(tab.Exists != true && drug != "Warfarin")
  {
    return true;
  }
  else
  {
    return false;
  }
}
//--------------------------------------------------------------------------------
function add_bridging_record(procedure_date)
{
  Goto_Create_Bridging_Record();
  
  bridging_schedule_form().Panel("ProcedureDetailsContent").Panel(2).Select("ProcedureDetails_TreatmentType").ClickItem(1);
  bridging_schedule_form().Panel("ProcedureDetailsContent").Panel(3).Select("ProcedureDetails_LMWH").ClickItem(1);
  
  var date_path = bridging_schedule_form().Panel("BridgingScheduleDetails");
  var date = aqConvert.DateTimeToFormatStr(procedure_date, "%d/%m/%Y");
  
  date_picker(date_path, date);
  
  patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("CreateBridgingSchedulesForm").Panel(0).SubmitButton("CreateScheduleButton").Click();
}
//--------------------------------------------------------------------------------
function remove_bridging_table_rows(no_of_rows, table_type)
{
  var INRstarV5 = INRstar_base();
  var id_str; 
  
  if(table_type = "pre-op")
  {
    id_str = "placeholder"; 
  }
  else if(table_type = "procedure")
  {
    id_str = "placeholder"; 
  }
  else if(table_type = "post_discharge")
  {
    id_str = "placeholder"; 
  }
  
  var delete_button = INRstarV5.NativeWebObject.Find("idStr", id_str);
  if(delete_button.Exists == true)
  {
    for(var i = 0; i < no_of_rows; i++)
    {
      delete_button = INRstarV5.NativeWebObject.Find("idStr", id_str);
      if(delete_button.Exists == true)
      {
        delete_button.Click();
      }
    }
  }
}
//--------------------------------------------------------------------------------
function add_bridging_table_rows(no_of_rows, table_type)
{
  for(var i = 0; i < no_of_rows; i++)
  {
    if(table_type = "pre-op")
    {
      bridging_schedule_add_button().Click();
    }
    else if(table_type = "procedure")
    {
      //add_button.Click();
    }
    else if(table_type = "post-discharge")
    {
      //add_button.Click();
    }
  }
}
//--------------------------------------------------------------------------------
function validate_table(rows_to_check, table_type, data_array)
{
  var result_set = new Array();
  var row_data = new Array();
  var expected_data = new Array();
  var row_index;
  var table;
  var counter = 0;
  
  if(table_type == "pre-op")
  {
    table = bridging_schedule_preop_table();
  }
  else if(table_type = "procedure")
  {
    table = bridging_schedule_procedure_table();
  }
  else if(table_type = "post-discharge")
  {
    table = bridging_schedule_post_discharge_table();
  }
  
  for(var i = table.rowCount - 1; i >= (table.rowCount - rows_to_check); i--)
  {
    expected_data.length = 0;
    row_index = (counter*7);
    row_data = get_bridging_schedule_table_row(i, table_type);
    
    for(var j = 0; j < 7; j++)
    {
      var temp = data_array[(row_index + j)];
      expected_data.push(temp);
    }
    
    counter++;
    var result_set_1 = checkArrays(row_data, expected_data);
    result_set.push(result_set_1);
  }
  
  return result_set;
}
//--------------------------------------------------------------------------------
function set_table_data(rows_to_set, data_array, table_type)
{
  var output = new Array();
  var val = data_array[0];

  if(table_type = "pre-op")
  {
    for(var i = 0; i < rows_to_set; i++)
    {
      for(var j = 0; j < data_array.length; j++)
      {
        output.push(data_array[j]);
      }
    }
    for(var i = 0; i < rows_to_set; i++)
    {
      var date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(val, -(i+1)), "%d-%b-%Y")
      var difference = "-" + (i+1);
      output[i*7] = date;
      output[(i*7) + 1] = difference; 
    }
  }
  else if(table_type = "procedure")
  {
    for(var i = 0; i < rows_to_set; i++)
    {
      for(var j = 0; j < data_array.length; j++)
      {
        output.push(data_array[j]);
      }
    }
    for(var i = 0; i < rows_to_set; i++)
    {
      var date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(val, i), "%d-%b-%Y")
      var difference = "+" + i;
      output[i*7] = date;
      output[(i*7) + 1] = difference; 
    }
  }
  else if(table_type = "post-discharge")
  {
    var proc_row_count = bridging_schedule_procedure_table().rowCount;
    proc_row_count -= 2;
    
    for(var i = 0; i < rows_to_set; i++)
    {
      for(var j = 0; j < data_array.length; j++)
      {
        output.push(data_array[j]);
      }
    }
    for(var i = proc_row_count; i < (proc_row_count + rows_to_set); i++)
    {
      var date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(val, i), "%d-%b-%Y")
      var difference = "+" + i;
      
      output[i*7] = date;
      output[(i*7) + 1] = difference; 
    }
  }
  
  return output;
}



























