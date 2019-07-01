//USEUNIT Add_INR_Backdated
//USEUNIT Common
//USEUNIT Generic_Functions
//USEUNIT loggin
//USEUNIT Navigate_Patient
//USEUNIT Navigation
//USEUNIT Quick_Patient
//USEUNIT SORB_Schedule_Ordering
//USEUNIT Test_Audit
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Presets
//USEUNIT V5_SQL

function timing_test()
{
  log_on_cl3_coruscant("cl3@regression","INRstar_5");
  WaitSeconds(2, "Waiting for home page");
  var INRstarV5 = set_system();

 //Adding Patient
 Goto_Add_Patient();
 quick_pt_demographics("SORB Suggested", "Treatment_today", "F");
         
 WaitSeconds(1,"Waiting for patient to be added");
 
 //Adding TP ensure all tablets are ticked        
 Goto_Patient_TreatmentPlan_Add(); 
 WaitSeconds(1,"Waiting for treatment plan page"); 
 
 var w_master_date = aqDateTime.Today();
 var w_start_date = aqConvert.StrToDate(aqDateTime.AddDays( w_master_date, -28));
    
 quick_pt_treatmentplan("W","", w_start_date);
 WaitSeconds(2,"Waiting for treatment plan to save");
         
 //Add Historic
 
  Goto_Add_Historical();

  var w_date = aqDateTime.AddDays(aqDateTime.Today(), -7);
  var w_day = aqString.SubString(w_date,0,2);
  var w_mth = aqConvert.StrToInt(aqString.SubString(w_date,3,2));
  var w_yr = aqString.SubString(w_date,6,4);
    
  quick_pt_historical(w_day, w_mth, w_yr, "2.5", "2.3", "2.5", "0", "7", "Historical Treatment");  
  
  Goto_Self_Care();
      
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPQN = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("ProgramContainer").Panel("Program_engageAC");
      var panelS3C = panelPQN.Panel("Stage_3").Panel("Stage_3_Content");
    
      //Click Patient Training
      panelS3C.Checkbox("Stage_3_1_Content_Input").ClickChecked(true);
      //Cancel Pop-up
      process_self_care_cancel_INR(INRstarV5);
      
      //Click Patient Training
      panelS3C.Checkbox("Stage_3_1_Content_Input").ClickChecked(true);
      //Confirm Pop-up
      process_self_care_confirm_INR(INRstarV5);
      
      if (p_action == "t")
      {
            if (panelS3C.Checkbox("Stage_3_1_Content_Input").Enabled == false)
                      Log.Message("Authorise cannot be ticked");
            else
            {
                      Log.Message("Authorise can be ticked");      
                      panelS3C.Checkbox("Stage_3_1_Content_Input").ClickChecked(true);
                      process_self_care_confirm_INR(INRstarV5);
            }
      
      }
  }
  
