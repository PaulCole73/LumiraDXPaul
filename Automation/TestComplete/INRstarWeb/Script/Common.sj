var applicationURL,objectWindow,Driver,siteUrl,browser;
readUserSettings();
function readUserSettings()
//This function will intailase the settings required by the user for the testing procedure.
{ 
//  var path = "C:/SCSL/Testing/Automated QA";
//  Driver = DDT.ExcelDriver(path+"/Test Configurations.xls", "Conditions"); 
//
//  switch(DDT.CurrentDriver.Value(0))
//  {
//    case "Internet Explorer":
//      browser = "iexplore";
//    break;
//    
//    case "Firefox":
//      browser = "firefox";
//    break;
//  }
//  siteUrl = DDT.CurrentDriver.Value(3);           
//  DDT.CloseDriver(Driver.Name);
}

function Check(data, check, message, errorMessage)
{
  if(data == check)
  {
    Log.Message(message);
  }
  else
  {
    Log.Warning(errorMessage);  
  }
}

function Test1()
{
  var  page;
  var  panel;
  page = GetBrowserWindow();
  for(var i=0; i<10; i++)
  {
    page = page.ToURL("http://localhost:4101/");    
    page.Panel("MainPage").Panel("main").Link(0).Click();
    panel = page.Panel("MainPage").Panel("main").Panel("result");  
    var value = getLabelTextValue(panel.fieldset("PatientView").label("Testcompletecanyouseeme"));
    Log.Message(value)
    panel.link(0).Click();
    Log.Message(panel.form("PatientEditForm").fieldset("PatientEditFieldSet").textbox("firstname").value);
  }  
}

function SetPage(address)
{  
  if(address == null)
  {
    address = "";
  }
  else
  {
    //Do nothing, use the address
  }
  objectWindow = GetBrowserWindow();
  if(objectWindow == null)
  {
    //Will need to create an instance of a browser
    Sys.Keys("[Hold][Win]r[Release]");   
    Wait(); 
    Sys.Process("Explorer").Window("#32770", "Run", 1).Window("ComboBox", "", 1).Window("Edit", "", 1).Keys(browser+"[Enter]");
    objectWindow = GetBrowserWindow(); 
  }   
  objectWindow = objectWindow.ToURL(siteUrl+address);    
}

function GetPatient(patient)
{
  if(patient == null)
  {
    //Then it should default to Jr'Michael Nicholls
    var mainPage = objectWindow.Panel("MainPage");
    //Click the patient link
    mainPage.Panel("header").Panel("menucontainer").Link("PatientLink").Click();
  }
  else  
  {
    //Now need to search for the patient when this functionalilty is available
  }
}

function Wait()
{
  BuiltIn.Delay(1000,"Paused the testing");
}

function WaitSeconds(seconds,p_text)
{
  //seconds = seconds * 1.5;
  
  if (p_text == "")
  {
    BuiltIn.Delay(seconds * 1000,"Paused the testing");
  
  } 
  else
  {
    BuiltIn.Delay(seconds * 1000,p_text);
    //Log.Message(p_text);
   
  }  
}

function getLabelTextValue(labelObject)
{
  var browserName = GetBrowserType(); 
  switch(browserName)
  {
    case "IE6":
      return labelObject.innerText;  
    case "IE7":      
      return labelObject.innerText;
    case "firefox":          
      return labelObject.textContent;
  }  
}

function GetBrowserType()
//Function obtains the browser by checking wheather a process exsists and returns a string value to GetBrowserWindow()
{
  var process, w;
  process = Sys.WaitProcess("iexplore", 500);
  if (process.Exists) 
  {
    w = process.Window("IEFrame", "*");
    if (w.WaitWindow("Shell DocObject View").Exists)
    {
      return "IE6";
    }
    else
    {
      if (w.WaitWindow("TabWindowClass").Exists)
      {
        return "IE7";
      }
      else
      {
        return "";
      }
    }
  }
  process = Sys.WaitProcess("firefox", 500);
  if (process.Exists) 
  {
    return "firefox";
  }
  else
  {  
    return "";
  }  
}

function GetBrowserWindow()
//Function obtains the browser window, calls getBrowser type inorder to use in the Switch()
{
  var browserName;

  browserName = GetBrowserType();
  switch(browserName)
  {
    case "IE6":
      return Sys.Process("IEXPLORE").Window("IEFrame", "*", 1).Window("ShellDocObject View", "", 1).Window("Internet Explorer_Server", "", 1);

    case "IE7":
      return Sys.Process("iexplore").IEFrame(0).Tab("* - Windows Internet Explorer").Window("Shell DocObject View","",1).Window("Internet Explorer_Server", "",1);

    case "firefox":
      return Sys.Process("firefox").Page("*");

    case "":
      return null;
  }
}

function Test2()
{
  NameMapping.Sys.Keys("[Hold][Win]r[Release]");
}
//===============================================================================================
// Removes leading colon fron Driver file column (.xls, .csv)
function RemoveColon(p_value)
{
  if (p_value.length > 1)
  {
      if (p_value.indexOf(":",0) > -1)
      {
         p_value = p_value.substr(1);
      }
  }
  return p_value; 
}
//========================================================== Start & Stop routines
// Start INRstar4
function INRstar4_Start(INRstar4)
{
//  var  INRstar4 = NameMapping.Sys.Process("INRstar4");
  var  control;
  var  MDIClient;
  var  control2;
  
  // Click 'Agree' button
  INRstar4.frmSplash.VBObject("Frame1").Command1_4.ClickButton();
  
  // Delay to allow app to catch up with test script
  WaitSeconds(10,"");
  
  // Enter password
  INRstar4.frmMain.Window("MDIClient").VBObject("frmLogin").VBObject("txtPassword").wText = "supervisor";
  INRstar4.frmMain.Window("MDIClient").frmLogin.VBObject("cmdOK").ClickButton();
}

// Routine to close INRstar4
function INRstar4_End(INRstar4)
{
  // Click 'X' to close
  INRstar4.frmMain.Close();
  
  // Test if Confirm Overdue Patients Report Window appears
  OverduePatientsReportConfirmWindow = INRstar4.WaitWindow("#32770", "INRstar4", 1, 250);
  if (OverduePatientsReportConfirmWindow.Exists == true)
  {
    // Click 'No' button
    INRstar4.Window("#32770", "INRstar4").Window("Button", "&No").ClickButton();
  }
  
  // Test if Confirm Quit Window appears
  QuitConfirmWindow = INRstar4.WaitWindow("#32770", "Confirm quit", 1, 250);
  if (QuitConfirmWindow.Exists == true)
  {
    // Click 'Yes' button
    INRstar4.Window("#32770", "Confirm quit").Window("Button", "&Yes").ClickButton();
  }
}
//========================================================== Parameter setting

// NPSA
function Set_NPSA(INRstar4,w_setting)
{
 if (w_setting == true)
 {
    Log.Message("NPSA = True");
    INRstar4.frmMain.Window("MDIClient").frmOptions.VBObject("SSTab1").Frame2.Option7.ClickButton();
 }
  else
  {
    Log.Message("NPSA = False");
    INRstar4.frmMain.Window("MDIClient").frmOptions.VBObject("SSTab1").Frame2.Option5.ClickButton();
  }
}

// Rounding
function Set_Rounding(INRstar4, w_setting)
{
 if (w_setting == true)
 {
     Log.Message("Rounding = True");
    INRstar4.frmMain.Window("MDIClient").frmOptions.VBObject("SSTab1").Frame2.Check6.ClickButton(cbChecked);
 }
  else
  {
    Log.Message("Rounding = False");
    INRstar4.frmMain.Window("MDIClient").frmOptions.VBObject("SSTab1").Frame2.Check6.ClickButton(cbUnChecked);
  }  
}
// Rounding Value
function Set_RoundValue(INRstar4, w_setting)
{
  // Click the down button 20 times to make sure the value is at 1
  i = 1;
  while (i<20)
  {
      INRstar4.frmMain.Window("MDIClient").frmOptions.VBObject("SSTab1").Frame2.UpDown2_4.Click(13, 23);
      i++;
  }
  i = 1; 
  while (i<w_setting)
  {
      INRstar4.frmMain.Window("MDIClient").frmOptions.VBObject("SSTab1").Frame2.UpDown2_4.Click(11, 8);
      i++;
  }
}



// Sets the Algorithm for the current run
function Set_Algorithm(INRstar4, p_Run)
{
 if (p_Run.substr(3,1) == "H" )
 {
    Log.Message("Algorithm = Hillingdon");
    INRstar4.frmMain.Window("MDIClient").frmOptions.VBObject("SSTab1").Frame19.Option3.ClickButton();
 }
  else
 {
    Log.Message("Algorithm = Coventry");
    INRstar4.frmMain.Window("MDIClient").frmOptions.VBObject("SSTab1").Frame19.Option4.ClickButton();  
 } 
}
// % tolerance values for Patient
// INRstar4.frmMain.Window("MDIClient").frmNewPatient.VBObject("SSTab1").Frame5.Slider1
function Set_Slider(INRstar4, p_slider, p_value)
{
    INRstar4.frmMain.Window("MDIClient").frmNewPatient.VBObject("SSTab1").Frame5.p_slider.Value = p_Value;
}

//========================================================== Set the Use Algorithm check box
function Set_Use_Algorithm(INRstar4, p_value)
{
 if (p_value == true)
 {
     Log.Message("Use Algorithm = True");
    INRstar4.frmMain.Window("MDIClient").frmOptions.VBObject("SSTab1").Check2.ClickButton(cbChecked);
 }
  else
  {
    Log.Message("Use Algorithm = False");
    INRstar4.frmMain.Window("MDIClient").frmOptions.VBObject("SSTab1").Check2.ClickButton(cbUnChecked);
 }
 
}

//========================================================== Find Patient and set Clinical Prompts display
// Find the required patient, so the name is stored in the Menu/Patient/ list
function find_patient(INRstar4, p_name, p_hide, w_Missed, p_Run, w_Rounding)
{
  INRstar4.frmMain.MainMenu.Click("Patient|Find a patient");
  INRstar4.frmMain.Window("MDIClient").frmFindPatient.VBObject("Frame1").Text1.wText = p_name;
  INRstar4.frmMain.Window("MDIClient").frmFindPatient.VBObject("Frame1").cmndFind_2.ClickButton();
  INRstar4.frmMain.Window("MDIClient").frmFindPatient.VBObject("Frame2").cmndFind.ClickButton();

  // Test if Last Treatments window is displayed
  process_lasttreatment(INRstar4);
  // Test if Clinical Prompts window is displayed
  process_clinicalprompts(INRstar4, p_hide, w_Missed);

  // Open the Patients / Options tab & Set the Algorithm for this patient
  INRstar4.frmMain.MainMenu.Click("Patient|Edit patient details");
  INRstar4.frmMain.Window("MDIClient").frmNewPatient.VBObject("SSTab1").Click(159, 9);
  if (p_Run.substr(3,1) == "H" )
  {
    Log.Message("Set Patient to Hillingdon");
    INRstar4.frmMain.Window("MDIClient").frmNewPatient.VBObject("SSTab1").Frame5.Option5.ClickButton();
  }
  else
  {
    Log.Message("Set Patient to Coventry");
    INRstar4.frmMain.Window("MDIClient").frmNewPatient.VBObject("SSTab1").Frame5.Option6.ClickButton();
  }
  // Set the Rounding option
  if (w_Rounding == true)
  {
    Log.Message("Set Patient Rounding");
    INRstar4.frmMain.Window("MDIClient").frmNewPatient.VBObject("SSTab1").Frame5.Check4.ClickButton(cbChecked);
  }
  else
  {
    Log.Message("Set Patient non-Rounding");
    INRstar4.frmMain.Window("MDIClient").frmNewPatient.VBObject("SSTab1").Frame5.Check4.ClickButton(cbUnchecked);
  }
  
  // Click Save button
  click_save();
//  INRstar4.frmMain.Window("MDIClient").frmNewPatient.VBObject("Command1").ClickButton();
//  // Confirm Save
//  INRstar4.Window("#32770", "Confirm save").Window("Button", "&Yes").ClickButton();

    // Test if Last Treatment window is displayed
    process_lasttreatment(INRstar4);
    // Test if Clinical Prompts window is displayed
    process_clinicalprompts(INRstar4, p_hide, w_Missed);

 
  
  // Now close the Treatment records page
  Log.Message("Closing Treatment details");
  INRstar4.frmMain.Window("MDIClient").frmTreatmentRecord.VBObject("Frame3").Command1_5.ClickButton();
}
//==================================================================
// Click Save Button and 'Yes' on confirmation window  
function click_save()
{
    var INRstar4 = NameMapping.Sys.Process("INRstar4");

    // Click Save button
    INRstar4.frmMain.Window("MDIClient").frmNewPatient.VBObject("Command1").ClickButton();
    standard_confirm(INRstar4);
    //If the last inr is present and the initiate treatment checkbox is not checked 
    // Test if the confirm maintenance algorithm dialog is displayed
    maint_confirm(INRstar4);

}
function standard_confirm(INRstar4)
{
    ok_Window = INRstar4.WaitWindow("#32770", "Confirm save", 1, 250);
    if (ok_Window.Exists == true)
    {
        Log.Message("Standard Confirm window ");
        // Click 'OK' button
        INRstar4.Window("#32770", "Confirm save").Window("Button", "&Yes").ClickButton();
    }
    else
    {
      // Wrong window
      Log.Warning("Standard Confirm window not displayed");
    }
}
function maint_confirm(INRstar4)
{
    ok_with_maint_Window = INRstar4.WaitWindow("#32770", "Confirming Maintenance Algorithm", 1, 250);
    if (ok_with_maint_Window.Exists == true)
    {
      //If the last inr is present and the initiate treatment checkbox is not checked 
      // Test if the confirm maintenance algorithm dialog is displayed
      control = INRstar4.frmMain.Window("MDIClient").frmNewPatient.VBObject("SSTab1").Frame3;
    
    if (control.Text1_9.wText > "0.7" 
     &&  control.Text1_9.wText < "1.4" 
     && control.VBObject("frame9").VBObject("Check3").wState == cbUnChecked)
     {  
         Log.Message("Confirming Maintenance Algorithm window displayed");
     }
     else
     {
      // Window should not be displayed
         Log.Warning("Confirming Maintenance Algorithm window displayed");
     }
    // Click 'Yes' button
    INRstar4.Window("#32770", "Confirming Maintenance Algorithm").Window("Button", "&Yes").ClickButton();
     }
}//==================================================================
//------------------------------------
  // Test if Unable to Achieve Dose window appears
function process_UnableToAchieveDdose(INRstar4)
{
  UnableToAchieveDdoseWindow = INRstar4.WaitWindow("#32770", "Unable to achieve exact suggested dose using these tablet strengths", 1, 250);
  if (UnableToAchieveDdoseWindow.Exists == true)
  {
    // Click 'OK' button
    INRstar4.Window("#32770", "Unable to achieve exact suggested dose using these tablet strengths").Window("Button", "OK").ClickButton();
  }
}
//------------------------------------
  // Test if Last Treatment window appears
function process_lasttreatment(INRstar4)
{
  // Delay to allow app to catch up with test script
  WaitSeconds(5,"");
  
  LastTreatmentWindow = INRstar4.WaitWindow("#32770", "Last treatment greater than 90 days warning", 1, 250);
  if (LastTreatmentWindow.Exists == true)
  {
    // Click 'OK' button
    INRstar4.Window("#32770", "Last treatment greater than 90 days warning").Window("Button", "OK").ClickButton();
    Log.Message("Testing for Last Treatment window - Found");
  }
  else
  {
    Log.Message("Testing for Last Treatment window - Not Found");
  }
}
//------------------------------------
//Check if the Clinical Prompts window has appeared - hide from future processing if parameter = true
function process_clinicalprompts(INRstar4, p_hide, w_Missed)
{
  ClinicalPromptsConfirm =  INRstar4.frmMain.Window("MDIClient").frmClinicalPrompts;
  
  if (ClinicalPromptsConfirm.Exists == true)
  {
   Log.Message("Clinical prompts window - Found"); 
    // Set the Missed Dose box
    if (w_Missed == true)
    {
      // Check the Missed Dose box
      INRstar4.frmMain.Window("MDIClient").frmClinicalPrompts.VBObject("Check1").ClickButton(cbChecked);
    }
//************************************************************    
// This section now redundant as option no longer exists
//    // Set the Don't Show box
//    if (p_hide == true)
//    {
//      // Check the Don't show again box
//      INRstar4.frmMain.Window("MDIClient").frmClinicalPrompts.VBObject("Check3").ClickButton(cbChecked);
//    }
//************************************************************
    // Click the OK button to continue
    INRstar4.frmMain.Window("MDIClient").frmClinicalPrompts.VBObject("OKButton").ClickButton();
   }
   else
   Log.Message("Clinical prompts window - Not found"); 
}
//-----------------------------------
// rounding function for test results
function roundNumber(num, dec) 
{
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}
//-----------------------------------
// Check numeric values match
function CheckNumeric(data, check, message, errorMessage)
{
  if(aqConvert.StrToFloat(data) == aqConvert.StrToFloat(check))
  {
    Log.Message(message);
  }
  else
  {
    Log.Warning(errorMessage);  
  }
}
