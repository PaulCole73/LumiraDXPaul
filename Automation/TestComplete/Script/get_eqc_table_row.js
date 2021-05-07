//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_eqc_table_row(batch_ref)
{
  Goto_Options_EQC();

  var table_data = options_eqc_form_buttons().Table("LocationsEQCTable");
  var row_data = new Array();
  var row_num;
  
  if(table_data.Cell(1,0).contentText != "There are no EQCs recorded")
  {
    for(var i = 1; i < table_data.RowCount; i++)
    {
      for(var j = 0; j < 7; j++)
      {
        if(table_data.Cell(i, j).contentText == batch_ref)
        {
          row_num = i;
          break;
        }
      }
    }
    for(var i = 0; i < 7; i++)
    {
      var temp = table_data.Cell(row_num, i).contentText;
      row_data.push(temp);
    }
  }
  
  return (row_data);
}