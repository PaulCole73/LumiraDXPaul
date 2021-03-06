//USEUNIT V5_Common
//USEUNIT PaulT_BlogCopies

function Quick_Gather_Filenames_To_Compare_Test()
{
var concatenatedFilenames;
var splitFilenames;
var filename1;
var filename2;
var numberOfFiles;

  
  concatenatedFilenames = ListFiles("C:\\Users\\paul.tierney\\Downloads\\");
  Log.Message(concatenatedFilenames);
  splitFilenames = concatenatedFilenames.split(":");
  if(splitFilenames[0] == "2")
  {
    filename1 = splitFilenames[1];
    filename2 = splitFilenames[2];
    Log.Message("Filename 1 = "+filename1);
    Log.Message("Filename 2 = "+filename2);
  }
  else
  {
    Log.Error("Incorrect number of files to compare");
  }
}


function Quick_Data_Comparison_Test()
{ 
  var filename1="C:\\Users\\paul.tierney\\csvTestData\\ClinicalAudit_20160527_9f32a0.csv";
  var filename2="C:\\Users\\paul.tierney\\csvTestData\\ClinicalAudit_20160527_46cdf6.csv";
  compare_two_csv_files(filename1, filename2);

}

// Overall compare function which itself calls "do_values_match" and "compare_two_numbers"
function compare_two_csv_files(filename1, filename2, analyticsPage)
{
var driver1;
var driver2;
var columnsToRead;
var simpleCompare;
var accepted_error = 2;
var comparisonResult;
var driver1type;
var driver2type;

var totalCSVCellsCompared = 0; // may not need this anymore
var columnName = "";
var rowCount = 0; // new code

var columnCountDiff;
var numColumnsToCompare;
var convertedString1;
var convertedString2;
  
  driver1 = DDT.CSVDriver(filename1);
  driver2 = DDT.CSVDriver(filename2);
  
  Log.Message("Inside Function 'compare_two_csv_files' File 1 = "+filename1);
  Log.Message("Inside Function 'compare_two_csv_files' File 2 = "+filename2);
   
  // Look for mismatching column counts first as this may not be a good idea to compare unless
  // it is clinical audit which is 8 columns narrower in Analytics 2 than Analytics 1
//  if(driver1.ColumnCount == driver2.ColumnCount)
//  {
//      overrideColumnCountDiff = 1;
//      numColumnsToCompare = driver1.ColumnCount;
//  }
//  else
//  {
//      if(analyticsPage == "ClinicalAudit")
//      {
//          columnCountDiff = Math.abs(driver1.ColumnCount - driver2.ColumnCount);
//          if(columnCountDiff == 8)
//          {
//              overrideColumnCountDiff = 1;
//              if(driver1.ColumnCount > driver2.ColumnCount)
//              {
//                  numColumnsToCompare = driver2.ColumnCount;
//              }
//              else
//              {
//                  numColumnsToCompare = driver1.ColumnCount;
//              }
//          }
//          else
//          {
//              Log.Warning("File1 and File2 don't have matching numbers of columns - can't compare data");
//          }     
//      }
//      else
//      {
//          Log.Warning("File1 and File2 don't have matching numbers of columns - can't compare data");
//      }
//  }
 
  // Set up objects to hold the counters per Analytics measure -- need to move the initialisation out into a function
  var counters = [];

  for(var i = 0; i <= numColumnsToCompare; i++) 
  {
      counters[i] = {
                       misMatchDataTypes:0,
                       misMatchedComparisonToNULL:0,
                       misMatchedComparisonWithZero:0,
                       misMatchedNonNumerics:0,
                       perfectMatchedValues:0,
                       numericDifferenceWithinAcceptedPercentageError:0,
                       unacceptablePercentageError:0,
                       overrideColumnCountDiff:0,
                       massagedDriver1ColumnCount:0 
                    }
  }                    
  
  // if file 'widths' are same (or we are doing Clinical Audit) we can do a comparison
  //while (!driver1.EOF() && (overrideColumnCountDiff = 1))
  while (!driver1.EOF())
  {
      Log.Message("I've made it into the main while loop inside 'compare_two_csv_files'");
      if(driver2.EOF())
      {
          Log.Error("File1 and File2 don't have matching numbers of rows - can't compare data");
      }

      // Loop through the elements in the current row
      for(columnsToRead=0; columnsToRead < numColumnsToCompare; columnsToRead++)
      {
      
        /* Some New Code here! */
        var CSV1ColumnToRead = columnsToRead;
        var CSV2ColumnToRead = columnsToRead;
      
        Log.Message("columnsToRead = "+columnsToRead);
        Log.Message("CSV1ColumnToRead = "+CSV1ColumnToRead);
        Log.Message("CSV2ColumnToRead = "+CSV2ColumnToRead);
      }      
      
        if(columnsToRead >= 4) // Active Patient Count End of Period is column 4 in both Patient Activity and Clinical Audit CSV export in Analytics 1, so skip it
        {
            CSV1ColumnToRead = columnsToRead+1;
        }

        Log.Message("Overall Column to compare = "+columnsToRead);
        Log.Message("CSV1 Column to compare = "+CSV1ColumnToRead);
        Log.Message("CSV2 Column to compare = "+CSV2ColumnToRead);

         /* End of first part of cludge - rest has old code commented out above new code */
          
  //          totalCSVCellsCompared++; // increment overall count of cells compared - NOT NEEEDED ANYMORE?!

  //          driver1type = typeof driver1.Value(columnsToRead);
  //          driver2type = typeof driver2.Value(columnsToRead);
              driver1type = typeof driver1.Value(CSV1ColumnToRead);
              driver2type = typeof driver2.Value(CSV2ColumnToRead);
              Log.Message("CSV1 Driver Type = "+driver1type);
              Log.Message("CSV2 Driver Type = "+driver2type);

            //Do a simple compare of the two values from the two csvs
  //          simpleCompare = do_values_match(driver1.Value(columnsToRead), driver2.Value(columnsToRead));
            simpleCompare = do_values_match(driver1.Value(CSV1ColumnToRead), driver2.Value(CSV2ColumnToRead));
            if(simpleCompare == 0)
            {
  //              Log.Message("I think these are perfect matches: "+driver1.Value(columnsToRead)+" and "+driver2.Value(columnsToRead));
                Log.Message("I think these are perfect matches: "+driver1.Value(CSV1ColumnToRead)+" and "+driver2.Value(CSV2ColumnToRead));
  //              counters[columnsToRead].perfectMatchedValues++;
                counters[CSV2ColumnToRead].perfectMatchedValues++;
            }
            else
            {
                // Check for mismatching data types and which includes comparison against NULL from 1 file
                if(driver1type != driver2type)
                {
                    // if neither are null count mismatching type end of
  //                  if(null != driver1.Value(columnsToRead) && (null != driver2.Value(columnsToRead)))
                    if(null != driver1.Value(CSV1ColumnToRead) && (null != driver2.Value(CSV2ColumnToRead)))
                    {
  //                      counters[columnsToRead].misMatchDataTypes++;
                        counters[CSV2ColumnToRead].misMatchDataTypes++;
                    }
                    // else counting a null 
                    else
                    {       
  //                      if(null == driver1.Value(columnsToRead) || (null == driver2.Value(columnsToRead)))
                        if(null == driver1.Value(CSV1ColumnToRead) || (null == driver2.Value(CSV2ColumnToRead)))
                        {
  //                          counters[columnsToRead].misMatchedComparisonToNULL++;
                            counters[CSV2ColumnToRead].misMatchedComparisonToNULL++;
                        }
                    }
                }
                else 
                {
                    // Can't do mathematic comparison on strings so catch those now
                    if(driver1type == 'string')
                    {
                        // do we have a mismatch between numerics and decimals?
  //                      if((driver1.Value(columnsToRead).indexOf('.') !== -1) && (driver1.Value(columnsToRead).indexOf('.') == -1))
                        if((driver1.Value(CSV1ColumnToRead).indexOf('.') !== -1) && (driver1.Value(CSV1ColumnToRead).indexOf('.') == -1))
                        {
                            Log.Message("Driver 1 value looks like a float, Driver 2 looks like an int, converting both to floats");
  //                          convertedString1 = TryParseFloat(driver1.Value(columnsToRead),-1);
                            convertedString1 = TryParseFloat(driver1.Value(CSV1ColumnToRead),-1);
  //                          convertedString2 = TryParseFloat(driver2.Value(columnsToRead),-1);
                            convertedString2 = TryParseFloat(driver2.Value(CSV2ColumnToRead),-1);
                        }
  //                      else if((driver1.Value(columnsToRead).indexOf('.') == -1) && (driver1.Value(columnsToRead).indexOf('.') !== -1))
                        else if((driver1.Value(CSV1ColumnToRead).indexOf('.') == -1) && (driver1.Value(CSV1ColumnToRead).indexOf('.') !== -1))
                        {
                            Log.Message("Driver 2 value looks like a float, Driver 1 looks like an int, converting both to floats");
  //                          convertedString1 = TryParseFloat(driver1.Value(columnsToRead),-1);
                            convertedString1 = TryParseFloat(driver1.Value(CSV1ColumnToRead),-1);
  //                          convertedString2 = TryParseFloat(driver2.Value(columnsToRead),-1);
                            convertedString2 = TryParseFloat(driver2.Value(CSV2ColumnToRead),-1);
                        }
                      
                        // if both values contain a decimal point attempt to convert them to floats not ints before comparison
  //                      else if((driver1.Value(columnsToRead).indexOf('.') !== -1) && (driver1.Value(columnsToRead).indexOf('.') !== -1))
                        else if((driver1.Value(CSV1ColumnToRead).indexOf('.') !== -1) && (driver1.Value(CSV1ColumnToRead).indexOf('.') !== -1))
                        {
  //                            convertedString1 = TryParseFloat(driver1.Value(columnsToRead),-1);
                              convertedString1 = TryParseFloat(driver1.Value(CSV1ColumnToRead),-1);
  //                            convertedString2 = TryParseFloat(driver2.Value(columnsToRead),-1);
                              convertedString2 = TryParseFloat(driver2.Value(CSV2ColumnToRead),-1);
                        }
                        else
                        {
                              // can we convert to a integer, if we get a -1 it means we can't otherwise what is return is 2 numerics to compare 
                              // we dont get negative numbers in analytics so reserving -1 should be safe
  //                            convertedString1 = TryParseInt(driver1.Value(columnsToRead),-1);
                              convertedString1 = TryParseInt(driver1.Value(CSV1ColumnToRead),-1);
  //                            convertedString2 = TryParseInt(driver2.Value(columnsToRead),-1);
                              convertedString2 = TryParseInt(driver2.Value(CSV2ColumnToRead),-1);
                        }
  //                      Log.Message("I have converted: "+driver1.Value(columnsToRead)+" to: "+convertedString1);
                        Log.Message("I have converted: "+driver1.Value(CSV1ColumnToRead)+" to: "+convertedString1);
  //                      Log.Message("I have converted: "+driver2.Value(columnsToRead)+" to: "+convertedString2);
                        Log.Message("I have converted: "+driver2.Value(CSV2ColumnToRead)+" to: "+convertedString2);
                        if(convertedString1 != -1 && convertedString2 != -1)
                        {
                            comparisonResult = compare_two_numbers(convertedString1, convertedString2, accepted_error);                     

                            // Increment counters based on result from sub-function
                            if(comparisonResult == 0)
                            {
                                Log.Message("I think these are perfect matches: "+convertedString1+" and "+convertedString2);
  //                              counters[columnsToRead].perfectMatchedValues++;
                                counters[CSV2ColumnToRead].perfectMatchedValues++;
                            }
                            if(comparisonResult == 1)
                            {
  //                              counters[columnsToRead].numericDifferenceWithinAcceptedPercentageError++;
                                counters[CSV2ColumnToRead].numericDifferenceWithinAcceptedPercentageError++;
                            }
                            if(comparisonResult == 2)
                            {
  //                              counters[columnsToRead].unacceptablePercentageError++;
                                counters[CSV2ColumnToRead].unacceptablePercentageError++;
                            }
                            if(comparisonResult == 3)
                            {
  //                              counters[columnsToRead].numericDifferenceWithinAcceptedPercentageError++;
                                counters[CSV2ColumnToRead].numericDifferenceWithinAcceptedPercentageError++;
                            }
                            if(comparisonResult == 4)
                            {
  //                              counters[columnsToRead].unacceptablePercentageError++;
                                counters[CSV2ColumnToRead].unacceptablePercentageError++;
                            }
                            if(comparisonResult == 9)
                            {
  //                              counters[columnsToRead].misMatchedComparisonWithZero++;
                                counters[CSV2ColumnToRead].misMatchedComparisonWithZero++;
                            }

                        }
                        else
                        {
  //                          counters[columnsToRead].misMatchedNonNumerics++;
                            counters[CSV2ColumnToRead].misMatchedNonNumerics++;
                        }
                    }
        
                    // We can do more analysis if we are comparing numbers to see how far out from each other they are      
                    if(driver1type == 'number')
                    {
  //                      comparisonResult = compare_two_numbers(driver1.Value(columnsToRead), driver2.Value(columnsToRead), accepted_error);        
                        comparisonResult = compare_two_numbers(driver1.Value(CSV1ColumnToRead), driver2.Value(CSV2ColumnToRead), accepted_error);        

                        // Increment counters based on result from sub-function
                        if(comparisonResult == 0)
                        {
  //                          counters[columnsToRead].perfectMatchedValues++;
                            counters[CSV2ColumnToRead].perfectMatchedValues++;
                        }
                        if(comparisonResult == 1)
                        {
  //                          counters[columnsToRead].numericDifferenceWithinAcceptedPercentageError++;
                            counters[CSV2ColumnToRead].numericDifferenceWithinAcceptedPercentageError++;
                        }
                        if(comparisonResult == 2)
                        {
  //                          counters[columnsToRead].unacceptablePercentageError++;
                            counters[CSV2ColumnToRead].unacceptablePercentageError++;
                        }
                        if(comparisonResult == 3)
                        {
  //                          counters[columnsToRead].numericDifferenceWithinAcceptedPercentageError++;
                            counters[CSV2ColumnToRead].numericDifferenceWithinAcceptedPercentageError++;
                        }
                        if(comparisonResult == 4)
                        {
  //                          counters[columnsToRead].unacceptablePercentageError++;
                            counters[CSV2ColumnToRead].unacceptablePercentageError++;
                        }
                        if(comparisonResult == 9)
                        {
  //                          counters[columnsToRead].misMatchedComparisonWithZero++;
                            counters[CSV2ColumnToRead].misMatchedComparisonWithZero++;
                        }
                    } //if driver == number
                } // if driver1type != driver2type
            } // if simpleCompare == 0          
      } // for each element to compare
      rowCount++;
      //Log.Message("RowCount = "+rowCount);
  driver1.Next();
  driver2.Next();
  }

  // Check if file 'lengths' are different, again this would suggest comparison is flawed
//  if(!driver2.EOF())
//  {
//      Log.Error("File1 and File2 don't have matching numbers of rows - can't compare data");
//  }

  
  
  /* NOT SURE WHAT TO DO WITH THIS BIT - ITS KEY SO SOMETHING HAS TO HAPPEN */
  
  
  
  
    
  // Loop again to show counters per Analytics measure (identified numerically)
//  for(columnsToRead=0; columnsToRead < numColumnsToCompare; columnsToRead++)
//  {
//      // Get the name of the column being compared based on the context (Patient Activity or Clinical Audit)
//      columnName = mapColumnIdsToMeasureNames(columnsToRead, analyticsPage);
//
//      formatResults(rowCount,counters[columnsToRead].perfectMatchedValues,columnName,"Perfect Matching Cells"); 
//      formatResults(0,counters[columnsToRead].numericDifferenceWithinAcceptedPercentageError,columnName,"Numeric mismatches within acceptable error percentage"); 
//      formatResults(0,counters[columnsToRead].unacceptablePercentageError,columnName,"Unacceptable Numeric mismatches for column"); 
//      formatResults(0,counters[columnsToRead].misMatchDataTypes,columnName,"Major Mismatches for column"); 
//      formatResults(0,counters[columnsToRead].misMatchedComparisonToNULL,columnName,"Incorrect comparisons to NULL for column"); 
//      formatResults(0,counters[columnsToRead].misMatchedComparisonWithZero,columnName,"Incorrect comparisons to ZERO for column"); 
//      formatResults(0,counters[columnsToRead].misMatchedNonNumerics,columnName,"Mismatched non-numerics (same data type) for column");
// 
//  }
//  for(columnsToRead=0; columnsToRead < numColumnsToCompare; columnsToRead++)
//  {
//       if(columnsToRead >= 4) // Active Patient Count End of Period is column 4 in both Patient Activity and Clinical Audit CSV export in Analytics 1, so skip it
//      {
//          CSV1ColumnToRead = columnsToRead+1;
//      }
//
// 
//      // Get the name of the column being compared based on the context (Patient Activity or Clinical Audit)
//      columnName = mapColumnIdsToMeasureNames(CSV1ColumnToRead, analyticsPage);
//
//      formatResults(rowCount,counters[CSV1ColumnToRead].perfectMatchedValues,columnName,"Perfect Matching Cells"); 
//      formatResults(0,counters[CSV1ColumnToRead].numericDifferenceWithinAcceptedPercentageError,columnName,"Numeric mismatches within acceptable error percentage"); 
//      formatResults(0,counters[CSV1ColumnToRead].unacceptablePercentageError,columnName,"Unacceptable Numeric mismatches for column"); 
//      formatResults(0,counters[CSV1ColumnToRead].misMatchDataTypes,columnName,"Major Mismatches for column"); 
//      formatResults(0,counters[CSV1ColumnToRead].misMatchedComparisonToNULL,columnName,"Incorrect comparisons to NULL for column"); 
//      formatResults(0,counters[CSV1ColumnToRead].misMatchedComparisonWithZero,columnName,"Incorrect comparisons to ZERO for column"); 
//      formatResults(0,counters[CSV1ColumnToRead].misMatchedNonNumerics,columnName,"Mismatched non-numerics (same data type) for column");
 
 // }



//}

function formatResults(expected, actual, columnName, counter)
{
    // perhaps put in check that > 0, if not don't show at all?
    if(actual > 0)
    {
        if(actual == expected)
        {
            Log.Checkpoint(columnName+":"+counter+":expected:"+expected+":actual:"+actual+":PASS");    
        }
        else
        {
            // Try and highlight the non perfect matches but where they fall within acceptable tolerance
            if(counter == "Numeric mismatches within acceptable error percentage")
            {
                Log.Warning(columnName+":"+counter+":expected:"+expected+":actual:"+actual+":PASS");
            }
            else
            {
                Log.Warning(columnName+":"+counter+":expected:"+expected+":actual:"+actual+":FAIL");
            }   
        }
    }
}


// Simple compare used to limit complexity in "compare_two_csv_files"
function do_values_match(value1, value2)
{
  if(value1 != value2)
  {
    return -1;
  }
  return 0;
}

// finding out how different two numeric/decimal values are from each other
function compare_two_numbers(num1, num2, accepted_error)
{
var diffPerc;
var absDiffPerc;
var diff;

    // Check if numbers are the same
    diff = Math.abs(num1 - num2);
    if(diff == 0)
    {
       return 0;
    }        
    // Check for zeros as we can't get a percentage diff if these are involved
    if(num1 == 0)
    {
        return 9;   
    }
    if(num2 == 0)
    {
        return 9;
    }
    // do some percentage comparison based on numbers not matching and neither are zero
    if(diff != 0)
    {
        if(num1 != 0)
        {   
            diffPerc = ((num1 - num2)/num1)*100;
            absDiffPerc = Math.abs(diffPerc);   
    
            if(diffPerc < 0)
            {
                if(absDiffPerc <= accepted_error)
                {
                    return 1;
                }
                if(absDiffPerc > accepted_error)
                {
                    return 2;
                }
            }    
            if(diffPerc > 0)
            {
                if((diffPerc) <= accepted_error)
                {
                    return 3;
                }
                if((diffPerc) > accepted_error)
                {
                    return 4;
                }
            }
        }
    }    
} 

// Simple function to execute a DOS batch file in windows explorer
function run_bat_file(filename)
{
var obj = Sys.OleObject("WScript.Shell");
    
    obj.Run("\"" + filename +  "\"");
}

// Extension on the above but where a parameter can be added in, refactor here would be to combine the two to make parameter optional
function run_bat_file_with_param(filename, param)
{
var obj = Sys.OleObject("WScript.Shell");
    
    obj.Run("\"" + filename + "\"" + param );
}

function ListFiles(directory)
{
// copied these variables and usage of them from https://support.smartbear.com/viewarticle/74756/
var oFolder;
var colFiles;
var f;

// my additional variables
var countFiles=0;
var stringLength;
var fileType;
var concatenatedFileNames = "";

  oFolder = aqFileSystem.GetFolderInfo(directory);
  colFiles = oFolder.Files;
  
  while (colFiles.HasNext())
  { 
          f = colFiles.Next();
          stringLength = aqString.GetLength(f.Name);
          fileType = aqString.SubString(f.Name, stringLength-3, 3);
          if(fileType == "csv")
          { 
              countFiles++;
              concatenatedFileNames = concatenatedFileNames+":"+(aqString.SubString(f.Name, 0, stringLength-4));
          }
  }
  concatenatedFileNames = aqConvert.IntToStr(countFiles)+concatenatedFileNames;
  
return concatenatedFileNames;
}

function mapColumnIdsToMeasureNames(id, context)
{
var measureName;

    if(context == "PatientActivity")
    {
        switch(id) {
          case 0:    
            measureName = "Report Date Range";
            break;
          case 1:    
            measureName = "CCGs";
            break;
          case 2:    
            measureName = "Location";
            break;
          case 3:    
            measureName = "Patients, Total Over Period";
            break;
          case 4:    
            measureName = "Patients, Total at Period End";
            break;
          case 5:    
            measureName = "Patients, Treated During Period";
            break;
          case 6:    
            measureName = "Patients, Initiated Over Period";
            break;
          case 7:    
            measureName = "Treatments, Home Visits";
            break;
          case 8:    
            measureName = "Treatments, Total During Period";
            break;
        }    
    }
    if(context == "ClinicalAudit")
    {
        switch(id) {
          case 0:    
            measureName = "Report Date Range";
            break;
          case 1:    
            measureName = "CCGs";
            break;
          case 2:    
            measureName = "Location";
            break;
          case 3:    
            measureName = "Patients, Total Over Period";
            break;
          case 4:    
            measureName = "Patients, Total at Period End";
            break;
          case 5:    
            measureName = "Patients, Treated During Period";
            break;
          case 6:    
            measureName = "TTR, Location, Rolling 12 Months";
            break;
          case 7:    
            measureName = "Treatments, Total During Period";
            break;
          case 8:    
            measureName = "INRs > 8, Count";
            break;
          case 9:    
            measureName = "INRs > 8, Percent";
            break;
          case 10:    
            measureName = "INRs > 8, Patient Count";
            break;
          case 11:    
            measureName = "INRs > 8, Patient Percent";
            break;
          case 12:    
            measureName = "INRs > 5 & <= 8, Count";
            break;
          case 13:    
            measureName = "INRs > 5 & <= 8, Percent";
            break;
          case 14:    
            measureName = "INRs > 5 & <= 8, Patient Count";
            break;
          case 15:    
            measureName = "INRs > 5 & <= 8, Patient Percent";
            break;
          case 16:    
            measureName = "INRs > 1 Below Target, Count";
            break;
          case 17:    
            measureName = "INRs > 1 Below Target, Percent";
            break;
          case 18:    
            measureName = "INRs > 1 Below Target, Patient Count";
            break;
          case 19:    
            measureName = "INRs > 1 Below Target, Patient Percent";
            break;
          case 20:    
            measureName = "INRs within 0.5 of target, Treatment Count";
            break;
          case 21:    
            measureName = "INRs within 0.5 of target, Treatment Percent";
            break;
          case 22:    
            measureName = "INRs within 0.5 of target, Patient Count";
            break;
          case 23:    
            measureName = "INRs within 0.5 of target, Patient Percent";
            break;
          case 24:    
            measureName = "INRs within 0.75 of target, Treatment Count";
            break;
          case 25:    
            measureName = "INRs within 0.75 of target, Treatment Percent";
            break;
          case 26:    
            measureName = "INRs within 0.75 of target, Patient Count";
            break;
          case 27:    
            measureName = "INRs within 0.75 of target, Patient Percent";
            break;
          case 28:    
            measureName = "INRs within 1 of target, Treatment Count";
            break;
          case 29:    
            measureName = "INRs within 1 of target, Treatment Percent";
            break;
          case 30:    
            measureName = "INRs within 1 of target, Patient Count";
            break;
          case 31:    
            measureName = "INRs within 1 of target, Patient Percent";
            break;
          case 32:    
            measureName = "Adverse Events, Severe, Count";
            break;
          case 33:    
            measureName = "Adverse Events, Severe, Patient Count";
            break;
          case 34:    
            measureName = "Adverse Events, Severe, Patient Percent";
            break;
          case 35:    
            measureName = "Adverse Events, Intermediate, Count";
            break;
          case 36:    
            measureName = "Adverse Events, Intermediate, Patient Count";
            break;
          case 37:    
            measureName = "Adverse Events, Intermediate, Patient Percent";
            break;
          case 38:    
            measureName = "Adverse Events, Minor, Count";
            break;
          case 39:    
            measureName = "Adverse Events, Minor, Patient Count";
            break;
          case 40:    
            measureName = "Adverse Events, Minor, Patient Percent";
            break;
        }
    }

return measureName;
}