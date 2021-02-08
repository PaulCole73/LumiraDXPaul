//USEUNIT TC_Adverse_Event
//USEUNIT TC_Bespoke_Letters
//USEUNIT TC_Bridging
//USEUNIT TC_Clinics_Appointments
//USEUNIT TC_Diagnosis
//USEUNIT TC_External_Patient_Lookup
//USEUNIT TC_Home_Page
//USEUNIT TC_Loc_Management_Users
//USEUNIT TC_Login
//USEUNIT TC_NEQAS
//USEUNIT TC_Notes
//USEUNIT TC_Options_IQC
//USEUNIT TC_Patient_Add
//USEUNIT TC_Patient_Demographics
//USEUNIT TC_Patient_Management
//USEUNIT TC_Patient_Recently_Viewed
//USEUNIT TC_Patient_Search
//USEUNIT TC_Patient_Tests_Due
//USEUNIT TC_PoCT
//USEUNIT TC_Reviews
//USEUNIT TC_Treatment
//USEUNIT TC_Treatment_Plan
//USEUNIT Misc_Functions
//USEUNIT INRstar_Misc_Functions

//---------------------------------------------------------------------------------//
//                              GLOBAL VARIABLES                                   //
//---------------------------------------------------------------------------------//
var test_names = new Array(); //array must be global so it remains in scope and can be added to by external functions


//---------------------------------------------------------------------------------//
//                            Failed Test Functions                                //
//---------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------
//Resets the array to hold a list of the units/tests that fail during a run
//Tests are entered into this array when they throw their respective catch blocks
function reset_tests_array() 
{
  Options.Run.Timeout = 25000;
  test_names.length = 0;
}
//-----------------------------------------------------------------------------------
//Enters tests into array via catch block, resets the timeout duration to default, restarts application to clear window
function handle_failed_tests(suite_name, test_name)
{
  Options.Run.Timeout = 25000;
  var name = suite_name + "." + test_name;
  var is_new = true;

  if(test_names.length != 0)
  {
    for(var i = 0; i < test_names.length; i++)
    {
      if(name == test_names[i])
      {
        is_new = false;
      }
      else
      {
        is_new = true;
      }
    }
  }
  if(is_new == true)
  {
    test_names.push(name);
  }
  restart_INRstar();
}
//-----------------------------------------------------------------------------------
//Loops through all tests that have failed at the end of an automation run
//only loops through the number that are present at the first call will not re-run tests that fail a second time
function retest_failed_automation_tests()
{
  WaitSeconds(2);
  var size = test_names.length;
  if(test_names.length > 0)
  {
    for(var i = 0; i < size; i++)
    {
      Runner.CallMethod(test_names[i]);
    }
  }
}
