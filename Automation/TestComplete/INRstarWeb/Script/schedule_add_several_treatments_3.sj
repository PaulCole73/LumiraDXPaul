//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation
//USEUNIT V5_SQL

//USEUNIT Add_INR_Simple
//USEUNIT Delete_Treatments
//--------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
// Routine to read in several sets of patient treatments and add them in
//------------------------------------------------------------------------------------------------------

function add_several_treatments_3()
{
  // Define Input file
  driver = DDT.ExcelDriver("Y:\\TestComplete_Data\\TreatmentsSales.xls","Treatments");

//  Log_On(1); // hugo @ maplestead
    
  var INRstarV5 = set_system(); 

  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");

  var panelLS = INRstarV5.Panel("MainPage").panel("Header").Panel("logindisplay").Panel("LoginStatus");
  var w_text = panelLS.TextNode(0).innerText;
  var w_at = aqString.Find(w_text,"@");
  var w_locn_name = aqString.Substring(w_text,w_at+2,50);
  
  var w_locn_id = SQL_Get_Testing_Location_id(w_locn_name);
  
  var w_row;

  Log.Message ("******************************* Start of Loop");
  
    // This bit reads the file of test values, and processes each row which matches the w_Run value 
    while (!driver.EOF())
    {
      if (driver.Value(0) == "Y")
      {
          var w_nhs = driver.Value(1);
          var w_Name = driver.Value(2);
          Goto_Patient_Search();
          preset_Fetch_Patient_NHS(INRstarV5, w_nhs);
          
          var w_days = driver.Value(10)*7*(-1);

          Log.Message (w_nhs, "w_days :" + w_days);
  
          // Loop around the number of reviews, adding each treatment, then resetting the dates  
          for (i=0; i<8; i++)
          {
              w_col = i+11;
              
              if (i == 0)
              {
                var w1_day = driver.Value(7);
                var w1_mon = driver.Value(8);
                var w1_yer = driver.Value(9);
                var w1_tar = driver.Value(4);
                var w1_inr = FloatToString(driver.Value(11));
                var w1_dos = FloatToString(driver.Value(5));
                var w1_dys = "7 Days";
                var w1_com = "Start of Treatment"
                // Add 1st treatment as Historical
                Goto_Add_Historical();
                quick_pt_historical(w1_day, w1_mon, w1_yer, w1_tar, w1_inr, w1_dos, w1_dys, w1_com);

                w_days = (w_days + 7);

              }
              else
              {
              
                  if (driver.Value(w_col) > 0)
                  {
                    Goto_Patient_New_INR();
                    Log.Message("w_col:"+w_col+" driver.Value : "+driver.Value(w_col));
                    add_inr_simple(driver.Value(w_col));
     
                    // Find the suggested Review Period
                    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
                    var panelPTIH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory").Panel("PatientTreatmentINRHistory");
                    var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper")
                    wt_treatments = panelVPHTW.Table("PatientTreatmentHistoryTable");
                    w_row = wt_treatments.Rowcount - 1;
                    Log.Message ("w_row: " + w_row);
                    w_review = aqConvert.StrToInt(wt_treatments.Cell(w_row,6).innerText);
      
                    // Show the difference days and the review
                    Log.Message("Diff: "+ w_days + ", Review : " + w_review);
      
                    // Reset the treatment details
                    SQL_Update_Dates_Maintenance_NHS(w_locn_id, w_nhs, w_days, w_review);
      
                    w_days = (w_days + w_review);
                  }
              }
          }
          Goto_Patient_Treatment(); 
       }   
       driver.Next();      
    }   
}