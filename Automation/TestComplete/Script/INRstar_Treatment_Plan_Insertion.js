//USEUNIT Misc_Functions
//USEUNIT Get_Functions
//USEUNIT INRstar_Get_Cookies_via_Powershell
//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                 INRstar Treatment plan Insert Under the hood                    //
//---------------------------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------/
function insert_treatment_plan(patient)
{    
  //Create a typical treatment plan - later on we can pass parameters down to this
  var treatment_plan = treatment_plan_generator(patient);
  
  //Convert & encode patient object into requestBody format
  var requestBody = "";
  for (var item in treatment_plan) 
  {
      if (treatment_plan.hasOwnProperty(item)) 
      {
          requestBody += item + '=' + treatment_plan[item] + '&';
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
  
  var address = "https://" + Project.Variables.hostname + "/TreatmentPlan/Add";
  var response = api_post(address, headers, requestBody);

  if (response.StatusCode != 200)
  {
    Log.Warning("Error: Treatment Plan has not been created");
  }
  
  return treatment_plan;
}
//-----------------------------------------------------------------------------------
function treatment_plan_generator(patient)
{
    //Create an object to store all treatment plan data
    var treatment_plan = new Object();
   
    //Core Details
    treatment_plan.PatientId = patient.id;
    treatment_plan.Start = convert_date_format(get_date_with_days_from_today_dd_mm_yyyy(-14), "%d-%b-%Y", "numeric");
    treatment_plan.DosingMethod = "Manual+Dosing";
    treatment_plan.DiagnosisId = "09e47469-d231-41d4-a8bd-1a2d344941f7";
    treatment_plan.DrugId = "519b40ae-d747-4524-a6e7-71384e83193b,00000000-0000-0000-0000-000000000000";
    treatment_plan.TargetINR = "2.5";
    treatment_plan.TargetINR = treatment_plan.TargetINR.replace(".", "%2C"); 
    treatment_plan.TreatmentDuration = ",";
    treatment_plan.TestingMethod = "PoCT";                                    
    treatment_plan.PreviousDrugId = "00000000-0000-0000-0000-000000000000";
    treatment_plan.LastReviewId = "";
    treatment_plan.DefaultTargetINR = "2%2C5";
    treatment_plan.DefaultTreatmentDuration = "";
    treatment_plan.id = "00000000-0000-0000-0000-000000000000";
    treatment_plan.MaxReview = "70";
    
    //True and False Flags
    treatment_plan.NPSA = "false";
    treatment_plan.UsePreviousTreatments = "False";
    treatment_plan.IsActive = "True";
    treatment_plan.HasAcknowlegedTabletWarning = "False";
    treatment_plan.ShowButtons = "False";
    treatment_plan.CanTreatmentDurationBeEnabled = "True";    
    treatment_plan.Use1 = "True";
    treatment_plan.Use3 = "True";
    treatment_plan.Use5 = "True";
    treatment_plan.UseHalfTablets = "True";
    treatment_plan.UseSplit = "false";    
    treatment_plan.AddingTreatmentPlan = "True";
    treatment_plan.IncludeAntiForgeryToken = "False";
    treatment_plan.DrugChange = "true";
    treatment_plan.IsDiagnosisSet = "true";
    treatment_plan.EditingTreatmentPlan = "False";
    treatment_plan.DoesUserHavePermissionToEditSetting = "False";    
    treatment_plan.DisplayErrors = "False";  
    treatment_plan.IsChangingDiagnosis = "False";  
    treatment_plan.IsUserAllowedToOverrideDiagnosisDefault = "True";
    treatment_plan.WrittenInfoProvided = "false";
    
    //Patient Insert Token
    treatment_plan.__RequestVerificationToken = encodeURIComponent(patient.__RequestVerificationToken);

    return treatment_plan;
}
//-----------------------------------------------------------------------------------