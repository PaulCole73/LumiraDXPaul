//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT LTD_Add_Location
//USEUNIT V5_Common_Popups

// Script to Open SSMS, then load and run the database clear down script
//
function quick_start_locs()
{
  var w_client = "Deans Automation Org";
  add_locations(w_client);
}
//=======================================================================
function main()
{
//  open_ssms();
//  reset_database();
//  open_browser_admin();
  add_clients();
  reset_passwords();
  close_apps();
}
//=======================================================================
function reset_database()
{
  Log.Message("About to Reset the Database");
  var ssms;
  var wnd_desked_gsk;
  var edit;
  var wndbosa_sdm_Mso96;
  ssms = Aliases.Ssms;
  wnd_desked_gsk = ssms.wnd_desked_gsk;
  wnd_desked_gsk.Click(527, 15);
  wnd_desked_gsk.GenericPane.GenericPane.ObjectExplorerWindow.ObjectExplorerTree.Keys("^o");
  wndbosa_sdm_Mso96 = ssms.wndbosa_sdm_Mso96;
  edit = wndbosa_sdm_Mso96.Edit;
  edit.SetText("\\\\scslsrv1\\Old_commonfiles\\Technical Information\\INRstar\\Testing\\SQL Scripts\\clearASPNETDB.sql");
  wndbosa_sdm_Mso96.Click(626, 398);
  wnd_desked_gsk.panelMsodocktop.toolbarSqlEditor.buttonExecute.ClickButton();
  Log.Message("Reset of Database Complete");
}
//=======================================================================
function open_browser_admin()
{
  var iexplore;
  TestedApps.iexplore.Run(1, true);
  iexplore = Aliases.iexplore1;
  iexplore.ToUrl("http://192.168.16.158:8080/");
  //Please wait until download completes: "http://192.168.16.158:8051/Security/Authentication/LogOn?ReturnUrl=%2f"
  iexplore.pageInrstar4.Wait();
}
//=======================================================================
function add_clients()
{
   SCSL_Log_On();
    // Read input file
    driver = DDT.ExcelDriver("Q:\\Development and Testing\\Testing\\TestComplete_Test_Data\\NewDB_Locs.xls","Orgs");
    
    var w_client = ""; 

    // for the Client record, call the create process
    while (!driver.EOF())
    {
         if (driver.Value(0) == "AC")
         {
             Goto_New_Client();
             
             w_client = driver.Value(1);
             add_client_details();
             
             WaitSeconds(2,"");
             
             // Add Org CLinical Lead
             Goto_View_Client(w_client);
             Goto_Add_Org_Clincial_Lead();
             add_org_clead_details();

//             // Set Org Clinical Details
//             Goto_View_Client(w_client);
//             load_test_data_org_clinical_options(w_client)
             
             // Add Locations
           //  add_locations(w_client);
         }
        driver.Next();      
    }
//    DDT.CloseDriver("d:\\Test_Data\\TestData\\Locations.xls");

   SCSL_Log_Off();
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
//-------------------------------------------------------------------------------
// Set Org Clinical Details
function load_test_data_org_clinical_options(w_client)
{
}
//=======================================================================
function add_locations(w_client)
{
    // Read input file
    driverLoc = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Test_Data\\NewDB_Locs.xls","Locs");
    
    var INRstarV5 = set_admin_system();

    // for each Location row, call the create process
    while (!driverLoc.EOF())
    {
         if (driverLoc.Value(0) == w_client && driverLoc.Value(21) == "Y")
         {
             Goto_View_Client(w_client);
             Goto_Add_Location();

             Log.Message("================== Location===================");
             add_location_details(INRstarV5, driverLoc);
             
             Goto_View_Client(w_client);

             // Add the Location Licence
             Goto_Locn_Licence(driverLoc.Value(1));
             set_licence(INRstarV5, driverLoc);
    
             // Add the Location Admin
             Goto_Add_Locn_Administrator(driverLoc.Value(1));
             add_loc_admin_details(INRstarV5, driverLoc);
             
         }
        driverLoc.Next();      
    }
}
//=======================================================================
function close_apps()
{
  // Close SSMS
  Log.Message("Closing SSMS");
  Aliases.Ssms.wnd_desked_gsk.Close();

}

