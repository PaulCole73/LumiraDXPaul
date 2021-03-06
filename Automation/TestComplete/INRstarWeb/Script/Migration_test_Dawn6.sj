//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation



//======================================= Main Routine =================================
function Main()
{
//  try
//  {
    var w_now = aqDateTime.Now(); 
    var w_outfile = "d:\\Results\\migrated_dawn.csv";

    aqFile.WriteToTextFile(w_outfile, "\r\n",  aqFile.ctANSI, true);
    //----------------------------------------------------------------------------------------

//    set_parameters(w_Run, wf_round, w_RoundVal, wf_NPSA, wf_algo);
    
    Log_On(4); // 
    
    var INRstarV5 = set_system();  
    var w_mess = "";
    
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\d6_bro.xls","Patients");
    
    // Overall working storage
    var w_current_patient = ""; 
    
    var d_pid = 1;
    var d_title = 2;
    var d_surname = 3;
    var d_forename = 4;
    var d_NHS = 5;
    var d_dob = 6;
    var d_add1 = 7;
    var d_add_2 = 8;
    var d_add3 = 9;
    var d_add4 = 10;
    var d_pcode = 11;
    var d_telno = 12;
    var d_sex = 13;
    var d_active = 14;
    var d_notes = 15;
    
    var d_treatment_pid = 16;
    var d_clinicdate = 17;
    var d_currentinr = 18;
    var d_clinicnote = 19;
    var d_calcdose = 20;
    var d_currentdose = 21;
    var d_nextappt = 22; 
    
    
    // This bit reads the file of test values, and processes each indicated row 
    while (!driver.EOF())
    {
      if (driver.Value(0) == "Y")
      {
        if (w_current_patient != driver.Value(d_pid)) // New Patient
        {
          w_current_patient = driver.Value(d_pid);       
          w_mess = "==================, Patient : " + driver.Value(d_pid) +", "+ driver.Value(d_surname) + " ==================";
          Log.Message(w_mess);
          write_results(w_mess);
        
          Goto_Patient_Search();
          Uncheck_Active_patients();
          if(aqString.GetLength(driver.Value(d_NHS)) == 12)
            preset_Fetch_Patient_NHS(INRstarV5, driver.Value(d_NHS));
          else
            preset_Fetch_Patient(INRstarV5, aqString.ToUpper(driver.Value(d_surname))+", "+driver.Value(d_forename));
          
          Goto_Patient_Demographics();
          compare_demographics(INRstarV5);
          
//          Goto_Patient_Clinical();
//          compare_clinical(INRstarV5);
//          
//          Goto_Patient_Notes();
//          compare_notes(INRstarV5);
//          
////          Goto_Patient_Adverse_Events();
////          compare_adverse(INRstarV5,driver.Value(2));
//          
//          Goto_Patient_Treatment();
        }
//        compare_treatments(INRstarV5);
      }  
      // Next record
      driver.Next();      
          
    }
    //DDT.CloseDriver("d:\\Test_Data\\ie_eastern5.xls");
    
    // Log off
    Log_Off();
 
//  catch(exception)
//  {
//     Log.Error("Exception", exception.description);
//  }
}
//----------------------------------------------------------------------------------------
function compare_demographics(INRstarV5)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
    var panelPD = panelPTC.Panel("PatientDetailsWrapper").Panel("PatientDetails");
    var panelPA = panelPTC.Panel("PatientDetailsWrapper").Panel("PatientContactDetails").Panel("patientAddress");
    var panelPCD = panelPTC.Panel("PatientDetailsWrapper").Panel("PatientContactDetails");
    
    // Test simple fields
    var surname = 3;
    test_field(INRstarV5, "Family name",aqString.ToUpper(driver.Value(surname)),panelPD.Panel(3).Label("Surname_DetachedLabel"));
    test_field(INRstarV5, "Given name",driver.Value(1),panelPD.Panel(4).Label("FirstName_DetachedLabel"));
    test_field(INRstarV5, "Post Code", aqString.ToUpper(driver.Value(5)), panelPA.Panel(4).Label("PostCode_DetachedLabel"));
    test_field(INRstarV5, "Phone No", driver.Value(6), panelPCD.Panel(1).Label("Phone_DetachedLabel"));
    
    //Date of Birth
    var w_v4_dob = driver.Value(8);
    var w_test_dob = aqString.SubString(w_v4_dob,0,2)+"-"+set_month(aqConvert.StrToInt(aqString.SubString(w_v4_dob,3,2)))+"-"+aqString.SubString(w_v4_dob,6,4);
    test_field(INRstarV5, "Date of Birth",w_test_dob,panelPD.Panel(5).Label("Born_DetachedLabel"));
    
    // Gender
    var w_gender = "Unknown";
    if (driver.Value(25) == "M")
      w_gender = "Male";
    if (driver.Value(25) == "F")
      w_gender = "Female";
    test_field(INRstarV5, "Gender", w_gender,panelPD.Panel(6).Label("Gender_DetachedLabel")); 
}
//----------------------------------------------------------------------------------------
function compare_clinical(INRstarV5)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
    var panelPCD = panelPTC.Panel("PatientClinicalWrapper").Panel("PatientClinicalDetails");

    var panelPCI = panelPCD.Panel("PatientClinicalInformation");
    var panelPCTS = panelPCD.Panel("PatientClinicalTabletSelection");

    var w_v4_date = "";
    var w_test_date = "";  
    var w_v4_DM = ""
    var w_test_DM = ""
    
    //Start Date
    w_v4_date = driver.Value(12);
    w_test_date = aqString.SubString(w_v4_date,0,2)+"-"+set_month(aqConvert.StrToInt(aqString.SubString(w_v4_date,3,2)))+"-"+aqString.SubString(w_v4_date,6,4);
    test_field(INRstarV5, "Start Date",w_test_date,panelPCI.Panel(0).Label("Start_DetachedLabel"));
    //End Date
    w_v4_date = driver.Value(14);
    if ((w_v4_date == "indef") || (w_v4_date == "Indef."))
      w_test_date = "Indefinite";    
    else
      w_test_date = aqString.SubString(w_v4_date,0,2)+"-"+set_month(aqConvert.StrToInt(aqString.SubString(w_v4_date,3,2)))+"-"+aqString.SubString(w_v4_date,6,4);
    test_field(INRstarV5, "End Date",w_test_date,panelPCI.Panel(1).Label("EndDate_DetachedLabel"));

    // Diagnosis
    test_diagnosis(INRstarV5, "Diagnosis", driver, panelPCI);
//    test_field(INRstarV5, "Diagnosis",driver.Value(10),panelPCI.Panel(2).Label("DiagnosisName_DetachedLabel"));

    // Target INR
    test_field(INRstarV5, "Target INR",FloatToString(driver.Value(11)),panelPCI.Panel(3).Label("TargetINR_DetachedLabel"));
    
    // Duration
    test_duration(INRstarV5, "Duration",driver.Value(13),panelPCI.Panel(4).Label("TreatmentDuration_DetachedLabel"));
    
    // Dosing Method
    w_v4_DM = driver.Value(16);
    if (w_v4_DM == "B")
      w_test_DM = "Coventry Maintenance"
    else
      w_test_DM = "Hillingdon Maintenance"
    test_field(INRstarV5, "Dosing Method",w_test_DM,panelPCI.Panel(5).Label("DosingMethod_DetachedLabel")); 
    
    // Testing Method
    w_v4_TM = driver.Value(33);
    if (w_v4_TM == false)
      w_test_TM = "Lab"
    else
      w_test_TM = "PoCT"
    test_field(INRstarV5, "Testing Method",w_test_TM,panelPCI.Panel(6).Label("TestingMethod_DetachedLabel"));
    
    // Tablets
    // If tabs == 0, then split represents 0.5mg tablets
    w_v4_tabs = driver.Value(22);
    w_v4_split = driver.Value(23); 
    w_v4_force = driver.Value(31);
    
    if (w_v4_force == 0) // Auto
    {
        test_checkbox (INRstarV5,"All tablets",true,panelPCTS.Panel(1).Checkbox("Use5")); 
        test_checkbox (INRstarV5,"All tablets",true,panelPCTS.Panel(2).Checkbox("Use3")); 
        test_checkbox (INRstarV5,"All tablets",true,panelPCTS.Panel(3).Checkbox("Use1"));
    }
    if (w_v4_force == 1) // Auto
    {
        test_checkbox (INRstarV5,"Only 1mg tablets - 5mg",false,panelPCTS.Panel(1).Checkbox("Use5")); 
        test_checkbox (INRstarV5,"Only 1mg tablets - 3mg",false,panelPCTS.Panel(2).Checkbox("Use3")); 
        test_checkbox (INRstarV5,"Only 1mg tablets - 1mg",true,panelPCTS.Panel(3).Checkbox("Use1"));
    }
    if (w_v4_force == 3) // Auto
    {
        test_checkbox (INRstarV5,"Only 3mg tablets - 5mg",false,panelPCTS.Panel(1).Checkbox("Use5")); 
        test_checkbox (INRstarV5,"Only 3mg tablets - 3mg",true,panelPCTS.Panel(2).Checkbox("Use3")); 
        test_checkbox (INRstarV5,"Only 1mg tablets - 1mg",false,panelPCTS.Panel(3).Checkbox("Use1"));
    }
    if (w_v4_force == 5) // Auto
    {
        test_checkbox (INRstarV5,"Only 5mg tablets - 5mg",true,panelPCTS.Panel(1).Checkbox("Use5")); 
        test_checkbox (INRstarV5,"Only 5mg tablets - 3mg",false,panelPCTS.Panel(2).Checkbox("Use3")); 
        test_checkbox (INRstarV5,"Only 5mg tablets - 1mg",false,panelPCTS.Panel(3).Checkbox("Use1"));
    }

    if (w_v4_tabs == 1) // Auto / Multiple
    {
        //  Check Split Tablets
        if (w_v4_split == 0) // Not split
            test_checkbox (INRstarV5,"Split tablets",false,panelPCTS.Panel(5).Checkbox("UseSplit")); 
        else
            test_checkbox (INRstarV5,"Split tablets",true,panelPCTS.Panel(5).Checkbox("UseSplit")); 
        
    }         
    else
    {
        //  Check 0.5mg Tablets
        if (w_v4_split == 0) // Not 0.5
            test_checkbox (INRstarV5,"0.5mg tablets",false,panelPCTS.Panel(4).Checkbox("UseHalfTablets")); 
        else
            test_checkbox (INRstarV5,"0.5mg tablets",true,panelPCTS.Panel(4).Checkbox("UseHalfTablets")); 
    }    
}
//----------------------------------------------------------------------------------------
function compare_notes(INRstarV5)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
    var panelPNW = panelPTC.Panel("PatientNotesWrapper");
    var tablePNT = panelPNW.Table("PatientNotesTable");

    var w_lastrow = tablePNT.Rowcount - 1;
    
    if (tablePNT.Cell(1,0).innerText != "No notes recorded")
    {
        // Can only test the content of the last note
        test_field(INRstarV5, "Patient Notes",driver.Value(18),tablePNT.Cell(w_lastrow, 0).Label("Notes_DetachedLabel"));
    }
}
//----------------------------------------------------------------------------------------
function compare_adverse(INRstarV5, p_patient_id)
{
    var panelMain = INRstarV5.Panel("MainPage");
    var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
    var panelPAEL = panelPTC.Panel("PatientAdverseEventsWrapper").Panel("PatientAdverseEventList");
    
    var w_v4_date = ""
    var w_test_date  = "";

        // Read input file
    var driver2 = DDT.ExcelDriver("d:\\Test_Data\\adverse.xls","Adverse");
    
    while (!driver2.EOF())
    {
      if (driver2.Value(1) == p_patient_id)
      {
        if (aqString.Find(driver2.Value(3),"/") > -1)
          {
              w_v4_date = driver2.Value(3);
              w_test_date = aqString.SubString(w_v4_date,0,2)+"-"+set_month(aqConvert.StrToInt(aqString.SubString(w_v4_date,3,2)))+"-"+aqString.SubString(w_v4_date,6,4);
        
              for (x=0;x<panelPAEL.childcount/2;x++)
              {
                  if (aqString.Find(panelPAEL.innerText, w_test_date))
                  {
//                    // Highlight the field
//                    Sys["HighlightObject"](panelPAEL.innerText,2);
                    
                    // Date found, so process
                    w_mess = "Adverse Event: " +  driver2.Value(2) + "  " + w_test_date  + "  " + driver2.Value(3) ; 
                    Log.Message(w_mess);
                  }
                  else
                     w_mess = "Not found";
                    Log.Message(w_mess);
              }
        }
      }
      // Next record
      driver2.Next();      
    }
    //DDT.CloseDriver("d:\\Test_Data\\ie_eastern5_adverse.xls");
}
//----------------------------------------------------------------------------------------
function compare_treatments(INRstarV5)
{
   var panelMain = INRstarV5.Panel("MainPage");
   var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
   var panelPTH = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory")
   var panelVPHTW = panelPTH.Panel("PatientTreatmentINRHistory").Panel("ViewPatientHistoricalTreatmentsWrapper");
   var tablePTHT = panelVPHTW.Table("PatientTreatmentHistoryTable");

   var w_rowcount = tablePTHT.Rowcount;
   if (w_rowcount > 7)
    w_rowcount = 7;
    
   for (i=1; i < w_rowcount; i++)
   {
      // Treatment Date
      w_v4_date = driver.Value(39);
      w_test_date = aqString.SubString(w_v4_date,0,2)+"-"+set_month(aqConvert.StrToInt(aqString.SubString(w_v4_date,3,2)))+"-"+aqString.SubString(w_v4_date,6,4);
      if (w_test_date == tablePTHT.Cell(i, 0).innerText)
      {
        Log.Message("Treatment Date : " + w_test_date + " ------------------------------------"); 
        test_field(INRstarV5,"INR", FloatToString(driver.Value(40)), tablePTHT.Cell(i,1));
        test_field(INRstarV5,"Dose", FloatToString(driver.Value(41)), tablePTHT.Cell(i,2));
        test_field(INRstarV5,"Suggested Dose", FloatToString(driver.Value(42)), tablePTHT.Cell(i,3));
        test_field(INRstarV5,"Omits", driver.Value(49), tablePTHT.Cell(i,4));
        test_field(INRstarV5,"Review", driver.Value(43), tablePTHT.Cell(i,5));
        test_field(INRstarV5,"Suggested Review", driver.Value(44), tablePTHT.Cell(i,6));
        w_v4_date = driver.Value(58);
        if (w_v4_date > "")
        {
          w_test_date = aqString.SubString(w_v4_date,0,2)+"-"+set_month(aqConvert.StrToInt(aqString.SubString(w_v4_date,3,2)))+"-"+aqString.SubString(w_v4_date,6,4);
          test_field(INRstarV5, "Next Test Date",w_test_date,tablePTHT.Cell(i,7));
        }
        // Comments
        w_V4_Comments = aqString.Trim(driver.Value(45))
        if (w_V4_Comments != "")
        {
            // Open the Comments for the treatment
            Log.Message("i = " + i);
            tablePTHT.Cell(i,8).Link("0").Click();
            test_comments(INRstarV5,"Comments", w_V4_Comments, read_comments(INRstarV5));
            close_comments_window(INRstarV5)
        }
      }
   }

}
//========================================================================================
//----------------------------------------------------------------------------------------
function test_field(INRstarV5, p_field, p_driver, p_screen)
{
  // Highlight the field
  Sys["HighlightObject"](p_screen,1);
  var w_mess = "";
  
  // Test the contents
  if (aqString.Trim(p_driver) != aqString.Trim(p_screen.innerText))
  {
    w_mess = p_field + ", Not matched, V4 = " + p_driver + " , V5 = " + p_screen.innerText;
    Log.Warning(w_mess);
  }  
  else
  {
    w_mess = p_field+ ", Matched, " + p_driver;
    Log.Message(w_mess);
  }  
  write_results(w_mess);
}
//----------------------------------------------------------------------------------------
function test_comments(INRstarV5, p_field, p_driver, p_screen)
{
  // Highlight the field
  Sys["HighlightObject"](p_screen,1);
  
  var w_mess = "";
  var w_d_val = "";  
  // Test the contents
  w_d_val = aqString.Replace(p_driver, "\r","");
  w_d_val = aqString.Replace(p_driver, "\n","");
  w_d_val = aqString.Trim(p_driver);
//  var w_p_val = p_screen.innerText; 
//  if (w_d_val != w_p_val)
    
  if (aqString.Contains(p_driver,p_screen.innerText) != 0)
  {
    w_mess = p_field + ", Not matched, V4 = " + w_d_val + " , V5 = " + p_screen.innerText;
    Log.Warning("V4:" + aqString.GetLength(w_d_val) + ", V5:" + aqString.GetLength(p_screen.innerText));
  }    
  else
    w_mess = p_field+ ", Matched, " + p_screen.innerText;
    
  Log.Message(w_mess);
  write_results(w_mess);
}
//----------------------------------------------------------------------------------------
function test_checkbox(INRstarV5, p_field, p_driver, p_screen)
{
  // highlight the field
  Sys["HighlightObject"](p_screen,1);
  var w_mess = "";
  
  // test the contents
  if (p_driver != p_screen.Checked)
    w_mess = p_field + " , Not matched, V4 = " + p_driver + " , V5 = " + p_screen.checked;
  else
    w_mess = p_field+ " , Matched, " + p_driver;
    
  Log.Message(w_mess);
  write_results(w_mess);
}
//----------------------------------------------------------------------------------------
function test_selection(INRstarV5, p_field, p_driver, p_screen)
{
  // highlight the field
  Sys["HighlightObject"](p_screen,1);
  
  // test the contents
  if (p_driver != p_screen.innerText)
    Log.Warning(p_field + " - Not matched: V4 = " + p_driver + " , V5 = " + p_screen.innerText);
  else
    Log.Message(p_field+ " - Matched: " + p_driver );
}
//----------------------------------------------------------------------------------------
function test_diagnosis(INRstarV5, p_field, p_driver, p_screen)
{
// Diagnosis Mapping 
// Each V4 Diagnosis / Target INT & Duration are compared against those in the mapping table
// If all 3 elements match, the mapping is done
// Else - 'No diagnosis'

  // highlight the field
  Sys["HighlightObject"](p_screen.Panel(2).Label("DiagnosisName_DetachedLabel"),1);
  var w_mess = "";
    
  //Test V4 data against V5 standard
  var driverMap = DDT.ExcelDriver("d:\\Test_Data\\Diagnosis.xls","Mapping");
  var wf_matched = false;
  var w_diagnosis = "";
  
  var c_v4_diagnosis = 0;
  var c_v4_targetINR = 1;
  var c_v4_duration = 2;
  var c_v5_diagnosis = 3;
  var c_v5_targetINR = 4;
  var c_v5_duration = 5;
    
  var s_diagnosis;
  var s_target_inr;
  var s_duration;
  
  while (!driverMap.EOF() && wf_matched == false)
  {
    s_diagnosis = p_screen.Panel(2).Label("DiagnosisName_DetachedLabel").innerText;
    s_target_inr = p_screen.Panel(3).Label("TargetINR_DetachedLabel").innerText;
    s_duration = p_screen.Panel(4).Label("TreatmentDuration_DetachedLabel").innerText;
    
    w_v4_diagnosis = p_driver.Value(10);
    
    
    if (driverMap.Value(c_v4_diagnosis) == p_driver.Value(10)  // Check Diagnosis
     && driverMap.Value(c_v4_targetINR) == p_driver.Value(11)  // Target INR
     && (driverMap.Value(c_v4_duration) == p_driver.Value(13)  // Duration
     || driverMap.Value(c_v4_duration) == "indef"))            // Duration - Null
     {
      // Does the V5 data match ?
      
      if (driverMap.Value(c_v5_diagnosis) ==  s_diagnosis              // V5 Diagnosis
         && driverMap.Value(c_v5_targetINR) == s_target_inr            // V5 Target INR
         && (driverMap.Value(c_v5_duration) + " Weeks" == s_duration)  // V5 Duration - weeks
         || driverMap.Value(c_v5_duration) == 0)                       // V5 Duration - indef
          {
              w_mess = p_field+ ",Matched," + s_diagnosis;
              wf_matched = true;
          }
      }
    driverMap.Next()
  }
  if (wf_matched == false)
  {
      // Check if V5 set to "No diagnosis"
      
      if (s_diagnosis == "No Diagnosis")
      {
        w_mess = p_field + " ,Matched,No Diagnosis";
       }
      else
      {
        w_mess = p_field + ",Not matched,"
        + " V4 = " + w_v4_diagnosis 
        + " , V5 = " + s_diagnosis;
      }
  }
  //DDT.CloseDriver("d:\\Test_Data\\Diagnosis.xls");

      
  Log.Message(w_mess);
  write_results(w_mess);
  
  
}
//----------------------------------------------------------------------------------------
function test_duration(INRstarV5, p_field, p_driver, p_screen)
{
  // Highlight the field
  Sys["HighlightObject"](p_screen,1);
  var w_mess = "";
  
  // Test the contents
  if (aqString.Trim(p_driver)+ " Weeks" == aqString.Trim(p_screen.innerText))
    w_mess = p_field+ "- Matched: V4 = " + p_driver + " , V5 = " + p_screen.innerText;
  else
    if (p_driver == "indef" && p_screen.innerText == "Indefinite")
      w_mess = p_field+ ", Matched, V4 = " + p_driver + " , V5 = " + p_screen.innerText;
    else
      w_mess = p_field + ", Not matched, V4 = " + p_driver + " , V5 = " + p_screen.innerText;
      
  Log.Message(w_mess);
  write_results(w_mess);
}
//----------------------------------------------------------------------------------------
function write_results(p_mess)
{
    var w_outfile = "d:\\Results\\migrated_data.csv";
   // Write the record to the file
   aqFile.WriteToTextFile(w_outfile, p_mess + "\r\n", aqFile.ctANSI);
}