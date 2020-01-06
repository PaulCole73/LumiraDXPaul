//USEUNIT engage_Navigation
//USEUNIT Misc_Functions
//USEUNIT engage_Misc_Functions
//USEUNIT TSA_engage_Retrieve_Login_Code
//USEUNIT engage_System_Paths
//USEUNIT System_Paths
//USEUNIT engage_Popup_Handlers
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function log_off_engage()
{
  engage_navigation_menu_button().Click();
  engage_navigation_signout_button().Click();
  WaitSeconds(2, "Waiting to log off...");
}
//--------------------------------------------------------------------------------
function register_engage(email_address)
{
  Sys.Browser("chrome").BrowserWindow(0).Maximize();
  Sys.Browser("chrome").BrowserWindow(0).SetFocus();  

  //Open engage and request code
  engage_signin_register_tab().Click();
    
  //enter email into email box
  engage_username_register().SetText(email_address);
  WaitSeconds(2);
  engage_send_code_register().Click();
  WaitSeconds(2);
      
  //request code from engage
  var code = get_engage_login_code();
  
  process_engage_popup("PopUp__Container--1SBUF PopUp__ContainerLoaded--30PKc", "It's on its way", "OK");
  WaitSeconds(2);
  //enter received code into ID box 
  engage_code_register().SetText(code);
  engage_next_button_register().Click();
  WaitSeconds(2);
    
  //set password for engage
  var password = get_login_details(20);
  engage_set_new_password().SetText(password);
  engage_confirm_new_password().SetText(password);
  engage_password_confirm_button().Click();
  WaitSeconds(2);
  
  process_engage_popup("PopUp__Container--1SBUF PopUp__ContainerLoaded--30PKc", "Your password has been reset", "OK");
  WaitSeconds(2);
}
//--------------------------------------------------------------------------------
function sign_in_engage(email_address)
{
  var password = get_login_details(20);
  engage_username_login().SetText(email_address);
  engage_password_login().SetText(password);
  engage_sign_in_button().Click();
  WaitSeconds(2);
}
//--------------------------------------------------------------------------------
function complete_eula_questionnaire()
{
  engage_base().Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(2).Panel(0).Panel("question_checkbox_objectobject_").Panel(1).Click();
  engage_base().Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(2).Panel(0).Panel("question_checkbox_objectobject_").Panel(1).Click();
  engage_base().Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(2).Button("button_home_questionnaire_submit").Click();
  
  process_engage_popup("PopUp__Container--1SBUF PopUp__ContainerLoaded--30PKc", "Agreements Complete", "OK");
  WaitSeconds(2);
}
//--------------------------------------------------------------------------------
function get_schedule_data()
{
  Goto_Understand_Schedule_Tab();
  var box = engage_dosing_schedule();
  var data = box.textContent;
 
  var string_array = new Array();
  string_array = data.split("\n\n");
 
  var schedule_data = new Array();
 
  for(var i = 2; i < string_array.length; i++)
  {
    aqString.Remove(string_array[i], 0, 1);
    var length = aqString.GetLength(string_array[i]);
   
    for(var j = 0; j < length; j++)
    {
      var char = aqString.GetChar(string_array[i], 0);
      if(char == " ")
      {
        break;
      }
      else
      {
        string_array[i] = aqString.Remove(string_array[i], 0, 1);
      }
    }
  }
 
  for(var i = 2; i < string_array.length; i++)
  {
    schedule_data.push(string_array[i]);
  }
 
  return schedule_data;
}
//--------------------------------------------------------------------------------
function submit_INR_with_answers(INR,match,dose,medication,bleeding,missed)
{
  //INR selector
  engage_base().Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(0).Panel(0).Panel("question_select_objectobject_").Panel(1).Select(0).ClickItem(INR);
  //INR match machine - match should be 0 for Yes or 1 for No
  engage_base().Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel("question_radio_objectobject_").Panel(1).Panel(0).Label(match).TextNode(0).Click();
  //dose selector
  engage_base().Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(2).Panel(0).Panel("question_textrange_objectobject_").Panel(1).Select(0).ClickItem(dose);
  //medication change - medication should be 0 for Yes or 1 for No
  engage_base().Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(3).Panel(0).Panel("question_radio_objectobject_").Panel(1).Panel(0).Label(medication).TextNode(0).Click();
  //bleeding symptoms - bleeding should be 0 for Yes or 1 for No
  engage_base().Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(4).Panel(0).Panel("question_radio_objectobject_").Panel(1).Panel(0).Label(bleeding).TextNode(0).Click();
  //missed dose - missed should be 0 for Yes or 1 for No
  engage_base().Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(5).Panel(0).Panel("question_radio_objectobject_").Panel(1).Panel(0).Label(missed).TextNode(0).Click();
  //submit button
  engage_base().Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0).Panel(0).Panel(7).Button("button_home_anticoagulation_questionnaire_submit").Click();
  
  //date and time submitted
  var submitted_date_time = aqConvert.DateTimeToFormatStr(aqDateTime.Now(), "%A %d-%b-%Y at %H:%M");
    
  process_engage_popup("PopUp__Container--1SBUF PopUp__ContainerLoaded--30PKc", "INR Test Complete", "OK");
  WaitSeconds(2);
  
  return submitted_date_time;
}