//USEUNIT TSA_PoCT
//USEUNIT INRstar_Navigation
//USEUNIT V5_Common_Popups
//USEUNIT System_Paths
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function tsa_neqas_setup_poct_batches(number_of_batches)
{
  Goto_Options_PoCT()
    
  var INRstarV5 = INRstar_base();
  var poct_table = options_poct_table(); 
  var batch_dates = new Array();
  var batch_numbers = new Array();
  
  do
  {
    var is_poct_valid = false;  
    for(var i = 1; i <= number_of_batches; i++)
    { 
      batch_numbers = get_poct_batch_numbers();
      
      if(poct_table.RowCount > 1)
      {
        for(var j = 1; j <= number_of_batches; j++)
        {
          batch_dates[i-1] = aqConvert.StrToDate(poct_table.Cell(j, 1).contentText);
          if(aqDateTime.Compare(batch_dates[i-1], aqDateTime.Today()) == -1)
          {
            var batches_to_add = number_of_batches - (j-1);
            tsa_poct_create_poct_batch(batch_numbers, batches_to_add);
            break;
          }
          else
          {
            is_poct_valid = true;
          }    
        }
      }
      else
      {
        tsa_poct_create_poct_batch(batch_numbers, number_of_batches);
        break;
      }
    }
    tsa_neqas_set_poct_active_batches(number_of_batches);
  }while (is_poct_valid == false);
}
//--------------------------------------------------------------------------------
function tsa_neqas_set_poct_active_batches(no_batches_to_set)
{
  var edit_button = options_poct_buttons().Panel(0).Button("EditPoCTBatch").Click();
    
  var edit_table = options_edit_poct_table()
  
  for(var i = 1; i < edit_table.RowCount; i++)
  {
    edit_table.Cell(i, 2).Checkbox("activeBatches").checked = false;
  }
  for(var i = 1; i <= no_batches_to_set; i++)
  {
    edit_table.Cell(i, 2).Checkbox("activeBatches").checked = true; 
  }
  
  var save_button = options_poct_edit_buttons().SubmitButton("UpdatePoCTBatch").Click();
}
//--------------------------------------------------------------------------------
function tsa_neqas_add_eqc_result(poct_batch, int_inr, ext_inr)
{
  Goto_Options_EQC();
    
  options_eqc_form_buttons().Panel(0).Button("AddEQA").Click();

  var eqc_reference_textbox = options_eqc_edit_form_buttons().Panel(3).Textbox("Reference");
  
  var ref_text = aqConvert.DateTimeToStr(aqDateTime.Today()) + "_" + aqConvert.IntToStr(Math.floor(Math.random()*1000));
  
  eqc_reference_textbox.Text = ref_text;
  
  options_eqc_edit_form_buttons().Panel(4).Select("NPTBatchNumber").ClickItem(poct_batch);
  
  options_eqc_edit_form_buttons().Panel(5).Select("InternalINR").ClickItem(int_inr);

  options_eqc_edit_form_buttons().Panel(6).Select("ExternalINR").ClickItem(ext_inr);
    
  options_eqc_edit_form_buttons().Panel(7).SubmitButton("AddEQCResult").Click();
  
  return (ref_text);
}
//--------------------------------------------------------------------------------
function tsa_neqas_edit_eqc_result(row_num, poct_batch, int_inr, ext_inr)
{
  Goto_Options_EQC();
    
  options_eqc_form_buttons().Table("LocationsEQCTable").Cell(row_num, 7).Button("EditEQC").Click();
  
  options_eqc_edit_form_buttons().Panel(4).Select("NPTBatchNumber").ClickItem(poct_batch);
  
  options_eqc_edit_form_buttons().Panel(5).Select("InternalINR").ClickItem(int_inr);

  options_eqc_edit_form_buttons().Panel(6).Select("ExternalINR").ClickItem(ext_inr);
    
  options_eqc_edit_form_buttons().Panel(7).SubmitButton("UpdateEQCResult").Click();
}
//--------------------------------------------------------------------------------
function tsa_neqas_delete_entries()
{
  Goto_Options_EQC();
  var table_data = options_eqc_form_buttons().Table("LocationsEQCTable");
  var row_count = table_data.RowCount;
  
  do
  {
    if(table_data.Cell(1,0).contentText != "There are no EQCs recorded")
    {
      var button = options_eqc_form_buttons().Table("LocationsEQCTable").Cell(row_count - 1, 7).Button("DeleteIQC").Click();
      process_popup("Confirmation Required", "Confirm");
      
      row_count -= 1;
    }
    else
    {
      break;
    }
  }
  while(row_count > 1);
  WaitSeconds(1, "Waiting for delete...");
}