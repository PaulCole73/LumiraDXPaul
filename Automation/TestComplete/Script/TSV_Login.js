//USEUNIT System_Paths
//--------------------------------------------------------------------------------
function tsv_login_inrstar(teststep,testdata) 
{      
var test = teststep;
var data = testdata;
      
var INRstarV5 = INRstar_base();
var location_credential_box = INRstarV5.Panel("MainPage").Panel("header").Panel("logindisplay").Panel("LoginStatus").TextNode(0);           

var credential_box = location_credential_box.contentText;

//Checking if your username and password is in the top of the screen
      
        if (test == 1)             
             {       
               if (data == credential_box)
                  {
                   Log.Checkpoint('Login - Log on to INRstar valid credentials');
                  }
                   else
                    Log.Warning('Login - Log on to INRstar valid credentials');
             }
}       
//--------------------------------------------------------------------------------
             
//Checking if you are on the password reset page

function tsv_login_inrstar_reset_email(teststep,testdata) 
{      
var test = teststep;
var data = testdata;

var INRstarV5 = INRstar_base();
var password_reset_title = INRstarV5.Panel("MainPage").Panel("main").Panel("ResetPasswordWrapper").TextNode(0);
var title = password_reset_title.contentText;    
              
         if(test == 1) {
                 if (data != title)
                 {
                  Log.Warning("Not on the right page, title not found - Fail");                        
                 }
               }
}
//--------------------------------------------------------------------------------
function tsv_hotmail_reset_code()
{

var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"); 
var d = new Date(); 
var curr_date = d.getDate(); 
var curr_month = d.getMonth(); 
var curr_year = d.getFullYear(); 
var email_date = (curr_date + " " + m_names[curr_month] + " " + curr_year);

var hotmail = Sys.Browser("iexplore").Page("https://outlook.live.com/owa/").Panel(1).Panel(0).Panel("primaryContainer").Panel(3).Panel(0).Panel(0).Panel(0).Panel(3).Panel(2).Panel(0)
var hotmail_email= hotmail.Panel(0).Panel(0).Panel(0).Panel(0).Panel(4).Panel(2).Panel(0).Panel(2).Panel(0).Panel(0).Panel(0).Panel(1).Panel("ariaId_*").Panel(1)
var hotmail_email_content = hotmail_email.contentText;

 Log.Message(hotmail_email_content)
 Log.Message(email_date)
        // IF this gets run again then look at aqstring as the contains doesn't work properly
        if (aqString.Contains(hotmail_email_content,'INRstar Password Reset Request') && aqString.Contains (hotmail_email_content,'email_date'))
                    {
                      Log.Checkpoint("TC_Password_Reset_Code_Email - Pass");
                     }
                        else Log.Warning("TC_Password_Reset_Code_Email - Fail");
            }
//--------------------------------------------------------------------------------
function validate_user_logged_in(username)
{
  var obj = INRstar_base().NativeWebObject.Find("idStr", "LoginStatus");
  
  if(obj.Exists)
  {
    var temp = aqString.Find(obj.contentText, username);
    if(temp != -1)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  else
  {
    return false;
  }
}