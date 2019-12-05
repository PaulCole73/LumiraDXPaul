//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tc_find_patient_recently_viewed()
{
  try
  {
    var test_title = 'Patient Recently Viewed - Find patient recently viewed'
    login(5, "Shared");
    add_patient('Regression', 'add_a_new_patient', 'M', 'Shared'); 
  
    var patient_name = get_patient_fullname();
    var patients_list = new Array();
    patients_list = patient_recently_viewed_list();
  
    var results = table_contains_checker(patients_list, patient_name, test_title)
    results_checker(results, test_title);

    Log_Off()
  }
  catch (e)
  {
    Options.Run.Timeout = 15000;
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }
}
//--------------------------------------------------------------------------------