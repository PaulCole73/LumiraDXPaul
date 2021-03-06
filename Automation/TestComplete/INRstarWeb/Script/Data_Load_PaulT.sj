//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT Navigation_AdminDB
//USEUNIT V5_SQL


function quick_start()
{
  load_organisations();
  load_locations();
}
function load_organisations()
{
    var INRstarV5 = set_system();

    // Define input file
    driver = DDT.ExcelDriver("\\\\scslsrv1\\shared\\development and testing\\testing\\TestComplete_Test_Data\\PT-Analytics\\AnalyticsData.xls","Organisations");
   
    //Fill in the "New Client" form with details from one row of spreadsheet
    while (!driver.EOF())
    {
      Goto_New_Client(INRstarV5);          
      WaitSeconds(2);
      var panelMain = INRstarV5.Panel("MainPage");
      var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
      var formNCF = panelMCP.Fieldset(0).Form("NewClientForm");

      if (driver.Value(0) == "Y")
      {

        var Qry = ADO.CreateADODataSet();
        
        Qry.ConnectionString = SQL_Set_connection();

        Qry.CommandText  = "Select * FROM Section"
          + " WHERE Name = '" + driver.Value(1) + "'";
        Log.Message(Qry.CommandText);

        Qry.Open();
        Qry.First();
        var w_Result = Qry.RecordCount;
        Log.Message(w_Result);
        Qry.Close();
        
        //Check Organisation name you are adding doesn't already exist
        if (w_Result == 0)
        {

            //Fill in form from driver spreadsheet    
            formNCF.Panel(0).Textbox("Name").Text = driver.Value(1);
            formNCF.Panel(1).Select("Segment").ClickItem(driver.Value(2));
            formNCF.Panel(2).Textbox("Code").Text = driver.Value(3);
            formNCF.Panel(3).Textbox("Contact").Text = driver.Value(4);
            formNCF.Panel(4).Textbox("Title").Text = driver.Value(5);
            formNCF.Panel(5).Textbox("PhoneNumber").Text = driver.Value(6);
            formNCF.Panel(6).Textbox("MobileNumber").Text = driver.Value(7);
            formNCF.Panel(7).Textbox("AddressLine1").Text = driver.Value(8);
            formNCF.Panel(8).Textbox("AddressLine2").Text = driver.Value(9);
            formNCF.Panel(9).Textbox("AddressLine3").Text = driver.Value(10);
            formNCF.Panel(10).Textbox("Town").Text = driver.Value(11);
            formNCF.Panel(11).Textbox("County").Text = driver.Value(12);
            formNCF.Panel(12).Textbox("PostCode").Text = driver.Value(13);
            formNCF.Panel(13).Textbox("Country").Text = driver.Value(14);
            formNCF.Panel(14).Textbox("PrimaryEmailAddress").Text = driver.Value(15);
            formNCF.Panel(15).Textbox("SecondaryEmailAddress").Text = driver.Value(16);

            //click "Create"
            formNCF.Panel(16).SubmitButton("Create").Click();
             
        }
        else
        {
          Log.Error("The Organisation you are attempting to add already exists: " + driver.Value(1));
        }                     
 
      }
      driver.Next();      
  }    
}
function load_locations()
{
    var INRstarV5 = set_system();

    // Define input file
    driver = DDT.ExcelDriver("\\\\scslsrv1\\shared\\development and testing\\testing\\TestComplete_Test_Data\\PT-Analytics\\AnalyticsData.xls","Locations");
    
    // work through the locations tab of the datasheet
    while (!driver.EOF())
    {
    
        //setup and run SQL to find Organisation to create Location within and see if exists uniquely in database
        var Qry = ADO.CreateADODataSet();
        
        Qry.ConnectionString = SQL_Set_connection();

        Qry.CommandText  = "Select count(ID) FROM Section"
          + " WHERE Name = '" + driver.Value(1) + "'";
        Log.Message(Qry.CommandText);

        Qry.Open();
        Qry.First();
        var w_Result = Qry.RecordCount;
        Log.Message(w_Result);
        Qry.Close();
        
        //Should only be one Organisation, if there are more abort script otherwise build locations
        if (w_Result == 1)
        {

            //Navigate to Location add form for correct Organisation
            panel = INRstarV5.Panel("MainPage");
            fieldsetDC = panel.Fieldset("DashboardContent");
            // Click on Account Management
            fieldsetDC.Panel(0).Panel("navigation").Link("AccountManagementLink").Click();
            fieldsetDC.Panel("main").Panel("MainContentPanel").Panel(0).Panel(0).Textbox("searchbox").Text = driver.Value(1);
            var path1 = Aliases.iexplore1.pageInrstarAdmin2.Link("*");
            path1.Click();                     
            //fieldsetDC.panelMaincontentpanel.Panel("AccountTabs").Link("AccountLocationsTab").Click();
            Aliases.iexplore1.pageInrstarAdmin2.fieldsetDashboardcontent.panelMaincontentpanel.Panel("AccountTabs").Link("AccountLocationsTab").Click();
            Aliases.iexplore1.pageInrstarAdmin2.fieldsetDashboardcontent.panelMaincontentpanel.Panel("ClientAccountContent").Panel(1).Button("New_Location").Click();
            //fieldsetDC.panelMaincontentpanel.Panel("ClientAccountContent").Panel(1).Button("New_Location").Click();            
            //Fill in form from spreadsheet





        }
        else
        {
          Log.Error("There is more than 1 Organisation with the name" + driver.Value(1));
        }

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
//      Goto_New_Client(INRstarV5);          
//
//      var panelMain = INRstarV5.Panel("MainPage");
//      var panelMCP = panelMain.Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
//      var formNCF = panelMCP.Fieldset(0).Form("NewClientForm");
//
//      if (driver.Value(0) == "Y")
//      {
//      
//          //Fill in form from driver spreadsheet    
//          formNCF.Panel(0).Textbox("Name").Text = driver.Value(1);
//          formNCF.Panel(1).Select("LocationType").ClickItem(driver.Value(2));
//          formNCF.Panel(2).Textbox("LicenceType").Text = driver.Value(3);
//          formNCF.Panel(3).Textbox("Code").Text = driver.Value(4);
//          formNCF.Panel(3).Textbox("Contact").Text = driver.Value(4);
//          formNCF.Panel(4).Textbox("Title").Text = driver.Value(5);
//          formNCF.Panel(5).Textbox("PhoneNumber").Text = driver.Value(6);
//          formNCF.Panel(6).Textbox("MobileNumber").Text = driver.Value(7);
//          formNCF.Panel(7).Textbox("AddressLine1").Text = driver.Value(8);
//          formNCF.Panel(8).Textbox("AddressLine2").Text = driver.Value(9);
//          formNCF.Panel(9).Textbox("AddressLine3").Text = driver.Value(10);
//          formNCF.Panel(10).Textbox("Town").Text = driver.Value(11);
//          formNCF.Panel(11).Textbox("County").Text = driver.Value(12);
//          formNCF.Panel(12).Textbox("PostCode").Text = driver.Value(13);
//          formNCF.Panel(13).Textbox("Country").Text = driver.Value(14);
//          formNCF.Panel(14).Textbox("PrimaryEmailAddress").Text = driver.Value(15);
//          formNCF.Panel(15).Textbox("SecondaryEmailAddress").Text = driver.Value(16);
//
//          //click "Create"
//          formNCF.Panel(16).SubmitButton("Create").Click();
//
//      }
      driver.Next();      
  }    
}