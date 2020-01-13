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
//  open_browser_webapp();
  add_users();
//  open_ssms();
//  reset_passwords();
//  add_location_details();
//  add_patients();
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
// 
function add_users()
{
    // Read input file
    driver = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Test_Data\\NewDB_Locs.xls","Locs");
    

    // 
    while (!driver.EOF())
    {
       if (driver.Value(21) == "Y")
       {
          var w_user = set_username(driver.Value(17), driver.Value(1));

          Log_On_User(w_user, "");

          var INRstarV5 = set_system();
             
          driverUsers = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Test_Data\\NewDB_Locs.xls","Users");
          while (!driverUsers.EOF())
          {
             if (driverUsers.Value(0) == "Y")
             {
              Goto_Add_User();
              
              w_new_user = driverUsers.Value(2)+"@"+aqString.ToLower(set_practice_name(driver.Value(1)));
              Log.Message("User : " + w_new_user);
              
              add_user_details(INRstarV5, driverUsers, w_new_user);
            
              Goto_Manage_User(w_new_user);
              set_low_users_permissions(INRstarV5, driverUsers);

             }
             driverUsers.Next();      
          }
          Log_Off();   
       }
       driver.Next();      
    }
}  
//-------------------------------------------------------------------------------
// Add the User details
function add_user_details(INRstarV5, driverUsers, p_username)
{
  Log.Message("Adding User: " + driverUsers.Value(1));
  
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelLC = panelMCP.Panel("AdminContent").Panel("LocationContent").Panel(0);
  var formUser = panelLC.Panel("LocationTabContent").Panel("CreateUserWrapper").Form("CreateUserForm");
  
  formUser.Panel(0).Textbox("FullName").Text = driverUsers.Value(1);
  formUser.Panel(1).Textbox("Username").Text = p_username;
  formUser.Panel(2).PasswordBox("Password").Text = "" //driver.Value(3);
  formUser.Panel(3).PasswordBox("ConfirmPassword").Text = "" //driver.Value(3);
  
  formUser.Panel(4).SubmitButton("Add").Click();  
    
}
//=======================================================================
// Add Location details
function add_location_details()
{
    // Read input file
    driver = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Test_Data\\NewDB_Locs.xls","Locs");
    

    // for the Client record, call the create process
    while (!driver.EOF())
    {
       if (driver.Value(21) == "Y")
       {
          var w_user = set_username("lead", driver.Value(1));

          Log_On_User(w_user, "");

          add_poct_batch();
          
          add_acs();          

          Log_Off();   
       }
       driver.Next();      
    }
}
//=======================================================================
// Add Patients
function add_patients()
{
    // Read input file
    driver = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Test_Data\\NewDB_Locs.xls","Locs");
    

    // for the Client record, call the create process
    while (!driver.EOF())
    {
       if (driver.Value(21) == "Y")
       {
          var w_user = set_username("lead", driver.Value(1));

          Log_On_User(w_user, "");

          quick_patient_arrays();
          
          Log_Off();   
       }
       driver.Next();      
    }
}
//===============================================================================
//-------------------------------------------------------------------------------
// Set PoCT Batch details Panel("AdminContent")
function add_poct_batch()
{
  Log.Message ("Adding NPT Batch details");  
  
  Goto_Admin_NPT_Batch();
    
  var INRstarV5 = set_system();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelAC = panelMCP.Panel("AdminContent");
  
  // click Add NPT button
  panelAC.Panel(0).Panel(0).Button("AddPoCTBatch").Click();
  
  formNBD = panelAC.Form("NewPoCTBatchDetailsForm");
  formNBD.Panel(0).Textbox("BatchNumber").Text = "PoCT" + aqConvert.IntToStr(Math.floor(Math.random()*100));
  // Set Date
  formNBD.Panel(1).Image("calendar_png").Click(12, 10);
  panelCal = INRstarV5.Panel("ui_datepicker_div");
  panelCal.Panel(0).Panel(0).Select(0).ClickItem("Dec");
  panelCal.Panel(0).Panel(0).Select(1).ClickItem("2014");
  panelCal.Table(0).Cell(2, 3).Link(0).Click();
  
  // Save details
  formNBD.Panel(2).SubmitButton("SubmitNewPoCTBatchDetails").Click();
}
//-------------------------------------------------------------------------------
// Add A/C Clinicians 
function add_acs()
{
  Log.Message ("Adding A/C Clinicians");  
  
  Goto_Admin_Clinicians();   
  
  var INRstarV5 = set_system();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelAC = panelMCP.Panel("AdminContent");
  
  // click Add A/C button
  panelAC.Panel(0).Panel(0).Button("AddDoctorLink").Click();
  
  formACF = panelAC.Fieldset(0).Form("AddClinicianForm");
  formACF.Panel(0).Textbox("Name").Text = "Dr Jones";
  formACF.Panel(1).Textbox("Phone").Text = "01209 710999";
  
  // Save details
  formACF.Panel(2).SubmitButton("Save").Click();
}
