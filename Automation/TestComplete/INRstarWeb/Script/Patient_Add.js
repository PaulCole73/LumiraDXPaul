//USEUNIT TSA_Login
//USEUNIT TSA_Logoff
//USEUNIT TSA_Patient_Add
//USEUNIT TSV_Patient_Add
//USEUNIT Navigation
//USEUNIT Tested_Apps
//USEUNIT V5_Common_Batch
//--------------------------------------------------------------------------------
function tc_add_a_new_patient()
{
 //Parameters to pass in - (UserName, Password, Step)
 login('');
 
 //Parameters to pass in - (firstname,surname,title,sex,gender,address line 1,address line 2,address line 3,town,county,postcode,home tel,mob,email,nhs,Step)
 tsa_patient_add('Quick','Patient','Mr','Male','Male','add1','add2','add3','town','county','tr72dh','01252 545454','07930 454765','test@hotmail.com',' ','Shared');
 
 //Parameters to pass in - (test step, audit action, audit more information to validate) 
 var nhs = get_patient_nhs();
 tsv_patient_add('1','Add Patient',nhs);
 
 logoff('Shared');
}
//--------------------------------------------------------------------------------
function tc_add_a_duplicate_patient_based_on_NHS_number()
{
 //Parameters to pass in - (UserName, Password, Step)
 login(''); 
 
 tsa_patient_add('Quick','Patient','Mr','Male','Male','add1','add2','add3','town','county','tr72dh','01252 545454','07930 454765','test@hotmail.com',' ','Shared');
 var nhs = get_patient_nhs();
 tsa_patient_add('Quick','Patient','Mr','Male','Male','add1','add2','add3','town','county','tr72dh','01252 545454','07930 454765','test@hotmail.com',nhs,'Shared');
 
 //Parameters to pass in - (test step, error message details) 
 tsv_patient_add('2','This patient may already exist at this location');
 
 logoff('Shared');
} 
//--------------------------------------------------------------------------------