//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_bridging_schedule_table_row(row_num, table_type)
{
  var row_data = new Array();
  var table;
  row_data.length = 0;
  
  if(table_type == "pre-op")
  {
    table = bridging_schedule_preop_table();
  }
  else if(table_type == "procedure")
  {
    table = bridging_schedule_procedure_table();
    row_num -= 1;
  }
  else if(table_type == "post-discharge")
  {
    table = bridging_schedule_post_discharge_table();
  }
  //when performing looping actions, test complete will cache objects
  //these need to be refreshed or the test will fail
  table.Refresh();
  
  for(var i = 0; i < 7; i++)
  {
    if(i == 2 || i == 3 || i == 4)
    {
      row_data.push(table.Cell(row_num, i).Child(1).checked);
    }
    else
    {
      row_data.push(aqString.Trim(table.Cell(row_num, i).innerText));
    }
  }
  return row_data;
}