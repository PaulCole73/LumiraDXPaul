//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_top_note_text()
{
  Goto_Patient_Notes();
  var note_text_path = notes_tab().Table("PatientNotesTable").Cell(1, 0);
  var text = aqString.Trim(note_text_path.innerText);
  
  return text;
}