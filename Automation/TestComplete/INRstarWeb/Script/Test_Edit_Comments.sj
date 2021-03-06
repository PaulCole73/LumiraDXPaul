//USEUNIT Navigation
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Popups
//USEUNIT Add_INR_Refer

function quick_start()
{
   Log_On(8); // 
   
   var INRstarV5 = set_system();  
   
   // View recent patients
   Goto_Recently_Viewed();
   // Select the last used
   preset_Fetch_Patient_Recent(INRstarV5);

   test_edit_comments(INRstarV5);

}
//-------------------------------------------------------------------------------
function test_edit_comments(INRstarV5)
{
    Goto_Patient_New_INR();
    add_inr_refer("2.5");

    // 1st - cancel Edit
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
    var panelPTI = panelPTC.Panel("PatientTreatmentWrapper").Panel("PatientPendingTreatment").Panel("PendingTreatmentInfo");
    panelPTI.Panel(0).Button("EditComments").Click();
    close_comments_window(INRstarV5)
    
    // 2nd - Add Comments
    panelPTI.Panel(0).Button("EditComments").Click();
    add_comments(INRstarV5, "This is a new comment.");
    
    WaitSeconds(1,"");
    
    // 3nd - Edit Comments
    panelPTI.Panel(0).Button("EditComments").Click();
    add_comments(INRstarV5, "This is an amended comment.");
    
    // Now test if a single Schedule has been proposed or we need to choose one
    wf_no_exact = INRstarV5.NativeWebObject.Find("idStr", "DoseScheduleWarnings_ValidationSummary");
    if(wf_no_exact.Exists)
    {
       // Click the top Use button
       Log.Message("Clicking 1st 'Use' button");
       panelPTC.Panel("PendingTreatmentContent").Panel("DosingScheduleContent").Panel("ScheduleGrid").Table("ScheduleSelectorTable").Cell(1, 2).Button("Use").Click();
       WaitSeconds(1,"");
    }
    else
       Log.Message("Exact Schedule found");

    // Accept Treatment
    panelPTI.Panel(0).Button("AcceptPendingTreatment").Click(); 

//    process_make_appointment_cancel(INRstarV5);
     
}

function close_comments_window(INRstarV5)
{
  // Find the 'Comments' Panel
  var wbx_App = INRstarV5.NativeWebObject.Find("innerText", "Edit Comments");
  if (wbx_App.Exists == false)
  {  
       Log.Warning("'Edit Comments' box not displayed");
  }
  else
  {
       Log.Message("'Edit Comments' box displayed");

       // Split the full name into parts delimited by '.'
       var w_delim = aqString.ListSeparator;
       aqString.ListSeparator = ".";
       
       var wp_Name = aqString.GetListItem(wbx_App.FullName, 3);   // 4th element, 0 indexed
       var wp_Panel = INRstarV5.Find("Name", wp_Name);
       if (wp_Panel.Exists == false)
       {
           Log.Warning("Panel not found " + wp_Panel);
       }
       else
       {
           var wp_Parent = INRstarV5.Find("Id", wp_Panel.Id);
           if (wp_Parent.Exists == false)
           {
                 Log.Warning("Parent not found " + wp_Panel.Id);
           }
           else
           {
//                 wp_Parent.Panel(1).Button(0).Click();
//                 wp_Parent.Panel(0).Button(0).Click();
                 wp_Parent.Panel(1).Panel(0).Button(0).Click();
                 Log.Message("Clicked P1B0");
           }
       }
  }      

}