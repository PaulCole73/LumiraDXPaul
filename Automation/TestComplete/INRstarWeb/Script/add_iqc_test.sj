//USEUNIT Navigation
//USEUNIT Common
//USEUNIT V5_Common


//-------------------------------------------------------------------------------
function add_iqc_test(p_run)
{
    var INRstarV5 = set_system();
    // Read input file
    driver = DDT.ExcelDriver("d:\\Test_Data\\Locations.xls","Locations");
    
    // find the Local Admin record (LAxx)
    while (!driver.EOF())
    {
         if (driver.Value(0) == "IQ"+p_run)
         {
            var w_date = aqDateTime.AddDays(aqDateTime.Today(), -7);
            var w_batch = driver.Value(1);
            var w_expiry_date = aqDateTime.AddDays(aqDateTime.Today(), 60);
            var w_range = driver.Value(2)
            var w_result = driver.Value(3)
            var w_machine = driver.Value(4)
            
            var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
            var panelAC = panelMCP.panel("AdminContent")
//            .panel("IqcWrapper").panel("ActionButtonContainer");
            var form = panelAC.form("AddIqcResultForm");
            
            // Set Date
            form.fieldsetContainer.panelData.Image("calendar_png").Click();
            
//            form.Table("AddHistoricalTreatmentTable").Cell(1, 0).Image("calendar_png").Click();
//    w_datepicker = INRstarV5.Panel("ui_datepicker_div");
//    w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(driver.Value(p_start+1)));
//    w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.FloatToStr(driver.Value(p_start+2)));
//    select_day(driver.Value(p_start), w_datepicker);
//
            
//            Goto_Admin_IQC_Add();
//
//            
//            
//                        
         }
        driver.Next();      
    }
    DDT.CloseDriver("d:\\Test_Data\\Locations.xls");
}
