//USEUNIT V5_SQL
//USEUNIT Home_Page_Regression_Quick_Checking

//===============================================================================

// Checking the overdue a non warfarin review message

function test_overdue_noac_review()
{

// Read input file

    //driver = DDT.ExcelDriver("Q:\\Development and Testing\\Testing\\TestComplete_Test_Data\\deans_regression_patients_home_page.xls","Patient_Full_Columns");
    driver = DDT.ExcelDriver("C:\\Automation_Driver_File\\deans_regression_patients_home_page.xls","Patient_Full_Columns");
    
    // log_on_cl3();
    WaitSeconds(2);
     
    // for each record, check if the patient should be on the message
    while (!driver.EOF())
    {
          if (driver.Value(44) == "Overdue NOAC review")
          {
             if (driver.Value(45) == "Yes")
                {
                    check_pat_overdue_noac_review(driver);
                }
                 else
                    check_pat_not_overdue_noac_review(driver);        
          }
            driver.Next();
    }
}

//-----------------------------------------------------------------------------

function check_pat_overdue_noac_review(driver)

{
    var INRstarV5 = set_system();
    WaitSeconds(2,"Waiting for Home");
    
    home_page();
   
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   
   // Open the overdue report list
    panelUCR.Link("OverdueReviewPatientHeaderLink").Click();
    WaitSeconds(2,"Opening non-warfarin Overdue Report");
    var table = panelUCR.Panel("OverdueReviewPatients").Table("PatientOverdueReviewReportTable");
    
    var wf_found = false;
    
          for (i=1; i<table.rowcount; i++)
            {
               if(table.Cell(i, 0).contentText==driver.Value(4) + ", " + driver.Value(5))
                {
                  Log.Message("Found " + driver.Value(4)+ ", " + driver.Value(5))
                   
                     //Drug
                     test_data(table.Cell(i, 1).contentText,driver.Value(43));
                     Log.Message(driver.Value(43) + " Found and matched");
                     
                     //Born
                     test_data(table.Cell(i, 2).contentText,driver.Value(19));
                     Log.Message(driver.Value(19) + " Found and matched");
                     
                     // Telephone number - Need more here if checking for blanks
                     test_data(table.Cell(i, 3).contentText,driver.Value(6));
                     Log.Message(driver.Value(6) + " Found and matched");
                     
                     //NHS Number
                     test_data(table.Cell(i, 4).contentText,driver.Value(20));
                     Log.Message(driver.Value(20) + " Found and matched");
                    
                     //Patient Number - Need more here if checking for blanks, says none if blank
                     test_data(table.Cell(i, 5).contentText,driver.Value(15));
                     Log.Message(driver.Value(15) + " Found and matched");
                     
                     //Review Date
                     test_data(table.Cell(i, 6).contentText,driver.Value(66));
                     Log.Message(driver.Value(66) + " Found and matched");
                     
                     //Days Overdue
                     test_data(table.Cell(i, 7).contentText,driver.Value(67));
                     Log.Message(driver.Value(67) + " Found and matched");
                     
                     i = table.rowcount;
                     wf_found = true;
                }
            }
            if (wf_found == false )
              Log.warning("Not Found " + driver.Value(4)+ ", " + driver.Value(5))
}
//-----------------------------------------------------------------------------

function check_pat_not_overdue_noac_review(driver)
{
    var INRstarV5 = set_system();
    Log.Message("Checking the patient");
    WaitSeconds(2,"Waiting for Home");
    
    home_page();
   
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
   
   // Open the overdue report list
    panelUCR.Link("OverdueReviewPatientHeaderLink").Click();
    WaitSeconds(2,"Opening non-warfarin Overdue Report");
    var table = panelUCR.Panel("OverdueReviewPatients").Table("PatientOverdueReviewReportTable");
    
    var wf_found = false;
    
    for (i=1; i<table.rowcount; i++)
      {
         if(table.Cell(i, 0).contentText==driver.Value(4) + ", " + driver.Value(5))
             {  
               i = table.rowcount;
               wf_found = true;
               Log.warning("Found " + driver.Value(4)+ ", " + driver.Value(5))
             } 
      }                   
   if (wf_found == false )
    Log.Message("Not Found " + driver.Value(4)+ ", " + driver.Value(5))  

}
//-----------------------------------------------------------------------------
function test_data(data_1,data_2)
{
 //Sys.HighlightObject(data_1,4);
  if (data_1!= data_2)
   Log.Warning("//" + data_1 + "//" + data_2 + "//");
}
//-------------------------------------------------------------------------------


