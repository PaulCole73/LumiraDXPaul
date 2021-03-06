//USEUNIT Navigation
//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Popups

//===============================================================================
//
// This runs as part of the Load_Test_Data suite
//
//===============================================================================
// Create New Client Details

//-------------------------------------------------------------------------------
function quick_start()
{
  add_client(2);

}
function add_client()
{
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\NewDB_Locs.xls","Orgs");
    
    var w_client = ""; 

    // for the Client record, call the create process
    while (!driver.EOF())
    {
         if (driver.Value(0) == "AC")
         {
             w_client = driver.Value(1);
             add_client_details();
             
             WaitSeconds(2,"");
             
             Goto_View_Client(w_client);
             Goto_Add_Org_Clincial_Lead();
             add_org_clead_details();
         }
        driver.Next();      
    }
//    DDT.CloseDriver("d:\\Test_Data\\TestData\\Locations.xls");
    return w_client;
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
// Add Org Clinical Lead Details
function add_org_clead_details()
{
    var INRstarV5 = set_admin_system();
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
//    var formA = panelMCP.Panel("AccountTabs").Panel("ClientAccountContent").Panel("AddAdministratorWrapper").Form("AddAdministrator");
    var formA = panelMCP.Panel("ClientAccountContent").Panel("AddAdministratorWrapper").Form("AddAdministrator");
    
    formA.Panel(0).Textbox("FullName").Text = driver.Value(17);
    formA.Panel(1).Textbox("Username").Text = driver.Value(18);
    formA.Panel(2).PasswordBox("Password").Text = driver.Value(19);
    formA.Panel(3).PasswordBox("ConfirmPassword").Text = driver.Value(19);
    
    // Click Add button
    formA.Panel(4).SubmitButton("Add").Click();
    
    Log.Message("Added Org Admin : " +  driver.Value(17));
    
}
