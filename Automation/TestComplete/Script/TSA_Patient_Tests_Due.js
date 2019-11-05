//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT V5_Common_Batch
//USEUNIT TSA_Patient
//--------------------------------------------------------------------------------
function get_tests_due_patient(name)
{
 WaitSeconds(1);
 Goto_Tests_Due();
 WaitSeconds(1);  
 
 var tests_due_table_path = tests_due_table();
 
 for(i=1; i<tests_due_table_path.rowcount; i++) 
 {
  var data = tests_due_table_path.Cell(i, 0).Link("PatientLink").contentText;
  if (data == name)
    {
    return true;
    } 
 } 
 Log.Warning('Patient ' + name + ' was not found on the tests due list')
 return false;
}
//--------------------------------------------------------------------------------
