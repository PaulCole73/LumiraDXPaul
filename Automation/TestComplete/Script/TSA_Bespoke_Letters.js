//USEUNIT Navigation
//USEUNIT Misc_Functions
//-----------------------------------------------------------------------------------
function add_a_bespoke_letter(description, body, permissions_array)
{
  Goto_Options_Letter_Management();
  
  letter_management_template_buttons().Button("NewButton").Click();
  var name = process_bespoke_letters_popup("New Letter", "Create");
  
  letter_management_description_field().innerText = description;
  letter_management_content_field().innerText = body;
  
  for(var i = 0; i < permissions_array.length; i++)
  {
    var perm = permissions_array[i];
    letter_management_permissions_field().panel(perm).Child(0).Click();
  }
  
  letter_management_editor_buttons().Button("SaveButton").Click();
  return name;
}
//-----------------------------------------------------------------------------------
function edit_a_bespoke_letter(letter_name, description, body, permissions_array)
{
  Goto_Options_Letter_Management();
  Goto_Bespoke_Letter(letter_name);
  
  letter_management_template_buttons().Button("EditButton").Click();
  letter_management_description_field().innerText = description;
  letter_management_content_field().innerText = body;
  
  for(var i = 1; i <= 7; i++)
  {
    letter_management_permissions_field().panel(i).Child(0).Click();
  }  
  for(var i = 0; i < permissions_array.length; i++)
  {
    var perm = permissions_array[i];
    letter_management_permissions_field().panel(perm).Child(0).Click();
  }
  
  letter_management_editor_buttons().Button("SaveButton").Click();
}
//-----------------------------------------------------------------------------------
function copy_a_bespoke_letter(letter_name)
{
  Goto_Options_Letter_Management();
  Goto_Bespoke_Letter(letter_name);
  
  letter_management_template_buttons().Button("CopyButton").Click();
  var name = process_bespoke_letters_popup("Copy Letter", "Create");
  letter_management_editor_buttons().Button("SaveButton").Click();
  
  return name;
}
//-----------------------------------------------------------------------------------
function rename_a_bespoke_letter(letter_name)
{
  Goto_Options_Letter_Management();
  Goto_Bespoke_Letter(letter_name);
  
  var unique = get_unique_number();
  var name = "Regression: " + unique;
  
  letter_management_template_buttons().Button("RenameButton").Click();
  letter_editor_panel().Panel("LetterTemplatePropertiesPanel").Panel(0).Textbox("Name").value = name;
  letter_management_editor_buttons().Button("SaveButton").Click();
  
  return name;
}
//-----------------------------------------------------------------------------------
function validate_bespoke_permissions(permissions_array, letter_name)
{
  var perms = new Array();
  var compare_array = new Array();
  perms = get_bespoke_letter_permissions(letter_name);
  
  for(var i = 1; i <= perms.length; i++)
  {
    if(perms[i-1] == true)
    {
      compare_array.push(i);
    }
  }
  
  var results = checkArrays(permissions_array, compare_array, letter_name);
  return results;
}
//-----------------------------------------------------------------------------------
function rename_bespoke_letter_editable_fields(letter_name)
{
  Goto_Options_Letter_Management();
  Goto_Bespoke_Letter(letter_name);
  letter_management_template_buttons().Button("RenameButton").Click();
  
  var content = new Array();  
  var is_perms_editable = false;
  
  for(var i = 1; i <= 7; i++)
  {
    var temp = letter_management_permissions_field().panel(i).Child(0).enabled;
    if(temp)
    {
      is_perms_editable = true;
      break;
    }
  }
  
  var temp = letter_editor_panel().Panel("LetterTemplatePropertiesPanel").Panel(0).Textbox("Name").isContentEditable;
  content.push(temp);
  var temp = letter_editor_panel().Panel("LetterTemplatePropertiesPanel").Panel(1).Textarea("Description").isContentEditable;
  content.push(temp);
  var temp = letter_editor_panel().Panel("ContentTextEditor").Panel(1).Panel(0).isContentEditable;
  content.push(temp);
  content.push(is_perms_editable);
  
  return content;
}