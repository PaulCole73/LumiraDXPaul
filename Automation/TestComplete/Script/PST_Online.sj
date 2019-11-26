//USEUNIT PST_Common

//=======================================================================================================

// pst_tests();

//=======================================================================================================


function RunYahoo()
{ 
  Browsers.Item(btIExplorer).Run("https://login.yahoo.com/config/mail?&.src=ym&.intl=uk");
  browser = Aliases.iexplore1;
  form = browser.pageYahooLogin.panelMbrDesktop.fieldsetMbrLoginFieldset.formMbrLoginForm;
  textbox = form.panelInputs.textboxLoginUsername;
  textbox.Click(62, 19);
  textbox.SetText("deaninrstar@yahoo.com");
  button = form.buttonLoginSignin;
  button.ClickButton();
  form.panelPasswdField.passwordboxLoginPasswd.SetText("");
  button.ClickButton();
}
  function navigate_through_list()
  {
  var page = Sys.Browser("iexplore").Page("*")
  var panelMSGList = page.Panel("main").Panel("paneshell").Panel("shellcontent").Panel("shellinner").Panel("inboxcontainer").Panel("msg_list")
  
  Sys.HighlightObject(panelMSGList)
  
  var panel1 = panelMSGList.Panel("yui_3_16_0_1_1457107738334_525")
  var panel2 = panel1.Panel("yui_3_16_0_1_1457107738334_169")
  var panel3 = panel2.Panel("yui_3_16_0_1_1457107738334_1226")
  var panel4 = panel3.Panel("yui_3_16_0_1_1457107738334_1355")
  var panel5 = panel4.Panel("yui_3_16_0_1_1457107738334_422_0")
  var panel6 = panel5.Panel(1)
  var panel7 = panel6.Panel(1)
  var text = panel7.TextNode(0)
  
  Sys.HighlightObject(text)
  
  }
//=======================================================================================================
  
  
//  
//  function check_pat_overdue_noac_review(driver)
//
//{
//    var INRstarV5 = set_system();
//    WaitSeconds(2,"Waiting for Home");
//    
//    home_page();
//   
//    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
//    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
//   
//   // Open the overdue report list
//    panelUCR.Link("OverdueReviewPatientHeaderLink").Click();
//    WaitSeconds(2,"Opening non-warfarin Overdue Report");
//    var table = panelUCR.Panel("OverdueReviewPatients").Table("PatientOverdueReviewReportTable");
//    
//    var wf_found = false;
//    
//          for (i=1; i<table.rowcount; i++)
//            {
//               if(table.Cell(i, 0).contentText==driver.Value(4) + ", " + driver.Value(5))
//                {
//                  Log.Message("Found " + driver.Value(4)+ ", " + driver.Value(5))
//                   
//                     //Drug
//                     test_data(table.Cell(i, 1).contentText,driver.Value(43));
//                     Log.Message(driver.Value(43) + " Found and matched");
//                     
//                     //Born
//                     test_data(table.Cell(i, 2).contentText,driver.Value(19));
//                     Log.Message(driver.Value(19) + " Found and matched");
//                     
//                     // Telephone number - Need more here if checking for blanks
//                     test_data(table.Cell(i, 3).contentText,driver.Value(6));
//                     Log.Message(driver.Value(6) + " Found and matched");
//                     
//                     //NHS Number
//                     test_data(table.Cell(i, 4).contentText,driver.Value(20));
//                     Log.Message(driver.Value(20) + " Found and matched");
//                    
//                     //Patient Number - Need more here if checking for blanks, says none if blank
//                     test_data(table.Cell(i, 5).contentText,driver.Value(15));
//                     Log.Message(driver.Value(15) + " Found and matched");
//                     
//                     //Review Date
//                     test_data(table.Cell(i, 6).contentText,driver.Value(66));
//                     Log.Message(driver.Value(66) + " Found and matched");
//                     
//                     //Days Overdue
//                     test_data(table.Cell(i, 7).contentText,driver.Value(67));
//                     Log.Message(driver.Value(67) + " Found and matched");
//                     
//                     i = table.rowcount;
//                     wf_found = true;
//                }
//            }
//            if (wf_found == false )
//              Log.warning("Not Found " + driver.Value(4)+ ", " + driver.Value(5))
//}
////=======================================================================================================
//
//
function RunHotmail()
{
  Browsers.Item(btIExplorer).Run("http://www.hotmail.com");
  var form;
  var emailInput;
  Browsers.Item(btIExplorer).Navigate("https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=12&ct=1456936617&rver=6.4.6456.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fmail.live.com%2Fdefault.aspx%3Frru%3Dinbox&lc=2057&id=64855&mkt=en-gb&cbcxt=mai");
  form = Aliases.iexplore1.pageSignIn.formF1;
  emailInput1 = form.emailinputI0116;
  form.panelIddivPwdUsernameexample.Click(23, 7);
  emailInput1.Keys("dean.inrstar@hotmail.com");
  
  panel = Aliases.iexplore1.pageSignIn.formF1.panelIddivPwdPasswordtb;
  panel.panelIddivPwdPasswordexample.Click(53, 13);
  panel.passwordboxI0118.SetText("");
}
