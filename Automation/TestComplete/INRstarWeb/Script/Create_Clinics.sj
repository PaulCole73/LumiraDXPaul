//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_SQL

//===============================================================================
// Create 1 clinic for each date (Mon -Fri)
//===============================================================================
function quick_start_clinic()
{
          wa_days = new Array(6);
          wa_days[0] = "Y";
          wa_days[1] = "Y";
          wa_days[2] = "Y";
          wa_days[3] = "Y";
          wa_days[4] = "Y";
          wa_days[5] = "Y";
          
          create_clinics(wa_days);
}
//-----------------------------------------------------------------------------------------------------
function create_clinics(pa_days)
{
          // Work out what day today is
         var  w_today = aqDateTime.GetDayOfWeek(aqDateTime.Today());
          // work out what date next Monday is
          var w_days_to_next_Monday = 9 - w_today;
          var w_date = aqConvert.StrToDate(aqDateTime.AddDays( aqDateTime.Today(), w_days_to_next_Monday));

          var INRstarV5 = set_system();

          for (i = 1; i < pa_days.length; i++)
          {
               if (pa_days[i] == "Y" )
              {
                     Log.Message("Adding Clinic for " + i );
                    
                      Goto_Add_Clinic(INRstarV5);
                      add_clinic(INRstarV5, i, w_days_to_next_Monday);
              }
         }             
}
function add_clinic(INRstarV5, i, w_days_to_next_Monday)
{
        var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
        var panelSFBIC = panelMCP.Panel("ManageClinicsTabContent").Table("scheduler").Cell(4, 0).Panel("scheduler_formBlock_innerContent");
        var tableSFB = panelSFBIC.Panel("scheduler_formBlock_AptFrmContainer_PW_1").Table("scheduler_formBlock_AptFrmContainer_PWST_1");
        var tableSFB2 = tableSFB.Cell(0, 0).Table("scheduler_formBlock_AptFrmContainer_CLW_1");
        var tableF = tableSFB2.Cell(1, 0).Panel("scheduler_formBlock_AptFrmContainer_CSD_1").Form(0)
        var tableX = tableF.Table(0);
                    
        var f_name = tableX.Cell(0, 1).Table("Name_ET").Cell(0, 0).Table("Name").Cell(0, 0).Textbox("Name_I");
        var f_date = tableX.Cell(1, 1).Table("StartDate_ET").Cell(0, 0).Table("StartDate").Cell(0, 0).Textbox("StartDate_I");
        var f_start = tableX.Cell(2, 1).Table("StartTime_ET").Cell(0, 0).Table("StartTime").Cell(0, 0).Textbox("StartTime_I");
        var f_end = tableX.Cell(3, 1).Table("EndTime_ET").Cell(0, 0).Table("EndTime").Cell(0, 0).Textbox("EndTime_I");
        var f_slot = tableX.Cell(4, 1).Table("SlotLength_ET").Cell(0, 0).Table("SlotLength").Cell(0, 1).Textbox("SlotLength_I");
        var tableZ = tableF.Panel("appointmentRecurrenceForm_mainDiv").Table(0).Cell(0, 0).Table("appointmentRecurrenceForm_ChkRecurrence")
        var f_rept = tableZ.Cell(0, 0).Click();
                    
        var w_adj_day = w_days_to_next_Monday + i;
        var w_date = aqConvert.DateTimeToStr(aqDateTime.AddDays( aqDateTime.Today(), w_adj_day));
        var w_day_of_week = set_day(aqDateTime.GetDayOfWeek(w_date));
        Log.Message(w_date + ", " + w_day_of_week);
        f_name.Text = w_day_of_week;
        f_date.Click();
        f_date.Text = w_date;
        f_date.Click();
        f_start.Click();
        f_start.Text = "09:30";
        f_end.Text = "13:00";
        tableX.Cell(4, 1).Table("SlotLength_ET").Cell(0, 0).Table("SlotLength").Cell(0, 2).Table(0).Cell(0, 0).Click();
        tableX .Cell(4, 1).Table("SlotLength_ET").Cell(0, 0).Panel("SlotLength_DDD_PW_1").Table("SlotLength_DDD_PWST_1").Cell(0, 0).Table("SlotLength_DDD_CLW_1").Cell(0, 0).Panel("SlotLength_DDD_CSD_1").Table("SlotLength_DDD_L").Cell(0, 0).Panel("SlotLength_DDD_L_D").Table("SlotLength_DDD_L_LBT").Cell(1, 0).Click();

         // Save
         var tableY = tableF.Table(1);
         tableY.Cell(0, 0).Table(0).Cell(0, 0).Table("Apply").Cell(0, 0).Panel("Apply_CD").TextNode(0).Click();       
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
  return w_Day;
} 
//--------------------------------------------------------------------