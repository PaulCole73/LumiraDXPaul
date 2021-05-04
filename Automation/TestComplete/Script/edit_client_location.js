//USEUNIT Admin_Dash_System_Paths
//USEUNIT System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Popup_Handlers
//--------------------------------------------------------------------------------

function edit_client_location(client_name, location_name, new_loc_name)
{
  Goto_Client_Location(client_name, location_name)
  admin_dash_client_details().Panel(1).Button("ManageLocation").Click();
  
  var container = admin_dash_location_details();
  var obj = container.Panel(19).Button("EditLocationDetailsLink");
  click_navigation_wrapper(obj, container, "idStr", "EditLocationForm", 1);
  
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