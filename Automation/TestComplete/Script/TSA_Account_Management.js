//USEUNIT Admin_Dash_System_Paths
//USEUNIT System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Popup_Handlers
//--------------------------------------------------------------------------------
function add_new_client(name)
{
  admin_dash_navigation().Link("AccountManagementLink").Click();
  admin_dash_new_client_button().Click();
    
  admin_dash_new_client_form().Panel(0).Textbox("Name").innerText = name;
  admin_dash_new_client_form().Panel(1).Select("Segment").ClickItem(3);
  
  var val = new_guid(7);
  admin_dash_new_client_form().Panel(2).Textbox("Code").innerText = val;
  
  admin_dash_new_client_form().Panel(3).Textbox("Contact").innerText = "1234567890";
  admin_dash_new_client_form().Panel(4).Textbox("Title").innerText = "Tester";
  admin_dash_new_client_form().Panel(5).Textbox("PhoneNumber").innerText = "1234567890";
  admin_dash_new_client_form().Panel(6).Textbox("MobileNumber").innerText = "1234567890";
  admin_dash_new_client_form().Panel(7).Textbox("AddressLine1").innerText = "Test Lane";
  admin_dash_new_client_form().Panel(8).Textbox("AddressLine2").innerText = "Test Place";
  admin_dash_new_client_form().Panel(9).Textbox("AddressLine3").innerText = "Test Street";
  admin_dash_new_client_form().Panel(10).Textbox("Town").innerText = "Test Town";
  admin_dash_new_client_form().Panel(11).Textbox("County").innerText = "Test County";
  admin_dash_new_client_form().Panel(12).Textbox("PostCode").innerText = "Tst 001";
  admin_dash_new_client_form().Panel(13).Textbox("Country").innerText = "Test Country";
  
  val = get_unique_number();
  admin_dash_new_client_form().Panel(14).Textbox("PrimaryEmailAddress").innerText = "test+" + val + "@gmail.com";
  
  val = get_unique_number();
  admin_dash_new_client_form().Panel(15).Textbox("SecondaryEmailAddress").innerText = "test+" + val + "@gmail.com";
  
  admin_dash_new_client_form().Panel(16).SubmitButton("Create").Click();
  WaitSeconds(4, "Creating Client...");
}
//--------------------------------------------------------------------------------
function edit_client_details(current_name, new_name) //this could be done in a loop, but due to the possible need for the user to set these values it is currently using this method
{
  Goto_Client(current_name)
  admin_dash_client_details().Panel(17).Button("EditClientAccountLink").Click();
  
  admin_dash_edit_client_form().Panel(1).Textbox("Name").innerText = new_name;
  admin_dash_edit_client_form().Panel(2).Select("Segment").ClickItem(2);
  
  var val = new_guid(7);
  admin_dash_edit_client_form().Panel(3).Textbox("Code").innerText = val;
  admin_dash_edit_client_form().Panel(4).Textbox("Contact").innerText = "edited";
  admin_dash_edit_client_form().Panel(5).Textbox("Title").innerText = "edited";
  admin_dash_edit_client_form().Panel(6).Textbox("PhoneNumber").innerText = "edited";
  admin_dash_edit_client_form().Panel(7).Textbox("MobileNumber").innerText = "edited";
  admin_dash_edit_client_form().Panel(8).Textbox("AddressLine1").innerText = "edited";
  admin_dash_edit_client_form().Panel(9).Textbox("AddressLine2").innerText = "edited";
  admin_dash_edit_client_form().Panel(10).Textbox("AddressLine3").innerText = "edited";
  admin_dash_edit_client_form().Panel(11).Textbox("Town").innerText = "edited";
  admin_dash_edit_client_form().Panel(12).Textbox("County").innerText = "edited";
  admin_dash_edit_client_form().Panel(13).Textbox("PostCode").innerText = "edited";
  admin_dash_edit_client_form().Panel(14).Textbox("Country").innerText = "edited";
  
  val = get_unique_number();
  admin_dash_edit_client_form().Panel(15).Textbox("PrimaryEmailAddress").innerText = "edit+" + val + "@gmail.com";
  
  val = get_unique_number();
  admin_dash_edit_client_form().Panel(16).Textbox("SecondaryEmailAddress").innerText = "edit+" + val + "@gmail.com";
  
  admin_dash_edit_client_form().Panel(17).SubmitButton("Update").Click();
  WaitSeconds(2, "Waiting for edit for to update...");
}
//--------------------------------------------------------------------------------
function add_a_new_user(client_name, user_level)
{
  if(user_level == "org clinical")
  {
    Goto_Client_Users(client_name);
    admin_dash_client_details().Panel(0).Button("Add").Click();
  
    var form = admin_dash_add_user_form();
  
    var val = get_unique_number();
    var username = val + "@regression";
    var password = get_login_details(21);
  
    form.Panel(0).Textbox("FullName").innerText = username;
    form.Panel(1).Textbox("Username").innerText = username;
    form.Panel(2).PasswordBox("Password").innerText = password;
    form.Panel(3).PasswordBox("ConfirmPassword").innertext = password;
  
    form.Panel(4).SubmitButton("Add").Click();
    WaitSeconds(2, "Waiting for add user...");
  }
  else if(user_level = "location admin")
  {
    Goto_Client_Location_Users(client_name);
    admin_dash_location_details().Panel(0).Button("Add").Click();
    
    var form = admin_dash_location_admin_form();
    
    var val = get_unique_number();
    var username = val + "@regression";
    var password = get_login_details(21);
    
    form.Panel(0).Textbox("FullName").innerText = username;
    form.Panel(1).Textbox("Username").innerText = username;
    form.Panel(2).PasswordBox("Password").innerText = password;
    form.Panel(3).PasswordBox("ConfirmPassword").innertext = password;
  
    form.Panel(4).SubmitButton("Add").Click();
    WaitSeconds(2, "Waiting for add user...");
  }
  
  return username;
}
//--------------------------------------------------------------------------------
function update_a_user(client_name, username, edit_type)
{
  Goto_Client_Users(client_name);
  var table = admin_dash_account_leads_table();
  var user_index;
  
  for(var i = 1; i < table.RowCount; i++)
  {
    var temp = table.cell(i, 1).innerText;
    if(temp == username)
    {
      user_index = i;
    }
  }
  
  if(edit_type == "edit")
  {
    table.cell(user_index, 2).Button("Edit").Click();
  }
  else if(edit_type == "reset password")
  {
    table.cell(user_index, 2).Button("Reset_Password").Click();
    process_admin_dash_popup("Confirmation Required", "Confirm");
    var text = process_admin_dash_popup("Reset Password", "OK");
    
    var words = new Array();
    words = text.split(" ");
    
    text = words[8];
    return text;
  }
  else if(edit_type == "remove")
  {
    table.cell(user_index, 2).Button("DeleteClinicalLead").Click();
    process_admin_dash_popup("Confirmation Required", "Confirm");
  }
}
//--------------------------------------------------------------------------------
function update_a_location_admin(client_name, username, edit_type, edit_fullname, edit_username)
{
  Goto_Client_Location_Users(client_name);
  var table = admin_dash_location_details().Table("AccountAdministratorsTable");
  var user_index;
  
  for(var i = 1; i < table.RowCount; i++)
  {
    var temp = table.cell(i, 1).innerText;
    if(temp == username)
    {
      user_index = i;
    }
  }
  
  if(edit_type == "edit")
  {
    table.cell(user_index, 2).Button("Edit").Click();
    admin_dash_edit_location_admin_form().Panel(0).Textbox("UpdatedFullName").innerText = edit_fullname;
    admin_dash_edit_location_admin_form().Panel(1).Textbox("UpdatedUsername").innerText = edit_username;
    
    admin_dash_edit_location_admin_form().Panel(2).SubmitButton("Save").Click();
  }
  else if(edit_type == "reset password")
  {
    table.cell(user_index, 2).Button("Reset_Password").Click();
    process_admin_dash_popup("Confirmation Required", "Confirm");
    var text = process_admin_dash_popup("Reset Password", "OK");
    
    var words = new Array();
    words = text.split(" ");
    
    text = words[8];
    return text;
  }
  else if(edit_type == "remove")
  {
    table.cell(user_index, 2).Button("DeleteAdministrator").Click();
    process_admin_dash_popup("Confirmation Required", "Confirm");
  }
}
//--------------------------------------------------------------------------------
function add_treatment_location(client_name, loc_name, licence_index, loc_id)
{
  Goto_Client_Locations(client_name);
  
  admin_dash_client_details().Panel(1).Button("New_Location").Click();
  var form = admin_dash_new_location_form();
  
  form.Panel(0).Textbox("Name").innerText = loc_name;
  form.Panel(1).Select("LocationType").ClickItem(3);
  form.Panel(2).Select("LicenceType").ClickItem(licence_index);
  form.Panel(3).Textbox("Code").innerText = loc_id;
  form.Panel(4).Textbox("Contact").innerText = "1234567890";
  form.Panel(5).Textbox("Title").innerText = "Test Title";
  form.Panel(6).Textbox("PhoneNumber").innerText = "1234567890";
  form.Panel(7).Textbox("MobileNumber").innerText = "1234567890";
  form.Panel(8).Textbox("AddressLine1").innerText = "Test Addr1";
  form.Panel(9).Textbox("AddressLine2").innerText = "Test Addr2";  
  form.Panel(10).Textbox("AddressLine3").innerText = "Test Addr3";
  form.Panel(11).Textbox("Town").innerText = "Test Town";
  form.Panel(12).Textbox("County").innerText = "Test County";
  form.Panel(13).Textbox("PostCode").innerText = "Ts1 1ts";
  form.Panel(14).Textbox("Country").innerText = "Test Country";
  form.Panel(15).Textbox("PrimaryEmailAddress").innerText = "test_" + get_unique_number() + "@gmail.com";
  form.Panel(16).Textbox("SecondaryEmailAddress").innerText = "test2_" + get_unique_number() + "@gmail.com";
  
  form.Panel(17).SubmitButton("Create").Click();
  
  return loc_name;
}
//--------------------------------------------------------------------------------
function edit_client_location(client_name, location_name, new_loc_name)
{
  Goto_Client_Location(client_name, location_name)
  admin_dash_client_details().Panel(1).Button("ManageLocation").Click();
  
  var container = admin_dash_location_details();
  container.Panel(19).Button("EditLocationDetailsLink").Click();
  
  container.Form("EditLocationForm").Panel(0).Textbox("Name").innerText = new_loc_name;
  container.Form("EditLocationForm").Panel(1).Select("LocationType").ClickItem(5);
  
  var form = container.Form("EditLocationForm");
  
  form.Panel(4).Textbox("Contact").innerText = "Edited Contact";
  form.Panel(5).Textbox("Title").innerText = "Edited Test Title";
  form.Panel(6).Textbox("PhoneNumber").innerText = "123EDIT";
  form.Panel(7).Textbox("MobileNumber").innerText = "123EDIT";
  form.Panel(8).Textbox("AddressLine1").innerText = "Edit Test Addr1";
  form.Panel(9).Textbox("AddressLine2").innerText = "Edit Test Addr2";  
  form.Panel(10).Textbox("AddressLine3").innerText = "Edit Test Addr3";
  form.Panel(11).Textbox("Town").innerText = "Edit Test Town";
  form.Panel(12).Textbox("County").innerText = "Edit Test County";
  form.Panel(13).Textbox("PostCode").innerText = "st1 1st";
  form.Panel(14).Textbox("Country").innerText = "Edit Test Country";
  form.Panel(15).Textbox("PrimaryEmailAddress").innerText = "edit_" + get_unique_number() + "@gmail.com";
  form.Panel(16).Textbox("SecondaryEmailAddress").innerText = "edit2_" + get_unique_number() + "@gmail.com";
  
  form.Panel(19).SubmitButton("Update").Click();
}
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