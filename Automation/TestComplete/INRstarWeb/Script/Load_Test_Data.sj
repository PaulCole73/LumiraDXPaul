//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT LTD_Add_Client
//USEUNIT LTD_Add_Location
//USEUNIT LTD_Add_Patients
//USEUNIT LTD_Add_Users
//USEUNIT V5_Common_Popups




function quick_start()
{
   var w_run = "02";
   
//   Log.Message("================== Client ====================");
   load_test_data_client(w_run);
}
   
function quick_start_main()
{
   var w_run = "02";
   
//   Log.Message("================== Location===================");
//   load_test_data_location(w_run);
//   Log.Message("================== Primary Users ===============");
   load_test_data_primary_users(w_run);
   reset_primary_user_passwords(w_run);
//   Log.Message("================== Location Clinical Options =");
//   load_test_data_location_clinical_options(w_run);  
   Log.Message("================== Patients ==================");
   load_test_data_patients(w_run);
//   Log.Message("================== Patients Clinical =========");
//   load_test_data_patients_clinical(w_run);
//   Log.Message("================== Patients Treatments =======");
//   load_test_data_patients_treatments(w_run);
//   Log.Message("================== Users =====================");
//   load_test_data_users(w_run);
//   Log.Message("================== IQC Results =====================");
//   load_test_data_IQC(w_run);

   
   
//   Log.Message("================== Inactivate Patients =======");
//   load_test_data_inactivate_patients(w_run);


//   Log.Message("================== Org Clinical Options  =====================");
//   load_test_data_org_clinical_options(w_run); // Don't run this bit !
}
//===============================================================================
// Log on as SCSL 
// Record : AC 
//    Add New Organisation
//    Add Org Admin Lead
// Log off

// Read Record AC : Log on as new Org Admin
//    Add Clinical Lead
// Read Record LC :
//    Add Location
//    Add Loc Admin
// Log off

// Read Record LC : Log on as new Loc Admin
// Read Record PU :
//     Add Primary Users (Users, Permissions, Clinicians)
//      Reset Primary User Passwords
// Log off

// Log on as Clinicial Level 3
// Set Location Clinical Settings
// Log off

// Log on as Clinical Lead
// Set Organisation Clinical Options
// Log off

// Log on as Clerical
// for each Patient, add demographics
// Log off

// Log on as Clinicial Level 3
// For each patient, add Clinical details & Last INR
// Log off

// Read Record LC : Log on as new Loc Admin
// Read Record US :
//     Add Users (Users, Permissions, Clinicians)
// Log off

//===============================================================================
//-------------------------------------------------------------------------------
function load_test_data_client(p_run)
{
    SCSL_Log_On();
    Goto_New_Client();
    add_client(p_run);
    SCSL_Log_Off();
}
//===============================================================================
//-------------------------------------------------------------------------------
function load_test_data_location(p_run)
{
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Locations.xls","Locations");
    
    // find the Org Admin record
    // Then add the Location and the Loc Admin
    while (!driver.EOF())
    {
         if (driver.Value(0) == "AC"+p_run)
         {
                Log_On_User(driver.Value(18), driver.Value(19));
                add_clinical_lead();
                add_location(p_run);
                Log_Off(); 
         }
        driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Locations.xls");
}
//===============================================================================
//-------------------------------------------------------------------------------
function load_test_data_primary_users(p_run)
{
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Locations.xls","Locations");
    
    // find the User records
    while (!driver.EOF())
    {
         if (driver.Value(0) == "LC"+p_run)
         {
                Log_On_User(driver.Value(18), driver.Value(19));
                add_primary_users(p_run);
                Log_Off();
         }
        driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Locations.csv");
}
//===============================================================================
//-------------------------------------------------------------------------------
function reset_primary_user_passwords(p_run)
{
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Locations.xls","Locations");
    
    // find the User records
    while (!driver.EOF())
    {
         if (driver.Value(0) == "PU"+p_run)
         {
                Log_On_User(driver.Value(18), "Password_1");
                reset_password(driver.Value(19));
                Log_Off();
         }
        driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Locations.csv");
}
//===============================================================================
//-------------------------------------------------------------------------------
function load_test_data_org_clinical_options(p_run)
{
}
//===============================================================================
//-------------------------------------------------------------------------------
function add_clinical_lead(p_run)
{
    var INRstarV5 = set_system();
    
    Goto_Manage_Location_Add_User(driver.Value(1));
    add_clinical_lead_details(INRstarV5);
    
    Goto_Manage_Location_User_Permissions(driver.Value(1), driver.Value(24));
    set_clinical_lead_permissions(INRstarV5);
}
//-------------------------------------------------------------------------------
// Add the Clinical Lead details
function add_clinical_lead_details(INRstarV5)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelLC = panelMCP.Panel(0).Panel("AdminContent").Panel("LocationContent");
    
    formUser = panelLC.Panel(0).Panel("LocationTab").Panel("LocationTabContent").Panel("CreateUserWrapper").Form("CreateUserForm");
    formUser.Panel(0).Textbox("FullName").Text = driver.Value(23);
    formUser.Panel(1).Textbox("Username").Text = driver.Value(24);
    formUser.Panel(2).PasswordBox("Password").Text = "Password_1"; //driver.Value(25);
    formUser.Panel(3).PasswordBox("ConfirmPassword").Text = "Password_1"; //driver.Value(25);
  
    formUser.Panel(4).SubmitButton("Add").Click();  
    
    Log.Message("Added Clinical Lead : " +  driver.Value(23));
    
}
//-------------------------------------------------------------------------------
// Set User Permissions 
function set_clinical_lead_permissions(INRstarV5)
{
  Log.Message ("Setting Clinical Lead Permissions");  
    
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelAC2 = panelMCP.Panel(0).Panel("AdminContent");
  var panelUC = panelAC2.Panel("LocationContent").Panel(0).Panel("LocationTab").Panel("LocationTabContent").Panel("UserContent");
  var panelUAC = panelUC.Fieldset(0).Panel("UserAdmin").Panel("UserAccountContent");
  
  // Role list
  panelRL = panelUAC.Fieldset(0).Panel("UserRoles").Form("RolesForm");
  
  // Choose Roles
  set_cbx(panelRL.Checkbox("roles"),driver.Value(26));
  set_cbx(panelRL.Checkbox("roles_2"),driver.Value(27));
  set_cbx(panelRL.Checkbox("roles_3"),driver.Value(28));
    
  // Click button
  panelRL.Panel(0).SubmitButton("Update").Click();  
}
//===============================================================================
//-------------------------------------------------------------------------------
function load_test_data_location_clinical_options(p_run)
{
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Locations.xls","Locations");
    
    // find the Location Clinical Lead record
    // Then add the NPT Batch number
    while (!driver.EOF())
    {
         if ((driver.Value(0) == "PU"+p_run) && (driver.Value(9) == "Y"))
         {
                Log_On_User(driver.Value(2), driver.Value(3));
                Goto_Admin_NPT_Batch();
                add_npt_batch();
                Log_Off(); 
         }
        driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Locations.xls");
}
//-------------------------------------------------------------------------------
// Set NPT Batch details 
function add_npt_batch()
{
  Log.Message ("Adding NPT Batch details");  
    
  var INRstarV5 = set_system();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelAC = panelMCP.Panel(0).Panel("AdminContent");
  
  // click Add NPT button
  panelAC.Panel(0).Panel(0).Button("AddNPTBatchDetailsLink").Click();
  
  formNBD = panelAC.Fieldset(0).Form("NewNPTBatchDetailsForm");
  formNBD.Panel(0).Textbox("BatchNumber").Text = "NPT" + aqConvert.IntToStr(Math.floor(Math.random()*100));
  // Set Date
  formNBD.Panel(1).Image("calendar_png").Click(12, 10);
  panelCal = INRstarV5.Panel("ui_datepicker_div");
  panelCal.Panel(0).Panel(0).Select(0).ClickItem("Jun");
  panelCal.Panel(0).Panel(0).Select(1).ClickItem("2013");
  panelCal.Table(0).Cell(2, 3).Link(0).Click();
  
  // Save details
  formNBD.Panel(2).SubmitButton("SubmitNewNPTBatchDetails").Click();
}
//===============================================================================
//-------------------------------------------------------------------------------
function load_test_data_patients(p_run)
{
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Locations.xls","Locations");
    
    // Find the Nurse user & log in to create the patients
    while (!driver.EOF())
    {
         if ((driver.Value(0) == "PU"+p_run) && (driver.Value(11) == "Y"))
         {
                Log_On_User(driver.Value(2), driver.Value(3));
                add_and_validate_patient_demographics(p_run);
                Log_Off(); 
         }
        driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Locations.xls");
}
//-------------------------------------------------------------------------------
function load_test_data_patients_clinical(p_run)
{
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Locations.xls","Locations");
    
    // Find the Clincal Lead user & log in to add the patient's clinical details
    while (!driver.EOF())
    {
         if ((driver.Value(0) == "PU"+p_run) && (driver.Value(12) == "Y"))
         {
                Log_On_User(driver.Value(2), driver.Value(3));
                add_patient_clinical(p_run)
                Log_Off(); 
         }
        driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Locations.xls");
}
//===============================================================================
//-------------------------------------------------------------------------------
function load_test_data_patients_treatments(p_run)
{
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Locations.xls","Locations");
    
    // Find the Nurse user & log in to create the patients
    while (!driver.EOF())
    {
         if ((driver.Value(0) == "PU"+p_run) && (driver.Value(13) == "Y"))
         {
                Log_On_User(driver.Value(2), driver.Value(3));
                add_patient_treatments(p_run);
                Log_Off(); 
         }
        driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Locations.xls");
}
//===============================================================================
//-------------------------------------------------------------------------------
function load_test_data_users(p_run)
{
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Locations.xls","Locations");
    
    // find the User records
    while (!driver.EOF())
    {
         if (driver.Value(0) == "LC"+p_run)
         {
                Log_On_User(driver.Value(18), driver.Value(19));
                add_users(p_run);
                Log_Off();
         }
        driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Locations.csv");
}
//===============================================================================
//-------------------------------------------------------------------------------
function load_test_data_inactivate_patients(p_run)
{
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Locations.xls","Locations");
    
    // Find the Nurse user & log in to create the patients
    while (!driver.EOF())
    {
         if ((driver.Value(0) == "US"+p_run) && (driver.Value(13) == "Y"))
         {
                Log_On_User(driver.Value(2), driver.Value(3));
                inactivate_patients(p_run);
                Log_Off(); 
         }
        driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Locations.xls");
}
//===============================================================================
//-------------------------------------------------------------------------------
function load_test_IQC(p_run)
{
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Locations.xls","Locations");
    
    // Find the Nurse user & log in to add the IQC requests
    while (!driver.EOF())
    {
         if ((driver.Value(0) == "US"+p_run) && (driver.Value(14) == "Y"))
         {
                Log_On_User(driver.Value(2), driver.Value(3));
                add_iqc_test(p_run);
                Log_Off(); 
         }
        driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Locations.xls");
}
