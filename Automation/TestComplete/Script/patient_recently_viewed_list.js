//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Get_Functions
//USEUNIT Misc_Functions

//--------------------------------------------------------------------------------
function patient_recently_viewed_list()
{
  Goto_Recently_Viewed();
  var patient_table = patient_recently_viewed_table();
  var patient_list = new Array()
   
  for(i=1; i < patient_table.rowcount; i++)
  {
    var patient = patient_table.Cell(i, 0).Link("PatientLink").contentText;
    patient_list.push(patient) 
  } 
   
  return patient_list;
} 
//--------------------------------------------------------------------------------