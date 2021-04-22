//USEUNIT System_Paths
//USEUNIT Admin_Dash_System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Get_Functions
//USEUNIT Failed_Test_Handlers
//USEUNIT INRstar_Misc_Functions

//-----------------------------------------------------------------------------------
//New file to maintain new/consistent style and minimise duplication
//Use functions from here before anywhere else
//Add functions (in current style) if they are missing from here
//Put generic non-feature specific functions
//-----------------------------------------------------------------------------------
//Setup environment variable either from cmd line or default

var language = "Italian";
var environment = "INRstarWindowsITA-int1";
var environmentname = "uk-int1";
//var admin_dash_url = "https://admin-" + environmentname + ".lumiradxcaresolutions.com/";
var admin_dash_url = "https://admin-" + environmentname + ".caresolutions.lumiradx.com/";
var engage_url = "https://engage-" + environmentname + ".caresolutions.lumiradx.com/";
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
//Compares 2 values returns true if they dont match
function compare_values_dont_match(data_1,data_2,test_mess)
{
 if (data_1 == null || data_2 == null)
      {
        Log.Warning("Data not found");
        return false;
      } 
 
  if (data_1 != data_2)
  {
  return true;
  }
   else 
   Log.Message("Data matches test should fail - " + test_mess + " //" + data_1 + "//" + data_2 + "//");
   return false;
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
//Generic method for comparing state of a button
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
    Log.Message(mess + "//" + arrA + "//" + arrB + "//");
    return false;
  }
  for(var i = 0; i < arrA.length; i++)
  {
    if(arrA[i] != arrB[i])
    { 
      Log.Message("This is actual: " + arrA[i] + " -- This is the expected: " + arrB[i])
      return false;
    }
  }
  return true;
}
//--------------------------------------------------------------------------
//This allows checking of arrays that may contain 2,0 instead of 2.0 for an INR
function checkArrays_containing_inr_values(arrA, arrB, mess)
{
  if(arrA == null || arrB == null)
  {
    Log.Message("Fail - Data not found. Parameter value missing.");
    return false;
  }
  
  if(arrA.length !== arrB.length) 
  {
    Log.Message(mess + "//" + arrA + "//" + arrB + "//");
    return false;
  }
  for(var i = 0; i < arrA.length; i++)
  {    
    // If one field in the array doesn't match
    if(arrA[i] != arrB[i])
    { 
        // And if the language is italian
        if (language == "Italian")
        {
          // Replace any full stops with a comma so 2.0 becomes 2,0 for both fields
          var new_arrA = arrA[i].replace(".", ",");
          var new_arrB = arrB[i].replace(".", ",");
          
          // Now check if the modified fields match
          if(new_arrA != new_arrB)
          {
            // If they don't its a fail
            Log.Message("This is actual: " + arrA[i] + " -- This is the expected: " + arrB[i])
            return false;
          }
        }
        else
        {
          Log.Message("This is actual: " + arrA[i] + " -- This is the expected: " + arrB[i])
          return false;
        }
    } 
  }
  return true;
}
function thisis()
{
  var override_dose_path = treatment_override_field_container().Cell(1, 1).Select("Treatment_Dose").ClickItem(3);
}
//-----------------------------------------------------------------------------------
function validate_arrays_dont_match(arrA, arrB, mess)
{
  if(arrA.length == 0 || arrB.length == 0)
  {
    Log.Message("-------------------------------------- Empty Array. Please Check Validation --------------------------------------");
  }

  if(arrA == null || arrB == null)
  {
    Log.Message("Fail - Data not found. Parameter value missing.");
    return false;
  }
  
  for(var i = 0; i < arrA.length; i++)
  {
    if(arrA[i] == arrB[i])
    { 
      Log.Message(mess + "Failed: Data 1 was: " + arrB[i] + "// Data 2 was: " + arrA[i]);
      return false;
    }   
  }
  Log.Message(mess); 
  return true;
}
//-----------------------------------------------------------------------------------
//This is to test the data given only contains false as an answer for multiple results
function results_checker_are_false(result_set)
{
  for(var i = 0; i < result_set.length; i++)
  {
    if(result_set[i] == true)
    { 
      Log.Message("Found a true answer should have all been false")
      return false;
    }  
  }
  return true;
}   
//-----------------------------------------------------------------------------------
//This is to test the data given only contains false as an answer for a single result
function results_checker_is_false(result_set)
{
    if(result_set == true)
    { 
      Log.Message("Found a true answer should have been false")
      return false;
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
  Log.Message("This is the result set - " + result_set);
  if(result_set == true)
  {
    Log.Checkpoint(test_case);
  } 
  else
  {
    Log.Warning("Fail - " + test_case);
  }
}
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
  var num;
  
  if(high >= low)
  {
    do
    {
      num =  Math.trunc(Math.random()*high);
      if(num < low)
      {
        num = low;
      }
    }
    while(num < low)
  }
  else
  {
    num = 0;
  }
  
  return num;
}
//-----------------------------------------------------------------------------------
//Pass in the path of the date picker, the date you want to check
function date_picker(path, date, product)
{
  var base;
  if(product == "INRstar")
  {
    base = INRstar_base();
  }
  else if(product == "Admin Dash")
  {
    base = admin_dash_base();
  }
  else if(product == null)
  {
    base = INRstar_base();
  }
  else
  {
    base = INRstar_base();
  }
  
  WaitSeconds(2);
  var calendar = path.FindChild("ObjectIdentifier", "calendar_png", 2);
  calendar.Click();     
  datepicker = base.Panel("ui_datepicker_div");
  
  //date must be in format dd/mm/yyyy
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
function set_month(integer_month)
{
  const shortmonth = ['Blank','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var requested_month = shortmonth[parseInt(integer_month)];
  return get_string_translation(requested_month);
}
//-----------------------------------------------------------------------------------
function set_italian_long_month(month)
{
 var long_month;  

 switch(month)
 {
    case "January":
    long_month = "gennaio";
    break;
    case "February":
    long_month = "febbraio";
    break;  
    case "March":
    long_month = "marzo";
    break;  
    case "April":
    long_month = "aprile";
    break;  
    case "May":
    long_month = "maggio";
    break;  
    case "June":
    long_month = "giugno";
    break;  
    case "July":
    long_month = "luglio";
    break;  
    case "August":
    long_month = "agosto";
    break;  
    case "September":
    long_month = "settembre";
    break;  
    case "October":
    long_month = "ottobre";
    break;  
    case "November":
    long_month = "novembre";
    break;
    case "December":
    long_month = "dicembre";
    break;    
    default:
    Log.Message("Couldn't find the month you were looking for");    
 }                  
  return long_month;
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
function exception_occured(a, b) //randomly required 2 parameters
{
  Options.Run.Timeout = 0; //rush through test at erroro.");
}
//-----------------------------------------------------------------------------------
function setup_automation(new_config_file_name,locale)
{
  language = locale;
  Log.LockEvents(0);
  reset_tests_array();
  change_environments(new_config_file_name);
}
//-----------------------------------------------------------------------------------
function get_string_translation(translation_word)
{
 var lookup_column;
 var row_value;
 
 switch(language)
 {
   case "English":
   lookup_column = 0;
   break;
   case "Italian":
   lookup_column = 1;
   break;
   case "Spanish":
   lookup_column = 2;
   break;
   default:
   Log.Message("You didn't pass in a language I recognise you passed in " + language);
   break;
 }

 var driver = DDT.ExcelDriver("C:\\GIT\\Automation\\TestComplete\\Stores\\Files\\Locale.xls", "Sheet1");
 
 while (!driver.EOF())
 {
   if (driver.Value(0) == translation_word)
   {
     row_value = driver.Value(lookup_column);

     DDT.CloseDriver(DDT.CurrentDriver.Name);
     return row_value;     
   }     
   driver.Next();
 }

 Log.Message("I was looking for this word // " + translation_word + "// I never found it in the spreadsheet ?");
}
//-----------------------------------------------------------------------------------
//Just to quickly test things in the translation file
function testing_translation()
{

var test = get_string_translation("Duplicate");   

Log.Message(test)
}
//-----------------------------------------------------------------------------------
function get_english_translation(translation_word)
{
 var origin_language;
 var row_value;
 
 switch(language)
 {
   case "English":
   origin_language = 0;
   break;
   case "Italian":
   origin_language = 1;
   break;
   case "Spanish":
   origin_language = 2;
   break;
   default:
   Log.Message("You didn't pass in a language I recognise you passed in " + language);
   break;
 }
 
 var driver = DDT.ExcelDriver("C:\\GIT\\Automation\\TestComplete\\Stores\\Files\\Locale.xls", "Sheet1");
 
 while (!driver.EOF())
 {
   if (driver.Value(origin_language) == translation_word)
   {
     row_value = driver.Value(0);

     DDT.CloseDriver(DDT.CurrentDriver.Name);
     return row_value;     
   }     
   driver.Next();
 }
 Log.Message("I was looking for this word // " + translation_word + "// I never found it in the spreadsheet ?")
}
//-----------------------------------------------------------------------------------
//---------------------------------------------------------------------------------//
//                                External Apps                                    //
//---------------------------------------------------------------------------------//
function get_new_number_v5()
{
  var wnd;

  WaitSeconds(1);
  TestedApps.NHSNumberGenerator.Run(1, true);
  Sys.WaitProcess("NHSNumberGenerator");
  WaitSeconds(1);

  Sys.Process("NHSNumberGenerator").WaitWinFormsObject("Form1", "Generate NHS Number", 5000);
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
    mConfig.Fields.$set("Item", schema + "sendusing", 2); 
    //cdoSendUsingPort
    //mConfig.Fields.$set("Item", schema + "smtpserver", "ServerName"); // SMTP server
    //mConfig.Fields.$set("Item", schema + "smtpserverport", 25); // Port number

    //If you use Gmail --
    mConfig.Fields.$set("Item", schema + "smtpserver", "smtp.gmail.com");
    mConfig.Fields.$set("Item", schema + "smtpserverport", 25);
    mConfig.Fields.$set("Item", schema + "smtpusessl", 1);

    //If you use Outlook --
    //mConfig.Fields.$set("Item", schema + "smtpserver", "smtp-mail.outlook.com");
    //mConfig.Fields.$set("Item", schema + "smtpserverport", 25);

    //If you use Office365 --
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
function change_environments(new_config_file_name) //C:\Automation\ - config files should be 
{
  environment = new_config_file_name;
  var sys_path = Sys.Process("INRstarWindows").Path;
  var config_path = sys_path + ".config";
  var base_path = "C:\\Automation\\" + new_config_file_name;
  
  set_get_environment(new_config_file_name);
  
  aqFileSystem.DeleteFile(config_path);
  aqFileSystem.CopyFile(base_path, config_path, false);
  WaitSeconds(2);
  
  restart_INRstar();
  
  WaitSeconds(5);
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
function WaitSeconds(seconds, p_text)
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
function wait_for_object(obj_root, obj_property, obj_value, depth, wait_time, iterations)
{
  var counter = 0;
  
  if(wait_time == null || wait_time == "")
  {
    wait_time = 1;
  }
  if(iterations == null || iterations == "")
  {
    iterations = 20;
  }

  do
  {
    var is_obj_valid = false;
    obj_root.Refresh();
    
    var root = obj_root;
    var obj = root.FindChild(obj_property, obj_value, depth, true);
    counter++;
    
    if(obj.Exists == false)
    {
      //Log.Message("--------------------- Slow performance. Waiting for " + obj_value + "... ---------------------");
      WaitSeconds(wait_time, "Waiting for " + obj_value + "...");
    }
    else
    {
     // Log.Message(obj.Name + " is visible on screen: " + obj.VisibleOnScreen);
      obj.scrollIntoView();
      
      if(obj.VisibleOnScreen)
      {
        is_obj_valid = true;
        //Log.Message("Object: " + obj.Name + " found.");
      }
      else
      {
        //Log.Message("--------------------- Slow performance. Object currently not visible... ---------------------");
        WaitSeconds(wait_time, "Waiting for " + obj.Name + "...");
      }
    }
  }
  while(is_obj_valid == false && counter < iterations);
  if(is_obj_valid == false)
  {
    //Log.Picture(Sys.Desktop, "--------------------- " + obj_value + " Timed-out ---------------------");
    if(obj_value == "LogonPage")
    {
      restart_INRstar();
    }
  }
  return obj;
}
//-----------------------------------------------------------------------------------
function click_navigation_wrapper(object, obj_root, obj_property, obj_value, depth)
{
  //wait wrapper, this minimises timeouts
  var counter = 0;
  var is_valid_obj = false;
  if(object.Exists)
  {
    do 
    {
      INRstar_base().Refresh();
      object.Refresh();
      object.Click();
      var new_obj = wait_for_object(obj_root, obj_property, obj_value, depth, 1, 30);
      counter++
      
      if(new_obj.Exists)
      {
        if(new_obj.VisibleOnScreen)
        {
          //Log.Message("--------- Reached new page after click. ---------")
          is_valid_obj = true;
        }
        else
        {
          //Log.Message("Attempt: " + counter + ". Object not visible.")
        }
      }
      else
      {
        //Log.Message("Attempt: " + counter + ". Object does not exist.")
      }
    }
    while(is_valid_obj == false && counter < 4);
  }
}
//-----------------------------------------------------------------------------------
function move_mouse_sequence(value, per_iterations)
{
  var move_val = get_random_num_inrange(0, value);
  var move_direction = get_random_num_inrange(0, 2);
  if(move_direction < 1)
  {
    move_direction = -1;
  }
  var move_amount = move_val * move_direction;

  if(value % per_iterations  == 0)
  {
    LLPlayer.MouseMove(move_amount, 1, 1);
  }
}
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
  }
}
//-----------------------------------------------------------------------------------
function setup_automation_from_parameter()
{
  Log.LockEvents(0);
  reset_tests_array();
  //Setup environment variable either from cmd line or default
  var environmentname = "";
  var environment = "";
  var count_CL_Parameters = BuiltIn.ParamCount();
  Log.Message(count_CL_Parameters);
  var static_String_Env = "env=";
  var currentTestEnv = "",arr_TC_Parameter = null;
      
  if(count_CL_Parameters > 3) //This part is for running from Test Complete/Execute Commandline
  {
        for(var a = 0 ; a <= count_CL_Parameters ; a++)
        {
              if(aqString.Find(BuiltIn.ParamStr(a),static_String_Env,0,true) != -1)
              {
                    currentTestEnv = BuiltIn.ParamStr(a);
                    Log.Message(currentTestEnv);
                    arr_TC_Parameter = currentTestEnv.split("=");
                    if((arr_TC_Parameter != null) && (arr_TC_Parameter.length == 2))
                    {
                          environmentname = aqString.Remove(currentTestEnv, 0, 4);
                          environment = "INRstarWindows" + environmentname;
                          Log.Message("Command Line environment " + environment)
                          break;
                    }
                    else
                    {
                          throw "Environment Name not found"  
                    }                   
              }
        }
  }
  else //This part is for running from Test Complete/Execute manually
  {
    environment = "INRstarWindowsTatooine";
    environmentname = "Tatooine";test
  }
  Log.Message("Final check " + environmentname);
  var admin_dash_url = "https://admin-" + environmentname + ".lumiradxcaresolutions.com/";
  var engage_url = "https://engage-" + environmentname + ".lumiradxcaresolutions.com/";
  change_environments(environment);
}
//-------------------------------------------------------------------------------
function get_date_with_days_from_today_dd_mmm_yyyy(days) // will return either 12-mag-2020 or 12-May-2020 pending language
{
  //Calculate the date using the supplled offset (days) then return the English date in format eg: 12-May-2020
  date = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(aqDateTime.Today(),(days)), "%d-%b-%Y");
  
  //If the language is italian go off and convert the short month text to italian
  if (language == "Italian")
  {
    italian_short_month = get_string_translation(date.slice(3,6));
    date = date.slice(0,2) + '-' + italian_short_month + '-' + date.slice(7,11)
  }

  return date;
}
//-------------------------------------------------------------------------------
function get_todays_date_in_dd_mmm_yyyy() // will return either 12-mag-2020 or 12-May-2020 pending language
{
  todays_date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%d-%b-%Y");
  
  if (language == "Italian")
  {
    italian_short_month = get_string_translation(todays_date.slice(3,6));
    todays_date = todays_date.slice(0,2) + '-' + italian_short_month + '-' + todays_date.slice(7,11)
  }

  return todays_date;
}
//-----------------------------------------------------------------------------------
function get_unix_date_number_from_dd_mmm_yyyy(date) // eg: 12/mag/2020 or 12/may/2020
{
  var english_month = get_english_translation(date.slice(3,6)) // need to get english month of foreign
  var new_english_date = date.slice(0,2) + '/' + english_month + '/' + date.slice(7,11)
  var unix_number = Date.parse(new_english_date)
  
  return unix_number
}
//-----------------------------------------------------------------------------------
 
function get_date_as_dd_mm_yyyy_from_unix(date) 
{
  var d = new Date(date);
  
  var year = d.getFullYear()
  var month = d.getMonth()+1
  var day = d.getDate()
  
  if (month < 10) {month = "0" + month};
  if (day < 10) {day = "0" + day}
  
  new_date_format = (year + '-' + month + '-' + day);
  return new_date_format
}
//-------------------------------------------------------------------------------- 
function convert_date_from_dd_mmm_yyyy_to_get_date_as_dd_mm_yyyy(date)
{
    var unix_date = get_unix_date_number_from_dd_mmm_yyyy(date)
    var date_as_dd_mm_yyyy = get_date_as_dd_mm_yyyy_from_unix(unix_date) 
    return date_as_dd_mm_yyyy
}
//--------------------------------------------------------------------------------
function get_timestamps_for_now_object_with_changed_hours(operator, hours)
{
    //Get current Time 
    var now = new Date(Date.now())
    var timestamp = new Object();
    
    //Adjust by imported hours 

    //Feels like we should have just used the operator without the if/else statement not sur ewhy we have this ?
    if (operator == "+")  
    {
      now.setHours( now.getHours() +hours );
    }
      else if (operator == "-")  
         {
           now.setHours( now.getHours() -hours );
         }
    else    
    {
     Log.Warning('Invalid time adjustment operator');   
     return
    }
    
    //Break date down into vars
    day = now.getDate();
    month = now.getMonth()+1;
    year = now.getFullYear();
    hour = now.getHours();
    minutes = "0" + now.getMinutes()
    seconds = "0" + now.getSeconds()
    shortmonth = set_month(month)
    
    //Adjust formating of date variables

    if(month < 10) 
    {
     month = "0" + month
    }
    if(day < 10) 
    {
     day = "0" + day
    }
    if(hour < 10) 
    {
     hour = "0" + hour
    }
    minutes = minutes.substr(-2);
    seconds = seconds.substr(-2);
    
    //Add the timestamp that is used by the CSP eg: 2020-09-30T15:42:42
    timestamp.csp_payload = year+"-"+month+"-"+day+"T"+hour+":"+minutes+":"+seconds;
       
    //Add the timestamp with the short month text seen in INRstar patient Ext Results table eg: 31-Sep-2020 15:37:02
    timestamp.inr_patient_results = day+"-"+shortmonth+"-"+year+" "+hour+":"+minutes+":"+seconds;
    
    //Add the timestamp with the short month text seen in INRstar General Ext Results table eg: 31/09/2020 15:37:02
    timestamp.external_results = day+"/"+month+"/"+year+" "+hour+":"+minutes+":"+seconds;
    
    //Add the timestamp used in the historic treatments table eg: 02-Oct-2020
    timestamp.historic_treatments = day+"-"+shortmonth+"-"+year;
    
    return timestamp
}
//--------------------------------------------------------------------------------
function check_row_count_more_than_one(rowcount)
{
  if(rowcount < 3) //Header row counts as one row, we need two or more entries beside this
    {
      Log.Message("Data table not large enough to check sort order. only 1 entry exists");
      return false;
    }
  else 
  {
  return true;
  }
}
//-------------------------------------------------------------------------------- 
function check_sort_order_of_table(table, sort_order_cell)  //check_table_in_desc_order
{
  var rowcount = table.rowcount;
  
  // we need at least two entries in table to test
  var is_table_large_enough = check_row_count_more_than_one(rowcount)
    
  if (is_table_large_enough == true)
  {
    for(var i = 1; i < rowcount; i++)
    {
      cell_content = parseInt(table.Cell(i,sort_order_cell).contentText); // grab cell contents, convert to integer
        
      if (i > 1) //skip for first row since nothing to compare against
      {
        if (cell_content > last_value) //Check if cell_content is higher than previous entry
        {
           Log.Warning("Fail - Sort order of list is NOT highest at top");
           Log.Warning("Cell reference " + i + "," + sort_order_cell + "  has a value of " + cell_content)
           Log.Warning("Where as entry above this, has a value of " + last_value);
           return false;
         
        }
      }
      last_value = cell_content;
    }
    Log.Message("The entries are ordered correctly (from the highest to lowest)");
  }
  return true;
}
//-------------------------------------------------------------------------------- 
function check_date_sort_order_of_table(table, sort_order_cell, expected_sort_order)
{
  var rowcount = table.rowcount;
  
  // we need at least two entries in table to test
  var is_table_large_enough = check_row_count_more_than_one(rowcount)
    
  if (is_table_large_enough == true)
  {
    for(var i = 1; i < rowcount; i++)
    {
      date_string = table.Cell(i,sort_order_cell).contentText; // Get date string from cell in table
      date_unix = get_unix_date_number_from_dd_mmm_yyyy(date_string); // translate and convert date into unix format
        
      if (i > 1) //skip for first row since nothing to compare against also because I want the first value to be stored
      {
        if (date_unix < previous_date_unix && expected_sort_order == "asc") //Check if UNIX date number higher than previous entry - if so fail
        {
           Log.Message("Fail - Sort order of due list is NOT oldest at top");
           Log.Message("Cell reference " + i + "," + sort_order_cell + "  has a value of " + date_string)
           Log.Message("Where as entry above this, has a value of " + previous_date);
           return false;
        }
        if (date_unix > previous_date_unix && expected_sort_order == "desc") //Check if UNIX date number lower than previous entry - if so fail
        {
           Log.Message("Fail - Sort order of due list is oldest at top");
           Log.Message("Cell reference " + i + "," + sort_order_cell + "  has a value of " + date_string)
           Log.Message("Where as entry below this, has a value of " + previous_date);
           return false;
        }
      }
      previous_date_unix = date_unix;
      previous_date = date_string;
    }
    Log.Message("The entries are ordered correctly");
  }
  return true;
}
//--------------------------------------------------------------------------------
function setup_generic_patient(do_login, dm)
{
  //for(var i = 50; i < 60; i++)
  //{
    if(do_login == true)
    {
      login(5, "Shared");
    }
    add_patient("generic", "testing", "M");
    //add_treatment_plan("W", dm, "", "Shared", "");
    
    if(do_login == true)
    {
      Log_Off();
    }
  //}
}

//-----------------------------------------------------------------------------------
function create_random_char_string(length) {
   var char_string           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      char_string += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return char_string;
}
//-----------------------------------------------------------------------------------
function compare_objects(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  //Need to create an array for checking as we dont want it to just return false here really
  //Also if we order the objects here then we dont need to worry about someone getting the order wrong but might not work with nested objects??
  for (let key of keys1) {
    
    if (object1[key] !== object2[key]) {
      Log.Message("This key never matched in the object \\ " + key);
      return false;
    }
  }
  return true;
}
//-----------------------------------------------------------------------------------



function calculate_check_digit(fifteen_digit_fiscal)
{
  fifteen_digit_fiscal = aqString.ToUpper(fifteen_digit_fiscal);
  var error_message = "Value invalid. Please enter 15 digits only with values 0-9 A-Z.";
  
  if(aqString.GetLength(fifteen_digit_fiscal) < 15 || aqString.GetLength(fifteen_digit_fiscal) > 15)
  {
    Log.Message(error_message)
    return error_message;
  }
  
  var sum_of_values = 0; 
  
  var potential_values = new Array(); //all possible values that can be accepted/calculated on in this field
  potential_values.push("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
  var odd_character_code_values = new Array(); //converted values for characters in ODD positions in original
  odd_character_code_values.push(1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23);
  var even_character_code_values = new Array(); //converted values for characters in EVEN positions in original
  even_character_code_values.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25);
  var check_digit_values = new Array(); //values used for the check digit
  check_digit_values.push("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
  
  for(var i = 1; i <= aqString.GetLength(fifteen_digit_fiscal); i++) //check every value in entry code
  {
    var character_at_current_position = aqString.SubString(fifteen_digit_fiscal, i - 1, 1); //split values by character
    var position_in_array = null;
    var character_code_value;
    
    for(var j = 0; j < potential_values.length; j++) //find character in list of potential values
    {
      if(potential_values[j] == character_at_current_position)
      {
        position_in_array = j; //get the position the character appears
        break;
      }
    }
    
    if(position_in_array == null) //if a character is not found in the list of potential values then error
    {
      Log.Message(error_message)
      return error_message;
    }
    
    if(i % 2 != 0) //is the value odd
    {
      character_code_value = odd_character_code_values[position_in_array]; //if it is odd get the values at the matching position from the odd array
    }
    else
    {
      character_code_value = even_character_code_values[position_in_array]; //else get the values at the matching position from the even array
    }
    
    sum_of_values = sum_of_values + character_code_value; //sum each value that is generated
  }
  
  var remainder = sum_of_values % 26; //divide by number of letters in alphabet
  var check_digit = check_digit_values[remainder]; //remainder should be a number between 0 - 25 select the relevant value from the check_digit array
  
  Log.Message(check_digit);
  return check_digit;
}











