//USEUNIT System_Paths

//--------------------------------------------------------------------------------

function tsv_logoff_inrstar(teststep,testdata) 
{      
var test = teststep;
var data = testdata;

//Checking if you have an error message

        if (test == 1)   {
              var INRstarV5 = set_system_login_page();
               var login_error_box = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("LoginArea").Panel("Logon").TextNode(0);
            
            var error_mess = login_error_box.contentText;
             {       
               if (data == error_mess)
                  {
                   Log.Checkpoint("Logoff Inrstar");                 
                  }
                  else 
                   Log.Warning("Logoff Inrstar - Fail"); 
             }
             }
             
//Checking if you have logged out succesfully
                
      else if(test == 2) {
              var INRstarV5 = set_system_login_page();
             
        var login_welcome_mess = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("Disclaimer").TextNode("Welcome");
        var welcome_mess = login_welcome_mess.contentText;
              {
                 if (data == welcome_mess)  
                  {
                  Log.Checkpoint("Log On To INRstar With No Details");
                  }
                   else
                    Log.Warning("Log On To INRstar With No Details - Fail");                    
              }
              }
}
//--------------------------------------------------------------------------------

//
//function tsv_logoff_inrstar_2(teststep,testdata) 
//{      
//var test = teststep;
//var data = testdata;
//
////Checking if you have an error message
//
//        if (test == 1 && data == login_error_box)   {
//               var INRstarV5 = set_system_login_page();
//               var login_error_box = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("LoginArea").Panel("Logon").TextNode(0);
//               var error_mess = login_error_box.contentText;
//                  {
//                   Log.Checkpoint("Logoff_Inrstar");                 
//                  }
//                  else
//                   Log.Warning("Logoff_Inrstar - Fail"); 
//             }
////Checking if you have logged out succesfully
//                
//      else if(test == 2) {
//        var INRstarV5 = set_system_login_page();
//        var login_welcome_mess = INRstarV5.Panel("MainPage").Panel("main").Panel("LogonPage").Panel("LogonFormWrapper").Form("Logon").Panel("Disclaimer").TextNode("Welcome");
//        var welcome_mess = login_welcome_mess.contentText;
//              {
//                 if (data == welcome_mess)  
//                  {
//                  Log.Checkpoint("Log_On_To_INRstar_With_No_Details");
//                  }
//                   else
//                    Log.Warning("Log_On_To_INRstar_With_No_Details - Fail");                    
//              }
//              }
//}





