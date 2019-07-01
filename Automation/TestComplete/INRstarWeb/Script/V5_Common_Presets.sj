//USEUNIT V5_Common
//USEUNIT V5_Common_Popups
//USEUNIT Navigation

// This suite of routines will preset the various values for the batch testing routines

//-------------------------------------------------------------------------------
// Algorithm
function preset_Algorithm(w_run)
{
    Goto_Admin_Settings_Algorithm();
    
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelSet = panelMCP.Panel(0).Panel("AdminContent").Panel("LocationSettings");
    var panelPane = panelSet.Panel("fbf2810f_9c35_473a_94de_6ba9b5a20728Content");   
    
    // Click the Edit button
    // Go to Algorithm Pane
    Log.Message("Opening Edit page");
    panelPane.Panel(2).Button("Edit").Click();
    var form = panelPane.Form("EditSettingForm");
    
    // Set Algorithm according to parameter
    switch(aqString.SubString(w_run, 3, 1))
    {
     case "C":
          form.Panel(0).Select("Value").ClickItem("Coventry Maintenance");
          break;
     case "H":
          form.Panel(0).Select("Value").ClickItem("Hillingdon Maintenance");
          break;
    }  
    form.Panel(2).SubmitButton("Save").Click();
}
//-------------------------------------------------------------------------------
// Patient Algorithm
function preset_patient_algorithm(INRstarV5, w_corh)
{
    Goto_Patient_Clinical_Edit();
    
    Log.Message("Setting Patient Algorithm");
    
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPCD = panelMCP.Panel("PatientTabContent").Panel("PatientClinicalWrapper").Panel("PatientClinicalDetails");
    var form = panelPCD.Form("PatientEditClinicalForm");

    if (w_corh == "c")
        form.Panel("EditPatientClinicalInformation").Panel(2).Select("DosingMethod").ClickItem("Coventry Maintenance");
    else
        form.Panel("EditPatientClinicalInformation").Panel(2).Select("DosingMethod").ClickItem("Hillingdon Maintenance");
  
    process_more_information(INRstarV5);
    
  // Click Save 
  form.Panel(0).Button("UpdatePatientClinical").Click();
 
}
//-------------------------------------------------------------------------------
// Tablets
function preset_Tablets(wf_NPSA)
{
    Goto_Admin_Settings_Tablets();

    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelSet = panelMCP.Panel(0).Panel("AdminContent").Panel("LocationSettings");
    var panelPane = panelSet.Panel("c6b3b36_22c1_11de_a922_ce8f55d89593Content");   
    
    // Go to Details Pane
    Log.Message("Opening Edit page");
    panelPane.Panel(7).Button("Edit").Click();
    var form = panelPane.Form("EditSettingForm");

    // Set Details according to parameters
    if (wf_NPSA == true)
          form.Panel(4).Select("Value").ClickItem("True");
    else
          form.Panel(4).Select("Value").ClickItem("False");
    // repeat for other parameters as required      

    form.Panel(7).SubmitButton("Save").Click();
    
}
//-------------------------------------------------------------------------------
// Dose Rounding
function preset_Dose_Rounding(wf_round, w_RoundVal)
{
    Goto_Admin_Settings_Dose_Rounding();
    
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelSet = panelMCP.Panel("AdminContent").Panel("LocationSettings");
    var panelPane = panelSet.Panel("c145f7b4_9add_4958_a23f_354dbb3a792cContent");   
    
    // Go to Details Pane
    Log.Message("Opening Edit page");
    panelPane.Panel(2).Button("Edit").Click();
    var form = panelPane.Form("EditSettingForm");
    
    // Set Details according to parameter
    if (wf_round == true)
          form.Panel(1).Select("Value").ClickItem("True");
    else
          form.Panel(1).Select("Value").ClickItem("False");
          
    // Set Round Dose Value     
    form.Panel(0).Select("Value").ClickItem(w_RoundVal-1)
          
    // Save Values
    form.Panel(2).SubmitButton("Save").Click();
}
//-------------------------------------------------------------------------------
// Dose Rounding
function preset_Reduce_Type(wf_algo)
{
    Goto_Admin_Settings();
    
    var INRstarV5 = set_system();
        
    panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    panelLoc = panelMCP.Panel("AdminContent").Panel("LocationSettings");

    // High Range
    wa_Panes = new Array(5);
    wa_Panes[0] = "cf_41b4_4f70_8b4f_171f3bd5c208Content";
    wa_Panes[1] = "b2055940_4f5c_470d_844c_068a137c5144Content";
    wa_Panes[2] = "d3bda_f41a_4e07_bb4b_22ed1e9f38cdContent";
    wa_Panes[3] = "f489882c_6a33_4973_a938_0436a58628ebContent";
    wa_Panes[4] = "a20965_ec9c_434a_b5b1_e6c86dfee388Content";
    
    // High Target is Panes 4,5,6,7
    for (i=0; i < wa_Panes.length; i++)
    {
        panelLoc.Link(i+3).Click();
        set_Reduce_Type(panelLoc, wf_algo, wa_Panes[i]);
    }
    
    // Low Range
    wa_Panes = new Array(6);
    wa_Panes[0] = "fc55ee62_a6cc_4114_bcf3_df9d34c7b357Content";
    wa_Panes[1] = "ceb459_a69a_4c41_9db6_b6082670da74Content";
    wa_Panes[2] = "dc811b_1fc0_4076_9c45_2e1f0bece24bContent";
    wa_Panes[3] = "f9594e36_5be1_4542_bb65_f67776d266f6Content";
    wa_Panes[4] = "cb5e3ca_49d4_4b4b_8bad_ac6b69258f32Content";
    wa_Panes[5] = "db1269_203e_4109_a036_f3b78deb2e73Content";
    
    // High Target is Panes 13 - 18
    for (i=0; i < wa_Panes.length; i++)
    {
        panelLoc.Link(i+14).Click();
        set_Reduce_Type(panelLoc, wf_algo, wa_Panes[i]);
    }
}
//-------------------------------------------------------------------------------
// Set Reduce Type for a specfic INR range
function set_Reduce_Type(panelLoc, wf_algo, w_Pane)
{
    var panelPane = panelLoc.Panel(w_Pane);   
    
    // Go to Details Pane
    Log.Message("Opening Edit page: " + w_Pane);
    panelPane.Panel(5).Button("Edit").Click();
    var form = panelPane.Form("EditSettingForm");
    
    // Set Details according to parameter
    if (wf_algo == true)
          form.Panel(2).Select("Value").ClickItem("Algorithm");
    else
          form.Panel(2).Select("Value").ClickItem("Baglin");
          
    form.Panel(5).SubmitButton("Save").Click();
}
//-------------------------------------------------------------------------------
// Fetch Patient
function preset_Fetch_Patient(INRstarV5, w_Name)
{
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPC = panelMCP.Panel("PatientContent");
   var form = panelPC.Form("PatientSearchForm");
   
   // Enter the search parameters in the textbox      
   form.Textbox("searchCriteria").Text = w_Name;
   
   // Click the search button
   form.SubmitButton("Search").Click();
   
   // Pick the match
   var w_patient_link = INRstarV5.NativeWebObject.Find("innerText", w_Name);
   if (w_patient_link.Exists)
      w_patient_link.Click();
   else
       Log.Warning("Can't find patient: '" + w_Name+"'");
   
   process_duplicate_patient(INRstarV5);
   process_Please_confirm(INRstarV5);
}
//-------------------------------------------------------------------------------
// Fetch Patient with part name
function preset_Fetch_Patient_partname(INRstarV5, w_Name)
{
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPC = panelMCP.Panel("PatientContent");
   var form = panelPC.Form("PatientSearchForm");
   
   // Enter the search parameters in the textbox      
   form.Textbox("searchCriteria").Text = w_Name;
   
   // Click the search button
   form.SubmitButton("Search").Click();
   
   // Pick the match
   var formETPSF = panelPC.panel("SearchResults").Panel(0).Form("ExternalTestPatientSearchForm");
   var panelPSR = formETPSF.Panel("PatientSearchResults");

   var table = panelPSR.Table("PatientResults");
   if (table.RowCount > 1)
       table.Cell(1,0).Link("PatientLink").Click();
   
   process_duplicate_patient(INRstarV5);
   process_Please_confirm(INRstarV5);
}
//-------------------------------------------------------------------------------
// Fetch Patient
function preset_Fetch_Patient_NHS(INRstarV5, w_NHS)
{
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var searchForm = panelMCP.panel("PatientContent").Form("PatientSearchForm");
   
   // Enter the search parameters in the textbox      
   searchForm.Textbox("searchCriteria").Text = w_NHS;
   
   // Click the search button
   searchForm.SubmitButton("Search").Click();
   
//   // Pick the match
//   var panelSR = panelMCP.Panel("PatientContent").Panel("SearchResults");
//   var tablePR = panelSR.Panel("PatientSearchResults").Table("PatientResults");
//   var w_patient_NHS = tablePR.Cell(1, 3).Label("NHS_Number_DetachedLabel").InnerText;
//   tablePR.Cell(1, 0).Link("PatientLink").Click();
   // Pick the match
   var panelSR = panelMCP.Panel("PatientContent").Panel("SearchResults");
   var formETPSF = panelSR.Form("ExternalTestPatientSearchForm")
   var tablePR = formETPSF.Panel("PatientSearchResults").Table("PatientResults");
    var w_patient_NHS = tablePR.Cell(1, 3).Label("NHS_Number_DetachedLabel").InnerText;
   tablePR.Cell(1, 0).Link("PatientLink").Click();
   
//   process_duplicate_patient(INRstarV5);
   process_Please_confirm(INRstarV5);

//   var w_patient_link = INRstarV5.NativeWebObject.Find("innerText", w_Name);
//   if (w_patient_link.Exists)
//      w_patient_link.Click();
//   else
//       Log.Warning("Can't find patient...");
}
//-------------------------------------------------------------------------------
// Fetch Patient
function preset_Fetch_Patient_Recent()
{

   var INRstarV5 = set_system();
//   Goto_Patient_Search();

   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelRPW = panelMCP.Panel("PatientContent").Panel("RecentPatientsWrapper");
   var table = panelRPW.Table("RecentPatientsTable");
   
   // Pick the most recent
   table.Cell(1, 0).Link("PatientLink").Click();

}

//-------------------------------------------------------------------------------
// Find a Patient
   
function Preset_Find_Patient_Regression()
{
   var INRstarV5 = set_system();
   Goto_Patient_Search();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var form = panelMCP.Panel("PatientContent").Form("PatientSearchForm")
   
   var regres_nhs=("8424224248")
   
   form.Textbox("searchCriteria").Text = regres_nhs;
   form.SubmitButton("Search").Click();
   
   var panelPSR = panelMCP.Panel("PatientContent").Panel("SearchResults").Form("ExternalTestPatientSearchForm").Panel("PatientSearchResults");
   panelPSR.Table("PatientResults").Cell(1, 0).Link("PatientLink").Click();
}

//-------------------------------------------------------------------------------
// Find a Patient by Name
   
function Preset_Find_Patient_Regression_name(regres_name)
{

//Commented out due to syntax error

//   var INRstarV5 = set_system();
//   Goto_Patient_Search();
//   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//   var form = panelMCP.Panel("PatientContent").Form("PatientSearchForm");
//   
//   var name=(regres_name);
   
//   form.Textbox("searchCriteria").Text = name;
//   form.SubmitButton("Search").Click();
   
//   var panelPSR = panelMCP.Panel("PatientContent").Panel("SearchResults").Form("ExternalTestPatientSearchForm").Panel("PatientSearchResults");
//   panelPSR.Table("PatientResults").Cell(1, 0).Link("PatientLink").Click();
}
//-------------------------------------------------------------------------------
// Insert Historical Treatment (for Schedules)
function insert_historical_treatment(INRstarV5, p_target_inr, p_inr, p_dose, p_period)
{
   Log.Message("Inserting Patient Historical Treatment"); 
   
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
   var panelPTNHW = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment").Panel("PatientTreatmentNewHistoricalWrapper");
   
   
   var form = panelPTNHW.Form("NewHistoricalTreatmentForm");
   var w_vselect;
   var w_datepicker;
   
  // Click on Calendar icon --------------
  form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  // Set Valid Date
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("May");
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("2013");
  w_datepicker.Table(0).Cell(3, 4).Link(0).Click();
  
  // Set INR
  w_vselect = form.Table("AddHistoricalTreatmentTable").Cell(1, 1).Select("INR");
  w_vselect.ClickItem(FloatToString(p_inr));
  
  // Set Dose
  w_vselect = form.Table("AddHistoricalTreatmentTable").Cell(1, 2).Select("Dose");
  w_vselect.ClickItem(FloatToString(p_dose));
  
  // Set Omits
  w_vselect = form.Table("AddHistoricalTreatmentTable").Cell(1, 3).Select("Omits");
  w_vselect.ClickItem("0 Days");
  
  // Set Review Period  
  w_vselect = form.Table("AddHistoricalTreatmentTable").Cell(1, 4).Select("Review");
  
  w_vselect.ClickItem((7 * p_period) + " Days");

  // Set Target INR 
  w_vselect = form.Table("AddHistoricalTreatmentTable").Cell(1, 5).Select("TargetINR");
  w_vselect.ClickItem(FloatToString(p_target_inr));

  // Click Save to see what happens
  form.Panel(0).SubmitButton("Save").Click();
  
  // Click confirm panel
  process_confirm_historical_treatment(INRstarV5);
}
//-------------------------------------------------------------------------------
// Set Target INR
function set_target_inr(INRstarV5, p_Target_INR)
{
  Log.Message("Setting Target INR: " + p_Target_INR);
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTPD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  
  var form = panelPTPD.Form("PatientEditTreatmentPlanForm");
  var panelEPTPI = form.Panel("EditPatientTreatmentPlanInformation");   
  
  var vselect = panelEPTPI.Panel("DiagnosisDetails").Panel(0).Select("TargetINR");
  if (vselect.value != p_Target_INR)
  {
      vselect.ClickItem(FloatToString(p_Target_INR));;
      process_confirm_change_INR(INRstarV5);
  }  
  // Click Save 
  form.Panel(0).Button("UpdatePatientTreatmentPlan").Click();

} 
//-------------------------------------------------------------------------------
// Add High User 
function Add_High_User(INRstarV5, p_location, p_user)
{
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  // Select the location
  panelAC = panelMCP.Panel(0).Panel("AdminContent").Panel("AdminContent");
  panelAC.Fieldset(0).Panel(0).Select("ChildSections").ClickItem(p_location);
  
  // Click the Add New User button
  panelUser = panelAC.Panel("LocationsUsersContainer");
  panelUser.Fieldset(0).Panel(1).Button("AddNewUser").Click();
  
  formUser = panelMCP.Panel(0).Panel("AdminContent").Fieldset(0).Form("CreateUserForm");
  formUser.Panel(0).Textbox("FullName").Text = p_user;
  formUser.Panel(1).Textbox("Username").Text = p_user;
  formUser.Panel(2).PasswordBox("Password").Text = p_user;
  formUser.Panel(3).PasswordBox("ConfirmPassword").Text = p_user;
  
  formUser.Panel(4).SubmitButton("Add").Click();  
}
//-------------------------------------------------------------------------------
// Set High User Permissions 
function Set_High_Permissions(INRstarV5, p_location, p_user)
{
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  // Select the location
  panelAC = panelMCP.Panel(0).Panel("AdminContent").Panel("AdminContent");
  panelAC.Fieldset(0).Panel(0).Select("ChildSections").ClickItem(p_location);
  
  // Select the User
  panelLUC = panelAC.Panel("LocationsUsersContainer");
  panelLUC.Fieldset(0).Panel(0).Select("Users").ClickItem(p_user);
  
  // Select the Permissions Tab
  panelUA = panelLUC.Panel("UserAccountContainer").Fieldset(0).Panel("UserAdmin");
  panelUA.Link("UserRolesAndPermissionsLink").Click();
  
  // Role list
  panelUAC = panelLUC.Panel("UserAccountContainer").Fieldset(0).Panel("UserAdminContainer");
  panelRL = panelUAC.Fieldset(0).Panel(0).Form("RolesForm").Fieldset(0).Panel("RoleList");
  
  // Choose Roles
  panelRL.Checkbox("RoleList_0").ClickChecked(true);
  panelRL.Checkbox("RoleList_1").ClickChecked(true);
  panelRL.Checkbox("RoleList_2").ClickChecked(true);
  
  // Click button
  panelUAC = panelLUC.Panel("UserAccountContainer").Fieldset(0).Panel("UserAdminContainer");
  panelUAC.Fieldset(0).Panel(0).Form("RolesForm").Fieldset(0).SubmitButton("SaveRoles").Click();  
}
//-------------------------------------------------------------------------------
// Add Low User 
function Add_Low_User(INRstarV5, p_user)
{
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");

  panelAC = panelMCP.Panel(0).Panel("AdminContent").Panel("AdminContent");
  
  // Click the Add New User button
  panelUser = panelAC.Panel("LocationsUsersContainer");
  panelUser.Fieldset(0).Panel(1).Button("AddNewUser").Click();
  
  formUser = panelMCP.Panel(0).Panel("AdminContent").Fieldset(0).Form("CreateUserForm");
  formUser.Panel(0).Textbox("FullName").Text = p_user;
  formUser.Panel(1).Textbox("Username").Text = p_user;
  formUser.Panel(2).PasswordBox("Password").Text = p_user;
  formUser.Panel(3).PasswordBox("ConfirmPassword").Text = p_user;
  
  formUser.Panel(4).SubmitButton("Add").Click();  
}
//-------------------------------------------------------------------------------
// Set High User Permissions 
function Set_Low_Permissions(INRstarV5, p_user)
{
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");

  panelAC = panelMCP.Panel(0).Panel("AdminContent").Panel("AdminContent");

    
  // Select the User
  panelLUC = panelAC.Panel("LocationsUsersContainer");
  panelLUC.Fieldset(0).Panel(0).Select("Users").ClickItem(p_user);
  
  // Select the Permissions Tab
  panelUA = panelLUC.Panel("UserAccountContainer").Fieldset(0).Panel("UserAdmin");
  panelUA.Link("UserRolesAndPermissionsLink").Click();
  
  // Role list
  panelUAC = panelLUC.Panel("UserAccountContainer").Fieldset(0).Panel("UserAdminContainer");
  panelRL = panelUAC.Fieldset(0).Panel(0).Form("RolesForm").Fieldset(0).Panel("RoleList");
  
  // Choose Roles
  panelRL.Checkbox("RoleList_0").ClickChecked(true);
  panelRL.Checkbox("RoleList_1").ClickChecked(true);
  panelRL.Checkbox("RoleList_2").ClickChecked(true);
  
  // Click button
  panelUAC = panelLUC.Panel("UserAccountContainer").Fieldset(0).Panel("UserAdminContainer");
  panelUAC.Fieldset(0).Panel(0).Form("RolesForm").Fieldset(0).SubmitButton("SaveRoles").Click();  
}
//-------------------------------------------------------------------------------
// Set Max Review
function set_max_review(INRstarV5, p_pmr)
{
  Goto_Patient_TreatmentPlan_Edit(INRstarV5);
    
  Log.Message("Setting Patient Max Review: " + p_pmr);
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  
  var form = panelPCD.Form("PatientEditTreatmentPlanForm");
  var panelEPCI = form.Panel("EditPatientTreatmentPlanInformation");   
  
//  var vselect = panelEPCI.Panel("DiagnosisDetails").Panel(4).Select("MaxReview");
  var vselect = panelEPCI.Panel(4).Select("MaxReview");
  if (vselect.value != p_pmr)
  {
      vselect.ClickItem(p_pmr);
  }  
  // Click Save 
  form.Panel(0).Button("UpdatePatientTreatmentPlan").Click();

} 
//-------------------------------------------------------------------------------
// Set Target INR
function set_targetINR(INRstarV5, p_tinr)
{
  Goto_Patient_TreatmentPlan_Edit();
    
  Log.Message("Setting Target INR: " + p_pmr);
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  
  var form = panelPCD.Form("PatientEditTreatmentPlanForm");
  var panelEPCI = form.Panel("EditPatientTreatmentPlanInformation");   
  
//  var vselect = panelEPCI.Panel("DiagnosisDetails").Panel(4).Select("MaxReview");
//  var vselect = panelEPCI.Panel(4).Select("MaxReview");
   var vselect = panelEPCI.Panel("DiagnosisDetails").Panel(0).Select("TargetINR")
  if (vselect.value != p_tinr)
  {
      vselect.ClickItem(p_tinr);
  }  
  // Click Save 
  form.Panel(0).Button("UpdatePatientTreatmentPlan").Click();

} 

//-------------------------------------------------------------------------------
// Set NPSA
function set_NPSA(INRstarV5, p_npsa)
{
  Goto_Patient_TreatmentPlan_Edit();
    
  Log.Message("Setting NPSA: " + p_npsa);
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  
  var form = panelPCD.Form("PatientEditTreatmentPlanForm");
  var panelEPTPTS = form.Panel("EditPatientTreatmentPlanTabletSelection")

  if (p_npsa == true)
      panelEPTPTS.Panel(0).Checkbox("NPSA").ClickChecked(true);
  else
  {
     panelEPTPTS.Panel(0).Checkbox("NPSA").ClickChecked(false);
     panelEPTPTS.Panel(2).Checkbox("Tablets_Use3").ClickChecked(true);
     panelEPTPTS.Panel(3).Checkbox("Tablets_Use1").ClickChecked(true);
  }    
  // Click Save 
  form.Panel(0).Button("UpdatePatientTreatmentPlan").Click();

} 



