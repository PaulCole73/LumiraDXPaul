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
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Dalteparin to Enoxaparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 2);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(2, "Cancel");
    update_bridging_lmwh(2, "Confirm");
  
    var result_set = new Array();
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
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 6, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 6, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 6, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
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
    var test_name = "tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_dalteparin_to_tinzaparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Dalteparin to Tinzaparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 2);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(0, "Cancel");
    update_bridging_lmwh(0, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 6, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 6, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 6, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
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
    var test_name = "tc_bridging_lmwh_switch_from_dalteparin_to_tinzaparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_enoxaparin_to_dalteparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Enoxaparin to Dalteparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 3);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(1, "Cancel");
    update_bridging_lmwh(1, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 6, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 6, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 6, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
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
    var test_name = "tc_bridging_lmwh_switch_from_enoxaparin_to_dalteparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Enoxaparin to Tinzaparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 3);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(0, "Cancel");
    update_bridging_lmwh(0, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 6, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 6, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 6, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
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
    var test_name = "tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Tinzaparin to Dalteparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(1, "Cancel");
    update_bridging_lmwh(1, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 6, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 6, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 6, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
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
    var test_name = "tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_tinzaparin_to_enoxaparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Tinzaparin to Enoxaparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(2, "Cancel");
    update_bridging_lmwh(2, "Confirm");
  
    var result_set = new Array();
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
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 6, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 6, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 6, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
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
    var test_name = "tc_bridging_lmwh_switch_from_tinzaparin_to_enoxaparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_dalteparin_to_dalteparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Dalteparin to Dalteparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 2);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(1, "Cancel");
  
    var result_set = new Array();
    var expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
    
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "lmwh_checkbox", "lmwh_dropdown", "comments");
  
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_dalteparin_to_dalteparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_enoxaparin_to_enoxaparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Enoxaparin to Enoxaparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 3);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(2, "Cancel");
  
    var result_set = new Array();
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
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "lmwh_checkbox", "lmwh_dropdown", "comments");
  
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_enoxaparin_to_enoxaparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_tinzaparin_to_tinzaparin_max_schedule()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Tinzaparin to Tinzaparin - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
  
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
  
    populate_table_column("all", "all", 6);
  
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 6);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 6);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 6);
  
    update_bridging_lmwh(0, "Cancel");
  
    var result_set = new Array();
    var expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "lmwh_checkbox", "lmwh_dropdown", "comments");
  
    var vals = new Array();
    vals = validate_columns_match("pre-op", 6, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = validate_columns_match("procedure", 6, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = validate_columns_match("post", 6, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    var results = results_checker_are_true(result_set);
    Log.Message(results);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_tinzaparin_to_tinzaparin_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_1_day()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Dalteparin to Enoxaparin - 1 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 2);
    
    remove_bridging_table_rows(2, "pre-op");
    remove_bridging_table_rows(2, "post-discharge");
    
    populate_table_column("all", "all", 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 1);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 1);
    
    update_bridging_lmwh(2, "Cancel");
    update_bridging_lmwh(2, "Confirm");
  
    var result_set = new Array();
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
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 1, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 1, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 1, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 1, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
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
    var test_name = "tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_1_day";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_1_day()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Enoxaparin to Tinzaparin - 1 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 3);
    
    remove_bridging_table_rows(2, "pre-op");
    remove_bridging_table_rows(2, "post-discharge");
    
    populate_table_column("all", "all", 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 1);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 1);
    
    update_bridging_lmwh(0, "Cancel");
    update_bridging_lmwh(0, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 1, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 1, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 1, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 1, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
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
    var test_name = "tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_1_day";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_1_day()
{
  try
  {
    var test_title = "Bridging: LMWH switch from Tinzaparin to Dalteparin - 1 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    remove_bridging_table_rows(2, "pre-op");
    remove_bridging_table_rows(2, "post-discharge");
    
    populate_table_column("all", "all", 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 1);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 1);
    
    update_bridging_lmwh(1, "Cancel");
    update_bridging_lmwh(1, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 1, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 1, preop_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    
    vals = validate_columns_match("post", 1, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
  
    vals = compare_table_columns("post", "lmwh_checkbox", 1, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_1_day";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_to_enoxaparin_to_tinzaparin_default_schedule()
{
  try
  {
    var test_title = "Bridging - LMWH switch from Tinzaparin to Dalteparin to Enoxaparin and back to Tinzaparin - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
     
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    update_bridging_lmwh(1, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    update_bridging_lmwh(2, "Confirm");
  
    var result_set = new Array();
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
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
    
    update_bridging_lmwh(0, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);

    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_tinzaparin_to_dalteparin_to_enoxaparin_to_tinzaparin_default_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_to_dalteparin_to_enoxaparin_default_schedule()
{
  try
  {
    var test_title = "Bridging - LMWH switch from Enoxaparin to Tinzaparin to Dalteparin and back to Enoxaparin - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 3);
     
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    update_bridging_lmwh(0, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    update_bridging_lmwh(1, "Confirm");
  
    var result_set = new Array();
    var expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    var title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
    
    update_bridging_lmwh(2, "Confirm");
  
    expected_title = "Enoxaparin (mg)";
    bridging_schedule_preop_table().Refresh();
    title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);

    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_enoxaparin_to_tinzaparin_to_dalteparin_to_enoxaparin_default_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_to_tinzaparin_to_dalteparin_default_schedule()
{
  try
  {
    var test_title = "Bridging - LMWH switch from Dalteparin to Enoxaparin to Tinzaparin and back to Dalteparin - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 2);
     
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
  
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
  
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    update_bridging_lmwh(2, "Confirm");
  
    var result_set = new Array();
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
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    var value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    var result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
  
    update_bridging_lmwh(0, "Confirm");

    expected_title = "Tinzaparin (IU)";
    bridging_schedule_preop_table().Refresh();
    title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
    
    update_bridging_lmwh(1, "Confirm");
  
    expected_title = "Dalteparin (IU)";
    bridging_schedule_preop_table().Refresh();
    title = bridging_schedule_preop_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_procedure_table().Refresh();
    title = bridging_schedule_procedure_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    bridging_schedule_post_discharge_table().Refresh();
    title = bridging_schedule_post_discharge_table().Cell(0, 4).innerText;
    result_set.push(compare_values(expected_title, title, test_title));
  
    var columns_to_match = new Array();
    columns_to_match.push("inr_checkbox", "inr_dropdown", "warf_checkbox", "warf_dropdown", "comments");
    
    var vals = new Array();
    vals = validate_columns_match("pre-op", 3, preop_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("pre-op", "lmwh_checkbox", 3, preop_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("procedure", 1, procedure_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("procedure", "lmwh_checkbox", 1, procedure_data);
    result_set.push(results_checker_are_false(vals));
    vals = validate_columns_match("post", 3, post_data, columns_to_match);
    result_set.push(results_checker_are_true(vals));
    vals = compare_table_columns("post", "lmwh_checkbox", 3, post_data);
    result_set.push(results_checker_are_false(vals));
    
    bridging_schedule_preop_table().Cell(2, 4).Child(1).Click();
    value = bridging_schedule_preop_table().Cell(2, 4).Child(0).wText;
    result_set_1 = compare_values(value, "~Dose", test_title);
    result_set.push(result_set_1);
    
    var results = results_checker_are_true(result_set);
    results_checker(results, test_title);

    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_lmwh_switch_from_dalteparin_to_enoxaparin_to_tinzaparin_to_dalteparin_default_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------