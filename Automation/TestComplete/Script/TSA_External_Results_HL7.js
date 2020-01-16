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
  if(datetime == null || datetime == "")
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
  
  var patID = patientID;
  if(patientID == "None")
  {
    patID = "";
  }
  
  create_hl7_message(dt, patID, nhs, surname, firstname, dateofbirth, gen, addr1, addr2, addr3, addr4, postcode, inr)
}
//--------------------------------------------------------------------------------
function generate_hl7_message(patient_data_array, datetime, inr)
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
  
  if(inr == null)
  {
    var inr_val = "2.5";
  }
  else
  {
    var inr_val = inr;
  }
  
  setup_hl7_message_data(datetime, patientID, patientNHS, surname, firstname, dob, gender, addr1, addr2, addr3, addr4, postcode, inr_val);
}
//--------------------------------------------------------------------------------
function send_hl7_message()
{
  var extension = get_hl7_file_folder();
  var hl7_path = "\\\\cm_srv2008\\c$\\Users\\Public\\Documents\\Iguana Channels\\" + extension;
  
  var old_path = "C:\\Automation\\hl7\\hl7.txt";
  var new_path = aqFileSystem.IncludeTrailingBackSlash(hl7_path) + "hl7.hl7";
  
  aqFileSystem.RenameFile(old_path, new_path, true);
  
  WaitSeconds(15, "Waiting for HL7 message to send..."); //wait for hl7 message to process
}
//--------------------------------------------------------------------------------
function dose_patient_external_result(table_position, text_index)
{
  Goto_Patient_Results();
  if(table_position == null)
  {
    table_position = 1;
  }
  patient_external_results_table().Cell(table_position, 4).Panel(0).Panel("Div1").Button("DosePatient").Click();
  
  var text;
  if(text_index == null || text_index == 0)
  {
    text = process_popup("Historic Treatment", "OK");
  }
  else if(text_index == 1)
  {
    text = process_popup("Please confirm", "Confirm");
  }
  
  return text;
}
//--------------------------------------------------------------------------------
function validate_hl7_buttons(button_id)
{
  Goto_Patient_Results();
  
  var obj;
  
  if(patient_external_results_table().Cell(1, 0).innerText != "There are no new results")
  {
      var table = patient_external_results_table().Cell(1, 4).Panel(0).Panel("Div1");
      var button = table.FindChild("idStr", button_id);
      var obj = button.Exists;
  }
  
  return obj;
}
//--------------------------------------------------------------------------------
function dose_external_result(dose, review_days, dm)
{
  var external_result_data = new Array();
  //results are entered into array in order "0: INR, 1: Date, 2: Checkbox 1, 3: Checkbox 2, 4: Checkbox 3, 5: Comments Box, 6: Checkbox 4"
  
  if(dm == null)
  {
    dm = "manual";
  }
  
  if(dm == "manual")
  {
    //check INR value is the same as entered into engage
    var INR_value = pre_treatment_non_induct_path().Panel(1).Select("INR").wText;
    external_result_data.push(INR_value);
   
    //check test date is the same as entered into engage
    var INR_date = pre_treatment_non_induct_path().Panel(0).Label("Date_Value_DetachedLabel").contentText;
    external_result_data.push(INR_date);
   
    //check the clinical question tickboxes
    var changed_dose_checkbox = patient_INR_treatment_questions().Panel("LastTreatment").Checkbox("PatientChangedLastTreatment").checked;
    external_result_data.push(changed_dose_checkbox);
    patient_INR_treatment_questions().Panel("LastTreatment").Checkbox("PatientChangedLastTreatment").ClickChecked(false);
   
    var missed_dose_checkbox = patient_INR_treatment_questions().Panel("MissedDose").Checkbox("MissedDoses").checked;
    external_result_data.push(missed_dose_checkbox);
      
    var changed_medication_checkbox = patient_INR_treatment_questions().Panel("ChangedMedications").Checkbox("ChangedMedication").checked;
    external_result_data.push(changed_medication_checkbox);
 
    //check the comments contain the correct details entered into engage
    var actual_submission_comments = patient_INR_treatment_questions().Panel("NewINRComments").Textarea("Comments").contentText;
    external_result_data.push(actual_submission_comments);
  
    var self_check_tickbox = pending_treatment_buttons().Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm").Panel("PatientTreatmentNewINRQuestionsWrapper").Panel("PatientTreatmentNewINRTestDetails").Fieldset("Options").Panel(2).Checkbox("SelfTested").checked;
    external_result_data.push(self_check_tickbox); 
  
    //complete and save the treatment
    var test_info_path = treatment_inr_test_info_path()
    test_info_path.Panel(0).Select("Dose").ClickItem(dose);
    test_info_path.Panel(2).Select("Review").ClickItem(review_days);
   
    var treatment_button_path = treatment_buttons_pre_schedule();
    treatment_button_path.SubmitButton("SubmitManualDose").Click();
    handle_poct_expired();
  
    //Confirm the values
    var INRstarV5 = INRstar_base();
    var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
    wbt_Confirm.Click();
 
    process_popup("Insert Confirmation", "Confirm");
    WaitSeconds(2, "Saving the Treatment");
 
    //Save the INR
    var pending_treatment_buttons_path = pending_treatment_buttons();
    pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
  }
  else if(dm == "maintenance")
  {
    //check INR value is the same as entered into engage
    var INR_value = pre_treatment_non_induct_path().Panel(1).Select("INR").wText;
    external_result_data.push(INR_value);
   
    //check test date is the same as entered into engage
    var INR_date = pre_treatment_non_induct_path().Panel(0).Label("Date_Value_DetachedLabel").contentText;
    external_result_data.push(INR_date);
   
    //check the clinical question tickboxes
    var changed_dose_checkbox = patient_INR_treatment_questions().Panel("LastTreatment").Checkbox("PatientChangedLastTreatment").checked;
    external_result_data.push(changed_dose_checkbox);
    patient_INR_treatment_questions().Panel("LastTreatment").Checkbox("PatientChangedLastTreatment").ClickChecked(false);
   
    var missed_dose_checkbox = patient_INR_treatment_questions().Panel("MissedDose").Checkbox("MissedDoses").checked;
    external_result_data.push(missed_dose_checkbox);
      
    var changed_medication_checkbox = patient_INR_treatment_questions().Panel("ChangedMedications").Checkbox("ChangedMedication").checked;
    external_result_data.push(changed_medication_checkbox);
 
    //check the comments contain the correct details entered into engage
    var actual_submission_comments = patient_INR_treatment_questions().Panel("NewINRComments").Textarea("Comments").contentText;
    external_result_data.push(actual_submission_comments);
  
    var self_check_tickbox = pending_treatment_buttons().Panel("PatientTreatmentNewINRWrapper").Form("NewINRForm").Panel("PatientTreatmentNewINRQuestionsWrapper").Panel("PatientTreatmentNewINRTestDetails").Fieldset("Options").Panel(1).Checkbox("SelfTested").checked;
    external_result_data.push(self_check_tickbox); 
   
    var save_button_pre_schedule = treatment_buttons_pre_schedule();
    save_button_pre_schedule.SubmitButton("CalculateWarfarinDose").Click();
    handle_poct_expired();
    
    process_popup("Please confirm that the following is correct", "Confirm");
    WaitSeconds(1);
  
    process_alternate_popup("Please acknowledge", "Confirm");
 
    //Save the INR
    var pending_treatment_buttons_path = pending_treatment_buttons();
    pending_treatment_buttons_path.Panel("PendingTreatmentInfo").Panel(0).Button("AcceptPendingTreatment").Click();
  }
  
  return external_result_data;
}