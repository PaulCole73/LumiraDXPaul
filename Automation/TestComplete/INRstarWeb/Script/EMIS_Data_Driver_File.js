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
//USEUNIT EMIS

//===============================================================================
//
// Build Data
//   Reset data
//   Add Patients, TPs, Reviews
//
//------------------------------------------------------------------------------

//Create the patient data

function add_data()
{

// Read input file

    driver = DDT.ExcelDriver("Q:\\Development and Testing\\Testing\\TestComplete_Test_Data\\emis_clinical_fileback_2.xlsx","Patient_Full_Columns",1);
  
   WaitSeconds(5,"");
    // for each record, call the create process
    while (! driver.EOF())
//      while (!DDT.ExcelDriver("Q:\\Development and Testing\\Testing\\TestComplete_Test_Data\\emis_clinical_fileback.xls","Patient_Full_Columns").EOF())  
    {
       if (driver.Value(0) == "Y")
       {
        open_emis();
        
//        login_emis('Lumiradx','Password1234','29392');
        login_emis('SULIV','SULIV1234','29391');
        
        WaitSeconds(2)
        
        var nhs = add_emis_patient(driver);
      
//        Add patient INRstar
      
         patient_emis_add(nhs,driver);
      
//         Add tp
        
         add_treatment_plan_regression(driver);
         
//         Add review
         
         if (driver.Value(46) == "Y")
          
            add_review_regression(driver);
            
//         Need to wait for fileback confirmation here then close emis once domne
                       
            close_emis();
            
       }
       
      // Next record
      driver.Next();      
    }
    DDT.CloseDriver("Q:\\Development and Testing\\Testing\\TestComplete_Test_Data\\emis_clinical_fileback.xls","Patient_Full_Columns",1);
}
//--------------------------------------------------------------------------------