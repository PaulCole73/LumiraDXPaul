//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//USEUNIT Popup_Handlers
//--------------------------------------------------------------------------------
function external_lookup_search_for_patient(pat_nhs)
{
  Goto_External_Patient_Lookup();
  var registered = process_external_lookup_popup();
  
  if (registered == "")
  
  {
    external_patient_lookup_reason_form().Panel(0).Checkbox("DirectCareConfirmation").Click();
    external_patient_lookup_reason_form().Panel(1).Select("Reason").ClickItem(1);
    external_patient_lookup_reason_form().Panel(2).Textbox("SupportingNotes").innerText = "Test";
    external_patient_lookup_form().Panel("AdvancedSearchLeft").Panel(0).Textbox("NHSNumber").innerText = pat_nhs;
    external_patient_lookup_form().Panel(0).SubmitButton("SearchButton").Click();
  }
  else
  {
    external_patient_lookup_reason_form_register().Panel(0).Checkbox("DirectCareConfirmation").Click();
    external_patient_lookup_reason_form_register().Panel(1).Select("Reason").ClickItem(1);
    external_patient_lookup_reason_form_register().Panel(2).Textbox("SupportingNotes").innerText = "Test";
    external_patient_lookup_form_register().Panel("AdvancedSearchLeft").Panel(0).Textbox("NHSNumber").innerText = pat_nhs;
    external_patient_lookup_form_register().Panel(0).SubmitButton("SearchButton").Click();
  }
  
  WaitSeconds(1, "Waiting for Patient Table...");
  
  var table = external_patient_lookup_form().Panel("SearchResults").Panel("PatientSearchResults").Table("PatientResults");
  var table_data = new Array();
  
  for(var i = 0; i < 6; i++)
  {
    var temp = table.Cell(1, i).innerText;
    table_data.push(aqString.Trim(temp));
  }
  
  var obj = table.Cell(1, 0).Link("PatientLink"); //.Click();
  var obj_root = INRstar_base().Panel("MainPage").Panel("main").Panel("MainContentPanel");
  click_navigation_wrapper(obj, obj_root, "idStr", "PatientBannerContainer", 2);
  
  return table_data;
}