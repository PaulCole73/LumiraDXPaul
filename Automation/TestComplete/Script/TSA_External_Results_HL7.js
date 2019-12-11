//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//USEUNIT Popup_Handlers
//--------------------------------------------------------------------------------
function create_hl7_message(datetime, patientID, patientNHS, surname, firstname, dob, gender, addr1, addr2, addr3, addr4, postcode, inr)
{
  var file = "C:\\Automation\\hl7\\hl7.txt"; 
  var file_exists = aqFile.Exists(file);
  if(file_exists == true)
  {
    aqFile.Delete(file)
  }

  var line1 = "MSH|^~\\&|iLABTP||||" + datetime + "||ORU^R01|32081737|T|2.4" + "\r\n";
  var line2 = "PID|||100321^^^HISID^CPD~" + patientID + "^^^PAT^CPD~" + patientNHS + "^^^NHS^NH||" + surname + "^" + firstname + "||" + dob + "|" + gender + "|"
              + "||" + addr1 + "^" + addr2 + "^" + addr3 + "^" + addr4 + "^" + postcode + "|||||||L6250726251|||||" + "\r\n";
  var line3 = "PV1|1|NH|ZZZZ4^Virtual GP Practice|||||||||||||||||||ORC|SC|||||||||||TCON^Test Consultant^^^^^CC|||||||||||||||||" + "\r\n";
  var line4 = "OBR|||P,15.0023433.D|PT^Prothrombin Time INR^HAE||" + datetime + "|" + datetime + "|||||||" + datetime + "|VB^^|F||||||||||||||||Stacy Burrows (Manager Section||||" + "\r\n";
  var line5 = "OBX|1|NM|PT^Prothrombin Time||10.0 |s|||||F" + "\r\n";
  var line6 = "NTE|1||" + "\r\n";
  var line7 = "OBX|1|NM|INR^I.N.R.||" + inr + " ||||||F" + "\r\n";
  var line8 = "NTE|1||" + "\r\n";
  
  var temp = aqString.Concat(line1, line2);
  temp = aqString.Concat(temp, line3);
  temp = aqString.Concat(temp, line4);
  temp = aqString.Concat(temp, line5);
  temp = aqString.Concat(temp, line6);
  temp = aqString.Concat(temp, line7);
  temp = aqString.Concat(temp, line8);
  
  aqFile.Create(file);
  aqFile.WriteToTextFile(file, temp, aqFile.ctUTF8);
}
//--------------------------------------------------------------------------------
function setup_hl7_message_data(datetime, patientID, patientNHS, surname, firstname, dob, gender, addr1, addr2, addr3, addr4, postcode, inr)
{
  if(datetime == null)
  {
    var dt = aqConvert.DateTimeToFormatStr(aqDateTime.Now(), "%Y%m%d%H%M");
  }
  else
  {
    var dt = aqConvert.DateTimeToFormatStr(datetime, "%Y%m%d%H%M");
  }
  
  var nhs = aqString.Remove(patientNHS, 3, 1);
  nhs = aqString.Remove(nhs, 6, 1);
  
  var dateofbirth;
  var split_array = new Array();
  split_array = dob.split("-");
  
  var month_num = aqDateTime.GetMonth(dob);
  if(month_num < 10)
  {
    month_num = "0" + month_num;
  }
  dateofbirth = split_array[2] + month_num + split_array[0];
  
  var gen;
  if(gender == "Male")
  {
    gen = "M"; 
  }
  else
  {
    gen = "F";
  }
  
  var patID;
  if(patientID == "None")
  {
    patID = "";
  }
  
  create_hl7_message(dt, patID, nhs, surname, firstname, dateofbirth, gen, addr1, addr2, addr3, addr4, postcode, inr)
}
//--------------------------------------------------------------------------------
function generate_hl7_message(patient_data_array, datetime)
{
  var patientID = patient_data_array[0];
  var patientNHS = patient_data_array[1];
  var surname = patient_data_array[3];
  var firstname = patient_data_array[4];
  var dob = patient_data_array[5];
  var gender = patient_data_array[7];
  var addr1 = patient_data_array[11];
  var addr2 = patient_data_array[12];
  var addr3 = patient_data_array[13];
  var addr4 = patient_data_array[14];
  var postcode = patient_data_array[16];
  var inr = "2.5";
  
  setup_hl7_message_data(datetime, patientID, patientNHS, surname, firstname, dob, gender, addr1, addr2, addr3, addr4, postcode, inr);
}
//--------------------------------------------------------------------------------
function send_hl7_message()
{
  var extension = get_hl7_file_folder();
  var hl7_path = "\\\\cm_srv2008\\c$\\Users\\Public\\Documents\\Iguana Channels\\" + extension;
  
  var old_path = "C:\\Automation\\hl7\\hl7.txt";
  var new_path = aqFileSystem.IncludeTrailingBackSlash(hl7_path) + "hl7.hl7";
  
  aqFileSystem.RenameFile(old_path, new_path, true);
  
  WaitSeconds(8, "Waiting for HL7 message to send..."); //wait for hl7 message to process
}

function dose_patient_external_result(table_position)
{
  if(table_position == null)
  {
    table_position = 1;
  }
  
  patient_external_results_table().Cell(table_position, 4).Panel(0).Panel("Div1").Button("DosePatient").Click();
}