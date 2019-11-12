//USEUNIT Add_INR_Backdated
//USEUNIT Common
//USEUNIT SORB_Functions
//USEUNIT loggin
//USEUNIT Navigate_Patient
//USEUNIT Navigation
//USEUNIT Quick_Patient
//USEUNIT SORB_Schedule_Ordering
//USEUNIT Test_Audit
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Presets
//USEUNIT V5_SQL
//USEUNIT TSA_Treatment
//USEUNIT SORB_Functions
//-----------------------------------------------------------------------------------
function SORB_schedule_testing_test_cases()
{
 tc_Schedule_ordering_suggested_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_for_today_for_7_8_9_10_day_review_periods();
 tc_Schedule_ordering_suggested_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_1_days_for_7_8_9_10_day_review_periods();
 tc_Schedule_ordering_suggested_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_2_days_for_7_8_9_10_day_review_periods();
 tc_Schedule_ordering_suggested_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_3_days_for_7_8_9_10_day_review_periods();
 
 tc_Schedule_ordering_current_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_for_today_for_7_8_9_10_day_review_periods();
 tc_Schedule_ordering_current_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_1_days_for_7_8_9_10_day_review_periods();
 tc_Schedule_ordering_current_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_2_days_for_7_8_9_10_day_review_periods();
} 
//-----------------------------------------------------------------------------------
function tc_Schedule_ordering_suggested_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_for_today_for_7_8_9_10_day_review_periods() 
{
  log_on_cl3_coruscant("cl3@regression","INRstar_5");
  WaitSeconds(10, "Waiting for home page");
  var INRstarV5 = set_system();

  //Adding Patient
  Goto_Add_Patient();
  quick_pt_demographics("SORB Suggested", "Treatment_today", "F");
         
  WaitSeconds(3,"Waiting for patient to be added");
 
  //Adding TP ensure all tablets are ticked        
  Goto_Patient_TreatmentPlan_Add(); 
  WaitSeconds(3,"Waiting for treatment plan page"); 
 
  var w_master_date = aqDateTime.Today();
  var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
    
  quick_pt_treatmentplan("W","", w_start_date);
  WaitSeconds(3,"Waiting for treatment plan to save");
         
 //Add Historic
  Goto_Add_Historical();

  var w_date = aqDateTime.AddDays(aqDateTime.Today(), -7);
  var w_day = aqString.SubString(w_date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
  var w_yr = aqString.SubString(w_date,6,4);
    
  quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "7", "Historical Treatment");
 
  //Add Treatment
  WaitSeconds(2, "Waiting for");
  Goto_Patient_New_INR();
  add_treatment("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))));
  
  //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days that are expected after sorb
  var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("3"); 
  Log.Message(suggested_schedule_pre_sorb + " This is expected schedule pre - sorb")
 
  //Click SORB Button
  click_sorb_button("suggested");
  
  //Schedule Checking getting the schedule on the page
  var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
  var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
  Log.Message(sorb_schedule_just_days + " This is the actual sorb schedule just days");
  Log.Message(sorb_schedule_days_and_dose + " This is the actual sorb schedule");
 
 //Schedule Checking getting the schedule I am expecting for > 10 schedule days
 var expected_schedule = getting_expected_schedule_by_days("today",9);
 Log.Message(expected_schedule + " This is my expected schedule");
 
 //Test the results
 var testResult1 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order of days treatment today > 10 day schedule has failed");
 var testResult1_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment today > 10 day schedule has failed");
//------------------------------------------------------- 
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
   
 //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days when clicking sorb button
 var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("2"); 
              
 //override for 9 day review period
 override_treatment(9);

 // Go to skip or boost
 click_sorb_button("suggested");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
 Log.Message(sorb_schedule_just_days + " This is actual sorb schedule");
 
 //Schedule Checking getting the schedule I am expecting for 9 schedule days
 var expected_schedule = getting_expected_schedule_by_days("today",8);
 Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult2 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment today 9 day schedule has failed");
 var testResult2_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment today 9 day schedule has failed");
//-------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days when clicking sorb button
 var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("1"); 
 
 //override for 8 day review period
 override_treatment(8);

 // Go to skip or boost
 click_sorb_button("suggested");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
 Log.Message(sorb_schedule_just_days + " This is actual sorb schedule");
 
 //Schedule Checking getting the schedule I am expecting for 8 schedule days
 var expected_schedule = getting_expected_schedule_by_days("today",7);
 Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult3 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment today 8 day schedule has failed");
 var testResult3_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment today 8 day schedule has failed");
//-------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days when clicking sorb button
 var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule(0); 
 
 //override for 7 day review period
 override_treatment(7);

 //Go to skip or boost
 click_sorb_button("suggested");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
 Log.Message(sorb_schedule_just_days + " This is actual sorb schedule");
  
 //Schedule Checking getting the schedule I am expecting for 7 schedule days
 var expected_schedule = getting_expected_schedule_by_days("today",6);
 Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult4 = checkArrays(sorb_schedule_just_days,expected_schedule, "suggested tab order treatment 7 day schedule has failed");
 var testResult4_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment today 7 day schedule has failed");

 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 Log_Off();
//-------------------
 if(testResult1 && testResult1_1 && testResult2 && testResult2_1 && testResult3 && testResult3_1 && testResult4 && testResult4_1)
 {
 Log.Checkpoint(" Test passed, Suggested tab - Ensure schedule is in the correct order when treatment date is for today for 7,8,9,10 day review periods")
 } 
 else
  Log.Warning("Test has failed, Suggested tab - Ensure schedule is in the correct order when treatment date is for today for 7,8,9,10 day review periods")     
 }
//--------------------------------------------------------------------------------------------------------------------------------------------------
 function tc_Schedule_ordering_suggested_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_1_days_for_7_8_9_10_day_review_periods() 
{
  log_on_cl3_coruscant("cl3@emisweb","INRstar_5");
  WaitSeconds(10, "Waiting for home page");
  var INRstarV5 = set_system();

  //Adding Patient
  Goto_Add_Patient();
  quick_pt_demographics("SORB Suggested", "Treatment_backdated_one_day", "F");
         
  WaitSeconds(3,"Waiting for patient to be added");
 
  //Adding TP ensure all tablets are ticked        
  Goto_Patient_TreatmentPlan_Add(); 
  WaitSeconds(3,"Waiting for treatment plan page"); 
 
  var w_master_date = aqDateTime.Today();
  var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
    
  quick_pt_treatmentplan("W","", w_start_date);
  WaitSeconds(3,"Waiting for treatment plan to save");
         
  //Add Historic
 
  Goto_Add_Historical();

  var w_date = aqDateTime.AddDays(aqDateTime.Today(), -7);
  var w_day = aqString.SubString(w_date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
  var w_yr = aqString.SubString(w_date,6,4);
    
  quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "7", "Historical Treatment");
 
  //Add Treatment
  WaitSeconds(3, "Waiting for");
  Goto_Patient_New_INR();
  add_treatment("2.3", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1))));;
  
  //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days that are expected after sorb
  var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("3"); 
  
  // Go to skip or boost
  click_sorb_button("suggested");
   
  //Schedule Checking getting the schedule on the page
  var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
  var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
  Log.Message(sorb_schedule_just_days + " This is the actual sorb schedule just days");
  //Log.Message(sorb_schedule_days_and_dose + " This is the actual sorb schedule");
 
  //Schedule Checking getting the schedule I am expecting for > 10 schedule days
  var expected_schedule = getting_expected_schedule_by_days("backdate_1day",8);
  Log.Message(expected_schedule);
 
  //Test the results
  var testResult1 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment backdated by one day > 10 day schedule has failed");
  var testResult1_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment backdated by one day > 10 day schedule has failed");
//------------------------------------------------------- 
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
              
 // override for 9 day review period
 override_treatment(9);

 //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days that are expected after sorb
  var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("2"); 
 
 // Go to skip or boost
 click_sorb_button("suggested");
 
 //Schedule Checking getting the schedule on the page
  var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
  var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
  //Log.Message(sorb_schedule_just_days + " This is the actual sorb schedule just days 9 day review");
  //Log.Message(sorb_schedule_days_and_dose + " This is the actual sorb schedule 9 day review");
 
 //Schedule Checking getting the schedule I am expecting for 9 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_1day",7);
 //Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult2 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment backdated by one day 9 day schedule has failed");
 var testResult2_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment backdated by one day 9 day schedule has failed");
//  Log.Message(testResult2 + " //This is testResult2")
//  Log.Message(testResult2_1 + " //This is testResult2_1")
//-------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 // override for 8 day review period
 override_treatment(8);
 
 //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days that are expected after sorb
 var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("1"); 

 // Go to skip or boost
 click_sorb_button("suggested");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
 //Log.Message(sorb_schedule_just_days + " This is the actual sorb schedule just days 8 day review");
 //Log.Message(sorb_schedule_days_and_dose + " This is the actual sorb schedule 8 day review");
 
 //Schedule Checking getting the schedule I am expecting for 8 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_1day",6);
 Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult3 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment backdated by one day 8 day schedule has failed");
 var testResult3_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment backdated by one day 8 day schedule has failed");
//  Log.Message(testResult3 + " //This is testResult3")
//  Log.Message(testResult3_1 + " //This is testResult3_1")
// -------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 // override for 7 day review period
 override_treatment(7);
 
  //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days that are expected after sorb
 var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("0"); 

 // Go to skip or boost
 click_sorb_button("suggested");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
   Log.Message(sorb_schedule_just_days + " This is the actual sorb schedule just days 7 day review");
  Log.Message(sorb_schedule_days_and_dose + " This is the actual sorb schedule 7 day review");
  
 //Schedule Checking getting the schedule I am expecting for 7 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_1day",5);
 Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult4=checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment backdated by one day 7 day schedule has failed");
 var testResult4_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment backdated by one day 7 day schedule has failed");
// Log.Message(testResult4 + " //This is testResult4")
// Log.Message(testResult4_1 + " //This is testResult4_1")
 
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 Log_Off();
 //-------------------
 if(testResult1 && testResult1_1 && testResult2 && testResult2_1 && testResult3 && testResult3_1 && testResult4 && testResult4_1)
 {
 Log.Checkpoint(" Test passed, Suggested tab - Ensure schedule is in the correct order when treatment date is backdated by 1 day for 7,8,9,10 day review periods")
 } 
 else
  Log.Warning("Test has failed, Suggested tab - Ensure schedule is in the correct order when treatment date is backdated by 1 day for 7,8,9,10 day review periods")     
 }
//--------------------------------------------------------------------------------------------------------------------------------------------------
 function tc_Schedule_ordering_suggested_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_2_days_for_7_8_9_10_day_review_periods() 
{
  log_on_cl3_coruscant("cl3@regression","INRstar_5");
  WaitSeconds(10, "Waiting for home page");
  var INRstarV5 = set_system();

  //Adding Patient
  Goto_Add_Patient();
  quick_pt_demographics("SORB Suggested", "Treatment_backdated_two_day", "F");
         
  WaitSeconds(3,"Waiting for patient to be added");
 
  //Adding TP ensure all tablets are ticked        
  Goto_Patient_TreatmentPlan_Add(); 
  WaitSeconds(3,"Waiting for treatment plan page"); 
 
  var w_master_date = aqDateTime.Today();
  var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
    
  quick_pt_treatmentplan("W","", w_start_date);
  WaitSeconds(3,"Waiting for treatment plan to save");
         
  //Add Historic
 
  Goto_Add_Historical();

  var w_date = aqDateTime.AddDays(aqDateTime.Today(), -7);
  var w_day = aqString.SubString(w_date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
  var w_yr = aqString.SubString(w_date,6,4);
    
  quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "7", "Historical Treatment");
 
  //Add Treatment
  WaitSeconds(3, "Waiting for");
  Goto_Patient_New_INR();
  add_treatment("2.3", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-2))));

  //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days that are expected after sorb
  var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("3");   
  
   // Go to skip or boost
  click_sorb_button("suggested");
  
  //Schedule Checking getting the schedule on the page
  var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
  var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
 
  //Schedule Checking getting the schedule I am expecting for > 10 schedule days
  var expected_schedule = getting_expected_schedule_by_days("backdate_2day",7);
 
  //Test the results
  var testResult1 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment backdated 2 days > 10 day schedule has failed");
  var testResult1_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment backdated 2 days > 10 day schedule has failed");
 
//------------------------------------------------------- 
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
              
 // override for 9 day review period
 override_treatment(9);
 
  //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days that are expected after sorb
  var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("2"); 

 // Go to skip or boost
 click_sorb_button("suggested");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
 //Log.Message(sorb_schedule + " This is actual sorb schedule");
 
 //Schedule Checking getting the schedule I am expecting for 9 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_2day",6);
 //Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult2 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment backdated by 2 days, 9 day schedule has failed");
 var testResult2_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment backdated by 2 days, 9 day schedule has failed");
//-------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 // override for 8 day review period
 override_treatment(8);
 
 //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days that are expected after sorb
 var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("1"); 

 // Go to skip or boost
 click_sorb_button("suggested");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
 
 //Schedule Checking getting the schedule I am expecting for 8 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_2day",5);
 
 //Test the results
 var testResult3 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment backdated 2 days 8 schedule has failed");
 var testResult3_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment backdated by one day 8 day schedule has failed");
// -------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 // override for 7 day review period
 override_treatment(7);

 //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days that are expected after sorb
 var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("0"); 
 
 // Go to skip or boost
 click_sorb_button("suggested");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
  
 //Schedule Checking getting the schedule I am expecting for 7 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_2day",4);
 
 //Test the results
 var testResult4=checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment backdated 2 days 7 schedule has failed");
 var testResult4_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment backdated by one day 7 day schedule has failed");

 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 Log_Off();
 //-------------------
 if(testResult1 && testResult2 && testResult3 && testResult4)
 {
 Log.Checkpoint(" Test passed, Suggested tab - Ensure schedule is in the correct order when treatment date is backdated by 2 days for 7,8,9,10 day review periods")
 } 
 else
  Log.Warning("Test has failed, Suggested tab - Ensure schedule is in the correct order when treatment date is backdated by 2 days for 7,8,9,10 day review periods")     
 }
 //--------------------------------------------------------------------------------------------------------------------------------------------------
 function tc_Schedule_ordering_suggested_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_3_days_for_7_8_9_10_day_review_periods() 
{
  log_on_cl3_coruscant("cl3@regression","INRstar_5");
  WaitSeconds(10, "Waiting for home page");
  var INRstarV5 = set_system();

  //Adding Patient
  Goto_Add_Patient();
  quick_pt_demographics("SORB Suggested", "Treatment_backdated_three_day", "F");
         
  WaitSeconds(3,"Waiting for patient to be added");
 
  //Adding TP ensure all tablets are ticked        
  Goto_Patient_TreatmentPlan_Add(); 
  WaitSeconds(3,"Waiting for treatment plan page"); 
 
  var w_master_date = aqDateTime.Today();
  var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
    
  quick_pt_treatmentplan("W","", w_start_date);
  WaitSeconds(3,"Waiting for treatment plan to save");
         
  //Add Historic
 
  Goto_Add_Historical();

  var w_date = aqDateTime.AddDays(aqDateTime.Today(), -7);
  var w_day = aqString.SubString(w_date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
  var w_yr = aqString.SubString(w_date,6,4);
    
  quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "7", "Historical Treatment");
 
  //Add Treatment
  WaitSeconds(3, "Waiting for");
  Goto_Patient_New_INR();
  add_treatment("2.3", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));

  //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days that are expected after sorb
  var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("3"); 
  
  // Go to skip or boost
  click_sorb_button("suggested");
    
  //Schedule Checking getting the schedule on the page
  var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
  var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
 
  //Schedule Checking getting the schedule I am expecting for > 10 schedule days
  var expected_schedule = getting_expected_schedule_by_days("backdate_3day",6);
  //Log.Message(expected_schedule);
 
  //Test the results
  var testResult1 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment backdated 3 days, > 10 day schedule has failed");
  var testResult1_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment backdated by 3 days, > 10 day schedule has failed");

//------------------------------------------------------- 
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
              
 // override for 9 day review period
 override_treatment(9);

 //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days that are expected after sorb
 var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("2"); 
  
 // Go to skip or boost
 click_sorb_button("suggested");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
 
 //Schedule Checking getting the schedule I am expecting for 9 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_3day",5);
 
 //Test the results
 var testResult2 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment backdated 3 days 9 day schedule has failed");
 var testResult2_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment backdated by one day 9 day schedule has failed");
//-------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 // override for 8 day review period
 override_treatment(8);
 
 //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days that are expected after sorb
 var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("1"); 

 // Go to skip or boost
 click_sorb_button("suggested");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
 
 //Schedule Checking getting the schedule I am expecting for 8 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_3day",4);
 
 //Test the results
 var testResult3 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment backdated 3 days, 8 day schedule has failed");
 var testResult3_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment backdated by 3 days, 8 day schedule has failed");
// -------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 // override for 7 day review period
 override_treatment(7);

  //Get Suggested schedule before skip or boost add the extra days into parameter, this is to produce extra days that are expected after sorb
 var suggested_schedule_pre_sorb = return_pending_suggested_treatment_schedule("0"); 
 
 // Go to skip or boost
 click_sorb_button("suggested");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 var sorb_schedule_days_and_dose = Get_SORB_Schedule_days_and_dose();
 //Log.Message(sorb_schedule + " This is actual sorb schedule");
  
 //Schedule Checking getting the schedule I am expecting for 7 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_3day",3);
 //Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult4=checkArrays(sorb_schedule_just_days,expected_schedule, "Testing suggested tab order treatment backdated 3 days, 7 day schedule has failed");
 var testResult4_1 = checkArrays(sorb_schedule_days_and_dose,suggested_schedule_pre_sorb, "Testing days and the dose on suggested tab order treatment backdated by 3 days, 7 day schedule has failed");
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 Log_Off();
 //-------------------
 if(testResult1 && testResult2 && testResult3 && testResult4)
 {
 Log.Checkpoint(" Test passed, Suggested tab - Ensure schedule is in the correct order when treatment date is backdated by 3 days for 7,8,9,10 day review periods")
 } 
 else
  Log.Warning("Test has failed, Suggested tab - Ensure schedule is in the correct order when treatment date is backdated by 3 days for 7,8,9,10 day review periods")     
 }
 //-----------------------------------------------------------------------------------
function tc_Schedule_ordering_current_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_for_today_for_7_8_9_10_day_review_periods() 
{
  log_on_cl3_coruscant("cl3@regression","INRstar_5");
  WaitSeconds(8, "Waiting for home page");
  var INRstarV5 = set_system();

 // Adding Patient
 Goto_Add_Patient();
 quick_pt_demographics("SORB", "Treatment_today", "F");
         
 WaitSeconds(3,"Waiting for patient to be added");
 
 // Adding TP ensure all tablets are ticked        
 Goto_Patient_TreatmentPlan_Add(); 
 WaitSeconds(3,"Waiting for treatment plan page"); 
 
 var w_master_date = aqDateTime.Today();
 var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
    
 quick_pt_treatmentplan("W","", w_start_date);
 WaitSeconds(3,"Waiting for treatment plan to save");
         
 // Add Historic
 Goto_Add_Historical();

  var w_date = aqDateTime.AddDays(aqDateTime.Today(), -7);
  var w_day = aqString.SubString(w_date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
  var w_yr = aqString.SubString(w_date,6,4);
    
  quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "7", "Historical Treatment");
 
  // Add previous treatment for current schedule
  WaitSeconds(3, "Waiting for");
  Goto_Patient_New_INR();
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));

  // Add new pending treatment
  WaitSeconds(3, "Waiting for");
  add_pending_maintenance_treatment('2.2', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (0))))
  
 // Go to skip or boost
 click_sorb_button("current");

 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 Log.Message(sorb_schedule_just_days);
 
  //Schedule Checking getting the schedule I am expecting for > 10 schedule days
 var expected_schedule = getting_expected_schedule_by_days("today",9);
 Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult1 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing current tab order treatment today > 10 day schedule has failed");
 
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 //-------------------------------------------------------         
 // override for 9 day review period
 override_treatment(9);

 // Go to skip or boost on current tab
 click_sorb_button("current");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 Log.Message(sorb_schedule_just_days);

 
 //Schedule Checking getting the schedule I am expecting for 9 schedule days
 var expected_schedule = getting_expected_schedule_by_days("today",8);
 Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult2 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing current tab order treatment today 9 day schedule has failed");
//-------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 // override for 8 day review period
 override_treatment(8);

 // Go to skip or boost on current tab
 click_sorb_button("current");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 Log.Message(sorb_schedule_just_days);
 
 //Schedule Checking getting the schedule I am expecting for 8 schedule days
 var expected_schedule = getting_expected_schedule_by_days("today",7);
 Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult3 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing current tab order treatment today 8 day schedule has failed");
//-------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 // override for 7 day review period
 override_treatment(7);

 // Go to skip or boost on current tab
 click_sorb_button("current");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 Log.Message(sorb_schedule_just_days);
  
 //Schedule Checking getting the schedule I am expecting for 7 schedule days
 var expected_schedule = getting_expected_schedule_by_days("today",6);
 Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult4=checkArrays(sorb_schedule_just_days,expected_schedule, "Testing current tab order treatment today 7 day schedule has failed");

 //Cancel and add next review day check
 cancel_pending_sorb_treatment();

 Log_Off();
//-------------------
 if(testResult1 && testResult2 && testResult3 && testResult4)
 {
 Log.Checkpoint(" Test passed, Current Tab - Ensure schedule is in the correct order when treatment date is for today for 7,8,9,10 day review periods")
 } 
 else
  Log.Warning("Test has failed, Current Tab - Ensure schedule is in the correct order when treatment date is for today for 7,8,9,10 day review periods")     
 }
 //--------------------------------------------------------------------------------------------------------------------------------------------------
 function tc_Schedule_ordering_current_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_1_days_for_7_8_9_10_day_review_periods() 
{
  log_on_cl3_coruscant("cl3@regression","INRstar_5");
  WaitSeconds(10, "Waiting for home page");
  var INRstarV5 = set_system();

  //Adding Patient
  Goto_Add_Patient();
  quick_pt_demographics("SORB", "Treatment_backdated_one_day", "F");
         
  WaitSeconds(3,"Waiting for patient to be added");
 
  //Adding TP ensure all tablets are ticked        
  Goto_Patient_TreatmentPlan_Add(); 
  WaitSeconds(3,"Waiting for treatment plan page"); 
 
  var w_master_date = aqDateTime.Today();
  var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
    
  quick_pt_treatmentplan("W","", w_start_date);
  WaitSeconds(3,"Waiting for treatment plan to save");
         
  //Add Historic
  Goto_Add_Historical();

  var w_date = aqDateTime.AddDays(aqDateTime.Today(), -7);
  var w_day = aqString.SubString(w_date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
  var w_yr = aqString.SubString(w_date,6,4);
    
  quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "7", "Historical Treatment");
 
  //Add previous treatment for current schedule
  WaitSeconds(3, "Waiting for");
  Goto_Patient_New_INR();
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));

  //Add new pending treatment
  add_pending_maintenance_treatment('2.2', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-1)))); 
  
  // Go to skip or boost
  click_sorb_button("current");
 
  //Schedule Checking getting the schedule on the page
  var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 
  //Schedule Checking getting the schedule I am expecting for > 10 schedule days
  var expected_schedule = getting_expected_schedule_by_days("backdate_1day",8);
 
  //Test the results
  var testResult1 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing current tab order treatment backdated 1 day > 10 day schedule has failed");
//------------------------------------------------------- 
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
              
 // override for 9 day review period
 override_treatment(9);

 // Go to skip or boost
 click_sorb_button("current");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 //Log.Message(sorb_schedule + " This is actual sorb schedule");
 
 //Schedule Checking getting the schedule I am expecting for 9 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_1day",7);
 //Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult2 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing current tab order treatment backdated 1 day 9 day schedule has failed");
//-------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 // override for 8 day review period
 override_treatment(8);

 // Go to skip or boost
 click_sorb_button("current");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 
 //Schedule Checking getting the schedule I am expecting for 8 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_1day",6);
 //Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult3 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing current tab order treatment backdated 1 day 8 day schedule has failed");
// -------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 // override for 7 day review period
 override_treatment(7);

 // Go to skip or boost
 click_sorb_button("current");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
  
 //Schedule Checking getting the schedule I am expecting for 7 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_1day",5);
 //Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult4=checkArrays(sorb_schedule_just_days,expected_schedule, "Testing current tab order treatment backdated 1 day 7 day schedule has failed");

 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 Log_Off();
 //-------------------
 if(testResult1 && testResult2 && testResult3 && testResult4)
 {
 Log.Checkpoint(" Test passed, Current tab - Ensure schedule is in the correct order when treatment date is backdated by 1 day for 7,8,9,10 day review periods")
 } 
 else
  Log.Warning("Test has failed, Current tab - Ensure schedule is in the correct order when treatment date is backdated by 1 day for 7,8,9,10 day review periods")     
 }
 //--------------------------------------------------------------------------------------------------------------------------------------------------
 function tc_Schedule_ordering_current_tab_ensure_schedule_is_in_the_correct_order_when_treatment_date_is_backdated_by_2_days_for_7_8_9_10_day_review_periods() 
{
  log_on_cl3_coruscant("cl3@regression","INRstar_5");
  WaitSeconds(10, "Waiting for home page");
  var INRstarV5 = set_system();

  //Adding Patient
  Goto_Add_Patient();
  quick_pt_demographics("SORB Current", "Treatment_backdated_two_day", "F");
         
  WaitSeconds(3,"Waiting for patient to be added");
 
  //Adding TP ensure all tablets are ticked        
  Goto_Patient_TreatmentPlan_Add(); 
  WaitSeconds(3,"Waiting for treatment plan page"); 
 
  var w_master_date = aqDateTime.Today();
  var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
    
  quick_pt_treatmentplan("W","", w_start_date);
  WaitSeconds(3,"Waiting for treatment plan to save");
         
  //Add Historic
  Goto_Add_Historical();

  var w_date = aqDateTime.AddDays(aqDateTime.Today(), -7);
  var w_day = aqString.SubString(w_date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
  var w_yr = aqString.SubString(w_date,6,4);
    
  quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "7", "Historical Treatment");
 
  //Add previous treatment for current schedule
  WaitSeconds(3, "Waiting for");
  Goto_Patient_New_INR();
  add_inr_backdated("2.2", aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-3))));

  //Add new pending treatment
  Goto_Patient_New_INR();
  add_pending_maintenance_treatment('2.2', aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (-2)))); 
  
  // Go to skip or boost
  click_sorb_button("current");
 
  //Schedule Checking getting the schedule on the page
  var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
  Log.Message(sorb_schedule_just_days);
 
  //Schedule Checking getting the schedule I am expecting for > 10 schedule days
  var expected_schedule = getting_expected_schedule_by_days("backdate_2day",7);
  Log.Message(expected_schedule);
 
  //Test the results
  var testResult1 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing current tab order treatment backdated 2 days > 10 day schedule has failed");
//------------------------------------------------------- 
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
              
 // override for 9 day review period
 override_treatment(9);

 // Go to skip or boost
 click_sorb_button("current");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 //Log.Message(sorb_schedule_just_days + " This is actual sorb schedule");
 
 //Schedule Checking getting the schedule I am expecting for 9 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_2day",6);
 //Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult2 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing current tab order treatment backdated 2 days 9 day schedule has failed");
//-------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 // override for 8 day review period
 override_treatment(8);

 // Go to skip or boost
 click_sorb_button("current");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 //Log.Message(sorb_schedule_just_days + " This is actual sorb schedule");
 
 //Schedule Checking getting the schedule I am expecting for 8 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_2day",5);
 //Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult3 = checkArrays(sorb_schedule_just_days,expected_schedule, "Testing current tab order treatment backdated 2 days 8 day schedule has failed");
// -------------------------------------------------------
 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 // override for 7 day review period
 override_treatment(7);

 // Go to skip or boost
 click_sorb_button("current");
 
 //Schedule Checking getting the schedule on the page
 var sorb_schedule_just_days = Get_SORB_Schedule_just_days();
 Log.Message(sorb_schedule_just_days + " This is actual sorb schedule");
  
 //Schedule Checking getting the schedule I am expecting for 7 schedule days
 var expected_schedule = getting_expected_schedule_by_days("backdate_2day",4);
 Log.Message(expected_schedule + " THis is my calculated expected result");
 
 //Test the results
 var testResult4=checkArrays(sorb_schedule_just_days,expected_schedule, "Testing current tab order treatment backdated 2 days 7 day schedule has failed");

 //Cancel and add next review day check
 cancel_pending_sorb_treatment();
 
 Log_Off();
 
  //-------------------
 if(testResult1 && testResult2 && testResult3 && testResult4)
 {
 Log.Checkpoint(" Test passed, Current tab - Ensure schedule is in the correct order when treatment date is backdated by 2 days for 7,8,9,10 day review periods")
 } 
 else
  Log.Warning("Test has failed, Current tab - Ensure schedule is in the correct order when treatment date is backdated by 2 days for 7,8,9,10 day review periods")     
 }
 //--------------------------------------------------------------------------------------------------------------------------------------------------
