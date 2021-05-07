//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_diagnosis_details(name)
{
  Goto_Options_Diagnosis();
  options_diagnosis_list().ClickItem(name);

  var diagnosis_data = new Array();
  
  var temp = diagnosis_details().Panel(0).Label("Name_DetachedLabel").innerText;
  diagnosis_data.push(temp);
  temp = diagnosis_details().Panel(1).Label("TargetINR_DetachedLabel").innerText;
  diagnosis_data.push(temp);
  temp = diagnosis_details().Panel(2).Label("TreatmentDuration_DetachedLabel").innerText;
  diagnosis_data.push(temp);
  
  return diagnosis_data;
}