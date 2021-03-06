//USEUNIT Navigation
//USEUNIT Common
//USEUNIT V5_Common

//===============================================================================
//
// This runs as part of the Load_Test_Data suite
//
//-------------------------------------------------------------------------------
function add_primary_users(p_run)
{
    var INRstarV5 = set_system();
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Locations.xls","Locations");
    
    // find the Local Admin record (LAxx)
    while (!driver.EOF())
    {
         if (driver.Value(0) == "PU"+p_run)
         {
            Goto_Add_User();
            add_user_details(INRstarV5);
            
            Goto_Manage_User(driver.Value(2));
            set_low_users_permissions(INRstarV5);

            if(driver.Value(7) == "Y")
            {
                 // Add as Clinician
                 Goto_Admin_Clinicians();
                 add_clinician(INRstarV5);
            }
         }
        driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Locations.xls");
}
//-------------------------------------------------------------------------------
function add_users(p_run)
{
    var INRstarV5 = set_system();
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Locations.xls","Locations");
    
    // find the Local Admin record (LAxx)
    while (!driver.EOF())
    {
         if (driver.Value(0) == "US"+p_run)
         {
            Goto_Add_User();
            add_user_details(INRstarV5);
            
            Goto_Manage_User(driver.Value(2));
            set_low_users_permissions(INRstarV5);

            if(driver.Value(7) == "Y")
            {
                 // Add as Clinician
                 Goto_Admin_Clinicians();
                 add_clinician(INRstarV5);
            }
         }
        driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Locations.xls");
}
//-------------------------------------------------------------------------------
// Add the User details
function add_user_details(INRstarV5)
{
  Log.Message("Adding User: " + driver.Value(2));
  
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelLC = panelMCP.Panel(0).Panel("AdminContent").Panel("LocationContent").Panel(0);
  var formUser = panelLC.Panel("LocationTab").Panel("LocationTabContent").Panel("CreateUserWrapper").Form("CreateUserForm");
  
  formUser.Panel(0).Textbox("FullName").Text = driver.Value(1);
  formUser.Panel(1).Textbox("Username").Text = driver.Value(2);
  formUser.Panel(2).PasswordBox("Password").Text = "Password_1" //driver.Value(3);
  formUser.Panel(3).PasswordBox("ConfirmPassword").Text = "Password_1" //driver.Value(3);
  
  formUser.Panel(4).SubmitButton("Add").Click();  
    
}
//-------------------------------------------------------------------------------
// Set User Permissions 
function set_low_users_permissions(INRstarV5, driver)
{
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");

  panelLTC = panelMCP.Panel("AdminContent").Panel("LocationContent").Panel(0).Panel("LocationTabContent");

  // Select the Permissions Tab
  panelLTC.Panel("UserContent").Panel("UserAdmin").Link("UserAuthorisationLink").Click();
  
  // Role list
  panelUAC = panelLTC.Panel("UserContent").Panel("UserAccountContent");
  formRF = panelUAC.Panel("AuthorisationWrapper").Panel("UserPermissions").Form("RolesForm");
  table = formRF.Panel("Permissions").Panel("permissionList").Table(0);
  
  // Choose Roles
  set_cbx(table.Cell(1, 1).Checkbox("roles"),driver.Value(4));
  set_cbx(table.Cell(1, 2).Checkbox("roles"),driver.Value(5));
  set_cbx(table.Cell(1, 3).Checkbox("roles"),driver.Value(6));
  set_cbx(table.Cell(1, 4).Checkbox("roles"),driver.Value(7));
  set_cbx(table.Cell(1, 5).Checkbox("roles"),driver.Value(8));
  set_cbx(table.Cell(1, 6).Checkbox("roles"),driver.Value(9));
  set_cbx(table.Cell(1, 7).Checkbox("roles"),driver.Value(10));
    
  // Click button
  table.Cell(1, 8).SubmitButton("Update").Click();  
}
//-------------------------------------------------------------------------------
// Add Clinician 
function add_clinician(INRstarV5)
{
  Log.Message ("Setting Clinician");  
    
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelAC = panelMCP.Panel(0).Panel("AdminContent");
  
  // Click Add Clinician Button
  panelAC.Panel(0).Panel(0).Button("AddDoctorLink").Click();
  
  var formAC = panelAC.Fieldset(0).Form("AddClinicianForm");
  
  // Add name
  formAC.Panel(0).Textbox("Name").Text = driver.Value(1);
  
  // Save
  formAC.Panel(2).SubmitButton("Save").Click();
}
