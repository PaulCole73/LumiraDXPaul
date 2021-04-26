//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function post_receivedatafromiguana(body_payload)
{
  
  //Probably want to put these in a file and get them
  var uri = "https://inrstarservice-it-test1.caresolutions.lumiradx.com/IguanaService.svc/api/ReceiveDataFromIguana";
  
  //Create the Headers into an object
  var headers = new Object();
  headers["Content-Type"] = "application/json";

  //Call upon api_post() to send the request
  var response_data = new Object();
  response_data = api_post(uri, headers, body_payload);
  
  Log.Message("This is the payload after edit that gets sent \\ " + body_payload);
  Log.Message("This is the response data // " + response_data);
  
  return response_data;
}
//--------------------------------------------------------------------------------
function json_body_recievedatafromiguana(patient_data) 
{ 
  //Initialise a typical payload
  var payload = JSON.parse(
  `{
    "Title": null,
    "Firstname": null,
	  "Surname": null,
	  "NHSNumber": null,
	  "DOB": null,			
	  "SectionId": null,
	  "Sex": null,
    "PatientNumber": null,
    "Email": null,
    "Phone": null,
    "FirstAddressLine": null,
    "SecondAddressLine": null,
    "ThirdAddressLine": null,
    "FourthAddressLine": null,
    "FifthAddressLine": null,
    "PostCode": null
    }`);
    
  //Section id has to be set here and no tin the patient object due to the objects needing to match on validation
  login(7, "Shared");
  var location_id = get_organization_id_from_current_location();
   
  //Replace payload content with imported variables
  payload.Title = (patient_data.title==get_string_translation("Mr"))? "Mr" : "Mrs";
  payload.Firstname = patient_data.first_name;
  payload.Surname = patient_data.last_name;
  payload.NHSNumber = patient_data.nhs_number
  payload.DOB = convert_date_from_dd_mmm_yyyy_to_get_date_as_dd_mm_yyyy(patient_data.dob);
  payload.SectionId = location_id;
  payload.Sex = (patient_data.sex == get_string_translation("Male"))? "Male" : "Female";
  payload.PatientNumber = patient_data.patient_number;
  payload.Email = patient_data.email;
  payload.Phone = patient_data.phone;
  payload.FirstAddressLine = patient_data.first_addressLine;
  payload.SecondAddressLine = patient_data.second_addressLine;
  payload.ThirdAddressLine = patient_data.third_addressLine;
  payload.FourthAddressLine = patient_data.town;
  payload.FifthAddressLine = patient_data.county;
  payload.PostCode =  patient_data.post_code;
  
  Log.Message("Payload created as: " + JSON.stringify(payload));
  
  return payload
}
//--------------------------------------------------------------------------------