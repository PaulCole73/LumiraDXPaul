//USEUNIT Common
//USEUNIT System_Paths
//USEUNIT Navigate_Patient

//-------------------------------------------------------------------------------
// Select system
function Log_On_Where()
{    
  WaitSeconds(2);
  
 // var w_system;
 w_system = "Client";  // Default setting

// w_system = "IOKO";
// w_system = "Auto";
// w_system = "Aug";
// w_system = "SSIS";
// w_system = "Test";
 //w_system = "Test8082";
// w_system = "Test8040";
//w_system = "Test8050"; // Uses testASPNETDB database !!

// w_system = "TestClient";
//  w_system = "AuditClient";
//w_system = "TTRClient";
// w_system = "Training";
//  w_system = "StageSRVR";
// w_system = "Paul";
//w_system = "Admin";
//w_system = "Admin-SSIS";
// w_system = "Window";
// w_system = "Firefox";
//w_system = "PT_TTR"; // PT - Trying to get an INRstar on the AnalyticsDB database server working for the old TTR automation!

  return w_system;
}
//------------------------------------------------------------------------
// set which version of test system to use
function set_system()
{
    var w_system = Log_On_Where();
    
    var INRstarV5 = "Error!";
    
    if (w_system == "Client")
    {
       var p1 = Sys.Process("INRstarWindows");
       p1 = p1.WinFormsObject("BrowserForm");
       p1 = p1.WinFormsObject("INRstarBrowser");
       p1 = p1.WinFormsObject("Shell Embedding","");
       p1 = p1.Window("Shell DocObject View","",1);
       p1 = p1.Window("Internet Explorer_Server","",1);
       //INRstarV5 = p1.Page("https://inrstar-starsky.lumiradxcaresolutions.com/");
       INRstarV5 = p1.Page("https://inrstar-staging.lumiradxcaresolutions.com/");
    }
    if (w_system == "TestClient")
    {
       var p1 = Sys.Process("INRstarWindows");
       p1 = p1.WinFormsObject("BrowserForm");
       p1 = p1.WinFormsObject("INRstarBrowser");
       p1 = p1.WinFormsObject("Shell Embedding","");
       p1 = p1.Window("Shell DocObject View","",1);
       p1 = p1.Window("Internet Explorer_Server","",1);
      INRstarV5 = p1.Page("https://training.inrstar.co.uk/#");
    }
    if (w_system == "AuditClient")
    {
       var p1 = Sys.Process("INRstarWindows");
       p1 = p1.WinFormsObject("BrowserForm");
       p1 = p1.WinFormsObject("INRstarBrowser");
       p1 = p1.WinFormsObject("Shell Embedding","");
       p1 = p1.Window("Shell DocObject View","",1);
       p1 = p1.Window("Internet Explorer_Server","",1);
       INRstarV5 = p1.Page("http://192.168.16.158:8050/");
    }
    if (w_system == "TTRClient")
    {
       var p1 = Sys.Process("INRstarWindows");
       p1 = p1.WinFormsObject("BrowserForm");
       p1 = p1.WinFormsObject("INRstarBrowser");
       p1 = p1.WinFormsObject("Shell Embedding","");
       p1 = p1.Window("Shell DocObject View","",1);
       p1 = p1.Window("Internet Explorer_Server","",1);
       INRstarV5 = p1.Page("http://scsl.inrstar.test:8082/");
    }
    if (w_system == "PT_TTR")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://scsl.inrstar.test:6064/");
    if (w_system == "IOKO")
       INRstarV5 = Sys.Process("iexplore", 2).Page("https://83.98.30.169/");
    if (w_system == "Aug")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8030/");
    if (w_system == "Auto")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://inrstar5auto/");
    if (w_system == "Test")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.158/");
    if (w_system == "SSIS")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8060/");
    if (w_system == "Test8040")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8040/");
    if (w_system == "Test8050")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8050/");
    if (w_system == "Test8082")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://scsl.inrstar.test:8082/");
    if (w_system == "Paul")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.54/");
    if (w_system == "StageSRVR")
       INRstarV5 = Sys.Process("iexplore", 2).Page("https://192.168.16.158:999/");
    if (w_system == "Admin")
       //INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8080");
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://scsl.admin.inrstar.test/");
    if (w_system == "Admin-SSIS")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.158:6061/");
    if (w_system == "Firefox")
       INRstarV5 = Sys.Process("firefox").Page("http://inrstar5auto/");
    if (w_system == "Training")
       INRstarV5 = Sys.Process("iexplore", 2).Page("https://training.inrstar.co.uk/");
    if (w_system == "Window")
       INRstarV5 = Aliases.INRstarWindows.wndINRstar.WindowsForms10Window8app033c0d9d.ShellEmbedding.ShellDocObjectView.browser.Page("http://inrstar5auto/");
//   var INRstarV5 = Sys.Process("iexplore", 2).Page("http://www.testingtolvaddon.com/");
//   var INRstarV5 = Sys.Process("iexplore", 2).Page("http://inrstar5testing/");


   return INRstarV5;
} 
//------------------------------------------------------------------------
// set which version of test system to use
function set_admin_system()
{
    var w_system = Log_On_Where();
    
    var INRstarV5 = "Error!";
    
    if (w_system == "Ryan")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.44:8080/");
    if (w_system == "Test")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8080/")
    if (w_system == "Test8050")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8051/")
    if (w_system == "Test8082")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http:/scsl.inrstartest:8082/")
    if (w_system == "IOKO")
       INRstarV5 = Sys.Process("iexplore", 2).Page("https://83.98.30.169/SystemAdministration/Dashboard");
    if (w_system == "Auto")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://admin.inrstar5auto/");
    if (w_system == "Man")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://inrstar5man/SystemAdministration/Dashboard");
    if (w_system == "Firefox")
       INRstarV5 = Sys.Process("firefox").Page("http://inrstar5auto/SystemAdministration/Dashboard");
    if (w_system == "Window")
       INRstarV5 = Aliases.INRstarWindows.wndINRstar.WindowsForms10Window8app033c0d9d.ShellEmbedding.ShellDocObjectView.browser.Page("http://inrstar5auto/SystemAdministration/Dashboard");
    if (w_system == "Training")
       INRstarV5 = Sys.Process("iexplore", 2).Page("https://admin.training.inrstar.co.uk:8080/");

  Log.Message (">>>>>>>>>>>>>>>>>>>>>>> Admin System : "  + w_system + " / "+ INRstarV5.FullName);

   return INRstarV5;
} 
//------------------------------------------------------------------------
// set which version of test system to use
function set_pre_login_system()
{
    var w_system = Log_On_Where();
    
    var INRstarV5 = "Error!";
    
    if (w_system == "Ryan")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.44:8080/");
    if (w_system == "Test")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8080/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Test8040")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8040/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "Test8050")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://192.168.16.158:8051/Security/Authentication/LogOn?ReturnUrl=%2f");
    if (w_system == "IOKO")
       INRstarV5 = Sys.Process("iexplore", 2).Page("https://83.98.30.169/SystemAdministration/Dashboard");
    if (w_system == "Auto")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://admin.inrstar5auto/");
    if (w_system == "Man")
       INRstarV5 = Sys.Process("iexplore", 2).Page("http://inrstar5man/SystemAdministration/Dashboard");
    if (w_system == "Firefox")
       INRstarV5 = Sys.Process("firefox").Page("http://inrstar5auto/SystemAdministration/Dashboard");
    if (w_system == "Window")
       INRstarV5 = Aliases.INRstarWindows.wndINRstar.WindowsForms10Window8app033c0d9d.ShellEmbedding.ShellDocObjectView.browser.Page("http://inrstar5auto/SystemAdministration/Dashboard");

  Log.Message (">>>>>>>>>>>>>>>>>>>>>>> Pre-Login System : " + w_system + " / "+ INRstarV5);

   return INRstarV5;
} 
//------------------------------------------------------------------------
// convert Float to String
function FloatToString(p_val)
{
         var ws_val = aqConvert.FloatToStr(p_val);
         
         if (p_val == aqConvert.VarToInt(p_val))
         {
            // Add '.0' to the end
            ws_val = ws_val + ".0";
         }
         return ws_val;
}
//------------------------------------------------------------------------
// Get New NHS Number
function Get_New_Number_V5()
{
  var  wndWindowsForms;
  var  wnd;
  var wndName = "Form1";
  var btnName = "button1";
  var edtName = "textBox1";

  WaitSeconds(1)
  TestedApps.NHSNumberGenerator.Run(1, true);
  WaitSeconds(1)

  form = Sys.Process("NHSNumberGenerator").WinFormsObject("Form1");
  form.WinFormsObject("button1").ClickButton();

  wnd = form.WinFormsObject("textBox1").wText;

  form.Close();
  return wnd;

}
//------------------------------------------------------------------------
// Select correct day from calendar
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
//------------------------------------------------------------------------
// Find day
// Pass in number of days to be taken off today's date
function find_day(p_days)
{
         var w_new_day = aqDateTime.GetDay(aqDateTime.AddDays(aqDateTime.Today(), p_days));
         return w_new_day;
}
//------------------------------------------------------------------------
// Find day
// Pass in number of days to be taken off today's date
function days_from_today(p_days)
{
         var w_new_date = aqDateTime.AddDays(aqDateTime.Today(), p_days);
         return w_new_date;
}
//------------------------------------------------------------------------
// Find Month
// Pass in number of days to be taken off today's date
function find_month(p_days)
{
         var w_new_month = aqDateTime.GetMonth(aqDateTime.AddDays(aqDateTime.Today(), p_days));
         return w_new_month;
}
//------------------------------------------------------------------------
// Display the results in the Log
function display_values(INRstarV5, w_current_INR)
{  
   var INRstarV5 = INRstar_base();
   var panelPTC = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent");
   var panelTHC = panelPTC.Panel("TreatmentContainer").Panel("TreatmentHistoryContainer");
   var wt_treatments = panelTHC.Table("TreatmentHistoryTable");
   var w_row = wt_treatments.Rowcount - 1;

   // System Suggested Dose
   var w_sugg_dose = wt_treatments.Cell(w_row,2).innerText;    // (row, column (0 indexed))
   var w_sugg_review = wt_treatments.Cell(w_row,6).innerText;
   var w_mess = "INR:" + w_current_INR + " Dose:" + w_sugg_dose + " Review:" + w_sugg_review;
   
   Log.Message(w_mess);
   
}
//------------------------------------------------------------------------
// Display the results in the Log
function display_patient_audit(w_data)
{  
  var INRstarV5 = set_system();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
  var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
  var wt_audit = panelPMTC.Panel("PatientAuditTrailWrapper").Table("AuditTrailTable");
  var w_row = wt_audit.Rowcount - 1;

  for (w_row = wt_audit.Rowcount - 1; w_row > 0; w_row--)
  {
    if (wt_audit.Cell(w_row,1).innerText == w_data)
    {
      Log.Message(wt_audit.Cell(w_row,1).innerText + " - " + wt_audit.Cell(w_row,2).innerText);
    }   
  }
}
//----------------------------------------------------------------------------------------------
// Display the top audit record
function display_top_patient_audit(w_data)
{  
  Goto_Patient_Audit();
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
  var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
  var wt_audit = panelPMTC.Panel("PatientAuditTrailWrapper").Table("AuditTrailTable");
  var wt_row = wt_audit.Cell(1, 1).innerText;

  if (wt_row == w_data)
  {
    Log.Message(wt_row + " - " + wt_audit.Cell(1,1).innerText);
    return true;
  }
  else 
  {
    Log.Warning("Patient audit record not found " + wt_row + " - " + wt_audit.Cell(1,1).innerText);
    return false;
  }
}
//----------------------------------------------------------------------------------------------
// Get the top patient audit record more information
function more_info_top_patient_audit(w_data)
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
//----------------------------------------------------------------------------------------------
// Get the top treatment audit record more information
function more_info_top_treatment_audit(w_data)
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
//----------------------------------------------------------------------------------------------
// Get the top system audit record more information
function more_info_top_system_audit(w_data)
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
//-----------------------------------------------------------------------------------------------
// Write the Audit details to a file
function write_patient_audit(w_data, p_outfile)
{  
   var INRstarV5 = INRstar_base();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
   var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
   var wt_audit = panelPMTC.Panel("PatientAuditTrailWrapper").Table("AuditTrailTable");

   for (w_row = wt_audit.Rowcount - 1; w_row > 0; w_row--)
   {
              if (wt_audit.Cell(w_row,1).innerText == w_data)
              {
                    w_mess = wt_audit.Cell(w_row,0).innerText + "," + wt_audit.Cell(w_row,1).innerText + "," +wt_audit.Cell(w_row,2).innerText + "," +wt_audit.Cell(w_row,3).innerText;
                    aqFile.WriteToTextFile(p_outfile, w_mess + "\r\n", aqFile.ctANSI);

                    // Stop the loop
                   w_row = 0;
             }
   }
   Log.Checkpoint(w_data);
}
//------------------------------------------------------------------------
// Write all the Treatment Audit details to a file
function write_treatment_audit(p_outfile)
{  
   var INRstarV5 = INRstar_base();
   var panelDC= INRstarV5.Panel(1).Panel("DialogContent");
   var wt_audit = panelDC.Panel("TreatmentAuditTrailWrapper").Table("AuditTrailTable");

   for (w_row = wt_audit.Rowcount - 1; w_row > 0; w_row--)
   {
          w_mess = wt_audit.Cell(w_row,0).innerText + "," + wt_audit.Cell(w_row,1).innerText + "," +wt_audit.Cell(w_row,2).innerText + "," +wt_audit.Cell(w_row,3).innerText;
          aqFile.WriteToTextFile(p_outfile, w_mess + "\r\n", aqFile.ctANSI);
   }
   Log.Checkpoint("Treatment Audit");
}
//------------------------------------------------------------------------
// Write the Audit details to a file
function write_system_audit(w_data, p_outfile)
{  
   var INRstarV5 = set_system();
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel")
   var panelLATW = panelMCP.Panel("AdminContent").Panel("LocationAuditTrailWrapper");
   var wt_audit = panelLATW.Table("AuditTrailTable");
   var w_row = wt_audit.Rowcount - 1;

   for (w_row = wt_audit.Rowcount - 1; w_row > 0; w_row--)
   {
              if (wt_audit.Cell(w_row,1).innerText == w_data)
              {
                    w_mess = wt_audit.Cell(w_row,0).innerText + "," + wt_audit.Cell(w_row,1).innerText + "," +wt_audit.Cell(w_row,2).innerText + "," +wt_audit.Cell(w_row,3).innerText;
                    aqFile.WriteToTextFile(p_outfile, w_mess + "\r\n", aqFile.ctANSI);

                    // Stop the loop
                   w_row = 0;
             }
   }
   Log.Checkpoint(w_data);
}
//------------------------------------------------------------------------
function create_password()
{
     var w_password = "";
     var wn_pwd_size = 8;
 
     var wn_a = wn_pwd_size - 2
     var wa_chars = new Array(wn_a);
 
     for (i=0;i<wn_a;i++)
     {
          wa_chars[i] = Chr(96 + Math.floor(Math.random()*26));
          Log.Message(i + " " + wa_chars[i]);
     }
 
     for (i=0;i<2;i++)
     {
         w_password = w_password + wa_chars[i];
          Log.Message(i + " " + wa_chars[i]);
     }
     w_password = w_password + aqConvert.IntToStr(Math.floor(Math.random()*9));
     
     for (i=2;i<6;i++)
     {
         w_password = w_password + wa_chars[i];
          Log.Message(i + " " + wa_chars[i]);
     }
     w_password = w_password + Chr(64 + Math.floor(Math.random()*26));
     
     for (i=7 ;i<wn_a;i++)
     {
         w_password = w_password + wa_chars[i];
          Log.Message(i + " " + wa_chars[i]);

     }
    Log.Message(w_password);
}
//------------------------------------------------------------------------
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
//--------------------------------------------------------------------
function convert_date(p_date)
{
  var w_year = aqString.SubString(p_date,6,4);
  var w_month = aqString.SubString(p_date,2,4);
//  var month = aqConvert.IntToStr(convert_mmm_to_mm(aqString.SubString(p_date,2,3)));
  var w_day = aqString.SubString(p_date,0,2);
  
  return w_year+w_month+w_day;
} 
//--------------------------------------------------------------------
function convert_mmm_to_mm(p_mmm)
{
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
  
  var wc_m = 1;
  var wf_cont = true;
  while (wf_cont == true)
  {
    if (wa_Mth[wc_m] == p_mmm)
      wf_cont = false;
    else
      wc_m++;
  }
  return wc_m;
} 
//------------------------------------------------------------------------
function set_day(p_d)
{
  var wa_Days = new Array(8);                   
  wa_Days[0] = "";
  wa_Days[1] = "Sunday";
  wa_Days[2] = "Monday";
  wa_Days[3] = "Tuesday";
  wa_Days[4] = "Wednesday";
  wa_Days[5] = "Thursday";
  wa_Days[6] = "Friday";
  wa_Days[7] = "Saturday";
  
  var w_Day = wa_Days[p_d];
  Log.message(w_Day);
  return w_Day;
} 
//--------------------------------------------------------------------
function set_INR(p_target)
{
  var w_int_target = aqString.SubString(aqConvert.IntToStr(p_target),0,1);
 
  var w_inrange = aqConvert.IntToStr(Math.floor(Math.random()*15));
  
  var w_dec = aqConvert.IntToStr(Math.floor(Math.random()*9));
  
  var w_what = "";
 
//  if (w_inrange > 3 )
//  {
//    // INR in-range
//  }
//  else
//  {
//    // Make INR low
//      if (w_inrange > 1 )
//      {
//        w_int_target = aqConvert.IntToStr(aqConvert.StrToInt(w_int_target)-1);
//      }
//      else
//      {
//        w_int_target = aqConvert.IntToStr(aqConvert.StrToInt(w_int_target)+1);
//      }
//  }
  return w_int_target + "."+w_dec;
}
   
//-----------------------------------------------------------------
function set_random_inr()
{
    if (Math.random()*1 == 1)
        var w_inr = Math.round((Math.random()*10 + (Math.random()*10)/10)*Math.pow(10,1))/Math.pow(10,1);
    else
        var w_inr = Math.round((Math.random()*10 - (Math.random()*10)/10)*Math.pow(10,1))/Math.pow(10,1);
  
    ws_inr = aqConvert.FloatToStr(w_inr);
    if (ws_inr.indexOf(".") < 0)
       ws_inr = ws_inr + ".0";

    return ws_inr;
}
//-----------------------------------------------------------------
function set_random_dose()
{
    var w_dose = Math.round((Math.random()*10 + (Math.random()*10)/10)*Math.pow(10,1))/Math.pow(10,1);
  
    ws_dose = aqConvert.FloatToStr(w_dose);
    if (ws_dose.indexOf(".") < 0)
       ws_dose = ws_dose + ".0";

    return ws_dose;
}
//-----------------------------------------------------------------
function set_random_review()
{
    var w_days = (Math.random()*3) * 7;
  
    ws_days = aqConvert.FloatToStr(w_days) + " Days";

    return ws_days;
}
//-----------------------------------------------------------------
// Set permission roles
function math_int(p_numerator, p_denominator)
{
  return aqConvert.StrToInt(aqConvert.FloatToStr(p_numerator/p_denominator));
}
//-----------------------------------------------------------------
// Set permission roles
function set_cbx(cbx, p_YorN)
{
  if (p_YorN == "Y")
     cbx.ClickChecked(true);
  else
     cbx.ClickChecked(false);
}
//-------------------------------------------------------------------------------
// Perform a Manual treatment
//-------------------------------------------------------------------------------
function do_manual_treatment(INRstarV5,w_inr)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
    var panelPRIH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory").Panel("PatientTreatmentINRHistory");
    var tablePTHT = panelPRIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable");
    
    var w_dose = tablePTHT.Cell(tablePTHT.RowCount - 1,2).innerText;

    add_inr_manual("17", "10", "2012", w_inr, "PoCT", w_dose, "0", "7" );
}
//-------------------------------------------------------------------------------
// Set the Tests Due Start Date
//-------------------------------------------------------------------------------
function set_start_date(INRstarV5, p_day, p_month, p_year)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelPC = panelMain.Panel("main").Panel("MainContentPanel").Panel("PatientContent");
    var formUTD = panelPC.Panel("TestCriteriaContainer").Form("UpdateTestsDue");
    var panelUDRS = formUTD.Panel("DateRangeSelectorContainer").Panel("UpdateDateRangeSelector");
    
    panelUDRS.Image("calendar_png").Click();
           
    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(p_year));
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(p_month));
    select_day(p_day, w_datepicker);
    

}
//-------------------------------------------------------------------------------
// Set the Tests Due End Date
//-------------------------------------------------------------------------------
function set_end_date(INRstarV5, p_day, p_month, p_year)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelPC = panelMain.Panel("main").Panel("MainContentPanel").Panel("PatientContent");
    var formUTD = panelPC.Panel("TestCriteriaContainer").Form("UpdateTestsDue");
    var panelUDRS = formUTD.Panel("DateRangeSelectorContainer").Panel("UpdateDateRangeSelector");
    
    panelUDRS.Image("calendar_png_2").Click();
           
    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(p_year));
    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(p_month));
    select_day(p_day, w_datepicker);
    
    panelUDRS.SubmitButton("UpdateDateRangeSelector").Click();
    
    WaitSeconds(10,"Waiting for new list of Test Due Patients");

}
//------------------------------------------------------------------------------
// Set the user name from the full name & the Practice
//------------------------------------------------------------------------------
function set_username(p_name, p_practice)
{
  
  // Process User's Name
  // Replace space with dot
  var w_name = aqString.Replace(p_name, " ", ".");
  
  // Create username
  var w_username = w_name + "@" + set_practice_name(p_practice);
  
  // set user name to lower case
  var w_username = aqString.ToLower(w_username);
  return w_username;  
  
}
//------------------------------------------------------------------------------
// Process Practice Name
//------------------------------------------------------------------------------
function set_practice_name(p_practice)
{

  var w_practice = p_practice;
  // Strip off leading 'The '
  if (aqString.SubString(w_practice,0,4) == "The ")
     w_practice = aqString.SubString(w_practice,4,30);
  
  // Strip off trailing details 
  var w_pos = aqString.Find(w_practice, " ");
  if (w_pos > 0)
    w_practice = aqString.SubString(w_practice,0,w_pos);

  return w_practice;  
  
}
//=======================================================================
// Reset all users passwords
function reset_passwords() //Needs to be checked "SQL Clean-up"
{
  Log.Message("About to Reset Passwords");
  var ssms;
  var wnd_desked_gsk;
  var edit;
  var wndbosa_sdm_Mso96;
  ssms = Aliases.Ssms;
  wnd_desked_gsk = ssms.wnd_desked_gsk;
  wnd_desked_gsk.Click(527, 15);
  wnd_desked_gsk.GenericPane.GenericPane.ObjectExplorerWindow.ObjectExplorerTree.Keys("^o");
  wndbosa_sdm_Mso96 = ssms.wndbosa_sdm_Mso96;
  edit = wndbosa_sdm_Mso96.Edit;
  edit.SetText("\\\\scslsrv1\\Old_commonfiles\\Technical Information\\INRstar\\Testing\\SQL Scripts\\resetAllPasswords.sql");
  wndbosa_sdm_Mso96.Click(626, 398);
  wnd_desked_gsk.panelMsodocktop.toolbarSqlEditor.buttonExecute.ClickButton();
  Log.Message("Passwords Reset");
}
//=======================================================================
function open_ssms()
{
  Log.Message("About to Open SSMS");
  var explorer;
  explorer = Aliases.Explorer;
  explorer.wndStart.ClickButton();
  explorer.wndDV2ControlHost.Click(102, 412);
  TestedApps.Ssms.Run(1, true);
  Aliases.Ssms.ConnectionDialog.connect.ClickButton();
  Log.Message("Opened SSMS");
}
//=======================================================================
function close_apps()
{
  // Close SSMS
  Log.Message("Closing SSMS");
  Aliases.Ssms.wnd_desked_gsk.Close();

}
function quick_start()
{
         var INRstarV5 = INRstar_base();

          get_locn_id(INRstarV5);
}
function set_big_text()
{
          var w_lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et sem fringilla, pretium"
+ "leo nec, scelerisque nunc. Proin commodo magna libero, eget dignissim nisi hendrerit non. Quisque a tincidunt"
+ " velit. Duis vitae neque quam. In eu blandit erat. Nam lorem tortor, interdum sit amet posuere nec, hendrerit ac"
+ " nulla. Nullam vitae libero odio. Phasellus ornare justo et velit tempus vulputate. Ut sit amet nisl in elit viverra"
+ " eleifend eget sed lorem."
+ "Proin non ornare orci, et imperdiet sapien. Cras pretium ornare nibh, ultricies tincidunt sapien imperdiet ut."
+ " Vivamus semper sollicitudin mauris, sed aliquam purus placerat in. Nulla viverra viverra felis vel varius. Ut"
+ " mollis, lacus vel ultrices pulvinar, urna tellus pellentesque felis, ut condimentum ligula purus nec libero. Duis malesuada bibendum cursus. Proin id hendrerit odio. Ut posuere, ante varius venenatis molestie, nisi nulla rhoncus dolor, eget ultricies tortor elit vitae ipsum. Vivamus aliquet eget nunc sed suscipit. Nullam elementum enim odio, et blandit diam laoreet a. Donec vel erat odio. "
+ "Sed et turpis sit amet tortor luctus viverra. Nunc a consectetur urna. Pellentesque interdum risus in erat volutpat"
+ ", ut fringilla quam dictum. Ut purus leo, mollis in porttitor nec, consequat nec felis. Donec elementum mattis risus"
+ "sit amet ultrices. Aenean vehicula, odio a tempus eleifend, metus ante posuere magna, sed tincidunt metus nisl"
+ " eget diam. Ut elementum felis et tellus aliquam tincidunt. Aliquam et lacinia libero, sit amet viverra orci. "
+ "Nunc quis lacus justo. Praesent varius blandit metus, consectetur tincidunt lorem fringilla sed. Mauris nunc nisi"
+ ", placerat et scelerisque id, pellentesque eget nisi. Nam pulvinar nec justo in feugiat. Fusce pretium, nunc quis"
+ " volutpat posuere, justo nulla dictum sapien, imperdiet hendrerit erat nisi quis nisl. In dignissim turpis eu lacus"
+ " consequat, condimentum placerat elit lacinia. Ut ut neque ut est elementum faucibus. Maecenas aliquet nisl"
+ " ultricies placerat mattis. In hac habitasse platea dictumst. Vivamus pharetra orci ipsum, vel varius ante convallis"
+ " ac. Nulla a volutpat nunc, eget lobortis lorem. "
+ "Aliquam tempus commodo sapien, ac sollicitudin eros tempus quis. Morbi semper lorem eget felis aliquet "
+ "vehicula. Integer nulla risus, condimentum vel erat quis, suscipit interdum dolor. Aliquam suscipit neque "
+ "quis nisi ultrices, sit amet ullamcorper sapien posuere. Donec consectetur risus sapien, eget aliquet odio "
+ "facilisis non. Suspendisse potenti. Cras suscipit sagittis nisl vitae mattis. ";

return w_lorem_ipsum;
}