//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//-----------------------------------------------------------------------------------
function add_diagnosis()
{
  Goto_Options_Diagnosis();
  options_diagnosis_add_button().Click();
  
  var name = "Regression - " + get_unique_number();
  diagnosis_form().Panel(0).Textbox("Name").innerText = name;
  
  var num =  get_random_num_inrange(1, 28);
  diagnosis_form().Panel(1).Select("TargetINR").ClickItem(num);
  
  num = get_random_num_inrange(1, 9);
  diagnosis_form().Panel(2).Select("TreatmentDuration").ClickItem(num);
  
  diagnosis_form().Panel(3).SubmitButton("SubmitAddDiagnosis").Click();
  
  return name;
}
//-----------------------------------------------------------------------------------
function edit_diagnosis(diagnosis_name)
{
  Goto_Options_Diagnosis();
  var list = options_diagnosis_list();
  var name = "Edited - " + get_unique_number();
  
  list.ClickItem(diagnosis_name);
  diagnosis_details().Panel(3).Button("Edit").Click();
  
  edit_diagnosis_details().Panel(0).Textbox("Name").innerText = name;
  
  var drop_down_num = edit_diagnosis_details().Panel(1).Select("TargetINR").wSelectedItem;
  if(drop_down_num != 1)
  {
    drop_down_num  -= 1;
  }
  else
  {
    drop_down_num += 1;
  }
  edit_diagnosis_details().Panel(1).Select("TargetINR").ClickItem(drop_down_num);
  
  drop_down_num = edit_diagnosis_details().Panel(2).Select("TreatmentDuration").wSelectedItem;
  if(drop_down_num != 1)
  {
    drop_down_num  -= 1;
  }
  else
  {
    drop_down_num += 1;
  }
  edit_diagnosis_details().Panel(2).Select("TreatmentDuration").ClickItem(drop_down_num);
  
  edit_diagnosis_details().Panel(3).SubmitButton("UpdateDiagnosis").Click();
  
  return name;
}
//-----------------------------------------------------------------------------------
function delete_diagnosis(diagnosis_name)
{
  Goto_Options_Diagnosis();
  options_diagnosis_list().ClickItem(diagnosis_name);
  
  diagnosis_details().Panel(3).Button("DeleteDiagnosis").Click();
  
  process_popup("Confirmation Required", "Confirm");
}
//-----------------------------------------------------------------------------------
function validate_diagnosis(diagnosis_name)
{
  Goto_Options_Diagnosis();
  var list = options_diagnosis_list();
  var is_diagnosis_valid = false;
  var list_content = list.wItemList;
  
  for(var i = 0; i < list.wItemCount; i++)
  {
    if(aqString.GetListItem(list_content, i) == diagnosis_name)
    {
      is_diagnosis_valid = true;
    }
  }
  
  if(is_diagnosis_valid == true)
  {
    return true;
  }
  else
  {
    return false;
  }
}