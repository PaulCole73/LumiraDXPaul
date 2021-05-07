//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_hl7_file_folder()
{
  var folder_name;
  var base = "INRstarWindows";
  
  Log.Message(environment);
  
  switch(environment)
  {
    case base + "Coruscant": 
    folder_name = "Test_Coruscant HL7 Channel";
    break;
    case base + "Coruscant2": 
    folder_name = "Test_Coruscant2 HL7 Channel";
    break;
    case base + "Hoth": 
    folder_name = "Test_Hoth HL7 Channel";
    break;
    case base + "Tatooine": 
    folder_name = "Test_Tatooine HL7 Channel";
    break;
    case base + "Staging": 
    folder_name = "Staging HL7 Channel";
    break;
    case base + "Alderaan": 
    folder_name = "Test_Alderaan HL7 Channel";
    break;
    case base + "Naboo": 
    folder_name = "Test_Naboo HL7 Channel Wolves";
    break;
    case base + "Integration": 
    folder_name = "Integration HL7 Channel";
    break;
    case base + "CoruscantV4": 
    folder_name = "Test_Coruscant HL7 Channel";
    break;
    case base + "Coruscant2V4": 
    folder_name = "Test_Coruscant2 HL7 Channel";
    break;
    case base + "HothV4": 
    folder_name = "Test_Hoth HL7 Channel";
    break;
    case base + "TatooineV4": 
    folder_name = "Test_Tatooine HL7 Channel";
    break;
    case base + "StagingV4": 
    folder_name = "Staging HL7 Channel";
    break;
    case base + "AlderaanV4": 
    folder_name = "Test_Alderaan HL7 Channel";
    break;
  }
  
  Log.Message(folder_name);
  return folder_name;
}