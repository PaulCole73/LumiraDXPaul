//USEUNIT TSA_Login
//USEUNIT TSV_Login
//USEUNIT TSV_Logoff
//--------------------------------------------------------------------------------
function tc_log_on_to_inrstar_valid_credentials()
{
  try
  {
    var test_title = 'Login - Log on to INRstar valid credentials'
    login('cl3@regression','INRstar_5','Shared');
    tsv_login_inrstar('1','cl3 @ Deans Regression Testing Location'); 
    Log_Off();
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  }   
}
//--------------------------------------------------------------------------------
function tc_log_on_to_inrstar_no_credentials()
{
  try
  {
    var test_title = 'Login - Log on to INRstar no credentials'
    login('','','');
    tsv_logoff_inrstar('1','The login details are incorrect, please re-enter');
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  } 
}
//--------------------------------------------------------------------------------
function tc_log_off_inrstar()
{
  try
  {
    var test_title = 'Login - Log on to INRstar valid credentials'
    login('cl3@regression','INRstar_5','Shared');
    Log_Off();
    tsv_logoff_inrstar('2','Welcome to the INRstar anticoagulation monitoring system.'); 
  }
  catch(e)
  {
    Log.Warning('Test "' + test_title + '" FAILED Exception Occured = ' + e);
    restart_INRstar();
  } 
}
//--------------------------------------------------------------------------------
//function tc_password_reset_code_email()
//{
// login('','','password_reset_section');
// tsv_login_inrstar_reset_email('1', 'Password Reset Request');
// login('cl3@regression','','password_reset_email_code');
// RunHotmail('regression_user@hotmail.com ','INRstar_5');
// tsv_hotmail_reset_code('');
//}
////--------------------------------------------------------------------------------
//
////Change_users_password

//tsv_login_inrstar_use_email_code();

//--------------------------------------------------------------------------------

//Hyperlinks_are_working