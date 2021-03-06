//USEUNIT Quick_Patient
//USEUNIT Test_Edit_Demographics
//USEUNIT Navigation

//===============================================================================
// Section  4.0
//===============================================================================
function release_pre_s4_0()
{
          //Log_On_User("lead@s2","INRstar_5");

          var INRstarV5 = set_system();

        Step_4_0_1_Add_New_Patient(INRstarV5);
        Step_4_0_2_Edit_Demographics(INRstarV5);  
        Step_4_0_3_View_Recent_Patients(INRstarV5) ;
        Step_4_0_4_Find_a_Patient(INRstarV5);  

}
//-------------------------------------------------------------------------------
function Step_4_0_1_Add_New_Patient(INRstarV5)
{
        Goto_Add_Patient();
        quick_pt_demographics("Regression", "Jack", "M");
}
//-------------------------------------------------------------------------------
function Step_4_0_2_Edit_Demographics(INRstarV5)
{
        edit_patient_demographics(INRstarV5)
}
//-------------------------------------------------------------------------------
function Step_4_0_3_View_Recent_Patients(INRstarV5)
{
        Goto_Recently_Viewed();
        preset_Fetch_Patient_Recent(INRstarV5);
}
//-------------------------------------------------------------------------------
function Step_4_0_4_Find_a_Patient(INRstarV5)
{
   var w_name = "pre-re, ma";       
   Goto_Patient_Search();
   preset_Fetch_Patient(INRstarV5, w_name)

}
