//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//USEUNIT TSA_Patient
//--------------------------------------------------------------------------------
function get_tests_due_patient(name)
{
  Goto_Tests_Due();
  WaitSeconds(1); 
  var tests_due_table_path = tests_due_table();
 
  for(var i = 1; i < tests_due_table_path.rowcount; i++) 
  {
    var data = tests_due_table_path.Cell(i, 0).Link("PatientLink").contentText;
    if (data == name)
    {
      Log.Message("This is who I was looking for \\" + name + " \\This is who I found \\" + data + " \\")
      return true;
    } 
  }
  Log.Warning('Patient ' + name + ' was not found on the tests due list')
  return false;
}
//--------------------------------------------------------------------------------
