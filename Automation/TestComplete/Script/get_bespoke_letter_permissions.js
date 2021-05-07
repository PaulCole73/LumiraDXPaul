//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_bespoke_letter_permissions(letter_name)
{
  Goto_Options_Letter_Management();
  Goto_Bespoke_Letter(letter_name);
  
  var content = new Array();
  for(var i = 1; i <= 7; i++)
  {
    var temp = letter_management_permissions_field().panel(i).Child(0).checked;
    content.push(temp);
  }
  
  return content;
}