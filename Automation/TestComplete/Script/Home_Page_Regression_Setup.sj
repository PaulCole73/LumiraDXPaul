//USEUNIT V5_SQL
//USEUNIT Home_Page_Regression_Quick_Checking
//USEUNIT Home_Page_Regression_Loading_Data

//potentially remove the below 

//USEUNIT Navigation
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common
//USEUNIT Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Popups
//USEUNIT Navigation
//USEUNIT Common
//USEUNIT V5_Common

//===============================================================================
//
// Build Data
//   Reset data
//   Add Patients, TPs, Reviews
//
//------------------------------------------------------------------------------

function SQL_location_reset()

{
//Clear down the location To run each time the process runs otherwise it will duplicate the data
SQL_reset_section_content();
Log.Message("Location data reset")
}

function user_setup()

//Create the users //This step is only required to be run once on a new snapshot then the data will be there

{
SQL_add_clead_user();
SQL_add_cl2_user();
SQL_add_cl3_user();
}

//------------------------------------------------------------------------------
//This will need to be run each time as it will be cleared down
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
        
         // Update Next Review Date to be in the past   
          if (driver.Value(68) == "Y")
          { 
             var w_id = SQL_Find_Patient_Regression(driver.Value(20),driver.Value(5));
             Log.Message(w_id)
             SQL_update_review_date(w_id);
             Log.Message(w_id)
          }        
     }
     
      // Next record
      driver.Next();      
    }
}