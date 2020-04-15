//USEUNIT System_Paths
//--------------------------------------------------------------------------------
function tsv_logoff_inrstar(teststep, testdata) 
{      
  var test = teststep;
  var data = testdata;
  
  if (test == 1)  
  {
    var INRstarV5 = INRstar_base();
    var login_error_box = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("LoginArea").Panel("Logon").TextNode(0);           
    var error_mess = login_error_box.contentText;
          
    if (data == error_mess)  
    {  
      //Log.Checkpoint('Login - Log on to INRstar with no credentials');
      return true;
    }
    else
    {
      //Log.Warning('Login - Log on to INRstar with no credentials'); 
      return false;                   
    }
  }         
  
  
  else if(test == 2) 
  {
    var INRstarV5 = INRstar_base();         
    var login_welcome_mess = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("Disclaimer").TextNode("Welcome");
    var welcome_mess = login_welcome_mess.contentText;
    
    if (data == welcome_mess)
    {
      Log.Message(welcome_mess);
      Log.Checkpoint('Login - Log off INRstar');                 
    }
    else
    {
      Log.Warning('Login - Log off INRstar'); 
    }
  }
}
//--------------------------------------------------------------------------------