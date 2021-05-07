//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------

function get_dosing_settings_data(item_no)
{
  Goto_Options();
  dosing_settings_tab().Click();
  location_dosing_settings().Link(item_no).Click();
  
  var panel = location_dosing_settings().Panel(item_no);
  var dosing_data = new Array();
  var string_array = new Array();
  
  for(var i = 1; i < panel.ChildCount; i++)
  {
    var temp = panel.Child(i).innerText;
    string_array = temp.split("[" + get_string_translation("set at") + "] "); 
    dosing_data.push(aqString.Trim(string_array[1], 3));
    Log.Message("string_array="+string_array);
    Log.Message("dosing_data.push="+aqString.Trim(string_array[1], 3));
  }
  
  return dosing_data;
}