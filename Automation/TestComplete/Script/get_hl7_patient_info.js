//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_hl7_patient_info(table_position)
{
  WaitSeconds(5, "Waiting for table to update...");
  Goto_External_Results();
  var patient_data = new Array();

  if(table_position == null)
  {
    table_position = 1;  
  }
  
  if(patient_external_results_table().Cell(1, 0).innerText != "There are no new results")
  {
    var obj = patient_external_results_table().Cell(table_position, 1).Panel(0).FindChild("name", "Link(\"PatientLink\")");
    var obj_alt = patient_external_results_table().Cell(table_position, 1).Panel(0).FindChild("name", "Label(\"Name_DetachedLabel\")");

    var name;
    if(obj.Exists)
    {
      name = obj.innerText;
    }
    else if(obj_alt.Exists)
    {
      name = obj_alt.innerText;
    }
    else
    {
      name = "";
    }
    
    var name_split = name.split(",");
  
    var surname = aqString.Trim(name_split[0]);
    var firstname = aqString.Trim(name_split[1]);
    var dob = patient_external_results_table().Cell(table_position, 1).Panel(0).Label("Born_DetachedLabel").innerText;
    var nhs = patient_external_results_table().Cell(table_position, 1).Panel(1).Panel(0).Label("ResultsNHSNumber_DetachedLabel").innerText;
    var pat_no = patient_external_results_table().Cell(table_position, 1).Panel(1).Panel(1).Label("ResultsPatientNumber_DetachedLabel").innerText;
    var inr = patient_external_results_table().Cell(table_position, 3).innerText;
  
    patient_data.push(surname, firstname, dob, nhs, pat_no, inr);
    Log.Message(patient_data);
  }
  else
  {
    Log.Message("No table entries!");
    patient_data.push("", "", "", "", "", "");
  }
  
  return patient_data;
}