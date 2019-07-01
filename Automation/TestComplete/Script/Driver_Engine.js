//Create the patient data

function add_patient_and_data()
{

// Read input file

    driver = DDT.ExcelDriver("Q:\\Development and Testing\\Testing\\TestComplete_Test_Data\\deans_regression_patients_home_page.xls","Patient_Full_Columns");
//      driver = DDT.ExcelDriver("C:\\Automation_Driver_File\\deans_regression_patients_home_page.xls","Patient_Full_Columns");
    
    log_on_cl3();
   
     WaitSeconds(10,"");
     
    // for each record, call the create process
    while (!driver.EOF())
    {
     if (driver.Value(0) == "Y")
     {
         
         Goto_Add_Patient();
         quick_pt_demographics_regression(driver);
         
         WaitSeconds(2,"");
         
         // Write the details out
         var w_mess = "Patient added," + driver.Value(1) + " " + driver.Value(3) + " " + driver.Value(2);
        
         
         // Add tp
         
         add_treatment_plan_regression(driver);
         
         // Add or cancel review
         
          if ((driver.Value(46) == "") || (driver.Value(46) == null)) 
            cancel_review();
          else
            add_review_regression(driver);
            
         // Add Next Review Date through    
     
          if (driver.Value(70) == "Y") 
          add_next_review_date_regression_not_on_tp(driver);
        
             
     }
     
      // Next record
      driver.Next();      
    }
}