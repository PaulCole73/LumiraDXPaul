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
function edit_diagnosis(diagnosis_name, new_name)
{
  Goto_Options_Diagnosis();
  var list = options_diagnosis_list();
  
  list.ClickItem(diagnosis_name);
  diagnosis_details().Panel(3).Button("Edit").Click(); 
  edit_diagnosis_details().Panel(0).Textbox("Name").innerText = new_name;
  
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
  
  //Save the data into an array before clicking save
  var name = edit_diagnosis_details().Panel(0).Textbox("Name").wText;
  var target = edit_diagnosis_details().Panel(1).Select("TargetINR").wText;
  var treatment_duration = edit_diagnosis_details().Panel(2).Select("TreatmentDuration").wText;
  var data = new Array();
  
  data.push(name,target,treatment_duration);
  Log.Message(data + " This is the data being passed back before saving on edit");
  
  edit_diagnosis_details().Panel(3).SubmitButton("UpdateDiagnosis").Click();
  
  return data;
}
//-----------------------------------------------------------------------------------
function delete_diagnosis(diagnosis_name)
{
  Goto_Options_Diagnosis();
  options_diagnosis_list().ClickItem(diagnosis_name);
  diagnosis_details().Panel(3).Button("DeleteDiagnosis").Click();
  process_popup(get_string_translation("Confirmation Required"),get_string_translation("Confirm"));
}
//-----------------------------------------------------------------------------------
function check_diagnosis_in_list(diagnosis_name)
{
  Goto_Options_Diagnosis();
  var list = options_diagnosis_list();
  var count = list.wItemCount;           
  
   for(var i = 0; i < count; i++)
  {
    if(list.wItem(i) == diagnosis_name) 
    {
      Log.Message("This was the one it found  = " + list.wItem(i) + " // This is what is was looking for = " + diagnosis_name)
      return true;
    }
  }
    Log.Message("The diagnosis was not found on the list")
    return false;
}
//-----------------------------------------------------------------------------------