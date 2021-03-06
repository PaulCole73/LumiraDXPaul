//USEUNIT PST_IHC_Regression_Loading_Data

//==============================================================================

function patient_management_pst()
{
//Add_online_pst_patient
//Add_phone_pst_patient

add_patient_and_data();

}

//==============================================================================

// login

function log_on_pst_1()
{
     log_on_pst_1("pst_1","INRstar_5");
}

//==============================================================================

//Create the patient data

function add_patient_and_data()
{

// Read input file

    driver = DDT.ExcelDriver("Q:\\Development and Testing\\Testing\\TestComplete_Test_Data\\deans_regression_IHC.xls","Patient_Full_Columns");
    
    log_on_pst_1();
   
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
         
         // Set to be online patient

         /* Paul T commented out the below IF-ELSE as it is not finished and was preventing running other scripts */
         
//          if ((driver.Value(46) == "") || (driver.Value(46) == null)) 
//            
//          else
//            add_review_regression(driver);
            
         // Set to be phone patient
     
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