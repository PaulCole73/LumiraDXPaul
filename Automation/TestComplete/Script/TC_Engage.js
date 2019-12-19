//USEUNIT TSA_Engage
//USEUNIT TSA_Patient
//USEUNIT TSA_engage_Retrieve_Login_Code
//USEUNIT Failed_Test_Handlers
//USEUNIT engage_System_Paths
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
    
    //retrieve patient email (no 18 in the array)
    var patientDemographics = get_patient_demographics();
    var emailAddress = patientDemographics[18]; 
    
    //enroll the patient onto engage self-care
    warfarin_self_care('all');
    
    //Open engage and request code
    engage_signin_register_tab().click();
    
    //enter email into email box
    engage_username_register().text = emailAddress
    engage_send_code_register().click();
      
    //request code from engage
    var code = get_engage_login_code();
    
    //enter received code into ID box 
    engage_code_register().text = code;
    engage_next_button_register().click();
    
    //set password for engage

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