//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Popups
//USEUNIT Quick_Patient
//USEUNIT V5_SQL
//USEUNIT V5_Patient_Banner


//===============================================================================
//-------------------------------------------------------------------------------
function quick_patient_loop()
{
          var w_max = 3; // number of patients of each gender
          
                for (i=0; i<w_max; i++)
                {
                          quick_patient("m");
                          quick_patient("f");
                 }
}
//-------------------------------------------------------------------------------
function quick_patient(p_gender)
{
        // Add new Patient
       Goto_Add_Patient();
       if (p_gender == "m")
          w_fname = "John";
       else
          w_fname = "Judy";
       
      quick_pt_demographics("Henrick",w_fname, p_gender);
         
       WaitSeconds(2,"");
         
}
//------------------------------------------------------------------------
