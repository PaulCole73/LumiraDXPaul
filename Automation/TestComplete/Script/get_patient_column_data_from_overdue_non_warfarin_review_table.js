//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patients_column_data_from_overdue_non_warfarin_review_table(table, pat_name) 
{
   for (i=0; i<table.rowcount; i++)
    {
      if(table.Cell(i, 0).contentText == pat_name)
      { 
        // Grabbing pat_num, nhs_num, born, tel, drug, date, due_days
        name =    table.Cell(i, 0).contentText;
        drug =    table.Cell(i, 1).contentText;
        born =    table.Cell(i, 2).contentText;
        tel =     table.Cell(i, 3).contentText;
        nhs_num = table.Cell(i, 4).contentText;
        pat_num = table.Cell(i, 5).contentText;
        date =    table.Cell(i, 6).contentText;
        due_days =table.Cell(i, 7).contentText;
        
        // Initialise an array
        var patient_data_array = new Array();
  
        // Store all extracted variables into array
        patient_data_array.push(name, pat_num, nhs_num, born, tel, drug, date, due_days); 
   
        return patient_data_array;
      }
    }
    Log.Warning("Patient: " + pat_name + " was not found in the table")
    return false;
}