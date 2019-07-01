//USEUNIT System_Paths
//USEUNIT V5_Common
//USEUNIT V5_Common_Tests
//USEUNIT Navigation
//--------------------------------------------------------------------------------

function tsv_patient_add(teststep,testdata,testdata2)     
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
                   Log.Checkpoint("Add a new patient");
                  }
                   else
                    Log.Warning("Add a new patient - Fail");
           }
             else if (test == 2) 
              {   
                 var error_message_data = error_message_detail()
            
                   if(aqString.Contains (error_message_detail,data))
                     {
                      Log.Checkpoint("Add a duplicate patient based on NHS number");   
                     } 
                        else
                            {
                              Log.Message("NHS Number valid or no Error messages found");
                            }
             }
 }
//--------------------------------------------------------------------------------