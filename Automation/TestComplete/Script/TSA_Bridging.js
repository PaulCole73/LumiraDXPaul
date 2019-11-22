//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function get_new_bridging_record_button_state()
{
  var state;
  patient_clinical_tab().Link("PatientBridgingTab").Click();
  state = patient_treatment_bridging_tab().Panel(0).Button("New_Bridging_Record").enabled;
  
  return state;
}
//--------------------------------------------------------------------------------
function validate_bridging_tab_exists(drug)
{
  if(drug == null)
  {
    drug = "Warfarin";
  }
  
  Goto_Patient_Treatments_Tab();
  
  var tab = INRstar_base().NativeWebObject.Find("idStr", "PatientBridgingTab");
  if(tab.Exists == true && drug == "Warfarin")
  {
    return true;
  }
  else if(tab.Exists != true && drug != "Warfarin")
  {
    return true;
  }
  else
  {
    return false;
  }
}
//--------------------------------------------------------------------------------
function add_bridging_record(procedure_date)
{
  Goto_Create_Bridging_Record();
  
  bridging_schedule_form().Panel("ProcedureDetailsContent").Panel(2).Select("ProcedureDetails_TreatmentType").ClickItem(1);
  bridging_schedule_form().Panel("ProcedureDetailsContent").Panel(3).Select("ProcedureDetails_LMWH").ClickItem(1);
  
  var date_path = bridging_schedule_form().Panel("BridgingScheduleDetails");
  var date = aqConvert.DateTimeToFormatStr(procedure_date, "%d/%m/%Y");
  
  date_picker(date_path, date);
  
  patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("CreateBridgingSchedulesForm").Panel(0).SubmitButton("CreateScheduleButton").Click();
}
//--------------------------------------------------------------------------------
function remove_bridging_table_rows(no_of_rows)
{
  WaitSeconds(2, "Click Now");
  var table_size = bridging_schedule_preop_table().rowCount - 3;
  var id_str = "removeButtonPre_op_" + table_size;
  bridging_schedule_preop_table().Cell(2, 7).Panel(id_str).Click();
  
  /*
  INRstarV5 = INRstar_base();
  var delete_button = INRstarV5.NativeWebObject.Find("idStr", id_str);
  
  if(delete_button.Exists == true)
  {
    for(var i = 0; i < no_of_rows; i++)
    {
      table_size = bridging_schedule_preop_table().rowCount - 2;
      id_str = "removeButtonPre-op-" + table_size;
      delete_button = INRstarV5.NativeWebObject.Find("idStr", id_str);
      if(delete_button.Exists == true && i != 0)
      {
        delete_button.Click();
      }
    }
  }
  */
}
//--------------------------------------------------------------------------------
function add_bridging_table_rows(no_of_rows)
{
  for(var i = 0; i < no_of_rows; i++)
  {
    bridging_schedule_add_button().Click();
  }
}
//-------------------------------------------------------------------------------- 
function validate_bridging_table_dates(procedure_date, rows_to_check)
{
  var expected_row_data = new Array();
  var row_data = new Array();
  var result_set_1;
  var result_set = new Array();
  var table = bridging_schedule_preop_table();
  
  if(rows_to_check == (table.RowCount - 2))
  {
    for(var i = 2; i > table.RowCount; i++)
    {
      expected_row_data.length = 0;
  
      var row_date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(procedure_date, (- (table.RowCount - i))), "%d-%b-%Y");
      expected_row_data.push(row_date, "-" + (table.RowCount - i), false, false, false, "", "");
    
      row_data = get_bridging_schedule_table_row(i);
      
      result_set_1 = checkArrays(expected_row_data, row_data, "Compare Rows");
      result_set.push(result_set_1);
    }
    return results_checker_are_true(result_set);
  }
  else
  {
    return false;
  }
}