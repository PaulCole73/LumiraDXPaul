//USEUNIT INRstar_Misc_Functions
//USEUNIT INRstar_Get_Functions
//USEUNIT TSA_receive_data_from_iguana

function test()
{
  
    var expected_text = get_string_translation("The last request was not performed because this patient's record was changed by another user after it was opened") + 
                                               ".\n" + get_string_translation("Click 'Exit Patient' - to continue, you will need to reload the patient record") + "."

    var results = popup_warning_checker(expected_text);
    results_checker(results, "title")
}
//--------------------------------------------------------------------------------
function tc_concurrency_error_displayed_when_demographics_amended_before_saving_the_treatment() 
{
 try
  {
    var test_title = 'Instrument: Scanner - Concurrency, error displayed when demographics amended before saving the treatment';
    
    //Create patient object for what you want to see in inrstar once posted in
    var patient = create_patient_object_for_fiscal();
    patient.nhs_number = get_fiscal_code(patient).replace(/ +/g, "");
    
    //Post in patient data to the API
    var body_data = json_body_recievedatafromiguana(patient); 
    post_receivedatafromiguana(JSON.stringify(body_data)); 
    
    //Load the new patient added through API and get ready for the concurrency pop up
    var pat_name = patient.last_name;
    patient_search(pat_name);
    add_treatment_plan('W','Manual','','Shared','');
    Goto_Patient_New_INR();
    
    //Update the patient throuh API call and invoke the concurrnecy warning
    body_data.FirstAddressLine = "Amended Address"
    post_receivedatafromiguana(JSON.stringify(body_data));
    treatment_buttons_pre_schedule().SubmitButton("SubmitManualDose").Click();
   
    //Had to split the text due to the spacing in the message having a "\n" in the message text  
    var expected_text = get_string_translation("The last request was not performed because this patient's record was changed by another user after it was opened") + 
                                               ".\n" + get_string_translation("Click 'Exit Patient' - to continue, you will need to reload the patient record") + "."

    var results = popup_warning_checker(expected_text);
    results_checker(results, test_title)
    
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_concurrency_error_displayed_when_demographics_amended_before_saving_the_treatment";
    var test_name = "tc_concurrency_error_displayed_when_demographics_amended_before_saving_the_treatment";
    handle_failed_tests(suite_name, test_name);
  } 
} 