//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_bespoke_letter_content(letter_name)
{
  Goto_Options_Letter_Management();
  Goto_Bespoke_Letter(letter_name);
  
  var content = new Array();
  
  var temp = letter_editor_panel().Panel("LetterTemplatePropertiesPanel").Panel(0).Textbox("Name").value;
  content.push(temp);
  temp = letter_editor_panel().Panel("LetterTemplatePropertiesPanel").Panel(1).Textarea("Description").innerText;
  content.push(temp);
  temp = letter_editor_panel().Panel("ContentTextEditor").Panel(1).Panel(0).innerText;
  content.push(temp);
  
  return content;
}