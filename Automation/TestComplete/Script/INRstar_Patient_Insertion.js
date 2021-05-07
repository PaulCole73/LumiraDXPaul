//USEUNIT Misc_Functions
//USEUNIT Get_Functions
//USEUNIT INRstar_Get_Cookies_via_Powershell
//USEUNIT INRstar_Treatment_Plan_Insertion
//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                      INRstar Patient Insert Under the hood                      //
//---------------------------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------/
function add_a_patient_with_treatment_plan_under_the_hood()
{
  try
  {
    var test_title = "add_a_patient_with_treatment_plan_under_the_hood"
  
    //Add patient with Treatment Plan
    var patient = insert_patient(); 
    var treatment_plan = insert_treatment_plan(patient);

  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "add_a_patient_with_treatment_plan_under_the_hood";
    var test_name = "add_a_patient_with_treatment_plan_under_the_hood";
    handle_failed_tests(suite_name, test_name); 
  } 
}

//-----------------------------------------------------------------------------------
function insert_patient()
{
  //Get tokens and establish URL
  get_tokens_via_powershell();
  
  //Make under the hood call in order to Grab patient insertion id and token
  var patient_insert_tokens = get_token_for_patient_insert();
  
  //Generate Patient including patient_insert_tokens
  var patient = patient_generator(patient_insert_tokens); 
  
  //Convert & encode patient object into requestBody format
  var requestBody = "";
  for (var item in patient) 
  {
      if (patient.hasOwnProperty(item)) 
      {
          requestBody += encodeURIComponent(item) + '=' + encodeURIComponent(patient[item]) + '&';
      }
  }
  requestBody = requestBody.slice(0, -1); //Remove Last & char 

  //Add Headers
  var headers = new Object();
  headers["Host"] = Project.Variables.hostname;
  headers["User-Agent"] = "TestComplete"; 
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  headers["Cookie"] = Project.Variables.cookie_jar;
  headers["Content-Length"] = parseInt(requestBody.length);
  
  var address = "https://" + Project.Variables.hostname + "/Patient/Insert";
  var response = api_post(address, headers, requestBody);

  if (response.StatusCode == 200)
  {
    Log.Message("Attempt to create patient: " + patient.fullname + " = " + response.Text);
  }
  else
  {
    Log.Warning("Error: Patient has not been created");
  }
  
  return patient;
}
//-----------------------------------------------------------------------------------
function get_token_for_patient_insert()
{
  var address = "https://" + Project.Variables.hostname + "/Patient/New";
  var headers = new Object();
  var patient_insert_tokens = new Object();
    
  //Add Headers
  headers["Connection"] = "keep-alive";
  headers["Host"] = Project.Variables.hostname;
  headers["User-Agent"] = "TestComplete"; 
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  headers["Accept"] = "*/*";
  headers["Cookie"] = Project.Variables.cookie_jar;
  
  var response = String(api_get(address, headers));
  
  var new_patient_token_ID = response.match(/name="Id" type="hidden" value="([^"]*)/)[1];
  var __RequestVerificationToken = response.match(/name="__RequestVerificationToken" type="hidden" value="([^"]*)/)[1];

  patient_insert_tokens["new_patient_token_ID"]=new_patient_token_ID;
  patient_insert_tokens["__RequestVerificationToken"]=__RequestVerificationToken;

  return patient_insert_tokens;
}
//-----------------------------------------------------------------------------------
function patient_generator(patient_insert_tokens)
{
    //Create an object to store all patient data
    var patient_data = new Object();
   
    //Name and address generator
    patient_data.firstname = random_word_generator();
    patient_data.surname = random_word_generator().toUpperCase();
    patient_data.firstaddressline = random_word_generator() + " House";
    patient_data.secondaddressline = random_word_generator() + " Street";
    patient_data.thirdaddressline = random_word_generator();
    patient_data.fourthaddressline = random_word_generator() + " Town";
    patient_data.fifthaddressline = random_word_generator() + " City";
    patient_data.postcode = "TR11 4HL";                                    
    patient_data.email = "automation" + patient_data.surname + "@fakemail.com";
    patient_data.fullname = patient_data.surname.toUpperCase() + ", " + patient_data.firstname;
    
    //Title generator
    var array_of_titles = ["Mr","Mrs","Ms","Miss","Dr","Prof"];
    patient_data.title = array_of_titles[Math.floor(Math.random()*array_of_titles.length)];
    
    //Italian overides - Changes required to make data fit the Italian model 
    if (language == "Italian")
    {
      patient_data.postcode = "60030";  
      var array_of_titles = ["Sig","Sig.ra","Dr","Prof"];
      patient_data.title = array_of_titles[Math.floor(Math.random()*array_of_titles.length)];
      patient_data.NHSNumber = get_fiscal_code();
    }
    
    //DOB generator between 1940 and 2004
    patient_data.day_of_birth = Math.floor(Math.random() * (28 - 1 + 1) + 1);
    patient_data.month_of_birth = ("0" + Math.floor(Math.random() * (12 - 01 + 1) + 01)).slice(-2);
    patient_data.year_of_birth =  Math.floor(Math.random() * (2004 - 1940 + 1) + 1940); 
    patient_data.shortmonth = set_month(patient_data.month_of_birth);
    patient_data.dob = patient_data.year_of_birth + "/" + patient_data.month_of_birth + "/" + patient_data.day_of_birth;
    patient_data.born = patient_data.day_of_birth + "-" + patient_data.shortmonth + "-" + patient_data.year_of_birth;
    
    //Sex & Gender generator 
    var array_of_genders = ["Male","Female"];
    patient_data.gender = array_of_genders[Math.floor(Math.random()*2)];
    patient_data.sex = patient_data.gender;
    
    //Patient Number generator
    patient_data.patientnumber = Math.floor(Date.now() / 100);
    
    //Patient Insert Parameters
    patient_data.externalResultId = "";
    patient_data.id = patient_insert_tokens.new_patient_token_ID;
    patient_data.__RequestVerificationToken = patient_insert_tokens.__RequestVerificationToken;

    return patient_data;
}