//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function add_a_new_note()
{
  Goto_Patient_Notes();
  var notes_tab_path = notes_tab();
  var obj = notes_tab_path.Panel(0).Button("AddNoteLink");
  click_navigation_wrapper(obj, path_main_patient_tab(), "idStr", "PatientNotesForm", 3);
  
  var notes_form_path = notes_form();

  // Enter Notes
  notes_form_path.Textarea("Note").innerText = "Test note";
  notes_form_path.Panel(0).SubmitButton("AddNote").Click(); 
} 
//--------------------------------------------------------------------------------








//for testing blank note
//      var INRstarV5 = set_system();
//      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//      var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("NotesContent");
//      var panelPNW = panelPTC.Panel("PatientNotesWrapper");
//      var form = panelPNW.Form("NotesForm");
//      
//      // Test blank Note
//      formPNF.Panel(0).SubmitButton("AddNote").Click();
//      // Check the Error panel for the text
//      var w_err_text = panelPNW.Panel("PatientNoteValidation").innerText;
//      var w_err_mess = "Please enter a note for this patient";
//      test_message(INRstarV5, w_err_text, w_err_mess, 0, 0);
//
//      // Enter Notes
//      formPNF.Textarea("Note").innerText = "Test note";
//      formPNF.Panel(0).SubmitButton("AddNote").Click();