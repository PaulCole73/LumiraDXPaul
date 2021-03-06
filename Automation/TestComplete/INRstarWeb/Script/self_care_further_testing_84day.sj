//USEUNIT Quick_Patient
//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation
//USEUNIT V5_Common_Tests
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Popups
//USEUNIT Test_Patient_Status
//USEUNIT Add_INR_Override_Review

//-------------------------------------------------------------------------------------------

//This was designed for regression purposes
function self_care_further_testing()
{
    //Choose a pre-fix letter for the patients' surnames
    var w_letter = "L";  
    // Read input file
    driver = DDT.CSVDriver("Q:\\Development and Testing\\Testing\\TestComplete_Results\\self_care_pts_"+w_letter+".csv");
 
         var INRstarV5 = set_system();
         
         while (!driver.EOF())
          {
                  if (driver.Value(0) != "NHS Numbers")
                   {
                         Goto_Patient_Search();
                         preset_Fetch_Patient_NHS(INRstarV5, driver.Value(0));
                             
                          Goto_Patient_New_INR();
                         add_inr_review("2.5", "14") //  (p_INR,  p_review)
//                         add_inr_review("2.5", aqConvert.IntToStr(Math.floor(Math.random()*84))) //  (p_INR,  p_review)


                      }
                  // Next record
                  driver.Next();      
          }
}
