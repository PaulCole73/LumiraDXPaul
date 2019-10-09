//------------------------------------------------------------------------
function INRstar_base()
{
  var p1 = Sys.Process("INRstarWindows").WinFormsObject("BrowserForm").WinFormsObject("INRstarBrowser").WinFormsObject("Shell Embedding", "")
  INRstar = p1.Window("Shell DocObject View", "", 1).Window("Internet Explorer_Server", "", 1).Page("*");
    
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
//////////////////////////  Home Page  ///////////////////////////////////
//------------------------------------------------------------------------
function home_page_messages()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var list = panelMCP.Panel("UserTabContent").Panel("UserMessages").Panel("UserClinicalReports")
   
  return list;
} 
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
  var patient_search_results_table = panelMCP.Panel("PatientContent").Panel("SearchResults").Form("ExternalTestPatientSearchForm").Panel("PatientSearchResults").Table("PatientResults")
  
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
//////////////////////////  Treatment  ///////////////////////////////////
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
function new_pre_treatment_induction_path()
{
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").panel("PatientTreatmentWrapper")
  var panelPPTIW = panelPTW.Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");
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
function treatment_comment()
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
  var save_inr_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment");
  
  return save_inr_button_path;
}  
//------------------------------------------------------------------------
function override_button()
{
  var pending_treatment_buttons_path = pending_treatment_buttons();
  var override_button_path = pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("OverridePendingTreatment");
  
  return override_button_path;
}  
//------------------------------------------------------------------------
function sugg_war_dose_button()
{
  var pending_treatment_buttons_path = pending_treatment_buttons();
  var form = pending_treatment_buttons_path.Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm");
  var sugg_war_dose_button_path = form.Panel(0).SubmitButton("CalculateWarfarinDose");
  
  return sugg_war_dose_button_path;
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
function dosing_engine_warning_popup()
{
   var INRstarV5 = INRstar_base();
   var warning_popup = INRstarV5.Panel(4).Panel("modalDialogBoxSecondary").Panel("DosingEngineWarnings");

   return warning_popup;
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
  var ddd_enrol_button = panelEM.Table("ProgrammesTable").Cell(0, 1).Panel(1).Button("ProgramEnrolButton_Digital_dosing_diary");
    
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
////////////////////////////  Options  ///////////////////////////////////
//------------------------------------------------------------------------
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
  var poct_buttons = panelMCP.Panel("AdminContent").Panel(0).Panel(0);
  
  return poct_buttons;
} 
//------------------------------------------------------------------------
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
function pat_managment_tab_preferences_buttons()
{
  var INRstarV5 = INRstar_base(); 
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPR = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientManagementWrapper"); 
  var preferences_buttons = panelPR.Panel("PatientManagementDetailsWrapper").Panel("PatientPreferences").Panel(0);
  
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

//------------------------------------------------------------------------

//------------------------------------------------------------------------

//------------------------------------------------------------------------


