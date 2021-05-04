//USEUNIT Admin_Dash_System_Paths
//USEUNIT System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Popup_Handlers
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