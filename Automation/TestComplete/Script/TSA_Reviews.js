//USEUNIT System_Paths
//USEUNIT Navigation
//USEUNIT Navigate_Patient
//USEUNIT V5_Common_Batch
//--------------------------------------------------------------------------------
function cancel_review()
{
  var add_review_form_buttons_path = add_review_form_buttons();
  add_review_form_buttons_path.Button("CancelWarfarinReviewLink").Click();
} 
//--------------------------------------------------------------------------------
function add_warfarin_review_new_review_button()
{
  Goto_Patient_TreatmentPlan_Review_New();
  var add_review_form_buttons_path = add_review_form_buttons();
  add_review_form_buttons_path.Button("SaveWarfarinReviewLink").Click();
} 
//--------------------------------------------------------------------------------
function add_non_warfarin_review(new_tp,data_req,rev_date,weight,creatinine)
{
  if(new_tp=='')
  {
  Goto_Patient_TreatmentPlan_Review_New();
  }
  
  var INRstarV5 = INRstar_base(); 
  var add_review_form_path = add_review_form();
  
  //Summary - Review Date
  if (rev_date!='')
    {
      add_review_form_path.Panel(0).Panel("ReviewDate").Image("calendar_png").Click();
      datepicker = INRstarV5.Panel("ui_datepicker_div");
              
      var w_yr = aqString.SubString(start_date,6,4);
      var w_mth = aqConvert.StrToInt(aqString.SubString(start_date,3,2));
      var w_day = aqString.SubString(start_date,0,2);
           
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
  WaitSeconds(2);
  
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
