// Object of the exercise is to just read some stuff from a driver file thats all we want to do!
function main()
{
  var filename="\\\\scslsrv1\\old_commonfiles\\Stuff_for_Paul_T\\TestCompleteDataSheet.xls";
  readExcel(filename,1);
}


// this is the main function for reading the Inputs page on a generic datasheet
function readExcel(file,testcase)
{

	  // file must always have an initial tab called 'Inputs' which drives the rest of the data reading
    driver = DDT.ExcelDriver(file,"Inputs"); 
 
	  //read the always present 'Inputs' tab and look for reference to the test case you are workin on
    while (!driver.EOF() && driver.Value(0) == testcase)
    {
		// now work out what it is you need to do based on what is described in 'Inputs'
		if (driver.Value(1) == 'Data-HistTreat')
		{
	  		ReadHistoricToBeAdded(file,1);
		}
		else if (driver.Value(1) == 'Data-NewINR')
		{
  			ReadNewINRToBeAdded(file,1);
		}
		else if (driver.Value(1) == 'Data-Demographics')
		{
    		ReadDemographicsToBeAdded(file,1);
		}
		driver.Next();
	}
  //increment the test case number and return it so we can begin again
	test++;
	return(test);
}


// this handles reading from a generic historical treatment data entry page	
function ReadHistoricToBeAdded(file,testcase)
{
	while (!driver.EOF() && driver.Value(0) == testcase)
	{
		
   //driver = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\testcomplete_test_data\\ttr_data\\test_data_plus_2_weeks.xls","TTR");
    driver = DDT.ExcelDriver(file,"Data-HistTreat");
		Log.Message("Read Test case as: ",driver.Value(0));
		Log.Message("Read Date case as: ",driver.Value(1));
		Log.Message("Read Review case as: ",driver.Value(2));
		Log.Message("Read Dose case as: ",driver.Value(3));
		Log.Message("Read Target case as: ",driver.Value(4));
	}
  driver.Next();
}


// this handles reading from a generic new INR data entry page	
function ReadNewINRToBeAdded(file,testcase)
{

		Log.Message("Dropped into ReadNewINRToBeAdded but there is nothing to do");

}



// this handles reading from a generic demographics data entry page	
function ReadDemographicsToBeAdded(file,testcase)
{

		Log.Message("Dropped into ReadDemographicsToBeAdded but there is nothing to do");

}