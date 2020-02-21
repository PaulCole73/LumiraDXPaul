//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function cancel_review()
{
  var add_review_form_buttons_path = add_review_form_buttons();
  var obj = add_review_form_buttons_path.Button("CancelWarfarinReviewLink");
  click_navigation_wrapper(obj, main_patient_tab(), "idStr", "AnnualReviewWrapper", 3);
} 
//--------------------------------------------------------------------------------
function add_warfarin_review_new_review_button()
{
  Goto_Patient_Treatment_Plan_Review_New();
  var add_review_form_buttons_path = add_review_form_buttons();
  add_review_form_buttons_path.Button("SaveWarfarinReviewLink").Click();
  
  WaitSeconds(2, "Waiting for treatment plan tab...");
} 
//--------------------------------------------------------------------------------
function add_non_warfarin_review(new_tp,data_req,rev_date,weight,creatinine)
{
  if(new_tp=='')
  {
      Goto_Patient_Treatment_Plan_Review_New();
  }
  
  var INRstarV5 = INRstar_base(); 
  var add_review_form_path = add_review_form();
  
  //Summary - Review Date
  if (rev_date!='')
    {
      add_review_form_path.Panel(0).Panel("ReviewDate").Image("calendar_png").Click();
      datepicker = INRstarV5.Panel("ui_datepicker_div");
              
      var w_yr = aqString.SubString(rev_date,6,4);
      var w_mth = aqConvert.StrToInt(aqString.SubString(rev_date,3,2));
      var w_day = aqString.SubString(rev_date,0,2);
           
      datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
      datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
      select_day(w_day, datepicker);
    }
  
  //Test results path
  var add_review_form_test_results_path = add_review_form_test_results();
    
  //Test Results - Weight
  if (weight!='')
  {
    add_review_form_test_results_path.Panel("Question_TR_Weight").Textbox("TR_Weight").Text = weight;
  } 
  
  //Test Results - Creatinine
  if (creatinine!='')
  {
   add_review_form_test_results_path.Panel("Question_TR_Creatinine").Textbox("TR_Creatinine").Text = creatinine;
  } 
  WaitSeconds(1);
  
  //Test Results - Creatinine clearance 
  if (creatinine && weight !='')
  {
    add_review_form_test_results_path.Panel("Question_TR_Creatinine").Textbox("TR_Creatinine").Keys("[Enter]");
    add_review_form_test_results_path.Panel("Question_TR_CreatinineClearance").Button("TR_CreatinineClearance_Button").Click();
  } 
  
  //Dosing
  var add_review_form_dose_path = add_review_form_dose();
  add_review_form_dose_path.Select("reviewAnswers_9_value").ClickItem(2);
  
  //Get the review data - May want to get the data before save so if you want the data pass in data parameter
  if(data_req!='')
  {
   var review_data = get_apixaban_review_data_before_save();
  } 
  
  var add_review_form_buttons_path = add_review_form_buttons();
  add_review_form_buttons_path.Button("SaveWarfarinReviewLink").Click();

  return review_data;
  
  WaitSeconds(2, "Waiting after Review...");
}
//--------------------------------------------------------------------------------
function get_apixaban_review_data_before_save()
{
  var add_review_form_test_results_path = add_review_form_test_results();
  
  //At the moment this is just for prooving the data values for weight and creatinine clearance
  rev_data = new Array();
  
  var weight = add_review_form_test_results_path.Panel("Question_TR_Weight").Textbox("TR_Weight").Text;
  var clearance = add_review_form_test_results_path.Panel("Question_TR_CreatinineClearance").Textbox("TR_CreatinineClearance").Text;
  
  rev_data.push(weight,clearance)
  
  return rev_data;
} 
//--------------------------------------------------------------------------------
function get_review_tab_data()
{
  var review_history_tab_data_path = review_history_tab_data();
  
  rev_data = new Array();
  
  var weight = review_history_tab_data_path.Cell(1, 5).contentText;
  var clearance = review_history_tab_data_path.Cell(1, 6).contentText;
  
  rev_data.push(weight,clearance);
  
  return rev_data;
} 
//--------------------------------------------------------------------------------
function edit_next_review_date(next_rev_date)
{
  var review_next_date_data_path = review_tab_edit_next_date_data();
  var INRstarV5 = INRstar_base();
  
  review_next_date_data_path.Button("EditNextReviewDate").Click();
  INRstarV5.Panel(3).Panel("modalDialogBox").Panel(0).Form("AnnualReviewWrapper").Image("calendar_png").click();
  datepicker = INRstarV5.Panel("ui_datepicker_div");
              
  var w_yr = aqString.SubString(next_rev_date,6,4);
  var w_mth = aqConvert.StrToInt(aqString.SubString(next_rev_date,3,2));
  var w_day = aqString.SubString(next_rev_date,0,2);
           
  datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, datepicker);
  
  INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).TextNode(0).click();  
}
//--------------------------------------------------------------------------------
function get_next_review_date_warning()
{
  var review_next_date_data_path = review_tab_data();
  
  var review_next_date_message = review_next_date_data_path.Panel("PatientNextReviewDateWarning").Fieldset(0).Panel("Messages").TextNode(0).contentText;
  
  return review_next_date_message;
}
//--------------------------------------------------------------------------------
function add_basic_review_doac(itemText)
{
  Goto_Patient_Treatment_Plan_Review_New();
    
  var add_review_form_dose_path = add_review_form_dose();
  add_review_form_dose_path.Select("reviewAnswers_9_value").ClickItem(itemText);
    
  var add_review_form_buttons_path = add_review_form_buttons();
  add_review_form_buttons_path.Button("SaveWarfarinReviewLink").Click();
  
  WaitSeconds(2, "Waiting for Review...");
}
//--------------------------------------------------------------------------------
function add_basic_review_heparin(itemText)
{
  Goto_Patient_Treatment_Plan_Review_New();
    
  var add_review_form_dose_path = add_review_form_dose();
  add_review_form_dose_path.Select("reviewAnswers_11_value").ClickItem(itemText);
  
  date = aqConvert.StrToDate(aqDateTime.Today());
  
  var INRstarV5 = INRstar_base();
  var add_review_form_path = add_review_form();
  add_review_form_path.Panel(0).Panel("WarfarinNextReviewDatePanel").Panel("NextReviewDate").Panel(0).Image("calendar_png").Click();
  datepicker = INRstarV5.Panel("ui_datepicker_div");
              
  var w_yr = aqString.SubString(date,6,4);
  var w_mth = aqConvert.StrToInt(aqString.SubString(date,3,2));
  var w_day = aqString.SubString(date,0,2);
           
  datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, datepicker);
    
  var add_review_form_buttons_path = add_review_form_buttons();
  add_review_form_buttons_path.Button("SaveWarfarinReviewLink").Click();
}
//--------------------------------------------------------------------------------
function add_basic_review_aceno(itemText)
{
  Goto_Patient_Treatment_Plan_Review_New();
    
  var add_review_form_dose_path = add_review_form_dose();
  var review_form = add_review_form();
  var inr_textbox = review_form.Panel(0).Panel(3).Panel("WarfarinTestResultsPanel").Panel("Question_TR_InrResult").Textbox("TR_InrResult");
  
  inr_textbox.Text = "2.5";
  add_review_form_dose_path.Select("optionSelect1").ClickItem(itemText);
  
  date = aqConvert.StrToDate(aqDateTime.Today());
  
  var INRstarV5 = INRstar_base();
  var add_review_form_path = add_review_form();
  add_review_form_path.Panel(0).Panel("WarfarinNextReviewDatePanel").Panel("NextReviewDate").Panel(0).Image("calendar_png").Click();
  datepicker = INRstarV5.Panel("ui_datepicker_div");
              
  var w_yr = aqString.SubString(date,6,4);
  var w_mth = aqConvert.StrToInt(aqString.SubString(date,3,2));
  var w_day = aqString.SubString(date,0,2);
           
  datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  select_day(w_day, datepicker);
    
  var add_review_form_buttons_path = add_review_form_buttons();
  add_review_form_buttons_path.Button("SaveWarfarinReviewLink").Click();
}
//--------------------------------------------------------------------------------
function add_review(drug)
{
  if(drug == "Apixaban")
  {
    add_basic_review_doac("2.5 mg - Twice daily");
  }
  else if(drug == "Dabigatran")
  {
    add_basic_review_doac("110 mg - Twice daily");
  }
  else if(drug == "Edoxaban")
  {
    add_basic_review_doac("15 mg - Daily");
  }
  else if(drug == "Rivaroxaban")
  {
    add_basic_review_doac("2.5 mg - Twice daily");
  }
  else if(drug == "Dalteparin (LMWH)")
  {
    add_basic_review_heparin("5,000 IU - Daily");
  }
  else if(drug == "Enoxaparin (LMWH)")
  {
    add_basic_review_heparin("20mg once daily");
  }
  else if(drug == "Acenocoumarol")
  {
    add_basic_review_aceno("5");
  }
  else if(drug == "W" || drug == "Warfarin")
  {
    add_warfarin_review_new_review_button();
  }
}
//--------------------------------------------------------------------------------