//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_inr_results_received_by_timestamp(timestamp)
{
  Goto_Patient_New_INR();
  
  //Check table exists before proceeding
  var table_exists = Check_if_patients_inr_results_table_exists(); 
   
  if (table_exists == true) 
  {    
    //Get the path of the patient external results table
    var table = inr_results_received_table();
      
      //Loop through each row of table
      for (i=0; i<table.RowCount; i++)
      {
        //Check whether timestamp exists
        if (table.Cell(i, 1).contentText == timestamp)
        {
           var results = {
            "test_timestamp"         : table.Cell(i, 1).contentText,
            "source"                 : table.Cell(i, 2).contentText,
            "inr"                    : table.Cell(i, 3).contentText,
            "row"                    : i,
            "row_count"              : table.RowCount
            } 
           return results
        }
      }
      Log.Message("Table row containing timestamp does not exist");
  }
  // If data is unobtainable we can prevent further checks - checking row is not false 
  var results = {"row" : false, "row_count" : 0}
  return results;
}