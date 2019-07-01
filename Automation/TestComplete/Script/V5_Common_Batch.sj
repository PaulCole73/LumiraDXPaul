//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT Navigation
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Popups

//------------------------------------------------------------------------
// Record the Suggested Dose value
function record_values(INRstarV5, w_outfile )
{  
   var w_row;

   WaitSeconds(2,"Recording Values"); 
   
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
   var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
   var panelPTIH = panelPTW.Panel("PatientTreatmentHistory").Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
   
    var wpnl_treat = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapper");
    if (wpnl_treat.Exists ==true)
    {
          Log.Message ("Using Short Table");
          var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper");
   }
   else
   {   
            var wpnl_treat2 = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapperOverSix");
            if (wpnl_treat2.Exists ==true)
            {      
                  Log.Message ("Using Long Table");
                  var panelVPHTW = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix");
            }
            else
                      Log.Error ("Not found a Table !!");

    }      
    WaitSeconds(2,"Recording values");

    var wt_treatments=panelVPHTW .Table("PatientTreatmentHistoryTable");   
    w_row = wt_treatments.RowCount - 1;

   // Details
   var w_date = wt_treatments.Cell(w_row,0).innerText;    // (row, column (0 indexed))
   Sys.HighlightObject(wt_treatments.Cell(w_row,0),1);
   var w_inr = wt_treatments.Cell(w_row,1).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,1),1);
   var w_dose = wt_treatments.Cell(w_row,2).innerText;    
   Sys.HighlightObject(wt_treatments.Cell(w_row,2),1);
   var w_sugg_dose = wt_treatments.Cell(w_row,3).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,3),1);
   var w_omits = wt_treatments.Cell(w_row,4).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,4),1);
   var w_review = wt_treatments.Cell(w_row,5).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,5),1);
   var w_sugg_review = wt_treatments.Cell(w_row,6).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,6),1);
   var w_nexttestdate = wt_treatments.Cell(w_row,7).Panel("MoveNTDCalendarContainer").Textbox("ChangeNextTestDate").Text;
   Sys.HighlightObject(wt_treatments.Cell(w_row,7),1);
   //var w_target_inr = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer").Panel("PatientBanner").Panel(1).Panel(1).Label("TargetINR_DetachedLabel").innerText;
   
   var panelPBC = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer");
   var panelp4 = panelPBC.Panel("PatientBanner").Panel(1).Panel(4);
   
   var w_pname = panelPBC.Panel("patientZone1").Panel(0).Label("Name").innerText;
  
   Sys.HighlightObject(panelp4.Label("TTR12Month_DetachedLabel"),1);
  var w_ttr = panelp4.Label("TTR12Month_DetachedLabel").contentText;
   
   var w_mess = w_pname
   + "," + w_date 
   +"," + w_inr 
   + "," + w_dose
   + "," + w_sugg_dose 
   + "," + w_omits 
   + "," + w_review
   + "," + w_sugg_review
   + "," + w_nexttestdate
   + "," + w_ttr ;
//   Log.Message(w_mess);
   
   // Write the record to the file
   aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n", aqFile.ctANSI);
}
//------------------------------------------------------------------------
// Record the Suggested Dose value
function record_values_2(INRstarV5, w_outfile)
{  
   var w_row;

   WaitSeconds(1,"Recording values");
   
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
   var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
   var panelPTIH = panelPTW.Panel("PatientTreatmentHistory").Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
//   var panelPITH = panelPTW.Panel("PatientTreatmentHistory").Panel("PatientTreatmentINRHistory");
   
    var wpnl_treat = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapper");
    if (wpnl_treat.Exists ==true)
          var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable");
    var wpnl_treat2 = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapperOverSix");
    if (wpnl_treat2.Exists ==true)
          var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Table("PatientTreatmentHistoryTable");
          
//   if (wt_treatments.Rowcount > 3)
      w_row = wt_treatments.RowCount - 2;
//   w_row = wt_treatments.Rowcount;



   // Details - line 1
   var w_target_inr = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer").Panel("PatientBanner").Panel(1).Panel(1).Label("TargetINR_DetachedLabel").innerText;
   var w_date = wt_treatments.Cell(w_row,0).innerText;    // (row, column (0 indexed))
   Sys.HighlightObject(wt_treatments.Cell(w_row,0),1);
   var w_inr = wt_treatments.Cell(w_row,1).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,1),1);
   var w_dose = wt_treatments.Cell(w_row,2).innerText;    
   Sys.HighlightObject(wt_treatments.Cell(w_row,2),1);
   var w_sugg_dose = wt_treatments.Cell(w_row,3).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,3),1);
   var w_review = wt_treatments.Cell(w_row,5).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,5),1);
   var w_sugg_review = wt_treatments.Cell(w_row,6).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,6),1);
   var w_ntd = wt_treatments.Cell(w_row,7).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,7),1);

      // Details - line 2
   w_row++;   
   var w_date2 = wt_treatments.Cell(w_row,0).innerText;    // (row, column (0 indexed))
   Sys.HighlightObject(wt_treatments.Cell(w_row,0),1);
   var w_inr2 = wt_treatments.Cell(w_row,1).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,1),1);
   var w_dose2 = wt_treatments.Cell(w_row,2).innerText;    
   Sys.HighlightObject(wt_treatments.Cell(w_row,2),1);
   var w_sugg_dose2 = wt_treatments.Cell(w_row,3).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,3),1);
   var w_review2 = wt_treatments.Cell(w_row,5).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,5),1);
   var w_sugg_review2 = wt_treatments.Cell(w_row,6).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,6),1);
   var w_ntd2 = wt_treatments.Cell(w_row,7).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,7),1);
   
   var w_mess = w_target_inr
    +"," + w_date
    +"," + w_inr 
    +"," + w_dose 
    +"," + w_sugg_dose 
    +"," + w_review 
    + ","+ w_sugg_review
    +"," + w_ntd
    +"," + w_date2
    +"," + w_inr2 
    +"," + w_dose2 
    +"," + w_sugg_dose2  
    +"," + w_review2
    +"," + w_sugg_review2
    +"," + w_ntd2;
   
//   Log.Message(w_mess);
   
   // Write the record to the file
   aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n", aqFile.ctANSI);
}
//------------------------------------------------------------------------
// Record the Suggested Dose value
function record_values_warnings(INRstarV5, w_outfile )
{  
   var w_row;

   WaitSeconds(2,"Recording Values"); 
   
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
   var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
   
   var panelPTIH = panelPTW.Panel("PatientTreatmentHistory").Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
   
   // Pending Treatment
   var panelPPTD = panelPTW.Panel("PatientPendingTreatment").Panel("PatientPendingTreatmentDetails");
   
   // Warnings
   var panelDEW = panelPTW.Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo").Panel("PendingTreatmentWarnings").Panel("DosingEngineWarnings");
   
    WaitSeconds(2,"Recording values");

    var wt_treatments=panelPPTD.Table("PendingTreatmentTable");   
    w_row = wt_treatments.RowCount - 1;

   // Details
   var w_date = wt_treatments.Cell(w_row,0).innerText;    // (row, column (0 indexed))
   Sys.HighlightObject(wt_treatments.Cell(w_row,0),1);
   var w_inr = wt_treatments.Cell(w_row,1).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,1),1);
   var w_dose = wt_treatments.Cell(w_row,2).innerText;    
   Sys.HighlightObject(wt_treatments.Cell(w_row,2),1);
   var w_sugg_dose = wt_treatments.Cell(w_row,3).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,3),1);
   var w_review = wt_treatments.Cell(w_row,5).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,5),1);
   var w_sugg_review = wt_treatments.Cell(w_row,6).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,6),1);
   var w_nexttestdate = wt_treatments.Cell(w_row,7).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,7),1);
   //var w_target_inr = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer").Panel("PatientBanner").Panel(1).Panel(1).Label("TargetINR_DetachedLabel").innerText;
   var w_pname = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer").Panel("patientZone1").Panel(0).Label("Name").innerText;
      Sys.HighlightObject(panelDEW,1);

   var w_mess = w_pname
   + "," + w_date 
   +"," + w_inr 
   + "," + w_dose
   + "," + w_sugg_dose 
   + "," + w_review
   + "," + w_sugg_review
   + "," + w_nexttestdate;
   + ","+ panelDEW.TextNode(0).innerText;
   
   Log.Message(w_mess);
   
   // Write the record to the file
   aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n", aqFile.ctANSI);
}
//------------------------------------------------------------------------
// Record the Suggested Dose value
function record_values_3(INRstarV5, w_outfile)
{  
   var w_row;

   WaitSeconds(2,"Recording values");
   
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
   var panelPTW = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper");
   var panelPTIH = panelPTW.Panel("PatientTreatmentHistory").Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
//   var panelPITH = panelPTW.Panel("PatientTreatmentHistory").Panel("PatientTreatmentINRHistory");
   
    var wpnl_treat = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapper");
    if (wpnl_treat.Exists ==true)
          var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable");
    var wpnl_treat2 = INRstarV5.NativeWebObject.Find("idStr", "ViewPatientHistoricalTreatmentsWrapperOverSix");
    if (wpnl_treat2.Exists ==true)
          var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Table("PatientTreatmentHistoryTable");
          
//   if (wt_treatments.Rowcount > 3)
      w_row = wt_treatments.RowCount - 3;

   // Details - line 1
   var w_target_inr = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer").Panel("PatientBanner").Panel(1).Panel(1).Label("TargetINR_DetachedLabel").innerText;
   var w_date = wt_treatments.Cell(w_row,0).innerText;    // (row, column (0 indexed))
   Sys.HighlightObject(wt_treatments.Cell(w_row,0),1);
   var w_inr = wt_treatments.Cell(w_row,1).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,1),1);
   var w_dose = wt_treatments.Cell(w_row,2).innerText;    
   Sys.HighlightObject(wt_treatments.Cell(w_row,2),1);
   var w_sugg_dose = wt_treatments.Cell(w_row,3).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,3),1);
   var w_review = wt_treatments.Cell(w_row,5).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,5),1);
   var w_sugg_review = wt_treatments.Cell(w_row,6).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,6),1);
   var w_ntd = wt_treatments.Cell(w_row,7).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,7),1);

      // Details - line 2
   w_row++;   
   var w_date2 = wt_treatments.Cell(w_row,0).innerText;    // (row, column (0 indexed))
   Sys.HighlightObject(wt_treatments.Cell(w_row,0),1);
   var w_inr2 = wt_treatments.Cell(w_row,1).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,1),1);
   var w_dose2 = wt_treatments.Cell(w_row,2).innerText;    
   Sys.HighlightObject(wt_treatments.Cell(w_row,2),1);
   var w_sugg_dose2 = wt_treatments.Cell(w_row,3).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,3),1);
   var w_review2 = wt_treatments.Cell(w_row,5).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,5),1);
   var w_sugg_review2 = wt_treatments.Cell(w_row,6).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,6),1);
   var w_ntd2 = wt_treatments.Cell(w_row,7).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,7),1);
   
      // Details - line 3
   w_row++;   
   var w_date3 = wt_treatments.Cell(w_row,0).innerText;    // (row, column (0 indexed))
   Sys.HighlightObject(wt_treatments.Cell(w_row,0),1);
   var w_inr3 = wt_treatments.Cell(w_row,1).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,1),1);
   var w_dose3 = wt_treatments.Cell(w_row,2).innerText;    
   Sys.HighlightObject(wt_treatments.Cell(w_row,2),1);
   var w_sugg_dose3 = wt_treatments.Cell(w_row,3).innerText;   
   Sys.HighlightObject(wt_treatments.Cell(w_row,3),1);
   var w_review3 = wt_treatments.Cell(w_row,5).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,5),1);
   var w_sugg_review3 = wt_treatments.Cell(w_row,6).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,6),1);
   var w_ntd3 = wt_treatments.Cell(w_row,7).innerText;
   Sys.HighlightObject(wt_treatments.Cell(w_row,7),1);

   var w_mess = w_target_inr
    +"," + w_date
    +"," + w_inr 
    +"," + w_dose 
    +"," + w_sugg_dose 
    +"," + w_review 
    + ","+ w_sugg_review
    +"," + w_ntd
    +"," + w_date2
    +"," + w_inr2 
    +"," + w_dose2 
    +"," + w_sugg_dose2  
    +"," + w_review2
    +"," + w_sugg_review2
    +"," + w_ntd2
    +"," + w_date3
    +"," + w_inr3 
    +"," + w_dose3 
    +"," + w_sugg_dose3  
    +"," + w_review3
    +"," + w_sugg_review3
    +"," + w_ntd3;
   
//   Log.Message(w_mess);
   
   // Write the record to the file
   aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n", aqFile.ctANSI);
}
//------------------------------------------------------------------------
// Record the New Dose value
function record_new_values(INRstarV5, w_current_INR, w_outfile)
{  
   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTab").Panel("PatientTabContent");
   var panelPTC2 = panelPTC.Panel("PendingTreatmentContent");
   var wt_treatments = panelPTC2.Table("PendingTreatmentTable");

   // System Suggested Dose
   var w_sugg_dose = wt_treatments.Cell(0,2).innerText;    // (row, column (0 indexed))
   var w_sugg_review = wt_treatments.Cell(0,6).innerText;
   var w_mess = "INR," + w_current_INR + ",Dose," + w_sugg_dose + ",Review," + w_sugg_review;
   
   Log.Message(w_mess);
   
   // Write the record to the file
   aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n", aqFile.ctANSI);
}

//------------------------------------------------------------------------
// Set the system default values
function set_parameters(w_Run, wf_round, w_RoundVal, wf_NPSA, wf_algo)
{
    Log_On(3);    // A.White @ maplestead
    
    // Set general options --------------------------------------------------------------------
//    preset_Algorithm(w_Run);
//    WaitSeconds(2,"");
    preset_Dose_Rounding(wf_round, w_RoundVal);
    WaitSeconds(2,"");
    preset_Tablets(wf_NPSA);
    WaitSeconds(2,"");
    preset_Reduce_Type(wf_algo);
    //End of Set general options --------------------------------------------------------------

    Log_Off();
}
//-------------------------------------------------------------------------------------------------------------------------------------------------
// Set the INR stage Values
function set_INR_Stage_values(p1,p2,p3,p4,p5,p6)
{
    Log_On(3);    // Administrator at Location2
    
    var INRstarV5 = set_system();
        
    Goto_Admin_Settings();

    set_Stage_value(INRstarV5,  8, p1, "e6_b8f1_4a6a_9cfa_51752685c57bContent");
    set_Stage_value(INRstarV5,  9, p2, "cb6c3f0f_b4d7_4da9_800b_590f7fa2c48eContent");
    set_Stage_value(INRstarV5,  10, p3, "d00dbf34_fa8a_494f_9e0e_8594fb1ed304Content");
    set_Stage_value(INRstarV5,  11, p4, "fa52c6_9a11_4489_af38_fd2438ae06c0Content");
    set_Stage_value(INRstarV5,  12, p5, "bf1efb8_b761_4437_b1ad_c75a6afead95Content");
    set_Stage_value(INRstarV5,  13, p6, "dbc_71c9_4f0d_87ea_596fd059e65fContent");

    Log_Off();
}
//-------------------------------------------------------------------------------------------------------------------------------------------------
function set_Stage_value(INRstarV5, p_link, p_value, p_panel)
{    
    // Go to Algorithm Pane
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelLS = panelMCP.Panel(0).Panel("AdminContent").Panel("LocationSettings");
    panelLS.Link(p_link).Click();
    
    // Click Edit button
    panelEdit = panelLS.panel(p_panel);
    panelEdit.Panel(1).Button("Edit").Click();
    
    form = panelEdit.Form("EditSettingForm");
    form.Panel(0).Select("Value").ClickItem(p_value);
    form.Panel(1).SubmitButton("Save").Click();
}
//------------------------------------------------------------------------
function reset_database_induction_dates(p_date1, p_date2, p_stage)
{
  var  ssms;
  var  wnd_desked_gsk;
  var  genericPane;
  var  treeview;
  var  ezMdiContainer;
  var  MSPaneWindow;
  var  richEdit20W;
  var  dataGridView;
  var  wnd;
  
  // Open the SQL Server App
  Sys.Process("Explorer").Window("Shell_TrayWnd").Window("ReBarWindow32").Window("MSTaskSwWClass", "Running Applications").Window("ToolbarWindow32", "Running Applications").CheckItem("Microsoft SQL Server Management Studio", true, false);
  
  Log.Message("Open the Object Explorer");
  ssms = Sys.Process("Ssms");
  wnd_desked_gsk = ssms.Window("wndclass_desked_gsk", "Microsoft SQL Server Management Studio");
//  wnd_desked_gsk.Panel("MsoDockTop").Panel("Menubar").MenuItem("View").Click();
//  wnd_desked_gsk.Panel("MsoDockTop").Panel("Menubar").MenuItem("View").MenuItem("Object Explorer").Click();

  wnd_desked_gsk.Window("VsChannel", "", 4).Click(13, 38);

//  genericPane = wnd_desked_gsk.Window("VsAutoHide", "", 1).Window("GenericPane", "Object Explorer", 1).Window("GenericPane", "", 1).Window("WindowsForms10.Window.8.app.0.3553390", "", 1).Window("WindowsForms10.SysTreeView32.app.0.3553390", "", 1);
  genericPane = wnd_desked_gsk.Window("VsAutoHide", "", 1);
  
  Log.Message("Navigate to the Treatment Table"); 
  treeview = genericPane.Window("GenericPane").Window("WindowsForms10.Window.8.app.0.3553390").Window("WindowsForms10.SysTreeView32.app.0.3553390");
  treeview.ExpandItem("|dev-sandpit\\manualtesting (SQL Server 10.0.1600 - sa)|Databases");
  treeview.ExpandItem("|dev-sandpit\\manualtesting (SQL Server 10.0.1600 - sa)|Databases|ASPNETDB");
  treeview.ExpandItem("|dev-sandpit\\manualtesting (SQL Server 10.0.1600 - sa)|Databases|ASPNETDB|Tables");
  treeview.Drag(357, 260, 0, 128);
  
  Log.Message("Right click to Open for Edit");
  treeview.ClickItemR("|dev-sandpit\\manualtesting (SQL Server 10.0.1600 - sa)|Databases|ASPNETDB|Tables|dbo.Treatment");
  
  Log.Message("Open the SQL Editor");
  wnd_desked_gsk.Keys("^3");

  Log.Message("Change the SQL");  
  ezMdiContainer = wnd_desked_gsk.Window("MDIClient").Window("EzMdiContainer");
  MSPaneWindow = ezMdiContainer.Window("DockingView", "*").Window("GenericPane", "*").Window("MSPaneWindow", "{BADC3CB2-07EA-4E8D-BC19-35DF68AADD70}");
  richEdit20W = MSPaneWindow.Window("RichEdit20W");
  richEdit20W.Keys("^a");
  richEdit20W.Keys("^x");
  richEdit20W.wText = "SELECT Date, NextTest, Inserted, InductionStage FROM Treatment WHERE     (InductionStage = "+ p_stage + ")";
  Log.Message("Execute the SQL");
  wnd_desked_gsk.Keys("^R");

  Log.Message("Change the Date values");
  dataGridView = MSPaneWindow.Window("WindowsForms10.Window.8.app.0.3553390", "Query Result Pane").Window("WindowsForms10.Window.8.app.0.3553390", "DataGridView");
  wnd = dataGridView.Window("WindowsForms10.Window.8.app.0.3553390").Window("WindowsForms10.EDIT.app.0.3553390", "3ec041de-b468-4a89-a7ec-04948d8604a5");
  dataGridView.Click(19, 8);
  wndWindowsForms10tooltipsclass32app03553390.Click(8, 4);
  wnd.wText = p_date1;
  wnd.Keys("[Tab]");
  wnd.wText = p_date1;
  wnd.Keys("[Tab]");
  wnd.wText = p_date1;
  wnd.Keys("[Down]");


  // Close 
  dataGridView.Click(646, 53);
  ezMdiContainer.Click(720, 7);
  genericPane.Click(356, 8);
  
}
//-------------------------------------------------------------------------------------------------------------------------------------------------
 function quick_pt_historical(p_day, p_month, p_year, p_target, p_inr, p_dose, p_omits, p_review, p_comment)
{
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelTPW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("TreatmentPlanWrapper");
    var panelPTW = panelTPW.Panel("PatientTreatmentWrapper");
    var panelPTNHW = panelPTW.Panel("PatientPendingTreatment").Panel("PatientTreatmentNewHistoricalWrapper");

    var form = panelPTNHW.Form("NewHistoricalTreatmentForm");

    form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
     w_datepicker = INRstarV5.Panel("ui_datepicker_div");
     w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(p_year));
     w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(p_month));
     select_day(p_day, w_datepicker);

    form.Table("AddHistoricalTreatmentTable").Cell(1, 1).Select("INR").ClickItem(p_inr);
    form.Table("AddHistoricalTreatmentTable").Cell(1, 2).Select("Dose").ClickItem(p_dose);
    form.Table("AddHistoricalTreatmentTable").Cell(1, 3).Select("Omits").ClickItem(p_omits + " Days");
    form.Table("AddHistoricalTreatmentTable").Cell(1, 4).Select("Review").ClickItem(p_review + " Days");
    form.Table("AddHistoricalTreatmentTable").Cell(1, 5).Select("TargetINR").ClickItem(aqConvert.FloatToStr(p_target));
    form.Panel("HistoricalExtras").Panel("HistoricalComments").Textarea("Comments").innerText = p_comment;
        
    form.Panel(0).SubmitButton("Save").Click();

    // Click confirm panel
    process_confirm_historical_treatment(INRstarV5);
 
}
//-------------------------------------------------------------------------------------------------------------------------------------------------
function quick_pt_historical_clever(p_day, p_month, p_year, p_dose, p_review, p_comment)
{
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelTPW = panelMCP.Panel("PatientRecord").Panel("PatientTabContent").Panel("TreatmentPlanWrapper");
    var panelPTW = panelTPW.Panel("PatientTreatmentWrapper");
//    var panelPTW = panelMCP.Panel("PatientTabContent").Panel("PatientTreatmentWrapper");
    var panelPTNHW = panelPTW.Panel("PatientPendingTreatment").Panel("PatientTreatmentNewHistoricalWrapper");

    var form = panelPTNHW.Form("NewHistoricalTreatmentForm");

    form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
           w_datepicker = INRstarV5.Panel("ui_datepicker_div");
           w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(p_year));
           w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(p_month));
           select_day(p_day, w_datepicker);

    var w_targetINR = form.Table("AddHistoricalTreatmentTable").Cell(1, 5).Select("TargetINR").Value;

    form.Table("AddHistoricalTreatmentTable").Cell(1, 1).Select("INR").ClickItem(w_targetINR);
    form.Table("AddHistoricalTreatmentTable").Cell(1, 2).Select("Dose").ClickItem(FloatToString(p_dose));
    form.Table("AddHistoricalTreatmentTable").Cell(1, 3).Select("Omits").ClickItem("0 Days");
    form.Table("AddHistoricalTreatmentTable").Cell(1, 4).Select("Review").ClickItem(p_review);
    form.Textarea("Comments").innerText = p_comment;
        
    form.Panel(0).SubmitButton("Save").Click();

    // Click confirm panel
    process_confirm_historical_treatment(INRstarV5);
 
}
 //---------------------------------------------------------------------- Set Up Patient - Additional Historic Treatments
function set_up_patient(INRstarV5, w_stage, w_current_INR, w_adjust_value, w_outfile)
{
          Log.Message("***************** About to add additional historical treatments for Stage "+w_stage);
          
          if (w_stage == 6)
          {
                    add_hist(INRstarV5, w_current_INR, 217 + w_adjust_value, 7, w_outfile);
                    add_hist(INRstarV5, w_current_INR, 210 + w_adjust_value, 14, w_outfile);
                    add_hist(INRstarV5, w_current_INR, 196 + w_adjust_value, 28, w_outfile);
                    add_hist(INRstarV5, w_current_INR, 168 + w_adjust_value, 42, w_outfile);
                    add_hist(INRstarV5, w_current_INR, 126 + w_adjust_value, 56, w_outfile);
//                    add_hist(INRstarV5, w_current_INR, 70 + w_adjust_value, 70, w_outfile);
          }          
          if (w_stage == 5)
          {
                    add_hist(INRstarV5, w_current_INR, 147 + w_adjust_value, 7, w_outfile);
                    add_hist(INRstarV5, w_current_INR, 140 + w_adjust_value, 14, w_outfile);
                    add_hist(INRstarV5, w_current_INR, 126 + w_adjust_value, 28, w_outfile);
                    add_hist(INRstarV5, w_current_INR, 98 + w_adjust_value, 42, w_outfile);
//                    add_hist(INRstarV5, w_current_INR, 56 + w_adjust_value, 56, w_outfile);
          }          
          if (w_stage == 4)
          {
                    add_hist(INRstarV5, w_current_INR, 91 + w_adjust_value, 7, w_outfile);
                    add_hist(INRstarV5, w_current_INR, 84 + w_adjust_value, 14, w_outfile);
                    add_hist(INRstarV5, w_current_INR, 70 + w_adjust_value, 28, w_outfile);
//                    add_hist(INRstarV5, w_current_INR, 42 + w_adjust_value, 42, w_outfile);
          }          
          if (w_stage == 3)
          {
                    add_hist(INRstarV5, w_current_INR, 49 + w_adjust_value, 7, w_outfile);
                    add_hist(INRstarV5, w_current_INR, 42 + w_adjust_value, 14, w_outfile);
//                    add_hist(INRstarV5, w_current_INR, 28 + w_adjust_value, 28, w_outfile);
          }          
          if (w_stage == 2)
          {
                    add_hist(INRstarV5, w_current_INR, 21 + w_adjust_value, 7);
//                    add_hist(INRstarV5, w_current_INR, 14 + w_adjust_value, 14);
          }    
                    Log.Message("****************** End of adding additional historical treatments for Stage "+w_stage);
       
}
//---------------------------------------------------------------------- Add History
 function add_hist(INRstarV5, w_INR, w_review, w_days, w_outfile)
{
            var w_treat_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), (w_review * -1))); 
            var w_day = aqString.SubString(w_treat_date,0,2);
            var w_mth = aqConvert.StrToInt(aqString.SubString(w_treat_date,3,2));
            var w_yr = aqString.SubString(w_treat_date,6,4);

            Goto_Add_Historical();
            quick_pt_historical(w_day, w_mth, w_yr, "2.5", w_INR, "4.7", "0 Days", w_days, "");
            
            WaitSeconds(2,"Waiting after adding Historical");
           
              // Record the values produced
             record_values(INRstarV5, w_outfile);
         
 
 }
//------------------------------------------------------------------------
function Get_Summary_TTR(INRstarV5)
{
   Goto_Patient_Summary();



   var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
   var panelMPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
   var panelPSCT = panelMPTC.Panel("PatientSummaryWrapper").Panel("PatientSummaryCurrentTreatmentWrapper").Panel("PatientSummaryCurrentTreatment");
   //return panelPSCT.Panel(5).Label("CurrentTreatment_TimeInRange_DetachedLabel").innerText; 
   // PT - Changed to try and get old TTR script working with new summary screen - 2 TTR values on it
   return panelPSCT.Panel(5).Label("CurrentTreatment_TTR12Months_DetachedLabel").innerText;
}
 //---------------------------------------------------------------------- Get Patient Name
 function get_patient_name()
{
          var INRstarV5 = INRstar_base();
          // Main page definitions
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          // Find Patient Name
          var panelPBC = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer");
          var w_pname = panelPBC.Panel("patientZone1").Panel(0).Label("Name").ContentText;
          
          return w_pname;
}
 //---------------------------------------------------------------------- Get Patient NHS No
function get_patient_nhs(INRstarV5)
{
           var INRstarV5 = INRstar_base();
          // Main page definitions
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          // Find Patient NHS No
          var panelPBC = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer");
          var w_nhs_no = panelPBC.Panel("patientZone1").Panel(3).Panel(0).Label("NHSNumber_DetachedLabel").innerText;
          
          return w_nhs_no;
}
//---------------------------------------------------------------------- Get Patient First Name
function get_patient_first_name()
{
           var INRstarV5 = INRstar_base();
           Goto_Patient_Demographics();
           var panelPDW =  INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientDetailsWrapper");
           var w_first_name = panelPDW.Panel("PatientDetails").Panel(4).Label("FirstName_DetachedLabel").contentText;
          
          return w_first_name;
}          
//---------------------------------------------------------------------- Get Patient Surname
function get_patient_surname()
{
           var INRstarV5 = INRstar_base();
           Goto_Patient_Demographics();
           var panelPDW =  INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent").Panel("PatientDetailsWrapper");
           var w_surname = panelPDW.Panel("PatientDetails").Panel(3).Label("Surname_DetachedLabel").contentText;
          
          return w_surname;          
}

//============================================= test function
function quick_test_change_diagnosis()
{
          var INRstarV5 = INRstar_base(); 
          var w_treat_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), -5)); 
          // Create new plan
          Goto_Patient_TreatmentPlan_Change_Diagnosis();
          w_plan_date = aqConvert.StrToDate(aqDateTime.AddDays(w_treat_date, 2)); 
          quick_change_diagnosis(INRstarV5, w_plan_date);
}
//-------------------------------------------------------------------------------------------------------------------------------------------------
function print_diary(INRstarV5)
{
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelTPC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent")
    var panelPPT = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment");
    var panelPB = panelPPT.Panel("TreatmentButtonsContainer").Fieldset("PrintButtons");
    
    panelPB.Button("PrintLatestDosingDiary").Click();
    WaitSeconds(3,"Printing Diary");
}
//-------------------------------------------------------------------------------------------------------------------------------------------------
function add_poct_batch()
{
  Log.Message ("Adding NPT Batch details");  
  
  Goto_Admin_NPT_Batch();
    
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelAC = panelMCP.Panel("AdminContent");
  
  // click Add NPT button
  panelAC.Panel(0).Panel(1).Button("AddPoCTBatch").Click();
  
  formNBD = panelAC.Form("NewPoCTBatchDetailsForm");
  formNBD.Panel(0).Textbox("BatchNumber").Text = "PoCT" + aqConvert.IntToStr(Math.floor(Math.random()*100));
  // Set Date
  formNBD.Panel(1).Image("calendar_png").Click(12, 10);
  panelCal = INRstarV5.Panel("ui_datepicker_div");
  panelCal.Panel(0).Panel(0).Select(0).ClickItem("Dec");
  panelCal.Panel(0).Panel(0).Select(1).ClickItem("2014");
  panelCal.Table(0).Cell(2, 3).Link(0).Click();
  
  // Save details
  formNBD.Panel(3).SubmitButton("SubmitNewPoCTBatchDetails").Click();
}
//-------------------------------------------------------------------------------------------------------------------------------------------------
function add_NEQAS()
{
  Log.Message ("Adding NEQAS Result details");  
  
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelAC = panelMCP.Panel("AdminContent");
  
  // click Add NEQAS button
  panelAC.Panel("EQCWrapper").Panel(0).Button("AddNEQAS").Click();
  
  formERF = panelAC.Form("EditEQCResultForm");
  formERF.Panel(2).Textbox("Reference").Text = "NEQAS" + aqConvert.IntToStr(Math.floor(Math.random()*100));
  formERF.Panel(3).Select("NPTBatchNumber").ClickItem(1);
  formERF.Panel(4).Select("InternalINR").ClickItem("2.3");
  // formERF.Panel(5).Select("ExternalINR").ClickItem("2.6");
 
  // Save details
  formERF.Panel(6).SubmitButton("AddEQCResult").Click();
  
}
//-------------------------------------------------------------------------------
// Add Clinician 
function add_clinician()
{
  Log.Message ("Setting Clinician");  
    
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelAC = panelMCP.Panel("AdminContent");
  
  // Click Add Clinician Button
  panelAC.Panel(0).Panel(0).Button("AddDoctorLink").Click();
  
  var formAC = panelAC.Fieldset(0).Form("AddClinicianForm");
  
  // Add name
  formAC.Panel(0).Textbox("Name").Text = "Dr Jones" + aqConvert.IntToStr(Math.floor(Math.random()*100));
  
  // Save
  formAC.Panel(2).SubmitButton("Save").Click();
}
//-------------------------------------------------------------------------------
// Add Self Test details
function add_self_test(INRstarV5)
{
  Log.Message ("Adding Self Test");  
    
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPMTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent");
  var formPMF = panelPMTC.Panel("PatientTabContent").Form("PatientManagementForm")
  var panelPG = formPMF.Panel("PatientManagementWrapper").Panel("PatientGroups");
  
  // Check Self Test box
  panelPG.Panel(3).Checkbox("SelfTester").ClickChecked(true);
  
  process_confirm_sub(INRstarV5,"Self Tester Training Confirmation");
  
  panelPG.Panel("PatientsPoCTBatch").Panel(0).Textbox("BatchNumber").Text = "ST_" + aqConvert.IntToStr(Math.floor(Math.random()*100));
  panelPG.Panel("PatientsPoCTBatch").Panel(1).Image("calendar_png").Click();
  panelCal = INRstarV5.Panel("ui_datepicker_div");
  panelCal.Panel(0).Panel(0).Select(0).ClickItem("Dec");
  panelCal.Panel(0).Panel(0).Select(1).ClickItem("2014");
  panelCal.Table(0).Cell(2, 3).Link(0).Click();
     
  // Save
  formPMF.Panel(0).SubmitButton("UpdatePatientManagementDetails").Click();
}
//-------------------------------------------------------------------------------
// Select Overdue Patient
function select_overdue_patient()
{
  Log.Message ("Selecting Overdue Patient");  
    
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
  var tablePORT = panelUCR.panel("OverduePatients").table("PatientOverdueReportTable"); 
  
  // Select top patient
 tablePORT.Cell(1,0).Link("PatientLink").Click();
}
//-------------------------------------------------------------------------------
// Select Overdue NOAC Patient
function select_overdue_noac_patient()
{
  Log.Message ("Selecting Overdue Non-Warfarin Patient");  
    
  var INRstarV5 = INRstar_base();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelUCR = panelMCP.panel("UserTabContent"). panel("UserMessages").panel("UserClinicalReports");
  var tablePORRT = panelUCR.panel("OverdueReviewPatients").table("PatientOverdueReviewReportTable"); 
  
  // Select top patient
 tablePORRT.Cell(1,0).Link("PatientLink").Click();
}
//--------------------------------------------------------------------------------
// Report - Patients with no written information
function Run_report_no_written_info()
{
  Log.Message ("Running Report - Patients with no written information");  

  var INRstarV5 = set_system();
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panelMCP.Panel("ReportsViewPage").Panel(2).Link(2).Click();

}
//--------------------------------------------------------------------------------
// Check Patient audit pagination
function check_pagination()
{
          Log.Message ("Check Patient Audit Pagination");  
  
          var INRstarV5 = INRstar_base();
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          var panelPATW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientAuditTrailWrapper");
          var w_showing = panelPATW.Panel(0).TextNode(0).innerText;
          
          // find page count (text is zero indexed)
          var w_length = aqString.GetLength(w_showing) - 1;
          var w_start_of_pagecount = aqString.Find(w_showing," of ") + 4;
          var w_length_of_pagecount = w_length - w_start_of_pagecount;
          var w_last_page_count = aqConvert.StrToInt(aqString.SubString(w_showing, w_start_of_pagecount, w_length_of_pagecount));
         
          var w_last_date = panelPATW.Table("AuditTrailTable").Cell(1, 0).innerText;
          
          var w_prev_row_date =  aqConvert.StrToDateTime(panelPATW.Table("AuditTrailTable").Cell(1, 0).innerText);
         
          // First Page
          for (w_trow = 2; w_trow < panelPATW.Table("AuditTrailTable").RowCount; w_trow++)
          {
                    Sys.HighlightObject(panelPATW.Table("AuditTrailTable").Cell(w_trow, 0),3);
                              
                    var w_row_date = aqConvert.StrToDateTime(panelPATW.Table("AuditTrailTable").Cell(w_trow, 0).innerText);
                    if (aqDateTime.Compare(w_row_date,w_prev_row_date) == -1)
                    {
                              w_prev_row_date = w_row_date;
                     }
                    else
                             Log.Warning("Date error !!!")
          }
          // Next Page
         panelPATW.Panel(0).TextNode(1).Link(0).Click(); 

         var panelPATW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientAuditTrailWrapper").Panel("PatientAuditTrailWrapper");
 
         for (i = 0; i < w_last_page_count; i++)
         {
                    for (w_trow = 1; w_trow < panelPATW.Table("AuditTrailTable").RowCount; w_trow++)
                    {
                              Sys.HighlightObject(panelPATW.Table("AuditTrailTable").Cell(w_trow, 0),3);
                              
                              var w_row_date = aqConvert.StrToDateTime(panelPATW.Table("AuditTrailTable").Cell(w_trow, 0).innerText);
                              if (aqDateTime.Compare(w_row_date,w_prev_row_date) == -1)
                              {
                                        w_prev_row_date = w_row_date;
                               }
                              else
                                       Log.Warning("Date error !!!")
                    }
                    // Next Page
                    panelPATW.Panel(0).Link(2).Click(); 
//.Panel("PatientMainTabContent").Panel("PatientAuditTrailWrapper").Panel("PatientAuditTrailWrapper").Panel(0).Link(2)
         }
}
//--------------------------------------------------------------------------------
// Check system audit pagination
function check_system_audit_pagination()
{
          Log.Message ("Check System Audit Pagination");  
  
          //Find the 'Showing page value at bottom of page
          var INRstarV5 = set_system();
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          var panelAC =  panelMCP.Panel("AdminContent");
          var panelLATW = panelAC.Panel("LocationAuditTrailWrapper");
          var w_showing = panelLATW.Panel(1).TextNode(0).innerText;
          
          // find page count (text is zero indexed)
          var w_length = aqString.GetLength(w_showing) - 1;
          var w_start_of_pagecount = aqString.Find(w_showing," of ") + 4;
          var w_length_of_pagecount = w_length - w_start_of_pagecount;
          var w_last_page_count = aqConvert.StrToInt(aqString.SubString(w_showing, w_start_of_pagecount, w_length_of_pagecount));
         
          var w_last_date = panelLATW.Table("AuditTrailTable").Cell(1, 0).innerText;
          
          var w_prev_row_date =  aqConvert.StrToDateTime(panelLATW.Table("AuditTrailTable").Cell(1, 0).innerText);
         
          // First Page
          for (w_trow = 2; w_trow < panelLATW.Table("AuditTrailTable").RowCount; w_trow++)
          {
                    Sys.HighlightObject(panelLATW.Table("AuditTrailTable").Cell(w_trow, 0),3);
                              
                    var w_row_date = aqConvert.StrToDateTime(panelLATW.Table("AuditTrailTable").Cell(w_trow, 0).innerText);
                    if (aqDateTime.Compare(w_row_date,w_prev_row_date) == -1)
                    {
                              w_prev_row_date = w_row_date;
                     }
                    else
                             Log.Warning("Date error !!!")
          }
          // Next Page
         panelLATW.Panel(0).TextNode(1).Link(0).Click(); 

         //var panelLATW = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientAuditTrailWrapper").Panel("PatientAuditTrailWrapper");
         var panelLATW = panelAC.Panel("LocationAuditTrailWrapper").Panel("LocationAuditTrailWrapper");
         
         
         
         for (i = 0; i < w_last_page_count; i++)
         {
                    var panelLATW = panelAC.Panel("LocationAuditTrailWrapper").Panel("LocationAuditTrailWrapper");
                    for (w_trow = 1; w_trow < panelLATW.Table("AuditTrailTable").RowCount; w_trow++)
                    {
                        Log.Message(panelLATW.Table("AuditTrailTable").RowCount);

                              Sys.HighlightObject(panelLATW.Table("AuditTrailTable").Cell(w_trow, 0),3);
                              
                              var w_row_date = aqConvert.StrToDateTime(panelLATW.Table("AuditTrailTable").Cell(w_trow, 0).innerText);
                              if (aqDateTime.Compare(w_row_date,w_prev_row_date) == -1)
                              {
                                        w_prev_row_date = w_row_date;
                               }
                              else
                                       Log.Warning("Date error !!!")
                    }
                    // Next Page
                    panelLATW.Panel(0).Link(2).Click(); 
//.Panel("PatientMainTabContent").Panel("PatientAuditTrailWrapper").Panel("PatientAuditTrailWrapper").Panel(0).Link(2)
         }
}











//----------------------------------------------------------------------------------------------------
// Get Next Test Date
function get_ntd(INRstarV5)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
  var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
  
  if (panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Exists == true)
            var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Table("PatientTreatmentHistoryTable")
  else
            var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable")
  
  var w_row = wt_treatments.Rowcount - 1;
  var w_ntd = convert_date(aqConvert.StrToDate(wt_treatments.Cell(w_row,7).innerText));

  return w_ntd;
}
//----------------------------------------------------------------------------------------------------
// Get Treatment Date
function get_treatment_date()
{
  var INRstarV5 = set_system();
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
  var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
  
  if (panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Exists == true)
            var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Table("PatientTreatmentHistoryTable")
  else
            var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable")
  
  var w_row = wt_treatments.Rowcount - 1;
  var w_td = convert_date(aqConvert.StrToDate(wt_treatments.Cell(w_row,0).innerText));

  return w_td;
}
//----------------------------------------------------------------------------------------------------
// Get Treatment Date
function get_treatment_date_regression()
{
  var INRstarV5 = set_system();
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
  var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
  var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable")
  
  var w_row = wt_treatments.Rowcount - 1;
  var w_td = (aqConvert.StrToDate(wt_treatments.Cell(w_row,0).innerText));

  return w_td;
}
//----------------------------------------------------------------------------------------------------
// Get Treatment INR
function get_treatment_inr_regression()
{
  var INRstarV5 = set_system();
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
  var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
  
  var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable")
  
  var w_row = wt_treatments.Rowcount - 1;
  var w_tinr = wt_treatments.Cell(w_row,1).innerText;

  return w_tinr;
}
//----------------------------------------------------------------------------------------------------
// Get Treatment INR
function get_treatment_inr()
{
  var INRstarV5 = set_system();
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
  var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
  
  if (panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Exists == true)
            var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Table("PatientTreatmentHistoryTable")
  else
            var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable")
  
  var w_row = wt_treatments.Rowcount - 1;
  var w_tinr = wt_treatments.Cell(w_row,1).innerText;

  return w_tinr;
}
//----------------------------------------------------------------------------------------------------
// Get Treatment dose
function get_treatment_dose_regression()
{
  var INRstarV5 = set_system();
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
  var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
  
  var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable")
  
  var w_row = wt_treatments.Rowcount - 1;
  var w_tdose = wt_treatments.Cell(w_row,2).innerText;

  return w_tdose;
}
//----------------------------------------------------------------------------------------------------
// Get Treatment dose
function get_treatment_dose()
{
  var INRstarV5 = set_system();
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
  var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
  
  if (panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Exists == true)
            var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Table("PatientTreatmentHistoryTable")
  else
            var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable")
  
  var w_row = wt_treatments.Rowcount - 1;
  var w_tdose = wt_treatments.Cell(w_row,2).innerText;

  return w_tdose;
}
//----------------------------------------------------------------------------------------------------
// Get Treatment dose
function get_treatment_review_regression()
{
  var INRstarV5 = set_system();
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
  var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
  
  var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable")
  
  var w_row = wt_treatments.Rowcount - 1;
  var w_treview = wt_treatments.Cell(w_row,5).innerText;

  return w_treview
}
//----------------------------------------------------------------------------------------------------
// Get Treatment dose
function get_treatment_review(INRstarV5)
{
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientMainTabContent").Panel("PatientTabContent");
  var panelPTH = panelPTC.Panel("TreatmentPlanWrapper").Panel("PatientTreatmentWrapper").Panel("PatientTreatmentHistory");
  var panelPTIH = panelPTH.Panel("TreatmentsInPlanWrapper").Panel("PatientTreatmentINRHistory");
  
  if (panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Exists == true)
            var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapperOverSix").Table("PatientTreatmentHistoryTable")
  else
            var wt_treatments = panelPTIH.Panel("ViewPatientHistoricalTreatmentsWrapper").Table("PatientTreatmentHistoryTable")
  
  var w_row = wt_treatments.Rowcount - 1;
  var w_treview = wt_treatments.Cell(w_row,5).innerText;

  return w_treview
}
//------------------------------------------------------------------------
function set_month(p_m)
{
  // Note - input month must be in numeric format !!
          
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
//  Log.Message("p_m: " + p_m + " = " + w_Month);
  
  return w_Month;
} 
//--------------------------------------------------------------------