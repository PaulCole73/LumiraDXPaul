//USEUNIT Popup_Handlers
//USEUNIT Misc_Functions
//===============================================================================

//===============================================================================
//===============================================================================
//                          Old "Navigate" Functions                           //
//===============================================================================
//===============================================================================
//-----------------------------------------------------------------------------//
//Navigate to Home Page
function Goto_Home()
{
  var INRstarV5 = INRstar_base();
  var home_page_link = INRstarV5.Panel("MainPage").Panel("header").Link("HomeLink").Click();
  WaitSeconds(1, "Waiting for Home Page...");
}
//-------------------------------------------------------------------------------
// Navigate to Options 
function Goto_Options()
{
  var INRstarV5 = INRstar_base();
  var panelM = INRstarV5.Panel("MainPage");
  panelM.Panel("header").Link("OptionsLink").Click();
  WaitSeconds(1, "Going to Options...");
}
//-------------------------------------------------------------------------------
// Navigate to Diagnosis
function Goto_Options_Diagnosis()
{
  Goto_Options();
  options_diagnosis_path().Click();
  WaitSeconds(1, "Going to Add Diagnosis");
} 
//-------------------------------------------------------------------------------
// Navigate to Letter Management 
function Goto_Options_Letter_Management()
{
  Goto_Options();
  WaitSeconds(1);
  options_letter_management().Click();
  WaitSeconds(1, "Going to Letter Management...");
}
//-----------------------------------------------------------------------------------
// Navigate to Specific Letter
function Goto_Bespoke_Letter(letter_name)
{
  var item = INRstar_base().NativeWebObject.Find("contentText", letter_name);
  if(item.Exists && item.Height != 0)
  {
    item.scrollIntoView();
    item.Click();
    return true;
  }
  else
  {
    return false;
  }
  
  item.Refresh();
}
//-------------------------------------------------------------------------------
// Navigate to Admin / IQC 
function Goto_Admin_IQC()
{
  Goto_Options();
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel(0).Link("IQCTab").Click();
  WaitSeconds(1, "Waiting for ICQ tab...");
}
//-------------------------------------------------------------------------------
// Navigate to Options / Location Management
function Goto_Options_Location_Management()
{
  Goto_Options(); 
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel(0).Link("LocationManagementTab").Click();
  WaitSeconds(1, "Waiting for Location Management tab...");
}
//-------------------------------------------------------------------------------
// Navigate to Options / EQC
function Goto_Options_EQC()
{
  Goto_Options(); 
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel(0).Link("EQCTab").Click();
  WaitSeconds(1, "Waiting for EQC tab...");
}
//-------------------------------------------------------------------------------
// Navigate to Options / PoCT
function Goto_Options_PoCT()
{
  Goto_Options(); 
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel(0).Link("PoCTTab").Click();
  WaitSeconds(1, "Waiting for PoCT tab...");
}
//-------------------------------------------------------------------------------
// Navigate to Options / PoCT / Edit
function Goto_Options_Edit_PoCT()
{
  Goto_Options_PoCT();
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel("AdminContent").Panel(0).Panel(0).Button("EditPoCTBatch").Click();
  WaitSeconds(1, "Waiting for edit PoCT button...");
}
//-------------------------------------------------------------------------------
// Navigate to Options / IQC / Add
function Goto_Options_Add_IQC()
{
  Goto_Admin_IQC()
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel("AdminContent").Panel("IQCWrapper").Panel(0).Button("AddIQC").Click();
  WaitSeconds(1, "Waiting for add IQC button...");
}
//-------------------------------------------------------------------------------
// Navigate to Options / IQC / Add
function Goto_Options_Edit_IQC()
{
  Goto_Admin_IQC();
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel("AdminContent").Panel("IQCWrapper").Table("LocationsIQCTable").Cell(1, 8).Button("EditIQC").Click();
  WaitSeconds(1, "Waiting for edit IQC button...");
}
//-------------------------------------------------------------------------------
// Navigate to Clinics
function Goto_Clinics()
{
  var INRstarV5 = INRstar_base();
  var panel = INRstarV5.Panel("MainPage");
  var button = panel.Panel("header").Link("ClinicsLink").Click();
  WaitSeconds(2, "Waiting for Clinics...");
}
//-------------------------------------------------------------------------------
// Navigate to Clinics
function Goto_Add_Clinic()
{
  Goto_Clinics();
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelMCTC = panelMCP.Panel("ManageClinicsTabContent");
    
  WaitSeconds(3, "Waiting because clinics...");    
  panelMCTC.Panel(0).Button("btnAddAppointment").Click();
  WaitSeconds(3, "Waiting to go to new clinic form...");
}
//-------------------------------------------------------------------------------
function Goto_Manage_User(username)
{
  Goto_Options_Location_Management();
  var users_tab = location_management_users_button();
  users_tab.Click();
    
  var content_panel = location_management_main_container();
  var select_user_dropdown = content_panel.Panel(0).Select("Users").ClickItem(username);

  var button = content_panel.Panel(1).Button("ManageUser");
  button.Click();  
}
//-------------------------------------------------------------------------------
// Log Off
function Log_Off()
{
  WaitSeconds(3, "Waiting for Log Off button...");
  var INRstarV5 = INRstar_base();
  var panelHeader = INRstarV5.Panel("MainPage").Panel("header");
  var panelLoginStatus = panelHeader.Panel("logindisplay").Panel("LoginStatus");
  panelLoginStatus.Link("LogoutLink").Click();   
}





//===============================================================================
//===============================================================================
//                     Old "Navigate Patient" Functions                        //
//===============================================================================
//===============================================================================
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//===============================================================================
//===============================================================================
// Home Page Navigation
//===============================================================================
//===============================================================================
function Goto_Urgent_Patient_Tab()
{
  Goto_Home();
  home_page_messages().Panel("urgentNotificationsPlaceholder").Panel("urgentNotificationCount").Click();
}
//===============================================================================
//===============================================================================
// Patient Navigation
//===============================================================================
//===============================================================================
// Navigate to Patient Search
function Goto_Patient_Search()
{
  WaitSeconds(3);
  var INRstarV5 = INRstar_base();
  panel = INRstarV5.Panel("MainPage");
  panel.Panel("header").Link("MainPatientLink").Click();
  WaitSeconds(1, "Waiting at Patient Tab...");
}
//-------------------------------------------------------------------------------
// Navigate to Patient Search
function Goto_External_Patient_Lookup()
{
  Goto_Patient_Search();
  external_patient_lookup_tab().Click();
  WaitSeconds(2, "Waiting to go to External Patient Lookup...");
}
//-------------------------------------------------------------------------------
// Navigate to Add Patient
function Goto_Add_Patient()
{
  Goto_Patient_Search() 
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
  panelMCP.Panel("ManagePatients").Panel("PatientTab").Link("AddPatientDetailsTab").Click();
  WaitSeconds(1, "Waiting at Add Patient...");
}
//-------------------------------------------------------------------------------
// Navigate to Tests Due
function Goto_Tests_Due()
{
  var INRstarV5 = INRstar_base();
  var panel = INRstarV5.Panel("MainPage");
  panel.Panel("header").Link("MainPatientLink").Click();
  var panelMCP = panel.Panel("main").Panel("MainContentPanel")
  panelMCP.Panel("ManagePatients").Panel("PatientTab").Link("TestDueTabLink").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Patient Demographics
function Goto_Patient_Demographics()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord");
  panelPR.Panel("PatientTab").Link("PatientDemographicsTab").Click();
  WaitSeconds(3, "Waiting to go to Demographics tab...");
}
//-------------------------------------------------------------------------------
// Navigate to Edit Patient Demographics
function Goto_Edit_Patient_Demographics()
{
  Goto_Patient_Demographics();
  var panelPR = main_patient_tab();
  var panelPDW = panelPR.Panel("PatientTabContent").Panel("PatientDetailsWrapper").Panel(0);
  panelPDW.Button("EditPatientDetailsLink").Click();
  WaitSeconds(1, "Waiting to go to Edit Patient Demographics...");
}
//-------------------------------------------------------------------------------
// Navigate to Patient Management
function Goto_Patient_Management()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientManagementTab").Click();
  WaitSeconds(1, "Waiting at Patient Management tab...");
}
//-------------------------------------------------------------------------------
// Navigate to suspend screen
function Goto_Patient_Suspend()
{
  Goto_Patient_Management();
  var pat_managment_tab_status_buttons_path = pat_managment_tab_status_buttons();
  pat_managment_tab_status_buttons_path.Button("SuspendPatientButton").Click();
}
//--------------------------------------------------------------------------------
function Goto_Patient_Management_Edit()
{
  Goto_Patient_Management();
  pat_managment_tab_preferences_buttons().Button("EditPatientManagementLink").Click();    
  WaitSeconds(1, "Waiting for edit Patient Management button..."); 
}
//-------------------------------------------------------------------------------
// Navigate to Patient Management
function Goto_Self_Care()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientSelfCaringTab").Click();
  WaitSeconds(3, "Waiting to go to Self Care tab...");
}
//-------------------------------------------------------------------------------
// Navigate to Recently Viewed Patient List
function Goto_Recently_Viewed()
{
  Goto_Patient_Search();
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
  panelMCP.Panel("ManagePatients").Panel("PatientTab").Link("RecentPatientsTabLink").Click();
  WaitSeconds(1, "Waiting for go to to Recently Viewed...");
}
//===============================================================================
//===============================================================================
// Treatment Plan Navigation
//===============================================================================
//===============================================================================
function Goto_Patient_Treatments_Tab()
{
  WaitSeconds(3);
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientTreatmentPlanTab").Click();
  WaitSeconds(3, "Waiting to go to Treatment Plan...");
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan
function Goto_Patient_Treatment_Plan()
{
  var counter = 0;
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientTreatmentPlanTab").Click();
  WaitSeconds(3, "Waiting to go to Treatment Plan...");
  var panelPMTC = main_patient_tab();
  var obj = panelPMTC.Panel("TreatmentPlanSubTab").Panel("PatientTreatmentPlanTabSubMenu");
  
  counter = 0;
  do //this function has been experiencing regular/consistent timeouts, now using a loop to minimize failure and provide re-testability 
  {
    obj.Refresh();
    var temp = obj.FindChild("idStr", "PatientTreatmentPlanTab");
    if(temp.Exists)
    {
      Log.Message(temp.Name);
      temp.Click();
    }
    counter++;
    Log.Message(counter);
  }while(temp.Exists == false && counter < 5);
  
  WaitSeconds(3, "Waiting to go to Treatment Plan...");
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Add - If no prior treatment plan exists as the path will be different otherwise
function Goto_Patient_Treatment_Plan_Add()
{
  Goto_Patient_Treatment_Plan();
  change_treatment_plan_buttons().Panel(0).Button("AddPatientTreatmentPlanLink").Click();
  
  process_popup("Confirmation Required", "Confirm");
  
  WaitSeconds(1, "Waiting to go to Add Treatment Plan...");
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Add - If a treatment plan exists
function Goto_Patient_Treatment_Plan_Add_More_1_Treatment_Plan()
{
  Goto_Patient_Treatment_Plan();
  var current_drug = clinical_tp_details().Panel(3).Label("DrugName_DetachedLabel").innerText;
  if(current_drug != "Warfarin")
  {
    main_patient_tab().Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Panel(0).Button("AddPatientTreatmentPlanLink").Click();
  }
  else
  {
    main_patient_tab().Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Panel(1).Button("AddPatientTreatmentPlanLink").Click();
  }
    
  process_popup("Confirmation Required", "Confirm");
  process_popup("New treatment plan will invalidate Induction protocol", "OK");
  WaitSeconds(1, "Waiting to go to Add Treatment Plan...");
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Edit with existing treatment plan
function Goto_Patient_Treatment_Plan_Edit_Existing_Plan_Non_Warfarin()
{
  Goto_Patient_Treatment_Plan();
       
  // Click on Edit Button --------------------------------------------------------------------------
  /*var panelPCW = main_patient_tab().Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper")
  var panelPCD = panelPCW.Panel("PatientTreatmentPlanDetails");
  panelPCD */
  change_treatment_plan_buttons().Panel(0).Button("EditPatientTreatmentPlanLink").Click();
  WaitSeconds(1, "Waiting to go to Edit Treatment Plan...");
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Add - If a pop up exists prior to adding tp details
/*function Goto_Patient_Treatmentplan_Pop_Up()
{
  Goto_Patient_Treatmentplan();
  var panelPMTC = main_patient_tab();
  panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Panel(1).Button("AddPatientTreatmentPlanLink").Click();
    
  //Confirming pop up's
  process_button(INRstarV5, "Confirmation Required", "Confirm") ;
  WaitSeconds(1,"Going to Patient Treatment Plan Add");
    
  var ok_error_pop_up_buttons_path = ok_error_pop_up_buttons();
  ok_error_pop_up_buttons_path.Button(1).TextNode(0).Click();
}*/
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Edit with existing treatment plan
function Goto_Patient_Treatment_Plan_Edit_Existing_Plan()
{
  Goto_Patient_Treatment_Plan();
  /*var panelPMTC = main_patient_tab();
  var panelPCW = panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper")
  var panelPCD = panelPCW.Panel("PatientTreatmentPlanDetails");
  panelPCD.Panel(1)*/
  change_treatment_plan_buttons().Panel(1).Button("EditPatientTreatmentPlanLink").Click();
  WaitSeconds(1, "Waiting for Edit Treatment Plan button...");
}
/*
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Edit
function Goto_Patient_Treatment_Plan_Edit()
{
  Goto_Patient_Treatment_Plan();
  WaitSeconds(1, "Waiting to go to Treatment Plan tab...");
  
  var panelPMTC = main_patient_tab();
  var panelPTPTSM = panelPMTC.Panel("TreatmentPlanSubTab").Panel("PatientTreatmentPlanTabSubMenu");
  panelPTPTSM.Link("PatientTreatmentPlanTab").Click();  
  WaitSeconds(1, "Waiting to go to Treatment Plan tab...");
  
  var panelPCW = panelPMTC.Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper")
  var panelPCD = panelPCW.Panel("PatientTreatmentPlanDetails");
  panelPCD.Panel(1).Button("EditPatientTreatmentPlanLink").Click();
  WaitSeconds(1, "Waiting to go to Edit Treatment Plan tab...");
}
*/

//===============================================================================
//===============================================================================
// INR Treatment Navigation
//===============================================================================
//===============================================================================
//-------------------------------------------------------------------------------
// Navigate to Patient New INR
function Goto_Patient_New_INR()
{
  Goto_Patient_Treatment();
  var panelPTC = main_patient_tab().Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  panelPPT.Panel("TreatmentButtonsContainer").Fieldset("TreatmentButtons").Button("NewINR").Click();
  
  process_alternate_popup("Please acknowledge", "Confirm", 1);
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Treatment
function Goto_Patient_Treatment()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPT = panelMCP.Panel("PatientRecord").Panel("PatientTab");
  WaitSeconds(4, "Waiting for Treatment plan tab...");
  panelPT.Link("PatientTreatmentPlanTab").Click();

  WaitSeconds(4, "Waiting at Treatment tab...");
  
  patient_clinical_tab().Link("TreatmentItem").Click();
  WaitSeconds(4, "Waiting for Treatments...");
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Treatment Plan / INR Treatments / Add Historical Treatment
function Goto_Add_Historical()
{
  WaitSeconds(2, "Waiting before creating historic...");
  Goto_Patient_Treatment();
  var button_id = "AddHistoricalTreatment";
  process_button_exists(button_id);
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Treatment Plan / INR Treatments / Add Treatment Comment
function Goto_Add_Treatment_Comment()
{
  Goto_Patient_Treatment();
  var comments_link = treatment_comment();
  comments_link.Cell(0, 9).Link(0).click();
}


//===============================================================================
//===============================================================================
// Reviews Navigation
//===============================================================================
//===============================================================================
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Reviews
function Goto_Patient_Treatment_Plan_Review()
{
  /*
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientTreatmentPlanTab").Click();
  WaitSeconds(3, "Waiting to go to Treatment Plan...");
  */
  Goto_Patient_Treatments_Tab();
  
  var panelPR = main_patient_tab();
  panelPR.Panel("TreatmentPlanSubTab").Panel("PatientTreatmentPlanTabSubMenu").Link("PatientReviewTab").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Reviews
function Goto_Patient_Treatment_Plan_Review_New()
{
  WaitSeconds(2, "Waiting to go to 'New Review'...");
  Goto_Patient_Treatment_Plan_Review();
  var panelPTC = main_patient_tab().Panel("PatientTabContent");
  panelPTC.Panel("AnnualReviewWrapper").Panel("AnnualReviewActions").Fieldset("Fieldset1").Button("AddWarfarinReviewLink").Click();
  WaitSeconds(1, "Waiting to go to add Reviews...");
}


//===============================================================================
//===============================================================================
// Subsiduary Patient Navigation
//===============================================================================
//===============================================================================
//-------------------------------------------------------------------------------
// Navigate to Patient / Notes
function Goto_Patient_Notes()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientNotesTab").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Adverse Events
function Goto_Patient_Adverse_Events()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientAdverseEventTab").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Audit
function Goto_Patient_Audit()
{
  WaitSeconds(1);
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientAuditTraiTab").Click();
  WaitSeconds(1);
}
//-------------------------------------------------------------------------------
// Navigate to system / Audit
function Goto_System_Audit()
{
  Goto_Options();
  WaitSeconds(1);
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel(0).Link("AuditTab").Click();
  WaitSeconds(1);
}
//-------------------------------------------------------------------------------
// Navigate to Treatment / Audit
function Goto_Patient_Treatment_Audit()
{
  Goto_Patient_Treatment();

  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
  var panelTPW = panelPMTC.Panel("PatientTabContent").Panel("TreatmentPlanWrapper");
  var panelPTH = panelTPW.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
  var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
   
  var w_over6 = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapperOverSix");
  if (w_over6.Exists == true)
  {
    var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix");
  }
  else
  {
    var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper")
  }
  var table = panelVPHTW.Table("PatientTreatmentHistoryTable");

  w_row = table.Rowcount - 1;

  table.Cell(w_row,10).Link("TreatmentInformationActionLink").Click(); 
   
  WaitSeconds(1, "Waiting...")
   
  INRstarV5.Panel(2).Panel(1).Panel(0).Button(1).Click();
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Change Registered Location
function Goto_Change_Registered_Location()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPT = panelMCP.Panel("PatientRecord").Panel("PatientTab");
  panelPT.Link("PatientManagementTab").Click();
    
  var pat_managment_tab_preferences_buttons_path = pat_managment_tab_preferences_buttons();
    
  pat_managment_tab_preferences_buttons_path.Button("ChangePatientLocationLink").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Change Testing Location
function Goto_Change_Testing_Location()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPT = panelMCP.Panel("PatientRecord").Panel("PatientTab");
  panelPT.Link("PatientManagementTab").Click();
    
  var pat_managment_tab_preferences_buttons_path = pat_managment_tab_preferences_buttons();
  pat_managment_tab_preferences_buttons_path.Button("EditPatientTestingSectionLink").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Pending Treatment  / Audit
function Goto_Suggested_Treatment_Audit()
{
  var INRstarV5 = INRstar_base();
  Goto_Patient_Treatment();
  var pending_treatment_table_path = pending_treatment_table();
  pending_treatment_table_path.Cell(0,10).Link("TreatmentInformationActionLink").Click();
  
  INRstarV5.Panel(2).Panel(1).Panel(0).Button(1).Click();
}
//===============================================================================
//===============================================================================
// External Results / HL7 Navigation
//===============================================================================
//===============================================================================
function Goto_Patient_Results()
{
  Goto_Patient_Search();
  patient_results_tab().Click();
  WaitSeconds(1, "Waiting for Patient Results table...");
}
//===============================================================================
//===============================================================================
// Bridging Navigation
//===============================================================================
//===============================================================================
function Goto_Bridging_Tab()
{
  Goto_Patient_Treatments_Tab();
  patient_clinical_tab().Link("PatientBridgingTab").Click();
}
//-------------------------------------------------------------------------------
function Goto_Create_Bridging_Record()
{
  Goto_Patient_Treatments_Tab();
  WaitSeconds(1);
  patient_clinical_tab().Link("PatientBridgingTab").Click();
  patient_treatment_bridging_tab().Panel(0).Button("New_Bridging_Record").Click();
  WaitSeconds(1, "Waiting to go to bridging form...");
}