//=====================================================================================
function quick_start()
{
    // Define input file
   driver = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\testcomplete_test_data\\ttr_data\\test_data.xls","ttr");
    while (!driver.EOF())
    {
      if (driver.Value(0) == "Y")
      {
                     //   Testing spreadsheet row
                     Log.Message("Column 0 : " + driver.Value(0));
                     Log.Message("Column 1 : " + driver.Value(1));
                     Log.Message("Column 2 : " + driver.Value(2));
                     Log.Message("Column 3 : " + driver.Value(3));
                     Log.Message("Column 4 : " + driver.Value(4));
                     Log.Message("Column 5 : " + driver.Value(5));
                     Log.Message("Column 6 : " + driver.Value(6));
                     Log.Message("Column 7 : " + driver.Value(7));
                     Log.Message("Column 8 : " + driver.Value(8));
                     Log.Message("Column 9 : " + driver.Value(9));
                     Log.Message("Column 10 : " + driver.Value(10));
                     Log.Message("Column 11 : " + driver.Value(11));
                     Log.Message("Column 12 : " + driver.Value(12));
                     Log.Message("Column 13 : " + driver.Value(13));
                     Log.Message("Column 14 : " + driver.Value(14));
                     Log.Message("Column 15 : " + driver.Value(15));
                     
          }
          driver.Next();      
  }
}
