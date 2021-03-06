//USEUNIT Navigation
//USEUNIT V5_Common
//USEUNIT V5_Common_Batch
//USEUNIT V5_Common_Popups
//USEUNIT Test_Add_Historical_Treatment


//===============================================================================
// Create Patient, Patient Clinical & Historical Record

//-------------------------------------------------------------------------------
function quick_patient_arrays()
{
// Driver files
  driver_surname = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Test_Data\\arrays.xls","Surnames");
  driver_extra_surname = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Test_Data\\arrays.xls","Extra");
  driver_forenames = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Test_Data\\arrays.xls","Forenames");
  driver_titles = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Test_Data\\arrays.xls","Titles");
  driver_ages = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Test_Data\\arrays.xls","Ages");
  driver_diagnosis = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Test_Data\\arrays.xls","Diagnosis");
  driver_addresses = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Test_Data\\arrays.xls","Addresses");
  
// Define Arrays
  var wa_surnames = new Array();
  var wa_extra_surnames = new Array();
  var wa_male_names = new Array();
  var wa_female_names = new Array();
  var wa_male_titles = new Array();
  var wa_female_titles = new Array();
  var wa_diagnosis = new Array();
  var wa_addresses = new Array();


// Build Arrays
  build_array(wa_surnames, driver_surname);
  build_array(wa_extra_surnames, driver_extra_surname);
  
  build_array_mf(wa_male_names, wa_female_names, driver_forenames);
  build_array_mf(wa_male_titles, wa_female_titles, driver_titles);
 
  build_array_diagnosis(wa_diagnosis, driver_diagnosis);
  build_array_address(wa_addresses, driver_addresses);
  
//  test_array_address(wa_addresses);

// Set start points for name arrays
  wc_surname = Math.floor(Math.random()*10);
  wc_forename_m = Math.floor(Math.random()*5);
  wc_forename_f = Math.floor(Math.random()*5);


//   Log_On(6); // Hugo Searle @ Maplestead
  var INRstarV5 = set_system();
//

// -----------------------------------------------------
// Main driver is Ages
// Loop round each Age range, creating each number of Male / Female patients

    while (!driver_ages.EOF())
    {
            
     if (driver_ages.Value(0) == "M" || driver_ages.Value(0) == "F" || driver_ages.Value(0) == "N")
     {

        w_use = driver_ages.Value(0);
        w_min = driver_ages.Value(2);
        w_max = driver_ages.Value(3);
        
        wc_surname = Math.floor(Math.random()*wa_surnames.length);
        wc_forename_m = Math.floor(Math.random()*wa_male_names.length);
        wc_forename_f = Math.floor(Math.random()*wa_female_names.length);

        Log.Message ("Patient Gender: " + driver_ages.Value(0) + "    Patient Count: " + driver_ages.Value(1));
        
        for (i=0;i<driver_ages.Value(1);i++)
        {
            wc_surname = increase_array_counter(wc_surname, wa_surnames);
            wc_forename_m = increase_array_counter(wc_forename_m, wa_male_names);
            wc_forename_f = increase_array_counter(wc_forename_f, wa_female_names);
                          
            Goto_Add_Patient();
            if (w_use == "M")
                quick_pt_demographics(wa_surnames, wa_extra_surnames, wa_male_names, wa_male_titles, w_use, w_min, w_max, wa_diagnosis, wc_surname, wc_forename_m, wa_addresses)
            if (w_use == "F")
                quick_pt_demographics(wa_surnames, wa_extra_surnames, wa_female_names, wa_female_titles, w_use, w_min, w_max, wa_diagnosis, wc_surname, wc_forename_f, wa_addresses)
         
            Goto_Add_Historical();    
            quick_pt_historical_clever("8", "Jan", "2013", "1.7", "28 Days", "Quick Patient treatment");
        }
     }
     driver_ages.Next();
   }  

}
//-------------------------------------------------------------------------------
function quick_pt_demographics(wa_surnames, wa_extra_surnames, wa_forenames,  wa_titles, p_use, p_min, p_max, p_diagnosis, pc_surname, pc_forename, wa_addresses)
{
  Log.Message ("Adding Patient Demographics");
  
// Insert Patient
  var INRstarV5 = set_system();
  var panelMain = INRstarV5.Panel("MainPage");
  var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
  var form = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  var panelEPD = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails");
  var panelEPCD = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientContactDetails");

  // Set NHS number
  panelEPD.Panel(1).Textbox("NHSNumber").Text = Get_New_Number_V5();
  
  // Set title - if age < 31 set to Mr or Miss
  if (w_min < 31)
  {
    if (p_use == "M")
      panelEPD.Panel(2).Select("Title").ClickItem("Mr");
    else
      panelEPD.Panel(2).Select("Title").ClickItem("Miss");
  }
  else
    panelEPD.Panel(2).Select("Title").ClickItem(wa_titles[Math.floor(Math.random()*wa_titles.length)]);
  

    
    
    
  // Set Names  
  panelEPD.Panel(3).Textbox("Surname").Text = wa_surnames[pc_surname]+"-"+wa_extra_surnames[Math.floor(Math.random()*wa_extra_surnames.length)];
  panelEPD.Panel(4).Textbox("FirstName").Text = wa_forenames[pc_forename];
  if (Math.floor(Math.random()*10) > 8)
  {
    var w_name = panelEPD.Panel(4).Textbox("FirstName").Text;
    panelEPD.Panel(4).Textbox("FirstName").Text = w_name + " " + wa_forenames[Math.floor(Math.random()*wa_forenames.length)];
  }
  
  // Set Date of Birth 
  panelEPD.Panel(5).Image("calendar_png").Click();

  w_datepicker = INRstarV5.Panel("ui_datepicker_div");
  var w_month = Math.floor(Math.random()*12)+1;
  var w_year = 2001 - w_min + Math.floor(Math.random()*10);
  w_datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(w_month));
  w_datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.IntToStr(w_year));
  w_datepicker.Table(0).Cell(3, 3).Link(0).Click();
  
  // Record the DoB for later
  var w_dob = aqConvert.DateTimeToStr(panelEPD.Panel(5).Textbox("PatientBorn").wDate);
  
  // Select Sex (Gender is set accodingly)
  if (p_use == "M")
  {
      panelEPD.Panel(6).Select("Sex").ClickItem("Male")
  }
  if (p_use == "F")
  {
      panelEPD.Panel(6).Select("Sex").ClickItem("Female")
  }
  if (Math.floor(Math.random()*10) > 8 )
  {
      panelEPD.Panel(6).Select("Sex").ClickItem("Not Known")
//      form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(7).Select("Gender").ClickItem("Female");
  }
  // Right hand side of page
  wc_addr = Math.floor(Math.random()*wa_addresses.length);
  panelEPCD.Panel(0).Textbox("FirstLineAddress").Text = aqConvert.IntToStr(Math.floor(Math.random()*100)+1) + " " + wa_addresses[wc_addr][1];
  panelEPCD.Panel(1).Textbox("SecondLineAddress").Text = wa_addresses[wc_addr][2];
  panelEPCD.Panel(2).Textbox("ThirdLineAddress").Text = wa_addresses[wc_addr][3];
  panelEPCD.Panel(3).Textbox("Town").Text = wa_addresses[wc_addr][4];
  panelEPCD.Panel(4).Textbox("County").Text = wa_addresses[wc_addr][5];
  panelEPCD.Panel(5).Textbox("Postcode").Text = wa_addresses[wc_addr][6];
    
//  panelEPCD.Panel(9).Select("ClinicianId").ClickItem(1);

  // Save the details
  form.Panel(0).SubmitButton("AddPatientDetails").Click();
  
//  // Test for Duplicate Patient
//  process_confirm_duplicate_patient();

  // Add a clinical record
  Goto_Patient_Clinical_Add();
  quick_pt_clinical(p_use, w_dob, p_diagnosis);


}
function quick_pt_clinical(p_gender, p_dob, p_diagnosis)
{
    var INRstarV5 = set_system();
    var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
    var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
    var form = panelPTC.Panel("PatientClinicalWrapper").Panel("PatientClinicalDetails").Form("AddClinicalRecordForm");
    var panelEPCI = form.Panel("EditPatientClinicalInformation"); 
    
    form.Panel("EditPatientClinicalInformation").Panel(0).Image("calendar_png").Click();
    datepicker = INRstarV5.Panel("ui_datepicker_div");
    datepicker.Panel(0).Panel(0).Select(0).ClickItem(set_month(Math.floor(Math.random()*12)+1));
    datepicker.Panel(0).Panel(0).Select(1).ClickItem(aqConvert.IntToStr(2011 - Math.floor(Math.random()*3) ));
    datepicker.Table(0).Cell(3, 3).Link(0).Click();
    
    // Set Diagnosis...
    var w_diag = select_diagnosis(p_diagnosis, p_gender, p_dob);
    panelEPCI.Panel(1).Select("DiagnosisId").ClickItem(w_diag);
    
    // Set Protocol
    var w_rnd_protocol = Math.floor(Math.random()*20);
    if (w_rnd_protocol < 9)
      panelEPCI.Panel(2).Select("DosingMethod").ClickItem("Coventry Maintenance");
    if (w_rnd_protocol > 8 && w_rnd_protocol <17)
      panelEPCI.Panel(2).Select("DosingMethod").ClickItem("Hillingdon Maintenance");
    if (w_rnd_protocol >16)
      panelEPCI.Panel(2).Select("DosingMethod").ClickItem("Manual Dosing");
    
    // Acknowledge Dosing More Info window
    process_more_information(INRstarV5);  

    panelEPCI.Panel(3).Select("TestingMethod").ClickItem("PoCT");
    panelEPCI.Panel(4).Select("MaxReview").ClickItem("70 Days");
    
    panelEPCI.Panel(5).Checkbox("WrittenInfoProvided").ClickChecked(true);
       
    var panelEPCTS = form.Panel("EditPatientClinicalTabletSelection");
    
    panelEPCTS.Panel(0).Checkbox("NPSA").ClickChecked(false); 
    panelEPCTS.Panel(1).Checkbox("Tablets_Use5").ClickChecked(false);
    panelEPCTS.Panel(2).Checkbox("Tablets_Use3").ClickChecked(true);
    panelEPCTS.Panel(3).Checkbox("Tablets_Use1").ClickChecked(true);
    panelEPCTS.Panel(4).Checkbox("Tablets_UseHalf").ClickChecked(true);
    panelEPCTS.Panel(5).Checkbox("Tablets_UseSplit").ClickChecked(false);
    
    //form.Fieldset(0).Panel(0).SubmitButton("UpdatePatientClinical")
    form.Panel("PatientClinicalInformation").SubmitButton("AddPatientClinical").Click();

}
//----------------------------------------------------------------
function build_array(p_array, p_driver)
{
  var wc = 0;
    while (!p_driver.EOF())
    {
      if (p_driver.Value(0) == "Y")
      {
        p_array[wc] = p_driver.Value(1);
        wc++
      }
      p_driver.Next();
    }
}
//----------------------------------------------------------------
function build_array_mf(p_array_m, p_array_f, p_driver)
{
  var wc_m = 0;
  var wc_f = 0;

  while (!p_driver.EOF())
  {
      if (p_driver.Value(0) == "M")
      {
        p_array_m[wc_m] = p_driver.Value(1);
        wc_m++;
      }
      if (p_driver.Value(0) == "F")
      {
        p_array_f[wc_f] = p_driver.Value(1);
        wc_f++;
      }
      p_driver.Next();
  }
}
//----------------------------------------------------------------
function test_build_diagnosis()
{
  driver_diagnosis = DDT.ExcelDriver("D:\\Test_Data\\arrays.xls","Diagnosis");
  var wa_diagnosis = new Array();
  build_array_diagnosis(wa_diagnosis, driver_diagnosis);
  
//  Log.Message("Show list of diagnosis 2");
//  for (wc_row=0;wc_row<wa_diagnosis.length;wc_row++)
//  {
//    Log.Message(wc_row + " " + wa_diagnosis[wc_row][1]);
//  }
//  
//  // Show all values for AF
//  Log.Message("Show all values for AF");
//  for (wc_col=0;wc_col<44;wc_col++)
//  {
//    Log.Message(wc_col + " " + wa_diagnosis[1][wc_col]);
//  }
//  
  var w_tot = 0;
  var wc_col = 10;
  // Show all values for Male 70-79
  for (wc_row=0;wc_row<wa_diagnosis.length;wc_row++)
  {
    w_tot = w_tot + aqConvert.StrToInt(wa_diagnosis[wc_row][wc_col]);
    Log.Message(wc_row + " " + wa_diagnosis[wc_row][1] + " " + wa_diagnosis[wc_row][wc_col]);
    Log.Message(w_tot);
  }

}
//----------------------------------------------------------------
function build_array_diagnosis(p_array, p_driver)
{
  var wc = 0;
  while (!p_driver.EOF())
  {
      if (p_driver.Value(0) == "Y")
      {
        var w_array = new Array();
        for (dc=1;dc<44;dc++)
        {
          w_array[dc] = p_driver.Value(dc);
        }
        p_array[wc] = w_array;
        wc++;
      }
      p_driver.Next();
  }
}
//----------------------------------------------------------------
function build_array_address(p_array, p_driver)
{
  var wc = 0;
  while (!p_driver.EOF())
  {
      if (p_driver.Value(0) == "Y")
      {
        var w_array = new Array();
        for (dc=1;dc<7;dc++)
        {
          w_array[dc] = p_driver.Value(dc);
        }
        p_array[wc] = w_array;
        wc++;
      }
      p_driver.Next();
  }
}
//---------------------------------------------------------------- 
function select_diagnosis(p_array, p_gender, p_dob)
{
  var w_age = aqDateTime.GetYear(aqDateTime.TimeInterval(aqDateTime.Today(), p_dob)) - 1900;
  Log.Message("DoB:" + p_dob + " Age: " + w_age);
  
  var w_age_min = (math_int(w_age,10) * 10)-1; 
  
  // Decide which columns to use
  if (w_age <=12)
    w_col = 2;
  if (w_age >12 && w_age <= 19)
    w_col = 3;
  if (w_age >19)
    w_col = (math_int(w_age,10))+3;
      
  if (p_gender == "F")
    w_col = w_col + 14;
  if (p_gender == "N")
    w_col = w_col + 28;
  
  // Total number of stats for this gender & age
  var w_tot = 0;
  for (x=0;x<p_array.length;x++)
  {
    w_tot = w_tot + aqConvert.StrToInt(p_array[x][w_col]);
//    Log.Message(x + " " + p_array[x][w_col] + " " + w_tot);
  }
  // Pick a random value
  var w_rnd = Math.floor(Math.random()*w_tot);
  
  // Pick the diagnosis
  wf_cont = true;
  var wc_row = 0;
  var w_run_tot = 0;
  
  while (wf_cont == true)
  {
    w_run_tot = w_run_tot + aqConvert.StrToInt(p_array[wc_row][w_col]);
//    Log.Message(wc + " " + p_array[wc][w_col] + " " + w_run_tot);
    if (w_run_tot > w_rnd || wc_row > p_array.length)
    {
      wf_cont = false;
      wc_row = 1;
    }
    else
      wc_row++;
  }   
  var w_diagnosis = p_array[wc_row][1];
  
  return w_diagnosis;
}
//---------------------------------------------
function increase_array_counter(p_c, p_array)
{
  p_c++;
  if (p_c >= p_array.length)
     p_c = 1;
  Log.Message(p_c+ " " + p_array[p_c]);
  return p_c;
}
//------------------------------ Test functions
function test_random()
{
   w_min = 21;
   for (i=0;i<50;i++)
   {
     w_val = 2001 - w_min + Math.floor(Math.random()*10);
     Log.Message(w_val);
   }
}//------------------------------ Test functions
function test_random2()
{
   for (i=0;i<20;i++)
   {
     w_val = Math.floor(Math.random()*20)+1;
     Log.Message(w_val);
   }
}
//----------------------------------------------------------------
function test_array_address(p_array)
{
  var wc = 0;
  for (i=0;i<p_array.length;i++)
  {
     Log.Message(p_array[i][1] + " " )
  }
}
