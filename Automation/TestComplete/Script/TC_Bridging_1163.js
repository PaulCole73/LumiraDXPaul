//USEUNIT TSA_Home_Page
//USEUNIT TSA_Login
//USEUNIT TSA_Patient
//USEUNIT TSA_Reviews
//USEUNIT TSA_Treatment
//USEUNIT TSA_Treatment_Plan
//USEUNIT TSA_Patient_Management
//USEUNIT TSA_Self_Care
//USEUNIT TSA_Bridging
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//USEUNIT Get_Functions
//--------------------------------------------------------------------------------
//CACUK-1163
//--------------------------------------------------------------------------------
function tc_bridging_inr_checkbox_display_active_schedule()
{
  try
  {
    var test_title = "Bridging - INR checkbox display (Active schedule)";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
    
    var expected_select_one = "~INR;Test due;0.8;0.9;1.0;1.1;1.2;1.3;1.4;1.5;1.6;1.7;1.8;1.9;2.0;2.1;2.2;2.3;2.4;"
                              + "2.5;2.6;2.7;2.8;2.9;3.0;3.1;3.2;3.3;3.4;3.5;3.6;3.7;3.8;3.9;4.0;4.1;4.2;4.3;4.4;4.5;"
                              + "4.6;4.7;4.8;4.9;5.0;5.1;5.2;5.3;5.4;5.5;5.6;5.7;5.8;5.9;6.0;6.1;6.2;6.3;6.4;6.5;6.6;"
                              + "6.7;6.8;6.9;7.0;7.1;7.2;7.3;7.4;7.5;7.6;7.7;7.8;7.9;8.0;8.1;8.2;8.3;8.4;8.5;8.6;8.7;"
                              + "8.8;8.9;9.0;9.1;9.2;9.3;9.4;9.5;9.6;9.7;9.8;9.9;10.0;10.1;10.2;10.3;10.4;10.5;10.6;"
                              + "10.7;10.8;10.9;11.0;11.1;11.2;11.3;11.4;11.5;11.6;11.7;11.8;11.9;12.0";
                              
    var expected_select_two = "~INR;Test due";
    var result_set = new Array();
    var result_set_1;
    var list;
    
    populate_table_column("pre-op", "inr_checkbox", 6);
    for(var i = 2; i < 8; i++)
    {
      list = bridging_schedule_preop_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select_one, list, test_title);
      result_set.push(result_set_1);
    }
    populate_table_column("pre-op", "inr_dropdown", 6);
    
    populate_table_column("post", "inr_checkbox", 6);
    for(var i = 1; i < 7; i++)
    {
      list = bridging_schedule_post_discharge_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select_two, list, test_title);
      result_set.push(result_set_1);
    }
    populate_table_column("post", "inr_dropdown", 6);
    
    populate_table_column("procedure", "inr_checkbox", 6);
    list = bridging_schedule_procedure_table().Cell(1, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_one, list, test_title);
    result_set.push(result_set_1);
    
    for(var i = 2; i < 7; i++)
    {
      list = bridging_schedule_procedure_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select_two, list, test_title);
      result_set.push(result_set_1);
    }
    populate_table_column("procedure", "inr_dropdown", 6);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_inr_checkbox_display_active_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_inr_checkbox_display_pending_schedule()
{
  try
  {
    var test_title = "Bridging - INR checkbox display (Pending schedule)";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), 14);
    add_bridging_record(date, 1);
    
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
                              
    var expected_select = "~INR;Test due";
    var list;
    var result_set = new Array();
    var result_set_1;
    
    populate_table_column("pre-op", "inr_checkbox", 6);
    for(var i = 2; i < 8; i++)
    {
      list = bridging_schedule_preop_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select, list, test_title);
      result_set.push(result_set_1);
    }
    
    populate_table_column("post", "inr_checkbox", 6);
    for(var i = 1; i < 7; i++)
    {
      list = bridging_schedule_post_discharge_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select, list, test_title);
      result_set.push(result_set_1);
    }
    
    populate_table_column("procedure", "inr_checkbox", 6);
    for(var i = 1; i < 7; i++)
    {
      list = bridging_schedule_procedure_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select, list, test_title);
      result_set.push(result_set_1);
    }
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_inr_checkbox_display_pending_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_checkbox_dropdown_not_editable()
{
  try
  {
    var test_title = "Bridging - INR checkbox user unable to type/paste into box";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    add_bridging_table_rows(1, "procedure");
    
    var expected_select_one = "~INR;Test due;0.8;0.9;1.0;1.1;1.2;1.3;1.4;1.5;1.6;1.7;1.8;1.9;2.0;2.1;2.2;2.3;2.4;"
                              + "2.5;2.6;2.7;2.8;2.9;3.0;3.1;3.2;3.3;3.4;3.5;3.6;3.7;3.8;3.9;4.0;4.1;4.2;4.3;4.4;4.5;"
                              + "4.6;4.7;4.8;4.9;5.0;5.1;5.2;5.3;5.4;5.5;5.6;5.7;5.8;5.9;6.0;6.1;6.2;6.3;6.4;6.5;6.6;"
                              + "6.7;6.8;6.9;7.0;7.1;7.2;7.3;7.4;7.5;7.6;7.7;7.8;7.9;8.0;8.1;8.2;8.3;8.4;8.5;8.6;8.7;"
                              + "8.8;8.9;9.0;9.1;9.2;9.3;9.4;9.5;9.6;9.7;9.8;9.9;10.0;10.1;10.2;10.3;10.4;10.5;10.6;"
                              + "10.7;10.8;10.9;11.0;11.1;11.2;11.3;11.4;11.5;11.6;11.7;11.8;11.9;12.0";
                              
    var expected_select_two = "~INR;Test due";
    
    var result_set = new Array();
    populate_table_column("pre-op", "inr_checkbox", 3);
    var item = bridging_schedule_preop_table().Cell(2, 2).Child(0);
    var result_set_1 = compare_values(expected_select_one, item.wItemList, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(false, item.isContentEditable, test_title);
    Log.Message("Is the dropdown content editable: " + item.isContentEditable);
    result_set.push(result_set_1);
    
    populate_table_column("post", "inr_checkbox", 3);
    item = bridging_schedule_post_discharge_table().Cell(1, 2).Child(0);
    result_set_1 = compare_values(expected_select_two, item.wItemList, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(false, item.isContentEditable, test_title);
    Log.Message("Is the dropdown content editable: " + item.isContentEditable);
    result_set.push(result_set_1);
    
    populate_table_column("procedure", "inr_checkbox", 2);
    item = bridging_schedule_procedure_table().Cell(1, 2).Child(0);
    result_set_1 = compare_values(expected_select_one, item.wItemList, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(false, item.isContentEditable, test_title);
    Log.Message("Is the dropdown content editable: " + item.isContentEditable);
    result_set.push(result_set_1);
    
    item = bridging_schedule_procedure_table().Cell(2, 2).Child(0);
    result_set_1 = compare_values(expected_select_two, item.wItemList, test_title);
    result_set.push(result_set_1);
    result_set_1 = compare_values(false, item.isContentEditable, test_title);
    Log.Message("Is the dropdown content editable: " + item.isContentEditable);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_checkbox_dropdown_not_editable";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_checkbox_max_warnings_dalteparin()
{
  try
  {
    var test_title = "Bridging - Checkbox Max warnings - INR, Warfarin, LMWH and Frequency (Dalteparin) - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 2);
    
    var msg_array = new Array();
    var exp_msg_1 = "INR value(s) required. Please ensure a value has been chosen where \"INR\" has been ticked.";
    var exp_msg_2 = "Warfarin value(s) required. Please ensure a value has been chosen where \"Warfarin (mg)\" has been ticked.";
    var exp_msg_3 = "Dalteparin value(s) required. Please ensure a value has been chosen where \"Dalteparin (IU)\" has been ticked.";
    var exp_msg_4 = "Dalteparin Frequency value(s) required. Please ensure a \"Frequency\" value has been chosen where \"Dalteparin (IU)\" has been ticked.";
    msg_array.push(exp_msg_1, exp_msg_2, exp_msg_3, exp_msg_4);
    var result_set = new Array();
    var result_set_1;
    var text;
        
    populate_table_column("pre-op", "inr_checkbox", 3);
    populate_table_column("procedure", "inr_checkbox", 1);
    populate_table_column("post", "inr_checkbox", 3);
    
    populate_table_column("pre-op", "warf_checkbox", 3);
    populate_table_column("procedure", "warf_checkbox", 1);
    populate_table_column("post", "warf_checkbox", 3);
    
    populate_table_column("pre-op", "lmwh_checkbox", 3);
    populate_table_column("procedure", "lmwh_checkbox", 1);
    populate_table_column("post", "lmwh_checkbox", 3);
    
    populate_table_column("pre-op", "lmwh_dropdown", 1);
    
    save_bridging_schedule();
    
    for(var i = 0; i <= 3; i++)
    {
      text = get_bridging_warning_message(i);
      result_set_1 = compare_values(text, msg_array[i], "Message 1: " + i);
      result_set.push(result_set_1);
    }
    
    populate_table_column("pre-op", "inr_dropdown", 3);
    populate_table_column("post", "inr_dropdown", 3);
    populate_table_column("procedure", "inr_dropdown", 1);
    save_bridging_schedule();
    
    for(var i = 0; i <= 2; i++)
    {
      text = get_bridging_warning_message(i);
      result_set_1 = compare_values(text, msg_array[i+1], "Message 2: " + i);
      result_set.push(result_set_1);
    }
    
    populate_table_column("pre-op", "warf_dropdown", 3);
    populate_table_column("post", "warf_dropdown", 3);
    populate_table_column("procedure", "warf_dropdown", 1);
    save_bridging_schedule();
    
    for(var i = 0; i <= 1; i++)
    {
      text = get_bridging_warning_message(i);
      result_set_1 = compare_values(text, msg_array[i+2], "Message 3: " + i);
      result_set.push(result_set_1);
    }
    
    populate_table_column("pre-op", "lmwh_dropdown", 3);
    populate_table_column("post", "lmwh_dropdown", 3);
    populate_table_column("procedure", "lmwh_dropdown", 1);
    save_bridging_schedule();
    
    text = get_bridging_warning_message(0);
    result_set_1 = compare_values(text, msg_array[3], "Message 4: 0");
    result_set.push(result_set_1);
    
    populate_table_column("pre-op", "frequency", 3);
    populate_table_column("post", "frequency", 3);
    populate_table_column("procedure", "frequency", 1);
    save_bridging_schedule();
    result_set_1 = process_object_exists("idStr", "BridgingScheduleMessages");
    result_set.push(results_checker_are_false(result_set_1));
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_checkbox_max_warnings_dalteparin";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_checkbox_warnings_inr_one_day_schedule()
{
  try
  {
    var test_title = "Bridging - Checkbox warning message displayed for INR - 1 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 2);
    
    remove_bridging_table_rows(2, "pre-op");
    remove_bridging_table_rows(2, "post-discharge");
    
    var exp_msg = "INR value(s) required. Please ensure a value has been chosen where \"INR\" has been ticked.";
    var result_set = new Array();
    var result_set_1;
    var text;
        
    populate_table_column("pre-op", "inr_checkbox", 1);
    populate_table_column("procedure", "inr_checkbox", 1);
    populate_table_column("post", "inr_checkbox", 1);
    save_bridging_schedule();
    
    var text = get_bridging_warning_message("all");
    var result_set_1 = compare_values(text, exp_msg, test_title);
    result_set.push(result_set_1);
    
    populate_table_column("pre-op", "inr_dropdown", 1);
    save_bridging_schedule();
    
    text = get_bridging_warning_message("all");
    result_set_1 = compare_values(text, exp_msg, test_title);
    result_set.push(result_set_1);
    
    populate_table_column("procedure", "inr_dropdown", 1);
    save_bridging_schedule();
    
    text = get_bridging_warning_message("all");
    result_set_1 = compare_values(text, exp_msg, test_title);
    result_set.push(result_set_1);
    
    populate_table_column("post", "inr_dropdown", 1);
    save_bridging_schedule();
    result_set_1 = process_object_exists("idStr", "BridgingScheduleMessages");
    result_set.push(compare_values(false, result_set_1, test_title));
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_checkbox_warnings_inr_one_day_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_inr_checkbox_selections_amended_procedure_date()
{
  try
  {
    var test_title = "Bridging - Amend procedure date and check INR checkbox selections available";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), -11);
    add_bridging_record(date, 2);
    
    var preop_data = new Array();
    var procedure_data = new Array();
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    procedure_data = get_table_column_data("procedure", "all", 1);
    post_data = get_table_column_data("post", "all", 3);
    
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
    
    var result_set = new Array();
    var result_set_1;
    
    populate_table_column("pre-op", "inr_checkbox", 6);
    populate_table_column("procedure", "inr_checkbox", 6);
    populate_table_column("post", "inr_checkbox", 6);
    
    var expected_select_one = "~INR;Test due;0.8;0.9;1.0;1.1;1.2;1.3;1.4;1.5;1.6;1.7;1.8;1.9;2.0;2.1;2.2;2.3;2.4;"
                              + "2.5;2.6;2.7;2.8;2.9;3.0;3.1;3.2;3.3;3.4;3.5;3.6;3.7;3.8;3.9;4.0;4.1;4.2;4.3;4.4;4.5;"
                              + "4.6;4.7;4.8;4.9;5.0;5.1;5.2;5.3;5.4;5.5;5.6;5.7;5.8;5.9;6.0;6.1;6.2;6.3;6.4;6.5;6.6;"
                              + "6.7;6.8;6.9;7.0;7.1;7.2;7.3;7.4;7.5;7.6;7.7;7.8;7.9;8.0;8.1;8.2;8.3;8.4;8.5;8.6;8.7;"
                              + "8.8;8.9;9.0;9.1;9.2;9.3;9.4;9.5;9.6;9.7;9.8;9.9;10.0;10.1;10.2;10.3;10.4;10.5;10.6;"
                              + "10.7;10.8;10.9;11.0;11.1;11.2;11.3;11.4;11.5;11.6;11.7;11.8;11.9;12.0";
                              
    var expected_select_two = "~INR;Test due";
    
    for(var j = 0; j < 3; j++)
    {
      if(j == 0)
      {
        var table = bridging_schedule_preop_table();
        var start = 2;
      }
      else if(j == 1)
      {
        var table = bridging_schedule_procedure_table();
        var start = 1;
      }
      else
      {
        var table = bridging_schedule_post_discharge_table();
        var start = 1;
      }
      for(var i = start; i < 7; i++)
      {
        list = table.Cell(i, 2).Child(0).wItemList;
        result_set_1 = compare_values(expected_select_one, list, test_title);
        result_set.push(result_set_1);
      }
    }
    
    populate_table_column("pre-op", "inr_dropdown", 6);
    populate_table_column("procedure", "inr_dropdown", 6);
    populate_table_column("post", "inr_dropdown", 6);
    
    var new_date = aqDateTime.Today();
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "+");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "+");
    post_data = update_bridging_array_dates(post_data, date, new_date, "+");
    
    update_procedure_date(new_date);
    
    var preop_data_1 = new Array();
    var procedure_data_1 = new Array();
    var post_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    populate_table_column("pre-op", "inr_checkbox", 3);
    for(var i = 2; i < 5; i++)
    {
      list = bridging_schedule_preop_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select_one, list, test_title);
      result_set.push(result_set_1);
    }
    
    populate_table_column("post", "inr_checkbox", 3);
    for(var i = 1; i < 4; i++)
    {
      list = bridging_schedule_post_discharge_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select_two, list, test_title);
      result_set.push(result_set_1);
    }
    
    populate_table_column("procedure", "inr_checkbox", 1);
    list = bridging_schedule_procedure_table().Cell(1, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_one, list, test_title);
    result_set.push(result_set_1);
    
    var new_date_1 = aqDateTime.AddDays(aqDateTime.Today(), 21);
    preop_data = update_bridging_array_dates(preop_data, new_date, new_date_1, "+");
    procedure_data = update_bridging_array_dates(procedure_data, new_date, new_date_1, "+");
    post_data = update_bridging_array_dates(post_data, new_date, new_date_1, "+");
    
    update_procedure_date(new_date_1);
    
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    populate_table_column("pre-op", "inr_checkbox", 3);
    for(var i = 2; i < 5; i++)
    {
      list = bridging_schedule_preop_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select_two, list, test_title);
      result_set.push(result_set_1);
    }
    
    populate_table_column("post", "inr_checkbox", 3);
    for(var i = 1; i < 4; i++)
    {
      list = bridging_schedule_post_discharge_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select_two, list, test_title);
      result_set.push(result_set_1);
    }
    
    populate_table_column("procedure", "inr_checkbox", 1);
    list = bridging_schedule_procedure_table().Cell(1, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_two, list, test_title);
    result_set.push(result_set_1);
    
    save_bridging_schedule();
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_inr_checkbox_selections_amended_procedure_date";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_checkbox_selection_amend_lmwh()
{
  try
  {
    var test_title = "Bridging - Amend LMWH and check INR checkbox selections remain";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), -1);
    add_bridging_record(date, 2);
    
    var result_set = new Array();
    var result_set_1;
    
    populate_table_column("pre-op", "inr_checkbox", 3);
    populate_table_column("procedure", "inr_checkbox", 1);
    populate_table_column("post", "inr_checkbox", 3);
    
    var expected_select_one = "~INR;Test due;0.8;0.9;1.0;1.1;1.2;1.3;1.4;1.5;1.6;1.7;1.8;1.9;2.0;2.1;2.2;2.3;2.4;"
                              + "2.5;2.6;2.7;2.8;2.9;3.0;3.1;3.2;3.3;3.4;3.5;3.6;3.7;3.8;3.9;4.0;4.1;4.2;4.3;4.4;4.5;"
                              + "4.6;4.7;4.8;4.9;5.0;5.1;5.2;5.3;5.4;5.5;5.6;5.7;5.8;5.9;6.0;6.1;6.2;6.3;6.4;6.5;6.6;"
                              + "6.7;6.8;6.9;7.0;7.1;7.2;7.3;7.4;7.5;7.6;7.7;7.8;7.9;8.0;8.1;8.2;8.3;8.4;8.5;8.6;8.7;"
                              + "8.8;8.9;9.0;9.1;9.2;9.3;9.4;9.5;9.6;9.7;9.8;9.9;10.0;10.1;10.2;10.3;10.4;10.5;10.6;"
                              + "10.7;10.8;10.9;11.0;11.1;11.2;11.3;11.4;11.5;11.6;11.7;11.8;11.9;12.0";
                              
    var expected_select_two = "~INR;Test due";
    
    for(var i = 2; i < 5; i++)
    {
      list = bridging_schedule_preop_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select_one, list, test_title);
      result_set.push(result_set_1);
    }
    populate_table_column("pre-op", "inr_dropdown", 3);
    
    list = bridging_schedule_post_discharge_table().Cell(1, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_one, list, test_title);
    result_set.push(result_set_1);
    
    for(var i = 2; i < 4; i++)
    {
      list = bridging_schedule_post_discharge_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select_two, list, test_title);
      result_set.push(result_set_1);
    }
    populate_table_column("post", "inr_dropdown", 3);
    
    list = bridging_schedule_procedure_table().Cell(1, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_one, list, test_title);
    result_set.push(result_set_1);
    populate_table_column("procedure", "inr_dropdown", 1);
    
    var preop_data = new Array();
    var procedure_data = new Array();
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    procedure_data = get_table_column_data("procedure", "all", 1);
    post_data = get_table_column_data("post", "all", 3);
    
    update_bridging_lmwh(2, "Confirm");
    
    var expected_title = "Enoxaparin (mg)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
    
    var preop_data_1 = new Array();
    var procedure_data_1 = new Array();
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    save_bridging_schedule();
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_checkbox_selection_amend_lmwh";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_inr_checkbox_selection_add_days()
{
  try
  {
    var test_title = "Bridging - Add days and check INR checkbox selections";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), 5);
    add_bridging_record(date, 2);
    
    var result_set = new Array();
    var result_set_1;
    
    populate_table_column("pre-op", "inr_checkbox", 3);
    populate_table_column("procedure", "inr_checkbox", 1);
    populate_table_column("post", "inr_checkbox", 3);
    
    var expected_select_one = "~INR;Test due;0.8;0.9;1.0;1.1;1.2;1.3;1.4;1.5;1.6;1.7;1.8;1.9;2.0;2.1;2.2;2.3;2.4;"
                              + "2.5;2.6;2.7;2.8;2.9;3.0;3.1;3.2;3.3;3.4;3.5;3.6;3.7;3.8;3.9;4.0;4.1;4.2;4.3;4.4;4.5;"
                              + "4.6;4.7;4.8;4.9;5.0;5.1;5.2;5.3;5.4;5.5;5.6;5.7;5.8;5.9;6.0;6.1;6.2;6.3;6.4;6.5;6.6;"
                              + "6.7;6.8;6.9;7.0;7.1;7.2;7.3;7.4;7.5;7.6;7.7;7.8;7.9;8.0;8.1;8.2;8.3;8.4;8.5;8.6;8.7;"
                              + "8.8;8.9;9.0;9.1;9.2;9.3;9.4;9.5;9.6;9.7;9.8;9.9;10.0;10.1;10.2;10.3;10.4;10.5;10.6;"
                              + "10.7;10.8;10.9;11.0;11.1;11.2;11.3;11.4;11.5;11.6;11.7;11.8;11.9;12.0";
                              
    var expected_select_two = "~INR;Test due";
    
    for(var i = 2; i < 5; i++)
    {
      list = bridging_schedule_preop_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select_two, list, test_title);
      result_set.push(result_set_1);
    }
    
    for(var i = 1; i < 4; i++)
    {
      list = bridging_schedule_post_discharge_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select_two, list, test_title);
      result_set.push(result_set_1);
    }
    
    list = bridging_schedule_procedure_table().Cell(1, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_two, list, test_title);
    result_set.push(result_set_1);
    
    add_bridging_table_rows(1, "pre-op");
    populate_table_column("pre-op", "inr_checkbox", 1);
    list = bridging_schedule_preop_table().Cell(2, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_two, list, test_title);
    result_set.push(result_set_1);
    
    add_bridging_table_rows(1, "pre-op");
    populate_table_column("pre-op", "inr_checkbox", 1);
    list = bridging_schedule_preop_table().Cell(2, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_one, list, test_title);
    result_set.push(result_set_1);
    
    add_bridging_table_rows(1, "pre-op");
    populate_table_column("pre-op", "inr_checkbox", 1);
    list = bridging_schedule_preop_table().Cell(2, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_one, list, test_title);
    result_set.push(result_set_1);
    
    date = aqDateTime.AddDays(aqDateTime.Today(), -1);
    update_procedure_date(date);
    
    populate_table_column("procedure", "inr_checkbox", 1);
    list = bridging_schedule_procedure_table().Cell(1, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_one, list, test_title);
    result_set.push(result_set_1);
    
    add_bridging_table_rows(1, "procedure");
    populate_table_column("procedure", "inr_checkbox", 2);
    list = bridging_schedule_procedure_table().Cell(2, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_one, list, test_title);
    result_set.push(result_set_1);
    
    add_bridging_table_rows(1, "procedure");
    populate_table_column("procedure", "inr_checkbox", 3);
    list = bridging_schedule_procedure_table().Cell(3, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_two, list, test_title);
    result_set.push(result_set_1);
    
    date = aqDateTime.AddDays(aqDateTime.Today(), -4);
    update_procedure_date(date);
    
    populate_table_column("post", "inr_checkbox", 3);
    for(var i = 1; i < 4; i++)
    {
      list = bridging_schedule_post_discharge_table().Cell(i, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select_one, list, test_title);
      result_set.push(result_set_1);
    }
    
    add_bridging_table_rows(1, "post-discharge");
    populate_table_column("post", "inr_checkbox", 4);
    list = bridging_schedule_post_discharge_table().Cell(4, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_one, list, test_title);
    result_set.push(result_set_1);
    
    add_bridging_table_rows(1, "post-discharge");
    populate_table_column("post", "inr_checkbox", 5);
    list = bridging_schedule_post_discharge_table().Cell(5, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_two, list, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_inr_checkbox_selection_add_days";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_inr_checkbox_selection_delete_days()
{
  try
  {
    var test_title = "Bridging - Delete days and check INR checkbox selections";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), -1);
    add_bridging_record(date, 2);
    
    var expected_select_one = "~INR;Test due;0.8;0.9;1.0;1.1;1.2;1.3;1.4;1.5;1.6;1.7;1.8;1.9;2.0;2.1;2.2;2.3;2.4;"
                              + "2.5;2.6;2.7;2.8;2.9;3.0;3.1;3.2;3.3;3.4;3.5;3.6;3.7;3.8;3.9;4.0;4.1;4.2;4.3;4.4;4.5;"
                              + "4.6;4.7;4.8;4.9;5.0;5.1;5.2;5.3;5.4;5.5;5.6;5.7;5.8;5.9;6.0;6.1;6.2;6.3;6.4;6.5;6.6;"
                              + "6.7;6.8;6.9;7.0;7.1;7.2;7.3;7.4;7.5;7.6;7.7;7.8;7.9;8.0;8.1;8.2;8.3;8.4;8.5;8.6;8.7;"
                              + "8.8;8.9;9.0;9.1;9.2;9.3;9.4;9.5;9.6;9.7;9.8;9.9;10.0;10.1;10.2;10.3;10.4;10.5;10.6;"
                              + "10.7;10.8;10.9;11.0;11.1;11.2;11.3;11.4;11.5;11.6;11.7;11.8;11.9;12.0";
                              
    var expected_select_two = "~INR;Test due";
    
    add_bridging_table_rows(5, "procedure");
    remove_bridging_table_rows(2, "post-discharge");
    
    var result_set = new Array();
    var result_set_1;
    
    populate_table_column("post", "inr_checkbox", 1);
    for(var i = 0; i < 5; i++)
    {
      list = bridging_schedule_post_discharge_table().Cell(1, 2).Child(0).wItemList;
      result_set_1 = compare_values(expected_select_two, list, test_title);
      result_set.push(result_set_1);
    
      remove_bridging_table_rows(1, "procedure");
    }
    
    list = bridging_schedule_post_discharge_table().Cell(1, 2).Child(0).wItemList;
    result_set_1 = compare_values(expected_select_one, list, test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
    
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_inr_checkbox_selection_delete_days";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------