//USEUNIT Navigation
//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Popups

//===============================================================================
//-------------------------------------------------------------------------------
// Add Client Details
function add_client_details()
{
    var INRstarV5 = set_admin_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    var formNCF = panelMCP.Fieldset(0).Form("NewClientForm");
    
    formNCF.Panel(0).Textbox("Name").Text = "Load Testing";
    formNCF.Panel(1).Select("Segment").ClickItem("PCT");
    formNCF.Panel(2).Textbox("Code").Text = "LT001";
    formNCF.Panel(3).Textbox("Contact").Text = "Ryan P";
    formNCF.Panel(4).Textbox("Title").Text = "Developer";
    formNCF.Panel(5).Textbox("PhoneNumber").Text = "n/a";
    formNCF.Panel(7).Textbox("AddressLine1").Text = "Dev Team";
    formNCF.Panel(10).Textbox("Town").Text = "Pool";
    formNCF.Panel(11).Textbox("County").Text = "Cornwall";
    formNCF.Panel(12).Textbox("PostCode").Text = "TR14 0HX";
    formNCF.Panel(13).Textbox("Country").Text = "UK";
    
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
