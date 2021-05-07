//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_external_results_received_by_timestamp(timestamp, archived)
{
  Goto_External_Results();
  
  //Check table exists before proceeding
  var table_exists = Check_if_external_results_table_exists();
   
  if (table_exists == true) 
  {
    if (archived == "Archived")
    {
      //Toggle the show archived checkbox
      show_archived_results_checkbox().ClickChecked(true);
  
      //Press the filter button
      external_results_filter_button().Click();
      
      //Get the path of the patient external results archived table
      var table = patient_external_results_archived_table(); 
    }
    else
    {    
      //Get the path of the patient external results table
      var table = patient_external_results_table();
    }

    //Loop through each row of table
    for (row=0; row<table.RowCount; row++)
    {
      //Check whether timestamp exists
      if (table.Cell(row, 2).contentText == timestamp)
      {    
        //The status column can be a button or a label depending on the data so there are 2 seperate paths, but it will can be things like dose patient or duplicate etc  
        var button_path_1 = table.Cell(row, 4).Panel(0).FindChild("ObjectIdentifier", "DosePatient", 2); 
        var button_path_2 = table.Cell(row, 4).Panel(0).FindChild("ObjectIdentifier", "FindPatient", 2); 
        var button_path_3 = table.Cell(row, 4).Panel(0).FindChild("ObjectIdentifier", "Status_DetachedLabel", 2);
        
        if(button_path_1.Exists)
        {
         var text = button_path_1.ObjectLabel;     
        }
        if(button_path_2.Exists)
        {
          var text = button_path_2.ObjectLabel;
        }
        if(button_path_3.Exists)
        {
          var text = button_path_3.ObjectLabel;
        }
        
        //Can have a link or a different path depending on if the patient matches or not
        var patient_name_link =  table.Cell(row, 1).Panel(0).FindChild("ObjectIdentifier", "PatientLink", 2);
        var patient_name_label = table.Cell(row, 1).Panel(0).FindChild("ObjectIdentifier", "Name_DetachedLabel", 2);
        
        if(patient_name_link.Exists)
        {
         var patient_name_text = patient_name_link.ObjectLabel;     
        }
        if(patient_name_label.Exists)
        {
          var patient_name_text = patient_name_label.ObjectLabel;
        }
       
      
        var results = {
        "patient_name"           : patient_name_text,
        "patient_dob"            : table.Cell(row, 1).Panel(0).Label("Born_DetachedLabel").contentText,
        "patient_nhs_fiscal"     : table.Cell(row, 1).Panel(1).Panel(0).Label("ResultsNHSNumber_DetachedLabel").contentText,
        //Can have patient number for rovigo might be able to for others too not put in for the instrument yet as we dont get this data   
        "blood_taken_timestamp"  : table.Cell(row, 2).contentText,
        "inr"                    : table.Cell(row, 3).contentText,
        "row"                    : row,      
        "status_column_value1"   : text,
        "status_column_value2"   : table.Cell(row, 4).Panel(0).FindChild("ObjectIdentifier", "ArchiveResult", 2).ObjectLabel
        }
         return results;
      }
    }
    Log.Message("Table row containing timestamp does not exist");
  }
//  If data is unobtainable we can prevent further checks - checking row is not false 
  var results = {"row" : false}
  return results;
}