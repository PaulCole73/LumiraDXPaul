//USEUNIT Admin_Dash_System_Paths
//USEUNIT System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Popup_Handlers
//--------------------------------------------------------------------------------

function edit_client_location_licenses(client_name, location_name, license_index, no_license, no_pst_license, license_exp_date, clinic_sys_index)
{
  Goto_Client_Location(client_name, location_name);
  admin_dash_client_details().Panel(1).Button("ManageLocation").Click();
  admin_dash_location_tabs().Link("LocationLicenceLink").Click();
  
  var container = admin_dash_location_details();
  container.Panel(12).Button("EditLocationLicenceLink").Click();
  
  var details = new Array();
  var form = container.Form("EditLocationLicenceForm");
  
  if(license_index != null)
  {
    var temp = form.Panel(0).Select("LicenceType");
    temp.ClickItem(license_index);
    details.push(temp.value);
  }
  if(no_license != null)
  {
    temp = form.Panel(1).Select("NumberOfLicences");
    temp.ClickItem(no_license);
    details.push(temp.value);
  }
  if(no_pst_license != null)
  {
    temp = form.Panel(2).Select("NumberOfPscLicences");
    temp.ClickItem(no_pst_license);
    details.push(temp.value);
  }
  
  if(license_exp_date != null)
  {
    form.Panel(3).Image("calendar_png").Click();
    var datepicker = admin_dash_base().Panel("ui_datepicker_div");
  
    var w_yr = aqString.SubString(license_exp_date, 6, 4);
    var w_mth = aqConvert.StrToInt(aqString.SubString(license_exp_date, 3, 2));
    var w_day = aqString.SubString(license_exp_date, 0, 2);
  
    datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
    datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
    var status = select_day(w_day, datepicker);
  
    temp = form.Panel(3).Textbox("ExpiryDate");
    details.push(temp.value);
  }
  
  if(clinic_sys_index != null)
  {
    temp = form.Panel(4).Select("ClinicalSystemId");
    temp.ClickItem(clinic_sys_index);
    details.push(temp.value);
  }
  form.Panel(9).SubmitButton("UpdateLocationsLicenceDetails").Click();
  return details;
}