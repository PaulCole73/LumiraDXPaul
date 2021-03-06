//USEUNIT Common
//USEUNIT PaulT_BlogCopies
//USEUNIT PaulT_Analytics_Navigation_Bar
//USEUNIT PaulT_Analytics_Authentication
//USEUNIT PaulT_Analytics_SideBar
//USEUNIT PaulT_CommandLine

/* This has 3 mains() if you like
1. Test data by year
2. Test all the quarters within specified single year
3. Test all months within a specified single year */


function Test_Whole_Years()
{ 
// variables for navigating around tabs (Analytics 1 & 2)
var analytics1 = "https://inrstaranalytics-1.inrstar.test/";
var analytics2 = "https://inrstaranalytics-2.inrstar.test/";
var currentAnalytics1Tab;
var currentAnalytics2Tab;

// variables for controlling dates to test
var currentYear = 2016;
var minimumYear = 2014;
var yearToTest;


  // Open two tabs one for each Analytics
  Browsers.Item(btIExplorer).Run(analytics2);
  
  //Switch to Analytics 1 and Login
  OpenNewTab(analytics1);
  currentAnalytics1Tab = Login_Single_App("Analytics1","SouthDocs");
  
  //Switch to Analytics 2 and Login
  SelectTab(analytics2);
  currentAnalytics2Tab = Login_Single_App("Analytics2","SouthDocs");

  //Loop through years testing both pages using export CSV
  for(yearToTest=minimumYear; yearToTest <= currentYear; yearToTest++)
  {
      Log.Message("");
      Log.Message("Testing : "+yearToTest);

      //Clear all CSV files from the logged in users downloads directory ready to create some new exports
      run_bat_file("C:\\DeleteCSVsInDirectory.bat");
      Log.Message("");
      Log.Message("Testing : Patient Activity");
  
      //Switch to Analytics 1 and export CSV for Patient Activity
      currentAnalytics1Tab = generateCSVToCompare(currentAnalytics1Tab, "PatientActivity", "Year", currentYear, yearToTest, "", "", "Analytics1");
      
      //Switch to Analytics 2 and export CSV for Patient Activity
      currentAnalytics2Tab = generateCSVToCompare(currentAnalytics2Tab, "PatientActivity", "Year", currentYear, yearToTest, "", "", "Analytics2");

      // copies csvs into central area rather than in user profile (passes in year under test) -RC code (this allows E:\\AnalyticsExports to be used)
      run_bat_file_with_param("C:\\CopyCSVsInDirectory.bat ", yearToTest);
      WaitSeconds(10);
      
      // Now find the two files and compare them 
      getExportedFilesAndCompareThem("PatientActivity");

      //Clear all CSV files from the logged in users downloads directory ready to create some new exports
      run_bat_file("C:\\DeleteCSVsInDirectory.bat");
      Log.Message("");
      Log.Message("Testing : Clinical Audit");      
         
      //Switch to Analytics 1 and export CSV for Clinical Audit
      currentAnalytics1Tab = generateCSVToCompare(currentAnalytics1Tab, "ClinicalAudit", "Year", currentYear, yearToTest, "", "", "Analytics1");

      //Switch to Analytics 2 and export CSV for Clinical Audit
      currentAnalytics2Tab = generateCSVToCompare(currentAnalytics2Tab, "ClinicalAudit", "Year", currentYear, yearToTest, "", "", "Analytics2");

      // copies csvs into central area rather than in user profile (passes in year under test)
      run_bat_file_with_param("C:\\CopyCSVsInDirectory.bat ", yearToTest);
      WaitSeconds(10);     
      
      // Now find the two files and compare them 
      getExportedFilesAndCompareThem("ClinicalAudit");
  }       
  // Now log out of both applications
  SelectTab(currentAnalytics1Tab);
  currentAnalytics1Tab = use_analytics_navigation_bar(currentAnalytics1Tab,"Logout");
  SelectTab(currentAnalytics2Tab);
  currentAnalytics2Tab = use_analytics_navigation_bar(currentAnalytics2Tab,"Logout"); 

}

function Test_Quarters_Within_A_Year()
{ 
// variables for navigating around tabs (Analytics 1 & 2)
var analytics1 = "https://inrstaranalytics-1.inrstar.test/";
var analytics2 = "https://inrstaranalytics-2.inrstar.test/";
var currentAnalytics1Tab;
var currentAnalytics2Tab;

// variables for controlling dates to test
var yearUnderTest = 2015;
var quarterCounter = 4;
var quarterNumberToTest;
var quarterNameToTest = "";

var currentYear = 2016;

  // Open two tabs one for each Analytics
  Browsers.Item(btIExplorer).Run(analytics2);
  
  //Switch to Analytics 1 and Login
  OpenNewTab(analytics1);
  currentAnalytics1Tab = Login_Single_App("Analytics1","SouthDocs");
  
  //Switch to Analytics 2 and Login
  SelectTab(analytics2);
  currentAnalytics2Tab = Login_Single_App("Analytics2","SouthDocs");

  //Loop through quarters within specified test year testing both pages using export CSV
  for(quarterNumberToTest=1; quarterNumberToTest <= quarterCounter; quarterNumberToTest++)
  {
      //Set the name of the quarter based on the number currently looping
      quarterNameToTest="Q"+quarterNumberToTest;

      Log.Message("");
      Log.Message("Testing : "+yearUnderTest+" : "+quarterNameToTest);

      //Clear all CSV files from the logged in users downloads directory ready to create some new exports
      run_bat_file("C:\\DeleteCSVsInDirectory.bat");
      Log.Message("");
      Log.Message("Testing : Patient Activity");
  
      //Switch to Analytics 1 and export CSV for Patient Activity
      Log.Message("I'm about to call generateCSVToCompare for first time");
      currentAnalytics1Tab = generateCSVToCompare(currentAnalytics1Tab, "PatientActivity", "Quarter", currentYear, yearUnderTest, quarterNameToTest, "", "Analytics1");
            
      //Switch to Analytics 2 and export CSV for Patient Activity
      Log.Message("I'm about to call generateCSVToCompare for second time");
      currentAnalytics2Tab = generateCSVToCompare(currentAnalytics2Tab, "PatientActivity", "Quarter", currentYear, yearUnderTest, quarterNameToTest, "", "Analytics2");

      // copies csvs into central area rather than in user profile (passes in year under test)
      run_bat_file_with_param("C:\\CopyCSVsInDirectory.bat ", yearUnderTest);
      WaitSeconds(10);
      
      // Now find the two files and compare them 
      getExportedFilesAndCompareThem("PatientActivity");

      //Clear all CSV files from the logged in users downloads directory ready to create some new exports
      run_bat_file("C:\\DeleteCSVsInDirectory.bat");
      Log.Message("");
      Log.Message("Testing : Clinical Audit");      
         
      //Switch to Analytics 1 and export CSV for Clinical Audit
      currentAnalytics1Tab = generateCSVToCompare(currentAnalytics1Tab, "ClinicalAudit", "Quarter", currentYear, yearUnderTest, quarterNameToTest, "", "Analytics1");

      //Switch to Analytics 2 and export CSV for Clinical Audit
      currentAnalytics2Tab = generateCSVToCompare(currentAnalytics2Tab, "ClinicalAudit", "Quarter", currentYear, yearUnderTest, quarterNameToTest, "", "Analytics2");

      // copies csvs into central area rather than in user profile (passes in year under test)
      run_bat_file_with_param("C:\\CopyCSVsInDirectory.bat ", yearUnderTest);
      WaitSeconds(10);     
      
      // Now find the two files and compare them 
      getExportedFilesAndCompareThem("ClinicalAudit");
  }       
  // Now log out of both applications
  SelectTab(currentAnalytics1Tab);
  currentAnalytics1Tab = use_analytics_navigation_bar(currentAnalytics1Tab,"Logout");
  SelectTab(currentAnalytics2Tab);
  currentAnalytics2Tab = use_analytics_navigation_bar(currentAnalytics2Tab,"Logout"); 

}

function Test_Months_Within_A_Year()
{ 
// variables for navigating around tabs (Analytics 1 & 2)
var analytics1 = "https://inrstaranalytics-1.inrstar.test/";
var analytics2 = "https://inrstaranalytics-2.inrstar.test/";
var currentAnalytics1Tab;
var currentAnalytics2Tab;

// variables for controlling dates to test
var yearUnderTest = 2015;
var monthCounter = 12;
var monthNumberToTest;
var monthNameToTest = "";

var currentYear = 2016;

  // Open two tabs one for each Analytics
  Browsers.Item(btIExplorer).Run(analytics2);
  
  //Switch to Analytics 1 and Login
  OpenNewTab(analytics1);
  currentAnalytics1Tab = Login_Single_App("Analytics1","SouthDocs");
  
  //Switch to Analytics 2 and Login
  SelectTab(analytics2);
  currentAnalytics2Tab = Login_Single_App("Analytics2","SouthDocs");

  //Loop through months within specified test year testing both pages using export CSV
  for(monthNumberToTest=1; monthNumberToTest <= monthCounter; monthNumberToTest++)
  {
      //Set the name of the month based on the number currently looping
      if(monthNumberToTest == 1)
      {
          monthNameToTest = "January";
      }
      if(monthNumberToTest == 2)
      {
          monthNameToTest = "February";
      }
      if(monthNumberToTest == 3)
      {
          monthNameToTest = "March";
      }
      if(monthNumberToTest == 4)
      {
          monthNameToTest = "April";
      }
      if(monthNumberToTest == 5)
      {
          monthNameToTest = "May";
      }
      if(monthNumberToTest == 6)
      {
          monthNameToTest = "June";
      }
      if(monthNumberToTest == 7)
      {
          monthNameToTest = "July";
      }
      if(monthNumberToTest == 8)
      {
          monthNameToTest = "August";
      }
      if(monthNumberToTest == 9)
      {
          monthNameToTest = "September";
      }
      if(monthNumberToTest == 10)
      {
          monthNameToTest = "October";
      }
      if(monthNumberToTest == 11)
      {
          monthNameToTest = "November";
      }
      if(monthNumberToTest == 12)
      {
          monthNameToTest = "December";
      }

      Log.Message("");
      Log.Message("Testing : "+yearUnderTest+" : "+monthNameToTest);

      //Clear all CSV files from the logged in users downloads directory ready to create some new exports
      run_bat_file("C:\\DeleteCSVsInDirectory.bat");
      Log.Message("");
      Log.Message("Testing : Patient Activity");
  
      //Switch to Analytics 1 and export CSV for Patient Activity
      Log.Message("I'm about to call generateCSVToCompare for first time");
      currentAnalytics1Tab = generateCSVToCompare(currentAnalytics1Tab, "PatientActivity", "Month", currentYear, yearUnderTest, "", monthNameToTest, "Analytics1");
            
      //Switch to Analytics 2 and export CSV for Patient Activity
      Log.Message("I'm about to call generateCSVToCompare for second time");
      currentAnalytics2Tab = generateCSVToCompare(currentAnalytics2Tab, "PatientActivity", "Month", currentYear, yearUnderTest, "", monthNameToTest, "Analytics2");

      // copies csvs into central area rather than in user profile (passes in year under test)
      run_bat_file_with_param("C:\\CopyCSVsInDirectory.bat ", yearUnderTest);
      WaitSeconds(10);
      
      // Now find the two files and compare them 
      getExportedFilesAndCompareThem("PatientActivity");

      //Clear all CSV files from the logged in users downloads directory ready to create some new exports
      run_bat_file("C:\\DeleteCSVsInDirectory.bat");
      Log.Message("");
      Log.Message("Testing : Clinical Audit");      
         
      //Switch to Analytics 1 and export CSV for Clinical Audit
      currentAnalytics1Tab = generateCSVToCompare(currentAnalytics1Tab, "ClinicalAudit", "Month", currentYear, yearUnderTest, "", monthNameToTest, "Analytics1");

      //Switch to Analytics 2 and export CSV for Clinical Audit
      currentAnalytics2Tab = generateCSVToCompare(currentAnalytics2Tab, "ClinicalAudit", "Month", currentYear, yearUnderTest, "", monthNameToTest, "Analytics2");

      // copies csvs into central area rather than in user profile (passes in year under test)
      run_bat_file_with_param("C:\\CopyCSVsInDirectory.bat ", yearUnderTest);
      WaitSeconds(10);     
      
      // Now find the two files and compare them 
      getExportedFilesAndCompareThem("ClinicalAudit");
  }       
  // Now log out of both applications
  SelectTab(currentAnalytics1Tab);
  currentAnalytics1Tab = use_analytics_navigation_bar(currentAnalytics1Tab,"Logout");
  SelectTab(currentAnalytics2Tab);
  currentAnalytics2Tab = use_analytics_navigation_bar(currentAnalytics2Tab,"Logout"); 

}



function generateCSVToCompare(currentAnalyticsTab, analyticsPage, periodsToBeTested, currentYear, yearToTest, quarterToTest, monthToTest, application)
{
Log.Message(currentAnalyticsTab);
Log.Message(analyticsPage);
Log.Message(periodsToBeTested);
Log.Message(yearToTest);
Log.Message(quarterToTest);
Log.Message(monthToTest);
Log.Message(application);

    if(periodsToBeTested == "Year")
    {
        SelectTab(currentAnalyticsTab);
        currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab, analyticsPage);
        currentAnalyticsTab = datePicker(currentAnalyticsTab, analyticsPage, periodsToBeTested, currentYear, yearToTest, "", "");
        currentAnalyticsTab = exportCSV(application, currentAnalyticsTab, analyticsPage);
    }
    if(periodsToBeTested == "Quarter")
    {
        SelectTab(currentAnalyticsTab);
        currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab, analyticsPage);
        currentAnalyticsTab = datePicker(currentAnalyticsTab, analyticsPage, periodsToBeTested, currentYear, yearToTest, quarterToTest, "");
        currentAnalyticsTab = exportCSV(application, currentAnalyticsTab, analyticsPage);
    }
    if(periodsToBeTested == "Month")
    {
        SelectTab(currentAnalyticsTab);
        currentAnalyticsTab = use_analytics_navigation_bar(currentAnalyticsTab, analyticsPage);
        currentAnalyticsTab = datePicker(currentAnalyticsTab, analyticsPage, periodsToBeTested, currentYear, yearToTest, "", monthToTest);
        currentAnalyticsTab = exportCSV(application, currentAnalyticsTab, analyticsPage);
    }

return currentAnalyticsTab;
}

function getExportedFilesAndCompareThem(analyticsPage)
{
var concatenatedFilenames;
var splitFilenames;
var filename1;
var filename2;

      // Now find the two files and compare them 
      concatenatedFilenames = ListFiles("E:\\AnalyticsExports\\");
      splitFilenames = concatenatedFilenames.split(":");
      if(splitFilenames[0] == "2")
      {
        filename1 = "E:\\AnalyticsExports\\"+splitFilenames[1]+".csv";
        filename2 = "E:\\AnalyticsExports\\"+splitFilenames[2]+".csv";     
      }
      else
      {
        Log.Error("Incorrect number of files to compare");
      } 
  
      // Now compare the files
      compare_two_csv_files(filename1, filename2, analyticsPage);
}

