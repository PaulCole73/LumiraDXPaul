//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT LTD_Add_Location
//USEUNIT LTD_Add_Patients
//USEUNIT LTD_Add_Users
//USEUNIT V5_Common_Popups
//USEUNIT Quick_Patient_Arrays

//=======================================================================
//
//=======================================================================
function main()
{
  open_browser_webapp();
  add_treatments();
  close_apps();
}  
//=======================================================================
function open_browser_webapp()
{
  var iexplore;
  TestedApps.iexplore.Run(1, true);
  iexplore = Aliases.iexplore1;
  iexplore.ToUrl("http://192.168.16.158:8050/");
  //Please wait until download completes: "http://192.168.16.158:8050/Security/Authentication/LogOn?ReturnUrl=%2f"
//  iexplore.pageInrstar4.Wait();
}  
//=======================================================================
function add_treatments()
{
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\NewDB_Locs.xls","Locs");
    
    while (!driver.EOF())
    {
       if (driver.Value(21) == "Y")
       {
          var w_user = set_username(driver.Value(17), driver.Value(1));

          Log_On_User(w_user, "INRstar_5");

          var INRstarV5 = set_system();
          //--- do something here
          
          
          
          
          // end of doing something
          Log_Off();   
       }
       driver.Next();      
    }
}
