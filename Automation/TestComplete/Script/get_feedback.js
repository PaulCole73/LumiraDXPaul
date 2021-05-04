//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_System_Paths
//--------------------------------------------------------------------------------

function get_feedback(item_index)
{
  Goto_Feedback();
  var table = admin_dash_feedback_table();
  var data = new Array();
  
  if(table.Cell(1, 0).innerText != "There is no new feedback to review.")
  {
    for(var i = 0; i < 3; i++) //getting the first 3 entries from a feedback item, these can be validated against
    {
      var temp = table.Cell(item_index, i).innerText;
      data.push(temp);
    }
  }
  else
  {
    data.push("", "", "");
  }
  
  return data;
}