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
function add_bridging_record(procedure_date, drug_index)
{
  Goto_Create_Bridging_Record();
  
  bridging_schedule_form().Panel("ProcedureDetailsContent").Panel(2).Select("ProcedureDetails_TreatmentType_Id").ClickItem(1);
  bridging_schedule_form().Panel("ProcedureDetailsContent").Panel(3).Select("ProcedureDetails_LMWH").ClickItem(drug_index);
  
  var date_path = bridging_schedule_form().Panel("BridgingScheduleDetails");
  var date = aqConvert.DateTimeToFormatStr(procedure_date, "%d/%m/%Y");
  
  date_picker(date_path, date);
  
  patient_treatment_bridging_tab().Form("BridgingForm").Panel("BridgingTabContent").Panel(0).SubmitButton("CreateScheduleButton").Click();
  
  WaitSeconds(2, "Waiting for bridging table...");
}
//--------------------------------------------------------------------------------
function remove_bridging_table_rows(no_of_rows, table_type)
{
  var INRstarV5 = INRstar_base();
  var id_str; 
  
  if(table_type == "pre-op")
  {
    var table = bridging_schedule_preop_table();
    for(var i = 0; i < no_of_rows; i++)
    {
      if(table.rowCount > 2)
      {
        table.Cell(2, 7).Child(0).Click();
      }
    }
  }
  else if(table_type == "procedure")
  {
    var table = bridging_schedule_procedure_table();
    for(var i = 0; i < no_of_rows; i++)
    {
      if(table.rowCount > 3)
      {
        var row_num = table.rowCount - 2;
        table.Cell(row_num, 7).Child(0).Click();
      }
    }
  }
  else if(table_type == "post-discharge")
  {
    var table = bridging_schedule_post_discharge_table();
    for(var i = 0; i < no_of_rows; i++)
    {
      if(table.rowCount > 2)
      {
        var row_num = table.rowCount - 2;
        table.Cell(row_num, 7).Child(0).Click();
      }
    }
  }
  
  WaitSeconds(2, "Waiting for row delete...");
}
//--------------------------------------------------------------------------------
function add_bridging_table_rows(no_of_rows, table_type)
{
  for(var i = 0; i < no_of_rows; i++)
  {
    if(table_type == "pre-op")
    {
      bridging_schedule_add_button().scrollIntoView();
      bridging_schedule_add_button().Click();
      WaitSeconds(1);
    }
    else if(table_type == "procedure")
    {
      bridging_schedule_procedure_table().FindChild("idStr", "ProcedureAddButton", 1).Click();
      bridging_schedule_procedure_table().Refresh();
    }
    else if(table_type == "post-discharge")
    {
      bridging_schedule_post_discharge_table().FindChild("idStr", "Post-dischargeAddButton", 1).Click();
      bridging_schedule_post_discharge_table().Refresh();
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
    row_data = get_bridging_schedule_table_row(i, table_type);
    row_index = (counter*7);
    
    for(var j = 0; j < 7; j++)
    {
      var temp = data_array[(row_index + j)];
      expected_data.push(temp);
    }
    
    Log.Message("Expected data is: " + expected_data + " ---- " + "Actual data is: " + row_data);
    
    counter++;
    var result_set_1 = checkArrays(row_data, expected_data);
    result_set.push(result_set_1);
  }
  
  var results = results_checker_are_true(result_set);
  return results;
}
//--------------------------------------------------------------------------------
function set_table_data(rows_to_set, data_array, table_type)
{
  var output = new Array();
  var val = data_array[0];

  if(table_type == "pre-op")
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
  else if(table_type == "procedure")
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
      var temp = rows_to_set - 1 - i;
      var date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(val, i), "%d-%b-%Y")
      if(temp != 0)
      {
        var difference = "+" + temp;
      }
      else
      {
        var difference = temp;
      }
      output[temp*7] = date;
      output[(i*7) + 1] = difference; 
    }
  }
  else if(table_type == "post-discharge")
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
  Log.Message(output);
  return output;
}
//--------------------------------------------------------------------------------
function update_bridging_array_dates(table_data, start_date, new_date, function_type)
{
  var difference = aqDateTime.TimeInterval(start_date, new_date);
  var str_difference = aqConvert.TimeIntervalToStr(difference);
  var time_split = new Array();
  time_split = str_difference.split(":");
  var day_difference = time_split[0];
  
  for(var i = 0; i < table_data.length; i += 10)
  {
    if(function_type == "+")
    {
      var temp = aqDateTime.AddDays(table_data[i], day_difference);
    }
    else if(function_type == "-")
    {
      var temp = aqDateTime.AddDays(table_data[i], (- day_difference));
    }
    var date = aqConvert.DateTimeToFormatStr(temp, "%d-%b-%Y");
    table_data[i] = date;
  }
  
  Log.Message(table_data);
  return table_data;
}
//--------------------------------------------------------------------------------
function update_procedure_date(new_date)
{
  var date_path = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent").Panel("BridgingScheduleDetails");
  date_path.scrollIntoView();
  var date = aqConvert.DateTimeToFormatStr(new_date, "%d/%m/%Y");
  
  date_picker(date_path, date);
  var text = process_popup("Confirm you wish to change the procedure date", "Confirm");
  
  WaitSeconds(4, "Waiting for tables to update...");
  return text;
}
//--------------------------------------------------------------------------------
function update_bridging_lmwh(drug_index, popup_input)
{
  WaitSeconds(1, "Waiting to update LMWH...");
  var form = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent");
  form.Panel("ProcedureDetailsContent").Panel(3).Select("ProcedureDetails_LMWH").ClickItem(drug_index);
  process_popup("Confirm you wish to change the LMWH", popup_input);
  
  WaitSeconds(4, "Waiting for tables to update...");
}
//--------------------------------------------------------------------------------
function populate_table_column(table_type, column_to_change, number_of_rows)
{
  if(table_type == "pre-op")
  {
    bridging_schedule_preop_table().Refresh();
    bridging_schedule_preop_table().scrollIntoView();
    var table = bridging_schedule_preop_table();
    var i = 2;
    var max = number_of_rows + 1;
  }
  else if(table_type == "procedure")
  {
    bridging_schedule_procedure_table().Refresh();
    bridging_schedule_procedure_table().scrollIntoView();
    var table = bridging_schedule_procedure_table();
    var i = 1;
    var max = number_of_rows;
  }
  else if(table_type == "post")
  {
    bridging_schedule_post_discharge_table().Refresh();
    bridging_schedule_post_discharge_table().scrollIntoView();
    var table = bridging_schedule_post_discharge_table();
    var i = 1;
    var max = number_of_rows;
  }
  else if(table_type == "all")
  {
    populate_table_column("pre-op", column_to_change, number_of_rows);
    populate_table_column("procedure", column_to_change, number_of_rows);
    populate_table_column("post", column_to_change, number_of_rows);
  }
  
  for(i; i <= max; i++)
  {
    var count = 0;
    var num = 0;
    switch(column_to_change)
    {
      case "inr_checkbox": 
      table.Cell(i, 2).Child(1).ClickChecked(true);
      break;
      case "inr_dropdown":
      count = table.Cell(i, 2).Child(0).wItemCount - 1;
      num = get_random_num_inrange(1, count);
      table.Cell(i, 2).Child(0).ClickItem(num);
      break;
      case "warf_checkbox": 
      table.Cell(i, 3).Child(1).ClickChecked(true);
      break;
      case "warf_dropdown": 
      count = table.Cell(i, 3).Child(0).wItemCount - 1;
      num = get_random_num_inrange(1, count);
      table.Cell(i, 3).Child(0).ClickItem(num);
      break;
      case "lmwh_checkbox": 
      table.Cell(i, 4).Child(1).ClickChecked(true);
      break;
      case "lmwh_dropdown":
      table.Cell(i, 4).Child(0).ClickItem(1);
      break;
      case "frequency":
      count = table.Cell(i, 5).Child(0).wItemCount - 1;
      num = get_random_num_inrange(1, count);
      table.Cell(i, 5).Child(0).ClickItem(num);
      break;
      case "comments":
      table.Cell(i, 6).Child(0).Click();
      var content = "Test: " + get_unique_number();
      process_bridging_popup("Edit comments", "Update", content);
      break;
      case "all":
      table.Cell(i, 2).Child(1).ClickChecked(true);
      count = table.Cell(i, 2).Child(0).wItemCount - 1;
      num = get_random_num_inrange(1, count);
      table.Cell(i, 2).Child(0).ClickItem(num);
      
      table.Cell(i, 3).Child(1).ClickChecked(true);
      count = table.Cell(i, 3).Child(0).wItemCount - 1;
      num = get_random_num_inrange(1, count);
      table.Cell(i, 3).Child(0).ClickItem(num);
      
      table.Cell(i, 4).Child(1).ClickChecked(true);
      table.Cell(i, 4).Child(0).ClickItem(1);
      
      count = table.Cell(i, 5).Child(0).wItemCount - 1;
      num = get_random_num_inrange(1, count);
      table.Cell(i, 5).Child(0).ClickItem(num);
      
      table.Cell(i, 6).Child(0).Click();
      var content = "Test: " + get_unique_number();
      process_bridging_popup("Edit comments", "Update", content);
      break;
    }
  }
}
//--------------------------------------------------------------------------------
function get_table_column_data(table_type, column_name, number_of_rows)
{
  WaitSeconds(2);  

  if(table_type == "pre-op")
  {
    bridging_schedule_preop_table().Refresh();
    bridging_schedule_preop_table().scrollIntoView();
    var table = bridging_schedule_preop_table();
    var i = 2;
    var max = number_of_rows + 1;
  }
  else if(table_type == "procedure")
  {
    bridging_schedule_procedure_table().Refresh();
    bridging_schedule_procedure_table().scrollIntoView();
    var table = bridging_schedule_procedure_table();
    var i = 1;
    var max = number_of_rows;
  }
  else if(table_type == "post")
  {
    bridging_schedule_post_discharge_table().Refresh();
    bridging_schedule_post_discharge_table().scrollIntoView();
    var table = bridging_schedule_post_discharge_table();
    var i = 1;
    var max = number_of_rows;
  }
  
  var column_data = new Array();
  for(i; i <= max; i++)
  {
    table.Refresh();
    var temp;
    switch(column_name)
    {
      case "date":
      temp = aqString.Trim(table.Cell(i, 0).innerText);
      column_data.push(temp);
      break;
      case "day":
      temp = aqString.Trim(table.Cell(i, 1).innerText);
      column_data.push(temp);
      break;
      case "inr_checkbox": 
      temp = table.Cell(i, 2).Child(1).checked;
      column_data.push(temp);
      break;
      case "inr_dropdown":
      temp = table.Cell(i, 2).Child(0).value;
      column_data.push(temp);
      break;
      case "warf_checkbox": 
      temp = table.Cell(i, 3).Child(1).checked;
      column_data.push(temp);
      break;
      case "warf_dropdown": 
      temp = table.Cell(i, 3).Child(0).value;
      column_data.push(temp);
      break;
      case "lmwh_checkbox": 
      temp = table.Cell(i, 4).Child(1).checked;
      column_data.push(temp);
      break;
      case "lmwh_dropdown":
      temp = table.Cell(i, 4).Child(0).value;
      column_data.push(temp);
      break;
      case "frequency":
      temp = table.Cell(i, 5).Child(0).value;
      column_data.push(temp);
      break;
      case "comments":
      temp = table.Cell(i, 6).Child(0).innerText;
      column_data.push(temp);
      break;
      case "all":
      temp = aqString.Trim(table.Cell(i, 0).innerText);
      column_data.push(temp);
      temp = aqString.Trim(table.Cell(i, 1).innerText);
      column_data.push(temp);
      temp = table.Cell(i, 2).Child(1).checked;
      column_data.push(temp);
      temp = table.Cell(i, 2).Child(0).value;
      column_data.push(temp);
      temp = table.Cell(i, 3).Child(1).checked;
      column_data.push(temp);
      temp = table.Cell(i, 3).Child(0).value;
      column_data.push(temp);
      temp = table.Cell(i, 4).Child(1).checked;
      column_data.push(temp);
      temp = table.Cell(i, 4).Child(0).value;
      column_data.push(temp);
      temp = table.Cell(i, 5).Child(0).value;
      column_data.push(temp);
      temp = table.Cell(i, 6).Child(0).innerText;
      column_data.push(temp);
      break;
    }
  }
  
  return column_data;
}
//--------------------------------------------------------------------------------
function compare_table_columns(table_type, column_name, number_of_rows, table_data_array)
{
  var index;
  switch(column_name)
  {
    case "date":
    index = 0;
    break;
    case "day":
    index = 1;
    break;
    case "inr_checkbox": 
    index = 2;
    break;
    case "inr_dropdown":
    index = 3;
    break;
    case "warf_checkbox": 
    index = 4;
    break;
    case "warf_dropdown": 
    index = 5;
    break;
    case "lmwh_checkbox": 
    index = 6;
    break;
    case "lmwh_dropdown":
    index = 7;
    break;
    case "frequency":
    index = 8;
    break;
    case "comments":
    index = 9;
    break;
  }
  
  var output_comparisons = new Array();
  var values = new Array();
  var current_column_data = new Array();
  current_column_data = get_table_column_data(table_type, column_name, number_of_rows);
  
  for(var i = index; i < table_data_array.length; i += 10)
  {
    var temp = table_data_array[i];
    values.push(temp);
  }
  
  Log.Message(table_type);
  Log.Message(column_name);
  for(var i = 0; i < values.length; i++)
  {
    if(values[i] == current_column_data[i])
    {
      Log.Message("Array Item is: " + values[i]);
      Log.Message("Column Value is: " + current_column_data[i]);
      output_comparisons.push(true);
    }
    else
    {
      output_comparisons.push(false);
    }
    Log.Message(output_comparisons);
  }

  return output_comparisons;
}
//--------------------------------------------------------------------------------
function validate_columns_match(table_type, number_of_rows, array, array_of_columns_to_check)
{
  var results = new Array();
  var column_name;
  for(var i = 0; i < array_of_columns_to_check.length; i++)
  {
    column_name = array_of_columns_to_check[i]; 
    var vals = new Array();
    vals = compare_table_columns(table_type, column_name, number_of_rows, array);
    results.push(results_checker_are_true(vals));
  }

  Log.Message(results);
  return results;
}
//--------------------------------------------------------------------------------
function save_bridging_schedule()
{
  bridging_schedule_save_button().Click();
  process_popup("Please confirm the bridging schedule", "Confirm");
}
//--------------------------------------------------------------------------------
function view_bridging_schedule(item_position)
{
  Goto_Bridging_Tab();
  var button = bridging_summary_schedule_table().Cell(item_position, 6).Button("View");
  var state = button.Enabled;
  
  if(state == true)
  {
    button.Click();
  }
  
  return state;
}
//--------------------------------------------------------------------------------
function get_bridging_warning_message(message_index)
{
  var obj_root = patient_treatment_bridging_tab();
  wait_for_object(obj_root, "idStr", "BridgingScheduleMessages", 4);

  var banner = bridging_schedule_warning_banner();
  var warning;
  
  if(message_index == "all")
  {
    warning = banner.innerText;
  }
  else
  {
    warning = banner.TextNode(message_index).innerText;
  }
  
  return warning;
}












