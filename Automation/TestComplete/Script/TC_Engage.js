//USEUNIT TSA_Engage
//USEUNIT TSA_engage_Retrieve_Login_Code
//USEUNIT Failed_Test_Handlers
//--------------------------------------------------------------------------------
function tc_ensure_urgent_notification_is_displayed_when_patient_does_not_understand_their_schedule()
{
  try
  {
    var test_title = 'Engage - Ensure urgent notification displayed when patient does not understand their schedule'
    login(5, "Shared");
    add_patient('Regression', 'Add_historic', 'M', 'Shared'); 
    add_treatment_plan('W','Manual','','Shared','');
    add_manual_treatment(aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))),'2.0','2.5','7');
    
    //enroll the patient onto engage self-care
    warfarin_self_care(all);
    
    //request code from engage
     
    
    

       Log_Off(); 
  } 
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Treatment";
    var test_name = "tc_treatment_add_a_historic_treatment";
    handle_failed_tests(suite_name, test_name);
  }
}