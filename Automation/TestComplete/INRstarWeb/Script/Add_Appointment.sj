//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_SQL

//===============================================================================
// For each patient in the overdue report
//  Add a treatment
//  Reset the treatment date to the correct Next Test Date
//===============================================================================
 
function quick_start()
{
  var w_time_of_clinic = " Morning";
  var INRstarV5 = set_system(); 
  
  Goto_Patient_Search();
  preset_Fetch_Patient_NHS(INRstarV5, "IEX402395");
  
  Goto_Patient_Treatment();
  
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTIH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory").Panel("PatientTreatmentINRHistory");
  var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper")
  var wt_treatments = panelVPHTW.Table("PatientTreatmentHistoryTable");
  var w_row = wt_treatments.Rowcount - 1;
  var w_ntd = convert_date(aqConvert.StrToDate(wt_treatments.Cell(w_row,7).innerText));
    // Highlight the field
  Sys["HighlightObject"](wt_treatments.Cell(w_row,7),1);

  w_clinic_name = set_day(aqDateTime.GetDayOfWeek(w_ntd)) + w_time_of_clinic;

  
  Goto_Make_Appointment();
  add_appointment(INRstarV5, w_clinic_name, w_ntd);  
}
//===============================================================================
function add_appointment(INRstarV5, p_clinic_name, w_ntd)
{
  // Main panels
  var outertable = INRstarV5.Panel(2).Panel("modalDialogBox").Panel(0).Table("scheduler");
  var innertable = outertable.Cell(4, 0).Panel("scheduler_containerBlock_innerContent").Table("scheduler_containerBlock_content");
  var apttable = outertable.Cell(4, 0).Panel("scheduler_aptMenuBlock_innerContent").Panel("scheduler_aptMenuBlock_SMAPT").Table("scheduler_aptMenuBlock_SMAPT_DXMST_");
//  var hdrtable = innertable.Cell(0, 0).Panel("scheduler_containerBlock_horizontalContainer").Table("scheduler_containerBlock_horzContainerTable");
  var panelSCBVC = innertable.Cell(1, 0).Panel("scheduler_containerBlock_verticalScrollContainer").Panel("scheduler_containerBlock_verticalContainer")
//
//  var hourstable = panelSCBVC.Table("scheduler_containerBlock_vertTable");

  var panelaptlayer = panelSCBVC.Panel("appointmentLayer");

  wc_clinic = 0;
  wf_clinic_loop = true;
  
  while (wf_clinic_loop == true)
  {
  // Find a clinic
      var clinic = panelaptlayer.Panel("scheduler_aptsBlock_AptDiv"+wc_clinic).Panel("scheduler_aptsBlock_AptTemplateContainer"+wc_clinic+"30_ctl00_appointmentDiv");
      var w_inTxt = clinic.Table(0).Cell(0, 1).innerText;
      if (aqString.Find(w_inTxt, p_clinic_name) == -1)
        wc_clinic++;
      else
      {
        // Have found the right clinic
        wf_clinic_loop = false;
        
        // Right click & open the clinic
        Log.Message(clinic.Table(0).Cell(0, 1).innerText);
        clinic.Table(0).Cell(0, 1).ClickR();
        apttable.Cell(0, 0).Table(0).Cell(0, 2).Click();
        
        // Should now have opened the Clinic with the appointments...

        

        // Read the Location Name from the screen
        var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");

        var panelLS = INRstarV5.Panel("MainPage").panel("Header").Panel("logindisplay").Panel("LoginStatus");
        var w_text = panelLS.TextNode(0).innerText;
        var w_at = aqString.Find(w_text,"@");
        var w_locn_name = aqString.Substring(w_text,w_at+2,50);
        
        var w_locn_id = SQL_Get_Testing_Location_id(w_locn_name);
        add_appointment_slot(INRstarV5, p_clinic_name, w_ntd, w_locn_id);
      }  
      
  }
}
function add_appointment_slot(INRstarV5, p_clinic_name, p_ntd, p_locn_id)
{
    // Get Clinic ID
    var w_clinicid = SQL_Clinic(p_clinic_name, p_locn_id);
    var w_slotlength = SQL_Clinic_Slot_Length(w_clinicid);
    var w_no_slots_per_hour = (60/w_slotlength);

    // Find the last appointment slot using SQL;
    var w_lastslot = SQL_GetNextSlot(w_clinicid, p_ntd);
    
    Log.Message(w_lastslot);
    // Add the slot length to the time - dd/mm/yyyy hh:mm:ss
    if (w_lastslot != "None")
    {
      w_nextslot = aqConvert.DateTimeToStr(aqDateTime.AddMinutes(aqConvert.StrToDateTime(w_lastslot),10));
      //Pick out the hour & minutes values
      w_hour = aqString.SubString(w_nextslot,11,2);
      w_min = aqString.SubString(w_nextslot,14,2);
    }
    else
    {
      w_hour = "08";
      w_min = "00";
    
    }
    Log.Message("Hour: "+w_hour+"   Min: " + w_min);

    // Click the highlighted area to clear it
    WaitSeconds(1, "Waiting for Appointments Slots window");
    var aptoutertable = INRstarV5.Panel(2).Panel("modalDialogBox").Panel(1).Table("appointmentsScheduler");
    var aptinnertable = aptoutertable.Cell(4, 0).Panel("appointmentsScheduler_containerBlock_innerContent").Table("appointmentsScheduler_containerBlock_content");
    var panelASCBVC = aptinnertable.Cell(1, 0).Panel("appointmentsScheduler_containerBlock_verticalScrollContainer").Panel("appointmentsScheduler_containerBlock_verticalContainer")

    panelASCBVC.Panel("selectionLayer").Panel("appointmentsScheduler_commonControlsBlock_selectionDiv").Click(1,1);
        
    // Read through slots to find the hour
    var w_slot_table = panelASCBVC.Table("appointmentsScheduler_containerBlock_vertTable");
    var wc_slots = w_slot_table.RowCount
    
    var w_row = 0;
    wf_row_loop=true;
    while (wf_row_loop == true)
    {
      if (w_slot_table.Cell(w_row,0).innerText == w_hour)
      {
        Log.Message("Found the correct hour: "+w_hour+" - Row is "+w_row);
        wf_row_loop = false;
      }
      else
        w_row = w_row + w_no_slots_per_hour;  
    }    
    
    // If the minutes is on the hour
    if (w_min == "00")
    {
      w_slot_table.Cell(w_row+1,1).Click();
      w_slot_table.Cell(w_row,2).ClickR();
      
      // The 'Make Appointment' popup-is displayed 
      make_appointment(INRstarV5);
    }    
    else
    {
      // Read through slots to find the minutes
      wf_row_loop=true;
      while (wf_row_loop == true)
      {
          w_col = 0;
          
          if (w_slot_table.Cell(w_row,w_col).innerText == w_min)
          {
            Log.Message("Row:"+w_row+"  Col:"+(w_col+1)+" : "+w_slot_table.Cell(w_row,w_col).innerText+" <");
              
            var w_yto = 0;
            while (w_slot_table.Cell(w_row,w_col+1).VisibleOnScreen == false)
            {
              // Scroll down a bit
              w_yto = w_yto + 30;
              aptinnertable.Cell(1, 0).Panel("appointmentsScheduler_containerBlock_verticalScrollContainer").Drag(795, 50, 0, w_yto);
            }
            w_slot_table.Cell(w_row,w_col+1).ClickR(10,10);
            
            // The 'Make Appointment' popup-is displayed 
            make_appointment(INRstarV5);
            
            // Force the loop to close
            wf_row_loop = false;
          } 
          else
            w_row++;
      }
    }
}
function make_appointment(INRstarV5)
{
    var aptoutertable = INRstarV5.Panel(2).Panel("modalDialogBox").Panel(1).Table("appointmentsScheduler");
    var panelASCBIC = aptoutertable.Cell(4, 0).Panel("appointmentsScheduler_viewMenuBlock_innerContent");
    var makeaptTable = panelASCBIC.Panel("appointmentsScheduler_viewMenuBlock_SMVIEW").Table("appointmentsScheduler_viewMenuBlock_SMVIEW_DXMST_");

    makeaptTable.Cell(0,0).Click();
    
//    // Temp button
//    Sys.Process("iexplore", 2).Window("#32770", "Message from webpage", 1).Window("Button", "OK", 1).Click();
//    
    // Close the Appointments Window
    WaitSeconds(2,"Closing the Appointments Window");
    INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).Click(3,3);
}