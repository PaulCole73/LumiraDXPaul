//USEUNIT V5_Common
//USEUNIT V5_Common_Tests
//USEUNIT Navigation
//USEUNIT Navigate_Patient

//--------------------------------------------------------------------------------

function tsv_treatment_plan_add(teststep,testdata,testdata2)     
{      
var test = teststep;
var data = testdata;
var data_2 = testdata2;

        if (test == 1)
          {
           Goto_Patient_Audit();
           var audit_action = display_top_patient_audit(data);
           var audit_more_information = more_info_top_audit(data_2); 
           
        //Checking if your action is top of the audit and validates the data you want to check within the more information
               if (data == audit_action && aqString.Contains (audit_more_information,data_2))
                  {
                   Log.Checkpoint("Add first maintenance treatment plan");
                  }
                   else
                    Log.Warning("Add first maintenance treatment plan - Fail");
           }
           
          else if (test == 2)
          {
           Goto_Patient_Audit();
           var audit_action = display_top_patient_audit(data);
           var audit_more_information = more_info_top_audit(data_2); 
           
        //Checking if your action is top of the audit and validates the data you want to check within the more information
               if (data == audit_action && aqString.Contains (audit_more_information,data_2))
                  {
                   Log.Checkpoint("Add first manual treatment plan");
                  }
                   else
                    Log.Warning("Add first manual treatment plan - Fail");
           }
           
         else if (test == 3)
          {
           var INRstarV5 = set_system();
           var PanelPR = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord");
           var treatment_history = PanelPR.Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
           var screen_mess = treatment_history.Panel("PatientTreatmentHistory").TextNode(0).contentText;
         
        //Checking if previous treatments are on the screen
        
         if (data == screen_mess)
                  {
                   Log.Checkpoint("Add a new treatment plan after a treatment has been added selecting yes to using previous");
                  }
                   else
                    Log.Warning("Add a new treatment plan after a treatment has been added selecting yes to using previous - Fail");
           }
           
           else if (test == 4)
          {
           Goto_Patient_Audit();
           var audit_action = display_top_patient_audit(data);
           
        //Checking if your action is top of the audit
        
               if (data == audit_action)
                  {
                   Log.Checkpoint("Add a new treatment plan after a treatment has been added selecting yes to using previous audit check");
                  }
                   else
                    Log.Warning("Add a new treatment plan after a treatment has been added selecting yes to using previous not audited - Fail");
           }
           
            else if (test == 5)
          {
              Goto_Patient_TreatmentPlan();
              var INRstarV5 = set_system();
              var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
              var panelPR = panelMCP.Panel("PatientRecord");
              var panelPTC = panelPR.Panel("PatientMainTabContent").Panel("PatientTabContent");
              var panelAPTPD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
              var panelAPTPL = panelAPTPD.Panel(1).Button("AddPatientTreatmentPlanLink");
    
              if (panelAPTPL.className == "Button disabled")
                {
                 Log.Checkpoint("Add a new treatment plan after treatments have been added patient with an unknown diagnosis");
                }
                  else 
                    {
                    Log.Warning("Add a new treatment plan after treatments have been added patient with an unknown diagnosis - Fail");      
                    }
          }
          
           else if (test == 6)
          {
              Goto_Patient_TreatmentPlan();
              var INRstarV5 = set_system();
              var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
              var panelPR = panelMCP.Panel("PatientRecord");
              var panelPTC = panelPR.Panel("PatientMainTabContent").Panel("PatientTabContent");
              var panelAPTPD = panelPTC.Panel("PatientTreatmentPlanWrapper").Panel("PatientTreatmentPlanDetails");
              var panelAPTPL = panelAPTPD.Panel(1).Button("AddPatientTreatmentPlanLink");
    
              if (panelAPTPL.className == "Button disabled")
                {
                 Log.Checkpoint("Add a new treatment plan before any treatments have been added");
                }
                  else 
                    {
                    Log.Warning("Add a new treatment plan before any treatments have been added - Fail");
                    }
          }
          
           else if (test == 7)
          {
              var INRstarV5 = set_system(); 
              var err_dialogue_box = INRstarV5.Panel(2).Panel("modalDialogBox").Panel(0).TextNode(0);
  
              //Check the Error panel for the text
              var err_text = err_dialogue_box.innerText;
              
              if (data == err_text)
                {
                 Log.Checkpoint("Add a new treatment plan after treatments have been added - Induction patient");
                 
                }
                  else 
                    {
                    Log.Warning("Add a new treatment plan after treatments have been added - Induction patient - Fail");
                    }
          }
}