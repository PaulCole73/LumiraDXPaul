//USEUNIT Navigation_AdminDB
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
    // Read input file
    driver = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Test_Data\\Studale_Org.xls","Locations");
    driver.Next();      
    
    SCSL_Log_On();

    var INRstarV5 = set_admin_system();
 
    Log.Message ("Adding Client");
           
    // for the Client record, call the create process
    while (!driver.EOF())
    {
         if (driver.Value(0) == "Org")
         {
             w_client = driver.Value(1);
//             Goto_New_Client(INRstarV5);
//             add_client_details(INRstarV5);
//             
//             WaitSeconds(2,"");
//             
//             Goto_View_Client(INRstarV5, w_client);
//             Goto_Add_Org_Clincial_Lead(INRstarV5);
//             add_org_clinical_lead_details(INRstarV5);
             
            driver.Next();      
             
             Log.Message ("Adding Location");    
             Goto_View_Client(INRstarV5, w_client);

              while (!driver.EOF())
              {
                      if (driver.Value(0) == "LC")
                       {
                           // Add Location
//                          Goto_Add_Location(INRstarV5);
//                          add_location_details(INRstarV5)
//            
//                          WaitSeconds(2,"Waiting before Adding Licence");
//            
                         // Add the Location Licence
                         Goto_Locn_Licence(INRstarV5, driver.Value(1));
                         set_licence(INRstarV5, driver);

//                          WaitSeconds(2,"Waiting before Adding Location Admin");

//                          // Add Location Admin Lead
//                          Goto_Add_Locn_Administrator(INRstarV5, driver.Value(1));
//                          add_loc_admin_details(INRstarV5);            
//
                       }
                      driver.Next();      
               }
         }
    }

    //DDT.CloseDriver("d:\\Test_Data\\Locations.xls");
}
//-------------------------------------------------------------------------------
// Add Client Details
function add_client_details(INRstarV5)
{
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
function add_org_clinical_lead_details(INRstarV5)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    var formA = panelMCP.Panel("ClientAccountContent").Panel("AddAdministratorWrapper").Form("AddAdministrator");
    
    formA.Panel(0).Textbox("FullName").Text = driver.Value(4);
    formA.Panel(1).Textbox("Username").Text = driver.Value(18);
    formA.Panel(2).PasswordBox("Password").Text = driver.Value(19);
    formA.Panel(3).PasswordBox("ConfirmPassword").Text = driver.Value(19);
    
    // Click Add button
    formA.Panel(4).SubmitButton("Add").Click();
    
    Log.Message("Added Org Admin : " +  driver.Value(17));
}
//-------------------------------------------------------------------------------
// Add the Location details
function add_location_details(INRstarV5)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    var formNSF = panelMCP.Panel("ClientAccountContent").Panel("LocationTabContent").Fieldset(0).Form("NewLocationForm");
    
    formNSF.Panel(0).Textbox("Name").Text = driver.Value(1);
    formNSF.Panel(1).Select("LocationType").ClickItem(driver.Value(2));
     formNSF.Panel(2).Select("LicenceType").ClickItem("Treatment");
   formNSF.Panel(3).Textbox("Code").Text = driver.Value(3);
    formNSF.Panel(4).Textbox("Contact").Text = driver.Value(4);
    formNSF.Panel(5).Textbox("Title").Text = driver.Value(5);
    formNSF.Panel(6).Textbox("PhoneNumber").Text = driver.Value(6);
    if (driver.Value(7) == !null)
       formNSF.Panel(7).Textbox("MobileNumber").Text = driver.Value(7);
    formNSF.Panel(8).Textbox("AddressLine1").Text = driver.Value(8);
    if (driver.Value(9) == !null)
        formNSF.Panel(9).Textbox("AddressLine2").Text = driver.Value(9);
    if (driver.Value(10) == !null)
        formNSF.Panel(10).Textbox("AddressLine3").Text = driver.Value(10);
    formNSF.Panel(11).Textbox("Town").Text = driver.Value(11);
    formNSF.Panel(12).Textbox("County").Text = driver.Value(12);
    formNSF.Panel(13).Textbox("PostCode").Text = driver.Value(13);
    formNSF.Panel(14).Textbox("Country").Text = driver.Value(14);
    if (driver.Value(15) == !null)
       formNSF.Panel(15).Textbox("PrimaryEmailAddress").Text = driver.Value(15);
//    formNSF.Panel(15).Textbox("?_EmailAddress").Text = driver.Value(16);
    
    // Click Create button
    formNSF.Panel(17).SubmitButton("Create").Click();

    // Write the details out
    var w_mess = "Location," + driver.Value(1) + " added";
    Log.Message("----------------- " + w_mess);


}
//-------------------------------------------------------------------------------
// Add the Loc Admin details
function add_loc_admin_details(INRstarV5)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
    var panelLTC = panelMCP.Panel("ClientAccountContent").Panel("LocationTabContent")
    var panelAAW = panelLTC.Panel("ManageLocationsTabContent").Panel("AddAdministratorWrapper");
    
    var formUser = panelAAW.Form("AddLocationUser");
    formUser.Panel(0).Textbox("FullName").Text = driver.Value(4);
    formUser.Panel(1).Textbox("Username").Text = driver.Value(18);
    formUser.Panel(2).PasswordBox("Password").Text = driver.Value(19);
    formUser.Panel(3).PasswordBox("ConfirmPassword").Text = driver.Value(19);
  
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
    formELLF.Panel(1).Select("NumberOfLicences").ClickItem("125");

    var w_date = driver.Value(20);
    var w_day = aqString.SubString(w_date,0,2);
    var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
    var w_yr = aqString.SubString(w_date,6,4);
    
    formELLF.Panel(2).Image("calendar_png").Click();
    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
    select_day(w_day, w_datepicker);

//    if(driver.Value(20) != "N")
//      formELLF.Panel(3).Select("ClinicalSystemId").ClickItem(driver.Value(20));
//    if(driver.Value(19) == "Y")
//      formELLF.Panel(4).Checkbox("HasCoaguchek").ClickChecked(true);
//    if(driver.Value(18) == "Y")
//      formELLF.Panel(5).Checkbox("HasAppointments").ClickChecked(true);
    
    formELLF.Panel(6).SubmitButton("UpdateLocationsLicenceDetails").Click();
}
