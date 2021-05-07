//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_test_prac()
{
  Goto_Patient_Management()
  var patient_management_care_team_path = patient_management_care_team();
  var test_prac = patient_management_care_team_path.Panel(0).Label("TestingSectionId_DetachedLabel").contentText;
  
  return test_prac;
}