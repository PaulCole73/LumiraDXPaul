//USEUNIT Common
//USEUNIT PaulT_BlogCopies
//USEUNIT PaulT_Analytics_Navigation_Bar
//USEUNIT PaulT_Analytics_Authentication
//USEUNIT PaulT_Analytics_SideBar
//USEUNIT PaulT_CommandLine

// Select system
function Quick_Test()
{ 
// variables for navigating around tabs (Analytics 1 & 2)
var analytics1 = "https://inrstaranalytics-1.inrstar.test/";
var analytics2 = "https://inrstaranalytics-2.inrstar.test/";
var currentAnalytics1Tab;
var currentAnalytics2Tab;

// variables for gathering 2 exported CSV file names to compare
var concatenatedFilenames;
var splitFilenames;
var filename1;
var filename2;
var numberOfFiles;

// variables for controlling dates to test
var currentYear = 2016;
var minimumYear = 2014;
var yearToTest;


var counters = [];

for(var i = 0; i <10; i++) {
  counters[i] = {
                       misMatchDataTypes:0,
                       misMatchedComparisonToNULL:0,
                       misMatchedComparisonWithZero:0,
                       misMatchedNonNumerics:0,
                       perfectMatchedValues:0,
                       numericDifferenceWithinAcceptedPercentageError:0,
                       unacceptablePercentageError:0,
                       totalCSVCellsCompared:0, 
                       overrideColumnCountDiff:0,
                       massagedDriver1ColumnCount:0 
                    }
  }                    

  
  for(var i=0; i<10; i++)
  {
    counters[i].misMatchDataTypes++;
  }                    
Log.Message(counters[1].misMatchDataTypes);








  
//  //Switch to Analytics 1 and Login
//  OpenNewTab(analytics1);
//  currentAnalytics1Tab = Login_Single_App("Analytics1","SouthDocs");
//  
//  //Switch to Analytics 2 and Login
//  SelectTab(analytics2);
//  currentAnalytics2Tab = Login_Single_App("Analytics2","SouthDocs");

  
  // Open two tabs one for each Analytics
 Browsers.Item(btIExplorer).Run(analytics1);
 var browser = Sys.Browser();
 
          //Loop through years testing both pages using export CSV
          for(yearToTest=minimumYear ; yearToTest <= currentYear; yearToTest++)
          {
               //Clear all CSV files from the logged in users downloads directory ready to create some new exports
              run_bat_file("C:\\DeleteCSVsInDirectory.bat");
 
              browser.ToUrl(analytics1); 
              currentAnalytics1Tab = get_browser_address_bar_path("full").wText;
              currentAnalytics1Tab = use_analytics_navigation_bar(currentAnalytics1Tab,"PatientActivity");
              currentAnalytics1Tab = datePicker("Analytics1", currentAnalytics1Tab, "PatientActivity", "Year", yearToTest, "", "");
              currentAnalytics1Tab = exportCSV("Analytics1", currentAnalytics1Tab, "PatientActivity");

              //Switch to Analytics 2 and export CSV for Patient Activity             
              browser.ToUrl(analytics2); 
              currentAnalytics2Tab = get_browser_address_bar_path("full").wText;
              currentAnalytics2Tab = use_analytics_navigation_bar(currentAnalytics2Tab,"PatientActivity");
              currentAnalytics2Tab = datePicker("Analytics2", currentAnalytics2Tab, "PatientActivity", "Year", yearToTest, "", "");
              currentAnalytics2Tab = exportCSV("Analytics2", currentAnalytics2Tab, "PatientActivity");

             run_bat_file2("C:\\CopyCSVsInDirectory.bat ", yearToTest);
              WaitSeconds(10);
              // Now find the two files and compare them 
              concatenatedFilenames = ListFiles("E:\\AnalyticsExports\\"); 
              Log.Message(concatenatedFilenames);
              splitFilenames = concatenatedFilenames.split(":");
              if(splitFilenames[0] == "2")
              {
                filename1 = "E:\\AnalyticsExports\\"+splitFilenames[1]+".csv";
                filename2 = "E:\\AnalyticsExports\\"+splitFilenames[2]+".csv";
      
                Log.Message("Filename 1 = "+filename1);
                Log.Message("Filename 2 = "+filename2);
              }
              else
              {
                Log.Error("Incorrect number of files to compare");
              } 
  
              // Now compare the files
              compare_two_csv_files(filename1, filename2, "PatientActivity");

                //Clear all CSV files from the logged in users downloads directory ready to create some new exports
              run_bat_file("C:\\DeleteCSVsInDirectory.bat");
    
              //Switch to Analytics 1 and export CSV for Clinical Audit
              browser.ToUrl(analytics1); 
              currentAnalytics1Tab = get_browser_address_bar_path("full").wText;
              currentAnalytics1Tab = use_analytics_navigation_bar(currentAnalytics1Tab,"ClinicalAudit");
              currentAnalytics1Tab = datePicker("Analytics1", currentAnalytics1Tab, "ClinicalAudit", "Year", yearToTest, "", "");
              currentAnalytics1Tab = exportCSV("Analytics1", currentAnalytics1Tab, "ClinicalAudit");

              //Switch to Analytics 2 and export CSV for Clinical Audit
              browser.ToUrl(analytics2); 
              currentAnalytics2Tab = get_browser_address_bar_path("full").wText;
              currentAnalytics2Tab = use_analytics_navigation_bar(currentAnalytics2Tab,"ClinicalAudit");
              currentAnalytics2Tab = datePicker("Analytics2", currentAnalytics2Tab, "ClinicalAudit", "Year", yearToTest, "", "");
              currentAnalytics2Tab = exportCSV("Analytics2", currentAnalytics2Tab, "ClinicalAudit");

                // Now find the two files and compare them 
             run_bat_file2("C:\\CopyCSVsInDirectory.bat ", yearToTest );
              WaitSeconds(10);
              // Now find the two files and compare them 
              concatenatedFilenames = ListFiles("E:\\AnalyticsExports\\"); 
              Log.Message(concatenatedFilenames);
              splitFilenames = concatenatedFilenames.split(":");
              if(splitFilenames[0] == "2")
              {
                filename1 = "E:\\AnalyticsExports\\"+splitFilenames[1]+".csv";
                filename2 = "E:\\AnalyticsExports\\"+splitFilenames[2]+".csv";
      
                Log.Message("Filename 1 = "+filename1);
                Log.Message("Filename 2 = "+filename2);
              }
              else
              {
                Log.Error("Incorrect number of files to compare");
              }
              // Now compare the files
              compare_two_csv_files(filename1, filename2, "ClinicalAudit");
    }       

  // Now log out of both applications
//  SelectTab(currentAnalytics1Tab);
//  currentAnalytics1Tab = use_analytics_navigation_bar(currentAnalytics1Tab,"Logout");
//  SelectTab(currentAnalytics2Tab);
//  currentAnalytics2Tab = use_analytics_navigation_bar(currentAnalytics2Tab,"Logout"); 

}

function run_bat_file2(filename, param)
{
var obj = Sys.OleObject("WScript.Shell");
    
    obj.Run("\"" + filename + "\"" + param );
}