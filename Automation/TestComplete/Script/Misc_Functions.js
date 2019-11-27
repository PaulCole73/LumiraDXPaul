//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Get_Functions

//-----------------------------------------------------------------------------------
//New file to maintain new/consistent style and minimise duplication
//Use functions from here before anywhere else
//Add functions (in current style) if they are missing from here
//Put generic non-feature specific functions
//-----------------------------------------------------------------------------------

//---------------------------------------------------------------------------------//
//                            Validation Functions                                 //
//---------------------------------------------------------------------------------//
//Compares 2 values returns true if they match
function compare_values(data_1, data_2, test_mess)
{
  if(data_1 == null || data_2 == null)
  {
    Log.Message("Fail - Data not found. Parameter value missing.");
    Log.Message("Data 1: " + data_1 + "-------------- Data 2: " + data_2);
    return false;
  } 
  if(data_1 == data_2)
  {
    return true;
  }
  else
  { 
    Log.Message("Fail - Data doesn't match test failed - " + test_mess + " //" + data_1 + "//" + data_2 + "//");
    return false;
  }
}
//-----------------------------------------------------------------------------------
function table_contains_checker(actual_array, expected_data, test_mess)
{ 
  if(actual_array == null || expected_data == null)
  {
    Log.Message("Fail - Data not found. Parameter value missing.");
    return false;
  }
  if(actual_array.includes(expected_data))
  {
    return true;
  }
  else 
  {
    Log.Message("Fail - Data " + expected_data + " was not contained in table.");
    return false;
  } 
}
//-----------------------------------------------------------------------------------
function data_contains_checker(data_1, data_2, test_mess)
{
  if(data_1 == null || data_2 == null)
  {
    Log.Message("Fail - Data not found. Parameter value missing.");
    return false;
  }
  if (aqString.Find(data_1, data_2) != -1)
  {
    return true;
  }
  else
  {
    Log.Message("Fail - Data " + data_2 + " was not contained in " + data_1);
    return false;
  }
}
//-----------------------------------------------------------------------------------
//Generic method for checking state of a button
function button_checker(actual_state, expected_state, test_mess)
{
  if(actual_state == null || expected_state == null)
  {
    Log.Message("Fail - Data not found. Parameter value missing.");
    return false;
  }
  
  if(actual_state == true)
  {
    actual_state = "enabled";
  }
  else if(actual_state == false)
  {
    actual_state = "disabled";
  }
  else
  {
    actual_state = "undefined";
  }

  if(actual_state == expected_state)
  {
    Log.Message("Button state matches expected state " + test_mess)
    return true;
  }
  else
  {
    Log.Message("Button states dont match for " + test_mess + " Actual state was " + actual_state)
    return false;
  }
}
//-----------------------------------------------------------------------------------
function checkArrays(arrA, arrB, mess)
{
  if(arrA == null || arrB == null)
  {
    Log.Message("Fail - Data not found. Parameter value missing.");
    return false;
  }
  
  if(arrA.length !== arrB.length) 
  {
    Log.Warning(mess + "//" + arrA + "//" + arrB + "//");
    return false;
  }
  for(var i=0;i<arrA.length;i++)
  {
    if(arrA[i]!=arrB[i])
    { 
      Log.Message("This is actual: " + arrA[i] + " -- This is the expected: " + arrB[i])
      return false;
    }
  }
  return true;
}
//-----------------------------------------------------------------------------------
function validate_arrays_dont_match(arrA, arrB, mess)
{
  if(arrA == null || arrB == null)
  {
    Log.Message("Fail - Data not found. Parameter value missing.");
    return false;
  }
  
  for(var i=0;i<arrA.length;i++)
  {
    if(arrA[i] == arrB[i])
    { 
      Log.Message(mess + " - TEST FAILED" + ' ON the following ' + arrB[i] + ' was the same as ' + arrA[i])
      return false;
    }   
  }
  Log.Message(mess); 
  return true;
}
//-----------------------------------------------------------------------------------
//This is to test the data given only contains false as an answer
function results_checker_are_false(result_set)
{
  for(var i=0;i<result_set.length;i++)
  {
    if(result_set[i] == true)
    { 
      Log.Message("Found a true")
      return false;
    }  
  }
  return true;
}   
//-----------------------------------------------------------------------------------
//This is to test the data given only contains true as an answer
function results_checker_are_true(result_set)
{
  for(var i=0;i<result_set.length;i++)
  {
    if(result_set[i] == false)
    { 
      Log.Message("Found a false");
      return false;
    }  
  }
  return true;
}
//-----------------------------------------------------------------------------------
//This is to test the result set of a test case and return pass or fail
function results_checker(result_set, test_case)
{
  if(result_set == true)
  {
    Log.Checkpoint(test_case);
  } 
  else
  {
    Log.Warning("Fail - " + test_case);
  }
}
//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                            Audit Functions                                      //
//---------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------
//Checking top audit on the patient tab
function validate_top_patient_audit(test_case_title, w_data)
{  
  Goto_Patient_Audit();
  var patient_audit_path = patient_audit()
  var audit_data = patient_audit_path.Cell(1, 1).innerText;

  if(audit_data == w_data)
  {
    Log.Message(test_case_title + "- Audit was written");
    return true;
  }
  else 
  {
    Log.Message(test_case_title + " Test Failed - Patient audit record not found " + " This is the actual audit // " 
                                + audit_data + " // This is the expected audit // " + w_data + " //");
    return false;
  }
}
//-----------------------------------------------------------------------------------
//Checking specific audit on the patient tab
function validate_specific_entry_patient_audit(item_no, data, title)
{  
  Goto_Patient_Audit();
  var audit_data = patient_audit().Cell(item_no, 1).innerText;

  if (audit_data == data)
  {
    Log.Message(title + " - Audit was written");
    return true;
  }
  else 
  {
    Log.Message(title + " Test Failed - Patient audit record not found." + " This is the actual audit: // " 
                                      + audit_data + " // This is the expected audit: // " + data + " //");
    return false;
  }
}
//-----------------------------------------------------------------------------------
//Checking specific audit on the patient tab
function validate_more_info_specific_entry_patient_audit(item_no, data, title)
{  
  Goto_Patient_Audit();
  var audit_data = patient_audit().Cell(item_no, 3).innerText;
  
  if(audit_data.includes(data))
  {
    Log.Message("This is the row data: // " + audit_data + " // - This is what I am looking for: // " + data + " //");
    return true;
  }
  else 
  {
    Log.Warning("Audit data not found " + audit_data + " - " + audit_data);
    return false;
  }
}
//-----------------------------------------------------------------------------------
//Checking top audit on the system audit
function validate_top_system_audit(test_case_title, w_data)
{  
  Goto_System_Audit();
  var audit_data = system_audit().Cell(1, 1).innerText;

  if (audit_data == w_data)
  {
    Log.Message(test_case_title + " - Correct Top Audit");
    return true;
  }
  else 
  {
    Log.Message(test_case_title + "Test Failed - Patient audit record not found " + audit_data + " - " + w_data);
    return false;
  }
}
//-----------------------------------------------------------------------------------
function validate_top_treatment_audit(w_data)
{  
  var INRstarV5 = INRstar_base();
  w_au_table = INRstarV5.Panel(2).Panel("DialogContent").Panel("TreatmentAuditTrailWrapper").Table("AuditTrailTable");
  var wt_row = w_au_table.Cell(1, 1).innerText;

  if (wt_row == w_data)
  {
    Log.Message(wt_row + " - " + w_au_table.Cell(1,2).innerText);
    return true;
  }
  else
  {
    Log.Message("Treatment audit record not found : " + w_data);
    return false;
  }
  INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).Click();
}
//------------------------------------------------------------------------------------
// Get the top patient audit record more information
function validate_more_info_top_patient_audit(w_data)
{  
  Goto_Patient_Audit();
  var wt_row = patient_audit().Cell(1, 3).innerText;

  if(wt_row.includes(w_data))
  {
    Log.Message('This is the row data // ' + wt_row + " // - This is what I am looking for // " + w_data + ' //');
    return true;
  }
  else 
  {
    Log.Message("Audit data not found " + wt_row + "\r\n\r\n" + "This is what I am looking for // " + w_data);
    return false;
  }
}
//-----------------------------------------------------------------------------------
// Get the top treatment audit record more information
function validate_more_info_top_treatment_audit(w_data)
{  
  Goto_Patient_Treatment_Audit();
  var wt_row = treatment_audit().Cell(1, 3).innerText;

  if(wt_row.includes(w_data))
  {
    Log.Message("This is the row data // " + wt_row + " // - This is what I am looking for // " + w_data + " //");
    return true;
  }
  else 
  {
    Log.Message("Audit data not found: " + wt_row + "\r\n\r\n" + "This is what I am looking for // " + w_data);
    return false;
  }
}
//-----------------------------------------------------------------------------------
// Get the top system audit record more information
function validate_more_info_top_system_audit(w_data)
{  
  Goto_System_Audit()
  var wt_audit = system_audit();
  var wt_row = wt_audit.Cell(1, 3).innerText;

  if(wt_row.includes(w_data))
  {
    Log.Message('This is the row data // ' + wt_row + " // - This is what I am looking for // " + w_data + ' //');
    return true;
  }
  else 
  {
    Log.Message("Audit data not found " + wt_row + "\r\n\r\n" + "This is what I am looking for // " + w_data);
    return false;
  }
}
//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                             Misc Functions                                      //
//---------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------
function new_guid(char_count)
{
  if(char_count == null)
  {
    char_count = 25;
  }

  var sGuid="";
  for (var i = 0; i < char_count; i++)
  {
    sGuid+=Math.floor(Math.random()*0xF).toString(0xF);
  }
  return sGuid;       
}
//-----------------------------------------------------------------------------------
function get_unique_number()
{
  WaitSeconds(1);
  var date_now = aqConvert.DateTimeToFormatStr(aqDateTime.Now(), "%d/%m/%Y %H:%M:%S");
  
  var split_1 = date_now.split(" ");
  var split_2 = split_1[0].split("/");
  var split_3 = split_1[1].split(":");
  
  var temp = "";
  temp = aqString.Concat(split_2[0], split_2[1]);
  temp = aqString.Concat(temp, split_2[2]);
  temp = aqString.Concat(temp, split_3[0]);
  temp = aqString.Concat(temp, split_3[1]);
  temp = aqString.Concat(temp, split_3[2]);
  return temp;
}
//-----------------------------------------------------------------------------------
function get_random_num_inrange(low, high)
{
  var num
  
  do
  {
    num =  Math.trunc(Math.random()*high);
  }
  while(num < low)
  
  return num;
}
//-----------------------------------------------------------------------------------
//Pass in the path of the date picker, the date you want to check
function date_picker(path, date)
{
  var INRstarV5 = INRstar_base(); 
  
  path.Panel(0).Image("calendar_png").Click();     
  datepicker = INRstarV5.Panel("ui_datepicker_div");
  
  var expiry_date = date; 
    
  var w_yr = aqString.SubString(expiry_date,6,4);
  var w_mth = aqConvert.StrToInt(aqString.SubString(expiry_date,3,2));
  var w_day = aqString.SubString(expiry_date,0,2);
           
  datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(w_yr));
  datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_mth));
  var status = select_day(w_day, datepicker);
  
  if(status == "Link(0)")
  {
    status = "active";
  }
  else if(status == "TextNode(0)")
  {
    status = "inactive";
  }
  
  return status;
}
//-----------------------------------------------------------------------------------
function select_day(p_day, p_datepicker)
{
  // remove any leading '0' from p_day
  p_day = aqConvert.IntToStr(aqConvert.StrToInt(p_day));
  var day_to_click;

  var w_classname = p_datepicker.Table(0).Cell(2,0).classname;
  var wi_innerText;
  if (aqString.Find(w_classname, "ui-state-disabled") > 0)
  {
    wi_innerText = p_datepicker.Table(0).Cell(2,0).TextNode(0).innerText;
  }
  else
  {
    wi_innerText = p_datepicker.Table(0).Cell(2,0).Link(0).innerText;
  }
    
  var w_start_col = 8 - wi_innerText;
  var w_col = 0;
  var w_row = 0;
  
  if (w_start_col < 0)
  {
    Log.Error("Start Column Error");
  }
  else
  {
    for (r=1; r<7; r++)
    {
      for (c=w_start_col; c<7; c++)
      {
        w_start_col = 0;
        if (p_datepicker.Table(0).Cell(r, c).innerText != "")
        {
          if (p_datepicker.Table(0).Cell(r, c).InnerText == p_day)
          {
            day_to_click = p_datepicker.Table(0).Cell(r, c).Child(0);
            w_col = c;
            w_row = r;
            r = 10; //to end loop 1
            break;
          }
        }
      }
    }
  }
  day_to_click.Click();
  return day_to_click.Name;
}
//-----------------------------------------------------------------------------------
function set_month(p_m)
{
  //Note - input month must be in numeric format   
  var wa_Mth = new Array(13);                   
  wa_Mth[0] = "";
  wa_Mth[1] = "Jan";
  wa_Mth[2] = "Feb";
  wa_Mth[3] = "Mar";
  wa_Mth[4] = "Apr";
  wa_Mth[5] = "May";
  wa_Mth[6] = "Jun";
  wa_Mth[7] = "Jul";
  wa_Mth[8] = "Aug";
  wa_Mth[9] = "Sep";
  wa_Mth[10] = "Oct";
  wa_Mth[11] = "Nov";
  wa_Mth[12] = "Dec";
  
  var w_Month = wa_Mth[p_m];
  
  return w_Month;
}
//-----------------------------------------------------------------------------------
function get_user_level(user_val)
{
  var user_level;
  var login_details = new Array();
  login_details = get_login_details();
  
  /*
  switch(user_val)
  {
    case 0: 
    user_level = login_details[0];
    break;
    case 1: 
    user_level = login_details[1];
    break;
    case 2: 
    user_level = login_details[2];
    break;
    case 3: 
    user_level = login_details[3];
    break;
    case 4: 
    user_level = login_details[4];
    break;
    case 5: 
    user_level = login_details[5];
    break;
    case 6: 
    user_level = login_details[6];
    break;
    case 7: 
    user_level = login_details[7];
    break;
    case 8: 
    user_level = login_details[8];
    break;
  }
  */
  
  return login_details[user_val];
}
//-----------------------------------------------------------------------------------
function get_dosing_method(dm)
{
  var dose_method;
  
  switch(dm)
  {
    case 0: 
    dose_method = "Coventry";
    break;
    case 1: 
    dose_method = "Hillingdon";
    break;
    case 2: 
    dose_method = "Fast";
    break;
    case 3: 
    dose_method = "Oates";
    break;
    case 4: 
    dose_method = "Tait";
    break;
    case 5: 
    dose_method = "Manual";
    break;
  }
  
  return dose_method;
}
//-----------------------------------------------------------------------------------
function process_button_exists(button_id)
{
  var INRstarV5 = INRstar_base();
  var button_to_find = INRstarV5.NativeWebObject.Find("idStr", button_id);
  if (button_to_find.Exists == false)
  {  
    Log.Message("'" + button_id + "' not on screen.");
  }
  else
  {
    Log.Message("'" + button_id + "' on screen.");
    Sys.HighlightObject(button_to_find, 2);
    button_to_find.Click();
  }
}
//-----------------------------------------------------------------------------------
function process_object_exists(content_type, content_data)
{
  WaitSeconds(3, "Waiting for object...");
  var object = INRstar_base().NativeWebObject.Find(content_type, content_data);
  Log.Message(object.Exists);
  if(object.Exists)
  {
    return true;
  }
  else
  {
    return false;
  }
}
//-----------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//---------------------------------------------------------------------------------//
//                                External Apps                                    //
//---------------------------------------------------------------------------------//
function get_new_number_v5()
{
  var wnd;

  WaitSeconds(1);
  TestedApps.NHSNumberGenerator.Run(1, true);
  WaitSeconds(1);

  form = Sys.Process("NHSNumberGenerator").WinFormsObject("Form1");
  form.WinFormsObject("button1").ClickButton();

  wnd = form.WinFormsObject("textBox1").wText;

  form.Close();
  return wnd;
}
//-----------------------------------------------------------------------------------
function send_email(mFrom, mTo, mSubject, mBody, mAttach)
{
  var schema, mConfig, mMessage;

  try
  {
    var pass = get_login_details(20);
    schema = "http://schemas.microsoft.com/cdo/configuration/";
    mConfig = getActiveXObject("CDO.Configuration");
    mConfig.Fields.$set("Item", schema + "sendusing", 2); // cdoSendUsingPort
    //mConfig.Fields.$set("Item", schema + "smtpserver", "ServerName"); // SMTP server
    //mConfig.Fields.$set("Item", schema + "smtpserverport", 25); // Port number

    // If you use Gmail --
    mConfig.Fields.$set("Item", schema + "smtpserver", "smtp.gmail.com");
    mConfig.Fields.$set("Item", schema + "smtpserverport", 25);
    mConfig.Fields.$set("Item", schema + "smtpusessl", 1);

    // If you use Outlook --
    // mConfig.Fields.$set("Item", schema + "smtpserver", "smtp-mail.outlook.com");
    // mConfig.Fields.$set("Item", schema + "smtpserverport", 25);

    // If you use Office365 --
    //mConfig.Fields.$set("Item", schema + "smtpserver", "smtp.office365.com");
    //mConfig.Fields.$set("Item", schema + "smtpserverport", 587);
    //mConfig.Fields.$set("Item", schema + "smtpusessl", 1);

    mConfig.Fields.$set("Item", schema + "smtpauthenticate", 1); // Authentication mechanism
    mConfig.Fields.$set("Item", schema + "sendusername", "AutomationLumira"); // User name (if needed)
    mConfig.Fields.$set("Item", schema + "sendpassword", pass); // User password (if needed)
    mConfig.Fields.Update();

    mMessage = getActiveXObject("CDO.Message");
    mMessage.Configuration = mConfig;
    mMessage.From = mFrom;
    mMessage.To = mTo;
    mMessage.Subject = mSubject;
    mMessage.HTMLBody = mBody;

    aqString.ListSeparator = ",";
    for(let i = 0; i < aqString.GetListLength(mAttach); i++)
      mMessage.AddAttachment(aqString.GetListItem(mAttach, i));
    mMessage.Send();
  }
  catch(exception)
  {
    Log.Error("Email cannot be sent", exception.message);
    return false;
  }
  Log.Message("Message to <" + mTo + "> was successfully sent");
  return true;
}
//-----------------------------------------------------------------------------------
function email_and_archive(send_mail, name)
{
  var email;
  if(send_mail == null)
  {
    email = true;
  }
  else
  {
    email = send_mail;
  }
  
  if(email == true)
  {
    var master_path = Project.ConfigPath;
    var file_name = pack_results(name);
    var archive_dir = "Q:\\Development and Testing\\Testing\\Automation Archive\\";
    send_email("AutomationLumira@gmail.com", "automatedtesting@lumiradx.com", "Automation", "Automation Test Results", file_name + ".zip");
    aqFileSystem.MoveFile(file_name + ".zip", archive_dir, true);
    aqFileSystem.DeleteFile(file_name + ".mht");
  }
}
//-----------------------------------------------------------------------------------
function pack_results(name)
{
  var work_dir, file_name, file_list, archive_path, date;
  
  work_dir = Project.ConfigPath + "Log\\ExportedResults\\";
  date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d_%m_%y")
  zip_name = work_dir + name + "_" + date;
  file_name = zip_name + ".mht";
  
  Log.SaveResultsAs(file_name, 2);
  file_list = slPacker.GetFileListFromFolder(work_dir);
  if (slPacker.Pack(file_list, work_dir, zip_name))
  {
    return zip_name;
    Log.Message("Files compressed successfully."); 
  }  
}
//-----------------------------------------------------------------------------------
function reset_folder()
{
  var work_dir = Project.ConfigPath + "Log\\ExportedResults\\";
  aqFileSystem.DeleteFolder(work_dir, true);
}
//-----------------------------------------------------------------------------------
function restart_INRstar()
{
  var path = Sys.Process("INRstarWindows").Path;
  
  Sys.Process("INRstarWindows").Close();
  
  Win32API.WinExec(path, SW_SHOWNORMAL);
}
//-----------------------------------------------------------------------------------
function change_environments(new_config_file_name) //Q:\Development and Testing\Testing\EnvironmentConfigs - config files can be found here
{
  var sys_path = Sys.Process("INRstarWindows").Path;
  var config_path = sys_path + ".config";
  var base_path = "Q:\\Development and Testing\\Testing\\EnvironmentConfigs\\" + new_config_file_name;
  
  set_get_environment(new_config_file_name);
  
  aqFileSystem.DeleteFile(config_path);
  aqFileSystem.CopyFile(base_path, config_path, false);
  WaitSeconds(2);
  
  restart_INRstar();
  WaitSeconds(30);
}
//-----------------------------------------------------------------------------------
function open_file_in_notepad(path)
{
  TestedApps.notepad.Run();
  
  var notepad = Sys.Process("notepad");
  var wndNotepad = notepad.Window("Notepad");

  // Open a file in Notepad
  wndNotepad.MainMenu.Click("File|Open...");
  notepad.Window("#32770", "Open").OpenFile(path);
}



//-----------------------------------------------------------------------------------
//---------------------------------------------------------------------------------//
//                                Wait Functions                                   //
//---------------------------------------------------------------------------------//
function WaitSeconds(seconds,p_text)
{
  if (p_text == "")
  {
    BuiltIn.Delay(seconds * 1000, "Paused the testing");
  } 
  else
  {
    BuiltIn.Delay(seconds * 1000, p_text);
  }  
}





//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//---------------------------------------------------------------------------------//
//                                Needs Work                                       //
//---------------------------------------------------------------------------------//
//Function for testing if field passed in is a label or can be edited
function test_field(p_field, p_field_name, exp_object_type)
{
  //get the object type based on expected and pass in
  if(exp_object_type == "read_only")
  {
    if (p_field.ObjectType == "Label") 
    {
      Log.Message(p_field_name + " " + "Field is read only TEST PASS");
      return true;
    }
    else
    {
      Log.Message(p_field_name + " " + "Field can be edited Field FAIL");
      return false;
    }
  }
  //Going to need to add in other type of fields here at the moment this method only handles drop down or label but other valid ones could be check box, text entry etc
  if(exp_object_type == "editable_field")
  {
    if (p_field.ObjectType == "Label") 
    {
      Log.Message(p_field_name + " " + "Field is read only TEST FAIL");
      return false;
    }
    else
    {
      Log.Message(p_field_name + " " + "Field can be edited Field PASS");
      return true;
    }
  }
}
//-----------------------------------------------------------------------------------
function delete_files() //intended to go into a wipe a log file, isn't functioning
{
  var oFolder, colFiles, temp;
  var file_path = new Array();
  var log_dir = Log.Path;
  Log.Message(log_dir);
  
  oFolder = aqFileSystem.GetFolderInfo(log_dir);
  colFiles = oFolder.Files;

  while (colFiles.HasNext())
  {
    temp = colFiles.Next();
    Log.Message(temp.Name);
    
    file_path.push(log_dir + temp.Name);
  }
  
  for(var i = 0; i < file_path.length; i++)
  {
    aqFile.Delete(file_path[i]);
  }
}
//-----------------------------------------------------------------------------------
function set_get_environment(env)
{
  var environment;
  
  if(env == null)
  {
    //do nothing
    return environment;
  }
  else
  {
    environment = env;
    return environment;
  }
}