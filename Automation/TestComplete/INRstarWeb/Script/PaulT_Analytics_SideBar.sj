//USEUNIT Common
//USEUNIT PaulT_BlogCopies
//USEUNIT PaulT_Analytics_Navigation_Bar
//USEUNIT PaulT_Analytics_Authentication
//USEUNIT PaulT_Browser
//USEUNIT PaulT_CommandLine

function Test_Column_Filters()
{
var checked;

  currentAnalyticsTab = Login_Single_App("Analytics1","Valid");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"PatientActivity"); 

  checked = columnFilters(currentAnalyticsTab, "WarfarinPatients", "PatientsOverPeriod", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "WarfarinPatients", "PatientsEndPeriod", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "WarfarinPatients", "PatientsInitiated", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "WarfarinPatients", "PatientsTreated", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "WarfarinTreatments", "HomeVisits", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "WarfarinTreatments", "TreatmentsDone", "IsItChecked");
 
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"ClinicalAudit"); 
  currentAnalyticsTab = exportCSV(currentAnalyticsTab,"ClinicalAudit");
    
  checked = columnFilters(currentAnalyticsTab, "TTR", "12MthRolling", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "INR", "INRGreater8", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "INR", "INRGreater5", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "INR", "INRGreater1", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "INR", "INRVariance0_5", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "INR", "INRVariance0_75", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "INR", "INRVariance1", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "AdverseEvents", "Severe", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "AdverseEvents", "Intermediate", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "AdverseEvents", "Minor", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "DNA", "DNA", "IsItChecked");
  checked = columnFilters(currentAnalyticsTab, "DNA", "Overdue", "IsItChecked");
}


function Test_Export_CSV()
{ 
  //Clear out the logged in users downloads directory ready to create some new exports
  
  // The following runs a batch file in windows
  // It has to exist in the specified directory of course
  // If it doesn't then manually recreate it with the specified name
  // The content needs to be as follows:
    
  //C:
  //cd %userprofile%
  //cd downloads
  //del *.csv /Q;
  
  run_bat_file("C:\\DeleteCSVsInDirectory.bat");

  //Now create the new exports 1 from each page
  currentAnalyticsTab = Login_Single_App("Analytics1");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"PatientActivity"); 
  currentAnalyticsTab = exportCSV(currentAnalyticsTab,"PatientActivity");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"ClinicalAudit"); 
  currentAnalyticsTab = exportCSV(currentAnalyticsTab,"ClinicalAudit");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"Logout");
}

function Test_datePicker()
{
var currentYear = 2016; 
var page = "PatientActivity";
var yearTotest = 2014;
//var page = "ClinicalAudit";



/* Test Analytics 1 */
  currentAnalyticsTab = Login_Single_App("Analytics1","SouthDocs");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab, page); 
  currentAnalyticsTab = datePicker(currentAnalyticsTab, page, "Year", currentYear, yearTotest, "", "");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"Logout");

  currentAnalyticsTab = Login_Single_App("Analytics1","SouthDocs");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab, page); 
  currentAnalyticsTab = datePicker(currentAnalyticsTab, page, "Quarter", currentYear, yearTotest, "", "Q2");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"Logout");

  currentAnalyticsTab = Login_Single_App("Analytics1","SouthDocs");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab, page); 
  currentAnalyticsTab = datePicker(currentAnalyticsTab, page, "Month", currentYear, yearTotest, "February", "");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"Logout");

/* Test Analytics 2 */
  currentAnalyticsTab = Login_Single_App("Analytics2","SouthDocs");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab, page); 
  currentAnalyticsTab = datePicker(currentAnalyticsTab, page, "Year", currentYear, yearTotest, "", "");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"Logout");

  currentAnalyticsTab = Login_Single_App("Analytics2","SouthDocs");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab, page); 
  currentAnalyticsTab = datePicker(currentAnalyticsTab, page, "Quarter", currentYear, yearTotest, "", "Q2");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"Logout");

  currentAnalyticsTab = Login_Single_App("Analytics2","SouthDocs");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab, page); 
  currentAnalyticsTab = datePicker(currentAnalyticsTab, page, "Month", currentYear, yearTotest, "February", "");
  currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab,"Logout"); 
  
}

function datePicker(CurrentPage, SelectedOption, period, currentYear, yearToTest, quarterToTest, monthToTest)
{
var datePickerWidget;
var numberOfDatePickerClicks = 1;


  if(SelectedOption == "PatientActivity")
  {
      var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
      datePickerWidget = analytics_page.Panel(1).Panel("pageContainer").Panel(0).Panel("filterContainer").Panel("filterPanel").Panel(0).Panel("panelBodyLocationAndDate");
      // First Click the down arrow to wake the date picker up
      datePickerWidget.Panel("DateFilter").Panel(0).Panel(2).Panel(0).Click();

      // now pick whether you want "Month", "Quarter", "Year" based on the passed in "period"
      if(period == "Month")
      {
            datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(0).Panel(0).Click();
                                
            // If you dont want to test current year you need to move the correct year first
            if(yearToTest != currentYear)
            {
                //scroll left number of times equal to current year minus year you want (e.g. 2016 - 2014, 2 clicks) this selects correct year
                numberOfDatePickerClicks = currentYear - yearToTest;
                for(var i = 1; i <= numberOfDatePickerClicks; i++)
                {
                    datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(1).Panel(0).Click();
                }
            }
         
            // Now select the month you want
           if(monthToTest == "January")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(0).Click();               
            }
           if(monthToTest == "February")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(1).Click();               
            }
           if(monthToTest == "March")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(2).Click();               
            }
           if(monthToTest == "April")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(3).Click();               
            }
           if(monthToTest == "May")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(4).Click();               
            }
           if(monthToTest == "June")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(5).Click();               
            }
           if(monthToTest == "July")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(6).Click();               
            }
           if(monthToTest == "August")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(7).Click();               
            }
           if(monthToTest == "September")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(8).Click();               
            }
           if(monthToTest == "October")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(9).Click();               
            }
           if(monthToTest == "November")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(10).Click();
            }
           if(quarterToTest == "December")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(11).Click();               
            }
      }
      if(period == "Quarter")
      {
            datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(0).Panel(1).Click();
                                
            // If you dont want to test current year you need to move the correct year first
            if(yearToTest != currentYear)
            {
                //scroll left number of times equal to current year minus year you want (e.g. 2016 - 2014, 2 clicks) this selects correct year
                numberOfDatePickerClicks = currentYear - yearToTest;
                for(var i = 1; i <= numberOfDatePickerClicks; i++)
                {
                    datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(1).Panel(0).Click();
                }
            }
                
            // Now select the quarter you want
            if(quarterToTest == "Q1")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(3).Panel(0).Click();                
            }
            if(quarterToTest == "Q2")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(3).Panel(1).Click();                
            }
            if(quarterToTest == "Q3")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(3).Panel(2).Click();                
            }
            if(quarterToTest == "Q4")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(3).Panel(3).Click();                
            }
      }
      if(period == "Year")
      {
            datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(0).Panel(2).Click();
            if(yearToTest == 2014)
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(5).Panel(0).Click();
            }
            if(yearToTest == 2015)
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(5).Panel(1).Click();
            }
            if(yearToTest == 2016)
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(5).Panel(2).Click(); 
            }               
      }
  // Then click OK
  datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(6).Button(0).Click();
  Log.Message(datePickerWidget.Panel("DateFilter").Panel("DateFilterText").contentText);
  } 

  if(SelectedOption == "ClinicalAudit")
  {
      var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
      datePickerWidget = analytics_page.Panel(1).Panel("pageContainer").Panel("pageContentWrapper").Panel("filterContainer").Panel("filterPanel").Panel(0).Panel("panelBodyLocationAndDate");
      // First Click the down arrow to wake the date picker up
      datePickerWidget.Panel("DateFilter").Panel(0).Panel(2).Panel(0).Click();

      // now pick whether you want "Month", "Quarter", "Year" based on the passed in "period"
      if(period == "Month")
      {
            datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(0).Panel(0).Click();
                                
            // If you dont want to test current year you need to move the correct year first
            if(yearToTest != currentYear)
            {
                //scroll left number of times equal to current year minus year you want (e.g. 2016 - 2014, 2 clicks) this selects correct year
                numberOfDatePickerClicks = currentYear - yearToTest;
                for(var i = 1; i <= numberOfDatePickerClicks; i++)
                {
                    datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(1).Panel(0).Click();
                }
            }
         
            // Now select the month you want
           if(monthToTest == "January")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(0).Click();               
            }
           if(monthToTest == "February")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(1).Click();               
            }
           if(monthToTest == "March")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(2).Click();               
            }
           if(monthToTest == "April")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(3).Click();               
            }
           if(monthToTest == "May")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(4).Click();               
            }
           if(monthToTest == "June")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(5).Click();               
            }
           if(monthToTest == "July")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(6).Click();               
            }
           if(monthToTest == "August")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(7).Click();               
            }
           if(monthToTest == "September")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(8).Click();               
            }
           if(monthToTest == "October")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(9).Click();               
            }
           if(monthToTest == "November")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(10).Click();               
            }
           if(monthToTest == "December")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(2).Panel(11).Click();               
            }
      }
      if(period == "Quarter")
      {
            datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(0).Panel(1).Click();
                                
            // If you dont want to test current year you need to move the correct year first
            if(yearToTest != currentYear)
            {
                //scroll left number of times equal to current year minus year you want (e.g. 2016 - 2014, 2 clicks) this selects correct year
                numberOfDatePickerClicks = currentYear - yearToTest;
                for(var i = 1; i <= numberOfDatePickerClicks; i++)
                {
                    datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(1).Panel(0).Click();
                }
            }
                
            // Now select the quarter you want
            if(quarterToTest == "Q1")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(3).Panel(0).Click();                
            }
            if(quarterToTest == "Q2")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(3).Panel(1).Click();                
            }
            if(quarterToTest == "Q3")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(3).Panel(2).Click();                
            }
            if(quarterToTest == "Q4")
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(3).Panel(3).Click();                
            }
      }
      if(period == "Year")
      {
            datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(0).Panel(2).Click();
            if(yearToTest == 2014)
            {
                datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(5).Panel(0).Click();
            }
            if(yearToTest == 2015)
            {
                 datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(5).Panel(1).Click();
            }
            if(yearToTest == 2016)
            {
                 datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(5).Panel(2).Click();
            }               
      }
  // Then click OK
  datePickerWidget.Panel("dateModal").Panel("dateModalDialog").Panel(0).Panel("dateModalBody").Panel("Calendar_calander1").Panel(6).Button(0).Click();
  Log.Message(datePickerWidget.Panel("DateFilter").Panel("DateFilterText").contentText);
  }

  WaitSeconds(5);

  var stem = get_browser_address_bar_path("full");
  //Log.Message("stem = "+stem);
  var NewAddress = stem.wText;
  return NewAddress;
}

function exportCSV(application, CurrentPage, SelectedOption)
{

  if(SelectedOption == "PatientActivity")
  {
      var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
      if(application == "Analytics1")
      {
          analytics_page.Panel(1).Panel("pageContainer").Panel(0).Panel("filterContainer").Panel("filterPanel").Panel(3).Button("ExportCSV").Click();
      }
      if(application == "Analytics2")
      {
          analytics_page.Panel(1).Panel("pageContainer").Panel(0).Panel("filterContainer").Panel("filterPanel").Panel(4).Button("ExportCSV").Click();
      }   
  }

  //WaitSeconds(40);
  
  if(SelectedOption == "ClinicalAudit")
  {

      var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
      if(application == "Analytics1")
      {
          analytics_page.Panel(1).Panel("pageContainer").Panel("pageContentWrapper").Panel("filterContainer").Panel("filterPanel").Panel(3).Button("ExportCSV").Click();
      }
      if(application == "Analytics2")
      {
          analytics_page.Panel(1).Panel("pageContainer").Panel("pageContentWrapper").Panel("filterContainer").Panel("filterPanel").Panel(4).Button("ExportCSV").Click();
      }   
  }

  // Need to not do the saving (using Alt-S) of downloads too quick, so couple of waits
  WaitSeconds(5);
  var stem = get_browser_address_bar_path("short"); 
  stem.Window("Frame Notification Bar", "", 1).Window("DirectUIHWND", "", 1).Keys("~S");
  WaitSeconds(5);

  var stem = get_browser_address_bar_path("full");
  //Log.Message("stem = "+stem);
  var NewAddress = stem.wText;
  return NewAddress;
}

// UI stuff I'm messing about with!
function columnFilters(CurrentPage, Accordian, SelectedFilter, PropertyOrAction)
{
var filterPanel;
var checkBox;
var defaultChecked;

  if(Accordian == "WarfarinPatients")
  {
    var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
    var filterPanel = analytics_page.Panel(1).Panel("pageContainer").Panel(0).Panel("filterContainer").Panel("filterPanel").Panel("accordion").Panel("WarfarinPatientsFilterPanel").Panel("WarfarinPatientsFilterPanelcollapseOne").Panel(0).Panel("outOfRangeINRTreatments").Panel("accordionPanelBody");
    
    if(SelectedFilter == "PatientsOverPeriod")
    {
          checkBox = filterPanel.Panel(0).Checkbox("ActivePatientsOverPeriod");
    }
    if(SelectedFilter == "PatientsEndPeriod")
    {
          checkBox = filterPanel.Panel(1).Checkbox("ActivePatientsEnd");
    
    }
    if(SelectedFilter == "PatientsTreated")
    {
          checkBox = filterPanel.Panel(2).Checkbox("PatientsTreated");
    
    }
    if(SelectedFilter == "PatientsInitiated")
    {
          checkBox = filterPanel.Panel(3).Checkbox("PatientsInitiated");
    
    }
  }
  if(Accordian == "WarfarinTreatments")
  {
    var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
    var filterPanel = analytics_page.Panel(1).Panel("pageContainer").Panel(0).Panel("filterContainer").Panel("filterPanel").Panel("accordion").Panel("WarfarinTreatmentsFilterPanel").Panel("WarfarinTreatmentsFilterPanelcollapseOne").Panel(0).Panel("outOfRangeINRTreatments").Panel("accordionPanelBody");
    
    if(SelectedFilter == "HomeVisits")
    {
          checkBox = filterPanel.Panel(0).Checkbox("HomeVistis");
    
    }
    if(SelectedFilter == "TreatmentsDone")
    {
          checkBox = filterPanel.Panel(1).Checkbox("TreatmentsDone");
    
    }
  }
  if(Accordian == "TTR")
  {
    var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
    var filterPanel = analytics_page.Panel(1).Panel("pageContainer").Panel("pageContentWrapper").Panel("filterContainer").Panel("filterPanel").Panel("accordion").Panel("TTRFilterPanel").Panel("TTRFilterPanelcollapseOne").Panel(0).Panel("outOfRangeINRTreatments").Panel("accordionPanelBody");
    
    if(SelectedFilter == "12MnthRolling")
    {
          checkBox = filterPanel.Panel(0).Checkbox("TTRRolling");
    }
  }
  if(Accordian == "INR")
  {
    var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
    var filterPanel = analytics_page.Panel(1).Panel("pageContainer").Panel("pageContentWrapper").Panel("filterContainer").Panel("filterPanel").Panel("accordion").Panel("INRFilterPanel").Panel("INRFilterPanelcollapseOne").Panel(0).Panel("outOfRangeINRTreatments").Panel("accordionPanelBody");
    
    if(SelectedFilter == "INRGreater8")
    {
          checkBox = filterPanel.Panel(0).Checkbox("INRGreater8");
    
    }
    if(SelectedFilter == "INRGreater5")
    {
          checkBox = filterPanel.Panel(1).Checkbox("INRGreater5");
    
    }
    if(SelectedFilter == "INRGreater1")
    {
          checkBox = filterPanel.Panel(2).Checkbox("INRGreater1");
    
    }
    if(SelectedFilter == "INRVariance0_5")
    {
          checkBox = filterPanel.Panel(3).Checkbox("INRVariance0_5");
    
    }
    if(SelectedFilter == "INRVariance0_75")
    {
          checkBox = filterPanel.Panel(4).Checkbox("INRVariance0_75");
    
    }
    if(SelectedFilter == "INRVariance1_0")
    {
          checkBox = filterPanel.Panel(5).Checkbox("INRVariance1_0");
    
    }
  }
  if(Accordian == "AdverseEvents")
  {
    var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
    var filterPanel = analytics_page.Panel(1).Panel("pageContainer").Panel("pageContentWrapper").Panel("filterContainer").Panel("filterPanel").Panel("accordion").Panel("AdverseEventsFilterPanel").Panel("AdverseEventsFilterPanelcollapseOne").Panel(0).Panel("outOfRangeINRTreatments").Panel("accordionPanelBody");
    
    if(SelectedFilter == "Severe")
    {
          checkBox = filterPanel.Panel(0).Checkbox("SevereAE");
    
    }
    if(SelectedFilter == "Intermediate")
    {
          checkBox = filterPanel.Panel(1).Checkbox("IntermediateAE");
    
    }
    if(SelectedFilter == "Minor")
    {
          checkBox = filterPanel.Panel(2).Checkbox("MinorAE");
    
    }
  }
  if(Accordian == "DNA")
  {
    var analytics_page = Sys.Process("iexplore").Page(CurrentPage);
    var filterPanel = analytics_page.Panel(1).Panel("pageContainer").Panel("pageContentWrapper").Panel("filterContainer").Panel("filterPanel").Panel("accordion").Panel("DNAAndOverdueFilterPanel").Panel("DNAAndOverdueFilterPanelcollapseOne").Panel(0).Panel("outOfRangeINRTreatments").Panel("accordionPanelBody");
    
    if(SelectedFilter == "DNA")
    {
          checkBox = filterPanel.Panel(0).Checkbox("DNA");
    
    }
    if(SelectedFilter == "Overdue")
    {
          checkBox = filterPanel.Panel(1).Checkbox("PatientsOverdueAtEOP");    
    }
  }

  if(PropertyOrAction == "IsItChecked")
  {
      defaultChecked = checkBox.Checked;
      Log.Message(Accordian+" "+SelectedFilter+" is it checked? "+defaultChecked);
      return defaultChecked;
  }
}