//USEUNIT Navigation
//USEUNIT LTD_Add_Users
//USEUNIT Common
//USEUNIT V5_Common

//===============================================================================
//
// This runs as part of the Load_Test_Data suite
//
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Add the Location details
function add_location_details(INRstarV5, driver)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    var formNLF = panelMCP.Panel("ClientAccountContent").Panel("LocationTabContent").Fieldset(0).Form("NewLocationForm");
    
    formNLF.Panel(0).Textbox("Name").Text = driver.Value(1);
    formNLF.Panel(1).Select("LocationType").ClickItem(driver.Value(2));
    formNLF.Panel(2).Select("LicenceType").ClickItem("Treatment");
    formNLF.Panel(3).Textbox("Code").Text = driver.Value(3);
    formNLF.Panel(4).Textbox("Contact").Text = driver.Value(4);
    formNLF.Panel(5).Textbox("Title").Text = driver.Value(5);
    formNLF.Panel(6).Textbox("PhoneNumber").Text = driver.Value(6);
    if (driver.Value(7) == !null)
       formNLF.Panel(7).Textbox("MobileNumber").Text = driver.Value(7);
    formNLF.Panel(8).Textbox("AddressLine1").Text = driver.Value(8);
    if (driver.Value(9) == !null)
        formNLF.Panel(9).Textbox("AddressLine2").Text = driver.Value(9);
    if (driver.Value(10) == !null)
        formNLF.Panel(10).Textbox("AddressLine3").Text = driver.Value(10);
    formNLF.Panel(11).Textbox("Town").Text = driver.Value(11);
    formNLF.Panel(12).Textbox("County").Text = driver.Value(12);
    formNLF.Panel(13).Textbox("PostCode").Text = driver.Value(13);
    formNLF.Panel(14).Textbox("Country").Text = driver.Value(14);
    if (driver.Value(15) == !null)
       formNLF.Panel(15).Textbox("PrimaryEmailAddress").Text = driver.Value(15);
//    formNLF.Panel(15).Textbox("?_EmailAddress").Text = driver.Value(16);
    
    // Click Create button
    formNLF.Panel(17).SubmitButton("Create").Click();

    // Write the details out
    var w_mess = "Location," + driver.Value(1) + " added";
    Log.Message("----------------- " + w_mess);
    


}
//-------------------------------------------------------------------------------
// Add the Loc Admin details
function add_loc_admin_details(INRstarV5, driver)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    var panelLTC = panelMCP.Panel("ClientAccountContent").Panel("LocationTabContent");
    var panelAAW = panelLTC.Panel("ManageLocationsTabContent").Panel("AddAdministratorWrapper");
    
    var formUser = panelAAW.Form("AddLocationUser");
    formUser.Panel(0).Textbox("FullName").Text = driver.Value(17);
    formUser.Panel(1).Textbox("Username").Text = set_username(driver.Value(17),driver.Value(1));
    formUser.Panel(2).PasswordBox("Password").Text = "Password_1"; // driver.Value(19);
    formUser.Panel(3).PasswordBox("ConfirmPassword").Text = "Password_1"; // driver.Value(19);
  
    formUser.Panel(4).SubmitButton("Add").Click();  
    
    Log.Message("Added Location Admin : " +  driver.Value(17));
}
//-------------------------------------------------------------------------------
// Add the Licence details
function set_licence(INRstarV5, driver)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    var panelLTC = panelMCP.Panel("ClientAccountContent").Panel("LocationTabContent");
    var formELLF = panelLTC.Panel("ManageLocationsTabContent").Form("EditLocationLicenceForm");
    
    formELLF.Panel(0).Select("LicenceType").ClickItem("Treatment");
    formELLF.Panel(1).Select("NumberOfLicences").ClickItem("25");

    formELLF.Panel(2).Image("calendar_png").Click();
    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Dec"); // Month
//    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("2015"); // Year 
    w_datepicker.Table(0).Cell(3, 3).Link(0).Click();

    if(driver.Value(20) != "N")
      formELLF.Panel(3).Select("ClinicalSystemId").ClickItem(driver.Value(20));
    if(driver.Value(19) == "Y")
      formELLF.Panel(4).Checkbox("HasCoaguchek").ClickChecked(true);
    if(driver.Value(18) == "Y")
      formELLF.Panel(5).Checkbox("HasAppointments").ClickChecked(true);
    
    formELLF.Panel(6).SubmitButton("UpdateLocationsLicenceDetails").Click();
}

////-------------------------------------------------------------------------------
//// Set User Permissions 
//function set_loc_admin_permissions(INRstarV5)
//{
//  Log.Message ("Setting Location Administrator Permissions");  
//    
//  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//  var panelLT = panelMCP.Panel(0).Panel("AdminContent").Panel("LocationContent").Panel(0).Panel("LocationTab");
//  var panelUC = panelLT.Panel("LocationTabContent").Panel("UserContent");
//  var panelUAC = panelUC.Fieldset(0).Panel("UserAdmin").Panel("UserAccountContent");
//  
//  // Role list
//  panelRL = panelUAC.Fieldset(0).Panel("UserRoles").Form("RolesForm");
//  
//  // Choose Roles
//  set_cbx(panelRL.Checkbox("roles"),driver.Value(20));
//  set_cbx(panelRL.Checkbox("roles_2"),driver.Value(21));
//  set_cbx(panelRL.Checkbox("roles_3"),driver.Value(22));
//    
//  // Click button
//  panelRL.Panel(0).SubmitButton("Update").Click();  
//}
