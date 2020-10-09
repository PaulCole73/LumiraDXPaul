//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//USEUNIT Get_Functions
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function json_body_data_instrument(patient_details, location_id, inr_result, blood_test_timestamp) 
{
  //Formats: patient_details(object), location_id(GUID), inr_result(eg: "2.2"), blood_test_timestamp(eg: 2020-09-30T15:42:42)
  
  //Initialise a typical payload
  var payload = JSON.parse(`{
  "patient": {
    "identifiers": [{
        "alias": "8151589434",
        "aliasType": "RefNo1"}],
    "firstName": "Dave",
    "lastName": "SMITH",
    "dob": "1988-04-15",
    "gender": "F"  },
  "identifiers": [{
      "alias": "REEC-00256-02427|411",
      "aliasType": "ObservationID"}],
  "orderNumber": "REEC0025602427411",
  "organizationId": "014012d8-efbe-4902-b094-4816f1c31823",
  "category": "laboratory",
  "status": "Final",
  "code": "2",
  "effectiveDateTime": "2020-09-29T14:58:02",
  "resultValue": "2.2",
  "resultValueType": "string",
  "referenceRange": {"low": "0","high": "0"},
  "performer": {
    "id": "ea40b913-89cc-452e-8e53-a5b27b202abf",
    "fullName": "A White"},
  "instrument": {
    "serialNumber": "30717190300113",
    "wirelessId": "REEC-00256-02427"},
  "device": {
    "lotNumber": "88",
    "lotExpiryDate": "2024-04-04"}}`);

  //Replace payload content with imported variables
  payload.patient.identifiers[0].alias = patient_details.nhs_number;
  payload.patient.lastName = patient_details.lastname;
  payload.patient.firstName = patient_details.firstname;
  payload.patient.dob = patient_details.dob_as_dd_mm_yyyy;
  payload.patient.gender = patient_details.gender;
  payload.resultValue = inr_result
  
  //Replace Payload organizationId with locationID from Locations Details
  payload.organizationId = location_id; 
  
  //Replace Payload blood test timestamp
  payload.effectiveDateTime = blood_test_timestamp;
  
  Log.Message("Payload created as: " + JSON.stringify(payload));
    
  //Return the payload so it can be posted elsewhere
  return payload
}
//--------------------------------------------------------------------------------

function get_csp_url_from_the_inrstar_url()
{
  //Get the CSP URL from the INRstar URL 
  var address = Aliases.INRstarWindows.BrowserForm.INRstarBrowser.WebBrowserBaseNativeWindow.ShellDocObjectView.browser.URL;
  var matches = address.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  var domain = matches && matches[1];
  var domain = domain.replace("inrstar", "csp");
  var domain = "https://" + domain;
  Log.Message("Csp URL has been created as: " + domain);
  
  return domain
}

//--------------------------------------------------------------------------------

function get_bearer_token_for_instrument()
{
  //Obtain URL
  var address = get_csp_url_from_the_inrstar_url() + "/account/signin";
     
  //Define the request body_payload
  var body_payload = 
  '{'
  +' "grant_type": "password", '
  +' "scope": "quantum", '
  +' "client_id": "quantum", '
  +' "username":"Quantum", '
  +' "password": "W;b;8E:$Q?a~3bHVX3vyHzG"'
  +' }';
  
  //Create the Headers into an object
  var headers = new Object();
  headers["Content-Type"] = "application/json";
  headers["api-version"] = "2.1";

  //Perform the api request record the response
  var response = api_post(address, headers, body_payload)
  
  //Convert Response to JSON and extract the Bearer token
  var bearer_token = JSON.parse(response.text).access_token
    
  return bearer_token;
}

//--------------------------------------------------------------------------------

function post_external_result_instrument(token, body_payload)
{
  //Obtain URL
  var address = get_csp_url_from_the_inrstar_url() + "/externalresults/observation";
  
  //Create the Headers into an object
  var headers = new Object();
  headers["Content-Type"] = "application/json";
  headers["Accepts"] = "application/json";
  headers["api-version"] = "2.1";
  headers["Authorization"] = "Bearer " + token; 

  //Call upon api_post() to send the request
  api_post(address, headers, body_payload)
}
//--------------------------------------------------------------------------------
function select_use_external_result_button_from_row(row, table_exists)
{ 
  if (table_exists == true) 
  {
      //Click the Use-result button on the specified row
      use_result_button_path_for_specific_row_of_patient_results(row).Click()
  }
  else 
  {
      //Warn that table doesn't exist
      Log.Message("Failure Table does not exist - so unable to check for external results");
  }
} 
//--------------------------------------------------------------------------------
function archive_treatment(row, action, table_exists)
{
  if (table_exists == true) 
  {
    //Click the archive button on the specified row
    archive_button_path_for_specific_row_of_patient_results(row).Click()
        
    //Wait for popup before proceeding avoids timeouts down the line
    wait_for_object(INRstar_base(), "contentText", "Discard", 5,"",2);
        
    //Pending the specified action (Discard/Cancel/Message) - handle the popup
    if (action == "Discard" || action == "Cancel")
    {
        process_popup("Archive Reason", action);
    }
    else if (action == "Message")
    {
        var message = provide_archive_reason_after_archiving_result();
        process_popup("Archive Reason", "Discard");  
        return message
    }
    else 
    {
        Log.Message("Unable to: " + action + " an archived result, must pass in Discard, Cancel or Message")
    }
  }
  else 
  {
      //Warn that table doesn't exist
      Log.Message("Failure Table does not exist - so unable to select archive button");
  }
} 
//--------------------------------------------------------------------------------
function archive_test_result(row, action, table_exists)
{
  if (table_exists == true) 
  {
      //Click the archive button on the specified row
      archive_button_path_for_specific_row_of_external_results(row).Click()
        
      //Wait for popup before proceeding avoids timeouts down the line
      wait_for_object(INRstar_base(), "contentText", "Discard", 5,"",2);
        
      //Pending the specified action (Discard/Cancel/Message) - handle the popup
      if (action == "Discard" || action == "Cancel")
      {
          process_popup("Archive Reason", action);
      }
      else if (action == "Message")
      {
          provide_archive_reason_after_archiving_result();
          process_popup("Archive Reason", "Discard");  
      }
      else 
      {
          Log.Message("Unable to: " + action + " an archived result, must pass in Discard, Cancel or Message")
      }
  }
  else 
  {
      //Warn that table doesn't exist
      Log.Message("Failure Table does not exist - so unable to select archive button");
  }
} 
//--------------------------------------------------------------------------------
function add_manual_treatment_after_using_result(dose, review)
{
  //Select Dose from dose dropdown
  dose_dropdown_path_on_new_inr().ClickItem(get_string_translation(dose));
  
  //Select Review from review dropdown
  var days = "Days";
  if (review == "1") {days = days.substring(0,4-1)}
  review_dropdown_path_on_new_inr().ClickItem(review + " " + get_string_translation(days));
           
  //Select Save
  treatment_buttons_pre_schedule().SubmitButton("SubmitManualDose").Click();
   
  //Process Popups
  process_popup(get_string_translation("PoCT Batch Expired"),get_string_translation("Confirm"));   
  process_popup(get_string_translation("Please confirm that the following is correct"), get_string_translation("Confirm"));
  
  //Store the Dosage data into an object
  var dose_data = new Object();
  dose_data["dose"] = dose;
  dose_data["review"] = review;
  
  return dose_data
}
//--------------------------------------------------------------------------------
// Use when you expect the table - and want to be informed if not present
function Check_if_patients_external_results_table_exists() 
{
  //Check if the link for the table is present
  var is_table_present = check_patient_results_table_header_showing_by_idStr_object("PatientExternalResultsTableWrapper", 14); 
  
  //Return true or false pending if link (and therfore table) is present
  return is_table_present
}
//--------------------------------------------------------------------------------
// Use when you expect the table - and want to be informed if not present
function Check_if_external_results_table_exists() 
{
  //Check if the link for the table is present
  var is_table_present = check_patient_results_table_header_showing_by_idStr_object("WarfarinResultsTable", 8); 
  
  //Return true or false pending if link (and therfore table) is present
  return is_table_present
}
//--------------------------------------------------------------------------------
function check_patient_results_table_header_showing_by_idStr_object(string)
{  
  // Get the INRstarV5 base
  var INRstarV5 = INRstar_base();  
  
  // look for specified link_header idstr within INRstarV5
  var link = wait_for_object(INRstarV5, "idStr", string, 14, "", 2);
  
  // Return the result of the check
  return check_menu_header_exists(link);
}
//--------------------------------------------------------------------------------
function provide_archive_reason_after_archiving_result()
{
  var comments_section = archive_reason_comments_for_archived_result_confirmation_popup()
  
  var comment = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, " + 
  "making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words" +
  ", consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum" + 
  " comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a " +
  "treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32."
  
  //Enter comment into textbox
  comments_section.innerText = comment;
  
  return comment
}
//--------------------------------------------------------------------------------
function filter_external_results_to_show_archived(table_exists)
{  
  if (table_exists == true) 
  {
      //Toggle the show archived checkbox
      show_archived_results_checkbox().ClickChecked(true);
  
      //Press the filter button
      external_results_filter_button().Click()
  }
  else 
  {
      //Warn that table doesn't exist
      Log.Message("Failure Table does not exist - so unable to filter");
  }
}
