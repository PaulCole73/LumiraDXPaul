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