//USEUNIT Common
//USEUNIT V5_Common

//===============================================================================
// Section for processing Pop-up routines
//===============================================================================
// Process Confirm window
function process_confirm_INR(INRstarV5)
{
  var INRstarV5 = INRstar_base();
  var w_hdg = "Please confirm that the following is correct";
  process_confirm_sub(INRstarV5, w_hdg);
} 
//-------------------------------------------------------------------------------
// Process Confirm window
function process_confirm_INR_Induction(INRstarV5)
{
  var w_hdg = "Please confirm that the following is correct";
  process_confirm_sub(INRstarV5, w_hdg);
} 
//-------------------------------------------------------------------------------
// Process Confirm window
function process_confirm_change_location(INRstarV5)
{
  var w_hdg = "Please confirm to continue";
  process_confirm_sub('',w_hdg);
} 
//-------------------------------------------------------------------------------
// Process Confirm window
function process_confirm_duplicate_patient(INRstarV5)
{
  process_confirm_button(INRstarV5);
} 
//-------------------------------------------------------------------------------
// Process Confirm button
function process_confirm_button()
{
   var INRstarV5 = INRstar_base();
    WaitSeconds(2,"Waiting");
    if (INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).Exists == true && INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).VisibleOnScreen == true)
        INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).Click();

} 
//------------------------------------------------
// Process Confirm button
function process_confirm_button_IQC()
{
  var INRstarV5 = INRstar_base();
  WaitSeconds(2,"Waiting");
  INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).Click();
} 
//-------------------------------------------------------------------------------
// Process Confirm button changing next test date
function process_confirm_button_date(INRstarV5)
{
    WaitSeconds(5,"Waiting");
    if (INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).Exists == true && INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).VisibleOnScreen == true)
        INRstarV5.Panel(2).Panel(1).Panel(0).Button(1).TextNode(0).Click();

} 
//-------------------------------------------------------------------------------
// Process Confirm Self Tester button
function process_confirm_self_tester(INRstarV5)
{
//    WaitSeconds(2,"Waiting for Confirm Self Tester");
    if (INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).Exists == true && INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).VisibleOnScreen == true)
        INRstarV5.Panel(2).Panel(1).Panel(0).Button(1).TextNode(0).Click();
  } 
//-------------------------------------------------------------------------------
// Click Confirm button
function process_confirm_sub(INRstarV5, w_hdg)
{
  // Find the Panel
  if(INRstarV5=='')
  {
  var INRstarV5 = INRstar_base();
  }
  
  WaitSeconds(2);
  
  var w_popup = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  Sys.HighlightObject(w_popup,5);

  if (w_popup.Exists == false || w_popup.VisibleOnScreen == false)
  {
    Log.Message("'" + w_hdg + "' box not displayed");
  }
  else
  {
     Log.Message("'" + w_hdg + "' box displayed");
     // Find the button
     var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
     if (wbt_Confirm.Exists == false || wbt_Confirm.Visible == false)
     {
        Log.Message("'" + w_hdg + "' Confirm button not found");
     }
     else
     {
        WaitSeconds(2);
        Log.Message("Clicking '" + w_hdg + "' Confirm button ");
        INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).Click();
     }
  }     
}
//-------------------------------------------------------------------------------
// Click OK button
function process_OK(INRstarV5, w_hdg)
{
  // Find the Panel
  var w_popup = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  if (w_popup.Exists == false || w_popup.VisibleOnScreen == false)
  {
         Log.Warning("'" + w_hdg + "' box not displayed");
  }
  else
  {
     Log.Message("'" + w_hdg + "' box displayed");
     // Find the button
     var wbt_OK = INRstarV5.NativeWebObject.Find("innerText", "OK");
     if (wbt_OK.Exists == false || wbt_OK.Visible == false)
     {
        Log.Warning("'" + w_hdg + "' OK button not found");
     }
     else
     {
        WaitSeconds(1);
        Log.Message("Clicking '" + w_hdg + "' OK button ");
        Aliases.iexplore1.pageInrstar.panelUiDialogUiWidgetUiWidgetCon.Panel(1).Panel(0).Button(0).Click();
    }
  }     
} 
 //-------------------------------------------------------------------------------
// Click a button on the pop-up
function process_button(INRstarV5, w_hdg, p_ans)
{
   // Find the Panel
  var w_popup = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  if (w_popup.Exists == false || w_popup.VisibleOnScreen == false)
  {
         Log.Message("'" + w_hdg + "' box not displayed");
  }
  else
  {
     // Find the button
     var wbt = INRstarV5.NativeWebObject.Find("innerText", p_ans, "BUTTON");
     if (wbt.Exists == false || wbt.Visible == false)
     {
        Log.Message("'" + w_hdg + "'" + p_ans + " button not found");
     }
     else
     {
        WaitSeconds(1);
        Sys.HighlightObject(wbt,3);
        wbt.Click();
    }
  }     
}
//-------------------------------------------------------------------------------
// Click Confirm button
function process_confirm_sub_ret(INRstarV5, w_hdg)
{
  // Find the Panel
  var w_ret = false;
  var w_popup = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  if (w_popup.Exists == false || w_popup.VisibleOnScreen == false)
  {
         Log.Warning("'" + w_hdg + "' box not displayed");
  }
  else
  {
     Log.Message("'" + w_hdg + "' box displayed");
     // Find the button
     var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
     if (wbt_Confirm.Exists == false|| wbt_Confirm.VisibleOnScreen == false)
     {
        Log.Warning("'" + w_hdg + "' Confirm button not found");
     }
     else
     {
        WaitSeconds(1);
        Log.Message("Clicking '" + w_hdg + "' Confirm button ");
        INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).Click();
 //       wbt_Confirm.Click();
        var w_ret = true;
    }
  }     
  return w_ret;
} 
//-------------------------------------------------------------------------------
// Process Cancel 'Cancel' of INR
function process_cancel_INR_cancel(INRstarV5)
{
  var INRstarV5 = set_system();
  var w_hdg = "Confirmation Required";
  
  // Find the 'Confirmation Required' Panel
  var wbx_ConfCancel = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  if (wbx_ConfCancel.Exists == false || w_popup.VisibleOnScreen == false)
  {  
     Log.Warning("'" + w_hdg + "' box not displayed");
  }
  else
  {
     Log.Message("'" + w_hdg + "' box displayed");
     // Find the button
     var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Cancel");

     if (wbt_Confirm.Exists == false)
     {
        Log.Warning("'" + w_hdg + "' Cancel button not found");
     }
     else
     {
        Log.Message("Clicking '" + w_hdg + "' Cancel button ") 
        wbt_Confirm.Click();
     } 
  }   
}  
//-------------------------------------------------------------------------------
// Process Confirm Cancel of INR
function process_confirm_INR_cancel()
{
  var INRstarV5 = INRstar_base();
  var w_hdg = "Confirmation Required";
  
  // Find the 'Confirmation Required' Panel
  var wbx_ConfCancel = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  if (wbx_ConfCancel.Exists == false)
  {  
     Log.Message("'" + w_hdg + "' box not displayed");
  }
  else
  {
     Log.Message("'" + w_hdg + "' box displayed");
     // Find the button
     var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");

     if (wbt_Confirm.Exists == false)
     {
        Log.Warning("'" + w_hdg + "' Confirm button not found");
     }
     else
     {
        Log.Message("Clicking '" + w_hdg + "' Confirm button ") 
        wbt_Confirm.Click();
     } 
  } 
} 
//-------------------------------------------------------------------------------
// Process Popup 
function process_popup(header, button)
{
  var INRstarV5 = INRstar_base();
  
  // Find the 'Confirmation Required' Panel
  var wbx = INRstarV5.NativeWebObject.Find("innerText", header);
  if (wbx.Exists == false)
  {  
    Log.Message("'" + header + "' box not displayed");
  }
  else
  {
    Log.Message("'" + header + "' box displayed");
  }
  // Find the button
  var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", button, "BUTTON");

  if (wb_Ok.Exists == false)
  {
    Log.Warning("'" + header + "' "+ button +" button not found");
  }
  else
  {
    var text = INRstarV5.Panel(3).Panel("modalDialogBox").innerText;
    Log.Message("Clicking '" + header + "' "+ button +" button "); 
    WaitSeconds(3);
    Sys.HighlightObject(wb_Ok, 3);
    wb_Ok.Click();
    return text;
  } 
}  

 
//-------------------------------------------------------------------------------
// Process Out-of-range INR
function process_Please_acknowledge()
{
  WaitSeconds(2,"");
  
  var INRstarV5 = INRstar_base();
  var w_hdg = "Please acknowledge";
  process_confirm_sub(INRstarV5, w_hdg);
  
  // Find the Panel
  var wbx_HighINR = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  if (wbx_HighINR.Exists == false|| wbx_HighINR.VisibleOnScreen == false)
  {  
     Log.Warning("'" + w_hdg + "' box not displayed");
  }
  else
  {
     Log.Message("'" + w_hdg + "' box displayed");
     // Find the button
     var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");

     if (wbt_Confirm.Exists == false && wbt_Confirm.VisibleOnScreen)
     {
        Log.Warning("'" + w_hdg + "' Confirm button not found");
     }
     else
     {
        Log.Message("Clicking '" + w_hdg + "' Confirm button ") 
        INRstarV5.Panel(4).Panel(1).Panel(0).Button(0).Click();
     } 
  }   
}  
//-------------------------------------------------------------------------------
// Process Out-of-range INR
function process_Please_acknowledge_warnings()
{
  WaitSeconds(2,"Before clicking 'Please acknowledge'");
  
  var INRstarV5 = INRstar_base();
  var w_hdg = "Please acknowledge";
  
  // Find the Panel
  var wbx = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  if (wbx.Exists == false || wbx.VisibleOnScreen == false)
  {  
     Log.Message("'" + w_hdg + "' box not displayed");
  }
  else
  {
     Log.Message("'" + w_hdg + "' box displayed");
     // Find the button
     var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");

     if (wbt_Confirm.Exists == false )
     {
        Log.Warning("'" + w_hdg + "' Confirm button not found");
     }
     else
     {              
        Log.Message("Clicking '" + w_hdg + "' Confirm button ")
        INRstarV5.Panel(4).Panel(1).Panel(0).Button(0).Click();
     } 
  }   
  WaitSeconds(2,"After clicking 'Please acknowledge'");
}  
//-------------------------------------------------------------------------------
// Process Recently started Warfarin
function process_limit_review(INRstarV5, wf_limit)
{
       var wf_limitbox = INRstarV5.NativeWebObject.Find("innerText", "Restrict Review Period");
       if (wf_limitbox.Exists)
        {
            if (wf_limit == true)
               {
                              var wbt_yes = INRstarV5.NativeWebObject.Find("innerText", "Yes");
                               if (wbt_yes.Exists == false )
                               {
                                  Log.Warning("'" + w_hdg + "' Yes button not found");
                               }
                               else
                               {              
                                    Log.Message("Restrict Review Period: Clicking 'Yes' button ")
                                    INRstarV5.Panel(2).Panel(1).Panel(0).Button(1).Click();
                              }
               }
               else
               {
                    var wbt_no = INRstarV5.NativeWebObject.Find("innerText", "No");
                     if (wbt_no.Exists == false )
                     {
                        Log.Warning("'" + w_hdg + "' No button not found");
                     }
                     else
                     {              
                          Log.Message("Restrict Review Period: Clicking 'No' button ")
                          INRstarV5.Panel(2).Panel(1).Panel(0).Button(0).Click();
                    }
               }
          }   
}  
//-------------------------------------------------------------------------------
// Process Recently started Warfarin
function process_Please_acknowledge_maintenance(INRstarV5)
{
  WaitSeconds(2,"");
  
  var INRstarV5 = INRstar_base();
  var w_hdg = "Please acknowledge";
  
  // Find the Panel
  var wbx = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  if (wbx.Exists == false || wbx.VisibleOnScreen == false)
  {  
     Log.Message("'" + w_hdg + "' box not displayed");
  }
  else
  {
    // Just click the correct button...
    INRstarV5.Panel(4).Panel(1).Panel(0).Button(1).Click();    
  }   
}  
//-------------------------------------------------------------------------------
// Process Dose Change
function process_Dose_change(INRstarV5)
{
  WaitSeconds(2,"");
  
  var INRstarV5 = set_system();
  var w_hdg = "Dose change";
//  process_confirm_sub(INRstarV5, w_hdg);
  
  // Find the Panel
  var wbx_dc = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  if (wbx_dc.Exists == false)
  {  
     Log.Message("'" + w_hdg + "' box not displayed");
  }
  else
  {
     Log.Message("'" + w_hdg + "' box displayed");
     // Find the button
     var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");

     if (wbt_Confirm.Exists == false)
     {
        Log.Warning("'" + w_hdg + "' Confirm button not found");
     }
     else
     {
        Log.Message("Clicking '" + w_hdg + "' Confirm button ") 
        if (wbt_Confirm.VisibleOnScreen == true)
            wbt_Confirm.Click();
//            INRstarV5.Panel(1).Panel(1).Panel(0).Button(1).Click();
     } 
  WaitSeconds(1,"Closing Confirm schedule");
  
  }   
}  
//-------------------------------------------------------------------------------
// Process 'Please Confirm'
function process_Please_confirm(INRstarV5)
{
  var INRstarV5 = set_system();
  var w_hdg = "Please confirm";
//  process_confirm_sub(INRstarV5, w_hdg);
  
  // Find the Panel
  var wbx_dc = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  if (wbx_dc.Exists == false)
  {  
               Log.Message("'" + w_hdg + "' box not displayed");
  }
  else
  {
             Log.Message("'" + w_hdg + "' box displayed");
             // Find the button
             var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");

             if (wbt_Confirm.Exists == false)
             {
                        Log.Warning("'" + w_hdg + "' Confirm button not found");
             }
             else
             {
                        Log.Message("Clicking '" + w_hdg + "' Confirm button ") 
                        if (wbt_Confirm.VisibleOnScreen == true)
                            wbt_Confirm.Click();
     } 
  }   
}
//-------------------------------------------------------------------------------
function return_message_please_confirm()
{
		WaitSeconds(2,"");
  
		var INRstarV5 = INRstar_base();
		var w_hdg = "Please Confirm";
  
		// Find the Panel
		var wbx = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
		if (wbx.Exists == false || wbx.VisibleOnScreen == false)
		{  
			Log.Message("'" + w_hdg + "' box not displayed");
		}
		else
		{
			output_message = INRstarV5.Panel(3).Panel("modalDialogBox").innerText;
			// Just click the correct button...
			INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).Click();
      return output_message;    
		} 
} 
//-------------------------------------------------------------------------------
// Process Confirm change Target INR window
function process_confirm_change_INR(INRstarV5)
{
  WaitSeconds(2,"");

//  var INRstarV5 = set_system();

  // find out if Confirm Change INR dialog is on the screen
  var wd_Confirm = INRstarV5.NativeWebObject.Find("innerText","Please confirm");
  if (wd_Confirm.Exists == true && wd_Confirm.VisibleOnScreen == true)
  {
      Log.Message("'Confirm change of INR' box displayed");
  
      // Find the confirm Button
      var wb_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
      if (wb_Confirm.Exists == true && wb_Confirm.VisibleOnScreen == true)
      {
           Log.Message("'Confirm change of INR' box displayed");
           wb_Confirm.Click();
      }
      else
      {
          Log.Warning("'Confirm change of INR' button not displayed");
      }
  }      
  else
  {
      Log.Message("'Confirm change of INR' box not displayed");
  }
}  
//-------------------------------------------------------------------------------
// Process Confirm change Target INR window
function process_confirm_change_duration(INRstarV5)
{
  WaitSeconds(2,"");

  var INRstarV5 = set_system();

 // Find out if the confirm Button is on the screen
 var wb_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
 if (wb_Confirm.Exists == false || wb_Confirm.VisibleOnScreen == false)
       Log.Message("'Confirm change of Duration' box not displayed");
  else
{
     // Find the button
     var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");

     if (wbt_Confirm.Exists == false && wbt_Confirm.VisibleOnScreen)
     {
        Log.Warning("'" + w_hdg + "' Confirm button not found");
     }
     else
     {
       Log.Message("'Confirm change of Duration' box displayed");
       wb_Confirm.Click();
     }
 }
        
}  
//-------------------------------------------------------------------------------
// Process Out-of-range INR
function process_confirm_delete_adverse_event()
{
  WaitSeconds(2,"");
  
  var INRstarV5 = INRstar_base();
  var w_hdg = "Confirmation Required";
  
  // Find the Panel
  var wbx_HighINR = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  if (wbx_HighINR.Exists == false|| wbx_HighINR.VisibleOnScreen == false)
  {  
     Log.Warning("'" + w_hdg + "' box not displayed");
  }
  else
  {
     Log.Message("'" + w_hdg + "' box displayed");
     // Find the button
     var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");

     if (wbt_Confirm.Exists == false && wbt_Confirm.VisibleOnScreen)
     {
        Log.Warning("'" + w_hdg + "' Confirm button not found");
     }
     else
     {
        Log.Message("Clicking '" + w_hdg + "' Confirm button ") 
        wbt_Confirm.Click();
     } 
  }   
}  
//-------------------------------------------------------------------------------
// Process Make an Appointment window
function process_make_appointment_cancel(INRstarV5)
{
  WaitSeconds(2,"");

  // Find the 'Make an Appointment' Panel
  var wbx_App = INRstarV5.NativeWebObject.Find("innerText", "Make an Appointment");
  if (wbx_App.Exists == false)
  {  
       Log.Warning("'Make an Appointment' box not displayed");
  }
  else
  {
       Log.Message("'Make an Appointment' box displayed");

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
                 var wbt_Close = wp_Parent.Find("innerText", "Close");
                 if (wbt_Close.Exists == false)
                 {
                    Log.Warning("'Make an Appointment' Close button not found");
                 }
                 else
                 {
                    Log.Message("Clicking 'Make an Appointment' Close button ") 
                    wbt_Close.Button(0).Click();
                 }    
           }
       }
  }      
}  
//-------------------------------------------------------------------------------
// Process Make an Appointment window
function process_make_appointment(INRstarV5)
{
  WaitSeconds(2,"");

  var INRstarV5 = set_system();

  // Find the 'Make an Appointment' Panel
  var wbx_App = INRstarV5.NativeWebObject.Find("innerText", "Make an Appointment");
  if (wbx_App.Exists == false)
  {  
       Log.Warning("'Make an Appointment' box not displayed");
  }
  else
  {
       Log.Message("'Make an Appointment' box displayed");

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
                 // Now we have to select a clinic and then an appointment
                 var w_box_panel = wp_Panel.Panel("modalDialogBox").Fieldset(0).Panel("DayClinics");
                 
                 // Choose the top clinic link
                 w_box_panel.Fieldset(0).Panel(0).Link("Scenario_ClinicClinicHeaderLink").Click();
                 
                 // Choose the appointment time
                 w_box_panel.Fieldset(0).Panel(0).Panel("ScenarioClinic_content").Table(0).Cell(5, 1).Link(0).Click();
                 
                 // Click the Add button
                 w_box_panel.Fieldset(0).Form("AddAppointmentForm").Panel(4).SubmitButton("AddAppointmentSubmitButton").Click();

                 var wbt_Close = wp_Parent.Find("innerText", "Close");
                 if (wbt_Close.Exists == false)
                 {
                    Log.Warning("'Make an Appointment' Close button not found");
                 }
                 else
                 {
                    Log.Message("Clicking 'Make an Appointment' Close button ") 
                    wbt_Close.Button(0).Click();
                 }    
           }
       }
  }      
}  
//-------------------------------------------------------------------------------
// Process Make an Appointment window, for an appointment on a different day to suggested
function process_make_future_appointment(INRstarV5, p_days)
{
  WaitSeconds(2,"");

  var INRstarV5 = set_system();

  // Find the 'Make an Appointment' Panel
  var wbx_App = INRstarV5.NativeWebObject.Find("innerText", "Make an Appointment");
  if (wbx_App.Exists == false)
  {  
       Log.Warning("'Make an Appointment' box not displayed");
  }
  else
  {
       Log.Message("'Make an Appointment' box displayed");

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
                 // Now we have to change the date
                 var w_fieldset = wp_Panel.Panel("modalDialogBox").Fieldset(0);
                 var w_app_date = String_To_Date(w_fieldset.Panel("DayClinics").Fieldset(0).TextNode(0).InnerText);
                 var w_new_date = aqDateTime.AddDays(w_app_date, p_days);
                 
//                 var w_pick_month = get_text_month(aqDateTime.GetMonth(w_new_date));
                 var w_pick_month = aqDateTime.GetMonth(w_new_date);
                 // Select that date
                 Log.Message(w_pick_month);
                 w_fieldset.Panel(0).Panel("AppointmentCalendar").Panel(0).Panel(0).Panel(0).Select(0).ClickItem(w_pick_month);
                 w_fieldset.Panel(0).Panel("AppointmentCalendar").Panel(0).Panel(0).Panel(0).Select(1).ClickItem(IntToStr(aqDateTime.GetYear(w_new_date))); 
                 //        .Panel(0).Panel("AppointmentCalendar").Panel(0).Panel(0).Panel(0).Select(1)
                 w_calendar_holder = w_fieldset.Panel(0).Panel("AppointmentCalendar").Panel(0);
                 select_day(aqDateTime.GetDay(w_new_date), w_calendar_holder);

                 //--------------- Continue to create appointment
                 // Now we have to select a clinic and then an appointment
                 var w_box_panel = wp_Panel.Panel("modalDialogBox").Fieldset(0).Panel("DayClinics");
                 
                 // Choose the top clinic link
                 w_box_panel.Fieldset(0).Panel(0).Link("Scenario_ClinicClinicHeaderLink").Click();
                 
                 // Choose the appointment time
                 var tableTimes = w_box_panel.Fieldset(0).Panel(0).Panel("ScenarioClinic_content").Table(0);
                 for (i=0; i<10; i++)
                 {
                     if (tableTimes.Cell(i, 1).Link(0).InnerText == "Available")
                     {
                        tableTimes.Cell(i, 1).Link(0).Click();
                        i= 10;
                     }
                 }
                 
                 // Click the Add button
                 w_box_panel.Fieldset(0).Form("AddAppointmentForm").Panel(4).SubmitButton("AddAppointmentSubmitButton").Click();

                 var wbt_Close = wp_Parent.Find("innerText", "Close");
                 if (wbt_Close.Exists == false)
                 {
                    Log.Warning("'Make an Appointment' Close button not found");
                 }
                 else
                 {
                    Log.Message("Clicking 'Make an Appointment' Close button ") 
                    wbt_Close.Button(0).Click();
                 }    
           }
       }
  }      
}  
//-------------------------------------------------------------------------------
// Convert text date to dd/mm/yy format 
function String_To_Date(p_date)
{
    // Split out the date bits 
    var w_y_pos = p_date.indexOf("y"); 
    var w_hyp = p_date.indexOf("-");
    var w_hyp2 = p_date.lastIndexOf("-");
       
    var w_day = aqString.SubString(p_date, w_y_pos+2, 2);
    var w_month = aqString.SubString(p_date, w_hyp+1, 3);
    var w_year = aqString.SubString(p_date, w_hyp2+1, 4);
    
    w_mnth = get_numeric_month(w_month);
    
    var w_date = w_day + "/" + w_mnth + "/" + w_year;
    
    return w_date;
}  
//-------------------------------------------------------------------------------
// Processget_numeric_month
function get_numeric_month(p_month)
{
  var w_mnth;
  switch (aqString.SubString(p_month, 0, 3))
  {
    case "Jan": w_mnth = "01"; break;
    case "Feb": w_mnth = "02"; break;
    case "Mar": w_mnth = "03"; break;
    case "Apr": w_mnth = "04"; break;
    case "May": w_mnth = "05"; break;
    case "Jun": w_mnth = "06"; break;
    case "Jul": w_mnth = "07"; break;
    case "Aug": w_mnth = "08"; break;
    case "Sep": w_mnth = "09"; break;
    case "Oct": w_mnth = "10"; break;
    case "Nov": w_mnth = "11"; break;
    case "Dec": w_mnth = "12"; break;
  }
  return w_mnth;
       
}  
//-------------------------------------------------------------------------------
// Process get_text_month
function get_text_month(p_month)
{
  var w_mnth;
  switch (p_month)
  {
    case "01": w_mnth = "Jan"; break;
    case "02": w_mnth = "Feb"; break;
    case "03": w_mnth = "Mar"; break;
    case "04": w_mnth = "Apr"; break;
    case "05": w_mnth = "May"; break;
    case "06": w_mnth = "Jun"; break;
    case "07": w_mnth = "Jul"; break;
    case "08": w_mnth = "Aug"; break;
    case "09": w_mnth = "Sep"; break;
    case "10": w_mnth = "Oct"; break;
    case "11": w_mnth = "Nov"; break;
    case "12": w_mnth = "Dec"; break;
  }
  return w_mnth;
       
}  
//-------------------------------------------------------------------------------
// Process confirm_delete_treatment
function process_confirm_delete_treatment(INRstarV5)
{
  WaitSeconds(2,"");

 // Find out if the confirm Button is on the screen
 var wb_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
 if (wb_Confirm.Exists && wb_Confirm.VisibleOnScreen == true)
 {
       wb_Confirm.Click();
 }
 else
       Log.Warning("'Confirm Delete Treatment' box not displayed");     
}  
//-------------------------------------------------------------------------------
// Process More Information window
function process_more_information(INRstarV5)
{
  WaitSeconds(2,"Waiting for more information box");

 // Find out if the OK Button is on the screen
 var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", "Ok", "BUTTON");
 if (wb_Ok.Exists && wb_Ok.VisibleOnScreen == true)
 {
       wb_Ok.Click();
       return true;
 }
 else
       Log.Message("'More information' box not displayed");
       return false;
}  
//-------------------------------------------------------------------------------
// Process duplicate_patient
function process_duplicate_patient(INRstarV5)
{
  WaitSeconds(2,"");

 // Find out if the OK Button is on the screen
 var wb_Ok = INRstarV5.NativeWebObject.Find("innerText", "Confirm", "BUTTON");
 if (wb_Ok.Exists && wb_Ok.VisibleOnScreen)
 {
       Log.Message("'Duplicate patient' box displayed");
       wb_Ok.Click();
 }
 else
       Log.Warning("'Duplicate patient' box not displayed");
}  
//-------------------------------------------------------------------------------
// Process Confirm Historical Treatment window
function process_confirm_historical_treatment(INRstarV5)
{

 WaitSeconds(2,"Waiting for Confirm box");
 
  var w_hdg = "Please confirm that the following is correct";
  var w_confirm;
  
  // Find the 'Confirm Historical Treatment' Panel
  var w_popup = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  if (w_popup.Exists == false || w_popup.VisibleOnScreen == false)
  {
         Log.Warning("'" + w_hdg + "' box not displayed");
         return w_confirmed = false;
  }
  else
  {
     //Log.Message("'" + w_hdg + "' box displayed");
     // Find the button
     var wbt_Confirm = INRstarV5.NativeWebObject.Find("innerText", "Confirm");
     if (wbt_Confirm.Exists == false)
     {
        Log.Warning("'" + w_hdg + "' Confirm button not found");
         return w_confirmed = false;
     }
     else
     {
        //Log.Message("Clicking '" + w_hdg + "' Confirm button ") 
        wbt_Confirm.Click();
         return w_confirmed = true;
     }
  }     
}  
//-------------------------------------------------------------------------------
// Process Make an Appointment window
function process_treatment_information_cancel(INRstarV5)
{
  var INRstarV5 = set_system();

  // Find the 'Treatment Information' Panel
  var wbx_App = INRstarV5.NativeWebObject.Find("innerText", "Treatment Informationclose");
  if (wbx_App.Exists == false)
  {  
       Log.Warning("'Treatment Information' box not displayed");
  }
  else
  {
       Log.Message("'Treatment Information' box displayed");

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
                 wp_Parent.Panel(0).Link(0).Click(); 
           }
       }   
  }      
}  
//-------------------------------------------------------------------------------
// Process Add comments to treatment
function add_comments(INRstarV5, w_new_comment)
{
  // Find the 'Comments' Panel
  var wbx_App = INRstarV5.NativeWebObject.Find("innerText", "Edit Comments");
  if (wbx_App.Exists == false)
  {  
       Log.Warning("'Edit Comments' box not displayed");
  }
  else
  {
       Log.Message("'Edit Comments' box displayed: " + w_new_comment);

       var w_comments =INRstarV5.Panel(3).Panel("modalDialogBox").Fieldset("EditCommentsFieldset").Form("EditCommentsForm").Textarea("Comments");
       w_comments.innerText = w_comments.innerText + w_new_comment;
       INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).Click();
  }      
}
//-------------------------------------------------------------------------------
// Read comments on treatment
function read_comments(INRstarV5)
{
  // Find the 'Comments' Panel
  var wbx_App = INRstarV5.NativeWebObject.Find("innerText", "Edit Comments");
  var w_comments = ""
  if (wbx_App.Exists == false)
  {  
       Log.Warning("'Edit Comments' box not displayed");
  }
  else
  {
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
                 w_comments = wp_Parent.Panel("modalDialogBox").Fieldset("EditCommentsFieldset").Form("EditCommentsForm").Textarea("Comments");
           }
       }
  } 
  return w_comments;     
}

function close_comments_window(INRstarV5)
{
  var w_hdg="Edit comments";
  process_cancel_sub(INRstarV5,w_hdg);
}
//----------------------------------------------------------------------------------------------
function process_cancel_sub(INRstarV5, w_hdg)
{
  // Find the Panel
  if(INRstarV5=='')
  {
  var INRstarV5 = INRstar_base();
  }
  
  WaitSeconds(2);
  // Find the Panel
  var w_popup = INRstarV5.NativeWebObject.Find("innerText", w_hdg);
  if (w_popup.Exists == false)
  {
         Log.Warning("'" + w_hdg + "' box not displayed");
  }
  else
  {
     Log.Message("'" + w_hdg + "' box displayed");
     // Find the button
     var wbt_Cancel = INRstarV5.NativeWebObject.Find("innerText", "Cancel");
     if (wbt_Cancel.Exists == false)
     {
        Log.Warning("'" + w_hdg + "' Cancel button not found");
     }
     else
     {       
        Log.Message("Clicking '" + w_hdg + "' Cancel button ") 
        wbt_Cancel.Click();
     }
  }     
} 
//-------------------------------------------------------------------------------------------------
// Process Self Care Confirm window
function process_self_care_confirm_INR(INRstarV5)
{
  var w_hdg = "Are you sure?";
  process_confirm_sub(INRstarV5, w_hdg);
} 
// Process Self Care Cancel window
function process_self_care_cancel_INR(INRstarV5)
{
  var w_hdg = "Are you sure?";
  process_cancel_sub(INRstarV5, w_hdg);
} 
