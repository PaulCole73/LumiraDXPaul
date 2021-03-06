//USEUNIT Navigation
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Popups
//USEUNIT Add_INR_Refer

function quick_start()
{
          var wa_Users = new Array(0);
          wa_Users[0] = "lead@s1";
          
          w_case = 0;
          main_test_setting_self_test(wa_Users, w_case);
          w_case = 4;
          main_test_setting_self_test(wa_Users, w_case);
}         
function full_start()
{
          var wa_Users = new Array(7);
          wa_Users[0] = "c1@s1";
          wa_Users[1] = "c2@s1";
          wa_Users[2] = "admin@s1";
          wa_Users[3] = "cl1@s1";
          wa_Users[4] = "cl2@s1";
          wa_Users[5] = "cl3@s1";
          wa_Users[6] = "lead@s1";
          
          for (w_case=0 ;w_case<6; w_case++)
          {
                    main_test_setting_self_test(wa_Users, w_case);
          }
 }
 function main_test_setting_self_test(wa_Users, w_case)
 {         
          var wa_Patients = new Array(3);
          wa_Patients[0] = "jones, jemima";
          wa_Patients[1] = "apix, harry";
          wa_Patients[2] = "edwards, blake";
          
          var wa_cases = new Array(5);
          wa_cases[0] = [0,0,0,0];    // case 0
          wa_cases[1] = [1,0,0,0];     // case 1
          wa_cases[2] = [0,1,0,0];     // case 2
          wa_cases[3] = [0,0,1,0];     // case 3
          wa_cases[4] = [0,0,0,1];     // case 4
          wa_cases[5] = [1,1,1,1];     // case 5
          
            for (i=0; i < wa_Users.length; i++)
           {
                    Log_On_User(wa_Users[i],"INRstar_5");
 
                    var INRstarV5 = set_system();  
                   
                    for (x=0;x < wa_Patients.length; x++)
                    {
                            Goto_Patient_Search();
                            preset_Fetch_Patient(INRstarV5, wa_Patients[x]);
                            
                            process_groups(INRstarV5, wa_Users, w_case, wa_cases);
                    }
                    Log_Off();
          }          
}
function process_groups(INRstarV5, wa_Users, wa_case, wa_cases)
{
        // Edit the details
        var w_stem = Goto_Patient_Management(INRstarV5);
        panelPMDW = w_stem.Panel("PatientManagementDetailsWrapper");
        panelPMDW.Panel(0).Button("EditPatientManagementLink").Click();
                            
        // Set the path to the checkbox
        var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
        var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
        var panelPG = panelPTC.Form("PatientManagementForm").Panel("PatientManagementWrapper").Panel("PatientGroups")
                            
        wcbx_TR = panelPG.Panel(0).Checkbox("Transport");
        wcbx_HV = panelPG.Panel(1).Checkbox("HomeVisit");
        wcbx_CX = panelPG.Panel(2).Checkbox("Complex");
        wcbx_ST = panelPG.Panel(3).Checkbox("SelfTester");
                            
        // Set checkboxes
        wcbx_TR.ClickChecked(wa_cases[w_case][0]);
        wcbx_HV.ClickChecked(wa_cases[w_case][1]);
        wcbx_CX.ClickChecked(wa_cases[w_case][2]);
                                                          
          // Try to set the Self Test flag
         if (wcbx_ST.Enabled == true)
         {
                      Log.Checkpoint("User : "+wa_Users[i] + " can edit this value");
                      wcbx_ST.ClickChecked(wa_cases[w_case][3]);
                      if (wa_cases[w_case][3] == true) 
                      {
                                 process_confirm_self_tester(INRstarV5);
                                 
                                 // Set PoCT batch fields
                                 panelPG.Panel("PatientsPoCTBatch").Panel(0).Textbox("BatchNumber").Text = "ST-001";
                                 panelPG.Panel("PatientsPoCTBatch").Panel(1).Image("calendar_png").Click();
                                w_datepicker = INRstarV5.Panel("ui_datepicker_div");
                                w_datepicker.Panel(0).Panel(0).Select(0).ClickItem("Jun");
                                w_datepicker.Panel(0).Panel(0).Select(1).ClickItem("2014");
                                w_datepicker.Table(0).Cell(3, 3).Link(0).Click();
                      }
         }
         else
         {
            Log.Warning("User : "+wa_Users[i] + " cannot edit this value");
         }
                           
         // Save the details
        panelPG = panelPTC.Form("PatientManagementForm").Panel(0).SubmitButton("UpdatePatientManagementDetails").Click();
}