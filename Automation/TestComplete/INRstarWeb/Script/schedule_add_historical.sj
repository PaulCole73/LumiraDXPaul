//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT Test_Add_Historical_Treatment


function add_historical()
{



  driver_patientIds = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\Technical Information\\INRstar\\Testing\\TestComplete_Data\\NoHistoric.xls","Ids");

  Log_On(10); // pt_dawn6 login on 192.168.16.158
  var INRstarV5 = set_system();  
  
    while (!driver_patientIds.EOF())
    {
    if(driver_patientIds.Value(0) == "Y")
    {
    
      Log.Message(driver_patientIds.Value(1));
      
      Goto_Patient_Search();
      preset_Fetch_Patient_NHS(INRstarV5, driver_patientIds.Value(2));
      
      Goto_Add_Historical();
      var p_day = "7";
      var p_month = "10";
      var p_year = "2012";
      var p_target = "2.5";
      var p_inr = "2.0";
      var p_dose = "1.0";
      var p_review = "7 Days";
      var p_comment = "added from test complete by PT";
      
      
      quick_pt_historical(p_day, p_month, p_year, p_target, p_inr, p_dose, p_review, p_comment);
    
    }
    
    
    driver_patientIds.Next();
    }
}