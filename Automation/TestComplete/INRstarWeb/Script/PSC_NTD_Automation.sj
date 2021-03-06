//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation
//USEUNIT Quick_Patient

//USEUNIT Add_INR_Complex
//USEUNIT Delete_Treatments
//=====================================================================================
//


//JScriptCopy Code 
function Main() 
{ 
  var fileName = "\\\\scslsrv1\\shared\\development and testing\\testing\\TestComplete_Results\\psc.csv"; 
  var sheetName = "Sheet1"; 
  
  WriteExcelSheet(fileName, sheetName) 
} 
  
function WriteExcelSheet(fname, sheetName) 
{ 
  var maxcol = 5, maxrow = 5; 
    
  var app = Sys.OleObject("Excel.Application"); 
      
  var book = app.Workbooks.Open(fname); 
  var sheet = book.Sheets(sheetName); 
  app.DisplayAlerts = false; 
  
  // Write an index of the current row and column to a cell 
  var rowCount = sheet.UsedRange.Rows.Count + 1; 
  for(var row = rowCount; row < rowCount + maxrow; row++) 
    for(var col = 1; col <= maxcol; col++) 
      sheet.Cells(row, col) = row + ", " + col; 
    
  book.Save(); 
  app.Quit(); 
}
//
////=====================================================================================
//function quick_start()
//{
//          var INRstarV5 = set_system();         
//}
////=============================================================== Main Routine
//function psc_ntd_testing(INRstarV5)
//{
//          
//     // Define the output file name
//    var w_File = "PSC_NTD_Automation";
//    var w_outfile = "\\\\scslsrv1\\shared\\development and testing\\testing\\TestComplete_Results\\psc\\"+w_File+".csv";
//    Log.Message(w_outfile);
//    
//     // Reset Output File
//    var w_mess="PSC TTR Testing : " + w_File;
//    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);
//     // Write Headings
//    w_mess="Pt no, NHS No, treatmentId, TaskTypeId, ";
//    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);
//}
// 
//      //---------------------------------------------------------------------- Record values & Delete added treatments        
//      // Record the values produced
//      record_ttr_values(INRstarV5, w_outfile, p_ptno, get_patient_nhs(INRstarV5), p_inr, p_ttr);
//
////------------------------------------------------------------------------
//// Record the Suggested Dose value
//function record_ttr_values(INRstarV5, w_outfile, p_ptno, p_nhs, p_inr, p_ttr)
//{  
//    var w_row;
//
//    
//
//
//   
//    // Write the record to the file
//    aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n", aqFile.ctANSI);
//}