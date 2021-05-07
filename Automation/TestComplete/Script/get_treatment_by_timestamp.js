//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_treatment_by_timestamp(timestamp) 
{
  //Goto Patient Treatments 
  Goto_Patient_Treatment()
  
  //Check table exists before proceeding
  var table_exists = Check_if_treatment_table_exists();
  
  //If treatment table exists grab values from it
  if (table_exists == true)  
  {
    //Get the path of the treatments table
    var table = treatment_table(); 
    
    //Loop through each row of table
      for (i=0; i<table.RowCount; i++)
      {
        //Check whether timestamp exists
        if (table.Cell(i, 0).contentText == timestamp)
        {
          //if so grab results
          var treatment = {
            "test_date"     : table.Cell(i, 0).contentText,
            "inr"           : table.Cell(i, 1).contentText,
            "dose"          : table.Cell(i, 2).contentText,
            "suggested_dose": table.Cell(i, 3).contentText,
            "omits"         : table.Cell(i, 4).contentText,
            "review_days"   : table.Cell(i, 5).contentText,
            "row"           : i}
          return treatment
        }
      }
      //warn that specified row does not exist
      Log.Message("Row number: " + i + " Does not exist in results table, table has a rowcount of: " + table.RowCount)

  }
  var treatment = {"row" : false}  
  return treatment;
}