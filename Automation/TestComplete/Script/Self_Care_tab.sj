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
//          self_care_access();

//          Log_On_User("");

//          self_care_patient_state();
//          self_care_patient_drug_1();
//          self_care_patient_drug_2();
          self_care_Stage1();
          self_care_Stage2();
          self_care_Stage3();

          Log_Off();
}
//-------------------------------------------------------------------------------------------
function self_care_access()
{
        Log.Message("*** Self Care Access");
       var INRstarV5;

        //  Full test of all users
        wa_u= new Array(8);
        wa_u[0] = "";
        wa_u[1] = "";
        wa_u[2] = "";
        wa_u[3] = "";
        wa_u[4] = "";
        wa_u[5] = "";
        wa_u[6] = "";
        wa_u[7] = "";

//          // Short test of each type of user (can / cannot access Stage 2)
//         wa_u= new Array(2);
       
        var w_nhs = "";
          
        for (i=0; i < wa_u.length; i++)
        {
           if (wa_u[i] != "")
           {
                      // Log on as Clinical Lead and create a new patient, plan and treatment
                     Log_On_User("");

                     INRstarV5 = set_system();
                     add_sc_patient("t");
                     w_nhs = get_nhs_number();
             
                     Log_Off();
         
                      // Log on as User to perform test
                     Log_On_User(wa_u[i],);
                     Log.Message("Logged on as "+wa_u[i]);
                     Goto_Patient_Search();
                     preset_Fetch_Patient_NHS(INRstarV5, w_nhs);
                     test_Self_Care_Legal("y");

                     // Test Send Email can be clicked
                     test_Self_Care_Send_Email();
             
                     // Test if Stage 2 and Stage 3 can be processed, or not
                    test_Self_Care_Patient_Training("t");

                     // Log off
                     Log_Off();
             }
          }
}
//-------------------------------------------------------------------------------------------
// Test all non-warfarin drugs cannot process Self Care
function self_care_patient_drug_1()
{
          Log.Message("*** Self Care Patient Drug 1");
          var wa_d = new Array(7);
          wa_d[0] = "Acenocoumarol";
          wa_d[1] = "Apixaban";
          wa_d[2] = "Dabigatran";
          wa_d[3] = "Dalteparin (LMWH)";
          wa_d[4] = "Edoxaban";
          wa_d[5] = "Enoxaparin (LMWH)";
          wa_d[6] = "Rivaroxaban";
         
         INRstarV5 = set_system();
         
           // Add a new warfarin patient, with a treatment
           add_sc_patient("t");
                     
           // Change plan to use DOAC
           Goto_Patient_TreatmentPlan_Add_more_1_treatmentPlan();
           add_doac_plan(wa_d[0]);

          for (i=1; i < wa_d.length; i++)  
          {
                    Log.Message("Testing "+wa_d[i]);
                    Goto_Patient_TreatmentPlan_Edit()
                    change_doac_plan(wa_d[i]);                     
                     // test if page is disabled
                    test_Self_Care_Legal("n");
          }
}
//-------------------------------------------------------------------------------------------
// Test a non-warfarin drug cannot process each stage of Self Care
function self_care_patient_drug_2()
{
          Log.Message("*** Self Care Patient Drug 2");
          //Test DOAC for Before Stage 1
          scpd2_0();
          //Test DOAC for Stage 1
          scpd2_1();
          //Test DOAC for Stage 2
          scpd2_2();
          //Test DOAC for Stage 3
          scpd2_3();
          
}
//-------------------------------------------------------------------------------------------
// Test a non-warfarin drug cannot process each stage of Self Care - Before Stage 1
function scpd2_0()
{
         INRstarV5 = set_system();
         
           // Add a new warfarin patient, with a treatment
           add_sc_patient("t");
                     
           // Change plan to use DOAC
           Goto_Patient_TreatmentPlan_Add_more_1_treatmentPlan();
           add_doac_plan("Apixaban");
           
           Log.Message ("******** Testing Before Stage 1");
           test_Self_Care_Legal("n");
}
//-------------------------------------------------------------------------------------------
// Test a non-warfarin drug cannot process each stage of Self Care - After Stage 1
function scpd2_1()
{
           
            // Add a new warfarin patient, with a treatment
           add_sc_patient("t");
            // Pass Stage 1
           test_Self_Care_Send_Email(); 
                     
           // Change plan to use DOAC
           Goto_Patient_TreatmentPlan_Add_more_1_treatmentPlan();
           add_doac_plan("Apixaban");

           Log.Message ("******** Testing After Stage 1");
           test_Self_Care_Legal("n");
}
//-------------------------------------------------------------------------------------------
// Test a non-warfarin drug cannot process each stage of Self Care - After Stage 2
function scpd2_2()
{
           
            // Add a new warfarin patient, with a treatment
           add_sc_patient("t");
            // Pass Stage 1
           test_Self_Care_Send_Email(); 
           // Stage 2 checkbox should now be active
           test_Self_Care_Patient_Training("c");
                     
           // Change plan to use DOAC
           Goto_Patient_TreatmentPlan_Add_more_1_treatmentPlan();
           add_doac_plan("Apixaban");

           Log.Message ("******** Testing After Stage 2");
           test_Self_Care_Legal("n");
           test_Self_Care_Patient_Training("t");
}
//-------------------------------------------------------------------------------------------
// Test a non-warfarin drug cannot process each stage of Self Care - After Stage 3
function scpd2_3()
{
           
            // Add a new warfarin patient, with a treatment
           add_sc_patient("t");
            // Pass Stage 1
           test_Self_Care_Send_Email(); 
           // Stage 2 checkbox should now be active
           test_Self_Care_Patient_Training("c");
           // Stage 3 checkbox should now be active
           test_Self_Care_Authorise();
                     
           // Change plan to use DOAC
           Goto_Patient_TreatmentPlan_Add_more_1_treatmentPlan();
           add_doac_plan("Apixaban");

           Log.Message ("******** Testing After Stage 3");
           test_Self_Care_Legal("n");
           test_Self_Care_Patient_Training("t");

}
//-------------------------------------------------------------------------------------------
//
// Only patients with a current treatment plan and a treatment can be processed
//
function self_care_patient_state()
{
         Log.Message("*** Self Care Patient State");
        var INRstarV5 = set_system();

          // new patient - no treatment plan
         add_sc_patient("");
         test_Self_Care_Legal("n");
          
          // new patient - treatment plan but no treatments
         add_sc_patient("p");
         test_Self_Care_Legal("n");
          
          // inactive patient 
         add_sc_patient("t");
         Goto_Patient_Management();
         de_activate_patient_regression();
         
         test_Self_Care_Legal("n");
}
//-------------------------------------------------------------------------------------------
function self_care_Stage1()
{
          Log.Message("*** Self Care Stage 1");
          //Set default vlaues
          var w_phone="01209 710999";
          var w_mobile="07111 123456";
          var w_email="fred@home.com";
          
        // Define Test data
        wa_phone= new Array(6);
        wa_phone[0] = "";
        wa_phone[1] = "       ";
        wa_phone[2] = "  01209 ";
        wa_phone[3] = " please      call Mother ";
        wa_phone[4] = " 01209    710999";
        wa_phone[5] = "!£$%^&*()_+=-[]{}'#@~/?.>,<\|";

        wa_mobile= new Array(6);
        wa_mobile[0] = "";
        wa_mobile[1] = "       ";
        wa_mobile[2] = "  07111 ";
        wa_mobile[3] = " please call Mother ";
        wa_mobile[4] = " 07111 223344";
        wa_mobile[5] = "!£$%^&*()_+=-[]{}'#@~/?.>,<\|";

        wa_email= new Array(2);
        wa_email[0] = "";
        wa_email[1] = "fred@home.com";
         
           // Test to validate no phone numbers
         add_sc_patient("t");
         edit_sc_patient_demograpics("","",w_email);
         test_Self_Care_Send_Email(); 
         
        // Test Home Phone
        for (i=0; i < wa_phone.length; i++)
        {
          Log.Message("Testing Phone: " + wa_phone[i]);
          add_sc_patient("t");
          edit_sc_patient_demograpics(wa_phone[i],w_mobile,w_email);
          test_Self_Care_Send_Email(); 
        }

        // Test Mobile Phone
        for (i=0; i < wa_mobile.length; i++)
        {
          Log.Message("Testing Mobile: " + wa_mobile[i]);
          add_sc_patient("t");
          edit_sc_patient_demograpics(w_phone,wa_mobile[i],w_email);
          test_Self_Care_Send_Email(); 
        }

        // Test Email
        for (i=0; i < wa_mobile.length; i++)
        {
          Log.Message("Testing Email: " + wa_email[i]);
          add_sc_patient("t");
          edit_sc_patient_demograpics(w_phone,w_mobile,wa_email[i]);
          test_Self_Care_Send_Email(); 
        }          
}
//-------------------------------------------------------------------------------------------
function self_care_Stage2()
{
          Log.Message("*** Self Care Stage 2");
           // Add patient with default phone & email
         add_sc_patient("t");
         
         // Pass Stage 1
        test_Self_Care_Send_Email(); 

        // Stage 2 checkbox should now be active
        test_Self_Care_Patient_Training("c");
        
        // Try to resend email
      Goto_Self_Care();
      var INRstarV5 = set_system();
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPQN = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("ProgramContainer").Panel("Program_engageAC");
      var panelS1C = panelPQN.Panel("Stage_1").Panel("Stage_1_Content");
      
      if (panelS1C.Button("Stage_1_6_Content_Input").enabled == true)
      {
          Log.Message ("Error - Can click 'Send Email'");
      }
      else
      {
          Log.Message ("Correctly cannot click 'Send Email'");
      }
       //Try to uncheck Stage 1
      if (panelS1C.Checkbox("Stage_1_4_Content_Input").enabled == true)
      {
          Log.Message ("Error - Can click 'Legal checkbox'");
      }
      else
      {
          Log.Message ("Correctly cannot click 'Legal checkbox'");
      }
      
                
}
//-------------------------------------------------------------------------------------------
function self_care_Stage3()
{
         Log.Message("*** Self Care Stage 3");
         // Add patient with default phone & email
         add_sc_patient("t");
         
         // Pass Stage 1
        test_Self_Care_Send_Email(); 

        // Stage 2 checkbox should now be active
        test_Self_Care_Patient_Training("t");
        
        // Stage 3 checkbox should now be active
        test_Self_Care_Authorise("c");

        // Try to uncheck Stage 3
        Goto_Self_Care();
        test_Self_Care_Authorise("t");
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
//-------------------------------------------------------------------------------------------
function test_Self_Care_Patient_Training(p_action)
{
      Goto_Self_Care();
      var INRstarV5 = set_system();
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPQN = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("ProgramContainer").Panel("Program_engageAC");
      var panelS2C = panelPQN.Panel("Stage_2").Panel("Stage_2_Content");
      
      //Click Patient Training
      if (p_action == "c")
      {
                panelS2C.Checkbox("Stage_2_1_Content_Input").ClickChecked(true);
               Log.Message("Have ticked 'Patient Training'");
      }
      // Test Patient Training Checkbox
      if (p_action == "t")
      {
          if (panelS2C.Checkbox("Stage_2_1_Content_Input").Enabled == false)
                    Log.Message("Cannot tick 'Patient Training'");
          else
          {
                    Log.Message("Patient Training can be ticked");
                    panelS2C.Checkbox("Stage_2_1_Content_Input").ClickChecked(true);

          }
       }                         
}
//-------------------------------------------------------------------------------------------
function test_Self_Care_Authorise(p_action)
{
      Goto_Self_Care();
      var INRstarV5 = set_system();
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPQN = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").Panel("ProgramContainer").Panel("Program_engageAC");
      var panelS3C = panelPQN.Panel("Stage_3").Panel("Stage_3_Content");
      
      if (p_action == "c")
      {
      //Click Patient Training
      panelS3C.Checkbox("Stage_3_1_Content_Input").ClickChecked(true);
      //Cancel Pop-up
      process_self_care_cancel_INR(INRstarV5);
      
      //Click Patient Training
      panelS3C.Checkbox("Stage_3_1_Content_Input").ClickChecked(true);
      //Confirm Pop-up
      process_self_care_confirm_INR(INRstarV5);
      }
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
//===============================================================
function add_sc_patient(p_option)
{
        var INRstarV5 = set_system();

         Goto_Add_Patient();
         
         quick_pt_demographics("R-Self-Care", "John", "M");
         
         WaitSeconds(2,"");
         
          if (p_option == "p" || p_option == "t")
         {
                   Goto_Patient_TreatmentPlan_Add();
         
                   var w_drug = "W";
                   var w_dm = "";
                   var w_start =  aqDateTime.AddDays(aqDateTime.Today(), -30);
         
                  quick_pt_treatmentplan(w_drug, w_dm, w_start);
         }
          if (p_option == "t")
         {
                  Goto_Add_Historical();
                  // p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment
                 quick_pt_historical("5", 10, "2016", "2.5", "2.3", "2.5", "0", "7", "Quick Patient treatment");
         }

}
//--------------------------------------------------------------------------------------------------
// update patient demographics
function edit_sc_patient_demograpics(p_phone, p_mobile, p_email)
{
      Goto_Edit_Patient_Demographics();
      var INRstarV5 = set_system();
      var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
      var panelPTC = panelMCP.panel("PatientRecord").Panel("PatientMainTabContent").panel("PatientTabContent");
      form = panelPTC.Form("PatientEditDetailsForm")

      // Set Phones empty
      form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(6).Textbox("Phone").Text = p_phone;
      form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(7).Textbox("Mobile").Text = p_mobile;
      form.Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails").Panel(8).Textbox("Email").Text = p_email;
      
      //Save the changes
      form.Panel(0).SubmitButton("UpdatePatientDetails").Click();
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
