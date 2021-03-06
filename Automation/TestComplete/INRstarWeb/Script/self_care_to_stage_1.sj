//USEUNIT Quick_Patient
//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation
//USEUNIT V5_Common_Tests
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Popups
//USEUNIT Test_Patient_Status

//-------------------------------------------------------------------------------------------

//This was designed for regression purposes
function quick_test_self_care()
{
    //Choose a pre-fix letter for the patients' surnames
    var w_letter = "L";  
    // Define the output file to store the resulting NHS numbers
    var w_outfile = "Q:\\Development and Testing\\Testing\\TestComplete_Results\\self_care_pts_"+w_letter+".csv";
    
    // Prime / Reset Output File to empty
    aqFile.WriteToTextFile(w_outfile, "NHS Numbers" + "\r\n",  aqFile.ctANSI, true);

    for (i=0; i<8; i++)
    {
         self_care_Stage1(w_outfile, w_letter);
    }
}
//-------------------------------------------------------------------------------------------
function self_care_Stage1(w_outfile, w_letter)
{
          Log.Message("*** Self Care Stage 1");
         
          add_sc_patient(w_letter,"t");

          test_Self_Care_Send_Email(); 
          
        var w_nhs = get_nhs_number();
         // Write the record to the file
        aqFile.WriteToTextFile(w_outfile, w_nhs + "\r\n", aqFile.ctANSI);
}
//===========================================================
function test_Self_Care_Send_Email()
{
      Goto_Self_Care();
      var INRstarV5 = set_system();
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPQN = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("ProgramContainer").Panel("Program_engageAC");
      var panelS1C = panelPQN.Panel("Stage_1").Panel("Stage_1_Content");
      
      //Click Legal checkbox
      panelS1C.Checkbox("Stage_1_4_Content_Input").ClickChecked(true);
     Log.Message("Have ticked 'Legal'");
      
          if (panelS1C.Button("Stage_1_6_Content_Input").Enabled == true)
          {
                    // Click Send Email
                    panelS1C.Button("Stage_1_6_Content_Input").Click();
      
                    // Check for Error message
                    var wbx_V = INRstarV5.NativeWebObject.Find("idStr", "Errors");
                    if (wbx_V.Exists == false)
                     {
                        Log.Message("There are no Error messages");
                      }
                      else
                      {
                     if (wbx_V.Exists == true)
                           if (wbx_V.VisibleOnScreen == true)
                           { 
                                 var w_err_text = INRstarV5.NativeWebObject.Find("idStr", "Errors").innerText;
                                 Log.Message("Error text is: " + w_err_text);
                           }
                      }
          }
          else
          {
                    Log.Message("Send Email cannot be clicked");
          }
}
//-------------------------------------------------------------------------------------------
function test_Self_Care_Legal(p_valid)
{
          Goto_Self_Care();
          var INRstarV5 = set_system();
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          var panelPQN = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("ProgramContainer").Panel("Program_engageAC");
          var panelS1C = panelPQN.Panel("Stage_1").Panel("Stage_1_Content");
      
          //Click Legal checkbox
          if (panelS1C.Checkbox("Stage_1_4_Content_Input").Enabled == false)
          {
                    Log.Checkpoint("Cannot click 'Legal'");
          }
          else
          {          
                    if  (p_valid == "n")
                              Log.Warning("Should not be able to click 'Legal'");
                    else
                              Log.Checkpoint("Can click 'Legal'");
          }
}
//===============================================================
function add_sc_patient( p_letter, p_option)
{
        var INRstarV5 = set_system();

         Goto_Add_Patient();
         
         quick_pt_demographics(p_letter+"-Self-Care", "Kate", "F");
         
         WaitSeconds(1,"");

          if (p_option == "p" || p_option == "t")
         {
                   Goto_Patient_TreatmentPlan_Add();
         
                   var w_drug = "W";
                   var w_dm = "";
                   var w_start =  aqDateTime.AddDays(aqDateTime.Today(), -12);
         
                  quick_pt_treatmentplan(w_drug, w_dm, w_start);
         }
          if (p_option == "t")
         {
                  Goto_Add_Historical();
                  // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
                 quick_pt_historical("11", 10, "2016", "2.5", "2.3", "2.5", "0", "7", "Quick Patient treatment");
         }
}
//-----------------------------------------------------------------------------------------------------
function get_nhs_number()
{
      Goto_Recently_Viewed();
      var INRstarV5 = set_system();
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelRPW = panelMCP.Panel("PatientContent").Panel("RecentPatientsWrapper");
      return panelRPW.Table("RecentPatientsTable").Cell(1, 1).Label("NHS_Number_DetachedLabel").innerText;
}
//-----------------------------------------------------------------------------------------------------
function add_doac_plan(p_drug)
{
   var w_date = aqDateTime.Today();
   var w_day = aqString.SubString(w_date,0,2);
   var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
   var w_yr = aqString.SubString(w_date,6,4);
 
   var INRstarV5 = set_system();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var formATPF = panelPCD.Form("AddTreatmentPlanForm");
  var panelEPCI = formATPF.FieldSet(0).Panel("EditPatientTreatmentPlanInformation");
  var panelPTPI = formATPF .Panel("PatientTreatmentPlanInformation");
   
  panelEPCI.Panel(0).Image("calendar_png").Click();
   w_datepicker = INRstarV5.Panel("ui_datepicker_div");
   w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
   w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
   select_day(w_day, w_datepicker);
     
  panelEPCI .Panel(1).Select("DiagnosisSelected").ClickItem("Atrial fibrillation");
  panelEPCI.Panel(2).Select("DrugId").ClickItem(p_drug);
     
  //proces the pop-ups
  process_button(INRstarV5, "Drug Confirmation Change", "OK") ;
  
  // Set the duration
  panelEPCI.Panel(3).Select("TreatmentDuration").ClickItem("Indefinite");
  
    
  //Save the plan
  panelPTPI.SubmitButton("AddPatientTreatmentPlan").Click();
  

}
//-----------------------------------------------------------------------------------------------------
function change_doac_plan(p_drug)
{
   var INRstarV5 = set_system();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
  var formPETPF = panelPCD.Form("PatientEditTreatmentPlanForm");
  var panelEPTPI = formPETPF.Panel("EditPatientTreatmentPlanInformation");
   
  panelEPTPI.Panel(2).Select("DrugId").ClickItem(p_drug);
     
  //proces the pop-ups
  process_button(INRstarV5, "Drug Confirmation Change", "OK") ;
  
  // Set the duration
  panelEPTPI.Panel(3).Select("TreatmentDuration").ClickItem("Indefinite");
      
  //Save the plan
  formPETPF.Panel(0).Button("UpdatePatientTreatmentPlan").Click();
}
