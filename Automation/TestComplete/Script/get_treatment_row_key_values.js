﻿//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_treatment_row_key_values(row_num, table_type) 
{
  if(table_type == "current" || table_type == null)
  {
    Goto_Patient_Treatment();
    var treatment_table_path = treatment_table();
  }
  else if(table_type == "pending")
  {
    var treatment_table_path = pending_treatment_table();
  }
  else if(table_type == "previous")
  {
    Goto_Patient_Treatment();
    var treatment_table_path = treatment_table_from_previous_plan();
  }
  var treatment_row_array = new Array()
  
  for(var i = 0; i < 11; i++)
  {
    if(i == 0 || i == 1 || i == 2 || i == 5 || i == 7)
    {
      var treatment_value = treatment_table_path.Cell(row_num, i).contentText;
      treatment_row_array.push(treatment_value);
    }
  }
  
  return treatment_row_array;  
}