//USEUNIT TSA_Login
//USEUNIT TSV_Login
//USEUNIT TSA_Logoff
//USEUNIT TSV_Logoff
//USEUNIT Tested_Apps

//--------------------------------------------------------------------------------
function tc_log_on_to_inrstar_valid_credentials()
{
 login('c');
 tsv_login_inrstar('1','Deans Regression Testing Location');
 logoff('Shared');
}
////--------------------------------------------------------------------------------
function tc_log_on_to_inrstar_no_credentials()
{
 login('','','');
 tsv_logoff_inrstar('1','The login details are incorrect, please re-enter');
}
//--------------------------------------------------------------------------------
function tc_log_off_inrstar()
{
 login('');
 logoff('Shared');
 tsv_logoff_inrstar('2','Welcome to the INRstar anticoagulation monitoring system.'); 
}
//--------------------------------------------------------------------------------
function tc_password_reset_code_email()
{
 login('','','password_reset_section');
 tsv_login_inrstar_reset_email('1', 'Password Reset Request');
 login('cl3@regression','','password_reset_email_code');
 RunHotmail('');
 tsv_hotmail_reset_code('');
}
//--------------------------------------------------------------------------------

//Change_users_password

//tsv_login_inrstar_use_email_code();

//--------------------------------------------------------------------------------

//Hyperlinks_are_working