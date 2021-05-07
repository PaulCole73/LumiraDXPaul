//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_iqc_data()
{
  var iqc_table_path = options_iqc_table();
  var data_saved = new Array();
  
  for(i=0; i<7; i++)
  {
    var data = iqc_table_path.Cell(1, i).contentText;
    data_saved.push(data);
  } 
  Log.Message(data_saved + ' This is the data after it has been saved')
  return data_saved;
}