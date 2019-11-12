//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tsa_bridging_check_button_state()
{
  var state;
  var tab = INRstar_base().NativeWebObject.Find("idStr", "PatientBridgingTab");
  if(tab.Exists == true)
  {
    patient_clinical_tab().Link("PatientBridgingTab").Click();
    WaitSeconds(1);
    var button = INRstar_base().NativeWebObject.Find("idStr", "New_Bridging_Record");
    if(button.Exists == true)
    {
      state = patient_treatment_bridging_tab().Panel(0).Button("New_Bridging_Record").enabled;
    }
  }
  else
  {
    state = "undefined";
  }
  
  return state;
}