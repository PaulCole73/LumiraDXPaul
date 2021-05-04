//USEUNIT Admin_Dash_System_Paths
//USEUNIT System_Paths
//USEUNIT Admin_Dash_Misc_Functions
//USEUNIT Misc_Functions
//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_Popup_Handlers
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