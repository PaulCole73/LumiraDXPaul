function CurDriverExample()
{
  // Creates a driver
  DDT.ExcelDriver("C:\\test\\MyFile.xls", "Sheet1");
   
  // Iterates through records
  while (! DDT.CurrentDriver.EOF())
  { 
  //Gets a value from the storage and posts it to the log
    Log.Message(DDT.CurrentDriver.Value(0)); 
    DDT.CurrentDriver.Next(); 
  }
  
  // Closes the driver
  DDT.CloseDriver(DDT.CurrentDriver.Name);
}