//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function validate_new_bridging_record_button_state()
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
//--------------------------------------------------------------------------------
function validate_bridging_tab_exists()
{
  var tab = INRstar_base().NativeWebObject.Find("idStr", "PatientBridgingTab");
  if(tab.Exists == true && drug == "Warfarin")
  {
    Log.Message("Drug is " + drug + ". Tab Exists.")
    return true;
  }
  else if(tab.Exists != true && drug != "Warfarin")
  {
    Log.Message("Drug is " + drug + ". Tab Doesn't Exist.")
    return true;
  }
  else
  {
    return false;
  }
}