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
function self_care_to_stage3()
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
                             
                         self_care_to_Stage3(INRstarV5);
                             
                      }
                  // Next record
                  driver.Next();      
          }
}
//-------------------------------------------------------------------------------------------
function self_care_to_Stage3(INRstarV5)
{
        // Stage 2 checkbox should now be active
      Goto_Self_Care();
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPQN = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("ProgramContainer").Panel("Program_engageAC");
      var panelS2C = panelPQN.Panel("Stage_2").Panel("Stage_2_Content");
      var panelS3C = panelPQN.Panel("Stage_3").Panel("Stage_3_Content");
      
       panelS2C.Checkbox("Stage_2_1_Content_Input").ClickChecked(true);
       panelS3C.Checkbox("Stage_3_1_Content_Input").ClickChecked(true);                
      process_self_care_confirm_INR(INRstarV5);
}
