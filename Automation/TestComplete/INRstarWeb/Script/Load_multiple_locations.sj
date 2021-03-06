//USEUNIT Navigation
//USEUNIT LTD_Add_Users
//USEUNIT Common
//USEUNIT V5_Common

//===============================================================================
//
// This runs as part of the Load_Test_Data suite
//
//-------------------------------------------------------------------------------
function add_location()
{
    // find the Location record (LCxx)
    for (i=272;i<350;i++)
    {
             // Add Location
            Goto_New_Location();
            add_location_details(i);
    }
}
//-------------------------------------------------------------------------------
// Add the Location details
function add_location_details(p_ctr)
{
    var INRstarV5 = set_admin_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    var formNSF = panelMCP.Panel("ClientAccountContent").Panel("LocationTabContent").Fieldset(0).Form("NewLocationForm");
    
    var w_name = "Load_Test_Location_" + aqConvert.IntToStr(p_ctr);
    formNSF.Panel(0).Textbox("Name").Text = w_name;
    formNSF.Panel(1).Select("LocationType").ClickItem("Practice");
    formNSF.Panel(2).Select("LicenceType").ClickItem("Treatment");
    formNSF.Panel(3).Textbox("Code").Text = "LT0" + aqConvert.IntToStr(p_ctr);
    formNSF.Panel(4).Textbox("Contact").Text = "Ryan"
    formNSF.Panel(5).Textbox("Title").Text = "Load Tester";
    formNSF.Panel(6).Textbox("PhoneNumber").Text = "n/a";
    formNSF.Panel(8).Textbox("AddressLine1").Text = "Dev Team Desk";
    formNSF.Panel(11).Textbox("Town").Text = "Pool";
    formNSF.Panel(12).Textbox("County").Text = "Cornwall";
    formNSF.Panel(13).Textbox("PostCode").Text = "TR14 0HX";
    formNSF.Panel(14).Textbox("Country").Text = "UK";
//    formNSF.Panel(15).Textbox("?_EmailAddress").Text = driver.Value(16);
    
    // Click Create button
    formNSF.Panel(17).SubmitButton("Create").Click();

    // Write the details out
    Log.Message("Location," + w_name + " added");
    


}
//-------------------------------------------------------------------------------
function add_location_admin()
{
     //Select Locaton
    var INRstarV5 = set_admin_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
      
    // Click the locations tab
    panelMCP.Panel("AccountTabs").Link("AccountLocationsTab").Click();
      
    // find the Location record (LCxx)
    for (i=1;i<350;i++)
    {
      // Select the Location 
      var w_locn = "Load_Test_Location_" + aqConvert.IntToStr(i);
      panelMCP.Panel("ClientAccountContent").Panel(0).Select("Locations").ClickItem(w_locn);
    
      // Click Manage Lcoation
      panelMCP.Panel("ClientAccountContent").Panel(1).Button("ManageLocation").Click();
                    
      // Add Location Admin Lead
      Goto_Add_Administrator();
      add_loc_admin_details(INRstarV5, i);

            
    }
}
//-------------------------------------------------------------------------------
// Add the Loc Admin details
function add_loc_admin_details(INRstarV5, p_ctr)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    var panelAC = panelMCP.Panel(0).Panel("AdminContent");
    var panelAAW = panelAC.Panel("ClientAccountContent").Panel("AddAdministratorWrapper");
    
    var formUser = panelAAW.Form("AddAdministrator");
    var w_name = "Load_Test_Admin_" + aqConvert.IntToStr(p_ctr);
    var w_locn = "Load_Test_Location_" + aqConvert.IntToStr(p_ctr);
    
    formUser.Panel(0).Textbox("FullName").Text = w_name;
    formUser.Panel(1).Textbox("Username").Text = w_name + "@" + w_locn;
    formUser.Panel(2).PasswordBox("Password").Text = "Password_1"; 
    formUser.Panel(3).PasswordBox("ConfirmPassword").Text = "Password_1"; 
  
    formUser.Panel(4).SubmitButton("Add").Click();  
    
    Log.Message("Added Location Admin : " +  driver.Value(17));
    
}
//-------------------------------------------------------------------------------
// Set User Permissions 
function set_loc_admin_permissions(INRstarV5)
{
  Log.Message ("Setting Location Administrator Permissions");  
    
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelLT = panelMCP.Panel(0).Panel("AdminContent").Panel("LocationContent").Panel(0).Panel("LocationTab");
  var panelUC = panelLT.Panel("LocationTabContent").Panel("UserContent");
  var panelUAC = panelUC.Fieldset(0).Panel("UserAdmin").Panel("UserAccountContent");
  
  // Role list
  panelRL = panelUAC.Fieldset(0).Panel("UserRoles").Form("RolesForm");
  
  // Choose Roles
  set_cbx(panelRL.Checkbox("roles"),driver.Value(20));
  set_cbx(panelRL.Checkbox("roles_2"),driver.Value(21));
  set_cbx(panelRL.Checkbox("roles_3"),driver.Value(22));
    
  // Click button
  panelRL.Panel(0).SubmitButton("Update").Click();  
}
