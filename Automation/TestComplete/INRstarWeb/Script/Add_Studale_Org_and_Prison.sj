//USEUNIT Navigation
//USEUNIT LTD_Add_Users
//USEUNIT Common
//USEUNIT V5_Common

//===============================================================================
//
// Load 1 Organisation and multiple locations
//
//-------------------------------------------------------------------------------
function add_locations()
{
    var INRstarV5 = set_system();
    
    Log_On(0); // Sys Admin

    Goto_New_Client();
 
    Log.Message ("Adding Client");
           
     w_client = "Studale Organisation";
     add_client_details();
             
      WaitSeconds(2,"");
             
      Goto_View_Client(w_client);
      Goto_Add_Administrator();
      add_org_admin_details();

      Log.Message ("Adding Location");    

       // Add Location
      Goto_Add_Location();
      add_location_details()
            
      WaitSeconds(2,"");
            
      // Add Location Admin Lead
      Goto_Manage_Location_Add_User("Studale Prison & Recreation Centre");
      add_loc_admin_details(INRstarV5);

      Goto_Manage_Location_User_Permissions(driver.Value(1), driver.Value(18));
      set_loc_admin_permissions(INRstarV5);
            
}
//-------------------------------------------------------------------------------
// Add Client Details
function add_client_details()
{
    var INRstarV5 = set_admin_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    var formNCF = panelMCP.Fieldset(0).Form("NewClientForm");
    
    formNCF.Panel(0).Textbox("Name").Text = driver.Value(1);
    formNCF.Panel(1).Select("Segment").ClickItem(driver.Value(2));
    formNCF.Panel(2).Textbox("Code").Text = driver.Value(3);
    formNCF.Panel(3).Textbox("Contact").Text = driver.Value(4);
    formNCF.Panel(4).Textbox("Title").Text = driver.Value(5);
    formNCF.Panel(5).Textbox("PhoneNumber").Text = driver.Value(6);
    if (driver.Value(7) == !null)
       formNCF.Panel(6).Textbox("MobileNumber").Text = driver.Value(7);
    formNCF.Panel(7).Textbox("AddressLine1").Text = driver.Value(8);
    if (driver.Value(9) == !null)
        formNCF.Panel(8).Textbox("AddressLine2").Text = driver.Value(9);
    if (driver.Value(10) == !null)
        formNCF.Panel(9).Textbox("AddressLine3").Text = driver.Value(10);
    formNCF.Panel(10).Textbox("Town").Text = driver.Value(11);
    formNCF.Panel(11).Textbox("County").Text = driver.Value(12);
    formNCF.Panel(12).Textbox("PostCode").Text = driver.Value(13);
    formNCF.Panel(13).Textbox("Country").Text = driver.Value(14);
    if (driver.Value(14) == !null)
       formNCF.Panel(15).Textbox("PrimaryEmailAddress").Text = driver.Value(15);
//    formNCF.Panel(15).Textbox("?_EmailAddress").Text = driver.Value(16);
    
    // Click Create button
    formNCF.Panel(16).SubmitButton("Create").Click();

    // Write the details out
    var w_mess = "Client," + driver.Value(1) + " added";
    Log.Message("----------------- " + w_mess);


}

//-------------------------------------------------------------------------------
// Add Org Admin Details
function add_org_admin_details()
{
    var INRstarV5 = set_admin_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    var formA = panelMCP.Panel("AccountTabs").Panel("ClientAccountContent").Panel("AddAdministratorWrapper").Form("AddAdministrator");
    
    formA.Panel(0).Textbox("FullName").Text = driver.Value(17);
    formA.Panel(1).Textbox("Username").Text = driver.Value(18);
    formA.Panel(2).PasswordBox("Password").Text = driver.Value(19);
    formA.Panel(3).PasswordBox("ConfirmPassword").Text = driver.Value(19);
    
    // Click Add button
    formA.Panel(4).SubmitButton("Add").Click();
    
    Log.Message("Added Org Admin : " +  driver.Value(17));
    
}
//-------------------------------------------------------------------------------
// Add the Location details
function add_location_details()
{
    var INRstarV5 = set_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var formNSF = panelMCP.Panel(0).Panel("AdminContent").Fieldset(0).Form("NewSectionForm");
    
    formNSF.Panel(0).Textbox("Name").Text = driver.Value(1);
    formNSF.Panel(1).Select("LocationType").ClickItem(driver.Value(2));
    formNSF.Panel(2).Textbox("Code").Text = driver.Value(3);
    formNSF.Panel(3).Textbox("Contact").Text = driver.Value(4);
    formNSF.Panel(4).Textbox("Title").Text = driver.Value(5);
    formNSF.Panel(5).Textbox("PhoneNumber").Text = driver.Value(6);
    if (driver.Value(7) == !null)
       formNSF.Panel(6).Textbox("MobileNumber").Text = driver.Value(7);
    formNSF.Panel(7).Textbox("AddressLine1").Text = driver.Value(8);
    if (driver.Value(9) == !null)
        formNSF.Panel(8).Textbox("AddressLine2").Text = driver.Value(9);
    if (driver.Value(10) == !null)
        formNSF.Panel(9).Textbox("AddressLine3").Text = driver.Value(10);
    formNSF.Panel(10).Textbox("Town").Text = driver.Value(11);
    formNSF.Panel(11).Textbox("County").Text = driver.Value(12);
    formNSF.Panel(12).Textbox("PostCode").Text = driver.Value(13);
    formNSF.Panel(13).Textbox("Country").Text = driver.Value(14);
    if (driver.Value(15) == !null)
       formNSF.Panel(14).Textbox("PrimaryEmailAddress").Text = driver.Value(15);
//    formNSF.Panel(15).Textbox("?_EmailAddress").Text = driver.Value(16);
    
    // Click Create button
    formNSF.Panel(16).SubmitButton("Create").Click();

    // Write the details out
    var w_mess = "Location," + driver.Value(1) + " added";
    Log.Message("----------------- " + w_mess);


}
//-------------------------------------------------------------------------------
// Add the Loc Admin details
function add_loc_admin_details(INRstarV5)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelAC = panelMCP.Panel(0).Panel("AdminContent");
    var panelLTC = panelAC.Panel("LocationContent").Panel(0).Panel("LocationTab").Panel("LocationTabContent");
    
    var formUser = panelLTC.Panel("CreateUserWrapper").Form("CreateUserForm");
    formUser.Panel(0).Textbox("FullName").Text = driver.Value(17);
    formUser.Panel(1).Textbox("Username").Text = driver.Value(18);
    formUser.Panel(2).PasswordBox("Password").Text = "Password_1"; // driver.Value(19);
    formUser.Panel(3).PasswordBox("ConfirmPassword").Text = "Password_1"; // driver.Value(19);
  
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
 