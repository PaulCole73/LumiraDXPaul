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
  var obj_root = INRstarV5.Panel("MainPage").Panel("header");
  var obj = wait_for_object(INRstarV5, "idStr", "HomeLink", 3);
  
  obj_root = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  click_navigation_wrapper(obj, obj_root, "idStr", "UserMessagesTabLink", 2);
}
//-------------------------------------------------------------------------------
//Navigate to Home Page Overdue List
function Goto_Home_Page_Overdue_List()
{
  //Visit Home Page
  Goto_Home();
  
  //Check if the link is present
  var link_present = check_home_page_header_showing_by_name("OverduePatientHeaderLink")
    
  //Perform actions if link - present 
  if (link_present == true)
  {
    //Get the system path of the home page messages section
    var home_page_messages_path = home_page_messages();
  
    //Get the system path of the link we are looking for
    var link_header = home_page_overdue_link();
  
    //Click desired link
    link_header.Click();
  
    //Wait for table to appear
    wait_for_object(home_page_messages_path, "idStr", "PatientOverdueReportTable", 3);
  }
  
  //return true or false whether link and therefore table was present
  return link_present
}
//-------------------------------------------------------------------------------
//Navigate to Home Page Refer List 
function Goto_Home_Page_Referred_Patient_List()
{
   //Visit Home Page
  Goto_Home();
  
  //Check if the link is present
  var link_present = check_home_page_header_showing_by_name("ReferredPatientHeaderLink");
  
  //Perform actions if link - present 
  if (link_present == true)
  {
    //Get the system path of the home page messages section
    var home_page_messages_path = home_page_messages();
  
    //Get the system path of the link we are looking for
    var link_header = home_page_referred_patient_link();
  
    //Click desired link
    link_header.Click();
  
    //Wait for table to appear
    wait_for_object(home_page_messages_path, "idStr", "ReferredPatientReportTable", 3);
  }
  
  //Return true or false pending if link (and therfore table) is present
  return link_present
}
//-------------------------------------------------------------------------------
//Navigate to Home Page declined transfer List
function Goto_Home_Page_Declined_Transfer_List()
{
   //Visit Home Page
  Goto_Home();
  
  //Check if the link is present
  var link_present = check_home_page_header_showing_by_name("DeclinedPatientHeaderLink");
  
  //Perform actions if link - present 
  if (link_present == true)
  {
      
    //Get the system path of the home page messages section
    var home_page_messages_path = home_page_messages();
  
    //Get the system path of the link we are looking for
    var link_header = home_page_declined_transfer_link();
  
    //Click desired link
    link_header.Click();
  
    //Wait for table to appear
    wait_for_object(home_page_messages_path, "idStr", "TransferDeclinedTable", 3);
  }
  
  //Return true or false pending if link (and therfore table) is present
  return link_present
}
//-------------------------------------------------------------------------------
//Navigate to Home Page transfer request List to accept or decline
function Goto_Home_Page_Transfer_Request_List()
{
   //Visit Home Page
  Goto_Home();
  
  //Check if the link is present
  var link_present = check_home_page_header_showing_by_namePropStr_object("ViewTransferredPatients");
  
  //Perform actions if link - present 
  if (link_present == true)
  {  
    //Get the system path of the home page messages section
    var home_page_messages_path = home_page_messages();
    
    //Get the system path of the link we are looking for
    var INRstarV5 = INRstar_base();  
    var link_header = wait_for_object(INRstarV5, "namePropStr", "ViewTransferredPatients", 10);
  
    //Click desired link
    link_header.Click();
  
    //Wait for table to appear
    wait_for_object(home_page_messages_path, "idStr", "TransferredTable", 3);
  }
  
  //Return true or false pending if link (and therfore table) is present
  return link_present
}
//-------------------------------------------------------------------------------
//Navigate to Home Page transfer not yet been accepted List 
function Goto_Home_Page_Transfer_Not_Yet_Been_Accepted_List()
{
   //Visit Home Page
  Goto_Home();
  
  //Check if the link is present
  var link_present = check_home_page_header_showing_by_namePropStr_object("ViewTransferRequest");
  
  //Perform actions if link - present 
  if (link_present == true)
  {
    //Get the system path of the home page messages section
    var home_page_messages_path = home_page_messages();
  
    //Get the system path of the link we are looking for
    var INRstarV5 = INRstar_base();  
    var link_header = wait_for_object(INRstarV5, "namePropStr", "ViewTransferRequest", 10);
  
    //Click desired link
    link_header.Click();
  
    //Wait for table to appear
    wait_for_object(home_page_messages_path, "idStr", "TransferRequestTable", 3);
  }
  
  //Return true or false pending if link (and therfore table) is present
  return link_present
}
//-------------------------------------------------------------------------------
//Navigate to Home Page No Diagnosis Or Treatment List
function Goto_Home_Page_No_Diagnosis_Or_Treatment_List()
{
   //Visit Home Page
  Goto_Home();
  
  //Check if the link is present
  var link_present = check_home_page_header_showing_by_name("PatientsWithNoDiagnosisHeaderLink");
  
  //Perform actions if link - present 
  if (link_present == true)
  {
    //Get the system path of the home page messages section
    var home_page_messages_path = home_page_messages();
  
    //Get the system path of the link we are looking for
    var link_header = home_page_no_diagnosis_or_treatment_link();
  
    //Click desired link
    link_header.Click();
  
    //Wait for table to appear
    wait_for_object(home_page_messages_path, "idStr", "PatientWithNoDiagnosisReportTable", 3);
  }
  
  //Return true or false pending if link (and therfore table) is present
  return link_present
}
//-------------------------------------------------------------------------------
//Navigate to Home Page incomplete treatment List
function Goto_Home_Page_Incomplete_Treatment_List()
{
   //Visit Home Page
  Goto_Home();
  
  //Check if the link is present
  var link_present = check_home_page_header_showing_by_name_object("(0)"); 
  // Not ideal but there is no proper locator for this
  
  //Perform actions if link - present 
  if (link_present == true)
  {
    //Get the system path of the home page messages section
    var home_page_messages_path = home_page_messages();

    //Get the system path of the link we are looking for
    var link_header = home_page_incomplete_treatment_link();
  
    //Click desired link
    link_header.Click();
  
    //Wait for table to appear
    wait_for_object(home_page_messages_path, "idStr", "IncompleteTreatmentsTable", 3);
  }
  
  //Return true or false pending if link (and therfore table) is present
  return link_present
}
//------------------------------------------------------------------------------
//Navigate to Home Page Overdue Non Warfarin Review List
function Goto_Home_Page_Overdue_Non_Warfarin_Review_List()
{
   //Visit Home Page
  Goto_Home();
  
  //Check if the link is present
  var link_present = check_home_page_header_showing_by_name("OverdueReviewPatientHeaderLink");
  
  //Perform actions if link - present 
  if (link_present == true)
  {
    //Get the system path of the home page messages section
    var home_page_messages_path = home_page_messages();

    //Get the system path of the link we are looking for
    var link_header = home_page_overdue_non_warfarin_review_link();
  
    //Click desired link
    link_header.Click();
  
    //Wait for table to appear
    wait_for_object(home_page_messages_path, "idStr", "PatientOverdueReviewReportTable", 3);
  }
  
  //Return true or false pending if link (and therfore table) is present
  return link_present
}
//-------------------------------------------------------------------------------
//Navigate to Home Page Suspension List
function Goto_Home_Page_Suspension_List()
{
  //Visit Home Page
  Goto_Home();
  
  //Check if the link is present
  var link_present = check_home_page_header_showing_by_name("ExceededSuspendedPatientsViewModelPatientHeaderLink");
  
  //Perform actions if link - present 
  if (link_present == true)
  {
    //Get the system path of the home page messages section
    var home_page_messages_path = home_page_messages();

    //Get the system path of the link we are looking for
    var link_header = home_page_exceed_suspended_patients_link();
  
    //Click desired link
    link_header.Click();
  
    //Wait for table to appear
    wait_for_object(home_page_messages_path, "idStr", "ExceededSuspendedPatientReportTable", 3);
  }
  
  //Return true or false pending if link (and therfore table) is present
  return link_present
}
//-------------------------------------------------------------------------------
//Navigate to Home Page Exceeded Treatment End date List
function Goto_Home_Page_Exceeded_Treatment_End_Date_List()
{
   //Visit Home Page
  Goto_Home();
  
  //Check if the link is present
  var link_present = check_home_page_header_showing_by_name("ExceededPatientsHeaderLink");
  
  //Perform actions if link - present 
  if (link_present == true)
  {
    //Get the system path of the home page messages section
    var home_page_messages_path = home_page_messages();

    //Get the system path of the link we are looking for
    var link_header = home_page_exceeded_treatment_end_date_link();
  
    //Click desired link
    link_header.Click();
  
    //Wait for table to appear
    wait_for_object(home_page_messages_path, "idStr", "PatientExceededReportTable", 3);
  }
  
  //Return true or false pending if link (and therfore table) is present
  return link_present
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
//-------------------------------------------------------------------------------
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
}
//-------------------------------------------------------------------------------
// Navigate to Admin / IQC 
function Goto_Admin_IQC()
{
  Goto_Options();
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var obj = wait_for_object(panelMCP, "idStr", "IQCTab", 2);
  click_navigation_wrapper(obj, panelMCP, "idStr", "IQCWrapper", 2);
}
//-------------------------------------------------------------------------------
// Navigate to Options / Location Management
function Goto_Options_Location_Management()
{
  Goto_Options(); 
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var obj = wait_for_object(panelMCP, "idStr", "LocationManagementTab", 2);
  click_navigation_wrapper(obj, panelMCP, "idStr", "LocationTabContent", 4);
}
//-------------------------------------------------------------------------------
// Navigate to Options / EQC
function Goto_Options_EQC()
{
  Goto_Options(); 
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var obj = wait_for_object(panelMCP, "idStr", "EQCTab", 2);
  click_navigation_wrapper(obj, panelMCP, "idStr", "EQCWrapper", 2);
}
//-------------------------------------------------------------------------------
// Navigate to Options / PoCT
function Goto_Options_PoCT()
{
  Goto_Options(); 
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var obj = wait_for_object(panelMCP, "idStr", "PoCTTab", 2);
  click_navigation_wrapper(obj, panelMCP, "idStr", "LocationsPoCTTable", 4);
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
  var INRstarV5 = INRstar_base();
  var panelHeader = INRstarV5.Panel("MainPage").Panel("header");
  
  var obj = wait_for_object(panelHeader, "idStr", "LogoutLink", 3);
  click_navigation_wrapper(obj, INRstarV5, "idStr", "LogonPage", 3);
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

//===============================================================================
//===============================================================================
// Patient Navigation
//===============================================================================
//===============================================================================
// Navigate to Patient Search
function Goto_Patient_Search()
{
  var INRstarV5 = INRstar_base();
  var obj_root = INRstarV5
  var obj = wait_for_object(obj_root, "idStr", "MainPatientLink", 3);
  click_navigation_wrapper(obj, obj_root, "idStr", "searchCriteria", 5);
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
  Goto_Patient_Search(); 
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
  var obj_root = panelMCP.Panel("ManagePatients").Panel("PatientTab");
  
  var obj = wait_for_object(obj_root, "idStr", "AddPatientDetailsTab", 1, 1, 20);
  click_navigation_wrapper(obj, panelMCP, "idStr", "EditPatientContactDetails", 6);
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
  
  var obj_root = panelPR.Panel("PatientTab")
  
  //object wait wrapper, waits for obj 1 to be available and performs action until obj 2 is available
  var obj = wait_for_object(obj_root, "idStr", "PatientDemographicsTab", 1);
  click_navigation_wrapper(obj, panelPR, "idStr", "PatientDetails", 4);
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
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord");
  var obj_root = panelMCP.Panel("PatientTab");
  
  var obj = wait_for_object(obj_root, "idStr", "PatientManagementTab", 1); 
  click_navigation_wrapper(obj, panelMCP.Panel("PatientMainTabContent"), "idStr", "PatientStatus_DetachedLabel_Label", 5)
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
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var obj_root = panelMCP.Panel("PatientRecord").Panel("PatientTab");
  var obj = wait_for_object(obj_root, "idStr", "PatientTreatmentPlanTab", 1);
  click_navigation_wrapper(obj, main_patient_tab(), "idStr", "TreatmentPlanListWrapper", 2);
  
  WaitSeconds(0.5);
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan
function Goto_Patient_Treatment_Plan()
{
  Goto_Patient_Treatments_Tab();
  var obj = wait_for_object(main_patient_tab(), "idStr", "PatientTreatmentPlanTab", 3);
  if(obj.Exists)
  {
    obj.Click();
  }
  WaitSeconds(0.5);
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Add - If no prior treatment plan exists as the path will be different otherwise
function Goto_Patient_Treatment_Plan_Add()
{
  Goto_Patient_Treatment_Plan();
  var obj_root = change_treatment_plan_buttons(); 
  var obj = wait_for_object(obj_root, "idStr", "AddPatientTreatmentPlanLink", 2);
  if(obj.Exists)
  {
    obj.Click();
  }
  process_popup("Confirmation Required", "Confirm");
  wait_for_object(main_patient_tab(), "idStr", "AddTreatmentPlanForm", 4);
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Add - If a treatment plan exists
function Goto_Patient_Treatment_Plan_Add_More_1_Treatment_Plan()
{
  Goto_Patient_Treatment_Plan();
  var current_drug = clinical_tp_details().Panel(3).Label("DrugName_DetachedLabel").innerText;
  if(current_drug != get_string_translation("Warfarin"))
  {
    main_patient_tab().Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Panel(0).Button("AddPatientTreatmentPlanLink").Click();
  }
  else
  {
    main_patient_tab().Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails").Panel(1).Button("AddPatientTreatmentPlanLink").Click();
  }
    
  process_popup(get_string_translation("Confirmation Required"), get_string_translation("Confirm"));
  process_popup(get_string_translation("New treatment plan will invalidate Induction protocol"),"OK");
  WaitSeconds(1, "Waiting to go to Add Treatment Plan...");
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Edit with existing treatment plan
function Goto_Patient_Treatment_Plan_Edit_Existing_Plan_Non_Warfarin()
{
  Goto_Patient_Treatment_Plan();
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
  
  process_alternate_popup(get_string_translation("Please acknowledge"), get_string_translation("Confirm"), 1);
  process_blue_popup();
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Treatment
function Goto_Patient_Treatment()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPT = panelMCP.Panel("PatientRecord").Panel("PatientTab");
  var obj = wait_for_object(panelPT, "idStr", "PatientTreatmentPlanTab", 1);
  
  var obj_root = main_patient_tab();
  click_navigation_wrapper(obj, obj_root, "idStr", "TreatmentPlanSubTab", 1);

  wait_for_object(obj_root, "idStr", "PatientTreatmentPlanTabSubMenu", 2);
  obj = wait_for_object(obj_root, "idStr", "TreatmentItem", 3);
 
  click_navigation_wrapper(obj, obj_root, "idStr", "PatientTreatmentWrapper", 3);
  
  //should we have a wait_for here?
  
  WaitSeconds(1, "Waiting for Treatments...");
}
//-------------------------------------------------------------------------------
// Navigate to Patient / Treatment Plan / INR Treatments / Add Historical Treatment
function Goto_Add_Historical()
{
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
  Goto_Patient_Treatments_Tab();
  
  var panelPR = main_patient_tab();
  var obj = wait_for_object(panelPR, "idStr", "PatientReviewTab", 3);
  click_navigation_wrapper(obj, panelPR, "idStr", "AnnualReviewWrapper", 2);
  //panelPR.Panel("TreatmentPlanSubTab").Panel("PatientTreatmentPlanTabSubMenu").Link("PatientReviewTab").Click();
}
//-------------------------------------------------------------------------------
// Navigate to Patient Treatment Plan Reviews
function Goto_Patient_Treatment_Plan_Review_New()
{
  Goto_Patient_Treatment_Plan_Review();
  var panelPTC = main_patient_tab().Panel("PatientTabContent");
  var obj = wait_for_object(panelPTC, "idStr", "AddWarfarinReviewLink", 4);
  click_navigation_wrapper(obj, panelPTC, "idStr", "AddReviewForm", 3);
  //panelPTC.Panel("AnnualReviewWrapper").Panel("AnnualReviewActions").Fieldset("Fieldset1").Button("AddWarfarinReviewLink").Click();
  //WaitSeconds(1, "Waiting to go to add Reviews...");
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
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var obj_root = panelMCP.Panel("PatientRecord");
  
  var obj = wait_for_object(obj_root.Panel("PatientTab"), "idStr", "PatientAuditTraiTab", 1); //object select, navigation wrapper
  click_navigation_wrapper(obj, obj_root, "idStr", "AuditTrailTable", 4);
}
//-------------------------------------------------------------------------------
// Navigate to system / Audit
function Goto_System_Audit()
{
  Goto_Options();
  WaitSeconds(1);
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  
  var obj = wait_for_object(panelMCP, "idStr", "AuditTab", 2, 1);
  click_navigation_wrapper(obj, panelMCP, "idStr", "AuditTrailTable", 3);
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
  
  wait_for_object(panelMCP, "idStr", "SearchTestingLocations", 7);
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
  var obj_root = patient_search_screen();
  wait_for_object(obj_root, "idStr", "searchCriteria", 1, 2);
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
  Goto_Bridging_Tab()
  patient_treatment_bridging_tab().Panel(0).Button("New_Bridging_Record").Click();
  WaitSeconds(1, "Waiting to go to bridging form...");
}