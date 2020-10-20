//USEUNIT Misc_Functions
//------------------------------------------------------------------------
function INRstar_base()
{
  Sys.WaitProcess("INRstarWindows", 5000);
  var p1 = Sys.Process("INRstarWindows");
  p1.WaitWinFormsObject("BrowserForm", "INRstar", 15000);
  var p2 = p1.WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding", "")
  INRstar = p2.Window("Shell DocObject View", "", 1).Window("Internet Explorer_Server", "", 1).Page("*");
    
  return INRstar;
} 
//------------------------------------------------------------------------
// Main page at login  area
function set_system_login_page_coruscant()
{
  var p1 = Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding", "")
  var INRstar = p1.Window("Shell DocObject View", "", 1).Window("Internet Explorer_Server", "", 1).Page("https://inrstar-coruscant.lumiradxcaresolutions.com/Security/Authentication/*");

  return INRstar;
} 
//------------------------------------------------------------------------
// Main page at login  area
function set_system_login_page_inrstar_base()
{
  var p1 = Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding", "")
  var INRstar = p1.Window("Shell DocObject View", "", 1).Window("Internet Explorer_Server", "", 1).Page("*");
  
  return INRstar;
} 
//------------------------------------------------------------------------
// Main page once logged in
function set_system_coruscant()
{
  var p1 = Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding", "")
  INRstar = p1.Window("Shell DocObject View", "", 1).Window("Internet Explorer_Server", "", 1).Page("https://inrstar-coruscant.lumiradxcaresolutions.com/");
    
  return INRstar;
}
//------------------------------------------------------------------------
// Logon Form
function log_on_form()
{
  var base = INRstar_base().Panel("MainPage").Panel("main");
  var form_path = base.Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon");
    
  return form_path;
}
//------------------------------------------------------------------------
// Password Expired Form 
function password_expired_form()
{
  var base = INRstar_base().Panel("MainPage").Panel("main");
  var form_path = base.Panel("passwordExpiredPage").Panel("passwordExpiredWrapper").Form("PasswordExpired");
  
  return form_path;
}
//------------------------------------------------------------------------
///////////////////////  Patient / Tests Due  /////////////////////////
//------------------------------------------------------------------------
function tests_due_table()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelTDR = panelMCP.Panel("PatientContent").Panel("TestsDueResults");
  var tests_due_table_path = panelTDR.Panel(0).Panel("TestDueResultsContainer").Table("TestDueTable");
 
  return tests_due_table_path;
}
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//////////////////////////  Feedback Tab  ////////////////////////////////
//------------------------------------------------------------------------
//------------------------------------------------------------------------
function feedback_tab()
{
  var INRstarV5 = INRstar_base();
  var link = INRstarV5.Panel("MainPage").Panel("main").Panel(0).Link("FeedbackLink");
  
  return link;
}
//------------------------------------------------------------------------
function feedback_tab_textarea()
{
  var INRstarV5 = INRstar_base();
  var area = INRstarV5.Panel(6).Panel("feedbackPanel").Form("CollectFeedbackForm").Textarea("Message");
  
  return area;
}

//------------------------------------------------------------------------
//////////////////////////  Home Page  ///////////////////////////////////
//------------------------------------------------------------------------
function home_page_button_link()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("header")
  var link = panelMCP.Link("HomeLink")
   
  return link;
}
//------------------------------------------------------------------------
function home_page_messages()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var list = panelMCP.Panel("UserTabContent").Panel("UserMessages").Panel("UserClinicalReports")
   
  return list;
}
//------------------------------------------------------------------------
//////////////////////////  Home Page Overdue List ///////////////////////
//------------------------------------------------------------------------
function home_page_overdue_link()
{  
  var list = home_page_messages();
  var link = list.Link("OverduePatientHeaderLink");
   
  return link;
}
//-------------------
function home_page_overdue_table()
{
  var list = home_page_messages();
  var table = list.Panel("OverduePatients").Table("PatientOverdueReportTable");
   
  return table;
}
//------------------------------------------------------------------------
///////////////////  Home Page Referred Patient List ////////////////////
//------------------------------------------------------------------------
function home_page_referred_patient_link()
{  
  var list = home_page_messages();
  var link = list.Link("ReferredPatientHeaderLink"); 
   
  return link;
}
//-------------------
function home_page_referred_patient_table()
{
  var list = home_page_messages();
  var table = list.Panel("ReferredPatients").Table("ReferredPatientReportTable");
   
  return table;
}
//------------------------------------------------------------------------
////////////////  Home Page Transferred Request List Table //////////////////
//------------------------------------------------------------------------
function home_page_transfer_request_table()
{
  var list = home_page_messages();
  var table = list.Panel("TransferredPatients").Table("TransferredTable");
   
  return table;
}
//------------------------------------------------------------------------
////////////////  Home Page Declined Transfer List Table //////////////////
//------------------------------------------------------------------------
function home_page_declined_transfer_table()
{
  var list = home_page_messages();
  var table = list.Panel("TransferDeclinedPatients").Table("TransferDeclinedTable");
   
  return table;
}
//-------------------
function home_page_declined_transfer_link()
{
  var list = home_page_messages();
  var link = list.Link("DeclinedPatientHeaderLink"); 
   
  return link;
}
//------------------------------------------------------------------------
////////  Home Page No Diagnosis or Treatment List Table /////////////////
//------------------------------------------------------------------------
function home_page_no_diagnosis_or_treatment_table()
{
  var list = home_page_messages();
  var table = list.Panel("PatientsWithNoDiagnosis").Table("PatientWithNoDiagnosisReportTable");
   
  return table;
}
//------------------
function home_page_no_diagnosis_or_treatment_link()
{
  var list = home_page_messages();
  var link = list.Link("PatientsWithNoDiagnosisHeaderLink");
   
  return link;
}
//------------------------------------------------------------------------
///////////////////  Home Page Incomplete treatment List /////////////////
//------------------------------------------------------------------------
function home_page_incomplete_treatment_table()
{
  var list = home_page_messages();
  var table = list.Panel("IncompleteTreatments").Table("IncompleteTreatmentsTable");
   
  return table;
}
//------------------
function home_page_incomplete_treatment_link()
{
  var list = home_page_messages();
  var link = list.Link(0); //Not ideal but its all we have
   
  return link;
}
//------------------------------------------------------------------------
//////////////  Home Page Overdue Non Warfarin Review List ///////////////
//------------------------------------------------------------------------
function home_page_overdue_non_warfarin_review_table()
{
  var list = home_page_messages();
  var table = list.Panel("OverdueReviewPatients").Table("PatientOverdueReviewReportTable");
   
  return table;
}
//-------------------
function home_page_overdue_non_warfarin_review_link()
{
  var list = home_page_messages();
  var link = list.Link("OverdueReviewPatientHeaderLink");
   
  return link;
}
//------------------------------------------------------------------------
/////////  Home Page Transfer Not Yet Been Accepted List Table ///////////
//------------------------------------------------------------------------
function home_page_transfer_not_yet_been_accepted_table()
{
  var list = home_page_messages();
  var table = list.Panel("TransferRequestPatients").Table("TransferRequestTable");
   
  return table;
}
//------------------------------------------------------------------------
///////////////////  Home Page Suspension List Table /////////////////////
//------------------------------------------------------------------------
function home_page_suspension_table()
{
  var list = home_page_messages();
  var table = list.Panel("ExceededSuspendedPatients").Form("UnsuspendForm").Table("ExceededSuspendedPatientReportTable");
   
  return table;
}
//-------------------
function home_page_exceed_suspended_patients_link()
{
  var list = home_page_messages();
  var link = list.Link("ExceededSuspendedPatientsViewModelPatientHeaderLink"); 
   
  return link;
}
//------------------------------------------------------------------------
////////// Home Page Suspension List Unsuspend button ////////////////////
//------------------------------------------------------------------------
function home_page_suspension_table_unsuspend_button()
{
  var list = home_page_messages();
  var button = list.Panel("ExceededSuspendedPatients").Form("UnsuspendForm").Panel(0).SubmitButton("UnsuspendLink");
   
  return button;
}
//------------------------------------------------------------------------
////////// Home Page Exceeded Treatment End_Date List Table  /////////////
//------------------------------------------------------------------------
function home_page_exceeded_treatment_end_date_table()
{
  var list = home_page_messages();
  var table = list.Panel("ExceededPatients").Table("PatientExceededReportTable");
   
  return table;
}
//--------------------
function home_page_exceeded_treatment_end_date_link()
{
  var list = home_page_messages();
  var link = list.Link("ExceededPatientsHeaderLink"); 
   
  return link;
}
//-------------------------------------------------------------------------------
//------------------------------------------------------------------------
///////////////////////  Patient / Demographics  /////////////////////////
//------------------------------------------------------------------------
function patient_banner_blue_bar()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var blue_header_bar = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer").Panel("patientZone1");
   
  return blue_header_bar; 
} 
//------------------------------------------------------------------------
function patient_banner_yellow_bar()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var yellow_header_bar = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer").Panel("PatientMessages");
   
  return yellow_header_bar; 
} 
//------------------------------------------------------------------------
function patient_search_screen()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var patient_search_box = panelMCP.Panel("PatientContent").Form("PatientSearchForm");
  
  return patient_search_box;
} 
//------------------------------------------------------------------------
function patient_search_screen_results_table()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var patient_search_results_table = panelMCP.Panel("PatientContent").Panel("SearchResults").Form("ExternalTestPatientSearchForm").Panel("PatientSearchResults").Table("PatientResults");
  
  return patient_search_results_table;
} 
//------------------------------------------------------------------------
function add_patient_demographics_system_path()
{
  var INRstarV5 = INRstar_base();
  var panelPDAF = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientContent").Fieldset("PatientDetailsAddFieldset");
  var patient_demographics = panelPDAF.Form("PatientAddDetailsForm").Fieldset(0).Panel("PatientDetailsWrapper");

  return patient_demographics;
}
//------------------------------------------------------------------------
function patient_demographics_tab_demographics()
{
  var INRstarV5 = INRstar_base();
  var panelPDAF = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
  var panelPDW = panelPDAF.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientDetailsWrapper")
  var patient_demographics = panelPDW.Panel("PatientDetails");

  return patient_demographics;
} 
//------------------------------------------------------------------------
function patient_demographics_tab_contact_address()
{
  var INRstarV5 = INRstar_base();
  var panelPDAF = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
  var panelPDW = panelPDAF.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientDetailsWrapper")
  var patient_contact = panelPDW.Panel("PatientContactDetails").Panel("ContactDetails");

  return patient_contact;
} 
//------------------------------------------------------------------------
function add_patient_demographics_buttons_system_path()
{
  var INRstarV5 = INRstar_base();
  var panelMPC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientContent").Fieldset("PatientDetailsAddFieldset");
  var patient_demographic_buttons = panelMPC.Form("PatientAddDetailsForm");

  return patient_demographic_buttons;
} 
//------------------------------------------------------------------------
function patient_edit_demographics_form_pat_details()
{
  var INRstarV5 = INRstar_base();
  var panelPDAF = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPDW = panelPDAF.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPDW = panelPDW.Form("PatientEditDetailsForm").Panel("PatientDetailsWrapper");
  var edit_pat_details = panelPDW.Panel("EditPatientDetails")

  return edit_pat_details;
} 
//------------------------------------------------------------------------
function patient_edit_demographics_form_contact_details()
{
  var INRstarV5 = INRstar_base();
  var panelPDAF = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPDW = panelPDAF.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPDW = panelPDW.Form("PatientEditDetailsForm").Panel("PatientDetailsWrapper");
  var edit_contact_details = panelPDW.Panel("EditPatientContactDetails");

  return edit_contact_details;
} 
//------------------------------------------------------------------------
function patient_edit_demographics_form_buttons()
{
  var INRstarV5 = INRstar_base();
  var panelPDAF = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPDW = panelPDAF.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var edit_demographics_buttons = panelPDW.Form("PatientEditDetailsForm").Panel(0);

  return edit_demographics_buttons;
} 
//------------------------------------------------------------------------
function patient_clinical_tab()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelTPST = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("TreatmentPlanSubTab");
  var clinical_tab = panelTPST.Panel("PatientTreatmentPlanTabSubMenu")
  
  return clinical_tab;
} 

//------------------------------------------------------------------------
/////////////////////  Patient / Treatment Plan  /////////////////////////
//------------------------------------------------------------------------
//General Path
function patient_record_tab() //high level obj
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord");
  
  return panelPR;
}
//------------------------------------------------------------------------
function main_patient_tab()
{
  var panelPR = patient_record_tab().Panel("PatientMainTabContent");
  
  return panelPR;
}
//------------------------------------------------------------------------
function tp_drop_down()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelTPLW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("TreatmentPlanSubTab").Panel("TreatmentPlanListWrapper");
  var drop_down = panelTPLW.TextNode(0).Select("TreatmentPlanList");
  
  return drop_down;
}
//------------------------------------------------------------------------
function tp_banner()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelTPLW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("TreatmentPlanSubTab").Panel("TreatmentPlanListWrapper");
  var banner = panelTPLW.Panel("TreatmentPlanMessages");
  
  return banner;
}
//------------------------------------------------------------------------
function clinical_tp_details()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTPW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper");
  var clinical_warfarin_details = panelPTPW.Panel("PatientTreatmentPlanDetails").Panel("PatientTreatmentPlanInformation");
  
  return clinical_warfarin_details;
}
//------------------------------------------------------------------------
function clinical_details_banner_bar()
{
    var INRstarV5 = INRstar_base();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
    var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
    var form = panelPCD.Form("PatientEditTreatmentPlanForm");
    var banner_bar = form.Panel("TreatmentPlanValidation");
   
  return banner_bar; 
} 
//------------------------------------------------------------------------
function clinical_warfarin_details()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTPW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper");
  var clinical_warfarin_details = panelPTPW.Panel("PatientTreatmentPlanDetails").Panel(0).Panel("EditPatientTreatmentPlanInformation");
  
  return clinical_warfarin_details;
}
//------------------------------------------------------------------------
function clinical_tablet_select()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTPW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper");
  var tablet_select = panelPTPW.Panel("PatientTreatmentPlanDetails").Panel(0).Panel("PatientTreatmentPlanTabletSelection");
  
  return tablet_select;
}
//------------------------------------------------------------------------
function new_treatment_plan_button_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTPW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientTreatmentPlanWrapper");
  var new_treatment_plan_button = panelPTPW.Panel("PatientTreatmentPlanDetails").Panel(1).Button("AddPatientTreatmentPlanLink");
  
  return new_treatment_plan_button;
} 
//------------------------------------------------------------------------
function change_treatment_plan_buttons()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var treat_buttons = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  
  return treat_buttons;
}
//------------------------------------------------------------------------
function add_treatment_plan_main_section_path()
{      
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var formATPF = panelPCD.Form("AddTreatmentPlanForm");
  var treatment_plan_main_section = formATPF.FieldSet(0).Panel("EditPatientTreatmentPlanInformation");
      
  return treatment_plan_main_section;
}
//------------------------------------------------------------------------
function add_treatment_plan_main_section_activate_path()
{      
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var formATPF = panelPTC.Form("ActivatePatientForm");
  var treatment_plan_main_section = formATPF.FieldSet(0).Panel("EditPatientTreatmentPlanInformation");
      
  return treatment_plan_main_section;
}
//------------------------------------------------------------------------
function add_treatment_plan_warfarin_details()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var formATPF = panelPCD.Form("AddTreatmentPlanForm");
  var panelEPCI = formATPF.FieldSet(0).Panel("EditPatientTreatmentPlanInformation");
  var treatment_plan_warfarin_details = panelEPCI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation");
  
  return treatment_plan_warfarin_details;
}
//------------------------------------------------------------------------
function add_treatment_plan_warfarin_activate_details()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelEPTPI = panelPTC.Form("ActivatePatientForm").Fieldset(0).Panel("EditPatientTreatmentPlanInformation");
  var treatment_plan_warfarin_details_activate = panelEPTPI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation");
  
  return treatment_plan_warfarin_details_activate;
}
//------------------------------------------------------------------------
function edit_treatment_plan_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var formATPF = panelPCD.Form("PatientEditTreatmentPlanForm");
  var treatment_plan_section = formATPF.Panel("EditPatientTreatmentPlanInformation");
  
  return treatment_plan_section;
}
//------------------------------------------------------------------------
function edit_treatment_plan_tab_select()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var formATPF = panelPCD.Form("PatientEditTreatmentPlanForm");
  var panelEPTPI = formATPF.Panel("EditPatientTreatmentPlanInformation");
  var tab_select = panelEPTPI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanTabletSelection");
  
  return tab_select;
}
//------------------------------------------------------------------------
function edit_treatment_plan_warfarin_details_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var formATPF = panelPCD.Form("PatientEditTreatmentPlanForm");
  var panelEPCI = formATPF.Panel("EditPatientTreatmentPlanInformation");
  var treatment_plan_warfarin_details = panelEPCI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanInformation");
  
  return treatment_plan_warfarin_details;
}
//------------------------------------------------------------------------
function add_treatment_plan_tablet_selection()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var formATPF = panelPCD.Form("AddTreatmentPlanForm");
  var panelEPCI = formATPF.FieldSet(0).Panel("EditPatientTreatmentPlanInformation");
  var treatment_plan_tablet_selection = panelEPCI.Panel("WarfarinDetailsPanel").Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanTabletSelection");
  
  return treatment_plan_tablet_selection;
}
//------------------------------------------------------------------------
function add_treatment_plan_activate_tablet_selection()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelWDP = panelPTC.Form("ActivatePatientForm").Fieldset(0).Panel("EditPatientTreatmentPlanInformation").Panel("WarfarinDetailsPanel")
  var treatment_plan_tablet_selection = panelWDP.Panel("PatientTreatmentPlanInformation").Panel(0).Panel("EditPatientTreatmentPlanTabletSelection")
  
  return treatment_plan_tablet_selection;
}
//------------------------------------------------------------------------
function add_treatment_plan_button()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var treatment_plan_button = panelPCD.Form("AddTreatmentPlanForm").Panel("PatientTreatmentPlanInformation");

  return treatment_plan_button;
}
//------------------------------------------------------------------------
function add_treatment_plan_activate_button()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var treatment_plan_button = panelPTC.Form("ActivatePatientForm").Panel(0);

  return treatment_plan_button;
}
//------------------------------------------------------------------------
function edit_treatment_plan_button_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var treatment_plan_button = panelPCD.Form("PatientEditTreatmentPlanForm").Panel(0);
  
  return treatment_plan_button;
} 
//------------------------------------------------------------------------
function treatment_appointment_buttons()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var panelField = panelPPT.Panel("TreatmentButtonsContainer").Fieldset("AppointmentButtons");
  
  return panelField;
}
//------------------------------------------------------------------------
function treatment_dna_buttons()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var panelField = panelPPT.Panel("TreatmentButtonsContainer").Fieldset("DNAButtons");
  
  return panelField;
}
//------------------------------------------------------------------------
function fast_induction_risk_factors_path()
{ 
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").panel("PatientTreatmentWrapper")
  var panelPPTIW = panelPTW.Panel("PatientPendingTreatment").Panel("PatientPreTreatmentINRWrapper");
  var risk_factors = panelPPTIW.Form("PreTreatmentINRForm").Panel(0).Table(0);
   
  return risk_factors;
} 
//------------------------------------------------------------------------
function pre_treatment_induction_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").panel("PatientTreatmentWrapper")
  var panelPPTIW = panelPTW.Panel("PatientPendingTreatment").Panel("PatientPreTreatmentINRWrapper");
  var panelPPTIC = panelPPTIW.Form("PreTreatmentINRForm").Panel("PatientPreTreatmentINRQuestionsWrapper").Panel("PatientPreTreatmentINRConfirm");
  var pre_treatment_info = panelPPTIC.Panel("PatientPreTreatmentINRTestDetails").Panel("testDetails").Panel("poctDetails");
  
  return pre_treatment_info;
} 
//------------------------------------------------------------------------
function pre_treatment_info_induction_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").panel("PatientTreatmentWrapper")
  var panelPPTIW = panelPTW.Panel("PatientPendingTreatment").Panel("PatientPreTreatmentINRWrapper");
  var panelPPTIC = panelPPTIW.Form("PreTreatmentINRForm").Panel("PatientPreTreatmentINRQuestionsWrapper").Panel("PatientPreTreatmentINRConfirm");
  var pre_treatment_info = panelPPTIC.Panel("PatientPreTreatmentINRTestDetails");

  return pre_treatment_info;
} 
//------------------------------------------------------------------------
function pre_treatment_non_induct_path()
{
   var INRstarV5 = INRstar_base();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
   var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").panel("PatientTreatmentWrapper")
   var panelPTNIW = panelPTW.Panel("PatientPendingTreatment").Panel("PatientTreatmentNewINRWrapper");
   var panelPTNITD = panelPTNIW.Form("NewINRForm").Panel("PatientTreatmentNewINRQuestionsWrapper").Panel("PatientTreatmentNewINRTestDetails");
   var pre_treatment_info = panelPTNITD.Panel("testDetails").Panel("poctDetails");

   return pre_treatment_info;
} 
//------------------------------------------------------------------------
function treatment_inr_test_info_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm");
  var inr_test_info_path = panelPTNIW.Panel("PatientTreatmentNewINRQuestionsWrapper").Panel("PatientTreatmentNewINRTestDetails").Panel("testDetails");
  
  return inr_test_info_path;
} 
//------------------------------------------------------------------------
function new_inr_test_details()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm");
  var inr_test_info_path = panelPTNIW.Panel("PatientTreatmentNewINRQuestionsWrapper").Panel("PatientTreatmentNewINRTestDetails");
  
  return inr_test_info_path;
} 
//------------------------------------------------------------------------
function treatment_inr_test_options()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm");
  var inr_options_path = panelPTNIW.Panel("PatientTreatmentNewINRQuestionsWrapper").Panel("PatientTreatmentNewINRTestDetails").Fieldset("Options");
  //had to take out panel here things may now brake
//  var inr_options_path = panelPTNIW.Panel("PatientTreatmentNewINRQuestionsWrapper").Panel("PatientTreatmentNewINRTestDetails").Fieldset("Options").Panel(0);
  
  return inr_options_path;
} 
//------------------------------------------------------------------------
function treatment_override_field_container()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var form = panelPPT.Panel("PendingTreatmentInfo").Form("EditPendingTreatmentForm");
  var override_fields = form.Table("OverrideSuggestedTreatmentTable");
  
  return override_fields;
} 
//------------------------------------------------------------------------
function more_schedule_table()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var grid = panelPPT.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent").Panel("MoreScheduleGrid");
  var schedule_table = grid.Table("ScheduleSelectorTable");
  
  return schedule_table;
}
//------------------------------------------------------------------------
function dosing_schedule_content()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var schedule_content = panelPPT.Panel("PendingTreatmentInfo").Panel("DosingScheduleContent");
  
  return schedule_content;
} 
//------------------------------------------------------------------------
function patient_pending_treatment_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  
  return panelPPT;
} 
//------------------------------------------------------------------------
function treatment_buttons_pre_schedule()
{  
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm");
  var buttons_pre_schedule = panelPTNIW.Panel(0);
  
  return buttons_pre_schedule;
} 
//------------------------------------------------------------------------
function historic_treatment_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelTPW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("TreatmentPlanWrapper");
  var panelPTW = panelTPW.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var historic_treatment_form = panelPTW.Panel("PatientTreatmentNewHistoricalWrapper").Form("NewHistoricalTreatmentForm");
  
  return historic_treatment_form;
}
//------------------------------------------------------------------------
function treatment_comment() //this is a duplicate, use treatment_table() as it is clearer, they have the same path
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelTPW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("TreatmentPlanWrapper");
  var panelPTW = panelTPW.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory").Panel("TreatmentsInPlanWrapper");
  var treatment_comment_path = panelPTW.Panel("PatientTreatmentINRHistory").Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable");
  
  return treatment_comment_path;
}
//------------------------------------------------------------------------
function treatment_comment_box()
{
  var INRstarV5 = INRstar_base();
  var treatment_comment_path = INRstarV5.Panel(3).Panel("modalDialogBox").Fieldset("EditCommentsFieldset").Form("EditCommentsForm").Textarea("Comments");
  
  return treatment_comment_path;
}
//------------------------------------------------------------------------
function pending_treatment_buttons()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var pending_treatment_buttons_path = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  
  return pending_treatment_buttons_path;
}
//------------------------------------------------------------------------
function save_inr_button()
{
  var pending_treatment_buttons_path = pending_treatment_buttons();
  
  if (language == "Italian")
  {
    var save_inr_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Panel(0).Panel(0).Button("AcceptPendingTreatment");
  }
  else
  {
    var save_inr_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment");
  }
  
  return save_inr_button_path;
}  
//------------------------------------------------------------------------
function override_button()
{
  var pending_treatment_buttons_path = pending_treatment_buttons();
  
  if (language == "Italian")
  {
    var override_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Panel(0).Panel(0).Button("OverridePendingTreatment");
  }
  else
  {
    var override_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("OverridePendingTreatment");
  }
  return override_button_path;
}
//------------------------------------------------------------------------
function overide_accept_button()
{
  var override_finish_buttons = override_finish_buttons_path();
	var override_accept_button_path = override_finish_buttons.Button("OverrideAccept")
  
  return override_accept_button_path;  
}
//------------------------------------------------------------------------
function cancel_pending_treat_button()
{
  var pending_treatment_buttons_path = pending_treatment_buttons();
  var cancel_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("CancelPendingTreatment");
  
  return cancel_button_path;
}
//------------------------------------------------------------------------
function refer_pending_treat_button()
{
  var pending_treatment_buttons_path = pending_treatment_buttons();
  
  if (language == "Italian")
  {
    var refer_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Panel(0).Panel(0).Button("ReferPendingTreatment");
  }
  else
  {
    var refer_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("ReferPendingTreatment");
  }
  
  return refer_button_path;
}
//------------------------------------------------------------------------
function sugg_war_dose_button()
{
  var pending_treatment_buttons_path = pending_treatment_buttons();
  var form = pending_treatment_buttons_path.Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm");
  var sugg_war_dose_button_path = form.Panel(0).SubmitButton("CalculateWarfarinDose");
  
  return sugg_war_dose_button_path;
} 
function current_tab()
{
  var path = pending_treatment_buttons();
  var panelPTI = path.Panel("PendingTreatmentInfo");
  panelPTI.Panel("DosingSchedule").Link("CurrentTab");
  
  return panelPTI;
}
//------------------------------------------------------------------------
function new_inr_button_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var new_inr_button = panelPPT.Panel("TreatmentButtonsContainer").Fieldset("TreatmentButtons").Button("NewINR");
  
  return new_inr_button;
} 
//------------------------------------------------------------------------
function treatment_table()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory")
  var panelVPHTW = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory").Panel("ViewPatientHistoricalTreatmentsWrapper");
  var treatment_table_path = panelVPHTW.Table("PatientTreatmentHistoryTable")
  
  return treatment_table_path;
}
//------------------------------------------------------------------------
function treatment_table_from_previous_plan()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstar_base().Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory")
  var panelVPHTW = panelPTH.Panel("TreatmentsFromPreviousPlanWrapper").Panel("PatientTreatmentINRHistory").Panel("ViewPatientHistoricalTreatmentsWrapper")
  var treatment_table_path = panelVPHTW.Table("PatientTreatmentHistoryTable");
  
  return treatment_table_path;
}
//------------------------------------------------------------------------
function pending_treatment_table()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var pending_treatment_table_path = panelPPT.Panel("PatientPendingTreatmentDetails").Table("PendingTreatmentTable");
  
  return pending_treatment_table_path;
} 
//------------------------------------------------------------------------
function view_all_treatments_button()
{
  var pending_treatment_buttons_path = pending_treatment_buttons();
  var all_treatments_button = pending_treatment_buttons_path.Panel("TreatmentButtonsContainer").Fieldset("ViewButtons").Button("ViewHistoricalTreatment");
  
  return all_treatments_button;
} 
//------------------------------------------------------------------------
function inr_treatment_buttons()
{
  var pending_treatment_buttons_path = pending_treatment_buttons();
  var inr_treatment_buttons = pending_treatment_buttons_path.Panel("TreatmentButtonsContainer").Fieldset("TreatmentButtons");
  
  return inr_treatment_buttons;
} 
//------------------------------------------------------------------------
function override_treatment_buttons_path()
{
  var pending_treatment = pending_treatment_buttons();
  var override_buttons = pending_treatment.Panel("PendingTreatmentInfo").Form("EditPendingTreatmentForm").Table("OverrideSuggestedTreatmentTable");
  
  return override_buttons;
} 
//------------------------------------------------------------------------
function override_finish_buttons_path()
{
  var pending_treatment = pending_treatment_buttons();
  var override_final_buttons = pending_treatment.Panel("PendingTreatmentInfo").Form("EditPendingTreatmentForm").Panel(0);
  
  return override_final_buttons;
} 
//------------------------------------------------------------------------
function inr_results_received_table()
{
  var INRstarV5 = INRstar_base();
  var panelPPT = INRstarV5.patient_pending_treatment_path()
  var panelPTNIW = panelPPT.Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm").Panel("ExternalResultsContent");
  
  var patient_external_results_table_path = panelPTNIW.Panel("PatientExternalResultsContainer").Panel("PatientExternalResultsTableWrapper").Panel(0);
  var patient_external_results_table = patient_external_results_table_path.Table("PatientResultsTable")
  
  return patient_external_results_table;
} 
//------------------------------------------------------------------------
function archive_reason_comments_for_archived_result_confirmation_popup()
{
    var INRstarV5 = INRstar_base();
    var dialogBox = INRstarV5.Panel(3).Panel("modalDialogBox").Panel(0);
    var textbox = dialogBox.Form("AddArchiveCommentForm").Panel(0).Textarea("RejectionReason");
   
    return textbox;
}
//------------------------------------------------------------------------
//------------------------------------------------------------------------
///////////////////////////////  Sorb  ///////////////////////////////////
//------------------------------------------------------------------------
//------------------------------------------------------------------------
function sorb_button_suggested_path()
{
  var treatment_buttons = pending_treatment_buttons();
  var sorb_suggested_button = treatment_buttons.Panel("PendingTreatmentInfo").Panel(0).Button("SkipOrBoost0");
  
  return sorb_suggested_button;
} 
//------------------------------------------------------------------------
function sorb_button_current_path()
{
  var treatment_buttons = pending_treatment_buttons();
  var sorb_current_button = treatment_buttons.Panel("PendingTreatmentInfo").Panel(0).Button("SkipOrBoost1");
  
  return sorb_current_button;
} 
//------------------------------------------------------------------------
function sorb_button_low_level_path()
{
  var treatment_buttons = pending_treatment_buttons();
  var sorb_button_low_level = treatment_buttons.Panel("PendingTreatmentInfo").Panel(0).Button("SkipOrBoost");
  
  return sorb_button_low_level;
} 
//------------------------------------------------------------------------
function get_sorb_heading_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
  var sorb_heading = panelPPT.Panel("PendingTreatmentInfo").TextNode(0);
  
  return sorb_heading;
}
//------------------------------------------------------------------------
function pre_treatment_induction_buttons_path()
{
   var INRstarV5 = INRstar_base();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
   var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").panel("PatientTreatmentWrapper")
   var panelPPTIW = panelPTW.Panel("PatientPendingTreatment").Panel("PatientPreTreatmentINRWrapper");
   var panelPPTIC = panelPPTIW.Form("PreTreatmentINRForm").Panel("PatientPreTreatmentINRQuestionsWrapper")
   var pre_treatment_buttons = panelPPTIC.Panel(0);

   return pre_treatment_buttons;
} 
//------------------------------------------------------------------------
function sorb_button_error_message_path()
{
   var INRstarV5 = INRstar_base();
   var panelMCP = INRstarV5.Panel(3).Panel("modalDialogBox").Panel(0)
   var error_text_path = panelMCP.TextNode(0);

   return error_text_path;
} 
//------------------------------------------------------------------------
function sorb_button_error_message_button_path()
{
   var INRstarV5 = INRstar_base();
   var panelMCP = INRstarV5.Panel(3).Panel(1);
   var sorb_error_button_path = panelMCP.Panel(0).Button(0).TextNode(0);

   return sorb_error_button_path;
} 
//------------------------------------------------------------------------
function sorb_table()
{
  var treatment_buttons = pending_treatment_buttons();
  var sorb_table = treatment_buttons.Panel("PendingTreatmentInfo").Table("sorbTable");
  
  return sorb_table;
} 
//------------------------------------------------------------------------
function sorb_schedule_finish_buttons()
{
  var treatment_buttons = pending_treatment_buttons();
  var schedule_finish_buttons = treatment_buttons.Panel("PendingTreatmentInfo").Panel(0);
  
  return schedule_finish_buttons;
} 
//------------------------------------------------------------------------
function treatment_pop_up_warning_message()
{
   var INRstarV5 = INRstar_base();
   var panelMCP = INRstarV5.Panel(3).Panel("modalDialogBox").Panel("FrequentINRMessages");
   var warning_text_path = panelMCP.TextNode(0);

   return warning_text_path;
} 
//------------------------------------------------------------------------
function treatment_banner_error_message()
{
   var INRstarV5 = INRstar_base();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent")
   var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment")
   var error_text_path = panelPPT.Panel("PatientTreatmentNewINRWrapper").Panel("ValidationErrors").Panel("NewINR");

   return error_text_path;
} 
//------------------------------------------------------------------------
function treatment_banner_warning_message()
{
   var INRstarV5 = INRstar_base();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent")
   var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment")
   var warning_text_path = panelPPT.Panel("PatientTreatmentNewINRWrapper").Panel("NewINRMessages");

   return warning_text_path;
}
//------------------------------------------------------------------------
function dosing_engine_warning_popup()
{
   var INRstarV5 = INRstar_base();
   var warning_popup = INRstarV5.Panel(4).Panel("modalDialogBoxSecondary").Panel("DosingEngineWarnings");

   return warning_popup;
}
//------------------------------------------------------------------------
//------------------------------------------------------------------------
///////////////////////////  Bridging  ///////////////////////////////////
//------------------------------------------------------------------------
function patient_treatment_bridging_tab()
{
  var INRstarV5 = INRstar_base();
  var panelPR = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord");
  var panelPTC = panelPR.Panel("PatientMainTabContent").Panel("PatientTabContent");
  var tab = panelPTC.Panel("BridgingTabContent");
  
  return tab;
}
//------------------------------------------------------------------------
function bridging_schedule_form()
{
  var tab = patient_treatment_bridging_tab();
  var panel = tab.Form("BridgingForm").Panel("BridgingTabContent");
  
  return panel;
}
//------------------------------------------------------------------------
function bridging_schedule_buttons()
{
  var tab = patient_treatment_bridging_tab();
  var panel = tab.Form("BridgingForm").Panel(0);
  
  return panel;
}
//------------------------------------------------------------------------
function bridging_schedule_preop_table()
{
  var tab = patient_treatment_bridging_tab();
  var table = tab.Panel("BridgingTabContent").Form("BridgingForm").Panel("Schedules").Panel("BridgingSchedule").Table("Pre_opTable");
  
  return table;
}
//------------------------------------------------------------------------
function bridging_schedule_procedure_table()
{
  var tab = patient_treatment_bridging_tab();
  var table = tab.Panel("BridgingTabContent").Form("BridgingForm").Panel("Schedules").Panel("BridgingSchedule_2").Table("ProcedureTable");
  
  return table;
}
//------------------------------------------------------------------------
function bridging_schedule_post_discharge_table()
{
  var tab = patient_treatment_bridging_tab();
  var table = tab.Panel("BridgingTabContent").Form("BridgingForm").Panel("Schedules").Panel("BridgingSchedule_3").Table("Post_dischargeTable");
  
  return table;
}
//------------------------------------------------------------------------
function bridging_schedule_add_button()
{
  var panel = bridging_schedule_preop_table();
  var button = panel.Cell(1, 0).Link("Pre_opAddButton");
  
  return button;
}
//------------------------------------------------------------------------
function bridging_schedule_save_button()
{
  var tab = patient_treatment_bridging_tab();
  var button = tab.Panel("BridgingTabContent").Form("BridgingForm").Panel(0).SubmitButton("SaveBridgingRecord");
  
  return button;
}
//------------------------------------------------------------------------
function bridging_summary_schedule_table()
{
  var tab = patient_treatment_bridging_tab();
  var table = tab.Panel("BridgingRecords").Table("BridgingRecordsTable");
  
  return table;
}
//------------------------------------------------------------------------
function bridging_schedule_warning_banner()
{
  var tab = patient_treatment_bridging_tab();
  var banner = tab.Panel("BridgingTabContent").Form("BridgingForm").Panel("Schedules").Panel("BridgingScheduleMessages");
  
  return banner;
}
//------------------------------------------------------------------------
//////////////////////////  Summary  ///////////////////////////////////
//------------------------------------------------------------------------
function summary_tab_path()
{
   var INRstarV5 = INRstar_base();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPST = panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientSummaryTab");
   
   return panelPST;
}
function patient_current_summary()
{
  var INRstarV5 = INRstar_base();
  var panelMTC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent");
  var panelCTW = panelMTC.Panel("PatientSummaryWrapper").Panel("PatientSummaryCurrentTreatmentWrapper");
  var panelSCT = panelCTW.Panel("PatientSummaryCurrentTreatment");
  
  return panelSCT;
}
//------------------------------------------------------------------------
function patient_summary_schedule_table()
{
  var INRstarV5 = INRstar_base();
  var panelMTC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent");
  var panelCTW = panelMTC.Panel("PatientSummaryWrapper").Panel("PatientSummaryCurrentTreatmentWrapper");
  var panelSCT = panelCTW.Panel("PatientSummaryCurrentSchedule");
  var table_path = panelSCT.Panel("MoreScheduleGrid").Table("DoseScheduleTable");
  
  return table_path;
}
//------------------------------------------------------------------------
function patient_summary_result_chart()
{
  var INRstarV5 = INRstar_base();
  var panelMTC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent");
  var panelPSR = panelMTC.Panel("PatientSummaryWrapper").Panel("PatientSummaryINRResults");
  
  return panelPSR;
}
//------------------------------------------------------------------------
////////////////////////  External Patient Lookup  ///////////////////////
//------------------------------------------------------------------------
function external_patient_lookup_tab()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var external_lookup_link = panelMCP.Panel("ManagePatients").Panel("PatientTab").Link("ExternalPatientLookupTabLink");
  
  return external_lookup_link;
}
//------------------------------------------------------------------------
function external_patient_lookup_reason_form()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var external_lookup_panel = panelMCP.Panel("PatientContent").Panel("AdvancedSearchTab");
  var external_lookup_form = external_lookup_panel.Form("PatientAdvancedSearchForm").Panel("LocationSearchDiv").Panel("Reason");
  
  return external_lookup_form;
}
//------------------------------------------------------------------------
function external_patient_lookup_reason_form_register()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var external_lookup_panel = panelMCP.Panel("PatientContent").Panel("AdvancedSearchTab").Panel("AdvancedSearchTab");
  var external_lookup_form_register = external_lookup_panel.Form("PatientAdvancedSearchForm").Panel("LocationSearchDiv").Panel("Reason");
  
  return external_lookup_form_register;
}
//------------------------------------------------------------------------
function external_patient_lookup_form()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var external_lookup_panel = panelMCP.Panel("PatientContent").Panel("AdvancedSearchTab");
  var external_lookup_form = external_lookup_panel.Form("PatientAdvancedSearchForm").Panel("AdvancedSearchCriteria");
  
  return external_lookup_form;
}
//------------------------------------------------------------------------
function external_patient_lookup_form_register()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var external_lookup_panel = panelMCP.Panel("PatientContent").Panel("AdvancedSearchTab").Panel("AdvancedSearchTab");
  var external_lookup_form_register = external_lookup_panel.Form("PatientAdvancedSearchForm").Panel("AdvancedSearchCriteria");
  
  return external_lookup_form_register;
}
//------------------------------------------------------------------------
//////////////////////////  Patient Management  //////////////////////////
//------------------------------------------------------------------------
function patient_management_tab_path()
{
   var INRstarV5 = INRstar_base();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPST = panelMCP.Panel("PatientRecord").Panel("PatientTab").Link("PatientManagementTab");
   
   return panelPST;
}
//------------------------------------------------------------------------
////////////////////////  Self Care tab  /////////////////////////////////
//------------------------------------------------------------------------
function warfarin_self_testing_initial_enrol_button_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelEM = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("EngageMarketing");
  var warfarin_self_test_enrol_button = panelEM.Table("ProgrammesTable").Cell(0, 0).Panel(1).Button("ProgramEnrolButton_Warfarin_Self_Testing");
    
  return warfarin_self_test_enrol_button;
}
//------------------------------------------------------------------------
function ddd_initial_enrol_button_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelEM = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("EngageMarketing");
  var ddd_enrol_button = panelEM.Table("ProgrammesTable").Cell(0, 0).Panel(1).Button("ProgramEnrolButton_Digital_dosing_diary");
    
  return ddd_enrol_button;
}
//------------------------------------------------------------------------
function ddd_self_testing_self_testing_phases_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent");
  var ddd_self_test_phase = panelMCP.Panel("ProgramsContainer").Panel("Program_Digital_dosing_diary").Panel("Program_Digital_dosing_diary_Phases");
  
  return ddd_self_test_phase;
}
//------------------------------------------------------------------------
function ddd_self_testing_self_testing_stage_one_path()
{
  var ddd_phase_path = ddd_self_testing_self_testing_phases_path();
  var ddd_stage_one = ddd_phase_path.Panel("Program_Digital_dosing_diary_Phases_Stage_1").Panel("Program_Digital_dosing_diary_Phases_Stage_1_Content");
  
  return ddd_stage_one;
}
//------------------------------------------------------------------------
function ddd_self_testing_self_testing_stage_three_path()
{
  var ddd_phase_path = ddd_self_testing_self_testing_phases_path();
  var ddd_stage_three = ddd_phase_path.Panel("Program_Digital_dosing_diary_Phases_Stage_3").Panel("Program_Digital_dosing_diary_Phases_Stage_3_Content");
  
  return ddd_stage_three;
}
//------------------------------------------------------------------------
function ddd_self_testing_self_testing_stage_four_path()
{
  var ddd_phase_path = ddd_self_testing_self_testing_phases_path();
  var ddd_stage_four = ddd_phase_path.Panel("Program_Digital_dosing_diary_Phases_Stage_4").Panel("Program_Digital_dosing_diary_Phases_Stage_4_Content");
  
  return ddd_stage_four;
}
//------------------------------------------------------------------------

function warfarin_self_testing_self_testing_phases_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPWST = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("ProgramsContainer").Panel("Program_Warfarin_Self_Testing");
  var warfarin_self_test_phases = panelPWST.Panel("Program_Warfarin_Self_Testing_Phases");
    
  return warfarin_self_test_phases;
}
//------------------------------------------------------------------------
function warfarin_self_testing_self_testing_stage_one_path()
{
  var base_path = warfarin_self_testing_self_testing_phases_path();
  var stage_one_path = base_path.Panel("Program_Warfarin_Self_Testing_Phases_Stage_1").Panel("Program_Warfarin_Self_Testing_Phases_Stage_1_Content");
  
  return stage_one_path;
} 
//------------------------------------------------------------------------
function warfarin_self_testing_self_testing_stage_two_path()
{
  var base_path = warfarin_self_testing_self_testing_phases_path();
  var stage_two_path = base_path.Panel("Program_Warfarin_Self_Testing_Phases_Stage_2").Panel("Program_Warfarin_Self_Testing_Phases_Stage_2_Content")
  var training_box = stage_two_path.Panel(0).Checkbox("Program_Warfarin_Self_Testing_Phases_Stage_2_1_Content_Input");
  
  return training_box;
} 
//------------------------------------------------------------------------
function warfarin_self_testing_self_testing_stage_three_path()
{
  var base_path = warfarin_self_testing_self_testing_phases_path();
  var stage_three_path = base_path.Panel("Program_Warfarin_Self_Testing_Phases_Stage_3").Panel("Program_Warfarin_Self_Testing_Phases_Stage_3_Content");
  var authorise_button = stage_three_path.Panel(0).Checkbox("Program_Warfarin_Self_Testing_Phases_Stage_3_1_Content_Input");
  
  return authorise_button;
} 
//------------------------------------------------------------------------
function warfarin_self_testing_self_testing_stage_four_path()
{
  var base_path = warfarin_self_testing_self_testing_phases_path();
  var stage_four_path = base_path.Panel("Program_Warfarin_Self_Testing_Phases_Stage_4").Panel("Program_Warfarin_Self_Testing_Phases_Stage_4_Content");
  
  return stage_four_path;
} 
//------------------------------------------------------------------------
//////////////////////////  Adverse Events  //////////////////////////////
//------------------------------------------------------------------------
function adverse_event_tab()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("PatientTabContent");
  var adverse_event_tab = panelPTC.Panel("PatientAdverseEventsWrapper").Panel("PatientAdverseEventList");
  
  return adverse_event_tab;     
} 
//------------------------------------------------------------------------
function adverse_event_tab_confirm_box()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("PatientTabContent");
  var adverse_event_tab_confirm = panelPTC.Panel("PatientTabContent").Panel("PatientAdverseEventsWrapper").Panel("PatientAdverseEventList");
  
  return adverse_event_tab_confirm;     
} 
//------------------------------------------------------------------------
function adverse_event_form()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("PatientTabContent");
  var adverse_event_form_path = panelPTC.Panel("PatientAdverseEventsWrapper").Panel("PatientAddAdverseEventsWrapper").Form("AddAdverseEventForm");
  
  return adverse_event_form_path;
} 
//------------------------------------------------------------------------
//////////////////////////////// Notes  //////////////////////////////////
//------------------------------------------------------------------------
function notes_tab()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPMTCP = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
  var notes_tab = panelPMTCP.Panel("NotesContent").Panel("PatientNotesWrapper").Form("NotesForm");
  
  return notes_tab;
} 
//------------------------------------------------------------------------
function notes_form()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPMTCP = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
  var notes_form = panelPMTCP.Panel("NotesContent").Panel("PatientNotesWrapper").Form("PatientNotesForm");
  
  return notes_form;
}
//------------------------------------------------------------------------
function notes_archive_button()
{
  var form = notes_tab();
  var button = form.Panel(0).SubmitButton("SaveNotes");
  
  return button;
}
//------------------------------------------------------------------------
////////////////////////////////  Audit  ///////////////////////////////
//------------------------------------------------------------------------
function patient_audit()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
  var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
  var audit_table = panelPMTC.Panel("PatientAuditTrailWrapper").Table("AuditTrailTable");
   
  return audit_table;
} 
//------------------------------------------------------------------------
function system_audit()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
  var panelLATW = panelMCP.Panel("AdminContent").Panel("LocationAuditTrailWrapper");
  var audit_table = panelLATW.Table("AuditTrailTable");
   
  return audit_table;
}
//------------------------------------------------------------------------
function treatment_audit()
{
  var INRstarV5 = INRstar_base();
  var panelTATW = INRstarV5.Panel(2).Panel("DialogContent").Panel("TreatmentAuditTrailWrapper");
  var audit_table = panelTATW.Table("AuditTrailTable");
   
  return audit_table;
}  
//------------------------------------------------------------------------
function add_patient_error_banner()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPDAF = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset");
  var error_box = panelPDAF.Panel("AddPatientValidation").Panel("Errors");
  
  return error_box;
} 
//------------------------------------------------------------------------
function patient_recently_viewed_table()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var recently_viewed_table = panelMCP.Panel("PatientContent").Panel("RecentPatientsWrapper").Table("RecentPatientsTable");
  
  return recently_viewed_table;
} 
//------------------------------------------------------------------------
//------------------------------------------------------------------------
/////////////////////  Options/Location Management  //////////////////////
//------------------------------------------------------------------------ 
function location_management_main_container()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelLC = panelMCP.Panel("AdminContent").Panel("LocationContent");
  var main_container_path = panelLC.Panel(0).Panel("LocationTabContent");
  
  return main_container_path;
}
function location_management_details_tab()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelLC = panelMCP.Panel("AdminContent").Panel("LocationContent");
  var main_container_path = panelLC.Panel(0).Panel("LocationTab");
  
  return main_container_path;
}
function location_management_users_button()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelLC = panelMCP.Panel("AdminContent").Panel("LocationContent");
  var users_button_path = panelLC.Panel(0).Panel("LocationTab").Link("LocationUsersLink");
  
  return users_button_path;
}
function location_management_create_user_form()
{
  var base = location_management_main_container();
  var path = base.Panel("CreateUserWrapper").Form("CreateUserForm");
  
  return path;
}
function location_management_roles_and_permissions()
{
  var base = location_management_main_container();
  var panelAW = base.Panel("UserContent").Panel("UserAccountContent").Panel("AuthorisationWrapper");
  var panelPL = panelAW.Panel("UserPermissions").Form("RolesForm").Panel("Permissions").Panel("permissionList");
  
  return panelPL;
}

function location_management_user_details_tab()
{
  var base = location_management_main_container();
  var tab = base.Panel("UserContent").Panel("UserAccountContent").Panel("UserDetailsTab");
  
  return tab;
}
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//////////////////////////  Options/IQC  /////////////////////////////////
//------------------------------------------------------------------------
function options_iqc_form()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var iqc_form = panelMCP.Panel("AdminContent").Form("AddIQCResultForm").Fieldset(0).Panel("StandardFormContainer");
  
  return iqc_form;
} 
//------------------------------------------------------------------------
function options_iqc_form_buttons()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var iqc_form_buttons = panelMCP.Panel("AdminContent").Form("AddIQCResultForm");
  
  return iqc_form_buttons;
} 

//------------------------------------------------------------------------
function options_iqc_edit_form()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var iqc_form = panelMCP.Panel("AdminContent").Form("EditIQCResultForm").Panel("StandardFormContainer");
  
  return iqc_form;
} 
//------------------------------------------------------------------------
function options_iqc_edit_form_buttons()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var iqc_form_edit_buttons = panelMCP.Panel("AdminContent").Form("EditIQCResultForm");
  
  return iqc_form_edit_buttons;
} 
//------------------------------------------------------------------------
function options_iqc_table()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelIQCW = panelMCP.Panel("AdminContent").Panel("IQCWrapper");
  var iqc_table = panelIQCW.Table("LocationsIQCTable");
  
  return iqc_table;
}
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//////////////////////////  Options/EQC  /////////////////////////////////
//------------------------------------------------------------------------
function options_eqc_form_buttons()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelEQC = panelMCP.Panel("AdminContent").Panel("EQCWrapper");
  
  return (panelEQC);
}
//------------------------------------------------------------------------
function options_eqc_edit_form_buttons()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var eqc_form_edit_buttons = panelMCP.Panel("AdminContent").Form("EditEQCResultForm");
  
  return eqc_form_edit_buttons;
} 
//------------------------------------------------------------------------
/////////////////////////  Options/PoCT  /////////////////////////////////
//------------------------------------------------------------------------
function options_poct_form()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var poct_form = panelMCP.Panel("AdminContent").Form("NewPoCTBatchDetailsForm");
  
  return poct_form;
} 
//------------------------------------------------------------------------
function options_poct_table()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var poct_table = panelMCP.Panel("AdminContent").Panel(0).Panel("NPTBatchDetailsLog").Table("LocationsPoCTTable");
  
  return poct_table;
} 
//------------------------------------------------------------------------
function options_edit_poct_table()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var poct_form = panelMCP.Panel("AdminContent").Form("EditPoCTForm");
  var poct_edit_table = poct_form.Panel(0).Panel("NPTBatchDetailsLog").Table("LocationsPoCTTable");
  
  return poct_edit_table;
} 
//------------------------------------------------------------------------
function options_poct_edit_buttons()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var poct_edit_buttons = panelMCP.Panel("AdminContent").Form("EditPoCTForm").Panel(0).Panel(0);
  
  return poct_edit_buttons;
} 
//------------------------------------------------------------------------
function options_poct_buttons()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var poct_buttons = panelMCP.Panel("AdminContent").Panel(0);
  
  return poct_buttons;
}
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//////////////////// Options/LetterManagement  ///////////////////////////
//------------------------------------------------------------------------
function options_letter_management()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var letter_management_tab = panelMCP.Panel(0).Link("LetterManagementTab");
  
  return letter_management_tab;
}
//------------------------------------------------------------------------
function letter_management_template_buttons()
{
  var INRstarV5 = INRstar_base();
  var admin_content = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("AdminContent");
  var manage_panel = admin_content.Form("LetterManagementForm").Panel("LetterManagementPanel");
  var template_buttons = manage_panel.Panel("LetterTemplatePanel").Panel("LetterTemplateButtons");
  
  return template_buttons;
}
//------------------------------------------------------------------------
function letter_management_description_field()
{
  var INRstarV5 = INRstar_base();
  var admin_content = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("AdminContent");
  var manage_panel = admin_content.Form("LetterManagementForm").Panel("LetterManagementPanel");
  var description = manage_panel.Panel("LetterEditorPanel").Panel("LetterTemplatePropertiesPanel").Panel(1).Textarea("Description");
  
  return description;
}
//------------------------------------------------------------------------
function letter_management_content_field()
{
  var INRstarV5 = INRstar_base();
  var admin_content = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("AdminContent");
  var manage_panel = admin_content.Form("LetterManagementForm").Panel("LetterManagementPanel");
  var body = manage_panel.Panel("LetterEditorPanel").Panel("ContentTextEditor").Panel(1).Panel(0);
  
  return body;
}
//------------------------------------------------------------------------
function letter_management_permissions_field()
{
  var INRstarV5 = INRstar_base();
  var admin_content = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("AdminContent");
  var manage_panel = admin_content.Form("LetterManagementForm").Panel("LetterManagementPanel");
  var permissions = manage_panel.Panel("LetterSettingsPanel").Panel("LetterPermissionsPanel");
  
  return permissions;
}
//------------------------------------------------------------------------
function letter_management_editor_buttons()
{
  var INRstarV5 = INRstar_base();
  var admin_content = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("AdminContent");
  var manage_panel = admin_content.Form("LetterManagementForm").Panel("LetterManagementPanel");
  var buttons = manage_panel.Panel("LetterEditorPanel").Panel("LetterEditorButtons");
  
  return buttons;
}
//------------------------------------------------------------------------
function letter_management_list()
{
  var INRstarV5 = INRstar_base();
  var admin_content = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("AdminContent");
  var manage_panel = admin_content.Form("LetterManagementForm").Panel("LetterManagementPanel");
  var list = manage_panel.Panel("LetterTemplatePanel").Panel("LetterTemplateListViewPanel").Panel("LetterTemplateListView");
  
  return list;
}
//------------------------------------------------------------------------
function letter_editor_panel()
{
  var INRstarV5 = INRstar_base();
  var admin_content = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("AdminContent");
  var manage_panel = admin_content.Form("LetterManagementForm").Panel("LetterManagementPanel");
  var main = manage_panel.Panel("LetterEditorPanel");
  
  return main;
}
//------------------------------------------------------------------------
//------------------------------------------------------------------------
////////////////////////// Options/Diagnosis /////////////////////////////
//------------------------------------------------------------------------
function options_diagnosis_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var diagnosis_tab = panelMCP.Panel(0).Link("SectionDiagnosisTab");
  
  return diagnosis_tab;
}
//------------------------------------------------------------------------
function options_diagnosis_add_button()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var add_button = panelMCP.Panel("AdminContent").Panel(0).Panel(0).Button("AddDiagnosisButton");
  
  return add_button;
}
//------------------------------------------------------------------------
function options_diagnosis_list()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var diagnosis_list = panelMCP.Panel("AdminContent").Panel(0).Panel("SectionDiagnoses").Panel(0).Select("ListOfDiagnoses");
  
  return diagnosis_list;
}
//------------------------------------------------------------------------
function diagnosis_form()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var diagnosis_form = panelMCP.Panel("AdminContent").Form("AddDiagnosisForm");
  
  return diagnosis_form;
}
//------------------------------------------------------------------------
function diagnosis_details()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var diagnosis_details = panelMCP.Panel("AdminContent").Panel(0).Panel("DiagnosisDetails");
  
  return diagnosis_details;
}
//------------------------------------------------------------------------
function edit_diagnosis_details()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var diagnosis_details = panelMCP.Panel("AdminContent").Panel(0).Panel("DiagnosisDetails").Form("EditDiagnosisForm");
  
  return diagnosis_details;
}
//------------------------------------------------------------------------
////////////////////////////  Reviews  ///////////////////////////////////
//------------------------------------------------------------------------
//------------------------------------------------------------------------
function add_review_form()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var add_review_form = panelPTC.Panel(0).Panel(0).Form("AddReviewForm");

  return add_review_form;
} 
//------------------------------------------------------------------------
function add_review_form_test_results()
{
  var form = add_review_form();
  var test_results = form.Panel(0).Panel(6).Panel("WarfarinTestResultsPanel");
  
  return test_results;
}
//------------------------------------------------------------------------
function add_review_form_dose()
{
  var form = add_review_form();
  var dose_dropdown = form.Panel(0).Panel("ReviewDosePanel").Panel("Question_Dose");
  
  return dose_dropdown;
}
//------------------------------------------------------------------------
function add_review_form_buttons()
{
  var form = add_review_form();
  var form_buttons = form.Panel(0).Panel("AnnualReviewAddActions");
  
  return form_buttons;
} 
//------------------------------------------------------------------------
function review_history_tab_data()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var summary_table = panelPTC.Panel("AnnualReviewWrapper").Panel("AnnualReviewSummaryPanel").Table("ReviewSummaryTable");
  
  return summary_table;
} 

//------------------------------------------------------------------------
function review_tab_edit_next_date_data()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var summary_table = panelPTC.Panel("AnnualReviewWrapper").Panel("ReviewDateSummary").Fieldset("NextDateSummary");
  
  return summary_table;
} 
//------------------------------------------------------------------------
function review_tab_data()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var review_tab = panelPTC.Panel("AnnualReviewWrapper");
  
  return review_tab;
} 

//------------------------------------------------------------------------
function error_pane_demographics()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var error_pane = panelPTC.Panel("EditDetails");
  
  return error_pane;
} 
//------------------------------------------------------------------------
////////////////////////////  Patient Management  ////////////////////////
//------------------------------------------------------------------------
function patient_management_base()
{
  var INRstarV5 = INRstar_base();
  var main = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var base = main.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper");
  
  return base;
}
//------------------------------------------------------------------------
function patient_management_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var patient_management_path = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientManagementForm");
  
  return patient_management_path;
} 
//------------------------------------------------------------------------
function patient_management_buttons()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Form("PatientManagementForm");
  var buttons = form.Panel(0);
  
  return buttons;
} 
//------------------------------------------------------------------------
function patient_management_groups()
{
  var patient_management = patient_management_path();
  var patient_management_groups_path = patient_management.Panel("PatientManagementWrapper").Panel("PatientGroups");
  
  return patient_management_groups_path;
} 
//------------------------------------------------------------------------
function patient_management_care_team()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var care_team_path = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper").Panel("PatientManagementDetails"); 
  
  return care_team_path;
} 
//------------------------------------------------------------------------
function patient_management_deactivate_form()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper"); 
  var deactivate_form = panelPR.Panel("PatientStatus").Fieldset("DeactivatePatient").Form("DeactivatePatientForm");
  
  return deactivate_form;
} 
//------------------------------------------------------------------------
function pat_managment_tab_status_buttons()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper"); 
  var status_buttons = panelPR.Panel("PatientStatus").Panel(1);
  
  return status_buttons;
}   
//------------------------------------------------------------------------
function registered_practice_field()
{
  var care_team_path = patient_management_care_team();
  var registered_practice = care_team_path.Panel(0).Label("TestingSectionId_DetachedLabel").innerText;
  
  return registered_practice;
}
//------------------------------------------------------------------------
function pat_managment_tab_preferences_buttons()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper"); 
  
  if(language=="English")
  {
   var preferences_buttons = panelPR.Panel("PatientManagementDetailsWrapper").Panel("PatientPreferences").Panel(0);
  }
  else
  {
    var preferences_buttons = panelPR.Panel(1);
  }
    
  return preferences_buttons;
}   
//------------------------------------------------------------------------
function pat_managment_tab_preferences_buttons_italy()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var preferences_buttons = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper")
  .Panel(1); 
  
  return preferences_buttons;
}  
//------------------------------------------------------------------------
function pop_up_warning_message()
{
   var INRstarV5 = INRstar_base();
   var panelMCP = INRstarV5.Panel(3).Panel("modalDialogBox").Panel(0);
   var error_text_path = panelMCP.TextNode(0);

   return error_text_path;
} 
//------------------------------------------------------------------------
function pop_up_error_message()
{
   var INRstarV5 = INRstar_base();
   var panelMCP = INRstarV5.Panel(3).Panel("modalDialogBox").Panel("Errors");
   var error_text_path = panelMCP.TextNode(0);

   return error_text_path;
} 
//------------------------------------------------------------------------
function deactivate_warning_message()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper"); 
  var banner_warning = panelPR.Panel("PatientStatus").Fieldset("DeactivatePatient").Panel("DeactivateMessages");

  return banner_warning;
} 
//------------------------------------------------------------------------
function deactivate_error_message()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper"); 
  var banner_warning = panelPR.Panel("PatientStatus").Fieldset("DeactivatePatient").Panel("InactivatePatientValidation");

  return banner_warning;
} 
//------------------------------------------------------------------------
function pat_management_status_confirmation_message()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper"); 
  var banner_text = panelPR.Panel("PatientStatus").Panel(0);

  return banner_text;
} 
//------------------------------------------------------------------------
function activate_confirmation_message()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent"); 
  var activate_confirmation = panelPTC.Panel("Messages");

  return activate_confirmation;
} 
//------------------------------------------------------------------------
function activate_error_banner()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent"); 
  var activate_error = panelPTC.Panel("Errors");

  return activate_error;
} 
//------------------------------------------------------------------------
function ok_error_pop_up_buttons()
{
  var INRstarV5 = INRstar_base(); 
  var pop_up_buttons = INRstarV5.Panel(3).Panel(1).Panel(0);
  
  return pop_up_buttons;
}
//------------------------------------------------------------------------
function suspend_pat_form()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper");
  var suspend_form = panelPR.Panel("PatientStatus").Form("SuspendPatientForm");
  
  return suspend_form;
} 
//------------------------------------------------------------------------
function suspend_pat_form_buttons()
{
  var suspend_form_path = suspend_pat_form();
  var suspend_buttons = suspend_form_path.Panel(3);
  
  return suspend_buttons;
} 
//------------------------------------------------------------------------
function suspend_error_message()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper"); 
  var banner_warning = panelPR.Panel("PatientStatus").Panel("SuspendPatient");

  return banner_warning;
} 
//------------------------------------------------------------------------
function pat_management_reg_practice()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPMDW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper");
  var reg_prac_form = panelPMDW.Panel("WizardRegisteredLocationStep2Container").Form("SearchRegisteredLocationForm").Panel(0);

  return reg_prac_form;
} 
//------------------------------------------------------------------------
function pat_management_test_practice_search()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelCTSC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper").Panel("ChangeTestingSectionContainer")
  var test_prac_search = panelCTSC.Form("SearchRegisteredLocationForm").Panel("SearchTestingLocations").Panel("SearchContainerInnerContainer");

  return test_prac_search;
} 
//------------------------------------------------------------------------
function pat_management_change_loc()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPMDW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper");
  var change_loc_form = panelPMDW.Panel("WizardRegisteredLocationStep2Container").Form("ChangeLocationForm").Panel(0);

  return change_loc_form;
} 
//------------------------------------------------------------------------
function pat_management_change_test_loc()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPMDW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper");
  var change_loc_form = panelPMDW.Panel("ChangeTestingSectionContainer").Form("ChangeLocationForm");

  return change_loc_form;
} 
//------------------------------------------------------------------------
function reg_practice_table()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPMDW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper");
  var search_table = panelPMDW.Panel("WizardRegisteredLocationStep2Container").Panel("LocationSearchResults").Table("LocationResults");
  
  return search_table;
} 
//------------------------------------------------------------------------
function test_practice_table()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPMDW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper");
  var search_table = panelPMDW.Panel("ChangeTestingSectionContainer").Panel("LocationSearchResults").Table("LocationResults");
  
  return search_table;
} 
//------------------------------------------------------------------------
function reg_practice_final_buttons()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPMDW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper");
  var final_buttons = panelPMDW.Panel("WizardRegisteredLocationStep3Container").Form("WizardRegisteredLocationChangeStep3Form").Panel(0);
  
  return final_buttons;
} 
//------------------------------------------------------------------------
function reg_practice_confirmation()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPMDW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper").Panel("PatientManagementDetailsWrapper");
  var banner = panelPMDW.Panel("WizardRegisteredLocationStep3Container").Panel(0).TextNode(0);
  
  return banner;
} 
//------------------------------------------------------------------------
function warning_pop_up()
{
  var INRstarV5 = INRstar_base(); 
  var pop_up_buttons = INRstarV5.Panel(3).Panel(1).Panel(0);
  
  return pop_up_buttons;
}
//------------------------------------------------------------------------

//------------------------------------------------------------------------
////////////////////////////  Options Tab  ////////////////////////
//------------------------------------------------------------------------
function home_page_options_tab()
{
  var INRstarV5 = INRstar_base();
  var panelM = INRstarV5.Panel("MainPage");
  var panelOL = panelM.Panel("header").Link("OptionsLink")
  
  return panelOL;
}
//------------------------------------------------------------------------
function dosing_settings_tab()
{
  var INRstarV5 = INRstar_base();
  var panelCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelLink = panelCP.Panel(0).Link("SectionSettingsTab")
  
  return panelLink;
}
//------------------------------------------------------------------------
function location_dosing_settings() 
{
  var INRstarV5 = INRstar_base();
  var panelCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelLS = panelCP.Panel("AdminContent").Panel("LocationSettings").Panel(0);
  
  return panelLS;
}

//------------------------------------------------------------------------
//------------------------------------------------------------------------
////////////////////////////////  Clinics Tab  ///////////////////////////
//------------------------------------------------------------------------
function add_clinic_form()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelSFBIC = panelMCP.Panel("ManageClinicsTabContent").Table("scheduler").Cell(4, 0).Panel("scheduler_formBlock_innerContent");
  var tableSFB = panelSFBIC.Panel("scheduler_formBlock_AptFrmContainer_PW_1").Table("scheduler_formBlock_AptFrmContainer_PWST_1");
  var tableSFB2 = tableSFB.Cell(0, 0).Table("scheduler_formBlock_AptFrmContainer_CLW_1");
  var tableF = tableSFB2.Cell(1, 0).Panel("scheduler_formBlock_AptFrmContainer_CSD_1").Form(0);
  
  return tableF;
}
//------------------------------------------------------------------------
function date_picker_dropdown()
{
  var INRstarV5 = INRstar_base();
  var panelMCTC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("ManageClinicsTabContent");
  var panelSFI = panelMCTC.Table("scheduler").Cell(4, 0).Panel("scheduler_formBlock_innerContent");
  var tableSFA = panelSFI.Panel("scheduler_formBlock_AptFrmContainer_PW_1").Table("scheduler_formBlock_AptFrmContainer_PWST_1");
  var tableSFAC = tableSFA.Cell(0, 0).Table("scheduler_formBlock_AptFrmContainer_CLW_1").Cell(1, 0).Panel("scheduler_formBlock_AptFrmContainer_CSD_1");
  var tableSPW = tableSFAC.Form(0).Table(0).Cell(1, 1).Table("StartDate_ET").Cell(0, 0).Panel("StartDate_DDD_PW_1").Table("StartDate_DDD_PWST_1");
  var tableDDDC = tableSPW.Cell(0, 0).Table("StartDate_DDD_CLW_1").Cell(0, 0).Panel("StartDate_DDD_CSD_1").Table("StartDate_DDD_C").Cell(0, 0).Table(0);
  
  return tableDDDC;
}
//------------------------------------------------------------------------
function add_clinic_form_buttons()
{
  var add_form = add_clinic_form();
  var buttons = add_form.Table(1).Cell(0, 0).Table(0);
  
  return buttons;
}
//------------------------------------------------------------------------
function select_clinic_time_slot()
{
  var add_form = add_clinic_form();
  var panelSLP = add_form.Table(0).Cell(4, 1).Table("SlotLength_ET").Cell(0, 0).Panel("SlotLength_DDD_PW_1");
  var panelSLC = panelSLP.Table("SlotLength_DDD_PWST_1").Cell(0, 0).Table("SlotLength_DDD_CLW_1").Cell(0, 0).Panel("SlotLength_DDD_CSD_1");
  var panelTSL = panelSLC.Table("SlotLength_DDD_L").Cell(0, 0).Panel("SlotLength_DDD_L_D").Table("SlotLength_DDD_L_LBT");
  
  return panelTSL;
}
//------------------------------------------------------------------------
function clinic_end_by_panel()
{
  var form = add_clinic_form();
  var panelAR = form.Panel("appointmentRecurrenceForm_mainDiv").Table(0).Cell(1, 0).Panel("appointmentRecurrenceForm_AptRecCtl_mainDiv");
  var end_by_panel = panelAR.Table(1).Cell(0, 0).Panel("appointmentRecurrenceForm_AptRecCtl_RangeCtl_mainDiv").Table(0);
  
  return end_by_panel;
}
//------------------------------------------------------------------------
function clinic_end_by_date_dropdown()
{
  var panel = clinic_end_by_panel();
  var panelARF = panel.Cell(2, 1).Table(0).Cell(0, 0).Panel("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEnd_DDD_PW_1");
  var panelARF1 = panelARF.Table("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEnd_DDD_PWST_1").Cell(0, 0).Table("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEnd_DDD_CLW_1");
  var panelCSD = panelARF1.Cell(0, 0).Panel("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEnd_DDD_CSD_1");
  var panelDDD = panelCSD.Table("appointmentRecurrenceForm_AptRecCtl_RangeCtl_DeEnd_DDD_C").Cell(0, 0).Table(0);
  
  return panelDDD;
}
//------------------------------------------------------------------------
function clinic_schedule_container()
{
  var INRstarV5 = INRstar_base();
  var panel = INRstarV5.Panel(3).Panel("modalDialogBox").Panel(0).Table("scheduler").Cell(4, 0);
  var tableSCC = panel.Panel("scheduler_containerBlock_innerContent").Table("scheduler_containerBlock_content").Cell(0, 0);
  var tableSCH = tableSCC.Panel("scheduler_containerBlock_horizontalContainer").Table("scheduler_containerBlock_horzContainerTable");
  
  return tableSCH;
}
//------------------------------------------------------------------------
function clinic_patients_appointments_container()
{
  var INRstarV5 = INRstar_base();
  var panel = INRstarV5.Panel(3).Panel("modalDialogBox").Panel(0).Table("scheduler").Cell(4, 0);
  var tableSCC = panel.Panel("scheduler_containerBlock_innerContent").Table("scheduler_containerBlock_content").Cell(1, 0);
  var schedule = tableSCC.Panel("scheduler_containerBlock_verticalScrollContainer").Panel("scheduler_containerBlock_verticalContainer").Panel("appointmentLayer");
  
  return schedule;
}
//------------------------------------------------------------------------
function clinic_appointments_container()
{
  var INRstarV5 = INRstar_base();
  var panel = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("ManageClinicsTabContent").Table("scheduler");
  var tableSCC = panel.Cell(4, 0).Panel("scheduler_containerBlock_innerContent").Table("scheduler_containerBlock_content").Cell(1, 0);
  var schedule = tableSCC.Panel("scheduler_containerBlock_verticalScrollContainer").Panel("scheduler_containerBlock_verticalContainer").Panel("appointmentLayer");
  
  return schedule;
}
//------------------------------------------------------------------------
function clinic_appointments_internal_container()
{
  var INRstarV5 = INRstar_base();
  var panel = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("ManageClinicsTabContent").Panel(0)
  var table = panel.Table("appointmentsScheduler").Cell(4, 0).Panel("appointmentsScheduler_containerBlock_innerContent");
  var table_1 = table.Table("appointmentsScheduler_containerBlock_content").Cell(1, 0);
  var panel_1 = table_1.Panel("appointmentsScheduler_containerBlock_verticalScrollContainer")
  var schedule = panel_1.Panel("appointmentsScheduler_containerBlock_verticalContainer").Panel("appointmentLayer");
  
  return schedule;
}
//------------------------------------------------------------------------
function clinic_make_appointment_container()
{
  var INRstarV5 = INRstar_base();
  var panel = INRstarV5.Panel(3).Panel("modalDialogBox").Panel(1).Table("appointmentsScheduler").Cell(4, 0);
  var tableACC = panel.Panel("appointmentsScheduler_containerBlock_innerContent").Table("appointmentsScheduler_containerBlock_content");
  var panelACV = tableACC.Cell(1, 0).Panel("appointmentsScheduler_containerBlock_verticalScrollContainer");
  var tableACV = panelACV.Panel("appointmentsScheduler_containerBlock_verticalContainer");
  
  return tableACV;
}
//------------------------------------------------------------------------
function clinic_move_calendar_forward()
{
  var INRstarV5 = INRstar_base();
  var panel = INRstarV5.Panel(3).Panel("modalDialogBox").Panel(0).Table("scheduler").Cell(0, 0).Table(0).Cell(0, 0);
  var table = panel.Panel("scheduler_viewNavigatorBlock_innerContent").Table(0).Cell(0, 0).Table("IC");
  var button = table.Cell(0, 0).Table(0).Cell(0, 4).Table(0).Cell(0, 0);
  
  return button;
}
//------------------------------------------------------------------------
function clinic_move_calendar_backwards()
{
  var INRstarV5 = INRstar_base();
  var panel = INRstarV5.Panel(3).Panel("modalDialogBox").Panel(0).Table("scheduler").Cell(0, 0).Table(0).Cell(0, 0);
  var table = panel.Panel("scheduler_viewNavigatorBlock_innerContent").Table(0).Cell(0, 0).Table("IC")
  var button = table.Cell(0, 0).Table(0).Cell(0, 0).Table(0).Cell(0, 0);
  
  return button;
}
//------------------------------------------------------------------------
//------------------------------------------------------------------------
////////////////////////  External Results / HL7  ////////////////////////
//------------------------------------------------------------------------
//------------------------------------------------------------------------
function external_results_base_form_path()
{
  var INRstarV5 = INRstar_base();
  var patient_content = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientContent");
  var form = patient_content.Panel("ExternalResultsContent").Panel("WarfarinResultsContainer");
  
  return form;
} 
//------------------------------------------------------------------------
function patient_results_tab()
{
  var INRstarV5 = INRstar_base();
  var main_content = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var tab = main_content.Panel("ManagePatients").Panel("PatientTab").Link("TestResultsTabLink");
  
  return tab;
}
//------------------------------------------------------------------------
function patient_external_results_table()
{
  var base_path = external_results_base_form_path();
  var table = base_path.Panel("WarfarinResultsSearchResultsContainer").Table("WarfarinResultsTable");
  
  return table;
}
//------------------------------------------------------------------------
function patient_external_results_archived_table()
{
  var base_path = external_results_base_form_path();
  var table = base_path.Panel("WarfarinResultsContainer").Panel("WarfarinResultsSearchResultsContainer").Table("WarfarinResultsTable")
  
  return table;
}
//------------------------------------------------------------------------
function patient_INR_treatment_questions()
{
  var main_content = pending_treatment_buttons();
  var treatment_questions = pending_treatment_buttons().Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm").Panel("PatientTreatmentNewINRQuestionsWrapper").Panel("PatientTreatmentNewINRConfirm");
  
  return treatment_questions;
}
//------------------------------------------------------------------------
function show_archived_results_checkbox()
{
  var path = external_results_base_form_path();
  var checkbox = path.Panel("WarfarinResultsFilterContainer").Form("FilterForm").Panel(1).Panel(0).Checkbox("ShowRejectedResults")
  
  return checkbox;
} 
//------------------------------------------------------------------------
function external_results_filter_button()
{
  var path = external_results_base_form_path();
  var button = path.Panel("WarfarinResultsFilterContainer").Form("FilterForm").Panel(0).SubmitButton("Filter")
  
  return button;
} 
//------------------------------------------------------------------------
//------------------------------------------------------------------------
/////////////////////////////  Loading Popup  ////////////////////////////
//------------------------------------------------------------------------
//------------------------------------------------------------------------
function loading_popup_path()
{
  var INRstarV5 = INRstar_base();
  var obj = INRstarV5.Panel(1).Panel("loading");
}
//------------------------------------------------------------------------
function dose_dropdown_path_on_new_inr()
{
  var inr_test_info_path = treatment_inr_test_info_path();
  var dropdown = inr_test_info_path.Panel(0).Select("Dose")
  
  return dropdown;
} 
//------------------------------------------------------------------------
function review_dropdown_path_on_new_inr()
{
  var inr_test_info_path = treatment_inr_test_info_path();
  var dropdown = inr_test_info_path.Panel(2).Select("Review")
  
  return dropdown;
} 
//------------------------------------------------------------------------












