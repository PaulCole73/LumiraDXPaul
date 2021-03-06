//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//====================================================================================
//
// Letter sub-functions
//
//====================================================================================
//-----------------------------------------------------------------------------
function fetch_letter(p_lettername)
{
        var INRstarV5 = set_system();  
        Goto_Options_Letter_Management();
          
        var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
        var panelLMP =panelMCP.Panel("AdminContent").Form("LetterManagementForm").Panel("LetterManagementPanel");
        var panelLTP = panelLMP.Panel("LetterTemplatePanel");
        var panelLTLV = panelLTP.Panel("LetterTemplateListViewPanel").Panel("LetterTemplateListView");
        
        var w_letters = panelLTLV.contentText;
        
        var w_letter = INRstarV5.NativeWebObject.Find("innerText", p_lettername);
        if (w_letter.Exists)
           {  
                    Log.Checkpoint("Letter "+p_lettername + " exists");
                    w_letter.Click();
                    
                    WaitSeconds(1,"Waiting for letter");
                    
                    panelLTP.Panel("LetterTemplateButtons").Button("EditButton").Click();
           }
           else
           {
                    Log.Warning("Letter"+p_lettername + " does not exist");
           }

}
//----------------------------------------------------------------------------
function test_letter(INRstarV5, p_outfile, p_lettername, p_user)
{
      var w_mess;
          
      // Fetch patient
       Goto_Patient_Search();
      preset_Fetch_Patient(INRstarV5, "AIPHZA, DANIEL");
      
        // Test existance of letter
      Goto_Patient_Letters();

      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPMTC = panelMCP.panel("PatientRecord").panel("PatientMainTabContent");
      var panelPLOW =panelPMTC.Panel("PatientLettersWrapper").Panel("PatientLetterOptionsWrapper");
      var panelPLO = panelPLOW.Panel("PatientLetterOptions").Form("PatientsLetterOptionsForm").Panel("PatientsLetterOptions");
      var w_letterlist = panelPLO.Panel("PatientLetterList").contentText;
      
      // Search in w_letterlist for matching text.... !!!!
      if (aqString.Contains(w_letterlist, p_lettername) < 0) 
          w_mess = p_lettername + " does not exist for this user: '" + p_user;
      else
          w_mess = p_lettername + "  exists for this user: '" + p_user;

       aqFile.WriteToTextFile(p_outfile, w_mess + "\r\n", aqFile.ctANSI);
}
//----------------------------------------------------------------------------
function add_permission(p_outfile, p_lettername, p_role, p_rctr)
{
        // Set permission for User
        fetch_letter(p_lettername);

        var INRstarV5 = set_system();  
        var w_mess;
        
        // find matching role checkbox to p_role
        var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
        var panelLMP =panelMCP.Panel("AdminContent").Form("LetterManagementForm").Panel("LetterManagementPanel");
        var panelLPP = panelLMP.Panel("LetterSettingsPanel").Panel("LetterPermissionsPanel");
        var w_cbx_panel = panelLPP.Panel(p_rctr+1);
        var w_cbx = w_cbx_panel.FindChild("ObjectType", "Checkbox");
        if (w_cbx.Exists)
           {  
                    w_mess = "Found Role Checkbox for "+p_role;
                    w_cbx.ClickChecked(true);
           }
           else
           {
                    w_mess = "Not Found Role Checkbox for "+p_role;
          }
        // Save the letter
        panelLMP.Panel("LetterEditorPanel").Panel("LetterEditorButtons").Button("SaveButton").Click();
        
        aqFile.WriteToTextFile(p_outfile, w_mess + "\r\n", aqFile.ctANSI);
}
//----------------------------------------------------------------------------
function remove_permission(p_outfile, p_lettername, p_role, p_rctr)
{
        // Set permission for User
        fetch_letter(p_lettername);

        var INRstarV5 = set_system();  
        var w_mess;
        
        // find matching role checkbox to p_role
        var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
        var panelLMP =panelMCP.Panel("AdminContent").Form("LetterManagementForm").Panel("LetterManagementPanel");
        var panelLPP = panelLMP.Panel("LetterSettingsPanel").Panel("LetterPermissionsPanel");
        var w_cbx_panel = panelLPP.Panel(p_rctr+1);
        var w_cbx = w_cbx_panel.FindChild("ObjectType", "Checkbox");
        if (w_cbx.Exists)
           {  
                    w_mess = "Found Role Checkbox for "+p_role;
                    w_cbx.ClickChecked(false);
           }
           else
           {
                    w_mess = "Not Found Role Checkbox for "+p_role;
          }
        // Save the letter
        panelLMP.Panel("LetterEditorPanel").Panel("LetterEditorButtons").Button("SaveButton").Click();
        
        // Test if no permissions has caused Draft Letter pop up to appear
        var w_btn = INRstarV5.NativeWebObject.Find("innerText", "Save As Draft");
        if (w_btn.Exists)
        {
                    // Save draft letter with no permissions
                  INRstarV5.Panel(2).Panel(1).Panel(0).Button(1).Click();
         } 
        
        aqFile.WriteToTextFile(p_outfile, w_mess + "\r\n", aqFile.ctANSI);
}
//----------------------------------------------------------------------------
function create_letter(p_name, p_role, p_text)
{
        var INRstarV5 = set_system();  
        Goto_Options_Letter_Management();
          
        var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
        var panelLMP =panelMCP.Panel("AdminContent").Form("LetterManagementForm").Panel("LetterManagementPanel");
        var panelLTP = panelLMP.Panel("LetterTemplatePanel");
        panelLTP.Panel("LetterTemplateButtons").Button("NewButton").Click();
        
        var w_lettername = p_name+"_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
        INRstarV5.Panel(2).Panel("modalDialogBox").Panel(0).Textbox("newName").Text = w_lettername;
        
        // Create the new letter
        INRstarV5.Panel(2).Panel(1).Panel(0).Button(1).Click();
        // Set a description
        panelLMP.Panel("LetterEditorPanel").Panel("LetterTemplatePropertiesPanel").Panel(1).Textarea("Description").value = w_lettername;
         // Set some letter text
         if (p_text == "")
                  panelLMP.Panel("LetterEditorPanel").Panel("ContentTextEditor").Panel(1).Panel(0).innerText = w_lettername;
        else
                  panelLMP.Panel("LetterEditorPanel").Panel("ContentTextEditor").Panel(1).Panel(0).innerText = p_text;
        
        WaitSeconds(1,"Waiting for letter text to be added");
        
        if(p_role != "")
        {
                  var panelLPP = panelLMP.Panel("LetterSettingsPanel").Panel("LetterPermissionsPanel");
                  var w_cbx_panel = panelLPP.Panel(p_role);
                  var w_cbx = w_cbx_panel.FindChild("ObjectType", "Checkbox");
                  if (w_cbx.Exists)
                             w_cbx.ClickChecked(true);
                     else
                              Log.Message("Not Found Role Checkbox for "+p_role);
          }
          
        // Save the letter with permissions
        panelLMP.Panel("LetterEditorPanel").Panel("LetterEditorButtons").Button("SaveButton").Click();
        
        if(p_role == "")
        {
                    // Save draft letter with no permissions
                  INRstarV5.Panel(2).Panel(1).Panel(0).Button(1).Click();
         } 
         
         return w_lettername;

}
