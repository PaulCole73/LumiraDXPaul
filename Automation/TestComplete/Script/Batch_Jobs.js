//===============================================================================

function bat_job_inrstar()
{

 var obj = Sys.OleObject("WScript.Shell");
 var mypath = "C:\\Automation_Start_INRstar_BatchFile\\INRstar.bat";
    
    obj.Run("\"" + mypath +  "\"");
  
  WaitSeconds(5);
  
}
//===============================================================================

function bat_job_excel()
{

 var obj = Sys.OleObject("WScript.Shell");
 var mypath = "C:\\Automation_Start_Excel_Batchfile\\Excel.bat";
    
    obj.Run("\"" + mypath +  "\"");
  
  WaitSeconds(5);
  
}
//===============================================================================
