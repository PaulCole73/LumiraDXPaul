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
//CACUK-1032
function tc_bridging_amend_date_to_same_day_procedure_tomorrow()
{
  try
  {
    var test_title = "Bridging: Procedure date is tomorrow's date and amended to same date - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), 1);
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
    
    update_procedure_date(date);
  
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    var result_set = new Array();
    var result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
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
    var test_name = "tc_bridging_amend_date_to_same_day_procedure_tomorrow";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_same_day_procedure_yesterday()
{
  try
  {
    var test_title = "Bridging: Procedure date is yesterday's date and amended to same date - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), -1);
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
    
    update_procedure_date(date);
  
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    var result_set = new Array();
    var result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
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
    var test_name = "tc_bridging_amend_date_to_same_day_procedure_yesterday";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_same_day_procedure_today()
{
  try
  {
    var test_title = "Bridging:  Procedure date is today's date and amended to same date - default schedule";
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
    
    update_procedure_date(date);
  
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    var result_set = new Array();
    var result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
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
    var test_name = "tc_bridging_amend_date_to_same_day_procedure_today";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_today_procedure_in_the_past()
{
  try
  {
    var test_title = "Bridging: Procedure date in past amended to today's date - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), -6);
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var result_set = new Array();
    var new_date = aqDateTime.Today();
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "+");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "+");
    post_data = update_bridging_array_dates(post_data, date, new_date, "+");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    var result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
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
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_today_procedure_in_the_past";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_today_procedure_in_the_future()
{
  try
  {
    var test_title = "Bridging: Procedure date in future amended to today's date - default schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), 20);
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var result_set = new Array();
    var new_date = aqDateTime.Today();
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    var result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
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
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_today_procedure_in_the_future";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_past_procedure_is_today()
{
  try
  {
    var test_title = "Bridging: Procedure date is today's date and amended to 11 days in the past - 1 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    remove_bridging_table_rows(2, "pre-op");
    remove_bridging_table_rows(2, "post-discharge");
    
    populate_table_column("pre-op", "all", 1);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 1);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), -12);
    var date_path = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent").Panel("BridgingScheduleDetails");
    date_path.scrollIntoView();
    new_date = aqConvert.DateTimeToFormatStr(new_date, "%d/%m/%Y");
    var status = date_picker(date_path, new_date, "INRstar");
    date_path.Panel(0).Image("calendar_png").Click();
    
    var result_set = new Array();
    var result_set_1 = compare_values("inactive", status, test_title);
    result_set.push(result_set_1);
    
    new_date = aqDateTime.AddDays(aqDateTime.Today(), -11);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
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
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_past_procedure_is_today";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_future_procedure_is_today()
{
  try
  {
    var test_title = "Bridging: Procedure date is today's date and amended to 6 weeks in the future - 1 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    remove_bridging_table_rows(2, "pre-op");
    remove_bridging_table_rows(2, "post-discharge");
    
    populate_table_column("pre-op", "all", 1);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 1);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), 43);
    var date_path = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent").Panel("BridgingScheduleDetails");
    date_path.scrollIntoView();
    new_date = aqConvert.DateTimeToFormatStr(new_date, "%d/%m/%Y");
    var status = date_picker(date_path, new_date, "INRstar");
    date_path.Panel(0).Image("calendar_png").Click();
    
    var result_set = new Array();
    var result_set_1 = compare_values("inactive", status, test_title);
    result_set.push(result_set_1);
    
    new_date = aqDateTime.AddDays(aqDateTime.Today(), 42);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "+");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "+");
    post_data = update_bridging_array_dates(post_data, date, new_date, "+");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
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
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_future_procedure_is_today";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_past_procedure_is_today_0_day_schedule()
{
  try
  {
    var test_title = "Bridging: Procedure date is today's date and amended to 11 days in the past - 0 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    remove_bridging_table_rows(3, "pre-op");
    remove_bridging_table_rows(3, "post-discharge");
    populate_table_column("procedure", "all", 1);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), -12);
    var date_path = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent").Panel("BridgingScheduleDetails");
    date_path.scrollIntoView();
    new_date = aqConvert.DateTimeToFormatStr(new_date, "%d/%m/%Y");
    var status = date_picker(date_path, new_date, "INRstar");
    date_path.Panel(0).Image("calendar_png").Click();
    
    var result_set = new Array();
    var result_set_1 = compare_values("inactive", status, test_title);
    result_set.push(result_set_1);
    
    new_date = aqDateTime.AddDays(aqDateTime.Today(), -11);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
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
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_past_procedure_is_today_0_day_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_future_procedure_is_today_0_day_schedule()
{
  try
  {
    var test_title = "Bridging: Procedure date is today's date and amended to 6 weeks in the future - 0 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    remove_bridging_table_rows(3, "pre-op");
    remove_bridging_table_rows(3, "post-discharge");
    
    populate_table_column("procedure", "all", 1);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), 43);
    var date_path = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent").Panel("BridgingScheduleDetails");
    date_path.scrollIntoView();
    new_date = aqConvert.DateTimeToFormatStr(new_date, "%d/%m/%Y");
    var status = date_picker(date_path, new_date, "INRstar");
    date_path.Panel(0).Image("calendar_png").Click();
    var result_set = new Array();
    var result_set_1 = compare_values("inactive", status, test_title);
    result_set.push(result_set_1);
    
    new_date = aqDateTime.AddDays(aqDateTime.Today(), 42);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "+");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "+");
    post_data = update_bridging_array_dates(post_data, date, new_date, "+");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
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
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_future_procedure_is_today_0_day_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_procedure_date_today_amend_to_past_max_schedule()
{
  try
  {
    var test_title = "Bridging: Procedure date is today's date and amended to 11 days in the past - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
    
    populate_table_column("pre-op", "all", 6);
    populate_table_column("procedure", "all", 6);
    populate_table_column("post", "all", 6);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), -12);
    
    var date_path = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent").Panel("BridgingScheduleDetails");
    date_path.scrollIntoView();
    new_date = aqConvert.DateTimeToFormatStr(new_date, "%d/%m/%Y");
    var status = date_picker(date_path, new_date, "INRstar");
    date_path.Panel(0).Image("calendar_png").Click();
    var result_set = new Array();
    var result_set_1 = compare_values("inactive", status, test_title);
    result_set.push(result_set_1);
    
    new_date = aqDateTime.AddDays(aqDateTime.Today(), -11);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
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
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_procedure_date_today_amend_to_past_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_procedure_date_today_amend_to_future_max_schedule()
{
  try
  {
    var test_title = "Bridging: Procedure date is today's date and amended to 6 weeks in the future - Max 6 day schedule";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    add_bridging_table_rows(3, "pre-op");
    add_bridging_table_rows(5, "procedure");
    add_bridging_table_rows(3, "post-discharge");
    
    populate_table_column("pre-op", "all", 6);
    populate_table_column("procedure", "all", 6);
    populate_table_column("post", "all", 6);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), 43);
    
    var date_path = patient_treatment_bridging_tab().Panel("BridgingTabContent").Form("BridgingForm").Panel("BridgingTabContent").Panel("BridgingScheduleDetails");
    date_path.scrollIntoView();
    new_date = aqConvert.DateTimeToFormatStr(new_date, "%d/%m/%Y");
    var status = date_picker(date_path, new_date, "INRstar");
    date_path.Panel(0).Image("calendar_png").Click();
    var result_set = new Array();
    var result_set_1 = compare_values("inactive", status, test_title);
    result_set.push(result_set_1);
    
    new_date = aqDateTime.AddDays(aqDateTime.Today(), 42);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "+");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "+");
    post_data = update_bridging_array_dates(post_data, date, new_date, "+");
    
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
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
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_procedure_date_today_amend_to_future_max_schedule";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_procedure_date_today_amend_to_past_and_then_future_then_back_to_original_date()
{
  try
  {
    var result_set = new Array();
    var test_title = "Bridging - Procedure date is today's date and amended to 11 days in the past and then 6 weeks in the future and then back to original today's date";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.Today();
    add_bridging_record(date, 3);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var new_date = aqDateTime.AddDays(date, -11);
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    
    var result_set = new Array();
    var result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");

    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
        
    new_date_2 = aqDateTime.AddDays(new_date, 42);
    exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date_2, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    popup_text = update_procedure_date(new_date_2);
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    preop_data = update_bridging_array_dates(preop_data, new_date, new_date_2, "+");
    procedure_data = update_bridging_array_dates(procedure_data, new_date, new_date_2, "+");
    post_data = update_bridging_array_dates(post_data, new_date, new_date_2, "+");
    
    preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
     
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);   
    
    new_date_3 = aqDateTime.Today();
    preop_data = update_bridging_array_dates(preop_data, new_date_2, new_date_3, "-");
    procedure_data = update_bridging_array_dates(procedure_data, new_date_2, new_date_3, "-");
    post_data = update_bridging_array_dates(post_data, new_date_2, new_date_3, "-");
    
    exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date_3, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    popup_text = update_procedure_date(new_date_3);
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);

    preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    post_data_1 = new Array();
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
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_procedure_date_today_amend_to_past_and_then_future_then_back_to_original_date";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_amend_date_to_today_procedure_in_the_future_and_amend_LMWH()
{
  try
  {
    var test_title = "Bridging - Procedure date is future date and amended to today's date and LMWH changed";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), 20);
    add_bridging_record(date, 3);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var new_date = aqDateTime.Today();
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");
    
    var result_set = new Array();
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    var result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
    
    update_bridging_lmwh(0, "Confirm");
    
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
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_amend_date_to_today_procedure_in_the_future_and_amend_LMWH";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------
function tc_bridging_procedure_date_in_future_amended_to_past_and_then_today_and_then_back_to_original_date()
{
  try
  {
    var test_title = "Bridging - Procedure date is future date and amended to 11 days in the past and then to today's date and then back to original future date";
    login(7, "Shared");
  
    add_patient("Bridging", "Schedule", "M", "Shared");
    add_treatment_plan("W", "Coventry", "", "Shared", "");
  
    var date = aqDateTime.AddDays(aqDateTime.Today(), 20);
    add_bridging_record(date, 1);
    
    var preop_data = new Array();
    preop_data = get_table_column_data("pre-op", "all", 3);
    var procedure_data = new Array();
    procedure_data = get_table_column_data("procedure", "all", 1);
    var post_data = new Array();
    post_data = get_table_column_data("post", "all", 3);
    
    populate_table_column("pre-op", "all", 3);
    populate_table_column("procedure", "all", 1);
    populate_table_column("post", "all", 3);
    
    var new_date = aqDateTime.AddDays(aqDateTime.Today(), -11);
    preop_data = update_bridging_array_dates(preop_data, date, new_date, "-");
    procedure_data = update_bridging_array_dates(procedure_data, date, new_date, "-");
    post_data = update_bridging_array_dates(post_data, date, new_date, "-");
    
    var result_set = new Array();
    var exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    var popup_text = update_procedure_date(new_date);
    var result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);

    var preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    var procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    var post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
    
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);
   
    var new_date_2 = aqDateTime.Today();
    preop_data = update_bridging_array_dates(preop_data, new_date, new_date_2, "+");
    procedure_data = update_bridging_array_dates(procedure_data, new_date, new_date_2, "+");
    post_data = update_bridging_array_dates(post_data, new_date, new_date_2, "+");
    
    exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date_2, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    popup_text = update_procedure_date(new_date_2);
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);
    
    preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    post_data_1 = new Array();
    post_data_1 = get_table_column_data("post", "all", 3);
     
    result_set_1 = checkArrays(preop_data_1, preop_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(procedure_data_1, procedure_data, test_title);
    result_set.push(result_set_1);
    result_set_1 = checkArrays(post_data_1, post_data, test_title);
    result_set.push(result_set_1);   
    
    var new_date_3 = aqDateTime.AddDays(aqDateTime.Today(), 20);
    preop_data = update_bridging_array_dates(preop_data, new_date_2, new_date_3, "+");
    procedure_data = update_bridging_array_dates(procedure_data, new_date_2, new_date_3, "+");
    post_data = update_bridging_array_dates(post_data, new_date_2, new_date_3, "+");
    
    exp_text = "The procedure date will be changed to " + aqConvert.DateTimeToFormatStr(new_date_3, "%d-%b-%Y") 
    + " and all data entered will be removed.\r\n\r\nYou will need to enter the schedule details again against the new dates.";
    popup_text = update_procedure_date(new_date_3);
    result_set_1 = compare_values(popup_text, exp_text, test_title);
    result_set.push(result_set_1);

    preop_data_1 = new Array();
    preop_data_1 = get_table_column_data("pre-op", "all", 3);
    procedure_data_1 = new Array();
    procedure_data_1 = get_table_column_data("procedure", "all", 1);
    post_data_1 = new Array();
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
  
    Log_Off();
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "TC_Bridging";
    var test_name = "tc_bridging_procedure_date_in_future_amended_to_past_and_then_today_and_then_back_to_original_date";
    handle_failed_tests(suite_name, test_name);
  }
}
//--------------------------------------------------------------------------------