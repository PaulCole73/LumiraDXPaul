//USEUNIT TSA_Login
//USEUNIT TSA_Logoff
//USEUNIT TSA_Patient_Add
//USEUNIT TSA_Treatment_Plan_Add
//USEUNIT TSA_Treatment

//USEUNIT TSV_Treatment_Plan_Add

//USEUNIT Navigation
//USEUNIT Tested_Apps
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Tests
//USEUNIT V5_SQL

//--------------------------------------------------------------------------------
function tc_add_first_maintenance_treatment_plan()
{
 //Parameters to pass in - (UserName, Password, Step)
 login('');
 
 //Parameters to pass in - (firstname,surname,title,sex,gender,address line 1,address line 2,address line 3,town,county,postcode,home tel,mob,email,nhs,Step)
 tsa_patient_add('Maintenance','Patient','Mr','Male','Male','add1','add2','add3','town','county','tr72dh','01252 545454','07930 454765','test@hotmail.com','','Shared');
 
 //Get your chosen date for treatment plan start date
 var master_date = aqDateTime.Today();
 var StartDate = aqConvert.StrToDate(aqDateTime.AddDays( master_date, -0));

 //Parameters to pass in - (StartDate,Diagnosis,Drug,TreatmentDuration,DosingMethod,TestingMethod,UsePrev,TestStepMode)
 tsa_treatment_plan_add(StartDate,'Atrial fibrillation','Warfarin','Indefinite','Coventry Maintenance','Lab','','Shared'); 
 
 WaitSeconds(1);
 
 //Parameters to pass in - (test step, audit action, audit more information to validate) 
 var nhs = get_patient_nhs();
 tsv_treatment_plan_add('1','Add Treatment Plan Details',nhs);
 
 logoff('Shared');
}
//--------------------------------------------------------------------------------
function tc_add_first_manual_treatment_plan()
{
 //Parameters to pass in - (UserName, Password, Step)
 login('');
 
 //Parameters to pass in - (firstname,surname,title,sex,gender,address line 1,address line 2,address line 3,town,county,postcode,home tel,mob,email,nhs,Step)
 tsa_patient_add('Manual','Patient','Mr','Male','Male','add1','add2','add3','town','county','tr72dh','01252 545454','07930 454765','test@hotmail.com','','Shared');
 
 //Get your chosen date for treatment plan start date
 var master_date = aqDateTime.Today();
 var StartDate = aqConvert.StrToDate(aqDateTime.AddDays( master_date, -0));

 //Parameters to pass in - (StartDate,Diagnosis,Drug,TreatmentDuration,DosingMethod,TestingMethod,UsePrev,TestStepMode)
 tsa_treatment_plan_add(StartDate,'Atrial fibrillation','Warfarin','Indefinite','Manual Dosing','Lab','','Shared'); 
 
 WaitSeconds(1);
 
 //Parameters to pass in - (test step, audit action, audit more information to validate) 
 var nhs = get_patient_nhs();
 tsv_treatment_plan_add('2','Add Treatment Plan Details',nhs);
 
 logoff('Shared');
}
//--------------------------------------------------------------------------------
function tc_add_a_new_treatment_plan_after_a_treatment_has_been_added_selecting_yes_to_using_previous()
{
 //Parameters to pass in - (UserName, Password, Step)
 login('');
 
 //Parameters to pass in - (firstname,surname,title,sex,gender,address line 1,address line 2,address line 3,town,county,postcode,home tel,mob,email,nhs,Step)
 tsa_patient_add('Manual','Patient','Mr','Male','Male','add1','add2','add3','town','county','tr72dh','01252 545454','07930 454765','test@hotmail.com','','Shared'); 

 //Get your chosen date for treatment plan start date
 var master_date = aqDateTime.Today();
 var StartDate = aqConvert.StrToDate(aqDateTime.AddDays( master_date, -28));

 //Parameters to pass in - (StartDate,Diagnosis,Drug,TreatmentDuration,DosingMethod,TestingMethod,UsePrev,TestStepMode)
 tsa_treatment_plan_add(StartDate,'Atrial fibrillation','Warfarin','Indefinite','Manual Dosing','Lab','','Shared'); 
 
 //Get your chosen date for treatment date
 var master_date = aqDateTime.Today();
 var TreatDate = aqConvert.StrToDate(aqDateTime.AddDays( master_date, -28));
 
 //Parameters to pass in - (TreatDate,INR,Dose,Omits,Review,TestStepMode) 
 tsa_add_historical(TreatDate,'2.5','2.5','0 Days','7 Days','Shared');
 
 //Get your chosen date for treatment plan start date
 var master_date = aqDateTime.Today();
 var StartDate = aqConvert.StrToDate(aqDateTime.AddDays( master_date, -14));

 //Parameters to pass in - (StartDate,Diagnosis,Drug,TreatmentDuration,DosingMethod,TestingMethod,UsePrev,TestStepMode)
 tsa_treatment_plan_add(StartDate,'Atrial fibrillation','Warfarin','Indefinite','Manual Dosing','Lab','Y','Shared'); 
 
 //Parameters to pass in - (test step, screen information) 
 tsv_treatment_plan_add('3','Treatments from previous plan','')
 var nhs = get_patient_nhs();
 tsv_treatment_plan_add('4','New Treatment Plan','');
 
 logoff('Shared');
} 
//--------------------------------------------------------------------------------
function tc_add_a_new_treatment_plan_after_treatments_have_been_added_patient_with_an_unknown_diagnosis()
{
 //Parameters to pass in - (UserName, Password, Step)
 login('');
 
 //Parameters to pass in - (firstname,surname,title,sex,gender,address line 1,address line 2,address line 3,town,county,postcode,home tel,mob,email,nhs,Step)
 tsa_patient_add('Manual','Patient','Mr','Male','Male','add1','add2','add3','town','county','tr72dh','01252 545454','07930 454765','test@hotmail.com','','Shared'); 

 //Get your chosen date for treatment plan start date
 var master_date = aqDateTime.Today();
 var StartDate = aqConvert.StrToDate(aqDateTime.AddDays( master_date, -14));

 //Parameters to pass in - (StartDate,Diagnosis,Drug,TreatmentDuration,DosingMethod,TestingMethod,UsePrev,TestStepMode)
 tsa_treatment_plan_add(StartDate,'Atrial fibrillation','Warfarin','Indefinite','Manual Dosing','Lab','','Shared'); 
 
 //Getting detail for the SQL and then updating the diagnosis
 var nhs = get_patient_nhs();
 var first_name = get_patient_first_name();
 var id = SQL_Find_Patient_Regression(nhs, first_name);
 SQL_update_diagnosis(id);

 //Parameters to pass in - (test step)  
 tsv_treatment_plan_add(5);
 
 logoff('Shared');
} 
//--------------------------------------------------------------------------------
function tc_add_a_new_treatment_plan_before_any_treatments_have_been_added()
{
 //Parameters to pass in - (UserName, Password, Step)
 login('');
 
 //Parameters to pass in - (firstname,surname,title,sex,gender,address line 1,address line 2,address line 3,town,county,postcode,home tel,mob,email,nhs,Step)
 tsa_patient_add('Manual','Patient','Mr','Male','Male','add1','add2','add3','town','county','tr72dh','01252 545454','07930 454765','test@hotmail.com','','Shared'); 

 //Get your chosen date for treatment plan start date
 var master_date = aqDateTime.Today();
 var StartDate = aqConvert.StrToDate(aqDateTime.AddDays( master_date, -14));

 //Parameters to pass in - (StartDate,Diagnosis,Drug,TreatmentDuration,DosingMethod,TestingMethod,UsePrev,TestStepMode)
 tsa_treatment_plan_add(StartDate,'Atrial fibrillation','Warfarin','Indefinite','Manual Dosing','Lab','','Shared'); 
 
 //Parameters to pass in - (test step) 
 tsv_treatment_plan_add(6);
 
 logoff('Shared');
} 
//--------------------------------------------------------------------------------
function tc_add_a_new_treatment_plan_after_treatments_have_been_added_Induction_patient()
{
 //Parameters to pass in - (UserName, Password, Step)
 login('');
 
 //Parameters to pass in - (firstname,surname,title,sex,gender,address line 1,address line 2,address line 3,town,county,postcode,home tel,mob,email,nhs,Step)
 tsa_patient_add('Manual','Patient','Mr','Male','Male','add1','add2','add3','town','county','tr72dh','01252 545454','07930 454765','test@hotmail.com','','Shared'); 

 //Get your chosen date for treatment plan start date
 var master_date = aqDateTime.Today();
 var StartDate = aqConvert.StrToDate(aqDateTime.AddDays( master_date, -14));
 
 //Parameters to pass in - (StartDate,Diagnosis,Drug,TreatmentDuration,DosingMethod,TestingMethod,UsePrev,TestStepMode) 
 tsa_treatment_plan_add(StartDate,'Atrial fibrillation','Warfarin','Indefinite','Induction Slow Oates','Lab','','Shared'); 
 
 //Parameters to pass in - (INR,TestStepMode) 
 tsa_add_initiate_induction('1.0','Shared');
 
 //Generate the warning message for error checking
 Goto_Patient_TreatmentPlan_Add_more_1_treatmentPlan();

 //Parameters to pass in - (Test step, WarningText) 
 tsv_treatment_plan_add(7, 'This patient is currently on an Induction protocol. Creating a new treatment plan will invalidate the Induction protocol');

 //Getting past the warning message
 process_Ok('This patient is currently on an Induction protocol. Creating a new treatment plan will invalidate the Induction protocol');
 
  //Get your chosen date for treatment plan start date
 var master_date = aqDateTime.Today();
 var StartDate = aqConvert.StrToDate(aqDateTime.AddDays( master_date, -0));
 
 //Parameters to pass in - (StartDate,Diagnosis,Drug,TreatmentDuration,DosingMethod,TestingMethod,UsePrev,TestStepMode) 
 tsa_treatment_plan_add(StartDate,'Atrial fibrillation','Warfarin','Indefinite','Manual Dosing','Lab','W','Shared');
 
 //Parameters to pass in - (test step, screen information) 
 var nhs = get_patient_nhs();
 tsv_treatment_plan_add('4','New Treatment Plan','');
}
//--------------------------------------------------------------------------------
//function tc_Add_a_new_treatment_plan_after_treatments_have_been_added_patient_with_a_future_appointment()
//{
// //Parameters to pass in - (UserName, Password, Step)
// login('');
// 
// //add clinic
// 
//// //Parameters to pass in - (firstname,surname,title,sex,gender,address line 1,address line 2,address line 3,town,county,postcode,home tel,mob,email,nhs,Step)
//// tsa_patient_add('Manual','Patient','Mr','Male','Male','add1','add2','add3','town','county','tr72dh','01252 545454','07930 454765','test@hotmail.com','','Shared'); 
////
//// //Get your chosen date for treatment plan start date
//// var master_date = aqDateTime.Today();
//// var StartDate = aqConvert.StrToDate(aqDateTime.AddDays( master_date, -28));
////
//// //Parameters to pass in - (StartDate,Diagnosis,Drug,TreatmentDuration,DosingMethod,TestingMethod,UsePrev,TestStepMode)
//// tsa_treatment_plan_add(StartDate,'Atrial fibrillation','Warfarin','Indefinite','Manual Dosing','Lab','','Shared'); 
//// 
//// //Get your chosen date for treatment date
//// var master_date = aqDateTime.Today();
//// var TreatDate = aqConvert.StrToDate(aqDateTime.AddDays( master_date, -28));
//// 
//// //Parameters to pass in - (Month,Year,INR,Dose,Omits,Review,TestStepMode) 
//// tsa_add_historical(TreatDate,'2.5','2.5','0 Days','7 Days','Shared');
// }
//-------------------------------------------------------------------------------















//function test()
//{
//process_Ok('This patient is currently on an Induction protocol. Creating a new treatment plan will invalidate the Induction protocol');
//}
//--------------------------------------------------------------------------------
//
//function test_date_picker()
//{
// 
//  //Get your chosen date for treatment plan start date
// var master_date = aqDateTime.Today();
// var StartDate = aqConvert.StrToDate(aqDateTime.AddDays( master_date, -0));
// 
// //Parameters to pass in - (Month,Year,Diagnosis,Drug,TreatmentDuration,DosingMethod,TestingMethod,UsePrev,TestStepMode) 
// tsa_treatment_plan_add(StartDate,'Atrial fibrillation','Warfarin','Indefinite','Manual Dosing','Lab','W','Shared');
// 
// //Parameters to pass in - (test step, screen information) 
// var nhs = get_patient_nhs();
// tsv_treatment_plan_add('4','New Treatment Plan','');
//}
//--------------------------------------------------------------------------------



















