//USEUNIT System_Paths
//USEUNIT V5_Common

//--------------------------------------------------------------------------------

//function add_patient_path(){
//       
//       Goto_Add_Patient();
//       INRstarV5 = set_system_login_page();
//       var path = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm").Fieldset(0).FullName;
//
//Log.Message(path)
//       
//return path 
//
//} 


function add_patient_path(){
       
       Goto_Add_Patient();
       INRstarV5 = set_system_login_page();
       path = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm").Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails");

//Log.Message(path)
       
return path 

} 