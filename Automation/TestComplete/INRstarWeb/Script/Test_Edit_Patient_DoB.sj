//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation
//USEUNIT V5_Common_Presets

//===============================================================================
//
// This process will edit selected fields for the Patient Demographics
//
function quick_start()
{
   Log_On(2); // 
   
   var INRstarV5 = set_system();  
   
   // View recent patients
   Goto_Recently_Viewed();
   // Select the last used
   preset_Fetch_Patient_Recent(INRstarV5);

   edit_patient_dob(INRstarV5);

}
function edit_patient_dob(INRstarV5)
{
      Log.Message("Editing Patient DoB - Under 12yo");

      w_today = aqDateTime.Today();
      w_testdob = aqDateTime.AddMonths(aqDateTime.Today(), -144);
      w_testdob = aqDateTime.AddDays(w_testdob, -1);
      
      for (i=0; i<3; i++)
      {
          Log.Message("Testing DoB : "+ w_testdob);
      
          Goto_Edit_Patient_Demographics();
          
          var w_dob_day = aqDateTime.GetDay(w_testdob);
          var w_dob_month = aqDateTime.GetMonth(w_testdob);
          var w_dob_year = aqDateTime.GetYear(w_testdob);

          test_edit_date_of_birth(INRstarV5, w_dob_year, w_dob_month, w_dob_day);

          // Increase DoB
          w_testdob = aqDateTime.AddDays(w_testdob, 1);
          
          aqDateTime

      }
}